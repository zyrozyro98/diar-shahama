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
const qrCache = {}; // ذاكرة لتخزين آخر رمز QR لكل مستخدم
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
            version, logger: log, auth: state,
            printQRInTerminal: false,
            browser: ['Diar-Shahama', 'Chrome', '1.0.0']
        });

        sessions[userId] = { sock, isReady: false, initializing: false };

        sock.ev.on('connection.update', (update) => {
            const { connection, lastDisconnect, qr } = update;

            if (qr) {
                console.log(`[QR] Cache updated for: ${userId}`);
                qrCache[userId] = qr; // حفظ الرمز في الذاكرة
                io.emit('qr', { userId, qr });
            }

            if (connection === 'close') {
                if (sessions[userId]) sessions[userId].isReady = false;
                const retry = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
                if (retry) setTimeout(() => startWASession(userId), 5000);
            } else if (connection === 'open') {
                console.log(`[Ready] ${userId} is ONLINE`);
                qrCache[userId] = null; // مسح الرمز عند نجاح الاتصال
                if (sessions[userId]) sessions[userId].isReady = true;
                io.emit('ready', { userId, msg: 'متصل' });
            }
        });

        sock.ev.on('creds.update', saveCreds);
    } catch (err) { delete sessions[userId]; }
}

io.on('connection', (socket) => {
    // بمجرد اتصال أي شخص، إذا كان هناك رمز QR مخزن له، نرسله له فوراً
    socket.on('join_room', (userId) => {
        const cleanId = userId.toString().replace('session-', '').trim();
        socket.join(cleanId);
        if (qrCache[cleanId]) {
            socket.emit('qr', { userId: cleanId, qr: qrCache[cleanId] });
        }
    });

    socket.on('start_session', ({ userId }) => {
        if (userId) startWASession(userId);
    });
});

app.post('/api/send', async (req, res) => {
    const { userId, phone, message } = req.body;
    const cleanId = userId.toString().replace('session-', '').trim();
    if (!sessions[cleanId]?.isReady) return res.status(403).json({ error: 'منقطع' });
    try {
        const jid = phone.toString().replace(/\D/g, '') + '@s.whatsapp.net';
        await sessions[cleanId].sock.sendMessage(jid, { text: message });
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: e.toString() }); }
});

server.listen(3001, '0.0.0.0', () => {
    console.log(">>> SERVER LIVE <<<");
    if (fs.existsSync(AUTH_FOLDER)) {
        fs.readdirSync(AUTH_FOLDER).forEach(file => {
            if (fs.lstatSync(path.join(AUTH_FOLDER, file)).isDirectory()) startWASession(file);
        });
    }
});
