const fs = require('fs');
const path = 'c:/Users/hp/diar_shahama/src/main.js';
let content = fs.readFileSync(path, 'utf8');

// Update socket options to prioritize websocket on codespaces and fix connection
const targetOld = `transports: ['polling', 'websocket']`;
const replacementNew = `transports: ['websocket', 'polling'], secure: true`;

if (content.includes(targetOld)) {
    content = content.replace(targetOld, replacementNew);
    fs.writeFileSync(path, content, 'utf8');
    console.log('Successfully updated socket options in main.js');
} else {
    console.error('Could not find target socket options');
}
