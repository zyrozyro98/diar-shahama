const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestWaWebVersion, downloadMediaMessage } = require('@whiskeysockets/baileys');
const pino = require('pino');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"], credentials: true },
    allowEIO3: true
});

const sessions = {};
const log = pino({ level: 'error' });

// Global Error Handlers
process.on('uncaughtException', (err) => {
    console.error('CRITICAL: Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('CRITICAL: Unhandled Rejection at:', promise, 'reason:', reason);
});

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

    const store = {
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
                try {
                    if (m.type === 'notify' || m.type === 'append') {
                        for (const msg of m.messages) {
                            const jid = msg.key.remoteJid;
                            if (!jid) continue;
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
                    const jid = update.key.remoteJid;
                    if (!jid || !this.messages[jid]) continue;
                    const msgToUpdate = this.messages[jid].array.find(m => m.key.id === update.key.id);
                    if (msgToUpdate) {
                        if (update.update.status !== undefined) {
                            msgToUpdate.status = update.update.status;
                        }
                    }
                }
            });
            ev.on('messaging-history.set', ({ messages }) => {
                const msgs = messages || [];
                for (const msg of msgs) {
                    const jid = msg.key.remoteJid;
                    if (!jid) continue;
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
                    // Only start if not already managed or if session died
                    if (!sessions[userId] || !sessions[userId].isReady) {
                        startWASession(userId);
                    }
                }, 5000);
            } else {
                console.warn(`[Session: ${userId}] Permanent disconnect (Logout). Clearing session.`);
                await clearSession(userId);
                io.emit('disconnected', { userId, msg: 'تم تسجيل الخروج أو جلسة تالفة.' });
            }
        } else if (connection === 'open') {
            console.log(`[Session: ${userId}] WhatsApp session is OPEN and READY`);
            sessions[userId].isReady = true;
            sessions[userId].initializing = false;
            sessions[userId].lastQr = null;
            io.emit('ready', { userId, msg: 'متصل بنجاح' });
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
                        const fromJid = msg.key.remoteJid;
                        console.log(`[Session: ${userId}] Incoming message from JID: ${fromJid}`);
                        
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
            await clearSession(userId);
        }
    });
});

app.get('/ping', (req, res) => res.send('Codespace is ALIVE'));

app.post('/api/send', async (req, res) => {
    const { userId, phone, message, media } = req.body;
    if (!userId || !sessions[userId]?.isReady) return res.status(403).json({ error: 'غير متصل' });

    try {
        let jid;
        if (phone.includes('@')) {
            jid = phone;
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
            jid = formattedPhone + '@s.whatsapp.net';
            console.log(`[Session: ${userId}] Final JID generated: ${jid}`);
        }

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

    let formattedPhone = rawPhone.replace(/\D/g, '');
    if (formattedPhone.startsWith('9660')) formattedPhone = '966' + formattedPhone.substring(4);
    else if (formattedPhone.startsWith('9670')) formattedPhone = '967' + formattedPhone.substring(4);

    if (formattedPhone.startsWith('966') || formattedPhone.startsWith('967')) { /* ok */ }
    else if (formattedPhone.startsWith('05')) formattedPhone = '966' + formattedPhone.substring(1);
    else if (formattedPhone.startsWith('07')) formattedPhone = '967' + formattedPhone.substring(1);
    else if (formattedPhone.startsWith('0')) formattedPhone = '966' + formattedPhone.substring(1);
    const jid = formattedPhone + '@s.whatsapp.net';

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

    let formattedPhone = rawPhone.replace(/\D/g, '');
    if (formattedPhone.startsWith('9660')) formattedPhone = '966' + formattedPhone.substring(4);
    else if (formattedPhone.startsWith('9670')) formattedPhone = '967' + formattedPhone.substring(4);

    if (formattedPhone.startsWith('966') || formattedPhone.startsWith('967')) { /* ok */ }
    else if (formattedPhone.startsWith('05')) formattedPhone = '966' + formattedPhone.substring(1);
    else if (formattedPhone.startsWith('07')) formattedPhone = '967' + formattedPhone.substring(1);
    else if (formattedPhone.startsWith('0')) formattedPhone = '966' + formattedPhone.substring(1);
    const jid = formattedPhone + '@s.whatsapp.net';

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
});
