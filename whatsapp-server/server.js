const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const Baileys = require('@whiskeysockets/baileys');
const makeWASocket = Baileys.default || Baileys;
const { 
    useMultiFileAuthState, 
    DisconnectReason, 
    fetchLatestWaWebVersion, 
    jidDecode 
} = Baileys;

// Robust fallback for makeInMemoryStore if missing in some Baileys versions
let makeInMemoryStore = Baileys.makeInMemoryStore;
if (!makeInMemoryStore) {
    console.warn('[Session] makeInMemoryStore not found in Baileys exports. Using internal fallback.');
    makeInMemoryStore = () => ({
        messages: {},
        chats: { all: () => [], get: () => null, upsert: () => {} },
        contacts: {},
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
        },
        writeToFile: () => {},
        readFromFile: () => {}
    });
}

const pino = require('pino');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

const app = express();
app.use(express.json({ limit: '50mb' }));
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

const sessions = {};

// Clean folder on start to avoid corruption
const AUTH_FOLDER = 'auth_info_baileys';

/**
 * Robust Phone/JID Cleaner
 * Strips suffixes and returns only digits. Handles SA, Yemen, etc.
 */
function cleanPhone(id) {
    if (!id) return '';
    let raw = id.split('@')[0]; // Remove @s.whatsapp.net or @lid
    let clean = raw.replace(/\D/g, '');
    
    // Normalize leading zeros
    if (clean.startsWith('00')) clean = clean.substring(2);
    if (clean.startsWith('0')) clean = clean.substring(1);

    // Auto-detect based on mobile start digits
    if (clean.length === 9) {
        if (clean.startsWith('5')) return '966' + clean; // Saudi
        if (clean.startsWith('7')) return '967' + clean; // Yemen
    }
    
    return clean;
}

const startWASession = async (userId) => {
    if (sessions[userId]?.initializing) return;
    
    console.log(`[Session] Starting for user: ${userId}`);
    if (!sessions[userId]) sessions[userId] = { initializing: true };
    else sessions[userId].initializing = true;

    const userAuthFolder = path.join(AUTH_FOLDER, userId);
    const { state, saveCreds } = await useMultiFileAuthState(userAuthFolder);
    const { version } = await fetchLatestWaWebVersion().catch(() => ({ version: [2, 3000, 1015901307] }));

    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: false,
        logger: pino({ level: 'silent' }),
        browser: ['Diar-Shahama', 'Chrome', '1.0.0'],
        patchMessageBeforeSending: (message) => {
            const requiresPatch = !!(message.buttonsMessage || message.templateMessage || message.listMessage);
            if (requiresPatch) {
                message = {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: {
                                deviceListMetadata: {},
                                deviceListMetadataVersion: 2
                            },
                            ...message
                        }
                    }
                };
            }
            return message;
        }
    });

    const store = makeInMemoryStore({});
    store.bind(sock.ev);

    sessions[userId].sock = sock;
    sessions[userId].store = store;

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log(`[QR] Generated for ${userId}`);
            sessions[userId].lastQr = await QRCode.toDataURL(qr);
            io.emit('qr', { userId, qr: sessions[userId].lastQr });
        }

        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error instanceof Boom) ? 
                lastDisconnect.error.output?.statusCode !== DisconnectReason.loggedOut : true;
            
            console.log(`[Connection] Closed for ${userId}. Reconnecting: ${shouldReconnect}`);
            sessions[userId].initializing = false;
            sessions[userId].isReady = false;

            if (shouldReconnect) {
                startWASession(userId);
            } else {
                console.log(`[Session] Logged out: ${userId}`);
                if (fs.existsSync(userAuthFolder)) fs.rmSync(userAuthFolder, { recursive: true, force: true });
                delete sessions[userId];
                io.emit('logged_out', { userId });
            }
        } else if (connection === 'open') {
            console.log(`[Connection] OPEN for ${userId}`);
            sessions[userId].isReady = true;
            sessions[userId].initializing = false;
            sessions[userId].lastQr = null;
            io.emit('ready', { userId, msg: 'متصل بنجاح' });
        }
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('messages.upsert', async (m) => {
        if (m.type === 'notify') {
            for (const msg of m.messages) {
                if (!msg.message || msg.key.fromMe) continue;

                const fromJid = msg.key.remoteJid;
                const fromPhone = cleanPhone(fromJid);
                
                // Extract body
                const body = msg.message.conversation || 
                             msg.message.extendedTextMessage?.text || 
                             msg.message.imageMessage?.caption || 
                             (msg.message.imageMessage ? 'صورة' : '') || 
                             (msg.message.audioMessage ? 'صوت' : '') || '';

                console.log(`[Message] From: ${fromPhone} | Body: ${body.substring(0, 20)}`);

                // Emit to frontend IMMEDIATELY
                io.emit('message', {
                    userId: userId,
                    from: fromPhone,
                    fullJid: fromJid,
                    body: body,
                    timestamp: Number(msg.messageTimestamp) || Math.floor(Date.now() / 1000),
                    isMe: false
                });
            }
        }
    });
};

