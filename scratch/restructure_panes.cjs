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

const result = [];
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if this line starts a new top-level pane
    let isPaneStart = false;
    for (const id of paneIds) {
        if (line.includes(`id="${id}"`) && line.includes('class="pane')) {
            isPaneStart = true;
            break;
        }
    }
    
    if (isPaneStart) {
        // Add a closing div for the PREVIOUS pane
        console.log(`Adding closing div before pane start at line ${i + 1}`);
        result.push('            </div>');
    }
    
    result.push(line);
}

// Now we need to fix the Settings tabs which are also messed up.
// Specifically, Identity tab end was missing something.

fs.writeFileSync('index.html', result.join('\n'));
console.log('Restructuring complete.');
