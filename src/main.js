import { db, auth, storage, analytics } from "./firebase-config.js";
import {
  ref, onValue, set, push, update, remove, get, increment, runTransaction
} from "firebase/database";
import {
  signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail, setPersistence, browserLocalPersistence
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
  user: null,
  userProfile: null,
  settings: {},
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

  allTabs.forEach(t => t.classList.add("hidden"));
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
  let clean = phone.toString().replace(/\D/g, "");
  if (clean.startsWith("00")) clean = clean.substring(2);
  if (clean.startsWith("0")) clean = clean.substring(1);

  // Saudi Logic
  if (clean.length === 9 && clean.startsWith("5")) return "966" + clean;
  if (clean.startsWith("966") && clean.length > 10) return clean;

  // Yemen Logic
  if (clean.length === 9 && clean.startsWith("7")) return "967" + clean;
  if (clean.startsWith("967") && clean.length > 10) return clean;

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
  const theme = localStorage.getItem("luxury_theme") || settings.defaultTheme || "dark";
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
  const publicPaths = ["users", "plates", "locations", "brands", "agents", "specs", "packages", "blogs", "reviews", "cars", "ads", "sales", "settings", "partners"];
  const privatePaths = ["bookings", "notifications", "logs", "quickReplies"];
  const listeners = {};

  function attachListener(p) {
    if (listeners[p]) return; // Avoid duplicate listeners
    listeners[p] = onValue(ref(db, p), (s) => {
      const data = s.val();
      if (p === "settings") {
        window.state.settings = data || {};
        window.applySettings(data);
      } else {
        window.state[p] = data ? Object.entries(data).map(([id, v]) => ({ ...v, id })) : [];
        if (p === "cars") window.applyInventoryFilters();
        if (p === "ads") window.renderAdsSlider();
        if (p === "sales") window.renderSalesVideos();
        if (p === "partners") window.renderPartners();
        if (p === "reviews") window.renderPublicReviews();

        // Refresh admin tables if in dashboard
        if (window.state.user) {
          window.syncAdminTables(p);
          window.updateStatistics();
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
  if (window.state.firstLoadDone) return;
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

  // Hide splash screen when settings are loaded, regardless of cars count
  if (s && Object.keys(s).length > 0) {
    setTimeout(() => {
      const splash = document.getElementById("luxury-splash");
      if (splash) {
        splash.style.opacity = "0";
        setTimeout(() => {
          splash.classList.add("hidden");
          splash.remove();
        }, 800);
      }
      window.state.firstLoadDone = true;
    }, 1200);
  }
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
  document.querySelectorAll(".staff-only").forEach(el => el.classList.toggle("hidden", isAdmin || isSupervisor));

  if (isLoggedIn) {
    window.syncAdminTables("all");
    window.updateStatistics();

    const nameLabel = document.getElementById("user-display-name");
    const roleLabel = document.getElementById("user-role-label");
    if (nameLabel) nameLabel.innerText = window.state.userProfile?.name || "المسؤول";
    if (roleLabel) {
      let roleText = "قسم المبيعات والمتابعة";
      if (isAdmin) roleText = "إدارة النظام";
      else if (isSupervisor) roleText = "مشرف النظام";
      roleLabel.innerText = roleText;
    }
  }
}

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
    const years = [...new Set(window.state.cars.map(c => c.year))].sort((a, b) => b - a);
    years.forEach(y => {
      const opt = document.createElement("option");
      opt.value = y; opt.textContent = y;
      yearFilter.appendChild(opt);
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
    const matchesType = filterType === "all" || car.status === filterType;
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
                    <span>${(Number(car.price) || 0).toLocaleString()}</span>
                    <small style="font-size: 14px; margin-right: 5px;">ريال</small>
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
        <div class="car-price-v3">${(Number(car.price) || 0).toLocaleString()} <small>ريال</small></div>
        <div class="car-badge-v3 ${car.status === "available" ? "available" : car.status === "reserved" ? "reserved" : "sold"}">${car.status === "available" ? "متاح" : car.status === "reserved" ? "محجوز" : "مباع"}</div>
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
  const waText = `السلام عليكم، أرغب بالاستفسار عن هذه السيارة:\n\n*السيارة:* ${car.make} ${car.model}\n*الموديل:* ${car.year}\n*السعر:* ${Number(car.price).toLocaleString()} ريال\n\nرابط السيارة:\n${window.location.origin}/#car-${car.id}`;
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
          <div class="p-header">السعر الكاش</div>
          <div class="p-main">
            <span class="p-amount">${(Number(car.price) || 0).toLocaleString()}</span>
            <span class="p-curr">ريال</span>
          </div>
          <div class="VAT-hint">السعر شامل ضريبة القيمة المضافة</div>
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
               <div class="s-info"><span>الجير</span><strong>${car.gearbox || "أوتوماتيك"}</strong></div>
            </div>
             <div class="spec-card-v5">
               <i class="fas fa-car-side"></i>
               <div class="s-info"><span>الفئة</span><strong>${car.bodyType || "فاخرة"}</strong></div>
            </div>
             <div class="spec-card-v5">
               <i class="fas fa-shield-alt"></i>
               <div class="s-info"><span>الحالة</span><strong>${car.status === "available" ? "متاح" : car.status === "sold" ? "مباع" : "محجوز"}</strong></div>
            </div>
          </div>

          <div class="desc-card-v5" id="luxury-car-desc-container">
            <h3><i class="fas fa-list-ul"></i> وصف ومميزات السيارة</h3>
            <div class="desc-text-v5 custom-scrollbar" id="luxury-desc-body">
              ${(car.desc || car.description || car.details || "سيارة بحالة الوكالة...").replace(/\n/g, '<br>')}
            </div>
          </div>

          <div class="details-footer-actions-v3">
             <button onclick="window.bookCar('${car.id}')" class="btn-luxury-v2 wa-btn" style="border:none; text-align:right;">
               <i class="fas fa-calendar-check"></i>
               <div class="btn-txt">
                 <strong>إحجز هذه السيارة الآن</strong>
                 <span>تعبئة طلب حجز الخدمة</span>
               </div>
             </button>
             <a href="tel:${window.state.settings.contactSales || ""}" class="btn-luxury-v2 call-btn">
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
  const car = window.state.cars.find(c => c.id === id);
  if (!car) return;

  const bCar = document.getElementById("b-car");
  if (bCar) {
    bCar.value = `${car.make} ${car.model} ${car.year}`;
    // Force trigger any listeners if needed, though most inputs will just work
  }

  window.closeModal("details-modal");

  const bookingSec = document.getElementById("booking");
  if (bookingSec) {
    bookingSec.scrollIntoView({ behavior: "smooth" });
    // Add a slight highlight effect to the input
    if (bCar) {
      bCar.focus();
      bCar.style.borderColor = "var(--p-copper)";
      setTimeout(() => bCar.style.borderColor = "", 2000);
    }
  }
};

window.viewBookingDetails = function (id) {
  const item = (window.state.bookings || []).find(i => i.id === id);
  if (!item) return;

  const staffName = window.state.users.find(u => u.id === item.assignedTo)?.name || "غير مسند";
  const statusLabel = item.status === "sold" ? "مكتمل" : item.status === "available" ? "متاح" : item.status === "rejected" ? "مرفوض" : item.status === "waiting" ? "بالانتظار" : "جديد";
  const stClass = item.status === "sold" ? "sold" : item.status === "new" ? "available" : "reserved";

  const detailsContent = `
    <div class="details-luxury-container booking-modal-layout animate-fade-in-v2" style="background: var(--bg-main); border-radius: 20px; overflow: hidden; outline: 1px solid rgba(255,255,255,0.05);">
      
      <!-- الجهة اليمنى: الهيدر + التفاصيل (قابلة للتمرير) -->
      <div class="booking-right-side custom-scrollbar" style="flex: 1; min-width: 350px; display: flex; flex-direction: column; overflow-y: auto; background: var(--bg-alt);">
        
        <div class="details-top-v4" style="flex-shrink: 0; padding: 30px; position: relative; border-bottom: 1px solid var(--glass-border); background: rgba(0,0,0,0.02);">
          <div style="position: absolute; top:0; right:0; width:150px; height:150px; background:radial-gradient(circle, var(--p-copper) 0%, transparent 70%); opacity:0.05; pointer-events:none;"></div>
          
          <div class="details-header-v3">
            <div class="d-badge-row" style="margin-bottom: 15px; gap:10px;">
              <span class="badge-v3 status ${stClass}" style="padding: 6px 18px; font-size: 13px; border-radius: 30px; font-weight: 800; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">${statusLabel}</span>
              <span class="badge-v3 year" style="padding: 6px 18px; font-size: 13px; border-radius: 30px; background: rgba(184, 134, 11, 0.1); color: var(--p-copper); border:1px solid rgba(184, 134, 11, 0.2);">${item.customerType === 'company' ? 'شركة' : 'فرد'}</span>
              <span class="badge-v3" style="padding: 6px 18px; font-size: 13px; border-radius: 30px; background: rgba(184, 134, 11, 0.1); color: var(--p-copper); border: 1px solid rgba(184, 134, 11, 0.3);">رقم الطلب: #${item.id.slice(-6).toUpperCase()}</span>
            </div>
            <h1 class="luxury-font" style="font-size: 28px; font-weight: 800; margin-bottom: 8px; color: var(--text-main); display:flex; align-items:center; gap:12px;"><i class="fas fa-user-circle" style="color:var(--p-copper); font-size:32px;"></i> ${item.name || "بدون اسم"}</h1>
            <p class="car-subtitle-v5" style="font-size: 16px; color: var(--text-dim); display:flex; align-items:center; gap:8px;"><i class="fas fa-phone-alt"></i> <a href="tel:${item.phone}" style="color: var(--text-main); text-decoration:none; font-weight:600; letter-spacing:1px; transition:0.3s;" onmouseover="this.style.color='var(--p-copper)'" onmouseout="this.style.color='var(--text-main)'">${item.phone}</a></p>
          </div>
        </div>

        <div class="details-info-v4" style="padding: 30px;">
          <div class="specs-grid-v4-compact" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px,1fr)); gap:15px;">
            <div class="spec-card-v5" style="background:var(--bg-card); padding:16px; border-radius:14px; border:1px solid var(--glass-border); transition:0.3s;">
               <i class="fas fa-car" style="color:var(--p-teal); font-size:20px; margin-bottom:10px; display:block;"></i>
               <div class="s-info"><span style="font-size:11px; opacity:0.6; display:block; margin-bottom:4px; color:var(--text-dim);">السيارة المطلوبة</span><strong style="font-size:14px; color:var(--text-main);">${item.carRequested || "غير محدد"}</strong></div>
            </div>
            <div class="spec-card-v5" style="background:var(--bg-card); padding:16px; border-radius:14px; border:1px solid var(--glass-border); transition:0.3s;">
               <i class="fas fa-globe" style="color:var(--p-teal); font-size:20px; margin-bottom:10px; display:block;"></i>
               <div class="s-info"><span style="font-size:11px; opacity:0.6; display:block; margin-bottom:4px; color:var(--text-dim);">الجنسية / المدينة</span><strong style="font-size:14px; color:var(--text-main);">${item.nationality || "-"} / ${item.city || "-"}</strong></div>
            </div>
            <div class="spec-card-v5" style="background:var(--bg-card); padding:16px; border-radius:14px; border:1px solid var(--glass-border); transition:0.3s;">
               <i class="fas fa-money-bill-wave" style="color:var(--p-copper); font-size:20px; margin-bottom:10px; display:block;"></i>
               <div class="s-info"><span style="font-size:11px; opacity:0.6; display:block; margin-bottom:4px; color:var(--text-dim);">طريقة الشراء</span><strong style="font-size:14px; color:var(--text-main);">${item.paymentMethod || "-"} <span style="opacity:0.7;font-size:12px;">${item.paymentMethod === 'بنك' ? `(${item.bankName || "-"})` : ""}</span></strong></div>
            </div>
            ${item.paymentMethod === 'بنك' ? `
            <div class="spec-card-v5" style="background:var(--bg-card); padding:16px; border-radius:14px; border:1px solid var(--glass-border); transition:0.3s;">
               <i class="fas fa-calendar-alt" style="color:var(--p-copper); font-size:20px; margin-bottom:10px; display:block;"></i>
               <div class="s-info"><span style="font-size:11px; opacity:0.6; display:block; margin-bottom:4px; color:var(--text-dim);">مدة الأقساط</span><strong style="font-size:14px; color:var(--text-main);">${item.installmentPeriod || "-"}</strong></div>
            </div>` : ""}
            <div class="spec-card-v5" style="background:var(--bg-card); padding:16px; border-radius:14px; border:1px solid var(--glass-border); transition:0.3s;">
               <i class="fas fa-wallet" style="color:var(--p-teal); font-size:20px; margin-bottom:10px; display:block;"></i>
               <div class="s-info"><span style="font-size:11px; opacity:0.6; display:block; margin-bottom:4px; color:var(--text-dim);">الراتب</span><strong style="font-size:14px; color:var(--text-main);">${item.salary || "-"} <small>ريال</small></strong></div>
            </div>
            <div class="spec-card-v5" style="background:var(--bg-card); padding:16px; border-radius:14px; border:1px solid var(--glass-border); transition:0.3s;">
               <i class="fas fa-file-invoice-dollar" style="color:var(--p-red); font-size:20px; margin-bottom:10px; display:block;"></i>
               <div class="s-info"><span style="font-size:11px; opacity:0.6; display:block; margin-bottom:4px; color:var(--text-dim);">الالتزامات</span><strong style="font-size:14px; color:var(--text-main);">${item.commitments || "-"} <small>ريال</small></strong></div>
            </div>
            <div class="spec-card-v5" style="background:var(--bg-card); padding:16px; border-radius:14px; border:1px solid var(--glass-border); transition:0.3s;">
               <i class="fas fa-building" style="color:var(--p-teal); font-size:20px; margin-bottom:10px; display:block;"></i>
               <div class="s-info"><span style="font-size:11px; opacity:0.6; display:block; margin-bottom:4px; color:var(--text-dim);">جهة العمل</span><strong style="font-size:14px; color:var(--text-main);">${item.workEntity || "-"} <span style="opacity:0.7;font-size:12px;">(${item.workStatus || "-"})</span></strong></div>
            </div>
            <div class="spec-card-v5" style="background:var(--bg-card); padding:16px; border-radius:14px; border:1px solid var(--glass-border); transition:0.3s;">
               <i class="fas fa-clock" style="color:var(--text-dim); font-size:20px; margin-bottom:10px; display:block;"></i>
               <div class="s-info"><span style="font-size:11px; opacity:0.6; display:block; margin-bottom:4px; color:var(--text-dim);">وقت التواصل</span><strong style="font-size:14px; color:var(--text-main);">${item.preferredTime || "-"}</strong></div>
            </div>
            <div class="spec-card-v5" style="background:var(--bg-card); padding:16px; border-radius:14px; border:1px solid var(--glass-border); transition:0.3s;">
               <i class="fas fa-user-tie" style="color:var(--p-copper); font-size:20px; margin-bottom:10px; display:block;"></i>
               <div class="s-info"><span style="font-size:11px; opacity:0.6; display:block; margin-bottom:4px; color:var(--text-dim);">الموظف</span><strong style="font-size:14px; color:var(--text-main);">${staffName}</strong></div>
            </div>
            <div class="spec-card-v5" style="background:var(--bg-card); padding:16px; border-radius:14px; border:1px solid var(--glass-border); transition:0.3s;">
               <i class="fas fa-user" style="color:var(--text-dim); font-size:20px; margin-bottom:10px; display:block;"></i>
               <div class="s-info"><span style="font-size:11px; opacity:0.6; display:block; margin-bottom:4px; color:var(--text-dim);">العمر</span><strong style="font-size:14px; color:var(--text-main);">${item.age || "-"} <small>سنة</small></strong></div>
            </div>
            ${item.email ? `
            <div class="spec-card-v5" style="background:var(--bg-card); padding:16px; border-radius:14px; border:1px solid var(--glass-border); transition:0.3s;">
               <i class="fas fa-envelope" style="color:var(--text-dim); font-size:20px; margin-bottom:10px; display:block;"></i>
               <div class="s-info"><span style="font-size:11px; opacity:0.6; display:block; margin-bottom:4px; color:var(--text-dim);">البريد</span><strong style="font-size:14px; color:var(--text-main);">${item.email}</strong></div>
            </div>` : ""}
          </div>
          
          <div class="desc-card-v5" style="margin-top: 25px; background:rgba(255,255,255,0.015); padding:20px; border-radius:16px; border:1px dashed var(--glass-border);">
            <h3 style="font-size:15px; color:var(--p-copper); margin-bottom:12px; display:flex; align-items:center; gap:8px;"><i class="fas fa-comment-dots"></i> ملاحظات العميل</h3>
            <div class="desc-text-v5" style="font-size:14px; line-height:1.8; color:var(--text-main);">
              ${(item.notes || "لا يوجد ملاحظات").replace(/\n/g, '<br>')}
            </div>
          </div>

          <div class="booking-action-card" style="margin-top:25px; padding:25px; background:var(--bg-card); border-radius:16px; border:1px solid var(--glass-border); box-shadow:0 10px 30px rgba(0,0,0,0.1);">
              <h3 style="margin-bottom:18px; color:var(--text-main); font-size:16px; display:flex; align-items:center; gap:10px;"><i class="fas fa-sliders-h" style="color:var(--p-copper);"></i> تحديث حالة الطلب</h3>
              <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:15px; margin-bottom:20px;">
                  <div class="f-group" style="margin:0;">
                      <label style="font-size:12px; color:var(--text-dim); margin-bottom:6px;">الحالة الرئيسية</label>
                      <select id="update-booking-status" class="filter-select" style="width:100%; border-radius:10px; padding:12px 14px; background:var(--bg-alt); color:var(--text-main); border: 1px solid var(--glass-border);" onchange="window.updateSubStatusOptions(this.value)">
                          <option value="new" ${item.status === 'new' ? 'selected' : ''}>جديد</option>
                          <option value="waiting" ${item.status === 'waiting' ? 'selected' : ''}>بالانتظار</option>
                          <option value="inquiry" ${item.status === 'inquiry' ? 'selected' : ''}>استفسار</option>
                          <option value="sold" ${item.status === 'sold' ? 'selected' : ''}>مكتمل</option>
                          <option value="rejected" ${item.status === 'rejected' ? 'selected' : ''}>مرفوض</option>
                      </select>
                  </div>
                  <div class="f-group" style="margin:0;">
                      <label style="font-size:12px; color:var(--text-dim); margin-bottom:6px;">الحالة التفصيلية</label>
                      <select id="update-booking-substatus" class="filter-select" style="width:100%; border-radius:10px; padding:12px 14px; background:var(--bg-alt); color:var(--text-main); border: 1px solid var(--glass-border);">
                          <!-- يتم التعبئة عبر JavaScript -->
                      </select>
                  </div>
              </div>
              <div class="f-group" style="margin-bottom:20px;">
                  <label style="font-size:12px; color:var(--text-dim); margin-bottom:6px;">تفاصيل إضافية (ملاحظات الموظف)</label>
                  <textarea id="update-booking-details" placeholder="اكتب أو انسخ أي توضيح خاص بطلب العميل أو حالته هنا..." style="width:100%; border-radius:10px; padding:12px 14px; background:var(--bg-alt); border:1px solid var(--glass-border); color:var(--text-main); min-height:80px; resize:vertical; font-family:inherit;">${item.additionalDetails || ""}</textarea>
              </div>
              <button onclick="window.updateBookingQuickStatus('${item.id}')" class="btn-premium" style="width:100%; padding:14px; border:none; border-radius:12px; font-weight:800; font-size:15px; box-shadow:0 4px 15px rgba(0,0,0,0.1);">حفظ التحديثات <i class="fas fa-check-circle" style="margin-right:8px;"></i></button>
          </div>
          
          <div class="details-footer-actions-v3" style="margin-top:25px; display:flex; gap:15px; padding-bottom:15px;">
             <button onclick="window.fetchServerWAChat('${item.phone}', '${item.assignedTo || ''}')" class="btn-luxury-v2 wa-btn" style="flex:1; border:none; cursor:pointer; background:#00a884; color:white; padding:14px; border-radius:14px; display:flex; justify-content:center; align-items:center; gap:12px; font-family:inherit; transition:0.3s; box-shadow:0 4px 15px rgba(0,168,132,0.3);">
               <i class="fab fa-whatsapp" style="font-size:24px;"></i>
               <div class="btn-txt" style="text-align:right;">
                 <strong style="display:block; font-size:14px;">تزامن الواتساب</strong>
               </div>
             </button>
             <a href="tel:${item.phone}" class="btn-luxury-v2 call-btn" style="flex:1; border:none; text-decoration:none; cursor:pointer; background:var(--bg-card); color:var(--text-main); padding:14px; border-radius:14px; border:1px solid var(--glass-border); display:flex; justify-content:center; align-items:center; gap:12px; font-family:inherit; transition:0.3s;">
               <i class="fas fa-phone-alt" style="font-size:20px; color:var(--p-copper);"></i>
               <div class="btn-txt" style="text-align:right;">
                 <strong style="display:block; font-size:14px;">مكالمة هاتفية</strong>
               </div>
             </a>
          </div>
        </div>
      </div>

      <!-- العمود الأيسر: واجهة الدردشة المبرمجة مع السيرفر الاحترافي -->
      <div class="details-wa-v4" style="flex: 0 0 500px; display: flex; flex-direction: column; background: #efeae2; border-left: 1px solid var(--glass-border); height: 100%; position: relative;">
          <div class="chat-header">
             <div style="background: rgba(255,255,255,0.2); width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                 <i class="fab fa-whatsapp" style="font-size: 24px;"></i>
             </div>
             <div style="flex: 1; overflow: hidden; min-width: 0;">
                 <h3 style="margin: 0; font-size: 16px; font-weight: 700; font-family: inherit; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${item.name || 'محادثة العميل'}</h3>
                 <p style="margin: 0; font-size: 12px; opacity: 0.9; display:flex; align-items:center; gap:5px;"><i class="fas fa-circle" id="chat-polling-dot" style="font-size:8px; color:#ffffff; animation: pulse 1.5s infinite;"></i> متصل بالخادم</p>
             </div>
             <button class="icon-btn-lite" style="background:rgba(0,0,0,0.1); border:none; width:36px; height:36px;" onclick="window.fetchServerWAChat('${item.phone}', '${item.assignedTo || ''}')" title="تحديث يدوي"><i class="fas fa-sync-alt" style="color:white;"></i></button>
          </div>
          
          <div id="wa-modal-chat-box" class="chat-messages">
             <div style="text-align:center; margin-top: auto; margin-bottom: auto;">
                 <i class="fas fa-circle-notch fa-spin" style="font-size: 36px; color: #00a884; margin-bottom: 15px;"></i><br>
                 <div style="background: rgba(255,255,255,0.95); display: inline-block; padding: 10px 20px; border-radius: 20px; font-size: 13px; font-weight:600; color: #444; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">جاري الاتصال بالخادم الداخلي...</div>
             </div>
          </div>
          
          <div id="wa-emoji-picker" style="display:none; position:absolute; bottom: 90px; right: 20px; background:white; border-radius:16px; box-shadow:0 8px 30px rgba(0,0,0,0.2); width:320px; z-index:100; border:1px solid rgba(0,0,0,0.1); overflow:hidden;">
               <emoji-picker style="width: 100%; --num-columns: 8; --category-font-size: 14px; --emoji-size: 24px; --background: white; border: none;"></emoji-picker>
          </div>
          
          <div id="wa-quick-replies-bar" style="display:flex; gap:10px; padding:10px 20px; background:#f5f1eb; overflow-x:auto; border-top:1px solid rgba(0,0,0,0.05); align-items:center; z-index: 10; flex-shrink: 0; min-height: 50px;">
               <!-- rendered via js -->
          </div>
          
          <div class="chat-input-area">
             <i class="far fa-smile" style="font-size: 24px; color: #54656f; cursor: pointer;" onclick="document.getElementById('wa-emoji-picker').style.display = document.getElementById('wa-emoji-picker').style.display === 'none' ? 'flex' : 'none';"></i>
             <input type="file" id="wa-media-upload" style="display:none" onchange="window.handleWAMediaSelect('${item.phone}', '${item.assignedTo || ''}')">
             <i class="fas fa-paperclip" style="font-size: 22px; color: #54656f; cursor: pointer;" onclick="document.getElementById('wa-media-upload').click()"></i>
             <i id="wa-mic-btn" class="fas fa-microphone" style="font-size: 22px; color: #54656f; cursor: pointer; transition: 0.2s;" onpointerdown="window.startWARecording()" onpointerup="window.stopWARecording('${item.phone}', '${item.assignedTo || ''}')" onpointerleave="window.stopWARecording('${item.phone}', '${item.assignedTo || ''}')" title="اضغط باستمرار للتسجيل الصوتي"></i>
             <input type="text" id="wa-modal-input" class="chat-input" placeholder="اكتب رسالة للرد..." onkeydown="if(event.key==='Enter') { window.sendModalWAMessage('${item.phone}', '${item.assignedTo || ''}'); document.getElementById('wa-emoji-picker').style.display='none'; }">
             <button onclick="window.sendModalWAMessage('${item.phone}', '${item.assignedTo || ''}'); document.getElementById('wa-emoji-picker').style.display='none';" class="chat-btn"><i class="fas fa-paper-plane" style="margin-right:4px;"></i></button>
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
       if (window.fetchServerWAChat) {
           window.fetchServerWAChat(item.phone, item.assignedTo || '');
       }
       if (window.updateSubStatusOptions) window.updateSubStatusOptions(item.status || 'new', item.subStatus || 'not_contacted');
       if (window.renderQuickRepliesBar) window.renderQuickRepliesBar();
       
       const picker = document.querySelector('emoji-picker');
       if (picker) {
           picker.addEventListener('emoji-click', event => {
               const input = document.getElementById('wa-modal-input');
               if (input) {
                   input.value += event.detail.unicode;
                   input.focus();
               }
           });
       }
    }, 100);
  }
};

window._chatPollInterval = null;
window.startChatPolling = function(phone, staffId) { /* Deprecated */ };

window.copyMessage = function(text) {
    navigator.clipboard.writeText(text).then(() => {
        window.showLuxuryToast("تم نسخ النص بنجاح", "success");
    });
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

window.saveWAServerURL = async function() {
    const url = document.getElementById('wa-server-url-config')?.value;
    if (url) {
        localStorage.setItem('wa_server_url', url);
        try {
            await set(ref(db, 'settings/waServerUrl'), url);
        } catch(e) { console.error("Firebase save config error:", e); }
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

window.applySettings = function (s) {
  if (!s) return;
  const root = document.documentElement;

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

  const nameAr = s.nameAr || "ون كار";
  const nameEn = s.nameEn || "ONE CAR";
  const currentName = window.state.lang === "ar" ? nameAr : nameEn;

  document.querySelectorAll(".dynamic-name-ar").forEach(el => el.innerText = nameAr);
  document.querySelectorAll(".dynamic-name-en").forEach(el => el.innerText = nameEn);

  document.title = currentName + " | " + (window.state.lang === "ar" ? "الفخامة في عالم السيارات" : "Luxury Automotive");

  if (s.fontFamily) {
    root.style.setProperty("--font-main", s.fontFamily);
    document.body.style.fontFamily = s.fontFamily;
  }
  if (s.borderRadius) {
    root.style.setProperty("--border-radius-main", s.borderRadius);
    const styleId = "dynamic-design-styles";
    let style = document.getElementById(styleId);
    if (!style) {
      style = document.createElement("style");
      style.id = styleId;
      document.head.appendChild(style);
    }
    style.innerHTML = `
      .car-card-premium, .ad-slide, .nav-premium, .modal-inner, .video-card-v2, .feature-card, .btn-premium { 
        border-radius: ${s.borderRadius} !important; 
      }
    `;
  }

  // 1. Guest-facing Dynamic UI
  const aboutText = document.getElementById("about-text-display");
  if (aboutText) aboutText.innerText = s.aboutUs || "نقدم لكم تجربة استثنائية في عالم السيارات...";

  const locationText = document.getElementById("location-text-display");
  if (locationText) locationText.innerText = s.location || "الرياض - معارض القادسية";

  const phoneAdmin = document.getElementById("f-phone-admin");
  if (phoneAdmin) phoneAdmin.innerText = s.contactAdmin || "...";

  const phoneSales = document.getElementById("f-phone-sales");
  if (phoneSales) phoneSales.innerText = s.contactSales || "...";

  const phoneInfo = document.getElementById("f-phone-info");
  if (phoneInfo) phoneInfo.innerText = s.contactComplaints || "...";

  const emailDisp = document.getElementById("f-email-display");
  if (emailDisp) emailDisp.innerText = s.contactEmail || "...";

  const locLink = document.getElementById("contact-location-link");
  if (locLink) locLink.href = s.locationUrl || "#";

  // Meta Tags & Social
  const metaTitle = document.getElementById("meta-title");
  if (metaTitle) metaTitle.innerText = `${nameAr} | ${s.metaTitle || "الفخامة والجودة تليق بك"}`;
  const metaDesc = document.getElementById("meta-description");
  if (metaDesc) metaDesc.setAttribute("content", s.metaDesc || "وجهتكم الرائدة للسيارات الفاخرة والمعتمدة.");

  const socMapping = { "f-insta": s.socialInsta, "f-snap": s.socialSnap, "f-twitter": s.socialTwitter };
  Object.entries(socMapping).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.href = val || "#";
  });

  // 2. Admin-facing Settings Form (Two-way binding)
  const formMapping = {
    "set-name-ar": s.nameAr || "",
    "set-name-en": s.nameEn || "",
    "set-color-primary": s.primaryColor || "#a11d21",
    "set-color-secondary": s.secondaryColor || "#1c7c8c",
    "set-color-accent": s.accentColor || "#b8860b",
    "set-default-theme": s.defaultTheme || "dark",
    "set-font-family": s.fontFamily || "'Cairo', sans-serif",
    "set-border-radius": s.borderRadius || "16px",
    "set-contact-mgmt": s.contactAdmin || "",
    "set-contact-sales": s.contactSales || "",
    "set-contact-complaints": s.contactComplaints || "",
    "set-contact-email": s.contactEmail || "",
    "set-about-text": s.aboutUs || "",
    "set-location-link": s.locationUrl || "",
    "set-location-text": s.location || "",
    "set-insta-link": s.socialInsta || "",
    "set-snap-link": s.socialSnap || "",
    "set-twitter-link": s.socialTwitter || ""
  };
  Object.entries(formMapping).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.value = val;
  });

  const maintenanceEl = document.getElementById("set-maintenance-mode");
  if (maintenanceEl) maintenanceEl.checked = s.maintenanceMode || false;

  const logoPreview = document.getElementById("logo-preview-img");
  if (logoPreview) logoPreview.src = logo;

  localStorage.setItem("luxury-settings-cache", JSON.stringify(s));
};

window.resetToDefaultSettings = async function () {
  if (confirm("هل أنت متأكد من إعادة ضبط كافة الإعدادات؟ سيتم فقدان الشعارات والألوان المخصصة.")) {
    const defaults = {
      nameAr: "ون كار", nameEn: "ONE CAR", primaryColor: "#a11d21", secondaryColor: "#1c7c8c",
      accentColor: "#b8860b", defaultTheme: "dark", borderRadius: "16px", logo: "logo.jpg",
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

window.previewLogo = function (input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const b64 = e.target.result;
      document.getElementById("logo-preview-img").src = b64;
      document.getElementById("set-logo-b64").value = b64;
    };
    reader.readAsDataURL(input.files[0]);
  }
};

window.saveAppSettings = async function () {
  const btn = document.querySelector('button[onclick="window.saveAppSettings()"]');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الحفظ...';
  }

  const s = {
    nameAr: document.getElementById("set-name-ar")?.value,
    nameEn: document.getElementById("set-name-en")?.value,
    logo: document.getElementById("set-logo-b64")?.value || window.state.settings.logo || "logo.jpg",
    primaryColor: document.getElementById("set-color-primary")?.value,
    secondaryColor: document.getElementById("set-color-secondary")?.value,
    accentColor: document.getElementById("set-color-accent")?.value,
    defaultTheme: document.getElementById("set-default-theme")?.value,
    fontFamily: document.getElementById("set-font-family")?.value,
    borderRadius: document.getElementById("set-border-radius")?.value,
    contactAdmin: document.getElementById("set-contact-mgmt")?.value,
    contactSales: document.getElementById("set-contact-sales")?.value,
    contactComplaints: document.getElementById("set-contact-complaints")?.value,
    contactEmail: document.getElementById("set-contact-email")?.value,
    aboutUs: document.getElementById("set-about-text")?.value,
    locationUrl: document.getElementById("set-location-link")?.value,
    location: document.getElementById("set-location-text")?.value,
    socialInsta: document.getElementById("set-insta-link")?.value,
    socialSnap: document.getElementById("set-snap-link")?.value,
    socialTwitter: document.getElementById("set-twitter-link")?.value,
    maintenanceMode: document.getElementById("set-maintenance-mode")?.checked || false,
    updatedAt: new Date().toISOString()
  };

  try {
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

// =========================================================================================
// ADMIN TABLES & STATISTICS
// =========================================================================================

window.filterUsersByRole = function(role, btn) {
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
    if(window.renderQuickRepliesAdmin) window.renderQuickRepliesAdmin();
    if(window.renderQuickRepliesBar) window.renderQuickRepliesBar();
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
      const content = (item.make || item.title || item.name || item.model || item.phone || item.carRequested || item.carOrCompany || "").toLowerCase();
      return content.includes(searchQuery);
    });
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
        if (u.role === "admin" || u.role === "supervisor" || u.role === "staff") {
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
             if (cleanPhone.startsWith('0')) cleanPhone = '966' + cleanPhone.substring(1);
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
  const isAdmin = window.state.userProfile?.role === "admin" || window.state.userProfile?.role === "supervisor";
  const statusClass = item.status === "sold" ? "danger" : item.status === "available" ? "success" : "warning";
  const statusLabel = item.status === "sold" ? "مباع" : item.status === "available" ? "متاح" : "محجوز";

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
                    ${isAdmin ? `<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('bookings', '${item.id}')" title="حذف الحجز" aria-label="Delete Booking"><i class="fas fa-trash"></i></button>` : ""}
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
                        <span style="color:var(--p-red); font-weight:800;">${Number(item.price || 0).toLocaleString()} ريال</span>
                    </div>
                </div>
                <div class="admin-actions" style="display:flex; gap:8px; align-items:center;">
                    <span class="badge-${statusClass}" style="font-size:10px; padding:4px 10px; border-radius:6px; font-weight:700;">${statusLabel}</span>
                    <button class="icon-btn-lite view" onclick="window.viewLuxuryCar('${item.id}')" title="عرض التفاصيل"><i class="fas fa-eye"></i></button>
                    ${isAdmin ? `
                        <button class="icon-btn-lite" onclick="window.editLuxuryItem('cars', '${item.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                        <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('cars', '${item.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                    ` : ""}
                </div>
            </div>
        `;
  }

  if (type === "users") {
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
                    ${isAdmin ? `<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('users', '${item.id}')" title="حذف المستخدم" aria-label="Delete User"><i class="fas fa-trash"></i></button>` : ""}
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
                    ${isAdmin ? `
                        <button class="icon-btn-lite" onclick="window.editLuxuryItem('plates', '${item.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                        <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('plates', '${item.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                    ` : ""}
                </div>
            </div>
        `;
  }

  if (type === "notifications") {
    const isRead = !!item.read;
    return `
            <div class="admin-item-row" style="background:${isRead ? 'rgba(255,255,255,0.01)' : 'rgba(28, 124, 140, 0.05)'}; padding:15px; border-radius:12px; border:1px solid ${isRead ? 'var(--glass-border)' : 'var(--p-teal)'}; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                <div class="admin-item-info">
                    <div style="display:flex; align-items:center; gap:10px;">
                        ${!isRead ? '<span style="width:8px; height:8px; background:var(--p-teal); border-radius:50%;"></span>' : ''}
                        <strong style="display:block; font-size:15px;">${item.title || "تنبيه بالنظام"}</strong>
                    </div>
                    <p style="font-size:13px; opacity:0.8; margin-top:4px;">${item.text || item.message || ""}</p>
                    <span style="font-size:11px; opacity:0.5; margin-top:5px; display:block;"><i class="far fa-clock"></i> ${new Date(item.timestamp).toLocaleString()}</span>
                </div>
                ${isAdmin ? `
                <div class="admin-actions">
                    <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('notifications', '${item.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                </div>
                ` : ""}
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
                    ${isAdmin ? `
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
                ${isAdmin ? `
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

  // Staff-Specific UI Refresh (Line 661+)
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
};

// =========================================================================================
// CRUD OPERATIONS
// =========================================================================================

window.deleteLuxuryItem = async function (type, id) {
  if (confirm("هل أنت متأكد من الحذف؟ لا يمكن التراجع عن هذه العملية.")) {
    try {
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
      { name: "make", label: "الماركة", type: "select", options: [{ v: "", t: "اختر الماركة" }, ...brandOptions], required: true },
      { name: "model", label: "الموديل", type: "text", required: true },
      { name: "year", label: "السنة", type: "number", required: true },
      { name: "price", label: "السعر", type: "number", required: true },
      { name: "mileage", label: "الممشى (كم)", type: "number", required: true },
      { name: "engine", label: "المحرك", type: "text", placeholder: "مثال: 8 سليندر، 4.0L" },
      { name: "gearbox", label: "ناقل الحركة", type: "select", options: [{ v: "أوتوماتيك", t: "أوتوماتيك" }, { v: "عادي", t: "عادي" }] },
      { name: "fuelType", label: "نوع الوقود", type: "select", options: [{ v: "بنزين", t: "بنزين" }, { v: "ديزل", t: "ديزل" }, { v: "هايبرد", t: "هايبرد" }, { v: "كهرباء", t: "كهرباء" }] },
      { name: "bodyType", label: "فئة السيارة", type: "select", options: [{ v: "sedan", t: "سيدان" }, { v: "suv", t: "SUV" }, { v: "coupe", t: "كوبيه" }, { v: "luxury", t: "فاخرة" }, { v: "pickup", t: "بيك آب" }] },
      { name: "color", label: "اللون خارجي", type: "text" },
      { name: "interiorColor", label: "اللون داخلي", type: "text" },
      { name: "status", label: "الحالة في المخزون", type: "select", options: [{ v: "available", t: "متاح" }, { v: "reserved", t: "محجوز" }, { v: "sold", t: "مباع" }, { v: "incoming", t: "قادم قريباً" }] },
      { name: "isFeatured", label: "عرض في قسم المميز؟", type: "select", options: [{ v: false, t: "لا" }, { v: true, t: "نعم" }] },
      { name: "desc", label: "وصف إضافي ومواصفات", type: "textarea" },
      { name: "_image_manager", label: "صور السيارة (المعرض)", type: "custom", html: `
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
      { name: "image", label: "رابط الصورة", type: "text" },
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
      { name: "logo", label: "رابط الشعار", type: "text" },
      { name: "link", label: "رابط خارجي (اختياري)", type: "text" }
    ];
  } else if (type === "brands") {
    fields = [
      { name: "name", label: "اسم العلامة التجارية", type: "text" },
      { name: "logo", label: "رابط الشعار", type: "text" }
    ];
  } else if (type === "blogs") {
    fields = [
      { name: "title", label: "عنوان المقال", type: "text" },
      { name: "image", label: "رابط الصورة", type: "text" },
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
      { name: "assignedTo", label: "الموظف المسؤول", type: "select", options: [{ v: "", t: "غير محدد" }, ...window.state.users.filter(u => u.role === "staff").map(u => ({ v: u.id, t: u.name || u.email }))] },
      { name: "notes", label: "ملاحظات", type: "textarea" }
    ];
  } else if (type === "users") {
    fields = [
      { name: "name", label: "الاسم الكامل", type: "text" },
      { name: "email", label: "البريد الإلكتروني", type: "text" },
      { name: "role", label: "الصلاحية", type: "select", options: [{ v: "staff", t: "موظف" }, { v: "supervisor", t: "مشرف" }, { v: "admin", t: "مدير" }] },
      { name: "isAvailable", label: "متاح لاستلام الطلبات؟", type: "select", options: [{ v: true, t: "نعم" }, { v: false, t: "لا" }] }
    ];
  } else if (type === "quickReplies") {
    fields = [
      { name: "title", label: "عنوان الرد السريع", type: "text", required: true, placeholder: "مثال: ترحيب بالعملاء الجدد" },
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
          <div class="img-item-v2 ${img.isMain ? 'is-main' : ''}">
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
      data[key] = val;
    }
  });

  try {
    // 1. Unified Image Manager Upload (Only for Cars)
    if (type === "cars") {
      const finalImageUrls = [];
      let mainImageUrl = "";

      const carImages = window.state.carImages || [];
      if (carImages.length === 0) {
        // Fallback or warning?
      }

      for (let i = 0; i < carImages.length; i++) {
        const img = carImages[i];
        let url = "";

        if (img.type === 'url') {
          url = img.value;
        } else if (img.type === 'file') {
          const file = img.value;
          const path = `cars/${Date.now()}_${i}_${file.name.replace(/\s/g, '_')}`;
          const sRef = storageRef(storage, path);
          const snapshot = await uploadBytes(sRef, file);
          url = await getDownloadURL(snapshot.ref);
        }

        finalImageUrls.push(url);
        if (img.isMain) mainImageUrl = url;
      }

      // If no main image selected, pick first
      if (!mainImageUrl && finalImageUrls.length > 0) mainImageUrl = finalImageUrls[0];

      data.image = mainImageUrl;
      data.images = finalImageUrls;
    }

    // Convert numeric fields
    const numFields = ["price", "year", "mileage", "rating", "installmentPeriod"];
    numFields.forEach(f => {
      if (data[f] !== undefined && data[f] !== "" && data[f] !== null) {
        data[f] = Number(data[f]);
      }
    });

    // Fix isFeatured boolean
    if (data.isFeatured !== undefined) {
      data.isFeatured = (data.isFeatured === "true" || data.isFeatured === true);
    }

    if (!id) data.createdAt = new Date().toISOString();
    data.updatedAt = new Date().toISOString();

    const targetRef = id ? ref(db, `${type}/${id}`) : push(ref(db, type));
    await (id ? update(targetRef, data) : set(targetRef, data));

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

window.openQuickReplyModal = function() {
    window.openCRUDModal("quickReplies");
};

window.renderQuickRepliesAdmin = function() {
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

window.openVideoLightbox = function(url) {
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

  const data = {
    customerType: form.querySelector('[name="customer-type"]:checked')?.value || "individual",
    carRequested: document.getElementById("b-car")?.value || "",
    name: document.getElementById("b-name")?.value || "",
    phone: (() => {
        let code = (document.getElementById("b-phone-code")?.value === "other" ? document.getElementById("b-phone-code-other")?.value : document.getElementById("b-phone-code")?.value) || "966";
        code = code.toString().replace(/\D/g, '');
        let num = (document.getElementById("b-phone")?.value || "").toString().replace(/\D/g, '');
        if (num.startsWith('00')) num = num.substring(2);
        if (num.startsWith('0')) num = num.substring(1);
        if (num.startsWith(code) && num.length > code.length) return num;
        return code + num;
    })(),
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
const CURRENT_MASTER_URL = "https://looked-graph-consider-sydney.trycloudflare.com";
const WA_SERVER_URL = window.WA_SERVER_URL_OVERRIDE || localStorage.getItem('wa_server_url') || CURRENT_MASTER_URL;

window.saveWAServerURL = async function() {
    const el = document.getElementById('wa-server-url-config');
    if (!el) return;
    let url = el.value.trim().replace(/\/$/, "");
    if (!url) return window.showLuxuryToast('يرجى إدخال الرابط', 'error');
    try {
        await set(ref(db, 'settings/waServerUrl'), url);
        localStorage.setItem('wa_server_url', url);
        window.showLuxuryToast('تم حفظ الرابط وبثه للجميع، سيتم تحديث الصفحة', 'success');
        setTimeout(() => location.reload(), 1500);
    } catch(err) {
        window.showLuxuryToast('خطأ في الصلاحيات لرفع الرابط', 'error');
    }
};

window.startStaffWASession = function() {
    const sel = document.getElementById('wa-staff-select');
    if(!sel || !sel.value) return window.showLuxuryToast('يرجى اختيار موظف للربط', 'error');
    if(waSocketContainer) {
       document.getElementById('wa-server-status').innerText = 'يتم الآن توليد كود الاستجابة للموظف...';
       document.getElementById('wa-server-status').style.color = 'var(--text-dim)';
       document.getElementById('wa-qr-container').style.display = 'none';
       waSocketContainer.emit('start_session', { userId: sel.value });
    }
};

window.logoutStaffWASession = function() {
    const sel = document.getElementById('wa-staff-select');
    if(!sel || !sel.value) return window.showLuxuryToast('يرجى اختيار الموظف أولاً', 'error');
    if(confirm('هل أنت متأكد من فصل رقم الواتساب لهذا الموظف وسجل المحادثة الخاصة به من السيرفر؟')) {
        if(waSocketContainer) waSocketContainer.emit('logout_session', { userId: sel.value });
    }
};

window.initWhatsAppServer = async function() {
    // تعبئة البيانات الحالية للسيرفر
    const urlConfig = document.getElementById('wa-server-url-config');
    
    // جلب الرابط الموحد من قاعدة البيانات لضمان تعميم النفق النشط لجميع الموظفين
    let globalUrl = null;
    try {
        const snapshot = await get(ref(db, 'settings/waServerUrl'));
        if (snapshot.exists()) {
            globalUrl = snapshot.val();
        }
    } catch(e) { console.error("Firebase config error:", e); }

    // Logic: If we are an admin and the FB url is different from CURRENT_MASTER_URL, force update it!
    const FINAL_WA_URL = globalUrl || CURRENT_MASTER_URL;
    
    if (window.state.userProfile && (window.state.userProfile.role === 'admin' || window.state.userProfile.role === 'supervisor')) {
        if (globalUrl !== CURRENT_MASTER_URL) {
            console.log("Auto-updating Firebase WA Server URL to:", CURRENT_MASTER_URL);
            await set(ref(db, 'settings/waServerUrl'), CURRENT_MASTER_URL).catch(e=>e);
        }
    }

    localStorage.setItem('wa_server_url', FINAL_WA_URL);
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
        staffSelect.onchange = function() {
            if (this.value) {
                if(waSocketContainer) waSocketContainer.emit('join_room', this.value);
                window.startStaffWASession();
            }
        };
        
        // التحقق التلقائي عند التحميل إذا كان هناك موظف مختار مسبقاً
        if (staffSelect.value) {
            if(waSocketContainer) waSocketContainer.emit('join_room', staffSelect.value);
            window.startStaffWASession();
        }
    }

    if (typeof io !== 'undefined' && !waSocketContainer) {
        // Pre-fetch to bypass GitHub Codespaces landing page
        fetch(`${FINAL_WA_URL}/ping`).catch(() => {});
        
        waSocketContainer = io(FINAL_WA_URL, {
            reconnection: true,
            reconnectionAttempts: 10,
            reconnectionDelay: 2000,
            transports: ['polling', 'websocket']
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
            console.log("QR received for user:", data.userId);
            const sel = document.getElementById('wa-staff-select');
            const statusEl = document.getElementById('wa-server-status');
            const qrContainer = document.getElementById('wa-qr-container');
            const qrCanvas = document.getElementById('wa-qr-canvas');

            // Force clear old intervals
            if (window._qrRetryTimer) clearInterval(window._qrRetryTimer);
            
            // تحديث واجهة المسؤول إذا كان الموظف مختاراً
            if (sel && sel.value === data.userId) {
                if(statusEl) {
                    statusEl.innerText = 'في انتظار مسح كود الـ QR...';
                    statusEl.style.color = 'var(--text-color)';
                }
                if(qrContainer) qrContainer.style.display = 'block';
                if(typeof QRCode !== 'undefined' && qrCanvas) {
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

                if(typeof QRCode !== 'undefined' && myQrCanvas) {
                    QRCode.toCanvas(myQrCanvas, data.qr, { width: 250, margin: 2 }, function (error) {
                        if (error) console.error(error);
                    });
                }
            }
        });
        
        waSocketContainer.on('ready', (data) => {
            const sel = document.getElementById('wa-staff-select');
            if (sel && sel.value === data.userId) {
                const statusEl = document.getElementById('wa-server-status');
                const qrContainer = document.getElementById('wa-qr-container');
                if(statusEl) {
                    statusEl.innerText = data.msg;
                    statusEl.style.color = '#00a884';
                }
                if(qrContainer) qrContainer.style.display = 'none';
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
            const msgToDisplay = data.msg || 'تم قطع الاتصال بالسيرفر. يرجى إعادة الربط لتفعيل خدمات الدردشة.';

            const sel = document.getElementById('wa-staff-select');
            if (sel && sel.value === data.userId) {
                const statusEl = document.getElementById('wa-server-status');
                if(statusEl) {
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

        waSocketContainer.on('message', (data) => {
            const incomingPhoneStr = window.normalizePhone(data.from);
            const currentWaStr = window.normalizePhone(window._currentWaPhone);
            const modalEl = document.getElementById('details-modal');
            const isModalOpen = modalEl && !modalEl.classList.contains('hidden');
            
            if(isModalOpen && currentWaStr && incomingPhoneStr === currentWaStr) {
                 window.fetchServerWAChat(window._currentWaPhone, data.userId); 
            } else {
                 if (data.isMe) return; // Do not show push notifications for outgoing messages
                 
                 const bookings = window.state.bookings || [];
                 const bookingFound = bookings.find(b => {
                     return window.normalizePhone(b.phone) === incomingPhoneStr;
                 });
                 
                 if (!bookingFound) return; // Ignore messages from numbers not in the system

                 // Push notification showing if it's assigned to me, or if I'm an admin
                 const isForMe = data.userId === (window.state.userProfile?.id);
                 const isAdmin = window.state.userProfile?.role === 'admin' || window.state.userProfile?.role === 'supervisor';
                 if (isForMe || isAdmin) {
                     if (window.showWAPushNotification) window.showWAPushNotification(incomingPhoneStr, data.body, data.userId);
                 }
            }
        });
    }
};

window.showWAPushNotification = async function(phone, body, assignedUserId) {
    let container = document.getElementById('wa-push-notifications-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'wa-push-notifications-container';
        container.style.cssText = 'position:fixed; bottom:30px; left:25px; z-index:999999; display:flex; flex-direction:column-reverse; gap:12px; width:340px; pointer-events:none;';
        document.body.appendChild(container);
    }
    
    const bookings = window.state.bookings || [];
    const booking = bookings.find(b => b.phone && b.phone.replace(/\D/g, '').includes(phone));
    const senderName = booking && booking.name ? booking.name : phone;
    
    let displayBody = body || 'رسالة جديدة';
    if(displayBody.length > 70) displayBody = displayBody.substring(0, 70) + '...';
    
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
        } catch(e) { console.warn("Could not save to notifications DB", e); }
    };
    
    let timeoutId = setTimeout(() => {
        closePopup();
        pushToNotificationsList();
    }, 10000);
    
    const closePopup = () => {
        popup.style.transform = 'translateX(-120%)';
        popup.style.opacity = '0';
        popup.style.marginTop = `-${popup.offsetHeight}px`; // animate slide up for items below
        setTimeout(() => { if(popup.parentNode) popup.parentNode.removeChild(popup); }, 400);
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
                 if(waTab) waTab.click();
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

window.startCurrentWASession = async function() {
    if(!window.state.user) return;
    
    const emitStart = () => {
        if (!waSocketContainer) return;
        waSocketContainer.emit('start_session', { userId: window.state.user.uid });
        const statusTitle = document.getElementById('wa-my-status-title');
        const statusDesc = document.getElementById('wa-my-status-desc');
        if (statusTitle) statusTitle.innerText = 'جاري الاتصال...';
        if (statusDesc) statusDesc.innerText = 'يتم الآن التواصل مع خادم الواتساب لتوليد رمز الاستجابة السريعة...';
    };

    if(waSocketContainer) {
        if (waSocketContainer.connected) {
            emitStart();
        } else {
            waSocketContainer.once('connect', emitStart);
            waSocketContainer.connect();
        }
    } else {
       await window.initWhatsAppServer();
       // wait a half sec for socket to potentially start connecting
       setTimeout(emitStart, 500);
    }
};

window.logoutCurrentWASession = function() {
    if(!window.state.user) return;
    if(confirm('هل أنت متأكد من تسجيل الخروج من واتساب؟ لن تتمكن من المراسلة من هنا.')) {
        if(waSocketContainer) waSocketContainer.emit('logout_session', { userId: window.state.user.uid });
    }
};

window._waMediaCache = window._waMediaCache || {};

window._unsubModalChat = null;
window.fetchServerWAChat = function(phone, staffId, silent = false) {
    if(!phone) return;
    const chatBox = document.getElementById('wa-modal-chat-box');
    if(!chatBox) return;
    
    let userIdToUse = window.state.userProfile.id;
    if (window.state.userProfile.role === 'admin' && staffId) userIdToUse = staffId;
    window._currentWaPhone = phone;
    
    if (window._unsubModalChat) window._unsubModalChat();
    
    try {
        const waRef = window.dbRef ? window.dbRef(window.db || db, `whatsapp/messages/${userIdToUse}/${phone}`) : ref(db, `whatsapp/messages/${userIdToUse}/${phone}`);
        window._unsubModalChat = onValue(waRef, (snapshot) => {
            const data = snapshot.val() || {};
            const msgKeys = Object.keys(data);
            
            if (msgKeys.length === 0) {
                chatBox.innerHTML = '<div style="text-align:center; margin-top:auto; margin-bottom:auto;"><div style="background:rgba(255,255,255,0.95); display:inline-block; padding:15px 30px; border-radius:15px; font-size:13px; color:#555; box-shadow:0 3px 10px rgba(0,0,0,0.08);"><i class="fas fa-comment-dots" style="color:#00a884; font-size:24px; margin-bottom:10px; display:block;"></i>لا توجد رسائل سابقة.<br>ابدأ المحادثة الآن.</div></div>';
                return;
            }
            
            msgKeys.sort((a,b) => data[a].timestamp - data[b].timestamp);
            
            let html = '<div class="chat-security-hint" style="text-align:center; margin:10px 0;"><span style="background:rgba(0,0,0,0.03); padding:5px 15px; border-radius:10px; font-size:11px; color:var(--text-dim);"><i class="fas fa-lock" style="font-size:10px;"></i> الرسائل مشفرة ومؤمنة عبر Firebase</span></div>';
            
            msgKeys.forEach(k => {
                const m = data[k];
                const tsNum = m.timestamp ? Number(m.timestamp) : null;
                const timeStr = (tsNum && !isNaN(tsNum)) ? new Date(tsNum * 1000).toLocaleTimeString('ar-SA', {hour: '2-digit', minute:'2-digit', timeZone: 'Asia/Riyadh'}) : '';
                const sideClass = m.isMe ? 'me' : 'them';
                
                let ticks = '';
                if (m.isMe) {
                    if (m.ack <= 1) ticks = '<i class="fas fa-check" style="font-size:11px; color:#999;"></i>';
                    else if (m.ack === 2) ticks = '<i class="fas fa-check-double" style="font-size:11px; color:#999;"></i>';
                    else if (m.ack >= 3) ticks = '<i class="fas fa-check-double" style="font-size:11px; color:#53bdeb;"></i>';
                }

                let safeBody = (m.body || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                safeBody = safeBody.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="color:#027eb5; text-decoration:underline;">$1</a>');
                
                let contentStr = `<div>${safeBody}</div>`;
                if (m.hasMedia || m.media) {
                     contentStr = `
                        <div id="modal-dl-${m.id}" class="media-dl-box" style="background:rgba(0,0,0,0.05); padding:10px; border-radius:8px; display:flex; align-items:center; gap:10px; margin-bottom:5px;">
                            <i class="fas fa-file-download" style="font-size:20px; color:var(--text-dim);"></i>
                            <div style="flex:1;">
                                <strong style="display:block; font-size:12px;">مرفق وسائط</strong>
                            </div>
                            <button class="btn-premium btn-sm" onclick="window.downloadWAMedia('${userIdToUse}', '${phone}', '${m.id}', 'modal-dl-${m.id}', 'unknown', '${m.type}')" style="padding:4px 8px;"><i class="fas fa-download"></i></button>
                        </div>` + (safeBody ? `<div>${safeBody}</div>` : '');
                }

                html += `
                    <div class="chat-bubble ${sideClass}">
                        ${contentStr}
                        <div class="chat-time">
                            <span>${timeStr}</span>
                            ${ticks}
                        </div>
                    </div>
                `;
            });
            
            const isAtBottom = chatBox.scrollHeight - chatBox.scrollTop - chatBox.clientHeight < 150;
            chatBox.innerHTML = html;
            if (isAtBottom || !silent) {
                setTimeout(() => chatBox.scrollTo({top: chatBox.scrollHeight, behavior: silent ? 'smooth' : 'auto'}), 50);
            }
        });
    } catch(err) {
        console.error("Modal Chat Fetch Error:", err);
    }
};

window.sendModalWAMessage = async function(phone, staffId) {
    if (!phone) return;
    const input = document.getElementById('wa-modal-input');
    const msg = input.value.trim();
    if (!msg) return;
    
    input.value = '';
    
    let userIdToUse = window.state.userProfile.id;
    if (window.state.userProfile.role === 'admin' && staffId) userIdToUse = staffId;
    const activeUrl = window._waServerActiveUrl || CURRENT_MASTER_URL;
    
    try {
        await fetch(`${activeUrl}/api/send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: 'session-' + userIdToUse,
                phone: phone,
                message: msg
            })
        });
    } catch(err) {
        console.error(err);
    }
};

let mediaRecorder;
let audioChunks = [];

window.startWARecording = async function() {
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
        if(micBtn) micBtn.style.color = 'red';
    } catch(err) {
        window.showLuxuryToast('لم يتم السماح باستخدام الميكروفون', 'error');
        window._waRecordingIntent = false;
    }
};

window.stopWARecording = function(phone, staffId) {
    if (!window._waRecordingIntent) return;
    window._waRecordingIntent = false;
    
    if(!mediaRecorder || mediaRecorder.state === 'inactive') return;
    
    mediaRecorder.onstop = async () => {
        const duration = Date.now() - (window._waRecordingStartTime || Date.now());
        
        if (duration < 500 || audioChunks.length === 0) {
            // Ignore recordings that are too short to prevent blank notes
            mediaRecorder.stream.getTracks().forEach(t => t.stop());
            const micBtn = document.getElementById('wa-mic-btn');
            if(micBtn) micBtn.style.color = '#54656f';
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
        if(micBtn) micBtn.style.color = '#54656f';
        mediaRecorder.stream.getTracks().forEach(t => t.stop());
    };
    mediaRecorder.stop();
};

window.handleWAMediaSelect = function(phone, staffId) {
    const input = document.getElementById('wa-media-upload');
    const file = input.files && input.files[0];
    if(!file) return;
    
    if(file.size > 16 * 1024 * 1024) {
        window.showLuxuryToast('حجم الملف كبير جداً، أقصى حد يسمح به الواتساب هو 16 ميجابايت', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
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
window.sendServerWAMessage = async function(phone, staffId, mediaObj = null, forcedMessage = null) {
    const input = document.getElementById('wa-server-input');
    if (input && input.disabled) return;
    
    const message = forcedMessage !== null ? forcedMessage : (input ? input.value.trim() : '');
    if(!mediaObj && !message) return;
    
    let userIdToUse = window.state.userProfile.id;
    if (window.state.userProfile.role === 'admin' && staffId) userIdToUse = staffId;

    if (input && forcedMessage === null) {
        input.value = '';
        input.focus();
    }

    const chatBox = document.getElementById('wa-server-chat-box');
    if (chatBox) {
        const timeStr = new Date().toLocaleTimeString('ar-SA', {hour: '2-digit', minute:'2-digit'});
        let safeBody = (message || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        safeBody = safeBody.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="color:#027eb5; text-decoration:underline;">$1</a>');
        
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble me optimistic';
        
        let content = `<div>${safeBody}</div>`;
        if (mediaObj) {
            content = `<div style="margin-bottom:5px; font-size:12px; color:#555; display:flex; align-items:center; gap:5px;"><i class="fas fa-paperclip"></i> جارٍ إرسال مرفق...</div>` + content;
        }
        
        bubble.innerHTML = `
            ${content}
            <div class="chat-time">
                <span>${timeStr}</span>
                <i class="fas fa-clock" style="font-size:11px; opacity:0.5;"></i>
            </div>
        `;
        
        chatBox.appendChild(bubble);
        chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: 'smooth' });
    }

    try {
        const activeUrl = window._waServerActiveUrl || CURRENT_MASTER_URL;
        const payload = { userId: userIdToUse, phone, message };
        if (mediaObj) payload.media = mediaObj;

        const response = await fetch(`${activeUrl}/api/send`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });
        
        if(response.ok) {
            // Background update to confirm send (get ticks)
            setTimeout(() => window.fetchServerWAChat(phone, userIdToUse, true), 1000);
        } else {
            window.showLuxuryToast('فشل الإرسال: الواتساب غير متصل', 'error');
            const optimistic = chatBox.querySelector('.optimistic');
            if (optimistic) optimistic.style.opacity = "0.5";
        }
    } catch(err) {
        window.showLuxuryToast('خطأ في الاتصال بالسيرفر', 'error');
    } finally {
        const fileInput = document.getElementById('wa-media-upload');
        if (fileInput) fileInput.value = '';
    }
};

window.openQuickReplyModal = function() {
    window.openCRUDModal('quickReplies');
};

window.editQuickReply = function(id) {
    window.openCRUDModal('quickReplies', id);
};

window.addQuickReply = async function(btnEvent) {
    // Legacy support if needed, but we prefer openQuickReplyModal now
    window.openQuickReplyModal();
};

window.deleteQuickReply = async function(id, btnElement) {
    if(confirm("هل أنت متأكد من الحذف؟")) {
        let originalText = "";
        if (btnElement) {
             originalText = btnElement.innerHTML;
             btnElement.disabled = true;
             btnElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        }
        try {
            await remove(ref(db, `quickReplies/${id}`));
            window.showLuxuryToast("تم الحذف بنجاح");
        } catch(err) {
            console.error("Error deleting quick reply:", err);
            window.showLuxuryToast("فُقدت الصلاحية أو حدث خطأ أثناء الحذف", "error");
            if (btnElement) {
                 btnElement.disabled = false;
                 btnElement.innerHTML = originalText;
            }
        }
    }
};

window.renderQuickRepliesAdmin = function() {
    const list = document.getElementById("quick-replies-list");
    if(!list) return;
    
    const searchQuery = (document.getElementById("qr-search")?.value || "").toLowerCase();
    let qr = window.state.quickReplies || [];
    
    if (searchQuery) {
        qr = qr.filter(q => 
            (q.title || "").toLowerCase().includes(searchQuery) || 
            (q.content || "").toLowerCase().includes(searchQuery)
        );
    }

    if(qr.length === 0) {
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
window.renderQuickRepliesBar = function() {
    const bar = document.getElementById("wa-quick-replies-bar");
    if(!bar) return;
    const qr = window.state.quickReplies || [];
    if(qr.length === 0) {
        bar.style.display = "none";
        return;
    }
    bar.style.display = "flex";
    
    const isExpanded = window._qrExpanded;
    let visible = qr;
    let hasMore = false;
    
    if(!isExpanded && qr.length > 4) {
        visible = qr.slice(0, 4);
        hasMore = true;
    }
    
    let html = visible.map(q => `
        <button onclick="window.applyQuickReply(\`${q.content.replace(/"/g, '&quot;').replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\\n/g, '\\\\n')}\`)" style="background:white; border:1px solid var(--glass-border); padding:6px 12px; border-radius:16px; font-size:12px; color:#54656f; cursor:pointer; flex-shrink:0; white-space:nowrap; transition:all 0.2s; box-shadow:0 1px 2px rgba(0,0,0,0.05);" onmouseover="this.style.background='#f0f2f5'" onmouseout="this.style.background='white'">
            ${q.title}
        </button>
    `).join("");
    
    if(hasMore) {
        html += `<button onclick="window._qrExpanded=true; window.renderQuickRepliesBar();" style="background:#00a884; color:white; border:none; padding:6px 12px; border-radius:16px; font-size:12px; cursor:pointer; flex-shrink:0;">عرض الكل <i class="fas fa-chevron-left" style="margin-right:4px;"></i></button>`;
    } else if (isExpanded && qr.length > 4) {
        html += `<button onclick="window._qrExpanded=false; window.renderQuickRepliesBar();" style="background:#e02424; color:white; border:none; padding:6px 12px; border-radius:16px; font-size:12px; cursor:pointer; flex-shrink:0;">إخفاء <i class="fas fa-chevron-right" style="margin-right:4px;"></i></button>`;
    }
    
    bar.innerHTML = html;
};

window.applyQuickReply = function(content) {
    const input = document.getElementById("wa-server-input");
    if(input) {
        input.value = content;
        input.focus();
    }
};

window.downloadWAMedia = async function(userId, phone, messageId, containerId, mimetype, msgType) {
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
    } catch(err) {
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
window.viewFullImage = function(src) {
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
            if(e.target === overlay) closeOverlay();
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

// ==========================================
// NEW FIREBASE REALTIME WHATSAPP INTEGRATION
// ==========================================
window._unsubWaChats = null;
window._unsubActiveChat = null;
window._activeWaPhone = null;
window._waChatsList = [];

window.initFirebaseWaChats = function(overrideId = null) {
    let userIdToUse = overrideId || window.state.userProfile.id;
    window._currentActiveWaUserId = userIdToUse;
    if (window._unsubWaChats) window._unsubWaChats();
    
    // Populate admin switch if admin
    const switcher = document.getElementById('wa-admin-user-switcher');
    if (switcher && (window.state.userProfile.role === 'admin' || window.state.userProfile.role === 'supervisor') && window.state.users) {
        if (switcher.options.length === 0) {
            switcher.innerHTML = window.state.users.map(u => `<option value="${u.id}">${u.name || u.email}</option>`).join('');
            if (!overrideId) switcher.value = userIdToUse;
        }
    }
    
    // Check connection status directly from FB since we use Firebase RTDB
    const statDot = document.getElementById('wa-connection-status-dot');
    if (statDot && window.db) {
         window.dbRef = window.__fbRef || window.ref; // Ensure ref is resolved
         if (window._unsubStatus) window._unsubStatus();
         try {
             window._unsubStatus = onValue(window.dbRef(window.db || db, `whatsapp/sessions/${userIdToUse}`), (snap) => {
                 const sVal = snap.val();
                 if (sVal && sVal.status === 'connected') {
                     statDot.className = 'status-dot connected';
                     statDot.title = 'متصل بخادم واتساب';
                 } else {
                     statDot.className = 'status-dot disconnected';
                     statDot.title = 'الواتساب غير متصل';
                 }
             });
         } catch(e) {}
    }
    
    // We get the db import directly from main.js scope implicitly, wait, no, db is a module scoped variable.
    // We can access window.state or dispatch a global event, or just since we are writing inside main.js and db is imported, we can use it! Wait!
    // Since I appended to the end of main.js, I can access `db`, `ref`, `onValue`!
    
    try {
        const _ref = window.__fbRef || window.dbRef; // main.js imports ref as ref, but it's module scoped.
        // It's safer to use the globally exposed window.db or fallback to using the module's exported db if available.
        // Let's assume `db` and `ref` and `onValue` are in scope since we are at the bottom of the same file.
        const waRef = ref(db, `whatsapp/messages/${userIdToUse}`);
        
        window._unsubWaChats = onValue(waRef, (snapshot) => {
            const data = snapshot.val() || {};
            const listEl = document.getElementById('wa-chat-list');
            if(!listEl) return;
            
            const entries = [];
            for (const phone in data) {
                const messages = data[phone];
                const msgKeys = Object.keys(messages);
                if (msgKeys.length === 0) continue;
                
                // sort messages to find the latest
                msgKeys.sort((a,b) => messages[a].timestamp - messages[b].timestamp);
                const lastMsg = messages[msgKeys[msgKeys.length - 1]];
                
                entries.push({
                    phone: phone,
                    lastMessage: lastMsg,
                    timestamp: lastMsg.timestamp,
                    messagesObj: messages
                });
            }
            
            entries.sort((a,b) => b.timestamp - a.timestamp);
            window._waChatsList = entries;
            window.renderWaChatsList();
        });
    } catch (e) {
        console.error("Firebase WA init error (module scope issue):", e);
    }
};

window.renderWaChatsList = function() {
    const listEl = document.getElementById('wa-chat-list');
    const searchVal = (document.getElementById('wa-chat-search')?.value || '').toLowerCase();
    
    if (window._waChatsList.length === 0) {
        listEl.innerHTML = '<div style="text-align:center; padding: 30px; color: var(--text-dim);">لا توجد محادثات حتى الآن.</div>';
        return;
    }
    
    let html = '';
    const bookings = window.state.bookings || [];
    
    window._waChatsList.forEach(chat => {
        const booking = bookings.find(b => b.phone && b.phone.replace(/\\D/g, '').includes(chat.phone.substring(3)));
        const name = booking ? booking.name : chat.phone;
        
        if (searchVal && !name.toLowerCase().includes(searchVal) && !chat.phone.includes(searchVal)) return;

        let lastMsgStr = '';
        if (chat.lastMessage.isMe) lastMsgStr += '<i class="fas fa-check' + (chat.lastMessage.ack >= 2 ? '-double" style="color:#53bdeb"' : '"') + '></i> ';
        lastMsgStr += chat.lastMessage.body || '';
        
        const timeStr = new Date(chat.lastMessage.timestamp * 1000).toLocaleTimeString('ar-SA', {hour: '2-digit', minute:'2-digit', timeZone: 'Asia/Riyadh'});
        
        // Count unread
        let unreadCount = 0;
        Object.values(chat.messagesObj).forEach(m => {
            if (!m.isMe && (!m.readAt && m.ack !== 3)) unreadCount++; // Naive approach
        });

        html += `
            <div class="wa-chat-item ${window._activeWaPhone === chat.phone ? 'active' : ''}" onclick="window.openWaChatFromFirebase('${chat.phone}', '${name}')">
                <div class="wa-item-avatar"><i class="fas fa-user"></i></div>
                <div class="wa-item-content">
                    <div class="wa-item-top">
                        <h4 class="wa-item-name">${name}</h4>
                        <span class="wa-item-time">${timeStr}</span>
                    </div>
                    <div class="wa-item-bottom">
                        <p class="wa-item-lastmsg">${lastMsgStr}</p>
                        ${unreadCount > 0 ? `<div class="wa-unread-badge">${unreadCount}</div>` : ''}
                    </div>
                </div>
            </div>
        `;
    });
    
    listEl.innerHTML = html;
};

window.filterWaChats = function() {
    window.renderWaChatsList();
};

window.openWaChatFromFirebase = function(phone, name) {
    window._activeWaPhone = phone;
    document.getElementById('wa-chat-empty').style.display = 'none';
    document.getElementById('wa-active-chat-name').innerText = name || phone;
    document.getElementById('wa-active-chat-status').innerText = phone;
    const activeChat = document.getElementById('wa-chat-active');
    activeChat.style.display = 'flex';
    
    window.renderWaChatsList(); // Update active class
    
    let userIdToUse = window._currentActiveWaUserId || window.state.userProfile.id;
    if (window._unsubActiveChat) window._unsubActiveChat();
    
    const waRef = ref(db, `whatsapp/messages/${userIdToUse}/${phone}`);
    window._unsubActiveChat = onValue(waRef, (snapshot) => {
        const data = snapshot.val() || {};
        const chatBox = document.getElementById('wa-server-chat-box');
        
        const msgKeys = Object.keys(data);
        msgKeys.sort((a,b) => data[a].timestamp - data[b].timestamp);
        
        let html = '<div class="chat-security-hint" style="text-align:center; margin:10px 0;"><span style="background:var(--bg-card); padding:5px 15px; border-radius:10px; font-size:12px; color:var(--text-dim); box-shadow:0 1px 3px rgba(0,0,0,0.1);"><i class="fas fa-lock"></i> رسائل مشفرة</span></div>';
        
        msgKeys.forEach(k => {
            const m = data[k];
            const timeStr = new Date(m.timestamp * 1000).toLocaleTimeString('ar-SA', {hour: '2-digit', minute:'2-digit', timeZone: 'Asia/Riyadh'});
            const sideClass = m.isMe ? 'me' : 'them';
            
            let ticks = '';
            if (m.isMe) {
                if (m.ack === 1 || m.ack === 0) ticks = '<i class="fas fa-check" style="font-size:11px; color:#999;"></i>';
                else if (m.ack === 2) ticks = '<i class="fas fa-check-double" style="font-size:11px; color:#999;"></i>';
                else if (m.ack >= 3) ticks = '<i class="fas fa-check-double" style="font-size:11px; color:#53bdeb;"></i>';
            }

            let safeBody = (m.body || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            safeBody = safeBody.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="color:#027eb5; text-decoration:underline;">$1</a>');
            
            let contentStr = `<div>${safeBody}</div>`;
            
            // if we have media, currently it must be downloaded via api or displayed. For now, since Firebase only has flag 'hasMedia'
            if (m.hasMedia) {
                 contentStr = `
                    <div id="cont-dl-${m.id}" class="media-dl-box" style="background:rgba(0,0,0,0.05); padding:10px; border-radius:8px; display:flex; align-items:center; gap:10px; margin-bottom:5px;">
                        <i class="fas fa-file-download" style="font-size:24px; color:var(--text-dim);"></i>
                        <div style="flex:1;">
                            <strong style="display:block; font-size:13px;">مرفق وسائط</strong>
                        </div>
                        <button class="btn-premium btn-sm" onclick="window.downloadWAMedia('${userIdToUse}', '${phone}', '${m.id}', 'cont-dl-${m.id}', 'unknown', '${m.type}')"><i class="fas fa-download"></i></button>
                    </div>` + contentStr;
            }

            html += `
                <div class="chat-bubble ${sideClass}" style="${m.isMe ? 'background:#dcf8c6;align-self:flex-start;' : 'background:#fff;align-self:flex-end;'}">
                    ${contentStr}
                    <div class="chat-time" style="font-size:10px; color:#999; margin-top:4px; text-align:left;">
                        <span>${timeStr}</span>
                        ${ticks}
                    </div>
                </div>
            `;
        });
        
        const isAtBottom = chatBox.scrollHeight - chatBox.scrollTop - chatBox.clientHeight < 100;
        chatBox.innerHTML = html;
        if (isAtBottom) setTimeout(() => chatBox.scrollTo(0, chatBox.scrollHeight), 50);
    });
};

window.sendServerWAMessageToActiveChat = async function() {
    if (!window._activeWaPhone) return;
    const input = document.getElementById('wa-server-input');
    const msg = input.value.trim();
    if (!msg) return;
    
    input.value = '';
    
    let userIdToUse = window._currentActiveWaUserId || window.state.userProfile.id;
    const activeUrl = window._waServerActiveUrl || CURRENT_MASTER_URL;
    
    try {
        await fetch(`${activeUrl}/api/send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: 'session-' + userIdToUse,
                phone: window._activeWaPhone,
                message: msg
            })
        });
    } catch(err) {
        console.error(err);
        window.showLuxuryToast('خطأ في الاتصال بالخادم', 'error');
    }
};

window.handleWAMediaSelectForActiveChat = function() {
    if (!window._activeWaPhone) return;
    const input = document.getElementById('wa-media-upload');
    const file = input.files && input.files[0];
    if(!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const base64 = e.target.result.split(',')[1];
        let note = prompt('رسالة للإرفاق؟', '');
        if (note === null) { input.value = ''; return; }
        
        let userIdToUse = window._currentActiveWaUserId || window.state.userProfile.id;
        const activeUrl = window._waServerActiveUrl || CURRENT_MASTER_URL;
        fetch(`${activeUrl}/api/send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: 'session-' + userIdToUse,
                phone: window._activeWaPhone,
                message: note,
                media: { data: base64, mimetype: file.type, filename: file.name }
            })
        });
        input.value = '';
    };
    reader.readAsDataURL(file);
};

window.stopWARecordingActiveChat = function() {
    if (!window._waRecordingIntent) return;
    window.stopWARecording(window._activeWaPhone, window._currentActiveWaUserId || window.state.userProfile.id);
};

// Override tab switching specifically for whatsapp-chat to load FB early
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const chatTabBtn = document.querySelector('[data-tab="whatsapp-chat"]');
        if(chatTabBtn) {
            chatTabBtn.addEventListener('click', () => {
                if(window.initFirebaseWaChats) window.initFirebaseWaChats();
            });
        }
    }, 1000);
});


