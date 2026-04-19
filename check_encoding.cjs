const fs = require('fs');
const s = fs.readFileSync('good.js', 'utf16le');
console.log("عميل => ", s.includes('عميل'));
console.log("ط¹ظ…ظٹظ„ => ", s.includes('ط¹ظ…ظٹظ„'));
