const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

const tabEnds = [
    '<!-- Tab: Appearance -->',
    '<!-- Tab: Contact -->',
    '<!-- Tab: About -->',
    '<!-- Tab: Advanced -->'
];

const result = [];
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    let isTabStart = false;
    for (const t of tabEnds) {
        if (line.includes(t)) {
            isTabStart = true;
            break;
        }
    }
    
    if (isTabStart) {
        // Add a closing div for the PREVIOUS tab
        console.log(`Adding closing div before tab comment at line ${i + 1}`);
        result.push('                                            </div>');
    }
    
    result.push(line);
}

fs.writeFileSync('index.html', result.join('\n'));
console.log('Tab restructuring complete.');
