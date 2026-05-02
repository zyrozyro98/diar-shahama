const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

let depth = 0;
let started = false;
const extraCloses = [];

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
        
        // We want to keep depth at least 1 (dash-scroll-area) 
        // until we reach the very end of the dashboard.
        // We also want to keep settings-mgmt (depth 2) and settings-container (depth 3) 
        // open until the end of settings-mgmt.
        
        // If it's a closing tag that drops depth below what it should be:
        if (closes > 0) {
            let tempDepth = depth;
            for (let c = 0; c < closes; c++) {
                tempDepth--;
                if (tempDepth < 1 && i < 3290) { // Keep scroll area open until the very end
                    extraCloses.push(i + 1);
                    break;
                }
                // Specifically for settings area (between 2503 and 3035)
                if (i + 1 >= 2530 && i + 1 <= 3036 && tempDepth < 3) {
                     extraCloses.push(i + 1);
                     break;
                }
            }
        }
        depth += opens - closes;
    }
}

console.log('Extra closures to remove (Line numbers):', extraCloses);
