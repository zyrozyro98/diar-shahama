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
    // تنظيف المعرف لإزالة أي زوائد مثل "session-" لضمان عدم التكرار
    const userId = rawUserId.replace('session-', '');
    
    if (sessions[userId]?.isReady || sessions[userId]?.initializing) return;

    console.log(`[Session] Initializing for user: ${userId}`);
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
        // إعدادات إضافية لزيادة الاستقرار
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 10000
    });

    sessions[userId] = { sock, isReady: false, initializing: false };

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log(`[QR] New code for user: ${userId}`);
            io.emit('qr', { userId, qr });
        }

        if (connection === 'close') {
            const statusCode = lastDisconnect?.error?.output?.statusCode;
            const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
            console.log(`[Connection] Closed for ${userId}. Reason: ${statusCode}. Reconnecting: ${shouldReconnect}`);
            
            sessions[userId].isReady = false;
            if (shouldReconnect) {
                // محاولة إعادة اتصال ذكية بعد 5 ثواني
                setTimeout(() => {
                    delete sessions[userId];
                    startWASession(userId);
                }, 5000);
            }
        } else if (connection === 'open') {
            console.log(`[Connection] SUCCESS! ${userId} is now ONLINE`);
            sessions[userId].isReady = true;
            io.emit('ready', { userId, msg: 'متصل بنجاح' });
        }
    });

    sock.ev.on('creds.update', saveCreds);
}

io.on('connection', (socket) => {
    socket.on('start_session', ({ userId }) => {
        if (userId) startWASession(userId);
    });
    socket.on('join_room', (userId) => {
        if (userId) socket.join(userId);
    });
});

app.get('/ping', (req, res) => res.send('SERVER_IS_LIVE'));

app.post('/api/send', async (req, res) => {
    const { userId, phone, message } = req.body;
    if (!sessions[userId]?.isReady) return res.status(403).json({ error: 'غير متصل' });

    try {
        const jid = phone.toString().replace(/\D/g, '') + '@s.whatsapp.net';
        await sessions[userId].sock.sendMessage(jid, { text: message });
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: err.toString() }); }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`>>> WHATSAPP SERVER READY ON PORT ${PORT} <<<`);
    
    // تشغيل الجلسات الموجودة بدون تكرار
    if (fs.existsSync(AUTH_FOLDER)) {
        const uniqueIds = new Set();
        fs.readdirSync(AUTH_FOLDER).forEach(file => {
            const fullPath = path.join(AUTH_FOLDER, file);
            if (fs.lstatSync(fullPath).isDirectory()) {
                const cleanId = file.replace('session-', '');
                uniqueIds.add(cleanId);
            }
        });
        uniqueIds.forEach(id => startWASession(id));
    }
});
