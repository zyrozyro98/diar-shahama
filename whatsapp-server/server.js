const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const Baileys = require('@whiskeysockets/baileys');
const makeWASocket = Baileys.default || Baileys;
const { 
    useMultiFileAuthState, 
    DisconnectReason, 
    fetchLatestWaWebVersion 
} = Baileys;
const pino = require('pino');
const path = require('path');
const fs = require('fs');
const QRCode = require('qrcode');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

const sessions = {};
const log = pino({ level: 'error' });
const AUTH_FOLDER = path.join(__dirname, 'auth_info_baileys');

if (!fs.existsSync(AUTH_FOLDER)) fs.mkdirSync(AUTH_FOLDER, { recursive: true });

async function startWASession(userId) {
    if (sessions[userId]?.isReady) return;

    console.log(`[Session] Starting for: ${userId}`);
    const userFolder = path.join(AUTH_FOLDER, `session-${userId}`);
    if (!fs.existsSync(userFolder)) fs.mkdirSync(userFolder, { recursive: true });

    const { state, saveCreds } = await useMultiFileAuthState(userFolder);
    const { version } = await fetchLatestWaWebVersion().catch(() => ({ version: [2, 3000, 1015901307] }));

    const sock = makeWASocket({
        version,
        logger: log,
        auth: state,
        printQRInTerminal: false,
        browser: ['Diar-Shahama', 'Chrome', '1.0.0']
    });

    // Custom Store for history
    const store = {
        messages: {},
        bind: function(ev) {
            ev.on('messages.upsert', (m) => {
                if (m.type === 'notify') {
                    for (const msg of m.messages) {
                        const jid = msg.key.remoteJid;
                        if (!jid) continue;
                        if (!this.messages[jid]) this.messages[jid] = { array: [] };
                        this.messages[jid].array.push(msg);
                        if (this.messages[jid].array.length > 50) this.messages[jid].array.shift();
                    }
                }
            });
        }
    };
    store.bind(sock.ev);

    sessions[userId] = { sock, store, isReady: false };

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log(`[QR] Generated for ${userId}`);
            const qrImage = await QRCode.toDataURL(qr);
            // إرسال الرمز لكل المستخدمين أو لغرفة المستخدم
            io.emit('qr', { userId, qr: qrImage });
        }

        if (connection === 'close') {
            const statusCode = lastDisconnect?.error?.output?.statusCode;
            const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
            console.log(`[Session] Closed for ${userId}. Reconnecting: ${shouldReconnect}`);
            
            sessions[userId].isReady = false;
            if (shouldReconnect) setTimeout(() => startWASession(userId), 5000);
        } else if (connection === 'open') {
            console.log(`[Session] Ready for ${userId}`);
            sessions[userId].isReady = true;
            io.emit('ready', { userId, msg: 'متصل بنجاح' });
        }
    });

    sock.ev.on('creds.update', saveCreds);
}

io.on('connection', (socket) => {
    socket.on('join_room', (userId) => socket.join(userId));
    socket.on('start_session', ({ userId }) => startWASession(userId));
});

app.get('/ping', (req, res) => res.send('ALIVE'));

app.post('/api/send', async (req, res) => {
    const { userId, phone, message } = req.body;
    if (!sessions[userId]?.isReady) return res.status(403).json({ error: 'غير متصل' });

    try {
        const jid = phone.replace(/\D/g, '') + '@s.whatsapp.net';
        await sessions[userId].sock.sendMessage(jid, { text: message });
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: err.toString() }); }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`SERVER_LIVE_ON_${PORT}`);
    // بدء الجلسات تلقائياً
    fs.readdirSync(AUTH_FOLDER).forEach(file => {
        if (file.startsWith('session-')) {
            const id = file.replace('session-', '');
            startWASession(id);
        }
    });
});
