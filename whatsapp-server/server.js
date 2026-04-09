const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const Baileys = require('@whiskeysockets/baileys');
const makeWASocket = Baileys.default || Baileys;
const { useMultiFileAuthState, DisconnectReason, fetchLatestWaWebVersion, downloadMediaMessage } = Baileys;
const pino = require('pino');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { 
    cors: { origin: "*", methods: ["GET", "POST"] },
    allowEIO3: true 
});

const sessions = {};
const qrCache = {}; 
const log = pino({ level: 'error' });
const AUTH_FOLDER = path.join(__dirname, 'auth_info_baileys');

if (!fs.existsSync(AUTH_FOLDER)) fs.mkdirSync(AUTH_FOLDER, { recursive: true });

// Custom Store to keep track of messages for the API and push to Firebase
const FB_DB_URL = "https://diar-shahama-1088b-default-rtdb.firebaseio.com";

function createStore(userId) {
    const storePath = path.join(AUTH_FOLDER, `store-${userId}.json`);
    let messages = {};

    function read() {
        try {
            if (fs.existsSync(storePath)) {
                messages = JSON.parse(fs.readFileSync(storePath));
            }
        } catch (e) {}
    }

    function write() {
        try {
            fs.writeFileSync(storePath, JSON.stringify(messages));
        } catch (e) {}
    }

    read();

    return {
        messages,
        save: write,
        bind: (ev) => {
            ev.on('messages.upsert', async (m) => {
                if (m.type === 'notify' || m.type === 'append') {
                    for (const msg of m.messages) {
                        const jid = msg.key.remoteJid;
                        if (!jid || jid.includes('@g.us') || jid === 'status@broadcast') continue; // only individual chats
                        
                        // Internal Store
                        if (!messages[jid]) messages[jid] = [];
                        let existingIdx = messages[jid].findIndex(x => x.key.id === msg.key.id);
                        if (existingIdx !== -1) {
                             messages[jid][existingIdx] = msg;
                        } else {
                             messages[jid].push(msg);
                        }
                        if (messages[jid].length > 100) messages[jid].shift();
                        
                        // Push to Firebase Realtime Database
                        try {
                            const phone = jid.split('@')[0];
                            const msgId = msg.key.id;
                            
                            const isMe = !!msg.key.fromMe;
                            const timestamp = msg.messageTimestamp;
                            
                            let body = msg.message?.conversation || msg.message?.extendedTextMessage?.text || '';
                            let mediaData = null;
                            const isMedia = msg.message?.imageMessage || msg.message?.videoMessage || msg.message?.audioMessage || msg.message?.documentMessage;
                            if (isMedia && !body) {
                                if (msg.message?.imageMessage) body = '[صورة]';
                                else if (msg.message?.videoMessage) body = '[فيديو]';
                                else if (msg.message?.audioMessage) body = '[مقطع صوتي]';
                                else body = '[ملف]';
                            }
                            
                            let ack = msg.status || 1;
                            
                            const firebaseMsg = {
                                id: msgId,
                                body: body,
                                timestamp: timestamp,
                                isMe: isMe,
                                type: msg.message?.extendedTextMessage ? 'chat' : msg.message?.imageMessage ? 'image' : msg.message?.videoMessage ? 'video' : msg.message?.audioMessage ? 'ptt' : 'chat',
                                ack: ack,
                                hasMedia: !!isMedia,
                                server_secret: 'diar_wa_secret_2026'
                            };

                            const fbUrl = `${FB_DB_URL}/whatsapp/messages/${userId}/${phone}/${msgId}.json`;
                            await fetch(fbUrl, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(firebaseMsg)
                            }).catch(err => console.error("Firebase Sync Error", err));
                            
                        } catch (err) {
                            console.error("Parse/Sync error:", err);
                        }
                    }
                    write();
                }
            });
            
            // Listen for message status updates (read receipts etc)
            ev.on('messages.update', async (updates) => {
                for (const update of updates) {
                    const jid = update.key.remoteJid;
                    if (!jid || jid.includes('@g.us')) continue;
                    
                    if (messages[jid]) {
                        let targetMsg = messages[jid].find(x => x.key.id === update.key.id);
                        if (targetMsg && update.update.status) {
                            targetMsg.status = update.update.status;
                            write();
                            
                            // Update Firebase
                            const phone = jid.split('@')[0];
                            const fbUrl = `${FB_DB_URL}/whatsapp/messages/${userId}/${phone}/${update.key.id}.json`;
                            let ack = update.update.status === 4 || update.update.status === 'read' ? 3 :
                                      update.update.status === 3 || update.update.status === 'delivered' ? 2 : 1;
                            
                            fetch(fbUrl, {
                                method: 'PATCH',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ ack: ack, server_secret: 'diar_wa_secret_2026' })
                            }).catch(() => {});
                        }
                    }
                }
            });
        }
    };
}

