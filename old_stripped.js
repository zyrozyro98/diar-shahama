import { db, auth, storage, analytics } from "";
import {
  ref, onValue, set, push, update, remove, get, increment, runTransaction
} from "";
import {
  signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail, setPersistence, browserLocalPersistence
} from "";
import {
  ref as storageRef, uploadBytes, getDownloadURL
} from "";

// =========================================================================================
// GLOBAL STATE & CONSTANTS
// =========================================================================================
import "";

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
  lang: localStorage.getItem("") || "",
  soundEnabled: localStorage.getItem("") !== "",
  tempImages: [],
  bookingFilter: "",
  bookingSubStatusFilter: "",
  currentReportPeriod: "",
  firstLoadDone: false,
  inventoryPage: 1,
  inventorySize: 8,
  sliderIndex: 0
};

const i18n = {
  ar: {
    welcome: "",
    inventory: "",
    totalCars: "",
    totalBookings: "",
    totalValue: "",
    searchPlaceholder: "",
    loading: "",
    noResults: "",
    applyNow: "",
    details: "",
    back: "",
    save: "",
    delete: "",
    edit: "",
    cancel: "",
    successMsg: "",
    errorMsg: "",
    staff: "",
    admin: "",
    supervisor: ""
  },
  en: {
    welcome: "",
    inventory: "",
    totalCars: "",
    totalBookings: "",
    totalValue: "",
    searchPlaceholder: "",
    loading: "",
    noResults: "",
    applyNow: "",
    details: "",
    back: "",
    save: "",
    delete: "",
    edit: "",
    cancel: "",
    successMsg: "",
    errorMsg: "",
    staff: "",
    admin: "",
    supervisor: ""
  }
};

// =========================================================================================
// UTILITIES & UI HELPERS
// =========================================================================================

window.showLuxuryToast = function (message, type = "") {
  const container = document.getElementById("");
  if (!container) return;

  const toast = document.createElement("");
  toast.className = "";
  toast.style.cssText = "";

  const icon = type === "" ? "" : "";
  toast.innerHTML = "";
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "";
    toast.style.transform = "";
    toast.style.transition = "";
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
        const canvas = document.createElement("");
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
        const ctx = canvas.getContext("");
        ctx.drawImage(img, 0, 0, width, height);
        // Using image/jpeg for better compression
        resolve(canvas.toDataURL("", quality));
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};


window.openModal = function (id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove("");
    document.body.style.overflow = "";

    // Auto-stacking z-index to ensure top modal gets interactions
    const openModals = document.querySelectorAll("");
    el.style.zIndex = 2000 + (openModals.length * 10);

    pushHistoryState("");
  }
};

window.closeModal = function (id, isPopState = false) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.add("");
    el.style.zIndex = ""; // Reset z-index

    if (!isPopState && history.state?.type === "") {
      history.back();
    }

    const anyModalOpen = !!document.querySelector("");
    if (!anyModalOpen) document.body.style.overflow = "";
  }
};

window.setModalTitle = function (id, title) {
  const el = document.getElementById(id + "");
  if (el) el.innerText = title;
};

