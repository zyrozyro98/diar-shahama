const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const pino = require('pino');
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestWaWebVersion, downloadMediaMessage, jidNormalizedUser } = require('@whiskeysockets/baileys');
const path = require('path');
const fs = require('fs');
const https = require('https');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
    allowEIO3: true
});

const sessions = {};
const log = pino({ level: 'error' });

// Firebase Admin SDK Configuration
const admin = require('firebase-admin');

let serviceAccount;

// Logic to find a service account file
const possibleFiles = [
    './onecar1-adminsdk.json',
    './diar-shahama-1088b-firebase-adminsdk-fbsvc-4aa115b2a1.json',
    '../whatsapp-server-adminsdk.json'
];

try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        console.log("Firebase Admin initialized via environment variable.");
    } else {
        const filePath = possibleFiles.find(f => fs.existsSync(path.join(__dirname, f)));
        if (filePath) {
            serviceAccount = require(filePath);
            console.log(`Firebase Admin initialized via file: ${filePath}`);
        } else {
            throw new Error("لم يتم العثور على ملف Service Account (JSON). يرجى التأكد من وجود الملف في مجلد whatsapp-server");
        }
    }

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://onecar1-default-rtdb.firebaseio.com"
    });
} catch (err) {
    console.error("CRITICAL ERROR: Failed to initialize Firebase Admin:", err.message);
    process.exit(1);
}

const db = admin.database();

async function updateFirebaseStatus(userId, status, metadata = {}) {
    try {
        const ref = db.ref(`whatsapp_settings/${userId}`);
        await ref.update({
            status: status,
            lastUpdated: admin.database.ServerValue.TIMESTAMP,
            ...metadata
        });
        console.log(`[Firebase Sync] Status updated to: ${status} for user: ${userId}`);
    } catch (err) {
        console.error('[Firebase Sync] Error updating status:', err.message);
    }
}

