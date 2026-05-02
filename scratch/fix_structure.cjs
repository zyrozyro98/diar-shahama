const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

// Lines to remove (1-indexed)
const toRemove = [
    2578, 2579, 
    2788, 2789, 
    2792, 
    2829, 
    2862, 
    2896, 
    2904, 
    2908, 
    2957, 
    2982, 
    3002, 
    3035, 
    3037,
    3064,
    3105,
    3154,
    3176,
    3220,
    3295,
    3296,
    3298,
    3299,
    3300
];

// Note: I need to be careful about what these lines contain.
// Most are just "</div>" or "</div> <!-- ... -->"

const newLines = [];
for (let i = 0; i < lines.length; i++) {
    if (toRemove.includes(i + 1)) {
        console.log(`Removing line ${i + 1}: ${lines[i].trim()}`);
        continue;
    }
    newLines.push(lines[i]);
}

fs.writeFileSync('index.html', newLines.join('\n'));
console.log('Done.');