window.switchLuxuryTab = function (tabId) {
  const allTabs = document.querySelectorAll("");
  const allBtns = document.querySelectorAll("");

  allTabs.forEach(t => t.classList.add(""));
  allBtns.forEach(b => b.classList.remove(""));

  const targetTab = document.getElementById(tabId);
  const targetBtn = document.querySelector("");

  if (targetTab) {
    targetTab.classList.remove("");
    targetTab.classList.add("");
    targetTab.style.animation = "";
  }
  if (targetBtn) targetBtn.classList.add("");

  // Toggle Submenus
  const bookingsSub = document.getElementById("");
  if (bookingsSub) {
    bookingsSub.classList.toggle("", tabId === "" || tabId === "");
  }

  if (window.innerWidth < 1024) {
    const sidebar = document.querySelector("");
    if (sidebar) sidebar.classList.remove("");
  }

  // Specialized Initializations
  if (tabId === "" && window.initWhatsAppServer) {
    window.initWhatsAppServer();
  }
  if (tabId === "") {
    window.startCurrentWASession();
  }
  if (tabId === "" && window.renderQuickRepliesAdmin) {
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
  
  // If it""s @s.whatsapp.net
  // For @lid, we might want to keep it or handle it carefully. 
  // However, according to the user request to "", we should prioritize numbers.
  if (phoneStr.includes("")) {
      return phoneStr.split("")[0].replace(/\D/g, "");
  }
  
  if (phoneStr.includes("")) {
      // If we have an LID, we keep it as is for now so the backend can resolve it,
      // but the user wants to stop LID. So if we see @lid, we just pass it through 
      // and let resolveLidToJid handle it.
      return phoneStr; 
  }

  let clean = phoneStr.replace(/\D/g, "");
  
  // Handle cases like 96605... or 96707...
  if (clean.startsWith("")) clean = "" + clean.substring(4);
  else if (clean.startsWith("")) clean = "" + clean.substring(4);

  if (clean.startsWith("") || clean.startsWith("")) return clean;

  if (clean.startsWith("")) return "" + clean.substring(1);
  if (clean.startsWith("")) return "" + clean.substring(1);
  if (clean.startsWith("")) return "" + clean.substring(1);

  if (clean.length === 9) {
      if (clean.startsWith("")) return "" + clean;
      if (clean.startsWith("")) return "" + clean;
  }
  
  return clean;
};

// =========================================================================================
// INITIALIZATION & AUTH
// =========================================================================================

document.addEventListener("", () => {
  initTheme();
  updateLanguageUI();
  initFirebase();
  window.trackVisit();
  initUIListeners();
});

function initUIListeners() {
  // Mobile Nav Toggle Logic
  const mobileBtn = document.querySelector("");
  const navMenu = document.querySelector("");
  const navOverlay = document.querySelector("");
  const closeMenuBtn = document.querySelector("");

  const toggleMenu = (forceClose = false) => {
    const isOpening = forceClose === false ? !navMenu.classList.contains("") : false;
    navMenu.classList.toggle("", isOpening);
    navOverlay.classList.toggle("", isOpening);
    document.body.style.overflow = isOpening ? "" : "";
    
    const icon = mobileBtn?.querySelector("");
    if (icon) icon.className = isOpening ? "" : "";
  };

  if (mobileBtn) mobileBtn.onclick = () => toggleMenu();
  if (navOverlay) navOverlay.onclick = () => toggleMenu(true);
  if (closeMenuBtn) closeMenuBtn.onclick = () => toggleMenu(true);

  // Close menu when clicking link
  document.querySelectorAll("").forEach(link => {
    link.addEventListener("", () => toggleMenu(true));
  });

  // Set mobile menu title
  const mTitle = document.querySelector("");
  if (mTitle && window.__DYNAMIC_NAME_AR__) mTitle.innerText = window.__DYNAMIC_NAME_AR__;

  // Admin Trigger
  const adminTrigger = document.getElementById("");
  if (adminTrigger) {
    adminTrigger.onclick = (e) => {
      e.preventDefault();
      window.openModal("");
    };
  }

  // Theme Toggle
  const themeBtn = document.getElementById("");
  if (themeBtn) {
    themeBtn.onclick = () => {
      const current = document.body.getAttribute("") || "";
      const next = current === "" ? "" : "";
      document.body.setAttribute("", next);
      localStorage.setItem("", next);
      themeBtn.innerHTML = next === "" ? "" : "";
    };
  }

  // Lang Toggle
  const langBtn = document.getElementById("");
  if (langBtn) {
    langBtn.onclick = () => {
      window.state.lang = window.state.lang === "" ? "" : "";
      localStorage.setItem("", window.state.lang);
      updateLanguageUI();
      window.applyInventoryFilters();
      langBtn.innerText = window.state.lang === "" ? "" : "";
    };
  }

  // Admin Tabs
  document.querySelectorAll("").forEach(btn => {
    btn.onclick = () => window.switchLuxuryTab(btn.dataset.tab);
  });

  // Search Inputs
  const invSearch = document.getElementById("");
  if (invSearch) invSearch.oninput = () => window.applyInventoryFilters();

  const invFilters = ["", "", "", ""];
  invFilters.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.onchange = () => {
      window.state.inventoryPage = 1; // Reset to page 1 on filter change
      window.applyInventoryFilters();
    };
  });

  // Slider Navigation
  const pPrev = document.getElementById("");
  const pNext = document.getElementById("");
  if (pPrev) pPrev.onclick = () => window.moveLuxurySlider(-1);
  if (pNext) pNext.onclick = () => window.moveLuxurySlider(1);

  // Auto-slide every 5s if possible
  setInterval(() => {
    const splash = document.getElementById("");
    if (!splash || splash.classList.contains("")) {
      window.moveLuxurySlider(1);
    }
  }, 5000);

  // Calculator Listeners
  const calcFields = ["", "", ""];
  calcFields.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.oninput = () => window.calculateLuxuryFinancing();
    if (el && el.tagName === "") el.onchange = () => window.calculateLuxuryFinancing();
  });

  // Modal Closers
  document.querySelectorAll("").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const modal = btn.closest("");
      if (modal) {
        // If we are closing the admin modal while logged in, confirm first
        if (modal.id === "" && window.state.user) {
          if (!confirm("")) return;
        }
        window.closeModal(modal.id);
      }
    };
  });

  // Handle outside click to close (only top-most)
  window.onclick = (e) => {
    // Emoji picker close on outside click
    const emojiPicker = document.getElementById("");
    if (emojiPicker && emojiPicker.style.display !== "") {
      const isSmileIcon = e.target.closest("") !== null;
      const isInsidePicker = emojiPicker.contains(e.target);
      if (!isSmileIcon && !isInsidePicker) {
        emojiPicker.style.display = "";
      }
    }

    const openModals = Array.from(document.querySelectorAll(""));
    if (openModals.length > 0) {
      const topModal = openModals[openModals.length - 1];
      if (e.target === topModal) {
        // Confirm for admin modal
        if (topModal.id === "" && window.state.user) {
          if (!confirm("")) return;
        }
        window.closeModal(topModal.id);
      }
    }
  };

  // Browser Back Button Listener
  window.addEventListener("", (e) => {
    const modals = document.querySelectorAll("");
    if (modals.length > 0) {
      // Find which modal corresponds to the state we just left? 
      // Simplified: Close the latest open modal that isn""<i class=""></i>""<i class=""></i>""admin-modal""<option value="">جميع الحالات الفرعية</option>""${status}""${subStatus}""s set to display:none in style.css or parent
  const section = document.getElementById("");
  if (section) section.style.display = "";

  container.innerHTML = cars.map(car => "").join("");
}

function renderPagination(total, page, size) {
  const container = document.getElementById("");
  if (!container) return;

  const pages = Math.ceil(total / size);
  if (pages <= 1) {
    container.innerHTML = "";
    return;
  }

  let html = "";
  
  if (page > 1) {
    html += "";
  }

  for (let i = 1; i <= pages; i++) {
    html += "";
  }

  if (page < pages) {
    html += "";
  }
  
  container.innerHTML = html;
}

window.renderPartners = function () {
  const container = document.getElementById("");
  if (!container || !window.state.partners) return;

  container.innerHTML = window.state.partners.map(p => "").join("");
};

window.renderPublicReviews = function () {
  const container = document.getElementById("");
  if (!container || !window.state.reviews) return;

  if (window.state.reviews.length === 0) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = window.state.reviews.map(r => {
    const avatar = r.avatar || r.image || "";
    const name = r.name || "";
    const carTag = r.car ? "" : "";
    
    return ""<img src="" style="">"";
  }).join("");
};

window.renderCarGrid = function (cars) {
  const grid = document.getElementById("");
  if (!grid) return;

  if (cars.length === 0) {
    grid.innerHTML = "";
    return;
  }

  grid.innerHTML = cars.map(car => "").join("");
}

window.viewLuxuryCar = function (id) {
  const car = window.state.cars.find(c => c.id === id);
  if (!car) return;

  const modal = document.getElementById("");
  if (!modal) return;

  // Handle images better
  let images = car.images || [];
  if (images.length === 0 && car.image) images = [car.image];
  if (images.length === 0) images = [""];

  const waNumber = window.normalizePhone(window.state.settings.contactSales || "");
  const waText = "";
  const waLink = "";

  const detailsContent = ""
          <div class="">
            ${images.map((img, i) => "").join("")}
          </div>
          "";

  const body = document.getElementById("");
  if (body) {
    body.innerHTML = detailsContent;
    body.scrollTop = 0; // Reset scroll position to top
    
    // Reset modal container scroll position to prevent old scroll from carrying over
    const modalEl = document.getElementById("");
    if (modalEl) {
      modalEl.scrollTop = 0;
      const modalInner = modalEl.querySelector("");
      if (modalInner) modalInner.scrollTop = 0;
    }

    window.openModal("");
  }
  window.trackCarView(id);
};

window.bookCar = function (id) {
  const car = window.state.cars.find(c => c.id === id);
  if (!car) return;

  const bCar = document.getElementById("");
  if (bCar) {
    bCar.value = "";
    // Force trigger any listeners if needed, though most inputs will just work
  }

  window.closeModal("");

  const bookingSec = document.getElementById("");
  if (bookingSec) {
    bookingSec.scrollIntoView({ behavior: "" });
    // Add a slight highlight effect to the input
    if (bCar) {
      bCar.focus();
      bCar.style.borderColor = "";
      setTimeout(() => bCar.style.borderColor = "", 2000);
    }
  }
};

window.viewBookingDetails = function (id) {
  const item = (window.state.bookings || []).find(i => i.id === id);
  if (!item) return;

  const staffName = window.state.users.find(u => u.id === item.assignedTo)?.name || "";
  const statusLabel = item.status === "" ? "" : item.status === "" ? "" : item.status === "" ? "" : item.status === "" ? "" : "";
  const stClass = item.status === "" ? "" : item.status === "" ? "" : "";
  const statusMap = {
    new: "",
    waiting: "",
    inquiry: "",
    sold: "",
    rejected: "",
    available: ""
  };

  const detailsContent = ""<option value="" ${k === (item.status || "") ? "" : ""}>${v}</option>"";

  const body = document.getElementById("");
  if (body) {
    body.innerHTML = detailsContent;
    body.scrollTop = 0;
    const modalEl = document.getElementById("");
    if (modalEl) modalEl.scrollTop = 0;
    window.openModal("");
    
    // Auto-fetch WhatsApp server chat && Register modern emoji picker
    setTimeout(() => {
       if (window.fetchServerWAChat) window.fetchServerWAChat(item.waJid || item.phone, item.assignedTo || "");
       if (window.updateSubStatusOptions) window.updateSubStatusOptions(item.status || "", item.subStatus || "");
       if (window.renderQuickRepliesBar) window.renderQuickRepliesBar();
       
       const picker = document.querySelector("");
       if (picker) {
           picker.addEventListener("", event => {
               const input = document.getElementById("");
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
  const select = document.getElementById("");
  if (!select) return;

  const options = {
    new: [{ v: "", t: "" }, { v: "", t: "" }],
    waiting: [
      { v: "", t: "" }, { v: "", t: "" },
      { v: "", t: "" }, { v: "", t: "" }
    ],
    inquiry: [{ v: "", t: "" }],
    sold: [{ v: "", t: "" }, { v: "", t: "" }],
    rejected: [
      { v: "", t: "" }, { v: "", t: "" },
      { v: "", t: "" }, { v: "", t: "" },
      { v: "", t: "" }
    ]
  };

  const list = options[status] || [{ v: "", t: "" }];
  select.innerHTML = list.map(opt => "").join("");
};

window.updateBookingQuickStatus = async function (id) {
  const status = document.getElementById("")?.value;
  const subStatus = document.getElementById("")?.value || "";
  const additionalDetails = document.getElementById("")?.value || "";
  
  if (!status || !id) return;

  try {
    const bRef = ref(db, "");
    await update(bRef, {
      status,
      subStatus,
      additionalDetails,
      updatedAt: new Date().toISOString()
    });
    window.showLuxuryToast("");
    // Modal will stay open, but state will sync via onValue and syncAdminTables will be called automatically
  } catch (err) {
    console.error(err);
    window.showLuxuryToast("", "");
  }
};

window.saveWAServerURL = async function() {
    const url = document.getElementById("")?.value;
    if (url) {
        localStorage.setItem("", url);
        try {
            await set(ref(db, ""), url);
        } catch(e) { console.error("", e); }
        window.showLuxuryToast("");
        setTimeout(() => location.reload(), 1500);
    }
};

window.setLuxuryDetailImg = function (wrapper, src) {
  document.getElementById("").src = src;
  document.querySelectorAll("").forEach(w => w.classList.remove(""));
  wrapper.classList.add("");
};

window.switchLuxuryDetailImg = function (carId, dir) {
  const car = window.state.cars.find(c => c.id === carId);
  if (!car) return;
  const images = car.images || [car.image || ""];
  const currentImg = document.getElementById("").src;

  // Find current index
  let idx = images.findIndex(img => currentImg.includes(img));
  if (idx === -1) idx = 0;

  let nextIdx = (idx + dir + images.length) % images.length;
  const newSrc = images[nextIdx];

  document.getElementById("").src = newSrc;

  // Sync thumbnails
  const thumbs = document.querySelectorAll("");
  if (thumbs[nextIdx]) {
    thumbs.forEach(w => w.classList.remove(""));
    thumbs[nextIdx].classList.add("");
  }
};



window.openFullscreenGallery = function (id, activeSrc) {
  const car = window.state.cars.find(c => c.id === id);
  if (!car) return;
  const images = car.images || [car.image || ""];

  const viewer = document.createElement("");
  viewer.className = "";
  viewer.innerHTML = ""<img src="" class="" onclick="">"";
  document.body.appendChild(viewer);
};

window.navLightbox = function (id, dir) {
  const car = window.state.cars.find(c => c.id === id);
  const images = car.images || [car.image || ""];
  const mainImg = document.getElementById("");
  let currentIdx = images.indexOf(mainImg.src);
  if (currentIdx === -1) currentIdx = 0;

  let newIdx = currentIdx + dir;
  if (newIdx < 0) newIdx = images.length - 1;
  if (newIdx >= images.length) newIdx = 0;

  mainImg.src = images[newIdx];
  const thumbs = document.querySelectorAll("");
  thumbs.forEach(t => t.classList.remove(""));
  thumbs[newIdx].classList.add("");
};

window.trackCarView = async function (id) {
  if (!id) return;
  try {
    const countRef = ref(db, "");
    await runTransaction(countRef, (current) => {
      return (current || 0) + 1;
    });
  } catch (e) {
    console.error("", e);
  }
};

window.resetFilters = function () {
  const fields = ["", "", "", "", ""];
  fields.forEach(f => {
    const el = document.getElementById(f);
    if (el) el.value = el.tagName === "" ? (f === "" ? "" : "") : "";
  });
  window.applyInventoryFilters();
};

window.trackVisit = async function () {
  try {
    const today = new Date().toISOString().split("")[0];
    if (localStorage.getItem("" + today)) return;
    localStorage.setItem("" + today, "");

    const analyticsRef = ref(db, "");
    await runTransaction(analyticsRef, (data) => {
      if (!data) data = { totalVisits: 0, dailyVisits: {}, browsers: {}, devices: {}, popularCars: {} };

      data.totalVisits = (data.totalVisits || 0) + 1;
      data.dailyVisits = data.dailyVisits || {};
      data.dailyVisits[today] = (data.dailyVisits[today] || 0) + 1;

      const ua = navigator.userAgent;
      let browser = "";
      if (ua.includes("")) browser = "";
      else if (ua.includes("")) browser = "";
      else if (ua.includes("")) browser = "";
      else if (ua.includes("")) browser = "";

      data.browsers = data.browsers || {};
      data.browsers[browser] = (data.browsers[browser] || 0) + 1;

      const device = /iPhone|iPad|iPod|Android/i.test(ua) ? "" : "";
      data.devices = data.devices || {};
      data.devices[device] = (data.devices[device] || 0) + 1;

      return data;
    });
  } catch (e) {
    console.error("", e);
  }
};
// =========================================================================================
// AUTH & ACCOUNT MANAGEMENT
// =========================================================================================

window.loginAdmin = async function (e) {
  e.preventDefault();
  const email = document.getElementById("")?.value;
  const pass = document.getElementById("")?.value;
  const btn = e.target.querySelector("");

  if (!email || !pass) return window.showLuxuryToast("", "");

  const originalBtnText = btn.innerText;
  btn.innerText = "";
  btn.disabled = true;

  try {
    await signInWithEmailAndPassword(auth, email, pass);
    window.showLuxuryToast("");
    window.createLog("", "", "");
    window.closeModal("");
  } catch (err) {
    console.error(err);
    window.showLuxuryToast("", "");
  } finally {
    btn.innerText = originalBtnText;
    btn.disabled = false;
  }
};

window.logout = async function () {
  if (confirm("")) {
    await window.createLog("", "", "");
    await signOut(auth);
    window.showLuxuryToast("");
  }
};

// =========================================================================================
// SETTINGS & BRANDING
// =========================================================================================

window.applySettings = function (s) {
  if (!s) return;
  const root = document.documentElement;

  if (s.primaryColor) {
    root.style.setProperty("", s.primaryColor);
    root.style.setProperty("", s.primaryColor + "");
  }
  if (s.secondaryColor) root.style.setProperty("", s.secondaryColor);
  if (s.accentColor) root.style.setProperty("", s.accentColor);

  const logo = s.logo || "";
  document.querySelectorAll("").forEach(img => {
    img.src = logo;
  });

  const nameAr = s.nameAr || "";
  const nameEn = s.nameEn || "";
  const currentName = window.state.lang === "" ? nameAr : nameEn;

  document.querySelectorAll("").forEach(el => el.innerText = nameAr);
  document.querySelectorAll("").forEach(el => el.innerText = nameEn);

  document.title = currentName + "" + (window.state.lang === "" ? "" : "");

  if (s.fontFamily) {
    root.style.setProperty("", s.fontFamily);
    document.body.style.fontFamily = s.fontFamily;
  }
  if (s.borderRadius) {
    root.style.setProperty("", s.borderRadius);
    const styleId = "";
    let style = document.getElementById(styleId);
    if (!style) {
      style = document.createElement("");
      style.id = styleId;
      document.head.appendChild(style);
    }
    style.innerHTML = "";
  }

  // 1. Guest-facing Dynamic UI
  const aboutText = document.getElementById("");
  if (aboutText) aboutText.innerText = s.aboutUs || "";

  const locationText = document.getElementById("");
  if (locationText) locationText.innerText = s.location || "";

  const phoneAdmin = document.getElementById("");
  if (phoneAdmin) phoneAdmin.innerText = s.contactAdmin || "";

  const phoneSales = document.getElementById("");
  if (phoneSales) phoneSales.innerText = s.contactSales || "";

  const phoneInfo = document.getElementById("");
  if (phoneInfo) phoneInfo.innerText = s.contactComplaints || "";

  const emailDisp = document.getElementById("");
  if (emailDisp) emailDisp.innerText = s.contactEmail || "";

  const locLink = document.getElementById("");
  if (locLink) locLink.href = s.locationUrl || "";

  // Meta Tags & Social
  const metaTitle = document.getElementById("");
  if (metaTitle) metaTitle.innerText = "";
  const metaDesc = document.getElementById("");
  if (metaDesc) metaDesc.setAttribute("", s.metaDesc || "");

  const socMapping = { "": s.socialInsta, "": s.socialSnap, "": s.socialTwitter };
  Object.entries(socMapping).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.href = val || "";
  });

  // 2. Admin-facing Settings Form (Two-way binding)
  const formMapping = {
    "": s.nameAr || "",
    "": s.nameEn || "",
    "": s.primaryColor || "",
    "": s.secondaryColor || "",
    "": s.accentColor || "",
    "": s.defaultTheme || "",
    "": s.fontFamily || "",
    "": s.borderRadius || "",
    "": s.contactAdmin || "",
    "": s.contactSales || "",
    "": s.contactComplaints || "",
    "": s.contactEmail || "",
    "": s.aboutUs || "",
    "": s.locationUrl || "",
    "": s.location || "",
    "": s.socialInsta || "",
    "": s.socialSnap || "",
    "": s.socialTwitter || ""
  };
  Object.entries(formMapping).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.value = val;
  });

  const maintenanceEl = document.getElementById("");
  if (maintenanceEl) maintenanceEl.checked = s.maintenanceMode || false;

  const logoPreview = document.getElementById("");
  if (logoPreview) logoPreview.src = logo;

  localStorage.setItem("", JSON.stringify(s));
};

window.resetToDefaultSettings = async function () {
  if (confirm("")) {
    const defaults = {
      nameAr: "", nameEn: "", primaryColor: "", secondaryColor: "",
      accentColor: "", defaultTheme: "", borderRadius: "", logo: "",
      aboutUs: "", location: ""
    };
    await set(ref(db, ""), defaults);
    window.showLuxuryToast("");
  }
};

window.markAllNotificationsRead = async function () {
  try {
    const refs = window.state.notifications.map(n => update(ref(db, ""), { read: true }));
    await Promise.all(refs);
    window.showLuxuryToast("");
  } catch (e) {
    console.error(e);
  }
};

window.switchSettingsTab = function (tabId, btn) {
  document.querySelectorAll("").forEach(p => p.classList.add(""));
  document.querySelectorAll("").forEach(t => t.classList.remove(""));

  const target = document.getElementById(tabId);
  if (target) target.classList.remove("");
  if (btn) btn.classList.add("");
};

window.previewLogo = async function (input) {
  if (input.files && input.files[0]) {
    try {
      const b64 = await window.compressImage(input.files[0], 400, 400, 0.8);
      document.getElementById("").src = b64;
      document.getElementById("").value = b64;
    } catch (e) {
      console.error("", e);
    }
  }
};


window.saveAppSettings = async function () {
  const btn = document.querySelector("");
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = "";
  }

  const s = {
    nameAr: document.getElementById("")?.value,
    nameEn: document.getElementById("")?.value,
    logo: document.getElementById("")?.value || window.state.settings.logo || "",
    primaryColor: document.getElementById("")?.value,
    secondaryColor: document.getElementById("")?.value,
    accentColor: document.getElementById("")?.value,
    defaultTheme: document.getElementById("")?.value,
    fontFamily: document.getElementById("")?.value,
    borderRadius: document.getElementById("")?.value,
    contactAdmin: document.getElementById("")?.value,
    contactSales: document.getElementById("")?.value,
    contactComplaints: document.getElementById("")?.value,
    contactEmail: document.getElementById("")?.value,
    aboutUs: document.getElementById("")?.value,
    locationUrl: document.getElementById("")?.value,
    location: document.getElementById("")?.value,
    socialInsta: document.getElementById("")?.value,
    socialSnap: document.getElementById("")?.value,
    socialTwitter: document.getElementById("")?.value,
    maintenanceMode: document.getElementById("")?.checked || false,
    updatedAt: new Date().toISOString()
  };

  try {
    await set(ref(db, ""), s);
    window.showLuxuryToast("");
    window.createLog("", "", "");
  } catch (e) {
    window.showLuxuryToast("", "");
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = "";
    }
  }
};

// =========================================================================================
// ADMIN TABLES & STATISTICS
// =========================================================================================

window.filterUsersByRole = function(role, btn) {
    if (btn) {
        document.querySelectorAll("").forEach(b => b.classList.remove(""));
        btn.classList.add("");
    }
    window.state.userRoleFilter = role;
    window.syncAdminTables("");
};

window.syncAdminTables = function (type) {
  if (type === "") {
    const modules = ["", "", "", "", "", "", "", "", "", "", "", "", ""];
    modules.forEach(t => window.syncAdminTables(t));
    return;
  }

  if (type === "") {
    window.renderWhatsAppMonitor();
    return;
  }
  
  if (type === "" || type === "") {
    if(window.renderQuickRepliesAdmin) window.renderQuickRepliesAdmin();
    if(window.renderQuickRepliesBar) window.renderQuickRepliesBar();
    return;
  }

  const table = document.getElementById("");
  if (!table) return;

  let items = window.state[type] || [];

  // Filtering Logic
  const searchQuery = (document.getElementById("")?.value ||
    document.getElementById("")?.value ||
    document.getElementById("")?.value || "").toLowerCase();

  if (searchQuery) {
    items = items.filter(item => {
      const content = (item.make || item.title || item.name || item.model || item.phone || item.carRequested || item.carOrCompany || "").toLowerCase();
      return content.includes(searchQuery);
    });
  }

  // Type-specific filters
  if (type === "") {
    const makeFilter = document.getElementById("");
    if (makeFilter && makeFilter.options.length <= 1 && window.state.cars.length > 0) {
      const makes = [...new Set(window.state.cars.map(c => c.make))].sort();
      makes.forEach(m => {
        const opt = document.createElement("");
        opt.value = m; opt.textContent = m;
        makeFilter.appendChild(opt);
      });
    }

    const statusF = document.getElementById("")?.value || "";
    const makeF = document.getElementById("")?.value || "";

    if (statusF !== "") items = items.filter(i => i.status === statusF);
    if (makeF !== "") items = items.filter(i => i.make === makeF);
  }
  if (type === "") {
    const staffSelect = document.getElementById("");
    if (staffSelect && staffSelect.options.length <= 1 && window.state.users) {
      window.state.users.forEach(u => {
        if (u.role === "" || u.role === "" || u.role === "") {
          const opt = document.createElement("");
          opt.value = u.id; opt.textContent = u.name || u.email || "";
          staffSelect.appendChild(opt);
        }
      });
    }

    const subStatusSelect = document.getElementById("");
    if (subStatusSelect && subStatusSelect.options.length <= 1) {
       window.setBookingFilter(window.state.bookingFilter || "", null, window.state.bookingSubStatusFilter || "");
       return; 
    }

    const filter = document.getElementById("")?.value || window.state.bookingFilter || "";
    const subFilter = document.getElementById("")?.value || window.state.bookingSubStatusFilter || "";
    const staffFilter = document.getElementById("")?.value || "";
    const typeFilter = document.getElementById("")?.value || "";

    window.state.bookingFilter = filter;
    window.state.bookingSubStatusFilter = subFilter;

    if (filter !== "") {
      items = items.filter(i => {
        let s = i.status || "";
        if (filter === "" && (s === "" || s === "")) return true; 
        return s === filter;
      });
    }
    if (subFilter !== "") {
      items = items.filter(i => i.subStatus === subFilter);
    }
    if (staffFilter !== "") {
      items = items.filter(i => i.assignedTo === staffFilter);
    }
    if (typeFilter !== "") {
      items = items.filter(i => (i.customerType || "") === typeFilter);
    }

    // Staff Role Filtering override
    const isAdmin = window.state.userProfile?.role === "" || window.state.userProfile?.role === "";
    if (!isAdmin && window.state.user) {
      items = items.filter(i => i.assignedTo === window.state.user.uid);
    }
  }
  
  if (type === "") {
      const roleFilter = window.state.userRoleFilter || "";
      if (roleFilter !== "") {
          items = items.filter(u => u.role === roleFilter);
      }
      
      const statTotal = document.getElementById("");
      const statActive = document.getElementById("");
      const statAdmins = document.getElementById("");
      
      if (statTotal) statTotal.innerText = items.length;
      if (statActive) {
          statActive.innerText = items.filter(u => u.isAvailable).length;
          const lbl = statActive.nextElementSibling;
          if (lbl) lbl.innerText = "";
      }
      if (statAdmins) {
          const lbl = statAdmins.nextElementSibling;
          if (roleFilter === "") {
              statAdmins.innerText = items.filter(u => u.role === "").length;
              if (lbl) lbl.innerText = "";
          } else {
              statAdmins.innerText = items.length;
              const roleMapText = { "": "", "": "", "": "" };
              if (lbl) lbl.innerText = "" + (roleMapText[roleFilter] || "");
          }
      }
  }

  if (type === "") {
    const sortFilter = document.getElementById("")?.value || "";
    if (sortFilter === "") {
       items.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
    } else {
       items.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }
  } else {
    items.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  }

  if (items.length === 0) {
    table.innerHTML = "";
    return;
  }

  if (type === "") {
      const bookings = window.state.bookings || [];
      const isAdminUser = window.state.userProfile?.role === "";
      
      let html = "";
          
      items.forEach(item => {
          const uBookings = bookings.filter(b => b.assignedTo === item.id);
          const completed = uBookings.filter(b => b.status === "" || b.status === "").length;
          const ongoing = uBookings.filter(b => b.status === "" || b.status === "" || b.status === "" || !b.status).length;
          const rejected = uBookings.filter(b => b.status === "").length;
          
          const roleMap = { "": "", "": "", "": "" };
          const roleStr = roleMap[item.role] || "";
          const avatar = item.image || "";
          const phone = item.phone || "";
          
          let whatsappBtn = "";
          if (phone) {
             let cleanPhone = phone.replace(/\D/g, "");
             cleanPhone = window.normalizePhone(cleanPhone);
             whatsappBtn = "";
          }
          
          html += ""<span style="">${phone}</span>""<button class="" onclick="" title=""><i class=""></i></button>"";
      });
      html += "";
      table.innerHTML = html;
      return;
  }

  table.innerHTML = items.map(item => renderAdminItemRow(type, item)).join("");
};

function renderAdminItemRow(type, item) {
  const isAdmin = window.state.userProfile?.role === "" || window.state.userProfile?.role === "";
  const statusClass = item.status === "" ? "" : item.status === "" ? "" : "";
  const statusLabel = item.status === "" ? "" : item.status === "" ? "" : "";

  if (type === "") {
    const staff = window.state.users.find(u => u.id === item.assignedTo)?.name || "";
    const statusMap = { new: "", waiting: "", inquiry: "", sold: "", done: "", cancelled: "", rejected: "" };
    const subStatusMap = {
      not_contacted: "", contacted: "", docs_received: "",
      waiting_calc: "", waiting_docs: "", waiting_signature: "",
      docs_not_received: "", signed: "", delivered: "", done: "",
      no_response: "", obligations: "", calc_rejected: "",
      ineligible: "", duplicate: ""
    };
    const stClass = (item.status === "" || item.status === "") ? "" : (item.status === "" || item.status === "") ? "" : "";
    const displayedSub = item.subStatus ? (subStatusMap[item.subStatus] || item.subStatus) : "";

    return ""| <span style=""><i class=""></i> ${displayedSub}</span>""<button class="" onclick="" title="" aria-label=""><i class=""></i></button>"";
  }

  if (type === "") {
    return ""
                        <button class="" onclick="" title=""><i class=""></i></button>
                        <button class="" onclick="" title=""><i class=""></i></button>
                    "";
  }

  if (type === "") {
    return ""<button class="" onclick="" title="" aria-label=""><i class=""></i></button>"";
  }

  if (type === "") {
    return ""
                        <button class="" onclick="" title=""><i class=""></i></button>
                        <button class="" onclick="" title=""><i class=""></i></button>
                    "";
  }

  if (type === "") {
    const isRead = !!item.read;
    return ""
                <div class="">
                    <button class="" onclick="" title=""><i class=""></i></button>
                </div>
                "";
  }

  if (type === "") {
    return "";
  }

  if (type === "") {
    const url = (item.url || "").trim();
    let isYoutube = url.includes("") || url.includes("");
    let thumb = item.poster || item.image || null;
    if (isYoutube && !thumb) {
        let vidId = "";
        try {
            if (url.includes("")) vidId = url.split("")[1].split("")[0];
            else if (url.includes("")) vidId = url.split("")[1].split("")[0];
            else if (url.includes("")) vidId = url.split("")[1].split("")[0];
            else vidId = url.split("").pop().split("")[0];
        } catch (e) { vidId = ""; }
        if (vidId) thumb = "";
    }
    thumb = thumb || "";

    return ""
                        <button class="" onclick="" title=""><i class=""></i></button>
                        <button class="" onclick="" title=""><i class=""></i></button>
                    "";
  }

  if (type === "") {
    const rating = Number(item.rating || 5);
    const textPreview = item.text ? (item.text.length > 60 ? item.text.substring(0, 60) + "" : item.text) : "";
    const avatar = item.avatar || item.image || "";
    
    return ""<img src="" style="">""<span style=""><i class=""></i> ${item.car}</span>""
                    <button class="" onclick="" title=""><i class=""></i></button>
                    <button class="" onclick="" title=""><i class=""></i></button>
                "";
  }

  const title = item.make ? "" : (item.title || item.name || "");
  const thumb = item.image || item.logo || item.poster || null;

  return ""
                    <div style="">
                        <img src="" style="" onerror="">
                    </div>
                ""<span style="">${Number(item.price).toLocaleString()} ريال</span>""<span class="" style="">${statusLabel}</span>""<button class="" onclick="" title=""><i class=""></i></button>"";
}

window.updateStatistics = function () {
  const cCount = document.getElementById("");
  const bCount = document.getElementById("");
  const vStat = document.getElementById("");

  const cars = window.state.cars || [];
  let bookings = window.state.bookings || [];

  // Role-based statistics
  const isAdmin = window.state.userProfile?.role === "" || window.state.userProfile?.role === "";
  if (!isAdmin && window.state.user) {
    bookings = bookings.filter(b => b.assignedTo === window.state.user.uid);
  }

  if (cCount) cCount.innerText = cars.length;
  if (bCount) bCount.innerText = bookings.length;

  if (vStat) {
    const total = cars.reduce((sum, c) => sum + (parseFloat(c.price) || 0), 0);
    vStat.innerText = total.toLocaleString() + "";
  }

  // Detailed Booking Counters
  const counters = {
    all: bookings.length,
    new: bookings.filter(b => b.status === "" || !b.status).length,
    waiting: bookings.filter(b => b.status === "").length,
    inquiry: bookings.filter(b => b.status === "").length,
    sold: bookings.filter(b => b.status === "").length,
    done: bookings.filter(b => b.status === "").length,
    cancelled: bookings.filter(b => b.status === "" || b.status === "").length,
    sub: {
      not_contacted: bookings.filter(b => b.subStatus === "").length,
      contacted: bookings.filter(b => b.subStatus === "").length,
      docs_received: bookings.filter(b => b.subStatus === "").length,
      waiting_calc: bookings.filter(b => b.subStatus === "").length,
      waiting_docs: bookings.filter(b => b.subStatus === "").length,
      waiting_signature: bookings.filter(b => b.subStatus === "").length,
      docs_not_received: bookings.filter(b => b.subStatus === "").length,
      signed: bookings.filter(b => b.subStatus === "").length,
      delivered: bookings.filter(b => b.subStatus === "").length,
      done: bookings.filter(b => b.subStatus === "").length,
      no_response: bookings.filter(b => b.subStatus === "").length,
      obligations: bookings.filter(b => b.subStatus === "").length,
      calc_rejected: bookings.filter(b => b.subStatus === "").length,
      ineligible: bookings.filter(b => b.subStatus === "").length,
      duplicate: bookings.filter(b => b.subStatus === "").length
    }
  };

  Object.entries(counters).forEach(([key, val]) => {
    const el = document.getElementById("");
    if (el) el.innerText = val;
  });
  Object.entries(counters.sub).forEach(([key, val]) => {
    const el = document.getElementById("");
    if (el) el.innerText = val;
  });

  const bookingsBadge = document.getElementById("");
  if (bookingsBadge) {
    bookingsBadge.innerText = counters.new;
    bookingsBadge.classList.toggle("", counters.new === 0);
  }

  // Staff-Specific UI Refresh (Line 661+)
  const currentUid = window.state.user?.uid;
  const isStaff = window.state.userProfile?.role === "";

  if (isStaff && currentUid) {
    const staffPanel = document.getElementById("");
    if (staffPanel) staffPanel.classList.remove("");

    const myBookings = (window.state.bookings || []).filter(b => b.assignedTo === currentUid);
    const waiting = myBookings.filter(b => b.status === "" || !b.status).length;
    const total = myBookings.length;
    const completed = myBookings.filter(b => b.status === "").length;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

    const wCount = document.getElementById("");
    const aCount = document.getElementById("");
    const rCount = document.getElementById("");
    const aToggle = document.getElementById("");

    if (wCount) wCount.innerText = waiting;
    if (aCount) aCount.innerText = total;
    if (rCount) rCount.innerText = rate + "";
    if (aToggle) aToggle.checked = window.state.userProfile.isAvailable !== false;
  }
};

// =========================================================================================
// CRUD OPERATIONS
// =========================================================================================

window.deleteLuxuryItem = async function (type, id) {
  if (confirm("")) {
    try {
      await remove(ref(db, ""));
      window.showLuxuryToast("");
      window.createLog("", "", "");
    } catch (err) {
      window.showLuxuryToast("", "");
    }
  }
};

window.editLuxuryItem = function (type, id) {
  const item = (window.state[type] || []).find(i => i.id === id);
  if (!item) return;

  window.state.currentEdit = { type, id };
  const form = document.getElementById("");
  if (!form) return;

  // Initialize image manager state for cars
  if (type === "") {
    window.state.carImages = [];
    if (item.image) {
      window.state.carImages.push({ type: "", value: item.image, isMain: true });
    }
    if (item.images && Array.isArray(item.images)) {
      item.images.forEach(url => {
        if (url !== item.image) {
          window.state.carImages.push({ type: "", value: url, isMain: false });
        }
      });
    }
  }

  renderDynamicForm(type, item);

  window.setModalTitle("", "");
  window.openModal("");
};

window.openCRUDModal = function (type, id = null) {
  window.state.currentEdit = { type, id };
  const form = document.getElementById("");
  if (!form) return;

  const data = id ? (window.state[type]?.find(i => i.id === id) || {}) : {};
  
  // Initialize image manager state for cars
  if (type === "") {
    window.state.carImages = [];
    if (data.image) {
      window.state.carImages.push({ type: "", value: data.image, isMain: true });
    }
    if (data.images && Array.isArray(data.images)) {
      data.images.forEach(url => {
        if (url !== data.image) {
          window.state.carImages.push({ type: "", value: url, isMain: false });
        }
      });
    }
  }

  renderDynamicForm(type, data);

  window.setModalTitle("", id ? "" : "");
  window.openModal("");
};

function renderDynamicForm(type, data = {}) {
  const container = document.getElementById("");
  if (!container) return;

  let fields = [];
  if (type === "") {
    const brandOptions = (window.state.brands || []).map(b => ({ v: b.name, t: b.name }));
    fields = [
      { name: "", label: "", type: "", options: [{ v: "", t: "" }, ...brandOptions], required: true },
      { name: "", label: "", type: "", required: true },
      { name: "", label: "", type: "", required: true },
      { name: "", label: "", type: "", required: true },
      { name: "", label: "", type: "", required: true },
      { name: "", label: "", type: "", placeholder: "" },
      { name: "", label: "", type: "", options: [{ v: "", t: "" }, { v: "", t: "" }] },
      { name: "", label: "", type: "", options: [{ v: "", t: "" }, { v: "", t: "" }, { v: "", t: "" }, { v: "", t: "" }] },
      { name: "", label: "", type: "", options: [{ v: "", t: "" }, { v: "", t: "" }, { v: "", t: "" }, { v: "", t: "" }, { v: "", t: "" }] },
      { name: "", label: "", type: "" },
      { name: "", label: "", type: "" },
      { name: "", label: "", type: "", options: [{ v: "", t: "" }, { v: "", t: "" }, { v: "", t: "" }, { v: "", t: "" }] },
      { name: "", label: "", type: "", options: [{ v: false, t: "" }, { v: true, t: "" }] },
      { name: "", label: "", type: "" },
      { name: "", label: "", type: "", html: "" }
    ];
    setTimeout(() => window.renderCarImageManager(), 100);
  } else if (type === "") {
    fields = [
      { name: "", label: "", type: "" },
      { name: "", label: "", type: "" },
      { name: "", label: "", type: "" },
      { name: "", label: "", type: "" }
    ];
  } else if (type === "") {
    fields = [
      { name: "", label: "", type: "" },
      { name: "", label: "", type: "" },
      { name: "", label: "", type: "" },
      { name: "", label: "", type: "" }
    ];
  } else if (type === "") {
    fields = [
      { name: "", label: "", type: "", required: true, placeholder: "" },
      { name: "", label: "", type: "", placeholder: "" },
      { name: "", label: "", type: "", required: true, placeholder: "" },
      { name: "", label: "", type: "", placeholder: "" },
      { name: "", label: "", type: "", required: true, placeholder: "" }
    ];
  } else if (type === "") {
    fields = [
      { name: "", label: "", type: "" },
      { name: "", label: "", type: "" },
      { name: "", label: "", type: "" }
    ];
  } else if (type === "") {
    fields = [
      { name: "", label: "", type: "" },
      { name: "", label: "", type: "" }
    ];
  } else if (type === "") {
    fields = [
      { name: "", label: "", type: "" },
      { name: "", label: "", type: "" },
      { name: "", label: "", type: "" }
    ];
  } else if (type === "") {
    fields = [
      { name: "", label: "", type: "" },
      { name: "", label: "", type: "", options: [{ v: "", t: "" }, { v: "", t: "" }] }
    ];
  } else if (type === "") {
    fields = [
      { name: "", label: "", type: "" },
      { name: "", label: "", type: "" },
      { name: "", label: "", type: "" },
      { name: "", label: "", type: "", options: [{ v: "", t: "" }, { v: "", t: "" }] }
    ];
  } else if (type === "") {
    fields = [
      { name: "", label: "", type: "" },
      { name: "", label: "", type: "" }
    ];
  } else if (type === "") {
    fields = [
      { name: "", label: "", type: "" },
      { name: "", label: "", type: "" },
      { name: "", label: "", type: "" }
    ];
  } else if (type === "") {
    fields = [
      { name: "", label: "", type: "" },
      { name: "", label: "", type: "" },
      { name: "", label: "", type: "" },
      {
        name: "", label: "", type: "", options: [
          { v: "", t: "" }, { v: "", t: "" }, { v: "", t: "" }, { v: "", t: "" }, { v: "", t: "" }, { v: "", t: "" }
        ]
      },
      {
        name: "", label: "", type: "", options: [
          { v: "", t: "" }, { v: "", t: "" },
          { v: "", t: "" }, { v: "", t: "" },
          { v: "", t: "" }, { v: "", t: "" },
          { v: "", t: "" }, { v: "", t: "" },
          { v: "", t: "" }, { v: "", t: "" }, { v: "", t: "" },
          { v: "", t: "" }, { v: "", t: "" },
          { v: "", t: "" }, { v: "", t: "" }
        ]
      },
      { name: "", label: "", type: "", options: [{ v: "", t: "" }, ...window.state.users.filter(u => u.role === "").map(u => ({ v: u.id, t: u.name || u.email }))] },
      { name: "", label: "", type: "" }
    ];
  } else if (type === "") {
    fields = [
      { name: "", label: "", type: "" },
      { name: "", label: "", type: "" },
      { name: "", label: "", type: "", options: [{ v: "", t: "" }, { v: "", t: "" }, { v: "", t: "" }] },
      { name: "", label: "", type: "", options: [{ v: true, t: "" }, { v: false, t: "" }] }
    ];
  } else if (type === "") {
    fields = [
      { name: "", label: "", type: "", required: true, placeholder: "" },
      { name: "", label: "", type: "", required: true, placeholder: "" }
    ];
  } else if (type === "") {
    fields = [
      { name: "", label: "", type: "", required: true, placeholder: "" },
      { name: "", label: "", type: "", required: true, placeholder: "" },
      { name: "", label: "", type: "", placeholder: "" },
      { name: "", label: "", type: "", placeholder: "" }
    ];
  } else {
    // Default fallback fields for other types
    fields = [
      { name: "", label: "", type: "" },
      { name: "", label: "", type: "" }
    ];
  }

  container.innerHTML = ""
            <select name="" class="" ${requiredAttr}>
              ${f.options.map(opt => "").join("")}
            </select>
          ""<textarea name="" placeholder="" ${requiredAttr}>${val}</textarea>""
            <input type="" name="" ${f.multiple ? "" : ""} ${requiredAttr} accept="" class="">
            ${val ? "" : ""}
          ""<input type="" name="" value="" placeholder="" ${requiredAttr}>""
          <div class="">
            <label>${f.label} ${f.required ? "" : ""}</label>
            ${fieldHtml}
          </div>
        "";
}

// Image Manager Helpers
window.handleCarFileSelect = function (files) {
  if (!files) return;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    window.state.carImages.push({
      type: "",
      value: file,
      preview: URL.createObjectURL(file),
      isMain: window.state.carImages.length === 0
    });
  }
  window.renderCarImageManager();
};

window.renderCarImageManager = function () {
  const container = document.getElementById("");
  if (!container) return;

  const images = window.state.carImages || [];
  
  let html = ""
          <div class="">
            ${img.isMain ? "" : ""}
            <img src="" alt="">
            <div class="">
              <button type="" class="" onclick="" title="">
                <i class=""></i>
              </button>
              <button type="" class="" onclick="" title="">
                <i class=""></i>
              </button>
              <button type="" class="" onclick="" title="">
                <i class=""></i>
              </button>
              <button type="" class="" onclick="" title="">
                <i class=""></i>
              </button>
            </div>
          </div>
        "";
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
  const form = document.getElementById("");
  if (!form) return;

  const btn = form.querySelector("");
  const originalBtnText = btn.innerText;

  if (btn) {
    btn.disabled = true;
    btn.innerText = "";
  }

  const formData = new FormData(form);
  const data = {};
  formData.forEach((val, key) => {
    if (key !== "" && key !== "") {
      data[key] = val;
    }
  });

  try {
    // 1. Unified Image Manager Upload (Only for Cars)
    if (type === "") {
      const finalImageUrls = [];
      let mainImageUrl = "";

      const carImages = window.state.carImages || [];
      for (let i = 0; i < carImages.length; i++) {
        const img = carImages[i];
        let url = "";

        if (img.type === "") {
          url = img.value;
        } else if (img.type === "") {
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
    const imageFields = ["", "", "", ""];
    for (const field of imageFields) {
      if (data[field] instanceof File && data[field].size > 0) {
        data[field] = await window.compressImage(data[field], 1000, 1000, 0.7);
      } else if (data[field] instanceof File && data[field].size === 0) {
        // If it""تعديل""إضافة""<div class="" style=""><p>لا توجد نتائج مطابقة لبحثك</p></div>""quickReplies""${item.id}""quickReplies""${item.id}""<div class=""></div>""active""""rtl""<div class=""><p>لا توجد مقاطع فيديو متاحة حالياً</p></div>""${url}""logo.jpg""<div class=""><i class=""></i></div>""<div class=""><i class=""></i></div>""<div class=""><i class=""></i></div>""<div class=""><i class=""></i></div>""div""luxury-lightbox""video-lightbox""button[type=""]""""""05""5""9665""966""05""966""07""7""9677""967""07""967""00""[name=""]:checked""[name=""]:checked""[name=""]:checked""[name=""]:checked""bot""fa-robot""fa-user""logs""bookings""<div class="" style="">لا توجد سجلات مراقبة حالياً</div>""wa_server_url""wa-server-url-config""يرجى إدخال الرابط""error""settings/waServerUrl""wa_server_url""تم حفظ الرابط وبثه للجميع، سيتم تحديث الصفحة""success""خطأ في الصلاحيات لرفع الرابط""error""wa-staff-select""يرجى اختيار موظف للربط""error""wa-server-status""يتم الآن توليد كود الاستجابة للموظف...""wa-server-status""var(--text-dim)""wa-qr-container""none""start_session""wa-staff-select""يرجى اختيار الموظف أولاً""error""هل أنت متأكد من فصل رقم الواتساب لهذا الموظف وسجل المحادثة الخاصة به من السيرفر؟""logout_session""wa-server-url-config""app.github.dev""-5173""-3001""settings/waServerUrl""wa_server_url""wa_server_url""wa-staff-select""<option value="">-- اختر الموظف --</option>""staff""admin""supervisor""admin""مدير""supervisor""مشرف""موظف""selected""""موظف""join_room""join_room""undefined""polling""websocket""connect_error""Connection Error:""websocket error""عذراً، المتصفح لم يستطع الاتصال بخادم الواتساب. تأكد من أن الرابط يعمل في صفحة منفصلة. الخطأ: ""connect""Connected to WhatsApp Server!""wa-connection-dot""#4de265""0 0 5px #4de265""متصل بالسيرفر""join_room""qr""wa-staff-select""wa-server-status""wa-qr-container""wa-qr-canvas""في انتظار مسح كود الـ QR...""var(--text-color)""block""undefined""wa-my-status-title""wa-my-status-desc""wa-my-qr-container""wa-my-qr-canvas""btn-start-my-wa""btn-logout-my-wa""بانتظار مسح رمز QR...""افتح واتساب على هاتفك وامسح الرمز الظاهر أدناه ليتم ربط حسابك.""block""تحديث الرمز""none""undefined""ready""wa-staff-select""wa-connection-dot""#4de265""0 0 8px #4de265""واتساب جاهز للعمل""wa-server-status""wa-qr-container""#00a884""none""wa-my-status-title""wa-my-status-desc""wa-my-qr-container""btn-start-my-wa""btn-logout-my-wa""واتساب متصل بنجاح""حسابك الآن مرتبط بالنظام، يمكنك البدء في استقبال وإرسال الرسائل للعملاء.""none""none""inline-block""تم ربط حساب واتساب الخاص بك بنجاح""success""disconnected""Disconnected Event:""wa-connection-dot""#ff4b4b""0 0 5px #ff4b4b""تم قطع الاتصال بالسيرفر""تم قطع الاتصال بالسيرفر. يرجى إعادة الربط لتفعيل خدمات الدردشة.""wa-staff-select""wa-server-status""red""wa-my-status-title""wa-my-status-desc""btn-start-my-wa""btn-logout-my-wa""wa-my-qr-container""الواتساب غير متصل""none""inline-block""إعادة الربط الآن""none""jid_resolved""function""message""Real-time WA message received:""details-modal""hidden""wa-connection-dot""scale(1.2)""scale(1)""s an inbound message, CREATE LEAD
            if (!bookingFound && !data.isMe) {
                console.log("");
                try {
                    const newBooking = {
                        name: "",
                        phone: incomingPhoneStr,
                        waJid: data.from, // Store the JID immediately
                        carRequested: "",
                        status: "",
                        subStatus: "",
                        source: "",
                        assignedTo: data.userId || "", 
                        createdAt: new Date().toISOString(),
                        notes: "" + data.body
                    };
                    const pushRef = await push(ref(db, ""), newBooking);
                    bookingFound = { ...newBooking, id: pushRef.key };
                    window.showLuxuryToast("", "");
                } catch (err) {
                    console.error("", err);
                }
            }

            if(isModalOpen && currentWaStr && incomingPhoneStr === currentWaStr) {
                 setTimeout(() => {
                    window.fetchServerWAChat(window._currentWaPhone, data.userId); 
                 }, 500);
            } else {
                 if (data.isMe) return; 
                 const isForMe = data.userId === (window.state.userProfile?.id);
                 const isAdmin = window.state.userProfile?.role === "" || window.state.userProfile?.role === "";
                 if (isForMe || isAdmin) {
                     if (window.showWAPushNotification) window.showWAPushNotification(incomingPhoneStr, data.body, data.userId);
                 }
            }
        });
    }
};

window.showWAPushNotification = async function(phone, body, assignedUserId) {
    let container = document.getElementById("");
    if (!container) {
        container = document.createElement("");
        container.id = "";
        container.style.cssText = "";
        document.body.appendChild(container);
    }
    
    const bookings = window.state.bookings || [];
    const booking = bookings.find(b => b.phone && window.normalizePhone(b.phone) === window.normalizePhone(phone));
    const senderName = booking && booking.name ? booking.name : phone;
    
    let displayBody = body || "";
    if(displayBody.length > 70) displayBody = displayBody.substring(0, 70) + "";
    
    const popup = document.createElement("");
    popup.style.cssText = "";
    
    popup.innerHTML = "";
    
    const closeBtn = popup.querySelector("");
    closeBtn.onmouseover = () => closeBtn.style.color = "";
    closeBtn.onmouseout = () => closeBtn.style.color = "";
    
    const pushToNotificationsList = async () => {
        try {
            await push(ref(db, ""), {
                 userId: assignedUserId || window.state.userProfile?.id || "",
                 type: "",
                 title: "" + senderName,
                 body: displayBody,
                 phone: phone,
                 read: false,
                 createdAt: new Date().toISOString()
            });
        } catch(e) { console.warn("", e); }
    };
    
    let timeoutId = setTimeout(() => {
        closePopup();
        pushToNotificationsList();
    }, 10000);
    
    const closePopup = () => {
        popup.style.transform = "";
        popup.style.opacity = "";
        popup.style.marginTop = ""; // animate slide up for items below
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
                 const waTab = document.getElementById("").querySelector("");
                 if(waTab) waTab.click();
            }, 100);
        } else {
            window.showLuxuryToast("", "");
        }
    };
    
    // Insert at beginning creates bottom-up stack due to column-reverse
    container.insertBefore(popup, container.firstChild);
    
    requestAnimationFrame(() => {
        popup.style.transform = "";
        popup.style.opacity = "";
    });
};

window.startCurrentWASession = function() {
    if(!window.state.user) return;
    
    const emitStart = () => {
        waSocketContainer.emit("", { userId: window.state.user.uid });
        const statusTitle = document.getElementById("");
        const statusDesc = document.getElementById("");
        if (statusTitle) statusTitle.innerText = "";
        if (statusDesc) statusDesc.innerText = "";
    };

    if(waSocketContainer) {
        if (waSocketContainer.connected) {
            emitStart();
        } else {
            waSocketContainer.once("", emitStart);
            waSocketContainer.connect();
        }
    } else {
       window.initWhatsAppServer();
    }
};

window.logoutCurrentWASession = function() {
    if(!window.state.user) return;
    if(confirm("")) {
        if(waSocketContainer) waSocketContainer.emit("", { userId: window.state.user.uid });
    }
};

window._waMediaCache = window._waMediaCache || {};

window.fetchServerWAChat = async function(phone, staffId) {
    if(!phone) return;
    const chatBox = document.getElementById("");
    if(!chatBox) return;
    
    // Determine which staff member""admin""supervisor""fa-circle-notch""fa-comment-dots""<div style=""><i class="" style=""></i><br><div style="">جاري مزامنة الرسائل...</div></div>""""div""<span style=""><i class="" style=""></i> الرسائل محمية ومسجلة عبر الخادم الداخلي</span>""ar-SA""2-digit""2-digit""""<a href="" target="" style="">$1</a>""div""6px 8px 8px 10px""75%""14.5px""4px""relative""0 1px 1.5px rgba(11,20,26,0.1)""pre-wrap""1.4""break-word""anywhere""flex-end""#d9fdd3""#111b21""12px 0 12px 12px""flex-start""#ffffff""#111b21""0 12px 12px 12px""image/""video/""audio/""ptt""اضغط للتحميل من السيرفر""${userIdToUse}""${phone}""${m.id}""${contId}""${m.media.mimetype}""${m.type}""""image/""""audio/""ptt""""video/""""مرفق""""""read""delivered""sent""fa-lock""smooth""<div style=""><div style=""><i class="" style=""></i>لا توجد رسائل سابقة مع هذا الرقم.<br>يمكنك بدء دردشة جديدة الآن.</div></div>""details-modal""whatsapp-mgmt""wa-mic-btn""red""لم يتم السماح باستخدام الميكروفون""error""inactive""wa-mic-btn""#54656f""audio/webm"",""audio/webm""voice_note.webm""""wa-mic-btn""#54656f""wa-media-upload""حجم الملف كبير جداً، أقصى حد يسمح به الواتساب هو 16 ميجابايت""error"",""application/octet-stream""هل تريد إرفاق رسالة نصية مع هذا الملف؟ (اختياري)""""""wa-server-input""""admin""""wa-server-chat-box""fa-comment-dots""fa-circle-notch""<div style=""><span style=""><i class="" style=""></i> الرسائل محمية ومسجلة عبر الخادم الداخلي</span></div>""ar-SA""2-digit""2-digit""<a href="" target="" style="">$1</a>""div""6px 8px 8px 10px""75%""14.5px""4px""relative""0 1px 1.5px rgba(11,20,26,0.1)""pre-wrap""1.4""break-word""anywhere""flex-end""#d9fdd3""#111b21""12px 0 12px 12px""smooth""POST""Content-Type""application/json""الواتساب غير متصل في الإدارة، المرجو فحص الاتصال""error""الخادم البرمجي مغلق أو متوقف""error""wa-media-upload""""quickReplies""quickReplies""<i class=""></i>""لا توجد نتائج تطابق بحثك""لا توجد نماذج ردود سريعة حالياً""${q.id}""${q.id}""&quot;""\\\\""\\"").join("");
    
    if(hasMore) {
        html += "";
    } else if (isExpanded && qr.length > 4) {
        html += "";
    }
    
    bar.innerHTML = html;
};

window.applyQuickReply = function(content) {
    const input = document.getElementById("");
    if(input) {
        input.value = content;
        input.focus();
    }
};

window.downloadWAMedia = async function(userId, phone, messageId, containerId, mimetype, msgType) {
    const btn = document.getElementById(containerId.replace("", ""));
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = "";
    }
    
    try {
        const activeUrl = window._waServerActiveUrl || CURRENT_MASTER_URL;
        const res = await fetch("");
        if (!res.ok) throw new Error("");
        
        const data = await res.json();
        if (!data.data) throw new Error("");
        
        window._waMediaCache[messageId] = data.data; // Cache it so it survives UI redraws
        
        const cont = document.getElementById(containerId);
        if (!cont) return;
        
        let newHtml = "";
        if (mimetype.startsWith("")) {
            newHtml = "";
        } else if (mimetype.startsWith("") || msgType === "") {
            newHtml = "";
        } else if (mimetype.startsWith("")) {
            newHtml = "";
        } else {
            newHtml = "";
        }
        
        cont.outerHTML = newHtml;
    } catch(err) {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = "";
        }
        window.showLuxuryToast("", "");
    }
};

