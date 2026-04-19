import{i as ne,g as oe,a as ae,b as se,c as le,d as re,s as de,o as ce,u as _,r as T,e as M,f as V,h as ue,j as me,k as J,p as R,l as pe,m as X,n as ge}from"./firebase-BDzxU-oD.js";import"./emoji-picker-CeBMFWb3.js";import"./vendor-Bg_btqvK.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function i(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(n){if(n.ep)return;n.ep=!0;const a=i(n);fetch(n.href,a)}})();const fe={apiKey:"AIzaSyDQodWTn2wa0WzQuHqzZt2Ex6CdnQdrlUU",authDomain:"onecar1.firebaseapp.com",projectId:"onecar1",storageBucket:"onecar1.firebasestorage.app",messagingSenderId:"735648367644",appId:"1:735648367644:web:44ae368553280b14bdcbd9",measurementId:"G-RSTPV8SRXT",databaseURL:"https://onecar1-default-rtdb.firebaseio.com"},P=ne(fe);oe(P);const S=ae(P),j=se(P);le(P);re(P);window.state={cars:[],ads:[],bookings:[],users:[],notifications:[],logs:[],partners:[],locations:[],brands:[],agents:[],specs:[],packages:[],blogs:[],reviews:[],plates:[],sales:[],user:null,userProfile:null,settings:{},lang:localStorage.getItem("luxury_lang")||"ar",soundEnabled:localStorage.getItem("luxury_sound_enabled")!=="false",tempImages:[],bookingFilter:"all",bookingSubStatusFilter:"all",currentReportPeriod:"day",firstLoadDone:!1,inventoryPage:1,inventorySize:8,sliderIndex:0};const we={ar:{welcome:"مرحباً بك في عالم الفخامة",inventory:"مخزون السيارات المتاح",totalCars:"إجمالي السيارات",totalBookings:"إجمالي الطلبات",totalValue:"قيمة المخزون",searchPlaceholder:"ابحث عن سيارتك المثالية...",loading:"جاري التحميل...",noResults:"لم يتم العثور على نتائج تطابق بحثك",applyNow:"اطلبها الآن",details:"عرض التفاصيل",back:"رجوع",save:"حفظ",delete:"حذف",edit:"تعديل",cancel:"إلغاء",successMsg:"تمت العملية بنجاح",errorMsg:"حدث خطأ غير متوقع",staff:"قسم المبيعات والمتابعة",admin:"إدارة النظام",supervisor:"مشرف النظام"},en:{welcome:"Welcome to the World of Luxury",inventory:"Available Vehicle Inventory",totalCars:"Total Vehicles",totalBookings:"Total Bookings",totalValue:"Inventory Value",searchPlaceholder:"Search for your perfect car...",loading:"Loading...",noResults:"No results found matching your search",applyNow:"Request Now",details:"View Details",back:"Back",save:"Save",delete:"Delete",edit:"Edit",cancel:"Cancel",successMsg:"Operation successful",errorMsg:"An unexpected error occurred",staff:"Sales & Follow-up Department",admin:"System Administration",supervisor:"System Supervisor"}};window.showLuxuryToast=function(t,e="success"){const i=document.getElementById("toast-container");if(!i)return;const o=document.createElement("div");o.className=`toast-v2 ${e}`,o.style.cssText=`
    background: ${e==="success"?"rgba(16, 185, 129, 0.9)":"rgba(239, 68, 68, 0.9)"};
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
  `;const n=e==="success"?"fa-check-circle":"fa-exclamation-circle";o.innerHTML=`<i class="fas ${n}"></i> <span>${t}</span>`,i.appendChild(o),setTimeout(()=>{o.style.opacity="0",o.style.transform="translateY(-20px)",o.style.transition="all 0.4s ease-in",setTimeout(()=>o.remove(),400)},4e3)};window.compressImage=function(t,e=1e3,i=1e3,o=.6){return new Promise((n,a)=>{if(!t||!(t instanceof File||t instanceof Blob)){n(t);return}const s=new FileReader;s.readAsDataURL(t),s.onload=d=>{const l=new Image;l.src=d.target.result,l.onload=()=>{const r=document.createElement("canvas");let u=l.width,f=l.height;u>f?u>e&&(f*=e/u,u=e):f>i&&(u*=i/f,f=i),r.width=u,r.height=f,r.getContext("2d").drawImage(l,0,0,u,f),n(r.toDataURL("image/jpeg",o))},l.onerror=a},s.onerror=a})};window.openModal=function(t){const e=document.getElementById(t);if(e){e.classList.remove("hidden"),document.body.style.overflow="hidden";const i=document.querySelectorAll(".modal:not(.hidden)");e.style.zIndex=2e3+i.length*10,ye(`modal-${t}`)}};window.closeModal=function(t,e=!1){var o;const i=document.getElementById(t);i&&(i.classList.add("hidden"),i.style.zIndex="",!e&&((o=history.state)==null?void 0:o.type)===`modal-${t}`&&history.back(),document.querySelector(".modal:not(.hidden)")||(document.body.style.overflow="auto"))};window.setModalTitle=function(t,e){const i=document.getElementById(t+"-title");i&&(i.innerText=e)};window.switchLuxuryTab=function(t){const e=document.querySelectorAll(".pane, .admin-tab-content"),i=document.querySelectorAll(".dash-tab, .admin-sidebar-nav li");e.forEach(s=>s.classList.add("hidden")),i.forEach(s=>s.classList.remove("active"));const o=document.getElementById(t),n=document.querySelector(`[data-tab="${t}"]`);o&&(o.classList.remove("hidden"),o.classList.add("active"),o.style.animation="fade-up 0.5s ease-out forwards"),n&&n.classList.add("active");const a=document.getElementById("bookings-submenu");if(a&&a.classList.toggle("active",t==="bookings-mgmt"||t==="all-bookings"),window.innerWidth<1024){const s=document.querySelector(".dash-sidebar, .admin-sidebar-v2");s&&s.classList.remove("active")}t==="whatsapp-monitor-mgmt"&&window.initWhatsAppServer&&window.initWhatsAppServer(),t==="whatsapp-mgmt"&&window.startCurrentWASession(),t==="quick-replies-mgmt"&&window.renderQuickRepliesAdmin&&window.renderQuickRepliesAdmin()};function ye(t){var e;((e=history.state)==null?void 0:e.type)!==t&&history.pushState({type:t},"")}window.normalizePhone=function(t){if(!t)return"";const e=t.toString().trim();if(e.includes("@s.whatsapp.net"))return e.split("@")[0].replace(/\D/g,"");if(e.includes("@lid"))return e;let i=e.replace(/\D/g,"");if(i.startsWith("9660")?i="966"+i.substring(4):i.startsWith("9670")&&(i="967"+i.substring(4)),i.startsWith("966")||i.startsWith("967"))return i;if(i.startsWith("05"))return"966"+i.substring(1);if(i.startsWith("07"))return"967"+i.substring(1);if(i.startsWith("0"))return"966"+i.substring(1);if(i.length===9){if(i.startsWith("7"))return"967"+i;if(i.startsWith("5"))return"966"+i}return i};document.addEventListener("DOMContentLoaded",()=>{ve(),ee(),he(),window.trackVisit(),be()});function be(){const t=document.querySelector(".mobile-btn"),e=document.querySelector(".nav-menu"),i=document.querySelector(".mobile-nav-overlay"),o=document.querySelector(".menu-close-btn"),n=(p=!1)=>{const g=p===!1?!e.classList.contains("active"):!1;e.classList.toggle("active",g),i.classList.toggle("active",g),document.body.style.overflow=g?"hidden":"";const x=t==null?void 0:t.querySelector("i");x&&(x.className=g?"fas fa-times":"fas fa-bars-staggered")};t&&(t.onclick=()=>n()),i&&(i.onclick=()=>n(!0)),o&&(o.onclick=()=>n(!0)),document.querySelectorAll(".nav-menu a").forEach(p=>{p.addEventListener("click",()=>n(!0))});const a=document.querySelector(".mobile-menu-header .dynamic-name-ar");a&&window.__DYNAMIC_NAME_AR__&&(a.innerText=window.__DYNAMIC_NAME_AR__);const s=document.getElementById("admin-trigger");s&&(s.onclick=p=>{p.preventDefault(),window.openModal("admin-modal")});const d=document.getElementById("theme-btn");d&&(d.onclick=()=>{const g=(document.body.getAttribute("data-theme")||"dark")==="dark"?"light":"dark";document.body.setAttribute("data-theme",g),localStorage.setItem("luxury_theme",g),localStorage.setItem("theme_manually_overridden","true"),d.innerHTML=g==="dark"?'<i class="fas fa-sun"></i>':'<i class="fas fa-moon"></i>'});const l=document.getElementById("lang-btn");l&&(l.onclick=()=>{window.state.lang=window.state.lang==="ar"?"en":"ar",localStorage.setItem("luxury_lang",window.state.lang),ee(),window.applyInventoryFilters(),l.innerText=window.state.lang==="ar"?"EN":"AR"}),document.querySelectorAll(".dash-tab").forEach(p=>{p.onclick=()=>window.switchLuxuryTab(p.dataset.tab)});const r=document.getElementById("car-search-input");r&&(r.oninput=()=>window.applyInventoryFilters()),["filter-make","filter-type","filter-year","filter-sort"].forEach(p=>{const g=document.getElementById(p);g&&(g.onchange=()=>{window.state.inventoryPage=1,window.applyInventoryFilters()})});const f=document.getElementById("p-prev"),c=document.getElementById("p-next");f&&(f.onclick=()=>window.moveLuxurySlider(-1)),c&&(c.onclick=()=>window.moveLuxurySlider(1)),setInterval(()=>{const p=document.getElementById("luxury-splash");(!p||p.classList.contains("hidden"))&&window.moveLuxurySlider(1)},5e3),["calc-car-price","calc-down-pay","calc-years"].forEach(p=>{const g=document.getElementById(p);g&&(g.oninput=()=>window.calculateLuxuryFinancing()),g&&g.tagName==="SELECT"&&(g.onchange=()=>window.calculateLuxuryFinancing())}),document.querySelectorAll(".modal-close").forEach(p=>{p.onclick=g=>{g.stopPropagation();const x=p.closest(".modal");if(x){if(x.id==="admin-modal"&&window.state.user&&!confirm("هل تريد الخروج من لوحة التحكم؟"))return;window.closeModal(x.id)}}}),window.onclick=p=>{const g=document.getElementById("wa-emoji-picker");if(g&&g.style.display!=="none"){const b=p.target.closest(".fa-smile")!==null,I=g.contains(p.target);!b&&!I&&(g.style.display="none")}const x=Array.from(document.querySelectorAll(".modal:not(.hidden)"));if(x.length>0){const b=x[x.length-1];if(p.target===b){if(b.id==="admin-modal"&&window.state.user&&!confirm("هل تريد الخروج من لوحة التحكم؟"))return;window.closeModal(b.id)}}},window.addEventListener("popstate",p=>{const g=document.querySelectorAll(".modal:not(.hidden)");g.length>0&&g.forEach(x=>{var b;((b=p.state)==null?void 0:b.type)!==`modal-${x.id}`&&window.closeModal(x.id,!0)})}),window.onscroll=()=>{const p=document.getElementById("main-nav");p&&p.classList.toggle("scrolled",window.scrollY>50);const g=document.getElementById("scroll-jump");g&&g.classList.toggle("hidden",window.scrollY<500)},document.getElementById("scroll-jump")&&(document.getElementById("scroll-jump").onclick=()=>window.scrollTo({top:0,behavior:"smooth"}));const m=document.getElementById("login-form");m&&(m.onsubmit=p=>window.loginAdmin(p));const y=document.getElementById("booking-form");y&&(y.onsubmit=p=>window.submitBooking(p));const k=document.getElementById("item-form");k&&(k.onsubmit=p=>window.saveLuxuryItem(p))}function ve(){const t=JSON.parse(localStorage.getItem("luxury-settings-cache")||"{}"),e=localStorage.getItem("theme_manually_overridden")==="true",i=(e?localStorage.getItem("luxury_theme"):t.defaultTheme)||"dark";e||localStorage.setItem("luxury_theme",i),document.body.setAttribute("data-theme",i);const o=document.getElementById("theme-btn");o&&(o.innerHTML=i==="dark"?'<i class="fas fa-sun"></i>':'<i class="fas fa-moon"></i>')}function ee(){const t=window.state.lang;document.body.dir=t==="ar"?"rtl":"ltr",document.body.classList.toggle("en",t==="en");const e=we[t];document.querySelectorAll("[data-i18n]").forEach(i=>{const o=i.getAttribute("data-i18n");e[o]&&(i.innerText=e[o])})}async function he(){await de(j,ge);const t=["users","plates","locations","brands","agents","specs","packages","blogs","reviews","cars","ads","sales","settings","partners"],e=["bookings","notifications","logs","quickReplies"],i={};function o(n){i[n]||(i[n]=X(T(S,n),a=>{const s=a.val();n==="settings"?(window.state.settings=s||{},window.applySettings(s)):(window.state[n]=s?Object.entries(s).map(([d,l])=>({...l,id:d})):[],n==="cars"&&window.applyInventoryFilters(),n==="ads"&&window.renderAdsSlider(),n==="sales"&&window.renderSalesVideos(),n==="partners"&&window.renderPartners(),n==="reviews"&&window.renderPublicReviews(),window.state.user&&(window.syncAdminTables(n),window.updateStatistics())),xe()},a=>{console.warn(`Listener for ${n} failed:`,a.message),delete i[n]}))}ce(j,async n=>{if(window.state.user=n,n){const a=T(S,`users/${n.uid}`);X(a,s=>{window.state.userProfile={...s.val(),id:n.uid},K(),window.initWhatsAppServer&&window.initWhatsAppServer()}),e.forEach(o)}else window.state.userProfile=null,K(),e.forEach(a=>{i[a]&&delete i[a]})}),t.forEach(o)}function xe(){var o,n;if(window.state.firstLoadDone)return;const t=window.state.settings,e=t==null?void 0:t.maintenanceMode,i=((o=window.state.userProfile)==null?void 0:o.role)==="admin"||((n=window.state.userProfile)==null?void 0:n.role)==="supervisor";if(e&&!i){const a=document.getElementById("luxury-splash");a&&(a.innerHTML=`
            <div class="maint-content" style="text-align:center; color:white; padding: 20px;">
                <i class="fas fa-tools" style="font-size:60px; color:var(--p-red); margin-bottom:20px;"></i>
                <h1 class="luxury-font" style="margin-bottom:10px;">الموقع تحت الصيانة</h1>
                <p style="opacity:0.8;">نعمل حالياً على تحديث المنصة لتقديم تجربة أفضل، سنعود قريباً جداً.</p>
                <div style="margin-top:30px;">
                    <button class="btn-premium btn-sm" onclick="window.openModal('admin-modal')">دخول الإدارة</button>
                </div>
            </div>
          `,a.style.opacity="1",a.classList.remove("hidden"));return}t&&Object.keys(t).length>0&&setTimeout(()=>{const a=document.getElementById("luxury-splash");a&&(a.style.opacity="0",setTimeout(()=>{a.classList.add("hidden"),a.remove()},800)),window.state.firstLoadDone=!0},1200)}function K(){var s,d,l;const t=!!window.state.user,e=((s=window.state.userProfile)==null?void 0:s.role)==="admin",i=((d=window.state.userProfile)==null?void 0:d.role)==="supervisor";document.body.classList.toggle("is-logged-in",t),document.body.classList.toggle("is-admin",e),document.body.classList.toggle("is-supervisor",i);const o=document.getElementById("admin-login-ui"),n=document.getElementById("admin-dash-ui");o&&o.classList.toggle("hidden",t),n&&n.classList.toggle("hidden",!t);const a=document.getElementById("admin-trigger");if(a&&(a.innerText=t?"لوحة التحكم":"تسجيل الدخول"),document.querySelectorAll(".admin-only").forEach(r=>r.classList.toggle("hidden",!e&&!i)),document.querySelectorAll(".staff-only").forEach(r=>r.classList.toggle("hidden",e||i)),t){window.syncAdminTables("all"),window.updateStatistics();const r=document.getElementById("user-display-name"),u=document.getElementById("user-role-label");if(r&&(r.innerText=((l=window.state.userProfile)==null?void 0:l.name)||"المسؤول"),u){let f="قسم المبيعات والمتابعة";e?f="إدارة النظام":i&&(f="مشرف النظام"),u.innerText=f}}}window.toggleAvailability=async function(){if(!window.state.userProfile)return;const t=window.state.userProfile.isAvailable||!1;try{await _(T(S,`users/${window.state.user.uid}`),{isAvailable:!t}),window.state.userProfile.isAvailable=!t,window.showLuxuryToast(t?"تم تعيين الحالة: غير متاح":"أنت متاح الآن لاستلام الطلبات"),window.updateStatistics()}catch{window.showLuxuryToast("فشل تحديث الحالة","error")}};window.toggleSound=function(){window.state.soundEnabled=!window.state.soundEnabled,localStorage.setItem("luxury_sound_enabled",window.state.soundEnabled);const t=document.getElementById("sound-toggle");t&&(t.checked=window.state.soundEnabled),window.showLuxuryToast(window.state.soundEnabled?"تم تفعيل التنبيهات الصوتية":"تم كتم التنبيهات")};window.setBookingFilter=function(t,e,i="all",o=null){window.state.bookingFilter=t,window.state.bookingSubStatusFilter=i;const n=document.getElementById("filter-booking-status");n&&n.value!==t&&(n.value=t);const a=document.getElementById("filter-booking-sub-status");if(a){const s={new:["not_contacted","contacted"],waiting:["docs_received","waiting_calc","waiting_docs","waiting_signature"],inquiry:["docs_not_received"],sold:["signed","delivered"],done:["done"],cancelled:["no_response","obligations","calc_rejected","ineligible","duplicate"]},d={not_contacted:"لم يتم التواصل",contacted:"تم التواصل",docs_received:"تم استلام الاوراق",waiting_calc:"انتظار رد العميل",waiting_docs:"إنتظار إكمال الاوراق",waiting_signature:"إنتظار توقيع العميل",docs_not_received:"لم يتم استلام الاوراق",signed:"تم التوقيع",delivered:"تم التسليم",done:"تم",no_response:"لم يتم رد العميل",obligations:"التزامات",calc_rejected:"رفض الحسبة",ineligible:"غير مسموح له",duplicate:"مكرر"};let l=t==="all"?Object.keys(d):s[t]||[];a.innerHTML='<option value="all">جميع الحالات الفرعية</option>',l.forEach(r=>{const u=document.createElement("option");u.value=r,u.textContent=d[r],a.appendChild(u)}),Array.from(a.options).some(r=>r.value===i)?a.value=i:(a.value="all",window.state.bookingSubStatusFilter="all",i="all")}document.querySelectorAll(".sub-tab.b-filter").forEach(s=>{if(s.getAttribute("onclick")&&s.getAttribute("onclick").includes(`'${t}'`)){document.querySelectorAll(".sub-tab.b-filter").forEach(l=>l.classList.remove("active")),s.classList.add("active"),document.querySelectorAll(".deep-submenu").forEach(l=>l.classList.remove("active"));const d=s.closest(".status-group");if(d){const l=d.querySelector(".deep-submenu");l&&l.classList.add("active")}}}),document.querySelectorAll(".deep-tab").forEach(s=>{s.classList.remove("active"),i!=="all"&&s.getAttribute("onclick")&&s.getAttribute("onclick").includes(`'${i}'`)&&s.classList.add("active")}),window.syncAdminTables("bookings")};window.applyInventoryFilters=function(){var y,k,p,g,x,b,I;if(!document.getElementById("cars-container"))return;const e=document.getElementById("filter-make"),i=document.getElementById("filter-year");e&&e.options.length<=1&&[...new Set(window.state.cars.map($=>$.make))].sort().forEach($=>{const h=document.createElement("option");h.value=$,h.textContent=$,e.appendChild(h)}),i&&i.options.length<=1&&[...new Set(window.state.cars.map($=>$.year))].sort(($,h)=>h-$).forEach($=>{const h=document.createElement("option");h.value=$,h.textContent=$,i.appendChild(h)});const o=(((y=document.getElementById("car-search-input"))==null?void 0:y.value)||"").toLowerCase(),n=((k=document.getElementById("filter-make"))==null?void 0:k.value)||"all",a=((p=document.getElementById("filter-type"))==null?void 0:p.value)||"all",s=((g=document.getElementById("filter-year"))==null?void 0:g.value)||"all",d=((x=document.getElementById("filter-sort"))==null?void 0:x.value)||"newest";let l=((b=window.state.cars)==null?void 0:b.filter(v=>{const $=!o||(v.make+" "+v.model).toLowerCase().includes(o),h=n==="all"||v.make===n,L=a==="all"||v.status===a,z=s==="all"||v.year===s;return $&&h&&L&&z}))||[];d==="price-asc"?l.sort((v,$)=>(Number(v.price)||0)-(Number($.price)||0)):d==="price-desc"?l.sort((v,$)=>(Number($.price)||0)-(Number(v.price)||0)):d==="year-asc"?l.sort((v,$)=>(Number(v.year)||0)-(Number($.year)||0)):l.sort((v,$)=>new Date($.createdAt||0)-new Date(v.createdAt||0));const r=((I=window.state.cars)==null?void 0:I.filter(v=>v.isFeatured).slice(0,3))||[];ke(r.length>0?r:window.state.cars.slice(0,3));const u=l.length,f=window.state.inventoryPage||1,c=window.state.inventorySize||8,w=(f-1)*c,m=l.slice(w,w+c);renderCarGrid(m),Ie(u,f,c)};function ke(t){const e=document.getElementById("featured-offers-container");if(!e||!t.length)return;const i=document.getElementById("featured-offers-section");i&&(i.style.display="block"),e.innerHTML=t.map(o=>`
        <div class="offer-card-v2" onclick="window.viewLuxuryCar('${o.id}')">
            <div class="offer-badge">عرض حصري</div>
            <div class="offer-img-box">
                <img src="${o.image||"logo.jpg"}" alt="${o.make}" loading="lazy" onerror="this.src='logo.jpg'">
            </div>
            <div class="offer-info">
                <h4>${o.make} ${o.model}</h4>
                <div class="offer-price">
                    <span>${(Number(o.price)||0).toLocaleString()}</span>
                    <small style="font-size: 14px; margin-right: 5px;">ريال</small>
                </div>
                <button class="btn-premium btn-sm" style="margin-top: 10px; width: 100%;">تفاصيل العرض</button>
            </div>
        </div>
    `).join("")}function Ie(t,e,i){const o=document.getElementById("pagination-wrap");if(!o)return;const n=Math.ceil(t/i);if(n<=1){o.innerHTML="";return}let a="";e>1&&(a+=`<button class="p-btn nav-dir" onclick="window.state.inventoryPage=${e-1}; window.applyInventoryFilters(); window.scrollTo({top: document.getElementById('inventory').offsetTop - 100, behavior:'smooth'})"><i class="fas fa-chevron-right"></i> السابق</button>`);for(let s=1;s<=n;s++)a+=`<button class="p-btn ${s===e?"active":""}" onclick="window.state.inventoryPage=${s}; window.applyInventoryFilters(); window.scrollTo({top: document.getElementById('inventory').offsetTop - 100, behavior:'smooth'})">${s}</button>`;e<n&&(a+=`<button class="p-btn nav-dir" onclick="window.state.inventoryPage=${e+1}; window.applyInventoryFilters(); window.scrollTo({top: document.getElementById('inventory').offsetTop - 100, behavior:'smooth'})">التالي <i class="fas fa-chevron-left"></i></button>`),o.innerHTML=a}window.renderPartners=function(){const t=document.getElementById("front-partners-grid");!t||!window.state.partners||(t.innerHTML=window.state.partners.map(e=>`
    <div class="partner-logo-v2">
        <img src="${e.logo}" alt="${e.name}" title="${e.name}">
    </div>
  `).join(""))};window.renderPublicReviews=function(){const t=document.getElementById("public-reviews-container");if(!(!t||!window.state.reviews)){if(window.state.reviews.length===0){t.innerHTML='<div class="no-results-v2"><p>لا توجد آراء عملاء حالياً</p></div>';return}t.innerHTML=window.state.reviews.map(e=>{const i=e.avatar||e.image||"",o=e.name||"عميل غير معروف",n=e.car?`<span> اشترى <span style="color:var(--p-copper); font-weight:bold;">${e.car}</span></span>`:'<span>عميل مُحقّق <i class="fas fa-check-circle"></i></span>';return`
    <div class="review-card-v2" data-aos="zoom-in">
        <div class="review-stars">
            ${'<i class="fas fa-star"></i>'.repeat(Number(e.rating||5))}
        </div>
        <p class="review-text">"${e.text||"لا يوجد تعليق"}"</p>
        <div class="review-author">
           <div class="review-author-avatar">
                ${i?`<img src="${i}" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`:o.charAt(0)}
           </div>
           <div class="review-author-info" style="line-height:1.4;">
              <strong style="display:block; font-size:16px;">${o}</strong>
              <div style="font-size:12px; opacity:0.8;">${n}</div>
           </div>
        </div>
    </div>
  `}).join("")}};window.renderCarGrid=function(t){const e=document.getElementById("cars-container");if(e){if(t.length===0){e.innerHTML='<div class="no-results-v2"><i class="fas fa-search"></i> <p>لم يتم العثور على سيارات تطابق بحثك</p></div>';return}e.innerHTML=t.map(i=>`
    <div class="car-card-premium" onclick="window.viewLuxuryCar('${i.id}')" data-aos="fade-up">
      <div class="car-img-wrap">
        <img src="${i.image||"logo.jpg"}" alt="${i.make}" loading="lazy" onerror="this.src='logo.jpg'">
        <div class="car-price-v3">${(Number(i.price)||0).toLocaleString()} <small>ريال</small></div>
        <div class="car-badge-v3 ${i.status==="available"?"available":i.status==="reserved"?"reserved":"sold"}">${i.status==="available"?"متاح":i.status==="reserved"?"محجوز":"مباع"}</div>
      </div>
      <div class="car-info-v3">
        <span class="car-year-v3">${i.year}</span>
        <h3 class="car-title-v3">${i.make} ${i.model}</h3>
        <div class="car-specs-v3">
          <div class="spec-item-v3">
            <i class="fas fa-road"></i>
            <span>${(Number(i.mileage)||0).toLocaleString()} كم</span>
          </div>
          <div class="spec-item-v3">
            <i class="fas fa-gas-pump"></i>
            <span>${i.fuelType||"بنزين"}</span>
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
  `).join("")}};window.viewLuxuryCar=function(t){const e=window.state.cars.find(s=>s.id===t);if(!e||!document.getElementById("details-modal"))return;let o=e.images||[];o.length===0&&e.image&&(o=[e.image]),o.length===0&&(o=["logo.jpg"]),window.normalizePhone(window.state.settings.contactSales||"0500000000"),`${e.make}${e.model}${e.year}${Number(e.price).toLocaleString()}${window.location.origin}${e.id}`;const n=`
    <div class="details-luxury-container animate-fade-in-v2">
      <!-- Top Header Section -->
      <div class="details-top-v4">
        <div class="details-header-v3">
          <div class="d-badge-row">
            <span class="badge-v3 year">${e.year}</span>
            ${e.isFeatured?'<span class="badge-v3 featured"><i class="fas fa-crown"></i> عرض مميز</span>':""}
            ${e.status==="available"?'<span class="badge-v3 status available">متاح حالياً</span>':e.status==="reserved"?'<span class="badge-v3 status reserved">محجوز</span>':'<span class="badge-v3 status sold">مباع</span>'}
          </div>
          <h1 class="luxury-font">${e.make} ${e.model}</h1>
          <p class="car-subtitle-v5">${e.engine||""} | ${e.gearbox||""} | ${e.fuelType||""}</p>
        </div>
        <div class="price-premium-v6">
          <div class="p-header">السعر الكاش</div>
          <div class="p-main">
            <span class="p-amount">${(Number(e.price)||0).toLocaleString()}</span>
            <span class="p-curr">ريال</span>
          </div>
          <div class="VAT-hint">السعر شامل ضريبة القيمة المضافة</div>
        </div>
      </div>

      <div class="details-main-split">
        <div class="details-media">
          <div class="main-viewer" onclick="window.openFullscreenGallery('${e.id}', document.getElementById('active-luxury-img').src)">
            <img src="${o[0]}" id="active-luxury-img" alt="${e.make} ${e.model}" onerror="this.src='logo.jpg'">
            <div class="viewer-actions">
              <button class="viewer-btn" onclick="event.stopPropagation(); window.switchLuxuryDetailImg('${e.id}', -1)"><i class="fas fa-chevron-right"></i></button>
              <button class="viewer-btn" onclick="event.stopPropagation(); window.switchLuxuryDetailImg('${e.id}', 1)"><i class="fas fa-chevron-left"></i></button>
            </div>
            <div class="zoom-hint"><i class="fas fa-expand"></i> انقر للتكبير</div>
          </div>
          ${o.length>1?`
          <div class="thumbs-view custom-scrollbar">
            ${o.map((s,d)=>`
              <div class="thumb-wrapper ${d===0?"active":""}" onclick="window.setLuxuryDetailImg(this, '${s}')">
                <img src="${s}" class="thumb-frame" onerror="this.src='logo.jpg'">
              </div>
            `).join("")}
          </div>
          `:""}
        </div>

        <div class="details-info-v4">
          <div class="specs-grid-v4-compact">
            <div class="spec-card-v5">
               <i class="fas fa-tachometer-alt"></i>
               <div class="s-info"><span>الممشى</span><strong>${(Number(e.mileage)||0).toLocaleString()} كم</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-calendar-alt"></i>
               <div class="s-info"><span>الموديل</span><strong>${e.year}</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-fill-drip"></i>
               <div class="s-info"><span>اللون الخارجي</span><strong>${e.color||"غير محدد"}</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-palette"></i>
               <div class="s-info"><span>اللون الداخلي</span><strong>${e.interiorColor||"غير محدد"}</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-gas-pump"></i>
               <div class="s-info"><span>الوقود</span><strong>${e.fuelType||"بنزين"}</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-cog"></i>
               <div class="s-info"><span>الجير</span><strong>${e.gearbox||"أوتوماتيك"}</strong></div>
            </div>
             <div class="spec-card-v5">
               <i class="fas fa-car-side"></i>
               <div class="s-info"><span>الفئة</span><strong>${e.bodyType||"فاخرة"}</strong></div>
            </div>
             <div class="spec-card-v5">
               <i class="fas fa-shield-alt"></i>
               <div class="s-info"><span>الحالة</span><strong>${e.status==="available"?"متاح":e.status==="sold"?"مباع":"محجوز"}</strong></div>
            </div>
          </div>

          <div class="desc-card-v5" id="luxury-car-desc-container">
            <h3><i class="fas fa-list-ul"></i> وصف ومميزات السيارة</h3>
            <div class="desc-text-v5 custom-scrollbar" id="luxury-desc-body">
              ${(e.desc||e.description||e.details||"سيارة بحالة الوكالة...").replace(/\n/g,"<br>")}
            </div>
          </div>

          <div class="details-footer-actions-v3">
             <button onclick="window.bookCar('${e.id}')" class="btn-luxury-v2 wa-btn" style="border:none; text-align:right;">
               <i class="fas fa-calendar-check"></i>
               <div class="btn-txt">
                 <strong>إحجز هذه السيارة الآن</strong>
                 <span>تعبئة طلب حجز الخدمة</span>
               </div>
             </button>
             <a href="tel:${window.state.settings.contactSales||""}" class="btn-luxury-v2 call-btn">
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
  `,a=document.getElementById("details-modal-body");if(a){a.innerHTML=n,a.scrollTop=0;const s=document.getElementById("details-modal");if(s){s.scrollTop=0;const d=s.querySelector(".modal-inner");d&&(d.scrollTop=0)}window.openModal("details-modal")}window.trackCarView(t)};window.bookCar=function(t){const e=window.state.cars.find(n=>n.id===t);if(!e)return;const i=document.getElementById("b-car");i&&(i.value=`${e.make} ${e.model} ${e.year}`),window.closeModal("details-modal");const o=document.getElementById("booking");o&&(o.scrollIntoView({behavior:"smooth"}),i&&(i.focus(),i.style.borderColor="var(--p-copper)",setTimeout(()=>i.style.borderColor="",2e3)))};window.viewBookingDetails=function(t){var a;const e=(window.state.bookings||[]).find(s=>s.id===t);if(!e)return;(a=window.state.users.find(s=>s.id===e.assignedTo))!=null&&a.name,e.status==="sold"||e.status==="available"||e.status==="rejected"||e.status,e.status==="sold"||e.status;const i={new:"جديد",waiting:"بالانتظار",inquiry:"استفسار",sold:"مكتمل",rejected:"مرفوض",available:"متاح"},o=`
    <div class="booking-modal-layout details-luxury-container" style="direction: rtl;">
      
      <!-- القسم الأيمن: تفاصيل الحجز -->
      <div class="details-info-v4 custom-scrollbar">
        <div class="p-header" style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:25px;">
           <div>
              <h2 style="margin:0; font-size:28px; color:var(--text-main); font-weight:800;">${e.name||"عميل مجهول"}</h2>
              <p style="margin:5px 0 0; color:var(--text-dim); display:flex; align-items:center; gap:8px;">
                <i class="fas fa-phone-alt" style="font-size:12px; color:var(--p-copper);"></i> ${e.phone}
              </p>
           </div>
           <div class="status-badge-v3" style="background:var(--bg-card); padding:8px 16px; border-radius:12px; border:1px solid var(--glass-border); text-align:center;">
              <span style="display:block; font-size:10px; color:var(--text-dim); text-transform:uppercase;">حالة الطلب الحالية</span>
              <strong style="color:var(--p-copper); font-size:14px;">${i[e.status]||e.status}</strong>
           </div>
        </div>

        <div class="details-grid-lite" style="display:grid; grid-template-columns: repeat(2, 1fr); gap:20px; margin-bottom:30px;">
            <div class="d-item" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:15px; border:1px solid var(--glass-border);">
                <span style="display:block; font-size:11px; color:var(--text-dim); margin-bottom:5px;">السيارة المطلوبة</span>
                <strong style="font-size:15px; color:var(--p-copper);"><i class="fas fa-car" style="margin-left:8px;"></i>${e.carRequested||"غير محدد"}</strong>
            </div>
            <div class="d-item" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:15px; border:1px solid var(--glass-border);">
                <span style="display:block; font-size:11px; color:var(--text-dim); margin-bottom:5px;">تاريخ الطلب</span>
                <strong style="font-size:14px;"><i class="far fa-calendar-alt" style="margin-left:8px;"></i>${new Date(e.createdAt).toLocaleDateString("ar-SA")}</strong>
            </div>
        </div>

        <div class="update-section" style="background:rgba(255,255,255,0.03); padding:20px; border-radius:20px; border:1px solid var(--glass-border);">
            <h4 style="margin:0 0 15px; font-size:16px; font-weight:700;"><i class="fas fa-edit" style="margin-left:10px; color:var(--p-copper);"></i>تحديث حالة المتابعة</h4>
            
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; margin-bottom:15px;">
                <div class="f-group">
                    <label style="font-size:12px; color:var(--text-dim); margin-bottom:6px; display:block;">الحالة العامة</label>
                    <select id="update-booking-status" onchange="window.updateSubStatusOptions(this.value)" style="width:100%; border-radius:10px; padding:10px; background:var(--bg-alt); border:1px solid var(--glass-border); color:var(--text-main); font-family:inherit;">
                        ${Object.entries(i).map(([s,d])=>`<option value="${s}" ${s===(e.status||"new")?"selected":""}>${d}</option>`).join("")}
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
                <textarea id="update-booking-details" style="width:100%; min-height:80px; border-radius:12px; padding:12px; background:var(--bg-alt); border:1px solid var(--glass-border); color:var(--text-main); font-family:inherit; resize:vertical;">${e.additionalDetails||""}</textarea>
            </div>

            <button onclick="window.updateBookingQuickStatus('${e.id}')" class="btn-premium" style="width:100%; padding:14px; border:none; border-radius:12px; font-weight:700; cursor:pointer;">
                حفظ التعديلات
            </button>
        </div>

        <div style="margin-top:20px; display:flex; gap:10px;">
            <a href="tel:${e.phone}" class="icon-btn-lite" style="flex:1; height:45px; border-radius:12px; background:#1c7c8c; color:white; border:none; gap:10px; display:flex; align-items:center; justify-content:center; text-decoration:none;">
                <i class="fas fa-phone-alt" style="color:white;"></i> مكالمة
            </a>
            <button onclick="window.fetchServerWAChat('${e.waJid||e.phone}', '${e.assignedTo||""}')" class="icon-btn-lite" style="flex:1; height:45px; border-radius:12px; gap:10px; display:flex; align-items:center; justify-content:center; cursor:pointer;">
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
                  <h3 style="margin:0; font-weight:700;">${e.name||"محادثة واتساب"}</h3>
                  <small style="opacity:0.8;">الرقم: ${e.phone}</small>
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
              <input type="file" id="wa-media-upload" style="display:none" onchange="window.handleWAMediaSelect('${e.waJid||e.phone}', '${e.assignedTo||""}')">
              <i class="fas fa-paperclip" style="font-size:20px; color:#54656f; cursor:pointer;" onclick="document.getElementById('wa-media-upload').click()"></i>
              <i id="wa-mic-btn" class="fas fa-microphone" style="font-size:20px; color:#54656f; cursor:pointer;" onpointerdown="window.startWARecording()" onpointerup="window.stopWARecording('${e.waJid||e.phone}', '${e.assignedTo||""}')"></i>
              
              <input type="text" id="wa-server-input" placeholder="اكتب رسالة للرد..." onkeydown="if(event.key==='Enter') window.sendServerWAMessage('${e.waJid||e.phone}', '${e.assignedTo||""}')">
              
              <button class="wa-send-btn" onclick="window.sendServerWAMessage('${e.waJid||e.phone}', '${e.assignedTo||""}')">
                  <i class="fas fa-paper-plane"></i>
              </button>
          </div>
      </div>
    </div>
  `,n=document.getElementById("details-modal-body");if(n){n.innerHTML=o,n.scrollTop=0;const s=document.getElementById("details-modal");s&&(s.scrollTop=0),window.openModal("details-modal"),setTimeout(()=>{window.fetchServerWAChat&&window.fetchServerWAChat(e.waJid||e.phone,e.assignedTo||""),window.updateSubStatusOptions&&window.updateSubStatusOptions(e.status||"new",e.subStatus||"not_contacted"),window.renderQuickRepliesBar&&window.renderQuickRepliesBar();const d=document.querySelector("emoji-picker");d&&d.addEventListener("emoji-click",l=>{const r=document.getElementById("wa-server-input");r&&(r.value+=l.detail.unicode,r.focus())})},100)}};window.updateSubStatusOptions=function(t,e=null){const i=document.getElementById("update-booking-substatus");if(!i)return;const n={new:[{v:"not_contacted",t:"لم يتم التواصل"},{v:"contacted",t:"تم التواصل"}],waiting:[{v:"docs_received",t:"تم استلام الاوراق"},{v:"waiting_calc",t:"انتظار رد العميل"},{v:"waiting_docs",t:"إنتظار إكمال الاوراق"},{v:"waiting_signature",t:"إنتظار توقيع العميل"}],inquiry:[{v:"docs_not_received",t:"لم يتم استلام الاوراق"}],sold:[{v:"signed",t:"تم التوقيع"},{v:"delivered",t:"تم التسليم"}],rejected:[{v:"no_response",t:"لم يتم رد العميل"},{v:"obligations",t:"التزامات"},{v:"calc_rejected",t:"رفض الحسبة"},{v:"ineligible",t:"غير مسموح له"},{v:"duplicate",t:"مكرر"}]}[t]||[{v:"none",t:"-"}];i.innerHTML=n.map(a=>`<option value="${a.v}" ${a.v===e?"selected":""}>${a.t}</option>`).join("")};window.updateBookingQuickStatus=async function(t){var n,a,s;const e=(n=document.getElementById("update-booking-status"))==null?void 0:n.value,i=((a=document.getElementById("update-booking-substatus"))==null?void 0:a.value)||"",o=((s=document.getElementById("update-booking-details"))==null?void 0:s.value)||"";if(!(!e||!t))try{const d=T(S,`bookings/${t}`);await _(d,{status:e,subStatus:i,additionalDetails:o,updatedAt:new Date().toISOString()}),window.showLuxuryToast("تم تحديث حالة الطلب والتفاصيل بنجاح")}catch(d){console.error(d),window.showLuxuryToast("فشل تحديث الحالة","error")}};window.saveWAServerURL=async function(){var e;const t=(e=document.getElementById("wa-server-url-config"))==null?void 0:e.value;if(t){localStorage.setItem("wa_server_url",t);try{await M(T(S,"settings/waServerUrl"),t)}catch(i){console.error("Firebase save config error:",i)}window.showLuxuryToast("تم حفظ رابط السيرفر وتعميمه لجميع الموظفين بنجاح. يرجى إعادة تحميل الصفحة."),setTimeout(()=>location.reload(),1500)}};window.setLuxuryDetailImg=function(t,e){document.getElementById("active-luxury-img").src=e,document.querySelectorAll(".thumb-wrapper").forEach(i=>i.classList.remove("active")),t.classList.add("active")};window.switchLuxuryDetailImg=function(t,e){const i=window.state.cars.find(r=>r.id===t);if(!i)return;const o=i.images||[i.image||"logo.jpg"],n=document.getElementById("active-luxury-img").src;let a=o.findIndex(r=>n.includes(r));a===-1&&(a=0);let s=(a+e+o.length)%o.length;const d=o[s];document.getElementById("active-luxury-img").src=d;const l=document.querySelectorAll(".thumb-wrapper");l[s]&&(l.forEach(r=>r.classList.remove("active")),l[s].classList.add("active"))};window.openFullscreenGallery=function(t,e){const i=window.state.cars.find(a=>a.id===t);if(!i)return;const o=i.images||[i.image||"logo.jpg"],n=document.createElement("div");n.className="luxury-lightbox",n.innerHTML=`
        <div class="lb-close" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></div>
        <div class="lb-content">
            <img src="${e}" id="lb-main-img">
            <div class="lb-nav">
                <button onclick="window.navLightbox('${t}', -1)"><i class="fas fa-chevron-right"></i></button>
                <button onclick="window.navLightbox('${t}', 1)"><i class="fas fa-chevron-left"></i></button>
            </div>
        </div>
        <div class="lb-thumbs">
            ${o.map(a=>`<img src="${a}" class="lb-thumb ${a===e?"active":""}" onclick="document.getElementById('lb-main-img').src='${a}'; this.parentElement.querySelectorAll('.lb-thumb').forEach(t=>t.classList.remove('active')); this.classList.add('active');">`).join("")}
        </div>
    `,document.body.appendChild(n)};window.navLightbox=function(t,e){const i=window.state.cars.find(l=>l.id===t),o=i.images||[i.image||"logo.jpg"],n=document.getElementById("lb-main-img");let a=o.indexOf(n.src);a===-1&&(a=0);let s=a+e;s<0&&(s=o.length-1),s>=o.length&&(s=0),n.src=o[s];const d=document.querySelectorAll(".lb-thumb");d.forEach(l=>l.classList.remove("active")),d[s].classList.add("active")};window.trackCarView=async function(t){if(t)try{const e=T(S,`analytics/popularCars/${t}`);await V(e,i=>(i||0)+1)}catch(e){console.error("Tracking Error:",e)}};window.resetFilters=function(){["car-search-input","filter-make","filter-type","filter-year","filter-sort"].forEach(e=>{const i=document.getElementById(e);i&&(i.value=i.tagName==="SELECT"?e==="filter-sort"?"newest":"all":"")}),window.applyInventoryFilters()};window.trackVisit=async function(){try{const t=new Date().toISOString().split("T")[0];if(localStorage.getItem("visited_"+t))return;localStorage.setItem("visited_"+t,"true");const e=T(S,"analytics");await V(e,i=>{i||(i={totalVisits:0,dailyVisits:{},browsers:{},devices:{},popularCars:{}}),i.totalVisits=(i.totalVisits||0)+1,i.dailyVisits=i.dailyVisits||{},i.dailyVisits[t]=(i.dailyVisits[t]||0)+1;const o=navigator.userAgent;let n="Other";o.includes("Chrome")?n="Chrome":o.includes("Safari")?n="Safari":o.includes("Firefox")?n="Firefox":o.includes("Edge")&&(n="Edge"),i.browsers=i.browsers||{},i.browsers[n]=(i.browsers[n]||0)+1;const a=/iPhone|iPad|iPod|Android/i.test(o)?"mobile":"desktop";return i.devices=i.devices||{},i.devices[a]=(i.devices[a]||0)+1,i})}catch(t){console.error("Analytics Error:",t)}};window.loginAdmin=async function(t){var a,s;t.preventDefault();const e=(a=document.getElementById("admin-email"))==null?void 0:a.value,i=(s=document.getElementById("admin-pass"))==null?void 0:s.value,o=t.target.querySelector("button");if(!e||!i)return window.showLuxuryToast("يرجى إدخال البريد وكلمة المرور","error");const n=o.innerText;o.innerText="جاري التحقق...",o.disabled=!0;try{await ue(j,e,i),window.showLuxuryToast("تم تسجيل الدخول بنجاح"),window.createLog("تسجيل دخول","نجاح تسجيل الدخول للنظام","auth"),window.closeModal("admin-modal")}catch(d){console.error(d),window.showLuxuryToast("خطأ في البيانات، يرجى المحاولة مرة أخرى","error")}finally{o.innerText=n,o.disabled=!1}};window.logout=async function(){confirm("هل أنت متأكد من تسجيل الخروج؟")&&(await window.createLog("تسجيل خروج","خرج المستخدم من النظام","auth"),await me(j),window.showLuxuryToast("تم تسجيل الخروج"))};window.applySettings=function(t){if(!t)return;const e=document.documentElement;if(t.defaultTheme&&!(localStorage.getItem("theme_manually_overridden")==="true")){document.body.setAttribute("data-theme",t.defaultTheme),localStorage.setItem("luxury_theme",t.defaultTheme);const $=document.getElementById("theme-btn");$&&($.innerHTML=t.defaultTheme==="dark"?'<i class="fas fa-sun"></i>':'<i class="fas fa-moon"></i>')}t.primaryColor&&(e.style.setProperty("--p-red",t.primaryColor),e.style.setProperty("--p-red-glow",t.primaryColor+"66")),t.secondaryColor&&e.style.setProperty("--p-teal",t.secondaryColor),t.accentColor&&e.style.setProperty("--p-copper",t.accentColor);const i=t.logo||"logo.jpg";document.querySelectorAll(".logo-wrap img, .sidebar-brand img, .splash-logo img, #footer-logo-img, #nav-logo-img, #splash-logo-img").forEach(v=>{v.src=i});const o=t.nameAr||"ون كار",n=t.nameEn||"ONE CAR",a=window.state.lang==="ar"?o:n;document.querySelectorAll(".dynamic-name-ar").forEach(v=>v.innerText=o),document.querySelectorAll(".dynamic-name-en").forEach(v=>v.innerText=n),document.title=a+" | "+(window.state.lang==="ar"?"الفخامة في عالم السيارات":"Luxury Automotive"),t.fontFamily&&(e.style.setProperty("--font-main",t.fontFamily),document.body.style.fontFamily=t.fontFamily);const s="dynamic-design-styles";let d=document.getElementById(s);d||(d=document.createElement("style"),d.id=s,document.head.appendChild(d));let l="";if(t.bgColor&&(l+=`body[data-theme="dark"] { --bg-main: ${t.bgColor}; }