async function startWASession(rawUserId) {
    const userId = rawUserId.toString().replace('session-', '').trim();
    
    if (sessions[userId]?.isReady) {
        io.to(userId).emit('ready', { userId, msg: 'متصل بالفعل' });
        return;
    }
    if (sessions[userId]?.initializing) return;

    console.log(`[Action] Starting WhatsApp for: ${userId}`);
    
    const userFolder = path.join(AUTH_FOLDER, `session-${userId}`);
    if (!fs.existsSync(userFolder)) fs.mkdirSync(userFolder, { recursive: true });

    const { state, saveCreds } = await useMultiFileAuthState(userFolder);
    const { version } = await fetchLatestWaWebVersion().catch(() => ({ version: [2, 3000, 1015901307] }));

    try {
        const sock = makeWASocket({
            version, 
            logger: log, 
            auth: state,
            printQRInTerminal: false,
            browser: ['Diar-Shahama (Private)', 'Chrome', '1.0.0'],
            connectTimeoutMs: 60000
        });

        const store = createStore(userId);
        store.bind(sock.ev);

        sessions[userId] = { sock, store, isReady: false, initializing: true };

        sock.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect, qr } = update;

            if (qr) {
                qrCache[userId] = qr;
                io.emit('qr', { userId, qr });
            }

            if (connection === 'close') {
                const statusCode = (lastDisconnect?.error)?.output?.statusCode;
                const shouldReconnect = statusCode !== DisconnectReason.loggedOut && statusCode !== 401;
                
                if (sessions[userId]) sessions[userId].isReady = false;
                
                // Update Firebase Status
                await fetch(`${FB_DB_URL}/whatsapp/sessions/${userId}.json`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: 'disconnected', server_secret: 'diar_wa_secret_2026', updatedAt: Date.now() })
                }).catch(()=>{});
                
                if (shouldReconnect) {
                    console.log(`[Reconnecting] ${userId}...`);
                    setTimeout(() => startWASession(userId), 5000);
                } else {
                    console.log(`[LoggedOut] ${userId}`);
                    delete sessions[userId];
                    qrCache[userId] = null;
                    io.emit('disconnected', { userId });
                }
            } else if (connection === 'open') {
                console.log(`[Ready] ${userId} is ONLINE`);
                qrCache[userId] = null;
                if (sessions[userId]) {
                    sessions[userId].isReady = true;
                    sessions[userId].initializing = false;
                }
                io.emit('ready', { userId, msg: 'متصل' });
                
                // Update Firebase Status
                await fetch(`${FB_DB_URL}/whatsapp/sessions/${userId}.json`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: 'connected', server_secret: 'diar_wa_secret_2026', updatedAt: Date.now() })
                }).catch(()=>{});
            }
        });

        sock.ev.on('creds.update', saveCreds);

        sock.ev.on('messages.upsert', (m) => {
            if (m.type === 'notify') {
                for (const msg of m.messages) {
                    if (!msg.key.fromMe && !msg.key.remoteJid.includes('@g.us') && msg.key.remoteJid !== 'status@broadcast') {
                        io.emit('message', {
                            userId,
                            from: msg.key.remoteJid,
                            body: msg.message?.conversation || msg.message?.extendedTextMessage?.text || '',
                            timestamp: msg.messageTimestamp
                        });
                    }
                }
            }
        });

    } catch (err) { 
        console.error(err);
        delete sessions[userId]; 
    }
}

io.on('connection', (socket) => {
    socket.on('join_room', (userId) => {
        const cleanId = userId.toString().replace('session-', '').trim();
        socket.join(cleanId);
        if (qrCache[cleanId]) {
            socket.emit('qr', { userId: cleanId, qr: qrCache[cleanId] });
        }
        if (sessions[cleanId]?.isReady) {
            socket.emit('ready', { userId: cleanId, msg: 'متصل' });
        }
    });

    socket.on('start_session', ({ userId }) => {
        if (userId) startWASession(userId);
    });

    socket.on('logout_session', async ({ userId }) => {
        const cleanId = userId.toString().replace('session-', '').trim();
        if (sessions[cleanId]?.sock) {
            try {
                await sessions[cleanId].sock.logout();
            } catch (e) {}
        }
    });
});

