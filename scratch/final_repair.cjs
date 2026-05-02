const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

const paneIds = [
    'notifications-mgmt',
    'logs-mgmt',
    'whatsapp-mgmt',
    'quick-replies-mgmt',
    'ai-assistant-mgmt',
    'whatsapp-monitor-mgmt'
];

const tabStarts = [
    'id="set-tab-appearance"',
    'id="set-tab-contact"',
    'id="set-tab-about"',
    'id="set-tab-advanced"'
];

let result = [];
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check for pane start
    let isPaneStart = false;
    for (const id of paneIds) {
        if (line.includes(`id="${id}"`) && line.includes('class="pane')) {
            isPaneStart = true;
            break;
        }
    }
    
    if (isPaneStart) {
        // If the previous line isn't a closing div, add one for the pane
        if (!lines[i-1].trim().startsWith('</div>')) {
            result.push('            </div>');
        }
    }
    
    // Check for tab start
    let isTabStart = false;
    for (const t of tabStarts) {
        if (line.includes(t)) {
            isTabStart = true;
            break;
        }
    }
    
    if (isTabStart) {
        // Add TWO closing divs for the previous tab (one for form-grid-v2, one for set-pane)
        console.log(`Adding closures before tab start at line ${i + 1}`);
        result.push('                                                </div>');
        result.push('                                            </div>');
    }
    
    result.push(line);
}

fs.writeFileSync('index.html', result.join('\n'));
console.log('Final repair complete.');
