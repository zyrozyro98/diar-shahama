const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');
let depth = 0;
let started = false;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('<div class="dash-scroll-area">')) {
        started = true;
        depth = 1;
        continue;
    }
    if (started) {
        const opens = (line.match(/<div/g) || []).length;
        const closes = (line.match(/<\/div>/g) || []).length;
        depth += opens - closes;
        if (i + 1 >= 2490 && i + 1 <= 3040) {
             if (opens > 0 || closes > 0) {
                console.log(`${i + 1} [D=${depth}]: ${line.trim()}`);
             }
        }
    }
}
