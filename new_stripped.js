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
      // Simplified: Close the latest open modal that isn""<i class=""></i>""<i class=""></i>""admin-modal""<option value="">ط¬ظ…ظٹط¹ ط§ظ„ط­ط§ظ„ط§طھ ط§ظ„ظپط±ط¹ظٹط©</option>""${status}""${subStatus}""s set to display:none in style.css or parent
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

window.compressImage = function(file, maxWidth, maxHeight, quality) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      const img = new Image();
      img.src = e.target.result;
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
        resolve(canvas.toDataURL("", quality));
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};

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
                ""<span style="">${Number(item.price).toLocaleString()} ط±ظٹط§ظ„</span>""<span class="" style="">${statusLabel}</span>""<button class="" onclick="" title=""><i class=""></i></button>"";
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
        // If it""طھط¹ط¯ظٹظ„""ط¥ط¶ط§ظپط©""<div class="" style=""><p>ظ„ط§ طھظˆط¬ط¯ ظ†طھط§ط¦ط¬ ظ…ط·ط§ط¨ظ‚ط© ظ„ط¨ط­ط«ظƒ</p></div>""quickReplies""${item.id}""quickReplies""${item.id}""<div class=""></div>""active""""rtl""<div class=""><p>ظ„ط§ طھظˆط¬ط¯ ظ…ظ‚ط§ط·ط¹ ظپظٹط¯ظٹظˆ ظ…طھط§ط­ط© ط­ط§ظ„ظٹط§ظ‹</p></div>""${url}""data:image/jpeg;base64,/9j/4QC8RXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAABgAAAAAQAAAGAAAAABAAAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAANAHAAADoAQAAQAAANAHAAAAAAAA/+EPdmh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDI2LTAzLTE0PC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkRhdGE+eyZxdW90O2RvYyZxdW90OzomcXVvdDtEQUhEOHFFcXd0RSZxdW90OywmcXVvdDt1c2VyJnF1b3Q7OiZxdW90O1VBR19fUF9jVzhnJnF1b3Q7LCZxdW90O2JyYW5kJnF1b3Q7OiZxdW90O0JBR19fTGsza1Q0JnF1b3Q7LCZxdW90O3RlbXBsYXRlJnF1b3Q7OiZxdW90O0JsdWUgYW5kIFllbGxvdyBTaW1wbGUgTW9kZXJuIENhciBTZXJ2aWNlIExvZ28mcXVvdDt9PC9BdHRyaWI6RGF0YT4KICAgICA8QXR0cmliOkV4dElkPjM5Y2NjNWE4LWQyNjYtNDQ4NC04YjllLTM5ZGZkNzAzZmEwMjwvQXR0cmliOkV4dElkPgogICAgIDxBdHRyaWI6RmJJZD41MjUyNjU5MTQxNzk1ODA8L0F0dHJpYjpGYklkPgogICAgIDxBdHRyaWI6VG91Y2hUeXBlPjI8L0F0dHJpYjpUb3VjaFR5cGU+CiAgICA8L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvQXR0cmliOkFkcz4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJz4KICA8ZGM6dGl0bGU+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5CbHVlIGFuZCBZZWxsb3cgU2ltcGxlIE1vZGVybiBDYXIgU2VydmljZSBMb2dvIC0gMTwvcmRmOmxpPgogICA8L3JkZjpBbHQ+CiAgPC9kYzp0aXRsZT4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6cGRmPSdodHRwOi8vbnMuYWRvYmUuY29tL3BkZi8xLjMvJz4KICA8cGRmOkF1dGhvcj7Yr9mK2KfYsSDYp9mE2LTZh9in2YXYqTwvcGRmOkF1dGhvcj4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eG1wPSdodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvJz4KICA8eG1wOkNyZWF0b3JUb29sPkNhbnZhIGRvYz1EQUhEOHFFcXd0RSB1c2VyPVVBR19fUF9jVzhnIGJyYW5kPUJBR19fTGsza1Q0IHRlbXBsYXRlPUJsdWUgYW5kIFllbGxvdyBTaW1wbGUgTW9kZXJuIENhciBTZXJ2aWNlIExvZ288L3htcDpDcmVhdG9yVG9vbD4KIDwvcmRmOkRlc2NyaXB0aW9uPgo8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSd3Jz8+/9sAQwAGBAUGBQQGBgUGBwcGCAoQCgoJCQoUDg8MEBcUGBgXFBYWGh0lHxobIxwWFiAsICMmJykqKRkfLTAtKDAlKCko/9sAQwEHBwcKCAoTCgoTKBoWGigoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgo/8AAEQgH0AfQAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A+VKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKWjBPY0AJRTtrehq3baVqF1j7NZXMuemyJm/kKTkluxqLZSoro7bwP4pucGHw9qzA9/skmPzxWpbfCrxrcY8vQLpf+uhVP/QiKxniqEPjml80WqU3sjiKK9Mt/gl43kx5mnQQ/wC/dRn+RNaVv8AvFkv+sn0uH/fnY/yU1zvNcHHerH70WsNVf2WeQ0V7fD+zxrh/1+r6an+5vb+aitK2/ZzkPNz4kRfaOzLfqXFc88+y+G9VfiWsFWf2T5+or6Vtv2d9KXH2nXLyT/chVP5k1pw/ADwogHmXeryHvmaMD9ErnlxNl6+3+DLWX1n0Plelr60i+Bfg1PvRX0n+9cf4AVdh+DHgaP72kPL/AL91L/RhXPLi3AL+b7v+CWstqvsfH1GD6V9mxfCfwRF9zQID/vSyN/NqvQ/DrwhD9zw7px/3ot386yfGGD6Rl+H+ZSyyp3R8SYPoaXa3oa+54vBvhiL/AFfh3R19/sUef5Vbi0DR4v8AVaTp6f7tsg/pWUuMsOvhptlLK5dZHwbsb+6fyqSO1nk/1cMjfRSa++obS2h/1NvDH/uoBU9YPjSHSl+P/ALWVPrI+CI9G1OT/V6fdv8A7sLH+lWo/C2vyf6vRdSb/dtXP9K+7aKzfGj/AOfX4/8AAK/stfzHwyngrxQ/3PDusN9LKQ/+y1MvgHxa3Tw3q/42cg/pX3BRUvjOfSl+I/7Lj/MfEg+HXi8/8y7qf427D+lPHw28Yn/mXdR/GI19sUVD4zrdKa/Ef9lw7nxUPhl4yPTw9ffimKePhd40PTw/efiAP619pUVL4yxH/Ptfj/mH9lw7s+MB8KvGp/5gFz+LL/jTx8JfG5/5gM//AH8j/wDiq+zKKn/XLE/8+4/j/mP+y6fdnxn/AMKk8b/9AGb/AL+x/wDxVH/CpPG//QBm/wC/sf8A8VX2ZRR/rlif+fcfx/zD+y6fdnxkfhP42H/MBn/77T/4qmH4VeNR/wAwC5/Ar/jX2hRR/rlif+fcfx/zD+y6fdnxafhb40H/ADL95+Q/xqNvhn4yXr4ev/wjzX2tRVLjLEdaa/H/ADF/ZcO58Rv8O/F6dfDmqH6WzH+QqB/AvitPveG9ZA9fsUn/AMTX3HRWi4zn1pL7xf2XH+Y+FJPCPiKP/WaFqi/W0kH9KrSaDq0X+s0y9T/egYf0r70oq1xo/wDn1+P/AABf2Wv5j4BksbqP/WW0y/VCKg2MOqn8q/QWmSRxyDEiKw/2hmrXGketL8f+AT/ZX94/P3a3oaTafQ198TaRps3+u0+zk/34VP8ASqUvhPw5N/rtA0l/96zjP9K2hxlQfxU2vmS8rl0kfCmD6Givt6f4feEZs7/DumD/AHIFX+WKoTfCnwTNnfoFuP8AdkkX+TVsuMMH1jL8P8yHllTuj4vor7An+C3geX7mlyw/7l1J/VjWfN8BvB8n3DqcX+5Ov9VNbw4swEt7r5f8El5bVR8n0V9QT/s9+HW/499T1RP98xt/JRWZc/s6WjZ+zeIpo/8AftA38nFdEeJcuf8Ay8/BkPAVl0PnKiveLn9nXUFz9m160k9PMhZP5E1lXP7P3ieMEw3ukzD0Erqf1T+tdMM7wFT4aq/L8zN4SsvsnjlFem3XwR8bQ58uwt58f887qMf+hEVjXfwu8aWufM8P3jY/55ASf+gk10wzDCz+GpH70ZuhUW8WcXRW3eeFPEFln7ZompQY/wCelq6/zFZEkMsTlZI3Rh2YYNdUZxlsyHFrdEdFLtPoaSqJCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiilwaAEopwRieFJ/Ctaw8Ma7qOPsGj6hc57xWzt/IVMpxj8TGot7Ix6K7qx+E/ja9x5Wg3CA/8APZ0i/wDQiK6Gx+Avi24wbh9OtPXz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ZR/wEkius0v45eMrPH2i5tL4DtcW6j9U2mvLaK5amBw9XWdNP5I0jWqR2Z7vD8flvIPI8QeF7O8ib7wWT5f++WVs/nVK61/4R6/k3uhaho9w3WS1ACr9ArEf+O14rRXPHKqFPWlePo2X9am/i1PV7n4feEtWJfwp45sNx+7BqYMB+m4gZP8AwGud1n4Y+K9LjM39lveWvUT2LC4Qj1+TJA+oFcWCR0NWrDUr7T5fNsLu4tpP70MhQ/mDXRClWhtO681+qt+RDnCW6sV5I3idkkRkdTgqwwQaZXST+NNbu0Cancx6koGP9OgSdsezuCw/Aisqe6s7jJNitu3b7PI236kMWz+BFdEXL7SIaXQoUVMkSyMVSRR6b/lz/QfiadNZXEMfmPE3lZx5i/MhP+8OKq5JXooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK6/wCHPgTU/HGrfZ7JfJs4iDcXTj5Yh/Vj2H8hk1V8AeEb3xn4hh02xGxPvzzkZWKMdWP8gO5Ir7M8LeH9P8MaLBpekw+VbxDkn7zt3Zj3J/zwK+ez3O45dDkp61H+Hmd2DwjrPmlsVfBnhLSfCGliy0e3CZwZZm5klb1Y/wBOg7V0FFFfmFevUrzdSo7tnvxgoK0QooorEoKKKKACiiigAooooAKKKKACiiigAoqjrGr6do1obnVr23s4B/HNIFB9hnqfYV5F4t+PukWO+Hw5aSalMOBPLmKIe4H3m/8AHa9HB5Visa/3MHbv0MKuIp0viZ7XXK+J/iD4Y8Nb11TVYBcL/wAu8J8yTPoVXp+OK+WPFPxO8VeJDIl5qckFs3/Lva/ukx6HHLD6k1xRJPU5r63B8HRXvYmfyX+Z51XM+lNH0F4k/aGbLx+HNIAH8M96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zuZnOST6k0yvt8BwzhMLaU1zy89vuPKrZhUqaR0Re1fV9Q1m8a61S8nu7hurzOWP057e1UKWkr6KMVFWRwtt6sKKKKYgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigApcn1pKKAJoLma3kEkEskbjoyMQR+NdNpvxE8Xabt+y+INQ2r0WSUyKPwbIrk6KznRp1FacU/VFRnKOzPWdL+PHi60wLv7DfDuZoNp/8AHCv8q63S/wBopDtXVNAI9Xt7j/2Uj+tfPNFedWyPAVvipL5afkbxxlaO0j640r44eDb3aLi4u7Bj/wA/EBIz9U3V2WleL/DurBf7O1vT52boizqH/wC+Sc/pXwrTgSOhNeTX4Rwc9abcfxOmGZ1F8SufoLRXwrovi3X9ECjStXvbZB/AkzbPxXofyrvdE+PHiuxwt+LLUU7mWLY34FMD8wa8bEcHYiOtGal+B1QzOD+JWPq2ivE9C/aD0W52rrOmXdi543wsJk+p+6R+Rr0TQvH3hbXQo07W7NnPSOR/Kc/RXwT+FeDiclxuG/iU3by1/I64YmlPZnUUUdRxRXmNNaM3vcKKKKQwoooqlJrZisUdQ0jTdSGNR0+zuxjH7+FZP5iuV1P4U+CtQ3GXQoImP8UDvFj8FIH6V3FFdVLH4mj/AA6jXzIlRhLdHjmp/s/+GpwTY32o2jnszLIo/DAP61yepfs636Z/szXrWb0FxC0X8i1fR9FenS4mzCn9u/qkc8sDRl0PkTVPgn40stxhsYLxF/it7hf5Ngn8q5HVPCHiLSgTqGi6hbqP43t2C/njFfdNFepR4yrr+LTT9NDnllkH8LPz5KlT8wIpK+yfij8NtO8b2BdAlrrEQPk3QX73+y+Oo9+o/MH5G17R77QdVuNO1S3eC7hba6N+hB7g9Qa+uyvN6OZQvDSS3R5uIwsqD12M+iiivVOYKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAFHJr67+AXhf/hHfA0NzPHtvtTIuZMjkJj92v5c/8CNfOXwq8MHxZ41sNPdSbRW865I7RLyfz4X6sK+11VUUKoCqBgADgCvi+LsfyU44WL1lq/Q9XLaN26jFooor89PaCiiigAooooAKKKKACio7iaK2hkmuJUihQFnd2CqoHUknoK8O+I3x1t7My2Pg5UuZxlWvpF/dqf8AYX+L6nj2NejgMrxGPny0Y6d+iMa2IhRV5M9c8U+J9H8LWBu9bvY7ZMHYhOXkPoqjk/5zXzv48+OmraqZbXw0h0uzOR5xIM7j69E/Dn3ryjWdXv8AWr+S91W7murmT70krZP09h7DiqNfoOWcNYbB2nU9+Xnt9x4tfHzqaR0RJcTy3Mzy3EjyyudzO7Elj6kmoqKK+ktbY4AooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAClBI6E0lFAHReH/ABr4j8P7RpGsXdvGvSLfuj/74bK/pXpvh79oLWLbYmuabbX6DgyREwyfU9V/QV4hRXFictwuKX72mn+f3m0MRUp/Cz7A8N/GXwhrJRJb19NuG42Xi7Rn/fGVx9SK9CtbmC7gWa0minhblZImDKfoRX5/VqaF4h1bQbjz9H1C5s5O/lSEBvqOh/Gvm8XwfQnd4eTi+z1R3U8zkvjVz7yor5o8K/tAara7IvEdjDfx9DPDiKT6kfdP0AFezeEviT4Y8UbE0/UUium/5drr91Jn0GeGP+6TXyuNyDG4S7lG67rU9GljKVXZ6nY0UUV4rTW51BRRRSAKKKKACuF+Knw9svHGk4+SDVoFP2a5x/44/qp/TqO4PdUV04TF1MJVVWk7NEVKcakeWR8C6zpd5o2p3Gn6lA8F3A5SSNuoP9R796pV9ffGP4bw+NNNN3YKkWuW6funPAmX/nmx/ke30NfI93bTWd1LbXUTxTxMUdHGGVgcEEetfrOU5pTzGjzx0kt0fOYnDuhK3Qhooor1DmCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKK3fA/h+bxR4p07SIMj7RKA7gfcQcs34AE1M5xpxc5bIcYuTsj6J/Zs8Lf2V4Vl1q5TF1qbfu8jlYVOB+ZyfoFr2GobK1hsrOC1tUEcECLFGg6KoGAPyFTV+NZnjHjcTOs+r09Oh9RQpqlBRQUUUVwGwUUUUAFFFFNK+iAK5Px7480bwVY+Zqc3mXbrmG0jIMknv8A7I9z+p4rg/iv8ZrfQ2l0vws0V1qQyst196OA+i9mb9B78gfNep6hd6pezXmoXEtzdSnc8kjFmY19jk3DEq9q2L0j26s8zFY9Q92nqzq/iB8SNc8aTMl5N9n04NmOzhJCD0Lf3j7n8MVxVJRX39GjToQVOmrJHiznKbvJhRRRWpIUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUoJB4OKSigDvfCHxW8UeGTHHFfG8sl4+zXeZFx6A/eX8DivefBPxo8OeIPLg1F/7Ivm42XDZiY+0nQf8AAsfjXyTS14+PyPCY1XnG0u60OqjjKlLZ3R+giMrqrowZWGQQcginV8WeBviT4h8HuqWN0Z7HOWs7jLxn6d1P0x+NfRvgH4uaB4sMVrK/9m6o/H2edvlc+iP0P0OD7V8LmXDWJwd50/fj5b/NHr0MdTq6PRno1FFFfONW0Z3BRRRSAK8Y+PXw1GuWkniHQ4f+JpAubiFBzcIP4h/tAfmPcDPs9Fd+XY+pgKyrU/mu6Ma1GNaPLI/PkjBwaSvcP2gPhv8A2VcyeJNEhxYTNm7hQcQuT94DsrH8j9RjxCv1zBYynjaKrUno/wAPI+brUpUpOMhKKKK6zIKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvo/9mDwt5Fhe+JLpPnuCba1yP4Acuw+pAH/ATXgGg6Xca1rVlptku64upViQHpknGT7DrX3PoGlW+h6JZaZZri3tYliXjGcDkn3JyT7mvluKsf8AV8N7CL96f5Ho5dR55872RoUUUV+ZHvBRRRQAUUVU1bUrTSNOuL/Up0t7SBd8kjngD+p9B3q4QlUkowV2xNpK7Jrq4htbeS4uZUhgiUu8jttVQOpJPQV80fFv4yT6yZ9I8LSPb6YcpLdDKyXA7gd1X9T3xyK5/wCLPxRvfGVw9lZb7TQ0b5Ic4abHRpMfoOg9zzXmtfo2R8OQwyVfEq8+i7f8E8TF45z9ynsBOTSUUV9aeYFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABSgkHikooA9a+HPxo1bw75Vlre/U9LXCjc376If7LHqPY/gRX0v4Z8RaX4m0xL/RbtLmBuGA4ZD/dYdQa+Dq2fC3iXVfC+ppfaNdvbzDhgOVdf7rL0Ir5vNuHKGNTnS92f4P1O/DY6VLSWqPu6ivOvhb8UdO8awLa3Gyy1pVy9sT8smOrRk9fp1HuOa9Fr83xmDrYOo6VZWZ7lOrGpHmiwooorlNCG7toby1mtrqJJbeVDHJG4yGUjBBr47+L3gObwT4hKRBn0q6Je0lPp3Qn+8uR9Rg+1fZVYHjnwvZ+L/DlzpV8Nu8boZcZMUg+6w/r6gkV7+QZvLL63LN+5Lf/ADOPGYZVoabo+F6K0vEOj3mga1d6ZqURiurZyjDsfQj1BGCD6Gs2v1aMlJKUdmfOtNOzCiiimIKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooqeytpby7htraNpJ5nEaIvVmJwAPxobsrsErnuP7MPhbz9RvPEl1HmO2Bt7YkdZGHzMPopx/wKvo+sLwP4fi8L+FdO0iHaTbxjzGH8ch5ZvzJ/DFbtfkOeY/69i5TXwrReh9NhaPsqaXUKKKK8c6QoopssiRRtJKypGgLMzHAUDqSaaTk7ITdiDU7+10uwnvdQnS3tIFLySucBR/nt3r5G+LvxJuvG2pGC2LwaJA37iA8Fz/ff39B2H4k6Pxv+JT+LNROl6TIy6HbPwRx9ocfxn29B+J9B5TX6Zw9kSwcFXrL33+H/AATwsbjHUfJDYKKKK+pPOCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigCW2uJrW4jntpXimjYOjoxDKR0II6Gvpz4MfFpfEHlaJ4klSPVuFguDhVuf9k9g/wDP69fl6nI7I4ZCVYHII7V5+Y5bRzCl7Oqtej7G9DESoyuj9BaK8Y+BnxR/t+KPQfEE4/taNcW87n/j5Udj/tj9R7jn2evyfMMvq4Cs6VVej7n0dGtGtHmiFFFFcJqeRftAeAf+Ei0U63pkWdVsEJdVHM0I5I9yvJHtkelfKx4OK/QavlD4+eA/+EZ10arpsW3SdQckKo4hl6lPYHqPxHav0DhXN+eP1Oq9Vt/keNmOGt+9j8zyeiiivtjyQooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAFr2D9m3wt/a3iuTWbmPNrpYDJkcNM2Qv5DJ+oFeQIpZgqjJJxxX2t8KfDA8J+CbCwdNt248+59fNYDIP0GF/4DXgcR4/6ng2ov3paL9TtwFH2lS72R19FFFflB9EFFFFABXzt+0L8RzLJN4V0Sb90hxfzIfvN/wA8gfQfxe/HY57744ePR4Q8P/ZLCQDWb5SsODzCnQyfXsPfnsa+RXZncu5JYnJJ7191wvk17Yysv8K/X/I8nMMVb91D5jaKKK+8PGCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAJbeeW2njnt5HjmjYOjocFSDkEHsa+vPgt4+XxnoHk3rqNaswFuF6eavaQD36H0PpkV8fVt+DfEd74V8Q2uq6c372FvmQn5ZEP3lPsR/jXk5xlkMxoOH2lszqwuIdGd+h92UVneHtYtNf0Sz1TT33211GHX1Hqp9wcg+4rRr8jq05UpuE1Zo+kjJSV0FZHizQLPxNoF5pOoLmG4TAbHMbfwsPcHmteiijVlRmqkHZoUoqSsz4N8T6HeeHNevNK1FNlxbOVOOjDqGHsRgj61lV9RftGeCf7Y0MeILCLN9p6YnCjmSHrn6ryfoT6Cvl6v2DKswjj8NGqt+vqfNYmg6M3HoJRRRXpHOFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFKOTigD0r4B+Fv+Ei8cwTzx7rHTcXMuRwWB+RfxbnHopr68rzr4E+Fh4b8C20k8e2+1HF1NkchSPkX8F5+rGvRa/KuJMf9bxbjF+7HRfqfRYGj7Kmr7sKKKK+eO0KzvEWsWnh/RLzVNRfZbW0ZdsdT6KPcnAHua0a+aP2k/Gn2/VU8NWEn+i2Tb7oqeHmxwv0UH8yfSvXyXLnmGJVP7K1foc2KrqjTcup5V4y8RXnirxFeatft+8nb5UB4jQcKo9gP8axKKK/XYQjTioRVkj5qUnJ3YUUUVQgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA9y/Zq8Zmy1WTwzfSf6NeEyWpY/clA5X6MB+YHrX0rXwBYXc9hewXdpI0VxA6yRuvVWByCPxFfcPgXxDF4p8Kafq8ICmeP8AeIP4JBww/MHHtivz7i3LvZzWLgtHo/X/AIJ7eW1+aPs30N6iiivij1BrosiMjqGRhhlIyCPQ18a/GPwcfB3i+aCBCNNuv39qfRSeV+qnj6YPevsyuE+Mvg8eMPB08NvGG1K0zPanHJYD5k/4EOPqB6V9Fw5mf1LEqE37ktH+jOLG0Pa07rdHxnRTmUqxVhgjg02v1Q+dCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACu0+EXhY+LPG9jZSoWs4j9ouvTy1IyD9ThfxrjK+qv2cPC39jeEG1a5jxd6oQ65HKwrkL+ZyfcFa8nOscsDhJVFu9F6s6cJR9rUS6HrgGAABgUUUV+QN3d2fTIKKKKQHM/EfxNH4R8IX2qMR56r5dup/ilbhR+HU+wNfEl3cS3d1LcXEjSTSuXd2OSzE5JNexftM+J/7R8TW+hWz5t9OXdKAeDK4z+i4H1Jrxev1XhrL1hMIpyXvT1+XQ+ex9b2lTlWyCiiivoThCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK+if2V9cZ7fWNDlfIQrdwr6Z+V/8A2SvnavTf2dr5rT4oWEQbCXUU0Le42Fh+qivLzqgq+BqRfa/3anThJ8lWLPrqiiivx0+mCiiimnYD5P8A2hfB/wDwj/iz+0rOPbp+qZlAUcJL/Gv45DD6n0ryivt/4leFo/GHhG90xgBcY822c/wyrnb+B5B9ia+JbmCS2uJYJ0aOWNijowwVIOCDX6tw7mP13CpSfvR0f6M+dx1D2VS62ZFRRRXvnEFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFLQoLMAoJJ7Cvavhp8ELzV1i1DxUZbCxPzJajiaUe+fuD68+w61y4vG0cHT9pWlZGtKjOq7RR49p+n3mpXSW2n2s9zcPwscKF2P0A5r0XRfgj4x1JVee1ttPRhkG6mAP4qu4j8RX1JoHh/SfD1oLbRdPt7OLofLX5m/wB5urH3JNalfF4vjGbdsNCy7s9WllkV8bPmuD9nfVio+0a3Yoe+xHb+eKuR/s5zn/WeI4l/3bQn/wBnFfRFFeVLirMHtJL5I6Fl9HseAR/s5Qj/AFniZ2/3bED/ANqVftv2eNIX/j51q+k/3IkT+ea9worOXEuYy/5efgv8ilgaC6Hj0f7P3hZf9Zfawx9pYwP/AECrUfwG8Hp95tTf/enX+iivV6KylxBmEt6jKWDor7J5d/wo3wZ/zwvf/Ag/4UyX4E+Dn+6uoR/7twP6qa9UorNZ5j1r7V/eP6rR/lPG7/8AZ+8NSofsd/qdvJ2LMki/ltB/WuL1/wDZ81e1jaTRNUttQxz5cqGBz7Dkj8yK+mKK66PE+PpO7ndeaM54GjLofBGt6PqGh6hJY6taS2t0nWORcHHqPUe44rPr6++PXhi213wJe3jRD7fpqG4hl7hRjep9iuT9QK+Qq/QcozKOZYf2qVns0eLisP7CfKJRRRXqHMFFFFABRRRQB0PgHw7L4p8W6dpMe4LNJ+9cfwRjlj+QP44r7htYIrW2ht7dFjhiQRoi9FUDAA/CvEv2YvC32TSLzxHcx4luyYLYkdI1PzEfVhj/AIBXuVfmnFeP9viVQi9Ifme/l1Hkp873YUUUV8oegFZ3iLVYND0K+1S6/wBTaQtKRnG7A4A9ycD8a0a8a/ac1/7B4RtNHifEuozbnAP/ACzjwefqxT8jXo5VhPrmLhS6N6+nUxxFT2dNyPmnV9Qn1XVLu/vH33FzK0sjerMcmqdLRX7IkoqyPl27u7EooopiCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAWvQvgHA0/xV0baCVj812PoBE/9cV55Xvf7Lfh55NQ1LX5kIiiT7LCT3dsFiPoAP8AvqvNzevGhgqspdmvv0OjCwc6sUj6Mooor8bPpwooooAK+W/2kvCf9keJ49btI8Wmp5MmBwsw+9/30MH67q+pK5f4leGU8W+Dr/TCB9oK+bbMf4ZV5X6Z5U+zGvbyDMPqWLi2/dlozlxlH2tNrqfEFFSTRvDM8cisjoSrKwwQR2NR1+tnzQUUUUAFFFFAC0lLXqvwT+GS+MppdS1Znj0e2fYVThp3xkqD2ABGT15AHqOfFYqnhaTrVXZI0p05VZcsTy6CCW4kWOCJ5JGOAqKST+FdPY/DrxfelfI8PaiA3IMkJjB/FsV9kaFoOlaBai30bT7ezi6ERIAW/wB49T+JrTr43EcZ6tUaf3s9SGV/zSPjeL4P+OZThdCcf71xEv8ANql/4Uz48/6Ag/8AAuD/AOLr7DorjfGWK/kj+P8Amaf2ZT7s+NpfhD45i+9oUh/3Z4m/k1VJPhh4zj+94fvT/uqG/ka+1KKa4yxPWnH8f8weV0+7Ph+48A+LIATJ4c1bA7rauw/QVny+Gtci/wBbpGoJ/vWzj+lfeFFdEeM5W1pfiQ8rj0kfAsml38X+ss7lf96Jh/SqzwyIcPG6n3GK/QOkYBlIYAg9jWi40XWl+P8AwCXlfaR+fZBHUGkr7r1jwnoGsRsmp6PY3G7gs0Kh/wAGHI/A15Z4u+AGl3ivN4ZvJLCbqILgmSI+wb7y/wDj1ejhOK8HXfLUvB+exhUy6pHWOp8zUVv+LfCes+E777LrVm8BOdkg5SQeqsOD/Md6wK+mhUjUipQd0zglFxdmFFFFUIKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKdGjSOqIpZmOAAMkmm19B/s7fDxWWPxVrMIIz/AKBE47jrKR+i/ifQ1xY/HU8DQdap0/Fm1CjKtPlRufBf4TRaHFDrfiSBZNVbDwWzjItvQkd3/l9entFFFfkuYZhWx9V1Kr9F2Po6NGNGPLEKKzfEGu6b4e02S/1m7jtbZP4nPLH0UdSfYV8/+NPj9fXLSW/hS1Wzh6C6uAHlPuF+6v47q3y/JcVmGtONo93sTWxVOj8TPo26uIbWBprqaOGFfvPIwVR9Sa4jXPi14N0gskmrpdSr/BaKZc/8CHy/rXyPrWu6rrlyZ9Wv7m7lJzmWQtj6Dt+FZv1r67DcHUI615tvy0PNqZnJ/Aj6N1n9oizQsuj6HPN6SXUwT/x1Qf51yV78f/FMzk29tplunYLEzH8SWrx6ivbo5FgKPw0189TkljK0vtHrdv8AHvxbEf3iabN/vwEfyYV1nhr9oVXmWPxJpIjQ9Z7Js4/4Ax/9mr55pKqtkeBrR5ZU0vTQUcZWi78x93eGvE2jeJrT7Rod/DdoPvKpw6f7ynkfiK2a+C/D2uah4f1SHUNJuZLe6iOQynqO4I6EHuDX158LPiBZ+OdILALBqtuALm2z/wCPr6qf06HsT8PnfDksCvbUXeH4o9fC41VvdlozuKKKK+WO85L4tXYsfht4hmPe0aL/AL7wn/s1fEx619cftF3X2f4YXcYOPtM8UX1w2/8A9kr5Gr9N4Rp8uCcu7f6Hg5nK9VLyCiiivqTzgooooAWtLw3pFxr2u2Ol2YzPdSrGpI4GTyT7AZJ+lZle/fsv+FvMub3xLdR/LFm2tSR/ERl2H0BA/wCBGuHMcYsFhp1n0Wnr0NsPSdWoonvmi6bb6PpFnp1ku23tYliQd8AYyfc9au0UV+NVKkqk3OT1Z9RFJKyCiiioGFfI/wC0Rrf9q/EW5t0bdDp8a2y46bvvN+O5iPwr6zu7iO0tZric7YoUaRz6KBk/yr4K1q/l1TV72+nOZbmZ5n+rMSf519rwbhuarOu+it955WZ1LRUO5Sooor9BPFCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKK6zwL4C1vxneCPS7YraqcS3UvyxR/j3PsMms6tWFGLnUdkiowc3aKM3wj4dv/ABTrttpemR75pT8zH7sa92Y9gP8APNfavhLQLTwx4fs9J09f3NumC5GDIx5Zj7k5P6VmfD3wNpfgjSvs2nqZbmQA3F04+eU/0Udh/M811dfmnEOefX5eyo/Avxfc97BYT2K5pbsKKKK+YO8KKKKACiiinsB8nftE+F/7D8bNqECbbPVAZxgcCUf6wfmQ3/Aq8pr7J+N3hkeJfAV6sSBr2yH2qDA5JUfMv4rn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KKKK0JCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAfG7xuGjYqwOQQcEGu88NfFrxdoJRE1Jry3X/ljeDzRj0yfmA+hFcDSVjWw9KuuWrFNeZcKkoO8XY+lfDf7QemXAWPxBpk9pJ0MtswkT6lTggfnXqPh/xr4c8Q7RpGsWk8jdIi+yQ/8AAGw36V8M0oYjoSK+exXCmDra07wflsdtPMakfi1P0Gor4m8P/EbxXoIVNP1q6EK8CKY+agHoFbIH4V6PoP7Q2ow7U1zSLa6XoZLdzE31IO4H9K+dxPCOKp60mpL7md1PMqcvi0PpKivL9H+OHg6/Ci5uLrT3Pa4hJGfqm79cV3OkeJtD1kL/AGXq9jdM3RI51Lf985yPyrwq+V4vD/xKbXyOuFenP4Wa9FFFcDi1ua3uFFFFIYUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFNJvYVwoqnqOq6fpib9Sv7W0TrmeZYx+prjNX+L3gvTNynVhdSD+C1jaTP/Asbf1rro5fia/8ADpt/IzlWhD4md/RXhOs/tD6fGGXRtEuZz2e5lWMD/gK7s/mK4LW/jn4v1DctnLa6ch4xbwgnH1fd+mK9mhwrjqvxpR9X/kc08wox21PrJmCqWYgKBkk8ACuS174keEtD3C91u1aVf+WdufObPphM4P1xXx7rPiTWtaYnVtUvLv2mmZgPoCcCskknqa93D8G0o616jfpock80b+BH0jr/AO0Np8O5NC0ie5boJLpxGB77Rkn8xXm3iL4zeMNY3LFfJp0B/wCWdkmw/wDfZy35GvNqK9/DZJgsNrCmr+ev5nFUxdWpuyxeXlzeztPd3Es8zcs8jlmP1JqCkpa9RJLRHM3fcSiiimAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBqeGNXm0HxBp+qW3+ttZllAz94A8g+xGR+NfdljdRX1lb3ds2+CeNZY29VYZB/I1+f9fXX7PWu/wBsfDu3t5H3XGnSNbNk87fvIfpg4/4DXyHF2E56EcRHeL/BnqZZUtJwfU8C+N+g/wBg/EXU40Tbb3TC7i4wMPycewbcPwrgq+jP2qdG32Oja1GvMbtayn2I3J/J/wA6+dK9zJ8T9awVOo97Wfy0OPFU/Z1WhKKKK9M5wooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigApQxHQmkooA3tK8YeItKAGna1qECD+BJ22/985xXX6X8bvGllgTXtveKO1xbr/NcH9a8yormq4LD1v4kE/kjSNacdme7af8AtE6kmP7R0Kzm9fIlaL+e6ulsf2hdDkA+3aRqEB7+UySfzK18yUV5tTh3L6ju6dvRs3jjq0ep9c2fxw8F3GPNuru1z/z2tmOP++d1bVp8UfBd1jyvEFqM/wDPQPH/AOhAV8WUoPvXDPhHBS1i5L5/8A2WZVVukfdVv4u8OXIzBr+kyf7t5Hn8s1cj1rSpf9XqVi/+7Oh/rXwTkjuaXc3qa5Z8G0H8NRr5GizSXWJ9/LeWz/cuIW+jg1Krq33WDfQ5r8/Nzf3jRvb+8fzrN8Fw/wCfr+7/AIJX9qv+U/QJ5o0+/Ii/VgKgfULJPv3luv1lUf1r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tX5iUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH6SfBxt/wn8Hn/qE2w/KNRXYVw3wNk834QeEWHbTol/IY/pXc0AFFFFABRRRQAUUUUAFFFFAHzT+2+mfDHhl/7t5Kv5oP8K+Qa+yf22oifAWgy9l1Pb+cTn/2WvjagAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr079mzRP7c+Mvh6N13Q2kjXrn08pSyn/vsJ+deY19OfsRaJ5uueJNcdeLe3js42PcyNubH08tfzoA+uKKKKACiiigAooooAKKKKACuI+N+qf2P8JPFd3u2t9gkgU+jSDyx+riu3rw/9sLU/sPwhNqGwdQv4YCPULuk/nGKAPhuiiigAr7i/Y71T7d8IzaFvm0+/mgA9FYLIP1dvyr4dr6p/Ye1T5/FelO3UQXUa/8Afasf/QKAPquiiigAooooAKKKKACiiigAr4x/bT0T7F8QNK1ZFxHqNjsY/wB6SJiD/wCOtHX2dXz9+2hov234c6dqqLmTTb4Bj6RyKVP/AI8I6APiyiiigAooooAKKKKACiiigD9Nvh//AMiH4b/7Blt/6KWt6sH4f/8AIh+G/wDsGW3/AKKWt6gAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACs7xHrVh4c0O91fV7hbewtIzJLI3p6D1JOAB3JAq5dXENpbS3F1LHDbxIZJJJGCqigZJJPQAV8MftFfF+T4gasNL0Z3j8M2UhMecg3cg481h2HXaD2JJ5OAAcJ8UvG198QPGV5rl/lEc+XbQZyIIQTtQfmST3JJrkqKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACv00+Hk32jwB4ZmByJNMtnz9YlNfmXX6QfBa4+0/CTwhJnONLt4/++UC/0oA7SiiigAooooAKKKKACiiigAr5f/bjty2meELjHEc1zHn/AHljP/stfUFfPf7a1p5vw30i6AyYNURT7BopP6qKAPi+iiigAooooAKKKKACiiigAr9K/hTbfY/hj4StyMMmlWoYf7XlKT+ua/NVQWYKoJJOAB3r9SdJtRYaVZWg6W8KRD/gKgf0oAtUUUUAFFFFABRRRQAUUUUAFeBftpS7PhZp0eeZNXiGPYRTH/Cvfa+bv23Z9vg/w5b5/wBZfvJj/djI/wDZqAPjyiiigAooooA+7/2SP+SL2H/X1cf+hmvZa8a/ZI/5IvYf9fVx/wChmvZaACiiigAooooAKKKKACiiigAr4DvvFD+Df2ldW11SRFa6/c+eB/FC0rrIP++S344r78r82fi//wAlW8Y/9he7/wDRzUAfpJFIksSSRMrxuAyspyCD0Ip1eT/sxeLP+Ep+E+nJNJvvdKJ0+bJ5wgHln/vgqM9yDXrFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAV+bnxj/5Kx4w/7C1z/wCjGr9I6/Nz4x/8lY8Yf9ha5/8ARjUAcdRRRQAUUUUAfpN8H/8AklHg7/sEWv8A6KWuurkfg/8A8ko8Hf8AYItf/RS111ABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAY3jT/kTte/68J//RbV+Ylfp340/wCRO17/AK8J/wD0W1fmJQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAfob+zpN5/wAFfCrg5xbsn/fMjr/SvR68k/ZVuPO+B+gpnJhkuYz/AN/3b/2avW6ACiiigAooooAKKKKACiiigDwb9s6Ay/CezcD/AFOrQufoY5V/9mr4kr71/awtftHwS1eQDP2ea3l/8iqv/s1fBVABRRRQAUUUUAFFFFABRRXY6T8M/GOseG4Ne0jQLu/0uYsEktsSMSrFT8gO/qD2oA46irWoWF5ptybfUbS4tJ16xzxtGw/AjNVaACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr7p/ZE0X+y/hBBdsuJNUu5rrJHO0ERj8P3ZP418LgEnA5Nfpr4B0YeHfBOhaPt2tZWUML+7hBuP4tk0Ab1FFFABRRRQAUUUUAFFFFABXyt+3DqfHhTSkb/nvdSL/3wqH/ANDr6pr4d/bE1P7d8XPsgb5dPsIYCPRm3SfycUAeG0UUUAFe4fsfap9h+L6WpbA1CxmtwPUriX+UZrw+u2+Cmqf2P8WfCl4W2r/aEULN6LIfLY/k5oA/R6iiigAooooAKKKKACiiigAri/jRov8AwkPwq8T6cF3yPZPLGvq8f7xB/wB9IK7SkZQ6lWAZSMEEcEUAflZRW3420Y+HvGGt6OwIFjeS2657qrkKfxGD+NYlABRRRQAUUUUAFFFFAH6bfD//AJEPw3/2DLb/ANFLW9WD8P8A/kQ/Df8A2DLb/wBFLW9QAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHzt+2PH4sPhS0fSpP+KWBxqMcIIk35+QyHvH04/vYzn5cfGlfqfd20F5azW13Ek1vMhjkikXcrqRggg9QRXwL+0F8Lpfhz4p3WKu/h+/LPZyHnyz/ABQsfVex7jHcHAB5VRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAV+g/7NVz9q+CPhd85KxSx/98zSL/Svz4r7p/ZBu/tPwbgizn7Lezw/TJD/APs9AHtdFFFABRRRQAUUUUAFFFFABXkH7V9ibz4KatIBk2k1vP8A+RVQ/o5r1+uO+MemnVvhV4rtFXc7adM6L6sil1H5qKAPzcooooAKKKKACiiigAooooA3vANgdV8c+HbADd9p1G3hI9mkUH9K/Tavz7/Zn0w6n8avDqlcx27yXLn02RsQf++ttfoJQAUUUUAFFFFABRRRQAUUUUAFfKv7clzz4OtQf+fuVh/36A/rX1VXxr+2zeeZ4+0KzzxDpnm49C8rj/2QUAfOtFFFABRRRQB93/skf8kXsP8Ar6uP/QzXsteNfskf8kXsP+vq4/8AQzXstABRRRQAUUUUAFFFFABRRRQAV+bPxf8A+SreMf8AsL3f/o5q/SavzZ+L/wDyVbxj/wBhe7/9HNQB6d+x34s/sb4hXGhXEm211qHagJ4E8YLL+a+YPckV9sV+XWhapc6Jrdhqli2y6sp0uIj/ALSsCM+3Ffpp4b1i28QeH9O1exOba+t0uI+eQGUHB9xnB9xQBo0UUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFfm58Y/8AkrHjD/sLXP8A6Mav0jr83PjH/wAlY8Yf9ha5/wDRjUAcdRRRQAUUUUAfpN8H/wDklHg7/sEWv/opa66uR+D/APySjwd/2CLX/wBFLXXUAFFFFABRRRQAUUUUAFFFFACMwVSzEBQMkngAVy3/AAsfwP8A9Dl4b/8ABpB/8VXRaj/yD7r/AK5N/I1+WdAH6Vf8LH8D/wDQ5eG//BpB/wDFUf8ACx/A/wD0OXhv/wAGkH/xVfmrRQB+lX/Cx/A//Q5eG/8AwaQf/FUf8LH8D/8AQ5eG/wDwaQf/ABVfmrRQB+lX/Cx/A/8A0OXhv/waQf8AxVH/AAsfwP8A9Dl4b/8ABpB/8VX5q0UAfpV/wsfwP/0OXhv/AMGkH/xVH/Cx/A//AEOXhv8A8GkH/wAVX5q0UAfpV/wsfwP/ANDl4b/8GkH/AMVR/wALH8D/APQ5eG//AAaQf/FV+atFAH6Vf8LH8D/9Dl4b/wDBpB/8VR/wsfwP/wBDl4b/APBpB/8AFV+atFAH6KeLviF4Mn8Ka1DB4u8OySyWU6IianCWZjGwAADck1+ddFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB9w/scXPn/CKSPOfs+pTR/TKo3/ALNXudfN/wCxHd7/AAb4is8/6q/WXH+/GB/7JX0hQAUUUUAFFFFABRRRQAUUUUAcD8e7I3/wc8WwgZ22LTf9+yJP/Za/Omv1B8Uaf/a3hnV9Oxn7ZZzW+PXehX+tfl/060AJRRRQAUUUUAFFFFABX6E/s22n2L4JeF4yMFoZJf8AvuV3/wDZq/Pav0w+Gdj/AGZ8OvDFkV2vBplsjj/aEa5/XNAG1qWm2OqW5t9Tsra8gPWO4iWRT+DAivOPEXwF+Heub2bQUsJm/wCWlhI0GPogOz/x2vUaKAPl7xF+ybavufw34mni/uxX8Akz9XTbj/vk15d4i/Zz+IWj7mt9PtdViX+OxuATj/dfax/AGvvKigD8wNc8O61oEvl65pN/pz5wBdW7xZ+m4DNZVfqjNFHPE0U0aSRsMMjgEEe4NcJ4i+D3gHxBuN/4YsI5W6yWim2bPqTGVyfrmgD86aK+xvEX7KXh663PoGu6jp7nkJcotwg9hjafzJry7xF+zF4503c+lvpurxj7qwz+VIfqJAB/48aAPCqK6XxF4E8VeG9x1zw9qdnGvWV7djH/AN9jKn865qgAooooAKKKKACiiigDsPhBon/CRfE/wzphXfHLfRvKvrGh3v8A+Oq1fpJXxR+xnov2/wCJl5qjrmPTLFyrekkhCD/x3zK+16ACiiigAooooAKKKKACiiigAr85Pjjqf9r/ABd8WXW7cBfyQKfURfux+iCv0bPTivjy+/Za8XXt9cXU+vaIZZ5Glc5l5Zjk/wAHvQB83UV9Ff8ADKPir/oO6J+cv/xFH/DKPir/AKDuifnL/wDEUAfOtTWlxJaXUNxC22WF1kQ+hByK+hP+GUfFX/Qd0T85f/iKP+GUfFX/AEHdE/OX/wCIoA+wdMvI9R020vYP9VcwpMn+6wBH86s1heA9JvNB8F6JpGpTRT3dhZxWryRZ2tsUKCMgHoBW7QAUUUUAFFFFABRRRQAUUUUAfCX7W2i/2T8Ybu5Vdsep20N2uOmceW36xk/jXjFfWv7b2i79L8M64i48qaWykb13qHQfhsf86+SqACiiigAooooAKKKKAP02+H//ACIfhv8A7Blt/wCilrerB+H/APyIfhv/ALBlt/6KWt6gAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACuZ+JHg6w8d+EL7QtSAVZ13QzYyYJR9xx9D19QSO9dNRQB+XviPRb3w7r1/o+qxeVe2UzQyr2yD1B7g9Qe4IrNr6v/bL8BB4LPxtp0PzpttNR2jqp4jkP0PyE+6elfKFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABX2J+xHfeZ4N8RWGf9RfrPj08yML/wC06+O6+mP2INQEfiPxRpuebi0iuMf9c3K/+1aAPryiiigAooooAKKKKACiiigAqO4hjuLeWCZd0UilGX1BGCKkooA/LnXNPl0jWtQ024GJrO4kt3z/AHkYqf1FUa9V/ac0I6F8ZNbwm2G/2X8R9RIPmP8A32HryqgAooooAKKKKACiiigD6N/Yn0g3PjfXdWZcx2ViIAfR5XBB/KNvzr7HrwP9jXQjp3wzutVkXEmqXrsh9Y4xsH/jwkr3ygAooooAKKKKACiiigAooooAK+D/ANrW/wDtnxp1GHORZ21vB+cYk/8AalfeFfnH8b9R/tT4ueLLkHcBqEsIPqIz5Y/RaAOHooooAKKKKAPu/wDZI/5IvYf9fVx/6Ga9lrxr9kj/AJIvYf8AX1cf+hmvZaACiiigAooooAKKKKACiiigAr82fi//AMlW8Y/9he7/APRzV+k1fmz8X/8Akq3jH/sL3f8A6OagDka+0v2NvFn9q+Bbzw9cSZuNHm3RAnnyJSWH1w4f6ZFfFtepfs1+LP8AhFPixpTzSbLLUT/Z9xk8YkI2H2w4Q59M0AfoFRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAV+bnxj/wCSseMP+wtc/wDoxq/SOvzc+Mf/ACVjxh/2Frn/ANGNQBx1FFFABRRRQB+k3wf/AOSUeDv+wRa/+ilrrq5H4P8A/JKPB3/YItf/AEUtddQAUUUUAFFFFABRRRQAUUUUAV9R/wCQfdf9cm/ka/LOv1M1H/kH3X/XJv5GvyzoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD6h/Ydvtmp+LLAn/Ww284H+6zqf8A0MV9Z18Rfsbah9k+LE9sx4vNNliA/wBpWR/5K1fbtABRRRQAUUUUAFFFFABRRRQAV+Z3xH0o6J4/8R6aV2rbahPGg/2N52n8Rg1+mNfCX7W2inSvjFeXQXEWp20N2uBxkL5bfjmMn8aAPGKKKKACiiigAooooA0PD2nPrGv6ZpkYJkvbqK2UDrl3Cj+dfqFGixoqIAqKMADsK/P39mnRjrXxm8PqV3RWjveyH+75akqf++9g/Gv0EoAKKKKACiiigAooooAKKKKACvjP9tFLC28aaHa2Vna28/2JriZ4YlRpN8hUbiBk48s4z6mvsyvgz9rDU/7Q+NOpxA5Sxggtgf8AgAc/rIaAPHqKKKACiiigAooooA+y/wBinRfsngbWdYddr6heiJT/AHkiXg/99SOPwr6Jrg/gTon9gfCPwvZFdsjWa3Mg7hpSZCD7jfj8K7ygAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDy39prRf7b+DOvBF3TWSpex+3lsCx/74L1+ftfqRrWnxato99p1yMwXkElvJ/uupU/oa/L+/tJbC+ubO5XbPbyNFIvoynBH5igCvRRRQAUUUUAFFFFAH6a/D/wD5ELw3/wBgy2/9FLW/WD8P/wDkQ/Df/YMtv/RS1vUAFFFFABRRRQAUUUUAFFFFAFDX719N0LUb6JVeS2tpJlVuhKqSAfbivkT/AIau8Vf9ALRPyl/+Lr6y8af8idrv/XhP/wCi2r8w6APor/hq7xV/0AtE/KX/AOLo/wCGrvFX/QC0T8pf/i6+daKAPtP4bftM6Br0sNj4st/7CvX+UXG7fasfduqfjkDu1e/QyxzwpLC6yROoZHQ5DA8ggjqK/K6vWPgx8ada+Hd1FZ3DSaj4cZv3lk7fNECeWiJ+6e+37p9jyAD78orI8J+I9L8V6FbaxoV0l1Y3AyrL1U91YdmHcGtegAooooAKKKKACiiigAooooAzPFGiWviTw7qWjagu61voHgfjkbhjcPcHBHuK/M/xFpF1oGvahpF+u27sZ3t5B23KSMj2OMj2r9Q6+L/2y/Co0vx1Y+ILePbBq8G2UgcedFhSfxQp+RoA+e6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK9n/ZI1IWHxmsoC2Bf2s9t9cL5n8468YrrfhNqo0T4m+F9QZtscWoQiRvRGYK3/jpNAH6T0UUUAFFFFABRRRQAUUUUAFFFFAHzB+2z4ZMunaD4ngTJgdrC4IH8LZeM/QEOP+BCvkqv0t+JvhePxn4D1rQZAu+7gIhZuiyr80Z/BgufbNfmvdW8tpczW9zG0U8LmOSNhgqwOCCPUEUARUUUUAFFFFABT4YpJ5o4oUZ5ZGCoqjJYngAUyvXf2XfCJ8UfFSxuJo91hpA+3zEjjcp/dj678HHopoA+1/h/4fTwr4J0TQ0xmxtUicjo0mMu34sWP410FFFABRRRQAUUUUAFFFFABRRRQBFdTx2ttNcTNtiiQyOfQAZNfl1qd4+oald3sv8ArLmZ5m+rMSf51+ifxt1UaL8JfFd5u2N9gkhRvRpB5a/q4r84qACiiigAooooA+7/ANkj/ki9h/19XH/oZr2WvGv2SP8Aki9h/wBfVx/6Ga9loAKKKKACiiigAooooAKKKKACvzZ+L/8AyVbxj/2F7v8A9HNX6TV+bPxf/wCSreMf+wvd/wDo5qAORpyMyOrIxVlOQQcEGm0UAfpL8JPFK+M/h3omtlg1xPAEucdpk+WTjt8wJHsRXX18pfsUeK9smt+E7mThgNQtQT34SQf+izj2Y19W0AFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFfm58Y/wDkrHjD/sLXP/oxq/SOvzc+Mf8AyVjxh/2Frn/0Y1AHHUUUUAFFFFAH6TfB/wD5JR4O/wCwRa/+ilrrq5H4P/8AJKPB3/YItf8A0UtddQAUUUUAFFFFABRRRQAUUUUAV9R/5B91/wBcm/ka/LOv1M1H/kH3X/XJv5GvyzoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD0f9nbUhpfxo8LTM2FkuTbH381GjH6sK/Q2vy88O6i2keINM1JM77O6iuBj1Rw39K/UGN1kjWSNgyMAykdCD3oAdRRRQAUUUUAFFFFABRRRQAV81ftseHTc+G9C8Qwpl7KdrSYj+5IMqT7Bkx/wOvpWuY+JvhlfGHgHW9CYKZLu2YQluiyr80Z/BwtAH5pUVJPFJBNJDMjRyxsUdGGCpBwQRUdABRRRQAUUUUAfU37EXh0tceIvEkq8KqafC2OpOJJP5RfnX1dXBfAvwmfBvww0XTJo/LvXi+1XYIwfNk+Yg+6ghf+A13tABRRRQAUUUUAFFFFABRRRQAV+afxQ1X+2/iN4l1FW3R3GoTtGf8AY3kL/wCOgV+iXjXVxoHg/W9WLYNlZTXA92VCQPxIAr8xiSTk8mgBKKKKACiiigArV8K6S+veJtJ0iLO++u4rYEdt7hc/rWVXr/7Kei/2x8ZdMlZd0WnQy3rj6LsU/gzqfwoA+8oYkhhSKJQkaKFVR0AHAFPoooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK/PT9ovRf7D+MniSFV2xXM4vEPr5qhz/48zD8K/QuvkH9tzRfI8TeHdbReLq1e0cgd423DPuRKf8Avn2oA+aaKKKACiiigAooooA/Tb4f/wDIh+G/+wZbf+ilrerB+H//ACIfhv8A7Blt/wCilreoAKKKKACiiigAooooAKKKKAMbxp/yJ2u/9eE//otq/MSv088af8idrv8A14T/APotq/MOgAooooAKKKKAPTfgR8ULr4b+KFaZnl0G8ZUvrcc4HaVR/eX9RkehH6A2V1BfWcF3ZzJPbTossUqHKurDIIPcEGvyxr65/Y5+ILXthc+C9Tl3TWim509mPJiJ+eP/AICTuHsx7CgD6booooAKKKKACiiigAooooAK8h/ao8Of2/8ACDUZo03XOlSJfx8c4X5X/DYzH8BXr1U9Z0+HVtHvtOuhm3vIJLeQf7LqVP6GgD8t6Ks6jZy6fqF1ZXK7Z7aVoZB6MpIP6iq1ABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFKrFWDKSGByCOoNJRQB+nvg/Vl17wno2rKQRfWcNyceroGI/M1r149+yjrf9r/BvToWfdLps8tm578NvX8lkUfhXsNABRRRQAUUUUAFFFFABRRRQAV8X/tcfDttC8UDxXpsJ/szVnxc7RxFc45J9nA3fUN7V9oVl+J9B0/xPoF7o2swCewu4zHIh6+xB7EHBB7ECgD8v6K9B+L/wu1n4b628N5G9xpEzkWd+q/JIOyt/dfHUH0yMivPqACiiigBQMkADJNffn7Nvw+bwJ4Aja/iMetaoVursMMNGMfJEf90E5/2mavHf2Y/gtcXd9aeMPFlq0VlCRNp1pKMGd+qysOyjgqO5weg+b65oAKKKKACiiigAooooAKKKKACiiigDwX9srWPsPwvtdORsSajfxoy+saAuf/Hgn518S19Hftr639q8Z6HoqNlLCzadgOzytjB/4DGp/GvnGgAooooAKKKKAPu/9kj/AJIvYf8AX1cf+hmvZa8a/ZI/5IvYf9fVx/6Ga9loAKKKKACiiigAooooAKKKKACvzZ+L/wDyVbxj/wBhe7/9HNX6TV+bPxf/AOSreMf+wvd/+jmoA5GiiigDq/hb4ofwb8QNE10MRFbXAE4H8ULfLIP++Sce+K/SeORJY0kiZXjcBlZTkEHoRX5W19+/syeLP+Ep+E+mrNJvvdL/AOJfNk84QDYf++CvPqDQB6vRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABX5ufGP/krHjD/ALC1z/6Mav0jr83PjH/yVjxh/wBha5/9GNQBx1FFFABRRRQB+k3wf/5JR4O/7BFr/wCilrrq5H4P/wDJKPB3/YItf/RS111ABRRRQAUUUUAFFFFABRRRQBX1H/kH3X/XJv5Gvyzr9TNR/wCQfdf9cm/ka/LOgAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACv0j+Der/wBu/CzwtfltzvYRRyN6ug2N/wCPKa/Nyvtv9jXWvt/wvudNdsyaZfOir6RyAOP/AB4yflQB7zRRRQAUUUUAFFFFABRRRQAUUUUAfDv7V/gF/DHjttdsoiNK1tmmyBxHcdZF/H74+releG1+mHxC8H6d468J3uhaspEM4zHKoy0Mg+66+4P5gkdDX56fEDwXrPgTxDNpGvW5jlX5opVGY50zw6HuD+Y6HBoA5qiiigAr1r9mvwA/jf4g2891ETo2kst1dMR8rsD+7j/4ERk/7KtXAeDvC+reMNet9H0C0a5vJj24WNe7uf4VHc/1xX6FfCrwJYfDzwhbaLYESyj97dXBGDPMQNzew4AA7AD60AdfRRRQAUUUUAFFFFABRRRQAUUUUAeO/tYa2NI+DmoQK22XUp4rNPX729v/AB2Nh+NfBtfT37buvCTV/DmgRv8A6iGS9lUdy52J+I2P/wB9V8w0AFFFFABRRRQAV9W/sQaJiLxPrsi9TFZRN9Mu4/WOvlKvvr9lrRP7G+DOkOy7ZtQeW9kHrubap/74VKAPWqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvD/2wdE/tP4Sm/RcyaXeRXBI67GzGR+bqfwr3Cuc+I+if8JH4B8QaQF3SXdjLHGP+mm0lD/30BQB+Z1FFFABRRRQAUUUUAfpr8P8A/kQvDf8A2DLb/wBFLW/WD8P/APkQ/Df/AGDLb/0Utb1ABRRRQAUUUUAFFFFABRRRQBjeNP8AkT9d/wCvCf8A9FtX5iV+nnjP/kT9d/68J/8A0W1fmHQAUUUUAFFFFABW/wCA/Ec/hHxjpGvWu4vY3CyMqnBdOjp/wJSw/GsCigD9TrG6hvrK3u7VxJbzxrLG46MrDIP5Gpq8n/Ze8QNr/wAHNJEr759OZ9Pc+gQ5QfhGyCvWKACiiigAooooAKKKKACiiigD88f2h9IGi/GXxPAq4Sa5+1r7+aokP6sR+Fec19A/tpaaLb4labfIuFvNNQMfV0kcH/x0pXz9QAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB9PfsR6/wCVq/iLw9K/E8KXsKnsUOx8e5Dp/wB819bV+dHwL8R/8It8VvD2oO+y3a4FtOSePLl+Qk+w3Bv+A1+i9ABRRRQAUUUUAFFFFABRRRQAUUUUAU9Y0ux1rTZ9P1a0hvLKddskMyBlYfQ18++Lf2VdAv7h5vDWs3ekhuRbzR/aY1PopyrAfUtX0dRQB8jx/sl6mZsS+K7NYv7y2jFvy3D+denfDr9nXwn4TvIr/UWl13UYm3RtdIFhQ9iIhkE/7xbtjBFe1UUAFFFFABRRRQAUUUUAFFFFABRRRQAUUVyXxa8R/wDCJ/DfxBrKvsnt7VlgP/TV/kj/APHmWgD4O+NXiD/hJ/in4k1NX3wtdtDCQeDHH+7Qj6hQfxriaWkoAKKKKACiiigD7v8A2SP+SL2H/X1cf+hmvZa8a/ZI/wCSL2H/AF9XH/oZr2WgAooooAKKKKACiiigAooooAK/Nn4v/wDJVvGP/YXu/wD0c1fpNX5s/F//AJKt4x/7C93/AOjmoA5GiiigAr379jrxZ/Y/xAudBuJNtrrMOEBPAnjBZfzXePc4rwGr+garc6Hrmn6rYNturKdLiI9tysCM+3FAH6i0VneHdXttf0DTtXsWza31ulxH6gMoOD7jODWjQAUUUUAFFFFABRRRQAUUUUAFFFFABX5ufGP/AJKx4w/7C1z/AOjGr9I6/Nz4x/8AJWPGH/YWuf8A0Y1AHHUUUUAFFFFAH6TfB/8A5JR4O/7BFr/6KWuurkfg/wD8ko8Hf9gi1/8ARS111ABRRRQAUUUUAFFFFABRRRQBDeRtLaTxp950ZR9SK+HP+GaPiH/z7ab/AOBg/wAK+6aKAPhb/hmj4h/8+2m/+Bg/wo/4Zo+If/Ptpv8A4GD/AAr7pooA+Fv+GaPiH/z7ab/4GD/Cj/hmj4h/8+2m/wDgYP8ACvumigD4W/4Zo+If/Ptpv/gYP8KP+GaPiH/z7ab/AOBg/wAK+6aKAPhb/hmj4h/8+2m/+Bg/wo/4Zo+If/Ptpv8A4GD/AAr7pooA+Fv+GaPiH/z7ab/4GD/Cj/hmj4h/8+2m/wDgYP8ACvumigD4W/4Zo+If/Ptpv/gYP8KP+GaPiH/z7ab/AOBg/wAK+6aKAPg7UP2c/H2n6fc3lxb6cILeJppCLsE7VBJ7egrxyv078af8idr3/XhP/wCi2r8xKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr6I/Ys177F481bRpHxHqVn5iD1kibIH/AHy8h/Cvneuq+FniH/hFPiJ4f1ovsitbtPOP/TJvlk/8cZqAP0qooByMjpRQAUUUUAFFFFABRRRQAUUUUAFc9438G6F420ZtM8R2KXVvncjfdkib+8jDlT/PociuhooA+WNd/ZMja4d9B8UskBJ2xXlruZR2y6sM/wDfIpND/ZMUXCvrviktACN0Vna7WYd8OzHH/fJr6oooA5nwJ4G8P+BdLNj4b09LZWwZZT80sxHd3PJ78dBngCumoooAKKKKACiiigAooooAKKKKACiiua+JXiJfCXgLXdcZgHs7V2iz0Mp+WMfi5UfjQB8J/tAeIR4l+LniK8jffbwz/ZIcHI2xDZkexKs34155TnZndmdizMckk5JNNoAKKKKACiiigCW2gkubmKCBS8srhEUd2JwBX6feHNLj0Tw9pmlQ48qxtYrZcdwiBR/Kvz9+AOi/298YPDFoy7o47oXT8cYiBk59iUA/Gv0ToAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD81virov/CO/EjxJpYXZHb30vlD0jZtyf+Ola5SveP2yNF/s/wCKUOpIuI9UsY5Gb1kQmMj/AL5VPzrwegAooooAKKKKAP02+H//ACIfhv8A7Blt/wCilrerB+H/APyIfhv/ALBlt/6KWt6gAooooAKKKKACiiigAooooAx/Gn/Ina7/ANeE/wD6LavzDr9PPGf/ACJ+u/8AXhP/AOi2r8w6ACiiigAooooAKKKKAPq79h7VSYPFWkO3CtBdxr9Qyuf0Svqavin9i68MHxQ1C2J+S50uQY/2lkjI/TdX2tQAUUUUAFFFFABRRRQAUUUUAfLX7cdkDbeEb5Ryr3MDH1yI2H8m/OvlCvtD9ta2D/DbSLkDLRaqi59A0Uv9VFfF9ABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFACjg8da/SP4QeJv+Ev+G2g6yz77ia3CXB7+cnyP+bKT9CK/Nuvqr9ijxX/yG/CdzJ6ahaqT9EkA/wDIZx/vGgD6qooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr5j/bX8UeRpGh+F4Hw9zIb64APOxMqgPsWLn6oK+nK/Of44+LP+Ez+J2tapFJvsll+zWhByPJj+VSPZsFv+BUAcHRRRQAUUUUAFFFFAH3f+yR/yRew/6+rj/wBDNey141+yR/yRew/6+rj/ANDNey0AFFFFABRRRQAUUUUAFFFFABX5s/F//kq3jH/sL3f/AKOav0mr82fi/wD8lW8Y/wDYXu//AEc1AHI0UUUAFFFFAH2n+xv4s/tbwHeeH7iTNzo82YwevkSksPrhw/0BFfQNfn/+zT4r/wCEV+LGlmaTZZal/wAS+4yeP3hGw/g4Tn0zX6AUAFFFFABRRRQAUUUUAFFFFABRRRQAV+bnxj/5Kx4w/wCwtc/+jGr9I6/Nz4x/8lY8Yf8AYWuf/RjUAcdRRRQAUUUUAfpN8H/+SUeDv+wRa/8Aopa66uR+D/8AySjwd/2CLX/0UtddQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAGN40/wCRO17/AK8J/wD0W1fmJX6d+NP+RO17/rwn/wDRbV+YlABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAfop8BfE3/CV/CnQL+R991FB9kuMnnzIvkJPuQA3/Aq9Ar5K/Yo8VeRqet+FbiTCXCC/tlJ/jXCyAe5XYfohr61oAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr5q/bU8Ui08OaP4Yt5MTX0pu7gA9Io+FB9ixz/2zr6Vr87Pjx4t/4TP4oazqMMm+yhf7JaEHI8qPgEezHc3/AAKgDz6iiigAooooAKKKKAPo/wDYn0T7V4y13WXXKWNmtupPZ5Wzke+I2H419i14P+xvon9n/C2fUnXEmqXskit6xoBGB/30sn517xQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHzh+2xon2nwdoWsouXsbxrdiOySrnJ/GNR+NfHVfon8f8ARf7e+D/ie1Vd0kVqbtPXMREnHuQpH41+dlABRRRQAUUUUAfpt8P/APkQ/Df/AGDLb/0Utb1YPw//AORD8N/9gy2/9FLW9QAUUUUAFFFFABRRRQAUUUUAY/jP/kT9d/68J/8A0W1fmHX6eeM/+RP13/rwn/8ARbV+YdABRRRQAUUUUAFFFFAHsv7JUxi+NOnID/rba4Q/9+y3/stfd9fAn7K5I+OXh/HdLnP/AIDyV990AFFFFABRRRQAUUUUAFFFFAHiP7YMQk+DzsR/qr+B/wD0If1r4Zr7z/ayj3/BPVW/uT27f+RVH9a+DKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACum+G/iibwZ440jXoNxFpODKi9XiPyuv4qSPriuZooA/U6xuoL6yt7uzlWa2njWWKRTkOjDIYexBBqavAP2QfHI13wVL4avZc6hox/dBjy9sx+X/vk5X2G2vf6ACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA8u/aQ8Zjwb8MNQaCXZqWpD7Da4PzAuDvcem1Nxz67fWvz8r2L9qLx0PGHxGls7KXfpWjBrSHB+V5M/vXH1YBc9wgPevHaACiiigAooooAKKKKAPu/8AZI/5IvYf9fVx/wChmvZa8a/ZI/5IvYf9fVx/6Ga9loAKKKKACiiigAooooAKKKKACvzZ+L//ACVbxj/2F7v/ANHNX6TV+bPxf/5Kt4x/7C93/wCjmoA5GiiigAooooAcjtG6ujFXU5DA4IPrX6S/CjxSvjP4e6Jrm4Ge4gC3AHaZflk47fMCR7EV+bFfVP7FHizB1vwncydcahagn6JIP/RZx/vGgD6rooooAKKKKACiiigAooooAKKKKACvzc+Mf/JWPGH/AGFrn/0Y1fpHX5ufGP8A5Kx4w/7C1z/6MagDjqKKKACiiigD9Jvg/wD8ko8Hf9gi1/8ARS111cj8H/8AklHg7/sEWv8A6KWuuoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDG8af8AIna9/wBeE/8A6LavzEr9O/Gn/Ina9/14T/8Aotq/MSgAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAOg8A+JJ/CHjLSNetdxeyuFkZVPLx9HT8VLD8a/SzTr231HT7a+spVmtbmJZopF6OjAFSPqCK/LOvtP9j7xuNa8GT+GbyXN9o7ZhDHl7ZjkfXa2R7ArQB9A0UUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHmn7Q3jT/hCvhjqVzBJs1G+H2K0weQ7g5Yf7qhm+oHrX57V7X+1Z45/wCEq+Ij6ZZy79M0QNbJtPDzE/vW/MBf+Ae9eKUAFFFFABRRRQAUUV0fw50X/hI/Hvh/SCu6O7voo5B/0z3Auf8AvkE0AfoN8KdF/wCEd+G3hvSyuySCxi81fSRhuf8A8eZq6uiigAooooAKKKKACiiigAooooAKK8N+IX7RWjeDPGOo+H5dGvb2WyZVeaKVFUsUViADzxux9Qa53/hrLQ/+ha1L/v8ApQB9KUV81/8ADWWh/wDQtal/3/Sj/hrLQ/8AoWtS/wC/6UAfSlFfNf8Aw1lof/Qtal/3/Sj/AIay0P8A6FrUv+/6UAfSlFfNf/DWWh/9C1qX/f8ASj/hrLQ/+ha1L/v+lAH0pRXzX/w1lof/AELWpf8Af9KP+GstD/6FrUv+/wClAH0pRXzlp/7VWg3d/bW7+H9QhSaVYzK0yEICQNx+nWvo2gAooooAKKKKACiiigAooooAjuYI7q2lt51DxSoUdT0KkYIr8wPEWmSaJ4g1PSp8+bY3Mts2fVGKn+VfqHXwL+1Jon9jfGbWGVNsOoJHex++5cMf++1egDyWiiigAooooA/Tb4f/APIh+G/+wZbf+ilrerB+H/8AyIfhv/sGW3/opa3qACiiigAooooAKKKKACiiigDH8Z/8ifrv/XhP/wCi2r8w6/Tzxn/yJ+u/9eE//otq/MOgAooooAKKKKACiiigD1n9lf8A5Ln4e/3bn/0nkr77r4E/ZX/5Ln4e/wB25/8ASeSvvugAooooAKKKKACiiigAooooA8m/aoAPwN8Q57Pbf+lEdfAlffn7VH/JDPEP+9bf+lEdfAdABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB1vwr8ZXHgPxzpuu2+54on2XMSn/Wwtw6/XHI9wDX6PaZfW2p6da39hMs9pcxLNDKvR0YZBH4Gvy0r6u/ZA+JYeM+BtZn+Zd0ulu56jkvD/ADYf8CHYCgD6mooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK8t/aK+II8BeAZ2tJdutakGtbIA/MhI+eX/gIP/fRWvStQvbbTrC4vb6ZILS3jaWWVzhURRkk+wAr88PjT8QLj4i+NrnVG3x6dF+4sYG/5ZxA8Ej+8x+Y/XHQCgDgzycmkoooAKKKKACiiigAooooA+7/2SP8Aki9h/wBfVx/6Ga9lrxr9kj/ki9h/19XH/oZr2WgAooooAKKKKACiiigAooooAK/Nn4v/APJVvGP/AGF7v/0c1fpNX5s/F/8A5Kt4x/7C93/6OagDkaKKKACiiigArrPhV4pbwZ8QdE1wMRDbXAE4HeFvlkGP90nHviuTooA/VKN1kjV42DIwDKynIIPcU6vKv2ZvFn/CVfCfTBNJvvdMzp8+Tz8gGw/ihTn1Br1WgAooooAKKKKACiiigAooooAK/Nz4x/8AJWPGH/YWuf8A0Y1fpHX5ufGP/krHjD/sLXP/AKMagDjqKKKACiiigD9Jvg//AMko8Hf9gi1/9FLXXVyPwf8A+SUeDv8AsEWv/opa66gAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAMbxp/yJ2vf9eE//otq/MSv078af8idr3/XhP8A+i2r8xKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK6/4T+M5/AXjrTddh3PBE3l3USn/Wwtw6/XHI9wK5CigD9TdPvLfUbC2vbKZJrW4jWaKVDkOjDII9iDU9fMX7H/xJ+12b+CNXm/f24abTXc8vH1eL6ryw9ieyivp2gAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArzX4//ABAT4f8AgG6ubeULrF8DbWCg8hyOZPog5+u0d69FuriG0tZrm6lSG3hQySSOcKigZJJ7AAV+eXxx+IMvxE8c3GoIzrpVvm3sIm42xA/eI/vMfmP4DtQB58zFmLMSWJySeppKKKACiiigAooooAK9w/Y/0T+0/i0t865j0uzluAT03tiMD8nY/hXh9fX37Eei+R4a8Ra2683V0lohPpGu449iZB/3zQB9LUUUUAFFFFABRRRQAUUUUAFBOASTgCiuT+LWs/2B8M/E2pBtskNhKI29JGXan/jzCgD88/HOsHxB4z1zV85W9vZp19lZyVH4DArDoooAKKKKACiiigAooooAKKKKACv0z+Hmsf8ACQeBPD+rFtz3djDLIf8AbKDcP++sivzMr7s/ZH1j+0/g7a2zNufTbqa1OeuCfMH6SY/CgD2iiiigAooooAKKKKACiiigAr5S/bf0TE3hjXY1+8stlK30IdB+slfVteQftW6L/a/wa1KVU3S6dNFeoPo2xj+Cux/CgD4KooooAKKKKAP02+H/APyIfhv/ALBlt/6KWt6sH4f/APIh+G/+wZbf+ilreoAKKKKACiiigAooooAKKKKAMfxn/wAifrv/AF4T/wDotq/MOv088Z/8ifrv/XhP/wCi2r8w6ACiiigAooooAKKKKAPWf2V/+S5+Hv8Aduf/AEnkr77r4E/ZX/5Ln4e/3bn/ANJ5K++6ACiiigAooooAKKKKACiiigDyf9qj/khniH/etv8A0ojr4Dr78/ao/wCSGeIf962/9KI6+A6ACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAqxYXlxp99b3ljM8F1byLLFKhwyOpyCD6g1XooA/Qz4GfEy0+JHhRJ3ZI9ctFWO/txxhu0ij+42Mj0OR2yfSK/M3wF4v1XwP4mttb0ObZcRHa8bfcmjP3o3HcH9DgjkCv0H+GnjrSfiD4Zg1fR5AG4W4tmbL28mOUb+h7jmgDq6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoor52/aV+Na+HLefwt4TuQdblUpd3cbZ+xqeqKf+eh/wDHR74wAcZ+1f8AFldUuJPBXh243WUD/wDEynjPEsiniIH+6pGT6sAP4efmelJJOTyaSgAooooAKKKKACiiigAooooA+7/2SP8Aki9h/wBfVx/6Ga9lrxr9kj/ki9h/19XH/oZr2WgAooooAKKKKACiiigAooooAK/Nn4v/APJVvGP/AGF7v/0c1fpNX5s/F/8A5Kt4x/7C93/6OagDkaKKKACiiigAooooA9//AGOfFn9keP7rQLiTbbazD+7BPHnxgsv0ypce5xX2rX5d+H9WudC13T9WsG23VlOlxEe25WBAPtxX6aeHtWtte0LT9WsW3Wt9bpcRnvtZQQD780AaFFFFABRRRQAUUUUAFFFFABX5ufGP/krHjD/sLXP/AKMav0jr83PjH/yVjxh/2Frn/wBGNQBx1FFFABRRRQB+k3wf/wCSUeDv+wRa/wDopa66uR+D/wDySjwd/wBgi1/9FLXXUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBjeNP+RO17/rwn/9FtX5iV+nfjT/AJE7Xv8Arwn/APRbV+YlABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAFzSNSu9H1S11HTZ3t721kWWGVOqsDkGv0N+DfxEsfiP4Rh1GApFqMOIr61B5ilx1A/utyQfw6g1+c1dd8MPHeqfD3xTBrGlHen+rubZjhLiInlT6HuD2P4ggH6TUVg+B/FmleNfDlrrWhXAltZhhlP34n7o47MP8CMgg1vUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRXiv7RXxhh8B6S+j6HMknie7T5cYIs0I/wBYw/vf3QfqeOCAed/tafFYStL4G8P3GVUj+1Joz1I5EAPt1b8B/eFfLNPmlknmklmd5JZGLO7nLMTySSepplABRRRQAUUUUAFFFFABX6F/s6aL/Yfwb8Nwsu2W5gN657nzWLr/AOOlR+FfAOjafLq2sWOnWwzPeTx28Yx/E7BR+pr9QLC0isLC2s7ZdsFvGsUa+iqAAPyFAE9FFFABRRRQAUUUUAFFFFABXhf7Yus/2f8AChLBGw+p30UJX1RMyE/99In517pXyH+27rPneI/Deiq3FtayXbgesjbRn/v0fzoA+Z6KKKACiiigAooooAKKKKACiiigAr6l/Yf1jbdeKNFdvvpDeRL6YJRz/wCPR18tV69+yprH9k/GbSo2bbFqEU1m5z6rvUf99ItAH3tRRRQAUUUUAFFFFABRRRQAVleK9JTXvDGr6RLjZfWktsSe29CufwzWrRQB+V00bwyvFKpSRGKsp6gjqKZXefHXRP8AhH/i54osgu2M3jXMY7BZQJAB7APj8K4OgAooooA/Tb4f/wDIh+G/+wZbf+ilrerB+H//ACIfhv8A7Blt/wCilreoAKKKKACiiigAooooAKKKKAMfxn/yJ+u/9eE//otq/MOv088Z/wDIn67/ANeE/wD6LavzDoAKKKKACiiigAooooA9Z/ZX/wCS5+Hv925/9J5K++6+BP2V/wDkufh7/duf/SeSvvugAooooAKKKKACiiigAooooA8n/ao/5IZ4h/3rb/0ojr4Dr78/ao/5IZ4h/wB62/8ASiOvgOgAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACur+G/jvWfh94ij1XQ5hyNk9u+THcJ/dYfyPUGuUooA/R74W/EnQ/iNogvNHl8u7jA+1WMjDzYG9/VT2YcH2OQO2r8vvDmu6n4b1e31TQ72ayv4DlJYjg+4I6EHuDwe9fYvwe/aJ0fxOkOm+L2g0fWeFWcnbbXB9mP3G9mOPQ84oA98opFIYAqQQRkEd6WgAooooAKKKKACiiigAooooAKKKKACisfxT4m0bwppT6j4h1G3sLReN8rcsfRVHLH2AJr49+NP7Qmp+LkuNH8KibStCbKSSk4uLpe4JH3FP8AdHJ7nBxQB6T8ff2gINGS58O+BrhLjVCDHc6jGdyW3YrGejP79F9z0+P5ZHmleSV2eRyWZmOSxPUk9zTKKACiiigAooooAKKKKACiiigAooooA+7/ANkj/ki9h/19XH/oZr2WvGv2SP8Aki9h/wBfVx/6Ga9loAKKKKACiiigAooooAKKKKACvzZ+L/8AyVbxj/2F7v8A9HNX6TV+bPxf/wCSreMf+wvd/wDo5qAORooooAKKKKACiiigAr7V/Y58Wf2v4AutAuJM3OjTfuwTz5EhLL9cNvHsMV8VV6t+zN4s/wCEV+LGmedJsstTzp8+Tx85Gw/g4Tn0JoA+/qKKKACiiigAooooAKKKKACvzc+Mf/JWPGH/AGFrn/0Y1fpHX5ufGP8A5Kx4w/7C1z/6MagDjqKKKACiiigD9Jvg/wD8ko8Hf9gi1/8ARS111cj8H/8AklHg7/sEWv8A6KWuuoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDG8af8AIna9/wBeE/8A6LavzEr9O/Gn/Ina9/14T/8Aotq/MSgA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KKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACilqxptjc6lfQWdjC89zM4SONBksT2pNpK7GlfRFekrpvHvg7UPBWp29jqjxPNNbrODESVGSQVz6ggiuaqadSNSKnB3TCUXF2YlFFFWIKKKKACiiigAooooAKKK2PDPhzVPE2ppY6NaPc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m/8AiaP+Gjfht/0F7n/wBm/+JoA9foryD/ho34bf9Be5/wDAGb/4mj/ho34bf9Be5/8AAGb/AOJoA9foryD/AIaN+G3/AEF7n/wBm/8AiaP+Gjfht/0F7n/wBm/+JoA9foryD/ho34bf9Be5/wDAGb/4mj/ho34bf9Be5/8AAGb/AOJoA9foryD/AIaN+G3/AEF7n/wBm/8AiaP+Gjfht/0F7n/wBm/+JoA9foryD/ho34bf9Be5/wDAGb/4mj/ho34bf9Be5/8AAGb/AOJoA9foryD/AIaN+G3/AEF7n/wBm/8AiaP+Gjfht/0F7n/wBm/+JoA9foryD/ho34bf9Be5/wDAGb/4mj/ho34bf9Be5/8AAGb/AOJoA9foryD/AIaN+G3/AEF7n/wBm/8AiaP+Gjfht/0F7n/wBm/+JoA9foryD/ho34bf9Be5/wDAGb/4mj/ho34bf9Be5/8AAGb/AOJoA9foryD/AIaN+G3/AEF7n/wBm/8AiaP+Gjfht/0F7n/wBm/+JoA9foryD/ho34bf9Be5/wDAGb/4mj/ho34bf9Be5/8AAGb/AOJoA9foryD/AIaN+G3/AEF7n/wBm/8AiaP+Gjfht/0F7n/wBm/+JoA9foryD/ho34bf9Be5/wDAGb/4mj/ho34bf9Be5/8AAGb/AOJoA9foryD/AIaN+G3/AEF7n/wBm/8AiaP+Gjfht/0F7n/wBm/+JoA9foryD/ho34bf9Be5/wDAGb/4mj/ho34bf9Be5/8AAGb/AOJoA9foryD/AIaN+G3/AEF7n/wBm/8AiaP+Gjfht/0F7n/wBm/+JoA9foryD/ho34bf9Be5/wDAGb/4mj/ho34bf9Be5/8AAGb/AOJoA9foryD/AIaN+G3/AEF7n/wBm/8AiaP+Gjfht/0F7n/wBm/+JoA9foryD/ho34bf9Be5/wDAGb/4mj/ho34bf9Be5/8AAGb/AOJoA9foryD/AIaN+G3/AEF7n/wBm/8AiaP+Gjfht/0F7n/wBm/+JoA9foryD/ho34bf9Be5/wDAGb/4mj/ho34bf9Be5/8AAGb/AOJoA9foryD/AIaN+G3/AEF7n/wBm/8AiaP+Gjfht/0F7n/wBm/+JoA9foryD/ho34bf9Be5/wDAGb/4mj/ho34bf9Be5/8AAGb/AOJoA9foryD/AIaN+G3/AEF7n/wB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CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKK7n4S+BG8d69LayXJtrO2j82eRRliM4CqPU+vbH4VlXrQoU3VqOyRUIOclGO5x1jZ3OoXUdtZQS3FxIdqRxqWZj6ACvePhz8CXYxX/jNiicMthE3J/66MOn0HPuOleyeD/BeheEbby9FskjkYYe4f5pX+rf0GB7V0dfBZpxZOpenhFZd+vy7Hs4fLox96pqV7CyttPs4rWwgit7aIbUiiUKqj2AqxRRXxs5ym+aTuz00klZBXDfGfxGvhvwBqMyOFurpfssA77nGCR9F3H8BXcOyojM7BVUZJJwAK+Qvjj44Hi/xP5Vi+7SrDMUBHSQ5+aT8cDHsBXvcO5bLGYpTa92Or/yOTG11SpvuzzcnJJpKKK/Vj5wKKKKACiiigAooooAKKKKACiiigAooooAKKKKAPqz9nzwpoun+F4NbtJor3UrxMSzD/lh6xAdiO/r9MV6tdW8N3bS291Ek0EqlHjcZVlPUEelfFvw38d6j4I1gXFoTLZSkC5tWOFlX19mHY/04r2n4hfG/TofD0SeEpTNqV3Hku6Y+yg9cg9X9ByO/pn4DN8kx1bHKpB3Uno+3/DHtYbF0o0bPSx13gb4c+GfDXiHUtQ0p1uLsSbER3DmyBAJQdwTnqecED1J76RFkRkkVXRgQysMgg9iK+JPBfjjV/CviE6razvM0zZuY5WJFwCcnd79eeoNe7eLfjnpMPhWGfw8TLrF0mBDIvFqe5fsT6Adev1jNcix88RBqTneyv2Kw+LoqD0seXfHrwlo/hbxNF/YlzGBdKZZLEcm2Pb/AICcnA6jHpivMKs6jfXOpX015fTPPczMXkkc5LE9zVavusLSnSoxhUlzNLVnjVZKUm4qyCiiiuggKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAClAJ4HNXNG0+bVtWstPtdvn3cyQR7jgbmYAZ/E19Y+BPhB4e8L+VcXMf9qakuD51wo2If8AYToPqcn6V5eZ5tQy2ClV3eyOjD4add+6eH/Dv4Qa34pMV3fK2maU2D50q/PIP9he/wBTgfWvpnwd4Q0bwjYfZdFtFjLAeZM3zSSn1Zv6dPaugor86zTPsTmD5b8sOy/U9zD4SFHVasKKKK8I6yO4mjtreWe4dY4YlLu7HAVQMkn8K+GvHWuv4l8W6nqz5xcTEoD1VBwg/BQBXvn7RvjpNO0o+GdOlBvLtQbtlPMUXUL9W/l9a+Zq/SeFMteHovEVFrLb0/4J4eY11OXIuglFFFfWnmBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFe2fs+/Dyy1938Qau0U9tazeXFadd0gAO5x/dGRgd+/HXxOun8A+M9S8F6yt9pz7omws9ux+SZfQ+/oe1cWY0q1bDyhh5WkzahKEZpzWh9wDpxXlfxr+G9j4l0u41m1aKz1e1iMjSsQqTIozhz2IA4b8Dx07Hwp4y0fxL4dOsWdykdtGpNwsrBTbkDJD+n16GvnX4z/ABTm8VTyaVorvFocbfM3RrkjufRfQfiewH5/kWX45Y28bx5X7zf5eZ7WLrUvZa632PJiOcUlFFfpp8+FFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAV1Pw98aah4I1pr/TkjlWRDHLDKDtdcg9uhyODXLUVFSnCrBwmrplRk4u6Pfx+0ZNgbvDcefa7P/wARS/8ADRkv/Qtx/wDgYf8A4ivn+ivJ/wBXsu/59L73/mdP12v/ADH0B/w0ZL/0Lcf/AIGH/wCIo/4aMl/6FuP/AMDD/wDEV8/0Uf6vZd/z6X3v/MPr1f8AmPWPHvxq1bxRpEmmWlnHplrMMTGOQu8i/wB3dgYB78c/TNeUGkpa9HDYSjhYezoxsjCpVlUd5u4lFFFdBmFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAWLC7msL63u7WQx3EEiyxuOqspyD+Yr3Cy/aJvktkW90G3mmAwzxzmME/Qg4/OvCKSuPF4DD4xJV4c1jWlXnS+B2PoD/hoyX/oW4/8AwMP/AMRR/wANGS/9C3H/AOBh/wDiK+f6K4v9Xsu/59L73/mbfXa/8x9Af8NGS/8AQtx/+Bh/+IqtqP7RGoS2kiWGhW9vcMMLLJOZAvvtwM/nXhNJTjkGXxd1SX4/5ieNrPTmLOo3tzqN9PeX0zzXMzl5JHOSzHqar0UleukkrI5W7hRRRTAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAmiuZ4YZYoppEilAEiKxAcA5GR35qKikosFwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//2Q==""<div class=""><i class=""></i></div>""<div class=""><i class=""></i></div>""<div class=""><i class=""></i></div>""<div class=""><i class=""></i></div>""div""luxury-lightbox""video-lightbox""button[type=""]""""""05""5""9665""966""05""966""07""7""9677""967""07""967""00""[name=""]:checked""[name=""]:checked""[name=""]:checked""[name=""]:checked""bot""fa-robot""fa-user""logs""bookings""<div class="" style="">ظ„ط§ طھظˆط¬ط¯ ط³ط¬ظ„ط§طھ ظ…ط±ط§ظ‚ط¨ط© ط­ط§ظ„ظٹط§ظ‹</div>""wa_server_url""wa-server-url-config""ظٹط±ط¬ظ‰ ط¥ط¯ط®ط§ظ„ ط§ظ„ط±ط§ط¨ط·""error""settings/waServerUrl""wa_server_url""طھظ… ط­ظپط¸ ط§ظ„ط±ط§ط¨ط· ظˆط¨ط«ظ‡ ظ„ظ„ط¬ظ…ظٹط¹طŒ ط³ظٹطھظ… طھط­ط¯ظٹط« ط§ظ„طµظپط­ط©""success""ط®ط·ط£ ظپظٹ ط§ظ„طµظ„ط§ط­ظٹط§طھ ظ„ط±ظپط¹ ط§ظ„ط±ط§ط¨ط·""error""wa-staff-select""ظٹط±ط¬ظ‰ ط§ط®طھظٹط§ط± ظ…ظˆط¸ظپ ظ„ظ„ط±ط¨ط·""error""wa-server-status""ظٹطھظ… ط§ظ„ط¢ظ† طھظˆظ„ظٹط¯ ظƒظˆط¯ ط§ظ„ط§ط³طھط¬ط§ط¨ط© ظ„ظ„ظ…ظˆط¸ظپ...""wa-server-status""var(--text-dim)""wa-qr-container""none""start_session""wa-staff-select""ظٹط±ط¬ظ‰ ط§ط®طھظٹط§ط± ط§ظ„ظ…ظˆط¸ظپ ط£ظˆظ„ط§ظ‹""error""ظ‡ظ„ ط£ظ†طھ ظ…طھط£ظƒط¯ ظ…ظ† ظپطµظ„ ط±ظ‚ظ… ط§ظ„ظˆط§طھط³ط§ط¨ ظ„ظ‡ط°ط§ ط§ظ„ظ…ظˆط¸ظپ ظˆط³ط¬ظ„ ط§ظ„ظ…ط­ط§ط¯ط«ط© ط§ظ„ط®ط§طµط© ط¨ظ‡ ظ…ظ† ط§ظ„ط³ظٹط±ظپط±طں""logout_session""wa-server-url-config""app.github.dev""-5173""-3001""settings/waServerUrl""wa_server_url""wa_server_url""wa-staff-select""<option value="">-- ط§ط®طھط± ط§ظ„ظ…ظˆط¸ظپ --</option>""staff""admin""supervisor""admin""ظ…ط¯ظٹط±""supervisor""ظ…ط´ط±ظپ""ظ…ظˆط¸ظپ""selected""""ظ…ظˆط¸ظپ""join_room""join_room""undefined""websocket""polling""connect_error""Connection Error:""websocket error""ط¹ط°ط±ط§ظ‹طŒ ط§ظ„ظ…طھطµظپط­ ظ„ظ… ظٹط³طھط·ط¹ ط§ظ„ط§طھطµط§ظ„ ط¨ط®ط§ط¯ظ… ط§ظ„ظˆط§طھط³ط§ط¨. طھط£ظƒط¯ ظ…ظ† ط£ظ† ط§ظ„ط±ط§ط¨ط· ظٹط¹ظ…ظ„ ظپظٹ طµظپط­ط© ظ…ظ†ظپطµظ„ط©. ط§ظ„ط®ط·ط£: ""connect""Connected to WhatsApp Server!""wa-connection-dot""#4de265""0 0 5px #4de265""ظ…طھطµظ„ ط¨ط§ظ„ط³ظٹط±ظپط±""join_room""qr""wa-staff-select""wa-server-status""wa-qr-container""wa-qr-canvas""ظپظٹ ط§ظ†طھط¸ط§ط± ظ…ط³ط­ ظƒظˆط¯ ط§ظ„ظ€ QR...""var(--text-color)""block""undefined""wa-my-status-title""wa-my-status-desc""wa-my-qr-container""wa-my-qr-canvas""btn-start-my-wa""btn-logout-my-wa""ط¨ط§ظ†طھط¸ط§ط± ظ…ط³ط­ ط±ظ…ط² QR...""ط§ظپطھط­ ظˆط§طھط³ط§ط¨ ط¹ظ„ظ‰ ظ‡ط§طھظپظƒ ظˆط§ظ…ط³ط­ ط§ظ„ط±ظ…ط² ط§ظ„ط¸ط§ظ‡ط± ط£ط¯ظ†ط§ظ‡ ظ„ظٹطھظ… ط±ط¨ط· ط­ط³ط§ط¨ظƒ.""block""طھط­ط¯ظٹط« ط§ظ„ط±ظ…ط²""none""undefined""ready""wa-staff-select""wa-connection-dot""#4de265""0 0 8px #4de265""ظˆط§طھط³ط§ط¨ ط¬ط§ظ‡ط² ظ„ظ„ط¹ظ…ظ„""wa-server-status""wa-qr-container""#00a884""none""wa-my-status-title""wa-my-status-desc""wa-my-qr-container""btn-start-my-wa""btn-logout-my-wa""ظˆط§طھط³ط§ط¨ ظ…طھطµظ„ ط¨ظ†ط¬ط§ط­""ط­ط³ط§ط¨ظƒ ط§ظ„ط¢ظ† ظ…ط±طھط¨ط· ط¨ط§ظ„ظ†ط¸ط§ظ…طŒ ظٹظ…ظƒظ†ظƒ ط§ظ„ط¨ط¯ط، ظپظٹ ط§ط³طھظ‚ط¨ط§ظ„ ظˆط¥ط±ط³ط§ظ„ ط§ظ„ط±ط³ط§ط¦ظ„ ظ„ظ„ط¹ظ…ظ„ط§ط،.""none""none""inline-block""طھظ… ط±ط¨ط· ط­ط³ط§ط¨ ظˆط§طھط³ط§ط¨ ط§ظ„ط®ط§طµ ط¨ظƒ ط¨ظ†ط¬ط§ط­""success""disconnected""Disconnected Event:""wa-connection-dot""#ff4b4b""0 0 5px #ff4b4b""طھظ… ظ‚ط·ط¹ ط§ظ„ط§طھطµط§ظ„ ط¨ط§ظ„ط³ظٹط±ظپط±""طھظ… ظ‚ط·ط¹ ط§ظ„ط§طھطµط§ظ„ ط¨ط§ظ„ط³ظٹط±ظپط±. ظٹط±ط¬ظ‰ ط¥ط¹ط§ط¯ط© ط§ظ„ط±ط¨ط· ظ„طھظپط¹ظٹظ„ ط®ط¯ظ…ط§طھ ط§ظ„ط¯ط±ط¯ط´ط©.""wa-staff-select""wa-server-status""red""wa-my-status-title""wa-my-status-desc""btn-start-my-wa""btn-logout-my-wa""wa-my-qr-container""ط§ظ„ظˆط§طھط³ط§ط¨ ط؛ظٹط± ظ…طھطµظ„""none""inline-block""ط¥ط¹ط§ط¯ط© ط§ظ„ط±ط¨ط· ط§ظ„ط¢ظ†""none""jid_resolved""function""message""Real-time WA message received:""details-modal""hidden""wa-connection-dot""scale(1.2)""scale(1)""s an inbound message, CREATE LEAD
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
    
    // Determine which staff member""admin""supervisor""fa-circle-notch""fa-comment-dots""<div style=""><i class="" style=""></i><br><div style="">ط¬ط§ط±ظٹ ظ…ط²ط§ظ…ظ†ط© ط§ظ„ط±ط³ط§ط¦ظ„...</div></div>""""div""<span style=""><i class="" style=""></i> ط§ظ„ط±ط³ط§ط¦ظ„ ظ…ط­ظ…ظٹط© ظˆظ…ط³ط¬ظ„ط© ط¹ط¨ط± ط§ظ„ط®ط§ط¯ظ… ط§ظ„ط¯ط§ط®ظ„ظٹ</span>""ar-SA""2-digit""2-digit""""<a href="" target="" style="">$1</a>""div""6px 8px 8px 10px""75%""14.5px""4px""relative""0 1px 1.5px rgba(11,20,26,0.1)""pre-wrap""1.4""break-word""anywhere""flex-end""#d9fdd3""#111b21""12px 0 12px 12px""flex-start""#ffffff""#111b21""0 12px 12px 12px""image/""video/""audio/""ptt""ط§ط¶ط؛ط· ظ„ظ„طھط­ظ…ظٹظ„ ظ…ظ† ط§ظ„ط³ظٹط±ظپط±""${userIdToUse}""${phone}""${m.id}""${contId}""${m.media.mimetype}""${m.type}""""image/""""audio/""ptt""""video/""""ظ…ط±ظپظ‚""""""read""delivered""sent""fa-lock""smooth""<div style=""><div style=""><i class="" style=""></i>ظ„ط§ طھظˆط¬ط¯ ط±ط³ط§ط¦ظ„ ط³ط§ط¨ظ‚ط© ظ…ط¹ ظ‡ط°ط§ ط§ظ„ط±ظ‚ظ….<br>ظٹظ…ظƒظ†ظƒ ط¨ط¯ط، ط¯ط±ط¯ط´ط© ط¬ط¯ظٹط¯ط© ط§ظ„ط¢ظ†.</div></div>""details-modal""whatsapp-mgmt""wa-mic-btn""red""ظ„ظ… ظٹطھظ… ط§ظ„ط³ظ…ط§ط­ ط¨ط§ط³طھط®ط¯ط§ظ… ط§ظ„ظ…ظٹظƒط±ظˆظپظˆظ†""error""inactive""wa-mic-btn""#54656f""audio/webm"",""audio/webm""voice_note.webm""""wa-mic-btn""#54656f""wa-media-upload""ط­ط¬ظ… ط§ظ„ظ…ظ„ظپ ظƒط¨ظٹط± ط¬ط¯ط§ظ‹طŒ ط£ظ‚طµظ‰ ط­ط¯ ظٹط³ظ…ط­ ط¨ظ‡ ط§ظ„ظˆط§طھط³ط§ط¨ ظ‡ظˆ 16 ظ…ظٹط¬ط§ط¨ط§ظٹطھ""error"",""application/octet-stream""ظ‡ظ„ طھط±ظٹط¯ ط¥ط±ظپط§ظ‚ ط±ط³ط§ظ„ط© ظ†طµظٹط© ظ…ط¹ ظ‡ط°ط§ ط§ظ„ظ…ظ„ظپطں (ط§ط®طھظٹط§ط±ظٹ)""""""wa-server-input""""admin""""wa-server-chat-box""fa-comment-dots""fa-circle-notch""<div style=""><span style=""><i class="" style=""></i> ط§ظ„ط±ط³ط§ط¦ظ„ ظ…ط­ظ…ظٹط© ظˆظ…ط³ط¬ظ„ط© ط¹ط¨ط± ط§ظ„ط®ط§ط¯ظ… ط§ظ„ط¯ط§ط®ظ„ظٹ</span></div>""ar-SA""2-digit""2-digit""<a href="" target="" style="">$1</a>""div""6px 8px 8px 10px""75%""14.5px""4px""relative""0 1px 1.5px rgba(11,20,26,0.1)""pre-wrap""1.4""break-word""anywhere""flex-end""#d9fdd3""#111b21""12px 0 12px 12px""smooth""POST""Content-Type""application/json""ط§ظ„ظˆط§طھط³ط§ط¨ ط؛ظٹط± ظ…طھطµظ„ ظپظٹ ط§ظ„ط¥ط¯ط§ط±ط©طŒ ط§ظ„ظ…ط±ط¬ظˆ ظپط­طµ ط§ظ„ط§طھطµط§ظ„""error""ط§ظ„ط®ط§ط¯ظ… ط§ظ„ط¨ط±ظ…ط¬ظٹ ظ…ط؛ظ„ظ‚ ط£ظˆ ظ…طھظˆظ‚ظپ""error""wa-media-upload""""quickReplies""quickReplies""<i class=""></i>""ظ„ط§ طھظˆط¬ط¯ ظ†طھط§ط¦ط¬ طھط·ط§ط¨ظ‚ ط¨ط­ط«ظƒ""ظ„ط§ طھظˆط¬ط¯ ظ†ظ…ط§ط°ط¬ ط±ط¯ظˆط¯ ط³ط±ظٹط¹ط© ط­ط§ظ„ظٹط§ظ‹""${q.id}""${q.id}""&quot;""\\\\""\\"").join("");
    
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




