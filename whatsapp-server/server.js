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
    
    if (sessions[userId]?.isReady) {
        io.emit('ready', { userId, msg: 'متصل بالفعل' });
        return;
    }

    if (sessions[userId]?.initializing) return;

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
            browser: ['Diar-Shahama', 'Chrome', '1.0.0']
        });

        sessions[userId] = { sock, isReady: false, initializing: false };

        sock.ev.on('connection.update', (update) => {
            const { connection, lastDisconnect, qr } = update;

            if (qr) {
                console.log(`[QR] Sending to browser for: ${userId}`);
                io.emit('qr', { userId, qr });
            }

            if (connection === 'close') {
                const statusCode = lastDisconnect?.error?.output?.statusCode;
                const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
                
                // حماية لمنع الانهيار (Crash fix)
                if (sessions[userId]) {
                    sessions[userId].isReady = false;
                }

                if (shouldReconnect) {
                    setTimeout(() => startWASession(userId), 5000);
                } else {
                    console.log(`[Logout] User ${userId} logged out or unauthorized.`);
                    delete sessions[userId];
                }
            } else if (connection === 'open') {
                console.log(`[Success] User ${userId} is READY`);
                if (sessions[userId]) sessions[userId].isReady = true;
                io.emit('ready', { userId, msg: 'تم الاتصال' });
            }
        });

        sock.ev.on('creds.update', saveCreds);
    } catch (err) {
        console.error(`[Error] ${userId}:`, err);
        delete sessions[userId];
    }
}

io.on('connection', (socket) => {
    socket.on('start_session', ({ userId }) => {
        if (userId) startWASession(userId);
    });
    socket.on('join_room', (userId) => {
        if (userId) socket.join(userId.toString().replace('session-', '').trim());
    });
});

app.get('/api/status', (req, res) => {
    res.json(Object.keys(sessions).map(id => ({ id, isReady: sessions[id]?.isReady })));
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

const PORT = 3001;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`>>> SERVER READY ON ${PORT} <<<`);
    if (fs.existsSync(AUTH_FOLDER)) {
        fs.readdirSync(AUTH_FOLDER).forEach(file => {
            const p = path.join(AUTH_FOLDER, file);
            if (fs.lstatSync(p).isDirectory()) startWASession(file);
        });
    }
});
