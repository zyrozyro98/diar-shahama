# استخدام صورة نود بنسخة مستقرة وخفيفة
FROM node:20-slim

# تحديد مجلد العمل
WORKDIR /usr/src/app

# تثبيت الأدوات الأساسية إذا تطلب الأمر (اختياري)
RUN apt-get update && apt-get install -y git build-essential python3 && rm -rf /var/lib/apt/lists/*

# نسخ ملفات الحزم
COPY package*.json ./

# تثبيت المكتبات
RUN npm install

# نسخ ملفات المشروع
COPY . .

# فتح المنفذ
EXPOSE 3001

# تشغيل السيرفر
CMD [ "node", "server.js" ]
