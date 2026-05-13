import { initializeApp, deleteApp } from "firebase/app";
import { db, auth, storage, analytics, firebaseConfig } from "./firebase-config.js";
import {
  ref, onValue, set, push, update, remove, get, increment, runTransaction
} from "firebase/database";
import {
  signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail, setPersistence, browserLocalPersistence,
  createUserWithEmailAndPassword, getAuth, updatePassword
} from "firebase/auth";
import {
  ref as storageRef, uploadBytes, getDownloadURL
} from "firebase/storage";

// =========================================================================================
// GLOBAL STATE & CONSTANTS
// =========================================================================================
import 'emoji-picker-element';

window.state = {
  cars: [],
  ads: [],
  bookings: [],
  users: [],
  notifications: [],
  logs: [],
  partners: [],
  locations: [],
  brands: [],
  agents: [],
  specs: [],
  packages: [],
  blogs: [],
  reviews: [],
  plates: [],
  sales: [],
  gearboxes: [],
  bodyTypes: [],
  engines: [],
  exteriorColors: [],
  interiorColors: [],
  stockStatuses: [],
  user: null,
  userProfile: null,
  settings: {
    enableTextGradient: true,
    textGradColor1: "#c8a95e",
    textGradColor2: "#ffffff",
    enableTopbarGradient: true,
    topbarGradColor1: "#907537",
    topbarGradColor2: "#05080c",
    enablePrimaryGradient: true,
    primaryGradColor1: "#907537",
    primaryGradColor2: "#b39651",
    enableSecondaryGradient: true,
    secondaryGradColor1: "#b39651",
    secondaryGradColor2: "#0f172a",
    enableAccentGradient: true,
    accentGradColor1: "#c8a95e",
    accentGradColor2: "#ffd700"
  },
  lang: localStorage.getItem("luxury_lang") || "ar",
  soundEnabled: localStorage.getItem("luxury_sound_enabled") !== "false",
  tempImages: [],
  bookingFilter: "all",
  bookingSubStatusFilter: "all",
  currentReportPeriod: "day",
  firstLoadDone: false,
  inventoryPage: 1,
  inventorySize: 8,
  sliderIndex: 0
};

const i18n = {
  ar: {
    welcome: "مرحباً بك في عالم الفخامة",
    inventory: "مخزون السيارات المتاح",
    totalCars: "إجمالي السيارات",
    totalBookings: "إجمالي الطلبات",
    totalValue: "قيمة المخزون",
    searchPlaceholder: "ابحث عن سيارتك المثالية...",
    loading: "جاري التحميل...",
    noResults: "لم يتم العثور على نتائج تطابق بحثك",
    applyNow: "اطلبها الآن",
    details: "عرض التفاصيل",
    back: "رجوع",
    save: "حفظ",
    delete: "حذف",
    edit: "تعديل",
    cancel: "إلغاء",
    successMsg: "تمت العملية بنجاح",
    errorMsg: "حدث خطأ غير متوقع",
    staff: "قسم المبيعات والمتابعة",
    admin: "إدارة النظام",
    supervisor: "مشرف النظام"
  },
  en: {
    welcome: "Welcome to the World of Luxury",
    inventory: "Available Vehicle Inventory",
    totalCars: "Total Vehicles",
    totalBookings: "Total Bookings",
    totalValue: "Inventory Value",
    searchPlaceholder: "Search for your perfect car...",
    loading: "Loading...",
    noResults: "No results found matching your search",
    applyNow: "Request Now",
    details: "View Details",
    back: "Back",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    cancel: "Cancel",
    successMsg: "Operation successful",
    errorMsg: "An unexpected error occurred",
    staff: "Sales & Follow-up Department",
    admin: "System Administration",
    supervisor: "System Supervisor"
  }
};

// =========================================================================================
// UTILITIES & UI HELPERS
// =========================================================================================

window.debouncedRenders = {};
window.debounceRender = function(key, fn, delay = 150) {
  if (window.debouncedRenders[key]) clearTimeout(window.debouncedRenders[key]);
  window.debouncedRenders[key] = setTimeout(() => {
    fn();
    delete window.debouncedRenders[key];
  }, delay);
};

