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

async function startWASession(rawUserId) {
    const userId = rawUserId.toString().replace('session-', '').trim();
    
    // إذا كانت الجلسة تعمل بالفعل، أخبر المتصفح فوراً
    if (sessions[userId]?.isReady) {
        console.log(`[Status] User ${userId} is already ONLINE. Notify browser.`);
        io.emit('ready', { userId, msg: 'متصل بنجاح' });
        return;
    }

    // إذا كانت هناك محاولة قديمة عالقة، قم بإنقاذها أو مسحها
    if (sessions[userId]?.initializing) {
        console.log(`[Status] User ${userId} is already initializing. Please wait.`);
        return; 
    }

    console.log(`[Action] Starting WhatsApp for: ${userId}`);
    sessions[userId] = { initializing: true };

    const userFolder = path.join(AUTH_FOLDER, userId);
    if (!fs.existsSync(userFolder)) fs.mkdirSync(userFolder, { recursive: true });

    const { state, saveCreds } = await useMultiFileAuthState(userFolder);
    const { version } = await fetchLatestWaWebVersion().catch(() => ({ version: [2, 3000, 1015901307] }));

    try {
        const sock = makeWASocket({
            version,
            logger: log,
            auth: state,
            printQRInTerminal: false,
            browser: ['Diar-Shahama', 'Chrome', '1.0.0'],
            generateHighQualityLink: true
        });

        sessions[userId] = { sock, isReady: false, initializing: false };

        sock.ev.on('connection.update', (update) => {
            const { connection, lastDisconnect, qr } = update;

            if (qr) {
                console.log(`[QR] Sending new QR for: ${userId}`);
                // إرسال الكود لكل المتصلين لضمان وصوله للمسؤول والموظف معاً
                io.emit('qr', { userId, qr });
            }

            if (connection === 'close') {
                const statusCode = lastDisconnect?.error?.output?.statusCode;
                const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
                console.log(`[Conn] Closed for ${userId}. Reason: ${statusCode}. Reconnect: ${shouldReconnect}`);
                
                sessions[userId].isReady = false;
                if (shouldReconnect) {
                    setTimeout(() => startWASession(userId), 5000);
                } else {
                    delete sessions[userId];
                }
            } else if (connection === 'open') {
                console.log(`[Conn] SUCCESS: ${userId} is now READY`);
                sessions[userId].isReady = true;
                io.emit('ready', { userId, msg: 'تم الاتصال بنجاح' });
            }
        });

        sock.ev.on('creds.update', saveCreds);
    } catch (err) {
        console.error(`[Error] Failed to start session for ${userId}:`, err);
        delete sessions[userId];
    }
}

io.on('connection', (socket) => {
    socket.on('join_room', (userId) => {
        if (userId) socket.join(userId.toString().replace('session-', '').trim());
    });

    socket.on('start_session', ({ userId }) => {
        if (userId) startWASession(userId);
    });

    socket.on('logout_session', async ({ userId }) => {
        const cleanId = userId.toString().replace('session-', '').trim();
        const userFolder = path.join(AUTH_FOLDER, cleanId);
        if (sessions[cleanId]?.sock) {
            try { await sessions[cleanId].sock.logout(); } catch(e) {}
            delete sessions[cleanId];
        }
        if (fs.existsSync(userFolder)) {
            fs.rmSync(userFolder, { recursive: true, force: true });
        }
        io.emit('disconnected', { userId: cleanId, msg: 'تم تسجيل الخروج' });
    });
});

app.get('/api/status', (req, res) => {
    res.json(Object.keys(sessions).map(id => ({ id, isReady: sessions[id].isReady })));
});

app.post('/api/send', async (req, res) => {
    const { userId, phone, message } = req.body;
    const cleanId = userId.toString().replace('session-', '').trim();
    if (!sessions[cleanId]?.isReady) return res.status(403).json({ error: 'غير متصل' });

    try {
        const jid = phone.toString().replace(/\D/g, '') + '@s.whatsapp.net';
        await sessions[cleanId].sock.sendMessage(jid, { text: message });
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: err.toString() }); }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`>>> WHATSAPP SERVER RUNNING ON ${PORT} <<<`);
    if (fs.existsSync(AUTH_FOLDER)) {
        fs.readdirSync(AUTH_FOLDER).forEach(file => {
            if (fs.lstatSync(path.join(AUTH_FOLDER, file)).isDirectory()) {
                startWASession(file);
            }
        });
    }
});
