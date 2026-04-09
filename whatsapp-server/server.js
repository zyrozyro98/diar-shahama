const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const Baileys = require('@whiskeysockets/baileys');
const makeWASocket = Baileys.default || Baileys;
const { useMultiFileAuthState, DisconnectReason, fetchLatestWaWebVersion } = Baileys;
const pino = require('pino');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });

const sessions = {};
const log = pino({ level: 'error' });
const AUTH_FOLDER = path.join(__dirname, 'auth_info_baileys');

if (!fs.existsSync(AUTH_FOLDER)) fs.mkdirSync(AUTH_FOLDER, { recursive: true });

async function startWASession(rawUserId, force = false) {
    const userId = rawUserId.replace('session-', '').trim();
    
    if (!force && (sessions[userId]?.isReady || sessions[userId]?.initializing)) {
        if (sessions[userId]?.isReady) io.emit('ready', { userId, msg: 'متصل بالفعل' });
        return;
    }

    console.log(`[Session] REQUEST: Start/Restore for user: ${userId} (Force: ${force})`);
    
    // إذا كان الموظف عالقاً، قم بإغلاق الجلسة القديمة أولاً
    if (force && sessions[userId]?.sock) {
        try { await sessions[userId].sock.logout(); } catch(e) {}
        delete sessions[userId];
    }

    sessions[userId] = { initializing: true };

    const userFolder = path.join(AUTH_FOLDER, userId);
    if (!fs.existsSync(userFolder)) fs.mkdirSync(userFolder, { recursive: true });

    const { state, saveCreds } = await useMultiFileAuthState(userFolder);
    const { version } = await fetchLatestWaWebVersion().catch(() => ({ version: [2, 3000, 1015901307] }));

    const sock = makeWASocket({
        version,
        logger: log,
        auth: state,
        printQRInTerminal: false,
        browser: ['Diar-Shahama', 'Chrome', '1.0.0'],
        connectTimeoutMs: 60000
    });

    sessions[userId] = { sock, isReady: false, initializing: false };

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log(`[QR] EMIT: New QR for user: ${userId}`);
            io.emit('qr', { userId, qr });
        }

        if (connection === 'close') {
            const statusCode = lastDisconnect?.error?.output?.statusCode;
            const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
            console.log(`[Conn] CLOSED: ${userId}. Reason: ${statusCode}. Retry: ${shouldReconnect}`);
            
            sessions[userId].isReady = false;
            if (shouldReconnect) {
                setTimeout(() => startWASession(userId), 5000);
            }
        } else if (connection === 'open') {
            console.log(`[Conn] ONLINE: User ${userId} connected successfully`);
            sessions[userId].isReady = true;
            io.emit('ready', { userId, msg: 'متصل الآن' });
        }
    });

    sock.ev.on('creds.update', saveCreds);
}

io.on('connection', (socket) => {
    socket.on('start_session', ({ userId }) => {
        console.log(`[Socket] Received start_session for: ${userId}`);
        if (userId) startWASession(userId);
    });

    socket.on('logout_session', async ({ userId }) => {
        const cleanId = userId.replace('session-', '').trim();
        console.log(`[Socket] LOGOUT request for: ${cleanId}`);
        const userFolder = path.join(AUTH_FOLDER, cleanId);
        if (sessions[cleanId]?.sock) {
            try { await sessions[cleanId].sock.logout(); } catch(e) {}
            delete sessions[cleanId];
        }
        if (fs.existsSync(userFolder)) {
            fs.rmSync(userFolder, { recursive: true, force: true });
        }
        io.emit('disconnected', { userId: cleanId, msg: 'تم تسجيل الخروج بنجاح' });
    });

    socket.on('join_room', (userId) => {
        if (userId) socket.join(userId.replace('session-', ''));
    });
});

app.get('/status', (req, res) => {
    const stats = Object.keys(sessions).map(id => ({ id, ready: sessions[id].isReady }));
    res.json(stats);
});

app.post('/api/send', async (req, res) => {
    const { userId, phone, message } = req.body;
    const cleanId = userId.replace('session-', '');
    if (!sessions[cleanId]?.isReady) return res.status(403).json({ error: 'غير متصل' });

    try {
        const jid = phone.toString().replace(/\D/g, '') + '@s.whatsapp.net';
        await sessions[cleanId].sock.sendMessage(jid, { text: message });
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: err.toString() }); }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`>>> WHATSAPP SERVER READY ON PORT ${PORT} <<<`);
    if (fs.existsSync(AUTH_FOLDER)) {
        fs.readdirSync(AUTH_FOLDER).forEach(file => {
            if (fs.lstatSync(path.join(AUTH_FOLDER, file)).isDirectory()) {
                startWASession(file);
            }
        });
    }
});
