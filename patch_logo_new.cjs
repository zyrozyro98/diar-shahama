const fs = require('fs');
const newLogoB64 = fs.readFileSync('new_logo_b64.txt', 'utf8').trim();

// Update index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');
const oldLogoMatch = indexHtml.match(/src="(data:image\/[^;]+;base64,[^"]+)"/);
if (oldLogoMatch) {
    indexHtml = indexHtml.replace(oldLogoMatch[1], newLogoB64);
}
fs.writeFileSync('index.html', indexHtml);

console.log("Logo updated in index.html");