// Start sessions for existing folders
if (fs.existsSync(AUTH_FOLDER)) {
    fs.readdirSync(AUTH_FOLDER).forEach(folder => {
        if (fs.lstatSync(path.join(AUTH_FOLDER, folder)).isDirectory()) {
            startWASession(folder);
        }
    });
}

// REST API
app.get('/ping', (req, res) => res.send('Codespace is ALIVE'));

app.post('/api/send', async (req, res) => {
    const { userId, phone, message, media } = req.body;
    if (!userId || !sessions[userId]?.isReady) return res.status(403).json({ error: 'غير متصل' });

    try {
        const targetPhone = cleanPhone(phone.toString());
        const jid = targetPhone + '@s.whatsapp.net';
        
        let protocol;
        if (media && media.data) {
            const buffer = Buffer.from(media.data.split(',')[1], 'base64');
            if (media.mimetype.startsWith('image/')) protocol = { image: buffer, caption: message || '' };
            else if (media.mimetype.startsWith('video/')) protocol = { video: buffer, caption: message || '' };
            else if (media.mimetype.startsWith('audio/')) protocol = { audio: buffer, mimetype: media.mimetype, ptt: true };
            else protocol = { document: buffer, mimetype: media.mimetype, fileName: media.filename || 'file', caption: message || '' };
        } else {
            protocol = { text: message };
        }

        const sent = await sessions[userId].sock.sendMessage(jid, protocol);
        
        // Manual push to store for history tracking
        if (sessions[userId].store) {
            const msgArray = sessions[userId].store.messages[jid] || { array: [] };
            msgArray.array.push(sent);
            sessions[userId].store.messages[jid] = msgArray;
        }

        res.json({ success: true, message: 'Message sent', id: sent.key.id });
    } catch (err) {
        console.error('[Send Error]', err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/chat/:userId/:phone', async (req, res) => {
    const { userId, phone: rawPhone } = req.params;
    if (!userId || !sessions[userId]?.isReady) return res.json({ messages: [] });

    const targetPhone = cleanPhone(rawPhone);
    const jid = targetPhone + '@s.whatsapp.net';
    const store = sessions[userId].store;
    
    let messages = [];
    if (store && store.messages[jid]) {
        messages = store.messages[jid].array || [];
    }

    const result = messages.map(m => {
        const actual = m.message?.conversation || m.message?.extendedTextMessage?.text || m.message?.imageMessage?.caption || (m.message?.imageMessage ? 'صورة' : '') || '';
        return {
            id: m.key.id,
            body: actual,
            isMe: m.key.fromMe,
            timestamp: Number(m.messageTimestamp) || 0,
            media: !!(m.message?.imageMessage || m.message?.videoMessage || m.message?.audioMessage || m.message?.documentMessage)
        };
    });

    res.json({ messages: result });
});

io.on('connection', (socket) => {
    socket.on('start_session', ({ userId }) => {
        if (userId) startWASession(userId);
    });
    
    socket.on('logout_session', async ({ userId }) => {
        if (sessions[userId]?.sock) {
            try { await sessions[userId].sock.logout(); } catch(e){}
            const folder = path.join(AUTH_FOLDER, userId);
            if (fs.existsSync(folder)) fs.rmSync(folder, { recursive: true, force: true });
            delete sessions[userId];
            io.emit('logged_out', { userId });
        }
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`\x1b[32m%s\x1b[0m`, `>>> WHATSAPP SERVER REDESIGNED & RUNNING ON PORT ${PORT} <<<`);
});