// Global Error Handlers
process.on('uncaughtException', (err) => {
    console.error('CRITICAL: Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('CRITICAL: Unhandled Rejection at:', promise, 'reason:', reason);
});

// Function to convert LID to real phone JID to avoid duplicate chats for the same customer
function resolveLidToJid(store, jidOrLid) {
    if (!jidOrLid || !jidOrLid.includes('@lid')) return jidOrLid;
    if (store && store.contacts) {
        // Direct match if the contact ID is the LID but contains PN
        const c = store.contacts[jidOrLid];
        if (c && c.pn) return jidNormalizedUser(`${c.pn}@s.whatsapp.net`);

        // Scan all contacts for LID mapping
        for (const jid in store.contacts) {
            const contact = store.contacts[jid];
            if (contact.lid === jidOrLid || jid === jidOrLid) {
                if (jid.includes('@s.whatsapp.net')) {
                    return jidNormalizedUser(jid);
                }
                if (contact.pn) {
                    return jidNormalizedUser(`${contact.pn}@s.whatsapp.net`);
                }
            }
        }
    }
    return jidOrLid; // fallback
}

async function clearSession(userId) {
    const authFolder = path.join(__dirname, 'auth_info_baileys', `session-${userId}`);
    if (sessions[userId]) {
        if (sessions[userId].intervalId) clearInterval(sessions[userId].intervalId);
        if (sessions[userId].sock) {
            try { sessions[userId].sock.ws.close(); } catch (err) { }
        }
        delete sessions[userId];
    }
    try {
        if (fs.existsSync(authFolder)) {
            console.log(`[Session: ${userId}] Removing session folder: ${authFolder}`);
            fs.rmSync(authFolder, { recursive: true, force: true });
        }
    } catch (e) {
        console.error(`[Session: ${userId}] Error removing session folder:`, e);
    }
}

async function startWASession(userId) {
    if (sessions[userId] && sessions[userId].isReady) {
        io.emit('ready', { userId, msg: 'متصل مسبقاً' });
        return;
    }

    const authFolder = path.join(__dirname, 'auth_info_baileys', `session-${userId}`);
    if (!fs.existsSync(authFolder)) fs.mkdirSync(authFolder, { recursive: true });

    const { state, saveCreds } = await useMultiFileAuthState(authFolder);
    const { version } = await fetchLatestWaWebVersion().catch(() => ({ version: [2, 3000, 1015901307] }));

    const sock = makeWASocket({
        version,
        logger: log,
        auth: state,
        syncFullHistory: true,
        connectTimeoutMs: 60000,
        keepAliveIntervalMs: 10000,
        printQRInTerminal: false,
        browser: ['Diar-Shahama', 'Chrome', '1.0.0']
    });

    const storePath = path.join(__dirname, 'auth_info_baileys', `store-${userId}.json`);

    const migrateMessages = (lid, jid) => {
        if (!lid || !jid || lid === jid) return;
        const store = sessions[userId]?.store;
        if (store && store.messages[lid]) {
            console.log(`[Store: ${userId}] Migrating messages from ${lid} to ${jid}`);
            if (!store.messages[jid]) store.messages[jid] = { array: [] };
            const combined = [...store.messages[lid].array, ...store.messages[jid].array];
            const unique = Array.from(new Map(combined.map(m => [m.key.id, m])).values());
            unique.sort((a, b) => (a.messageTimestamp || 0) - (b.messageTimestamp || 0));
            store.messages[jid].array = unique.slice(-500);
            delete store.messages[lid];

            // Notify frontend to merge/update
            io.emit('jid_resolved', { userId, oldJid: lid, newJid: jid });
        }
    };

    const store = {
        messages: {},
        contacts: {},
        writeToFile: function () {
            try {
                const toSave = { messages: {}, contacts: this.contacts };
                for (const jid in this.messages) {
                    toSave.messages[jid] = this.messages[jid].array;
                }
                fs.writeFileSync(storePath, JSON.stringify(toSave));
            } catch (e) { }
        },
        readFromFile: function () {
            try {
                if (fs.existsSync(storePath)) {
                    const parsed = JSON.parse(fs.readFileSync(storePath));
                    this.contacts = parsed.contacts || {};
                    for (const jid in parsed.messages) {
                        this.messages[jid] = { array: parsed.messages[jid] || [] };
                    }
                }
            } catch (e) { }
        },
        bind: function (ev) {
            ev.on('contacts.upsert', (contacts) => {
                for (const contact of contacts) {
                    this.contacts[contact.id] = contact;
                    if (contact.lid && contact.id.includes('@s.whatsapp.net')) {
                        migrateMessages(jidNormalizedUser(contact.lid), jidNormalizedUser(contact.id));
                    } else if (contact.pn && contact.id.includes('@lid')) {
                        migrateMessages(jidNormalizedUser(contact.id), jidNormalizedUser(`${contact.pn}@s.whatsapp.net`));
                    }
                }
            });


            ev.on('messages.upsert', (m) => {
                try {
                    if (m.type === 'notify' || m.type === 'append') {
                        for (const msg of m.messages) {
                            const rawJid = msg.key.remoteJid;
                            if (!rawJid) continue;

                            // FORCE RESOLUTION BEFORE STORING
                            let jid = jidNormalizedUser(rawJid);
                            if (jid.includes('@lid')) {
                                jid = resolveLidToJid(this, jid);
                            }

                            if (!this.messages[jid]) this.messages[jid] = { array: [] };

                            const existingIdx = this.messages[jid].array.findIndex(x => x.key.id === msg.key.id);
                            if (existingIdx !== -1) {
                                this.messages[jid].array[existingIdx] = msg;
                            } else {
                                this.messages[jid].array.push(msg);
                            }

                            if (this.messages[jid].array.length > 500) this.messages[jid].array.shift();
                        }
                    }
                } catch (err) {
                    console.error('[Store Upsert Error]', err);
                }
            });
            ev.on('messages.update', (updates) => {
                for (const update of updates) {
                    const rawJid = update.key.remoteJid;
                    if (!rawJid) continue;
                    const jid = resolveLidToJid(this, jidNormalizedUser(rawJid));
                    if (!this.messages[jid]) continue;
                    const msgToUpdate = this.messages[jid].array.find(m => m.key.id === update.key.id);
                    if (msgToUpdate) {
                        if (update.update.status !== undefined) {
                            msgToUpdate.status = update.update.status;
                        }
                    }
                }
            });
            ev.on('messaging-history.set', ({ messages, contacts }) => {
                if (contacts) {
                    for (const contact of contacts) {
                        this.contacts[contact.id] = contact;
                        if (contact.lid && contact.id.includes('@s.whatsapp.net')) {
                            migrateMessages(jidNormalizedUser(contact.lid), jidNormalizedUser(contact.id));
                        } else if (contact.pn && contact.id.includes('@lid')) {
                            migrateMessages(jidNormalizedUser(contact.id), jidNormalizedUser(`${contact.pn}@s.whatsapp.net`));
                        }
                    }
                }
                const msgs = messages || [];
                for (const msg of msgs) {
                    const rawJid = msg.key.remoteJid;
                    if (!rawJid) continue;
                    const jid = resolveLidToJid(this, jidNormalizedUser(rawJid));
                    if (!this.messages[jid]) this.messages[jid] = { array: [] };
                    if (!this.messages[jid].array.some(m => m.key.id === msg.key.id)) {
                        this.messages[jid].array.push(msg);
                    }
                }
                for (const jid in this.messages) {
                    this.messages[jid].array.sort((a, b) => (a.messageTimestamp || 0) - (b.messageTimestamp || 0));
                    if (this.messages[jid].array.length > 500) {
                        this.messages[jid].array = this.messages[jid].array.slice(-500);
                    }
                }
            });
        }
    };
    store.readFromFile();
    store.bind(sock.ev);

    if (sessions[userId] && sessions[userId].intervalId) {
        clearInterval(sessions[userId].intervalId);
    }

    const intervalId = setInterval(() => {
        if (sessions[userId]?.store && typeof sessions[userId].store.writeToFile === 'function') {
            try { sessions[userId].store.writeToFile(storePath); } catch (e) { }
        }
    }, 10000);

    sessions[userId] = { sock, isReady: false, store, initializing: true, intervalId, lastQr: null };

    // Enhanced Connection Logging
    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log(`[Session: ${userId}] New QR Code generated`);
            sessions[userId].lastQr = { userId, qr };
            io.emit('qr', sessions[userId].lastQr);
        }

        if (connection === 'close') {
            const statusCode = (lastDisconnect?.error)?.output?.statusCode;
            const errorMsg = lastDisconnect?.error?.message || 'Unknown error';
            console.error(`[Session: ${userId}] Connection closed. Status: ${statusCode}, Reason: ${errorMsg}`);

            const isLogout = statusCode === DisconnectReason.loggedOut || statusCode === 405 || statusCode === 401;

            if (!isLogout) {
                console.log(`[Session: ${userId}] Attempting to reconnect in 5s...`);
                setTimeout(() => {
                    if (!sessions[userId] || !sessions[userId].isReady) {
                        startWASession(userId);
                    }
                }, 5000);
            } else {
                console.warn(`[Session: ${userId}] Permanent disconnect (Logout). Clearing session.`);
                await updateFirebaseStatus(userId, 'disconnected');
                await clearSession(userId);
                io.emit('disconnected', { userId, msg: 'تم تسجيل الخروج أو جلسة تالفة.' });
            }
        } else if (connection === 'open') {
            console.log(`[Session: ${userId}] WhatsApp session is OPEN and READY`);
            await updateFirebaseStatus(userId, 'ready', {
                phoneNumber: sock.user.id.split(':')[0],
                pushName: sock.user.name
            });
            sessions[userId].isReady = true;
            sessions[userId].initializing = false;
            sessions[userId].lastQr = null;
            io.emit('ready', { userId, msg: 'متصل بنجاح' });

            // Fetch contacts to help LID resolution
            try {
                const contacts = await sock.fetchStatus(sock.user.id);
                // This is just to trigger some activity, baileys usually syncs automatically.
            } catch (e) { }
        }
    });

    sock.ev.on('creds.update', async () => {

        try {
            await saveCreds();
        } catch (err) {
            console.error(`[Session: ${userId}] Failed to save credentials:`, err);
        }
    });

    sock.ev.on('messages.upsert', (m) => {
        try {
            if (m.type === 'notify') {
                for (const msg of m.messages) {
                    if (msg.message) {
                        let rawJid = msg.key.remoteJid || '';
                        let fromJid = jidNormalizedUser(rawJid);

                        // Convert LID to JID if present, to merge chats correctly
                        if (fromJid.includes('@lid')) {
                            fromJid = resolveLidToJid(sessions[userId]?.store, fromJid);
                        }

                        console.log(`[Session: ${userId}] Incoming message detected - Final JID: ${fromJid} (Raw: ${rawJid})`);

                        let body = msg.message.conversation || msg.message.extendedTextMessage?.text;
                        if (!body) {
                            const msgType = Object.keys(msg.message)[0];
                            if (msgType?.includes('image')) body = '📷 صورة';
                            else if (msgType?.includes('video')) body = '🎥 فيديو';
                            else if (msgType?.includes('audio')) body = '🎵 مقطع صوتي';
                            else if (msgType?.includes('document')) body = '📄 ملف';
                            else body = '📩 رسالة جديدة (وسائط/ملصق)';
                        }

                        io.emit('message', {
                            userId: userId,
                            from: fromJid,
                            body: body,
                            timestamp: msg.messageTimestamp,
                            isMe: msg.key.fromMe
                        });
                    }
                }
            }
        } catch (err) {
            console.error(`[Session: ${userId}] Error in messages.upsert:`, err);
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
            if (sessions[userId].lastQr) socket.emit('qr', sessions[userId].lastQr);
            return;
        }
        await startWASession(userId);
    });

    socket.on('logout_session', async ({ userId }) => {
        if (sessions[userId]?.sock) {
            try { await sessions[userId].sock.logout(); } catch (e) { }
            await updateFirebaseStatus(userId, 'disconnected');
            await clearSession(userId);
        }
    });
});