window.showLuxuryToast = function (message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast-v2 ${type}`;
  toast.style.cssText = `
    background: ${type === "success" ? "rgba(16, 185, 129, 0.9)" : "rgba(239, 68, 68, 0.9)"};
    color: white;
    padding: 12px 25px;
    border-radius: 50px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    font-weight: 600;
    margin-bottom: 10px;
    animation: toast-in 0.4s ease-out;
    display: flex;
    align-items: center;
    gap: 10px;
  `;

  const icon = type === "success" ? "fa-check-circle" : "fa-exclamation-circle";
  toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-20px)";
    toast.style.transition = "all 0.4s ease-in";
    setTimeout(() => toast.remove(), 400);
  }, 4000);
};

window.compressImage = function (file, maxWidth = 1000, maxHeight = 1000, quality = 0.6) {
  return new Promise((resolve, reject) => {
    if (!file || !(file instanceof File || file instanceof Blob)) {
      resolve(file); // Return as is if not a file
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        // Preserve transparency for PNG/WebP by using webp format (fallback to png in old browsers)
        const outputFormat = (file.type === "image/png" || file.type === "image/webp") ? "image/webp" : "image/jpeg";
        resolve(canvas.toDataURL(outputFormat, quality));
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};


window.openModal = function (id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    // Auto-stacking z-index to ensure top modal gets interactions
    const openModals = document.querySelectorAll(".modal:not(.hidden)");
    el.style.zIndex = 2000 + (openModals.length * 10);

    pushHistoryState(`modal-${id}`);
  }
};

window.closeModal = function (id, isPopState = false) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.add("hidden");
    el.style.zIndex = ""; // Reset z-index

    if (!isPopState && history.state?.type === `modal-${id}`) {
      history.back();
    }

    const anyModalOpen = !!document.querySelector(".modal:not(.hidden)");
    if (!anyModalOpen) document.body.style.overflow = "auto";
  }
};

window.setModalTitle = function (id, title) {
  const el = document.getElementById(id + "-title");
  if (el) el.innerText = title;
};

window.switchLuxuryTab = function (tabId) {
  const allTabs = document.querySelectorAll(".pane, .admin-tab-content");
  const allBtns = document.querySelectorAll(".dash-tab, .admin-sidebar-nav li");

  allTabs.forEach(t => { t.classList.add("hidden"); t.classList.remove("active"); });
  allBtns.forEach(b => b.classList.remove("active"));

  const targetTab = document.getElementById(tabId);
  const targetBtn = document.querySelector(`[data-tab="${tabId}"]`);

  if (targetTab) {
    targetTab.classList.remove("hidden");
    targetTab.classList.add("active");
    targetTab.style.animation = "fade-up 0.5s ease-out forwards";
  }
  if (targetBtn) targetBtn.classList.add("active");

  // Toggle Submenus
  const bookingsSub = document.getElementById("bookings-submenu");
  if (bookingsSub) {
    bookingsSub.classList.toggle("active", tabId === "bookings-mgmt" || tabId === "all-bookings");
  }

  if (window.innerWidth < 1024) {
    const sidebar = document.querySelector(".dash-sidebar, .admin-sidebar-v2");
    if (sidebar) sidebar.classList.remove("active");
  }

  // Specialized Initializations
  if (tabId === "whatsapp-monitor-mgmt" && window.initWhatsAppServer) {
    window.initWhatsAppServer();
  }
  if (tabId === "whatsapp-mgmt") {
    window.startCurrentWASession();
  }
  if (tabId === "ads-mgmt") {
    window.syncAdminTables("ads");
  }
  if (tabId === "quick-replies-mgmt" && window.renderQuickRepliesAdmin) {
    window.renderQuickRepliesAdmin();
  }
};

function pushHistoryState(type) {
  if (history.state?.type !== type) {
    history.pushState({ type }, "");
  }
}

window.normalizePhone = function (phone) {
  if (!phone) return "";
  const phoneStr = phone.toString().trim();

  // If it's a full JID or LID, we extract the user part but ONLY if it's @s.whatsapp.net
  // For @lid, we might want to keep it or handle it carefully. 
  // However, according to the user request to "Stop LID", we should prioritize numbers.
  if (phoneStr.includes("@s.whatsapp.net")) {
    return phoneStr.split("@")[0].replace(/\D/g, "");
  }

  if (phoneStr.includes("@lid")) {
    // If we have an LID, we keep it as is for now so the backend can resolve it,
    // but the user wants to stop LID. So if we see @lid, we just pass it through 
    // and let resolveLidToJid handle it.
    return phoneStr;
  }

  let clean = phoneStr.replace(/\D/g, "");

  // Handle cases like 96605... or 96707...
  if (clean.startsWith("9660")) clean = "966" + clean.substring(4);
  else if (clean.startsWith("9670")) clean = "967" + clean.substring(4);

  if (clean.startsWith("966") || clean.startsWith("967")) return clean;

  if (clean.startsWith("05")) return "966" + clean.substring(1);
  if (clean.startsWith("07")) return "967" + clean.substring(1);
  if (clean.startsWith("0")) return "966" + clean.substring(1);

  if (clean.length === 9) {
    if (clean.startsWith("7")) return "967" + clean;
    if (clean.startsWith("5")) return "966" + clean;
  }

  return clean;
};

// =========================================================================================
// INITIALIZATION & AUTH
// =========================================================================================

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  updateLanguageUI();
  initFirebase();
  window.trackVisit();
  initUIListeners();
});

function initUIListeners() {
  // Mobile Nav Toggle Logic
  const mobileBtn = document.querySelector(".mobile-btn");
  const navMenu = document.querySelector(".nav-menu");
  const navOverlay = document.querySelector(".mobile-nav-overlay");
  const closeMenuBtn = document.querySelector(".menu-close-btn");

  const toggleMenu = (forceClose = false) => {
    const isOpening = forceClose === false ? !navMenu.classList.contains("active") : false;
    navMenu.classList.toggle("active", isOpening);
    navOverlay.classList.toggle("active", isOpening);
    document.body.style.overflow = isOpening ? "hidden" : "";

    const icon = mobileBtn?.querySelector("i");
    if (icon) icon.className = isOpening ? "fas fa-times" : "fas fa-bars-staggered";
  };

  if (mobileBtn) mobileBtn.onclick = () => toggleMenu();
  if (navOverlay) navOverlay.onclick = () => toggleMenu(true);
  if (closeMenuBtn) closeMenuBtn.onclick = () => toggleMenu(true);

  // Close menu when clicking link
  document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => toggleMenu(true));
  });

  // Set mobile menu title
  const mTitle = document.querySelector(".mobile-menu-header .dynamic-name-ar");
  if (mTitle && window.__DYNAMIC_NAME_AR__) mTitle.innerText = window.__DYNAMIC_NAME_AR__;

  // Admin Trigger
  const adminTrigger = document.getElementById("admin-trigger");
  if (adminTrigger) {
    adminTrigger.onclick = (e) => {
      e.preventDefault();
      window.openModal("admin-modal");
    };
  }

  // Theme Toggle
  const themeBtn = document.getElementById("theme-btn");
  if (themeBtn) {
    themeBtn.onclick = () => {
      const current = document.body.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      document.body.setAttribute("data-theme", next);
      localStorage.setItem("luxury_theme", next);
      localStorage.setItem("theme_manually_overridden", "true");
      themeBtn.innerHTML = next === "dark" ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    };
  }

  // Lang Toggle
  const langBtn = document.getElementById("lang-btn");
  if (langBtn) {
    langBtn.onclick = () => {
      window.state.lang = window.state.lang === "ar" ? "en" : "ar";
      localStorage.setItem("luxury_lang", window.state.lang);
      updateLanguageUI();
      window.applyInventoryFilters();
      langBtn.innerText = window.state.lang === "ar" ? "EN" : "AR";
    };
  }

  // Admin Tabs
  document.querySelectorAll(".dash-tab").forEach(btn => {
    btn.onclick = () => window.switchLuxuryTab(btn.dataset.tab);
  });

  // Search Inputs
  const invSearch = document.getElementById("car-search-input");
  if (invSearch) invSearch.oninput = () => window.applyInventoryFilters();

  const invFilters = ["filter-make", "filter-type", "filter-year", "filter-sort"];
  invFilters.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.onchange = () => {
      window.state.inventoryPage = 1; // Reset to page 1 on filter change
      window.applyInventoryFilters();
    };
  });

  // Slider Navigation
  const pPrev = document.getElementById("p-prev");
  const pNext = document.getElementById("p-next");
  if (pPrev) pPrev.onclick = () => window.moveLuxurySlider(-1);
  if (pNext) pNext.onclick = () => window.moveLuxurySlider(1);

  // Auto-slide every 5s if possible
  setInterval(() => {
    const splash = document.getElementById("luxury-splash");
    if (!splash || splash.classList.contains("hidden")) {
      window.moveLuxurySlider(1);
    }
  }, 5000);

  // Calculator Listeners
  const calcFields = ["calc-car-price", "calc-down-pay", "calc-years"];
  calcFields.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.oninput = () => window.calculateLuxuryFinancing();
    if (el && el.tagName === "SELECT") el.onchange = () => window.calculateLuxuryFinancing();
  });

  // Modal Closers
  document.querySelectorAll(".modal-close").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const modal = btn.closest(".modal");
      if (modal) {
        // If we are closing the admin modal while logged in, confirm first
        if (modal.id === 'admin-modal' && window.state.user) {
          if (!confirm("هل تريد الخروج من لوحة التحكم؟")) return;
        }
        window.closeModal(modal.id);
      }
    };
  });

  // Handle outside click to close (only top-most)
  window.onclick = (e) => {
    // Emoji picker close on outside click
    const emojiPicker = document.getElementById('wa-emoji-picker');
    if (emojiPicker && emojiPicker.style.display !== 'none') {
      const isSmileIcon = e.target.closest('.fa-smile') !== null;
      const isInsidePicker = emojiPicker.contains(e.target);
      if (!isSmileIcon && !isInsidePicker) {
        emojiPicker.style.display = 'none';
      }
    }

    const openModals = Array.from(document.querySelectorAll(".modal:not(.hidden)"));
    if (openModals.length > 0) {
      const topModal = openModals[openModals.length - 1];
      if (e.target === topModal) {
        // Confirm for admin modal
        if (topModal.id === 'admin-modal' && window.state.user) {
          if (!confirm("هل تريد الخروج من لوحة التحكم؟")) return;
        }
        window.closeModal(topModal.id);
      }
    }
  };

  // Browser Back Button Listener
  window.addEventListener("popstate", (e) => {
    const modals = document.querySelectorAll(".modal:not(.hidden)");
    if (modals.length > 0) {
      // Find which modal corresponds to the state we just left? 
      // Simplified: Close the latest open modal that isn't the current state
      modals.forEach(m => {
        if (e.state?.type !== `modal-${m.id}`) {
          window.closeModal(m.id, true);
        }
      });
    }
  });

  // Scroll Nav
  window.onscroll = () => {
    const nav = document.getElementById("main-nav");
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 50);

    const jump = document.getElementById("scroll-jump");
    if (jump) jump.classList.toggle("hidden", window.scrollY < 500);
  };

  if (document.getElementById("scroll-jump")) {
    document.getElementById("scroll-jump").onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Forms
  const loginForm = document.getElementById("login-form");
  if (loginForm) loginForm.onsubmit = (e) => window.loginAdmin(e);

  const bookingForm = document.getElementById("booking-form");
  if (bookingForm) bookingForm.onsubmit = (e) => window.submitBooking(e);

  const itemForm = document.getElementById("item-form");
  if (itemForm) itemForm.onsubmit = (e) => window.saveLuxuryItem(e);


}

function initTheme() {
  const settings = JSON.parse(localStorage.getItem("luxury-settings-cache") || "{}");
  const isOverridden = localStorage.getItem("theme_manually_overridden") === "true";
  const theme = (isOverridden ? localStorage.getItem("luxury_theme") : settings.defaultTheme) || "dark";

  if (!isOverridden) {
    localStorage.setItem("luxury_theme", theme);
  }

  document.body.setAttribute("data-theme", theme);
  const themeBtn = document.getElementById("theme-btn");
  if (themeBtn) {
    themeBtn.innerHTML = theme === "dark" ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  }
}

function updateLanguageUI() {
  const lang = window.state.lang;
  document.body.dir = lang === "ar" ? "rtl" : "ltr";
  document.body.classList.toggle("en", lang === "en");

  const strings = i18n[lang];
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (strings[key]) el.innerText = strings[key];
  });
}

async function initFirebase() {
  await setPersistence(auth, browserLocalPersistence);

  // Define data paths
  const publicPaths = ["users", "plates", "locations", "brands", "agents", "specs", "packages", "blogs", "reviews", "cars", "ads", "sales", "settings", "partners", "custom_presets", "gearboxes", "bodyTypes", "engines", "exteriorColors", "interiorColors", "stockStatuses"];
  const privatePaths = ["bookings", "notifications", "logs", "quickReplies"];
  const listeners = {};

  function attachListener(p) {
    if (listeners[p]) return; // Avoid duplicate listeners
    listeners[p] = onValue(ref(db, p), (s) => {
      const data = s.val();
      if (p === "settings") {
        window.state.settingsLoaded = true;
        window.state.settings = data ? { ...window.state.settings, ...data } : window.state.settings;
        window.applySettings(window.state.settings);
      } else {
        const oldData = window.state[p] || [];
        const newData = data ? Object.entries(data).map(([id, v]) => ({ ...v, id })) : [];
        window.state[p] = newData;

        if (p === "cars") window.debounceRender("cars", window.applyInventoryFilters);
        if (p === "ads") window.debounceRender("ads", window.renderAdsSlider);
        if (p === "sales") window.debounceRender("sales", window.renderSalesVideos);
        if (p === "partners") window.debounceRender("partners", window.renderPartners);
        if (p === "reviews") window.debounceRender("reviews", window.renderPublicReviews);
        if (p === "custom_presets") window.debounceRender("custom_presets", window.renderCustomPresets);

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
          window.debounceRender("admin_" + p, () => window.syncAdminTables(p));
          window.debounceRender("stats", window.updateStatistics);
        }
      }
      handleFirstLoad();
    }, (err) => {
      console.warn(`Listener for ${p} failed:`, err.message);
      delete listeners[p]; // Allow retry if it fails
    });
  }

  onAuthStateChanged(auth, async (u) => {
    window.state.user = u;
    if (u) {
      const pRef = ref(db, `users/${u.uid}`);
      onValue(pRef, (s) => {
        window.state.userProfile = { ...s.val(), id: u.uid };
        updateAppUI();
        if (window.initWhatsAppServer) window.initWhatsAppServer();
      });
      // Attach private listeners now that we are authenticated
      privatePaths.forEach(attachListener);
    } else {
      window.state.userProfile = null;
      updateAppUI();
      // Remove private listeners if logged out (optional but cleaner)
      privatePaths.forEach(p => {
        if (listeners[p]) {
          // off(ref(db, p)); // If using old off() style
          delete listeners[p];
        }
      });
    }
  });

  // Attach public listeners immediately
  publicPaths.forEach(attachListener);
}
function handleFirstLoad() {
  if (window.state.firstLoadDone || !window.state.settingsLoaded) return;
  
  const s = window.state.settings;
  const isMaint = s?.maintenanceMode;
  const isAdmin = window.state.userProfile?.role === "admin" || window.state.userProfile?.role === "supervisor";

  if (isMaint && !isAdmin) {
    const splash = document.getElementById("luxury-splash");
    if (splash) {
      splash.innerHTML = `
            <div class="maint-content" style="text-align:center; color:white; padding: 20px;">
                <i class="fas fa-tools" style="font-size:60px; color:var(--p-red); margin-bottom:20px;"></i>
                <h1 class="luxury-font" style="margin-bottom:10px;">الموقع تحت الصيانة</h1>
                <p style="opacity:0.8;">نعمل حالياً على تحديث المنصة لتقديم تجربة أفضل، سنعود قريباً جداً.</p>
                <div style="margin-top:30px;">
                    <button class="btn-premium btn-sm" onclick="window.openModal('admin-modal')">دخول الإدارة</button>
                </div>
            </div>
          `;
      splash.style.opacity = "1";
      splash.classList.remove("hidden");
    }
    return;
  }

  // Hide splash screen
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
  }, 1200);
}


function updateAppUI() {
  const isLoggedIn = !!window.state.user;
  const isAdmin = window.state.userProfile?.role === "admin";
  const isSupervisor = window.state.userProfile?.role === "supervisor";
  const isStaff = isLoggedIn && !isAdmin && !isSupervisor;

  document.body.classList.toggle("is-logged-in", isLoggedIn);
  document.body.classList.toggle("is-admin", isAdmin);
  document.body.classList.toggle("is-supervisor", isSupervisor);

  const loginUI = document.getElementById("admin-login-ui");
  const dashUI = document.getElementById("admin-dash-ui");

  if (loginUI) loginUI.classList.toggle("hidden", isLoggedIn);
  if (dashUI) dashUI.classList.toggle("hidden", !isLoggedIn);

  const adminTrigger = document.getElementById("admin-trigger");
  if (adminTrigger) adminTrigger.innerText = isLoggedIn ? "لوحة التحكم" : "تسجيل الدخول";

  document.querySelectorAll(".admin-only").forEach(el => el.classList.toggle("hidden", !isAdmin && !isSupervisor));
  document.querySelectorAll(".supervisor-only").forEach(el => el.classList.toggle("hidden", !isSupervisor && !isAdmin));
  document.querySelectorAll(".admin-strictly").forEach(el => el.classList.toggle("hidden", !isAdmin));
  document.querySelectorAll(".staff-only").forEach(el => el.classList.toggle("hidden", isAdmin || isSupervisor));

  if (isLoggedIn) {
    window.syncAdminTables("all");
    window.updateStatistics();

    const nameLabel = document.getElementById("user-display-name");
    const roleLabel = document.getElementById("user-role-label");

    // Set correct role-based labels
    if (nameLabel) {
      nameLabel.innerText = window.state.userProfile?.name || (isAdmin ? "المسؤول العام" : isSupervisor ? "المشرف العام" : "الموظف");
    }

    if (roleLabel) {
      let roleText = "قسم المبيعات والمتابعة";
      if (isAdmin) roleText = "إدارة النظام (Admin)";
      else if (isSupervisor) roleText = "إدارة الرقابة والإشراف (Supervisor)";
      roleLabel.innerText = roleText;
    }

    // Auto-switch to appropriate dashboard
    const currentTab = document.querySelector(".dash-tab.active");
    if (!currentTab || currentTab.classList.contains("hidden")) {
      let targetTab = "bookings-mgmt"; // Default for Admin/Staff
      if (isSupervisor) targetTab = "supervisor-dash";

      const tabBtn = document.querySelector(`.dash-tab[data-tab="${targetTab}"]`);
      if (tabBtn) tabBtn.click();
    }

    if (isSupervisor || isAdmin) {
      window.renderSupervisorStaffList();
      window.populateStaffMonitorSelect();
    }
  }
}

// =========================================================================================
// SUPERVISOR DASHBOARD LOGIC
// =========================================================================================

window.handleSupervisorExport = async function (format) {
  const type = document.getElementById("sup-export-type").value;
  const start = document.getElementById("sup-export-start").value;
  const end = document.getElementById("sup-export-end").value;

  let rawData = window.state[type] || [];

  if (!Array.isArray(rawData)) {
    // If it's an object (shouldn't be, but as a fallback)
    rawData = Object.values(rawData);
  }

  // Filter by date if applicable
  let data = rawData;
  if (start || end) {
    const startDate = start ? new Date(start) : new Date(0);
    const endDate = end ? new Date(end) : new Date();
    endDate.setHours(23, 59, 59, 999);

    data = rawData.filter(item => {
      const ts = item.createdAt || item.timestamp || 0;
      const itemDate = new Date(ts);
      return itemDate >= startDate && itemDate <= endDate;
    });
  }

  if (data.length === 0) {
    window.showLuxuryToast("لا توجد بيانات للفترة المحددة", "warning");
    return;
  }

  // Arabic labels mapping - must match database field names
  const labelsMap = {
    cars: {
      make: "الماركة",
      model: "الموديل",
      year: "السنة",
      price: "السعر",
      monthlyInstallment: "القسط الشهري",
      color: "اللون الخارجى",
      interiorColor: "اللون الداخلى",
      mileage: "الممشى",
      engine: "المحرك",
      gearbox: "ناقل الحركة",
      fuelType: "نوع الوقود",
      status: "الحالة",
      createdAt: "تاريخ الإضافة"
    },
    bookings: {
      name: "اسم العميل",
      phone: "رقم الجوال",
      carRequested: "السيارة المطلوبة",
      city: "المدينة",
      nationality: "الجنسية",
      paymentMethod: "طريقة الشراء",
      salary: "الراتب",
      status: "الحالة",
      subStatus: "الحالة الفرعية",
      createdAt: "تاريخ الطلب",
      assignedTo: "الموظف المسؤول"
    },
    users: {
      name: "الاسم",
      email: "البريد الإلكتروني",
      role: "الدور",
      isAvailable: "متاح للاستلام",
      createdAt: "تاريخ الإنشاء"
    }
  };

  const currentLabels = labelsMap[type] || {};
  const labelKeys = Object.keys(currentLabels);

  // Sanitize and translate data for export
  const exportData = data.map(item => {
    const translated = {};
    labelKeys.forEach(key => {
      let val = item[key];

      // Handle special formatting
      if (key === 'createdAt' || key === 'timestamp' || key === 'lastLogin') {
        val = val ? new Date(val).toLocaleString('ar-SA') : "";
      }
      else if (key === 'assignedTo' && val) {
        const staff = (window.state.users || []).find(u => u.id === val);
        val = staff ? (staff.name || staff.email) : val;
      }
      else if (key === 'status') {
        const statusMap = {
          available: "متاح",
          reserved: "محجوز",
          sold: "مباع",
          incoming: "قادم قريباً",
          new: "جديد",
          done: "تم",
          cancelled: "ملغى",
          rejected: "مرفوض"
        };
        val = statusMap[val] || val;
      }
      else if (key === 'isAvailable') {
        val = val ? "نعم" : "لا";
      }

      // Ensure we don't treat 0 as empty string
      translated[currentLabels[key]] = (val !== undefined && val !== null) ? val : "";
    });
    return translated;
  });

  if (exportData.length === 0 || Object.keys(exportData[0]).length === 0) {
    window.showLuxuryToast("خطأ في معالجة البيانات للتصدير", "error");
    return;
  }

  if (format === 'xlsx') {
    const ws = XLSX.utils.json_to_sheet(exportData);
    ws['!views'] = [{ RTL: true }];

    // Set column widths
    const wscols = Object.keys(exportData[0]).map(() => ({ wch: 20 }));
    ws['!cols'] = wscols;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "التقرير");
    XLSX.writeFile(wb, `تقرير_${type}_${new Date().toLocaleDateString('ar-EG').replace(/\//g, '-')}.xlsx`);

    window.showLuxuryToast("تم تصدير ملف Excel بنجاح");
    window.createLog("تصدير بيانات", `تصدير تقرير ${type} بصيغة Excel`, "data");
  }
  else if (format === 'pdf') {
    window.showLuxuryToast("جاري معالجة ملف PDF...");

    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.top = '-9999px';
    tempDiv.style.width = '1000px';
    tempDiv.style.direction = 'rtl';
    tempDiv.style.fontFamily = "'Cairo', sans-serif";
    tempDiv.style.padding = '30px';
    tempDiv.style.background = '#fff';
    tempDiv.style.color = '#111';

    const totalItems = data.length;
    const dateRangeStr = (start || end) ? `الفترة من: ${start || 'البداية'} إلى: ${end || 'اليوم'}` : "كافة البيانات";
    const logoUrl = window.state.settings?.logo || 'logo.jpg';
    const headers = Object.keys(exportData[0]);

    let tableHtml = `
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:3px solid #a11d21; padding-bottom:20px; margin-bottom:30px;">
        <div style="text-align:right;">
          <h1 style="color:#a11d21; margin:0; font-size:28px;">${window.state.settings?.nameAr || 'ديار الشهامة'}</h1>
          <p style="margin:5px 0; opacity:0.7;">تقرير إداري مفصل - ${type === 'cars' ? 'مخزون السيارات' : type === 'bookings' ? 'سجل الحجوزات' : 'قائمة الموظفين'}</p>
          <p style="font-size:12px; font-weight:bold;">${dateRangeStr}</p>
        </div>
        <img src="${logoUrl}" style="height:80px; width:auto; object-fit:contain;">
      </div>

      <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:20px; margin-bottom:30px;">
        <div style="background:#f9fafb; padding:15px; border-radius:10px; border:1px solid #eee;">
          <small style="color:#666;">إجمالي السجلات</small>
          <div style="font-size:20px; font-weight:bold; color:#a11d21;">${totalItems}</div>
        </div>
        <div style="background:#f9fafb; padding:15px; border-radius:10px; border:1px solid #eee;">
          <small style="color:#666;">تاريخ الاستخراج</small>
          <div style="font-size:14px; font-weight:bold;">${new Date().toLocaleString('ar-SA')}</div>
        </div>
        <div style="background:#f9fafb; padding:15px; border-radius:10px; border:1px solid #eee;">
          <small style="color:#666;">المصدر</small>
          <div style="font-size:14px; font-weight:bold;">نظام ديار كار السحابي</div>
        </div>
      </div>

      <table style="width:100%; border-collapse:collapse; text-align:right; font-size:10px;">
        <thead>
          <tr style="background:#a11d21; color:white;">
            ${headers.map(h => `<th style="padding:10px 5px; border:1px solid #a11d21; white-space:nowrap;">${h}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${exportData.map((row, idx) => `
            <tr style="background:${idx % 2 === 0 ? '#fff' : '#fcfcfc'};">
              ${headers.map(h => `<td style="padding:8px 5px; border:1px solid #eee;">${row[h]}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div style="margin-top:40px; border-top:1px solid #eee; padding-top:10px; font-size:10px; color:#999; text-align:center;">
        هذا التقرير تم توليده آلياً من لوحة تحكم المشرف. جميع الحقوق محفوظة لشركة ${window.state.settings?.nameAr || 'ديار كار'}.
      </div>
    `;

    tempDiv.innerHTML = tableHtml;
    document.body.appendChild(tempDiv);

    const opt = {
      margin: [10, 10],
      filename: `تقرير_${type}_${new Date().toLocaleDateString('ar-EG').replace(/\//g, '-')}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };

    html2pdf().set(opt).from(tempDiv).save().then(() => {
      document.body.removeChild(tempDiv);
      window.showLuxuryToast("تم استخراج التقرير بنجاح");
      window.createLog("تصدير بيانات", `تصدير تقرير ${type} بصيغة PDF`, "data");
    }).catch(err => {
      console.error(err);
      window.showLuxuryToast("خطأ أثناء استخراج PDF", "error");
      if (tempDiv.parentNode) document.body.removeChild(tempDiv);
    });
  }
};

window.populateStaffMonitorSelect = function () {
  const select = document.getElementById("sup-monitor-staff-select");
  if (!select) return;
  const staff = window.state.users.filter(u => u.role === "staff");
  select.innerHTML = '<option value="">-- اختر موظف --</option>' +
    staff.map(u => `<option value="${u.id}">${u.name || u.email}</option>`).join("");
};

window.monitorStaffChats = function (staffUid) {
  const chatsList = document.getElementById("monitor-active-chats-list");
  const chatBody = document.getElementById("monitor-chat-body");
  const chatHeader = document.getElementById("monitor-chat-header");

  if (!chatsList || !chatBody || !chatHeader) return;
  if (!staffUid) {
    chatsList.innerHTML = "";
    chatBody.innerHTML = "";
    chatHeader.innerText = "اختر محادثة لبدء المراقبة";
    return;
  }

  // Clear previous listeners if any (simplified for this context)
  chatsList.innerHTML = '<div class="loading-v2">جاري جلب المحادثات...</div>';

  const chatsRef = ref(db, "chats");
  const staffChatsQuery = query(chatsRef, orderByChild("assignedTo"), equalTo(staffUid));

  onValue(staffChatsQuery, (snapshot) => {
    const chats = [];
    snapshot.forEach(child => {
      chats.push({ id: child.key, ...child.val() });
    });

    if (chats.length === 0) {
      chatsList.innerHTML = '<div class="no-data">لا توجد محادثات نشطة لهذا الموظف</div>';
      return;
    }

    chatsList.innerHTML = chats.map(chat => `
      <div class="monitor-chat-item" onclick="window.viewMonitorChat('${chat.id}', '${chat.customerName || chat.customerPhone}')">
        <div class="m-chat-info">
          <strong>${chat.customerName || "عميل"}</strong>
          <span>${chat.customerPhone || ""}</span>
        </div>
        <div class="m-chat-meta">
          <small>${new Date(chat.lastMessageTime).toLocaleTimeString()}</small>
        </div>
      </div>
    `).join("");
  });
};

window.viewMonitorChat = function (chatId, title) {
  const chatBody = document.getElementById("monitor-chat-body");
  const chatHeader = document.getElementById("monitor-chat-header");
  if (!chatBody || !chatHeader) return;

  chatHeader.innerText = `مراقبة: ${title}`;
  chatBody.innerHTML = '<div class="loading-v2">جاري تحميل الرسائل...</div>';

  const msgRef = ref(db, `messages/${chatId}`);
  onValue(msgRef, (snapshot) => {
    const msgs = [];
    snapshot.forEach(child => msgs.push(child.val()));

    chatBody.innerHTML = msgs.map(m => `
      <div class="chat-msg ${m.sender === 'staff' ? 'sent' : 'received'}">
        <div class="msg-bubble">
          <p>${m.text}</p>
          <small>${new Date(m.timestamp).toLocaleTimeString()}</small>
        </div>
      </div>
    `).join("");
    chatBody.scrollTop = chatBody.scrollHeight;
  });
};

window.renderSupervisorStaffList = function () {
  const tbody = document.getElementById("supervisor-staff-list-v2");
  if (!tbody) return;

  const staff = (window.state.users || []).filter(u => u.role === "staff");
  const bookings = window.state.bookings || [];

  if (staff.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:30px; opacity:0.5;">لا يوجد موظفين مسجلين حالياً</td></tr>';
    return;
  }

  tbody.innerHTML = staff.map((s, idx) => {
    const staffBookings = bookings.filter(b => b.assignedTo === s.id);
    const completed = staffBookings.filter(b => b.status === "sold" || b.status === "done").length;
    const convRate = staffBookings.length > 0 ? Math.round((completed / staffBookings.length) * 100) : 0;

    // Clean phone for links
    const rawPhone = s.phone || "";


    return `
      <tr onclick="window.showStaffStats('${s.id}')" id="staff-row-${s.id}">
        <td><div class="staff-avatar-circle">${(s.name || "S")[0]}</div></td>
        <td>
            <div style="font-weight:700;">${s.name || 'موظف بدون اسم'}</div>
            <div style="font-size:10px; opacity:0.5;">ID: ${s.id.substring(0, 8)}</div>
        </td>
        <td>${s.email}</td>
        <td><span class="badge-v2" style="background:rgba(255,215,0,0.1); color:var(--p-gold); border:none;">${staffBookings.length} طلب</span></td>
        <td>
            <div style="font-size:12px; font-weight:bold; color:${convRate > 50 ? '#10b981' : 'var(--p-gold)'}">${convRate}%</div>
            <div style="width:50px; height:3px; background:rgba(255,255,255,0.05); border-radius:2px; margin-top:4px;">
                <div style="width:${convRate}%; height:100%; background:currentColor; border-radius:2px;"></div>
            </div>
        </td>
        <td>
            <div class="action-btns-cell">
                ${s.phone ? `
                    <a href="tel:${window.normalizePhone(s.phone)}" class="btn-action-lite call" title="اتصال هاتفي" onclick="event.stopPropagation()">
                        <i class="fas fa-phone-alt"></i>
                    </a>
                    <a href="https://wa.me/${window.normalizePhone(s.phone)}" target="_blank" class="btn-action-lite whatsapp" title="مراسلة واتساب" onclick="event.stopPropagation()">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                ` : ''}
                <button class="btn-action-lite" title="تعديل الاسم" onclick="event.stopPropagation(); window.updateStaffName('${s.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-action-lite" style="color:var(--p-red);" title="حذف الموظف" onclick="event.stopPropagation(); window.deleteStaff('${s.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
      </tr>
    `;
  }).join("");
};

window.showStaffStats = function (staffUid) {
  const staff = (window.state.users || []).find(u => u.id === staffUid);
  if (!staff) return;

  // Visual selection
  document.querySelectorAll(".staff-table tr").forEach(tr => tr.classList.remove("selected"));
  const row = document.getElementById(`staff-row-${staffUid}`);
  if (row) row.classList.add("selected");

  const panel = document.getElementById("staff-details-panel");
  const grid = document.getElementById("staff-stats-grid");
  const nameLabel = document.getElementById("detail-staff-name");
  const emailLabel = document.getElementById("detail-staff-email");
  const avatarLabel = document.getElementById("detail-staff-avatar");

  if (!panel || !grid) return;

  panel.style.display = "block";
  nameLabel.innerText = staff.name || staff.email;
  emailLabel.innerText = staff.email;
  avatarLabel.innerText = (staff.name || "S")[0];

  const bookings = (window.state.bookings || []).filter(b => b.assignedTo === staffUid);

  const stats = {
    total: bookings.length,
    new: bookings.filter(b => b.status === 'new').length,
    waiting: bookings.filter(b => b.status === 'waiting').length,
    sold: bookings.filter(b => b.status === 'sold').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    done: bookings.filter(b => b.status === 'done').length
  };

  const statusLabels = {
    total: { t: "إجمالي الطلبات", i: "fa-list", c: "var(--p-gold)" },
    new: { t: "طلبات جديدة", i: "fa-star", c: "#3b82f6" },
    waiting: { t: "بانتظار الإجراء", i: "fa-clock", c: "#f59e0b" },
    sold: { t: "تم المبايعة", i: "fa-check-circle", c: "#10b981" },
    cancelled: { t: "طلبات مرفوضة", i: "fa-times-circle", c: "#ef4444" },
    done: { t: "مكتملة", i: "fa-flag-checkered", c: "#8b5cf6" }
  };

  grid.innerHTML = Object.keys(stats).map(key => `
    <div class="mini-stat-box">
        <i class="fas ${statusLabels[key].i}" style="color:${statusLabels[key].c}; margin-bottom:8px; font-size:18px;"></i>
        <label>${statusLabels[key].t}</label>
        <strong>${stats[key]}</strong>
    </div>
  `).join("");

  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

window.updateStaffName = async function (uid) {
  const newName = prompt("أدخل الإسم الجديد للموظف:");
  if (!newName) return;

  try {
    await update(ref(db, `users/${uid}`), { name: newName });
    window.showLuxuryToast("تم تحديث الإسم بنجاح");
    window.renderSupervisorStaffList();
  } catch (e) {
    window.showLuxuryToast("خطأ في التحديث", "error");
  }
};

window.deleteStaff = async function (uid) {
  if (!confirm("هل أنت متأكد من حذف هذا الموظف؟ لن يتمكن من تسجيل الدخول بعد الآن.")) return;

  try {
    // 1. Remove from Database
    await remove(ref(db, `users/${uid}`));

    // 2. Ideally remove from Firebase Auth using Admin SDK or our Secondary App trick
    // Note: Deleting a user from Auth in client side is tricky without a re-auth of THAT user.
    // However, removing them from the 'users' DB node effectively prevents them from seeing the dashboard
    // because our updateAppUI depends on state.userProfile which comes from the DB.

    window.showLuxuryToast("تم حذف الموظف من النظام");
    window.renderSupervisorStaffList();
  } catch (e) {
    window.showLuxuryToast("خطأ في الحذف", "error");
  }
};

window.toggleAvailability = async function () {
  if (!window.state.userProfile) return;
  const current = window.state.userProfile.isAvailable || false;
  try {
    await update(ref(db, `users/${window.state.user.uid}`), { isAvailable: !current });
    window.state.userProfile.isAvailable = !current; // Local update
    window.showLuxuryToast(!current ? "أنت متاح الآن لاستلام الطلبات" : "تم تعيين الحالة: غير متاح");
    window.updateStatistics(); // Refresh staff panel
  } catch (e) {
    window.showLuxuryToast("فشل تحديث الحالة", "error");
  }
};

window.toggleSound = function () {
  window.state.soundEnabled = !window.state.soundEnabled;
  localStorage.setItem("luxury_sound_enabled", window.state.soundEnabled);
  const toggle = document.getElementById("sound-toggle");
  if (toggle) toggle.checked = window.state.soundEnabled;
  window.showLuxuryToast(window.state.soundEnabled ? "تم تفعيل التنبيهات الصوتية" : "تم كتم التنبيهات");
};

window.setBookingFilter = function (status, btn, subStatus = "all", subBtn = null) {
  window.state.bookingFilter = status;
  window.state.bookingSubStatusFilter = subStatus;

  const statusSelect = document.getElementById("filter-booking-status");
  if (statusSelect && statusSelect.value !== status) statusSelect.value = status;

  const subSelect = document.getElementById("filter-booking-sub-status");
  if (subSelect) {
    const optionsMap = {
      new: ["not_contacted", "contacted"],
      waiting: ["docs_received", "waiting_calc", "waiting_docs", "waiting_signature"],
      inquiry: ["docs_not_received"],
      sold: ["signed", "delivered"],
      done: ["done"],
      cancelled: ["no_response", "obligations", "calc_rejected", "ineligible", "duplicate"]
    };

    const labelMap = {
      not_contacted: "لم يتم التواصل", contacted: "تم التواصل", docs_received: "تم استلام الاوراق",
      waiting_calc: "انتظار رد العميل", waiting_docs: "إنتظار إكمال الاوراق", waiting_signature: "إنتظار توقيع العميل",
      docs_not_received: "لم يتم استلام الاوراق", signed: "تم التوقيع", delivered: "تم التسليم", done: "تم",
      no_response: "لم يتم رد العميل", obligations: "التزامات", calc_rejected: "رفض الحسبة",
      ineligible: "غير مسموح له", duplicate: "مكرر"
    };

    let allowed = status === "all" ? Object.keys(labelMap) : (optionsMap[status] || []);

    subSelect.innerHTML = '<option value="all">جميع الحالات الفرعية</option>';
    allowed.forEach(k => {
      const opt = document.createElement("option");
      opt.value = k; opt.textContent = labelMap[k];
      subSelect.appendChild(opt);
    });

    if (Array.from(subSelect.options).some(o => o.value === subStatus)) {
      subSelect.value = subStatus;
    } else {
      subSelect.value = "all";
      window.state.bookingSubStatusFilter = "all";
      subStatus = "all";
    }
  }

  document.querySelectorAll(".sub-tab.b-filter").forEach(b => {
    if (b.getAttribute("onclick") && b.getAttribute("onclick").includes(`'${status}'`)) {
      document.querySelectorAll(".sub-tab.b-filter").forEach(bx => bx.classList.remove("active"));
      b.classList.add("active");
      document.querySelectorAll(".deep-submenu").forEach(sm => sm.classList.remove("active"));
      const parentGroup = b.closest(".status-group");
      if (parentGroup) {
        const deepMenu = parentGroup.querySelector(".deep-submenu");
        if (deepMenu) deepMenu.classList.add("active");
      }
    }
  });

  document.querySelectorAll(".deep-tab").forEach(b => {
    b.classList.remove("active");
    if (subStatus !== "all" && b.getAttribute("onclick") && b.getAttribute("onclick").includes(`'${subStatus}'`)) {
      b.classList.add("active");
    }
  });

  window.syncAdminTables("bookings");
};


// =========================================================================================
// PUBLIC INVENTORY & FILTERING
// =========================================================================================

window.applyInventoryFilters = function () {
  const grid = document.getElementById("cars-container");
  if (!grid) return;

  // Dynamic Filter Population
  const makeFilter = document.getElementById("filter-make");
  const yearFilter = document.getElementById("filter-year");

  if (makeFilter && makeFilter.options.length <= 1) {
    const makes = [...new Set(window.state.cars.map(c => c.make))].sort();
    makes.forEach(m => {
      const opt = document.createElement("option");
      opt.value = m; opt.textContent = m;
      makeFilter.appendChild(opt);
    });
  }
  if (yearFilter && yearFilter.options.length <= 1) {
    const years = [...new Set(window.state.cars.map(c => c.year))].filter(Boolean).sort((a, b) => b - a);
    years.forEach(y => {
      const opt = document.createElement("option");
      opt.value = y; opt.textContent = y;
      yearFilter.appendChild(opt);
    });
  }

  const typeFilter = document.getElementById("filter-type");
  if (typeFilter && typeFilter.options.length <= 1) {
    const bodyMap = { sedan: 'سيدان', suv: 'SUV', coupe: 'كوبيه', luxury: 'فاخرة', pickup: 'بيك آب' };
    const types = [...new Set(window.state.cars.map(c => c.bodyType))].filter(Boolean).sort();
    types.forEach(t => {
      const opt = document.createElement("option");
      opt.value = t; opt.textContent = bodyMap[t] || t;
      typeFilter.appendChild(opt);
    });
  }

  const searchQuery = (document.getElementById("car-search-input")?.value || "").toLowerCase();
  const filterMake = document.getElementById("filter-make")?.value || "all";
  const filterType = document.getElementById("filter-type")?.value || "all";
  const filterYear = document.getElementById("filter-year")?.value || "all";
  const sort = document.getElementById("filter-sort")?.value || "newest";

  let results = window.state.cars?.filter(car => {
    const matchesSearch = !searchQuery || (car.make + " " + car.model).toLowerCase().includes(searchQuery);
    const matchesMake = filterMake === "all" || car.make === filterMake;
    const matchesType = filterType === "all" || car.bodyType === filterType;
    const matchesYear = filterYear === "all" || car.year === filterYear;
    return matchesSearch && matchesMake && matchesType && matchesYear;
  }) || [];

  if (sort === "price-asc") results.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
  else if (sort === "price-desc") results.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
  else if (sort === "year-asc") results.sort((a, b) => (Number(a.year) || 0) - (Number(b.year) || 0));
  else results.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

  // Featured Offers Rendering (First few cars marked as featured or just top 3)
  const featured = window.state.cars?.filter(c => c.isFeatured).slice(0, 3) || [];
  renderFeaturedOffers(featured.length > 0 ? featured : window.state.cars.slice(0, 3));

  // Pagination
  const total = results.length;
  const page = window.state.inventoryPage || 1;
  const size = window.state.inventorySize || 8;
  const start = (page - 1) * size;
  const pageItems = results.slice(start, start + size);

  renderCarGrid(pageItems);
  renderPagination(total, page, size);
};

function renderFeaturedOffers(cars) {
  const container = document.getElementById("featured-offers-container");
  if (!container || !cars.length) return;

  // Unhide section if it's set to display:none in style.css or parent
  const section = document.getElementById("featured-offers-section");
  if (section) section.style.display = "block";

  container.innerHTML = cars.map(car => `
        <div class="offer-card-v2" onclick="window.viewLuxuryCar('${car.id}')">
            <div class="offer-badge">عرض حصري</div>
            <div class="offer-img-box">
                <img src="${car.image || 'logo.jpg'}" alt="${car.make}" loading="lazy" onerror="this.src='logo.jpg'">
            </div>
            <div class="offer-info">
                <h4>${car.make} ${car.model}</h4>
                <div class="offer-price">
                    <span>${car.price ? Number(car.price).toLocaleString() : (car.monthlyInstallment ? `قسط: ${Number(car.monthlyInstallment).toLocaleString()}` : "تواصل معنا")}</span>
                    ${car.price || car.monthlyInstallment ? '<small style="font-size: 14px; margin-right: 5px;">ريال</small>' : ''}
                </div>
                <button class="btn-premium btn-sm" style="margin-top: 10px; width: 100%;">تفاصيل العرض</button>
            </div>
        </div>
    `).join("");
}

function renderPagination(total, page, size) {
  const container = document.getElementById("pagination-wrap");
  if (!container) return;

  const pages = Math.ceil(total / size);
  if (pages <= 1) {
    container.innerHTML = "";
    return;
  }

  let html = ``;

  if (page > 1) {
    html += `<button class="p-btn nav-dir" onclick="window.state.inventoryPage=${page - 1}; window.applyInventoryFilters(); window.scrollTo({top: document.getElementById('inventory').offsetTop - 100, behavior:'smooth'})"><i class="fas fa-chevron-right"></i> السابق</button>`;
  }

  for (let i = 1; i <= pages; i++) {
    html += `<button class="p-btn ${i === page ? 'active' : ''}" onclick="window.state.inventoryPage=${i}; window.applyInventoryFilters(); window.scrollTo({top: document.getElementById('inventory').offsetTop - 100, behavior:'smooth'})">${i}</button>`;
  }

  if (page < pages) {
    html += `<button class="p-btn nav-dir" onclick="window.state.inventoryPage=${page + 1}; window.applyInventoryFilters(); window.scrollTo({top: document.getElementById('inventory').offsetTop - 100, behavior:'smooth'})">التالي <i class="fas fa-chevron-left"></i></button>`;
  }

  container.innerHTML = html;
}

window.renderPartners = function () {
  const container = document.getElementById("front-partners-grid");
  if (!container || !window.state.partners) return;

  container.innerHTML = window.state.partners.map(p => `
    <div class="partner-logo-v2">
        <img src="${p.logo}" alt="${p.name}" title="${p.name}">
    </div>
  `).join("");
};

window.renderPublicReviews = function () {
  const container = document.getElementById("public-reviews-container");
  if (!container || !window.state.reviews) return;

  if (window.state.reviews.length === 0) {
    container.innerHTML = '<div class="no-results-v2"><p>لا توجد آراء عملاء حالياً</p></div>';
    return;
  }

  container.innerHTML = window.state.reviews.map(r => {
    const avatar = r.avatar || r.image || "";
    const name = r.name || "عميل غير معروف";
    const carTag = r.car ? `<span> اشترى <span style="color:var(--p-copper); font-weight:bold;">${r.car}</span></span>` : '<span>عميل مُحقّق <i class="fas fa-check-circle"></i></span>';

    return `
    <div class="review-card-v2" data-aos="zoom-in">
        <div class="review-stars">
            ${'<i class="fas fa-star"></i>'.repeat(Number(r.rating || 5))}
        </div>
        <p class="review-text">"${r.text || "لا يوجد تعليق"}"</p>
        <div class="review-author">
           <div class="review-author-avatar">
                ${avatar ? `<img src="${avatar}" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">` : name.charAt(0)}
           </div>
           <div class="review-author-info" style="line-height:1.4;">
              <strong style="display:block; font-size:16px;">${name}</strong>
              <div style="font-size:12px; opacity:0.8;">${carTag}</div>
           </div>
        </div>
    </div>
  `;
  }).join("");
};

window.renderCarGrid = function (cars) {
  const grid = document.getElementById("cars-container");
  if (!grid) return;

  if (cars.length === 0) {
    grid.innerHTML = '<div class="no-results-v2"><i class="fas fa-search"></i> <p>لم يتم العثور على سيارات تطابق بحثك</p></div>';
    return;
  }

  grid.innerHTML = cars.map(car => `
    <div class="car-card-premium" onclick="window.viewLuxuryCar('${car.id}')" data-aos="fade-up">
      <div class="car-img-wrap">
        <img src="${car.image || "logo.jpg"}" alt="${car.make}" loading="lazy" onerror="this.src='logo.jpg'">
        <div class="car-price-v3">${car.price ? `${Number(car.price).toLocaleString()} <small>ريال</small>` : (car.monthlyInstallment ? `قسط من: ${Number(car.monthlyInstallment).toLocaleString()} <small>ريال</small>` : "عند التواصل")}</div>
        <div class="car-badge-v3 ${car.status === 'available' ? 'available' : car.status === 'reserved' ? 'reserved' : car.status === 'sold' ? 'sold' : 'custom'}">
          ${car.status === 'available' ? 'متاح' : car.status === 'reserved' ? 'محجوز' : car.status === 'sold' ? 'مباع' : (car.status || 'متاح')}
        </div>
      </div>
      <div class="car-info-v3">
        <span class="car-year-v3">${car.year}</span>
        <h3 class="car-title-v3">${car.make} ${car.model}</h3>
        <div class="car-specs-v3">
          <div class="spec-item-v3">
            <i class="fas fa-road"></i>
            <span>${(Number(car.mileage) || 0).toLocaleString()} كم</span>
          </div>
          <div class="spec-item-v3">
            <i class="fas fa-gas-pump"></i>
            <span>${car.fuelType || "بنزين"}</span>
          </div>
        </div>
        <div class="car-footer-v3">
          <button class="btn-premium btn-sm btn-full-v3">
            <span>عرض التفاصيل</span>
            <i class="fas fa-arrow-left"></i>
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

window.viewLuxuryCar = function (id) {
  const car = window.state.cars.find(c => c.id === id);
  if (!car) return;

  const modal = document.getElementById("details-modal");
  if (!modal) return;

  // Handle images better
  let images = car.images || [];
  if (images.length === 0 && car.image) images = [car.image];
  if (images.length === 0) images = ["logo.jpg"];

  const waNumber = window.normalizePhone(window.state.settings.contactSales || "0500000000");
  const priceText = car.price ? `${Number(car.price).toLocaleString()} ريال` : "عند التواصل";
  const installmentText = car.monthlyInstallment ? `\n*القسط الشهري يبدأ من:* ${Number(car.monthlyInstallment).toLocaleString()} ريال` : "";
  const waText = `السلام عليكم، أرغب بالاستفسار عن هذه السيارة:\n\n*السيارة:* ${car.make} ${car.model}\n*الموديل:* ${car.year}\n*سعر الكاش:* ${priceText}${installmentText}\n\nرابط السيارة:\n${window.location.origin}/#car-${car.id}`;
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;

  const detailsContent = `
    <div class="details-luxury-container animate-fade-in-v2">
      <!-- Top Header Section -->
      <div class="details-top-v4">
        <div class="details-header-v3">
          <div class="d-badge-row">
            <span class="badge-v3 year">${car.year}</span>
            ${car.isFeatured ? '<span class="badge-v3 featured"><i class="fas fa-crown"></i> عرض مميز</span>' : ''}
            ${car.status === 'available' ? '<span class="badge-v3 status available">متاح حالياً</span>' :
      car.status === 'reserved' ? '<span class="badge-v3 status reserved">محجوز</span>' :
        '<span class="badge-v3 status sold">مباع</span>'}
          </div>
          <h1 class="luxury-font">${car.make} ${car.model}</h1>
          <p class="car-subtitle-v5">${car.engine || ""} | ${car.gearbox || ""} | ${car.fuelType || ""}</p>
        </div>
        <div class="price-premium-v6">
          <div class="p-header">سعر الكاش</div>
          <div class="p-main">
            <span class="p-amount">${car.price ? Number(car.price).toLocaleString() : "عند التواصل"}</span>
            <span class="p-curr">${car.price ? "ريال" : ""}</span>
          </div>
          ${car.monthlyInstallment ? `
            <div class="p-header" style="margin-top:12px; border-top:1px solid rgba(255,255,255,0.1); padding-top:8px;">قسط شهري يبدأ من</div>
            <div class="p-main-sm" style="font-size:22px; color:var(--p-copper); font-weight:800;">
              ${Number(car.monthlyInstallment).toLocaleString()} <span style="font-size:12px; font-weight:400; opacity:0.8;">ريال / شهرياً</span>
            </div>
          ` : ""}
          <div class="VAT-hint">${car.price ? "السعر شامل ضريبة القيمة المضافة" : ""}</div>
        </div>
      </div>

      <div class="details-main-split">
        <div class="details-media">
          <div class="main-viewer" onclick="window.openFullscreenGallery('${car.id}', document.getElementById('active-luxury-img').src)">
            <img src="${images[0]}" id="active-luxury-img" alt="${car.make} ${car.model}" onerror="this.src='logo.jpg'">
            <div class="viewer-actions">
              <button class="viewer-btn" onclick="event.stopPropagation(); window.switchLuxuryDetailImg('${car.id}', -1)"><i class="fas fa-chevron-right"></i></button>
              <button class="viewer-btn" onclick="event.stopPropagation(); window.switchLuxuryDetailImg('${car.id}', 1)"><i class="fas fa-chevron-left"></i></button>
            </div>
            <div class="zoom-hint"><i class="fas fa-expand"></i> انقر للتكبير</div>
          </div>
          ${images.length > 1 ? `
          <div class="thumbs-view custom-scrollbar">
            ${images.map((img, i) => `
              <div class="thumb-wrapper ${i === 0 ? 'active' : ''}" onclick="window.setLuxuryDetailImg(this, '${img}')">
                <img src="${img}" class="thumb-frame" onerror="this.src='logo.jpg'">
              </div>
            `).join('')}
          </div>
          ` : ""}
        </div>

        <div class="details-info-v4">
          <div class="specs-grid-v4-compact">
            <div class="spec-card-v5">
               <i class="fas fa-tachometer-alt"></i>
               <div class="s-info"><span>الممشى</span><strong>${(Number(car.mileage) || 0).toLocaleString()} كم</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-calendar-alt"></i>
               <div class="s-info"><span>الموديل</span><strong>${car.year}</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-fill-drip"></i>
               <div class="s-info"><span>اللون الخارجي</span><strong>${car.color || "غير محدد"}</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-palette"></i>
               <div class="s-info"><span>اللون الداخلي</span><strong>${car.interiorColor || "غير محدد"}</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-gas-pump"></i>
               <div class="s-info"><span>الوقود</span><strong>${car.fuelType || "بنزين"}</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-cog"></i>
               <div class="s-info"><span>الجير</span><strong>${car.gearbox || "أوتوماتيكي"}</strong></div>
            </div>
             <div class="spec-card-v5">
               <i class="fas fa-car-side"></i>
               <div class="s-info"><span>الفئة</span><strong>${car.bodyType || "فاخرة"}</strong></div>
            </div>
             <div class="spec-card-v5">
               <i class="fas fa-shield-alt"></i>
               <div class="s-info"><span>الحالة</span><strong>${car.status === 'available' ? 'متاح' : car.status === 'sold' ? 'مباع' : car.status === 'reserved' ? 'محجوز' : (car.status || 'متاح')}</strong></div>
            </div>
          </div>

          <div class="desc-card-v5" id="luxury-car-desc-container">
            <h3><i class="fas fa-list-ul"></i> وصف ومميزات السيارة</h3>
            <div class="desc-text-v5 custom-scrollbar" id="luxury-desc-body">
              ${(car.desc || car.description || car.details || "سيارة بحالة الوكالة...").replace(/\n/g, '<br>')}
            </div>
          </div>

          <div class="details-footer-actions-v3">
              <button onclick="window.bookCar('${car.id}')" class="btn-luxury-v2 wa-btn">
                <i class="fas fa-calendar-check"></i>
                <div class="btn-txt">
                  <strong>إحجز هذه السيارة الآن</strong>
                  <span>تعبئة طلب حجز الخدمة</span>
                </div>
              </button>
              <a href="tel:${window.normalizePhone(window.state.settings.contactSales || "")}" class="btn-luxury-v2 call-btn">
               <i class="fas fa-phone-alt"></i>
               <div class="btn-txt">
                 <strong>طلب إتصال هاتفي</strong>
                 <span>تواصل مباشر بالمبيعات</span>
               </div>
             </a>
          </div>
        </div>
      </div>
    </div>
  `;

  const body = document.getElementById("details-modal-body");
  if (body) {
    body.innerHTML = detailsContent;
    body.scrollTop = 0; // Reset scroll position to top

    // Reset modal container scroll position to prevent old scroll from carrying over
    const modalEl = document.getElementById("details-modal");
    if (modalEl) {
      modalEl.scrollTop = 0;
      const modalInner = modalEl.querySelector(".modal-inner");
      if (modalInner) modalInner.scrollTop = 0;
    }

    window.openModal("details-modal");
  }
  window.trackCarView(id);
};

window.bookCar = function (id) {
  const car = (window.state.cars || []).find(c => c.id === id);
  if (!car) return;

  const bCar = document.getElementById("b-car");
  if (bCar) {
    bCar.value = `${car.make} ${car.model} ${car.year}`;
  }

  // Close modal first
  window.closeModal("details-modal");

  // Wait for modal transition then scroll
  setTimeout(() => {
    const bookingSec = document.getElementById("booking");
    if (bookingSec) {
      bookingSec.scrollIntoView({ behavior: "smooth", block: "start" });
      
      if (bCar) {
        bCar.focus();
        bCar.classList.add('input-highlight');
        setTimeout(() => bCar.classList.remove('input-highlight'), 3000);
      }
    }
  }, 300);
};

window.viewBookingDetails = function (id) {
  const item = (window.state.bookings || []).find(i => i.id === id);
  if (!item) return;

  const staffName = window.state.users.find(u => u.id === item.assignedTo)?.name || "غير مسند";
  const statusLabel = item.status === "sold" ? "مكتمل" : item.status === "available" ? "متاح" : item.status === "rejected" ? "مرفوض" : item.status === "waiting" ? "بالانتظار" : "جديد";
  const stClass = item.status === "sold" ? "sold" : item.status === "new" ? "available" : "reserved";
  const statusMap = {
    new: "جديد",
    waiting: "بالانتظار",
    inquiry: "استفسار",
    sold: "مكتمل",
    rejected: "مرفوض",
    available: "متاح"
  };

  const detailsContent = `
    <div class="booking-modal-layout details-luxury-container" style="direction: rtl;">
      
      <!-- القسم الأيمن: تفاصيل الحجز -->
      <div class="details-info-v4 custom-scrollbar">
        <div class="p-header" style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:25px;">
           <div>
              <h2 style="margin:0; font-size:28px; color:var(--text-main); font-weight:800;">${item.name || 'عميل مجهول'}</h2>
              <p style="margin:5px 0 0; color:var(--text-dim); display:flex; align-items:center; gap:8px;">
                <i class="fas fa-phone-alt" style="font-size:12px; color:var(--p-copper);"></i> ${item.phone}
              </p>
           </div>
           <div class="status-badge-v3" style="background:var(--bg-card); padding:8px 16px; border-radius:12px; border:1px solid var(--glass-border); text-align:center;">
              <span style="display:block; font-size:10px; color:var(--text-dim); text-transform:uppercase;">حالة الطلب الحالية</span>
              <strong style="color:var(--p-copper); font-size:14px;">${statusMap[item.status] || item.status}</strong>
           </div>
        </div>

        <div class="details-grid-lite" style="display:grid; grid-template-columns: repeat(2, 1fr); gap:20px; margin-bottom:30px;">
            <div class="d-item" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:15px; border:1px solid var(--glass-border);">
                <span style="display:block; font-size:11px; color:var(--text-dim); margin-bottom:5px;">السيارة المطلوبة</span>
                <strong style="font-size:15px; color:var(--p-copper);"><i class="fas fa-car" style="margin-left:8px;"></i>${item.carRequested || 'غير محدد'}</strong>
            </div>
            <div class="d-item" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:15px; border:1px solid var(--glass-border);">
                <span style="display:block; font-size:11px; color:var(--text-dim); margin-bottom:5px;">تاريخ الطلب</span>
                <strong style="font-size:14px;"><i class="far fa-calendar-alt" style="margin-left:8px;"></i>${new Date(item.createdAt).toLocaleDateString('ar-SA')}</strong>
            </div>
        </div>

        <div class="update-section" style="background:rgba(255,255,255,0.03); padding:20px; border-radius:20px; border:1px solid var(--glass-border);">
            <h4 style="margin:0 0 15px; font-size:16px; font-weight:700;"><i class="fas fa-edit" style="margin-left:10px; color:var(--p-copper);"></i>تحديث حالة المتابعة</h4>
            
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; margin-bottom:15px;">
                <div class="f-group">
                    <label style="font-size:12px; color:var(--text-dim); margin-bottom:6px; display:block;">الحالة العامة</label>
                    <select id="update-booking-status" onchange="window.updateSubStatusOptions(this.value)" style="width:100%; border-radius:10px; padding:10px; background:var(--bg-alt); border:1px solid var(--glass-border); color:var(--text-main); font-family:inherit;">
                        ${Object.entries(statusMap).map(([k, v]) => `<option value="${k}" ${k === (item.status || "new") ? 'selected' : ''}>${v}</option>`).join('')}
                    </select>
                </div>
                <div class="f-group">
                    <label style="font-size:12px; color:var(--text-dim); margin-bottom:6px; display:block;">المحافظة / الوضع</label>
                    <select id="update-booking-substatus" style="width:100%; border-radius:10px; padding:10px; background:var(--bg-alt); border:1px solid var(--glass-border); color:var(--text-main); font-family:inherit;">
                        <!-- dynamic -->
                    </select>
                </div>
            </div>

            <div class="f-group" style="margin-bottom:15px;">
                <label style="font-size:12px; color:var(--text-dim); margin-bottom:6px; display:block;">ملاحظات الموظف الخاصة</label>
                <textarea id="update-booking-details" style="width:100%; min-height:80px; border-radius:12px; padding:12px; background:var(--bg-alt); border:1px solid var(--glass-border); color:var(--text-main); font-family:inherit; resize:vertical;">${item.additionalDetails || ""}</textarea>
            </div>

            <button onclick="window.updateBookingQuickStatus('${item.id}')" class="btn-premium" style="width:100%; padding:14px; border:none; border-radius:12px; font-weight:700; cursor:pointer;">
                حفظ التعديلات
            </button>
        </div>

        <div style="margin-top:20px; display:flex; gap:10px;">
            <a href="tel:${window.normalizePhone(item.phone)}" class="icon-btn-lite" style="flex:1; height:45px; border-radius:12px; background:#1c7c8c; color:white; border:none; gap:10px; display:flex; align-items:center; justify-content:center; text-decoration:none;">
                <i class="fas fa-phone-alt" style="color:white;"></i> مكالمة
            </a>
            <button onclick="window.fetchServerWAChat('${item.waJid || item.phone}', '${item.assignedTo || ''}')" class="icon-btn-lite" style="flex:1; height:45px; border-radius:12px; gap:10px; display:flex; align-items:center; justify-content:center; cursor:pointer;">
                <i class="fas fa-sync-alt"></i> تحديث الدردشة
            </button>
        </div>
      </div>

      <!-- القسم الأيسر: دردشة واتساب سيرفر -->
      <div class="details-wa-v4">
          <div class="wa-chat-header">
              <div class="avatar">
                  <i class="fab fa-whatsapp" style="font-size:24px; color:white;"></i>
              </div>
              <div style="flex:1; line-height:1.2;">
                  <h3 style="margin:0; font-weight:700;">${item.name || 'محادثة واتساب'}</h3>
                  <small style="opacity:0.8;">الرقم: ${item.phone}</small>
              </div>
              <div id="wa-connection-dot" style="width:10px; height:10px; background:#4de265; border-radius:50%; box-shadow:0 0 5px #4de265;" title="متصل بالسيرفر"></div>
          </div>

          <div id="wa-server-chat-box" class="custom-scrollbar">
              <div style="text-align:center; margin: auto;">
                  <i class="fas fa-circle-notch fa-spin" style="font-size:32px; color:#00a884; margin-bottom:15px;"></i>
                  <p style="font-size:13px; color:#666;">جاري تحميل محادثات السيرفر...</p>
              </div>
          </div>

          <div id="wa-quick-replies-bar">
               <!-- rendered via js -->
          </div>

          <div id="wa-emoji-picker" style="display:none; position:absolute; bottom:80px; right:15px; z-index:1000; background:white; border-radius:15px; box-shadow:0 10px 40px rgba(0,0,0,0.2); overflow:hidden; border:1px solid #ddd;">
               <emoji-picker style="width:300px; height:400px; -webkit-filter: grayscale(0);"></emoji-picker>
          </div>

          <div class="wa-input-bar">
              <i class="far fa-smile" style="font-size:22px; color:#54656f; cursor:pointer;" onclick="const p=document.getElementById('wa-emoji-picker'); p.style.display=p.style.display==='none'?'block':'none'"></i>
              <input type="file" id="wa-media-upload" style="display:none" onchange="window.handleWAMediaSelect('${item.waJid || item.phone}', '${item.assignedTo || ''}')">
              <i class="fas fa-paperclip" style="font-size:20px; color:#54656f; cursor:pointer;" onclick="document.getElementById('wa-media-upload').click()"></i>
              <i id="wa-mic-btn" class="fas fa-microphone" style="font-size:20px; color:#54656f; cursor:pointer;" onpointerdown="window.startWARecording()" onpointerup="window.stopWARecording('${item.waJid || item.phone}', '${item.assignedTo || ''}')"></i>
              
              <textarea id="wa-server-input" placeholder="اكتب رسالة للرد..." rows="1" 
                        style="flex:1; border:none; background:#f0f2f5; border-radius:20px; padding:10px 18px; font-family:inherit; font-size:14.5px; resize:none; max-height:150px; outline:none; height:42px; line-height:1.4; display:block; transition: background 0.2s;" 
                        onfocus="this.style.background='white'; this.style.boxShadow='inset 0 0 0 1px #eee';" 
                        onblur="this.style.background='#f0f2f5'; this.style.boxShadow='none';"
                        oninput="this.style.height = '42px'; this.style.height = Math.min(this.scrollHeight, 150) + 'px';" 
                        onkeydown="if(event.key==='Enter' && !event.shiftKey) { event.preventDefault(); window.sendServerWAMessage('${item.waJid || item.phone}', '${item.assignedTo || ''}'); }"></textarea>
              
              <button class="wa-send-btn" onclick="window.sendServerWAMessage('${item.waJid || item.phone}', '${item.assignedTo || ''}')">
                  <i class="fas fa-paper-plane"></i>
              </button>
          </div>
      </div>
    </div>
  `;

  const body = document.getElementById("details-modal-body");
  if (body) {
    body.innerHTML = detailsContent;
    body.scrollTop = 0;
    const modalEl = document.getElementById("details-modal");
    if (modalEl) modalEl.scrollTop = 0;
    window.openModal("details-modal");

    // Auto-fetch WhatsApp server chat && Register modern emoji picker
    setTimeout(() => {
      if (window.fetchServerWAChat) window.fetchServerWAChat(item.waJid || item.phone, item.assignedTo || '');
      if (window.updateSubStatusOptions) window.updateSubStatusOptions(item.status || 'new', item.subStatus || 'not_contacted');
      if (window.renderQuickRepliesBar) window.renderQuickRepliesBar();

      const picker = document.querySelector('emoji-picker');
      if (picker) {
        picker.addEventListener('emoji-click', event => {
          const input = document.getElementById('wa-server-input');
          if (input) {
            input.value += event.detail.unicode;
            input.focus();
          }
        });
      }
    }, 100);
  }
};

window.updateSubStatusOptions = function (status, currentSub = null) {
  const select = document.getElementById("update-booking-substatus");
  if (!select) return;

  const options = {
    new: [{ v: "not_contacted", t: "لم يتم التواصل" }, { v: "contacted", t: "تم التواصل" }],
    waiting: [
      { v: "docs_received", t: "تم استلام الاوراق" }, { v: "waiting_calc", t: "انتظار رد العميل" },
      { v: "waiting_docs", t: "إنتظار إكمال الاوراق" }, { v: "waiting_signature", t: "إنتظار توقيع العميل" }
    ],
    inquiry: [{ v: "docs_not_received", t: "لم يتم استلام الاوراق" }],
    sold: [{ v: "signed", t: "تم التوقيع" }, { v: "delivered", t: "تم التسليم" }],
    rejected: [
      { v: "no_response", t: "لم يتم رد العميل" }, { v: "obligations", t: "التزامات" },
      { v: "calc_rejected", t: "رفض الحسبة" }, { v: "ineligible", t: "غير مسموح له" },
      { v: "duplicate", t: "مكرر" }
    ]
  };

  const list = options[status] || [{ v: "none", t: "-" }];
  select.innerHTML = list.map(opt => `<option value="${opt.v}" ${opt.v === currentSub ? 'selected' : ''}>${opt.t}</option>`).join('');
};

window.updateBookingQuickStatus = async function (id) {
  const status = document.getElementById("update-booking-status")?.value;
  const subStatus = document.getElementById("update-booking-substatus")?.value || "";
  const additionalDetails = document.getElementById("update-booking-details")?.value || "";

  if (!status || !id) return;

  try {
    const bRef = ref(db, `bookings/${id}`);
    await update(bRef, {
      status,
      subStatus,
      additionalDetails,
      updatedAt: new Date().toISOString()
    });
    window.showLuxuryToast("تم تحديث حالة الطلب والتفاصيل بنجاح");
    // Modal will stay open, but state will sync via onValue and syncAdminTables will be called automatically
  } catch (err) {
    console.error(err);
    window.showLuxuryToast("فشل تحديث الحالة", "error");
  }
};

window.saveWAServerURL = async function () {
  const url = document.getElementById('wa-server-url-config')?.value;
  if (url) {
    localStorage.setItem('wa_server_url', url);
    try {
      await set(ref(db, 'settings/waServerUrl'), url);
    } catch (e) { console.error("Firebase save config error:", e); }
    window.showLuxuryToast('تم حفظ رابط السيرفر وتعميمه لجميع الموظفين بنجاح. يرجى إعادة تحميل الصفحة.');
    setTimeout(() => location.reload(), 1500);
  }
};

window.setLuxuryDetailImg = function (wrapper, src) {
  document.getElementById('active-luxury-img').src = src;
  document.querySelectorAll('.thumb-wrapper').forEach(w => w.classList.remove('active'));
  wrapper.classList.add('active');
};

window.switchLuxuryDetailImg = function (carId, dir) {
  const car = window.state.cars.find(c => c.id === carId);
  if (!car) return;
  const images = car.images || [car.image || "logo.jpg"];
  const currentImg = document.getElementById('active-luxury-img').src;

  // Find current index
  let idx = images.findIndex(img => currentImg.includes(img));
  if (idx === -1) idx = 0;

  let nextIdx = (idx + dir + images.length) % images.length;
  const newSrc = images[nextIdx];

  document.getElementById('active-luxury-img').src = newSrc;

  // Sync thumbnails
  const thumbs = document.querySelectorAll('.thumb-wrapper');
  if (thumbs[nextIdx]) {
    thumbs.forEach(w => w.classList.remove('active'));
    thumbs[nextIdx].classList.add('active');
  }
};



window.openFullscreenGallery = function (id, activeSrc) {
  const car = window.state.cars.find(c => c.id === id);
  if (!car) return;
  const images = car.images || [car.image || "logo.jpg"];

  const viewer = document.createElement('div');
  viewer.className = 'luxury-lightbox';
  viewer.innerHTML = `
        <div class="lb-close" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></div>
        <div class="lb-content">
            <img src="${activeSrc}" id="lb-main-img">
            <div class="lb-nav">
                <button onclick="window.navLightbox('${id}', -1)"><i class="fas fa-chevron-right"></i></button>
                <button onclick="window.navLightbox('${id}', 1)"><i class="fas fa-chevron-left"></i></button>
            </div>
        </div>
        <div class="lb-thumbs">
            ${images.map(img => `<img src="${img}" class="lb-thumb ${img === activeSrc ? 'active' : ''}" onclick="document.getElementById('lb-main-img').src='${img}'; this.parentElement.querySelectorAll('.lb-thumb').forEach(t=>t.classList.remove('active')); this.classList.add('active');">`).join('')}
        </div>
    `;
  document.body.appendChild(viewer);
};

window.navLightbox = function (id, dir) {
  const car = window.state.cars.find(c => c.id === id);
  const images = car.images || [car.image || "logo.jpg"];
  const mainImg = document.getElementById('lb-main-img');
  let currentIdx = images.indexOf(mainImg.src);
  if (currentIdx === -1) currentIdx = 0;

  let newIdx = currentIdx + dir;
  if (newIdx < 0) newIdx = images.length - 1;
  if (newIdx >= images.length) newIdx = 0;

  mainImg.src = images[newIdx];
  const thumbs = document.querySelectorAll('.lb-thumb');
  thumbs.forEach(t => t.classList.remove('active'));
  thumbs[newIdx].classList.add('active');
};

window.trackCarView = async function (id) {
  if (!id) return;
  try {
    const countRef = ref(db, `analytics/popularCars/${id}`);
    await runTransaction(countRef, (current) => {
      return (current || 0) + 1;
    });
  } catch (e) {
    console.error("Tracking Error:", e);
  }
};

window.resetFilters = function () {
  const fields = ["car-search-input", "filter-make", "filter-type", "filter-year", "filter-sort"];
  fields.forEach(f => {
    const el = document.getElementById(f);
    if (el) el.value = el.tagName === "SELECT" ? (f === "filter-sort" ? "newest" : "all") : "";
  });
  window.applyInventoryFilters();
};

window.trackVisit = async function () {
  try {
    const today = new Date().toISOString().split("T")[0];
    if (localStorage.getItem("visited_" + today)) return;
    localStorage.setItem("visited_" + today, "true");

    const analyticsRef = ref(db, "analytics");
    await runTransaction(analyticsRef, (data) => {
      if (!data) data = { totalVisits: 0, dailyVisits: {}, browsers: {}, devices: {}, popularCars: {} };

      data.totalVisits = (data.totalVisits || 0) + 1;
      data.dailyVisits = data.dailyVisits || {};
      data.dailyVisits[today] = (data.dailyVisits[today] || 0) + 1;

      const ua = navigator.userAgent;
      let browser = "Other";
      if (ua.includes("Chrome")) browser = "Chrome";
      else if (ua.includes("Safari")) browser = "Safari";
      else if (ua.includes("Firefox")) browser = "Firefox";
      else if (ua.includes("Edge")) browser = "Edge";

      data.browsers = data.browsers || {};
      data.browsers[browser] = (data.browsers[browser] || 0) + 1;

      const device = /iPhone|iPad|iPod|Android/i.test(ua) ? "mobile" : "desktop";
      data.devices = data.devices || {};
      data.devices[device] = (data.devices[device] || 0) + 1;

      return data;
    });
  } catch (e) {
    console.error("Analytics Error:", e);
  }
};
// =========================================================================================
// AUTH & ACCOUNT MANAGEMENT
// =========================================================================================

window.loginAdmin = async function (e) {
  e.preventDefault();
  const email = document.getElementById("admin-email")?.value;
  const pass = document.getElementById("admin-pass")?.value;
  const btn = e.target.querySelector("button");

  if (!email || !pass) return window.showLuxuryToast("يرجى إدخال البريد وكلمة المرور", "error");

  const originalBtnText = btn.innerText;
  btn.innerText = "جاري التحقق...";
  btn.disabled = true;

  try {
    await signInWithEmailAndPassword(auth, email, pass);
    window.showLuxuryToast("تم تسجيل الدخول بنجاح");
    window.createLog("تسجيل دخول", "نجاح تسجيل الدخول للنظام", "auth");
    window.closeModal("admin-modal");
  } catch (err) {
    console.error(err);
    window.showLuxuryToast("خطأ في البيانات، يرجى المحاولة مرة أخرى", "error");
  } finally {
    btn.innerText = originalBtnText;
    btn.disabled = false;
  }
};

window.logout = async function () {
  if (confirm("هل أنت متأكد من تسجيل الخروج؟")) {
    await window.createLog("تسجيل خروج", "خرج المستخدم من النظام", "auth");
    await signOut(auth);
    window.showLuxuryToast("تم تسجيل الخروج");
  }
};

// =========================================================================================
// SETTINGS & BRANDING
// =========================================================================================

window.DESIGN_PRESETS = {
  emerald: {
    primaryColor: "#065f46",
    secondaryColor: "#10b981",
    accentColor: "#fbbf24",
    glassBlur: 25,
    borderRadius: 20,
    cardStyle: "glass",
    glassOpacity: 0.6,
    light: { bgColor: "#ecfdf5", textColor: "#064e3b" },
    dark: { bgColor: "#022c22", textColor: "#ecfdf5" }
  },
  royal: {
    primaryColor: "#4c1d95",
    secondaryColor: "#8b5cf6",
    accentColor: "#f59e0b",
    glassBlur: 15,
    borderRadius: 12,
    cardStyle: "glass",
    glassOpacity: 0.8,
    light: { bgColor: "#f5f3ff", textColor: "#2e1065" },
    dark: { bgColor: "#0f0720", textColor: "#f5f3ff" }
  },
  midnight: {
    primaryColor: "#1e1b4b",
    secondaryColor: "#4338ca",
    accentColor: "#6366f1",
    glassBlur: 30,
    borderRadius: 24,
    cardStyle: "glass",
    glassOpacity: 0.7,
    light: { bgColor: "#f0f9ff", textColor: "#0c4a6e" },
    dark: { bgColor: "#020617", textColor: "#f0f9ff" }
  },
  classic: {
    primaryColor: "#907537",
    secondaryColor: "#b39651",
    accentColor: "#c8a95e",
    glassBlur: 0,
    borderRadius: 8,
    cardStyle: "solid",
    glassOpacity: 1,
    light: { bgColor: "#f8fafc", textColor: "#0f172a" },
    dark: { bgColor: "#05080c", textColor: "#f8fafc" }
  },
  gold: {
    primaryColor: "#c8a95e",
    secondaryColor: "#d4af37",
    accentColor: "#ffd700",
    glassBlur: 10,
    borderRadius: 0,
    cardStyle: "glass",
    glassOpacity: 0.9,
    light: { bgColor: "#fffdf0", textColor: "#2d2300" },
    dark: { bgColor: "#050500", textColor: "#fffdf0" }
  },
  ocean: {
    primaryColor: "#0f172a",
    secondaryColor: "#38bdf8",
    accentColor: "#2dd4bf",
    glassBlur: 20,
    borderRadius: 30,
    cardStyle: "glass",
    glassOpacity: 0.5,
    light: { bgColor: "#f0f9ff", textColor: "#0c4a6e" },
    dark: { bgColor: "#020617", textColor: "#f0f9ff" }
  },
  carbon: {
    primaryColor: "#171717",
    secondaryColor: "#404040",
    accentColor: "#ef4444",
    glassBlur: 5,
    borderRadius: 4,
    cardStyle: "solid",
    glassOpacity: 1,
    light: { bgColor: "#f5f5f5", textColor: "#171717" },
    dark: { bgColor: "#0a0a0a", textColor: "#f5f5f5" }
  }
};

window.applyDesignPreset = function (presetKey) {
  const preset = window.DESIGN_PRESETS[presetKey];
  if (!preset) return;
  window.applySettings({ ...window.state.settings, ...preset });
  showLuxuryToast(window.state.lang === 'ar' ? "تم تطبيق النمط بنجاح" : "Preset applied successfully");
};

window.saveCustomDesign = async function () {
  const name = prompt(window.state.lang === 'ar' ? "أدخل اسماً لمظهرك المخصص:" : "Enter a name for your custom design:");
  if (!name) return;

  const currentSettings = {
    primaryColor: document.getElementById("set-color-primary")?.value,
    secondaryColor: document.getElementById("set-color-secondary")?.value,
    accentColor: document.getElementById("set-color-accent")?.value,
    glassBlur: parseInt(document.getElementById("set-glass-blur")?.value || "20"),
    shadowDepth: parseInt(document.getElementById("set-shadow-depth")?.value || "40"),
    borderRadius: document.getElementById("set-border-radius")?.value || "16",
    cardStyle: document.getElementById("set-card-style")?.value || "glass",
    glassOpacity: parseFloat(document.getElementById("set-glass-opacity")?.value || "0.75"),
    bgColor: document.getElementById("set-color-bg")?.value,
    textColor: document.getElementById("set-color-text")?.value,
    name: name,
    createdAt: new Date().toISOString()
  };

  try {
    const newRef = push(ref(db, "custom_presets"));
    await set(newRef, currentSettings);
    showLuxuryToast(window.state.lang === 'ar' ? "تم حفظ المظهر الخاص بنجاح" : "Custom design saved successfully");
  } catch (e) {
    showLuxuryToast("فشل الحفظ", "error");
  }
};

window.deleteCustomPreset = async function (id) {
  if (!confirm(window.state.lang === 'ar' ? "هل أنت متأكد من حذف هذا المظهر؟" : "Are you sure you want to delete this preset?")) return;
  try {
    await remove(ref(db, `custom_presets/${id}`));
    showLuxuryToast(window.state.lang === 'ar' ? "تم الحذف" : "Deleted");
  } catch (e) {
    showLuxuryToast("Error", "error");
  }
};

window.renderCustomPresets = function () {
  const container = document.getElementById("custom-presets-list");
  if (!container) return;

  const presets = window.state.custom_presets || [];
  if (presets.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; opacity:0.5; padding:20px;">${window.state.lang === 'ar' ? 'لا يوجد مظاهر محفوظة' : 'No saved designs'}</div>`;
    return;
  }

  container.innerHTML = presets.map(p => `
    <div class="custom-preset-card" style="background:var(--bg-card); border:1px solid var(--glass-border); padding:15px; border-radius:12px; display:flex; justify-content:space-between; align-items:center;">
       <div>
         <div style="font-weight:bold; margin-bottom:5px;">${p.name}</div>
         <div style="display:flex; gap:5px;">
            <span style="width:12px; height:12px; border-radius:50%; background:${p.primaryColor};"></span>
            <span style="width:12px; height:12px; border-radius:50%; background:${p.secondaryColor};"></span>
         </div>
       </div>
       <div style="display:flex; gap:10px;">
          <button class="btn-premium btn-sm" onclick="window.applySettings(window.state.custom_presets.find(x => x.id === '${p.id}'))" style="padding:5px 10px; font-size:11px;">تطبيق</button>
          <button class="btn-premium btn-sm" onclick="window.deleteCustomPreset('${p.id}')" style="background:var(--p-red); padding:5px 10px; font-size:11px;"><i class="fas fa-trash"></i></button>
       </div>
    </div>
  `).join('');
};

window.applySettings = function (s) {
  if (!s) return;
  const root = document.documentElement;

  if (s.defaultTheme) {
    const isOverridden = localStorage.getItem("theme_manually_overridden") === "true";
    if (!isOverridden) {
      document.body.setAttribute("data-theme", s.defaultTheme);
      localStorage.setItem("luxury_theme", s.defaultTheme);
      const themeBtn = document.getElementById("theme-btn");
      if (themeBtn) {
        themeBtn.innerHTML = s.defaultTheme === "dark" ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      }
    }
  }

  if (s.primaryColor) {
    root.style.setProperty("--p-red", s.primaryColor);
    root.style.setProperty("--p-red-glow", s.primaryColor + "66");
  }
  if (s.secondaryColor) root.style.setProperty("--p-teal", s.secondaryColor);
  if (s.accentColor) root.style.setProperty("--p-copper", s.accentColor);

  const logo = s.logo || "logo.jpg";
  document.querySelectorAll(".logo-wrap img, .sidebar-brand img, .splash-logo img, #footer-logo-img, #nav-logo-img, #splash-logo-img").forEach(img => {
    img.src = logo;
  });

  const nameAr = s.nameAr || "ديار كار";
  const nameEn = s.nameEn || "DIAR CAR";
  const currentName = window.state.lang === "ar" ? nameAr : nameEn;

  document.querySelectorAll(".dynamic-name-ar").forEach(el => el.innerText = nameAr);
  document.querySelectorAll(".dynamic-name-en").forEach(el => el.innerText = nameEn);

  document.title = currentName + " | " + (window.state.lang === "ar" ? "الفخامة في عالم السيارات" : "Luxury Automotive");

  if (s.fontFamily) {
    root.style.setProperty("--font-main", s.fontFamily);
    document.body.style.fontFamily = s.fontFamily;
  }

  // Dynamic Design Styles (Border Radius, Card Styles, Hover Effects, Logo Blends)
  const styleId = "dynamic-design-styles";
  let style = document.getElementById(styleId);
  if (!style) {
    style = document.createElement("style");
    style.id = styleId;
    document.head.appendChild(style);
  }

  let css = "";

  // Theme-aware Global Background & Text Overrides
  const darkBG = s.dark?.bgColor || s.bgColor;
  const darkText = s.dark?.textColor || s.textColor;
  const lightBG = s.light?.bgColor;
  const lightText = s.light?.textColor;

  if (darkBG) css += `body[data-theme="dark"] { --bg-main: ${darkBG}; }\n`;
  if (darkText) css += `body[data-theme="dark"] { --text-main: ${darkText}; }\n`;
  if (lightBG) css += `body[data-theme="light"] { --bg-main: ${lightBG}; }\n`;
  if (lightText) css += `body[data-theme="light"] { --text-main: ${lightText}; }\n`;

  if (s.borderRadius) {
    root.style.setProperty("--border-radius-main", s.borderRadius + "px");
    css += `
      .car-card-premium, .ad-slide, .nav-premium, .modal-inner, .video-card-v2, .feature-card, .btn-premium { 
        border-radius: ${s.borderRadius}px !important; 
      }
    `;
  }

  if (s.glassBlur) root.style.setProperty("--glass-blur", s.glassBlur + "px");
  if (s.shadowDepth) root.style.setProperty("--shadow-depth", s.shadowDepth + "px");
  if (s.shadowOpacity) root.style.setProperty("--shadow-opacity", s.shadowOpacity);
  if (s.animSpeed) root.style.setProperty("--anim-speed-multiplier", s.animSpeed);

  if (s.cardStyle === "solid") {
    css += `
      body[data-theme="dark"] .car-card-premium, body[data-theme="dark"] .modal-inner, body[data-theme="dark"] .stat-premium-card, body[data-theme="dark"] .admin-item-row {
         background: var(--bg-alt) !important;
         border: 1px solid rgba(255,255,255,0.05) !important;
         backdrop-filter: none !important;
         -webkit-backdrop-filter: none !important;
      }
      body[data-theme="light"] .car-card-premium, body[data-theme="light"] .modal-inner, body[data-theme="light"] .stat-premium-card, body[data-theme="light"] .admin-item-row {
         background: var(--bg-alt) !important;
         border: 1px solid rgba(0,0,0,0.05) !important;
         backdrop-filter: none !important;
         -webkit-backdrop-filter: none !important;
      }
    `;
  } else {
    let op = s.glassOpacity !== undefined ? s.glassOpacity : 0.75;
    let blurVal = s.glassBlur !== undefined ? s.glassBlur : 20;
    css += `
      body[data-theme="dark"] .car-card-premium, body[data-theme="dark"] .modal-inner, body[data-theme="dark"] .stat-premium-card, body[data-theme="dark"] .nav-premium, body[data-theme="dark"] .admin-item-row {
         background: rgba(17, 24, 39, ${op}) !important;
         backdrop-filter: blur(${blurVal}px) !important;
         -webkit-backdrop-filter: blur(${blurVal}px) !important;
      }
      body[data-theme="light"] .car-card-premium, body[data-theme="light"] .modal-inner, body[data-theme="light"] .stat-premium-card, body[data-theme="light"] .nav-premium, body[data-theme="light"] .admin-item-row {
         background: rgba(255, 255, 255, ${op}) !important;
         backdrop-filter: blur(${blurVal}px) !important;
         -webkit-backdrop-filter: blur(${blurVal}px) !important;
         border: 1px solid rgba(0,0,0,0.05) !important;
      }
    `;
  }

  if (s.logoBlend && s.logoBlend !== 'auto') {
    const logoUrl = s.logo || 'logo.jpg';
    if (s.logoBlend === 'mask') {
      css += `
        .logo-wrap img, .sidebar-brand img, .splash-logo img, #footer-logo-img, #nav-logo-img, #splash-logo-img {
           /* Mask works ONLY if the logo image is a transparent PNG */
           -webkit-mask-image: url("${logoUrl}");
           mask-image: url("${logoUrl}");
           -webkit-mask-size: contain;
           mask-size: contain;
           -webkit-mask-repeat: no-repeat;
           mask-repeat: no-repeat;
           -webkit-mask-position: center;
           mask-position: center;
           ${s.enablePrimaryGradient ? `background: linear-gradient(135deg, ${s.primaryGradColor1 || "#907537"}, ${s.primaryGradColor2 || "#b39651"}) !important;` : 'background-color: var(--p-gold) !important;'}
           content: url("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7") !important;
           object-fit: contain;
           display: inline-block;
           min-width: 40px;
           min-height: 40px;
        }
      `;
    } else {
      css += `
        .logo-wrap img, .sidebar-brand img, .splash-logo img, #footer-logo-img, #nav-logo-img, #splash-logo-img {
           ${s.logoBlend === 'multiply' ? 'mix-blend-mode: multiply; filter: contrast(1.3) brightness(0.95);' : ''}
           ${s.logoBlend === 'screen' ? 'mix-blend-mode: lighten; filter: contrast(2) brightness(0.9);' : ''}
           ${(s.logoBlend !== 'multiply' && s.logoBlend !== 'screen') ? `mix-blend-mode: ${s.logoBlend};` : ''}
        }
      `;
    }
  }

  if (s.logoScale) {
    css += `
      .logo-wrap img, .sidebar-brand img, .splash-logo img, #footer-logo-img, #nav-logo-img, #splash-logo-img {
         transform: scale(${s.logoScale});
      }
    `;
  }

  if (s.hoverEffect === "scale") {
    css += `
      .car-card-premium:hover, .btn-premium:hover, .stat-premium-card:hover { transform: scale(1.02) translateY(-3px); transition: all 0.3s; z-index: 20; position:relative; }
    `;
  } else if (s.hoverEffect === "glow") {
    css += `
      .car-card-premium:hover, .btn-premium:hover, .stat-premium-card:hover { box-shadow: 0 0 20px var(--p-red-glow) !important; transition: box-shadow 0.3s; z-index: 20; position:relative; }
    `;
  }

  if (s.enableAnimations === false) {
    css += `* { transition: none !important; animation: none !important; }`;
  } else if (s.enableAnimations === true) {
    css += `
      .car-card-premium, .stat-premium-card, .feature-card {
        animation: fadeInUp 0.6s backwards calc(var(--anim-speed-multiplier) * 0.1s);
      }
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
  }

  // Advanced Gradients & Creative Aesthetics
  if (s.enableTextGradient) {
    const c1 = s.textGradColor1 || "#c8a95e";
    const c2 = s.textGradColor2 || "#ffffff";
    css += `
      .logo-brand-name h1, .luxury-font, .hero-main-title, .section-title-v2, .car-title-v3, .p-amount, .hero-secondary-title,
      .dynamic-name-ar, .dynamic-name-en, .luxury-logo-gold, #wa-widget-name,
      .luxury-name-en-splash, .luxury-name-en-nav, .luxury-name-en-hero,
      #luxury-splash .dynamic-name-ar, #luxury-splash .dynamic-name-en,
      .top-bar-luxury .dynamic-name-ar, .top-bar-luxury .dynamic-name-en,
      .nav-premium .dynamic-name-ar, .nav-premium .dynamic-name-en {
        background: linear-gradient(135deg, ${c1}, ${c2}) !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        background-clip: text !important;
        display: inline-block !important;
      }
    `;
  }

  if (s.enableTopbarGradient) {
    const c1 = s.topbarGradColor1 || "#907537";
    const c2 = s.topbarGradColor2 || "#05080c";
    css += `
      .top-bar-luxury {
        background: linear-gradient(90deg, ${c1}, ${c2}) !important;
      }
    `;
  }

  if (s.enablePrimaryGradient) {
    const c1 = s.primaryGradColor1 || "#907537";
    const c2 = s.primaryGradColor2 || "#b39651";
    css += `
      .btn-premium, .car-price-v3, .car-badge-v3.available, .badge-v3.year, .p-header, .stat-icon, .car-badge-v3.custom, .hero-btn-v3 {
        background: linear-gradient(135deg, ${c1}, ${c2}) !important;
        border: none !important;
        color: white !important;
      }
      .btn-premium:hover, .hero-btn-v3:hover {
        filter: brightness(1.2);
        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
      }
    `;
  }

  if (s.enableSecondaryGradient) {
    const c1 = s.secondaryGradColor1 || "#b39651";
    const c2 = s.secondaryGradColor2 || "#0f172a";
    css += `
      .btn-secondary, .secondary-badge, .p-tab.active, .bullet-point, .nav-item.active, .dash-tab.active {
        background: linear-gradient(135deg, ${c1}, ${c2}) !important;
        color: white !important;
        border: none !important;
      }
    `;
  }

  if (s.enableAccentGradient) {
    const c1 = s.accentGradColor1 || "#c8a95e";
    const c2 = s.accentGradColor2 || "#ffd700";
    css += `
      .accent-glow, .car-badge-v3.reserved, .main-badge, .floating-preview-hud, .btn-action-lite:hover {
        border-color: ${c1} !important;
      }
      .accent-gradient-bg, .badge-v3.year, .main-badge, .stat-icon-v3 {
        background: linear-gradient(135deg, ${c1}, ${c2}) !important;
        color: white !important;
      }
      .accent-text {
        background: linear-gradient(135deg, ${c1}, ${c2});
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    `;
  }

  style.innerHTML = css;

  // 1. Guest-facing Dynamic UI
  const aboutText = document.getElementById("about-text-display");
  if (aboutText) aboutText.innerText = s.aboutUs || "نقدم لكم تجربة استثنائية في عالم السيارات...";

  const locationText = document.getElementById("location-text-display");
  if (locationText) locationText.innerText = s.location || "الرياض - معارض القادسية";

  const locLink = document.getElementById("contact-location-link");
  if (locLink) locLink.href = s.locationUrl || "#";

  // Phone & Email with auto-hide logic
  const contactMap = {
    "f-phone-admin": s.contactAdmin,
    "f-phone-sales": s.contactSales,
    "f-phone-info": s.contactComplaints,
    "f-email-display": s.contactEmail
  };

  Object.entries(contactMap).forEach(([id, val]) => {
    const el = document.getElementById(id);
    const row = document.getElementById(`contact-${id.split('-')[1]}-display`) || (el ? el.closest('li') : null);
    if (el) el.innerText = val || "...";
    if (row) row.classList.toggle("hidden", !val);
  });

  // Update Floating Call Button
  const floatCall = document.getElementById("float-call");
  if (floatCall) {
    const salesPhone = s.contactSales || "";
    const cleanPhone = window.normalizePhone(salesPhone);
    floatCall.href = salesPhone ? `tel:${cleanPhone}` : "tel:";
  }

  // Meta Tags & Social
  const metaTitle = document.getElementById("meta-title");
  const finalTitle = `${nameAr} | ${s.metaTitle || "تمويل وبيع أفضل السيارات المعتمدة في السعودية - الرياض"}`;
  if (metaTitle) metaTitle.innerText = finalTitle;

  const metaDesc = document.getElementById("meta-description");
  const finalDesc = s.metaDesc || "وجهتكم الأولى لتمويل وشراء وبيع السيارات الفاخرة في المملكة العربية السعودية. نوفر أفضل السيارات بأسعار تنافسية وجدولة تمويل مرنة وجودة مضمونة.";
  if (metaDesc) metaDesc.setAttribute("content", finalDesc);

  // Dynamic Social Meta Sync
  const updateMeta = (selector, attr, val) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, val);
  };
  updateMeta('meta[property="og:title"]', 'content', finalTitle);
  updateMeta('meta[property="og:description"]', 'content', finalDesc);
  updateMeta('meta[property="twitter:title"]', 'content', finalTitle);
  updateMeta('meta[property="twitter:description"]', 'content', finalDesc);

  const socMapping = { "f-insta": s.socialInsta, "f-snap": s.socialSnap, "f-twitter": s.socialTwitter };
  Object.entries(socMapping).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.href = val || "#";
  });

  // 2. Admin-facing Settings Form (Two-way binding)
  const formMapping = {
    "set-name-ar": s.nameAr || "",
    "set-name-en": s.nameEn || "",
    "set-color-primary": s.primaryColor || "#907537",
    "set-color-secondary": s.secondaryColor || "#b39651",
    "set-color-accent": s.accentColor || "#c8a95e",
    "set-color-bg": s.bgColor || "#05080c",
    "set-color-text": s.textColor || "#f8fafc",
    "set-hover-effect": s.hoverEffect || "scale",
    "set-card-style": s.cardStyle || "glass",
    "set-glass-opacity": s.glassOpacity !== undefined ? s.glassOpacity : 0.75,
    "set-logo-blend": s.logoBlend || "auto",
    "set-logo-scale": s.logoScale || "1",
    "set-default-theme": s.defaultTheme || "dark",
    "set-font-family": s.fontFamily || "'Cairo', sans-serif",
    "set-border-radius": s.borderRadius || "16",
    "set-glass-blur": s.glassBlur || 20,
    "set-shadow-depth": s.shadowDepth || 40,
    "set-anim-speed": s.animSpeed || 1,
    "set-enable-animations": s.enableAnimations !== undefined ? s.enableAnimations.toString() : "true",
    "set-contact-mgmt": s.contactAdmin || "",
    "set-contact-sales": s.contactSales || "",
    "set-contact-complaints": s.contactComplaints || "",
    "set-contact-email": s.contactEmail || "",
    "set-about-text": s.aboutUs || "",
    "set-location-link": s.locationUrl || "",
    "set-location-text": s.location || "",
    "set-insta-link": s.socialInsta || "",
    "set-snap-link": s.socialSnap || "",
    "set-twitter-link": s.socialTwitter || "",
    "set-text-grad-1": s.textGradColor1 || "#c8a95e",
    "set-text-grad-2": s.textGradColor2 || "#ffffff",
    "set-topbar-grad-1": s.topbarGradColor1 || "#907537",
    "set-topbar-grad-2": s.topbarGradColor2 || "#05080c",
    "set-primary-grad-1": s.primaryGradColor1 || "#907537",
    "set-primary-grad-2": s.primaryGradColor2 || "#b39651"
  };
  Object.entries(formMapping).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) {
      el.value = val;
      // visual updates for inputs inside UI
      if (el.type === 'range' || el.type === 'color') {
        let ev = document.createEvent('HTMLEvents');
        ev.initEvent('input', false, true);
        el.dispatchEvent(ev);
      }
    }
  });

  const checkMapping = {
    "set-maintenance-mode": s.maintenanceMode || false,
    "set-enable-text-grad": s.enableTextGradient !== undefined ? s.enableTextGradient : true,
    "set-enable-topbar-grad": s.enableTopbarGradient !== undefined ? s.enableTopbarGradient : true,
    "set-enable-primary-grad": s.enablePrimaryGradient !== undefined ? s.enablePrimaryGradient : true,
    "set-enable-secondary-grad": s.enableSecondaryGradient !== undefined ? s.enableSecondaryGradient : true,
    "set-enable-accent-grad": s.enableAccentGradient !== undefined ? s.enableAccentGradient : true
  };
  Object.entries(checkMapping).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.checked = val;
  });

  const logoPreview = document.getElementById("logo-preview-img");
  if (logoPreview) logoPreview.src = logo;

  localStorage.setItem("luxury-settings-cache", JSON.stringify(s));
};

window.resetToDefaultSettings = async function () {
  if (confirm("هل أنت متأكد من إعادة ضبط كافة الإعدادات؟ سيتم فقدان الشعارات والألوان المخصصة.")) {
    const defaults = {
      nameAr: "ديار كار", nameEn: "DIAR CAR", primaryColor: "#907537", secondaryColor: "#b39651",
      accentColor: "#c8a95e", defaultTheme: "dark", borderRadius: "16px", logo: "logo.jpg",
      aboutUs: "تجربة استثنائية في عالم السيارات", location: "الرياض - معارض القادسية"
    };
    await set(ref(db, "settings"), defaults);
    window.showLuxuryToast("تمت إعادة الضبط بنجاح");
  }
};

window.markAllNotificationsRead = async function () {
  try {
    const refs = window.state.notifications.map(n => update(ref(db, `notifications/${n.id}`), { read: true }));
    await Promise.all(refs);
    window.showLuxuryToast("تم تحديد الكل كمقروء");
  } catch (e) {
    console.error(e);
  }
};

window.switchSettingsTab = function (tabId, btn) {
  document.querySelectorAll(".set-pane").forEach(p => p.classList.add("hidden"));
  document.querySelectorAll(".set-tab").forEach(t => t.classList.remove("active"));

  const target = document.getElementById(tabId);
  if (target) target.classList.remove("hidden");
  if (btn) btn.classList.add("active");
};

window.previewLogo = async function (input) {
  if (input.files && input.files[0]) {
    try {
      const b64 = await window.compressImage(input.files[0], 400, 400, 0.8);
      document.getElementById("logo-preview-img").src = b64;
      document.getElementById("set-logo-b64").value = b64;
    } catch (e) {
      console.error("Logo compression failed", e);
    }
  }
};

window.removeBlackFromLogo = function () {
  const imgElement = document.getElementById("logo-preview-img");
  const b64Input = document.getElementById("set-logo-b64");
  if (!b64Input || !b64Input.value) {
    window.showLuxuryToast("الرجاء رفع شعار أولاً");
    return;
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Determine if the background is likely black by checking the top-left pixel
    const bgR = data[0];
    const bgG = data[1];
    const bgB = data[2];
    const isBlackBg = (bgR < 50 && bgG < 50 && bgB < 50);

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      if (a === 0) continue;

      const maxChannel = Math.max(r, g, b);

      if (isBlackBg) {
        if (maxChannel < 35) {
          // Strictly delete background and dark noise
          data[i + 3] = 0;
        } else if (maxChannel < 85) {
          // Narrow edge band: smoothly transition alpha
          // This removes the black halo on white backgrounds without fading the main logo
          const factor = (maxChannel - 35) / (85 - 35); // 0.0 to 1.0

          data[i + 3] = a * factor;

          // Boost the color to remove the black mix, preventing dark halos.
          // We use Math.max(factor, 0.1) to avoid division by zero or extreme blooming
          const boost = Math.max(factor, 0.1);
          data[i] = Math.min(255, r / boost);
          data[i + 1] = Math.min(255, g / boost);
          data[i + 2] = Math.min(255, b / boost);
        }
        // Any pixel with maxChannel >= 85 remains exactly as is (100% opaque, original color).
        // This ensures the logo does NOT look faded in Light Mode!
      } else {
        // If background is not black, just do a simple strict threshold
        if (maxChannel < 30) {
          data[i + 3] = 0;
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
    const newB64 = canvas.toDataURL("image/png");
    imgElement.src = newB64;
    b64Input.value = newB64;
    window.showLuxuryToast("تمت معالجة الشعار وتصفية الحواف بنجاح");

    // Apply immediately to the live preview HUD if available
    if (window.applySettings) {
      let currentSettings = window.settings || {};
      currentSettings.logo = newB64;
      window.applySettings(currentSettings);
    }
  };
  img.src = b64Input.value;
};

window.saveAppSettings = async function () {
  const btn = document.querySelector('button[onclick="window.saveAppSettings()"]');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الحفظ...';
  }

  const s = {
    nameAr: document.getElementById("set-name-ar")?.value || "",
    nameEn: document.getElementById("set-name-en")?.value || "",
    logo: document.getElementById("set-logo-b64")?.value || window.state.settings.logo || "logo.jpg",
    primaryColor: document.getElementById("set-color-primary")?.value || "",
    secondaryColor: document.getElementById("set-color-secondary")?.value || "",
    accentColor: document.getElementById("set-color-accent")?.value || "",
    bgColor: document.getElementById("set-color-bg")?.value || "",
    textColor: document.getElementById("set-color-text")?.value || "",
    hoverEffect: document.getElementById("set-hover-effect")?.value || "scale",
    cardStyle: document.getElementById("set-card-style")?.value || "glass",
    glassOpacity: parseFloat(document.getElementById("set-glass-opacity")?.value || "0.75"),
    logoBlend: document.getElementById("set-logo-blend")?.value || "auto",
    logoScale: document.getElementById("set-logo-scale")?.value || "1",
    defaultTheme: document.getElementById("set-default-theme")?.value || "",
    fontFamily: document.getElementById("set-font-family")?.value || "",
    borderRadius: document.getElementById("set-border-radius")?.value || "",
    glassBlur: parseInt(document.getElementById("set-glass-blur")?.value || "20"),
    shadowDepth: parseInt(document.getElementById("set-shadow-depth")?.value || "40"),
    animSpeed: parseFloat(document.getElementById("set-anim-speed")?.value || "1"),
    enableAnimations: document.getElementById("set-enable-animations")?.value === "true",
    contactAdmin: document.getElementById("set-contact-mgmt")?.value || "",
    contactSales: document.getElementById("set-contact-sales")?.value || "",
    contactComplaints: document.getElementById("set-contact-complaints")?.value || "",
    contactEmail: document.getElementById("set-contact-email")?.value || "",
    aboutUs: document.getElementById("set-about-text")?.value || "",
    locationUrl: document.getElementById("set-location-link")?.value || "",
    location: document.getElementById("set-location-text")?.value || "",
    socialInsta: document.getElementById("set-insta-link")?.value || "",
    socialSnap: document.getElementById("set-snap-link")?.value || "",
    socialTwitter: document.getElementById("set-twitter-link")?.value || "",
    maintenanceMode: document.getElementById("set-maintenance-mode")?.checked || false,
    enableTextGradient: document.getElementById("set-enable-text-grad")?.checked,
    textGradColor1: document.getElementById("set-text-grad-1")?.value,
    textGradColor2: document.getElementById("set-text-grad-2")?.value,
    enableTopbarGradient: document.getElementById("set-enable-topbar-grad")?.checked,
    topbarGradColor1: document.getElementById("set-topbar-grad-1")?.value,
    topbarGradColor2: document.getElementById("set-topbar-grad-2")?.value,
    enablePrimaryGradient: document.getElementById("set-enable-primary-grad")?.checked,
    primaryGradColor1: document.getElementById("set-primary-grad-1")?.value,
    primaryGradColor2: document.getElementById("set-primary-grad-2")?.value,
    enableSecondaryGradient: document.getElementById("set-enable-secondary-grad")?.checked,
    secondaryGradColor1: document.getElementById("set-secondary-grad-1")?.value,
    secondaryGradColor2: document.getElementById("set-secondary-grad-2")?.value,
    enableAccentGradient: document.getElementById("set-enable-accent-grad")?.checked,
    accentGradColor1: document.getElementById("set-accent-grad-1")?.value,
    accentGradColor2: document.getElementById("set-accent-grad-2")?.value,
    updatedAt: new Date().toISOString()
  };

  try {
    localStorage.removeItem("theme_manually_overridden");
    await set(ref(db, "settings"), s);
    window.showLuxuryToast("تم حفظ الإعدادات بنجاح");
    window.createLog("تعديل إعدادات", "تحديث شامل لإعدادات الموقع والمنصة", "settings");
  } catch (e) {
    window.showLuxuryToast("فشل الحفظ، تأكد من الصلاحيات", "error");
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-save"></i> حفظ التغييرات';
    }
  }
};

window.toggleDesignPreview = function () {
  const el = document.getElementById("design-preview-widget");
  if (el) el.classList.toggle("minimized");
};

window.makeDraggable = function (el) {
  if (!el || el.dataset.draggable) return;
  el.dataset.draggable = "true";
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  const header = el.querySelector("div");
  if (!header) return;

  header.onmousedown = dragMouseDown;
  header.ontouchstart = dragMouseDown;

  function dragMouseDown(e) {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'I') return;

    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    pos3 = clientX;
    pos4 = clientY;

    document.onmouseup = closeDragElement;
    document.ontouchend = closeDragElement;
    document.onmousemove = elementDrag;
    document.ontouchmove = elementDrag;

    el.classList.add("dragging");
  }

  function elementDrag(e) {
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    pos1 = pos3 - clientX;
    pos2 = pos4 - clientY;
    pos3 = clientX;
    pos4 = clientY;

    // Use current position to calculate new one
    const rect = el.getBoundingClientRect();
    const newTop = rect.top - pos2;
    const newLeft = rect.left - pos1;

    el.style.top = newTop + "px";
    el.style.left = newLeft + "px";
    el.style.bottom = "auto";
    el.style.right = "auto";
    el.style.margin = "0"; // Ensure no margins interfere
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    document.ontouchend = null;
    document.ontouchmove = null;
    el.classList.remove("dragging");
  }
};

// =========================================================================================
// ADMIN TABLES & STATISTICS
// =========================================================================================

window.filterUsersByRole = function (role, btn) {
  if (btn) {
    document.querySelectorAll('#users-roles-tabs .p-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  window.state.userRoleFilter = role;
  window.syncAdminTables('users');
};

window.syncAdminTables = function (type) {
  if (type === "all") {
    const modules = ["cars", "ads", "sales", "bookings", "users", "plates", "reviews", "partners", "brands", "locations", "blogs", "whatsapp-monitor", "quick-replies"];
    modules.forEach(t => window.syncAdminTables(t));
    return;
  }

  if (type === "whatsapp-monitor") {
    window.renderWhatsAppMonitor();
    return;
  }

  if (type === "quick-replies" || type === "quickReplies") {
    if (window.renderQuickRepliesAdmin) window.renderQuickRepliesAdmin();
    if (window.renderQuickRepliesBar) window.renderQuickRepliesBar();
    return;
  }

  const table = document.getElementById(`admin-${type}-table`);
  if (!table) return;

  let items = window.state[type] || [];

  // Filtering Logic
  const searchQuery = (document.getElementById(`admin-${type}-search`)?.value ||
    document.getElementById(`${type}-search`)?.value ||
    document.getElementById(`${type.slice(0, -1)}-search`)?.value || "").toLowerCase();

  if (searchQuery) {
    items = items.filter(item => {
      const content = (item.make || item.title || item.name || item.model || item.phone || item.carRequested || item.carOrCompany || item.subtitle || "").toLowerCase();
      return content.includes(searchQuery);
    });
  }

  if (type === "notifications") {
    const isAdmin = window.state.userProfile?.role === "admin" || window.state.userProfile?.role === "supervisor";
    if (!isAdmin && window.state.user) {
      items = items.filter(n => n.userId === window.state.user.uid || n.assignedTo === window.state.user.uid);
    }
  }

  // Type-specific filters
  if (type === "cars") {
    const makeFilter = document.getElementById("admin-filter-car-make");
    if (makeFilter && makeFilter.options.length <= 1 && window.state.cars.length > 0) {
      const makes = [...new Set(window.state.cars.map(c => c.make))].sort();
      makes.forEach(m => {
        const opt = document.createElement("option");
        opt.value = m; opt.textContent = m;
        makeFilter.appendChild(opt);
      });
    }

    const statusF = document.getElementById("admin-filter-car-status")?.value || "all";
    const makeF = document.getElementById("admin-filter-car-make")?.value || "all";

    if (statusF !== "all") items = items.filter(i => i.status === statusF);
    if (makeF !== "all") items = items.filter(i => i.make === makeF);
  }
  if (type === "bookings") {
    const staffSelect = document.getElementById("filter-booking-staff");
    if (staffSelect && staffSelect.options.length <= 1 && window.state.users) {
      window.state.users.forEach(u => {
        if (u.email !== "zyrozyro98@gmail.com" && (u.role === "admin" || u.role === "supervisor" || u.role === "staff")) {
          const opt = document.createElement("option");
          opt.value = u.id; opt.textContent = u.name || u.email || "مستخدم غير محدد";
          staffSelect.appendChild(opt);
        }
      });
    }

    const subStatusSelect = document.getElementById("filter-booking-sub-status");
    if (subStatusSelect && subStatusSelect.options.length <= 1) {
      window.setBookingFilter(window.state.bookingFilter || "all", null, window.state.bookingSubStatusFilter || "all");
      return;
    }

    const filter = document.getElementById("filter-booking-status")?.value || window.state.bookingFilter || "all";
    const subFilter = document.getElementById("filter-booking-sub-status")?.value || window.state.bookingSubStatusFilter || "all";
    const staffFilter = document.getElementById("filter-booking-staff")?.value || "all";
    const typeFilter = document.getElementById("filter-booking-type")?.value || "all";

    window.state.bookingFilter = filter;
    window.state.bookingSubStatusFilter = subFilter;

    if (filter !== "all") {
      items = items.filter(i => {
        let s = i.status || "new";
        if (filter === "cancelled" && (s === "rejected" || s === "cancelled")) return true;
        return s === filter;
      });
    }
    if (subFilter !== "all") {
      items = items.filter(i => i.subStatus === subFilter);
    }
    if (staffFilter !== "all") {
      items = items.filter(i => i.assignedTo === staffFilter);
    }
    if (typeFilter !== "all") {
      items = items.filter(i => (i.customerType || "individual") === typeFilter);
    }

    // Staff Role Filtering override
    const isAdmin = window.state.userProfile?.role === "admin" || window.state.userProfile?.role === "supervisor";
    if (!isAdmin && window.state.user) {
      items = items.filter(i => i.assignedTo === window.state.user.uid);
    }
  }

  if (type === "users") {
    items = items.filter(u => u.email !== "zyrozyro98@gmail.com");
    const roleFilter = window.state.userRoleFilter || "all";
    if (roleFilter !== "all") {
      items = items.filter(u => u.role === roleFilter);
    }

    const statTotal = document.getElementById("stat-users-total");
    const statActive = document.getElementById("stat-users-active");
    const statAdmins = document.getElementById("stat-users-admins");

    if (statTotal) statTotal.innerText = items.length;
    if (statActive) {
      statActive.innerText = items.filter(u => u.isAvailable).length;
      const lbl = statActive.nextElementSibling;
      if (lbl) lbl.innerText = "متواجد حالياً";
    }
    if (statAdmins) {
      const lbl = statAdmins.nextElementSibling;
      if (roleFilter === "all") {
        statAdmins.innerText = items.filter(u => u.role === "admin").length;
        if (lbl) lbl.innerText = "مدراء النظام";
      } else {
        statAdmins.innerText = items.length;
        const roleMapText = { 'admin': 'مدراء النظام', 'supervisor': 'مشرفين', 'staff': 'المندوبين' };
        if (lbl) lbl.innerText = "إجمالي الـ " + (roleMapText[roleFilter] || '');
      }
    }
  }

  if (type === "bookings") {
    const sortFilter = document.getElementById("filter-booking-sort")?.value || "newest";
    if (sortFilter === "oldest") {
      items.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
    } else {
      items.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }
  } else {
    items.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  }

  if (items.length === 0) {
    table.innerHTML = '<div class="no-data-admin" style="padding:40px; text-align:center; opacity:0.5;">لا توجد بيانات لهذه الفئة</div>';
    return;
  }

  if (type === "users") {
    const bookings = window.state.bookings || [];
    const isAdminUser = window.state.userProfile?.role === "admin";

    let html = `<table class="admin-table-v2" style="width:100%; border-collapse:collapse; min-width:800px; font-size:14px;">
          <thead>
              <tr style="border-bottom: 2px solid var(--glass-border); text-align:right;">
                  <th style="padding:15px; color:var(--text-dim);">الموظف</th>
                  <th style="padding:15px; color:var(--text-dim);">الدور</th>
                  <th style="padding:15px; color:var(--text-dim);">الحالة</th>
                  <th style="padding:15px; color:var(--text-dim); text-align:center;">مكتمل</th>
                  <th style="padding:15px; color:var(--text-dim); text-align:center;">جاري</th>
                  <th style="padding:15px; color:var(--text-dim); text-align:center;">مرفوض</th>
                  <th style="padding:15px; color:var(--text-dim); text-align:center;">إجراءات</th>
              </tr>
          </thead>
          <tbody>`;

    items.forEach(item => {
      const uBookings = bookings.filter(b => b.assignedTo === item.id);
      const completed = uBookings.filter(b => b.status === "sold" || b.status === "done").length;
      const ongoing = uBookings.filter(b => b.status === "new" || b.status === "waiting" || b.status === "inquiry" || !b.status).length;
      const rejected = uBookings.filter(b => b.status === "cancelled").length;

      const roleMap = { 'admin': 'مسؤول', 'supervisor': 'مشرف', 'staff': 'مندوب' };
      const roleStr = roleMap[item.role] || 'مندوب';
      const avatar = item.image || 'logo.jpg';
      const phone = item.phone || '';

      let whatsappBtn = '';
      if (phone) {
        let cleanPhone = phone.replace(/\D/g, '');
        cleanPhone = window.normalizePhone(cleanPhone);
        whatsappBtn = `<a href="https://wa.me/${cleanPhone}" target="_blank" class="icon-btn-lite success" title="مراسلة واتساب"><i class="fab fa-whatsapp"></i></a>`;
      }

      html += `<tr style="border-bottom: 1px solid rgba(255,255,255,0.05); transition: background 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.02)'" onmouseout="this.style.background='transparent'">
              <td style="padding:15px;">
                  <div style="display:flex; align-items:center; gap:12px;">
                      <div style="width:40px; height:40px; border-radius:50%; overflow:hidden; background:#222; flex-shrink:0;">
                          <img src="${avatar}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='logo.jpg'">
                      </div>
                      <div>
                          <strong style="display:block; font-size:15px;">${item.name || item.email}</strong>
                          ${phone ? `<span style="font-size:12px; color:var(--text-dim);">${phone}</span>` : ''}
                      </div>
                  </div>
              </td>
              <td style="padding:15px;"><span style="color:var(--p-copper); font-size:13px;">${roleStr}</span></td>
              <td style="padding:15px;"><span class="status-badge ${item.isAvailable ? 'online' : 'busy'}" style="font-size:11px;">● ${item.isAvailable ? 'متاح' : 'غير متاح'}</span></td>
              <td style="padding:15px; text-align:center;"><span style="color:#00a884; font-weight:bold; font-size:15px;">${completed}</span></td>
              <td style="padding:15px; text-align:center;"><span style="color:var(--p-gold); font-weight:bold; font-size:15px;">${ongoing}</span></td>
              <td style="padding:15px; text-align:center;"><span style="color:#e02424; font-weight:bold; font-size:15px;">${rejected}</span></td>
              <td style="padding:15px; text-align:center;">
                  <div style="display:flex; justify-content:center; gap:8px;">
                      ${whatsappBtn}
                      <button class="icon-btn-lite" onclick="window.editLuxuryItem('users', '${item.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                      ${isAdminUser ? `<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('users', '${item.id}')" title="حذف"><i class="fas fa-trash"></i></button>` : ""}
                  </div>
              </td>
          </tr>`;
    });
    html += `</tbody></table>`;
    table.innerHTML = html;
    return;
  }

  table.innerHTML = items.map(item => renderAdminItemRow(type, item)).join("");
};

function renderAdminItemRow(type, item) {
  const isSuperOrAdmin = window.state.userProfile?.role === "admin" || window.state.userProfile?.role === "supervisor";
  const isFullAdmin = window.state.userProfile?.role === "admin";
  const isSupervisor = window.state.userProfile?.role === "supervisor";

  // Whitelist of types where Supervisor can edit/delete
  const supervisorCanEdit = ["bookings", "notifications", "reviews"];
  const canEdit = isFullAdmin || (isSupervisor && supervisorCanEdit.includes(type));

  const s = (item.status || "available").toLowerCase();
  const statusClass = (s === "sold" || s === "مباع") ? "danger" : (s === "available" || s === "متاح") ? "success" : "warning";
  const statusLabel = (s === "sold" || s === "مباع") ? "مباع" : (s === "available" || s === "متاح") ? "متاح" : "محجوز";

  if (type === "bookings") {
    const staff = window.state.users.find(u => u.id === item.assignedTo)?.name || "غير محدد";
    const statusMap = { new: "جديد", waiting: "بالانتظار", inquiry: "استفسار", sold: "مكتمل", done: "تم", cancelled: "مرفوض", rejected: "مرفوض" };
    const subStatusMap = {
      not_contacted: "لم يتم التواصل", contacted: "تم التواصل", docs_received: "تم استلام الاوراق",
      waiting_calc: "انتظار رد العميل", waiting_docs: "إنتظار إكمال الاوراق", waiting_signature: "إنتظار توقيع العميل",
      docs_not_received: "لم يتم استلام الاوراق", signed: "تم التوقيع", delivered: "تم التسليم", done: "تم",
      no_response: "لم يتم رد العميل", obligations: "التزامات", calc_rejected: "رفض الحسبة",
      ineligible: "غير مسموح له", duplicate: "مكرر"
    };
    const stClass = (item.status === "cancelled" || item.status === "rejected") ? "danger" : (item.status === "sold" || item.status === "done") ? "success" : "warning";
    const displayedSub = item.subStatus ? (subStatusMap[item.subStatus] || item.subStatus) : "";

    return `
            <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:12px; border:1px solid var(--glass-border); margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                <div class="admin-item-info">
                    <strong style="display:block; font-size:16px;">${item.name || item.phone}</strong>
                    <div class="meta-row" style="font-size:12px; color:var(--text-dim); margin-top:5px; display:flex; gap:10px; flex-wrap:wrap;">
                        <span><i class="fas fa-car"></i> ${item.carOrCompany || item.carRequested || "-"}</span> | 
                        <span><i class="fas fa-user-tie"></i> ${staff}</span>
                        ${displayedSub ? `| <span style="color:var(--p-copper);"><i class="fas fa-info-circle"></i> ${displayedSub}</span>` : ""}
                    </div>
                </div>
                <div class="admin-actions" style="display:flex; gap:10px; align-items:center;">
                    <span class="badge-${stClass}" style="font-size:10px; padding:3px 8px; border-radius:5px;">${statusMap[item.status] || item.status || "جديد"}</span>
                    <button class="icon-btn-lite view" onclick="window.viewBookingDetails('${item.id}')" title="عرض التفاصيل"><i class="fas fa-eye"></i></button>
                    <button class="icon-btn-lite" onclick="window.editLuxuryItem('bookings', '${item.id}')" title="تعديل الحجز" aria-label="Edit Booking"><i class="fas fa-edit"></i></button>
                    ${canEdit ? `<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('bookings', '${item.id}')" title="حذف الحجز" aria-label="Delete Booking"><i class="fas fa-trash"></i></button>` : ""}
                </div>
            </div>
        `;
  }

  if (type === "cars") {
    return `
            <div class="admin-item-row car-admin-row" style="background:rgba(255,255,255,0.02); padding:12px; border-radius:16px; border:1px solid var(--glass-border); margin-bottom:12px; display:flex; align-items:center; gap:20px; transition:all 0.3s ease;">
                <div class="admin-item-thumb" style="width:80px; height:60px; border-radius:10px; overflow:hidden; flex-shrink:0; background:#000;">
                    <img src="${item.image || 'logo.jpg'}" style="width:100%; height:100%; object-fit:cover; opacity:0.8;" onerror="this.src='logo.jpg'">
                </div>
                <div class="admin-item-info" style="flex-grow:1;">
                    <div style="display:flex; align-items:center; gap:10px; margin-bottom:4px;">
                        <strong style="font-size:16px;">${item.make} ${item.model}</strong>
                        <span style="font-size:12px; color:var(--p-copper); font-weight:700;">${item.year}</span>
                    </div>
                    <div class="meta-row" style="font-size:12px; color:var(--text-dim); display:flex; gap:15px; flex-wrap:wrap;">
                        <span><i class="fas fa-tachometer-alt"></i> ${Number(item.mileage || 0).toLocaleString()} كم</span>
                        <span><i class="fas fa-paint-brush"></i> ${item.color || "-"}</span>
                        <span style="color:var(--p-red); font-weight:800;">${item.price ? Number(item.price).toLocaleString() + " ريال" : (item.monthlyInstallment ? "قسط: " + Number(item.monthlyInstallment).toLocaleString() + " ريال" : "عند التواصل")}</span>
                    </div>
                </div>
                <div class="admin-actions" style="display:flex; gap:8px; align-items:center;">
                    <span class="badge-${statusClass}" style="font-size:10px; padding:4px 10px; border-radius:6px; font-weight:700;">${statusLabel}</span>
                    <button class="icon-btn-lite view" onclick="window.viewLuxuryCar('${item.id}')" title="عرض التفاصيل"><i class="fas fa-eye"></i></button>
                    ${canEdit ? `
                        <button class="icon-btn-lite" onclick="window.editLuxuryItem('cars', '${item.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                        <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('cars', '${item.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                    ` : ""}
                </div>
            </div>
        `;
  }

  if (type === "users") {
    if (item.email === "zyrozyro98@gmail.com") return ""; // Completely hide super-admin row
    return `
            <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:12px; border:1px solid var(--glass-border); margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                <div class="admin-item-info">
                    <strong style="display:block;">${item.name || item.email}</strong>
                    <div style="font-size:12px;">
                        <span style="color:var(--p-copper);">${item.role || "staff"}</span> | 
                        <span class="status-badge ${item.isAvailable ? 'online' : 'busy'}">● ${item.isAvailable ? 'متاح' : 'غير متاح'}</span>
                    </div>
                </div>
                <div class="admin-actions">
                    <button class="icon-btn-lite" onclick="window.editLuxuryItem('users', '${item.id}')" title="تعديل المستخدم" aria-label="Edit User"><i class="fas fa-edit"></i></button>
                    ${canEdit ? `<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('users', '${item.id}')" title="حذف المستخدم" aria-label="Delete User"><i class="fas fa-trash"></i></button>` : ""}
                </div>
            </div>
        `;
  }

  if (type === "plates") {
    return `
            <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:12px; border:1px solid var(--glass-border); margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                <div class="admin-item-info">
                    <strong style="display:block; font-size:18px; letter-spacing:2px;">${item.number} ${item.letters}</strong>
                    <span style="font-size:12px; color:var(--p-copper);">${Number(item.price).toLocaleString()} ريال</span>
                </div>
                <div class="admin-actions" style="display:flex; gap:10px; align-items:center;">
                    <span class="badge-${statusClass}" style="font-size:10px; padding:3px 8px; border-radius:5px;">${statusLabel}</span>
                    ${canEdit ? `
                        <button class="icon-btn-lite" onclick="window.editLuxuryItem('plates', '${item.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                        <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('plates', '${item.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                    ` : ""}
                </div>
            </div>
        `;
  }

  if (type === "notifications") {
    const isRead = !!item.read;
    const notifType = item.type || "system";
    const isAdminView = window.state.userProfile?.role === "admin" || window.state.userProfile?.role === "supervisor";
    const staffId = item.userId || item.assignedTo;
    const staffMember = window.state.users?.find(u => u.id === staffId);
    const staffName = staffMember ? (staffMember.name || staffMember.email) : "نظام";

    const icons = {
      wa_message: "fab fa-whatsapp",
      booking: "fas fa-calendar-check",
      system: "fas fa-info-circle",
      auth: "fas fa-shield-alt"
    };

    return `
      <div class="notification-premium-item ${isRead ? '' : 'unread'}" onclick="window.handleNotificationClick('${item.id}', '${item.link || ''}')">
          <div class="notif-icon-wrap">
              <i class="${icons[notifType] || icons.system}"></i>
          </div>
          <div class="notif-content">
              <div class="notif-header">
                  <div style="display:flex; flex-direction:column; gap:2px;">
                      <span class="notif-title">${item.title || "تنبيه بالنظام"}</span>
                      ${isAdminView ? `<span style="font-size:11px; color:var(--p-gold); font-weight:bold;">الموظف: ${staffName}</span>` : ""}
                  </div>
                  <span class="notif-time">${window.formatDateRelative ? window.formatDateRelative(item.timestamp) : new Date(item.timestamp).toLocaleString('ar-SA')}</span>
              </div>
              <p class="notif-body">${item.text || item.message || ""}</p>
              <div class="notif-actions" onclick="event.stopPropagation()">
                  ${!isRead ? `
                      <button class="btn-premium btn-xs" style="padding:4px 12px; font-size:11px;" onclick="window.markNotificationRead('${item.id}')">
                          <i class="fas fa-check"></i> مقروء
                      </button>
                  ` : ''}
                  <button class="btn-premium btn-xs danger" style="padding:4px 12px; font-size:11px;" onclick="window.deleteLuxuryItem('notifications', '${item.id}')">
                      <i class="fas fa-trash"></i> حذف
                  </button>
              </div>
          </div>
      </div>
    `;
  }

  if (type === "logs") {
    return `
            <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:10px; border-radius:10px; font-size:12px; border-bottom:1px solid rgba(255,255,255,0.05);">
                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                    <strong style="color:var(--p-teal);">${item.action}</strong>
                    <span style="opacity:0.5;">${new Date(item.timestamp).toLocaleString()}</span>
                </div>
                <p style="opacity:0.8;">${item.details}</p>
                <div style="margin-top:5px; font-size:10px; opacity:0.6;">بواسطة: ${item.user}</div>
            </div>
        `;
  }

  if (type === "ads") {
    return `
            <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:16px; border:1px solid var(--glass-border); margin-bottom:12px; display:flex; align-items:center; gap:20px;">
                <div class="admin-item-thumb" style="width:100px; height:60px; border-radius:10px; overflow:hidden; flex-shrink:0; background:#000;">
                    <img src="${item.image || 'logo.jpg'}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='logo.jpg'">
                </div>
                <div class="admin-item-info" style="flex-grow:1;">
                    <strong style="display:block; font-size:16px;">${item.title || "بدون عنوان"}</strong>
                    <p style="font-size:12px; color:var(--text-dim); margin-top:4px;">${item.subtitle || "لا يوجد عنوان فرعي"}</p>
                </div>
                <div class="admin-actions">
                    <button class="icon-btn-lite" onclick="window.editLuxuryItem('ads', '${item.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                    ${canEdit ? `<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('ads', '${item.id}')" title="حذف"><i class="fas fa-trash"></i></button>` : ""}
                </div>
            </div>
        `;
  }

  if (type === "sales") {
    const url = (item.url || "").trim();
    let isYoutube = url.includes("youtube.com") || url.includes("youtu.be");
    let thumb = item.poster || item.image || null;
    if (isYoutube && !thumb) {
      let vidId = "";
      try {
        if (url.includes("v=")) vidId = url.split("v=")[1].split("&")[0];
        else if (url.includes("youtu.be/")) vidId = url.split("youtu.be/")[1].split("?")[0];
        else if (url.includes("embed/")) vidId = url.split("embed/")[1].split("?")[0];
        else vidId = url.split("/").pop().split("?")[0];
      } catch (e) { vidId = ""; }
      if (vidId) thumb = `https://img.youtube.com/vi/${vidId}/mqdefault.jpg`;
    }
    thumb = thumb || "logo.jpg";

    return `
            <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:12px; border-radius:16px; border:1px solid var(--glass-border); margin-bottom:12px; display:flex; align-items:center; gap:20px;">
                <div class="admin-item-thumb" style="width:80px; height:50px; border-radius:10px; overflow:hidden; flex-shrink:0; background:#000;">
                    <img src="${thumb}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='logo.jpg'">
                </div>
                <div class="admin-item-info" style="flex-grow:1;">
                    <strong style="display:block; font-size:16px;">${item.title || item.name || "لحظة تسليم"}</strong>
                    <div style="font-size:11px; color:var(--text-dim); margin-top:4px; max-width:400px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                        <i class="fas fa-link"></i> ${url}
                    </div>
                </div>
                <div class="admin-actions">
                    <button class="icon-btn-lite view" onclick="window.openVideoLightbox('${url}')" title="معاينة"><i class="fas fa-eye"></i></button>
                    ${canEdit ? `
                        <button class="icon-btn-lite" onclick="window.editLuxuryItem('sales', '${item.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                        <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('sales', '${item.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                    ` : ""}
                </div>
            </div>
        `;
  }

  if (type === "reviews") {
    const rating = Number(item.rating || 5);
    const textPreview = item.text ? (item.text.length > 60 ? item.text.substring(0, 60) + "..." : item.text) : "لا يوجد نص";
    const avatar = item.avatar || item.image || "";

    return `
        <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:16px; border:1px solid var(--glass-border); margin-bottom:12px; display:flex; align-items:center; gap:20px;">
            <div class="admin-item-avatar" style="width:50px; height:50px; border-radius:50%; overflow:hidden; flex-shrink:0; background:var(--bg-alt); border:2px solid var(--p-copper); display:flex; align-items:center; justify-content:center; color:var(--p-copper); font-weight:900;">
                ${avatar ? `<img src="${avatar}" style="width:100%; height:100%; object-fit:cover;">` : (item.name || "U").charAt(0)}
            </div>
            <div class="admin-item-info" style="flex-grow:1;">
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:4px;">
                    <strong style="font-size:16px;">${item.name || "عميل مجهول"}</strong>
                    <div class="review-stars-lite" style="color:#ffd700; font-size:11px;">
                        ${'<i class="fas fa-star"></i>'.repeat(rating)}
                    </div>
                </div>
                <p style="font-size:13px; color:var(--text-dim); margin-top:2px;">"${textPreview}"</p>
                ${item.car ? `<span style="font-size:11px; color:var(--p-copper); opacity:0.8; display:block; margin-top:5px;"><i class="fas fa-car-side"></i> ${item.car}</span>` : ""}
            </div>
            <div class="admin-actions">
                ${canEdit ? `
                    <button class="icon-btn-lite" onclick="window.editLuxuryItem('reviews', '${item.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                    <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('reviews', '${item.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                ` : ""}
            </div>
        </div>
    `;
  }

  const title = item.make ? `${item.make} ${item.model}` : (item.title || item.name || "بدون عنوان");
  const thumb = item.image || item.logo || item.poster || null;

  return `
        <div class="admin-item-row" onclick="window.editLuxuryItem('${type}', '${item.id}')" style="cursor:pointer;">
            <div style="display:flex; align-items:center; gap:15px;">
                ${thumb ? `
                    <div style="width:50px; height:40px; border-radius:8px; overflow:hidden; flex-shrink:0;">
                        <img src="${thumb}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='logo.jpg'">
                    </div>
                ` : ""}
                <div class="admin-item-info">
                    <strong style="display:block;">${title}</strong>
                    ${item.price ? `<span style="font-size:12px; color:var(--p-copper); font-weight:700;">${Number(item.price).toLocaleString()} ريال</span>` : ""}
                </div>
            </div>
            <div class="admin-actions" style="display:flex; gap:8px; align-items:center;" onclick="event.stopPropagation()">
                ${item.status ? `<span class="badge-${statusClass}" style="font-size:10px; padding:3px 8px; border-radius:5px;">${statusLabel}</span>` : ""}
                <button class="icon-btn-lite" onclick="window.editLuxuryItem('${type}', '${item.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                ${isAdmin ? `<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('${type}', '${item.id}')" title="حذف"><i class="fas fa-trash"></i></button>` : ""}
            </div>
        </div>
    `;
}

window.updateStatistics = function () {
  const cCount = document.getElementById("stat-cars-count-v2");
  const bCount = document.getElementById("stat-bookings-count-v2");
  const vStat = document.getElementById("stat-total-value-v2");

  const cars = window.state.cars || [];
  let bookings = window.state.bookings || [];

  // Role-based statistics
  const isAdmin = window.state.userProfile?.role === "admin" || window.state.userProfile?.role === "supervisor";
  if (!isAdmin && window.state.user) {
    bookings = bookings.filter(b => b.assignedTo === window.state.user.uid);
  }

  if (cCount) cCount.innerText = cars.length;
  if (bCount) bCount.innerText = bookings.length;

  if (vStat) {
    const total = cars.reduce((sum, c) => sum + (parseFloat(c.price) || 0), 0);
    vStat.innerText = total.toLocaleString() + " ريال";
  }

  // Detailed Booking Counters
  const counters = {
    all: bookings.length,
    new: bookings.filter(b => b.status === "new" || !b.status).length,
    waiting: bookings.filter(b => b.status === "waiting").length,
    inquiry: bookings.filter(b => b.status === "inquiry").length,
    sold: bookings.filter(b => b.status === "sold").length,
    done: bookings.filter(b => b.status === "done").length,
    cancelled: bookings.filter(b => b.status === "cancelled" || b.status === "rejected").length,
    sub: {
      not_contacted: bookings.filter(b => b.subStatus === "not_contacted").length,
      contacted: bookings.filter(b => b.subStatus === "contacted").length,
      docs_received: bookings.filter(b => b.subStatus === "docs_received").length,
      waiting_calc: bookings.filter(b => b.subStatus === "waiting_calc").length,
      waiting_docs: bookings.filter(b => b.subStatus === "waiting_docs").length,
      waiting_signature: bookings.filter(b => b.subStatus === "waiting_signature").length,
      docs_not_received: bookings.filter(b => b.subStatus === "docs_not_received").length,
      signed: bookings.filter(b => b.subStatus === "signed").length,
      delivered: bookings.filter(b => b.subStatus === "delivered").length,
      done: bookings.filter(b => b.subStatus === "done").length,
      no_response: bookings.filter(b => b.subStatus === "no_response").length,
      obligations: bookings.filter(b => b.subStatus === "obligations").length,
      calc_rejected: bookings.filter(b => b.subStatus === "calc_rejected").length,
      ineligible: bookings.filter(b => b.subStatus === "ineligible").length,
      duplicate: bookings.filter(b => b.subStatus === "duplicate").length
    }
  };

  Object.entries(counters).forEach(([key, val]) => {
    const el = document.getElementById(`count-${key}`);
    if (el) el.innerText = val;
  });
  Object.entries(counters.sub).forEach(([key, val]) => {
    const el = document.getElementById(`count-sub-${key}`);
    if (el) el.innerText = val;
  });

  const bookingsBadge = document.getElementById("bookings-badge");
  if (bookingsBadge) {
    bookingsBadge.innerText = counters.new;
    bookingsBadge.classList.toggle("hidden", counters.new === 0);
  }

  // Staff-Specific UI Refresh
  const currentUid = window.state.user?.uid;
  const isStaff = window.state.userProfile?.role === "staff";

  if (isStaff && currentUid) {
    const staffPanel = document.getElementById("staff-quick-stats");
    if (staffPanel) staffPanel.classList.remove("hidden");

    const myBookings = (window.state.bookings || []).filter(b => b.assignedTo === currentUid);
    const waiting = myBookings.filter(b => b.status === "new" || !b.status).length;
    const total = myBookings.length;
    const completed = myBookings.filter(b => b.status === "sold").length;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

    const wCount = document.getElementById("staff-waiting-count");
    const aCount = document.getElementById("staff-total-assigned");
    const rCount = document.getElementById("staff-conversion-rate");
    const aToggle = document.getElementById("availability-toggle");

    if (wCount) wCount.innerText = waiting;
    if (aCount) aCount.innerText = total;
    if (rCount) rCount.innerText = rate + "%";
    if (aToggle) aToggle.checked = window.state.userProfile.isAvailable !== false;
  }

  // 2. Supervisor Dashboard Elements (Merged from Reports)
  const supTotalVal = document.getElementById("total-inventory-value");
  const supConvRate = document.getElementById("overall-conversion-rate");
  const supActiveBookings = document.getElementById("active-bookings-count");
  const supConvBar = document.getElementById("conversion-bar");

  if (supTotalVal) {
    const total = (window.state.cars || []).reduce((sum, c) => sum + (parseFloat(c.price) || 0), 0);
    supTotalVal.innerText = total.toLocaleString() + " ريال";
  }
  if (supActiveBookings) {
    supActiveBookings.innerText = counters.new + counters.waiting + counters.inquiry;
  }
  if (supConvRate) {
    const totalBookings = (window.state.bookings || []).length;
    const soldCount = (window.state.bookings || []).filter(b => b.status === "sold" || b.status === "done").length;
    const rate = totalBookings > 0 ? Math.round((soldCount / totalBookings) * 100) : 0;
    supConvRate.innerText = rate + "%";
    if (supConvBar) supConvBar.style.width = rate + "%";
  }

  // Monthly Goal
  const goalPercent = document.getElementById("monthly-goal-percent");
  const goalFill = document.getElementById("monthly-goal-fill");
  if (goalPercent && goalFill) {
    const soldThisMonth = (window.state.bookings || []).filter(b => {
      if (b.status !== "sold" && b.status !== "done") return false;
      const date = new Date(b.createdAt || 0);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length;
    const target = 50;
    const pct = Math.min(100, Math.round((soldThisMonth / target) * 100));
    goalPercent.innerText = pct + "%";
    goalFill.style.width = pct + "%";
  }

  // Supervisor Recent Logs
  const logList = document.getElementById("supervisor-recent-logs");
  if (logList && window.state.logs) {
    const recent = [...window.state.logs].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 10);
    logList.innerHTML = recent.map(log => `
      <div class="log-entry-lite">
        <div class="le-icon"><i class="fas ${log.type === 'auth' ? 'fa-key' : log.type === 'data' ? 'fa-database' : 'fa-info-circle'}"></i></div>
        <div class="le-body">
          <div class="le-top"><strong>${log.action}</strong> <span>${new Date(log.timestamp).toLocaleTimeString()}</span></div>
          <p>${log.details}</p>
          <small>بواسطة: ${log.user}</small>
        </div>
      </div>
    `).join("");
  }

  // 3. Status Distribution Chart (CSS Donut)
  const donut = document.getElementById("status-donut-chart");
  if (donut) {
    const s = counters.sold + counters.done;
    const a = counters.new + counters.waiting + counters.inquiry;
    const c = counters.cancelled;
    const total = s + a + c || 1;

    const pS = Math.round((s / total) * 100);
    const pA = Math.round((a / total) * 100);
    const pC = 100 - pS - pA;

    donut.style.background = `conic-gradient(
      #00a884 0% ${pS}%, 
      var(--p-gold) ${pS}% ${pS + pA}%, 
      #e02424 ${pS + pA}% 100%
    )`;
    donut.setAttribute("data-pct", `${pS}% ناجح`);
  }

  // 4. Monthly Leaderboard
  const leaderboard = document.getElementById("supervisor-leaderboard");
  if (leaderboard && window.state.users && window.state.bookings) {
    const now = new Date();
    const currentMonthBookings = window.state.bookings.filter(b => {
      const d = new Date(b.createdAt || 0);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });

    const staffStats = window.state.users
      .filter(u => u.role === "staff" || u.role === "supervisor")
      .map(u => {
        const sold = currentMonthBookings.filter(b => b.assignedTo === u.id && (b.status === "sold" || b.status === "done")).length;
        const total = currentMonthBookings.filter(b => b.assignedTo === u.id).length;
        return { ...u, soldCount: sold, totalAssigned: total };
      })
      .sort((a, b) => b.soldCount - a.soldCount)
      .slice(0, 5);

    leaderboard.innerHTML = staffStats.map((s, idx) => `
      <div class="leader-item">
        <div class="leader-rank">${idx + 1}</div>
        <div class="leader-avatar"><img src="${s.image || 'logo.jpg'}" onerror="this.src='logo.jpg'"></div>
        <div class="leader-info">
          <strong>${s.name || s.email}</strong>
          <span>${s.soldCount} مبيعات / ${s.totalAssigned} طلبات</span>
        </div>
        <div class="leader-score">${s.soldCount > 0 ? Math.round((s.soldCount / (s.totalAssigned || 1)) * 100) : 0}%</div>
      </div>
    `).join("");
  }

  // Auto-refresh Periodical Report
  if (window.state.currentPeriodReport) {
    window.switchPeriodReport(window.state.currentPeriodReport);
  } else {
    window.switchPeriodReport('day');
  }
  // Auto-refresh Staff List
  window.renderSupervisorStaffList();
};

window.switchPeriodReport = function (period, btn) {
  window.state.currentPeriodReport = period;
  if (btn) {
    document.querySelectorAll('.p-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  } else {
    // If called without btn, find the correct tab to highlight
    const tabs = document.querySelectorAll('.p-tab');
    const periodMap = { day: 0, week: 1, month: 2, year: 3 };
    const index = periodMap[period] || 0;
    if (tabs[index]) {
      tabs.forEach(b => b.classList.remove('active'));
      tabs[index].classList.add('active');
    }
  }

  const now = new Date();
  let start = new Date();
  if (period === 'day') start.setHours(0, 0, 0, 0);
  else if (period === 'week') start.setDate(now.getDate() - 7);
  else if (period === 'month') start.setMonth(now.getMonth() - 1);
  else if (period === 'year') start.setFullYear(now.getFullYear() - 1);

  const bookings = (window.state.bookings || []).filter(b => new Date(b.createdAt || 0) >= start);
  const carsAdded = (window.state.cars || []).filter(c => new Date(c.createdAt || 0) >= start).length;
  const platesAdded = (window.state.plates || []).filter(p => new Date(p.createdAt || 0) >= start).length;

  const total = bookings.length;
  const sold = bookings.filter(b => b.status === "sold" || b.status === "done").length;
  const active = bookings.filter(b => b.status === "new" || b.status === "waiting" || b.status === "inquiry").length;
  const rate = total > 0 ? Math.round((sold / total) * 100) : 0;
  const soldValue = bookings.filter(b => b.status === "sold" || b.status === "done")
    .reduce((sum, b) => {
      const car = (window.state.cars || []).find(c => c.id === b.carId);
      return sum + (parseFloat(car?.price || 0));
    }, 0);

  const elMap = {
    'period-total-count': total,
    'period-sold-count': sold,
    'period-active-count': active,
    'period-conv-rate': rate + "%",
    'period-sold-value': soldValue.toLocaleString() + " ريال",
    'period-inventory-added': (carsAdded + platesAdded)
  };

  Object.entries(elMap).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.innerText = val;
  });
};

// =========================================================================================
// CRUD OPERATIONS
// =========================================================================================

window.deleteLuxuryItem = async function (type, id) {
  if (confirm("هل أنت متأكد من الحذف؟ لا يمكن التراجع عن هذه العملية.")) {
    try {
      // Security Restrictions
      if (type === "users") {
        const targetUser = (window.state.users || []).find(u => u.id === id);
        if (targetUser?.email === "zyrozyro98@gmail.com") {
          window.showLuxuryToast("لا يمكن حذف هذا المطور الأساسي للنظام", "error");
          return;
        }
        const currentUserRole = window.state.userProfile?.role;
        if (currentUserRole === "supervisor" && targetUser?.role === "admin") {
          window.showLuxuryToast("لا يملك المشرف صلاحية حذف المدير", "error");
          return;
        }
      }

      await remove(ref(db, `${type}/${id}`));
      window.showLuxuryToast("تم الحذف بنجاح");
      window.createLog("حذف", `حذف عنصر من ${type} (ID: ${id})`, "data");
    } catch (err) {
      window.showLuxuryToast("فشل الحذف", "error");
    }
  }
};

window.editLuxuryItem = function (type, id) {
  const item = (window.state[type] || []).find(i => i.id === id);
  if (!item) return;

  if (type === "users" && item.email === "zyrozyro98@gmail.com") {
    window.showLuxuryToast("لا يمكن تعديل بيانات هذا المستخدم الأساسي", "error");
    return;
  }

  window.state.currentEdit = { type, id };
  const form = document.getElementById("item-form");
  if (!form) return;

  // Initialize image manager state for cars
  if (type === "cars") {
    window.state.carImages = [];
    if (item.image) {
      window.state.carImages.push({ type: 'url', value: item.image, isMain: true });
    }
    if (item.images && Array.isArray(item.images)) {
      item.images.forEach(url => {
        if (url !== item.image) {
          window.state.carImages.push({ type: 'url', value: url, isMain: false });
        }
      });
    }
  }

  renderDynamicForm(type, item);

  window.setModalTitle("item-modal", `تعديل: ${item.make || item.title || type}`);
  window.openModal("item-modal");
};

window.insertQRVariable = function (text) {
  const textarea = document.querySelector('#item-form textarea[name="content"]');
  if (textarea) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;
    textarea.value = value.substring(0, start) + text + value.substring(end);
    textarea.selectionStart = textarea.selectionEnd = start + text.length;
    textarea.focus();
  }
};

window.openCRUDModal = function (type, id = null) {
  window.state.currentEdit = { type, id };
  const form = document.getElementById("item-form");
  if (!form) return;

  const data = id ? (window.state[type]?.find(i => i.id === id) || {}) : {};

  // Initialize image manager state for cars
  if (type === "cars") {
    window.state.carImages = [];
    if (data.image) {
      window.state.carImages.push({ type: 'url', value: data.image, isMain: true });
    }
    if (data.images && Array.isArray(data.images)) {
      data.images.forEach(url => {
        if (url !== data.image) {
          window.state.carImages.push({ type: 'url', value: url, isMain: false });
        }
      });
    }
  }

  renderDynamicForm(type, data);

  window.setModalTitle("item-modal", id ? `تعديل: ${type}` : `إضافة: ${type}`);
  window.openModal("item-modal");
};

function renderDynamicForm(type, data = {}) {
  const container = document.getElementById("dynamic-form-fields");
  if (!container) return;

  let fields = [];
  if (type === "cars") {
    const brandOptions = (window.state.brands || []).map(b => ({ v: b.name, t: b.name }));
    fields = [
      {
        name: "make", label: "الماركة", type: "datalist", options: [
          ...brandOptions
        ], required: true
      },
      { name: "model", label: "الموديل", type: "text", required: true },
      { name: "year", label: "السنة", type: "number" },
      { name: "price", label: "سعر الكاش", type: "number" },
      { name: "monthlyInstallment", label: "قسط شهري يبدأ بـ", type: "number" },
      { name: "mileage", label: "الممشى (كم)", type: "number" },
      {
        name: "engine", label: "المحرك", type: "datalist", placeholder: "مثال: 8 سليندر، 4.0L", options: [
          { v: "4 سليندر", t: "4 سليندر" }, { v: "6 سليندر", t: "6 سليندر" }, { v: "8 سليندر", t: "8 سليندر" },
          ...(window.state.engines || []).map(e => ({ v: e.name, t: e.name }))
        ].filter((v, i, a) => v.v && a.findIndex(t => t.v === v.v) === i)
      },
      {
        name: "gearbox", label: "ناقل الحركة", type: "datalist", options: [
          { v: "عادي", t: "عادي" }, { v: "أوتوماتيكي", t: "أوتوماتيكي" }, { v: "CVT", t: "CVT" },
          ...(window.state.gearboxes || []).map(g => ({ v: g.name, t: g.name }))
        ].filter((v, i, a) => v.v && a.findIndex(t => t.v === v.v) === i)
      },
      { name: "fuelType", label: "نوع الوقود", type: "select", options: [{ v: "بنزين", t: "بنزين" }, { v: "ديزل", t: "ديزل" }, { v: "هايبرد", t: "هايبرد" }, { v: "كهرباء", t: "كهرباء" }] },
      {
        name: "bodyType", label: "فئة السيارة", type: "datalist", options: [
          { v: "sedan", t: "سيدان" }, { v: "suv", t: "SUV" }, { v: "coupe", t: "كوبيه" }, { v: "luxury", t: "فاخرة" }, { v: "pickup", t: "بيك آب" },
          ...(window.state.bodyTypes || []).map(b => ({ v: b.name, t: b.name }))
        ].filter((v, i, a) => v.v && a.findIndex(t => t.v === v.v) === i)
      },
      {
        name: "color", label: "اللون خارجي", type: "datalist", options: [
          { v: "أبيض", t: "أبيض" }, { v: "أسود", t: "أسود" }, { v: "فضي", t: "فضي" }, { v: "رمادي", t: "رمادي" },
          ...(window.state.exteriorColors || []).map(c => ({ v: c.name, t: c.name }))
        ].filter((v, i, a) => v.v && a.findIndex(t => t.v === v.v) === i)
      },
      {
        name: "interiorColor", label: "اللون داخلي", type: "datalist", options: [
          { v: "بيج", t: "بيج" }, { v: "أسود", t: "أسود" }, { v: "جملي", t: "جملي" }, { v: "أحمر", t: "أحمر" },
          ...(window.state.interiorColors || []).map(c => ({ v: c.name, t: c.name }))
        ].filter((v, i, a) => v.v && a.findIndex(t => t.v === v.v) === i)
      },
      {
        name: "status", label: "الحالة في المخزون", type: "select", options: [
          { v: "available", t: "متاح" }, { v: "reserved", t: "محجوز" }, { v: "sold", t: "مباع" }, { v: "incoming", t: "قادم قريباً" },
          ...(window.state.stockStatuses || []).map(s => ({ v: s.name, t: s.name }))
        ].filter((v, i, a) => v.v && a.findIndex(t => t.v === v.v) === i)
      },
      { name: "isFeatured", label: "عرض في قسم المميز؟", type: "select", options: [{ v: false, t: "لا" }, { v: true, t: "نعم" }] },
      { name: "desc", label: "وصف إضافي ومواصفات", type: "textarea" },
      {
        name: "_image_manager", label: "صور السيارة (المعرض)", type: "custom", html: `
        <div class="f-group full-width">
          <label>إدارة صور السيارة (المعرض والصورة الرئيسية)</label>
          <div class="img-manager-v2" id="car-image-manager">
            <!-- Rendered by window.renderCarImageManager -->
          </div>
          <input type="file" id="car-file-input" multiple accept="image/*" style="display:none;" onchange="window.handleCarFileSelect(this.files)">
        </div>
      ` }
    ];
    setTimeout(() => window.renderCarImageManager(), 100);
  } else if (type === "ads") {
    fields = [
      { name: "title", label: "العنوان", type: "text" },
      { name: "subtitle", label: "العنوان الفرعي", type: "text" },
      { name: "image", label: "صورة الإعلان (من الجهاز)", type: "file" },
      { name: "link", label: "الرابط (اختياري)", type: "text" }
    ];
  } else if (type === "sales") {
    fields = [
      { name: "title", label: "العنوان", type: "text" },
      { name: "description", label: "وصف قصير", type: "textarea" },
      { name: "url", label: "رابط الفيديو (MP4 أو YouTube)", type: "text" },
      { name: "poster", label: "رابط صورة الغلاف", type: "text" }
    ];
  } else if (type === "reviews") {
    fields = [
      { name: "name", label: "اسم العميل", type: "text", required: true, placeholder: "مثال: عبدالله محمد" },
      { name: "car", label: "السيارة المشتراة (اختياري)", type: "text", placeholder: "مثال: تويوتا كامري 2024" },
      { name: "rating", label: "التقييم من 5 نجوم", type: "number", required: true, placeholder: "5" },
      { name: "avatar", label: "رابط صورة العميل (اختياري)", type: "text", placeholder: "https://..." },
      { name: "text", label: "محتوى الرأي", type: "textarea", required: true, placeholder: "لقد كانت تجربة رائعة مع هذا المعرض..." }
    ];
  } else if (type === "partners") {
    fields = [
      { name: "name", label: "اسم الشريك", type: "text" },
      { name: "logo", label: "شعار الشريك (من الجهاز)", type: "file" },
      { name: "link", label: "رابط خارجي (اختياري)", type: "text" }
    ];
  } else if (type === "brands") {
    fields = [
      { name: "name", label: "اسم العلامة التجارية", type: "text" },
      { name: "logo", label: "شعار البراند (من الجهاز)", type: "file" }
    ];
  } else if (type === "blogs") {
    fields = [
      { name: "title", label: "عنوان المقال", type: "text" },
      { name: "image", label: "صورة المقال (من الجهاز)", type: "file" },
      { name: "content", label: "محتوى المقال", type: "textarea" }
    ];
  } else if (type === "locations") {
    fields = [
      { name: "name", label: "اسم المدينة/الدولة", type: "text" },
      { name: "status", label: "الحالة", type: "select", options: [{ v: "active", t: "نشط" }, { v: "inactive", t: "غير نشط" }] }
    ];
  } else if (type === "plates") {
    fields = [
      { name: "number", label: "رقم اللوحة", type: "text" },
      { name: "letters", label: "حروف اللوحة", type: "text" },
      { name: "price", label: "السعر", type: "number" },
      { name: "status", label: "الحالة", type: "select", options: [{ v: "available", t: "متاح" }, { v: "sold", t: "مباع" }] }
    ];
  } else if (type === "specs") {
    fields = [
      { name: "name", label: "اسم المواصفة", type: "text" },
      { name: "icon", label: "أيقونة (FontAwesome)", type: "text" }
    ];
  } else if (type === "packages") {
    fields = [
      { name: "name", label: "اسم الباقة", type: "text" },
      { name: "price", label: "السعر", type: "number" },
      { name: "features", label: "المميزات (فاصلة بين كل ميزة)", type: "textarea" }
    ];
  } else if (type === "bookings") {
    fields = [
      { name: "name", label: "اسم العميل", type: "text" },
      { name: "phone", label: "الجوال", type: "text" },
      { name: "carRequested", label: "السيارة المطلوبة", type: "text" },
      {
        name: "status", label: "حالة الطلب", type: "select", options: [
          { v: "new", t: "جديد" }, { v: "waiting", t: "بالانتظار" }, { v: "inquiry", t: "استفسار" }, { v: "sold", t: "مكتمل" }, { v: "done", t: "تم" }, { v: "cancelled", t: "مرفوض" }
        ]
      },
      {
        name: "subStatus", label: "الحالة التفصيلية", type: "select", options: [
          { v: "not_contacted", t: "لم يتم التواصل" }, { v: "contacted", t: "تم التواصل" },
          { v: "docs_received", t: "تم استلام الاوراق" }, { v: "waiting_calc", t: "انتظار رد العميل" },
          { v: "waiting_docs", t: "إنتظار إكمال الاوراق" }, { v: "waiting_signature", t: "إنتظار توقيع العميل" },
          { v: "docs_not_received", t: "لم يتم استلام الاوراق" }, { v: "signed", t: "تم التوقيع" },
          { v: "delivered", t: "تم التسليم" }, { v: "done", t: "تم" }, { v: "no_response", t: "لم يتم رد العميل" },
          { v: "obligations", t: "التزامات" }, { v: "calc_rejected", t: "رفض الحسبة" },
          { v: "ineligible", t: "غير مسموح له" }, { v: "duplicate", t: "مكرر" }
        ]
      },
      { name: "assignedTo", label: "الموظف المسؤول", type: "select", options: [{ v: "", t: "غير محدد" }, ...window.state.users.filter(u => u.email !== "zyrozyro98@gmail.com" && (u.role === "staff" || u.role === "admin" || u.role === "supervisor")).map(u => ({ v: u.id, t: u.name || (u.role === "admin" ? "المدير: " : "المشرف: ") + (u.name || u.email) }))] },
      { name: "notes", label: "ملاحظات", type: "textarea" }
    ];
  } else if (type === "users") {
    fields = [
      { name: "name", label: "الاسم الكامل", type: "text" },
      { name: "email", label: "البريد الإلكتروني", type: "text" },
      { name: "password", label: "كلمة المرور (عرض وتعديل)", type: "text" },
      { name: "role", label: "الصلاحية", type: "select", options: [{ v: "staff", t: "موظف" }, { v: "supervisor", t: "مشرف" }, { v: "admin", t: "مدير" }] },
      { name: "isAvailable", label: "متاح لاستلام الطلبات؟", type: "select", options: [{ v: true, t: "نعم" }, { v: false, t: "لا" }] }
    ];
  } else if (type === "quickReplies") {
    fields = [
      { name: "title", label: "عنوان الرد السريع", type: "text", required: true, placeholder: "مثال: ترحيب بالعملاء الجدد" },
      {
        type: "custom", html: `
        <div class="f-group full-width" style="margin-bottom: 20px;">
            <label style="margin-bottom:8px; display:block; color:var(--text-bright); font-weight:600;">المتغيرات المتاحة (انقر لإضافتها في الرسالة):</label>
            <div style="display:flex; flex-wrap:wrap; gap:8px;">
                <button type="button" onclick="window.insertQRVariable('(اسم الموظف)')" style="background:var(--p-gold); border:none; padding:6px 12px; border-radius:12px; font-size:13px; font-weight:bold; cursor:pointer; font-family:var(--font-luxury);" onmouseover="this.style.opacity=0.8" onmouseout="this.style.opacity=1">(اسم الموظف)</button>
                <button type="button" onclick="window.insertQRVariable('(رقم الطلب)')" style="background:var(--p-copper); color:white; border:none; padding:6px 12px; border-radius:12px; font-size:13px; font-weight:bold; cursor:pointer; font-family:var(--font-luxury);" onmouseover="this.style.opacity=0.8" onmouseout="this.style.opacity=1">(رقم الطلب)</button>
                <button type="button" onclick="window.insertQRVariable('(اسم العميل)')" style="background:#2b2b2b; color:white; border:1px solid #444; padding:6px 12px; border-radius:12px; font-size:13px; cursor:pointer; font-family:var(--font-luxury);" onmouseover="this.style.background='#444'" onmouseout="this.style.background='#2b2b2b'">(اسم العميل)</button>
                <button type="button" onclick="window.insertQRVariable('(اسم السيارة)')" style="background:#2b2b2b; color:white; border:1px solid #444; padding:6px 12px; border-radius:12px; font-size:13px; cursor:pointer; font-family:var(--font-luxury);" onmouseover="this.style.background='#444'" onmouseout="this.style.background='#2b2b2b'">(اسم السيارة)</button>
                <button type="button" onclick="window.insertQRVariable('(الماركة)')" style="background:#2b2b2b; color:white; border:1px solid #444; padding:6px 12px; border-radius:12px; font-size:13px; cursor:pointer; font-family:var(--font-luxury);" onmouseover="this.style.background='#444'" onmouseout="this.style.background='#2b2b2b'">(الماركة)</button>
                <button type="button" onclick="window.insertQRVariable('(الموديل)')" style="background:#2b2b2b; color:white; border:1px solid #444; padding:6px 12px; border-radius:12px; font-size:13px; cursor:pointer; font-family:var(--font-luxury);" onmouseover="this.style.background='#444'" onmouseout="this.style.background='#2b2b2b'">(الموديل)</button>
                <button type="button" onclick="window.insertQRVariable('(سنة الصنع)')" style="background:#2b2b2b; color:white; border:1px solid #444; padding:6px 12px; border-radius:12px; font-size:13px; cursor:pointer; font-family:var(--font-luxury);" onmouseover="this.style.background='#444'" onmouseout="this.style.background='#2b2b2b'">(سنة الصنع)</button>
                <button type="button" onclick="window.insertQRVariable('(السعر)')" style="background:#2b2b2b; color:white; border:1px solid #444; padding:6px 12px; border-radius:12px; font-size:13px; cursor:pointer; font-family:var(--font-luxury);" onmouseover="this.style.background='#444'" onmouseout="this.style.background='#2b2b2b'">(السعر)</button>
                <button type="button" onclick="window.insertQRVariable('(المحرك)')" style="background:#2b2b2b; color:white; border:1px solid #444; padding:6px 12px; border-radius:12px; font-size:13px; cursor:pointer; font-family:var(--font-luxury);" onmouseover="this.style.background='#444'" onmouseout="this.style.background='#2b2b2b'">(المحرك)</button>
                <button type="button" onclick="window.insertQRVariable('(الممشى)')" style="background:#2b2b2b; color:white; border:1px solid #444; padding:6px 12px; border-radius:12px; font-size:13px; cursor:pointer; font-family:var(--font-luxury);" onmouseover="this.style.background='#444'" onmouseout="this.style.background='#2b2b2b'">(الممشى)</button>
                <button type="button" onclick="window.insertQRVariable('(نوع الوقود)')" style="background:#2b2b2b; color:white; border:1px solid #444; padding:6px 12px; border-radius:12px; font-size:13px; cursor:pointer; font-family:var(--font-luxury);" onmouseover="this.style.background='#444'" onmouseout="this.style.background='#2b2b2b'">(نوع الوقود)</button>
                <button type="button" onclick="window.insertQRVariable('(فئة السيارة)')" style="background:#2b2b2b; color:white; border:1px solid #444; padding:6px 12px; border-radius:12px; font-size:13px; cursor:pointer; font-family:var(--font-luxury);" onmouseover="this.style.background='#444'" onmouseout="this.style.background='#2b2b2b'">(فئة السيارة)</button>
                <button type="button" onclick="window.insertQRVariable('(اللون الخارجي)')" style="background:#2b2b2b; color:white; border:1px solid #444; padding:6px 12px; border-radius:12px; font-size:13px; cursor:pointer; font-family:var(--font-luxury);" onmouseover="this.style.background='#444'" onmouseout="this.style.background='#2b2b2b'">(اللون الخارجي)</button>
                <button type="button" onclick="window.insertQRVariable('(اللون الداخلي)')" style="background:#2b2b2b; color:white; border:1px solid #444; padding:6px 12px; border-radius:12px; font-size:13px; cursor:pointer; font-family:var(--font-luxury);" onmouseover="this.style.background='#444'" onmouseout="this.style.background='#2b2b2b'">(اللون الداخلي)</button>
                <button type="button" onclick="window.insertQRVariable('(طريقة الشراء)')" style="background:#2b2b2b; color:white; border:1px solid #444; padding:6px 12px; border-radius:12px; font-size:13px; cursor:pointer; font-family:var(--font-luxury);" onmouseover="this.style.background='#444'" onmouseout="this.style.background='#2b2b2b'">(طريقة الشراء)</button>
                <button type="button" onclick="window.insertQRVariable('(اسم البنك)')" style="background:#2b2b2b; color:white; border:1px solid #444; padding:6px 12px; border-radius:12px; font-size:13px; cursor:pointer; font-family:var(--font-luxury);" onmouseover="this.style.background='#444'" onmouseout="this.style.background='#2b2b2b'">(اسم البنك)</button>
                <button type="button" onclick="window.insertQRVariable('(مدة الأقساط)')" style="background:#2b2b2b; color:white; border:1px solid #444; padding:6px 12px; border-radius:12px; font-size:13px; cursor:pointer; font-family:var(--font-luxury);" onmouseover="this.style.background='#444'" onmouseout="this.style.background='#2b2b2b'">(مدة الأقساط)</button>
                <button type="button" onclick="window.insertQRVariable('(الراتب)')" style="background:#2b2b2b; color:white; border:1px solid #444; padding:6px 12px; border-radius:12px; font-size:13px; cursor:pointer; font-family:var(--font-luxury);" onmouseover="this.style.background='#444'" onmouseout="this.style.background='#2b2b2b'">(الراتب)</button>
                <button type="button" onclick="window.insertQRVariable('(الإلتزامات)')" style="background:#2b2b2b; color:white; border:1px solid #444; padding:6px 12px; border-radius:12px; font-size:13px; cursor:pointer; font-family:var(--font-luxury);" onmouseover="this.style.background='#444'" onmouseout="this.style.background='#2b2b2b'">(الإلتزامات)</button>
                <button type="button" onclick="window.insertQRVariable('(جهة العمل)')" style="background:#2b2b2b; color:white; border:1px solid #444; padding:6px 12px; border-radius:12px; font-size:13px; cursor:pointer; font-family:var(--font-luxury);" onmouseover="this.style.background='#444'" onmouseout="this.style.background='#2b2b2b'">(جهة العمل)</button>
                <button type="button" onclick="window.insertQRVariable('(حالة الجهة)')" style="background:#2b2b2b; color:white; border:1px solid #444; padding:6px 12px; border-radius:12px; font-size:13px; cursor:pointer; font-family:var(--font-luxury);" onmouseover="this.style.background='#444'" onmouseout="this.style.background='#2b2b2b'">(حالة الجهة)</button>
            </div>
            <p style="font-size:12px; color:var(--text-dim); margin-top:8px;">ستتم ترجمة هذه المتغيرات إلى بيانات العميل الفعلية تلقائياً عند إرسالها.</p>
        </div>
      ` },
      { name: "content", label: "محتوى الرسالة الكامل", type: "textarea", required: true, placeholder: "اكتب هنا نص الرسالة التي ستظهر للموظف لاستخدامها..." }
    ];
  } else if (type === "sales") {
    fields = [
      { name: "title", label: "عنوان الفيديو", type: "text", required: true, placeholder: "مثال: تسليم سيارة مرسيدس G-Class" },
      { name: "url", label: "رابط الفيديو (YouTube أو مباشر)", type: "text", required: true, placeholder: "https://youtube.com/watch?v=..." },
      { name: "poster", label: "رابط صورة الغلاف (اختياري)", type: "text", placeholder: "https://..." },
      { name: "description", label: "وصف مبسط", type: "textarea", placeholder: "يسعدنا دائماً مشاركة لحظات نجاحنا..." }
    ];
  } else {
    // Default fallback fields for other types
    fields = [
      { name: "name", label: "الاسم / العنوان", type: "text" },
      { name: "desc", label: "الوصف", type: "textarea" }
    ];
  }

  container.innerHTML = `
    <div class="form-grid-v3">
      ${fields.map(f => {
    if (f.type === "custom") return f.html;

    let val = (data[f.name] !== undefined && data[f.name] !== null) ? data[f.name] : "";
    if (f.name === "desc" && !val) val = data.description || data.details || "";
    const requiredAttr = f.required ? 'required' : '';
    const placeholder = f.placeholder || f.label;

    let fieldHtml = "";
    if (f.type === "select") {
      fieldHtml = `
            <select name="${f.name}" class="filter-select" ${requiredAttr}>
              ${f.options.map(opt => `<option value="${opt.v}" ${opt.v.toString() === val.toString() ? 'selected' : ''}>${opt.t}</option>`).join('')}
            </select>
          `;
    } else if (f.type === "datalist") {
      fieldHtml = `
            <input type="text" name="${f.name}" list="list-${f.name}" value="${val}" class="filter-select" ${requiredAttr} autocomplete="off" placeholder="${placeholder}">
            <datalist id="list-${f.name}">
              ${f.options.map(opt => `<option value="${opt.v}">${opt.t}</option>`).join('')}
            </datalist>
          `;
    } else if (f.type === "textarea") {
      fieldHtml = `<textarea name="${f.name}" placeholder="${placeholder}" ${requiredAttr}>${val}</textarea>`;
    } else if (f.type === "file") {
      fieldHtml = `
            <input type="file" name="${f.name}" ${f.multiple ? 'multiple' : ''} ${requiredAttr} accept="image/*" class="filter-select">
            ${val ? `<div class="file-path-hint" title="${val}">الملف الحالي: ${val.split('/').pop()}</div>` : ""}
          `;
    } else {
      fieldHtml = `<input type="${f.type}" name="${f.name}" value="${val}" placeholder="${placeholder}" ${requiredAttr}>`;
    }

    return `
          <div class="f-group ${f.type === 'textarea' || f.type === 'custom' ? 'full-width' : ''}">
            <label>${f.label} ${f.required ? '<span class="req">*</span>' : ''}</label>
            ${fieldHtml}
          </div>
        `;
  }).join('')}
    </div>
  `;
}

// Image Manager Helpers
window.handleCarFileSelect = function (files) {
  if (!files) return;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    window.state.carImages.push({
      type: 'file',
      value: file,
      preview: URL.createObjectURL(file),
      isMain: window.state.carImages.length === 0
    });
  }
  window.renderCarImageManager();
};

window.renderCarImageManager = function () {
  const container = document.getElementById("car-image-manager");
  if (!container) return;

  const images = window.state.carImages || [];

  let html = `
    <div class="img-grid-v2">
      ${images.map((img, idx) => {
    const src = img.type === 'url' ? img.value : img.preview;
    return `
          <div class="img-item-v2 ${img.isMain ? 'is-main' : ''}" 
               draggable="true" 
               ondragstart="window.handleImageDragStart(event, ${idx})"
               ondragover="window.handleImageDragOver(event)"
               ondragleave="window.handleImageDragLeave(event)"
               ondragend="window.handleImageDragEnd(event)"
               ondrop="window.handleImageDrop(event, ${idx})">
            ${img.isMain ? '<span class="main-badge">الرئيسية</span>' : ''}
            <img src="${src}" alt="Car image">
            <div class="img-actions-lite">
              <button type="button" class="img-action-btn-lite" onclick="window.reorderCarImage(${idx}, -1)" title="نقل لليمين">
                <i class="fas fa-arrow-right"></i>
              </button>
              <button type="button" class="img-action-btn-lite" onclick="window.reorderCarImage(${idx}, 1)" title="نقل لليسار">
                <i class="fas fa-arrow-left"></i>
              </button>
              <button type="button" class="img-action-btn-lite" onclick="window.setCarMainImage(${idx})" title="تعيين كرئيسية">
                <i class="fas fa-star"></i>
              </button>
              <button type="button" class="img-action-btn-lite danger" onclick="window.removeCarImage(${idx})" title="حذف">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        `;
  }).join('')}
      <div class="add-img-btn-v2" onclick="document.getElementById('car-file-input').click()">
        <i class="fas fa-plus"></i>
        <span>أضف صور</span>
      </div>
    </div>
  `;
  container.innerHTML = html;
};

window.reorderCarImage = function (index, direction) {
  const arr = window.state.carImages;
  const newIndex = index + direction;
  if (newIndex >= 0 && newIndex < arr.length) {
    const temp = arr[index];
    arr[index] = arr[newIndex];
    arr[newIndex] = temp;
    window.renderCarImageManager();
  }
};

window.removeCarImage = function (index) {
  if (index < 0 || index >= window.state.carImages.length) return;
  const wasMain = window.state.carImages[index].isMain;
  window.state.carImages.splice(index, 1);
  if (wasMain && window.state.carImages.length > 0) {
    window.state.carImages[0].isMain = true;
  }
  window.renderCarImageManager();
};
window.handleImageDragStart = function (e, index) {
  e.dataTransfer.setData("text/plain", index);
  e.currentTarget.classList.add("dragging");
};
window.handleImageDragOver = function (e) {
  e.preventDefault();
  e.currentTarget.classList.add("drag-over");
};
window.handleImageDragLeave = function (e) {
  e.currentTarget.classList.remove("drag-over");
};
window.handleImageDragEnd = function (e) {
  e.currentTarget.classList.remove("dragging");
};
window.handleImageDrop = function (e, targetIndex) {
  e.preventDefault();
  e.currentTarget.classList.remove("drag-over");
  const sourceIndex = parseInt(e.dataTransfer.getData("text/plain"));
  if (sourceIndex !== targetIndex) {
    const arr = window.state.carImages;
    const item = arr.splice(sourceIndex, 1)[0];
    arr.splice(targetIndex, 0, item);
    window.renderCarImageManager();
  }
};

window.setCarMainImage = function (index) {
  window.state.carImages.forEach((img, idx) => img.isMain = (idx === index));
  window.renderCarImageManager();
};

window.saveLuxuryItem = async function (e) {
  if (e) e.preventDefault();
  const edit = window.state.currentEdit;
  if (!edit) return;

  const { type, id } = edit;
  const form = document.getElementById("item-form");
  if (!form) return;

  const btn = form.querySelector('button[type="submit"]');
  const originalBtnText = btn.innerText;

  if (btn) {
    btn.disabled = true;
    btn.innerText = "جاري الحفظ والمعالجة...";
  }

  const formData = new FormData(form);
  const data = {};
  formData.forEach((val, key) => {
    if (key !== "main_img_file" && key !== "gallery_files") {
      if (key === "password" && !val) return;
      data[key] = val;
    }
  });

  try {
    // 1. Unified Image Manager Upload (Only for Cars)
    if (type === "cars") {
      const finalImageUrls = [];
      let mainImageUrl = "";

      const carImages = window.state.carImages || [];
      for (let i = 0; i < carImages.length; i++) {
        const img = carImages[i];
        let url = "";

        if (img.type === "url") {
          url = img.value;
        } else if (img.type === "file") {
          // Compress and convert to Base64
          url = await window.compressImage(img.value, 1000, 1000, 0.6);
        }

        if (url) {
          finalImageUrls.push(url);
          if (img.isMain) mainImageUrl = url;
        }
      }

      if (!mainImageUrl && finalImageUrls.length > 0) mainImageUrl = finalImageUrls[0];
      data.image = mainImageUrl;
      data.images = finalImageUrls;
    }

    // 2. Handle single image files for other types (ads, partners, brands, etc.)
    const imageFields = ["image", "logo", "avatar", "poster"];
    for (const field of imageFields) {
      if (data[field] instanceof File && data[field].size > 0) {
        data[field] = await window.compressImage(data[field], 1000, 1000, 0.7);
      } else if (data[field] instanceof File && data[field].size === 0) {
        // If it's an empty file input and we are editing, keep the old value
        delete data[field];
      }
    }


    // Convert numeric fields
    const numFields = ["price", "year", "mileage", "rating", "installmentPeriod", "monthlyInstallment"];
    numFields.forEach(f => {
      if (data[f] !== undefined && data[f] !== "" && data[f] !== null) {
        data[f] = Number(data[f]);
      } else {
        delete data[f];
      }
    });

    // Fix isFeatured boolean
    if (data.isFeatured !== undefined) {
      data.isFeatured = (data.isFeatured === "true" || data.isFeatured === true);
    }

    if (!id) data.createdAt = new Date().toISOString();
    data.updatedAt = new Date().toISOString();

    if (type === "users" && !id) {
      // Special handling for new user: Create in Firebase Auth
      if (!data.password) {
        window.showLuxuryToast("كلمة المرور مطلوبة للموظف الجديد", "error");
        if (btn) { btn.disabled = false; btn.innerText = originalBtnText; }
        return;
      }

      // Create a secondary app to create the user without logging out the admin
      const secondaryApp = initializeApp(firebaseConfig, "Secondary");
      const secondaryAuth = getAuth(secondaryApp);

      try {
        const userCredential = await createUserWithEmailAndPassword(secondaryAuth, data.email, data.password);
        const newUid = userCredential.user.uid;

        // Use this UID for the database entry
        const userRef = ref(db, `users/${newUid}`);
        await set(userRef, data); // Keep password in database as requested

        // Clean up secondary app
        await deleteApp(secondaryApp);
      } catch (authErr) {
        await deleteApp(secondaryApp);
        throw authErr;
      }
    } else {
      // Standard handling for updates or other data types

      // If it's a user update and password/email/name is provided, sync with Firebase Auth via backend
      if (type === "users") {
        const activeUrl = window._waServerActiveUrl || CURRENT_MASTER_URL;
        try {
          await fetch(`${activeUrl}/api/admin/update-user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              adminUid: window.state.user.uid,
              targetUid: id,
              data: {
                password: data.password,
                email: data.email,
                name: data.name
              }
            })
          });
        } catch (backendErr) {
          console.warn("Backend Auth Sync failed:", backendErr);
          // We continue anyway to update the database record
        }
      }

      const targetRef = id ? ref(db, `${type}/${id}`) : push(ref(db, type));
      await (id ? update(targetRef, data) : set(targetRef, data));

      // 3. Auto-save new presets for Gearbox and BodyType
      if (type === "cars") {
        if (data.gearbox && !(window.state.gearboxes || []).some(g => g.name === data.gearbox)) {
          const isDefault = ["عادي", "أوتوماتيكي", "CVT"].includes(data.gearbox);
          if (!isDefault) await push(ref(db, 'gearboxes'), { name: data.gearbox });
        }
        if (data.bodyType && !(window.state.bodyTypes || []).some(b => b.name === data.bodyType)) {
          const isDefault = ["sedan", "suv", "coupe", "luxury", "pickup"].includes(data.bodyType) ||
            ["سيدان", "SUV", "كوبيه", "فاخرة", "بيك آب"].includes(data.bodyType);
          if (!isDefault) await push(ref(db, 'bodyTypes'), { name: data.bodyType });
        }
        if (data.make && !(window.state.brands || []).some(b => b.name === data.make)) {
          await push(ref(db, 'brands'), { name: data.make });
        }
        if (data.engine && !(window.state.engines || []).some(e => e.name === data.engine)) {
          const isDefault = ["4 سليندر", "6 سليندر", "8 سليندر"].includes(data.engine);
          if (!isDefault) await push(ref(db, 'engines'), { name: data.engine });
        }
        if (data.color && !(window.state.exteriorColors || []).some(c => c.name === data.color)) {
          const isDefault = ["أبيض", "أسود", "فضي", "رمادي"].includes(data.color);
          if (!isDefault) await push(ref(db, 'exteriorColors'), { name: data.color });
        }
        if (data.interiorColor && !(window.state.interiorColors || []).some(c => c.name === data.interiorColor)) {
          const isDefault = ["بيج", "أسود", "جملي", "أحمر"].includes(data.interiorColor);
          if (!isDefault) await push(ref(db, 'interiorColors'), { name: data.interiorColor });
        }
        if (data.status && !(window.state.stockStatuses || []).some(s => s.name === data.status)) {
          const isDefault = ["available", "reserved", "sold", "incoming"].includes(data.status);
          if (!isDefault) await push(ref(db, 'stockStatuses'), { name: data.status });
        }
      }
    }

    window.showLuxuryToast(id ? "تم تحديث البيانات بنجاح" : "تم إضافة العنصر بنجاح");
    window.closeModal("item-modal");
    window.createLog(id ? "تعديل" : "إضافة", `${id ? 'تعديل' : 'إضافة'} في ${type} - ${data.make || data.title || id}`, "data");
  } catch (err) {
    console.error("Save Error:", err);
    window.showLuxuryToast("حدث خطأ أثناء الحفظ: " + (err.message || "خطأ غير معروف"), "error");
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerText = originalBtnText;
    }
  }
};

// =========================================================================================
// MEDIA RENDERING (ADS & VIDEOS)
// =========================================================================================

window.openQuickReplyModal = function () {
  window.openCRUDModal("quickReplies");
};

window.renderQuickRepliesAdmin = function () {
  const grid = document.getElementById("quick-replies-list");
  if (!grid) return;

  const query = (document.getElementById("qr-search")?.value || "").toLowerCase().trim();
  const items = (window.state.quickReplies || []).filter(item =>
    (item.title || "").toLowerCase().includes(query) ||
    (item.content || "").toLowerCase().includes(query)
  );

  if (items.length === 0) {
    grid.innerHTML = '<div class="no-results-v2" style="grid-column:1/-1;"><p>لا توجد نتائج مطابقة لبحثك</p></div>';
    return;
  }

  grid.innerHTML = items.map(item => `
        <div class="admin-item-card-v2 animate-fade-in" data-aos="fade-up">
            <div class="item-card-content">
                <div class="item-card-header">
                    <div class="item-icon-circle"><i class="fas fa-bolt"></i></div>
                    <strong>${item.title}</strong>
                </div>
                <div class="item-card-body">
                    <p class="qr-content-preview">${item.content}</p>
                </div>
            </div>
            <div class="item-card-actions">
                <button class="icon-btn-lite" onclick="window.editLuxuryItem('quickReplies', '${item.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('quickReplies', '${item.id}')" title="حذف"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join("");
};

window.renderAdsSlider = function () {
  const container = document.getElementById("slider-track");
  const dotsContainer = document.getElementById("slider-dots");
  if (!container) return;

  const ads = window.state.ads || [];
  if (ads.length === 0) {
    container.innerHTML = '<div class="no-ads"></div>';
    if (dotsContainer) dotsContainer.innerHTML = "";
    return;
  }

  container.innerHTML = ads.map(ad => `
        <div class="ad-slide">
            <img src="${ad.image || "logo.jpg"}" class="ad-bg-img" alt="${ad.title || "عرض خاص"}">
            <div class="ad-content">
                <h2 class="luxury-font">${ad.title || ""}</h2>
                <p>${ad.subtitle || ""}</p>
                ${ad.link ? `<a href="${ad.link}" class="btn-premium"><span>اكتشف المزيد</span> <i class="fas fa-arrow-left" style="margin-right: 10px;"></i></a>` : ""}
            </div>
        </div>
    `).join("");

  // Render Dots
  if (dotsContainer) {
    dotsContainer.innerHTML = ads.map((_, i) => `<div class="dot ${i === 0 ? 'active' : ''}" onclick="window.goToLuxurySlide(${i})"></div>`).join("");
  }

  window.state.sliderIndex = 0;
  window.moveLuxurySlider(0); // Reset position
};

window.goToLuxurySlide = function (index) {
  window.state.sliderIndex = index;
  window.moveLuxurySlider(0);
};

window.moveLuxurySlider = function (dir) {
  const track = document.getElementById("slider-track");
  if (!track) return;

  const count = window.state.ads?.length || 0;
  if (count <= 1) {
    track.style.transform = "translateX(0)";
    return;
  }

  window.state.sliderIndex = (window.state.sliderIndex + dir + count) % count;

  // In RTL, we translate positive percentages to move track to the right
  // In LTR, we translate negative percentages to move track to the left
  const offset = window.state.sliderIndex * 100;
  const isRTL = document.body.dir === 'rtl';
  track.style.transform = `translateX(${isRTL ? offset : -offset}%)`;

  // Sync Dots
  const dots = document.querySelectorAll(".slider-dots .dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === window.state.sliderIndex);
  });
};

window.calculateLuxuryFinancing = function () {
  const price = Number(document.getElementById("calc-car-price")?.value) || 0;
  const down = Number(document.getElementById("calc-down-pay")?.value) || 0;
  const years = Number(document.getElementById("calc-years")?.value) || 5;
  const resultVal = document.getElementById("calc-result-val");

  if (!resultVal) return;

  const principal = price - down;
  if (principal <= 0) {
    resultVal.innerText = "0 ريال";
    return;
  }

  // Simple estimation: (Principal * (1 + (Rate * Years))) / (Years * 12)
  const annualRate = 0.045; // 4.5% estimated
  const totalAmount = principal * (1 + (annualRate * years));
  const monthly = Math.round(totalAmount / (years * 12));

  resultVal.innerText = monthly.toLocaleString() + " ريال";
};

window.renderSalesVideos = function () {
  const grid = document.getElementById("sales-container");
  if (!grid) return;

  const sales = window.state.sales || [];
  if (sales.length === 0) {
    grid.innerHTML = '<div class="no-results-v2"><p>لا توجد مقاطع فيديو متاحة حالياً</p></div>';
    return;
  }

  grid.innerHTML = sales.map(video => {
    const url = (video.url || "").trim();
    let isYoutube = url.includes("youtube.com") || url.includes("youtu.be") || url.includes("youtube-nocookie.com");
    let isTiktok = url.includes("tiktok.com");
    let isInsta = url.includes("instagram.com");
    let isSnap = url.includes("snapchat.com");

    let thumb = video.poster || video.image || null;

    if (isYoutube && !thumb) {
      let vidId = "";
      try {
        if (url.includes("v=")) {
          vidId = url.split("v=")[1].split("&")[0];
        } else if (url.includes("youtu.be/")) {
          vidId = url.split("youtu.be/")[1].split("?")[0];
        } else if (url.includes("embed/")) {
          vidId = url.split("embed/")[1].split("?")[0];
        } else {
          vidId = url.split("/").pop().split("?")[0];
        }
      } catch (e) { vidId = ""; }

      if (vidId) {
        thumb = `https://img.youtube.com/vi/${vidId}/hqdefault.jpg`;
      }
    }

    thumb = thumb || "logo.jpg";

    return `
            <div class="video-card-v2" data-aos="zoom-in" onclick="window.openVideoLightbox('${url}')">
                <div class="video-player-wrap">
                    <div class="video-inner">
                        <img src="${thumb}" alt="${video.title || "Success Moment"}" onerror="this.src='logo.jpg'" style="width:100%; height:100%; object-fit:cover;">
                        <div class="v-play-overlay">
                            <div class="v-play-btn"><i class="fas fa-play"></i></div>
                        </div>
                        ${isYoutube ? '<div class="v-platform-icon"><i class="fab fa-youtube"></i></div>' : isTiktok ? '<div class="v-platform-icon"><i class="fab fa-tiktok"></i></div>' : isInsta ? '<div class="v-platform-icon"><i class="fab fa-instagram"></i></div>' : isSnap ? '<div class="v-platform-icon"><i class="fab fa-snapchat"></i></div>' : ""}
                    </div>
                </div>
                <div class="video-info-v2">
                    <span class="v-badge-gold"><i class="fas fa-award"></i> مبيعات ناجحة</span>
                    <h3>${video.title || video.name || "لحظة تسليم"}</h3>
                    <p>${video.description || "يسعدنا دائماً مشاركة لحظات نجاحنا مع عملائنا الكرام."}</p>
                </div>
            </div>`;
  }).join("");
};

window.openVideoLightbox = function (url) {
  let mediaHtml = "";
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    let vidId = "";
    try {
      if (url.includes("v=")) vidId = url.split("v=")[1].split("&")[0];
      else if (url.includes("youtu.be/")) vidId = url.split("youtu.be/")[1].split("?")[0];
      else if (url.includes("embed/")) vidId = url.split("embed/")[1].split("?")[0];
      else vidId = url.split("/").pop().split("?")[0];
    } catch (e) { vidId = ""; }
    mediaHtml = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${vidId}?autoplay=1&modestbranding=1&rel=0" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
  } else {
    mediaHtml = `<video controls autoplay style="width:100%; height:100%; border-radius:15px; background:#000;">
                        <source src="${url}" type="video/mp4">
                        متصفحك لا يدعم تشغيل الفيديو.
                    </video>`;
  }

  const lb = document.createElement('div');
  lb.className = 'luxury-lightbox';
  lb.id = 'video-lightbox';
  lb.innerHTML = `
        <button class="lb-close" onclick="this.parentElement.remove()">&times;</button>
        <div class="lb-content animate-fade-in" style="max-width:1000px; width:95%; aspect-ratio:16/9; margin-top:0;">
            ${mediaHtml}
        </div>
    `;
  document.body.appendChild(lb);
};

// =========================================================================================
// WHATSAPP WIDGET
// =========================================================================================

window.toggleWAWidget = function () {
  const widget = document.getElementById("wa-widget");
  if (widget) widget.classList.toggle("hidden");
};

window.sendWAWidgetMsg = function () {
  const input = document.getElementById("wa-input");
  const msg = input?.value?.trim();
  if (!msg) return;
  const phone = window.state.settings.contactSales || "0500000000";
  window.open(`https://wa.me/${window.normalizePhone(phone)}?text=${encodeURIComponent(msg)}`, "_blank");
  if (input) input.value = "";
  window.toggleWAWidget();
};

// =========================================================================================
// LOGGING & UTILS
// =========================================================================================

window.createLog = async function (action, details, category = "general") {
  try {
    const logRef = push(ref(db, "logs"));
    await set(logRef, {
      user: window.state.user?.email || "Visitor",
      userId: window.state.user?.uid || null,
      action,
      details,
      category,
      timestamp: new Date().toISOString()
    });
  } catch (e) {
    console.error("Log Error:", e);
  }
};

window.submitBooking = async function (e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');

  let pCode = (document.getElementById("b-phone-code")?.value === "other" ? document.getElementById("b-phone-code-other")?.value : document.getElementById("b-phone-code")?.value) || "966";
  let pNum = document.getElementById("b-phone")?.value || "";
  pCode = pCode.replace(/\D/g, '');
  pNum = pNum.replace(/\D/g, '');

  // Auto-detect country code from the phone number to prevent user errors
  if (pNum.startsWith('05') || (pNum.startsWith('5') && pNum.length === 9) || pNum.startsWith('9665')) {
    pCode = '966';
    if (pNum.startsWith('05')) pNum = pNum.substring(1);
    if (pNum.startsWith('966')) pNum = pNum.substring(3);
  } else if (pNum.startsWith('07') || (pNum.startsWith('7') && pNum.length === 9) || pNum.startsWith('9677')) {
    pCode = '967';
    if (pNum.startsWith('07')) pNum = pNum.substring(1);
    if (pNum.startsWith('967')) pNum = pNum.substring(3);
  } else {
    if (pCode && pNum.startsWith(pCode)) pNum = pNum.substring(pCode.length);
    if (pCode && pNum.startsWith('00' + pCode)) pNum = pNum.substring(pCode.length + 2);
  }

  const finalPhone = window.normalizePhone(pCode + pNum);

  const data = {
    customerType: form.querySelector('[name="customer-type"]:checked')?.value || "individual",
    carRequested: document.getElementById("b-car")?.value || "",
    name: document.getElementById("b-name")?.value || "",
    phone: finalPhone,
    age: document.getElementById("b-age")?.value || "",
    email: document.getElementById("b-email")?.value || "",
    nationality: document.getElementById("b-nationality")?.value === "مقيم" ? (document.getElementById("b-nationality-other")?.value || "مقيم") : (document.getElementById("b-nationality")?.value || "سعودي"),
    city: document.getElementById("b-city")?.value === "أخرى" ? (document.getElementById("b-city-other")?.value || "أخرى") : (document.getElementById("b-city")?.value || ""),
    paymentMethod: form.querySelector('[name="payment-method"]:checked')?.value || "كاش",
    bankName: document.getElementById("b-bank-name")?.value || "",
    installmentPeriod: document.getElementById("b-installment-period")?.value || "",
    salary: document.getElementById("b-salary")?.value || "",
    commitments: document.getElementById("b-commitments")?.value || "",
    workEntity: document.getElementById("b-work-entity")?.value || "حكومي",
    workStatus: document.getElementById("b-work-status")?.value || "معتمد",
    contactMethod: form.querySelector('[name="contact-method"]:checked')?.value || "الجوال",
    preferredTime: form.querySelector('[name="preferred-time"]:checked')?.value || "10am - 1pm",
    notes: document.getElementById("b-notes")?.value || "",
    status: "new",
    subStatus: "not_contacted",
    createdAt: new Date().toISOString()
  };

  btn.disabled = true;
  btn.innerText = "جاري الإرسال...";

  try {
    // Round-robin Assignment Logic
    const configRef = ref(db, "config/lastAssignedStaffIndex_v2");
    const staffMembers = window.state.users.filter(u => u.role === "staff" && u.isAvailable !== false);

    if (staffMembers.length > 0) {
      await runTransaction(configRef, (currentIndex) => {
        let nextIndex = (currentIndex || 0);
        if (nextIndex >= staffMembers.length) nextIndex = 0;
        const assignedStaff = staffMembers[nextIndex];
        data.assignedTo = assignedStaff.id;
        return (nextIndex + 1) % staffMembers.length;
      });
    }

    const bookingRef = push(ref(db, "bookings"));
    await set(bookingRef, data);

    // Create notification for assigned staff
    if (data.assignedTo) {
      await push(ref(db, "notifications"), {
        userId: data.assignedTo,
        type: "new_booking",
        title: "طلب جديد مسند إليك",
        body: `لديك طلب جديد من ${data.name} للسيارة ${data.carRequested}`,
        bookingId: bookingRef.key,
        read: false,
        createdAt: new Date().toISOString()
      });
    }

    window.showLuxuryToast("تم إرسال طلبك بنجاح، سنتواصل معك قريباً");
    form.reset();
  } catch (err) {
    console.error(err);
    window.showLuxuryToast("حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً", "error");
  } finally {
    btn.disabled = false;
    btn.innerText = "تأكيد طلب حجز الخدمة";
  }
};

// =========================================================================================
// AI ASSISTANT IMPLEMENTATION
// =========================================================================================

window.fillAIInput = function (text) {
  const input = document.getElementById("ai-chat-input");
  if (input) input.value = text;
};

window.clearAIChat = function () {
  const area = document.getElementById("ai-messages-area");
  if (area) area.innerHTML = "";
};

window.askLuxuryAI = function () {
  const input = document.getElementById("ai-chat-input");
  const msg = input?.value?.trim();
  if (!msg) return;

  appendAIMessage("user", msg);
  input.value = "";

  // Show typing indicator
  const typingId = "ai-typing-" + Date.now();
  appendAIMessage("bot", "جاري التفكير...", typingId);

  setTimeout(() => {
    const typingEl = document.getElementById(typingId);
    if (typingEl) typingEl.remove();

    const response = generateAIResponse(msg);
    appendAIMessage("bot", response);
  }, 1000);
};

function appendAIMessage(role, text, id = null) {
  const area = document.getElementById("ai-messages-area");
  if (!area) return;

  const div = document.createElement("div");
  div.className = `ai-msg ${role}`;
  if (id) div.id = id;
  div.innerHTML = `
        <div class="msg-icon"><i class="fas ${role === 'bot' ? 'fa-robot' : 'fa-user'}"></i></div>
        <div class="msg-content">
            <p>${text}</p>
        </div>
    `;
  area.appendChild(div);
  area.scrollTop = area.scrollHeight;
}

function generateAIResponse(query) {
  const q = query.toLowerCase();
  const cars = window.state.cars || [];
  const bookings = window.state.bookings || [];

  if (q.includes("قيمة") || q.includes("مخزون")) {
    const total = cars.reduce((sum, c) => sum + (parseFloat(c.price) || 0), 0);
    return `إجمالي قيمة المخزون الحالي هو ${total.toLocaleString()} ريال سعودي لعدد ${cars.length} سيارة.`;
  }
  if (q.includes("موظف") || q.includes("أفضل")) {
    return "بناءً على البيانات الحالية، يتميز فريق المبيعات بنشاط عالٍ، والمنافسة قوية بين الموظفين لهذا الشهر.";
  }
  if (q.includes("ملخص") || q.includes("أداء")) {
    const newB = bookings.filter(b => b.status === "new" || !b.status).length;
    return `حالة اليوم: يوجد ${newB} طلبات جديدة لم يتم معالجتها بعد، وإجمالي الطلبات في النظام هو ${bookings.length}.`;
  }
  return "أنا هنا لمساعدتك في إدارة المعرض. يمكنك سؤالي عن المخزون، الطلبات، أو الإحصائيات العامة.";
}

// =========================================================================================
// WHATSAPP MONITOR IMPLEMENTATION
// =========================================================================================

window.renderWhatsAppMonitor = function () {
  const table = document.getElementById("admin-wa-monitor-table");
  if (!table) return;

  // This section typically displays logs of WhatsApp interactions or proofs
  // For now, we use a filtered view of 'logs' or 'bookings' that have proof links
  const searchQuery = (document.getElementById("wa-monitor-search")?.value || "").toLowerCase();
  const filter = document.getElementById("wa-monitor-filter")?.value || "all";

  // Filtering logic (example implementation)
  let items = (window.state.logs || []).filter(l => l.category === "whatsapp" || l.details.includes("WhatsApp"));

  if (searchQuery) {
    items = items.filter(i => i.details.toLowerCase().includes(searchQuery) || i.user.toLowerCase().includes(searchQuery));
  }

  if (items.length === 0) {
    table.innerHTML = '<div class="no-data-admin" style="padding:40px; text-align:center;">لا توجد سجلات مراقبة حالياً</div>';
    return;
  }

  table.innerHTML = items.map(item => `
        <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:12px; border:1px solid var(--glass-border); margin-bottom:10px;">
            <div style="display:flex; justify-content:space-between;">
                <strong>${item.user}</strong>
                <span style="opacity:0.5; font-size:11px;">${new Date(item.timestamp).toLocaleString()}</span>
            </div>
            <p style="font-size:13px; margin:10px 0;">${item.details}</p>
            ${item.proofUrl ? `<a href="${item.proofUrl}" target="_blank" class="btn-premium btn-sm" style="display:inline-block;">عرض الإثبات</a>` : ""}
        </div>
    `).join("");
};

/* =====================
   WhatsApp Server API Integrations (Multi-Agent)
   ===================== */
let waSocketContainer = null;
// Force reset any old cloudflare/localtunnel URLs to the new permanent one
const CURRENT_MASTER_URL = "https://whatsapp-server-tq4f.onrender.com";
const WA_SERVER_URL = window.WA_SERVER_URL_OVERRIDE || localStorage.getItem('wa_server_url') || CURRENT_MASTER_URL;

window.saveWAServerURL = async function () {
  const el = document.getElementById('wa-server-url-config');
  if (!el) return;
  let url = el.value.trim().replace(/\/$/, "");
  if (!url) return window.showLuxuryToast('يرجى إدخال الرابط', 'error');
  try {
    await set(ref(db, 'settings/waServerUrl'), url);
    localStorage.setItem('wa_server_url', url);
    window.showLuxuryToast('تم حفظ الرابط وبثه للجميع، سيتم تحديث الصفحة', 'success');
    setTimeout(() => location.reload(), 1500);
  } catch (err) {
    window.showLuxuryToast('خطأ في الصلاحيات لرفع الرابط', 'error');
  }
};

window.startStaffWASession = function () {
  const sel = document.getElementById('wa-staff-select');
  if (!sel || !sel.value) return window.showLuxuryToast('يرجى اختيار موظف للربط', 'error');
  if (waSocketContainer) {
    document.getElementById('wa-server-status').innerText = 'يتم الآن توليد كود الاستجابة للموظف...';
    document.getElementById('wa-server-status').style.color = 'var(--text-dim)';
    document.getElementById('wa-qr-container').style.display = 'none';
    waSocketContainer.emit('start_session', { userId: sel.value });
  }
};

window.logoutStaffWASession = function () {
  const sel = document.getElementById('wa-staff-select');
  if (!sel || !sel.value) return window.showLuxuryToast('يرجى اختيار الموظف أولاً', 'error');
  if (confirm('هل أنت متأكد من فصل رقم الواتساب لهذا الموظف وسجل المحادثة الخاصة به من السيرفر؟')) {
    if (waSocketContainer) waSocketContainer.emit('logout_session', { userId: sel.value });
  }
};

window.initWhatsAppServer = async function () {
  // تعبئة البيانات الحالية للسيرفر
  const urlConfig = document.getElementById('wa-server-url-config');

  // الذكاء التلقائي: اكتشاف بيئة GitHub Codespaces
  let codespaceUrl = null;
  if (window.location.hostname.includes('app.github.dev')) {
    // إذا كان المتصفح يعمل في Codespace، نقوم بتخمين رابط السيرفر على المنفذ 3001
    codespaceUrl = `https://${window.location.hostname.replace('-5173', '-3001')}`;
    console.log("تم اكتشاف GitHub Codespaces، استخدام الرابط التلقائي:", codespaceUrl);
  }

  // جلب الرابط الموحد من قاعدة البيانات لضمان تعميم النفق النشط لجميع الموظفين
  let globalUrl = null;
  try {
    const snapshot = await get(ref(db, 'settings/waServerUrl'));
    if (snapshot.exists()) {
      globalUrl = snapshot.val();
      localStorage.setItem('wa_server_url', globalUrl);
    }
  } catch (e) { console.error("Firebase config error:", e); }


  const FINAL_WA_URL = codespaceUrl || globalUrl || localStorage.getItem('wa_server_url') || CURRENT_MASTER_URL;
  window._waServerActiveUrl = FINAL_WA_URL;

  if (urlConfig) {
    urlConfig.value = FINAL_WA_URL;
  }

  // تعبئة قائمة الموظفين
  const staffSelect = document.getElementById('wa-staff-select');
  if (staffSelect && window.state && window.state.users) {
    const currentSelection = staffSelect.value;
    staffSelect.innerHTML = '<option value="">-- اختر الموظف --</option>';
    window.state.users.filter(u => u.role === 'staff' || u.role === 'admin' || u.role === 'supervisor').forEach(u => {
      const roleLabel = u.role === 'admin' ? 'مدير' : (u.role === 'supervisor' ? 'مشرف' : 'موظف');
      staffSelect.innerHTML += `<option value="${u.id}" ${u.id === currentSelection ? 'selected' : ''}>${u.name || u.email || 'موظف'} (${roleLabel})</option>`;
    });

    // ذكاء اصطناعي: الربط التلقائي عند تغيير الموظف
    staffSelect.onchange = function () {
      if (this.value) {
        if (waSocketContainer) waSocketContainer.emit('join_room', this.value);
        window.startStaffWASession();
      }
    };

    // التحقق التلقائي عند التحميل إذا كان هناك موظف مختار مسبقاً
    if (staffSelect.value) {
      if (waSocketContainer) waSocketContainer.emit('join_room', staffSelect.value);
      window.startStaffWASession();
    }
  }

  if (typeof io !== 'undefined' && !waSocketContainer) {
    // Pre-fetch to bypass GitHub Codespaces landing page
    fetch(`${FINAL_WA_URL}/ping`).catch(() => { });

    waSocketContainer = io(FINAL_WA_URL, {
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
      transports: ['websocket', 'polling'], secure: true
    });

    waSocketContainer.on('connect_error', (err) => {
      console.error('Connection Error:', err);
      if (err.message === 'websocket error') return;
      if (!window._waAlerted) {
        alert('عذراً، المتصفح لم يستطع الاتصال بخادم الواتساب. تأكد من أن الرابط يعمل في صفحة منفصلة. الخطأ: ' + err.message);
        window._waAlerted = true;
      }
    });

    waSocketContainer.on('connect', () => {
      console.log('Connected to WhatsApp Server!');

      const dot = document.getElementById('wa-connection-dot');
      if (dot) {
        dot.style.background = '#4de265';
        dot.style.boxShadow = '0 0 5px #4de265';
        dot.title = 'متصل بالسيرفر';
      }

      // الانضمام لغرفة المعرف الخاص للموظف أو المسؤول لمتابعة التحديثات
      if (window.state.user) {
        waSocketContainer.emit('join_room', window.state.user.uid);
      }

      // إذا كان الموظف مسجل دخول ابدأ الجلسة تلقائياً في الخلفية للتحقق من الاتصال
      if (window.state.user && window.startCurrentWASession) {
        setTimeout(() => window.startCurrentWASession(), 1500);
      }
    });

    waSocketContainer.on('qr', (data) => {
      const sel = document.getElementById('wa-staff-select');
      const statusEl = document.getElementById('wa-server-status');
      const qrContainer = document.getElementById('wa-qr-container');
      const qrCanvas = document.getElementById('wa-qr-canvas');

      // تحديث واجهة المسؤول إذا كان الموظف مختاراً
      if (sel && sel.value === data.userId) {
        if (statusEl) {
          statusEl.innerText = 'في انتظار مسح كود الـ QR...';
          statusEl.style.color = 'var(--text-color)';
        }
        if (qrContainer) qrContainer.style.display = 'block';
        if (typeof QRCode !== 'undefined' && qrCanvas) {
          QRCode.toCanvas(qrCanvas, data.qr, function (error) {
            if (error) console.error(error);
          });
        }
      }

      // تحديث واجهة الموظف الحالي إذا كان هذا هو معرفه
      if (window.state.user && data.userId === window.state.user.uid) {
        const myStatusTitle = document.getElementById('wa-my-status-title');
        const myStatusDesc = document.getElementById('wa-my-status-desc');
        const myQrContainer = document.getElementById('wa-my-qr-container');
        const myQrCanvas = document.getElementById('wa-my-qr-canvas');
        const startBtn = document.getElementById('btn-start-my-wa');
        const logoutBtn = document.getElementById('btn-logout-my-wa');

        if (myStatusTitle) myStatusTitle.innerText = 'بانتظار مسح رمز QR...';
        if (myStatusDesc) myStatusDesc.innerText = 'افتح واتساب على هاتفك وامسح الرمز الظاهر أدناه ليتم ربط حسابك.';
        if (myQrContainer) myQrContainer.style.display = 'block';
        if (startBtn) startBtn.innerText = 'تحديث الرمز';
        if (logoutBtn) logoutBtn.style.display = 'none';

        if (typeof QRCode !== 'undefined' && myQrCanvas) {
          QRCode.toCanvas(myQrCanvas, data.qr, { width: 250, margin: 2 }, function (error) {
            if (error) console.error(error);
          });
        }
      }
    });

    waSocketContainer.on('ready', (data) => {
      const sel = document.getElementById('wa-staff-select');

      const dot = document.getElementById('wa-connection-dot');
      if (dot) {
        dot.style.background = '#4de265';
        dot.style.boxShadow = '0 0 8px #4de265';
        dot.title = 'واتساب جاهز للعمل';
      }

      if (sel && sel.value === data.userId) {
        const statusEl = document.getElementById('wa-server-status');
        const qrContainer = document.getElementById('wa-qr-container');
        if (statusEl) {
          statusEl.innerText = data.msg;
          statusEl.style.color = '#00a884';
        }
        if (qrContainer) qrContainer.style.display = 'none';
      }

      // تحديث واجهة الموظف الحالي
      if (window.state.user && data.userId === window.state.user.uid) {
        const myStatusTitle = document.getElementById('wa-my-status-title');
        const myStatusDesc = document.getElementById('wa-my-status-desc');
        const myQrContainer = document.getElementById('wa-my-qr-container');
        const startBtn = document.getElementById('btn-start-my-wa');
        const logoutBtn = document.getElementById('btn-logout-my-wa');

        if (myStatusTitle) myStatusTitle.innerText = 'واتساب متصل بنجاح';
        if (myStatusDesc) myStatusDesc.innerText = 'حسابك الآن مرتبط بالنظام، يمكنك البدء في استقبال وإرسال الرسائل للعملاء.';
        if (myQrContainer) myQrContainer.style.display = 'none';
        if (startBtn) startBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'inline-block';

        window.showLuxuryToast('تم ربط حساب واتساب الخاص بك بنجاح', 'success');
      }
    });

    waSocketContainer.on('disconnected', (data) => {
      console.log('Disconnected Event:', data);

      const dot = document.getElementById('wa-connection-dot');
      if (dot) {
        dot.style.background = '#ff4b4b';
        dot.style.boxShadow = '0 0 5px #ff4b4b';
        dot.title = 'تم قطع الاتصال بالسيرفر';
      }

      const msgToDisplay = data.msg || 'تم قطع الاتصال بالسيرفر. يرجى إعادة الربط لتفعيل خدمات الدردشة.';

      const sel = document.getElementById('wa-staff-select');
      if (sel && sel.value === data.userId) {
        const statusEl = document.getElementById('wa-server-status');
        if (statusEl) {
          statusEl.innerText = msgToDisplay;
          statusEl.style.color = 'red';
        }
      }

      // تحديث واجهة الموظف الحالي
      if (window.state.user && data.userId === window.state.user.uid) {
        const myStatusTitle = document.getElementById('wa-my-status-title');
        const myStatusDesc = document.getElementById('wa-my-status-desc');
        const startBtn = document.getElementById('btn-start-my-wa');
        const logoutBtn = document.getElementById('btn-logout-my-wa');
        const myQrContainer = document.getElementById('wa-my-qr-container');

        if (myStatusTitle) myStatusTitle.innerText = 'الواتساب غير متصل';
        if (myStatusDesc) myStatusDesc.innerText = msgToDisplay;
        if (myQrContainer) myQrContainer.style.display = 'none';
        if (startBtn) {
          startBtn.style.display = 'inline-block';
          startBtn.innerText = 'إعادة الربط الآن';
        }
        if (logoutBtn) logoutBtn.style.display = 'none';
      }
    });

    waSocketContainer.on('jid_resolved', ({ oldJid, newJid }) => {
      console.log(`JID Resolution detected: ${oldJid} -> ${newJid}`);
      const bookings = window.state.bookings || [];
      const bookingToUpdate = bookings.find(b => b.waJid === oldJid);
      if (bookingToUpdate) {
        console.log(`Updating booking ${bookingToUpdate.id} JID due to resolution`);
        update(ref(db, `bookings/${bookingToUpdate.id}`), {
          waJid: newJid,
          phone: window.normalizePhone(newJid)
        }).catch(e => { });

        // If the user was viewing the old chat, switch them to the new one
        if (window._currentWaPhone === oldJid) {
          window._currentWaPhone = newJid;
          if (typeof window.openStaffChat === 'function') {
            window.openStaffChat(newJid);
          }
        }
      }
    });

    waSocketContainer.on('message', async (data) => {
      console.log('Real-time WA message received:', data);

      const normalizePhone = window.normalizePhone;
      const incomingPhoneStr = normalizePhone(data.from);
      const currentWaStr = normalizePhone(window._currentWaPhone);

      const modalEl = document.getElementById('details-modal');
      const isModalOpen = modalEl && !modalEl.classList.contains('hidden');

      // Visual feedback: animate connection dot on message
      const dot = document.getElementById('wa-connection-dot');
      if (dot) {
        dot.style.transform = 'scale(1.2)';
        setTimeout(() => dot.style.transform = 'scale(1)', 300);
      }

      const bookings = window.state.bookings || [];

      // SMART MATCHING: Try JID first, then normalized phone
      let bookingFound = bookings.find(b => b.waJid === data.from);

      if (!bookingFound) {
        // Try matching by normalized phone number
        bookingFound = bookings.find(b => {
          if (!b.phone) return false;
          const normalizedB = window.normalizePhone(b.phone);
          // If incoming is a number (starts with 966/967), match directly
          if (!incomingPhoneStr.includes("@") && normalizedB === incomingPhoneStr) return true;
          return false;
        });

        // If found via phone but no JID/LID yet, PIN IT!
        if (bookingFound && !bookingFound.waJid) {
          console.log(`Smart Pinning JID ${data.from} to booking ${bookingFound.id}`);
          update(ref(db, `bookings/${bookingFound.id}`), { waJid: data.from }).catch(e => { });
          bookingFound.waJid = data.from;
        }
      }

      // If still no booking found and it's an inbound message, CREATE LEAD
      if (false && !bookingFound && !data.isMe) {
        console.log('New customer detected via WhatsApp, creating lead...');
        try {
          const newBooking = {
            name: "عميل جديد (واتساب)",
            phone: incomingPhoneStr,
            waJid: data.from, // Store the JID immediately
            carRequested: "استفسار واتساب",
            status: "new",
            subStatus: "not_contacted",
            source: "whatsapp_inbound",
            assignedTo: data.userId || "",
            createdAt: new Date().toISOString(),
            notes: "تم استقبال رسالة من رقم جديد عبر الواتساب: " + data.body
          };
          const pushRef = await push(ref(db, "bookings"), newBooking);
          bookingFound = { ...newBooking, id: pushRef.key };
          window.showLuxuryToast('تم استقبال طلب حجز جديد تلقائياً من عميل واتساب', 'success');
        } catch (err) {
          console.error('Failed to create automatic booking:', err);
        }
      }

      if (isModalOpen && currentWaStr && incomingPhoneStr === currentWaStr) {
        setTimeout(() => {
          window.fetchServerWAChat(window._currentWaPhone, data.userId);
        }, 500);
      } else {
        if (data.isMe) return;
        const isForMe = data.userId === (window.state.userProfile?.id);
        const isAdmin = window.state.userProfile?.role === 'admin' || window.state.userProfile?.role === 'supervisor';
        if ((isForMe || isAdmin) && bookingFound) {
          if (window.showWAPushNotification) window.showWAPushNotification(incomingPhoneStr, data.body, data.userId);
        }
      }
    });
  }
};

window.showWAPushNotification = async function (phone, body, assignedUserId) {
  if (window.playNotificationSound) window.playNotificationSound();
  let container = document.getElementById('wa-push-notifications-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'wa-push-notifications-container';
    container.style.cssText = 'position:fixed; bottom:30px; left:25px; z-index:999999; display:flex; flex-direction:column-reverse; gap:12px; width:340px; pointer-events:none;';
    document.body.appendChild(container);
  }

  const bookings = window.state.bookings || [];
  const booking = bookings.find(b => b.phone && window.normalizePhone(b.phone) === window.normalizePhone(phone));
  const senderName = booking && booking.name ? booking.name : phone;

  let displayBody = body || 'رسالة جديدة';
  if (displayBody.length > 70) displayBody = displayBody.substring(0, 70) + '...';

  const popup = document.createElement('div');
  popup.style.cssText = 'background:rgba(255,255,255,0.98); border-right:4px solid #00a884; border-radius:12px; padding:12px 15px; box-shadow:0 6px 20px rgba(0,0,0,0.15); pointer-events:auto; cursor:pointer; transform:translateX(-120%); transition:transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s, margin 0.3s; opacity:0; overflow:hidden; position:relative; direction:rtl;';

  popup.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:4px;">
           <div style="display:flex; align-items:center; gap:10px;">
               <div style="background:#d9fdd3; width:30px; height:30px; border-radius:50%; display:flex; justify-content:center; align-items:center;">
                   <i class="fab fa-whatsapp" style="color:#00a884; font-size:16px;"></i>
               </div>
               <strong style="color:#111b21; font-size:13.5px; margin:0; line-height:1.2;">${senderName}</strong>
           </div>
           <button class="fa-times-btn" style="background:none; border:none; color:#999; cursor:pointer; font-size:16px; padding:0; margin:0; line-height:1; transition:color 0.2s;"><i class="fas fa-times"></i></button>
        </div>
        <p style="margin:0; font-size:12.5px; color:#54656f; line-height:1.5; padding-right:40px;">${displayBody}</p>
    `;

  const closeBtn = popup.querySelector('.fa-times-btn');
  closeBtn.onmouseover = () => closeBtn.style.color = '#e02424';
  closeBtn.onmouseout = () => closeBtn.style.color = '#999';

  const pushToNotificationsList = async () => {
    try {
      await push(ref(db, "notifications"), {
        userId: assignedUserId || window.state.userProfile?.id || "admin",
        type: "wa_message",
        title: "رسالة واتساب من " + senderName,
        body: displayBody,
        phone: phone,
        read: false,
        createdAt: new Date().toISOString()
      });
    } catch (e) { console.warn("Could not save to notifications DB", e); }
  };

  let timeoutId = setTimeout(() => {
    closePopup();
    pushToNotificationsList();
  }, 10000);

  const closePopup = () => {
    popup.style.transform = 'translateX(-120%)';
    popup.style.opacity = '0';
    popup.style.marginTop = `-${popup.offsetHeight}px`; // animate slide up for items below
    setTimeout(() => { if (popup.parentNode) popup.parentNode.removeChild(popup); }, 400);
  };

  closeBtn.onclick = (e) => {
    e.stopPropagation();
    clearTimeout(timeoutId);
    closePopup();
  };

  popup.onclick = () => {
    clearTimeout(timeoutId);
    closePopup();
    if (booking) {
      window.viewBookingDetails(booking.id);
      // Optionally shift to Whatsapp tab if not already there inside the details modal
      setTimeout(() => {
        const waTab = document.getElementById('details-modal').querySelector('.dash-tab.admin-only');
        if (waTab) waTab.click();
      }, 100);
    } else {
      window.showLuxuryToast('الرسالة من رقم غير مسجل في أي طلب مفتوح', 'info');
    }
  };

  // Insert at beginning creates bottom-up stack due to column-reverse
  container.insertBefore(popup, container.firstChild);

  requestAnimationFrame(() => {
    popup.style.transform = 'translateX(0)';
    popup.style.opacity = '1';
  });
};

window.startCurrentWASession = function () {
  if (!window.state.user) return;

  const emitStart = () => {
    waSocketContainer.emit('start_session', { userId: window.state.user.uid });
    const statusTitle = document.getElementById('wa-my-status-title');
    const statusDesc = document.getElementById('wa-my-status-desc');
    if (statusTitle) statusTitle.innerText = 'جاري الاتصال...';
    if (statusDesc) statusDesc.innerText = 'يتم الآن التواصل مع خادم الواتساب لتوليد رمز الاستجابة السريعة...';
  };

  if (waSocketContainer) {
    if (waSocketContainer.connected) {
      emitStart();
    } else {
      waSocketContainer.once('connect', emitStart);
      waSocketContainer.connect();
    }
  } else {
    window.initWhatsAppServer();
  }
};

window.logoutCurrentWASession = function () {
  if (!window.state.user) return;
  if (confirm('هل أنت متأكد من تسجيل الخروج من واتساب؟ لن تتمكن من المراسلة من هنا.')) {
    if (waSocketContainer) waSocketContainer.emit('logout_session', { userId: window.state.user.uid });
  }
};

window._waMediaCache = window._waMediaCache || {};

window.fetchServerWAChat = async function (phone, staffId) {
  if (!phone) return;
  const chatBox = document.getElementById('wa-server-chat-box');
  if (!chatBox) return;

  // Determine which staff member's session to use
  let userIdToUse = window.state.userProfile?.id;

  if (window.state.userProfile?.role === 'admin' || window.state.userProfile?.role === 'supervisor') {
    if (staffId) {
      userIdToUse = staffId;
    } else {
      // If no staffId passed, try to find the assignedTo from the current booking in state
      const bookings = window.state.bookings || [];
      const b = bookings.find(x => x.phone && window.normalizePhone(x.phone) === window.normalizePhone(phone));
      if (b && b.assignedTo) {
        userIdToUse = b.assignedTo;
      } else {
        // Showing info message instead of loading spinner if no assignment
        chatBox.innerHTML = `
                <div style="text-align:center; margin-top:auto; margin-bottom:auto;">
                    <div style="background:rgba(255,255,255,0.95); display:inline-block; padding:20px; border-radius:15px; font-size:13px; color:#555; box-shadow:0 10px 30px rgba(0,0,0,0.1); max-width:85%;">
                        <i class="fas fa-user-slash" style="color:#00a884; font-size:32px; margin-bottom:15px; display:block;"></i>
                        هذا الحجز غير مسند لموظف.<br>
                        سجل المحادثات متاح فقط للحجوزات المسندة.
                    </div>
                </div>`;
        return;
      }
    }
  }

  window._currentWaPhone = phone;

  // Only show loading if empty to prevent blink on new messages
  if (!chatBox.hasChildNodes() || chatBox.innerHTML.includes('fa-circle-notch') || chatBox.innerHTML.includes('fa-comment-dots')) {
    chatBox.innerHTML = '<div style="text-align:center; margin-top:auto; margin-bottom:auto;"><i class="fas fa-circle-notch fa-spin" style="font-size: 30px; color: #00a884; margin-bottom: 12px;"></i><br><div style="background: rgba(255,255,255,0.9); display: inline-block; padding: 8px 16px; border-radius: 12px; font-size: 12px; color: #555; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">جاري مزامنة الرسائل...</div></div>';
  }

  try {
    const activeUrl = window._waServerActiveUrl || CURRENT_MASTER_URL;
    const response = await fetch(`${activeUrl}/api/chat/${userIdToUse}/${phone}`);
    if (response.ok) {
      const data = await response.json();
      if (data.messages && data.messages.length > 0) {
        // Determine if user was at bottom before re-render
        const isAtBottom = chatBox.scrollHeight - chatBox.scrollTop - chatBox.clientHeight < 50;

        chatBox.innerHTML = '';

        const securityMsg = document.createElement('div');
        securityMsg.style.cssText = "text-align:center; margin:10px 0 15px;";
        securityMsg.innerHTML = '<span style="background:#fefed7; color:#54656f; font-size:11px; padding:6px 12px; border-radius:8px; box-shadow:0 1px 1px rgba(0,0,0,0.05); display:inline-block;"><i class="fas fa-lock" style="margin-left:4px; font-size:10px;"></i> الرسائل محمية ومسجلة عبر الخادم الداخلي</span>';
        chatBox.appendChild(securityMsg);

        data.messages.forEach(m => {
          const ts = Number(m.timestamp);
          const timeStr = ts ? new Date(ts > 10000000000 ? ts : ts * 1000).toLocaleTimeString('ar-SA', { hour: 'numeric', minute: '2-digit', hour12: true }) : '';
          let safeBody = (m.body || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
          safeBody = safeBody.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="color:#027eb5; text-decoration:underline;">$1</a>');

          const div = document.createElement('div');
          div.style.padding = '6px 8px 8px 10px';
          div.style.maxWidth = '75%';
          div.style.fontSize = '14.5px';
          div.style.marginBottom = '4px';
          div.style.position = 'relative';
          div.style.boxShadow = '0 1px 1.5px rgba(11,20,26,0.1)';
          div.style.whiteSpace = 'pre-wrap';
          div.style.lineHeight = '1.4';
          div.style.wordBreak = 'break-word';
          div.style.overflowWrap = 'anywhere';

          if (m.isMe) {
            div.style.alignSelf = 'flex-end';
            div.style.background = '#d9fdd3';
            div.style.color = '#111b21';
            div.style.borderRadius = '12px 0 12px 12px';
          } else {
            div.style.alignSelf = 'flex-start';
            div.style.background = '#ffffff';
            div.style.color = '#111b21';
            div.style.borderRadius = '0 12px 12px 12px';
          }

          let content = `<div>${safeBody}</div>`;
          if (m.media) {
            // Apply cached media if available
            if (window._waMediaCache[m.id]) {
              m.media.data = window._waMediaCache[m.id];
            }
            if (m.media.data === null) {
              const btnId = `btn-dl-${m.id}`;
              const contId = `cont-dl-${m.id}`;
              let mediaTypeName = "مرفق";
              if (m.media.mimetype.startsWith('image/')) mediaTypeName = "صورة";
              else if (m.media.mimetype.startsWith('video/')) mediaTypeName = "فيديو";
              else if (m.media.mimetype.startsWith('audio/') || m.type === 'ptt') mediaTypeName = "مقطع صوتي";

              content = `<div id="${contId}" style="margin-bottom:8px; display:flex; align-items:center; gap:10px; background:rgba(0,0,0,0.05); padding:10px; border-radius:8px;">
                                <i class="fas fa-file-download" style="font-size:24px; color:#54656f;"></i>
                                <div style="flex:1;">
                                    <strong style="display:block; font-size:13px;">${mediaTypeName} سابق</strong>
                                    <span style="font-size:11px; opacity:0.7;">${m.media.filename || 'اضغط للتحميل من السيرفر'}</span>
                                </div>
                                <button id="${btnId}" class="btn-premium btn-sm" onclick="window.downloadWAMedia('${userIdToUse}', '${phone}', '${m.id}', '${contId}', '${m.media.mimetype}', '${m.type}')" style="padding:4px 10px; min-width:40px;"><i class="fas fa-download"></i></button>
                            </div>` + (safeBody ? `<div>${safeBody}</div>` : '');
            } else {
              if (m.media.mimetype.startsWith('image/')) {
                content = `<div style="margin:-4px -6px 4px -8px; background:rgba(0,0,0,0.02); border-radius:10px 10px 0 0; overflow:hidden; text-align:center;"><img src="data:${m.media.mimetype};base64,${m.media.data}" style="max-width:100%; max-height:220px; border-radius:8px; display:inline-block; cursor:pointer; object-fit:cover;" onclick="window.viewFullImage(this.src)"></div>` + (safeBody ? `<div>${safeBody}</div>` : '');
              } else if (m.media.mimetype.startsWith('audio/') || m.type === 'ptt') {
                content = `<div style="display:flex; align-items:center; gap:10px;"><div style="background:#00a884; width:40px; height:40px; border-radius:50%; display:flex; justify-content:center; align-items:center; flex-shrink:0;"><i class="fas fa-play" style="color:white; margin-right:-2px; font-size:14px;"></i></div> <audio controls style="max-width:200px; height:35px;"><source src="data:${m.media.mimetype};base64,${m.media.data}" type="${m.media.mimetype}"></audio></div>` + (safeBody ? `<div style="margin-top:5px;">${safeBody}</div>` : '');
              } else if (m.media.mimetype.startsWith('video/')) {
                content = `<video controls style="max-width:100%; border-radius:8px; margin-bottom:5px;"><source src="data:${m.media.mimetype};base64,${m.media.data}" type="${m.media.mimetype}"></video>` + (safeBody ? `<div>${safeBody}</div>` : '');
              } else {
                content = `<div style="background:rgba(0,0,0,0.05); padding:10px; border-radius:8px; display:flex; align-items:center; gap:10px; margin-bottom:5px;"><i class="fas fa-file-alt" style="font-size:24px; color:#54656f;"></i> <div><strong style="display:block; font-size:13px;">ملف ${m.media.filename || 'مرفق'}</strong><span style="font-size:11px; opacity:0.7;">تنزيل للعرض</span></div></div>` + (safeBody ? `<div>${safeBody}</div>` : '');
              }
            }
          }

          let ticks = '';
          if (m.isMe) {
            let ack = m.ack !== undefined ? m.ack : (m.status === 'read' ? 3 : m.status === 'delivered' ? 2 : m.status === 'sent' ? 1 : undefined);
            if (ack === 1 || ack === 0) {
              ticks = `<i class="fas fa-check" style="font-size:12px; margin-right:4px; color:#c7c7c7;"></i>`; // صح واحد (تم الارسال)
            } else if (ack === 2) {
              ticks = `<i class="fas fa-check-double" style="font-size:12px; margin-right:4px; color:#c7c7c7;"></i>`; // صحين رماديين (تم الاستلام)
            } else if (ack >= 3) {
              ticks = `<i class="fas fa-check-double" style="font-size:12px; margin-right:4px; color:#53bdeb;"></i>`; // صحين زرقاء (تم المشاهدة)
            } else {
              ticks = `<i class="fas fa-check" style="font-size:12px; margin-right:4px; color:#c7c7c7;"></i>`; // الافتراضي صح رمادي واحد بدلاً من أزرق
            }
          }

          div.innerHTML = `${content} <div style="display:flex; justify-content:flex-end; align-items:center; margin-top:2px; float:left; margin-left:-5px; padding-left:10px; padding-top:2px;">
                      <span style="font-size:11px; color:#667781;">${timeStr}</span>
                      ${ticks}
                    </div><div style="clear:both;"></div>`;

          chatBox.appendChild(div);
        });

        // Only scroll down smoothly if user was already at the bottom to avoid annoyance
        if (isAtBottom || chatBox.innerHTML.includes('fa-lock')) {
          setTimeout(() => {
            chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: 'smooth' });
          }, 100);
        }

      } else {
        chatBox.innerHTML = '<div style="text-align:center; margin-top:auto; margin-bottom:auto;"><div style="background:rgba(255,255,255,0.95); display:inline-block; padding:15px 30px; border-radius:15px; font-size:13px; color:#555; box-shadow:0 3px 10px rgba(0,0,0,0.08);"><i class="fas fa-comment-dots" style="color:#00a884; font-size:24px; margin-bottom:10px; display:block;"></i>لا توجد رسائل سابقة مع هذا الرقم.<br>يمكنك بدء دردشة جديدة الآن.</div></div>';
      }
    } else {
      chatBox.innerHTML = `
                <div style="text-align:center; margin-top:auto; margin-bottom:auto;">
                    <div style="background:rgba(255,255,255,0.95); display:inline-block; padding:25px; border-radius:15px; font-size:14px; color:#555; box-shadow:0 3px 10px rgba(0,0,0,0.08);">
                        <i class="fab fa-whatsapp" style="font-size:50px; margin-bottom:15px; color:#8696a0;"></i>
                        <p style="margin-bottom:15px;">خادم واتساب غير متصل لهذا الموظف</p>
                        <button class="btn-premium btn-sm" onclick="window.closeModal('details-modal'); window.switchLuxuryTab('whatsapp-mgmt')">اذهب لإعدادات الواتساب</button>
                    </div>
                </div>
            `;
    }
  } catch (err) {
    chatBox.innerHTML = `<div style="text-align:center; margin-top:auto; margin-bottom:auto;"><div style="background:rgba(255,255,255,0.95); display:inline-block; padding:15px 25px; border-radius:15px; font-size:13px; color:#e02424; box-shadow:0 3px 10px rgba(0,0,0,0.08);"><i class="fas fa-exclamation-triangle" style="font-size:24px; margin-bottom:10px; display:block;"></i>فشل الاتصال بالخادم. يرجى التأكد من تشغيل السيرفر.</div></div>`;
  }
};

let mediaRecorder;
let audioChunks = [];

window.startWARecording = async function () {
  window._waRecordingIntent = true;
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    if (!window._waRecordingIntent) {
      // User released the button before microphone permission resolved
      stream.getTracks().forEach(t => t.stop());
      return;
    }

    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];
    window._waRecordingStartTime = Date.now();

    mediaRecorder.ondataavailable = e => {
      if (e.data.size > 0) audioChunks.push(e.data);
    };

    mediaRecorder.start();
    const micBtn = document.getElementById('wa-mic-btn');
    if (micBtn) micBtn.style.color = 'red';
  } catch (err) {
    window.showLuxuryToast('لم يتم السماح باستخدام الميكروفون', 'error');
    window._waRecordingIntent = false;
  }
};

window.stopWARecording = function (phone, staffId) {
  if (!window._waRecordingIntent) return;
  window._waRecordingIntent = false;

  if (!mediaRecorder || mediaRecorder.state === 'inactive') return;

  mediaRecorder.onstop = async () => {
    const duration = Date.now() - (window._waRecordingStartTime || Date.now());

    if (duration < 500 || audioChunks.length === 0) {
      // Ignore recordings that are too short to prevent blank notes
      mediaRecorder.stream.getTracks().forEach(t => t.stop());
      const micBtn = document.getElementById('wa-mic-btn');
      if (micBtn) micBtn.style.color = '#54656f';
      return;
    }

    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    reader.onloadend = () => {
      const base64data = reader.result.split(',')[1];
      // Fix: Pass empty string for forcedMessage to prevent input lock override
      window.sendServerWAMessage(phone, staffId, { data: base64data, mimetype: 'audio/webm', filename: 'voice_note.webm', ptt: true }, '');
    };

    const micBtn = document.getElementById('wa-mic-btn');
    if (micBtn) micBtn.style.color = '#54656f';
    mediaRecorder.stream.getTracks().forEach(t => t.stop());
  };
  mediaRecorder.stop();
};

window.handleWAMediaSelect = function (phone, staffId) {
  const input = document.getElementById('wa-media-upload');
  const file = input.files && input.files[0];
  if (!file) return;

  if (file.size > 16 * 1024 * 1024) {
    window.showLuxuryToast('حجم الملف كبير جداً، أقصى حد يسمح به الواتساب هو 16 ميجابايت', 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const base64 = e.target.result.split(',')[1];
    const mimetype = file.type || 'application/octet-stream';
    const filename = file.name;

    let msg = prompt('هل تريد إرفاق رسالة نصية مع هذا الملف؟ (اختياري)', '');
    if (msg === null) {
      input.value = '';
      return; // user cancelled
    }

    window.sendServerWAMessage(phone, staffId, { data: base64, mimetype, filename }, msg);
  };
  reader.readAsDataURL(file);
};
window.sendServerWAMessage = async function (phone, staffId, mediaObj = null, forcedMessage = null) {
  const input = document.getElementById('wa-server-input');

  // Prevent double clicking only if disabled
  if (input && input.disabled) return;

  const message = forcedMessage !== null ? forcedMessage : (input ? input.value.trim() : '');

  if (!mediaObj && !message) return;

  let userIdToUse = window.state.userProfile.id;
  if (window.state.userProfile.role === 'admin' && staffId) userIdToUse = staffId;

  // Clear input immediately for better UX
  if (input && forcedMessage === null) {
    input.value = '';
    input.style.height = '42px';
    input.focus();
  }

  // Optimistic UI Append
  const chatBox = document.getElementById('wa-server-chat-box');
  if (chatBox) {
    if (chatBox.innerHTML.includes('fa-comment-dots') || chatBox.innerHTML.includes('fa-circle-notch') || !chatBox.hasChildNodes()) {
      chatBox.innerHTML = '<div style="text-align:center; margin:10px 0 15px;"><span style="background:#fefed7; color:#54656f; font-size:11px; padding:6px 12px; border-radius:8px; box-shadow:0 1px 1px rgba(0,0,0,0.05); display:inline-block;"><i class="fas fa-lock" style="margin-left:4px; font-size:10px;"></i> الرسائل محمية ومسجلة عبر الخادم الداخلي</span></div>';
    }

    const timeStr = new Date().toLocaleTimeString('ar-SA', { hour: 'numeric', minute: '2-digit', hour12: true });
    let safeBody = (message || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    safeBody = safeBody.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="color:#027eb5; text-decoration:underline;">$1</a>');

    const div = document.createElement('div');
    div.style.padding = '6px 8px 8px 10px';
    div.style.maxWidth = '75%';
    div.style.fontSize = '14.5px';
    div.style.marginBottom = '4px';
    div.style.position = 'relative';
    div.style.boxShadow = '0 1px 1.5px rgba(11,20,26,0.1)';
    div.style.whiteSpace = 'pre-wrap';
    div.style.lineHeight = '1.4';
    div.style.wordBreak = 'break-word';
    div.style.overflowWrap = 'anywhere';
    div.style.alignSelf = 'flex-end';
    div.style.background = '#d9fdd3';
    div.style.color = '#111b21';
    div.style.borderRadius = '12px 0 12px 12px';

    let content = `<div>${safeBody}</div>`;
    if (mediaObj) {
      content = `<div style="margin-bottom:5px; font-size:12px; color:#555;"><i class="fas fa-paperclip"></i> تم إرسال مرفق</div>` + content;
    }

    let ticks = `<i class="fas fa-clock" style="font-size:12px; margin-right:4px; color:#c7c7c7;"></i>`;
    div.innerHTML = `${content} <div style="display:flex; justify-content:flex-end; align-items:center; margin-top:2px; float:left; margin-left:-5px; padding-left:10px; padding-top:2px;"><span style="font-size:11px; color:#667781;">${timeStr}</span>${ticks}</div><div style="clear:both;"></div>`;

    chatBox.appendChild(div);
    setTimeout(() => {
      chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: 'smooth' });
    }, 50);
  }

  try {
    const activeUrl = window._waServerActiveUrl || CURRENT_MASTER_URL;
    const payload = { userId: userIdToUse, phone, message };
    if (mediaObj) payload.media = mediaObj;

    const response = await fetch(`${activeUrl}/api/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      // Real fetch to update states (e.g. ticks) slightly after
      setTimeout(() => window.fetchServerWAChat(phone, userIdToUse), 1500);
    } else {
      window.showLuxuryToast('الواتساب غير متصل في الإدارة، المرجو فحص الاتصال', 'error');
      if (input && forcedMessage === null && !mediaObj) input.value = message;
    }
  } catch (err) {
    window.showLuxuryToast('الخادم البرمجي مغلق أو متوقف', 'error');
    if (input && forcedMessage === null && !mediaObj) input.value = message;
  } finally {
    const fileInput = document.getElementById('wa-media-upload');
    if (fileInput) fileInput.value = '';
  }
};

window.openQuickReplyModal = function () {
  window.openCRUDModal('quickReplies');
};

window.editQuickReply = function (id) {
  window.openCRUDModal('quickReplies', id);
};

window.addQuickReply = async function (btnEvent) {
  // Legacy support if needed, but we prefer openQuickReplyModal now
  window.openQuickReplyModal();
};

window.deleteQuickReply = async function (id, btnElement) {
  if (confirm("هل أنت متأكد من الحذف؟")) {
    let originalText = "";
    if (btnElement) {
      originalText = btnElement.innerHTML;
      btnElement.disabled = true;
      btnElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    }
    try {
      await remove(ref(db, `quickReplies/${id}`));
      window.showLuxuryToast("تم الحذف بنجاح");
    } catch (err) {
      console.error("Error deleting quick reply:", err);
      window.showLuxuryToast("فُقدت الصلاحية أو حدث خطأ أثناء الحذف", "error");
      if (btnElement) {
        btnElement.disabled = false;
        btnElement.innerHTML = originalText;
      }
    }
  }
};

window.renderQuickRepliesAdmin = function () {
  const list = document.getElementById("quick-replies-list");
  if (!list) return;

  const searchQuery = (document.getElementById("qr-search")?.value || "").toLowerCase();
  let qr = window.state.quickReplies || [];

  if (searchQuery) {
    qr = qr.filter(q =>
      (q.title || "").toLowerCase().includes(searchQuery) ||
      (q.content || "").toLowerCase().includes(searchQuery)
    );
  }

  if (qr.length === 0) {
    list.innerHTML = `
            <div class="no-results-v2 full-width">
                <i class="fas fa-search"></i>
                <p>${searchQuery ? 'لا توجد نتائج تطابق بحثك' : 'لا توجد نماذج ردود سريعة حالياً'}</p>
            </div>`;
    return;
  }

  list.innerHTML = qr.map(q => `
        <div class="admin-item-card-v2" data-aos="fade-up">
            <div class="item-card-content" style="flex:1;">
                <div class="item-card-header" style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                    <div class="item-icon-circle" style="background:var(--p-copper); color:white; width:35px; height:35px; border-radius:50%; display:flex; align-items:center; justify-content:center;">
                        <i class="fas fa-bolt"></i>
                    </div>
                    <strong style="color:var(--text-bright); font-size:16px;">${q.title}</strong>
                </div>
                <div class="item-card-body">
                    <p class="qr-content-preview" style="white-space: pre-wrap; margin:0; color:var(--text-dim); font-size:14px; background:rgba(0,0,0,0.2); padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.05);">${q.content}</p>
                </div>
            </div>
            <div class="item-card-actions" style="display:flex; gap:10px;">
                <button class="icon-btn-lite" onclick="window.editQuickReply('${q.id}')" title="تعديل">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="icon-btn-lite danger" onclick="window.deleteQuickReply('${q.id}', this)" title="حذف">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join("");
};

window._qrExpanded = false;
window.renderQuickRepliesBar = function () {
  const bar = document.getElementById("wa-quick-replies-bar");
  if (!bar) return;
  const qr = window.state.quickReplies || [];
  if (qr.length === 0) {
    bar.style.display = "none";
    return;
  }
  bar.style.display = "flex";

  const isExpanded = window._qrExpanded;
  let visible = qr;
  let hasMore = false;

  if (!isExpanded && qr.length > 4) {
    visible = qr.slice(0, 4);
    hasMore = true;
  }

  let html = visible.map(q => `
        <button onclick="window.applyQuickReplyById('${q.id}')" style="background:white; border:1px solid var(--glass-border); padding:6px 12px; border-radius:16px; font-size:12px; color:#54656f; cursor:pointer; flex-shrink:0; white-space:nowrap; transition:all 0.2s; box-shadow:0 1px 2px rgba(0,0,0,0.05);" onmouseover="this.style.background='#f0f2f5'" onmouseout="this.style.background='white'">
            ${q.title}
        </button>
    `).join("");

  if (hasMore) {
    html += `<button onclick="window._qrExpanded=true; window.renderQuickRepliesBar();" style="background:#00a884; color:white; border:none; padding:6px 12px; border-radius:16px; font-size:12px; cursor:pointer; flex-shrink:0;">عرض الكل <i class="fas fa-chevron-left" style="margin-right:4px;"></i></button>`;
  } else if (isExpanded && qr.length > 4) {
    html += `<button onclick="window._qrExpanded=false; window.renderQuickRepliesBar();" style="background:#e02424; color:white; border:none; padding:6px 12px; border-radius:16px; font-size:12px; cursor:pointer; flex-shrink:0;">إخفاء <i class="fas fa-chevron-right" style="margin-right:4px;"></i></button>`;
  }

  bar.innerHTML = html;
};

window.applyQuickReplyById = function (id) {
  const qr = (window.state.quickReplies || []).find(q => q.id === id);
  if (qr && qr.content) {
    window.applyQuickReply(qr.content);
  }
};

window.applyQuickReply = function (content) {
  const input = document.getElementById("wa-server-input");
  if (input) {
    let finalContent = content;

    const empName = window.state.userProfile?.name || "الموظف";
    finalContent = finalContent.replace(/\(اسم الموظف\)/g, empName);

    let custName = "العميل";
    let carDetails = "السيارة";
    let carMake = "غير محدد";
    let carModel = "غير محدد";
    let carYear = "غير محدد";
    let carPrice = "غير محدد";
    let carEngine = "غير محدد";
    let carMileage = "غير محدد";
    let carFuel = "غير محدد";
    let carBody = "غير محدد";
    let carColorExt = "غير محدد";
    let carColorInt = "غير محدد";

    let paymentMethod = "";
    let bankName = "غير محدد";
    let installmentPeriod = "غير محدد";
    let salary = "غير محدد";
    let commitments = "غير محدد";
    let workEntity = "غير محدد";
    let workStatus = "غير محدد";
    let orderId = "---";

    if (window._currentWaPhone) {
      const current = window._currentWaPhone.toString();
      const matches = (window.state.bookings || []).filter(b => {
        return (b.phone && b.phone.toString() === current) ||
          (b.waJid && b.waJid.toString() === current) ||
          (b.phone && current.includes(b.phone.toString()));
      });
      if (matches && matches.length > 0) {
        matches.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        const latestBooking = matches[0];
        if (latestBooking.name) custName = latestBooking.name;

        // Fetch full car details if linked
        let carObj = null;
        if (latestBooking.carId) {
          carObj = (window.state.cars || []).find(c => c.id === latestBooking.carId);
        } else if (latestBooking.carRequested) {
          // Try matching by name/text
          carObj = (window.state.cars || []).find(c => {
            const fullName = `${c.make} ${c.model} ${c.year}`.toLowerCase();
            return fullName.includes(latestBooking.carRequested.toLowerCase()) ||
              latestBooking.carRequested.toLowerCase().includes(fullName);
          });
        }

        if (carObj) {
          carMake = carObj.make || carMake;
          carModel = carObj.model || carModel;
          carYear = carObj.year || carYear;
          carPrice = carObj.price ? Number(carObj.price).toLocaleString('ar-SA') : carPrice;
          carEngine = carObj.engine || carEngine;
          carMileage = carObj.mileage || carMileage;
          carFuel = carObj.fuelType || carFuel;
          carColorExt = carObj.color || carColorExt;
          carColorInt = carObj.interiorColor || carColorInt;

          const bodyMap = { sedan: 'سيدان', suv: 'SUV', coupe: 'كوبيه', luxury: 'فاخرة', pickup: 'بيك آب' };
          carBody = bodyMap[carObj.bodyType] || carObj.bodyType || carBody;

          carDetails = `${carMake} ${carModel} ${carYear}`.trim();
        } else if (latestBooking.brand || latestBooking.model) {
          carDetails = `${latestBooking.brand || ''} ${latestBooking.model || ''} ${latestBooking.year || ''}`.trim();
          carMake = latestBooking.brand || carMake;
          carModel = latestBooking.model || carModel;
          carYear = latestBooking.year || carYear;
        } else if (latestBooking.carName || latestBooking.carRequested) {
          carDetails = latestBooking.carName || latestBooking.carRequested;
        }

        if (latestBooking.paymentMethod) {
          paymentMethod = latestBooking.paymentMethod === 'cash' ? 'كاش' : 'تمويل';
        }
        if (latestBooking.bankName) bankName = latestBooking.bankName;
        if (latestBooking.installmentPeriod) installmentPeriod = latestBooking.installmentPeriod;
        if (latestBooking.salary) salary = latestBooking.salary;
        if (latestBooking.commitments) commitments = latestBooking.commitments;
        if (latestBooking.workEntity) workEntity = latestBooking.workEntity;
        if (latestBooking.workStatus) workStatus = latestBooking.workStatus;
        if (latestBooking.id) orderId = latestBooking.id.toString().slice(-6).toUpperCase();
      }
    }

    finalContent = finalContent.replace(/\(رقم الطلب\)/g, orderId);
    finalContent = finalContent.replace(/\(اسم العميل\)/g, custName);
    finalContent = finalContent.replace(/\(اسم السيارة\)/g, carDetails);
    finalContent = finalContent.replace(/\(الماركة\)/g, carMake);
    finalContent = finalContent.replace(/\(الموديل\)/g, carModel);
    finalContent = finalContent.replace(/\(سنة الصنع\)/g, carYear);
    finalContent = finalContent.replace(/\(السعر\)/g, carPrice);
    finalContent = finalContent.replace(/\(المحرك\)/g, carEngine);
    finalContent = finalContent.replace(/\(الممشى\)/g, carMileage);
    finalContent = finalContent.replace(/\(نوع الوقود\)/g, carFuel);
    finalContent = finalContent.replace(/\(فئة السيارة\)/g, carBody);
    finalContent = finalContent.replace(/\(اللون الخارجي\)/g, carColorExt);
    finalContent = finalContent.replace(/\(اللون الداخلي\)/g, carColorInt);

    finalContent = finalContent.replace(/\(طريقة الشراء\)/g, paymentMethod);
    finalContent = finalContent.replace(/\(اسم السيارة وتفاصيلها وطريقة الشراء وتفاصيله كاملة\)/g, `${carDetails} - الدفع: ${paymentMethod}`);

    finalContent = finalContent.replace(/\(اسم البنك الراتب عليه أو المفضل\)/g, bankName);
    finalContent = finalContent.replace(/\(اسم البنك\)/g, bankName);
    finalContent = finalContent.replace(/\(مدة الأقساط المفضل\)/g, installmentPeriod);
    finalContent = finalContent.replace(/\(مدة الأقساط\)/g, installmentPeriod);
    finalContent = finalContent.replace(/\(الراتب الشهري \(صافي\)\)/g, salary);
    finalContent = finalContent.replace(/\(الراتب الشهري\)/g, salary);
    finalContent = finalContent.replace(/\(الراتب\)/g, salary);
    finalContent = finalContent.replace(/\(الإلتزامات الشهرية\)/g, commitments);
    finalContent = finalContent.replace(/\(الإلتزامات\)/g, commitments);
    finalContent = finalContent.replace(/\(جهة العمل\)/g, workEntity);
    finalContent = finalContent.replace(/\(حالة الجهة\)/g, workStatus);

    input.value = finalContent;
    // Trigger auto-resize
    input.style.height = '42px';
    input.style.height = Math.min(input.scrollHeight, 150) + 'px';
    input.focus();
  }
};

window.downloadWAMedia = async function (userId, phone, messageId, containerId, mimetype, msgType) {
  const btn = document.getElementById(containerId.replace('cont-dl-', 'btn-dl-'));
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  }

  try {
    const activeUrl = window._waServerActiveUrl || CURRENT_MASTER_URL;
    const res = await fetch(`${activeUrl}/api/media/${userId}/${phone}/${messageId}`);
    if (!res.ok) throw new Error("Failed");

    const data = await res.json();
    if (!data.data) throw new Error("No data");

    window._waMediaCache[messageId] = data.data; // Cache it so it survives UI redraws

    const cont = document.getElementById(containerId);
    if (!cont) return;

    let newHtml = '';
    if (mimetype.startsWith('image/')) {
      newHtml = `<div style="margin:-4px -6px 4px -8px; background:rgba(0,0,0,0.02); border-radius:10px 10px 0 0; overflow:hidden; text-align:center;"><img src="data:${mimetype};base64,${data.data}" style="max-width:100%; max-height:220px; border-radius:8px; display:inline-block; cursor:pointer; object-fit:cover;" onclick="window.viewFullImage(this.src)"></div>`;
    } else if (mimetype.startsWith('audio/') || msgType === 'ptt') {
      newHtml = `<div style="display:flex; align-items:center; gap:10px;"><div style="background:#00a884; width:40px; height:40px; border-radius:50%; display:flex; justify-content:center; align-items:center; flex-shrink:0;"><i class="fas fa-play" style="color:white; margin-right:-2px; font-size:14px;"></i></div> <audio controls style="max-width:200px; height:35px;"><source src="data:${mimetype};base64,${data.data}" type="${mimetype}"></audio></div>`;
    } else if (mimetype.startsWith('video/')) {
      newHtml = `<video controls style="max-width:100%; border-radius:8px; margin-bottom:5px;"><source src="data:${mimetype};base64,${data.data}" type="${mimetype}"></video>`;
    } else {
      newHtml = `<div style="background:rgba(0,0,0,0.05); padding:10px; border-radius:8px; display:flex; align-items:center; gap:10px; margin-bottom:5px;"><i class="fas fa-check-circle" style="font-size:24px; color:#00a884;"></i> <div><strong style="display:block; font-size:13px;">تم التحميل بنجاح</strong></div></div>`;
    }

    cont.outerHTML = newHtml;
  } catch (err) {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-redo"></i>';
    }
    window.showLuxuryToast('فشل تحميل الوسائط', 'error');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Tab switching event listener
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.dash-tab');
    if (btn && btn.dataset.tab) {
      window.switchLuxuryTab(btn.dataset.tab);
    }
  });

  setTimeout(() => {
    window.initWhatsAppServer();
  }, 3000);
});

// Fullscreen Image Lightbox
window.viewFullImage = function (src) {
  let overlay = document.getElementById('wa-full-image-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'wa-full-image-overlay';
    overlay.style.cssText = 'position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.9); z-index:999999; display:flex; justify-content:center; align-items:center; opacity:0; transition:opacity 0.25s ease-in-out; backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px);';

    const closeBtn = document.createElement('div');
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.style.cssText = 'position:absolute; top:25px; right:30px; font-size:24px; color:white; cursor:pointer; padding:10px; z-index:1000000; background:rgba(255,255,255,0.1); border-radius:50%; width:45px; height:45px; display:flex; justify-content:center; align-items:center; border: 1px solid rgba(255,255,255,0.2); transition: background 0.2s;';
    closeBtn.onmouseover = () => closeBtn.style.background = 'rgba(255,255,255,0.2)';
    closeBtn.onmouseout = () => closeBtn.style.background = 'rgba(255,255,255,0.1)';

    const img = document.createElement('img');
    img.id = 'wa-full-image-element';
    img.style.cssText = 'max-width:90%; max-height:90%; border-radius:12px; box-shadow:0 15px 40px rgba(0,0,0,0.5); object-fit:contain; transform:scale(0.85); transition:transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);';

    overlay.appendChild(closeBtn);
    overlay.appendChild(img);
    document.body.appendChild(overlay);

    const closeOverlay = () => {
      overlay.style.opacity = '0';
      img.style.transform = 'scale(0.85)';
      setTimeout(() => { overlay.style.display = 'none'; }, 250);
    };

    closeBtn.onclick = closeOverlay;
    overlay.onclick = (e) => {
      if (e.target === overlay) closeOverlay();
    };
  }

  const imgEl = document.getElementById('wa-full-image-element');
  imgEl.src = src;
  overlay.style.display = 'flex';
  // Trigger reflow for animation
  void overlay.offsetWidth;
  overlay.style.opacity = '1';
  imgEl.style.transform = 'scale(1)';
};



// Safety patch to prevent loading hang
setTimeout(() => {
  const splash = document.getElementById("luxury-splash");
  if (splash && !splash.classList.contains("hidden")) {
    console.warn("Safety timeout: removing loader");
    splash.style.opacity = "0";
    setTimeout(() => {
      splash.classList.add("hidden");
      try { splash.remove(); } catch (e) { }
    }, 800);
    if (window.state) window.state.firstLoadDone = true;
  }
}, 7000);


// UI enhancement for roles
const originalUpdateAppUI = window.updateAppUI;
window.updateAppUI = function () {
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
window.promoteToAdmin = async function (uid) {
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
// =========================================================================================
// NOTIFICATION MANAGEMENT
// =========================================================================================

window.markNotificationRead = async function (id) {
  try {
    await update(ref(db, 'notifications/' + id), { read: true });
    window.showLuxuryToast('تم تحديد الإشعار كمقروء');
    window.syncAdminTables('notifications');
  } catch (e) {
    console.error(e);
  }
};

window.markAllNotificationsRead = async function () {
  const unread = (window.state.notifications || []).filter(n => !n.read);
  if (unread.length === 0) return;

  try {
    const updates = {};
    unread.forEach(n => { updates['notifications/' + n.id + '/read'] = true; });
    await update(ref(db), updates);
    window.showLuxuryToast('تم تحديد كافة الإشعارات كمقروءة');
    window.syncAdminTables('notifications');
  } catch (e) {
    console.error(e);
  }
};

window.clearAllNotifications = async function () {
  if (!confirm('هل أنت متأكد من مسح كافة الإشعارات؟')) return;
  try {
    await remove(ref(db, 'notifications'));
    window.showLuxuryToast('تم مسح كافة الإشعارات');
    window.syncAdminTables('notifications');
  } catch (e) {
    console.error(e);
  }
};

window.handleNotificationClick = function (id, link) {
  window.markNotificationRead(id);
  if (link) {
    if (link.startsWith('#')) {
      const parts = link.substring(1).split('/');
      if (parts[0] === 'booking' && parts[1]) {
        window.viewBookingDetails(parts[1]);
      }
    } else {
      window.open(link, '_blank');
    }
  }
};

window.formatDateRelative = function (ts) {
  if (!ts) return '-';
  const date = new Date(ts);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return 'الآن';
  if (diff < 3600) return 'منذ ' + Math.floor(diff / 60) + ' دقيقة';
  if (diff < 86400) return 'منذ ' + Math.floor(diff / 3600) + ' ساعة';
  return date.toLocaleDateString('ar-SA');
};


window.playNotificationSound = function () {
  if (window.state && window.state.soundEnabled === false) return;
  try {
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2861/2861-preview.mp3");
    audio.volume = 0.5;
    audio.play().catch(e => console.warn("Audio play failed:", e));
  } catch (e) {
    console.warn("Audio error:", e);
  }
};
