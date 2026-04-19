const fs = require('fs');
let code = fs.readFileSync('src/main.js', 'utf8');

// Find the line for assignedTo in bookings and expand it to include admin and supervisor
const oldLine = '{ name: "assignedTo", label: "الموظف المسؤول", type: "select", options: [{ v: "", t: "غير محدد" }, ...window.state.users.filter(u => u.role === "staff").map(u => ({ v: u.id, t: u.name || u.email }))] },';
const newLine = '{ name: "assignedTo", label: "الموظف المسؤول", type: "select", options: [{ v: "", t: "غير محدد" }, ...window.state.users.filter(u => u.role === "staff" || u.role === "admin" || u.role === "supervisor").map(u => ({ v: u.id, t: u.name || (u.role === "admin" ? "المدير: " : "المشرف: ") + (u.name || u.email) }))] },';

if (code.includes(oldLine)) {
    code = code.replace(oldLine, newLine);
    fs.writeFileSync('src/main.js', code, 'utf8');
    console.log('Successfully expanded staff assignment list.');
} else {
    console.log('Line not found. Searching for partial match...');
    if (code.includes('name: "assignedTo"') && code.includes('u.role === "staff"')) {
        // More flexible regex replacement
        code = code.replace(/\{ name: "assignedTo".*?u\.role === "staff".*?\}\s*,/g, newLine + '\n');
        fs.writeFileSync('src/main.js', code, 'utf8');
        console.log('Successfully patched with regex.');
    } else {
        console.log('Could not find assignedTo line.');
    }
}