app.get('/ping', (req, res) => res.send('Codespace is ALIVE'));
app.get('/health', (req, res) => {
    res.json({
        status: 'UP',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        sessions: Object.keys(sessions).length
    });
});

app.post('/api/send', async (req, res) => {
    const { userId, phone, message, media } = req.body;
    if (!userId || !sessions[userId]?.isReady) return res.status(403).json({ error: 'غير متصل' });

    try {
        let jid;
        if (phone.includes('@')) {
            jid = resolveLidToJid(sessions[userId]?.store, jidNormalizedUser(phone));
        } else {
            let formattedPhone = phone.replace(/\D/g, '');
            // Handle cases like 96605... or 96707...
            if (formattedPhone.startsWith('9660')) formattedPhone = '966' + formattedPhone.substring(4);
            else if (formattedPhone.startsWith('9670')) formattedPhone = '967' + formattedPhone.substring(4);

            if (formattedPhone.startsWith('966') || formattedPhone.startsWith('967')) {
                // Keep as is
            } else if (formattedPhone.startsWith('05')) {
                formattedPhone = '966' + formattedPhone.substring(1);
            } else if (formattedPhone.startsWith('07')) {
                formattedPhone = '967' + formattedPhone.substring(1);
            } else if (formattedPhone.startsWith('0')) {
                formattedPhone = '966' + formattedPhone.substring(1);
            } else if (formattedPhone.length === 9) {
                if (formattedPhone.startsWith('7')) formattedPhone = '967' + formattedPhone;
                else if (formattedPhone.startsWith('5')) formattedPhone = '966' + formattedPhone;
            }
            jid = resolveLidToJid(sessions[userId]?.store, jidNormalizedUser(formattedPhone + '@s.whatsapp.net'));
        }
        console.log(`[Session: ${userId}] Targeting JID: ${jid}`);

        let sendContent;
        if (media && media.data) {
            const buffer = Buffer.from(media.data, 'base64');
            if (media.mimetype.startsWith('image/')) {
                sendContent = { image: buffer, caption: message || '' };
            } else if (media.mimetype.startsWith('video/')) {
                sendContent = { video: buffer, caption: message || '' };
            } else if (media.mimetype.startsWith('audio/')) {
                sendContent = { audio: buffer, mimetype: media.mimetype, ptt: true };
            } else {
                sendContent = { document: buffer, mimetype: media.mimetype, fileName: media.filename || 'وثيقة', caption: message || '' };
            }
        } else {
            sendContent = { text: message };
        }

        // Humanized sending: Typing indicator and random delay
        await sessions[userId].sock.sendPresenceUpdate('composing', jid);
        const randomDelay = Math.floor(Math.random() * 2000) + 1000; // 1-3 seconds
        await new Promise(resolve => setTimeout(resolve, randomDelay));
        await sessions[userId].sock.sendPresenceUpdate('paused', jid);

        const sentMsg = await sessions[userId].sock.sendMessage(jid, sendContent);

        // Manually push to store immediately so next fetch sees it instantly
        if (sentMsg && sessions[userId]?.store?.messages) {
            if (!sessions[userId].store.messages[jid]) {
                sessions[userId].store.messages[jid] = { array: [] };
            }
            if (!sessions[userId].store.messages[jid].array.some(m => m.key.id === sentMsg.key.id)) {
                sessions[userId].store.messages[jid].array.push(sentMsg);
            }
            // Cache local media instantly
            if (media && media.data) {
                sentMsg.localMediaData = media.data;
            }
        }

        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: err.toString() }); }
});

