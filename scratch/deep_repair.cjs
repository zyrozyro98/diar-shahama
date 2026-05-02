const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

// 1. Fix Identity Tab end (Add missing closing div for form-grid-v2)
// We'll search for the logo-upload-preview block end.
let newLines = [];
let identityFixed = false;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!identityFixed && line.includes('id="set-logo-b64"') && lines[i+4] && lines[i+4].includes('<!-- Tab: Appearance -->')) {
        // We are at the end of Identity tab.
        // Currently:
        // i+1: </div>
        // i+2: </div>
        // i+3: </div>
        // i+4: <!-- Tab: Appearance -->
        
        // We need:
        // </div> (upload-controls)
        // </div> (logo-upload-preview)
        // </div> (f-group)
        // </div> (form-grid-v2)
        // </div> (set-tab-identity)
        
        newLines.push(line);
        newLines.push(lines[i+1]);
        newLines.push(lines[i+2]);
        newLines.push(lines[i+3]);
        newLines.push('                                                </div>'); // missing form-grid-v2 close
        newLines.push('                                            </div>'); // set-tab-identity close
        i += 4; // Skip the old ones (Wait, I need to be careful with line numbers)
        newLines.push(lines[i]); // Tab: Appearance comment
        identityFixed = true;
        continue;
    }
    newLines.push(line);
}

// 2. Fix other panes (Un-nesting)
// I'll use the logic from restructure_panes.cjs but more robustly.
const finalLines = [];
const paneIds = ['notifications-mgmt', 'logs-mgmt', 'whatsapp-mgmt', 'quick-replies-mgmt', 'ai-assistant-mgmt', 'whatsapp-monitor-mgmt'];
for (let i = 0; i < newLines.length; i++) {
    const line = newLines[i];
    let isPaneStart = false;
    for (const id of paneIds) {
        if (line.includes(`id="${id}"`) && line.includes('class="pane')) {
            isPaneStart = true;
            break;
        }
    }
    if (isPaneStart) {
        // If the previous line isn't a closing div, add one.
        // But wait, the previous line might be a comment.
        if (!newLines[i-1].trim().startsWith('</div>')) {
            finalLines.push('            </div>');
        }
    }
    finalLines.push(line);
}

fs.writeFileSync('index.html', finalLines.join('\n'));
console.log('Deep repair complete.');
