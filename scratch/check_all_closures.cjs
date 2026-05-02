const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

function checkClosure(id) {
    let depth = 0;
    let started = false;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes(`id="${id}"`)) {
            started = true;
            depth = 1;
            console.log(`Checking ${id}: Started at line ${i+1}`);
            continue;
        }
        if (started) {
            const opens = (line.match(/<div/g) || []).length;
            const closes = (line.match(/<\/div>/g) || []).length;
            depth += opens - closes;
            if (depth <= 0) {
                console.log(`Checking ${id}: Closed at line ${i+1}`);
                return;
            }
        }
    }
    if (started && depth > 0) console.log(`Checking ${id}: NOT CLOSED! Depth: ${depth}`);
}

checkClosure('set-tab-identity');
checkClosure('set-tab-appearance');
checkClosure('set-tab-contact');
checkClosure('set-tab-about');
checkClosure('set-tab-advanced');
checkClosure('settings-mgmt');
checkClosure('notifications-mgmt');
checkClosure('whatsapp-mgmt');
checkClosure('quick-replies-mgmt');
