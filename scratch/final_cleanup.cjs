const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

// Specific line numbers (1-indexed) to remove, only if they are </div>
const toRemove = new Set([
    2578, 2579, // Extra at end of Identity
    2789,       // Extra in middle of Appearance
    2829,       // Extra in middle of Appearance
    2862,       // Extra in middle of Appearance
    2896,       // Extra in middle of Appearance
    2904,       // Extra in middle of Appearance
    2908,       // Extra in middle of Appearance
    2957,       // Extra at end of Appearance (Wait, 2957 dropped it to 1?)
    2982,       // Extra at end of Contact
    3002,       // Extra at end of About
    3035,       // Extra at end of Advanced
    3037,       // Extra at end of Settings
    3065,       // Extra at end of Notifications
    3106,       // Extra at end of Logs
    3155,       // Extra at end of WhatsApp MGMT
    3177,       // Extra at end of Quick Replies (Wait, 3177 was something else?)
    3221        // Extra at end of AI Assistant
]);

// Let's refine the list based on the tracker output I have
// I want to remove the ones that drop depth to 0 or -1, OR drop it below the container level.

const result = [];
for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    const line = lines[i];
    
    // Safety check: only remove if it's a </div>
    if (toRemove.has(lineNum) && line.trim().startsWith('</div>')) {
        console.log(`Removing bad closure at line ${lineNum}: ${line.trim()}`);
        continue;
    }
    result.push(line);
}

fs.writeFileSync('index.html', result.join('\n'));
console.log('Structural cleanup complete.');
