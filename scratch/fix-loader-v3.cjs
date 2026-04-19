const fs = require('fs');
const path = 'c:/Users/hp/diar_shahama/src/main.js';
let content = fs.readFileSync(path, 'utf8');

const target = 'if (s && Object.keys(s).length > 0) {';
const replacement = '// Modified to allow empty settings\n  if (s) {';

if (content.includes(target)) {
    content = content.replace(target, replacement);
    
    // Also add safety timeout after initUIListeners();
    if (content.includes('initUIListeners();')) {
        content = content.replace('initUIListeners();', 'initUIListeners();\n\n  // Safety timeout: hide loader after 6 seconds\n  setTimeout(() => {\n    if (typeof handleFirstLoad === "function") handleFirstLoad();\n  }, 6000);');
    }

    fs.writeFileSync(path, content, 'utf8');
    console.log('Successfully patched main.js');
} else {
    console.error('Could not find target string');
    process.exit(1);
}
