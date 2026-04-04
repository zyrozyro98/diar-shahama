const express = require('express');
const cors = require('cors');
const { Client, LocalAuth } = require('whatsapp-web.js');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*' }
});

// متغير لتخزين جميع جلسات الموظفين
// { "userId": { client: ClientObject, isReady: boolean } }
const sessions = {};

io.on('connection', (socket) => {
    console.log('Client connected to Socket.io', socket.id);

    // طلب بدء جلسة لموظف معين
    socket.on('start_session', ({ userId }) => {
        if (!userId) return;

        console.log(`Starting session for Staff: ${userId}`);
        
        if (sessions[userId] && sessions[userId].isReady) {
            socket.emit('ready', { userId, msg: 'تطبيق الواتساب متصل بنجاح مسبقاً!' });
            return;
        }

        // إذا كان هناك عميل سابق قيد التهيئة، نلغيه لتجنب التكرار
        if (sessions[userId] && !sessions[userId].isReady) {
            console.log(`Session ${userId} already initializing...`);
            return; 
        }

        sessions[userId] = { isReady: false, client: null };

        const client = new Client({
            authStrategy: new LocalAuth({ clientId: userId }),
            puppeteer: { 
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            }
        });

        sessions[userId].client = client;

        client.on('qr', (qr) => {
            console.log(`QR for ${userId} ready!`);
            io.emit('qr', { userId, qr });
            sessions[userId].isReady = false;
        });

        client.on('ready', () => {
            console.log(`Client for ${userId} is ready!`);
            sessions[userId].isReady = true;
            io.emit('ready', { userId, msg: 'تطبيق الواتساب متصل بنجاح!' });
        });

        client.on('authenticated', () => {
            console.log(`AUTHENTICATED for ${userId}`);
        });

        client.on('auth_failure', msg => {
            console.error(`AUTH FAILURE for ${userId}`, msg);
            sessions[userId].isReady = false;
            io.emit('auth_failure', { userId, msg: 'فشل التصديق' });
        });

        client.on('disconnected', (reason) => {
            console.log(`Client ${userId} disconnected`, reason);
            sessions[userId].isReady = false;
            sessions[userId].client = null;
            io.emit('disconnected', { userId, msg: 'تم قطع الاتصال' });
        });

        client.on('message', msg => {
            io.emit('message', {
                userId: userId,
                from: msg.from,
                body: msg.body,
                timestamp: msg.timestamp,
                isMe: false
            });
        });

        try {
            client.initialize();
        } catch(e) {
            console.log(e);
        }
    });

    // تسجيل الخروج لموظف
    socket.on('logout_session', async ({ userId }) => {
        if (sessions[userId] && sessions[userId].client) {
            try {
                await sessions[userId].client.logout();
                sessions[userId].client.destroy();
                delete sessions[userId];
                io.emit('disconnected', { userId, msg: 'تم تسجيل الخروج ومسح الجلسة.' });
            } catch(e) { console.log(e); }
        }
    });
});

// واجهة برمجية للتحقق من حالة كل الموظفين
app.get('/api/status', (req, res) => {
    let statuses = {};
    for (const user in sessions) {
        statuses[user] = sessions[user].isReady;
    }
    res.json({ statuses });
});

// إرسال رسالة
app.post('/api/send', async (req, res) => {
    const { userId, phone, message } = req.body;
    
    if (!userId || !sessions[userId] || !sessions[userId].isReady) {
        return res.status(403).json({ error: 'حساب واتساب الموظف غير متصل' });
    }
    
    if (!phone || !message) return res.status(400).json({ error: 'رقم الهاتف والرسالة مطلوبان' });

    try {
        let formattedPhone = phone.replace(/\D/g, '');
        if (formattedPhone.startsWith('0')) {
             formattedPhone = '966' + formattedPhone.substring(1); 
        }
        const chatId = formattedPhone + '@c.us';

        await sessions[userId].client.sendMessage(chatId, message);
        res.json({ success: true, message: 'تم الإرسال بنجاح' });
    } catch (err) {
        res.status(500).json({ error: 'حدث خطأ أثناء الإرسال', details: err.toString() });
    }
});

// جلب رسائل محادثة معينة
app.get('/api/chat/:userId/:phone', async (req, res) => {
    const { userId, phone: rawPhone } = req.params;

    if (!userId || !sessions[userId] || !sessions[userId].isReady) {
        return res.status(403).json({ error: 'حساب واتساب الموظف غير متصل أو لم يتم تسند الحجز' });
    }

    let phone = rawPhone;
    let formattedPhone = phone.replace(/\D/g, '');
    if (formattedPhone.startsWith('0')) {
         formattedPhone = '966' + formattedPhone.substring(1); 
    }
    const chatId = formattedPhone + '@c.us';

    try {
        const chat = await sessions[userId].client.getChatById(chatId);
        const messages = await chat.fetchMessages({ limit: 50 });
        
        const formattedMessages = messages.map(m => ({
            id: m.id._serialized,
            body: m.body,
            timestamp: m.timestamp,
            isMe: m.fromMe,
            type: m.type
        }));

        res.json({ messages: formattedMessages });
    } catch (err) {
        res.status(500).json({ error: 'حدث خطأ أو المحادثة غير موجودة' });
    }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Multi-Tenant WhatsApp Server is running on port ${PORT}`);
});
