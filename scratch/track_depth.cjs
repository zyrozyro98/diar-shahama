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
        console.log(`[${i + 1}] START: Depth 1`);
        continue;
    }
    if (started) {
        const opens = (line.match(/<div/g) || []).length;
        const closes = (line.match(/<\/div>/g) || []).length;
        depth += opens - closes;
        if (depth <= 1 && (opens > 0 || closes > 0)) {
            console.log(`[${i + 1}] Depth is now ${depth}: ${line.trim()}`);
        }
        if (depth <= 0) {
            console.log(`[${i + 1}] CLOSED: Depth 0`);
            break;
        }
    }
}