app.get('/api/chat/:userId/:phone', async (req, res) => {
    const { userId, phone: rawPhone } = req.params;
    if (!userId || !sessions[userId]?.isReady) return res.json({ messages: [] });

    let rawJid;
    if (rawPhone.includes('@')) {
        rawJid = rawPhone;
    } else {
        let formattedPhone = rawPhone.replace(/\D/g, '');
        if (formattedPhone.startsWith('9660')) formattedPhone = '966' + formattedPhone.substring(4);
        else if (formattedPhone.startsWith('9670')) formattedPhone = '967' + formattedPhone.substring(4);

        if (formattedPhone.startsWith('966') || formattedPhone.startsWith('967')) { /* ok */ }
        else if (formattedPhone.startsWith('05')) formattedPhone = '966' + formattedPhone.substring(1);
        else if (formattedPhone.startsWith('07')) formattedPhone = '967' + formattedPhone.substring(1);
        else if (formattedPhone.startsWith('0')) formattedPhone = '966' + formattedPhone.substring(1);
        rawJid = formattedPhone + '@s.whatsapp.net';
    }
    let jid = jidNormalizedUser(rawJid);
    if (jid.includes('@lid')) {
        jid = resolveLidToJid(sessions[userId]?.store, jid);
    }

    let dbMsgs = [];
    try {
        dbMsgs = sessions[userId]?.store?.messages[jid]?.array || [];
    } catch (err) { }

    const extractMessageContent = (msgObj) => {
        if (!msgObj) return null;
        if (msgObj.ephemeralMessage) return extractMessageContent(msgObj.ephemeralMessage.message);
        if (msgObj.viewOnceMessage) return extractMessageContent(msgObj.viewOnceMessage.message);
        if (msgObj.viewOnceMessageV2) return extractMessageContent(msgObj.viewOnceMessageV2.message);
        if (msgObj.viewOnceMessageV2Extension) return extractMessageContent(msgObj.viewOnceMessageV2Extension.message);
        if (msgObj.documentWithCaptionMessage) return extractMessageContent(msgObj.documentWithCaptionMessage.message);
        return msgObj;
    };

    const parsedMessages = await Promise.all(dbMsgs.map(async m => {
        const actualMsg = extractMessageContent(m.message);
        let body = actualMsg?.conversation || actualMsg?.extendedTextMessage?.text || '';
        let media = null;

        if (actualMsg) {
            const msgType = Object.keys(actualMsg).find(k => k.endsWith('Message')) || Object.keys(actualMsg)[0];
            if (msgType === 'imageMessage' || msgType === 'videoMessage' || msgType === 'audioMessage' || msgType === 'documentMessage') {
                body = actualMsg[msgType].caption || body;
                // Do NOT download media here to avoid performance issues and blue ticks
                media = {
                    data: null, // Indicates it needs to be downloaded later
                    mimetype: actualMsg[msgType].mimetype || 'application/octet-stream',
                    filename: actualMsg[msgType].fileName || 'Media',
                    messageId: m.key.id
                };
            }
        }

        return {
            id: m.key.id,
            body: body,
            timestamp: m.messageTimestamp,
            isMe: m.key.fromMe,
            status: m.status !== undefined ? m.status : undefined,
            ack: m.status !== undefined ? m.status : undefined,
            media: media,
            type: actualMsg?.audioMessage?.ptt ? 'ptt' : undefined
        };
    }));

    res.json({ messages: parsedMessages });
});