app.get('/api/status/:userId', (req, res) => {
    let { userId } = req.params;
    userId = userId.replace('session-', '').trim();
    const session = sessions[userId];
    res.json({
        exists: !!session,
        ready: !!session?.isReady,
        initializing: !!session?.initializing,
        userId: userId
    });
});

app.get('/api/media/:userId/:phone/:messageId', async (req, res) => {
    console.log(`[Media Request] User: ${req.params.userId}, Msg: ${req.params.messageId}`);
    let { userId, phone, messageId } = req.params;
    userId = userId.replace('session-', '').trim();
    if (!sessions[userId]?.isReady) return res.status(403).json({ error: 'Disconnected' });
    
    let formattedPhone = phone.replace(/\D/g, '');
    if (formattedPhone.startsWith('0')) formattedPhone = '966' + formattedPhone.substring(1);
    const jid = formattedPhone + '@s.whatsapp.net';
    
    const msg = sessions[userId].store.messages[jid]?.find(m => m.key.id === messageId);
    if (!msg) return res.status(404).json({ error: 'Message not found' });
    
    try {
        const buffer = await downloadMediaMessage(msg, 'buffer', {}, { logger: log, reuploadRequest: sessions[userId].sock.updateMediaMessage });
        res.json({ data: buffer.toString('base64') });
    } catch (err) {
        res.status(500).json({ error: err.toString() });
    }
});

app.get('/api/chat/:userId/:phone', (req, res) => {
    console.log(`[Chat Request] User: ${req.params.userId}, Phone: ${req.params.phone}`);
    let { userId, phone } = req.params;
    userId = userId.replace('session-', '').trim();
    
    if (!sessions[userId]) return res.status(404).json({ error: 'Session not found' });
    if (!sessions[userId].isReady) return res.status(403).json({ error: 'Session not ready' });

    let formattedPhone = phone.replace(/\D/g, '');
    if (formattedPhone.startsWith('0')) formattedPhone = '966' + formattedPhone.substring(1);
    const jid = formattedPhone + '@s.whatsapp.net';

    const msgs = sessions[userId].store.messages[jid] || [];
    res.json({
        messages: msgs.map(m => ({
            id: m.key.id,
            body: m.message?.conversation || m.message?.extendedTextMessage?.text || (m.message?.imageMessage ? "[صورة]" : m.message?.videoMessage ? "[فيديو]" : m.message?.audioMessage ? "[مقطع صوتي]" : ""),
            timestamp: m.messageTimestamp,
            isMe: m.key.fromMe,
            media: m.message?.imageMessage || m.message?.videoMessage || m.message?.audioMessage || m.message?.documentMessage ? { mimetype: 'unknown' } : null,
            type: m.message?.extendedTextMessage ? 'chat' : m.message?.imageMessage ? 'image' : m.message?.videoMessage ? 'video' : m.message?.audioMessage ? 'ptt' : 'chat',
            ack: m.status || 1
        }))
    });
});

app.post('/api/send', async (req, res) => {
    let { userId, phone, message, media } = req.body;
    userId = userId.replace('session-', '').trim();

    if (!sessions[userId]?.isReady) return res.status(403).json({ error: 'منقطع' });
    
    try {
        let formattedPhone = phone.replace(/\D/g, '');
        if (formattedPhone.startsWith('0')) formattedPhone = '966' + formattedPhone.substring(1);
        const jid = formattedPhone + '@s.whatsapp.net';

        if (media) {
            const buffer = Buffer.from(media.data, 'base64');
            let content = {};
            if (media.mimetype.startsWith('image/')) content = { image: buffer, caption: message };
            else if (media.mimetype.startsWith('video/')) content = { video: buffer, caption: message };
            else if (media.mimetype.startsWith('audio/')) content = { audio: buffer, ptt: !!media.ptt };
            else content = { document: buffer, mimetype: media.mimetype, fileName: media.filename, caption: message };
            
            await sessions[userId].sock.sendMessage(jid, content);
        } else {
            await sessions[userId].sock.sendMessage(jid, { text: message });
        }
        
        res.json({ success: true });
    } catch (e) { 
        res.status(500).json({ error: e.toString() }); 
    }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`>>> SERVER LIVE ON PORT ${PORT} <<<`);
    if (fs.existsSync(AUTH_FOLDER)) {
        fs.readdirSync(AUTH_FOLDER).forEach(file => {
            const folderPath = path.join(AUTH_FOLDER, file);
            if (fs.lstatSync(folderPath).isDirectory() && file.startsWith('session-')) {
                startWASession(file.replace('session-', ''));
            }
        });
    }
});
