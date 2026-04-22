const fs = require('fs');
const path = 'src/main.js';
let content = fs.readFileSync(path, 'utf8');

const replacement = `window.toggleSound = function () {
  window.state.soundEnabled = !window.state.soundEnabled;
  localStorage.setItem("luxury_sound_enabled", window.state.soundEnabled);
  
  const icon = document.getElementById("header-sound-icon");
  if (icon) {
    icon.className = window.state.soundEnabled ? "fas fa-volume-up" : "fas fa-volume-mute";
    icon.style.color = window.state.soundEnabled ? "" : "var(--danger)";
  }
  
  window.showLuxuryToast(window.state.soundEnabled ? "تم تفعيل التنبيهات الصوتية" : "تم كتم التنبيهات الصوتية");
};`;

content = content.replace(/window\.toggleSound\s*=\s*function\s*\(\)\s*\{[\s\S]*?window\.showLuxuryToast.*?;\n\};?/, replacement);

fs.writeFileSync(path, content, 'utf8');
console.log('Script patched successfully');