app.get('/api/media/:userId/:phone/:messageId', async (req, res) => {
    const { userId, phone: rawPhone, messageId } = req.params;
    if (!userId || !sessions[userId]?.isReady) return res.status(403).json({ error: 'Session not ready' });

    let rawJid;
    if (rawPhone.includes('@')) {
        rawJid = rawPhone;
    } else {
        let formattedPhone = rawPhone.replace(/\D/g, '');
        if (formattedPhone.startsWith('9660')) formattedPhone = '966' + formattedPhone.substring(4);
        else if (formattedPhone.startsWith('9670')) formattedPhone = '967' + formattedPhone.substring(4);

        if (formattedPhone.startsWith('966') || formattedPhone.startsWith('967')) { /* ok */ }
        else if (formattedPhone.startsWith('05')) formattedPhone = '966' + formattedPhone.substring(1);
        else if (formattedPhone.startsWith('07')) formattedPhone = '967' + formattedPhone.substring(1);
        else if (formattedPhone.startsWith('0')) formattedPhone = '966' + formattedPhone.substring(1);
        rawJid = formattedPhone + '@s.whatsapp.net';
    }
    let jid = jidNormalizedUser(rawJid);
    if (jid.includes('@lid')) {
        jid = resolveLidToJid(sessions[userId]?.store, jid);
    }

    let dbMsgs = sessions[userId]?.store?.messages[jid]?.array || [];
    const msgToDownload = dbMsgs.find(m => m.key.id === messageId);

    if (!msgToDownload || !msgToDownload.message) return res.status(404).json({ error: 'Message not found' });

    try {
        let buffer;
        if (msgToDownload.localMediaData) {
            buffer = Buffer.from(msgToDownload.localMediaData, 'base64');
        } else {
            buffer = await downloadMediaMessage(msgToDownload, 'buffer', {}, {
                logger: log,
                reuploadRequest: sessions[userId].sock.updateMediaMessage
            });
        }
        res.json({ data: buffer.toString('base64') });
    } catch (err) {
        res.status(500).json({ error: 'Failed to download' });
    }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`ULTRA_ENGINE_${PORT}_LIVE`);
    
    // Humanized Self-pinging mechanism to keep Render alive
    const RENDER_URL = process.env.RENDER_EXTERNAL_URL || process.env.PUBLIC_URL;
    if (RENDER_URL) {
        const userAgents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1'
        ];

        function startKeepAlive() {
            const randomInterval = (Math.floor(Math.random() * 8) + 6) * 60 * 1000; // 6 to 14 minutes
            const randomUA = userAgents[Math.floor(Math.random() * userAgents.length)];
            const randomPath = `/ping?v=${Math.random().toString(36).substring(7)}`;

            setTimeout(() => {
                const options = {
                    headers: { 'User-Agent': randomUA }
                };
                https.get(`${RENDER_URL}${randomPath}`, options, (res) => {
                    console.log(`[Keep-Alive] Humanized ping sent: ${randomPath} - Status: ${res.statusCode}`);
                    startKeepAlive(); // Schedule next ping
                }).on('error', (err) => {
                    console.error(`[Keep-Alive] Ping failed:`, err.message);
                    setTimeout(startKeepAlive, 60000); // Retry in 1 minute
                });
            }, randomInterval);
        }

        console.log(`[Keep-Alive] Starting stealth self-ping system for: ${RENDER_URL}`);
        startKeepAlive();
    }
});