`),t.textColor&&(l+=`body[data-theme="dark"] { --text-main: ${t.textColor}; }
`),t.borderRadius&&(e.style.setProperty("--border-radius-main",t.borderRadius+"px"),l+=`
      .car-card-premium, .ad-slide, .nav-premium, .modal-inner, .video-card-v2, .feature-card, .btn-premium { 
        border-radius: ${t.borderRadius}px !important; 
      }
    `),t.cardStyle==="solid")l+=`
      body[data-theme="dark"] .car-card-premium, body[data-theme="dark"] .modal-inner, body[data-theme="dark"] .stat-premium-card, body[data-theme="dark"] .admin-item-row {
         background: var(--bg-alt) !important;
         border: 1px solid rgba(255,255,255,0.05) !important;
         backdrop-filter: none !important;
      }
      body[data-theme="light"] .car-card-premium, body[data-theme="light"] .modal-inner, body[data-theme="light"] .stat-premium-card, body[data-theme="light"] .admin-item-row {
         background: var(--bg-alt) !important;
         border: 1px solid rgba(0,0,0,0.05) !important;
         backdrop-filter: none !important;
      }
    `;else{let v=t.glassOpacity!==void 0?t.glassOpacity:.75;l+=`
      body[data-theme="dark"] .car-card-premium, body[data-theme="dark"] .modal-inner, body[data-theme="dark"] .stat-premium-card, body[data-theme="dark"] .nav-premium, body[data-theme="dark"] .admin-item-row {
         background: rgba(17, 24, 39, ${v}) !important;
         backdrop-filter: blur(20px) !important;
         -webkit-backdrop-filter: blur(20px) !important;
      }
      body[data-theme="light"] .car-card-premium, body[data-theme="light"] .modal-inner, body[data-theme="light"] .stat-premium-card, body[data-theme="light"] .nav-premium, body[data-theme="light"] .admin-item-row {
         background: rgba(255, 255, 255, ${v}) !important;
         backdrop-filter: blur(20px) !important;
         -webkit-backdrop-filter: blur(20px) !important;
         border: 1px solid rgba(0,0,0,0.05) !important;
      }
    `}t.logoBlend&&t.logoBlend!=="auto"&&(l+=`
      .logo-wrap img, .sidebar-brand img, .splash-logo img, #footer-logo-img, #nav-logo-img, #splash-logo-img {
         mix-blend-mode: ${t.logoBlend};
      }
    `),t.logoScale&&(l+=`
      .logo-wrap img, .sidebar-brand img, .splash-logo img, #footer-logo-img, #nav-logo-img, #splash-logo-img {
         transform: scale(${t.logoScale});
      }
    `),t.hoverEffect==="scale"?l+=`
      .car-card-premium:hover, .btn-premium:hover, .stat-premium-card:hover { transform: scale(1.02) translateY(-3px); transition: all 0.3s; z-index: 20; position:relative; }
    `:t.hoverEffect==="glow"&&(l+=`
      .car-card-premium:hover, .btn-premium:hover, .stat-premium-card:hover { box-shadow: 0 0 20px var(--p-red-glow) !important; transition: box-shadow 0.3s; z-index: 20; position:relative; }
    `),d.innerHTML=l;const r=document.getElementById("about-text-display");r&&(r.innerText=t.aboutUs||"نقدم لكم تجربة استثنائية في عالم السيارات...");const u=document.getElementById("location-text-display");u&&(u.innerText=t.location||"الرياض - معارض القادسية");const f=document.getElementById("f-phone-admin");f&&(f.innerText=t.contactAdmin||"...");const c=document.getElementById("f-phone-sales");c&&(c.innerText=t.contactSales||"...");const w=document.getElementById("f-phone-info");w&&(w.innerText=t.contactComplaints||"...");const m=document.getElementById("f-email-display");m&&(m.innerText=t.contactEmail||"...");const y=document.getElementById("contact-location-link");y&&(y.href=t.locationUrl||"#");const k=document.getElementById("meta-title");k&&(k.innerText=`${o} | ${t.metaTitle||"الفخامة والجودة تليق بك"}`);const p=document.getElementById("meta-description");p&&p.setAttribute("content",t.metaDesc||"وجهتكم الرائدة للسيارات الفاخرة والمعتمدة.");const g={"f-insta":t.socialInsta,"f-snap":t.socialSnap,"f-twitter":t.socialTwitter};Object.entries(g).forEach(([v,$])=>{const h=document.getElementById(v);h&&(h.href=$||"#")});const x={"set-name-ar":t.nameAr||"","set-name-en":t.nameEn||"","set-color-primary":t.primaryColor||"#a11d21","set-color-secondary":t.secondaryColor||"#1c7c8c","set-color-accent":t.accentColor||"#b8860b","set-color-bg":t.bgColor||"#05080c","set-color-text":t.textColor||"#f8fafc","set-hover-effect":t.hoverEffect||"scale","set-card-style":t.cardStyle||"glass","set-glass-opacity":t.glassOpacity!==void 0?t.glassOpacity:.75,"set-logo-blend":t.logoBlend||"auto","set-logo-scale":t.logoScale||"1","set-default-theme":t.defaultTheme||"dark","set-font-family":t.fontFamily||"'Cairo', sans-serif","set-border-radius":t.borderRadius||"16","set-contact-mgmt":t.contactAdmin||"","set-contact-sales":t.contactSales||"","set-contact-complaints":t.contactComplaints||"","set-contact-email":t.contactEmail||"","set-about-text":t.aboutUs||"","set-location-link":t.locationUrl||"","set-location-text":t.location||"","set-insta-link":t.socialInsta||"","set-snap-link":t.socialSnap||"","set-twitter-link":t.socialTwitter||""};Object.entries(x).forEach(([v,$])=>{const h=document.getElementById(v);if(h&&(h.value=$,h.type==="range"||h.type==="color")){let L=document.createEvent("HTMLEvents");L.initEvent("input",!1,!0),h.dispatchEvent(L)}});const b=document.getElementById("set-maintenance-mode");b&&(b.checked=t.maintenanceMode||!1);const I=document.getElementById("logo-preview-img");I&&(I.src=i),localStorage.setItem("luxury-settings-cache",JSON.stringify(t))};window.resetToDefaultSettings=async function(){if(confirm("هل أنت متأكد من إعادة ضبط كافة الإعدادات؟ سيتم فقدان الشعارات والألوان المخصصة.")){const t={nameAr:"ون كار",nameEn:"ONE CAR",primaryColor:"#a11d21",secondaryColor:"#1c7c8c",accentColor:"#b8860b",defaultTheme:"dark",borderRadius:"16px",logo:"logo.jpg",aboutUs:"تجربة استثنائية في عالم السيارات",location:"الرياض - معارض القادسية"};await M(T(S,"settings"),t),window.showLuxuryToast("تمت إعادة الضبط بنجاح")}};window.markAllNotificationsRead=async function(){try{const t=window.state.notifications.map(e=>_(T(S,`notifications/${e.id}`),{read:!0}));await Promise.all(t),window.showLuxuryToast("تم تحديد الكل كمقروء")}catch(t){console.error(t)}};window.switchSettingsTab=function(t,e){document.querySelectorAll(".set-pane").forEach(o=>o.classList.add("hidden")),document.querySelectorAll(".set-tab").forEach(o=>o.classList.remove("active"));const i=document.getElementById(t);i&&i.classList.remove("hidden"),e&&e.classList.add("active")};window.previewLogo=async function(t){if(t.files&&t.files[0])try{const e=await window.compressImage(t.files[0],400,400,.8);document.getElementById("logo-preview-img").src=e,document.getElementById("set-logo-b64").value=e}catch(e){console.error("Logo compression failed",e)}};window.saveAppSettings=async function(){var i,o,n,a,s,d,l,r,u,f,c,w,m,y,k,p,g,x,b,I;const t=document.querySelector('button[onclick="window.saveAppSettings()"]');t&&(t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin"></i> جاري الحفظ...');const e={nameAr:((i=document.getElementById("set-name-ar"))==null?void 0:i.value)||"",nameEn:((o=document.getElementById("set-name-en"))==null?void 0:o.value)||"",logo:((n=document.getElementById("set-logo-b64"))==null?void 0:n.value)||window.state.settings.logo||"logo.jpg",primaryColor:((a=document.getElementById("set-color-primary"))==null?void 0:a.value)||"",secondaryColor:((s=document.getElementById("set-color-secondary"))==null?void 0:s.value)||"",accentColor:((d=document.getElementById("set-color-accent"))==null?void 0:d.value)||"",defaultTheme:((l=document.getElementById("set-default-theme"))==null?void 0:l.value)||"",fontFamily:((r=document.getElementById("set-font-family"))==null?void 0:r.value)||"",borderRadius:((u=document.getElementById("set-border-radius"))==null?void 0:u.value)||"",contactAdmin:((f=document.getElementById("set-contact-mgmt"))==null?void 0:f.value)||"",contactSales:((c=document.getElementById("set-contact-sales"))==null?void 0:c.value)||"",contactComplaints:((w=document.getElementById("set-contact-complaints"))==null?void 0:w.value)||"",contactEmail:((m=document.getElementById("set-contact-email"))==null?void 0:m.value)||"",aboutUs:((y=document.getElementById("set-about-text"))==null?void 0:y.value)||"",locationUrl:((k=document.getElementById("set-location-link"))==null?void 0:k.value)||"",location:((p=document.getElementById("set-location-text"))==null?void 0:p.value)||"",socialInsta:((g=document.getElementById("set-insta-link"))==null?void 0:g.value)||"",socialSnap:((x=document.getElementById("set-snap-link"))==null?void 0:x.value)||"",socialTwitter:((b=document.getElementById("set-twitter-link"))==null?void 0:b.value)||"",maintenanceMode:((I=document.getElementById("set-maintenance-mode"))==null?void 0:I.checked)||!1,updatedAt:new Date().toISOString()};try{localStorage.removeItem("theme_manually_overridden"),await M(T(S,"settings"),e),window.showLuxuryToast("تم حفظ الإعدادات بنجاح"),window.createLog("تعديل إعدادات","تحديث شامل لإعدادات الموقع والمنصة","settings")}catch{window.showLuxuryToast("فشل الحفظ، تأكد من الصلاحيات","error")}finally{t&&(t.disabled=!1,t.innerHTML='<i class="fas fa-save"></i> حفظ التغييرات')}};window.filterUsersByRole=function(t,e){e&&(document.querySelectorAll("#users-roles-tabs .p-tab").forEach(i=>i.classList.remove("active")),e.classList.add("active")),window.state.userRoleFilter=t,window.syncAdminTables("users")};window.syncAdminTables=function(t){var n,a,s,d,l,r,u,f,c,w,m,y,k;if(t==="all"){["cars","ads","sales","bookings","users","plates","reviews","partners","brands","locations","blogs","whatsapp-monitor","quick-replies"].forEach(g=>window.syncAdminTables(g));return}if(t==="whatsapp-monitor"){window.renderWhatsAppMonitor();return}if(t==="quick-replies"||t==="quickReplies"){window.renderQuickRepliesAdmin&&window.renderQuickRepliesAdmin(),window.renderQuickRepliesBar&&window.renderQuickRepliesBar();return}const e=document.getElementById(`admin-${t}-table`);if(!e)return;let i=window.state[t]||[];const o=(((n=document.getElementById(`admin-${t}-search`))==null?void 0:n.value)||((a=document.getElementById(`${t}-search`))==null?void 0:a.value)||((s=document.getElementById(`${t.slice(0,-1)}-search`))==null?void 0:s.value)||"").toLowerCase();if(o&&(i=i.filter(p=>(p.make||p.title||p.name||p.model||p.phone||p.carRequested||p.carOrCompany||"").toLowerCase().includes(o))),t==="cars"){const p=document.getElementById("admin-filter-car-make");p&&p.options.length<=1&&window.state.cars.length>0&&[...new Set(window.state.cars.map(I=>I.make))].sort().forEach(I=>{const v=document.createElement("option");v.value=I,v.textContent=I,p.appendChild(v)});const g=((d=document.getElementById("admin-filter-car-status"))==null?void 0:d.value)||"all",x=((l=document.getElementById("admin-filter-car-make"))==null?void 0:l.value)||"all";g!=="all"&&(i=i.filter(b=>b.status===g)),x!=="all"&&(i=i.filter(b=>b.make===x))}if(t==="bookings"){const p=document.getElementById("filter-booking-staff");p&&p.options.length<=1&&window.state.users&&window.state.users.forEach(h=>{if(h.email!=="zyrozyro98@gmail.com"&&(h.role==="admin"||h.role==="supervisor"||h.role==="staff")){const L=document.createElement("option");L.value=h.id,L.textContent=h.name||h.email||"مستخدم غير محدد",p.appendChild(L)}});const g=document.getElementById("filter-booking-sub-status");if(g&&g.options.length<=1){window.setBookingFilter(window.state.bookingFilter||"all",null,window.state.bookingSubStatusFilter||"all");return}const x=((r=document.getElementById("filter-booking-status"))==null?void 0:r.value)||window.state.bookingFilter||"all",b=((u=document.getElementById("filter-booking-sub-status"))==null?void 0:u.value)||window.state.bookingSubStatusFilter||"all",I=((f=document.getElementById("filter-booking-staff"))==null?void 0:f.value)||"all",v=((c=document.getElementById("filter-booking-type"))==null?void 0:c.value)||"all";window.state.bookingFilter=x,window.state.bookingSubStatusFilter=b,x!=="all"&&(i=i.filter(h=>{let L=h.status||"new";return x==="cancelled"&&(L==="rejected"||L==="cancelled")?!0:L===x})),b!=="all"&&(i=i.filter(h=>h.subStatus===b)),I!=="all"&&(i=i.filter(h=>h.assignedTo===I)),v!=="all"&&(i=i.filter(h=>(h.customerType||"individual")===v)),!(((w=window.state.userProfile)==null?void 0:w.role)==="admin"||((m=window.state.userProfile)==null?void 0:m.role)==="supervisor")&&window.state.user&&(i=i.filter(h=>h.assignedTo===window.state.user.uid))}if(t==="users"){i=i.filter(I=>I.email!=="zyrozyro98@gmail.com");const p=window.state.userRoleFilter||"all";p!=="all"&&(i=i.filter(I=>I.role===p));const g=document.getElementById("stat-users-total"),x=document.getElementById("stat-users-active"),b=document.getElementById("stat-users-admins");if(g&&(g.innerText=i.length),x){x.innerText=i.filter(v=>v.isAvailable).length;const I=x.nextElementSibling;I&&(I.innerText="متواجد حالياً")}if(b){const I=b.nextElementSibling;if(p==="all")b.innerText=i.filter(v=>v.role==="admin").length,I&&(I.innerText="مدراء النظام");else{b.innerText=i.length;const v={admin:"مدراء النظام",supervisor:"مشرفين",staff:"المندوبين"};I&&(I.innerText="إجمالي الـ "+(v[p]||""))}}}if(t==="bookings"?(((y=document.getElementById("filter-booking-sort"))==null?void 0:y.value)||"newest")==="oldest"?i.sort((g,x)=>new Date(g.createdAt||0)-new Date(x.createdAt||0)):i.sort((g,x)=>new Date(x.createdAt||0)-new Date(g.createdAt||0)):i.sort((p,g)=>new Date(g.createdAt||0)-new Date(p.createdAt||0)),i.length===0){e.innerHTML='<div class="no-data-admin" style="padding:40px; text-align:center; opacity:0.5;">لا توجد بيانات لهذه الفئة</div>';return}if(t==="users"){const p=window.state.bookings||[],g=((k=window.state.userProfile)==null?void 0:k.role)==="admin";let x=`<table class="admin-table-v2" style="width:100%; border-collapse:collapse; min-width:800px; font-size:14px;">
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
          <tbody>`;i.forEach(b=>{const I=p.filter(B=>B.assignedTo===b.id),v=I.filter(B=>B.status==="sold"||B.status==="done").length,$=I.filter(B=>B.status==="new"||B.status==="waiting"||B.status==="inquiry"||!B.status).length,h=I.filter(B=>B.status==="cancelled").length,z={admin:"مسؤول",supervisor:"مشرف",staff:"مندوب"}[b.role]||"مندوب",F=b.image||"logo.jpg",C=b.phone||"";let q="";if(C){let B=C.replace(/\D/g,"");B=window.normalizePhone(B),q=`<a href="https://wa.me/${B}" target="_blank" class="icon-btn-lite success" title="مراسلة واتساب"><i class="fab fa-whatsapp"></i></a>`}x+=`<tr style="border-bottom: 1px solid rgba(255,255,255,0.05); transition: background 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.02)'" onmouseout="this.style.background='transparent'">
              <td style="padding:15px;">
                  <div style="display:flex; align-items:center; gap:12px;">
                      <div style="width:40px; height:40px; border-radius:50%; overflow:hidden; background:#222; flex-shrink:0;">
                          <img src="${F}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='logo.jpg'">
                      </div>
                      <div>
                          <strong style="display:block; font-size:15px;">${b.name||b.email}</strong>
                          ${C?`<span style="font-size:12px; color:var(--text-dim);">${C}</span>`:""}
                      </div>
                  </div>
              </td>
              <td style="padding:15px;"><span style="color:var(--p-copper); font-size:13px;">${z}</span></td>
              <td style="padding:15px;"><span class="status-badge ${b.isAvailable?"online":"busy"}" style="font-size:11px;">● ${b.isAvailable?"متاح":"غير متاح"}</span></td>
              <td style="padding:15px; text-align:center;"><span style="color:#00a884; font-weight:bold; font-size:15px;">${v}</span></td>
              <td style="padding:15px; text-align:center;"><span style="color:var(--p-gold); font-weight:bold; font-size:15px;">${$}</span></td>
              <td style="padding:15px; text-align:center;"><span style="color:#e02424; font-weight:bold; font-size:15px;">${h}</span></td>
              <td style="padding:15px; text-align:center;">
                  <div style="display:flex; justify-content:center; gap:8px;">
                      ${q}
                      <button class="icon-btn-lite" onclick="window.editLuxuryItem('users', '${b.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                      ${g?`<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('users', '${b.id}')" title="حذف"><i class="fas fa-trash"></i></button>`:""}
                  </div>
              </td>
          </tr>`}),x+="</tbody></table>",e.innerHTML=x;return}e.innerHTML=i.map(p=>$e(t,p)).join("")};function $e(t,e){var d,l,r;const i=((d=window.state.userProfile)==null?void 0:d.role)==="admin"||((l=window.state.userProfile)==null?void 0:l.role)==="supervisor",o=e.status==="sold"?"danger":e.status==="available"?"success":"warning",n=e.status==="sold"?"مباع":e.status==="available"?"متاح":"محجوز";if(t==="bookings"){const u=((r=window.state.users.find(y=>y.id===e.assignedTo))==null?void 0:r.name)||"غير محدد",f={new:"جديد",waiting:"بالانتظار",inquiry:"استفسار",sold:"مكتمل",done:"تم",cancelled:"مرفوض",rejected:"مرفوض"},c={not_contacted:"لم يتم التواصل",contacted:"تم التواصل",docs_received:"تم استلام الاوراق",waiting_calc:"انتظار رد العميل",waiting_docs:"إنتظار إكمال الاوراق",waiting_signature:"إنتظار توقيع العميل",docs_not_received:"لم يتم استلام الاوراق",signed:"تم التوقيع",delivered:"تم التسليم",done:"تم",no_response:"لم يتم رد العميل",obligations:"التزامات",calc_rejected:"رفض الحسبة",ineligible:"غير مسموح له",duplicate:"مكرر"},w=e.status==="cancelled"||e.status==="rejected"?"danger":e.status==="sold"||e.status==="done"?"success":"warning",m=e.subStatus?c[e.subStatus]||e.subStatus:"";return`
            <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:12px; border:1px solid var(--glass-border); margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                <div class="admin-item-info">
                    <strong style="display:block; font-size:16px;">${e.name||e.phone}</strong>
                    <div class="meta-row" style="font-size:12px; color:var(--text-dim); margin-top:5px; display:flex; gap:10px; flex-wrap:wrap;">
                        <span><i class="fas fa-car"></i> ${e.carOrCompany||e.carRequested||"-"}</span> | 
                        <span><i class="fas fa-user-tie"></i> ${u}</span>
                        ${m?`| <span style="color:var(--p-copper);"><i class="fas fa-info-circle"></i> ${m}</span>`:""}
                    </div>
                </div>
                <div class="admin-actions" style="display:flex; gap:10px; align-items:center;">
                    <span class="badge-${w}" style="font-size:10px; padding:3px 8px; border-radius:5px;">${f[e.status]||e.status||"جديد"}</span>
                    <button class="icon-btn-lite view" onclick="window.viewBookingDetails('${e.id}')" title="عرض التفاصيل"><i class="fas fa-eye"></i></button>
                    <button class="icon-btn-lite" onclick="window.editLuxuryItem('bookings', '${e.id}')" title="تعديل الحجز" aria-label="Edit Booking"><i class="fas fa-edit"></i></button>
                    ${i?`<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('bookings', '${e.id}')" title="حذف الحجز" aria-label="Delete Booking"><i class="fas fa-trash"></i></button>`:""}
                </div>
            </div>
        `}if(t==="cars")return`
            <div class="admin-item-row car-admin-row" style="background:rgba(255,255,255,0.02); padding:12px; border-radius:16px; border:1px solid var(--glass-border); margin-bottom:12px; display:flex; align-items:center; gap:20px; transition:all 0.3s ease;">
                <div class="admin-item-thumb" style="width:80px; height:60px; border-radius:10px; overflow:hidden; flex-shrink:0; background:#000;">
                    <img src="${e.image||"logo.jpg"}" style="width:100%; height:100%; object-fit:cover; opacity:0.8;" onerror="this.src='logo.jpg'">
                </div>
                <div class="admin-item-info" style="flex-grow:1;">
                    <div style="display:flex; align-items:center; gap:10px; margin-bottom:4px;">
                        <strong style="font-size:16px;">${e.make} ${e.model}</strong>
                        <span style="font-size:12px; color:var(--p-copper); font-weight:700;">${e.year}</span>
                    </div>
                    <div class="meta-row" style="font-size:12px; color:var(--text-dim); display:flex; gap:15px; flex-wrap:wrap;">
                        <span><i class="fas fa-tachometer-alt"></i> ${Number(e.mileage||0).toLocaleString()} كم</span>
                        <span><i class="fas fa-paint-brush"></i> ${e.color||"-"}</span>
                        <span style="color:var(--p-red); font-weight:800;">${Number(e.price||0).toLocaleString()} ريال</span>
                    </div>
                </div>
                <div class="admin-actions" style="display:flex; gap:8px; align-items:center;">
                    <span class="badge-${o}" style="font-size:10px; padding:4px 10px; border-radius:6px; font-weight:700;">${n}</span>
                    <button class="icon-btn-lite view" onclick="window.viewLuxuryCar('${e.id}')" title="عرض التفاصيل"><i class="fas fa-eye"></i></button>
                    ${i?`
                        <button class="icon-btn-lite" onclick="window.editLuxuryItem('cars', '${e.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                        <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('cars', '${e.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                    `:""}
                </div>
            </div>
        `;if(t==="users")return e.email==="zyrozyro98@gmail.com"?"":`
            <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:12px; border:1px solid var(--glass-border); margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                <div class="admin-item-info">
                    <strong style="display:block;">${e.name||e.email}</strong>
                    <div style="font-size:12px;">
                        <span style="color:var(--p-copper);">${e.role||"staff"}</span> | 
                        <span class="status-badge ${e.isAvailable?"online":"busy"}">● ${e.isAvailable?"متاح":"غير متاح"}</span>
                    </div>
                </div>
                <div class="admin-actions">
                    <button class="icon-btn-lite" onclick="window.editLuxuryItem('users', '${e.id}')" title="تعديل المستخدم" aria-label="Edit User"><i class="fas fa-edit"></i></button>
                    ${i?`<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('users', '${e.id}')" title="حذف المستخدم" aria-label="Delete User"><i class="fas fa-trash"></i></button>`:""}
                </div>
            </div>
        `;if(t==="plates")return`
            <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:12px; border:1px solid var(--glass-border); margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                <div class="admin-item-info">
                    <strong style="display:block; font-size:18px; letter-spacing:2px;">${e.number} ${e.letters}</strong>
                    <span style="font-size:12px; color:var(--p-copper);">${Number(e.price).toLocaleString()} ريال</span>
                </div>
                <div class="admin-actions" style="display:flex; gap:10px; align-items:center;">
                    <span class="badge-${o}" style="font-size:10px; padding:3px 8px; border-radius:5px;">${n}</span>
                    ${i?`
                        <button class="icon-btn-lite" onclick="window.editLuxuryItem('plates', '${e.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                        <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('plates', '${e.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                    `:""}
                </div>
            </div>
        `;if(t==="notifications"){const u=!!e.read;return`
            <div class="admin-item-row" style="background:${u?"rgba(255,255,255,0.01)":"rgba(28, 124, 140, 0.05)"}; padding:15px; border-radius:12px; border:1px solid ${u?"var(--glass-border)":"var(--p-teal)"}; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                <div class="admin-item-info">
                    <div style="display:flex; align-items:center; gap:10px;">
                        ${u?"":'<span style="width:8px; height:8px; background:var(--p-teal); border-radius:50%;"></span>'}
                        <strong style="display:block; font-size:15px;">${e.title||"تنبيه بالنظام"}</strong>
                    </div>
                    <p style="font-size:13px; opacity:0.8; margin-top:4px;">${e.text||e.message||""}</p>
                    <span style="font-size:11px; opacity:0.5; margin-top:5px; display:block;"><i class="far fa-clock"></i> ${new Date(e.timestamp).toLocaleString()}</span>
                </div>
                ${i?`
                <div class="admin-actions">
                    <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('notifications', '${e.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                </div>
                `:""}
            </div>
        `}if(t==="logs")return`
            <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:10px; border-radius:10px; font-size:12px; border-bottom:1px solid rgba(255,255,255,0.05);">
                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                    <strong style="color:var(--p-teal);">${e.action}</strong>
                    <span style="opacity:0.5;">${new Date(e.timestamp).toLocaleString()}</span>
                </div>
                <p style="opacity:0.8;">${e.details}</p>
                <div style="margin-top:5px; font-size:10px; opacity:0.6;">بواسطة: ${e.user}</div>
            </div>
        `;if(t==="sales"){const u=(e.url||"").trim();let f=u.includes("youtube.com")||u.includes("youtu.be"),c=e.poster||e.image||null;if(f&&!c){let w="";try{u.includes("v=")?w=u.split("v=")[1].split("&")[0]:u.includes("youtu.be/")?w=u.split("youtu.be/")[1].split("?")[0]:u.includes("embed/")?w=u.split("embed/")[1].split("?")[0]:w=u.split("/").pop().split("?")[0]}catch{w=""}w&&(c=`https://img.youtube.com/vi/${w}/mqdefault.jpg`)}return c=c||"logo.jpg",`
            <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:12px; border-radius:16px; border:1px solid var(--glass-border); margin-bottom:12px; display:flex; align-items:center; gap:20px;">
                <div class="admin-item-thumb" style="width:80px; height:50px; border-radius:10px; overflow:hidden; flex-shrink:0; background:#000;">
                    <img src="${c}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='logo.jpg'">
                </div>
                <div class="admin-item-info" style="flex-grow:1;">
                    <strong style="display:block; font-size:16px;">${e.title||e.name||"لحظة تسليم"}</strong>
                    <div style="font-size:11px; color:var(--text-dim); margin-top:4px; max-width:400px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                        <i class="fas fa-link"></i> ${u}
                    </div>
                </div>
                <div class="admin-actions">
                    <button class="icon-btn-lite view" onclick="window.openVideoLightbox('${u}')" title="معاينة"><i class="fas fa-eye"></i></button>
                    ${i?`
                        <button class="icon-btn-lite" onclick="window.editLuxuryItem('sales', '${e.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                        <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('sales', '${e.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                    `:""}
                </div>
            </div>
        `}if(t==="reviews"){const u=Number(e.rating||5),f=e.text?e.text.length>60?e.text.substring(0,60)+"...":e.text:"لا يوجد نص",c=e.avatar||e.image||"";return`
        <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:16px; border:1px solid var(--glass-border); margin-bottom:12px; display:flex; align-items:center; gap:20px;">
            <div class="admin-item-avatar" style="width:50px; height:50px; border-radius:50%; overflow:hidden; flex-shrink:0; background:var(--bg-alt); border:2px solid var(--p-copper); display:flex; align-items:center; justify-content:center; color:var(--p-copper); font-weight:900;">
                ${c?`<img src="${c}" style="width:100%; height:100%; object-fit:cover;">`:(e.name||"U").charAt(0)}
            </div>
            <div class="admin-item-info" style="flex-grow:1;">
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:4px;">
                    <strong style="font-size:16px;">${e.name||"عميل مجهول"}</strong>
                    <div class="review-stars-lite" style="color:#ffd700; font-size:11px;">
                        ${'<i class="fas fa-star"></i>'.repeat(u)}
                    </div>
                </div>
                <p style="font-size:13px; color:var(--text-dim); margin-top:2px;">"${f}"</p>
                ${e.car?`<span style="font-size:11px; color:var(--p-copper); opacity:0.8; display:block; margin-top:5px;"><i class="fas fa-car-side"></i> ${e.car}</span>`:""}
            </div>
            <div class="admin-actions">
                ${i?`
                    <button class="icon-btn-lite" onclick="window.editLuxuryItem('reviews', '${e.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                    <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('reviews', '${e.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                `:""}
            </div>
        </div>
    `}const a=e.make?`${e.make} ${e.model}`:e.title||e.name||"بدون عنوان",s=e.image||e.logo||e.poster||null;return`
        <div class="admin-item-row" onclick="window.editLuxuryItem('${t}', '${e.id}')" style="cursor:pointer;">
            <div style="display:flex; align-items:center; gap:15px;">
                ${s?`
                    <div style="width:50px; height:40px; border-radius:8px; overflow:hidden; flex-shrink:0;">
                        <img src="${s}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='logo.jpg'">
                    </div>
                `:""}
                <div class="admin-item-info">
                    <strong style="display:block;">${a}</strong>
                    ${e.price?`<span style="font-size:12px; color:var(--p-copper); font-weight:700;">${Number(e.price).toLocaleString()} ريال</span>`:""}
                </div>
            </div>
            <div class="admin-actions" style="display:flex; gap:8px; align-items:center;" onclick="event.stopPropagation()">
                ${e.status?`<span class="badge-${o}" style="font-size:10px; padding:3px 8px; border-radius:5px;">${n}</span>`:""}
                <button class="icon-btn-lite" onclick="window.editLuxuryItem('${t}', '${e.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                ${i?`<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('${t}', '${e.id}')" title="حذف"><i class="fas fa-trash"></i></button>`:""}
            </div>
        </div>
    `}window.updateStatistics=function(){var u,f,c,w;const t=document.getElementById("stat-cars-count-v2"),e=document.getElementById("stat-bookings-count-v2"),i=document.getElementById("stat-total-value-v2"),o=window.state.cars||[];let n=window.state.bookings||[];if(!(((u=window.state.userProfile)==null?void 0:u.role)==="admin"||((f=window.state.userProfile)==null?void 0:f.role)==="supervisor")&&window.state.user&&(n=n.filter(m=>m.assignedTo===window.state.user.uid)),t&&(t.innerText=o.length),e&&(e.innerText=n.length),i){const m=o.reduce((y,k)=>y+(parseFloat(k.price)||0),0);i.innerText=m.toLocaleString()+" ريال"}const s={all:n.length,new:n.filter(m=>m.status==="new"||!m.status).length,waiting:n.filter(m=>m.status==="waiting").length,inquiry:n.filter(m=>m.status==="inquiry").length,sold:n.filter(m=>m.status==="sold").length,done:n.filter(m=>m.status==="done").length,cancelled:n.filter(m=>m.status==="cancelled"||m.status==="rejected").length,sub:{not_contacted:n.filter(m=>m.subStatus==="not_contacted").length,contacted:n.filter(m=>m.subStatus==="contacted").length,docs_received:n.filter(m=>m.subStatus==="docs_received").length,waiting_calc:n.filter(m=>m.subStatus==="waiting_calc").length,waiting_docs:n.filter(m=>m.subStatus==="waiting_docs").length,waiting_signature:n.filter(m=>m.subStatus==="waiting_signature").length,docs_not_received:n.filter(m=>m.subStatus==="docs_not_received").length,signed:n.filter(m=>m.subStatus==="signed").length,delivered:n.filter(m=>m.subStatus==="delivered").length,done:n.filter(m=>m.subStatus==="done").length,no_response:n.filter(m=>m.subStatus==="no_response").length,obligations:n.filter(m=>m.subStatus==="obligations").length,calc_rejected:n.filter(m=>m.subStatus==="calc_rejected").length,ineligible:n.filter(m=>m.subStatus==="ineligible").length,duplicate:n.filter(m=>m.subStatus==="duplicate").length}};Object.entries(s).forEach(([m,y])=>{const k=document.getElementById(`count-${m}`);k&&(k.innerText=y)}),Object.entries(s.sub).forEach(([m,y])=>{const k=document.getElementById(`count-sub-${m}`);k&&(k.innerText=y)});const d=document.getElementById("bookings-badge");d&&(d.innerText=s.new,d.classList.toggle("hidden",s.new===0));const l=(c=window.state.user)==null?void 0:c.uid;if(((w=window.state.userProfile)==null?void 0:w.role)==="staff"&&l){const m=document.getElementById("staff-quick-stats");m&&m.classList.remove("hidden");const y=(window.state.bookings||[]).filter(h=>h.assignedTo===l),k=y.filter(h=>h.status==="new"||!h.status).length,p=y.length,g=y.filter(h=>h.status==="sold").length,x=p>0?Math.round(g/p*100):0,b=document.getElementById("staff-waiting-count"),I=document.getElementById("staff-total-assigned"),v=document.getElementById("staff-conversion-rate"),$=document.getElementById("availability-toggle");b&&(b.innerText=k),I&&(I.innerText=p),v&&(v.innerText=x+"%"),$&&($.checked=window.state.userProfile.isAvailable!==!1)}};window.deleteLuxuryItem=async function(t,e){var i;if(confirm("هل أنت متأكد من الحذف؟ لا يمكن التراجع عن هذه العملية."))try{if(t==="users"){const o=(window.state.users||[]).find(a=>a.id===e);if((o==null?void 0:o.email)==="zyrozyro98@gmail.com"){window.showLuxuryToast("لا يمكن حذف هذا المستخدم الأساسي للنظام","error");return}if(((i=window.state.userProfile)==null?void 0:i.role)==="supervisor"&&(o==null?void 0:o.role)==="admin"){window.showLuxuryToast("لا يملك المشرف صلاحية حذف المدير","error");return}}await J(T(S,`${t}/${e}`)),window.showLuxuryToast("تم الحذف بنجاح"),window.createLog("حذف",`حذف عنصر من ${t} (ID: ${e})`,"data")}catch{window.showLuxuryToast("فشل الحذف","error")}};window.editLuxuryItem=function(t,e){const i=(window.state[t]||[]).find(n=>n.id===e);if(!i)return;if(t==="users"&&i.email==="zyrozyro98@gmail.com"){window.showLuxuryToast("لا يمكن تعديل بيانات هذا المستخدم الأساسي","error");return}window.state.currentEdit={type:t,id:e},document.getElementById("item-form")&&(t==="cars"&&(window.state.carImages=[],i.image&&window.state.carImages.push({type:"url",value:i.image,isMain:!0}),i.images&&Array.isArray(i.images)&&i.images.forEach(n=>{n!==i.image&&window.state.carImages.push({type:"url",value:n,isMain:!1})})),te(t,i),window.setModalTitle("item-modal",`تعديل: ${i.make||i.title||t}`),window.openModal("item-modal"))};window.openCRUDModal=function(t,e=null){var n;if(window.state.currentEdit={type:t,id:e},!document.getElementById("item-form"))return;const o=e?((n=window.state[t])==null?void 0:n.find(a=>a.id===e))||{}:{};t==="cars"&&(window.state.carImages=[],o.image&&window.state.carImages.push({type:"url",value:o.image,isMain:!0}),o.images&&Array.isArray(o.images)&&o.images.forEach(a=>{a!==o.image&&window.state.carImages.push({type:"url",value:a,isMain:!1})})),te(t,o),window.setModalTitle("item-modal",e?`تعديل: ${t}`:`إضافة: ${t}`),window.openModal("item-modal")};function te(t,e={}){const i=document.getElementById("dynamic-form-fields");if(!i)return;let o=[];if(t==="cars"){const n=(window.state.brands||[]).map(a=>({v:a.name,t:a.name}));o=[{name:"make",label:"الماركة",type:"select",options:[{v:"",t:"اختر الماركة"},...n],required:!0},{name:"model",label:"الموديل",type:"text",required:!0},{name:"year",label:"السنة",type:"number",required:!0},{name:"price",label:"السعر",type:"number",required:!0},{name:"mileage",label:"الممشى (كم)",type:"number",required:!0},{name:"engine",label:"المحرك",type:"text",placeholder:"مثال: 8 سليندر، 4.0L"},{name:"gearbox",label:"ناقل الحركة",type:"select",options:[{v:"أوتوماتيك",t:"أوتوماتيك"},{v:"عادي",t:"عادي"}]},{name:"fuelType",label:"نوع الوقود",type:"select",options:[{v:"بنزين",t:"بنزين"},{v:"ديزل",t:"ديزل"},{v:"هايبرد",t:"هايبرد"},{v:"كهرباء",t:"كهرباء"}]},{name:"bodyType",label:"فئة السيارة",type:"select",options:[{v:"sedan",t:"سيدان"},{v:"suv",t:"SUV"},{v:"coupe",t:"كوبيه"},{v:"luxury",t:"فاخرة"},{v:"pickup",t:"بيك آب"}]},{name:"color",label:"اللون خارجي",type:"text"},{name:"interiorColor",label:"اللون داخلي",type:"text"},{name:"status",label:"الحالة في المخزون",type:"select",options:[{v:"available",t:"متاح"},{v:"reserved",t:"محجوز"},{v:"sold",t:"مباع"},{v:"incoming",t:"قادم قريباً"}]},{name:"isFeatured",label:"عرض في قسم المميز؟",type:"select",options:[{v:!1,t:"لا"},{v:!0,t:"نعم"}]},{name:"desc",label:"وصف إضافي ومواصفات",type:"textarea"},{name:"_image_manager",label:"صور السيارة (المعرض)",type:"custom",html:`
        <div class="f-group full-width">
          <label>إدارة صور السيارة (المعرض والصورة الرئيسية)</label>
          <div class="img-manager-v2" id="car-image-manager">
            <!-- Rendered by window.renderCarImageManager -->
          </div>
          <input type="file" id="car-file-input" multiple accept="image/*" style="display:none;" onchange="window.handleCarFileSelect(this.files)">
        </div>
      `}],setTimeout(()=>window.renderCarImageManager(),100)}else t==="ads"?o=[{name:"title",label:"العنوان",type:"text"},{name:"subtitle",label:"العنوان الفرعي",type:"text"},{name:"image",label:"صورة الإعلان (من الجهاز)",type:"file"},{name:"link",label:"الرابط (اختياري)",type:"text"}]:t==="sales"?o=[{name:"title",label:"العنوان",type:"text"},{name:"description",label:"وصف قصير",type:"textarea"},{name:"url",label:"رابط الفيديو (MP4 أو YouTube)",type:"text"},{name:"poster",label:"رابط صورة الغلاف",type:"text"}]:t==="reviews"?o=[{name:"name",label:"اسم العميل",type:"text",required:!0,placeholder:"مثال: عبدالله محمد"},{name:"car",label:"السيارة المشتراة (اختياري)",type:"text",placeholder:"مثال: تويوتا كامري 2024"},{name:"rating",label:"التقييم من 5 نجوم",type:"number",required:!0,placeholder:"5"},{name:"avatar",label:"رابط صورة العميل (اختياري)",type:"text",placeholder:"https://..."},{name:"text",label:"محتوى الرأي",type:"textarea",required:!0,placeholder:"لقد كانت تجربة رائعة مع هذا المعرض..."}]:t==="partners"?o=[{name:"name",label:"اسم الشريك",type:"text"},{name:"logo",label:"شعار الشريك (من الجهاز)",type:"file"},{name:"link",label:"رابط خارجي (اختياري)",type:"text"}]:t==="brands"?o=[{name:"name",label:"اسم العلامة التجارية",type:"text"},{name:"logo",label:"شعار البراند (من الجهاز)",type:"file"}]:t==="blogs"?o=[{name:"title",label:"عنوان المقال",type:"text"},{name:"image",label:"صورة المقال (من الجهاز)",type:"file"},{name:"content",label:"محتوى المقال",type:"textarea"}]:t==="locations"?o=[{name:"name",label:"اسم المدينة/الدولة",type:"text"},{name:"status",label:"الحالة",type:"select",options:[{v:"active",t:"نشط"},{v:"inactive",t:"غير نشط"}]}]:t==="plates"?o=[{name:"number",label:"رقم اللوحة",type:"text"},{name:"letters",label:"حروف اللوحة",type:"text"},{name:"price",label:"السعر",type:"number"},{name:"status",label:"الحالة",type:"select",options:[{v:"available",t:"متاح"},{v:"sold",t:"مباع"}]}]:t==="specs"?o=[{name:"name",label:"اسم المواصفة",type:"text"},{name:"icon",label:"أيقونة (FontAwesome)",type:"text"}]:t==="packages"?o=[{name:"name",label:"اسم الباقة",type:"text"},{name:"price",label:"السعر",type:"number"},{name:"features",label:"المميزات (فاصلة بين كل ميزة)",type:"textarea"}]:t==="bookings"?o=[{name:"name",label:"اسم العميل",type:"text"},{name:"phone",label:"الجوال",type:"text"},{name:"carRequested",label:"السيارة المطلوبة",type:"text"},{name:"status",label:"حالة الطلب",type:"select",options:[{v:"new",t:"جديد"},{v:"waiting",t:"بالانتظار"},{v:"inquiry",t:"استفسار"},{v:"sold",t:"مكتمل"},{v:"done",t:"تم"},{v:"cancelled",t:"مرفوض"}]},{name:"subStatus",label:"الحالة التفصيلية",type:"select",options:[{v:"not_contacted",t:"لم يتم التواصل"},{v:"contacted",t:"تم التواصل"},{v:"docs_received",t:"تم استلام الاوراق"},{v:"waiting_calc",t:"انتظار رد العميل"},{v:"waiting_docs",t:"إنتظار إكمال الاوراق"},{v:"waiting_signature",t:"إنتظار توقيع العميل"},{v:"docs_not_received",t:"لم يتم استلام الاوراق"},{v:"signed",t:"تم التوقيع"},{v:"delivered",t:"تم التسليم"},{v:"done",t:"تم"},{v:"no_response",t:"لم يتم رد العميل"},{v:"obligations",t:"التزامات"},{v:"calc_rejected",t:"رفض الحسبة"},{v:"ineligible",t:"غير مسموح له"},{v:"duplicate",t:"مكرر"}]},{name:"assignedTo",label:"الموظف المسؤول",type:"select",options:[{v:"",t:"غير محدد"},...window.state.users.filter(n=>n.email!=="zyrozyro98@gmail.com"&&(n.role==="staff"||n.role==="admin"||n.role==="supervisor")).map(n=>({v:n.id,t:n.name||(n.role==="admin"?"المدير: ":"المشرف: ")+(n.name||n.email)}))]},{name:"notes",label:"ملاحظات",type:"textarea"}]:t==="users"?o=[{name:"name",label:"الاسم الكامل",type:"text"},{name:"email",label:"البريد الإلكتروني",type:"text"},{name:"password",label:"كلمة المرور (اختياري عند التعديل)",type:"password"},{name:"role",label:"الصلاحية",type:"select",options:[{v:"staff",t:"موظف"},{v:"supervisor",t:"مشرف"},{v:"admin",t:"مدير"}]},{name:"isAvailable",label:"متاح لاستلام الطلبات؟",type:"select",options:[{v:!0,t:"نعم"},{v:!1,t:"لا"}]}]:t==="quickReplies"?o=[{name:"title",label:"عنوان الرد السريع",type:"text",required:!0,placeholder:"مثال: ترحيب بالعملاء الجدد"},{name:"content",label:"محتوى الرسالة الكامل",type:"textarea",required:!0,placeholder:"اكتب هنا نص الرسالة التي ستظهر للموظف لاستخدامها..."}]:t==="sales"?o=[{name:"title",label:"عنوان الفيديو",type:"text",required:!0,placeholder:"مثال: تسليم سيارة مرسيدس G-Class"},{name:"url",label:"رابط الفيديو (YouTube أو مباشر)",type:"text",required:!0,placeholder:"https://youtube.com/watch?v=..."},{name:"poster",label:"رابط صورة الغلاف (اختياري)",type:"text",placeholder:"https://..."},{name:"description",label:"وصف مبسط",type:"textarea",placeholder:"يسعدنا دائماً مشاركة لحظات نجاحنا..."}]:o=[{name:"name",label:"الاسم / العنوان",type:"text"},{name:"desc",label:"الوصف",type:"textarea"}];i.innerHTML=`
    <div class="form-grid-v3">
      ${o.map(n=>{if(n.type==="custom")return n.html;let a=e[n.name]!==void 0&&e[n.name]!==null?e[n.name]:"";n.name==="desc"&&!a&&(a=e.description||e.details||"");const s=n.required?"required":"",d=n.placeholder||n.label;let l="";return n.type==="select"?l=`
            <select name="${n.name}" class="filter-select" ${s}>
              ${n.options.map(r=>`<option value="${r.v}" ${r.v.toString()===a.toString()?"selected":""}>${r.t}</option>`).join("")}
            </select>
          `:n.type==="textarea"?l=`<textarea name="${n.name}" placeholder="${d}" ${s}>${a}</textarea>`:n.type==="file"?l=`
            <input type="file" name="${n.name}" ${n.multiple?"multiple":""} ${s} accept="image/*" class="filter-select">
            ${a?`<div class="file-path-hint" title="${a}">الملف الحالي: ${a.split("/").pop()}</div>`:""}
          `:l=`<input type="${n.type}" name="${n.name}" value="${a}" placeholder="${d}" ${s}>`,`
          <div class="f-group ${n.type==="textarea"||n.type==="custom"?"full-width":""}">
            <label>${n.label} ${n.required?'<span class="req">*</span>':""}</label>
            ${l}
          </div>
        `}).join("")}
    </div>
  `}window.handleCarFileSelect=function(t){if(t){for(let e=0;e<t.length;e++){const i=t[e];window.state.carImages.push({type:"file",value:i,preview:URL.createObjectURL(i),isMain:window.state.carImages.length===0})}window.renderCarImageManager()}};window.renderCarImageManager=function(){const t=document.getElementById("car-image-manager");if(!t)return;let i=`
    <div class="img-grid-v2">
      ${(window.state.carImages||[]).map((o,n)=>{const a=o.type==="url"?o.value:o.preview;return`
          <div class="img-item-v2 ${o.isMain?"is-main":""}">
            ${o.isMain?'<span class="main-badge">الرئيسية</span>':""}
            <img src="${a}" alt="Car image">
            <div class="img-actions-lite">
              <button type="button" class="img-action-btn-lite" onclick="window.reorderCarImage(${n}, -1)" title="نقل لليمين">
                <i class="fas fa-arrow-right"></i>
              </button>
              <button type="button" class="img-action-btn-lite" onclick="window.reorderCarImage(${n}, 1)" title="نقل لليسار">
                <i class="fas fa-arrow-left"></i>
              </button>
              <button type="button" class="img-action-btn-lite" onclick="window.setCarMainImage(${n})" title="تعيين كرئيسية">
                <i class="fas fa-star"></i>
              </button>
              <button type="button" class="img-action-btn-lite danger" onclick="window.removeCarImage(${n})" title="حذف">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        `}).join("")}
      <div class="add-img-btn-v2" onclick="document.getElementById('car-file-input').click()">
        <i class="fas fa-plus"></i>
        <span>أضف صور</span>
      </div>
    </div>
  `;t.innerHTML=i};window.reorderCarImage=function(t,e){const i=window.state.carImages,o=t+e;if(o>=0&&o<i.length){const n=i[t];i[t]=i[o],i[o]=n,window.renderCarImageManager()}};window.removeCarImage=function(t){if(t<0||t>=window.state.carImages.length)return;const e=window.state.carImages[t].isMain;window.state.carImages.splice(t,1),e&&window.state.carImages.length>0&&(window.state.carImages[0].isMain=!0),window.renderCarImageManager()};window.setCarMainImage=function(t){window.state.carImages.forEach((e,i)=>e.isMain=i===t),window.renderCarImageManager()};window.saveLuxuryItem=async function(t){t&&t.preventDefault();const e=window.state.currentEdit;if(!e)return;const{type:i,id:o}=e,n=document.getElementById("item-form");if(!n)return;const a=n.querySelector('button[type="submit"]'),s=a.innerText;a&&(a.disabled=!0,a.innerText="جاري الحفظ والمعالجة...");const d=new FormData(n),l={};d.forEach((r,u)=>{if(u!=="main_img_file"&&u!=="gallery_files"){if(u==="password"&&!r)return;l[u]=r}});try{if(i==="cars"){const c=[];let w="";const m=window.state.carImages||[];for(let y=0;y<m.length;y++){const k=m[y];let p="";k.type==="url"?p=k.value:k.type==="file"&&(p=await window.compressImage(k.value,1e3,1e3,.6)),p&&(c.push(p),k.isMain&&(w=p))}!w&&c.length>0&&(w=c[0]),l.image=w,l.images=c}const r=["image","logo","avatar","poster"];for(const c of r)l[c]instanceof File&&l[c].size>0?l[c]=await window.compressImage(l[c],1e3,1e3,.7):l[c]instanceof File&&l[c].size===0&&delete l[c];["price","year","mileage","rating","installmentPeriod"].forEach(c=>{l[c]!==void 0&&l[c]!==""&&l[c]!==null&&(l[c]=Number(l[c]))}),l.isFeatured!==void 0&&(l.isFeatured=l.isFeatured==="true"||l.isFeatured===!0),o||(l.createdAt=new Date().toISOString()),l.updatedAt=new Date().toISOString();const f=o?T(S,`${i}/${o}`):R(T(S,i));await(o?_(f,l):M(f,l)),window.showLuxuryToast(o?"تم تحديث البيانات بنجاح":"تم إضافة العنصر بنجاح"),window.closeModal("item-modal"),window.createLog(o?"تعديل":"إضافة",`${o?"تعديل":"إضافة"} في ${i} - ${l.make||l.title||o}`,"data")}catch(r){console.error("Save Error:",r),window.showLuxuryToast("حدث خطأ أثناء الحفظ: "+(r.message||"خطأ غير معروف"),"error")}finally{a&&(a.disabled=!1,a.innerText=s)}};window.openQuickReplyModal=function(){window.openCRUDModal("quickReplies")};window.renderQuickRepliesAdmin=function(){var o;const t=document.getElementById("quick-replies-list");if(!t)return;const e=(((o=document.getElementById("qr-search"))==null?void 0:o.value)||"").toLowerCase().trim(),i=(window.state.quickReplies||[]).filter(n=>(n.title||"").toLowerCase().includes(e)||(n.content||"").toLowerCase().includes(e));if(i.length===0){t.innerHTML='<div class="no-results-v2" style="grid-column:1/-1;"><p>لا توجد نتائج مطابقة لبحثك</p></div>';return}t.innerHTML=i.map(n=>`
        <div class="admin-item-card-v2 animate-fade-in" data-aos="fade-up">
            <div class="item-card-content">
                <div class="item-card-header">
                    <div class="item-icon-circle"><i class="fas fa-bolt"></i></div>
                    <strong>${n.title}</strong>
                </div>
                <div class="item-card-body">
                    <p class="qr-content-preview">${n.content}</p>
                </div>
            </div>
            <div class="item-card-actions">
                <button class="icon-btn-lite" onclick="window.editLuxuryItem('quickReplies', '${n.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('quickReplies', '${n.id}')" title="حذف"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join("")};window.renderAdsSlider=function(){const t=document.getElementById("slider-track"),e=document.getElementById("slider-dots");if(!t)return;const i=window.state.ads||[];if(i.length===0){t.innerHTML='<div class="no-ads"></div>',e&&(e.innerHTML="");return}t.innerHTML=i.map(o=>`
        <div class="ad-slide">
            <img src="${o.image||"logo.jpg"}" class="ad-bg-img" alt="${o.title||"عرض خاص"}">
            <div class="ad-content">
                <h2 class="luxury-font">${o.title||""}</h2>
                <p>${o.subtitle||""}</p>
                ${o.link?`<a href="${o.link}" class="btn-premium"><span>اكتشف المزيد</span> <i class="fas fa-arrow-left" style="margin-right: 10px;"></i></a>`:""}
            </div>
        </div>
    `).join(""),e&&(e.innerHTML=i.map((o,n)=>`<div class="dot ${n===0?"active":""}" onclick="window.goToLuxurySlide(${n})"></div>`).join("")),window.state.sliderIndex=0,window.moveLuxurySlider(0)};window.goToLuxurySlide=function(t){window.state.sliderIndex=t,window.moveLuxurySlider(0)};window.moveLuxurySlider=function(t){var s;const e=document.getElementById("slider-track");if(!e)return;const i=((s=window.state.ads)==null?void 0:s.length)||0;if(i<=1){e.style.transform="translateX(0)";return}window.state.sliderIndex=(window.state.sliderIndex+t+i)%i;const o=window.state.sliderIndex*100,n=document.body.dir==="rtl";e.style.transform=`translateX(${n?o:-o}%)`,document.querySelectorAll(".slider-dots .dot").forEach((d,l)=>{d.classList.toggle("active",l===window.state.sliderIndex)})};window.calculateLuxuryFinancing=function(){var l,r,u;const t=Number((l=document.getElementById("calc-car-price"))==null?void 0:l.value)||0,e=Number((r=document.getElementById("calc-down-pay"))==null?void 0:r.value)||0,i=Number((u=document.getElementById("calc-years"))==null?void 0:u.value)||5,o=document.getElementById("calc-result-val");if(!o)return;const n=t-e;if(n<=0){o.innerText="0 ريال";return}const s=n*(1+.045*i),d=Math.round(s/(i*12));o.innerText=d.toLocaleString()+" ريال"};window.renderSalesVideos=function(){const t=document.getElementById("sales-container");if(!t)return;const e=window.state.sales||[];if(e.length===0){t.innerHTML='<div class="no-results-v2"><p>لا توجد مقاطع فيديو متاحة حالياً</p></div>';return}t.innerHTML=e.map(i=>{const o=(i.url||"").trim();let n=o.includes("youtube.com")||o.includes("youtu.be")||o.includes("youtube-nocookie.com"),a=o.includes("tiktok.com"),s=o.includes("instagram.com"),d=o.includes("snapchat.com"),l=i.poster||i.image||null;if(n&&!l){let r="";try{o.includes("v=")?r=o.split("v=")[1].split("&")[0]:o.includes("youtu.be/")?r=o.split("youtu.be/")[1].split("?")[0]:o.includes("embed/")?r=o.split("embed/")[1].split("?")[0]:r=o.split("/").pop().split("?")[0]}catch{r=""}r&&(l=`https://img.youtube.com/vi/${r}/hqdefault.jpg`)}return l=l||"logo.jpg",`
            <div class="video-card-v2" data-aos="zoom-in" onclick="window.openVideoLightbox('${o}')">
                <div class="video-player-wrap">
                    <div class="video-inner">
                        <img src="${l}" alt="${i.title||"Success Moment"}" onerror="this.src='logo.jpg'" style="width:100%; height:100%; object-fit:cover;">
                        <div class="v-play-overlay">
                            <div class="v-play-btn"><i class="fas fa-play"></i></div>
                        </div>
                        ${n?'<div class="v-platform-icon"><i class="fab fa-youtube"></i></div>':a?'<div class="v-platform-icon"><i class="fab fa-tiktok"></i></div>':s?'<div class="v-platform-icon"><i class="fab fa-instagram"></i></div>':d?'<div class="v-platform-icon"><i class="fab fa-snapchat"></i></div>':""}
                    </div>
                </div>
                <div class="video-info-v2">
                    <span class="v-badge-gold"><i class="fas fa-award"></i> مبيعات ناجحة</span>
                    <h3>${i.title||i.name||"لحظة تسليم"}</h3>
                    <p>${i.description||"يسعدنا دائماً مشاركة لحظات نجاحنا مع عملائنا الكرام."}</p>
                </div>
            </div>`}).join("")};window.openVideoLightbox=function(t){let e="";if(t.includes("youtube.com")||t.includes("youtu.be")){let o="";try{t.includes("v=")?o=t.split("v=")[1].split("&")[0]:t.includes("youtu.be/")?o=t.split("youtu.be/")[1].split("?")[0]:t.includes("embed/")?o=t.split("embed/")[1].split("?")[0]:o=t.split("/").pop().split("?")[0]}catch{o=""}e=`<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${o}?autoplay=1&modestbranding=1&rel=0" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`}else e=`<video controls autoplay style="width:100%; height:100%; border-radius:15px; background:#000;">
                        <source src="${t}" type="video/mp4">
                        متصفحك لا يدعم تشغيل الفيديو.
                    </video>`;const i=document.createElement("div");i.className="luxury-lightbox",i.id="video-lightbox",i.innerHTML=`
        <button class="lb-close" onclick="this.parentElement.remove()">&times;</button>
        <div class="lb-content animate-fade-in" style="max-width:1000px; width:95%; aspect-ratio:16/9; margin-top:0;">
            ${e}
        </div>
    `,document.body.appendChild(i)};window.toggleWAWidget=function(){const t=document.getElementById("wa-widget");t&&t.classList.toggle("hidden")};window.sendWAWidgetMsg=function(){var o;const t=document.getElementById("wa-input"),e=(o=t==null?void 0:t.value)==null?void 0:o.trim();if(!e)return;const i=window.state.settings.contactSales||"0500000000";window.open(`https://wa.me/${window.normalizePhone(i)}?text=${encodeURIComponent(e)}`,"_blank"),t&&(t.value=""),window.toggleWAWidget()};window.createLog=async function(t,e,i="general"){var o,n;try{const a=R(T(S,"logs"));await M(a,{user:((o=window.state.user)==null?void 0:o.email)||"Visitor",userId:((n=window.state.user)==null?void 0:n.uid)||null,action:t,details:e,category:i,timestamp:new Date().toISOString()})}catch(a){console.error("Log Error:",a)}};window.submitBooking=async function(t){var d,l,r,u,f,c,w,m,y,k,p,g,x,b,I,v,$,h,L,z,F,C,q,B,Y;t.preventDefault();const e=t.target,i=e.querySelector('button[type="submit"]');let o=(((d=document.getElementById("b-phone-code"))==null?void 0:d.value)==="other"?(l=document.getElementById("b-phone-code-other"))==null?void 0:l.value:(r=document.getElementById("b-phone-code"))==null?void 0:r.value)||"966",n=((u=document.getElementById("b-phone"))==null?void 0:u.value)||"";o=o.replace(/\D/g,""),n=n.replace(/\D/g,""),n.startsWith("05")||n.startsWith("5")&&n.length===9||n.startsWith("9665")?(o="966",n.startsWith("05")&&(n=n.substring(1)),n.startsWith("966")&&(n=n.substring(3))):n.startsWith("07")||n.startsWith("7")&&n.length===9||n.startsWith("9677")?(o="967",n.startsWith("07")&&(n=n.substring(1)),n.startsWith("967")&&(n=n.substring(3))):(o&&n.startsWith(o)&&(n=n.substring(o.length)),o&&n.startsWith("00"+o)&&(n=n.substring(o.length+2)));const a=window.normalizePhone(o+n),s={customerType:((f=e.querySelector('[name="customer-type"]:checked'))==null?void 0:f.value)||"individual",carRequested:((c=document.getElementById("b-car"))==null?void 0:c.value)||"",name:((w=document.getElementById("b-name"))==null?void 0:w.value)||"",phone:a,age:((m=document.getElementById("b-age"))==null?void 0:m.value)||"",email:((y=document.getElementById("b-email"))==null?void 0:y.value)||"",nationality:((k=document.getElementById("b-nationality"))==null?void 0:k.value)==="مقيم"?((p=document.getElementById("b-nationality-other"))==null?void 0:p.value)||"مقيم":((g=document.getElementById("b-nationality"))==null?void 0:g.value)||"سعودي",city:((x=document.getElementById("b-city"))==null?void 0:x.value)==="أخرى"?((b=document.getElementById("b-city-other"))==null?void 0:b.value)||"أخرى":((I=document.getElementById("b-city"))==null?void 0:I.value)||"",paymentMethod:((v=e.querySelector('[name="payment-method"]:checked'))==null?void 0:v.value)||"كاش",bankName:(($=document.getElementById("b-bank-name"))==null?void 0:$.value)||"",installmentPeriod:((h=document.getElementById("b-installment-period"))==null?void 0:h.value)||"",salary:((L=document.getElementById("b-salary"))==null?void 0:L.value)||"",commitments:((z=document.getElementById("b-commitments"))==null?void 0:z.value)||"",workEntity:((F=document.getElementById("b-work-entity"))==null?void 0:F.value)||"حكومي",workStatus:((C=document.getElementById("b-work-status"))==null?void 0:C.value)||"معتمد",contactMethod:((q=e.querySelector('[name="contact-method"]:checked'))==null?void 0:q.value)||"الجوال",preferredTime:((B=e.querySelector('[name="preferred-time"]:checked'))==null?void 0:B.value)||"10am - 1pm",notes:((Y=document.getElementById("b-notes"))==null?void 0:Y.value)||"",status:"new",subStatus:"not_contacted",createdAt:new Date().toISOString()};i.disabled=!0,i.innerText="جاري الإرسال...";try{const O=T(S,"config/lastAssignedStaffIndex_v2"),D=window.state.users.filter(H=>H.role==="staff"&&H.isAvailable!==!1);D.length>0&&await V(O,H=>{let U=H||0;U>=D.length&&(U=0);const ie=D[U];return s.assignedTo=ie.id,(U+1)%D.length});const G=R(T(S,"bookings"));await M(G,s),s.assignedTo&&await R(T(S,"notifications"),{userId:s.assignedTo,type:"new_booking",title:"طلب جديد مسند إليك",body:`لديك طلب جديد من ${s.name} للسيارة ${s.carRequested}`,bookingId:G.key,read:!1,createdAt:new Date().toISOString()}),window.showLuxuryToast("تم إرسال طلبك بنجاح، سنتواصل معك قريباً"),e.reset()}catch(O){console.error(O),window.showLuxuryToast("حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً","error")}finally{i.disabled=!1,i.innerText="تأكيد طلب حجز الخدمة"}};window.fillAIInput=function(t){const e=document.getElementById("ai-chat-input");e&&(e.value=t)};window.clearAIChat=function(){const t=document.getElementById("ai-messages-area");t&&(t.innerHTML="")};window.askLuxuryAI=function(){var o;const t=document.getElementById("ai-chat-input"),e=(o=t==null?void 0:t.value)==null?void 0:o.trim();if(!e)return;Q("user",e),t.value="";const i="ai-typing-"+Date.now();Q("bot","جاري التفكير...",i),setTimeout(()=>{const n=document.getElementById(i);n&&n.remove();const a=Ee(e);Q("bot",a)},1e3)};function Q(t,e,i=null){const o=document.getElementById("ai-messages-area");if(!o)return;const n=document.createElement("div");n.className=`ai-msg ${t}`,i&&(n.id=i),n.innerHTML=`
        <div class="msg-icon"><i class="fas ${t==="bot"?"fa-robot":"fa-user"}"></i></div>
        <div class="msg-content">
            <p>${e}</p>
        </div>
    `,o.appendChild(n),o.scrollTop=o.scrollHeight}function Ee(t){const e=t.toLowerCase(),i=window.state.cars||[],o=window.state.bookings||[];return e.includes("قيمة")||e.includes("مخزون")?`إجمالي قيمة المخزون الحالي هو ${i.reduce((a,s)=>a+(parseFloat(s.price)||0),0).toLocaleString()} ريال سعودي لعدد ${i.length} سيارة.`:e.includes("موظف")||e.includes("أفضل")?"بناءً على البيانات الحالية، يتميز فريق المبيعات بنشاط عالٍ، والمنافسة قوية بين الموظفين لهذا الشهر.":e.includes("ملخص")||e.includes("أداء")?`حالة اليوم: يوجد ${o.filter(a=>a.status==="new"||!a.status).length} طلبات جديدة لم يتم معالجتها بعد، وإجمالي الطلبات في النظام هو ${o.length}.`:"أنا هنا لمساعدتك في إدارة المعرض. يمكنك سؤالي عن المخزون، الطلبات، أو الإحصائيات العامة."}window.renderWhatsAppMonitor=function(){var o,n;const t=document.getElementById("admin-wa-monitor-table");if(!t)return;const e=(((o=document.getElementById("wa-monitor-search"))==null?void 0:o.value)||"").toLowerCase();(n=document.getElementById("wa-monitor-filter"))!=null&&n.value;let i=(window.state.logs||[]).filter(a=>a.category==="whatsapp"||a.details.includes("WhatsApp"));if(e&&(i=i.filter(a=>a.details.toLowerCase().includes(e)||a.user.toLowerCase().includes(e))),i.length===0){t.innerHTML='<div class="no-data-admin" style="padding:40px; text-align:center;">لا توجد سجلات مراقبة حالياً</div>';return}t.innerHTML=i.map(a=>`
        <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:12px; border:1px solid var(--glass-border); margin-bottom:10px;">
            <div style="display:flex; justify-content:space-between;">
                <strong>${a.user}</strong>
                <span style="opacity:0.5; font-size:11px;">${new Date(a.timestamp).toLocaleString()}</span>
            </div>
            <p style="font-size:13px; margin:10px 0;">${a.details}</p>
            ${a.proofUrl?`<a href="${a.proofUrl}" target="_blank" class="btn-premium btn-sm" style="display:inline-block;">عرض الإثبات</a>`:""}
        </div>
    `).join("")};let E=null;const W="https://pct-soonest-bus-boats.trycloudflare.com";window.WA_SERVER_URL_OVERRIDE||localStorage.getItem("wa_server_url");window.saveWAServerURL=async function(){const t=document.getElementById("wa-server-url-config");if(!t)return;let e=t.value.trim().replace(/\/$/,"");if(!e)return window.showLuxuryToast("يرجى إدخال الرابط","error");try{await M(T(S,"settings/waServerUrl"),e),localStorage.setItem("wa_server_url",e),window.showLuxuryToast("تم حفظ الرابط وبثه للجميع، سيتم تحديث الصفحة","success"),setTimeout(()=>location.reload(),1500)}catch{window.showLuxuryToast("خطأ في الصلاحيات لرفع الرابط","error")}};window.startStaffWASession=function(){const t=document.getElementById("wa-staff-select");if(!t||!t.value)return window.showLuxuryToast("يرجى اختيار موظف للربط","error");E&&(document.getElementById("wa-server-status").innerText="يتم الآن توليد كود الاستجابة للموظف...",document.getElementById("wa-server-status").style.color="var(--text-dim)",document.getElementById("wa-qr-container").style.display="none",E.emit("start_session",{userId:t.value}))};window.logoutStaffWASession=function(){const t=document.getElementById("wa-staff-select");if(!t||!t.value)return window.showLuxuryToast("يرجى اختيار الموظف أولاً","error");confirm("هل أنت متأكد من فصل رقم الواتساب لهذا الموظف وسجل المحادثة الخاصة به من السيرفر؟")&&E&&E.emit("logout_session",{userId:t.value})};window.initWhatsAppServer=async function(){const t=document.getElementById("wa-server-url-config");let e=null;window.location.hostname.includes("app.github.dev")&&(e=`https://${window.location.hostname.replace("-5173","-3001")}`,console.log("تم اكتشاف GitHub Codespaces، استخدام الرابط التلقائي:",e));let i=null;try{const a=await pe(T(S,"settings/waServerUrl"));a.exists()&&(i=a.val(),localStorage.setItem("wa_server_url",i))}catch(a){console.error("Firebase config error:",a)}const o=e||i||localStorage.getItem("wa_server_url")||W;window._waServerActiveUrl=o,t&&(t.value=o);const n=document.getElementById("wa-staff-select");if(n&&window.state&&window.state.users){const a=n.value;n.innerHTML='<option value="">-- اختر الموظف --</option>',window.state.users.filter(s=>s.role==="staff"||s.role==="admin"||s.role==="supervisor").forEach(s=>{const d=s.role==="admin"?"مدير":s.role==="supervisor"?"مشرف":"موظف";n.innerHTML+=`<option value="${s.id}" ${s.id===a?"selected":""}>${s.name||s.email||"موظف"} (${d})</option>`}),n.onchange=function(){this.value&&(E&&E.emit("join_room",this.value),window.startStaffWASession())},n.value&&(E&&E.emit("join_room",n.value),window.startStaffWASession())}typeof io<"u"&&!E&&(fetch(`${o}/ping`).catch(()=>{}),E=io(o,{reconnection:!0,reconnectionAttempts:10,reconnectionDelay:2e3,transports:["websocket","polling"],secure:!0}),E.on("connect_error",a=>{console.error("Connection Error:",a),a.message!=="websocket error"&&(window._waAlerted||(alert("عذراً، المتصفح لم يستطع الاتصال بخادم الواتساب. تأكد من أن الرابط يعمل في صفحة منفصلة. الخطأ: "+a.message),window._waAlerted=!0))}),E.on("connect",()=>{console.log("Connected to WhatsApp Server!");const a=document.getElementById("wa-connection-dot");a&&(a.style.background="#4de265",a.style.boxShadow="0 0 5px #4de265",a.title="متصل بالسيرفر"),window.state.user&&E.emit("join_room",window.state.user.uid),window.state.user&&window.startCurrentWASession&&setTimeout(()=>window.startCurrentWASession(),1500)}),E.on("qr",a=>{const s=document.getElementById("wa-staff-select"),d=document.getElementById("wa-server-status"),l=document.getElementById("wa-qr-container"),r=document.getElementById("wa-qr-canvas");if(s&&s.value===a.userId&&(d&&(d.innerText="في انتظار مسح كود الـ QR...",d.style.color="var(--text-color)"),l&&(l.style.display="block"),typeof QRCode<"u"&&r&&QRCode.toCanvas(r,a.qr,function(u){u&&console.error(u)})),window.state.user&&a.userId===window.state.user.uid){const u=document.getElementById("wa-my-status-title"),f=document.getElementById("wa-my-status-desc"),c=document.getElementById("wa-my-qr-container"),w=document.getElementById("wa-my-qr-canvas"),m=document.getElementById("btn-start-my-wa"),y=document.getElementById("btn-logout-my-wa");u&&(u.innerText="بانتظار مسح رمز QR..."),f&&(f.innerText="افتح واتساب على هاتفك وامسح الرمز الظاهر أدناه ليتم ربط حسابك."),c&&(c.style.display="block"),m&&(m.innerText="تحديث الرمز"),y&&(y.style.display="none"),typeof QRCode<"u"&&w&&QRCode.toCanvas(w,a.qr,{width:250,margin:2},function(k){k&&console.error(k)})}}),E.on("ready",a=>{const s=document.getElementById("wa-staff-select"),d=document.getElementById("wa-connection-dot");if(d&&(d.style.background="#4de265",d.style.boxShadow="0 0 8px #4de265",d.title="واتساب جاهز للعمل"),s&&s.value===a.userId){const l=document.getElementById("wa-server-status"),r=document.getElementById("wa-qr-container");l&&(l.innerText=a.msg,l.style.color="#00a884"),r&&(r.style.display="none")}if(window.state.user&&a.userId===window.state.user.uid){const l=document.getElementById("wa-my-status-title"),r=document.getElementById("wa-my-status-desc"),u=document.getElementById("wa-my-qr-container"),f=document.getElementById("btn-start-my-wa"),c=document.getElementById("btn-logout-my-wa");l&&(l.innerText="واتساب متصل بنجاح"),r&&(r.innerText="حسابك الآن مرتبط بالنظام، يمكنك البدء في استقبال وإرسال الرسائل للعملاء."),u&&(u.style.display="none"),f&&(f.style.display="none"),c&&(c.style.display="inline-block"),window.showLuxuryToast("تم ربط حساب واتساب الخاص بك بنجاح","success")}}),E.on("disconnected",a=>{console.log("Disconnected Event:",a);const s=document.getElementById("wa-connection-dot");s&&(s.style.background="#ff4b4b",s.style.boxShadow="0 0 5px #ff4b4b",s.title="تم قطع الاتصال بالسيرفر");const d=a.msg||"تم قطع الاتصال بالسيرفر. يرجى إعادة الربط لتفعيل خدمات الدردشة.",l=document.getElementById("wa-staff-select");if(l&&l.value===a.userId){const r=document.getElementById("wa-server-status");r&&(r.innerText=d,r.style.color="red")}if(window.state.user&&a.userId===window.state.user.uid){const r=document.getElementById("wa-my-status-title"),u=document.getElementById("wa-my-status-desc"),f=document.getElementById("btn-start-my-wa"),c=document.getElementById("btn-logout-my-wa"),w=document.getElementById("wa-my-qr-container");r&&(r.innerText="الواتساب غير متصل"),u&&(u.innerText=d),w&&(w.style.display="none"),f&&(f.style.display="inline-block",f.innerText="إعادة الربط الآن"),c&&(c.style.display="none")}}),E.on("jid_resolved",({oldJid:a,newJid:s})=>{console.log(`JID Resolution detected: ${a} -> ${s}`);const l=(window.state.bookings||[]).find(r=>r.waJid===a);l&&(console.log(`Updating booking ${l.id} JID due to resolution`),_(T(S,`bookings/${l.id}`),{waJid:s,phone:window.normalizePhone(s)}).catch(r=>{}),window._currentWaPhone===a&&(window._currentWaPhone=s,typeof window.openStaffChat=="function"&&window.openStaffChat(s)))}),E.on("message",async a=>{var m,y,k;console.log("Real-time WA message received:",a);const s=window.normalizePhone,d=s(a.from),l=s(window._currentWaPhone),r=document.getElementById("details-modal"),u=r&&!r.classList.contains("hidden"),f=document.getElementById("wa-connection-dot");f&&(f.style.transform="scale(1.2)",setTimeout(()=>f.style.transform="scale(1)",300));const c=window.state.bookings||[];let w=c.find(p=>p.waJid===a.from);if(w||(w=c.find(p=>{if(!p.phone)return!1;const g=window.normalizePhone(p.phone);return!d.includes("@")&&g===d}),w&&!w.waJid&&(console.log(`Smart Pinning JID ${a.from} to booking ${w.id}`),_(T(S,`bookings/${w.id}`),{waJid:a.from}).catch(p=>{}),w.waJid=a.from)),u&&l&&d===l)setTimeout(()=>{window.fetchServerWAChat(window._currentWaPhone,a.userId)},500);else{if(a.isMe)return;const p=a.userId===((m=window.state.userProfile)==null?void 0:m.id),g=((y=window.state.userProfile)==null?void 0:y.role)==="admin"||((k=window.state.userProfile)==null?void 0:k.role)==="supervisor";(p||g)&&w&&window.showWAPushNotification&&window.showWAPushNotification(d,a.body,a.userId)}}))};window.showWAPushNotification=async function(t,e,i){let o=document.getElementById("wa-push-notifications-container");o||(o=document.createElement("div"),o.id="wa-push-notifications-container",o.style.cssText="position:fixed; bottom:30px; left:25px; z-index:999999; display:flex; flex-direction:column-reverse; gap:12px; width:340px; pointer-events:none;",document.body.appendChild(o));const a=(window.state.bookings||[]).find(w=>w.phone&&window.normalizePhone(w.phone)===window.normalizePhone(t)),s=a&&a.name?a.name:t;let d=e||"رسالة جديدة";d.length>70&&(d=d.substring(0,70)+"...");const l=document.createElement("div");l.style.cssText="background:rgba(255,255,255,0.98); border-right:4px solid #00a884; border-radius:12px; padding:12px 15px; box-shadow:0 6px 20px rgba(0,0,0,0.15); pointer-events:auto; cursor:pointer; transform:translateX(-120%); transition:transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s, margin 0.3s; opacity:0; overflow:hidden; position:relative; direction:rtl;",l.innerHTML=`
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:4px;">
           <div style="display:flex; align-items:center; gap:10px;">
               <div style="background:#d9fdd3; width:30px; height:30px; border-radius:50%; display:flex; justify-content:center; align-items:center;">
                   <i class="fab fa-whatsapp" style="color:#00a884; font-size:16px;"></i>
               </div>
               <strong style="color:#111b21; font-size:13.5px; margin:0; line-height:1.2;">${s}</strong>
           </div>
           <button class="fa-times-btn" style="background:none; border:none; color:#999; cursor:pointer; font-size:16px; padding:0; margin:0; line-height:1; transition:color 0.2s;"><i class="fas fa-times"></i></button>
        </div>
        <p style="margin:0; font-size:12.5px; color:#54656f; line-height:1.5; padding-right:40px;">${d}</p>
    `;const r=l.querySelector(".fa-times-btn");r.onmouseover=()=>r.style.color="#e02424",r.onmouseout=()=>r.style.color="#999";const u=async()=>{var w;try{await R(T(S,"notifications"),{userId:i||((w=window.state.userProfile)==null?void 0:w.id)||"admin",type:"wa_message",title:"رسالة واتساب من "+s,body:d,phone:t,read:!1,createdAt:new Date().toISOString()})}catch(m){console.warn("Could not save to notifications DB",m)}};let f=setTimeout(()=>{c(),u()},1e4);const c=()=>{l.style.transform="translateX(-120%)",l.style.opacity="0",l.style.marginTop=`-${l.offsetHeight}px`,setTimeout(()=>{l.parentNode&&l.parentNode.removeChild(l)},400)};r.onclick=w=>{w.stopPropagation(),clearTimeout(f),c()},l.onclick=()=>{clearTimeout(f),c(),a?(window.viewBookingDetails(a.id),setTimeout(()=>{const w=document.getElementById("details-modal").querySelector(".dash-tab.admin-only");w&&w.click()},100)):window.showLuxuryToast("الرسالة من رقم غير مسجل في أي طلب مفتوح","info")},o.insertBefore(l,o.firstChild),requestAnimationFrame(()=>{l.style.transform="translateX(0)",l.style.opacity="1"})};window.startCurrentWASession=function(){if(!window.state.user)return;const t=()=>{E.emit("start_session",{userId:window.state.user.uid});const e=document.getElementById("wa-my-status-title"),i=document.getElementById("wa-my-status-desc");e&&(e.innerText="جاري الاتصال..."),i&&(i.innerText="يتم الآن التواصل مع خادم الواتساب لتوليد رمز الاستجابة السريعة...")};E?E.connected?t():(E.once("connect",t),E.connect()):window.initWhatsAppServer()};window.logoutCurrentWASession=function(){window.state.user&&confirm("هل أنت متأكد من تسجيل الخروج من واتساب؟ لن تتمكن من المراسلة من هنا.")&&E&&E.emit("logout_session",{userId:window.state.user.uid})};window._waMediaCache=window._waMediaCache||{};window.fetchServerWAChat=async function(t,e){var n,a,s;if(!t)return;const i=document.getElementById("wa-server-chat-box");if(!i)return;let o=(n=window.state.userProfile)==null?void 0:n.id;if(((a=window.state.userProfile)==null?void 0:a.role)==="admin"||((s=window.state.userProfile)==null?void 0:s.role)==="supervisor")if(e)o=e;else{const l=(window.state.bookings||[]).find(r=>r.phone&&window.normalizePhone(r.phone)===window.normalizePhone(t));if(l&&l.assignedTo)o=l.assignedTo;else{i.innerHTML=`
                <div style="text-align:center; margin-top:auto; margin-bottom:auto;">
                    <div style="background:rgba(255,255,255,0.95); display:inline-block; padding:20px; border-radius:15px; font-size:13px; color:#555; box-shadow:0 10px 30px rgba(0,0,0,0.1); max-width:85%;">
                        <i class="fas fa-user-slash" style="color:#00a884; font-size:32px; margin-bottom:15px; display:block;"></i>
                        هذا الحجز غير مسند لموظف.<br>
                        سجل المحادثات متاح فقط للحجوزات المسندة.
                    </div>
                </div>`;return}}window._currentWaPhone=t,(!i.hasChildNodes()||i.innerHTML.includes("fa-circle-notch")||i.innerHTML.includes("fa-comment-dots"))&&(i.innerHTML='<div style="text-align:center; margin-top:auto; margin-bottom:auto;"><i class="fas fa-circle-notch fa-spin" style="font-size: 30px; color: #00a884; margin-bottom: 12px;"></i><br><div style="background: rgba(255,255,255,0.9); display: inline-block; padding: 8px 16px; border-radius: 12px; font-size: 12px; color: #555; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">جاري مزامنة الرسائل...</div></div>');try{const d=window._waServerActiveUrl||W,l=await fetch(`${d}/api/chat/${o}/${t}`);if(l.ok){const r=await l.json();if(r.messages&&r.messages.length>0){const u=i.scrollHeight-i.scrollTop-i.clientHeight<50;i.innerHTML="";const f=document.createElement("div");f.style.cssText="text-align:center; margin:10px 0 15px;",f.innerHTML='<span style="background:#fefed7; color:#54656f; font-size:11px; padding:6px 12px; border-radius:8px; box-shadow:0 1px 1px rgba(0,0,0,0.05); display:inline-block;"><i class="fas fa-lock" style="margin-left:4px; font-size:10px;"></i> الرسائل محمية ومسجلة عبر الخادم الداخلي</span>',i.appendChild(f),r.messages.forEach(c=>{const w=c.timestamp?new Date(c.timestamp*1e3).toLocaleTimeString("ar-SA",{hour:"2-digit",minute:"2-digit"}):"";let m=(c.body||"").replace(/</g,"&lt;").replace(/>/g,"&gt;");m=m.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#027eb5; text-decoration:underline;">$1</a>');const y=document.createElement("div");y.style.padding="6px 8px 8px 10px",y.style.maxWidth="75%",y.style.fontSize="14.5px",y.style.marginBottom="4px",y.style.position="relative",y.style.boxShadow="0 1px 1.5px rgba(11,20,26,0.1)",y.style.whiteSpace="pre-wrap",y.style.lineHeight="1.4",y.style.wordBreak="break-word",y.style.overflowWrap="anywhere",c.isMe?(y.style.alignSelf="flex-end",y.style.background="#d9fdd3",y.style.color="#111b21",y.style.borderRadius="12px 0 12px 12px"):(y.style.alignSelf="flex-start",y.style.background="#ffffff",y.style.color="#111b21",y.style.borderRadius="0 12px 12px 12px");let k=`<div>${m}</div>`;if(c.media)if(window._waMediaCache[c.id]&&(c.media.data=window._waMediaCache[c.id]),c.media.data===null){const g=`btn-dl-${c.id}`,x=`cont-dl-${c.id}`;let b="مرفق";c.media.mimetype.startsWith("image/")?b="صورة":c.media.mimetype.startsWith("video/")?b="فيديو":(c.media.mimetype.startsWith("audio/")||c.type==="ptt")&&(b="مقطع صوتي"),k=`<div id="${x}" style="margin-bottom:8px; display:flex; align-items:center; gap:10px; background:rgba(0,0,0,0.05); padding:10px; border-radius:8px;">
                                <i class="fas fa-file-download" style="font-size:24px; color:#54656f;"></i>
                                <div style="flex:1;">
                                    <strong style="display:block; font-size:13px;">${b} سابق</strong>
                                    <span style="font-size:11px; opacity:0.7;">${c.media.filename||"اضغط للتحميل من السيرفر"}</span>
                                </div>
                                <button id="${g}" class="btn-premium btn-sm" onclick="window.downloadWAMedia('${o}', '${t}', '${c.id}', '${x}', '${c.media.mimetype}', '${c.type}')" style="padding:4px 10px; min-width:40px;"><i class="fas fa-download"></i></button>
                            </div>`+(m?`<div>${m}</div>`:"")}else c.media.mimetype.startsWith("image/")?k=`<div style="margin:-4px -6px 4px -8px; background:rgba(0,0,0,0.02); border-radius:10px 10px 0 0; overflow:hidden; text-align:center;"><img src="data:${c.media.mimetype};base64,${c.media.data}" style="max-width:100%; max-height:220px; border-radius:8px; display:inline-block; cursor:pointer; object-fit:cover;" onclick="window.viewFullImage(this.src)"></div>`+(m?`<div>${m}</div>`:""):c.media.mimetype.startsWith("audio/")||c.type==="ptt"?k=`<div style="display:flex; align-items:center; gap:10px;"><div style="background:#00a884; width:40px; height:40px; border-radius:50%; display:flex; justify-content:center; align-items:center; flex-shrink:0;"><i class="fas fa-play" style="color:white; margin-right:-2px; font-size:14px;"></i></div> <audio controls style="max-width:200px; height:35px;"><source src="data:${c.media.mimetype};base64,${c.media.data}" type="${c.media.mimetype}"></audio></div>`+(m?`<div style="margin-top:5px;">${m}</div>`:""):c.media.mimetype.startsWith("video/")?k=`<video controls style="max-width:100%; border-radius:8px; margin-bottom:5px;"><source src="data:${c.media.mimetype};base64,${c.media.data}" type="${c.media.mimetype}"></video>`+(m?`<div>${m}</div>`:""):k=`<div style="background:rgba(0,0,0,0.05); padding:10px; border-radius:8px; display:flex; align-items:center; gap:10px; margin-bottom:5px;"><i class="fas fa-file-alt" style="font-size:24px; color:#54656f;"></i> <div><strong style="display:block; font-size:13px;">ملف ${c.media.filename||"مرفق"}</strong><span style="font-size:11px; opacity:0.7;">تنزيل للعرض</span></div></div>`+(m?`<div>${m}</div>`:"");let p="";if(c.isMe){let g=c.ack!==void 0?c.ack:c.status==="read"?3:c.status==="delivered"?2:c.status==="sent"?1:void 0;g===1||g===0?p='<i class="fas fa-check" style="font-size:12px; margin-right:4px; color:#c7c7c7;"></i>':g===2?p='<i class="fas fa-check-double" style="font-size:12px; margin-right:4px; color:#c7c7c7;"></i>':g>=3?p='<i class="fas fa-check-double" style="font-size:12px; margin-right:4px; color:#53bdeb;"></i>':p='<i class="fas fa-check" style="font-size:12px; margin-right:4px; color:#c7c7c7;"></i>'}y.innerHTML=`${k} <div style="display:flex; justify-content:flex-end; align-items:center; margin-top:2px; float:left; margin-left:-5px; padding-left:10px; padding-top:2px;">
                      <span style="font-size:11px; color:#667781;">${w}</span>
                      ${p}
                    </div><div style="clear:both;"></div>`,i.appendChild(y)}),(u||i.innerHTML.includes("fa-lock"))&&setTimeout(()=>{i.scrollTo({top:i.scrollHeight,behavior:"smooth"})},100)}else i.innerHTML='<div style="text-align:center; margin-top:auto; margin-bottom:auto;"><div style="background:rgba(255,255,255,0.95); display:inline-block; padding:15px 30px; border-radius:15px; font-size:13px; color:#555; box-shadow:0 3px 10px rgba(0,0,0,0.08);"><i class="fas fa-comment-dots" style="color:#00a884; font-size:24px; margin-bottom:10px; display:block;"></i>لا توجد رسائل سابقة مع هذا الرقم.<br>يمكنك بدء دردشة جديدة الآن.</div></div>'}else i.innerHTML=`
                <div style="text-align:center; margin-top:auto; margin-bottom:auto;">
                    <div style="background:rgba(255,255,255,0.95); display:inline-block; padding:25px; border-radius:15px; font-size:14px; color:#555; box-shadow:0 3px 10px rgba(0,0,0,0.08);">
                        <i class="fab fa-whatsapp" style="font-size:50px; margin-bottom:15px; color:#8696a0;"></i>
                        <p style="margin-bottom:15px;">خادم واتساب غير متصل لهذا الموظف</p>
                        <button class="btn-premium btn-sm" onclick="window.closeModal('details-modal'); window.switchLuxuryTab('whatsapp-mgmt')">اذهب لإعدادات الواتساب</button>
                    </div>
                </div>
            `}catch{i.innerHTML='<div style="text-align:center; margin-top:auto; margin-bottom:auto;"><div style="background:rgba(255,255,255,0.95); display:inline-block; padding:15px 25px; border-radius:15px; font-size:13px; color:#e02424; box-shadow:0 3px 10px rgba(0,0,0,0.08);"><i class="fas fa-exclamation-triangle" style="font-size:24px; margin-bottom:10px; display:block;"></i>فشل الاتصال بالخادم. يرجى التأكد من تشغيل السيرفر.</div></div>'}};let A,N=[];window.startWARecording=async function(){window._waRecordingIntent=!0;try{const t=await navigator.mediaDevices.getUserMedia({audio:!0});if(!window._waRecordingIntent){t.getTracks().forEach(i=>i.stop());return}A=new MediaRecorder(t),N=[],window._waRecordingStartTime=Date.now(),A.ondataavailable=i=>{i.data.size>0&&N.push(i.data)},A.start();const e=document.getElementById("wa-mic-btn");e&&(e.style.color="red")}catch{window.showLuxuryToast("لم يتم السماح باستخدام الميكروفون","error"),window._waRecordingIntent=!1}};window.stopWARecording=function(t,e){window._waRecordingIntent&&(window._waRecordingIntent=!1,!(!A||A.state==="inactive")&&(A.onstop=async()=>{if(Date.now()-(window._waRecordingStartTime||Date.now())<500||N.length===0){A.stream.getTracks().forEach(d=>d.stop());const s=document.getElementById("wa-mic-btn");s&&(s.style.color="#54656f");return}const o=new Blob(N,{type:"audio/webm"}),n=new FileReader;n.readAsDataURL(o),n.onloadend=()=>{const s=n.result.split(",")[1];window.sendServerWAMessage(t,e,{data:s,mimetype:"audio/webm",filename:"voice_note.webm",ptt:!0},"")};const a=document.getElementById("wa-mic-btn");a&&(a.style.color="#54656f"),A.stream.getTracks().forEach(s=>s.stop())},A.stop()))};window.handleWAMediaSelect=function(t,e){const i=document.getElementById("wa-media-upload"),o=i.files&&i.files[0];if(!o)return;if(o.size>16*1024*1024){window.showLuxuryToast("حجم الملف كبير جداً، أقصى حد يسمح به الواتساب هو 16 ميجابايت","error");return}const n=new FileReader;n.onload=function(a){const s=a.target.result.split(",")[1],d=o.type||"application/octet-stream",l=o.name;let r=prompt("هل تريد إرفاق رسالة نصية مع هذا الملف؟ (اختياري)","");if(r===null){i.value="";return}window.sendServerWAMessage(t,e,{data:s,mimetype:d,filename:l},r)},n.readAsDataURL(o)};window.sendServerWAMessage=async function(t,e,i=null,o=null){const n=document.getElementById("wa-server-input");if(n&&n.disabled)return;const a=o!==null?o:n?n.value.trim():"";if(!i&&!a)return;let s=window.state.userProfile.id;window.state.userProfile.role==="admin"&&e&&(s=e),n&&o===null&&(n.value="",n.focus());const d=document.getElementById("wa-server-chat-box");if(d){(d.innerHTML.includes("fa-comment-dots")||d.innerHTML.includes("fa-circle-notch")||!d.hasChildNodes())&&(d.innerHTML='<div style="text-align:center; margin:10px 0 15px;"><span style="background:#fefed7; color:#54656f; font-size:11px; padding:6px 12px; border-radius:8px; box-shadow:0 1px 1px rgba(0,0,0,0.05); display:inline-block;"><i class="fas fa-lock" style="margin-left:4px; font-size:10px;"></i> الرسائل محمية ومسجلة عبر الخادم الداخلي</span></div>');const l=new Date().toLocaleTimeString("ar-SA",{hour:"2-digit",minute:"2-digit"});let r=(a||"").replace(/</g,"&lt;").replace(/>/g,"&gt;");r=r.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#027eb5; text-decoration:underline;">$1</a>');const u=document.createElement("div");u.style.padding="6px 8px 8px 10px",u.style.maxWidth="75%",u.style.fontSize="14.5px",u.style.marginBottom="4px",u.style.position="relative",u.style.boxShadow="0 1px 1.5px rgba(11,20,26,0.1)",u.style.whiteSpace="pre-wrap",u.style.lineHeight="1.4",u.style.wordBreak="break-word",u.style.overflowWrap="anywhere",u.style.alignSelf="flex-end",u.style.background="#d9fdd3",u.style.color="#111b21",u.style.borderRadius="12px 0 12px 12px";let f=`<div>${r}</div>`;i&&(f='<div style="margin-bottom:5px; font-size:12px; color:#555;"><i class="fas fa-paperclip"></i> تم إرسال مرفق</div>'+f);let c='<i class="fas fa-clock" style="font-size:12px; margin-right:4px; color:#c7c7c7;"></i>';u.innerHTML=`${f} <div style="display:flex; justify-content:flex-end; align-items:center; margin-top:2px; float:left; margin-left:-5px; padding-left:10px; padding-top:2px;"><span style="font-size:11px; color:#667781;">${l}</span>${c}</div><div style="clear:both;"></div>`,d.appendChild(u),setTimeout(()=>{d.scrollTo({top:d.scrollHeight,behavior:"smooth"})},50)}try{const l=window._waServerActiveUrl||W,r={userId:s,phone:t,message:a};i&&(r.media=i),(await fetch(`${l}/api/send`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})).ok?setTimeout(()=>window.fetchServerWAChat(t,s),1500):(window.showLuxuryToast("الواتساب غير متصل في الإدارة، المرجو فحص الاتصال","error"),n&&o===null&&!i&&(n.value=a))}catch{window.showLuxuryToast("الخادم البرمجي مغلق أو متوقف","error"),n&&o===null&&!i&&(n.value=a)}finally{const l=document.getElementById("wa-media-upload");l&&(l.value="")}};window.openQuickReplyModal=function(){window.openCRUDModal("quickReplies")};window.editQuickReply=function(t){window.openCRUDModal("quickReplies",t)};window.addQuickReply=async function(t){window.openQuickReplyModal()};window.deleteQuickReply=async function(t,e){if(confirm("هل أنت متأكد من الحذف؟")){let i="";e&&(i=e.innerHTML,e.disabled=!0,e.innerHTML='<i class="fas fa-spinner fa-spin"></i>');try{await J(T(S,`quickReplies/${t}`)),window.showLuxuryToast("تم الحذف بنجاح")}catch(o){console.error("Error deleting quick reply:",o),window.showLuxuryToast("فُقدت الصلاحية أو حدث خطأ أثناء الحذف","error"),e&&(e.disabled=!1,e.innerHTML=i)}}};window.renderQuickRepliesAdmin=function(){var o;const t=document.getElementById("quick-replies-list");if(!t)return;const e=(((o=document.getElementById("qr-search"))==null?void 0:o.value)||"").toLowerCase();let i=window.state.quickReplies||[];if(e&&(i=i.filter(n=>(n.title||"").toLowerCase().includes(e)||(n.content||"").toLowerCase().includes(e))),i.length===0){t.innerHTML=`
            <div class="no-results-v2 full-width">
                <i class="fas fa-search"></i>
                <p>${e?"لا توجد نتائج تطابق بحثك":"لا توجد نماذج ردود سريعة حالياً"}</p>
            </div>`;return}t.innerHTML=i.map(n=>`
        <div class="admin-item-card-v2" data-aos="fade-up">
            <div class="item-card-content" style="flex:1;">
                <div class="item-card-header" style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                    <div class="item-icon-circle" style="background:var(--p-copper); color:white; width:35px; height:35px; border-radius:50%; display:flex; align-items:center; justify-content:center;">
                        <i class="fas fa-bolt"></i>
                    </div>
                    <strong style="color:var(--text-bright); font-size:16px;">${n.title}</strong>
                </div>
                <div class="item-card-body">
                    <p class="qr-content-preview" style="white-space: pre-wrap; margin:0; color:var(--text-dim); font-size:14px; background:rgba(0,0,0,0.2); padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.05);">${n.content}</p>
                </div>
            </div>
            <div class="item-card-actions" style="display:flex; gap:10px;">
                <button class="icon-btn-lite" onclick="window.editQuickReply('${n.id}')" title="تعديل">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="icon-btn-lite danger" onclick="window.deleteQuickReply('${n.id}', this)" title="حذف">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join("")};window._qrExpanded=!1;window.renderQuickRepliesBar=function(){const t=document.getElementById("wa-quick-replies-bar");if(!t)return;const e=window.state.quickReplies||[];if(e.length===0){t.style.display="none";return}t.style.display="flex";const i=window._qrExpanded;let o=e,n=!1;!i&&e.length>4&&(o=e.slice(0,4),n=!0);let a=o.map(s=>`
        <button onclick="window.applyQuickReply(\`${s.content.replace(/"/g,"&quot;").replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/\\n/g,"\\\\n")}\`)" style="background:white; border:1px solid var(--glass-border); padding:6px 12px; border-radius:16px; font-size:12px; color:#54656f; cursor:pointer; flex-shrink:0; white-space:nowrap; transition:all 0.2s; box-shadow:0 1px 2px rgba(0,0,0,0.05);" onmouseover="this.style.background='#f0f2f5'" onmouseout="this.style.background='white'">
            ${s.title}
        </button>
    `).join("");n?a+='<button onclick="window._qrExpanded=true; window.renderQuickRepliesBar();" style="background:#00a884; color:white; border:none; padding:6px 12px; border-radius:16px; font-size:12px; cursor:pointer; flex-shrink:0;">عرض الكل <i class="fas fa-chevron-left" style="margin-right:4px;"></i></button>':i&&e.length>4&&(a+='<button onclick="window._qrExpanded=false; window.renderQuickRepliesBar();" style="background:#e02424; color:white; border:none; padding:6px 12px; border-radius:16px; font-size:12px; cursor:pointer; flex-shrink:0;">إخفاء <i class="fas fa-chevron-right" style="margin-right:4px;"></i></button>'),t.innerHTML=a};window.applyQuickReply=function(t){const e=document.getElementById("wa-server-input");e&&(e.value=t,e.focus())};window.downloadWAMedia=async function(t,e,i,o,n,a){const s=document.getElementById(o.replace("cont-dl-","btn-dl-"));s&&(s.disabled=!0,s.innerHTML='<i class="fas fa-spinner fa-spin"></i>');try{const d=window._waServerActiveUrl||W,l=await fetch(`${d}/api/media/${t}/${e}/${i}`);if(!l.ok)throw new Error("Failed");const r=await l.json();if(!r.data)throw new Error("No data");window._waMediaCache[i]=r.data;const u=document.getElementById(o);if(!u)return;let f="";n.startsWith("image/")?f=`<div style="margin:-4px -6px 4px -8px; background:rgba(0,0,0,0.02); border-radius:10px 10px 0 0; overflow:hidden; text-align:center;"><img src="data:${n};base64,${r.data}" style="max-width:100%; max-height:220px; border-radius:8px; display:inline-block; cursor:pointer; object-fit:cover;" onclick="window.viewFullImage(this.src)"></div>`:n.startsWith("audio/")||a==="ptt"?f=`<div style="display:flex; align-items:center; gap:10px;"><div style="background:#00a884; width:40px; height:40px; border-radius:50%; display:flex; justify-content:center; align-items:center; flex-shrink:0;"><i class="fas fa-play" style="color:white; margin-right:-2px; font-size:14px;"></i></div> <audio controls style="max-width:200px; height:35px;"><source src="data:${n};base64,${r.data}" type="${n}"></audio></div>`:n.startsWith("video/")?f=`<video controls style="max-width:100%; border-radius:8px; margin-bottom:5px;"><source src="data:${n};base64,${r.data}" type="${n}"></video>`:f='<div style="background:rgba(0,0,0,0.05); padding:10px; border-radius:8px; display:flex; align-items:center; gap:10px; margin-bottom:5px;"><i class="fas fa-check-circle" style="font-size:24px; color:#00a884;"></i> <div><strong style="display:block; font-size:13px;">تم التحميل بنجاح</strong></div></div>',u.outerHTML=f}catch{s&&(s.disabled=!1,s.innerHTML='<i class="fas fa-redo"></i>'),window.showLuxuryToast("فشل تحميل الوسائط","error")}};document.addEventListener("DOMContentLoaded",()=>{document.addEventListener("click",t=>{const e=t.target.closest(".dash-tab");e&&e.dataset.tab&&window.switchLuxuryTab(e.dataset.tab)}),setTimeout(()=>{window.initWhatsAppServer()},3e3)});window.viewFullImage=function(t){let e=document.getElementById("wa-full-image-overlay");if(!e){e=document.createElement("div"),e.id="wa-full-image-overlay",e.style.cssText="position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.9); z-index:999999; display:flex; justify-content:center; align-items:center; opacity:0; transition:opacity 0.25s ease-in-out; backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px);";const o=document.createElement("div");o.innerHTML='<i class="fas fa-times"></i>',o.style.cssText="position:absolute; top:25px; right:30px; font-size:24px; color:white; cursor:pointer; padding:10px; z-index:1000000; background:rgba(255,255,255,0.1); border-radius:50%; width:45px; height:45px; display:flex; justify-content:center; align-items:center; border: 1px solid rgba(255,255,255,0.2); transition: background 0.2s;",o.onmouseover=()=>o.style.background="rgba(255,255,255,0.2)",o.onmouseout=()=>o.style.background="rgba(255,255,255,0.1)";const n=document.createElement("img");n.id="wa-full-image-element",n.style.cssText="max-width:90%; max-height:90%; border-radius:12px; box-shadow:0 15px 40px rgba(0,0,0,0.5); object-fit:contain; transform:scale(0.85); transition:transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);",e.appendChild(o),e.appendChild(n),document.body.appendChild(e);const a=()=>{e.style.opacity="0",n.style.transform="scale(0.85)",setTimeout(()=>{e.style.display="none"},250)};o.onclick=a,e.onclick=s=>{s.target===e&&a()}}const i=document.getElementById("wa-full-image-element");i.src=t,e.style.display="flex",e.offsetWidth,e.style.opacity="1",i.style.transform="scale(1)"};setTimeout(()=>{const t=document.getElementById("luxury-splash");t&&!t.classList.contains("hidden")&&(console.warn("Safety timeout: removing loader"),t.style.opacity="0",setTimeout(()=>{t.classList.add("hidden");try{t.remove()}catch{}},800),window.state&&(window.state.firstLoadDone=!0))},7e3);const Z=window.updateAppUI;window.updateAppUI=function(){var i,o;Z&&Z();const t=document.getElementById("user-display-name"),e=((i=window.state.userProfile)==null?void 0:i.role)==="admin";t&&!((o=window.state.userProfile)!=null&&o.name)&&(t.innerText=e?"مسؤول النظام":"موظف مبيعات")};console.log("--- WhatsApp Server Debug ---");console.log("Configured URL:",window._waServerActiveUrl);console.log("-----------------------------");window.promoteToAdmin=async function(t){if(confirm("تأكيد ترقية الموظف لصلاحية مسؤول؟"))try{await admin.database().ref("users/"+t).update({role:"admin"}),window.showLuxuryToast("تم ترقية الموظف بنجاح"),window.syncAdminTables("users")}catch{window.showLuxuryToast("خطأ بالصلاحيات","error")}};window.FirebaseSDK={ref:T,db:S,push:R,set:M,update:_,remove:J,auth:j};
