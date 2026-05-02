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
        console.log(`Started at line ${i + 1}`);
        continue;
    }
    if (started) {
        const opens = (line.match(/<div/g) || []).length;
        const closes = (line.match(/<\/div>/g) || []).length;
        depth += opens - closes;
        if (depth <= 0) {
            console.log(`Closed at line ${i + 1} (Depth: ${depth})`);
            break;
        }
    }
}
if (depth > 0) console.log(`Not closed! Remaining depth: ${depth}`);
