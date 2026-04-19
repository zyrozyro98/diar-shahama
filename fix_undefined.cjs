const fs = require('fs');
let code = fs.readFileSync('src/main.js', 'utf8');

// Replace all `?.value,` with `?.value || "",` but ONLY inside `const s = {` in `saveAppSettings`
// It's safer to just replace it generally where it looks like field: document.getElementById(...)?.value,
code = code.replace(/(\w+):\s*document\.getElementById\("([^"]+)"\)\?\.value,/g, '$1: document.getElementById("$2")?.value || "",');

fs.writeFileSync('src/main.js', code, 'utf8');
console.log('Fixed undefined elements safely.');
