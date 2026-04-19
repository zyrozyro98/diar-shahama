const fs = require('fs');
let code = fs.readFileSync('src/main.js', 'utf8');

const target = `  } else if (type === "users") {
    fields = [
      { name: "name", label: "الاسم الكامل", type: "text" },
      { name: "email", label: "البريد الإلكتروني", type: "text" },
      { name: "role", label: "الصلاحية", type: "select", options: [{ v: "staff", t: "موظف" }, { v: "supervisor", t: "مشرف" }, { v: "admin", t: "مدير" }] },
      { name: "isAvailable", label: "متاح لاستلام الطلبات؟", type: "select", options: [{ v: true, t: "نعم" }, { v: false, t: "لا" }] }
    ];`;

const replacement = `  } else if (type === "users") {
    fields = [
      { name: "name", label: "الاسم الكامل", type: "text" },
      { name: "email", label: "البريد الإلكتروني", type: "text" },
      { name: "password", label: "كلمة المرور (اختياري عند التعديل)", type: "password" },
      { name: "role", label: "الصلاحية", type: "select", options: [{ v: "staff", t: "موظف" }, { v: "supervisor", t: "مشرف" }, { v: "admin", t: "مدير" }] },
      { name: "isAvailable", label: "متاح لاستلام الطلبات؟", type: "select", options: [{ v: true, t: "نعم" }, { v: false, t: "لا" }] }
    ];`;

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('src/main.js', code, 'utf8');
    console.log('Successfully added password field.');
} else {
    console.log('Target block not found. Trying flexible replacement...');
    // Try finding by just the fields list start
    const start = 'fields = [\n      { name: "name", label: "الاسم الكامل", type: "text" },\n      { name: "email", label: "البريد الإلكتروني", type: "text" },';
    if (code.includes(start)) {
        code = code.replace(start, start + '\n      { name: "password", label: "كلمة المرور (اختياري عند التعديل)", type: "password" },');
        fs.writeFileSync('src/main.js', code, 'utf8');
        console.log('Successfully patched password field via fallback.');
    } else {
        console.log('Could not find target block even with fallback.');
    }
}
