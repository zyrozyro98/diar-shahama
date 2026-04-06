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
};

function pushHistoryState(type) {
  if (history.state?.type !== type) {
    history.pushState({ type }, "");
  }
}

window.normalizePhone = function (phone) {
  if (!phone) return "";
  let clean = phone.toString().replace(/\D/g, "");
  if (clean.startsWith("0")) clean = "966" + clean.substring(1);
  else if (clean.startsWith("5")) clean = "966" + clean;
  else if (!clean.startsWith("966") && clean.length > 0) clean = "966" + clean;
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
  const privatePaths = ["bookings", "notifications", "logs"];
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

  if (btn) {
    document.querySelectorAll(".sub-tab.b-filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // Manage deep-submenu visibility
    document.querySelectorAll(".deep-submenu").forEach(sm => sm.classList.remove("active"));
    const parentGroup = btn.closest(".status-group");
    if (parentGroup) {
      const deepMenu = parentGroup.querySelector(".deep-submenu");
      if (deepMenu) {
        deepMenu.classList.add("active");
      }
    }
  }

  if (subBtn) {
    document.querySelectorAll(".deep-tab").forEach(b => b.classList.remove("active"));
    subBtn.classList.add("active");
  } else if (btn) {
    document.querySelectorAll(".deep-tab").forEach(b => b.classList.remove("active"));
  }

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
  for (let i = 1; i <= pages; i++) {
    html += `<button class="p-btn ${i === page ? 'active' : ''}" onclick="window.state.inventoryPage=${i}; window.applyInventoryFilters(); window.scrollTo({top: document.getElementById('inventory').offsetTop - 100, behavior:'smooth'})">${i}</button>`;
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

  container.innerHTML = window.state.reviews.map(r => `
    <div class="review-card-v2">
        <div class="review-stars">
            ${'<i class="fas fa-star"></i>'.repeat(Number(r.rating || 5))}
        </div>
        <p class="review-text">"${r.text}"</p>
        <div class="review-author">
           <div class="review-author-avatar">${(r.name || "U").charAt(0)}</div>
           <div class="review-author-info">
              <strong>${r.name}</strong>
              <span>عميل مُحقّق <i class="fas fa-check-circle"></i></span>
           </div>
        </div>
    </div>
  `).join("");
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
    <div class="details-luxury-container animate-fade-in-v2">
      <div class="details-top-v4">
        <div class="details-header-v3">
          <div class="d-badge-row">
            <span class="badge-v3 status ${stClass}">${statusLabel}</span>
            <span class="badge-v3 year">${item.customerType === 'company' ? 'شركة' : 'فرد'}</span>
            <span class="badge-v3" style="background:var(--p-copper-glow); color:var(--p-copper);">رقم الطلب: #${item.id.slice(-6).toUpperCase()}</span>
          </div>
          <h1 class="luxury-font">${item.name || "بدون اسم"}</h1>
          <p class="car-subtitle-v5">رقم الجوال: <a href="tel:${item.phone}" style="color:var(--p-copper); text-decoration:none;">${item.phone}</a></p>
        </div>
      </div>
      <div class="details-main-split" style="display: flex; gap: 20px; flex-wrap: wrap;">
        <!-- العمود الأول: بيانات العميل -->
        <div class="details-info-v4" style="flex: 1; min-width: 280px;">
          <div class="specs-grid-v4-compact">
            <div class="spec-card-v5">
               <i class="fas fa-car"></i>
               <div class="s-info"><span>السيارة المطلوبة</span><strong>${item.carRequested || "غير محدد"}</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-globe"></i>
               <div class="s-info"><span>الجنسية / المدينة</span><strong>${item.nationality || "-"} / ${item.city || "-"}</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-money-bill-wave"></i>
               <div class="s-info"><span>طريقة الشراء</span><strong>${item.paymentMethod || "-"} ${item.paymentMethod === 'بنك' ? `(${item.bankName || "-"})` : ""}</strong></div>
            </div>
            ${item.paymentMethod === 'بنك' ? `
            <div class="spec-card-v5">
               <i class="fas fa-calendar-alt"></i>
               <div class="s-info"><span>مدة الأقساط</span><strong>${item.installmentPeriod || "-"}</strong></div>
            </div>` : ""}
            <div class="spec-card-v5">
               <i class="fas fa-wallet"></i>
               <div class="s-info"><span>الراتب</span><strong>${item.salary || "-"} ريال</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-file-invoice-dollar"></i>
               <div class="s-info"><span>الالتزامات</span><strong>${item.commitments || "-"} ريال</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-building"></i>
               <div class="s-info"><span>جهة العمل</span><strong>${item.workEntity || "-"} (${item.workStatus || "-"})</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-clock"></i>
               <div class="s-info"><span>وقت التواصل</span><strong>${item.preferredTime || "-"}</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-user-tie"></i>
               <div class="s-info"><span>الموظف</span><strong>${staffName}</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-user"></i>
               <div class="s-info"><span>العمر</span><strong>${item.age || "-"} سنة</strong></div>
            </div>
            ${item.email ? `
            <div class="spec-card-v5">
               <i class="fas fa-envelope"></i>
               <div class="s-info"><span>البريد</span><strong>${item.email}</strong></div>
            </div>` : ""}
          </div>
          
          <div class="desc-card-v5" style="margin-top: 20px;">
            <h3><i class="fas fa-sticky-note"></i> ملاحظات العميل وطلبه</h3>
            <div class="desc-text-v5">
              ${(item.notes || "لا يوجد ملاحظات").replace(/\n/g, '<br>')}
            </div>
          </div>

          <div class="booking-action-card" style="margin-top:20px; padding:20px; background:rgba(255,255,255,0.03); border-radius:12px; border:1px solid var(--glass-border);">
              <h3 style="margin-bottom:15px; color:var(--p-copper); display:flex; align-items:center; gap:10px;"><i class="fas fa-edit"></i> تحديث حالة الطلب والاتصال</h3>
              <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:15px; margin-bottom:15px;">
                  <div class="f-group" style="margin:0;">
                      <label style="font-size:12px; opacity:0.7;">الحالة الرئيسية</label>
                      <select id="update-booking-status" class="filter-select" style="width:100%;" onchange="window.updateSubStatusOptions(this.value)">
                          <option value="new" ${item.status === 'new' ? 'selected' : ''}>جديد</option>
                          <option value="waiting" ${item.status === 'waiting' ? 'selected' : ''}>بالانتظار</option>
                          <option value="inquiry" ${item.status === 'inquiry' ? 'selected' : ''}>استفسار</option>
                          <option value="sold" ${item.status === 'sold' ? 'selected' : ''}>مكتمل</option>
                          <option value="rejected" ${item.status === 'rejected' ? 'selected' : ''}>مرفوض</option>
                      </select>
                  </div>
                  <div class="f-group" style="margin:0;">
                      <label style="font-size:12px; opacity:0.7;">الحالة التفصيلية</label>
                      <select id="update-booking-substatus" class="filter-select" style="width:100%;">
                          <!-- يتم التعبئة عبر JavaScript -->
                      </select>
                  </div>
              </div>
              <button onclick="window.updateBookingQuickStatus('${item.id}')" class="btn-premium" style="width:100%; padding:12px; border:none; font-weight:bold;">حفظ التغييرات <i class="fas fa-save" style="margin-right:8px;"></i></button>
          </div>
          
          <div class="details-footer-actions-v3" style="margin-top:20px;">
             <!-- الزر سيقوم الآن بتحديث الـ iframe بدلاً من فتح نافذة جديدة إن أردنا، أو الحفاظ عليه -->
             <button onclick="document.getElementById('wa-iframe').src='https://web.whatsapp.com/send?phone=${window.normalizePhone ? window.normalizePhone(item.phone) : item.phone}'" class="btn-luxury-v2 wa-btn" style="border:none; cursor:pointer;">
               <i class="fab fa-whatsapp"></i>
               <div class="btn-txt">
                 <strong>إعادة تحميل واتساب</strong>
                 <span>للاتصال بالعميل هنا</span>
               </div>
             </button>
             <a href="tel:${item.phone}" class="btn-luxury-v2 call-btn">
               <i class="fas fa-phone-alt"></i>
               <div class="btn-txt">
                 <strong>اتصال هاتفي</strong>
                 <span>الاتصال بالعميل</span>
               </div>
             </a>
          </div>
        </div>

        <!-- العمود الثاني: واجهة الدردشة المبرمجة مع السيرفر الاحترافي -->
        <div class="details-wa-v4" style="flex: 1.5; min-width: 280px; display: flex; flex-direction: column; background: var(--card-bg); border-radius: 12px; border: 1px solid var(--glass-border); overflow: hidden;">
            <div style="background: #00a884; color: white; padding: 10px 20px; display: flex; align-items: center; gap: 10px;">
               <i class="fab fa-whatsapp" style="font-size: 24px;"></i>
               <h3 style="margin: 0; font-size: 16px; font-weight: bold; font-family: inherit;">محادثة العميل عبر الخادم</h3>
               <button class="btn-premium btn-sm" style="margin-right: auto; padding: 5px 12px; font-size: 12px; background: rgba(0,0,0,0.2); color:white; border:none;" onclick="window.fetchServerWAChat('${item.phone}', '${item.assignedTo || ''}')">تحديث الدردشة <i class="fas fa-sync-alt"></i></button>
            </div>
            <div id="wa-server-chat-box" style="flex-grow: 1; height: 500px; background: #e5ddd5; position: relative; overflow-y:auto; padding:15px; display:flex; flex-direction:column; gap:10px;">
               <div style="text-align:center; color:gray; background:rgba(255,255,255,0.7); max-width:80%; margin:0 auto; padding:8px 15px; border-radius:12px; font-size:12px;">جاري الاتصال بالخادم الداخلي لجلب المحادثة...</div>
            </div>
            <div style="padding: 10px; display:flex; gap:10px; background: var(--card-bg); border-top: 1px solid var(--glass-border); align-items:center;">
               <input type="text" id="wa-server-input" placeholder="اكتب رسالة للعميل للرد باسم الموظف..." style="flex:1; padding:12px; border-radius:30px; border:1px solid var(--glass-border); background:var(--bg-main); color:var(--text-color); outline:none;" onkeydown="if(event.key==='Enter') window.sendServerWAMessage('${item.phone}', '${item.assignedTo || ''}')">
               <button onclick="window.sendServerWAMessage('${item.phone}', '${item.assignedTo || ''}')" class="btn-premium" style="border:none; border-radius:50%; width:45px; height:45px; flex-shrink:0; cursor:pointer; background:#00a884; display:flex; justify-content:center; align-items:center;"><i class="fas fa-paper-plane" style="margin-right:4px;"></i></button>
            </div>
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
    
    // Auto-fetch WhatsApp server chat
    setTimeout(() => {
       if (window.fetchServerWAChat) window.fetchServerWAChat(item.phone, item.assignedTo || '');
       if (window.updateSubStatusOptions) window.updateSubStatusOptions(item.status || 'new', item.subStatus || 'not_contacted');
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
  const subStatus = document.getElementById("update-booking-substatus")?.value;
  if (!status || !id) return;

  try {
    const bRef = ref(db, `bookings/${id}`);
    await update(bRef, {
      status,
      subStatus,
      updatedAt: new Date().toISOString()
    });
    window.showLuxuryToast("تم تحديث حالة الطلب بنجاح");
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
        if (window.db) {
            try {
                const { ref, set } = window.firebaseDatabase;
                await set(ref(window.db, 'settings/waServerUrl'), url);
            } catch(e) {}
        }
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

window.syncAdminTables = function (type) {
  if (type === "all") {
    const modules = ["cars", "ads", "sales", "bookings", "users", "plates", "reviews", "partners", "brands", "locations", "blogs", "whatsapp-monitor"];
    modules.forEach(t => window.syncAdminTables(t));
    return;
  }

  if (type === "whatsapp-monitor") {
    window.renderWhatsAppMonitor();
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
      const content = (item.make || item.title || item.name || item.model || "").toLowerCase();
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
    const filter = window.state.bookingFilter || "all";
    const subFilter = window.state.bookingSubStatusFilter || "all";

    if (filter !== "all") {
      items = items.filter(i => i.status === filter || (!i.status && filter === "new"));
    }
    if (subFilter !== "all") {
      items = items.filter(i => i.subStatus === subFilter);
    }

    // Staff Role Filtering
    const isAdmin = window.state.userProfile?.role === "admin" || window.state.userProfile?.role === "supervisor";
    if (!isAdmin && window.state.user) {
      items = items.filter(i => i.assignedTo === window.state.user.uid);
    }
  }

  items.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

  if (items.length === 0) {
    table.innerHTML = '<div class="no-data-admin" style="padding:40px; text-align:center; opacity:0.5;">لا توجد بيانات حالياً</div>';
    return;
  }

  table.innerHTML = items.map(item => renderAdminItemRow(type, item)).join("");
};

function renderAdminItemRow(type, item) {
  const isAdmin = window.state.userProfile?.role === "admin";
  const statusClass = item.status === "sold" ? "danger" : item.status === "available" ? "success" : "warning";
  const statusLabel = item.status === "sold" ? "مباع" : item.status === "available" ? "متاح" : "محجوز";

  if (type === "bookings") {
    const staff = window.state.users.find(u => u.id === item.assignedTo)?.name || "غير محدد";
    return `
            <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:12px; border:1px solid var(--glass-border); margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                <div class="admin-item-info">
                    <strong style="display:block; font-size:16px;">${item.name || item.phone}</strong>
                    <div class="meta-row" style="font-size:12px; color:var(--text-dim); margin-top:5px;">
                        <span><i class="fas fa-car"></i> ${item.carOrCompany || item.carRequested || "-"}</span> | 
                        <span><i class="fas fa-user-tie"></i> ${staff}</span>
                    </div>
                </div>
                <div class="admin-actions" style="display:flex; gap:10px; align-items:center;">
                    <span class="badge-${statusClass}" style="font-size:10px; padding:3px 8px; border-radius:5px;">${item.status || "جديد"}</span>
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
                    <button class="icon-btn-lite" onclick="window.editLuxuryItem('cars', '${item.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                    ${isAdmin ? `<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('cars', '${item.id}')" title="حذف"><i class="fas fa-trash"></i></button>` : ""}
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
                    <button class="icon-btn-lite" onclick="window.editLuxuryItem('plates', '${item.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                    ${isAdmin ? `<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('plates', '${item.id}')" title="حذف"><i class="fas fa-trash"></i></button>` : ""}
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
    cancelled: bookings.filter(b => b.status === "cancelled").length,
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
      { name: "name", label: "اسم العميل", type: "text" },
      { name: "text", label: "التعليق/الرأي", type: "textarea" },
      { name: "rating", label: "التقييم (1-5)", type: "number" }
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
          { v: "new", t: "جديد" }, { v: "waiting", t: "بالانتظار" }, { v: "inquiry", t: "استفسار" }, { v: "sold", t: "مكتمل" }, { v: "rejected", t: "مرفوض" }
        ]
      },
      {
        name: "subStatus", label: "الحالة التفصيلية", type: "select", options: [
          { v: "not_contacted", t: "لم يتم التواصل" }, { v: "contacted", t: "تم التواصل" },
          { v: "docs_received", t: "تم استلام الاوراق" }, { v: "waiting_calc", t: "انتظار رد العميل" },
          { v: "waiting_docs", t: "إنتظار إكمال الاوراق" }, { v: "waiting_signature", t: "إنتظار توقيع العميل" },
          { v: "docs_not_received", t: "لم يتم استلام الاوراق" }
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
    let mediaHtml = "";
    const url = (video.url || "").trim();

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      let vidId = "";
      if (url.includes("v=")) vidId = url.split("v=")[1].split("&")[0];
      else vidId = url.split("/").pop();

      mediaHtml = `
            <div class="video-inner">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${vidId}?modestbranding=1&rel=0" frameborder="0" allowfullscreen></iframe>
            </div>`;
    } else {
      mediaHtml = `
            <div class="video-inner" onclick="const v = this.querySelector('video'); if(v.paused) v.play(); else v.pause();">
                <video poster="${video.poster || "logo.jpg"}" preload="none">
                    <source src="${url}" type="video/mp4">
                </video>
                <div class="v-play-overlay">
                    <div class="v-play-btn"><i class="fas fa-play"></i></div>
                </div>
            </div>`;
    }

    return `
            <div class="video-card-v2" data-aos="zoom-in">
                <div class="video-player-wrap">
                    ${mediaHtml}
                </div>
                <div class="video-info-v2">
                    <span class="v-badge-gold"><i class="fas fa-award"></i> مبيعات ناجحة</span>
                    <h3>${video.title || video.name || "لحظة تسليم"}</h3>
                    <p>${video.description || "يسعدنا دائماً مشاركة لحظات نجاحنا مع عملائنا الكرام."}</p>
                </div>
            </div>
        `;
  }).join("");
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
    phone: document.getElementById("b-phone")?.value || "",
    age: document.getElementById("b-age")?.value || "",
    email: document.getElementById("b-email")?.value || "",
    nationality: document.getElementById("b-nationality")?.value || "سعودي",
    city: document.getElementById("b-city")?.value || "",
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
const CURRENT_MASTER_URL = "https://context-ground-overnight-russia.trycloudflare.com";
const WA_SERVER_URL = window.WA_SERVER_URL_OVERRIDE || localStorage.getItem('wa_server_url') || CURRENT_MASTER_URL;

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
    if (window.db) {
        try {
            const { ref, get } = window.firebaseDatabase;
            const snapshot = await get(ref(window.db, 'settings/waServerUrl'));
            if (snapshot.exists()) {
                globalUrl = snapshot.val();
                localStorage.setItem('wa_server_url', globalUrl);
            }
        } catch(e) {}
    }

    const FINAL_WA_URL = globalUrl || localStorage.getItem('wa_server_url') || CURRENT_MASTER_URL;
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
            const sel = document.getElementById('wa-staff-select');
            const statusEl = document.getElementById('wa-server-status');
            const qrContainer = document.getElementById('wa-qr-container');
            const qrCanvas = document.getElementById('wa-qr-canvas');
            
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
            if(window._currentWaPhone && data.from.includes(window._currentWaPhone.replace(/\D/g, ''))) {
                 window.fetchServerWAChat(window._currentWaPhone, data.userId); 
            }
        });
    }
};

window.startCurrentWASession = function() {
    if(!window.state.user) return;
    
    const emitStart = () => {
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
       window.initWhatsAppServer();
    }
};

window.logoutCurrentWASession = function() {
    if(!window.state.user) return;
    if(confirm('هل أنت متأكد من تسجيل الخروج من واتساب؟ لن تتمكن من المراسلة من هنا.')) {
        if(waSocketContainer) waSocketContainer.emit('logout_session', { userId: window.state.user.uid });
    }
};

window.fetchServerWAChat = async function(phone, staffId) {
    if(!phone) return;
    const chatBox = document.getElementById('wa-server-chat-box');
    if(!chatBox) return;
    
    // تحديد رقم الموظف بناء على الصلاحية
    let userIdToUse = window.state.userProfile.id;
    if (window.state.userProfile.role === 'admin') {
       if (staffId) {
           userIdToUse = staffId;
       } else {
           chatBox.innerHTML = '<div style="text-align:center; color:gray; font-size:12px; margin-top:20px; padding:20px; background:rgba(255,255,255,0.8); border-radius:10px;">هذا الحجز غير مسند لأي موظف. يرجى إسناد الحجز أولاً لموظف محدد ليتم عرض سجل المحادثات الخاص به.</div>';
           return;
       }
    }

    window._currentWaPhone = phone;
    chatBox.innerHTML = '<div style="text-align:center; color:gray; font-size:12px; margin-top:20px;">جاري جلب المحادثة من الخادم...</div>';
    
    try {
        const activeUrl = window._waServerActiveUrl || CURRENT_MASTER_URL;
        const response = await fetch(`${activeUrl}/api/chat/${userIdToUse}/${phone}`);
        if(response.ok) {
            const data = await response.json();
            if(data.messages && data.messages.length > 0) {
                chatBox.innerHTML = '';
                // No reverse: older at top, newer at bottom
                data.messages.forEach(m => {
                    const timeStr = m.timestamp ? new Date(m.timestamp * 1000).toLocaleTimeString('ar-SA', {hour: '2-digit', minute:'2-digit'}) : '';
                    let safeBody = (m.body || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                    
                    const div = document.createElement('div');
                    div.style.padding = '8px 12px';
                    div.style.maxWidth = '80%';
                    div.style.fontSize = '14px';
                    div.style.marginBottom = '8px';
                    div.style.position = 'relative';
                    div.style.boxShadow = '0 1px 1px rgba(0,0,0,0.1)';
                    div.style.whiteSpace = 'pre-wrap';
                    
                    if(m.isMe) {
                        div.style.alignSelf = 'flex-end';
                        div.style.background = '#dcf8c6';
                        div.style.color = '#000';
                        div.style.borderRadius = '10px 0 10px 10px';
                    } else {
                        div.style.alignSelf = 'flex-start';
                        div.style.background = '#fff';
                        div.style.color = '#000';
                        div.style.borderRadius = '0 10px 10px 10px';
                    }
                    
                    let content = `<div>${safeBody}</div>`;
                    if (m.media) {
                        if (m.media.mimetype.startsWith('image/')) {
                            content = `<img src="data:${m.media.mimetype};base64,${m.media.data}" style="max-width:100%; border-radius:8px; margin-bottom:5px; cursor:pointer;" onclick="window.viewFullImage(this.src)">` + (safeBody ? `<div>${safeBody}</div>` : '');
                        } else if (m.media.mimetype.startsWith('audio/') || m.type === 'ptt') {
                            content = `<audio controls style="max-width:100%; max-height:35px; margin-top:5px;"><source src="data:${m.media.mimetype};base64,${m.media.data}" type="${m.media.mimetype}"></audio>` + (safeBody ? `<div>${safeBody}</div>` : '');
                        }
                    }
                    
                    div.innerHTML = `${content} <div style="display:flex; justify-content:flex-end; align-items:center; gap:3px; margin-top:2px;">
                      <span style="font-size:10px; color:rgba(0,0,0,0.45);">${timeStr}</span>
                      ${m.isMe ? '<i class="fas fa-check-double" style="font-size:10px; color:#53bdeb;"></i>' : ''}
                    </div>`;

                    chatBox.appendChild(div);
                });
                
                // Allow DOM to update then scroll to bottom
                setTimeout(() => {
                    chatBox.scrollTop = chatBox.scrollHeight;
                }, 100);
                
            } else {
                chatBox.innerHTML = '<div style="text-align:center; color:gray; font-size:12px; margin-top:20px; padding:20px; background:rgba(0,0,0,0.05); border-radius:12px;">لا توجد رسائل سابقة مع هذا الرقم. يمكنك بدء دردشة جديدة الآن.</div>';
            }
        } else {
            chatBox.innerHTML = `
                <div style="text-align:center; color:var(--text-dim); font-size:14px; margin-top:40px; padding:30px;">
                    <i class="fab fa-whatsapp" style="font-size:50px; margin-bottom:15px; opacity:0.3;"></i>
                    <p>خادم واتساب غير متصل لهذا الموظف</p>
                    <button class="btn-premium btn-sm" style="margin-top:15px;" onclick="window.switchLuxuryTab('whatsapp-mgmt')">اذهب لربط الواتساب</button>
                </div>
            `;
        }
    } catch(err) {
        chatBox.innerHTML = `<div style="text-align:center; color:red; font-size:12px; margin-top:20px;">فشل الاتصال بالخادم. يرجى التأكد من تشغيل السيرفر.</div>`;
    }
};

window.sendServerWAMessage = async function(phone, staffId) {
    const input = document.getElementById('wa-server-input');
    if(!input || !input.value.trim()) return;
    
    let userIdToUse = window.state.userProfile.id;
    if (window.state.userProfile.role === 'admin' && staffId) userIdToUse = staffId;

    const message = input.value.trim();
    input.value = 'جاري الإرسال...';
    input.disabled = true;

    try {
        const activeUrl = window._waServerActiveUrl || CURRENT_MASTER_URL;
        const response = await fetch(`${activeUrl}/api/send`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ userId: userIdToUse, phone, message })
        });
        
        if(response.ok) {
            input.value = '';
            setTimeout(() => window.fetchServerWAChat(phone, userIdToUse), 500);
        } else {
            window.showLuxuryToast('الواتساب غير متصل في الإدارة، المرجو فحص الاتصال', 'error');
            input.value = message;
        }
    } catch(err) {
        window.showLuxuryToast('الخادم البرمجي مغلق', 'error');
        input.value = message;
    } finally {
        input.disabled = false;
        input.focus();
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

