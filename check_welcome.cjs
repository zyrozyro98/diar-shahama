const fs = require('fs');
const s = fs.readFileSync('good.js', 'utf16le');
const match = s.match(/welcome:\s*"(.*?)"/);
console.log("Welcome string:", match ? match[1] : "not found");
