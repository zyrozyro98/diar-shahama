const fs = require('fs');
const code = fs.readFileSync('src/main.js', 'utf8');
const search = 'onValue(ref(db, "users"';
const idx = code.indexOf(search);
if (idx !== -1) {
    console.log(code.substring(idx, idx + 500));
} else {
    // Try single quotes
    const search2 = "onValue(ref(db, 'users'";
    const idx2 = code.indexOf(search2);
    if (idx2 !== -1) {
        console.log(code.substring(idx2, idx2 + 500));
    } else {
        console.log('Not found');
    }
}