document.addEventListener("", () => {
    // Tab switching event listener
    document.addEventListener("", (e) => {
        const btn = e.target.closest("");
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
    let overlay = document.getElementById("");
    if (!overlay) {
        overlay = document.createElement("");
        overlay.id = "";
        overlay.style.cssText = "";
        
        const closeBtn = document.createElement("");
        closeBtn.innerHTML = "";
        closeBtn.style.cssText = "";
        closeBtn.onmouseover = () => closeBtn.style.background = "";
        closeBtn.onmouseout = () => closeBtn.style.background = "";
        
        const img = document.createElement("");
        img.id = "";
        img.style.cssText = "";
        
        overlay.appendChild(closeBtn);
        overlay.appendChild(img);
        document.body.appendChild(overlay);
        
        const closeOverlay = () => {
            overlay.style.opacity = "";
            img.style.transform = "";
            setTimeout(() => { overlay.style.display = ""; }, 250);
        };
        
        closeBtn.onclick = closeOverlay;
        overlay.onclick = (e) => {
            if(e.target === overlay) closeOverlay();
        };
    }
    
    const imgEl = document.getElementById("");
    imgEl.src = src;
    overlay.style.display = "";
    // Trigger reflow for animation
    void overlay.offsetWidth;
    overlay.style.opacity = "";
    imgEl.style.transform = "";
};

