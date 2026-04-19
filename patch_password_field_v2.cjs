const fs = require('fs');
let code = fs.readFileSync('src/main.js', 'utf8');

// Use regex to find the users group in renderDynamicForm
const regex = /else if \(type === "users"\) \{\s*fields = \[\s*\{ name: "name", label: "الاسم الكامل", type: "text" \},\s*\{ name: "email", label: "البريد الإلكتروني", type: "text" \},/g;

if (regex.test(code)) {
    code = code.replace(regex, (match) => match + '\n      { name: "password", label: "كلمة المرور (اختياري عند التعديل)", type: "password" },');
    fs.writeFileSync('src/main.js', code, 'utf8');
    console.log('Successfully patched password field using regex.');
} else {
    console.log('Regex did not match.');
}
