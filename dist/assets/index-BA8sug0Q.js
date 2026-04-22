import{i as te,g as re,a as le,b as ne,c as de,d as ce,s as ue,o as pe,r as C,e as V,u as j,f as W,h as q,j as J,k as me,l as ge,p as F,m as fe,n as K,q as we,t as ye}from"./firebase-BfvlcbVS.js";import"./emoji-picker-CeBMFWb3.js";import"./vendor-Bg_btqvK.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(i){if(i.ep)return;i.ep=!0;const a=n(i);fetch(i.href,a)}})();const oe={apiKey:"AIzaSyDQodWTn2wa0WzQuHqzZt2Ex6CdnQdrlUU",authDomain:"onecar1.firebaseapp.com",projectId:"onecar1",storageBucket:"onecar1.firebasestorage.app",messagingSenderId:"735648367644",appId:"1:735648367644:web:44ae368553280b14bdcbd9",measurementId:"G-RSTPV8SRXT",databaseURL:"https://onecar1-default-rtdb.firebaseio.com"},N=te(oe);re(N);const A=le(N),H=ne(N);de(N);ce(N);window.state={cars:[],ads:[],bookings:[],users:[],notifications:[],logs:[],partners:[],locations:[],brands:[],agents:[],specs:[],packages:[],blogs:[],reviews:[],plates:[],sales:[],user:null,userProfile:null,settings:{},lang:localStorage.getItem("luxury_lang")||"ar",soundEnabled:localStorage.getItem("luxury_sound_enabled")!=="false",tempImages:[],bookingFilter:"all",bookingSubStatusFilter:"all",currentReportPeriod:"day",firstLoadDone:!1,inventoryPage:1,inventorySize:8,sliderIndex:0};const be={ar:{welcome:"مرحباً بك في عالم الفخامة",inventory:"مخزون السيارات المتاح",totalCars:"إجمالي السيارات",totalBookings:"إجمالي الطلبات",totalValue:"قيمة المخزون",searchPlaceholder:"ابحث عن سيارتك المثالية...",loading:"جاري التحميل...",noResults:"لم يتم العثور على نتائج تطابق بحثك",applyNow:"اطلبها الآن",details:"عرض التفاصيل",back:"رجوع",save:"حفظ",delete:"حذف",edit:"تعديل",cancel:"إلغاء",successMsg:"تمت العملية بنجاح",errorMsg:"حدث خطأ غير متوقع",staff:"قسم المبيعات والمتابعة",admin:"إدارة النظام",supervisor:"مشرف النظام"},en:{welcome:"Welcome to the World of Luxury",inventory:"Available Vehicle Inventory",totalCars:"Total Vehicles",totalBookings:"Total Bookings",totalValue:"Inventory Value",searchPlaceholder:"Search for your perfect car...",loading:"Loading...",noResults:"No results found matching your search",applyNow:"Request Now",details:"View Details",back:"Back",save:"Save",delete:"Delete",edit:"Edit",cancel:"Cancel",successMsg:"Operation successful",errorMsg:"An unexpected error occurred",staff:"Sales & Follow-up Department",admin:"System Administration",supervisor:"System Supervisor"}};window.showLuxuryToast=function(t,e="success"){const n=document.getElementById("toast-container");if(!n)return;const o=document.createElement("div");o.className=`toast-v2 ${e}`,o.style.cssText=`
    background: ${e==="success"?"rgba(16, 185, 129, 0.9)":"rgba(239, 68, 68, 0.9)"};
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
  `;const i=e==="success"?"fa-check-circle":"fa-exclamation-circle";o.innerHTML=`<i class="fas ${i}"></i> <span>${t}</span>`,n.appendChild(o),setTimeout(()=>{o.style.opacity="0",o.style.transform="translateY(-20px)",o.style.transition="all 0.4s ease-in",setTimeout(()=>o.remove(),400)},4e3)};window.compressImage=function(t,e=1e3,n=1e3,o=.6){return new Promise((i,a)=>{if(!t||!(t instanceof File||t instanceof Blob)){i(t);return}const r=new FileReader;r.readAsDataURL(t),r.onload=d=>{const s=new Image;s.src=d.target.result,s.onload=()=>{const l=document.createElement("canvas");let f=s.width,c=s.height;f>c?f>e&&(c*=e/f,f=e):c>n&&(f*=n/c,c=n),l.width=f,l.height=c,l.getContext("2d").drawImage(s,0,0,f,c),i(l.toDataURL("image/jpeg",o))},s.onerror=a},r.onerror=a})};window.openModal=function(t){const e=document.getElementById(t);if(e){e.classList.remove("hidden"),document.body.style.overflow="hidden";const n=document.querySelectorAll(".modal:not(.hidden)");e.style.zIndex=2e3+n.length*10,ve(`modal-${t}`)}};window.closeModal=function(t,e=!1){var o;const n=document.getElementById(t);n&&(n.classList.add("hidden"),n.style.zIndex="",!e&&((o=history.state)==null?void 0:o.type)===`modal-${t}`&&history.back(),document.querySelector(".modal:not(.hidden)")||(document.body.style.overflow="auto"))};window.setModalTitle=function(t,e){const n=document.getElementById(t+"-title");n&&(n.innerText=e)};window.switchLuxuryTab=function(t){const e=document.querySelectorAll(".pane, .admin-tab-content"),n=document.querySelectorAll(".dash-tab, .admin-sidebar-nav li");e.forEach(r=>r.classList.add("hidden")),n.forEach(r=>r.classList.remove("active"));const o=document.getElementById(t),i=document.querySelector(`[data-tab="${t}"]`);o&&(o.classList.remove("hidden"),o.classList.add("active"),o.style.animation="fade-up 0.5s ease-out forwards"),i&&i.classList.add("active");const a=document.getElementById("bookings-submenu");if(a&&a.classList.toggle("active",t==="bookings-mgmt"||t==="all-bookings"),window.innerWidth<1024){const r=document.querySelector(".dash-sidebar, .admin-sidebar-v2");r&&r.classList.remove("active")}t==="whatsapp-monitor-mgmt"&&window.initWhatsAppServer&&window.initWhatsAppServer(),t==="whatsapp-mgmt"&&window.startCurrentWASession(),t==="quick-replies-mgmt"&&window.renderQuickRepliesAdmin&&window.renderQuickRepliesAdmin()};function ve(t){var e;((e=history.state)==null?void 0:e.type)!==t&&history.pushState({type:t},"")}window.normalizePhone=function(t){if(!t)return"";const e=t.toString().trim();if(e.includes("@s.whatsapp.net"))return e.split("@")[0].replace(/\D/g,"");if(e.includes("@lid"))return e;let n=e.replace(/\D/g,"");if(n.startsWith("9660")?n="966"+n.substring(4):n.startsWith("9670")&&(n="967"+n.substring(4)),n.startsWith("966")||n.startsWith("967"))return n;if(n.startsWith("05"))return"966"+n.substring(1);if(n.startsWith("07"))return"967"+n.substring(1);if(n.startsWith("0"))return"966"+n.substring(1);if(n.length===9){if(n.startsWith("7"))return"967"+n;if(n.startsWith("5"))return"966"+n}return n};document.addEventListener("DOMContentLoaded",()=>{xe(),ie(),ke(),window.trackVisit(),he()});function he(){const t=document.querySelector(".mobile-btn"),e=document.querySelector(".nav-menu"),n=document.querySelector(".mobile-nav-overlay"),o=document.querySelector(".menu-close-btn"),i=(u=!1)=>{const y=u===!1?!e.classList.contains("active"):!1;e.classList.toggle("active",y),n.classList.toggle("active",y),document.body.style.overflow=y?"hidden":"";const I=t==null?void 0:t.querySelector("i");I&&(I.className=y?"fas fa-times":"fas fa-bars-staggered")};t&&(t.onclick=()=>i()),n&&(n.onclick=()=>i(!0)),o&&(o.onclick=()=>i(!0)),document.querySelectorAll(".nav-menu a").forEach(u=>{u.addEventListener("click",()=>i(!0))});const a=document.querySelector(".mobile-menu-header .dynamic-name-ar");a&&window.__DYNAMIC_NAME_AR__&&(a.innerText=window.__DYNAMIC_NAME_AR__);const r=document.getElementById("admin-trigger");r&&(r.onclick=u=>{u.preventDefault(),window.openModal("admin-modal")});const d=document.getElementById("theme-btn");d&&(d.onclick=()=>{const y=(document.body.getAttribute("data-theme")||"dark")==="dark"?"light":"dark";document.body.setAttribute("data-theme",y),localStorage.setItem("luxury_theme",y),localStorage.setItem("theme_manually_overridden","true"),d.innerHTML=y==="dark"?'<i class="fas fa-sun"></i>':'<i class="fas fa-moon"></i>'});const s=document.getElementById("lang-btn");s&&(s.onclick=()=>{window.state.lang=window.state.lang==="ar"?"en":"ar",localStorage.setItem("luxury_lang",window.state.lang),ie(),window.applyInventoryFilters(),s.innerText=window.state.lang==="ar"?"EN":"AR"}),document.querySelectorAll(".dash-tab").forEach(u=>{u.onclick=()=>window.switchLuxuryTab(u.dataset.tab)});const l=document.getElementById("car-search-input");l&&(l.oninput=()=>window.applyInventoryFilters()),["filter-make","filter-type","filter-year","filter-sort"].forEach(u=>{const y=document.getElementById(u);y&&(y.onchange=()=>{window.state.inventoryPage=1,window.applyInventoryFilters()})});const c=document.getElementById("p-prev"),m=document.getElementById("p-next");c&&(c.onclick=()=>window.moveLuxurySlider(-1)),m&&(m.onclick=()=>window.moveLuxurySlider(1)),setInterval(()=>{const u=document.getElementById("luxury-splash");(!u||u.classList.contains("hidden"))&&window.moveLuxurySlider(1)},5e3),["calc-car-price","calc-down-pay","calc-years"].forEach(u=>{const y=document.getElementById(u);y&&(y.oninput=()=>window.calculateLuxuryFinancing()),y&&y.tagName==="SELECT"&&(y.onchange=()=>window.calculateLuxuryFinancing())}),document.querySelectorAll(".modal-close").forEach(u=>{u.onclick=y=>{y.stopPropagation();const I=u.closest(".modal");if(I){if(I.id==="admin-modal"&&window.state.user&&!confirm("هل تريد الخروج من لوحة التحكم؟"))return;window.closeModal(I.id)}}}),window.onclick=u=>{const y=document.getElementById("wa-emoji-picker");if(y&&y.style.display!=="none"){const k=u.target.closest(".fa-smile")!==null,S=y.contains(u.target);!k&&!S&&(y.style.display="none")}const I=Array.from(document.querySelectorAll(".modal:not(.hidden)"));if(I.length>0){const k=I[I.length-1];if(u.target===k){if(k.id==="admin-modal"&&window.state.user&&!confirm("هل تريد الخروج من لوحة التحكم؟"))return;window.closeModal(k.id)}}},window.addEventListener("popstate",u=>{const y=document.querySelectorAll(".modal:not(.hidden)");y.length>0&&y.forEach(I=>{var k;((k=u.state)==null?void 0:k.type)!==`modal-${I.id}`&&window.closeModal(I.id,!0)})}),window.onscroll=()=>{const u=document.getElementById("main-nav");u&&u.classList.toggle("scrolled",window.scrollY>50);const y=document.getElementById("scroll-jump");y&&y.classList.toggle("hidden",window.scrollY<500)},document.getElementById("scroll-jump")&&(document.getElementById("scroll-jump").onclick=()=>window.scrollTo({top:0,behavior:"smooth"}));const x=document.getElementById("login-form");x&&(x.onsubmit=u=>window.loginAdmin(u));const g=document.getElementById("booking-form");g&&(g.onsubmit=u=>window.submitBooking(u));const h=document.getElementById("item-form");h&&(h.onsubmit=u=>window.saveLuxuryItem(u))}function xe(){const t=JSON.parse(localStorage.getItem("luxury-settings-cache")||"{}"),e=localStorage.getItem("theme_manually_overridden")==="true",n=(e?localStorage.getItem("luxury_theme"):t.defaultTheme)||"dark";e||localStorage.setItem("luxury_theme",n),document.body.setAttribute("data-theme",n);const o=document.getElementById("theme-btn");o&&(o.innerHTML=n==="dark"?'<i class="fas fa-sun"></i>':'<i class="fas fa-moon"></i>')}function ie(){const t=window.state.lang;document.body.dir=t==="ar"?"rtl":"ltr",document.body.classList.toggle("en",t==="en");const e=be[t];document.querySelectorAll("[data-i18n]").forEach(n=>{const o=n.getAttribute("data-i18n");e[o]&&(n.innerText=e[o])})}async function ke(){await ue(H,ye);const t=["users","plates","locations","brands","agents","specs","packages","blogs","reviews","cars","ads","sales","settings","partners","custom_presets"],e=["bookings","notifications","logs","quickReplies"],n={};function o(i){n[i]||(n[i]=V(C(A,i),a=>{const r=a.val();i==="settings"?(window.state.settings=r||{},window.applySettings(r)):(window.state[i]=r?Object.entries(r).map(([d,s])=>({...s,id:d})):[],i==="cars"&&window.applyInventoryFilters(),i==="ads"&&window.renderAdsSlider(),i==="sales"&&window.renderSalesVideos(),i==="partners"&&window.renderPartners(),i==="reviews"&&window.renderPublicReviews(),i==="custom_presets"&&window.renderCustomPresets(),window.state.user&&(window.syncAdminTables(i),window.updateStatistics())),Ie()},a=>{console.warn(`Listener for ${i} failed:`,a.message),delete n[i]}))}pe(H,async i=>{if(window.state.user=i,i){const a=C(A,`users/${i.uid}`);V(a,r=>{window.state.userProfile={...r.val(),id:i.uid},Z(),window.initWhatsAppServer&&window.initWhatsAppServer()}),e.forEach(o)}else window.state.userProfile=null,Z(),e.forEach(a=>{n[a]&&delete n[a]})}),t.forEach(o)}function Ie(){var o,i;if(window.state.firstLoadDone)return;const t=window.state.settings,e=t==null?void 0:t.maintenanceMode,n=((o=window.state.userProfile)==null?void 0:o.role)==="admin"||((i=window.state.userProfile)==null?void 0:i.role)==="supervisor";if(e&&!n){const a=document.getElementById("luxury-splash");a&&(a.innerHTML=`
            <div class="maint-content" style="text-align:center; color:white; padding: 20px;">
                <i class="fas fa-tools" style="font-size:60px; color:var(--p-red); margin-bottom:20px;"></i>
                <h1 class="luxury-font" style="margin-bottom:10px;">الموقع تحت الصيانة</h1>
                <p style="opacity:0.8;">نعمل حالياً على تحديث المنصة لتقديم تجربة أفضل، سنعود قريباً جداً.</p>
                <div style="margin-top:30px;">
                    <button class="btn-premium btn-sm" onclick="window.openModal('admin-modal')">دخول الإدارة</button>
                </div>
            </div>
          `,a.style.opacity="1",a.classList.remove("hidden"));return}t&&Object.keys(t).length>0&&setTimeout(()=>{const a=document.getElementById("luxury-splash");a&&(a.style.opacity="0",setTimeout(()=>{a.classList.add("hidden"),a.remove()},800)),window.state.firstLoadDone=!0},1200)}function Z(){var r,d,s;const t=!!window.state.user,e=((r=window.state.userProfile)==null?void 0:r.role)==="admin",n=((d=window.state.userProfile)==null?void 0:d.role)==="supervisor";document.body.classList.toggle("is-logged-in",t),document.body.classList.toggle("is-admin",e),document.body.classList.toggle("is-supervisor",n);const o=document.getElementById("admin-login-ui"),i=document.getElementById("admin-dash-ui");o&&o.classList.toggle("hidden",t),i&&i.classList.toggle("hidden",!t);const a=document.getElementById("admin-trigger");if(a&&(a.innerText=t?"لوحة التحكم":"تسجيل الدخول"),document.querySelectorAll(".admin-only").forEach(l=>l.classList.toggle("hidden",!e&&!n)),document.querySelectorAll(".supervisor-only").forEach(l=>l.classList.toggle("hidden",!n&&!e)),document.querySelectorAll(".admin-strictly").forEach(l=>l.classList.toggle("hidden",!e)),document.querySelectorAll(".staff-only").forEach(l=>l.classList.toggle("hidden",e||n)),t){window.syncAdminTables("all"),window.updateStatistics();const l=document.getElementById("user-display-name"),f=document.getElementById("user-role-label");if(l&&(l.innerText=((s=window.state.userProfile)==null?void 0:s.name)||(e?"المسؤول العام":n?"المشرف العام":"الموظف")),f){let m="قسم المبيعات والمتابعة";e?m="إدارة النظام (Admin)":n&&(m="إدارة الرقابة والإشراف (Supervisor)"),f.innerText=m}const c=document.querySelector(".dash-tab.active");if(!c||c.classList.contains("hidden")){let m="bookings-mgmt";n&&(m="supervisor-dash");const p=document.querySelector(`.dash-tab[data-tab="${m}"]`);p&&p.click()}(n||e)&&(window.renderSupervisorStaffList(),window.populateStaffMonitorSelect())}}window.handleSupervisorExport=async function(t){var f,c,m;const e=document.getElementById("sup-export-type").value,n=document.getElementById("sup-export-start").value,o=document.getElementById("sup-export-end").value;let i=window.state[e]||[];Array.isArray(i)||(i=Object.values(i));let a=i;if(n||o){const p=n?new Date(n):new Date(0),x=o?new Date(o):new Date;x.setHours(23,59,59,999),a=i.filter(g=>{const h=g.createdAt||g.timestamp||0,u=new Date(h);return u>=p&&u<=x})}if(a.length===0){window.showLuxuryToast("لا توجد بيانات للفترة المحددة","warning");return}const d={cars:{make:"الماركة",model:"الموديل",year:"السنة",price:"السعر",monthlyInstallment:"القسط الشهري",color:"اللون الخارجى",interiorColor:"اللون الداخلى",mileage:"الممشى",engine:"المحرك",gearbox:"ناقل الحركة",fuelType:"نوع الوقود",status:"الحالة",createdAt:"تاريخ الإضافة"},bookings:{name:"اسم العميل",phone:"رقم الجوال",carRequested:"السيارة المطلوبة",city:"المدينة",nationality:"الجنسية",paymentMethod:"طريقة الشراء",salary:"الراتب",status:"الحالة",subStatus:"الحالة الفرعية",createdAt:"تاريخ الطلب",assignedTo:"الموظف المسؤول"},users:{name:"الاسم",email:"البريد الإلكتروني",role:"الدور",isAvailable:"متاح للاستلام",createdAt:"تاريخ الإنشاء"}}[e]||{},s=Object.keys(d),l=a.map(p=>{const x={};return s.forEach(g=>{let h=p[g];if(g==="createdAt"||g==="timestamp"||g==="lastLogin")h=h?new Date(h).toLocaleString("ar-SA"):"";else if(g==="assignedTo"&&h){const u=(window.state.users||[]).find(y=>y.id===h);h=u?u.name||u.email:h}else g==="status"?h={available:"متاح",reserved:"محجوز",sold:"مباع",incoming:"قادم قريباً",new:"جديد",done:"تم",cancelled:"ملغى",rejected:"مرفوض"}[h]||h:g==="isAvailable"&&(h=h?"نعم":"لا");x[d[g]]=h??""}),x});if(l.length===0||Object.keys(l[0]).length===0){window.showLuxuryToast("خطأ في معالجة البيانات للتصدير","error");return}if(t==="xlsx"){const p=XLSX.utils.json_to_sheet(l);p["!views"]=[{RTL:!0}];const x=Object.keys(l[0]).map(()=>({wch:20}));p["!cols"]=x;const g=XLSX.utils.book_new();XLSX.utils.book_append_sheet(g,p,"التقرير"),XLSX.writeFile(g,`تقرير_${e}_${new Date().toLocaleDateString("ar-EG").replace(/\//g,"-")}.xlsx`),window.showLuxuryToast("تم تصدير ملف Excel بنجاح"),window.createLog("تصدير بيانات",`تصدير تقرير ${e} بصيغة Excel`,"data")}else if(t==="pdf"){window.showLuxuryToast("جاري معالجة ملف PDF...");const p=document.createElement("div");p.style.position="absolute",p.style.top="-9999px",p.style.width="1000px",p.style.direction="rtl",p.style.fontFamily="'Cairo', sans-serif",p.style.padding="30px",p.style.background="#fff",p.style.color="#111";const x=a.length,g=n||o?`الفترة من: ${n||"البداية"} إلى: ${o||"اليوم"}`:"كافة البيانات",h=((f=window.state.settings)==null?void 0:f.logo)||"logo.jpg",u=Object.keys(l[0]);let y=`
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:3px solid #a11d21; padding-bottom:20px; margin-bottom:30px;">
        <div style="text-align:right;">
          <h1 style="color:#a11d21; margin:0; font-size:28px;">${((c=window.state.settings)==null?void 0:c.nameAr)||"ديار الشهامة"}</h1>
          <p style="margin:5px 0; opacity:0.7;">تقرير إداري مفصل - ${e==="cars"?"مخزون السيارات":e==="bookings"?"سجل الحجوزات":"قائمة الموظفين"}</p>
          <p style="font-size:12px; font-weight:bold;">${g}</p>
        </div>
        <img src="${h}" style="height:80px; width:auto; object-fit:contain;">
      </div>

      <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:20px; margin-bottom:30px;">
        <div style="background:#f9fafb; padding:15px; border-radius:10px; border:1px solid #eee;">
          <small style="color:#666;">إجمالي السجلات</small>
          <div style="font-size:20px; font-weight:bold; color:#a11d21;">${x}</div>
        </div>
        <div style="background:#f9fafb; padding:15px; border-radius:10px; border:1px solid #eee;">
          <small style="color:#666;">تاريخ الاستخراج</small>
          <div style="font-size:14px; font-weight:bold;">${new Date().toLocaleString("ar-SA")}</div>
        </div>
        <div style="background:#f9fafb; padding:15px; border-radius:10px; border:1px solid #eee;">
          <small style="color:#666;">المصدر</small>
          <div style="font-size:14px; font-weight:bold;">نظام ديار الشهامة السحابي</div>
        </div>
      </div>

      <table style="width:100%; border-collapse:collapse; text-align:right; font-size:10px;">
        <thead>
          <tr style="background:#a11d21; color:white;">
            ${u.map(k=>`<th style="padding:10px 5px; border:1px solid #a11d21; white-space:nowrap;">${k}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${l.map((k,S)=>`
            <tr style="background:${S%2===0?"#fff":"#fcfcfc"};">
              ${u.map($=>`<td style="padding:8px 5px; border:1px solid #eee;">${k[$]}</td>`).join("")}
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div style="margin-top:40px; border-top:1px solid #eee; padding-top:10px; font-size:10px; color:#999; text-align:center;">
        هذا التقرير تم توليده آلياً من لوحة تحكم المشرف. جميع الحقوق محفوظة لشركة ${((m=window.state.settings)==null?void 0:m.nameAr)||"ديار الشهامة"}.
      </div>
    `;p.innerHTML=y,document.body.appendChild(p);const I={margin:[10,10],filename:`تقرير_${e}_${new Date().toLocaleDateString("ar-EG").replace(/\//g,"-")}.pdf`,image:{type:"jpeg",quality:1},html2canvas:{scale:2,useCORS:!0,letterRendering:!0},jsPDF:{unit:"mm",format:"a4",orientation:"landscape"}};html2pdf().set(I).from(p).save().then(()=>{document.body.removeChild(p),window.showLuxuryToast("تم استخراج التقرير بنجاح"),window.createLog("تصدير بيانات",`تصدير تقرير ${e} بصيغة PDF`,"data")}).catch(k=>{console.error(k),window.showLuxuryToast("خطأ أثناء استخراج PDF","error"),p.parentNode&&document.body.removeChild(p)})}};window.populateStaffMonitorSelect=function(){const t=document.getElementById("sup-monitor-staff-select");if(!t)return;const e=window.state.users.filter(n=>n.role==="staff");t.innerHTML='<option value="">-- اختر موظف --</option>'+e.map(n=>`<option value="${n.id}">${n.name||n.email}</option>`).join("")};window.monitorStaffChats=function(t){const e=document.getElementById("monitor-active-chats-list"),n=document.getElementById("monitor-chat-body"),o=document.getElementById("monitor-chat-header");if(!e||!n||!o)return;if(!t){e.innerHTML="",n.innerHTML="",o.innerText="اختر محادثة لبدء المراقبة";return}e.innerHTML='<div class="loading-v2">جاري جلب المحادثات...</div>';const i=C(A,"chats"),a=query(i,orderByChild("assignedTo"),equalTo(t));V(a,r=>{const d=[];if(r.forEach(s=>{d.push({id:s.key,...s.val()})}),d.length===0){e.innerHTML='<div class="no-data">لا توجد محادثات نشطة لهذا الموظف</div>';return}e.innerHTML=d.map(s=>`
      <div class="monitor-chat-item" onclick="window.viewMonitorChat('${s.id}', '${s.customerName||s.customerPhone}')">
        <div class="m-chat-info">
          <strong>${s.customerName||"عميل"}</strong>
          <span>${s.customerPhone||""}</span>
        </div>
        <div class="m-chat-meta">
          <small>${new Date(s.lastMessageTime).toLocaleTimeString()}</small>
        </div>
      </div>
    `).join("")})};window.viewMonitorChat=function(t,e){const n=document.getElementById("monitor-chat-body"),o=document.getElementById("monitor-chat-header");if(!n||!o)return;o.innerText=`مراقبة: ${e}`,n.innerHTML='<div class="loading-v2">جاري تحميل الرسائل...</div>';const i=C(A,`messages/${t}`);V(i,a=>{const r=[];a.forEach(d=>r.push(d.val())),n.innerHTML=r.map(d=>`
      <div class="chat-msg ${d.sender==="staff"?"sent":"received"}">
        <div class="msg-bubble">
          <p>${d.text}</p>
          <small>${new Date(d.timestamp).toLocaleTimeString()}</small>
        </div>
      </div>
    `).join(""),n.scrollTop=n.scrollHeight})};window.renderSupervisorStaffList=function(){const t=document.getElementById("supervisor-staff-list-v2");if(!t)return;const e=(window.state.users||[]).filter(o=>o.role==="staff"),n=window.state.bookings||[];if(e.length===0){t.innerHTML='<tr><td colspan="6" style="text-align:center; padding:30px; opacity:0.5;">لا يوجد موظفين مسجلين حالياً</td></tr>';return}t.innerHTML=e.map((o,i)=>{const a=n.filter(f=>f.assignedTo===o.id),r=a.filter(f=>f.status==="sold"||f.status==="done").length,d=a.length>0?Math.round(r/a.length*100):0,l=(o.phone||"").replace(/\D/g,"");return`
      <tr onclick="window.showStaffStats('${o.id}')" id="staff-row-${o.id}">
        <td><div class="staff-avatar-circle">${(o.name||"S")[0]}</div></td>
        <td>
            <div style="font-weight:700;">${o.name||"موظف بدون اسم"}</div>
            <div style="font-size:10px; opacity:0.5;">ID: ${o.id.substring(0,8)}</div>
        </td>
        <td>${o.email}</td>
        <td><span class="badge-v2" style="background:rgba(255,215,0,0.1); color:var(--p-gold); border:none;">${a.length} طلب</span></td>
        <td>
            <div style="font-size:12px; font-weight:bold; color:${d>50?"#10b981":"var(--p-gold)"}">${d}%</div>
            <div style="width:50px; height:3px; background:rgba(255,255,255,0.05); border-radius:2px; margin-top:4px;">
                <div style="width:${d}%; height:100%; background:currentColor; border-radius:2px;"></div>
            </div>
        </td>
        <td>
            <div class="action-btns-cell">
                ${o.phone?`
                    <a href="tel:${l}" class="btn-action-lite call" title="اتصال هاتفي" onclick="event.stopPropagation()">
                        <i class="fas fa-phone-alt"></i>
                    </a>
                    <a href="https://wa.me/${l}" target="_blank" class="btn-action-lite whatsapp" title="مراسلة واتساب" onclick="event.stopPropagation()">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                `:""}
                <button class="btn-action-lite" title="تعديل الاسم" onclick="event.stopPropagation(); window.updateStaffName('${o.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-action-lite" style="color:var(--p-red);" title="حذف الموظف" onclick="event.stopPropagation(); window.deleteStaff('${o.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
      </tr>
    `}).join("")};window.showStaffStats=function(t){const e=(window.state.users||[]).find(c=>c.id===t);if(!e)return;document.querySelectorAll(".staff-table tr").forEach(c=>c.classList.remove("selected"));const n=document.getElementById(`staff-row-${t}`);n&&n.classList.add("selected");const o=document.getElementById("staff-details-panel"),i=document.getElementById("staff-stats-grid"),a=document.getElementById("detail-staff-name"),r=document.getElementById("detail-staff-email"),d=document.getElementById("detail-staff-avatar");if(!o||!i)return;o.style.display="block",a.innerText=e.name||e.email,r.innerText=e.email,d.innerText=(e.name||"S")[0];const s=(window.state.bookings||[]).filter(c=>c.assignedTo===t),l={total:s.length,new:s.filter(c=>c.status==="new").length,waiting:s.filter(c=>c.status==="waiting").length,sold:s.filter(c=>c.status==="sold").length,cancelled:s.filter(c=>c.status==="cancelled").length,done:s.filter(c=>c.status==="done").length},f={total:{t:"إجمالي الطلبات",i:"fa-list",c:"var(--p-gold)"},new:{t:"طلبات جديدة",i:"fa-star",c:"#3b82f6"},waiting:{t:"بانتظار الإجراء",i:"fa-clock",c:"#f59e0b"},sold:{t:"تم المبايعة",i:"fa-check-circle",c:"#10b981"},cancelled:{t:"طلبات مرفوضة",i:"fa-times-circle",c:"#ef4444"},done:{t:"مكتملة",i:"fa-flag-checkered",c:"#8b5cf6"}};i.innerHTML=Object.keys(l).map(c=>`
    <div class="mini-stat-box">
        <i class="fas ${f[c].i}" style="color:${f[c].c}; margin-bottom:8px; font-size:18px;"></i>
        <label>${f[c].t}</label>
        <strong>${l[c]}</strong>
    </div>
  `).join(""),o.scrollIntoView({behavior:"smooth",block:"nearest"})};window.updateStaffName=async function(t){const e=prompt("أدخل الإسم الجديد للموظف:");if(e)try{await j(C(A,`users/${t}`),{name:e}),window.showLuxuryToast("تم تحديث الإسم بنجاح"),window.renderSupervisorStaffList()}catch{window.showLuxuryToast("خطأ في التحديث","error")}};window.deleteStaff=async function(t){if(confirm("هل أنت متأكد من حذف هذا الموظف؟ لن يتمكن من تسجيل الدخول بعد الآن."))try{await W(C(A,`users/${t}`)),window.showLuxuryToast("تم حذف الموظف من النظام"),window.renderSupervisorStaffList()}catch{window.showLuxuryToast("خطأ في الحذف","error")}};window.toggleAvailability=async function(){if(!window.state.userProfile)return;const t=window.state.userProfile.isAvailable||!1;try{await j(C(A,`users/${window.state.user.uid}`),{isAvailable:!t}),window.state.userProfile.isAvailable=!t,window.showLuxuryToast(t?"تم تعيين الحالة: غير متاح":"أنت متاح الآن لاستلام الطلبات"),window.updateStatistics()}catch{window.showLuxuryToast("فشل تحديث الحالة","error")}};window.toggleSound=function(){window.state.soundEnabled=!window.state.soundEnabled,localStorage.setItem("luxury_sound_enabled",window.state.soundEnabled);const t=document.getElementById("sound-toggle");t&&(t.checked=window.state.soundEnabled),window.showLuxuryToast(window.state.soundEnabled?"تم تفعيل التنبيهات الصوتية":"تم كتم التنبيهات")};window.setBookingFilter=function(t,e,n="all",o=null){window.state.bookingFilter=t,window.state.bookingSubStatusFilter=n;const i=document.getElementById("filter-booking-status");i&&i.value!==t&&(i.value=t);const a=document.getElementById("filter-booking-sub-status");if(a){const r={new:["not_contacted","contacted"],waiting:["docs_received","waiting_calc","waiting_docs","waiting_signature"],inquiry:["docs_not_received"],sold:["signed","delivered"],done:["done"],cancelled:["no_response","obligations","calc_rejected","ineligible","duplicate"]},d={not_contacted:"لم يتم التواصل",contacted:"تم التواصل",docs_received:"تم استلام الاوراق",waiting_calc:"انتظار رد العميل",waiting_docs:"إنتظار إكمال الاوراق",waiting_signature:"إنتظار توقيع العميل",docs_not_received:"لم يتم استلام الاوراق",signed:"تم التوقيع",delivered:"تم التسليم",done:"تم",no_response:"لم يتم رد العميل",obligations:"التزامات",calc_rejected:"رفض الحسبة",ineligible:"غير مسموح له",duplicate:"مكرر"};let s=t==="all"?Object.keys(d):r[t]||[];a.innerHTML='<option value="all">جميع الحالات الفرعية</option>',s.forEach(l=>{const f=document.createElement("option");f.value=l,f.textContent=d[l],a.appendChild(f)}),Array.from(a.options).some(l=>l.value===n)?a.value=n:(a.value="all",window.state.bookingSubStatusFilter="all",n="all")}document.querySelectorAll(".sub-tab.b-filter").forEach(r=>{if(r.getAttribute("onclick")&&r.getAttribute("onclick").includes(`'${t}'`)){document.querySelectorAll(".sub-tab.b-filter").forEach(s=>s.classList.remove("active")),r.classList.add("active"),document.querySelectorAll(".deep-submenu").forEach(s=>s.classList.remove("active"));const d=r.closest(".status-group");if(d){const s=d.querySelector(".deep-submenu");s&&s.classList.add("active")}}}),document.querySelectorAll(".deep-tab").forEach(r=>{r.classList.remove("active"),n!=="all"&&r.getAttribute("onclick")&&r.getAttribute("onclick").includes(`'${n}'`)&&r.classList.add("active")}),window.syncAdminTables("bookings")};window.applyInventoryFilters=function(){var g,h,u,y,I,k,S;if(!document.getElementById("cars-container"))return;const e=document.getElementById("filter-make"),n=document.getElementById("filter-year");e&&e.options.length<=1&&[...new Set(window.state.cars.map(w=>w.make))].sort().forEach(w=>{const v=document.createElement("option");v.value=w,v.textContent=w,e.appendChild(v)}),n&&n.options.length<=1&&[...new Set(window.state.cars.map(w=>w.year))].sort((w,v)=>v-w).forEach(w=>{const v=document.createElement("option");v.value=w,v.textContent=w,n.appendChild(v)});const o=(((g=document.getElementById("car-search-input"))==null?void 0:g.value)||"").toLowerCase(),i=((h=document.getElementById("filter-make"))==null?void 0:h.value)||"all",a=((u=document.getElementById("filter-type"))==null?void 0:u.value)||"all",r=((y=document.getElementById("filter-year"))==null?void 0:y.value)||"all",d=((I=document.getElementById("filter-sort"))==null?void 0:I.value)||"newest";let s=((k=window.state.cars)==null?void 0:k.filter($=>{const w=!o||($.make+" "+$.model).toLowerCase().includes(o),v=i==="all"||$.make===i,E=a==="all"||$.status===a,b=r==="all"||$.year===r;return w&&v&&E&&b}))||[];d==="price-asc"?s.sort(($,w)=>(Number($.price)||0)-(Number(w.price)||0)):d==="price-desc"?s.sort(($,w)=>(Number(w.price)||0)-(Number($.price)||0)):d==="year-asc"?s.sort(($,w)=>(Number($.year)||0)-(Number(w.year)||0)):s.sort(($,w)=>new Date(w.createdAt||0)-new Date($.createdAt||0));const l=((S=window.state.cars)==null?void 0:S.filter($=>$.isFeatured).slice(0,3))||[];$e(l.length>0?l:window.state.cars.slice(0,3));const f=s.length,c=window.state.inventoryPage||1,m=window.state.inventorySize||8,p=(c-1)*m,x=s.slice(p,p+m);renderCarGrid(x),Ee(f,c,m)};function $e(t){const e=document.getElementById("featured-offers-container");if(!e||!t.length)return;const n=document.getElementById("featured-offers-section");n&&(n.style.display="block"),e.innerHTML=t.map(o=>`
        <div class="offer-card-v2" onclick="window.viewLuxuryCar('${o.id}')">
            <div class="offer-badge">عرض حصري</div>
            <div class="offer-img-box">
                <img src="${o.image||"logo.jpg"}" alt="${o.make}" loading="lazy" onerror="this.src='logo.jpg'">
            </div>
            <div class="offer-info">
                <h4>${o.make} ${o.model}</h4>
                <div class="offer-price">
                    <span>${o.price?Number(o.price).toLocaleString():o.monthlyInstallment?`قسط: ${Number(o.monthlyInstallment).toLocaleString()}`:"تواصل معنا"}</span>
                    ${o.price||o.monthlyInstallment?'<small style="font-size: 14px; margin-right: 5px;">ريال</small>':""}
                </div>
                <button class="btn-premium btn-sm" style="margin-top: 10px; width: 100%;">تفاصيل العرض</button>
            </div>
        </div>
    `).join("")}function Ee(t,e,n){const o=document.getElementById("pagination-wrap");if(!o)return;const i=Math.ceil(t/n);if(i<=1){o.innerHTML="";return}let a="";e>1&&(a+=`<button class="p-btn nav-dir" onclick="window.state.inventoryPage=${e-1}; window.applyInventoryFilters(); window.scrollTo({top: document.getElementById('inventory').offsetTop - 100, behavior:'smooth'})"><i class="fas fa-chevron-right"></i> السابق</button>`);for(let r=1;r<=i;r++)a+=`<button class="p-btn ${r===e?"active":""}" onclick="window.state.inventoryPage=${r}; window.applyInventoryFilters(); window.scrollTo({top: document.getElementById('inventory').offsetTop - 100, behavior:'smooth'})">${r}</button>`;e<i&&(a+=`<button class="p-btn nav-dir" onclick="window.state.inventoryPage=${e+1}; window.applyInventoryFilters(); window.scrollTo({top: document.getElementById('inventory').offsetTop - 100, behavior:'smooth'})">التالي <i class="fas fa-chevron-left"></i></button>`),o.innerHTML=a}window.renderPartners=function(){const t=document.getElementById("front-partners-grid");!t||!window.state.partners||(t.innerHTML=window.state.partners.map(e=>`
    <div class="partner-logo-v2">
        <img src="${e.logo}" alt="${e.name}" title="${e.name}">
    </div>
  `).join(""))};window.renderPublicReviews=function(){const t=document.getElementById("public-reviews-container");if(!(!t||!window.state.reviews)){if(window.state.reviews.length===0){t.innerHTML='<div class="no-results-v2"><p>لا توجد آراء عملاء حالياً</p></div>';return}t.innerHTML=window.state.reviews.map(e=>{const n=e.avatar||e.image||"",o=e.name||"عميل غير معروف",i=e.car?`<span> اشترى <span style="color:var(--p-copper); font-weight:bold;">${e.car}</span></span>`:'<span>عميل مُحقّق <i class="fas fa-check-circle"></i></span>';return`
    <div class="review-card-v2" data-aos="zoom-in">
        <div class="review-stars">
            ${'<i class="fas fa-star"></i>'.repeat(Number(e.rating||5))}
        </div>
        <p class="review-text">"${e.text||"لا يوجد تعليق"}"</p>
        <div class="review-author">
           <div class="review-author-avatar">
                ${n?`<img src="${n}" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`:o.charAt(0)}
           </div>
           <div class="review-author-info" style="line-height:1.4;">
              <strong style="display:block; font-size:16px;">${o}</strong>
              <div style="font-size:12px; opacity:0.8;">${i}</div>
           </div>
        </div>
    </div>
  `}).join("")}};window.renderCarGrid=function(t){const e=document.getElementById("cars-container");if(e){if(t.length===0){e.innerHTML='<div class="no-results-v2"><i class="fas fa-search"></i> <p>لم يتم العثور على سيارات تطابق بحثك</p></div>';return}e.innerHTML=t.map(n=>`
    <div class="car-card-premium" onclick="window.viewLuxuryCar('${n.id}')" data-aos="fade-up">
      <div class="car-img-wrap">
        <img src="${n.image||"logo.jpg"}" alt="${n.make}" loading="lazy" onerror="this.src='logo.jpg'">
        <div class="car-price-v3">${n.price?`${Number(n.price).toLocaleString()} <small>ريال</small>`:n.monthlyInstallment?`قسط من: ${Number(n.monthlyInstallment).toLocaleString()} <small>ريال</small>`:"عند التواصل"}</div>
        <div class="car-badge-v3 ${n.status==="available"?"available":n.status==="reserved"?"reserved":"sold"}">${n.status==="available"?"متاح":n.status==="reserved"?"محجوز":"مباع"}</div>
      </div>
      <div class="car-info-v3">
        <span class="car-year-v3">${n.year}</span>
        <h3 class="car-title-v3">${n.make} ${n.model}</h3>
        <div class="car-specs-v3">
          <div class="spec-item-v3">
            <i class="fas fa-road"></i>
            <span>${(Number(n.mileage)||0).toLocaleString()} كم</span>
          </div>
          <div class="spec-item-v3">
            <i class="fas fa-gas-pump"></i>
            <span>${n.fuelType||"بنزين"}</span>
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
  `).join("")}};window.viewLuxuryCar=function(t){const e=window.state.cars.find(s=>s.id===t);if(!e||!document.getElementById("details-modal"))return;let o=e.images||[];o.length===0&&e.image&&(o=[e.image]),o.length===0&&(o=["logo.jpg"]),window.normalizePhone(window.state.settings.contactSales||"0500000000");const i=e.price?`${Number(e.price).toLocaleString()} ريال`:"عند التواصل",a=e.monthlyInstallment?`
*القسط الشهري يبدأ من:* ${Number(e.monthlyInstallment).toLocaleString()} ريال`:"";`${e.make}${e.model}${e.year}${i}${a}${window.location.origin}${e.id}`;const r=`
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
          <div class="p-header">سعر الكاش</div>
          <div class="p-main">
            <span class="p-amount">${e.price?Number(e.price).toLocaleString():"عند التواصل"}</span>
            <span class="p-curr">${e.price?"ريال":""}</span>
          </div>
          ${e.monthlyInstallment?`
            <div class="p-header" style="margin-top:12px; border-top:1px solid rgba(255,255,255,0.1); padding-top:8px;">قسط شهري يبدأ من</div>
            <div class="p-main-sm" style="font-size:22px; color:var(--p-copper); font-weight:800;">
              ${Number(e.monthlyInstallment).toLocaleString()} <span style="font-size:12px; font-weight:400; opacity:0.8;">ريال / شهرياً</span>
            </div>
          `:""}
          <div class="VAT-hint">${e.price?"السعر شامل ضريبة القيمة المضافة":""}</div>
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
            ${o.map((s,l)=>`
              <div class="thumb-wrapper ${l===0?"active":""}" onclick="window.setLuxuryDetailImg(this, '${s}')">
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
               <div class="s-info"><span>الجير</span><strong>${e.gearbox||"أوتوماتيكي"}</strong></div>
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
  `,d=document.getElementById("details-modal-body");if(d){d.innerHTML=r,d.scrollTop=0;const s=document.getElementById("details-modal");if(s){s.scrollTop=0;const l=s.querySelector(".modal-inner");l&&(l.scrollTop=0)}window.openModal("details-modal")}window.trackCarView(t)};window.bookCar=function(t){const e=window.state.cars.find(i=>i.id===t);if(!e)return;const n=document.getElementById("b-car");n&&(n.value=`${e.make} ${e.model} ${e.year}`),window.closeModal("details-modal");const o=document.getElementById("booking");o&&(o.scrollIntoView({behavior:"smooth"}),n&&(n.focus(),n.style.borderColor="var(--p-copper)",setTimeout(()=>n.style.borderColor="",2e3)))};window.viewBookingDetails=function(t){var a;const e=(window.state.bookings||[]).find(r=>r.id===t);if(!e)return;(a=window.state.users.find(r=>r.id===e.assignedTo))!=null&&a.name,e.status==="sold"||e.status==="available"||e.status==="rejected"||e.status,e.status==="sold"||e.status;const n={new:"جديد",waiting:"بالانتظار",inquiry:"استفسار",sold:"مكتمل",rejected:"مرفوض",available:"متاح"},o=`
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
              <strong style="color:var(--p-copper); font-size:14px;">${n[e.status]||e.status}</strong>
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
                        ${Object.entries(n).map(([r,d])=>`<option value="${r}" ${r===(e.status||"new")?"selected":""}>${d}</option>`).join("")}
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
              
              <textarea id="wa-server-input" placeholder="اكتب رسالة للرد..." rows="1" 
                        style="flex:1; border:none; background:#f0f2f5; border-radius:20px; padding:10px 18px; font-family:inherit; font-size:14.5px; resize:none; max-height:150px; outline:none; height:42px; line-height:1.4; display:block; transition: background 0.2s;" 
                        onfocus="this.style.background='white'; this.style.boxShadow='inset 0 0 0 1px #eee';" 
                        onblur="this.style.background='#f0f2f5'; this.style.boxShadow='none';"
                        oninput="this.style.height = '42px'; this.style.height = Math.min(this.scrollHeight, 150) + 'px';" 
                        onkeydown="if(event.key==='Enter' && !event.shiftKey) { event.preventDefault(); window.sendServerWAMessage('${e.waJid||e.phone}', '${e.assignedTo||""}'); }"></textarea>
              
              <button class="wa-send-btn" onclick="window.sendServerWAMessage('${e.waJid||e.phone}', '${e.assignedTo||""}')">
                  <i class="fas fa-paper-plane"></i>
              </button>
          </div>
      </div>
    </div>
  `,i=document.getElementById("details-modal-body");if(i){i.innerHTML=o,i.scrollTop=0;const r=document.getElementById("details-modal");r&&(r.scrollTop=0),window.openModal("details-modal"),setTimeout(()=>{window.fetchServerWAChat&&window.fetchServerWAChat(e.waJid||e.phone,e.assignedTo||""),window.updateSubStatusOptions&&window.updateSubStatusOptions(e.status||"new",e.subStatus||"not_contacted"),window.renderQuickRepliesBar&&window.renderQuickRepliesBar();const d=document.querySelector("emoji-picker");d&&d.addEventListener("emoji-click",s=>{const l=document.getElementById("wa-server-input");l&&(l.value+=s.detail.unicode,l.focus())})},100)}};window.updateSubStatusOptions=function(t,e=null){const n=document.getElementById("update-booking-substatus");if(!n)return;const i={new:[{v:"not_contacted",t:"لم يتم التواصل"},{v:"contacted",t:"تم التواصل"}],waiting:[{v:"docs_received",t:"تم استلام الاوراق"},{v:"waiting_calc",t:"انتظار رد العميل"},{v:"waiting_docs",t:"إنتظار إكمال الاوراق"},{v:"waiting_signature",t:"إنتظار توقيع العميل"}],inquiry:[{v:"docs_not_received",t:"لم يتم استلام الاوراق"}],sold:[{v:"signed",t:"تم التوقيع"},{v:"delivered",t:"تم التسليم"}],rejected:[{v:"no_response",t:"لم يتم رد العميل"},{v:"obligations",t:"التزامات"},{v:"calc_rejected",t:"رفض الحسبة"},{v:"ineligible",t:"غير مسموح له"},{v:"duplicate",t:"مكرر"}]}[t]||[{v:"none",t:"-"}];n.innerHTML=i.map(a=>`<option value="${a.v}" ${a.v===e?"selected":""}>${a.t}</option>`).join("")};window.updateBookingQuickStatus=async function(t){var i,a,r;const e=(i=document.getElementById("update-booking-status"))==null?void 0:i.value,n=((a=document.getElementById("update-booking-substatus"))==null?void 0:a.value)||"",o=((r=document.getElementById("update-booking-details"))==null?void 0:r.value)||"";if(!(!e||!t))try{const d=C(A,`bookings/${t}`);await j(d,{status:e,subStatus:n,additionalDetails:o,updatedAt:new Date().toISOString()}),window.showLuxuryToast("تم تحديث حالة الطلب والتفاصيل بنجاح")}catch(d){console.error(d),window.showLuxuryToast("فشل تحديث الحالة","error")}};window.saveWAServerURL=async function(){var e;const t=(e=document.getElementById("wa-server-url-config"))==null?void 0:e.value;if(t){localStorage.setItem("wa_server_url",t);try{await q(C(A,"settings/waServerUrl"),t)}catch(n){console.error("Firebase save config error:",n)}window.showLuxuryToast("تم حفظ رابط السيرفر وتعميمه لجميع الموظفين بنجاح. يرجى إعادة تحميل الصفحة."),setTimeout(()=>location.reload(),1500)}};window.setLuxuryDetailImg=function(t,e){document.getElementById("active-luxury-img").src=e,document.querySelectorAll(".thumb-wrapper").forEach(n=>n.classList.remove("active")),t.classList.add("active")};window.switchLuxuryDetailImg=function(t,e){const n=window.state.cars.find(l=>l.id===t);if(!n)return;const o=n.images||[n.image||"logo.jpg"],i=document.getElementById("active-luxury-img").src;let a=o.findIndex(l=>i.includes(l));a===-1&&(a=0);let r=(a+e+o.length)%o.length;const d=o[r];document.getElementById("active-luxury-img").src=d;const s=document.querySelectorAll(".thumb-wrapper");s[r]&&(s.forEach(l=>l.classList.remove("active")),s[r].classList.add("active"))};window.openFullscreenGallery=function(t,e){const n=window.state.cars.find(a=>a.id===t);if(!n)return;const o=n.images||[n.image||"logo.jpg"],i=document.createElement("div");i.className="luxury-lightbox",i.innerHTML=`
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
    `,document.body.appendChild(i)};window.navLightbox=function(t,e){const n=window.state.cars.find(s=>s.id===t),o=n.images||[n.image||"logo.jpg"],i=document.getElementById("lb-main-img");let a=o.indexOf(i.src);a===-1&&(a=0);let r=a+e;r<0&&(r=o.length-1),r>=o.length&&(r=0),i.src=o[r];const d=document.querySelectorAll(".lb-thumb");d.forEach(s=>s.classList.remove("active")),d[r].classList.add("active")};window.trackCarView=async function(t){if(t)try{const e=C(A,`analytics/popularCars/${t}`);await J(e,n=>(n||0)+1)}catch(e){console.error("Tracking Error:",e)}};window.resetFilters=function(){["car-search-input","filter-make","filter-type","filter-year","filter-sort"].forEach(e=>{const n=document.getElementById(e);n&&(n.value=n.tagName==="SELECT"?e==="filter-sort"?"newest":"all":"")}),window.applyInventoryFilters()};window.trackVisit=async function(){try{const t=new Date().toISOString().split("T")[0];if(localStorage.getItem("visited_"+t))return;localStorage.setItem("visited_"+t,"true");const e=C(A,"analytics");await J(e,n=>{n||(n={totalVisits:0,dailyVisits:{},browsers:{},devices:{},popularCars:{}}),n.totalVisits=(n.totalVisits||0)+1,n.dailyVisits=n.dailyVisits||{},n.dailyVisits[t]=(n.dailyVisits[t]||0)+1;const o=navigator.userAgent;let i="Other";o.includes("Chrome")?i="Chrome":o.includes("Safari")?i="Safari":o.includes("Firefox")?i="Firefox":o.includes("Edge")&&(i="Edge"),n.browsers=n.browsers||{},n.browsers[i]=(n.browsers[i]||0)+1;const a=/iPhone|iPad|iPod|Android/i.test(o)?"mobile":"desktop";return n.devices=n.devices||{},n.devices[a]=(n.devices[a]||0)+1,n})}catch(t){console.error("Analytics Error:",t)}};window.loginAdmin=async function(t){var a,r;t.preventDefault();const e=(a=document.getElementById("admin-email"))==null?void 0:a.value,n=(r=document.getElementById("admin-pass"))==null?void 0:r.value,o=t.target.querySelector("button");if(!e||!n)return window.showLuxuryToast("يرجى إدخال البريد وكلمة المرور","error");const i=o.innerText;o.innerText="جاري التحقق...",o.disabled=!0;try{await me(H,e,n),window.showLuxuryToast("تم تسجيل الدخول بنجاح"),window.createLog("تسجيل دخول","نجاح تسجيل الدخول للنظام","auth"),window.closeModal("admin-modal")}catch(d){console.error(d),window.showLuxuryToast("خطأ في البيانات، يرجى المحاولة مرة أخرى","error")}finally{o.innerText=i,o.disabled=!1}};window.logout=async function(){confirm("هل أنت متأكد من تسجيل الخروج؟")&&(await window.createLog("تسجيل خروج","خرج المستخدم من النظام","auth"),await ge(H),window.showLuxuryToast("تم تسجيل الخروج"))};window.DESIGN_PRESETS={emerald:{primaryColor:"#065f46",secondaryColor:"#10b981",accentColor:"#fbbf24",glassBlur:25,borderRadius:20,cardStyle:"glass",glassOpacity:.6,light:{bgColor:"#ecfdf5",textColor:"#064e3b"},dark:{bgColor:"#022c22",textColor:"#ecfdf5"}},royal:{primaryColor:"#4c1d95",secondaryColor:"#8b5cf6",accentColor:"#f59e0b",glassBlur:15,borderRadius:12,cardStyle:"glass",glassOpacity:.8,light:{bgColor:"#f5f3ff",textColor:"#2e1065"},dark:{bgColor:"#0f0720",textColor:"#f5f3ff"}},midnight:{primaryColor:"#1e1b4b",secondaryColor:"#4338ca",accentColor:"#6366f1",glassBlur:30,borderRadius:24,cardStyle:"glass",glassOpacity:.7,light:{bgColor:"#f0f9ff",textColor:"#0c4a6e"},dark:{bgColor:"#020617",textColor:"#f0f9ff"}},classic:{primaryColor:"#a11d21",secondaryColor:"#1c7c8c",accentColor:"#b8860b",glassBlur:0,borderRadius:8,cardStyle:"solid",glassOpacity:1,light:{bgColor:"#f8fafc",textColor:"#0f172a"},dark:{bgColor:"#05080c",textColor:"#f8fafc"}},gold:{primaryColor:"#b8860b",secondaryColor:"#d4af37",accentColor:"#ffd700",glassBlur:10,borderRadius:0,cardStyle:"glass",glassOpacity:.9,light:{bgColor:"#fffdf0",textColor:"#2d2300"},dark:{bgColor:"#050500",textColor:"#fffdf0"}},ocean:{primaryColor:"#0f172a",secondaryColor:"#38bdf8",accentColor:"#2dd4bf",glassBlur:20,borderRadius:30,cardStyle:"glass",glassOpacity:.5,light:{bgColor:"#f0f9ff",textColor:"#0c4a6e"},dark:{bgColor:"#020617",textColor:"#f0f9ff"}},carbon:{primaryColor:"#171717",secondaryColor:"#404040",accentColor:"#ef4444",glassBlur:5,borderRadius:4,cardStyle:"solid",glassOpacity:1,light:{bgColor:"#f5f5f5",textColor:"#171717"},dark:{bgColor:"#0a0a0a",textColor:"#f5f5f5"}}};window.applyDesignPreset=function(t){const e=window.DESIGN_PRESETS[t];e&&(window.applySettings({...window.state.settings,...e}),showLuxuryToast(window.state.lang==="ar"?"تم تطبيق النمط بنجاح":"Preset applied successfully"))};window.saveCustomDesign=async function(){var n,o,i,a,r,d,s,l,f,c;const t=prompt(window.state.lang==="ar"?"أدخل اسماً لمظهرك المخصص:":"Enter a name for your custom design:");if(!t)return;const e={primaryColor:(n=document.getElementById("set-color-primary"))==null?void 0:n.value,secondaryColor:(o=document.getElementById("set-color-secondary"))==null?void 0:o.value,accentColor:(i=document.getElementById("set-color-accent"))==null?void 0:i.value,glassBlur:parseInt(((a=document.getElementById("set-glass-blur"))==null?void 0:a.value)||"20"),shadowDepth:parseInt(((r=document.getElementById("set-shadow-depth"))==null?void 0:r.value)||"40"),borderRadius:((d=document.getElementById("set-border-radius"))==null?void 0:d.value)||"16",cardStyle:((s=document.getElementById("set-card-style"))==null?void 0:s.value)||"glass",glassOpacity:parseFloat(((l=document.getElementById("set-glass-opacity"))==null?void 0:l.value)||"0.75"),bgColor:(f=document.getElementById("set-color-bg"))==null?void 0:f.value,textColor:(c=document.getElementById("set-color-text"))==null?void 0:c.value,name:t,createdAt:new Date().toISOString()};try{const m=F(C(A,"custom_presets"));await q(m,e),showLuxuryToast(window.state.lang==="ar"?"تم حفظ المظهر الخاص بنجاح":"Custom design saved successfully")}catch{showLuxuryToast("فشل الحفظ","error")}};window.deleteCustomPreset=async function(t){if(confirm(window.state.lang==="ar"?"هل أنت متأكد من حذف هذا المظهر؟":"Are you sure you want to delete this preset?"))try{await W(C(A,`custom_presets/${t}`)),showLuxuryToast(window.state.lang==="ar"?"تم الحذف":"Deleted")}catch{showLuxuryToast("Error","error")}};window.renderCustomPresets=function(){const t=document.getElementById("custom-presets-list");if(!t)return;const e=window.state.custom_presets||[];if(e.length===0){t.innerHTML=`<div style="grid-column: 1/-1; text-align:center; opacity:0.5; padding:20px;">${window.state.lang==="ar"?"لا يوجد مظاهر محفوظة":"No saved designs"}</div>`;return}t.innerHTML=e.map(n=>`
    <div class="custom-preset-card" style="background:var(--bg-card); border:1px solid var(--glass-border); padding:15px; border-radius:12px; display:flex; justify-content:space-between; align-items:center;">
       <div>
         <div style="font-weight:bold; margin-bottom:5px;">${n.name}</div>
         <div style="display:flex; gap:5px;">
            <span style="width:12px; height:12px; border-radius:50%; background:${n.primaryColor};"></span>
            <span style="width:12px; height:12px; border-radius:50%; background:${n.secondaryColor};"></span>
         </div>
       </div>
       <div style="display:flex; gap:10px;">
          <button class="btn-premium btn-sm" onclick="window.applySettings(window.state.custom_presets.find(x => x.id === '${n.id}'))" style="padding:5px 10px; font-size:11px;">تطبيق</button>
          <button class="btn-premium btn-sm" onclick="window.deleteCustomPreset('${n.id}')" style="background:var(--p-red); padding:5px 10px; font-size:11px;"><i class="fas fa-trash"></i></button>
       </div>
    </div>
  `).join("")};window.applySettings=function(t){var b,T,L,M;if(!t)return;const e=document.documentElement;if(t.defaultTheme&&!(localStorage.getItem("theme_manually_overridden")==="true")){document.body.setAttribute("data-theme",t.defaultTheme),localStorage.setItem("luxury_theme",t.defaultTheme);const R=document.getElementById("theme-btn");R&&(R.innerHTML=t.defaultTheme==="dark"?'<i class="fas fa-sun"></i>':'<i class="fas fa-moon"></i>')}t.primaryColor&&(e.style.setProperty("--p-red",t.primaryColor),e.style.setProperty("--p-red-glow",t.primaryColor+"66")),t.secondaryColor&&e.style.setProperty("--p-teal",t.secondaryColor),t.accentColor&&e.style.setProperty("--p-copper",t.accentColor);const n=t.logo||"logo.jpg";document.querySelectorAll(".logo-wrap img, .sidebar-brand img, .splash-logo img, #footer-logo-img, #nav-logo-img, #splash-logo-img").forEach(B=>{B.src=n});const o=t.nameAr||"ون كار",i=t.nameEn||"ONE CAR",a=window.state.lang==="ar"?o:i;document.querySelectorAll(".dynamic-name-ar").forEach(B=>B.innerText=o),document.querySelectorAll(".dynamic-name-en").forEach(B=>B.innerText=i),document.title=a+" | "+(window.state.lang==="ar"?"الفخامة في عالم السيارات":"Luxury Automotive"),t.fontFamily&&(e.style.setProperty("--font-main",t.fontFamily),document.body.style.fontFamily=t.fontFamily);const r="dynamic-design-styles";let d=document.getElementById(r);d||(d=document.createElement("style"),d.id=r,document.head.appendChild(d));let s="";const l=((b=t.dark)==null?void 0:b.bgColor)||t.bgColor,f=((T=t.dark)==null?void 0:T.textColor)||t.textColor,c=(L=t.light)==null?void 0:L.bgColor,m=(M=t.light)==null?void 0:M.textColor;if(l&&(s+=`body[data-theme="dark"] { --bg-main: ${l}; }
`),f&&(s+=`body[data-theme="dark"] { --text-main: ${f}; }
`),c&&(s+=`body[data-theme="light"] { --bg-main: ${c}; }
`),m&&(s+=`body[data-theme="light"] { --text-main: ${m}; }
`),t.borderRadius&&(e.style.setProperty("--border-radius-main",t.borderRadius+"px"),s+=`
      .car-card-premium, .ad-slide, .nav-premium, .modal-inner, .video-card-v2, .feature-card, .btn-premium { 
        border-radius: ${t.borderRadius}px !important; 
      }
    `),t.glassBlur&&e.style.setProperty("--glass-blur",t.glassBlur+"px"),t.shadowDepth&&e.style.setProperty("--shadow-depth",t.shadowDepth+"px"),t.shadowOpacity&&e.style.setProperty("--shadow-opacity",t.shadowOpacity),t.animSpeed&&e.style.setProperty("--anim-speed-multiplier",t.animSpeed),t.cardStyle==="solid")s+=`
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
    `;else{let B=t.glassOpacity!==void 0?t.glassOpacity:.75,R=t.glassBlur!==void 0?t.glassBlur:20;s+=`
      body[data-theme="dark"] .car-card-premium, body[data-theme="dark"] .modal-inner, body[data-theme="dark"] .stat-premium-card, body[data-theme="dark"] .nav-premium, body[data-theme="dark"] .admin-item-row {
         background: rgba(17, 24, 39, ${B}) !important;
         backdrop-filter: blur(${R}px) !important;
         -webkit-backdrop-filter: blur(${R}px) !important;
      }
      body[data-theme="light"] .car-card-premium, body[data-theme="light"] .modal-inner, body[data-theme="light"] .stat-premium-card, body[data-theme="light"] .nav-premium, body[data-theme="light"] .admin-item-row {
         background: rgba(255, 255, 255, ${B}) !important;
         backdrop-filter: blur(${R}px) !important;
         -webkit-backdrop-filter: blur(${R}px) !important;
         border: 1px solid rgba(0,0,0,0.05) !important;
      }
    `}t.logoBlend&&t.logoBlend!=="auto"&&(s+=`
      .logo-wrap img, .sidebar-brand img, .splash-logo img, #footer-logo-img, #nav-logo-img, #splash-logo-img {
         mix-blend-mode: ${t.logoBlend};
      }
    `),t.logoScale&&(s+=`
      .logo-wrap img, .sidebar-brand img, .splash-logo img, #footer-logo-img, #nav-logo-img, #splash-logo-img {
         transform: scale(${t.logoScale});
      }
    `),t.hoverEffect==="scale"?s+=`
      .car-card-premium:hover, .btn-premium:hover, .stat-premium-card:hover { transform: scale(1.02) translateY(-3px); transition: all 0.3s; z-index: 20; position:relative; }
    `:t.hoverEffect==="glow"&&(s+=`
      .car-card-premium:hover, .btn-premium:hover, .stat-premium-card:hover { box-shadow: 0 0 20px var(--p-red-glow) !important; transition: box-shadow 0.3s; z-index: 20; position:relative; }
    `),t.enableAnimations===!1?s+="* { transition: none !important; animation: none !important; }":t.enableAnimations===!0&&(s+=`
      .car-card-premium, .stat-premium-card, .feature-card {
        animation: fadeInUp 0.6s backwards calc(var(--anim-speed-multiplier) * 0.1s);
      }
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `),d.innerHTML=s;const p=document.getElementById("about-text-display");p&&(p.innerText=t.aboutUs||"نقدم لكم تجربة استثنائية في عالم السيارات...");const x=document.getElementById("location-text-display");x&&(x.innerText=t.location||"الرياض - معارض القادسية");const g=document.getElementById("f-phone-admin");g&&(g.innerText=t.contactAdmin||"...");const h=document.getElementById("f-phone-sales");h&&(h.innerText=t.contactSales||"...");const u=document.getElementById("f-phone-info");u&&(u.innerText=t.contactComplaints||"...");const y=document.getElementById("f-email-display");y&&(y.innerText=t.contactEmail||"...");const I=document.getElementById("contact-location-link");I&&(I.href=t.locationUrl||"#");const k=document.getElementById("meta-title");k&&(k.innerText=`${o} | ${t.metaTitle||"الفخامة والجودة تليق بك"}`);const S=document.getElementById("meta-description");S&&S.setAttribute("content",t.metaDesc||"وجهتكم الرائدة للسيارات الفاخرة والمعتمدة.");const $={"f-insta":t.socialInsta,"f-snap":t.socialSnap,"f-twitter":t.socialTwitter};Object.entries($).forEach(([B,R])=>{const _=document.getElementById(B);_&&(_.href=R||"#")});const w={"set-name-ar":t.nameAr||"","set-name-en":t.nameEn||"","set-color-primary":t.primaryColor||"#a11d21","set-color-secondary":t.secondaryColor||"#1c7c8c","set-color-accent":t.accentColor||"#b8860b","set-color-bg":t.bgColor||"#05080c","set-color-text":t.textColor||"#f8fafc","set-hover-effect":t.hoverEffect||"scale","set-card-style":t.cardStyle||"glass","set-glass-opacity":t.glassOpacity!==void 0?t.glassOpacity:.75,"set-logo-blend":t.logoBlend||"auto","set-logo-scale":t.logoScale||"1","set-default-theme":t.defaultTheme||"dark","set-font-family":t.fontFamily||"'Cairo', sans-serif","set-border-radius":t.borderRadius||"16","set-glass-blur":t.glassBlur||20,"set-shadow-depth":t.shadowDepth||40,"set-anim-speed":t.animSpeed||1,"set-enable-animations":t.enableAnimations!==void 0?t.enableAnimations.toString():"true","set-contact-mgmt":t.contactAdmin||"","set-contact-sales":t.contactSales||"","set-contact-complaints":t.contactComplaints||"","set-contact-email":t.contactEmail||"","set-about-text":t.aboutUs||"","set-location-link":t.locationUrl||"","set-location-text":t.location||"","set-insta-link":t.socialInsta||"","set-snap-link":t.socialSnap||"","set-twitter-link":t.socialTwitter||""};Object.entries(w).forEach(([B,R])=>{const _=document.getElementById(B);if(_&&(_.value=R,_.type==="range"||_.type==="color")){let P=document.createEvent("HTMLEvents");P.initEvent("input",!1,!0),_.dispatchEvent(P)}});const v=document.getElementById("set-maintenance-mode");v&&(v.checked=t.maintenanceMode||!1);const E=document.getElementById("logo-preview-img");E&&(E.src=n),localStorage.setItem("luxury-settings-cache",JSON.stringify(t))};window.resetToDefaultSettings=async function(){if(confirm("هل أنت متأكد من إعادة ضبط كافة الإعدادات؟ سيتم فقدان الشعارات والألوان المخصصة.")){const t={nameAr:"ون كار",nameEn:"ONE CAR",primaryColor:"#a11d21",secondaryColor:"#1c7c8c",accentColor:"#b8860b",defaultTheme:"dark",borderRadius:"16px",logo:"logo.jpg",aboutUs:"تجربة استثنائية في عالم السيارات",location:"الرياض - معارض القادسية"};await q(C(A,"settings"),t),window.showLuxuryToast("تمت إعادة الضبط بنجاح")}};window.markAllNotificationsRead=async function(){try{const t=window.state.notifications.map(e=>j(C(A,`notifications/${e.id}`),{read:!0}));await Promise.all(t),window.showLuxuryToast("تم تحديد الكل كمقروء")}catch(t){console.error(t)}};window.switchSettingsTab=function(t,e){document.querySelectorAll(".set-pane").forEach(o=>o.classList.add("hidden")),document.querySelectorAll(".set-tab").forEach(o=>o.classList.remove("active"));const n=document.getElementById(t);n&&n.classList.remove("hidden"),e&&e.classList.add("active")};window.previewLogo=async function(t){if(t.files&&t.files[0])try{const e=await window.compressImage(t.files[0],400,400,.8);document.getElementById("logo-preview-img").src=e,document.getElementById("set-logo-b64").value=e}catch(e){console.error("Logo compression failed",e)}};window.saveAppSettings=async function(){var n,o,i,a,r,d,s,l,f,c,m,p,x,g,h,u,y,I,k,S,$,w,v,E,b,T,L,M,B,R,_;const t=document.querySelector('button[onclick="window.saveAppSettings()"]');t&&(t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin"></i> جاري الحفظ...');const e={nameAr:((n=document.getElementById("set-name-ar"))==null?void 0:n.value)||"",nameEn:((o=document.getElementById("set-name-en"))==null?void 0:o.value)||"",logo:((i=document.getElementById("set-logo-b64"))==null?void 0:i.value)||window.state.settings.logo||"logo.jpg",primaryColor:((a=document.getElementById("set-color-primary"))==null?void 0:a.value)||"",secondaryColor:((r=document.getElementById("set-color-secondary"))==null?void 0:r.value)||"",accentColor:((d=document.getElementById("set-color-accent"))==null?void 0:d.value)||"",bgColor:((s=document.getElementById("set-color-bg"))==null?void 0:s.value)||"",textColor:((l=document.getElementById("set-color-text"))==null?void 0:l.value)||"",hoverEffect:((f=document.getElementById("set-hover-effect"))==null?void 0:f.value)||"scale",cardStyle:((c=document.getElementById("set-card-style"))==null?void 0:c.value)||"glass",glassOpacity:parseFloat(((m=document.getElementById("set-glass-opacity"))==null?void 0:m.value)||"0.75"),logoBlend:((p=document.getElementById("set-logo-blend"))==null?void 0:p.value)||"auto",logoScale:((x=document.getElementById("set-logo-scale"))==null?void 0:x.value)||"1",defaultTheme:((g=document.getElementById("set-default-theme"))==null?void 0:g.value)||"",fontFamily:((h=document.getElementById("set-font-family"))==null?void 0:h.value)||"",borderRadius:((u=document.getElementById("set-border-radius"))==null?void 0:u.value)||"",glassBlur:parseInt(((y=document.getElementById("set-glass-blur"))==null?void 0:y.value)||"20"),shadowDepth:parseInt(((I=document.getElementById("set-shadow-depth"))==null?void 0:I.value)||"40"),animSpeed:parseFloat(((k=document.getElementById("set-anim-speed"))==null?void 0:k.value)||"1"),enableAnimations:((S=document.getElementById("set-enable-animations"))==null?void 0:S.value)==="true",contactAdmin:(($=document.getElementById("set-contact-mgmt"))==null?void 0:$.value)||"",contactSales:((w=document.getElementById("set-contact-sales"))==null?void 0:w.value)||"",contactComplaints:((v=document.getElementById("set-contact-complaints"))==null?void 0:v.value)||"",contactEmail:((E=document.getElementById("set-contact-email"))==null?void 0:E.value)||"",aboutUs:((b=document.getElementById("set-about-text"))==null?void 0:b.value)||"",locationUrl:((T=document.getElementById("set-location-link"))==null?void 0:T.value)||"",location:((L=document.getElementById("set-location-text"))==null?void 0:L.value)||"",socialInsta:((M=document.getElementById("set-insta-link"))==null?void 0:M.value)||"",socialSnap:((B=document.getElementById("set-snap-link"))==null?void 0:B.value)||"",socialTwitter:((R=document.getElementById("set-twitter-link"))==null?void 0:R.value)||"",maintenanceMode:((_=document.getElementById("set-maintenance-mode"))==null?void 0:_.checked)||!1,updatedAt:new Date().toISOString()};try{localStorage.removeItem("theme_manually_overridden"),await q(C(A,"settings"),e),window.showLuxuryToast("تم حفظ الإعدادات بنجاح"),window.createLog("تعديل إعدادات","تحديث شامل لإعدادات الموقع والمنصة","settings")}catch{window.showLuxuryToast("فشل الحفظ، تأكد من الصلاحيات","error")}finally{t&&(t.disabled=!1,t.innerHTML='<i class="fas fa-save"></i> حفظ التغييرات')}};window.filterUsersByRole=function(t,e){e&&(document.querySelectorAll("#users-roles-tabs .p-tab").forEach(n=>n.classList.remove("active")),e.classList.add("active")),window.state.userRoleFilter=t,window.syncAdminTables("users")};window.syncAdminTables=function(t){var i,a,r,d,s,l,f,c,m,p,x,g,h;if(t==="all"){["cars","ads","sales","bookings","users","plates","reviews","partners","brands","locations","blogs","whatsapp-monitor","quick-replies"].forEach(y=>window.syncAdminTables(y));return}if(t==="whatsapp-monitor"){window.renderWhatsAppMonitor();return}if(t==="quick-replies"||t==="quickReplies"){window.renderQuickRepliesAdmin&&window.renderQuickRepliesAdmin(),window.renderQuickRepliesBar&&window.renderQuickRepliesBar();return}const e=document.getElementById(`admin-${t}-table`);if(!e)return;let n=window.state[t]||[];const o=(((i=document.getElementById(`admin-${t}-search`))==null?void 0:i.value)||((a=document.getElementById(`${t}-search`))==null?void 0:a.value)||((r=document.getElementById(`${t.slice(0,-1)}-search`))==null?void 0:r.value)||"").toLowerCase();if(o&&(n=n.filter(u=>(u.make||u.title||u.name||u.model||u.phone||u.carRequested||u.carOrCompany||"").toLowerCase().includes(o))),t==="cars"){const u=document.getElementById("admin-filter-car-make");u&&u.options.length<=1&&window.state.cars.length>0&&[...new Set(window.state.cars.map(S=>S.make))].sort().forEach(S=>{const $=document.createElement("option");$.value=S,$.textContent=S,u.appendChild($)});const y=((d=document.getElementById("admin-filter-car-status"))==null?void 0:d.value)||"all",I=((s=document.getElementById("admin-filter-car-make"))==null?void 0:s.value)||"all";y!=="all"&&(n=n.filter(k=>k.status===y)),I!=="all"&&(n=n.filter(k=>k.make===I))}if(t==="bookings"){const u=document.getElementById("filter-booking-staff");u&&u.options.length<=1&&window.state.users&&window.state.users.forEach(v=>{if(v.email!=="zyrozyro98@gmail.com"&&(v.role==="admin"||v.role==="supervisor"||v.role==="staff")){const E=document.createElement("option");E.value=v.id,E.textContent=v.name||v.email||"مستخدم غير محدد",u.appendChild(E)}});const y=document.getElementById("filter-booking-sub-status");if(y&&y.options.length<=1){window.setBookingFilter(window.state.bookingFilter||"all",null,window.state.bookingSubStatusFilter||"all");return}const I=((l=document.getElementById("filter-booking-status"))==null?void 0:l.value)||window.state.bookingFilter||"all",k=((f=document.getElementById("filter-booking-sub-status"))==null?void 0:f.value)||window.state.bookingSubStatusFilter||"all",S=((c=document.getElementById("filter-booking-staff"))==null?void 0:c.value)||"all",$=((m=document.getElementById("filter-booking-type"))==null?void 0:m.value)||"all";window.state.bookingFilter=I,window.state.bookingSubStatusFilter=k,I!=="all"&&(n=n.filter(v=>{let E=v.status||"new";return I==="cancelled"&&(E==="rejected"||E==="cancelled")?!0:E===I})),k!=="all"&&(n=n.filter(v=>v.subStatus===k)),S!=="all"&&(n=n.filter(v=>v.assignedTo===S)),$!=="all"&&(n=n.filter(v=>(v.customerType||"individual")===$)),!(((p=window.state.userProfile)==null?void 0:p.role)==="admin"||((x=window.state.userProfile)==null?void 0:x.role)==="supervisor")&&window.state.user&&(n=n.filter(v=>v.assignedTo===window.state.user.uid))}if(t==="users"){n=n.filter(S=>S.email!=="zyrozyro98@gmail.com");const u=window.state.userRoleFilter||"all";u!=="all"&&(n=n.filter(S=>S.role===u));const y=document.getElementById("stat-users-total"),I=document.getElementById("stat-users-active"),k=document.getElementById("stat-users-admins");if(y&&(y.innerText=n.length),I){I.innerText=n.filter($=>$.isAvailable).length;const S=I.nextElementSibling;S&&(S.innerText="متواجد حالياً")}if(k){const S=k.nextElementSibling;if(u==="all")k.innerText=n.filter($=>$.role==="admin").length,S&&(S.innerText="مدراء النظام");else{k.innerText=n.length;const $={admin:"مدراء النظام",supervisor:"مشرفين",staff:"المندوبين"};S&&(S.innerText="إجمالي الـ "+($[u]||""))}}}if(t==="bookings"?(((g=document.getElementById("filter-booking-sort"))==null?void 0:g.value)||"newest")==="oldest"?n.sort((y,I)=>new Date(y.createdAt||0)-new Date(I.createdAt||0)):n.sort((y,I)=>new Date(I.createdAt||0)-new Date(y.createdAt||0)):n.sort((u,y)=>new Date(y.createdAt||0)-new Date(u.createdAt||0)),n.length===0){e.innerHTML='<div class="no-data-admin" style="padding:40px; text-align:center; opacity:0.5;">لا توجد بيانات لهذه الفئة</div>';return}if(t==="users"){const u=window.state.bookings||[],y=((h=window.state.userProfile)==null?void 0:h.role)==="admin";let I=`<table class="admin-table-v2" style="width:100%; border-collapse:collapse; min-width:800px; font-size:14px;">
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
          <tbody>`;n.forEach(k=>{const S=u.filter(B=>B.assignedTo===k.id),$=S.filter(B=>B.status==="sold"||B.status==="done").length,w=S.filter(B=>B.status==="new"||B.status==="waiting"||B.status==="inquiry"||!B.status).length,v=S.filter(B=>B.status==="cancelled").length,b={admin:"مسؤول",supervisor:"مشرف",staff:"مندوب"}[k.role]||"مندوب",T=k.image||"logo.jpg",L=k.phone||"";let M="";if(L){let B=L.replace(/\D/g,"");B=window.normalizePhone(B),M=`<a href="https://wa.me/${B}" target="_blank" class="icon-btn-lite success" title="مراسلة واتساب"><i class="fab fa-whatsapp"></i></a>`}I+=`<tr style="border-bottom: 1px solid rgba(255,255,255,0.05); transition: background 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.02)'" onmouseout="this.style.background='transparent'">
              <td style="padding:15px;">
                  <div style="display:flex; align-items:center; gap:12px;">
                      <div style="width:40px; height:40px; border-radius:50%; overflow:hidden; background:#222; flex-shrink:0;">
                          <img src="${T}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='logo.jpg'">
                      </div>
                      <div>
                          <strong style="display:block; font-size:15px;">${k.name||k.email}</strong>
                          ${L?`<span style="font-size:12px; color:var(--text-dim);">${L}</span>`:""}
                      </div>
                  </div>
              </td>
              <td style="padding:15px;"><span style="color:var(--p-copper); font-size:13px;">${b}</span></td>
              <td style="padding:15px;"><span class="status-badge ${k.isAvailable?"online":"busy"}" style="font-size:11px;">● ${k.isAvailable?"متاح":"غير متاح"}</span></td>
              <td style="padding:15px; text-align:center;"><span style="color:#00a884; font-weight:bold; font-size:15px;">${$}</span></td>
              <td style="padding:15px; text-align:center;"><span style="color:var(--p-gold); font-weight:bold; font-size:15px;">${w}</span></td>
              <td style="padding:15px; text-align:center;"><span style="color:#e02424; font-weight:bold; font-size:15px;">${v}</span></td>
              <td style="padding:15px; text-align:center;">
                  <div style="display:flex; justify-content:center; gap:8px;">
                      ${M}
                      <button class="icon-btn-lite" onclick="window.editLuxuryItem('users', '${k.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                      ${y?`<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('users', '${k.id}')" title="حذف"><i class="fas fa-trash"></i></button>`:""}
                  </div>
              </td>
          </tr>`}),I+="</tbody></table>",e.innerHTML=I;return}e.innerHTML=n.map(u=>Se(t,u)).join("")};function Se(t,e){var f,c,m,p,x;((f=window.state.userProfile)==null?void 0:f.role)==="admin"||((c=window.state.userProfile)==null||c.role);const n=((m=window.state.userProfile)==null?void 0:m.role)==="admin",o=((p=window.state.userProfile)==null?void 0:p.role)==="supervisor",a=n||o&&["bookings","notifications"].includes(t),r=e.status==="sold"?"danger":e.status==="available"?"success":"warning",d=e.status==="sold"?"مباع":e.status==="available"?"متاح":"محجوز";if(t==="bookings"){const g=((x=window.state.users.find(k=>k.id===e.assignedTo))==null?void 0:x.name)||"غير محدد",h={new:"جديد",waiting:"بالانتظار",inquiry:"استفسار",sold:"مكتمل",done:"تم",cancelled:"مرفوض",rejected:"مرفوض"},u={not_contacted:"لم يتم التواصل",contacted:"تم التواصل",docs_received:"تم استلام الاوراق",waiting_calc:"انتظار رد العميل",waiting_docs:"إنتظار إكمال الاوراق",waiting_signature:"إنتظار توقيع العميل",docs_not_received:"لم يتم استلام الاوراق",signed:"تم التوقيع",delivered:"تم التسليم",done:"تم",no_response:"لم يتم رد العميل",obligations:"التزامات",calc_rejected:"رفض الحسبة",ineligible:"غير مسموح له",duplicate:"مكرر"},y=e.status==="cancelled"||e.status==="rejected"?"danger":e.status==="sold"||e.status==="done"?"success":"warning",I=e.subStatus?u[e.subStatus]||e.subStatus:"";return`
            <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:12px; border:1px solid var(--glass-border); margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                <div class="admin-item-info">
                    <strong style="display:block; font-size:16px;">${e.name||e.phone}</strong>
                    <div class="meta-row" style="font-size:12px; color:var(--text-dim); margin-top:5px; display:flex; gap:10px; flex-wrap:wrap;">
                        <span><i class="fas fa-car"></i> ${e.carOrCompany||e.carRequested||"-"}</span> | 
                        <span><i class="fas fa-user-tie"></i> ${g}</span>
                        ${I?`| <span style="color:var(--p-copper);"><i class="fas fa-info-circle"></i> ${I}</span>`:""}
                    </div>
                </div>
                <div class="admin-actions" style="display:flex; gap:10px; align-items:center;">
                    <span class="badge-${y}" style="font-size:10px; padding:3px 8px; border-radius:5px;">${h[e.status]||e.status||"جديد"}</span>
                    <button class="icon-btn-lite view" onclick="window.viewBookingDetails('${e.id}')" title="عرض التفاصيل"><i class="fas fa-eye"></i></button>
                    <button class="icon-btn-lite" onclick="window.editLuxuryItem('bookings', '${e.id}')" title="تعديل الحجز" aria-label="Edit Booking"><i class="fas fa-edit"></i></button>
                    ${a?`<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('bookings', '${e.id}')" title="حذف الحجز" aria-label="Delete Booking"><i class="fas fa-trash"></i></button>`:""}
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
                        <span style="color:var(--p-red); font-weight:800;">${e.price?Number(e.price).toLocaleString()+" ريال":e.monthlyInstallment?"قسط: "+Number(e.monthlyInstallment).toLocaleString()+" ريال":"عند التواصل"}</span>
                    </div>
                </div>
                <div class="admin-actions" style="display:flex; gap:8px; align-items:center;">
                    <span class="badge-${r}" style="font-size:10px; padding:4px 10px; border-radius:6px; font-weight:700;">${d}</span>
                    <button class="icon-btn-lite view" onclick="window.viewLuxuryCar('${e.id}')" title="عرض التفاصيل"><i class="fas fa-eye"></i></button>
                    ${a?`
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
                    ${a?`<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('users', '${e.id}')" title="حذف المستخدم" aria-label="Delete User"><i class="fas fa-trash"></i></button>`:""}
                </div>
            </div>
        `;if(t==="plates")return`
            <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:12px; border:1px solid var(--glass-border); margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                <div class="admin-item-info">
                    <strong style="display:block; font-size:18px; letter-spacing:2px;">${e.number} ${e.letters}</strong>
                    <span style="font-size:12px; color:var(--p-copper);">${Number(e.price).toLocaleString()} ريال</span>
                </div>
                <div class="admin-actions" style="display:flex; gap:10px; align-items:center;">
                    <span class="badge-${r}" style="font-size:10px; padding:3px 8px; border-radius:5px;">${d}</span>
                    ${a?`
                        <button class="icon-btn-lite" onclick="window.editLuxuryItem('plates', '${e.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                        <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('plates', '${e.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                    `:""}
                </div>
            </div>
        `;if(t==="notifications"){const g=!!e.read;return`
            <div class="admin-item-row" style="background:${g?"rgba(255,255,255,0.01)":"rgba(28, 124, 140, 0.05)"}; padding:15px; border-radius:12px; border:1px solid ${g?"var(--glass-border)":"var(--p-teal)"}; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                <div class="admin-item-info">
                    <div style="display:flex; align-items:center; gap:10px;">
                        ${g?"":'<span style="width:8px; height:8px; background:var(--p-teal); border-radius:50%;"></span>'}
                        <strong style="display:block; font-size:15px;">${e.title||"تنبيه بالنظام"}</strong>
                    </div>
                    <p style="font-size:13px; opacity:0.8; margin-top:4px;">${e.text||e.message||""}</p>
                    <span style="font-size:11px; opacity:0.5; margin-top:5px; display:block;"><i class="far fa-clock"></i> ${new Date(e.timestamp).toLocaleString()}</span>
                </div>
                ${a?`
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
        `;if(t==="sales"){const g=(e.url||"").trim();let h=g.includes("youtube.com")||g.includes("youtu.be"),u=e.poster||e.image||null;if(h&&!u){let y="";try{g.includes("v=")?y=g.split("v=")[1].split("&")[0]:g.includes("youtu.be/")?y=g.split("youtu.be/")[1].split("?")[0]:g.includes("embed/")?y=g.split("embed/")[1].split("?")[0]:y=g.split("/").pop().split("?")[0]}catch{y=""}y&&(u=`https://img.youtube.com/vi/${y}/mqdefault.jpg`)}return u=u||"logo.jpg",`
            <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:12px; border-radius:16px; border:1px solid var(--glass-border); margin-bottom:12px; display:flex; align-items:center; gap:20px;">
                <div class="admin-item-thumb" style="width:80px; height:50px; border-radius:10px; overflow:hidden; flex-shrink:0; background:#000;">
                    <img src="${u}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='logo.jpg'">
                </div>
                <div class="admin-item-info" style="flex-grow:1;">
                    <strong style="display:block; font-size:16px;">${e.title||e.name||"لحظة تسليم"}</strong>
                    <div style="font-size:11px; color:var(--text-dim); margin-top:4px; max-width:400px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                        <i class="fas fa-link"></i> ${g}
                    </div>
                </div>
                <div class="admin-actions">
                    <button class="icon-btn-lite view" onclick="window.openVideoLightbox('${g}')" title="معاينة"><i class="fas fa-eye"></i></button>
                    ${a?`
                        <button class="icon-btn-lite" onclick="window.editLuxuryItem('sales', '${e.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                        <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('sales', '${e.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                    `:""}
                </div>
            </div>
        `}if(t==="reviews"){const g=Number(e.rating||5),h=e.text?e.text.length>60?e.text.substring(0,60)+"...":e.text:"لا يوجد نص",u=e.avatar||e.image||"";return`
        <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:16px; border:1px solid var(--glass-border); margin-bottom:12px; display:flex; align-items:center; gap:20px;">
            <div class="admin-item-avatar" style="width:50px; height:50px; border-radius:50%; overflow:hidden; flex-shrink:0; background:var(--bg-alt); border:2px solid var(--p-copper); display:flex; align-items:center; justify-content:center; color:var(--p-copper); font-weight:900;">
                ${u?`<img src="${u}" style="width:100%; height:100%; object-fit:cover;">`:(e.name||"U").charAt(0)}
            </div>
            <div class="admin-item-info" style="flex-grow:1;">
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:4px;">
                    <strong style="font-size:16px;">${e.name||"عميل مجهول"}</strong>
                    <div class="review-stars-lite" style="color:#ffd700; font-size:11px;">
                        ${'<i class="fas fa-star"></i>'.repeat(g)}
                    </div>
                </div>
                <p style="font-size:13px; color:var(--text-dim); margin-top:2px;">"${h}"</p>
                ${e.car?`<span style="font-size:11px; color:var(--p-copper); opacity:0.8; display:block; margin-top:5px;"><i class="fas fa-car-side"></i> ${e.car}</span>`:""}
            </div>
            <div class="admin-actions">
                ${isAdmin?`
                    <button class="icon-btn-lite" onclick="window.editLuxuryItem('reviews', '${e.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                    <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('reviews', '${e.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                `:""}
            </div>
        </div>
    `}const s=e.make?`${e.make} ${e.model}`:e.title||e.name||"بدون عنوان",l=e.image||e.logo||e.poster||null;return`
        <div class="admin-item-row" onclick="window.editLuxuryItem('${t}', '${e.id}')" style="cursor:pointer;">
            <div style="display:flex; align-items:center; gap:15px;">
                ${l?`
                    <div style="width:50px; height:40px; border-radius:8px; overflow:hidden; flex-shrink:0;">
                        <img src="${l}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='logo.jpg'">
                    </div>
                `:""}
                <div class="admin-item-info">
                    <strong style="display:block;">${s}</strong>
                    ${e.price?`<span style="font-size:12px; color:var(--p-copper); font-weight:700;">${Number(e.price).toLocaleString()} ريال</span>`:""}
                </div>
            </div>
            <div class="admin-actions" style="display:flex; gap:8px; align-items:center;" onclick="event.stopPropagation()">
                ${e.status?`<span class="badge-${r}" style="font-size:10px; padding:3px 8px; border-radius:5px;">${d}</span>`:""}
                <button class="icon-btn-lite" onclick="window.editLuxuryItem('${t}', '${e.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                ${isAdmin?`<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('${t}', '${e.id}')" title="حذف"><i class="fas fa-trash"></i></button>`:""}
            </div>
        </div>
    `}window.updateStatistics=function(){var I,k,S,$;const t=document.getElementById("stat-cars-count-v2"),e=document.getElementById("stat-bookings-count-v2"),n=document.getElementById("stat-total-value-v2"),o=window.state.cars||[];let i=window.state.bookings||[];if(!(((I=window.state.userProfile)==null?void 0:I.role)==="admin"||((k=window.state.userProfile)==null?void 0:k.role)==="supervisor")&&window.state.user&&(i=i.filter(w=>w.assignedTo===window.state.user.uid)),t&&(t.innerText=o.length),e&&(e.innerText=i.length),n){const w=o.reduce((v,E)=>v+(parseFloat(E.price)||0),0);n.innerText=w.toLocaleString()+" ريال"}const r={all:i.length,new:i.filter(w=>w.status==="new"||!w.status).length,waiting:i.filter(w=>w.status==="waiting").length,inquiry:i.filter(w=>w.status==="inquiry").length,sold:i.filter(w=>w.status==="sold").length,done:i.filter(w=>w.status==="done").length,cancelled:i.filter(w=>w.status==="cancelled"||w.status==="rejected").length,sub:{not_contacted:i.filter(w=>w.subStatus==="not_contacted").length,contacted:i.filter(w=>w.subStatus==="contacted").length,docs_received:i.filter(w=>w.subStatus==="docs_received").length,waiting_calc:i.filter(w=>w.subStatus==="waiting_calc").length,waiting_docs:i.filter(w=>w.subStatus==="waiting_docs").length,waiting_signature:i.filter(w=>w.subStatus==="waiting_signature").length,docs_not_received:i.filter(w=>w.subStatus==="docs_not_received").length,signed:i.filter(w=>w.subStatus==="signed").length,delivered:i.filter(w=>w.subStatus==="delivered").length,done:i.filter(w=>w.subStatus==="done").length,no_response:i.filter(w=>w.subStatus==="no_response").length,obligations:i.filter(w=>w.subStatus==="obligations").length,calc_rejected:i.filter(w=>w.subStatus==="calc_rejected").length,ineligible:i.filter(w=>w.subStatus==="ineligible").length,duplicate:i.filter(w=>w.subStatus==="duplicate").length}};Object.entries(r).forEach(([w,v])=>{const E=document.getElementById(`count-${w}`);E&&(E.innerText=v)}),Object.entries(r.sub).forEach(([w,v])=>{const E=document.getElementById(`count-sub-${w}`);E&&(E.innerText=v)});const d=document.getElementById("bookings-badge");d&&(d.innerText=r.new,d.classList.toggle("hidden",r.new===0));const s=(S=window.state.user)==null?void 0:S.uid;if((($=window.state.userProfile)==null?void 0:$.role)==="staff"&&s){const w=document.getElementById("staff-quick-stats");w&&w.classList.remove("hidden");const v=(window.state.bookings||[]).filter(P=>P.assignedTo===s),E=v.filter(P=>P.status==="new"||!P.status).length,b=v.length,T=v.filter(P=>P.status==="sold").length,L=b>0?Math.round(T/b*100):0,M=document.getElementById("staff-waiting-count"),B=document.getElementById("staff-total-assigned"),R=document.getElementById("staff-conversion-rate"),_=document.getElementById("availability-toggle");M&&(M.innerText=E),B&&(B.innerText=b),R&&(R.innerText=L+"%"),_&&(_.checked=window.state.userProfile.isAvailable!==!1)}const f=document.getElementById("total-inventory-value"),c=document.getElementById("overall-conversion-rate"),m=document.getElementById("active-bookings-count"),p=document.getElementById("conversion-bar");if(f){const w=(window.state.cars||[]).reduce((v,E)=>v+(parseFloat(E.price)||0),0);f.innerText=w.toLocaleString()+" ريال"}if(m&&(m.innerText=r.new+r.waiting+r.inquiry),c){const w=(window.state.bookings||[]).length,v=(window.state.bookings||[]).filter(b=>b.status==="sold"||b.status==="done").length,E=w>0?Math.round(v/w*100):0;c.innerText=E+"%",p&&(p.style.width=E+"%")}const x=document.getElementById("monthly-goal-percent"),g=document.getElementById("monthly-goal-fill");if(x&&g){const w=(window.state.bookings||[]).filter(b=>{if(b.status!=="sold"&&b.status!=="done")return!1;const T=new Date(b.createdAt||0),L=new Date;return T.getMonth()===L.getMonth()&&T.getFullYear()===L.getFullYear()}).length,E=Math.min(100,Math.round(w/50*100));x.innerText=E+"%",g.style.width=E+"%"}const h=document.getElementById("supervisor-recent-logs");if(h&&window.state.logs){const w=[...window.state.logs].sort((v,E)=>new Date(E.timestamp)-new Date(v.timestamp)).slice(0,10);h.innerHTML=w.map(v=>`
      <div class="log-entry-lite">
        <div class="le-icon"><i class="fas ${v.type==="auth"?"fa-key":v.type==="data"?"fa-database":"fa-info-circle"}"></i></div>
        <div class="le-body">
          <div class="le-top"><strong>${v.action}</strong> <span>${new Date(v.timestamp).toLocaleTimeString()}</span></div>
          <p>${v.details}</p>
          <small>بواسطة: ${v.user}</small>
        </div>
      </div>
    `).join("")}const u=document.getElementById("status-donut-chart");if(u){const w=r.sold+r.done,v=r.new+r.waiting+r.inquiry,E=r.cancelled,b=w+v+E||1,T=Math.round(w/b*100),L=Math.round(v/b*100);u.style.background=`conic-gradient(
      #00a884 0% ${T}%, 
      var(--p-gold) ${T}% ${T+L}%, 
      #e02424 ${T+L}% 100%
    )`,u.setAttribute("data-pct",`${T}% ناجح`)}const y=document.getElementById("supervisor-leaderboard");if(y&&window.state.users&&window.state.bookings){const w=new Date,v=window.state.bookings.filter(b=>{const T=new Date(b.createdAt||0);return T.getMonth()===w.getMonth()&&T.getFullYear()===w.getFullYear()}),E=window.state.users.filter(b=>b.role==="staff"||b.role==="supervisor").map(b=>{const T=v.filter(M=>M.assignedTo===b.id&&(M.status==="sold"||M.status==="done")).length,L=v.filter(M=>M.assignedTo===b.id).length;return{...b,soldCount:T,totalAssigned:L}}).sort((b,T)=>T.soldCount-b.soldCount).slice(0,5);y.innerHTML=E.map((b,T)=>`
      <div class="leader-item">
        <div class="leader-rank">${T+1}</div>
        <div class="leader-avatar"><img src="${b.image||"logo.jpg"}" onerror="this.src='logo.jpg'"></div>
        <div class="leader-info">
          <strong>${b.name||b.email}</strong>
          <span>${b.soldCount} مبيعات / ${b.totalAssigned} طلبات</span>
        </div>
        <div class="leader-score">${b.soldCount>0?Math.round(b.soldCount/(b.totalAssigned||1)*100):0}%</div>
      </div>
    `).join("")}window.state.currentPeriodReport?window.switchPeriodReport(window.state.currentPeriodReport):window.switchPeriodReport("day"),window.renderSupervisorStaffList()};window.switchPeriodReport=function(t,e){if(window.state.currentPeriodReport=t,e)document.querySelectorAll(".p-tab").forEach(p=>p.classList.remove("active")),e.classList.add("active");else{const p=document.querySelectorAll(".p-tab"),g={day:0,week:1,month:2,year:3}[t]||0;p[g]&&(p.forEach(h=>h.classList.remove("active")),p[g].classList.add("active"))}const n=new Date;let o=new Date;t==="day"?o.setHours(0,0,0,0):t==="week"?o.setDate(n.getDate()-7):t==="month"?o.setMonth(n.getMonth()-1):t==="year"&&o.setFullYear(n.getFullYear()-1);const i=(window.state.bookings||[]).filter(p=>new Date(p.createdAt||0)>=o),a=(window.state.cars||[]).filter(p=>new Date(p.createdAt||0)>=o).length,r=(window.state.plates||[]).filter(p=>new Date(p.createdAt||0)>=o).length,d=i.length,s=i.filter(p=>p.status==="sold"||p.status==="done").length,l=i.filter(p=>p.status==="new"||p.status==="waiting"||p.status==="inquiry").length,f=d>0?Math.round(s/d*100):0,c=i.filter(p=>p.status==="sold"||p.status==="done").reduce((p,x)=>{const g=(window.state.cars||[]).find(h=>h.id===x.carId);return p+parseFloat((g==null?void 0:g.price)||0)},0),m={"period-total-count":d,"period-sold-count":s,"period-active-count":l,"period-conv-rate":f+"%","period-sold-value":c.toLocaleString()+" ريال","period-inventory-added":a+r};Object.entries(m).forEach(([p,x])=>{const g=document.getElementById(p);g&&(g.innerText=x)})};window.deleteLuxuryItem=async function(t,e){var n;if(confirm("هل أنت متأكد من الحذف؟ لا يمكن التراجع عن هذه العملية."))try{if(t==="users"){const o=(window.state.users||[]).find(a=>a.id===e);if((o==null?void 0:o.email)==="zyrozyro98@gmail.com"){window.showLuxuryToast("لا يمكن حذف هذا المطور الأساسي للنظام","error");return}if(((n=window.state.userProfile)==null?void 0:n.role)==="supervisor"&&(o==null?void 0:o.role)==="admin"){window.showLuxuryToast("لا يملك المشرف صلاحية حذف المدير","error");return}}await W(C(A,`${t}/${e}`)),window.showLuxuryToast("تم الحذف بنجاح"),window.createLog("حذف",`حذف عنصر من ${t} (ID: ${e})`,"data")}catch{window.showLuxuryToast("فشل الحذف","error")}};window.editLuxuryItem=function(t,e){const n=(window.state[t]||[]).find(i=>i.id===e);if(!n)return;if(t==="users"&&n.email==="zyrozyro98@gmail.com"){window.showLuxuryToast("لا يمكن تعديل بيانات هذا المستخدم الأساسي","error");return}window.state.currentEdit={type:t,id:e},document.getElementById("item-form")&&(t==="cars"&&(window.state.carImages=[],n.image&&window.state.carImages.push({type:"url",value:n.image,isMain:!0}),n.images&&Array.isArray(n.images)&&n.images.forEach(i=>{i!==n.image&&window.state.carImages.push({type:"url",value:i,isMain:!1})})),ae(t,n),window.setModalTitle("item-modal",`تعديل: ${n.make||n.title||t}`),window.openModal("item-modal"))};window.insertQRVariable=function(t){const e=document.querySelector('#item-form textarea[name="content"]');if(e){const n=e.selectionStart,o=e.selectionEnd,i=e.value;e.value=i.substring(0,n)+t+i.substring(o),e.selectionStart=e.selectionEnd=n+t.length,e.focus()}};window.openCRUDModal=function(t,e=null){var i;if(window.state.currentEdit={type:t,id:e},!document.getElementById("item-form"))return;const o=e?((i=window.state[t])==null?void 0:i.find(a=>a.id===e))||{}:{};t==="cars"&&(window.state.carImages=[],o.image&&window.state.carImages.push({type:"url",value:o.image,isMain:!0}),o.images&&Array.isArray(o.images)&&o.images.forEach(a=>{a!==o.image&&window.state.carImages.push({type:"url",value:a,isMain:!1})})),ae(t,o),window.setModalTitle("item-modal",e?`تعديل: ${t}`:`إضافة: ${t}`),window.openModal("item-modal")};function ae(t,e={}){const n=document.getElementById("dynamic-form-fields");if(!n)return;let o=[];if(t==="cars"){const i=(window.state.brands||[]).map(a=>({v:a.name,t:a.name}));o=[{name:"make",label:"الماركة",type:"select",options:[{v:"",t:"اختر الماركة"},...i],required:!0},{name:"model",label:"الموديل",type:"text",required:!0},{name:"year",label:"السنة",type:"number",required:!0},{name:"price",label:"سعر الكاش",type:"number"},{name:"monthlyInstallment",label:"قسط شهري يبدأ بـ",type:"number"},{name:"mileage",label:"الممشى (كم)",type:"number"},{name:"engine",label:"المحرك",type:"text",placeholder:"مثال: 8 سليندر، 4.0L"},{name:"gearbox",label:"ناقل الحركة",type:"select",options:[{v:"عادي",t:"عادي"},{v:"أوتوماتيكي",t:"أوتوماتيكي"},{v:"CVT",t:"CVT"}]},{name:"fuelType",label:"نوع الوقود",type:"select",options:[{v:"بنزين",t:"بنزين"},{v:"ديزل",t:"ديزل"},{v:"هايبرد",t:"هايبرد"},{v:"كهرباء",t:"كهرباء"}]},{name:"bodyType",label:"فئة السيارة",type:"select",options:[{v:"sedan",t:"سيدان"},{v:"suv",t:"SUV"},{v:"coupe",t:"كوبيه"},{v:"luxury",t:"فاخرة"},{v:"pickup",t:"بيك آب"}]},{name:"color",label:"اللون خارجي",type:"text"},{name:"interiorColor",label:"اللون داخلي",type:"text"},{name:"status",label:"الحالة في المخزون",type:"select",options:[{v:"available",t:"متاح"},{v:"reserved",t:"محجوز"},{v:"sold",t:"مباع"},{v:"incoming",t:"قادم قريباً"}]},{name:"isFeatured",label:"عرض في قسم المميز؟",type:"select",options:[{v:!1,t:"لا"},{v:!0,t:"نعم"}]},{name:"desc",label:"وصف إضافي ومواصفات",type:"textarea"},{name:"_image_manager",label:"صور السيارة (المعرض)",type:"custom",html:`
        <div class="f-group full-width">
          <label>إدارة صور السيارة (المعرض والصورة الرئيسية)</label>
          <div class="img-manager-v2" id="car-image-manager">
            <!-- Rendered by window.renderCarImageManager -->
          </div>
          <input type="file" id="car-file-input" multiple accept="image/*" style="display:none;" onchange="window.handleCarFileSelect(this.files)">
        </div>
      `}],setTimeout(()=>window.renderCarImageManager(),100)}else t==="ads"?o=[{name:"title",label:"العنوان",type:"text"},{name:"subtitle",label:"العنوان الفرعي",type:"text"},{name:"image",label:"صورة الإعلان (من الجهاز)",type:"file"},{name:"link",label:"الرابط (اختياري)",type:"text"}]:t==="sales"?o=[{name:"title",label:"العنوان",type:"text"},{name:"description",label:"وصف قصير",type:"textarea"},{name:"url",label:"رابط الفيديو (MP4 أو YouTube)",type:"text"},{name:"poster",label:"رابط صورة الغلاف",type:"text"}]:t==="reviews"?o=[{name:"name",label:"اسم العميل",type:"text",required:!0,placeholder:"مثال: عبدالله محمد"},{name:"car",label:"السيارة المشتراة (اختياري)",type:"text",placeholder:"مثال: تويوتا كامري 2024"},{name:"rating",label:"التقييم من 5 نجوم",type:"number",required:!0,placeholder:"5"},{name:"avatar",label:"رابط صورة العميل (اختياري)",type:"text",placeholder:"https://..."},{name:"text",label:"محتوى الرأي",type:"textarea",required:!0,placeholder:"لقد كانت تجربة رائعة مع هذا المعرض..."}]:t==="partners"?o=[{name:"name",label:"اسم الشريك",type:"text"},{name:"logo",label:"شعار الشريك (من الجهاز)",type:"file"},{name:"link",label:"رابط خارجي (اختياري)",type:"text"}]:t==="brands"?o=[{name:"name",label:"اسم العلامة التجارية",type:"text"},{name:"logo",label:"شعار البراند (من الجهاز)",type:"file"}]:t==="blogs"?o=[{name:"title",label:"عنوان المقال",type:"text"},{name:"image",label:"صورة المقال (من الجهاز)",type:"file"},{name:"content",label:"محتوى المقال",type:"textarea"}]:t==="locations"?o=[{name:"name",label:"اسم المدينة/الدولة",type:"text"},{name:"status",label:"الحالة",type:"select",options:[{v:"active",t:"نشط"},{v:"inactive",t:"غير نشط"}]}]:t==="plates"?o=[{name:"number",label:"رقم اللوحة",type:"text"},{name:"letters",label:"حروف اللوحة",type:"text"},{name:"price",label:"السعر",type:"number"},{name:"status",label:"الحالة",type:"select",options:[{v:"available",t:"متاح"},{v:"sold",t:"مباع"}]}]:t==="specs"?o=[{name:"name",label:"اسم المواصفة",type:"text"},{name:"icon",label:"أيقونة (FontAwesome)",type:"text"}]:t==="packages"?o=[{name:"name",label:"اسم الباقة",type:"text"},{name:"price",label:"السعر",type:"number"},{name:"features",label:"المميزات (فاصلة بين كل ميزة)",type:"textarea"}]:t==="bookings"?o=[{name:"name",label:"اسم العميل",type:"text"},{name:"phone",label:"الجوال",type:"text"},{name:"carRequested",label:"السيارة المطلوبة",type:"text"},{name:"status",label:"حالة الطلب",type:"select",options:[{v:"new",t:"جديد"},{v:"waiting",t:"بالانتظار"},{v:"inquiry",t:"استفسار"},{v:"sold",t:"مكتمل"},{v:"done",t:"تم"},{v:"cancelled",t:"مرفوض"}]},{name:"subStatus",label:"الحالة التفصيلية",type:"select",options:[{v:"not_contacted",t:"لم يتم التواصل"},{v:"contacted",t:"تم التواصل"},{v:"docs_received",t:"تم استلام الاوراق"},{v:"waiting_calc",t:"انتظار رد العميل"},{v:"waiting_docs",t:"إنتظار إكمال الاوراق"},{v:"waiting_signature",t:"إنتظار توقيع العميل"},{v:"docs_not_received",t:"لم يتم استلام الاوراق"},{v:"signed",t:"تم التوقيع"},{v:"delivered",t:"تم التسليم"},{v:"done",t:"تم"},{v:"no_response",t:"لم يتم رد العميل"},{v:"obligations",t:"التزامات"},{v:"calc_rejected",t:"رفض الحسبة"},{v:"ineligible",t:"غير مسموح له"},{v:"duplicate",t:"مكرر"}]},{name:"assignedTo",label:"الموظف المسؤول",type:"select",options:[{v:"",t:"غير محدد"},...window.state.users.filter(i=>i.email!=="zyrozyro98@gmail.com"&&(i.role==="staff"||i.role==="admin"||i.role==="supervisor")).map(i=>({v:i.id,t:i.name||(i.role==="admin"?"المدير: ":"المشرف: ")+(i.name||i.email)}))]},{name:"notes",label:"ملاحظات",type:"textarea"}]:t==="users"?o=[{name:"name",label:"الاسم الكامل",type:"text"},{name:"email",label:"البريد الإلكتروني",type:"text"},{name:"password",label:"كلمة المرور (اختياري عند التعديل)",type:"password"},{name:"role",label:"الصلاحية",type:"select",options:[{v:"staff",t:"موظف"},{v:"supervisor",t:"مشرف"},{v:"admin",t:"مدير"}]},{name:"isAvailable",label:"متاح لاستلام الطلبات؟",type:"select",options:[{v:!0,t:"نعم"},{v:!1,t:"لا"}]}]:t==="quickReplies"?o=[{name:"title",label:"عنوان الرد السريع",type:"text",required:!0,placeholder:"مثال: ترحيب بالعملاء الجدد"},{type:"custom",html:`
        <div class="f-group full-width" style="margin-bottom: 20px;">
            <label style="margin-bottom:8px; display:block; color:var(--text-bright); font-weight:600;">المتغيرات المتاحة (انقر لإضافتها في الرسالة):</label>
            <div style="display:flex; flex-wrap:wrap; gap:8px;">
                <button type="button" onclick="window.insertQRVariable('(اسم الموظف)')" style="background:var(--p-gold); border:none; padding:6px 12px; border-radius:12px; font-size:13px; font-weight:bold; cursor:pointer; font-family:var(--font-luxury);" onmouseover="this.style.opacity=0.8" onmouseout="this.style.opacity=1">(اسم الموظف)</button>
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
      `},{name:"content",label:"محتوى الرسالة الكامل",type:"textarea",required:!0,placeholder:"اكتب هنا نص الرسالة التي ستظهر للموظف لاستخدامها..."}]:t==="sales"?o=[{name:"title",label:"عنوان الفيديو",type:"text",required:!0,placeholder:"مثال: تسليم سيارة مرسيدس G-Class"},{name:"url",label:"رابط الفيديو (YouTube أو مباشر)",type:"text",required:!0,placeholder:"https://youtube.com/watch?v=..."},{name:"poster",label:"رابط صورة الغلاف (اختياري)",type:"text",placeholder:"https://..."},{name:"description",label:"وصف مبسط",type:"textarea",placeholder:"يسعدنا دائماً مشاركة لحظات نجاحنا..."}]:o=[{name:"name",label:"الاسم / العنوان",type:"text"},{name:"desc",label:"الوصف",type:"textarea"}];n.innerHTML=`
    <div class="form-grid-v3">
      ${o.map(i=>{if(i.type==="custom")return i.html;let a=e[i.name]!==void 0&&e[i.name]!==null?e[i.name]:"";i.name==="desc"&&!a&&(a=e.description||e.details||"");const r=i.required?"required":"",d=i.placeholder||i.label;let s="";return i.type==="select"?s=`
            <select name="${i.name}" class="filter-select" ${r}>
              ${i.options.map(l=>`<option value="${l.v}" ${l.v.toString()===a.toString()?"selected":""}>${l.t}</option>`).join("")}
            </select>
          `:i.type==="textarea"?s=`<textarea name="${i.name}" placeholder="${d}" ${r}>${a}</textarea>`:i.type==="file"?s=`
            <input type="file" name="${i.name}" ${i.multiple?"multiple":""} ${r} accept="image/*" class="filter-select">
            ${a?`<div class="file-path-hint" title="${a}">الملف الحالي: ${a.split("/").pop()}</div>`:""}
          `:s=`<input type="${i.type}" name="${i.name}" value="${a}" placeholder="${d}" ${r}>`,`
          <div class="f-group ${i.type==="textarea"||i.type==="custom"?"full-width":""}">
            <label>${i.label} ${i.required?'<span class="req">*</span>':""}</label>
            ${s}
          </div>
        `}).join("")}
    </div>
  `}window.handleCarFileSelect=function(t){if(t){for(let e=0;e<t.length;e++){const n=t[e];window.state.carImages.push({type:"file",value:n,preview:URL.createObjectURL(n),isMain:window.state.carImages.length===0})}window.renderCarImageManager()}};window.renderCarImageManager=function(){const t=document.getElementById("car-image-manager");if(!t)return;let n=`
    <div class="img-grid-v2">
      ${(window.state.carImages||[]).map((o,i)=>{const a=o.type==="url"?o.value:o.preview;return`
          <div class="img-item-v2 ${o.isMain?"is-main":""}">
            ${o.isMain?'<span class="main-badge">الرئيسية</span>':""}
            <img src="${a}" alt="Car image">
            <div class="img-actions-lite">
              <button type="button" class="img-action-btn-lite" onclick="window.reorderCarImage(${i}, -1)" title="نقل لليمين">
                <i class="fas fa-arrow-right"></i>
              </button>
              <button type="button" class="img-action-btn-lite" onclick="window.reorderCarImage(${i}, 1)" title="نقل لليسار">
                <i class="fas fa-arrow-left"></i>
              </button>
              <button type="button" class="img-action-btn-lite" onclick="window.setCarMainImage(${i})" title="تعيين كرئيسية">
                <i class="fas fa-star"></i>
              </button>
              <button type="button" class="img-action-btn-lite danger" onclick="window.removeCarImage(${i})" title="حذف">
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
  `;t.innerHTML=n};window.reorderCarImage=function(t,e){const n=window.state.carImages,o=t+e;if(o>=0&&o<n.length){const i=n[t];n[t]=n[o],n[o]=i,window.renderCarImageManager()}};window.removeCarImage=function(t){if(t<0||t>=window.state.carImages.length)return;const e=window.state.carImages[t].isMain;window.state.carImages.splice(t,1),e&&window.state.carImages.length>0&&(window.state.carImages[0].isMain=!0),window.renderCarImageManager()};window.setCarMainImage=function(t){window.state.carImages.forEach((e,n)=>e.isMain=n===t),window.renderCarImageManager()};window.saveLuxuryItem=async function(t){t&&t.preventDefault();const e=window.state.currentEdit;if(!e)return;const{type:n,id:o}=e,i=document.getElementById("item-form");if(!i)return;const a=i.querySelector('button[type="submit"]'),r=a.innerText;a&&(a.disabled=!0,a.innerText="جاري الحفظ والمعالجة...");const d=new FormData(i),s={};d.forEach((l,f)=>{if(f!=="main_img_file"&&f!=="gallery_files"){if(f==="password"&&!l)return;s[f]=l}});try{if(n==="cars"){const c=[];let m="";const p=window.state.carImages||[];for(let x=0;x<p.length;x++){const g=p[x];let h="";g.type==="url"?h=g.value:g.type==="file"&&(h=await window.compressImage(g.value,1e3,1e3,.6)),h&&(c.push(h),g.isMain&&(m=h))}!m&&c.length>0&&(m=c[0]),s.image=m,s.images=c}const l=["image","logo","avatar","poster"];for(const c of l)s[c]instanceof File&&s[c].size>0?s[c]=await window.compressImage(s[c],1e3,1e3,.7):s[c]instanceof File&&s[c].size===0&&delete s[c];if(["price","year","mileage","rating","installmentPeriod","monthlyInstallment"].forEach(c=>{s[c]!==void 0&&s[c]!==""&&s[c]!==null&&(s[c]=Number(s[c]))}),s.isFeatured!==void 0&&(s.isFeatured=s.isFeatured==="true"||s.isFeatured===!0),o||(s.createdAt=new Date().toISOString()),s.updatedAt=new Date().toISOString(),n==="users"&&!o){if(!s.password){window.showLuxuryToast("كلمة المرور مطلوبة للموظف الجديد","error"),a&&(a.disabled=!1,a.innerText=r);return}const c=te(oe,"Secondary"),m=ne(c);try{const x=(await fe(m,s.email,s.password)).user.uid,g=C(A,`users/${x}`);delete s.password,await q(g,s),await K(c)}catch(p){throw await K(c),p}}else{n==="users"&&delete s.password;const c=o?C(A,`${n}/${o}`):F(C(A,n));await(o?j(c,s):q(c,s))}window.showLuxuryToast(o?"تم تحديث البيانات بنجاح":"تم إضافة العنصر بنجاح"),window.closeModal("item-modal"),window.createLog(o?"تعديل":"إضافة",`${o?"تعديل":"إضافة"} في ${n} - ${s.make||s.title||o}`,"data")}catch(l){console.error("Save Error:",l),window.showLuxuryToast("حدث خطأ أثناء الحفظ: "+(l.message||"خطأ غير معروف"),"error")}finally{a&&(a.disabled=!1,a.innerText=r)}};window.openQuickReplyModal=function(){window.openCRUDModal("quickReplies")};window.renderQuickRepliesAdmin=function(){var o;const t=document.getElementById("quick-replies-list");if(!t)return;const e=(((o=document.getElementById("qr-search"))==null?void 0:o.value)||"").toLowerCase().trim(),n=(window.state.quickReplies||[]).filter(i=>(i.title||"").toLowerCase().includes(e)||(i.content||"").toLowerCase().includes(e));if(n.length===0){t.innerHTML='<div class="no-results-v2" style="grid-column:1/-1;"><p>لا توجد نتائج مطابقة لبحثك</p></div>';return}t.innerHTML=n.map(i=>`
        <div class="admin-item-card-v2 animate-fade-in" data-aos="fade-up">
            <div class="item-card-content">
                <div class="item-card-header">
                    <div class="item-icon-circle"><i class="fas fa-bolt"></i></div>
                    <strong>${i.title}</strong>
                </div>
                <div class="item-card-body">
                    <p class="qr-content-preview">${i.content}</p>
                </div>
            </div>
            <div class="item-card-actions">
                <button class="icon-btn-lite" onclick="window.editLuxuryItem('quickReplies', '${i.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('quickReplies', '${i.id}')" title="حذف"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join("")};window.renderAdsSlider=function(){const t=document.getElementById("slider-track"),e=document.getElementById("slider-dots");if(!t)return;const n=window.state.ads||[];if(n.length===0){t.innerHTML='<div class="no-ads"></div>',e&&(e.innerHTML="");return}t.innerHTML=n.map(o=>`
        <div class="ad-slide">
            <img src="${o.image||"logo.jpg"}" class="ad-bg-img" alt="${o.title||"عرض خاص"}">
            <div class="ad-content">
                <h2 class="luxury-font">${o.title||""}</h2>
                <p>${o.subtitle||""}</p>
                ${o.link?`<a href="${o.link}" class="btn-premium"><span>اكتشف المزيد</span> <i class="fas fa-arrow-left" style="margin-right: 10px;"></i></a>`:""}
            </div>
        </div>
    `).join(""),e&&(e.innerHTML=n.map((o,i)=>`<div class="dot ${i===0?"active":""}" onclick="window.goToLuxurySlide(${i})"></div>`).join("")),window.state.sliderIndex=0,window.moveLuxurySlider(0)};window.goToLuxurySlide=function(t){window.state.sliderIndex=t,window.moveLuxurySlider(0)};window.moveLuxurySlider=function(t){var r;const e=document.getElementById("slider-track");if(!e)return;const n=((r=window.state.ads)==null?void 0:r.length)||0;if(n<=1){e.style.transform="translateX(0)";return}window.state.sliderIndex=(window.state.sliderIndex+t+n)%n;const o=window.state.sliderIndex*100,i=document.body.dir==="rtl";e.style.transform=`translateX(${i?o:-o}%)`,document.querySelectorAll(".slider-dots .dot").forEach((d,s)=>{d.classList.toggle("active",s===window.state.sliderIndex)})};window.calculateLuxuryFinancing=function(){var s,l,f;const t=Number((s=document.getElementById("calc-car-price"))==null?void 0:s.value)||0,e=Number((l=document.getElementById("calc-down-pay"))==null?void 0:l.value)||0,n=Number((f=document.getElementById("calc-years"))==null?void 0:f.value)||5,o=document.getElementById("calc-result-val");if(!o)return;const i=t-e;if(i<=0){o.innerText="0 ريال";return}const r=i*(1+.045*n),d=Math.round(r/(n*12));o.innerText=d.toLocaleString()+" ريال"};window.renderSalesVideos=function(){const t=document.getElementById("sales-container");if(!t)return;const e=window.state.sales||[];if(e.length===0){t.innerHTML='<div class="no-results-v2"><p>لا توجد مقاطع فيديو متاحة حالياً</p></div>';return}t.innerHTML=e.map(n=>{const o=(n.url||"").trim();let i=o.includes("youtube.com")||o.includes("youtu.be")||o.includes("youtube-nocookie.com"),a=o.includes("tiktok.com"),r=o.includes("instagram.com"),d=o.includes("snapchat.com"),s=n.poster||n.image||null;if(i&&!s){let l="";try{o.includes("v=")?l=o.split("v=")[1].split("&")[0]:o.includes("youtu.be/")?l=o.split("youtu.be/")[1].split("?")[0]:o.includes("embed/")?l=o.split("embed/")[1].split("?")[0]:l=o.split("/").pop().split("?")[0]}catch{l=""}l&&(s=`https://img.youtube.com/vi/${l}/hqdefault.jpg`)}return s=s||"logo.jpg",`
            <div class="video-card-v2" data-aos="zoom-in" onclick="window.openVideoLightbox('${o}')">
                <div class="video-player-wrap">
                    <div class="video-inner">
                        <img src="${s}" alt="${n.title||"Success Moment"}" onerror="this.src='logo.jpg'" style="width:100%; height:100%; object-fit:cover;">
                        <div class="v-play-overlay">
                            <div class="v-play-btn"><i class="fas fa-play"></i></div>
                        </div>
                        ${i?'<div class="v-platform-icon"><i class="fab fa-youtube"></i></div>':a?'<div class="v-platform-icon"><i class="fab fa-tiktok"></i></div>':r?'<div class="v-platform-icon"><i class="fab fa-instagram"></i></div>':d?'<div class="v-platform-icon"><i class="fab fa-snapchat"></i></div>':""}
                    </div>
                </div>
                <div class="video-info-v2">
                    <span class="v-badge-gold"><i class="fas fa-award"></i> مبيعات ناجحة</span>
                    <h3>${n.title||n.name||"لحظة تسليم"}</h3>
                    <p>${n.description||"يسعدنا دائماً مشاركة لحظات نجاحنا مع عملائنا الكرام."}</p>
                </div>
            </div>`}).join("")};window.openVideoLightbox=function(t){let e="";if(t.includes("youtube.com")||t.includes("youtu.be")){let o="";try{t.includes("v=")?o=t.split("v=")[1].split("&")[0]:t.includes("youtu.be/")?o=t.split("youtu.be/")[1].split("?")[0]:t.includes("embed/")?o=t.split("embed/")[1].split("?")[0]:o=t.split("/").pop().split("?")[0]}catch{o=""}e=`<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${o}?autoplay=1&modestbranding=1&rel=0" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`}else e=`<video controls autoplay style="width:100%; height:100%; border-radius:15px; background:#000;">
                        <source src="${t}" type="video/mp4">
                        متصفحك لا يدعم تشغيل الفيديو.
                    </video>`;const n=document.createElement("div");n.className="luxury-lightbox",n.id="video-lightbox",n.innerHTML=`
        <button class="lb-close" onclick="this.parentElement.remove()">&times;</button>
        <div class="lb-content animate-fade-in" style="max-width:1000px; width:95%; aspect-ratio:16/9; margin-top:0;">
            ${e}
        </div>
    `,document.body.appendChild(n)};window.toggleWAWidget=function(){const t=document.getElementById("wa-widget");t&&t.classList.toggle("hidden")};window.sendWAWidgetMsg=function(){var o;const t=document.getElementById("wa-input"),e=(o=t==null?void 0:t.value)==null?void 0:o.trim();if(!e)return;const n=window.state.settings.contactSales||"0500000000";window.open(`https://wa.me/${window.normalizePhone(n)}?text=${encodeURIComponent(e)}`,"_blank"),t&&(t.value=""),window.toggleWAWidget()};window.createLog=async function(t,e,n="general"){var o,i;try{const a=F(C(A,"logs"));await q(a,{user:((o=window.state.user)==null?void 0:o.email)||"Visitor",userId:((i=window.state.user)==null?void 0:i.uid)||null,action:t,details:e,category:n,timestamp:new Date().toISOString()})}catch(a){console.error("Log Error:",a)}};window.submitBooking=async function(t){var d,s,l,f,c,m,p,x,g,h,u,y,I,k,S,$,w,v,E,b,T,L,M,B,R;t.preventDefault();const e=t.target,n=e.querySelector('button[type="submit"]');let o=(((d=document.getElementById("b-phone-code"))==null?void 0:d.value)==="other"?(s=document.getElementById("b-phone-code-other"))==null?void 0:s.value:(l=document.getElementById("b-phone-code"))==null?void 0:l.value)||"966",i=((f=document.getElementById("b-phone"))==null?void 0:f.value)||"";o=o.replace(/\D/g,""),i=i.replace(/\D/g,""),i.startsWith("05")||i.startsWith("5")&&i.length===9||i.startsWith("9665")?(o="966",i.startsWith("05")&&(i=i.substring(1)),i.startsWith("966")&&(i=i.substring(3))):i.startsWith("07")||i.startsWith("7")&&i.length===9||i.startsWith("9677")?(o="967",i.startsWith("07")&&(i=i.substring(1)),i.startsWith("967")&&(i=i.substring(3))):(o&&i.startsWith(o)&&(i=i.substring(o.length)),o&&i.startsWith("00"+o)&&(i=i.substring(o.length+2)));const a=window.normalizePhone(o+i),r={customerType:((c=e.querySelector('[name="customer-type"]:checked'))==null?void 0:c.value)||"individual",carRequested:((m=document.getElementById("b-car"))==null?void 0:m.value)||"",name:((p=document.getElementById("b-name"))==null?void 0:p.value)||"",phone:a,age:((x=document.getElementById("b-age"))==null?void 0:x.value)||"",email:((g=document.getElementById("b-email"))==null?void 0:g.value)||"",nationality:((h=document.getElementById("b-nationality"))==null?void 0:h.value)==="مقيم"?((u=document.getElementById("b-nationality-other"))==null?void 0:u.value)||"مقيم":((y=document.getElementById("b-nationality"))==null?void 0:y.value)||"سعودي",city:((I=document.getElementById("b-city"))==null?void 0:I.value)==="أخرى"?((k=document.getElementById("b-city-other"))==null?void 0:k.value)||"أخرى":((S=document.getElementById("b-city"))==null?void 0:S.value)||"",paymentMethod:(($=e.querySelector('[name="payment-method"]:checked'))==null?void 0:$.value)||"كاش",bankName:((w=document.getElementById("b-bank-name"))==null?void 0:w.value)||"",installmentPeriod:((v=document.getElementById("b-installment-period"))==null?void 0:v.value)||"",salary:((E=document.getElementById("b-salary"))==null?void 0:E.value)||"",commitments:((b=document.getElementById("b-commitments"))==null?void 0:b.value)||"",workEntity:((T=document.getElementById("b-work-entity"))==null?void 0:T.value)||"حكومي",workStatus:((L=document.getElementById("b-work-status"))==null?void 0:L.value)||"معتمد",contactMethod:((M=e.querySelector('[name="contact-method"]:checked'))==null?void 0:M.value)||"الجوال",preferredTime:((B=e.querySelector('[name="preferred-time"]:checked'))==null?void 0:B.value)||"10am - 1pm",notes:((R=document.getElementById("b-notes"))==null?void 0:R.value)||"",status:"new",subStatus:"not_contacted",createdAt:new Date().toISOString()};n.disabled=!0,n.innerText="جاري الإرسال...";try{const _=C(A,"config/lastAssignedStaffIndex_v2"),P=window.state.users.filter(U=>U.role==="staff"&&U.isAvailable!==!1);P.length>0&&await J(_,U=>{let Q=U||0;Q>=P.length&&(Q=0);const se=P[Q];return r.assignedTo=se.id,(Q+1)%P.length});const X=F(C(A,"bookings"));await q(X,r),r.assignedTo&&await F(C(A,"notifications"),{userId:r.assignedTo,type:"new_booking",title:"طلب جديد مسند إليك",body:`لديك طلب جديد من ${r.name} للسيارة ${r.carRequested}`,bookingId:X.key,read:!1,createdAt:new Date().toISOString()}),window.showLuxuryToast("تم إرسال طلبك بنجاح، سنتواصل معك قريباً"),e.reset()}catch(_){console.error(_),window.showLuxuryToast("حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً","error")}finally{n.disabled=!1,n.innerText="تأكيد طلب حجز الخدمة"}};window.fillAIInput=function(t){const e=document.getElementById("ai-chat-input");e&&(e.value=t)};window.clearAIChat=function(){const t=document.getElementById("ai-messages-area");t&&(t.innerHTML="")};window.askLuxuryAI=function(){var o;const t=document.getElementById("ai-chat-input"),e=(o=t==null?void 0:t.value)==null?void 0:o.trim();if(!e)return;G("user",e),t.value="";const n="ai-typing-"+Date.now();G("bot","جاري التفكير...",n),setTimeout(()=>{const i=document.getElementById(n);i&&i.remove();const a=Te(e);G("bot",a)},1e3)};function G(t,e,n=null){const o=document.getElementById("ai-messages-area");if(!o)return;const i=document.createElement("div");i.className=`ai-msg ${t}`,n&&(i.id=n),i.innerHTML=`
        <div class="msg-icon"><i class="fas ${t==="bot"?"fa-robot":"fa-user"}"></i></div>
        <div class="msg-content">
            <p>${e}</p>
        </div>
    `,o.appendChild(i),o.scrollTop=o.scrollHeight}function Te(t){const e=t.toLowerCase(),n=window.state.cars||[],o=window.state.bookings||[];return e.includes("قيمة")||e.includes("مخزون")?`إجمالي قيمة المخزون الحالي هو ${n.reduce((a,r)=>a+(parseFloat(r.price)||0),0).toLocaleString()} ريال سعودي لعدد ${n.length} سيارة.`:e.includes("موظف")||e.includes("أفضل")?"بناءً على البيانات الحالية، يتميز فريق المبيعات بنشاط عالٍ، والمنافسة قوية بين الموظفين لهذا الشهر.":e.includes("ملخص")||e.includes("أداء")?`حالة اليوم: يوجد ${o.filter(a=>a.status==="new"||!a.status).length} طلبات جديدة لم يتم معالجتها بعد، وإجمالي الطلبات في النظام هو ${o.length}.`:"أنا هنا لمساعدتك في إدارة المعرض. يمكنك سؤالي عن المخزون، الطلبات، أو الإحصائيات العامة."}window.renderWhatsAppMonitor=function(){var o,i;const t=document.getElementById("admin-wa-monitor-table");if(!t)return;const e=(((o=document.getElementById("wa-monitor-search"))==null?void 0:o.value)||"").toLowerCase();(i=document.getElementById("wa-monitor-filter"))!=null&&i.value;let n=(window.state.logs||[]).filter(a=>a.category==="whatsapp"||a.details.includes("WhatsApp"));if(e&&(n=n.filter(a=>a.details.toLowerCase().includes(e)||a.user.toLowerCase().includes(e))),n.length===0){t.innerHTML='<div class="no-data-admin" style="padding:40px; text-align:center;">لا توجد سجلات مراقبة حالياً</div>';return}t.innerHTML=n.map(a=>`
        <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:12px; border:1px solid var(--glass-border); margin-bottom:10px;">
            <div style="display:flex; justify-content:space-between;">
                <strong>${a.user}</strong>
                <span style="opacity:0.5; font-size:11px;">${new Date(a.timestamp).toLocaleString()}</span>
            </div>
            <p style="font-size:13px; margin:10px 0;">${a.details}</p>
            ${a.proofUrl?`<a href="${a.proofUrl}" target="_blank" class="btn-premium btn-sm" style="display:inline-block;">عرض الإثبات</a>`:""}
        </div>
    `).join("")};let z=null;const O="https://whatsapp-server-tq4f.onrender.com";window.WA_SERVER_URL_OVERRIDE||localStorage.getItem("wa_server_url");window.saveWAServerURL=async function(){const t=document.getElementById("wa-server-url-config");if(!t)return;let e=t.value.trim().replace(/\/$/,"");if(!e)return window.showLuxuryToast("يرجى إدخال الرابط","error");try{await q(C(A,"settings/waServerUrl"),e),localStorage.setItem("wa_server_url",e),window.showLuxuryToast("تم حفظ الرابط وبثه للجميع، سيتم تحديث الصفحة","success"),setTimeout(()=>location.reload(),1500)}catch{window.showLuxuryToast("خطأ في الصلاحيات لرفع الرابط","error")}};window.startStaffWASession=function(){const t=document.getElementById("wa-staff-select");if(!t||!t.value)return window.showLuxuryToast("يرجى اختيار موظف للربط","error");z&&(document.getElementById("wa-server-status").innerText="يتم الآن توليد كود الاستجابة للموظف...",document.getElementById("wa-server-status").style.color="var(--text-dim)",document.getElementById("wa-qr-container").style.display="none",z.emit("start_session",{userId:t.value}))};window.logoutStaffWASession=function(){const t=document.getElementById("wa-staff-select");if(!t||!t.value)return window.showLuxuryToast("يرجى اختيار الموظف أولاً","error");confirm("هل أنت متأكد من فصل رقم الواتساب لهذا الموظف وسجل المحادثة الخاصة به من السيرفر؟")&&z&&z.emit("logout_session",{userId:t.value})};window.initWhatsAppServer=async function(){const t=document.getElementById("wa-server-url-config");let e=null;window.location.hostname.includes("app.github.dev")&&(e=`https://${window.location.hostname.replace("-5173","-3001")}`,console.log("تم اكتشاف GitHub Codespaces، استخدام الرابط التلقائي:",e));let n=null;try{const a=await we(C(A,"settings/waServerUrl"));a.exists()&&(n=a.val(),localStorage.setItem("wa_server_url",n))}catch(a){console.error("Firebase config error:",a)}const o=e||n||localStorage.getItem("wa_server_url")||O;window._waServerActiveUrl=o,t&&(t.value=o);const i=document.getElementById("wa-staff-select");if(i&&window.state&&window.state.users){const a=i.value;i.innerHTML='<option value="">-- اختر الموظف --</option>',window.state.users.filter(r=>r.role==="staff"||r.role==="admin"||r.role==="supervisor").forEach(r=>{const d=r.role==="admin"?"مدير":r.role==="supervisor"?"مشرف":"موظف";i.innerHTML+=`<option value="${r.id}" ${r.id===a?"selected":""}>${r.name||r.email||"موظف"} (${d})</option>`}),i.onchange=function(){this.value&&(z&&z.emit("join_room",this.value),window.startStaffWASession())},i.value&&(z&&z.emit("join_room",i.value),window.startStaffWASession())}typeof io<"u"&&!z&&(fetch(`${o}/ping`).catch(()=>{}),z=io(o,{reconnection:!0,reconnectionAttempts:10,reconnectionDelay:2e3,transports:["websocket","polling"],secure:!0}),z.on("connect_error",a=>{console.error("Connection Error:",a),a.message!=="websocket error"&&(window._waAlerted||(alert("عذراً، المتصفح لم يستطع الاتصال بخادم الواتساب. تأكد من أن الرابط يعمل في صفحة منفصلة. الخطأ: "+a.message),window._waAlerted=!0))}),z.on("connect",()=>{console.log("Connected to WhatsApp Server!");const a=document.getElementById("wa-connection-dot");a&&(a.style.background="#4de265",a.style.boxShadow="0 0 5px #4de265",a.title="متصل بالسيرفر"),window.state.user&&z.emit("join_room",window.state.user.uid),window.state.user&&window.startCurrentWASession&&setTimeout(()=>window.startCurrentWASession(),1500)}),z.on("qr",a=>{const r=document.getElementById("wa-staff-select"),d=document.getElementById("wa-server-status"),s=document.getElementById("wa-qr-container"),l=document.getElementById("wa-qr-canvas");if(r&&r.value===a.userId&&(d&&(d.innerText="في انتظار مسح كود الـ QR...",d.style.color="var(--text-color)"),s&&(s.style.display="block"),typeof QRCode<"u"&&l&&QRCode.toCanvas(l,a.qr,function(f){f&&console.error(f)})),window.state.user&&a.userId===window.state.user.uid){const f=document.getElementById("wa-my-status-title"),c=document.getElementById("wa-my-status-desc"),m=document.getElementById("wa-my-qr-container"),p=document.getElementById("wa-my-qr-canvas"),x=document.getElementById("btn-start-my-wa"),g=document.getElementById("btn-logout-my-wa");f&&(f.innerText="بانتظار مسح رمز QR..."),c&&(c.innerText="افتح واتساب على هاتفك وامسح الرمز الظاهر أدناه ليتم ربط حسابك."),m&&(m.style.display="block"),x&&(x.innerText="تحديث الرمز"),g&&(g.style.display="none"),typeof QRCode<"u"&&p&&QRCode.toCanvas(p,a.qr,{width:250,margin:2},function(h){h&&console.error(h)})}}),z.on("ready",a=>{const r=document.getElementById("wa-staff-select"),d=document.getElementById("wa-connection-dot");if(d&&(d.style.background="#4de265",d.style.boxShadow="0 0 8px #4de265",d.title="واتساب جاهز للعمل"),r&&r.value===a.userId){const s=document.getElementById("wa-server-status"),l=document.getElementById("wa-qr-container");s&&(s.innerText=a.msg,s.style.color="#00a884"),l&&(l.style.display="none")}if(window.state.user&&a.userId===window.state.user.uid){const s=document.getElementById("wa-my-status-title"),l=document.getElementById("wa-my-status-desc"),f=document.getElementById("wa-my-qr-container"),c=document.getElementById("btn-start-my-wa"),m=document.getElementById("btn-logout-my-wa");s&&(s.innerText="واتساب متصل بنجاح"),l&&(l.innerText="حسابك الآن مرتبط بالنظام، يمكنك البدء في استقبال وإرسال الرسائل للعملاء."),f&&(f.style.display="none"),c&&(c.style.display="none"),m&&(m.style.display="inline-block"),window.showLuxuryToast("تم ربط حساب واتساب الخاص بك بنجاح","success")}}),z.on("disconnected",a=>{console.log("Disconnected Event:",a);const r=document.getElementById("wa-connection-dot");r&&(r.style.background="#ff4b4b",r.style.boxShadow="0 0 5px #ff4b4b",r.title="تم قطع الاتصال بالسيرفر");const d=a.msg||"تم قطع الاتصال بالسيرفر. يرجى إعادة الربط لتفعيل خدمات الدردشة.",s=document.getElementById("wa-staff-select");if(s&&s.value===a.userId){const l=document.getElementById("wa-server-status");l&&(l.innerText=d,l.style.color="red")}if(window.state.user&&a.userId===window.state.user.uid){const l=document.getElementById("wa-my-status-title"),f=document.getElementById("wa-my-status-desc"),c=document.getElementById("btn-start-my-wa"),m=document.getElementById("btn-logout-my-wa"),p=document.getElementById("wa-my-qr-container");l&&(l.innerText="الواتساب غير متصل"),f&&(f.innerText=d),p&&(p.style.display="none"),c&&(c.style.display="inline-block",c.innerText="إعادة الربط الآن"),m&&(m.style.display="none")}}),z.on("jid_resolved",({oldJid:a,newJid:r})=>{console.log(`JID Resolution detected: ${a} -> ${r}`);const s=(window.state.bookings||[]).find(l=>l.waJid===a);s&&(console.log(`Updating booking ${s.id} JID due to resolution`),j(C(A,`bookings/${s.id}`),{waJid:r,phone:window.normalizePhone(r)}).catch(l=>{}),window._currentWaPhone===a&&(window._currentWaPhone=r,typeof window.openStaffChat=="function"&&window.openStaffChat(r)))}),z.on("message",async a=>{var x,g,h;console.log("Real-time WA message received:",a);const r=window.normalizePhone,d=r(a.from),s=r(window._currentWaPhone),l=document.getElementById("details-modal"),f=l&&!l.classList.contains("hidden"),c=document.getElementById("wa-connection-dot");c&&(c.style.transform="scale(1.2)",setTimeout(()=>c.style.transform="scale(1)",300));const m=window.state.bookings||[];let p=m.find(u=>u.waJid===a.from);if(p||(p=m.find(u=>{if(!u.phone)return!1;const y=window.normalizePhone(u.phone);return!d.includes("@")&&y===d}),p&&!p.waJid&&(console.log(`Smart Pinning JID ${a.from} to booking ${p.id}`),j(C(A,`bookings/${p.id}`),{waJid:a.from}).catch(u=>{}),p.waJid=a.from)),f&&s&&d===s)setTimeout(()=>{window.fetchServerWAChat(window._currentWaPhone,a.userId)},500);else{if(a.isMe)return;const u=a.userId===((x=window.state.userProfile)==null?void 0:x.id),y=((g=window.state.userProfile)==null?void 0:g.role)==="admin"||((h=window.state.userProfile)==null?void 0:h.role)==="supervisor";(u||y)&&p&&window.showWAPushNotification&&window.showWAPushNotification(d,a.body,a.userId)}}))};window.showWAPushNotification=async function(t,e,n){let o=document.getElementById("wa-push-notifications-container");o||(o=document.createElement("div"),o.id="wa-push-notifications-container",o.style.cssText="position:fixed; bottom:30px; left:25px; z-index:999999; display:flex; flex-direction:column-reverse; gap:12px; width:340px; pointer-events:none;",document.body.appendChild(o));const a=(window.state.bookings||[]).find(p=>p.phone&&window.normalizePhone(p.phone)===window.normalizePhone(t)),r=a&&a.name?a.name:t;let d=e||"رسالة جديدة";d.length>70&&(d=d.substring(0,70)+"...");const s=document.createElement("div");s.style.cssText="background:rgba(255,255,255,0.98); border-right:4px solid #00a884; border-radius:12px; padding:12px 15px; box-shadow:0 6px 20px rgba(0,0,0,0.15); pointer-events:auto; cursor:pointer; transform:translateX(-120%); transition:transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s, margin 0.3s; opacity:0; overflow:hidden; position:relative; direction:rtl;",s.innerHTML=`
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:4px;">
           <div style="display:flex; align-items:center; gap:10px;">
               <div style="background:#d9fdd3; width:30px; height:30px; border-radius:50%; display:flex; justify-content:center; align-items:center;">
                   <i class="fab fa-whatsapp" style="color:#00a884; font-size:16px;"></i>
               </div>
               <strong style="color:#111b21; font-size:13.5px; margin:0; line-height:1.2;">${r}</strong>
           </div>
           <button class="fa-times-btn" style="background:none; border:none; color:#999; cursor:pointer; font-size:16px; padding:0; margin:0; line-height:1; transition:color 0.2s;"><i class="fas fa-times"></i></button>
        </div>
        <p style="margin:0; font-size:12.5px; color:#54656f; line-height:1.5; padding-right:40px;">${d}</p>
    `;const l=s.querySelector(".fa-times-btn");l.onmouseover=()=>l.style.color="#e02424",l.onmouseout=()=>l.style.color="#999";const f=async()=>{var p;try{await F(C(A,"notifications"),{userId:n||((p=window.state.userProfile)==null?void 0:p.id)||"admin",type:"wa_message",title:"رسالة واتساب من "+r,body:d,phone:t,read:!1,createdAt:new Date().toISOString()})}catch(x){console.warn("Could not save to notifications DB",x)}};let c=setTimeout(()=>{m(),f()},1e4);const m=()=>{s.style.transform="translateX(-120%)",s.style.opacity="0",s.style.marginTop=`-${s.offsetHeight}px`,setTimeout(()=>{s.parentNode&&s.parentNode.removeChild(s)},400)};l.onclick=p=>{p.stopPropagation(),clearTimeout(c),m()},s.onclick=()=>{clearTimeout(c),m(),a?(window.viewBookingDetails(a.id),setTimeout(()=>{const p=document.getElementById("details-modal").querySelector(".dash-tab.admin-only");p&&p.click()},100)):window.showLuxuryToast("الرسالة من رقم غير مسجل في أي طلب مفتوح","info")},o.insertBefore(s,o.firstChild),requestAnimationFrame(()=>{s.style.transform="translateX(0)",s.style.opacity="1"})};window.startCurrentWASession=function(){if(!window.state.user)return;const t=()=>{z.emit("start_session",{userId:window.state.user.uid});const e=document.getElementById("wa-my-status-title"),n=document.getElementById("wa-my-status-desc");e&&(e.innerText="جاري الاتصال..."),n&&(n.innerText="يتم الآن التواصل مع خادم الواتساب لتوليد رمز الاستجابة السريعة...")};z?z.connected?t():(z.once("connect",t),z.connect()):window.initWhatsAppServer()};window.logoutCurrentWASession=function(){window.state.user&&confirm("هل أنت متأكد من تسجيل الخروج من واتساب؟ لن تتمكن من المراسلة من هنا.")&&z&&z.emit("logout_session",{userId:window.state.user.uid})};window._waMediaCache=window._waMediaCache||{};window.fetchServerWAChat=async function(t,e){var i,a,r;if(!t)return;const n=document.getElementById("wa-server-chat-box");if(!n)return;let o=(i=window.state.userProfile)==null?void 0:i.id;if(((a=window.state.userProfile)==null?void 0:a.role)==="admin"||((r=window.state.userProfile)==null?void 0:r.role)==="supervisor")if(e)o=e;else{const s=(window.state.bookings||[]).find(l=>l.phone&&window.normalizePhone(l.phone)===window.normalizePhone(t));if(s&&s.assignedTo)o=s.assignedTo;else{n.innerHTML=`
                <div style="text-align:center; margin-top:auto; margin-bottom:auto;">
                    <div style="background:rgba(255,255,255,0.95); display:inline-block; padding:20px; border-radius:15px; font-size:13px; color:#555; box-shadow:0 10px 30px rgba(0,0,0,0.1); max-width:85%;">
                        <i class="fas fa-user-slash" style="color:#00a884; font-size:32px; margin-bottom:15px; display:block;"></i>
                        هذا الحجز غير مسند لموظف.<br>
                        سجل المحادثات متاح فقط للحجوزات المسندة.
                    </div>
                </div>`;return}}window._currentWaPhone=t,(!n.hasChildNodes()||n.innerHTML.includes("fa-circle-notch")||n.innerHTML.includes("fa-comment-dots"))&&(n.innerHTML='<div style="text-align:center; margin-top:auto; margin-bottom:auto;"><i class="fas fa-circle-notch fa-spin" style="font-size: 30px; color: #00a884; margin-bottom: 12px;"></i><br><div style="background: rgba(255,255,255,0.9); display: inline-block; padding: 8px 16px; border-radius: 12px; font-size: 12px; color: #555; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">جاري مزامنة الرسائل...</div></div>');try{const d=window._waServerActiveUrl||O,s=await fetch(`${d}/api/chat/${o}/${t}`);if(s.ok){const l=await s.json();if(l.messages&&l.messages.length>0){const f=n.scrollHeight-n.scrollTop-n.clientHeight<50;n.innerHTML="";const c=document.createElement("div");c.style.cssText="text-align:center; margin:10px 0 15px;",c.innerHTML='<span style="background:#fefed7; color:#54656f; font-size:11px; padding:6px 12px; border-radius:8px; box-shadow:0 1px 1px rgba(0,0,0,0.05); display:inline-block;"><i class="fas fa-lock" style="margin-left:4px; font-size:10px;"></i> الرسائل محمية ومسجلة عبر الخادم الداخلي</span>',n.appendChild(c),l.messages.forEach(m=>{const p=m.timestamp?new Date(Number(m.timestamp)*1e3).toLocaleTimeString("ar-SA",{hour:"numeric",minute:"2-digit",hour12:!0}):"";let x=(m.body||"").replace(/</g,"&lt;").replace(/>/g,"&gt;");x=x.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#027eb5; text-decoration:underline;">$1</a>');const g=document.createElement("div");g.style.padding="6px 8px 8px 10px",g.style.maxWidth="75%",g.style.fontSize="14.5px",g.style.marginBottom="4px",g.style.position="relative",g.style.boxShadow="0 1px 1.5px rgba(11,20,26,0.1)",g.style.whiteSpace="pre-wrap",g.style.lineHeight="1.4",g.style.wordBreak="break-word",g.style.overflowWrap="anywhere",m.isMe?(g.style.alignSelf="flex-end",g.style.background="#d9fdd3",g.style.color="#111b21",g.style.borderRadius="12px 0 12px 12px"):(g.style.alignSelf="flex-start",g.style.background="#ffffff",g.style.color="#111b21",g.style.borderRadius="0 12px 12px 12px");let h=`<div>${x}</div>`;if(m.media)if(window._waMediaCache[m.id]&&(m.media.data=window._waMediaCache[m.id]),m.media.data===null){const y=`btn-dl-${m.id}`,I=`cont-dl-${m.id}`;let k="مرفق";m.media.mimetype.startsWith("image/")?k="صورة":m.media.mimetype.startsWith("video/")?k="فيديو":(m.media.mimetype.startsWith("audio/")||m.type==="ptt")&&(k="مقطع صوتي"),h=`<div id="${I}" style="margin-bottom:8px; display:flex; align-items:center; gap:10px; background:rgba(0,0,0,0.05); padding:10px; border-radius:8px;">
                                <i class="fas fa-file-download" style="font-size:24px; color:#54656f;"></i>
                                <div style="flex:1;">
                                    <strong style="display:block; font-size:13px;">${k} سابق</strong>
                                    <span style="font-size:11px; opacity:0.7;">${m.media.filename||"اضغط للتحميل من السيرفر"}</span>
                                </div>
                                <button id="${y}" class="btn-premium btn-sm" onclick="window.downloadWAMedia('${o}', '${t}', '${m.id}', '${I}', '${m.media.mimetype}', '${m.type}')" style="padding:4px 10px; min-width:40px;"><i class="fas fa-download"></i></button>
                            </div>`+(x?`<div>${x}</div>`:"")}else m.media.mimetype.startsWith("image/")?h=`<div style="margin:-4px -6px 4px -8px; background:rgba(0,0,0,0.02); border-radius:10px 10px 0 0; overflow:hidden; text-align:center;"><img src="data:${m.media.mimetype};base64,${m.media.data}" style="max-width:100%; max-height:220px; border-radius:8px; display:inline-block; cursor:pointer; object-fit:cover;" onclick="window.viewFullImage(this.src)"></div>`+(x?`<div>${x}</div>`:""):m.media.mimetype.startsWith("audio/")||m.type==="ptt"?h=`<div style="display:flex; align-items:center; gap:10px;"><div style="background:#00a884; width:40px; height:40px; border-radius:50%; display:flex; justify-content:center; align-items:center; flex-shrink:0;"><i class="fas fa-play" style="color:white; margin-right:-2px; font-size:14px;"></i></div> <audio controls style="max-width:200px; height:35px;"><source src="data:${m.media.mimetype};base64,${m.media.data}" type="${m.media.mimetype}"></audio></div>`+(x?`<div style="margin-top:5px;">${x}</div>`:""):m.media.mimetype.startsWith("video/")?h=`<video controls style="max-width:100%; border-radius:8px; margin-bottom:5px;"><source src="data:${m.media.mimetype};base64,${m.media.data}" type="${m.media.mimetype}"></video>`+(x?`<div>${x}</div>`:""):h=`<div style="background:rgba(0,0,0,0.05); padding:10px; border-radius:8px; display:flex; align-items:center; gap:10px; margin-bottom:5px;"><i class="fas fa-file-alt" style="font-size:24px; color:#54656f;"></i> <div><strong style="display:block; font-size:13px;">ملف ${m.media.filename||"مرفق"}</strong><span style="font-size:11px; opacity:0.7;">تنزيل للعرض</span></div></div>`+(x?`<div>${x}</div>`:"");let u="";if(m.isMe){let y=m.ack!==void 0?m.ack:m.status==="read"?3:m.status==="delivered"?2:m.status==="sent"?1:void 0;y===1||y===0?u='<i class="fas fa-check" style="font-size:12px; margin-right:4px; color:#c7c7c7;"></i>':y===2?u='<i class="fas fa-check-double" style="font-size:12px; margin-right:4px; color:#c7c7c7;"></i>':y>=3?u='<i class="fas fa-check-double" style="font-size:12px; margin-right:4px; color:#53bdeb;"></i>':u='<i class="fas fa-check" style="font-size:12px; margin-right:4px; color:#c7c7c7;"></i>'}g.innerHTML=`${h} <div style="display:flex; justify-content:flex-end; align-items:center; margin-top:2px; float:left; margin-left:-5px; padding-left:10px; padding-top:2px;">
                      <span style="font-size:11px; color:#667781;">${p}</span>
                      ${u}
                    </div><div style="clear:both;"></div>`,n.appendChild(g)}),(f||n.innerHTML.includes("fa-lock"))&&setTimeout(()=>{n.scrollTo({top:n.scrollHeight,behavior:"smooth"})},100)}else n.innerHTML='<div style="text-align:center; margin-top:auto; margin-bottom:auto;"><div style="background:rgba(255,255,255,0.95); display:inline-block; padding:15px 30px; border-radius:15px; font-size:13px; color:#555; box-shadow:0 3px 10px rgba(0,0,0,0.08);"><i class="fas fa-comment-dots" style="color:#00a884; font-size:24px; margin-bottom:10px; display:block;"></i>لا توجد رسائل سابقة مع هذا الرقم.<br>يمكنك بدء دردشة جديدة الآن.</div></div>'}else n.innerHTML=`
                <div style="text-align:center; margin-top:auto; margin-bottom:auto;">
                    <div style="background:rgba(255,255,255,0.95); display:inline-block; padding:25px; border-radius:15px; font-size:14px; color:#555; box-shadow:0 3px 10px rgba(0,0,0,0.08);">
                        <i class="fab fa-whatsapp" style="font-size:50px; margin-bottom:15px; color:#8696a0;"></i>
                        <p style="margin-bottom:15px;">خادم واتساب غير متصل لهذا الموظف</p>
                        <button class="btn-premium btn-sm" onclick="window.closeModal('details-modal'); window.switchLuxuryTab('whatsapp-mgmt')">اذهب لإعدادات الواتساب</button>
                    </div>
                </div>
            `}catch{n.innerHTML='<div style="text-align:center; margin-top:auto; margin-bottom:auto;"><div style="background:rgba(255,255,255,0.95); display:inline-block; padding:15px 25px; border-radius:15px; font-size:13px; color:#e02424; box-shadow:0 3px 10px rgba(0,0,0,0.08);"><i class="fas fa-exclamation-triangle" style="font-size:24px; margin-bottom:10px; display:block;"></i>فشل الاتصال بالخادم. يرجى التأكد من تشغيل السيرفر.</div></div>'}};let D,Y=[];window.startWARecording=async function(){window._waRecordingIntent=!0;try{const t=await navigator.mediaDevices.getUserMedia({audio:!0});if(!window._waRecordingIntent){t.getTracks().forEach(n=>n.stop());return}D=new MediaRecorder(t),Y=[],window._waRecordingStartTime=Date.now(),D.ondataavailable=n=>{n.data.size>0&&Y.push(n.data)},D.start();const e=document.getElementById("wa-mic-btn");e&&(e.style.color="red")}catch{window.showLuxuryToast("لم يتم السماح باستخدام الميكروفون","error"),window._waRecordingIntent=!1}};window.stopWARecording=function(t,e){window._waRecordingIntent&&(window._waRecordingIntent=!1,!(!D||D.state==="inactive")&&(D.onstop=async()=>{if(Date.now()-(window._waRecordingStartTime||Date.now())<500||Y.length===0){D.stream.getTracks().forEach(d=>d.stop());const r=document.getElementById("wa-mic-btn");r&&(r.style.color="#54656f");return}const o=new Blob(Y,{type:"audio/webm"}),i=new FileReader;i.readAsDataURL(o),i.onloadend=()=>{const r=i.result.split(",")[1];window.sendServerWAMessage(t,e,{data:r,mimetype:"audio/webm",filename:"voice_note.webm",ptt:!0},"")};const a=document.getElementById("wa-mic-btn");a&&(a.style.color="#54656f"),D.stream.getTracks().forEach(r=>r.stop())},D.stop()))};window.handleWAMediaSelect=function(t,e){const n=document.getElementById("wa-media-upload"),o=n.files&&n.files[0];if(!o)return;if(o.size>16*1024*1024){window.showLuxuryToast("حجم الملف كبير جداً، أقصى حد يسمح به الواتساب هو 16 ميجابايت","error");return}const i=new FileReader;i.onload=function(a){const r=a.target.result.split(",")[1],d=o.type||"application/octet-stream",s=o.name;let l=prompt("هل تريد إرفاق رسالة نصية مع هذا الملف؟ (اختياري)","");if(l===null){n.value="";return}window.sendServerWAMessage(t,e,{data:r,mimetype:d,filename:s},l)},i.readAsDataURL(o)};window.sendServerWAMessage=async function(t,e,n=null,o=null){const i=document.getElementById("wa-server-input");if(i&&i.disabled)return;const a=o!==null?o:i?i.value.trim():"";if(!n&&!a)return;let r=window.state.userProfile.id;window.state.userProfile.role==="admin"&&e&&(r=e),i&&o===null&&(i.value="",i.style.height="42px",i.focus());const d=document.getElementById("wa-server-chat-box");if(d){(d.innerHTML.includes("fa-comment-dots")||d.innerHTML.includes("fa-circle-notch")||!d.hasChildNodes())&&(d.innerHTML='<div style="text-align:center; margin:10px 0 15px;"><span style="background:#fefed7; color:#54656f; font-size:11px; padding:6px 12px; border-radius:8px; box-shadow:0 1px 1px rgba(0,0,0,0.05); display:inline-block;"><i class="fas fa-lock" style="margin-left:4px; font-size:10px;"></i> الرسائل محمية ومسجلة عبر الخادم الداخلي</span></div>');const s=new Date().toLocaleTimeString("ar-SA",{hour:"numeric",minute:"2-digit",hour12:!0});let l=(a||"").replace(/</g,"&lt;").replace(/>/g,"&gt;");l=l.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#027eb5; text-decoration:underline;">$1</a>');const f=document.createElement("div");f.style.padding="6px 8px 8px 10px",f.style.maxWidth="75%",f.style.fontSize="14.5px",f.style.marginBottom="4px",f.style.position="relative",f.style.boxShadow="0 1px 1.5px rgba(11,20,26,0.1)",f.style.whiteSpace="pre-wrap",f.style.lineHeight="1.4",f.style.wordBreak="break-word",f.style.overflowWrap="anywhere",f.style.alignSelf="flex-end",f.style.background="#d9fdd3",f.style.color="#111b21",f.style.borderRadius="12px 0 12px 12px";let c=`<div>${l}</div>`;n&&(c='<div style="margin-bottom:5px; font-size:12px; color:#555;"><i class="fas fa-paperclip"></i> تم إرسال مرفق</div>'+c);let m='<i class="fas fa-clock" style="font-size:12px; margin-right:4px; color:#c7c7c7;"></i>';f.innerHTML=`${c} <div style="display:flex; justify-content:flex-end; align-items:center; margin-top:2px; float:left; margin-left:-5px; padding-left:10px; padding-top:2px;"><span style="font-size:11px; color:#667781;">${s}</span>${m}</div><div style="clear:both;"></div>`,d.appendChild(f),setTimeout(()=>{d.scrollTo({top:d.scrollHeight,behavior:"smooth"})},50)}try{const s=window._waServerActiveUrl||O,l={userId:r,phone:t,message:a};n&&(l.media=n),(await fetch(`${s}/api/send`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)})).ok?setTimeout(()=>window.fetchServerWAChat(t,r),1500):(window.showLuxuryToast("الواتساب غير متصل في الإدارة، المرجو فحص الاتصال","error"),i&&o===null&&!n&&(i.value=a))}catch{window.showLuxuryToast("الخادم البرمجي مغلق أو متوقف","error"),i&&o===null&&!n&&(i.value=a)}finally{const s=document.getElementById("wa-media-upload");s&&(s.value="")}};window.openQuickReplyModal=function(){window.openCRUDModal("quickReplies")};window.editQuickReply=function(t){window.openCRUDModal("quickReplies",t)};window.addQuickReply=async function(t){window.openQuickReplyModal()};window.deleteQuickReply=async function(t,e){if(confirm("هل أنت متأكد من الحذف؟")){let n="";e&&(n=e.innerHTML,e.disabled=!0,e.innerHTML='<i class="fas fa-spinner fa-spin"></i>');try{await W(C(A,`quickReplies/${t}`)),window.showLuxuryToast("تم الحذف بنجاح")}catch(o){console.error("Error deleting quick reply:",o),window.showLuxuryToast("فُقدت الصلاحية أو حدث خطأ أثناء الحذف","error"),e&&(e.disabled=!1,e.innerHTML=n)}}};window.renderQuickRepliesAdmin=function(){var o;const t=document.getElementById("quick-replies-list");if(!t)return;const e=(((o=document.getElementById("qr-search"))==null?void 0:o.value)||"").toLowerCase();let n=window.state.quickReplies||[];if(e&&(n=n.filter(i=>(i.title||"").toLowerCase().includes(e)||(i.content||"").toLowerCase().includes(e))),n.length===0){t.innerHTML=`
            <div class="no-results-v2 full-width">
                <i class="fas fa-search"></i>
                <p>${e?"لا توجد نتائج تطابق بحثك":"لا توجد نماذج ردود سريعة حالياً"}</p>
            </div>`;return}t.innerHTML=n.map(i=>`
        <div class="admin-item-card-v2" data-aos="fade-up">
            <div class="item-card-content" style="flex:1;">
                <div class="item-card-header" style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                    <div class="item-icon-circle" style="background:var(--p-copper); color:white; width:35px; height:35px; border-radius:50%; display:flex; align-items:center; justify-content:center;">
                        <i class="fas fa-bolt"></i>
                    </div>
                    <strong style="color:var(--text-bright); font-size:16px;">${i.title}</strong>
                </div>
                <div class="item-card-body">
                    <p class="qr-content-preview" style="white-space: pre-wrap; margin:0; color:var(--text-dim); font-size:14px; background:rgba(0,0,0,0.2); padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.05);">${i.content}</p>
                </div>
            </div>
            <div class="item-card-actions" style="display:flex; gap:10px;">
                <button class="icon-btn-lite" onclick="window.editQuickReply('${i.id}')" title="تعديل">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="icon-btn-lite danger" onclick="window.deleteQuickReply('${i.id}', this)" title="حذف">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join("")};window._qrExpanded=!1;window.renderQuickRepliesBar=function(){const t=document.getElementById("wa-quick-replies-bar");if(!t)return;const e=window.state.quickReplies||[];if(e.length===0){t.style.display="none";return}t.style.display="flex";const n=window._qrExpanded;let o=e,i=!1;!n&&e.length>4&&(o=e.slice(0,4),i=!0);let a=o.map(r=>`
        <button onclick="window.applyQuickReplyById('${r.id}')" style="background:white; border:1px solid var(--glass-border); padding:6px 12px; border-radius:16px; font-size:12px; color:#54656f; cursor:pointer; flex-shrink:0; white-space:nowrap; transition:all 0.2s; box-shadow:0 1px 2px rgba(0,0,0,0.05);" onmouseover="this.style.background='#f0f2f5'" onmouseout="this.style.background='white'">
            ${r.title}
        </button>
    `).join("");i?a+='<button onclick="window._qrExpanded=true; window.renderQuickRepliesBar();" style="background:#00a884; color:white; border:none; padding:6px 12px; border-radius:16px; font-size:12px; cursor:pointer; flex-shrink:0;">عرض الكل <i class="fas fa-chevron-left" style="margin-right:4px;"></i></button>':n&&e.length>4&&(a+='<button onclick="window._qrExpanded=false; window.renderQuickRepliesBar();" style="background:#e02424; color:white; border:none; padding:6px 12px; border-radius:16px; font-size:12px; cursor:pointer; flex-shrink:0;">إخفاء <i class="fas fa-chevron-right" style="margin-right:4px;"></i></button>'),t.innerHTML=a};window.applyQuickReplyById=function(t){const e=(window.state.quickReplies||[]).find(n=>n.id===t);e&&e.content&&window.applyQuickReply(e.content)};window.applyQuickReply=function(t){var n;const e=document.getElementById("wa-server-input");if(e){let o=t;const i=((n=window.state.userProfile)==null?void 0:n.name)||"الموظف";o=o.replace(/\(اسم الموظف\)/g,i);let a="العميل",r="السيارة",d="غير محدد",s="غير محدد",l="غير محدد",f="غير محدد",c="غير محدد",m="غير محدد",p="غير محدد",x="غير محدد",g="غير محدد",h="غير محدد",u="",y="غير محدد",I="غير محدد",k="غير محدد",S="غير محدد",$="غير محدد",w="غير محدد";if(window._currentWaPhone){const v=window._currentWaPhone.toString(),E=(window.state.bookings||[]).filter(b=>b.phone&&b.phone.toString()===v||b.waJid&&b.waJid.toString()===v||b.phone&&v.includes(b.phone.toString()));if(E&&E.length>0){E.sort((L,M)=>(M.createdAt||0)-(L.createdAt||0));const b=E[0];b.name&&(a=b.name);let T=null;b.carId?T=(window.state.cars||[]).find(L=>L.id===b.carId):b.carRequested&&(T=(window.state.cars||[]).find(L=>{const M=`${L.make} ${L.model} ${L.year}`.toLowerCase();return M.includes(b.carRequested.toLowerCase())||b.carRequested.toLowerCase().includes(M)})),T?(d=T.make||d,s=T.model||s,l=T.year||l,f=T.price?Number(T.price).toLocaleString("ar-SA"):f,c=T.engine||c,m=T.mileage||m,p=T.fuelType||p,g=T.color||g,h=T.interiorColor||h,x={sedan:"سيدان",suv:"SUV",coupe:"كوبيه",luxury:"فاخرة",pickup:"بيك آب"}[T.bodyType]||T.bodyType||x,r=`${d} ${s} ${l}`.trim()):b.brand||b.model?(r=`${b.brand||""} ${b.model||""} ${b.year||""}`.trim(),d=b.brand||d,s=b.model||s,l=b.year||l):(b.carName||b.carRequested)&&(r=b.carName||b.carRequested),b.paymentMethod&&(u=b.paymentMethod==="cash"?"كاش":"تمويل"),b.bankName&&(y=b.bankName),b.installmentPeriod&&(I=b.installmentPeriod),b.salary&&(k=b.salary),b.commitments&&(S=b.commitments),b.workEntity&&($=b.workEntity),b.workStatus&&(w=b.workStatus)}}o=o.replace(/\(اسم العميل\)/g,a),o=o.replace(/\(اسم السيارة\)/g,r),o=o.replace(/\(الماركة\)/g,d),o=o.replace(/\(الموديل\)/g,s),o=o.replace(/\(سنة الصنع\)/g,l),o=o.replace(/\(السعر\)/g,f),o=o.replace(/\(المحرك\)/g,c),o=o.replace(/\(الممشى\)/g,m),o=o.replace(/\(نوع الوقود\)/g,p),o=o.replace(/\(فئة السيارة\)/g,x),o=o.replace(/\(اللون الخارجي\)/g,g),o=o.replace(/\(اللون الداخلي\)/g,h),o=o.replace(/\(طريقة الشراء\)/g,u),o=o.replace(/\(اسم السيارة وتفاصيلها وطريقة الشراء وتفاصيله كاملة\)/g,`${r} - الدفع: ${u}`),o=o.replace(/\(اسم البنك الراتب عليه أو المفضل\)/g,y),o=o.replace(/\(اسم البنك\)/g,y),o=o.replace(/\(مدة الأقساط المفضل\)/g,I),o=o.replace(/\(مدة الأقساط\)/g,I),o=o.replace(/\(الراتب الشهري \(صافي\)\)/g,k),o=o.replace(/\(الراتب الشهري\)/g,k),o=o.replace(/\(الراتب\)/g,k),o=o.replace(/\(الإلتزامات الشهرية\)/g,S),o=o.replace(/\(الإلتزامات\)/g,S),o=o.replace(/\(جهة العمل\)/g,$),o=o.replace(/\(حالة الجهة\)/g,w),e.value=o,e.style.height="42px",e.style.height=Math.min(e.scrollHeight,150)+"px",e.focus()}};window.downloadWAMedia=async function(t,e,n,o,i,a){const r=document.getElementById(o.replace("cont-dl-","btn-dl-"));r&&(r.disabled=!0,r.innerHTML='<i class="fas fa-spinner fa-spin"></i>');try{const d=window._waServerActiveUrl||O,s=await fetch(`${d}/api/media/${t}/${e}/${n}`);if(!s.ok)throw new Error("Failed");const l=await s.json();if(!l.data)throw new Error("No data");window._waMediaCache[n]=l.data;const f=document.getElementById(o);if(!f)return;let c="";i.startsWith("image/")?c=`<div style="margin:-4px -6px 4px -8px; background:rgba(0,0,0,0.02); border-radius:10px 10px 0 0; overflow:hidden; text-align:center;"><img src="data:${i};base64,${l.data}" style="max-width:100%; max-height:220px; border-radius:8px; display:inline-block; cursor:pointer; object-fit:cover;" onclick="window.viewFullImage(this.src)"></div>`:i.startsWith("audio/")||a==="ptt"?c=`<div style="display:flex; align-items:center; gap:10px;"><div style="background:#00a884; width:40px; height:40px; border-radius:50%; display:flex; justify-content:center; align-items:center; flex-shrink:0;"><i class="fas fa-play" style="color:white; margin-right:-2px; font-size:14px;"></i></div> <audio controls style="max-width:200px; height:35px;"><source src="data:${i};base64,${l.data}" type="${i}"></audio></div>`:i.startsWith("video/")?c=`<video controls style="max-width:100%; border-radius:8px; margin-bottom:5px;"><source src="data:${i};base64,${l.data}" type="${i}"></video>`:c='<div style="background:rgba(0,0,0,0.05); padding:10px; border-radius:8px; display:flex; align-items:center; gap:10px; margin-bottom:5px;"><i class="fas fa-check-circle" style="font-size:24px; color:#00a884;"></i> <div><strong style="display:block; font-size:13px;">تم التحميل بنجاح</strong></div></div>',f.outerHTML=c}catch{r&&(r.disabled=!1,r.innerHTML='<i class="fas fa-redo"></i>'),window.showLuxuryToast("فشل تحميل الوسائط","error")}};document.addEventListener("DOMContentLoaded",()=>{document.addEventListener("click",t=>{const e=t.target.closest(".dash-tab");e&&e.dataset.tab&&window.switchLuxuryTab(e.dataset.tab)}),setTimeout(()=>{window.initWhatsAppServer()},3e3)});window.viewFullImage=function(t){let e=document.getElementById("wa-full-image-overlay");if(!e){e=document.createElement("div"),e.id="wa-full-image-overlay",e.style.cssText="position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.9); z-index:999999; display:flex; justify-content:center; align-items:center; opacity:0; transition:opacity 0.25s ease-in-out; backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px);";const o=document.createElement("div");o.innerHTML='<i class="fas fa-times"></i>',o.style.cssText="position:absolute; top:25px; right:30px; font-size:24px; color:white; cursor:pointer; padding:10px; z-index:1000000; background:rgba(255,255,255,0.1); border-radius:50%; width:45px; height:45px; display:flex; justify-content:center; align-items:center; border: 1px solid rgba(255,255,255,0.2); transition: background 0.2s;",o.onmouseover=()=>o.style.background="rgba(255,255,255,0.2)",o.onmouseout=()=>o.style.background="rgba(255,255,255,0.1)";const i=document.createElement("img");i.id="wa-full-image-element",i.style.cssText="max-width:90%; max-height:90%; border-radius:12px; box-shadow:0 15px 40px rgba(0,0,0,0.5); object-fit:contain; transform:scale(0.85); transition:transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);",e.appendChild(o),e.appendChild(i),document.body.appendChild(e);const a=()=>{e.style.opacity="0",i.style.transform="scale(0.85)",setTimeout(()=>{e.style.display="none"},250)};o.onclick=a,e.onclick=r=>{r.target===e&&a()}}const n=document.getElementById("wa-full-image-element");n.src=t,e.style.display="flex",e.offsetWidth,e.style.opacity="1",n.style.transform="scale(1)"};setTimeout(()=>{const t=document.getElementById("luxury-splash");t&&!t.classList.contains("hidden")&&(console.warn("Safety timeout: removing loader"),t.style.opacity="0",setTimeout(()=>{t.classList.add("hidden");try{t.remove()}catch{}},800),window.state&&(window.state.firstLoadDone=!0))},7e3);const ee=window.updateAppUI;window.updateAppUI=function(){var n,o;ee&&ee();const t=document.getElementById("user-display-name"),e=((n=window.state.userProfile)==null?void 0:n.role)==="admin";t&&!((o=window.state.userProfile)!=null&&o.name)&&(t.innerText=e?"مسؤول النظام":"موظف مبيعات")};console.log("--- WhatsApp Server Debug ---");console.log("Configured URL:",window._waServerActiveUrl);console.log("-----------------------------");window.promoteToAdmin=async function(t){if(confirm("تأكيد ترقية الموظف لصلاحية مسؤول؟"))try{await admin.database().ref("users/"+t).update({role:"admin"}),window.showLuxuryToast("تم ترقية الموظف بنجاح"),window.syncAdminTables("users")}catch{window.showLuxuryToast("خطأ بالصلاحيات","error")}};window.FirebaseSDK={ref:C,db:A,push:F,set:q,update:j,remove:W,auth:H};
