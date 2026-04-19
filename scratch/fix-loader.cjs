const fs = require('fs');
const path = 'c:/Users/hp/diar_shahama/src/main.js';
let content = fs.readFileSync(path, 'utf8');

// Regex to find handleFirstLoad function
const regex = /function\s+handleFirstLoad\(\)\s*\{[\s\S]*?if\s*\(s\s*&&\s*Object\.keys\(s\)\.length\s*>\s*0\)\s*\{[\s\S]*?\}\s*\}\s*\}/;

const newFunc = `function handleFirstLoad() {
  if (window.state.firstLoadDone) return;
  const s = window.state.settings || {};
  const isMaint = s.maintenanceMode === true;
  const isAdmin = window.state.userProfile?.role === "admin" || window.state.userProfile?.role === "supervisor";

  if (isMaint && !isAdmin) {
    const splash = document.getElementById("luxury-splash");
    if (splash) {
      splash.innerHTML = \`
            <div class="maint-content" style="text-align:center; color:white; padding: 20px;">
                <i class="fas fa-tools" style="font-size:60px; color:var(--p-red); margin-bottom:20px;"></i>
                <h1 class="luxury-font" style="margin-bottom:10px;">الموقع تحت الصيانة</h1>
                <p style="opacity:0.8;">نعمل حالياً على تحديث المنصة لتقديم تجربة أفضل، سنعود قريباً جداً.</p>
                <div style="margin-top:30px;">
                    <button class="btn-premium btn-sm" onclick="window.openModal('admin-modal')">دخول الإدارة</button>
                </div>
            </div>
          \`;
      splash.style.opacity = "1";
      splash.classList.remove("hidden");
    }
    return;
  }

  // Hide splash screen when settings are received (even if empty)
  window.state.firstLoadDone = true;
  
  setTimeout(() => {
    const splash = document.getElementById("luxury-splash");
    if (splash) {
      splash.style.opacity = "0";
      setTimeout(() => {
        splash.classList.add("hidden");
        splash.remove();
      }, 800);
    }
  }, 1000);
}`;

if (regex.test(content)) {
    content = content.replace(regex, newFunc);
    
    // Also add a safety timeout at the end of DOMContentLoaded
    if (content.includes('initUIListeners();')) {
        content = content.replace('initUIListeners();', 'initUIListeners();\n\n  // Safety timeout: hide loader after 8 seconds no matter what\n  setTimeout(() => {\n    if (!window.state.firstLoadDone) {\n      console.warn("Safety timeout triggered: forcing loader removal.");\n      handleFirstLoad();\n    }\n  }, 8000);');
    }

    fs.writeFileSync(path, content, 'utf8');
    console.log('Successfully updated main.js');
} else {
    console.error('Could not find handleFirstLoad with regex');
    // Try a simpler search
    if (content.includes('function handleFirstLoad()')) {
        console.log('Found function start, trying fallback replacement...');
        // This is riskier but might work if the regex failed due to slight variations
        const startIdx = content.indexOf('function handleFirstLoad()');
        // Find closing brace of function - very simple approach assuming standard formatting
        // In a 5MB file this might be slow or wrong if there are nested functions
    }
    process.exit(1);
}
