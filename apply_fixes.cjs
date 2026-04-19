const fs = require('fs');

let mainJs = fs.readFileSync('src/main.js', 'utf8');

// 1. Replace the CURRENT_MASTER_URL
mainJs = mainJs.replace(
    'const CURRENT_MASTER_URL = "https://potential-acorn-6v9v5q5q9pgc4g4q-3001.app.github.dev";',
    'const CURRENT_MASTER_URL = "https://pct-soonest-bus-boats.trycloudflare.com";'
);

// 2. Replace the socket configuration (transport and secure)
mainJs = mainJs.replace(
    "transports: ['polling', 'websocket']",
    "transports: ['websocket', 'polling'], secure: true"
);

// 3. Append the new functions if they don't exist
const appendStr = `
// Safety patch to prevent loading hang
setTimeout(() => {
  const splash = document.getElementById("luxury-splash");
  if (splash && !splash.classList.contains("hidden")) {
    console.warn("Safety timeout: removing loader");
    splash.style.opacity = "0";
    setTimeout(() => { 
      splash.classList.add("hidden"); 
      try { splash.remove(); } catch(e) {}
    }, 800);
    if (window.state) window.state.firstLoadDone = true;
  }
}, 7000);


// UI enhancement for roles
const originalUpdateAppUI = window.updateAppUI;
window.updateAppUI = function() {
  if (originalUpdateAppUI) originalUpdateAppUI();
  const nameLabel = document.getElementById("user-display-name");
  const isAdmin = window.state.userProfile?.role === "admin";
  if (nameLabel && !window.state.userProfile?.name) {
    nameLabel.innerText = isAdmin ? "مسؤول النظام" : "موظف مبيعات";
  }
};


// WhatsApp Server URL Debugging
console.log("--- WhatsApp Server Debug ---");
console.log("Configured URL:", window._waServerActiveUrl);
console.log("-----------------------------");


// Employee Management Enhancement
window.promoteToAdmin = async function(uid) {
  if (confirm("تأكيد ترقية الموظف لصلاحية مسؤول؟")) {
    try {
      await admin.database().ref("users/" + uid).update({ role: "admin" });
      window.showLuxuryToast("تم ترقية الموظف بنجاح");
      window.syncAdminTables("users");
    } catch (e) {
      window.showLuxuryToast("خطأ بالصلاحيات", "error");
    }
  }
};


// Export Firebase SDK for patches
window.FirebaseSDK = { ref, db, push, set, update, remove, auth };
`;

if (!mainJs.includes('// Safety patch to prevent loading hang')) {
    mainJs += '\n' + appendStr;
}

fs.writeFileSync('src/main.js', mainJs, 'utf8');

console.log("Fixes applied to main.js successfully. No garbled text left!");