// Safety patch to prevent loading hang
setTimeout(() => {
  const splash = document.getElementById("");
  if (splash && !splash.classList.contains("")) {
    console.warn("");
    splash.style.opacity = "";
    setTimeout(() => { 
      splash.classList.add(""); 
      try { splash.remove(); } catch(e) {}
    }, 800);
    if (window.state) window.state.firstLoadDone = true;
  }
}, 7000);


// UI enhancement for roles
const originalUpdateAppUI = window.updateAppUI;
window.updateAppUI = function() {
  if (originalUpdateAppUI) originalUpdateAppUI();
  const nameLabel = document.getElementById("");
  const isAdmin = window.state.userProfile?.role === "";
  if (nameLabel && !window.state.userProfile?.name) {
    nameLabel.innerText = isAdmin ? "" : "";
  }
};


// WhatsApp Server URL Debugging
console.log("");
console.log("", window._waServerActiveUrl);
console.log("");


// Employee Management Enhancement
window.promoteToAdmin = async function(uid) {
  if (confirm("")) {
    try {
      await admin.database().ref("" + uid).update({ role: "" });
      window.showLuxuryToast("");
      window.syncAdminTables("");
    } catch (e) {
      window.showLuxuryToast("", "");
    }
  }
};


// Export Firebase SDK for patches
window.FirebaseSDK = { ref, db, push, set, update, remove, auth };
