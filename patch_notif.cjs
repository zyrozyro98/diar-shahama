const fs = require('fs');
const path = 'src/main.js';
let content = fs.readFileSync(path, 'utf8');

// 1. Logic injection
content = content.replace(
  'const notifType = item.type || "system";',
  'const notifType = item.type || "system";\n    const isAdminView = window.state.userProfile?.role === "admin" || window.state.userProfile?.role === "supervisor";\n    const staffId = item.userId || item.assignedTo;\n    const staffMember = window.state.users?.find(u => u.id === staffId);\n    const staffName = staffMember ? (staffMember.name || staffMember.email) : "نظام";'
);

// 2. Header Update
content = content.replace(
  '<span class="notif-title">${item.title || "تنبيه بالنظام"}</span>',
  '<div style="display:flex; flex-direction:column; gap:2px;">\n                      <span class="notif-title">${item.title || "تنبيه بالنظام"}</span>\n                      ${isAdminView ? `<span style="font-size:11px; color:var(--p-gold); font-weight:bold;">الموظف: ${staffName}</span>` : ""}\n                  </div>'
);

// 3. Actions Button 1
content = content.replace(
  'style="padding:4px 10px;" onclick="window.markNotificationRead(\'${item.id}\')">',
  'style="padding:4px 12px; font-size:11px;" onclick="window.markNotificationRead(\'${item.id}\')">'
);

// 4. Actions Button 2
content = content.replace(
  'style="padding:4px 10px;" onclick="window.deleteLuxuryItem(\'notifications\', \'${item.id}\')">',
  'style="padding:4px 12px; font-size:11px;" onclick="window.deleteLuxuryItem(\'notifications\', \'${item.id}\')">'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Patch applied successfully');
