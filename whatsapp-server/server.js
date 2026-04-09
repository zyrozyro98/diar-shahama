const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestWaWebVersion } = require('@whiskeysockets/baileys');
const pino = require('pino');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    },
    allowEIO3: true
});

const sessions = {};
const log = pino({ level: 'error' });

async function clearSession(userId) {
    const authFolder = path.join(__dirname, 'auth_info_baileys', `session-${userId}`);
    if (sessions[userId]) {
        if (sessions[userId].intervalId) clearInterval(sessions[userId].intervalId);
        if (sessions[userId].sock) {
            try { sessions[userId].sock.ws.close(); } catch (err) { }
        }
        delete sessions[userId];
    }
    try { if (fs.existsSync(authFolder)) fs.rmSync(authFolder, { recursive: true, force: true }); } catch (e) { }
}

async function startWASession(userId) {
    if (sessions[userId] && sessions[userId].isReady) {
        console.log(`[${userId}] Session already active.`);
        io.emit('ready', { userId, msg: 'متصل مسبقاً' });
        return;
    }

    console.log(`[${userId}] Creating Auth State...`);
    const authFolder = path.join(__dirname, 'auth_info_baileys', `session-${userId}`);
    if (!fs.existsSync(authFolder)) fs.mkdirSync(authFolder, { recursive: true });

    const { state, saveCreds } = await useMultiFileAuthState(authFolder);

    const { version, isLatest } = await fetchLatestWaWebVersion().catch(() => ({ version: [2, 3000, 1015901307], isLatest: false }));
    console.log(`[${userId}] Using WA v${version.join('.')}, isLatest: ${isLatest}`);

    console.log(`[${userId}] Initializing Socket...`);
    const sock = makeWASocket({
        version,
        logger: log,
        auth: state,
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 10000,
        printQRInTerminal: false,
        browser: ['Diar-Shahama', 'Chrome', '1.0.0']
    });

    let store;
    const storePath = path.join(__dirname, 'auth_info_baileys', `store-${userId}.json`);

    // Custom robust message store to guarantee chat history
    store = {
        messages: {},
        writeToFile: function () {
            try {
                const toSave = {};
                for (const jid in this.messages) {
                    toSave[jid] = this.messages[jid].array;
                }
                fs.writeFileSync(storePath, JSON.stringify(toSave));
            } catch (e) { }
        },
        readFromFile: function () {
            try {
                if (fs.existsSync(storePath)) {
                    const parsed = JSON.parse(fs.readFileSync(storePath));
                    for (const jid in parsed) {
                        this.messages[jid] = { array: parsed[jid] || [] };
                    }
                }
            } catch (e) { }
        },
        bind: function (ev) {
            ev.on('messages.upsert', (m) => {
                if (m.type === 'notify' || m.type === 'append') {
                    for (const msg of m.messages) {
                        const jid = msg.key.remoteJid;
                        if (!jid) continue;
                        if (!this.messages[jid]) this.messages[jid] = { array: [] };
                        this.messages[jid].array.push(msg);
                        if (this.messages[jid].array.length > 100) this.messages[jid].array.shift();
                    }
                }
            });
        }
    };
    store.readFromFile();
    store.bind(sock.ev);

    // Clean up any existing interval to prevent memory leaks
    if (sessions[userId] && sessions[userId].intervalId) {
        clearInterval(sessions[userId].intervalId);
    }

    const intervalId = setInterval(() => {
        if (sessions[userId]?.store && typeof sessions[userId].store.writeToFile === 'function') {
            try { sessions[userId].store.writeToFile(storePath); } catch (e) { }
        }
    }, 10000);

    sessions[userId] = { sock, isReady: false, store, initializing: true, intervalId, lastQr: null };

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log(`[${userId}] QR Code Received!`);
            sessions[userId].lastQr = { userId, qr };
            io.emit('qr', sessions[userId].lastQr);
        }

        if (connection === 'close') {
            const statusCode = (lastDisconnect?.error)?.output?.statusCode;
            const isLogout = statusCode === DisconnectReason.loggedOut || statusCode === 405 || statusCode === 401;
            const shouldReconnect = !isLogout;

            console.log(`[${userId}] Connection closed. Status: ${statusCode}. Reconnecting: ${shouldReconnect}`);

            if (shouldReconnect) {
                console.log(`[${userId}] Reconnecting in 5s...`);
                setTimeout(() => startWASession(userId), 5000);
            } else {
                console.log(`[${userId}] Permanent failure or logout. Wiping session...`);
                await clearSession(userId);
                io.emit('disconnected', { userId, msg: 'تم تسجيل الخروج أو جلسة تالفة.' });
            }
        } else if (connection === 'open') {
            console.log(`[${userId}] Connection successful (READY)!`);
            sessions[userId].isReady = true;
            sessions[userId].initializing = false;
            sessions[userId].lastQr = null; // Clear QR cache since we are connected
            io.emit('ready', { userId, msg: 'متصل بنجاح' });
        }
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('messages.upsert', (m) => {
        if (m.type === 'notify') {
            for (const msg of m.messages) {
                if (!msg.key.fromMe && msg.message) {
                    const body = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
                    io.emit('message', {
                        userId: userId,
                        from: msg.key.remoteJid,
                        body: body,
                        timestamp: msg.messageTimestamp,
                        isMe: false
                    });
                }
            }
        }
    });
}

io.on('connection', (socket) => {
    socket.on('start_session', async ({ userId }) => {
        if (!userId) return;

        if (sessions[userId]?.isReady) {
            socket.emit('ready', { userId, msg: 'متصل بنجاح' });
            return;
        }

        if (sessions[userId]?.initializing) {
            if (sessions[userId].lastQr) {
                socket.emit('qr', sessions[userId].lastQr);
            }
            return;
        }

        await startWASession(userId);
    });

    socket.on('logout_session', async ({ userId }) => {
        if (sessions[userId]?.sock) {
            try { await sessions[userId].sock.logout(); } catch (e) { }
            await clearSession(userId);
        }
    });
});

app.get('/ping', (req, res) => res.send('Codespace is ALIVE'));

app.post('/api/send', async (req, res) => {
    const { userId, phone, message } = req.body;
    if (!userId || !sessions[userId]?.isReady) return res.status(403).json({ error: 'غير متصل' });

    try {
        let formattedPhone = phone.toString().replace(/\D/g, '');
        if (formattedPhone.startsWith('0')) formattedPhone = '966' + formattedPhone.substring(1);
        await sessions[userId].sock.sendMessage(formattedPhone + '@s.whatsapp.net', { text: message });
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: err.toString() }); }
});

app.get('/api/chat/:userId/:phone', async (req, res) => {
    const { userId, phone: rawPhone } = req.params;
    if (!userId || !sessions[userId]?.isReady) return res.json({ messages: [] });

    let formattedPhone = rawPhone.toString().replace(/\D/g, '');
    if (formattedPhone.startsWith('0')) formattedPhone = '966' + formattedPhone.substring(1);
    const jid = formattedPhone + '@s.whatsapp.net';

    let dbMsgs = [];
    try {
        dbMsgs = sessions[userId]?.store?.messages[jid]?.array || [];
    } catch (err) { }

    res.json({
        messages: dbMsgs.map(m => ({
            id: m.key.id,
            body: m.message?.conversation || m.message?.extendedTextMessage?.text || '',
            timestamp: m.messageTimestamp,
            isMe: m.key.fromMe
        }))
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`ULTRA_ENGINE_${PORT}_LIVE`);
});
