const fs = require('fs');
const path = 'src/main.js';
let content = fs.readFileSync(path, 'utf8');

const target = `      } else {
        window.state[p] = data ? Object.entries(data).map(([id, v]) => ({ ...v, id })) : [];
        if (p === "cars") window.applyInventoryFilters();
        if (p === "ads") window.renderAdsSlider();
        if (p === "sales") window.renderSalesVideos();
        if (p === "partners") window.renderPartners();
        if (p === "reviews") window.renderPublicReviews();
        if (p === "custom_presets") window.renderCustomPresets();

        // Refresh admin tables if in dashboard
        if (window.state.user) {
          window.syncAdminTables(p);
          window.updateStatistics();
        }
      }`;

const replacement = `      } else {
        const oldData = window.state[p] || [];
        const newData = data ? Object.entries(data).map(([id, v]) => ({ ...v, id })) : [];
        window.state[p] = newData;
        
        if (p === "cars") window.applyInventoryFilters();
        if (p === "ads") window.renderAdsSlider();
        if (p === "sales") window.renderSalesVideos();
        if (p === "partners") window.renderPartners();
        if (p === "reviews") window.renderPublicReviews();
        if (p === "custom_presets") window.renderCustomPresets();

        // Check for new notifications to play sound
        if (p === "notifications" && window.state.user && window.state.firstLoadDone) {
          const isAdmin = window.state.userProfile?.role === "admin" || window.state.userProfile?.role === "supervisor";
          const getMyUnread = (arr) => arr.filter(n => !n.read && (isAdmin || n.userId === window.state.user.uid || n.assignedTo === window.state.user.uid));
          const oldUnread = getMyUnread(oldData).length;
          const newUnread = getMyUnread(newData).length;
          
          if (newUnread > oldUnread && window.playNotificationSound) {
             window.playNotificationSound();
          }
        }

        // Refresh admin tables if in dashboard
        if (window.state.user) {
          window.syncAdminTables(p);
          window.updateStatistics();
        }
      }`;

// Do a more robust replace that handles whitespace
const normalizedTarget = target.replace(/\s+/g, ' ').trim();
const regexTarget = new RegExp(target.replace(/[.*+?^$\{\}\(\)\|\[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+'));

content = content.replace(regexTarget, replacement);

fs.writeFileSync(path, content, 'utf8');
console.log('Smart sound trigger patch applied');
