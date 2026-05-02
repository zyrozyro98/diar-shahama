const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

const toRemove = new Set([
    2578, 2579, 
    3037, 
    3056, 3064, 3066, 
    3082, 3100, 3105, 3107, 
    3119, 3154, 3156, 
    3176, 3178, 
    3190, 3220, 3222, 
    3234, 3278, 3295, 3296, 3297, 3298
]);

// Final check of the tags at the very end (3297-3302)
// We want to keep exactly as many as needed to close:
// admin-modal, admin-modal-body, admin-dash, dash-main-content, dash-scroll-area, and the last pane.
// That's 6 closures.

const result = [];
for (let i = 0; i < lines.length; i++) {
    if (toRemove.has(i + 1)) {
        console.log(`Removing line ${i + 1}: ${lines[i].trim()}`);
        continue;
    }
    result.push(lines[i]);
}

fs.writeFileSync('index.html', result.join('\n'));
console.log('Fixed.');
