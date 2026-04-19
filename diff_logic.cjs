const fs = require('fs');
const { execSync } = require('child_process');

const oldCode = execSync('git show c92a1f0:src/main.js', { encoding: 'utf8' });
const newCode = fs.readFileSync('src/main.js', 'utf8');

function stripStrings(code) {
    return code.replace(/(["'`])(?:(?=(\\?))\2.)*?\1/gs, '""');
}

fs.writeFileSync('old_stripped.js', stripStrings(oldCode));
fs.writeFileSync('new_stripped.js', stripStrings(newCode));
