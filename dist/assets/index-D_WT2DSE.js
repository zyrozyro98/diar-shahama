import{i as pe,g as ye,a as be,b as me,c as ve,d as he,s as xe,o as ke,r as B,e as Y,u as N,f as U,h as W,j as K,k as Ie,l as $e,p as F,m as Ee,n as de,q as Se,t as Te}from"./firebase-BfvlcbVS.js";import"./emoji-picker-CeBMFWb3.js";import"./vendor-Bg_btqvK.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(i){if(i.ep)return;i.ep=!0;const a=n(i);fetch(i.href,a)}})();const ge={apiKey:"AIzaSyDQodWTn2wa0WzQuHqzZt2Ex6CdnQdrlUU",authDomain:"onecar1.firebaseapp.com",projectId:"onecar1",storageBucket:"onecar1.firebasestorage.app",messagingSenderId:"735648367644",appId:"1:735648367644:web:44ae368553280b14bdcbd9",measurementId:"G-RSTPV8SRXT",databaseURL:"https://onecar1-default-rtdb.firebaseio.com"},V=pe(ge);ye(V);const L=be(V),Q=me(V);ve(V);he(V);window.state={cars:[],ads:[],bookings:[],users:[],notifications:[],logs:[],partners:[],locations:[],brands:[],agents:[],specs:[],packages:[],blogs:[],reviews:[],plates:[],sales:[],gearboxes:[],bodyTypes:[],engines:[],exteriorColors:[],interiorColors:[],stockStatuses:[],user:null,userProfile:null,settings:{enableTextGradient:!0,textGradColor1:"#c8a95e",textGradColor2:"#ffffff",enableTopbarGradient:!0,topbarGradColor1:"#907537",topbarGradColor2:"#05080c",enablePrimaryGradient:!0,primaryGradColor1:"#907537",primaryGradColor2:"#b39651",enableSecondaryGradient:!0,secondaryGradColor1:"#b39651",secondaryGradColor2:"#0f172a",enableAccentGradient:!0,accentGradColor1:"#c8a95e",accentGradColor2:"#ffd700"},lang:localStorage.getItem("luxury_lang")||"ar",soundEnabled:localStorage.getItem("luxury_sound_enabled")!=="false",tempImages:[],bookingFilter:"all",bookingSubStatusFilter:"all",currentReportPeriod:"day",firstLoadDone:!1,inventoryPage:1,inventorySize:8,sliderIndex:0};const Be={ar:{welcome:"مرحباً بك في عالم الفخامة",inventory:"مخزون السيارات المتاح",totalCars:"إجمالي السيارات",totalBookings:"إجمالي الطلبات",totalValue:"قيمة المخزون",searchPlaceholder:"ابحث عن سيارتك المثالية...",loading:"جاري التحميل...",noResults:"لم يتم العثور على نتائج تطابق بحثك",applyNow:"اطلبها الآن",details:"عرض التفاصيل",back:"رجوع",save:"حفظ",delete:"حذف",edit:"تعديل",cancel:"إلغاء",successMsg:"تمت العملية بنجاح",errorMsg:"حدث خطأ غير متوقع",staff:"قسم المبيعات والمتابعة",admin:"إدارة النظام",supervisor:"مشرف النظام"},en:{welcome:"Welcome to the World of Luxury",inventory:"Available Vehicle Inventory",totalCars:"Total Vehicles",totalBookings:"Total Bookings",totalValue:"Inventory Value",searchPlaceholder:"Search for your perfect car...",loading:"Loading...",noResults:"No results found matching your search",applyNow:"Request Now",details:"View Details",back:"Back",save:"Save",delete:"Delete",edit:"Edit",cancel:"Cancel",successMsg:"Operation successful",errorMsg:"An unexpected error occurred",staff:"Sales & Follow-up Department",admin:"System Administration",supervisor:"System Supervisor"}};window.showLuxuryToast=function(e,t="success"){const n=document.getElementById("toast-container");if(!n)return;const o=document.createElement("div");o.className=`toast-v2 ${t}`,o.style.cssText=`
    background: ${t==="success"?"rgba(16, 185, 129, 0.9)":"rgba(239, 68, 68, 0.9)"};
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
  `;const i=t==="success"?"fa-check-circle":"fa-exclamation-circle";o.innerHTML=`<i class="fas ${i}"></i> <span>${e}</span>`,n.appendChild(o),setTimeout(()=>{o.style.opacity="0",o.style.transform="translateY(-20px)",o.style.transition="all 0.4s ease-in",setTimeout(()=>o.remove(),400)},4e3)};window.compressImage=function(e,t=1e3,n=1e3,o=.6){return new Promise((i,a)=>{if(!e||!(e instanceof File||e instanceof Blob)){i(e);return}const r=new FileReader;r.readAsDataURL(e),r.onload=d=>{const s=new Image;s.src=d.target.result,s.onload=()=>{const l=document.createElement("canvas");let g=s.width,u=s.height;g>u?g>t&&(u*=t/g,g=t):u>n&&(g*=n/u,u=n),l.width=g,l.height=u,l.getContext("2d").drawImage(s,0,0,g,u);const m=e.type==="image/png"||e.type==="image/webp"?"image/webp":"image/jpeg";i(l.toDataURL(m,o))},s.onerror=a},r.onerror=a})};window.openModal=function(e){const t=document.getElementById(e);if(t){t.classList.remove("hidden"),document.body.style.overflow="hidden";const n=document.querySelectorAll(".modal:not(.hidden)");t.style.zIndex=2e3+n.length*10,Le(`modal-${e}`)}};window.closeModal=function(e,t=!1){var o;const n=document.getElementById(e);n&&(n.classList.add("hidden"),n.style.zIndex="",!t&&((o=history.state)==null?void 0:o.type)===`modal-${e}`&&history.back(),document.querySelector(".modal:not(.hidden)")||(document.body.style.overflow="auto"))};window.setModalTitle=function(e,t){const n=document.getElementById(e+"-title");n&&(n.innerText=t)};window.switchLuxuryTab=function(e){const t=document.querySelectorAll(".pane, .admin-tab-content"),n=document.querySelectorAll(".dash-tab, .admin-sidebar-nav li");t.forEach(r=>{r.classList.add("hidden"),r.classList.remove("active")}),n.forEach(r=>r.classList.remove("active"));const o=document.getElementById(e),i=document.querySelector(`[data-tab="${e}"]`);o&&(o.classList.remove("hidden"),o.classList.add("active"),o.style.animation="fade-up 0.5s ease-out forwards"),i&&i.classList.add("active");const a=document.getElementById("bookings-submenu");if(a&&a.classList.toggle("active",e==="bookings-mgmt"||e==="all-bookings"),window.innerWidth<1024){const r=document.querySelector(".dash-sidebar, .admin-sidebar-v2");r&&r.classList.remove("active")}e==="whatsapp-monitor-mgmt"&&window.initWhatsAppServer&&window.initWhatsAppServer(),e==="whatsapp-mgmt"&&window.startCurrentWASession(),e==="ads-mgmt"&&window.syncAdminTables("ads"),e==="quick-replies-mgmt"&&window.renderQuickRepliesAdmin&&window.renderQuickRepliesAdmin()};function Le(e){var t;((t=history.state)==null?void 0:t.type)!==e&&history.pushState({type:e},"")}window.normalizePhone=function(e){if(!e)return"";const t=e.toString().trim();if(t.includes("@s.whatsapp.net"))return t.split("@")[0].replace(/\D/g,"");if(t.includes("@lid"))return t;let n=t.replace(/\D/g,"");if(n.startsWith("9660")?n="966"+n.substring(4):n.startsWith("9670")&&(n="967"+n.substring(4)),n.startsWith("966")||n.startsWith("967"))return n;if(n.startsWith("05"))return"966"+n.substring(1);if(n.startsWith("07"))return"967"+n.substring(1);if(n.startsWith("0"))return"966"+n.substring(1);if(n.length===9){if(n.startsWith("7"))return"967"+n;if(n.startsWith("5"))return"966"+n}return n};document.addEventListener("DOMContentLoaded",()=>{Ae(),fe(),Me(),window.trackVisit(),Ce()});function Ce(){const e=document.querySelector(".mobile-btn"),t=document.querySelector(".nav-menu"),n=document.querySelector(".mobile-nav-overlay"),o=document.querySelector(".menu-close-btn"),i=(y=!1)=>{const k=y===!1?!t.classList.contains("active"):!1;t.classList.toggle("active",k),n.classList.toggle("active",k),document.body.style.overflow=k?"hidden":"";const f=e==null?void 0:e.querySelector("i");f&&(f.className=k?"fas fa-times":"fas fa-bars-staggered")};e&&(e.onclick=()=>i()),n&&(n.onclick=()=>i(!0)),o&&(o.onclick=()=>i(!0)),document.querySelectorAll(".nav-menu a").forEach(y=>{y.addEventListener("click",()=>i(!0))});const a=document.querySelector(".mobile-menu-header .dynamic-name-ar");a&&window.__DYNAMIC_NAME_AR__&&(a.innerText=window.__DYNAMIC_NAME_AR__);const r=document.getElementById("admin-trigger");r&&(r.onclick=y=>{y.preventDefault(),window.openModal("admin-modal")});const d=document.getElementById("theme-btn");d&&(d.onclick=()=>{const k=(document.body.getAttribute("data-theme")||"dark")==="dark"?"light":"dark";document.body.setAttribute("data-theme",k),localStorage.setItem("luxury_theme",k),localStorage.setItem("theme_manually_overridden","true"),d.innerHTML=k==="dark"?'<i class="fas fa-sun"></i>':'<i class="fas fa-moon"></i>'});const s=document.getElementById("lang-btn");s&&(s.onclick=()=>{window.state.lang=window.state.lang==="ar"?"en":"ar",localStorage.setItem("luxury_lang",window.state.lang),fe(),window.applyInventoryFilters(),s.innerText=window.state.lang==="ar"?"EN":"AR"}),document.querySelectorAll(".dash-tab").forEach(y=>{y.onclick=()=>window.switchLuxuryTab(y.dataset.tab)});const l=document.getElementById("car-search-input");l&&(l.oninput=()=>window.applyInventoryFilters()),["filter-make","filter-type","filter-year","filter-sort"].forEach(y=>{const k=document.getElementById(y);k&&(k.onchange=()=>{window.state.inventoryPage=1,window.applyInventoryFilters()})});const u=document.getElementById("p-prev"),c=document.getElementById("p-next");u&&(u.onclick=()=>window.moveLuxurySlider(-1)),c&&(c.onclick=()=>window.moveLuxurySlider(1)),setInterval(()=>{const y=document.getElementById("luxury-splash");(!y||y.classList.contains("hidden"))&&window.moveLuxurySlider(1)},5e3),["calc-car-price","calc-down-pay","calc-years"].forEach(y=>{const k=document.getElementById(y);k&&(k.oninput=()=>window.calculateLuxuryFinancing()),k&&k.tagName==="SELECT"&&(k.onchange=()=>window.calculateLuxuryFinancing())}),document.querySelectorAll(".modal-close").forEach(y=>{y.onclick=k=>{k.stopPropagation();const f=y.closest(".modal");if(f){if(f.id==="admin-modal"&&window.state.user&&!confirm("هل تريد الخروج من لوحة التحكم؟"))return;window.closeModal(f.id)}}}),window.onclick=y=>{const k=document.getElementById("wa-emoji-picker");if(k&&k.style.display!=="none"){const I=y.target.closest(".fa-smile")!==null,E=k.contains(y.target);!I&&!E&&(k.style.display="none")}const f=Array.from(document.querySelectorAll(".modal:not(.hidden)"));if(f.length>0){const I=f[f.length-1];if(y.target===I){if(I.id==="admin-modal"&&window.state.user&&!confirm("هل تريد الخروج من لوحة التحكم؟"))return;window.closeModal(I.id)}}},window.addEventListener("popstate",y=>{const k=document.querySelectorAll(".modal:not(.hidden)");k.length>0&&k.forEach(f=>{var I;((I=y.state)==null?void 0:I.type)!==`modal-${f.id}`&&window.closeModal(f.id,!0)})}),window.onscroll=()=>{const y=document.getElementById("main-nav");y&&y.classList.toggle("scrolled",window.scrollY>50);const k=document.getElementById("scroll-jump");k&&k.classList.toggle("hidden",window.scrollY<500)},document.getElementById("scroll-jump")&&(document.getElementById("scroll-jump").onclick=()=>window.scrollTo({top:0,behavior:"smooth"}));const $=document.getElementById("login-form");$&&($.onsubmit=y=>window.loginAdmin(y));const b=document.getElementById("booking-form");b&&(b.onsubmit=y=>window.submitBooking(y));const w=document.getElementById("item-form");w&&(w.onsubmit=y=>window.saveLuxuryItem(y))}function Ae(){const e=JSON.parse(localStorage.getItem("luxury-settings-cache")||"{}"),t=localStorage.getItem("theme_manually_overridden")==="true",n=(t?localStorage.getItem("luxury_theme"):e.defaultTheme)||"dark";t||localStorage.setItem("luxury_theme",n),document.body.setAttribute("data-theme",n);const o=document.getElementById("theme-btn");o&&(o.innerHTML=n==="dark"?'<i class="fas fa-sun"></i>':'<i class="fas fa-moon"></i>')}function fe(){const e=window.state.lang;document.body.dir=e==="ar"?"rtl":"ltr",document.body.classList.toggle("en",e==="en");const t=Be[e];document.querySelectorAll("[data-i18n]").forEach(n=>{const o=n.getAttribute("data-i18n");t[o]&&(n.innerText=t[o])})}async function Me(){await xe(Q,Te);const e=["users","plates","locations","brands","agents","specs","packages","blogs","reviews","cars","ads","sales","settings","partners","custom_presets","gearboxes","bodyTypes","engines","exteriorColors","interiorColors","stockStatuses"],t=["bookings","notifications","logs","quickReplies"],n={};function o(i){n[i]||(n[i]=Y(B(L,i),a=>{var d,s;const r=a.val();if(i==="settings")window.state.settings=r||{},window.applySettings(r);else{const l=window.state[i]||[],g=r?Object.entries(r).map(([u,c])=>({...c,id:u})):[];if(window.state[i]=g,i==="cars"&&window.applyInventoryFilters(),i==="ads"&&window.renderAdsSlider(),i==="sales"&&window.renderSalesVideos(),i==="partners"&&window.renderPartners(),i==="reviews"&&window.renderPublicReviews(),i==="custom_presets"&&window.renderCustomPresets(),i==="notifications"&&window.state.user&&window.state.firstLoadDone){const u=((d=window.state.userProfile)==null?void 0:d.role)==="admin"||((s=window.state.userProfile)==null?void 0:s.role)==="supervisor",c=b=>b.filter(w=>!w.read&&(u||w.userId===window.state.user.uid||w.assignedTo===window.state.user.uid)),m=c(l).length;c(g).length>m&&window.playNotificationSound&&window.playNotificationSound()}window.state.user&&(window.syncAdminTables(i),window.updateStatistics())}Re()},a=>{console.warn(`Listener for ${i} failed:`,a.message),delete n[i]}))}ke(Q,async i=>{if(window.state.user=i,i){const a=B(L,`users/${i.uid}`);Y(a,r=>{window.state.userProfile={...r.val(),id:i.uid},ce(),window.initWhatsAppServer&&window.initWhatsAppServer()}),t.forEach(o)}else window.state.userProfile=null,ce(),t.forEach(a=>{n[a]&&delete n[a]})}),e.forEach(o)}function Re(){var o,i;if(window.state.firstLoadDone)return;const e=window.state.settings,t=e==null?void 0:e.maintenanceMode,n=((o=window.state.userProfile)==null?void 0:o.role)==="admin"||((i=window.state.userProfile)==null?void 0:i.role)==="supervisor";if(t&&!n){const a=document.getElementById("luxury-splash");a&&(a.innerHTML=`
            <div class="maint-content" style="text-align:center; color:white; padding: 20px;">
                <i class="fas fa-tools" style="font-size:60px; color:var(--p-red); margin-bottom:20px;"></i>
                <h1 class="luxury-font" style="margin-bottom:10px;">الموقع تحت الصيانة</h1>
                <p style="opacity:0.8;">نعمل حالياً على تحديث المنصة لتقديم تجربة أفضل، سنعود قريباً جداً.</p>
                <div style="margin-top:30px;">
                    <button class="btn-premium btn-sm" onclick="window.openModal('admin-modal')">دخول الإدارة</button>
                </div>
            </div>
          `,a.style.opacity="1",a.classList.remove("hidden"));return}e&&Object.keys(e).length>0&&setTimeout(()=>{const a=document.getElementById("luxury-splash");a&&(a.style.opacity="0",setTimeout(()=>{a.classList.add("hidden"),a.remove()},800)),window.state.firstLoadDone=!0},1200)}function ce(){var r,d,s;const e=!!window.state.user,t=((r=window.state.userProfile)==null?void 0:r.role)==="admin",n=((d=window.state.userProfile)==null?void 0:d.role)==="supervisor";document.body.classList.toggle("is-logged-in",e),document.body.classList.toggle("is-admin",t),document.body.classList.toggle("is-supervisor",n);const o=document.getElementById("admin-login-ui"),i=document.getElementById("admin-dash-ui");o&&o.classList.toggle("hidden",e),i&&i.classList.toggle("hidden",!e);const a=document.getElementById("admin-trigger");if(a&&(a.innerText=e?"لوحة التحكم":"تسجيل الدخول"),document.querySelectorAll(".admin-only").forEach(l=>l.classList.toggle("hidden",!t&&!n)),document.querySelectorAll(".supervisor-only").forEach(l=>l.classList.toggle("hidden",!n&&!t)),document.querySelectorAll(".admin-strictly").forEach(l=>l.classList.toggle("hidden",!t)),document.querySelectorAll(".staff-only").forEach(l=>l.classList.toggle("hidden",t||n)),e){window.syncAdminTables("all"),window.updateStatistics();const l=document.getElementById("user-display-name"),g=document.getElementById("user-role-label");if(l&&(l.innerText=((s=window.state.userProfile)==null?void 0:s.name)||(t?"المسؤول العام":n?"المشرف العام":"الموظف")),g){let c="قسم المبيعات والمتابعة";t?c="إدارة النظام (Admin)":n&&(c="إدارة الرقابة والإشراف (Supervisor)"),g.innerText=c}const u=document.querySelector(".dash-tab.active");if(!u||u.classList.contains("hidden")){let c="bookings-mgmt";n&&(c="supervisor-dash");const m=document.querySelector(`.dash-tab[data-tab="${c}"]`);m&&m.click()}(n||t)&&(window.renderSupervisorStaffList(),window.populateStaffMonitorSelect())}}window.handleSupervisorExport=async function(e){var g,u,c;const t=document.getElementById("sup-export-type").value,n=document.getElementById("sup-export-start").value,o=document.getElementById("sup-export-end").value;let i=window.state[t]||[];Array.isArray(i)||(i=Object.values(i));let a=i;if(n||o){const m=n?new Date(n):new Date(0),$=o?new Date(o):new Date;$.setHours(23,59,59,999),a=i.filter(b=>{const w=b.createdAt||b.timestamp||0,y=new Date(w);return y>=m&&y<=$})}if(a.length===0){window.showLuxuryToast("لا توجد بيانات للفترة المحددة","warning");return}const d={cars:{make:"الماركة",model:"الموديل",year:"السنة",price:"السعر",monthlyInstallment:"القسط الشهري",color:"اللون الخارجى",interiorColor:"اللون الداخلى",mileage:"الممشى",engine:"المحرك",gearbox:"ناقل الحركة",fuelType:"نوع الوقود",status:"الحالة",createdAt:"تاريخ الإضافة"},bookings:{name:"اسم العميل",phone:"رقم الجوال",carRequested:"السيارة المطلوبة",city:"المدينة",nationality:"الجنسية",paymentMethod:"طريقة الشراء",salary:"الراتب",status:"الحالة",subStatus:"الحالة الفرعية",createdAt:"تاريخ الطلب",assignedTo:"الموظف المسؤول"},users:{name:"الاسم",email:"البريد الإلكتروني",role:"الدور",isAvailable:"متاح للاستلام",createdAt:"تاريخ الإنشاء"}}[t]||{},s=Object.keys(d),l=a.map(m=>{const $={};return s.forEach(b=>{let w=m[b];if(b==="createdAt"||b==="timestamp"||b==="lastLogin")w=w?new Date(w).toLocaleString("ar-SA"):"";else if(b==="assignedTo"&&w){const y=(window.state.users||[]).find(k=>k.id===w);w=y?y.name||y.email:w}else b==="status"?w={available:"متاح",reserved:"محجوز",sold:"مباع",incoming:"قادم قريباً",new:"جديد",done:"تم",cancelled:"ملغى",rejected:"مرفوض"}[w]||w:b==="isAvailable"&&(w=w?"نعم":"لا");$[d[b]]=w??""}),$});if(l.length===0||Object.keys(l[0]).length===0){window.showLuxuryToast("خطأ في معالجة البيانات للتصدير","error");return}if(e==="xlsx"){const m=XLSX.utils.json_to_sheet(l);m["!views"]=[{RTL:!0}];const $=Object.keys(l[0]).map(()=>({wch:20}));m["!cols"]=$;const b=XLSX.utils.book_new();XLSX.utils.book_append_sheet(b,m,"التقرير"),XLSX.writeFile(b,`تقرير_${t}_${new Date().toLocaleDateString("ar-EG").replace(/\//g,"-")}.xlsx`),window.showLuxuryToast("تم تصدير ملف Excel بنجاح"),window.createLog("تصدير بيانات",`تصدير تقرير ${t} بصيغة Excel`,"data")}else if(e==="pdf"){window.showLuxuryToast("جاري معالجة ملف PDF...");const m=document.createElement("div");m.style.position="absolute",m.style.top="-9999px",m.style.width="1000px",m.style.direction="rtl",m.style.fontFamily="'Cairo', sans-serif",m.style.padding="30px",m.style.background="#fff",m.style.color="#111";const $=a.length,b=n||o?`الفترة من: ${n||"البداية"} إلى: ${o||"اليوم"}`:"كافة البيانات",w=((g=window.state.settings)==null?void 0:g.logo)||"logo.jpg",y=Object.keys(l[0]);let k=`
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:3px solid #a11d21; padding-bottom:20px; margin-bottom:30px;">
        <div style="text-align:right;">
          <h1 style="color:#a11d21; margin:0; font-size:28px;">${((u=window.state.settings)==null?void 0:u.nameAr)||"ديار الشهامة"}</h1>
          <p style="margin:5px 0; opacity:0.7;">تقرير إداري مفصل - ${t==="cars"?"مخزون السيارات":t==="bookings"?"سجل الحجوزات":"قائمة الموظفين"}</p>
          <p style="font-size:12px; font-weight:bold;">${b}</p>
        </div>
        <img src="${w}" style="height:80px; width:auto; object-fit:contain;">
      </div>

      <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:20px; margin-bottom:30px;">
        <div style="background:#f9fafb; padding:15px; border-radius:10px; border:1px solid #eee;">
          <small style="color:#666;">إجمالي السجلات</small>
          <div style="font-size:20px; font-weight:bold; color:#a11d21;">${$}</div>
        </div>
        <div style="background:#f9fafb; padding:15px; border-radius:10px; border:1px solid #eee;">
          <small style="color:#666;">تاريخ الاستخراج</small>
          <div style="font-size:14px; font-weight:bold;">${new Date().toLocaleString("ar-SA")}</div>
        </div>
        <div style="background:#f9fafb; padding:15px; border-radius:10px; border:1px solid #eee;">
          <small style="color:#666;">المصدر</small>
          <div style="font-size:14px; font-weight:bold;">نظام ديار كار السحابي</div>
        </div>
      </div>

      <table style="width:100%; border-collapse:collapse; text-align:right; font-size:10px;">
        <thead>
          <tr style="background:#a11d21; color:white;">
            ${y.map(I=>`<th style="padding:10px 5px; border:1px solid #a11d21; white-space:nowrap;">${I}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${l.map((I,E)=>`
            <tr style="background:${E%2===0?"#fff":"#fcfcfc"};">
              ${y.map(T=>`<td style="padding:8px 5px; border:1px solid #eee;">${I[T]}</td>`).join("")}
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div style="margin-top:40px; border-top:1px solid #eee; padding-top:10px; font-size:10px; color:#999; text-align:center;">
        هذا التقرير تم توليده آلياً من لوحة تحكم المشرف. جميع الحقوق محفوظة لشركة ${((c=window.state.settings)==null?void 0:c.nameAr)||"ديار كار"}.
      </div>
    `;m.innerHTML=k,document.body.appendChild(m);const f={margin:[10,10],filename:`تقرير_${t}_${new Date().toLocaleDateString("ar-EG").replace(/\//g,"-")}.pdf`,image:{type:"jpeg",quality:1},html2canvas:{scale:2,useCORS:!0,letterRendering:!0},jsPDF:{unit:"mm",format:"a4",orientation:"landscape"}};html2pdf().set(f).from(m).save().then(()=>{document.body.removeChild(m),window.showLuxuryToast("تم استخراج التقرير بنجاح"),window.createLog("تصدير بيانات",`تصدير تقرير ${t} بصيغة PDF`,"data")}).catch(I=>{console.error(I),window.showLuxuryToast("خطأ أثناء استخراج PDF","error"),m.parentNode&&document.body.removeChild(m)})}};window.populateStaffMonitorSelect=function(){const e=document.getElementById("sup-monitor-staff-select");if(!e)return;const t=window.state.users.filter(n=>n.role==="staff");e.innerHTML='<option value="">-- اختر موظف --</option>'+t.map(n=>`<option value="${n.id}">${n.name||n.email}</option>`).join("")};window.monitorStaffChats=function(e){const t=document.getElementById("monitor-active-chats-list"),n=document.getElementById("monitor-chat-body"),o=document.getElementById("monitor-chat-header");if(!t||!n||!o)return;if(!e){t.innerHTML="",n.innerHTML="",o.innerText="اختر محادثة لبدء المراقبة";return}t.innerHTML='<div class="loading-v2">جاري جلب المحادثات...</div>';const i=B(L,"chats"),a=query(i,orderByChild("assignedTo"),equalTo(e));Y(a,r=>{const d=[];if(r.forEach(s=>{d.push({id:s.key,...s.val()})}),d.length===0){t.innerHTML='<div class="no-data">لا توجد محادثات نشطة لهذا الموظف</div>';return}t.innerHTML=d.map(s=>`
      <div class="monitor-chat-item" onclick="window.viewMonitorChat('${s.id}', '${s.customerName||s.customerPhone}')">
        <div class="m-chat-info">
          <strong>${s.customerName||"عميل"}</strong>
          <span>${s.customerPhone||""}</span>
        </div>
        <div class="m-chat-meta">
          <small>${new Date(s.lastMessageTime).toLocaleTimeString()}</small>
        </div>
      </div>
    `).join("")})};window.viewMonitorChat=function(e,t){const n=document.getElementById("monitor-chat-body"),o=document.getElementById("monitor-chat-header");if(!n||!o)return;o.innerText=`مراقبة: ${t}`,n.innerHTML='<div class="loading-v2">جاري تحميل الرسائل...</div>';const i=B(L,`messages/${e}`);Y(i,a=>{const r=[];a.forEach(d=>r.push(d.val())),n.innerHTML=r.map(d=>`
      <div class="chat-msg ${d.sender==="staff"?"sent":"received"}">
        <div class="msg-bubble">
          <p>${d.text}</p>
          <small>${new Date(d.timestamp).toLocaleTimeString()}</small>
        </div>
      </div>
    `).join(""),n.scrollTop=n.scrollHeight})};window.renderSupervisorStaffList=function(){const e=document.getElementById("supervisor-staff-list-v2");if(!e)return;const t=(window.state.users||[]).filter(o=>o.role==="staff"),n=window.state.bookings||[];if(t.length===0){e.innerHTML='<tr><td colspan="6" style="text-align:center; padding:30px; opacity:0.5;">لا يوجد موظفين مسجلين حالياً</td></tr>';return}e.innerHTML=t.map((o,i)=>{const a=n.filter(g=>g.assignedTo===o.id),r=a.filter(g=>g.status==="sold"||g.status==="done").length,d=a.length>0?Math.round(r/a.length*100):0,l=(o.phone||"").replace(/\D/g,"");return`
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
    `}).join("")};window.showStaffStats=function(e){const t=(window.state.users||[]).find(u=>u.id===e);if(!t)return;document.querySelectorAll(".staff-table tr").forEach(u=>u.classList.remove("selected"));const n=document.getElementById(`staff-row-${e}`);n&&n.classList.add("selected");const o=document.getElementById("staff-details-panel"),i=document.getElementById("staff-stats-grid"),a=document.getElementById("detail-staff-name"),r=document.getElementById("detail-staff-email"),d=document.getElementById("detail-staff-avatar");if(!o||!i)return;o.style.display="block",a.innerText=t.name||t.email,r.innerText=t.email,d.innerText=(t.name||"S")[0];const s=(window.state.bookings||[]).filter(u=>u.assignedTo===e),l={total:s.length,new:s.filter(u=>u.status==="new").length,waiting:s.filter(u=>u.status==="waiting").length,sold:s.filter(u=>u.status==="sold").length,cancelled:s.filter(u=>u.status==="cancelled").length,done:s.filter(u=>u.status==="done").length},g={total:{t:"إجمالي الطلبات",i:"fa-list",c:"var(--p-gold)"},new:{t:"طلبات جديدة",i:"fa-star",c:"#3b82f6"},waiting:{t:"بانتظار الإجراء",i:"fa-clock",c:"#f59e0b"},sold:{t:"تم المبايعة",i:"fa-check-circle",c:"#10b981"},cancelled:{t:"طلبات مرفوضة",i:"fa-times-circle",c:"#ef4444"},done:{t:"مكتملة",i:"fa-flag-checkered",c:"#8b5cf6"}};i.innerHTML=Object.keys(l).map(u=>`
    <div class="mini-stat-box">
        <i class="fas ${g[u].i}" style="color:${g[u].c}; margin-bottom:8px; font-size:18px;"></i>
        <label>${g[u].t}</label>
        <strong>${l[u]}</strong>
    </div>
  `).join(""),o.scrollIntoView({behavior:"smooth",block:"nearest"})};window.updateStaffName=async function(e){const t=prompt("أدخل الإسم الجديد للموظف:");if(t)try{await N(B(L,`users/${e}`),{name:t}),window.showLuxuryToast("تم تحديث الإسم بنجاح"),window.renderSupervisorStaffList()}catch{window.showLuxuryToast("خطأ في التحديث","error")}};window.deleteStaff=async function(e){if(confirm("هل أنت متأكد من حذف هذا الموظف؟ لن يتمكن من تسجيل الدخول بعد الآن."))try{await U(B(L,`users/${e}`)),window.showLuxuryToast("تم حذف الموظف من النظام"),window.renderSupervisorStaffList()}catch{window.showLuxuryToast("خطأ في الحذف","error")}};window.toggleAvailability=async function(){if(!window.state.userProfile)return;const e=window.state.userProfile.isAvailable||!1;try{await N(B(L,`users/${window.state.user.uid}`),{isAvailable:!e}),window.state.userProfile.isAvailable=!e,window.showLuxuryToast(e?"تم تعيين الحالة: غير متاح":"أنت متاح الآن لاستلام الطلبات"),window.updateStatistics()}catch{window.showLuxuryToast("فشل تحديث الحالة","error")}};window.toggleSound=function(){window.state.soundEnabled=!window.state.soundEnabled,localStorage.setItem("luxury_sound_enabled",window.state.soundEnabled);const e=document.getElementById("sound-toggle");e&&(e.checked=window.state.soundEnabled),window.showLuxuryToast(window.state.soundEnabled?"تم تفعيل التنبيهات الصوتية":"تم كتم التنبيهات")};window.setBookingFilter=function(e,t,n="all",o=null){window.state.bookingFilter=e,window.state.bookingSubStatusFilter=n;const i=document.getElementById("filter-booking-status");i&&i.value!==e&&(i.value=e);const a=document.getElementById("filter-booking-sub-status");if(a){const r={new:["not_contacted","contacted"],waiting:["docs_received","waiting_calc","waiting_docs","waiting_signature"],inquiry:["docs_not_received"],sold:["signed","delivered"],done:["done"],cancelled:["no_response","obligations","calc_rejected","ineligible","duplicate"]},d={not_contacted:"لم يتم التواصل",contacted:"تم التواصل",docs_received:"تم استلام الاوراق",waiting_calc:"انتظار رد العميل",waiting_docs:"إنتظار إكمال الاوراق",waiting_signature:"إنتظار توقيع العميل",docs_not_received:"لم يتم استلام الاوراق",signed:"تم التوقيع",delivered:"تم التسليم",done:"تم",no_response:"لم يتم رد العميل",obligations:"التزامات",calc_rejected:"رفض الحسبة",ineligible:"غير مسموح له",duplicate:"مكرر"};let s=e==="all"?Object.keys(d):r[e]||[];a.innerHTML='<option value="all">جميع الحالات الفرعية</option>',s.forEach(l=>{const g=document.createElement("option");g.value=l,g.textContent=d[l],a.appendChild(g)}),Array.from(a.options).some(l=>l.value===n)?a.value=n:(a.value="all",window.state.bookingSubStatusFilter="all",n="all")}document.querySelectorAll(".sub-tab.b-filter").forEach(r=>{if(r.getAttribute("onclick")&&r.getAttribute("onclick").includes(`'${e}'`)){document.querySelectorAll(".sub-tab.b-filter").forEach(s=>s.classList.remove("active")),r.classList.add("active"),document.querySelectorAll(".deep-submenu").forEach(s=>s.classList.remove("active"));const d=r.closest(".status-group");if(d){const s=d.querySelector(".deep-submenu");s&&s.classList.add("active")}}}),document.querySelectorAll(".deep-tab").forEach(r=>{r.classList.remove("active"),n!=="all"&&r.getAttribute("onclick")&&r.getAttribute("onclick").includes(`'${n}'`)&&r.classList.add("active")}),window.syncAdminTables("bookings")};window.applyInventoryFilters=function(){var w,y,k,f,I,E,T;if(!document.getElementById("cars-container"))return;const t=document.getElementById("filter-make"),n=document.getElementById("filter-year");t&&t.options.length<=1&&[...new Set(window.state.cars.map(v=>v.make))].sort().forEach(v=>{const S=document.createElement("option");S.value=v,S.textContent=v,t.appendChild(S)}),n&&n.options.length<=1&&[...new Set(window.state.cars.map(v=>v.year))].filter(Boolean).sort((v,S)=>S-v).forEach(v=>{const S=document.createElement("option");S.value=v,S.textContent=v,n.appendChild(S)});const o=document.getElementById("filter-type");if(o&&o.options.length<=1){const p={sedan:"سيدان",suv:"SUV",coupe:"كوبيه",luxury:"فاخرة",pickup:"بيك آب"};[...new Set(window.state.cars.map(S=>S.bodyType))].filter(Boolean).sort().forEach(S=>{const x=document.createElement("option");x.value=S,x.textContent=p[S]||S,o.appendChild(x)})}const i=(((w=document.getElementById("car-search-input"))==null?void 0:w.value)||"").toLowerCase(),a=((y=document.getElementById("filter-make"))==null?void 0:y.value)||"all",r=((k=document.getElementById("filter-type"))==null?void 0:k.value)||"all",d=((f=document.getElementById("filter-year"))==null?void 0:f.value)||"all",s=((I=document.getElementById("filter-sort"))==null?void 0:I.value)||"newest";let l=((E=window.state.cars)==null?void 0:E.filter(p=>{const v=!i||(p.make+" "+p.model).toLowerCase().includes(i),S=a==="all"||p.make===a,x=r==="all"||p.bodyType===r,h=d==="all"||p.year===d;return v&&S&&x&&h}))||[];s==="price-asc"?l.sort((p,v)=>(Number(p.price)||0)-(Number(v.price)||0)):s==="price-desc"?l.sort((p,v)=>(Number(v.price)||0)-(Number(p.price)||0)):s==="year-asc"?l.sort((p,v)=>(Number(p.year)||0)-(Number(v.year)||0)):l.sort((p,v)=>new Date(v.createdAt||0)-new Date(p.createdAt||0));const g=((T=window.state.cars)==null?void 0:T.filter(p=>p.isFeatured).slice(0,3))||[];ze(g.length>0?g:window.state.cars.slice(0,3));const u=l.length,c=window.state.inventoryPage||1,m=window.state.inventorySize||8,$=(c-1)*m,b=l.slice($,$+m);renderCarGrid(b),De(u,c,m)};function ze(e){const t=document.getElementById("featured-offers-container");if(!t||!e.length)return;const n=document.getElementById("featured-offers-section");n&&(n.style.display="block"),t.innerHTML=e.map(o=>`
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
    `).join("")}function De(e,t,n){const o=document.getElementById("pagination-wrap");if(!o)return;const i=Math.ceil(e/n);if(i<=1){o.innerHTML="";return}let a="";t>1&&(a+=`<button class="p-btn nav-dir" onclick="window.state.inventoryPage=${t-1}; window.applyInventoryFilters(); window.scrollTo({top: document.getElementById('inventory').offsetTop - 100, behavior:'smooth'})"><i class="fas fa-chevron-right"></i> السابق</button>`);for(let r=1;r<=i;r++)a+=`<button class="p-btn ${r===t?"active":""}" onclick="window.state.inventoryPage=${r}; window.applyInventoryFilters(); window.scrollTo({top: document.getElementById('inventory').offsetTop - 100, behavior:'smooth'})">${r}</button>`;t<i&&(a+=`<button class="p-btn nav-dir" onclick="window.state.inventoryPage=${t+1}; window.applyInventoryFilters(); window.scrollTo({top: document.getElementById('inventory').offsetTop - 100, behavior:'smooth'})">التالي <i class="fas fa-chevron-left"></i></button>`),o.innerHTML=a}window.renderPartners=function(){const e=document.getElementById("front-partners-grid");!e||!window.state.partners||(e.innerHTML=window.state.partners.map(t=>`
    <div class="partner-logo-v2">
        <img src="${t.logo}" alt="${t.name}" title="${t.name}">
    </div>
  `).join(""))};window.renderPublicReviews=function(){const e=document.getElementById("public-reviews-container");if(!(!e||!window.state.reviews)){if(window.state.reviews.length===0){e.innerHTML='<div class="no-results-v2"><p>لا توجد آراء عملاء حالياً</p></div>';return}e.innerHTML=window.state.reviews.map(t=>{const n=t.avatar||t.image||"",o=t.name||"عميل غير معروف",i=t.car?`<span> اشترى <span style="color:var(--p-copper); font-weight:bold;">${t.car}</span></span>`:'<span>عميل مُحقّق <i class="fas fa-check-circle"></i></span>';return`
    <div class="review-card-v2" data-aos="zoom-in">
        <div class="review-stars">
            ${'<i class="fas fa-star"></i>'.repeat(Number(t.rating||5))}
        </div>
        <p class="review-text">"${t.text||"لا يوجد تعليق"}"</p>
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
  `}).join("")}};window.renderCarGrid=function(e){const t=document.getElementById("cars-container");if(t){if(e.length===0){t.innerHTML='<div class="no-results-v2"><i class="fas fa-search"></i> <p>لم يتم العثور على سيارات تطابق بحثك</p></div>';return}t.innerHTML=e.map(n=>`
    <div class="car-card-premium" onclick="window.viewLuxuryCar('${n.id}')" data-aos="fade-up">
      <div class="car-img-wrap">
        <img src="${n.image||"logo.jpg"}" alt="${n.make}" loading="lazy" onerror="this.src='logo.jpg'">
        <div class="car-price-v3">${n.price?`${Number(n.price).toLocaleString()} <small>ريال</small>`:n.monthlyInstallment?`قسط من: ${Number(n.monthlyInstallment).toLocaleString()} <small>ريال</small>`:"عند التواصل"}</div>
        <div class="car-badge-v3 ${n.status==="available"?"available":n.status==="reserved"?"reserved":n.status==="sold"?"sold":"custom"}">
          ${n.status==="available"?"متاح":n.status==="reserved"?"محجوز":n.status==="sold"?"مباع":n.status||"متاح"}
        </div>
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
  `).join("")}};window.viewLuxuryCar=function(e){const t=window.state.cars.find(s=>s.id===e);if(!t||!document.getElementById("details-modal"))return;let o=t.images||[];o.length===0&&t.image&&(o=[t.image]),o.length===0&&(o=["logo.jpg"]),window.normalizePhone(window.state.settings.contactSales||"0500000000");const i=t.price?`${Number(t.price).toLocaleString()} ريال`:"عند التواصل",a=t.monthlyInstallment?`
*القسط الشهري يبدأ من:* ${Number(t.monthlyInstallment).toLocaleString()} ريال`:"";`${t.make}${t.model}${t.year}${i}${a}${window.location.origin}${t.id}`;const r=`
    <div class="details-luxury-container animate-fade-in-v2">
      <!-- Top Header Section -->
      <div class="details-top-v4">
        <div class="details-header-v3">
          <div class="d-badge-row">
            <span class="badge-v3 year">${t.year}</span>
            ${t.isFeatured?'<span class="badge-v3 featured"><i class="fas fa-crown"></i> عرض مميز</span>':""}
            ${t.status==="available"?'<span class="badge-v3 status available">متاح حالياً</span>':t.status==="reserved"?'<span class="badge-v3 status reserved">محجوز</span>':'<span class="badge-v3 status sold">مباع</span>'}
          </div>
          <h1 class="luxury-font">${t.make} ${t.model}</h1>
          <p class="car-subtitle-v5">${t.engine||""} | ${t.gearbox||""} | ${t.fuelType||""}</p>
        </div>
        <div class="price-premium-v6">
          <div class="p-header">سعر الكاش</div>
          <div class="p-main">
            <span class="p-amount">${t.price?Number(t.price).toLocaleString():"عند التواصل"}</span>
            <span class="p-curr">${t.price?"ريال":""}</span>
          </div>
          ${t.monthlyInstallment?`
            <div class="p-header" style="margin-top:12px; border-top:1px solid rgba(255,255,255,0.1); padding-top:8px;">قسط شهري يبدأ من</div>
            <div class="p-main-sm" style="font-size:22px; color:var(--p-copper); font-weight:800;">
              ${Number(t.monthlyInstallment).toLocaleString()} <span style="font-size:12px; font-weight:400; opacity:0.8;">ريال / شهرياً</span>
            </div>
          `:""}
          <div class="VAT-hint">${t.price?"السعر شامل ضريبة القيمة المضافة":""}</div>
        </div>
      </div>

      <div class="details-main-split">
        <div class="details-media">
          <div class="main-viewer" onclick="window.openFullscreenGallery('${t.id}', document.getElementById('active-luxury-img').src)">
            <img src="${o[0]}" id="active-luxury-img" alt="${t.make} ${t.model}" onerror="this.src='logo.jpg'">
            <div class="viewer-actions">
              <button class="viewer-btn" onclick="event.stopPropagation(); window.switchLuxuryDetailImg('${t.id}', -1)"><i class="fas fa-chevron-right"></i></button>
              <button class="viewer-btn" onclick="event.stopPropagation(); window.switchLuxuryDetailImg('${t.id}', 1)"><i class="fas fa-chevron-left"></i></button>
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
               <div class="s-info"><span>الممشى</span><strong>${(Number(t.mileage)||0).toLocaleString()} كم</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-calendar-alt"></i>
               <div class="s-info"><span>الموديل</span><strong>${t.year}</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-fill-drip"></i>
               <div class="s-info"><span>اللون الخارجي</span><strong>${t.color||"غير محدد"}</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-palette"></i>
               <div class="s-info"><span>اللون الداخلي</span><strong>${t.interiorColor||"غير محدد"}</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-gas-pump"></i>
               <div class="s-info"><span>الوقود</span><strong>${t.fuelType||"بنزين"}</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-cog"></i>
               <div class="s-info"><span>الجير</span><strong>${t.gearbox||"أوتوماتيكي"}</strong></div>
            </div>
             <div class="spec-card-v5">
               <i class="fas fa-car-side"></i>
               <div class="s-info"><span>الفئة</span><strong>${t.bodyType||"فاخرة"}</strong></div>
            </div>
             <div class="spec-card-v5">
               <i class="fas fa-shield-alt"></i>
               <div class="s-info"><span>الحالة</span><strong>${t.status==="available"?"متاح":t.status==="sold"?"مباع":t.status==="reserved"?"محجوز":t.status||"متاح"}</strong></div>
            </div>
          </div>

          <div class="desc-card-v5" id="luxury-car-desc-container">
            <h3><i class="fas fa-list-ul"></i> وصف ومميزات السيارة</h3>
            <div class="desc-text-v5 custom-scrollbar" id="luxury-desc-body">
              ${(t.desc||t.description||t.details||"سيارة بحالة الوكالة...").replace(/\n/g,"<br>")}
            </div>
          </div>

          <div class="details-footer-actions-v3">
              <button onclick="window.bookCar('${t.id}')" class="btn-luxury-v2 wa-btn">
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
  `,d=document.getElementById("details-modal-body");if(d){d.innerHTML=r,d.scrollTop=0;const s=document.getElementById("details-modal");if(s){s.scrollTop=0;const l=s.querySelector(".modal-inner");l&&(l.scrollTop=0)}window.openModal("details-modal")}window.trackCarView(e)};window.bookCar=function(e){const t=(window.state.cars||[]).find(o=>o.id===e);if(!t)return;const n=document.getElementById("b-car");n&&(n.value=`${t.make} ${t.model} ${t.year}`),window.closeModal("details-modal"),setTimeout(()=>{const o=document.getElementById("booking");o&&(o.scrollIntoView({behavior:"smooth",block:"start"}),n&&(n.focus(),n.classList.add("input-highlight"),setTimeout(()=>n.classList.remove("input-highlight"),3e3)))},300)};window.viewBookingDetails=function(e){var a;const t=(window.state.bookings||[]).find(r=>r.id===e);if(!t)return;(a=window.state.users.find(r=>r.id===t.assignedTo))!=null&&a.name,t.status==="sold"||t.status==="available"||t.status==="rejected"||t.status,t.status==="sold"||t.status;const n={new:"جديد",waiting:"بالانتظار",inquiry:"استفسار",sold:"مكتمل",rejected:"مرفوض",available:"متاح"},o=`
    <div class="booking-modal-layout details-luxury-container" style="direction: rtl;">
      
      <!-- القسم الأيمن: تفاصيل الحجز -->
      <div class="details-info-v4 custom-scrollbar">
        <div class="p-header" style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:25px;">
           <div>
              <h2 style="margin:0; font-size:28px; color:var(--text-main); font-weight:800;">${t.name||"عميل مجهول"}</h2>
              <p style="margin:5px 0 0; color:var(--text-dim); display:flex; align-items:center; gap:8px;">
                <i class="fas fa-phone-alt" style="font-size:12px; color:var(--p-copper);"></i> ${t.phone}
              </p>
           </div>
           <div class="status-badge-v3" style="background:var(--bg-card); padding:8px 16px; border-radius:12px; border:1px solid var(--glass-border); text-align:center;">
              <span style="display:block; font-size:10px; color:var(--text-dim); text-transform:uppercase;">حالة الطلب الحالية</span>
              <strong style="color:var(--p-copper); font-size:14px;">${n[t.status]||t.status}</strong>
           </div>
        </div>

        <div class="details-grid-lite" style="display:grid; grid-template-columns: repeat(2, 1fr); gap:20px; margin-bottom:30px;">
            <div class="d-item" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:15px; border:1px solid var(--glass-border);">
                <span style="display:block; font-size:11px; color:var(--text-dim); margin-bottom:5px;">السيارة المطلوبة</span>
                <strong style="font-size:15px; color:var(--p-copper);"><i class="fas fa-car" style="margin-left:8px;"></i>${t.carRequested||"غير محدد"}</strong>
            </div>
            <div class="d-item" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:15px; border:1px solid var(--glass-border);">
                <span style="display:block; font-size:11px; color:var(--text-dim); margin-bottom:5px;">تاريخ الطلب</span>
                <strong style="font-size:14px;"><i class="far fa-calendar-alt" style="margin-left:8px;"></i>${new Date(t.createdAt).toLocaleDateString("ar-SA")}</strong>
            </div>
        </div>

        <div class="update-section" style="background:rgba(255,255,255,0.03); padding:20px; border-radius:20px; border:1px solid var(--glass-border);">
            <h4 style="margin:0 0 15px; font-size:16px; font-weight:700;"><i class="fas fa-edit" style="margin-left:10px; color:var(--p-copper);"></i>تحديث حالة المتابعة</h4>
            
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; margin-bottom:15px;">
                <div class="f-group">
                    <label style="font-size:12px; color:var(--text-dim); margin-bottom:6px; display:block;">الحالة العامة</label>
                    <select id="update-booking-status" onchange="window.updateSubStatusOptions(this.value)" style="width:100%; border-radius:10px; padding:10px; background:var(--bg-alt); border:1px solid var(--glass-border); color:var(--text-main); font-family:inherit;">
                        ${Object.entries(n).map(([r,d])=>`<option value="${r}" ${r===(t.status||"new")?"selected":""}>${d}</option>`).join("")}
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
                <textarea id="update-booking-details" style="width:100%; min-height:80px; border-radius:12px; padding:12px; background:var(--bg-alt); border:1px solid var(--glass-border); color:var(--text-main); font-family:inherit; resize:vertical;">${t.additionalDetails||""}</textarea>
            </div>

            <button onclick="window.updateBookingQuickStatus('${t.id}')" class="btn-premium" style="width:100%; padding:14px; border:none; border-radius:12px; font-weight:700; cursor:pointer;">
                حفظ التعديلات
            </button>
        </div>

        <div style="margin-top:20px; display:flex; gap:10px;">
            <a href="tel:${t.phone}" class="icon-btn-lite" style="flex:1; height:45px; border-radius:12px; background:#1c7c8c; color:white; border:none; gap:10px; display:flex; align-items:center; justify-content:center; text-decoration:none;">
                <i class="fas fa-phone-alt" style="color:white;"></i> مكالمة
            </a>
            <button onclick="window.fetchServerWAChat('${t.waJid||t.phone}', '${t.assignedTo||""}')" class="icon-btn-lite" style="flex:1; height:45px; border-radius:12px; gap:10px; display:flex; align-items:center; justify-content:center; cursor:pointer;">
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
                  <h3 style="margin:0; font-weight:700;">${t.name||"محادثة واتساب"}</h3>
                  <small style="opacity:0.8;">الرقم: ${t.phone}</small>
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
              <input type="file" id="wa-media-upload" style="display:none" onchange="window.handleWAMediaSelect('${t.waJid||t.phone}', '${t.assignedTo||""}')">
              <i class="fas fa-paperclip" style="font-size:20px; color:#54656f; cursor:pointer;" onclick="document.getElementById('wa-media-upload').click()"></i>
              <i id="wa-mic-btn" class="fas fa-microphone" style="font-size:20px; color:#54656f; cursor:pointer;" onpointerdown="window.startWARecording()" onpointerup="window.stopWARecording('${t.waJid||t.phone}', '${t.assignedTo||""}')"></i>
              
              <textarea id="wa-server-input" placeholder="اكتب رسالة للرد..." rows="1" 
                        style="flex:1; border:none; background:#f0f2f5; border-radius:20px; padding:10px 18px; font-family:inherit; font-size:14.5px; resize:none; max-height:150px; outline:none; height:42px; line-height:1.4; display:block; transition: background 0.2s;" 
                        onfocus="this.style.background='white'; this.style.boxShadow='inset 0 0 0 1px #eee';" 
                        onblur="this.style.background='#f0f2f5'; this.style.boxShadow='none';"
                        oninput="this.style.height = '42px'; this.style.height = Math.min(this.scrollHeight, 150) + 'px';" 
                        onkeydown="if(event.key==='Enter' && !event.shiftKey) { event.preventDefault(); window.sendServerWAMessage('${t.waJid||t.phone}', '${t.assignedTo||""}'); }"></textarea>
              
              <button class="wa-send-btn" onclick="window.sendServerWAMessage('${t.waJid||t.phone}', '${t.assignedTo||""}')">
                  <i class="fas fa-paper-plane"></i>
              </button>
          </div>
      </div>
    </div>
  `,i=document.getElementById("details-modal-body");if(i){i.innerHTML=o,i.scrollTop=0;const r=document.getElementById("details-modal");r&&(r.scrollTop=0),window.openModal("details-modal"),setTimeout(()=>{window.fetchServerWAChat&&window.fetchServerWAChat(t.waJid||t.phone,t.assignedTo||""),window.updateSubStatusOptions&&window.updateSubStatusOptions(t.status||"new",t.subStatus||"not_contacted"),window.renderQuickRepliesBar&&window.renderQuickRepliesBar();const d=document.querySelector("emoji-picker");d&&d.addEventListener("emoji-click",s=>{const l=document.getElementById("wa-server-input");l&&(l.value+=s.detail.unicode,l.focus())})},100)}};window.updateSubStatusOptions=function(e,t=null){const n=document.getElementById("update-booking-substatus");if(!n)return;const i={new:[{v:"not_contacted",t:"لم يتم التواصل"},{v:"contacted",t:"تم التواصل"}],waiting:[{v:"docs_received",t:"تم استلام الاوراق"},{v:"waiting_calc",t:"انتظار رد العميل"},{v:"waiting_docs",t:"إنتظار إكمال الاوراق"},{v:"waiting_signature",t:"إنتظار توقيع العميل"}],inquiry:[{v:"docs_not_received",t:"لم يتم استلام الاوراق"}],sold:[{v:"signed",t:"تم التوقيع"},{v:"delivered",t:"تم التسليم"}],rejected:[{v:"no_response",t:"لم يتم رد العميل"},{v:"obligations",t:"التزامات"},{v:"calc_rejected",t:"رفض الحسبة"},{v:"ineligible",t:"غير مسموح له"},{v:"duplicate",t:"مكرر"}]}[e]||[{v:"none",t:"-"}];n.innerHTML=i.map(a=>`<option value="${a.v}" ${a.v===t?"selected":""}>${a.t}</option>`).join("")};window.updateBookingQuickStatus=async function(e){var i,a,r;const t=(i=document.getElementById("update-booking-status"))==null?void 0:i.value,n=((a=document.getElementById("update-booking-substatus"))==null?void 0:a.value)||"",o=((r=document.getElementById("update-booking-details"))==null?void 0:r.value)||"";if(!(!t||!e))try{const d=B(L,`bookings/${e}`);await N(d,{status:t,subStatus:n,additionalDetails:o,updatedAt:new Date().toISOString()}),window.showLuxuryToast("تم تحديث حالة الطلب والتفاصيل بنجاح")}catch(d){console.error(d),window.showLuxuryToast("فشل تحديث الحالة","error")}};window.saveWAServerURL=async function(){var t;const e=(t=document.getElementById("wa-server-url-config"))==null?void 0:t.value;if(e){localStorage.setItem("wa_server_url",e);try{await W(B(L,"settings/waServerUrl"),e)}catch(n){console.error("Firebase save config error:",n)}window.showLuxuryToast("تم حفظ رابط السيرفر وتعميمه لجميع الموظفين بنجاح. يرجى إعادة تحميل الصفحة."),setTimeout(()=>location.reload(),1500)}};window.setLuxuryDetailImg=function(e,t){document.getElementById("active-luxury-img").src=t,document.querySelectorAll(".thumb-wrapper").forEach(n=>n.classList.remove("active")),e.classList.add("active")};window.switchLuxuryDetailImg=function(e,t){const n=window.state.cars.find(l=>l.id===e);if(!n)return;const o=n.images||[n.image||"logo.jpg"],i=document.getElementById("active-luxury-img").src;let a=o.findIndex(l=>i.includes(l));a===-1&&(a=0);let r=(a+t+o.length)%o.length;const d=o[r];document.getElementById("active-luxury-img").src=d;const s=document.querySelectorAll(".thumb-wrapper");s[r]&&(s.forEach(l=>l.classList.remove("active")),s[r].classList.add("active"))};window.openFullscreenGallery=function(e,t){const n=window.state.cars.find(a=>a.id===e);if(!n)return;const o=n.images||[n.image||"logo.jpg"],i=document.createElement("div");i.className="luxury-lightbox",i.innerHTML=`
        <div class="lb-close" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></div>
        <div class="lb-content">
            <img src="${t}" id="lb-main-img">
            <div class="lb-nav">
                <button onclick="window.navLightbox('${e}', -1)"><i class="fas fa-chevron-right"></i></button>
                <button onclick="window.navLightbox('${e}', 1)"><i class="fas fa-chevron-left"></i></button>
            </div>
        </div>
        <div class="lb-thumbs">
            ${o.map(a=>`<img src="${a}" class="lb-thumb ${a===t?"active":""}" onclick="document.getElementById('lb-main-img').src='${a}'; this.parentElement.querySelectorAll('.lb-thumb').forEach(t=>t.classList.remove('active')); this.classList.add('active');">`).join("")}
        </div>
    `,document.body.appendChild(i)};window.navLightbox=function(e,t){const n=window.state.cars.find(s=>s.id===e),o=n.images||[n.image||"logo.jpg"],i=document.getElementById("lb-main-img");let a=o.indexOf(i.src);a===-1&&(a=0);let r=a+t;r<0&&(r=o.length-1),r>=o.length&&(r=0),i.src=o[r];const d=document.querySelectorAll(".lb-thumb");d.forEach(s=>s.classList.remove("active")),d[r].classList.add("active")};window.trackCarView=async function(e){if(e)try{const t=B(L,`analytics/popularCars/${e}`);await K(t,n=>(n||0)+1)}catch(t){console.error("Tracking Error:",t)}};window.resetFilters=function(){["car-search-input","filter-make","filter-type","filter-year","filter-sort"].forEach(t=>{const n=document.getElementById(t);n&&(n.value=n.tagName==="SELECT"?t==="filter-sort"?"newest":"all":"")}),window.applyInventoryFilters()};window.trackVisit=async function(){try{const e=new Date().toISOString().split("T")[0];if(localStorage.getItem("visited_"+e))return;localStorage.setItem("visited_"+e,"true");const t=B(L,"analytics");await K(t,n=>{n||(n={totalVisits:0,dailyVisits:{},browsers:{},devices:{},popularCars:{}}),n.totalVisits=(n.totalVisits||0)+1,n.dailyVisits=n.dailyVisits||{},n.dailyVisits[e]=(n.dailyVisits[e]||0)+1;const o=navigator.userAgent;let i="Other";o.includes("Chrome")?i="Chrome":o.includes("Safari")?i="Safari":o.includes("Firefox")?i="Firefox":o.includes("Edge")&&(i="Edge"),n.browsers=n.browsers||{},n.browsers[i]=(n.browsers[i]||0)+1;const a=/iPhone|iPad|iPod|Android/i.test(o)?"mobile":"desktop";return n.devices=n.devices||{},n.devices[a]=(n.devices[a]||0)+1,n})}catch(e){console.error("Analytics Error:",e)}};window.loginAdmin=async function(e){var a,r;e.preventDefault();const t=(a=document.getElementById("admin-email"))==null?void 0:a.value,n=(r=document.getElementById("admin-pass"))==null?void 0:r.value,o=e.target.querySelector("button");if(!t||!n)return window.showLuxuryToast("يرجى إدخال البريد وكلمة المرور","error");const i=o.innerText;o.innerText="جاري التحقق...",o.disabled=!0;try{await Ie(Q,t,n),window.showLuxuryToast("تم تسجيل الدخول بنجاح"),window.createLog("تسجيل دخول","نجاح تسجيل الدخول للنظام","auth"),window.closeModal("admin-modal")}catch(d){console.error(d),window.showLuxuryToast("خطأ في البيانات، يرجى المحاولة مرة أخرى","error")}finally{o.innerText=i,o.disabled=!1}};window.logout=async function(){confirm("هل أنت متأكد من تسجيل الخروج؟")&&(await window.createLog("تسجيل خروج","خرج المستخدم من النظام","auth"),await $e(Q),window.showLuxuryToast("تم تسجيل الخروج"))};window.DESIGN_PRESETS={emerald:{primaryColor:"#065f46",secondaryColor:"#10b981",accentColor:"#fbbf24",glassBlur:25,borderRadius:20,cardStyle:"glass",glassOpacity:.6,light:{bgColor:"#ecfdf5",textColor:"#064e3b"},dark:{bgColor:"#022c22",textColor:"#ecfdf5"}},royal:{primaryColor:"#4c1d95",secondaryColor:"#8b5cf6",accentColor:"#f59e0b",glassBlur:15,borderRadius:12,cardStyle:"glass",glassOpacity:.8,light:{bgColor:"#f5f3ff",textColor:"#2e1065"},dark:{bgColor:"#0f0720",textColor:"#f5f3ff"}},midnight:{primaryColor:"#1e1b4b",secondaryColor:"#4338ca",accentColor:"#6366f1",glassBlur:30,borderRadius:24,cardStyle:"glass",glassOpacity:.7,light:{bgColor:"#f0f9ff",textColor:"#0c4a6e"},dark:{bgColor:"#020617",textColor:"#f0f9ff"}},classic:{primaryColor:"#907537",secondaryColor:"#b39651",accentColor:"#c8a95e",glassBlur:0,borderRadius:8,cardStyle:"solid",glassOpacity:1,light:{bgColor:"#f8fafc",textColor:"#0f172a"},dark:{bgColor:"#05080c",textColor:"#f8fafc"}},gold:{primaryColor:"#c8a95e",secondaryColor:"#d4af37",accentColor:"#ffd700",glassBlur:10,borderRadius:0,cardStyle:"glass",glassOpacity:.9,light:{bgColor:"#fffdf0",textColor:"#2d2300"},dark:{bgColor:"#050500",textColor:"#fffdf0"}},ocean:{primaryColor:"#0f172a",secondaryColor:"#38bdf8",accentColor:"#2dd4bf",glassBlur:20,borderRadius:30,cardStyle:"glass",glassOpacity:.5,light:{bgColor:"#f0f9ff",textColor:"#0c4a6e"},dark:{bgColor:"#020617",textColor:"#f0f9ff"}},carbon:{primaryColor:"#171717",secondaryColor:"#404040",accentColor:"#ef4444",glassBlur:5,borderRadius:4,cardStyle:"solid",glassOpacity:1,light:{bgColor:"#f5f5f5",textColor:"#171717"},dark:{bgColor:"#0a0a0a",textColor:"#f5f5f5"}}};window.applyDesignPreset=function(e){const t=window.DESIGN_PRESETS[e];t&&(window.applySettings({...window.state.settings,...t}),showLuxuryToast(window.state.lang==="ar"?"تم تطبيق النمط بنجاح":"Preset applied successfully"))};window.saveCustomDesign=async function(){var n,o,i,a,r,d,s,l,g,u;const e=prompt(window.state.lang==="ar"?"أدخل اسماً لمظهرك المخصص:":"Enter a name for your custom design:");if(!e)return;const t={primaryColor:(n=document.getElementById("set-color-primary"))==null?void 0:n.value,secondaryColor:(o=document.getElementById("set-color-secondary"))==null?void 0:o.value,accentColor:(i=document.getElementById("set-color-accent"))==null?void 0:i.value,glassBlur:parseInt(((a=document.getElementById("set-glass-blur"))==null?void 0:a.value)||"20"),shadowDepth:parseInt(((r=document.getElementById("set-shadow-depth"))==null?void 0:r.value)||"40"),borderRadius:((d=document.getElementById("set-border-radius"))==null?void 0:d.value)||"16",cardStyle:((s=document.getElementById("set-card-style"))==null?void 0:s.value)||"glass",glassOpacity:parseFloat(((l=document.getElementById("set-glass-opacity"))==null?void 0:l.value)||"0.75"),bgColor:(g=document.getElementById("set-color-bg"))==null?void 0:g.value,textColor:(u=document.getElementById("set-color-text"))==null?void 0:u.value,name:e,createdAt:new Date().toISOString()};try{const c=F(B(L,"custom_presets"));await W(c,t),showLuxuryToast(window.state.lang==="ar"?"تم حفظ المظهر الخاص بنجاح":"Custom design saved successfully")}catch{showLuxuryToast("فشل الحفظ","error")}};window.deleteCustomPreset=async function(e){if(confirm(window.state.lang==="ar"?"هل أنت متأكد من حذف هذا المظهر؟":"Are you sure you want to delete this preset?"))try{await U(B(L,`custom_presets/${e}`)),showLuxuryToast(window.state.lang==="ar"?"تم الحذف":"Deleted")}catch{showLuxuryToast("Error","error")}};window.renderCustomPresets=function(){const e=document.getElementById("custom-presets-list");if(!e)return;const t=window.state.custom_presets||[];if(t.length===0){e.innerHTML=`<div style="grid-column: 1/-1; text-align:center; opacity:0.5; padding:20px;">${window.state.lang==="ar"?"لا يوجد مظاهر محفوظة":"No saved designs"}</div>`;return}e.innerHTML=t.map(n=>`
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
  `).join("")};window.applySettings=function(e){var _,q,z,j;if(!e)return;const t=document.documentElement;if(e.defaultTheme&&!(localStorage.getItem("theme_manually_overridden")==="true")){document.body.setAttribute("data-theme",e.defaultTheme),localStorage.setItem("luxury_theme",e.defaultTheme);const M=document.getElementById("theme-btn");M&&(M.innerHTML=e.defaultTheme==="dark"?'<i class="fas fa-sun"></i>':'<i class="fas fa-moon"></i>')}e.primaryColor&&(t.style.setProperty("--p-red",e.primaryColor),t.style.setProperty("--p-red-glow",e.primaryColor+"66")),e.secondaryColor&&t.style.setProperty("--p-teal",e.secondaryColor),e.accentColor&&t.style.setProperty("--p-copper",e.accentColor);const n=e.logo||"logo.jpg";document.querySelectorAll(".logo-wrap img, .sidebar-brand img, .splash-logo img, #footer-logo-img, #nav-logo-img, #splash-logo-img").forEach(C=>{C.src=n});const o=e.nameAr||"ديار كار",i=e.nameEn||"DIAR CAR",a=window.state.lang==="ar"?o:i;document.querySelectorAll(".dynamic-name-ar").forEach(C=>C.innerText=o),document.querySelectorAll(".dynamic-name-en").forEach(C=>C.innerText=i),document.title=a+" | "+(window.state.lang==="ar"?"الفخامة في عالم السيارات":"Luxury Automotive"),e.fontFamily&&(t.style.setProperty("--font-main",e.fontFamily),document.body.style.fontFamily=e.fontFamily);const r="dynamic-design-styles";let d=document.getElementById(r);d||(d=document.createElement("style"),d.id=r,document.head.appendChild(d));let s="";const l=((_=e.dark)==null?void 0:_.bgColor)||e.bgColor,g=((q=e.dark)==null?void 0:q.textColor)||e.textColor,u=(z=e.light)==null?void 0:z.bgColor,c=(j=e.light)==null?void 0:j.textColor;if(l&&(s+=`body[data-theme="dark"] { --bg-main: ${l}; }
`),g&&(s+=`body[data-theme="dark"] { --text-main: ${g}; }
`),u&&(s+=`body[data-theme="light"] { --bg-main: ${u}; }
`),c&&(s+=`body[data-theme="light"] { --text-main: ${c}; }
`),e.borderRadius&&(t.style.setProperty("--border-radius-main",e.borderRadius+"px"),s+=`
      .car-card-premium, .ad-slide, .nav-premium, .modal-inner, .video-card-v2, .feature-card, .btn-premium { 
        border-radius: ${e.borderRadius}px !important; 
      }
    `),e.glassBlur&&t.style.setProperty("--glass-blur",e.glassBlur+"px"),e.shadowDepth&&t.style.setProperty("--shadow-depth",e.shadowDepth+"px"),e.shadowOpacity&&t.style.setProperty("--shadow-opacity",e.shadowOpacity),e.animSpeed&&t.style.setProperty("--anim-speed-multiplier",e.animSpeed),e.cardStyle==="solid")s+=`
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
    `;else{let C=e.glassOpacity!==void 0?e.glassOpacity:.75,M=e.glassBlur!==void 0?e.glassBlur:20;s+=`
      body[data-theme="dark"] .car-card-premium, body[data-theme="dark"] .modal-inner, body[data-theme="dark"] .stat-premium-card, body[data-theme="dark"] .nav-premium, body[data-theme="dark"] .admin-item-row {
         background: rgba(17, 24, 39, ${C}) !important;
         backdrop-filter: blur(${M}px) !important;
         -webkit-backdrop-filter: blur(${M}px) !important;
      }
      body[data-theme="light"] .car-card-premium, body[data-theme="light"] .modal-inner, body[data-theme="light"] .stat-premium-card, body[data-theme="light"] .nav-premium, body[data-theme="light"] .admin-item-row {
         background: rgba(255, 255, 255, ${C}) !important;
         backdrop-filter: blur(${M}px) !important;
         -webkit-backdrop-filter: blur(${M}px) !important;
         border: 1px solid rgba(0,0,0,0.05) !important;
      }
    `}if(e.logoBlend&&e.logoBlend!=="auto"){const C=e.logo||"logo.jpg";e.logoBlend==="mask"?s+=`
        .logo-wrap img, .sidebar-brand img, .splash-logo img, #footer-logo-img, #nav-logo-img, #splash-logo-img {
           /* Mask works ONLY if the logo image is a transparent PNG */
           -webkit-mask-image: url("${C}");
           mask-image: url("${C}");
           -webkit-mask-size: contain;
           mask-size: contain;
           -webkit-mask-repeat: no-repeat;
           mask-repeat: no-repeat;
           -webkit-mask-position: center;
           mask-position: center;
           ${e.enablePrimaryGradient?`background: linear-gradient(135deg, ${e.primaryGradColor1||"#907537"}, ${e.primaryGradColor2||"#b39651"}) !important;`:"background-color: var(--p-gold) !important;"}
           content: url("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7") !important;
           object-fit: contain;
           display: inline-block;
           min-width: 40px;
           min-height: 40px;
        }
      `:s+=`
        .logo-wrap img, .sidebar-brand img, .splash-logo img, #footer-logo-img, #nav-logo-img, #splash-logo-img {
           ${e.logoBlend==="multiply"?"mix-blend-mode: multiply; filter: contrast(1.3) brightness(0.95);":""}
           ${e.logoBlend==="screen"?"mix-blend-mode: lighten; filter: contrast(2) brightness(0.9);":""}
           ${e.logoBlend!=="multiply"&&e.logoBlend!=="screen"?`mix-blend-mode: ${e.logoBlend};`:""}
        }
      `}if(e.logoScale&&(s+=`
      .logo-wrap img, .sidebar-brand img, .splash-logo img, #footer-logo-img, #nav-logo-img, #splash-logo-img {
         transform: scale(${e.logoScale});
      }
    `),e.hoverEffect==="scale"?s+=`
      .car-card-premium:hover, .btn-premium:hover, .stat-premium-card:hover { transform: scale(1.02) translateY(-3px); transition: all 0.3s; z-index: 20; position:relative; }
    `:e.hoverEffect==="glow"&&(s+=`
      .car-card-premium:hover, .btn-premium:hover, .stat-premium-card:hover { box-shadow: 0 0 20px var(--p-red-glow) !important; transition: box-shadow 0.3s; z-index: 20; position:relative; }
    `),e.enableAnimations===!1?s+="* { transition: none !important; animation: none !important; }":e.enableAnimations===!0&&(s+=`
      .car-card-premium, .stat-premium-card, .feature-card {
        animation: fadeInUp 0.6s backwards calc(var(--anim-speed-multiplier) * 0.1s);
      }
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `),e.enableTextGradient){const C=e.textGradColor1||"#c8a95e",M=e.textGradColor2||"#ffffff";s+=`
      .logo-brand-name h1, .luxury-font, .hero-main-title, .section-title-v2, .car-title-v3, .p-amount, .hero-secondary-title,
      .dynamic-name-ar, .dynamic-name-en, .luxury-logo-gold, #wa-widget-name,
      .luxury-name-en-splash, .luxury-name-en-nav, .luxury-name-en-hero,
      #luxury-splash .dynamic-name-ar, #luxury-splash .dynamic-name-en,
      .top-bar-luxury .dynamic-name-ar, .top-bar-luxury .dynamic-name-en,
      .nav-premium .dynamic-name-ar, .nav-premium .dynamic-name-en {
        background: linear-gradient(135deg, ${C}, ${M}) !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        background-clip: text !important;
        display: inline-block !important;
      }
    `}if(e.enableTopbarGradient){const C=e.topbarGradColor1||"#907537",M=e.topbarGradColor2||"#05080c";s+=`
      .top-bar-luxury {
        background: linear-gradient(90deg, ${C}, ${M}) !important;
      }
    `}if(e.enablePrimaryGradient){const C=e.primaryGradColor1||"#907537",M=e.primaryGradColor2||"#b39651";s+=`
      .btn-premium, .car-price-v3, .car-badge-v3.available, .badge-v3.year, .p-header, .stat-icon, .car-badge-v3.custom, .hero-btn-v3 {
        background: linear-gradient(135deg, ${C}, ${M}) !important;
        border: none !important;
        color: white !important;
      }
      .btn-premium:hover, .hero-btn-v3:hover {
        filter: brightness(1.2);
        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
      }
    `}if(e.enableSecondaryGradient){const C=e.secondaryGradColor1||"#b39651",M=e.secondaryGradColor2||"#0f172a";s+=`
      .btn-secondary, .secondary-badge, .p-tab.active, .bullet-point, .nav-item.active, .dash-tab.active {
        background: linear-gradient(135deg, ${C}, ${M}) !important;
        color: white !important;
        border: none !important;
      }
    `}if(e.enableAccentGradient){const C=e.accentGradColor1||"#c8a95e",M=e.accentGradColor2||"#ffd700";s+=`
      .accent-glow, .car-badge-v3.reserved, .main-badge, .floating-preview-hud, .btn-action-lite:hover {
        border-color: ${C} !important;
      }
      .accent-gradient-bg, .badge-v3.year, .main-badge, .stat-icon-v3 {
        background: linear-gradient(135deg, ${C}, ${M}) !important;
        color: white !important;
      }
      .accent-text {
        background: linear-gradient(135deg, ${C}, ${M});
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    `}d.innerHTML=s;const m=document.getElementById("about-text-display");m&&(m.innerText=e.aboutUs||"نقدم لكم تجربة استثنائية في عالم السيارات...");const $=document.getElementById("location-text-display");$&&($.innerText=e.location||"الرياض - معارض القادسية");const b=document.getElementById("f-phone-admin");b&&(b.innerText=e.contactAdmin||"...");const w=document.getElementById("f-phone-sales");w&&(w.innerText=e.contactSales||"...");const y=document.getElementById("f-phone-info");y&&(y.innerText=e.contactComplaints||"...");const k=document.getElementById("f-email-display");k&&(k.innerText=e.contactEmail||"...");const f=document.getElementById("contact-location-link");f&&(f.href=e.locationUrl||"#");const I=document.getElementById("meta-title"),E=`${o} | ${e.metaTitle||"تمويل وبيع أفضل السيارات المعتمدة في السعودية - الرياض"}`;I&&(I.innerText=E);const T=document.getElementById("meta-description"),p=e.metaDesc||"وجهتكم الأولى لتمويل وشراء وبيع السيارات الفاخرة في المملكة العربية السعودية. نوفر أفضل السيارات بأسعار تنافسية وجدولة تمويل مرنة وجودة مضمونة.";T&&T.setAttribute("content",p);const v=(C,M,P)=>{const H=document.querySelector(C);H&&H.setAttribute(M,P)};v('meta[property="og:title"]',"content",E),v('meta[property="og:description"]',"content",p),v('meta[property="twitter:title"]',"content",E),v('meta[property="twitter:description"]',"content",p);const S={"f-insta":e.socialInsta,"f-snap":e.socialSnap,"f-twitter":e.socialTwitter};Object.entries(S).forEach(([C,M])=>{const P=document.getElementById(C);P&&(P.href=M||"#")});const x={"set-name-ar":e.nameAr||"","set-name-en":e.nameEn||"","set-color-primary":e.primaryColor||"#907537","set-color-secondary":e.secondaryColor||"#b39651","set-color-accent":e.accentColor||"#c8a95e","set-color-bg":e.bgColor||"#05080c","set-color-text":e.textColor||"#f8fafc","set-hover-effect":e.hoverEffect||"scale","set-card-style":e.cardStyle||"glass","set-glass-opacity":e.glassOpacity!==void 0?e.glassOpacity:.75,"set-logo-blend":e.logoBlend||"auto","set-logo-scale":e.logoScale||"1","set-default-theme":e.defaultTheme||"dark","set-font-family":e.fontFamily||"'Cairo', sans-serif","set-border-radius":e.borderRadius||"16","set-glass-blur":e.glassBlur||20,"set-shadow-depth":e.shadowDepth||40,"set-anim-speed":e.animSpeed||1,"set-enable-animations":e.enableAnimations!==void 0?e.enableAnimations.toString():"true","set-contact-mgmt":e.contactAdmin||"","set-contact-sales":e.contactSales||"","set-contact-complaints":e.contactComplaints||"","set-contact-email":e.contactEmail||"","set-about-text":e.aboutUs||"","set-location-link":e.locationUrl||"","set-location-text":e.location||"","set-insta-link":e.socialInsta||"","set-snap-link":e.socialSnap||"","set-twitter-link":e.socialTwitter||"","set-text-grad-1":e.textGradColor1||"#c8a95e","set-text-grad-2":e.textGradColor2||"#ffffff","set-topbar-grad-1":e.topbarGradColor1||"#907537","set-topbar-grad-2":e.topbarGradColor2||"#05080c","set-primary-grad-1":e.primaryGradColor1||"#907537","set-primary-grad-2":e.primaryGradColor2||"#b39651"};Object.entries(x).forEach(([C,M])=>{const P=document.getElementById(C);if(P&&(P.value=M,P.type==="range"||P.type==="color")){let H=document.createEvent("HTMLEvents");H.initEvent("input",!1,!0),P.dispatchEvent(H)}});const h=document.getElementById("set-maintenance-mode");h&&(h.checked=e.maintenanceMode||!1);const A={"set-enable-text-grad":e.enableTextGradient!==void 0?e.enableTextGradient:!0,"set-enable-topbar-grad":e.enableTopbarGradient!==void 0?e.enableTopbarGradient:!0,"set-enable-primary-grad":e.enablePrimaryGradient!==void 0?e.enablePrimaryGradient:!0};Object.entries(A).forEach(([C,M])=>{const P=document.getElementById(C);P&&(P.checked=M)});const R=document.getElementById("logo-preview-img");R&&(R.src=n),localStorage.setItem("luxury-settings-cache",JSON.stringify(e))};window.resetToDefaultSettings=async function(){if(confirm("هل أنت متأكد من إعادة ضبط كافة الإعدادات؟ سيتم فقدان الشعارات والألوان المخصصة.")){const e={nameAr:"ديار كار",nameEn:"DIAR CAR",primaryColor:"#907537",secondaryColor:"#b39651",accentColor:"#c8a95e",defaultTheme:"dark",borderRadius:"16px",logo:"logo.jpg",aboutUs:"تجربة استثنائية في عالم السيارات",location:"الرياض - معارض القادسية"};await W(B(L,"settings"),e),window.showLuxuryToast("تمت إعادة الضبط بنجاح")}};window.markAllNotificationsRead=async function(){try{const e=window.state.notifications.map(t=>N(B(L,`notifications/${t.id}`),{read:!0}));await Promise.all(e),window.showLuxuryToast("تم تحديد الكل كمقروء")}catch(e){console.error(e)}};window.switchSettingsTab=function(e,t){document.querySelectorAll(".set-pane").forEach(o=>o.classList.add("hidden")),document.querySelectorAll(".set-tab").forEach(o=>o.classList.remove("active"));const n=document.getElementById(e);n&&n.classList.remove("hidden"),t&&t.classList.add("active")};window.previewLogo=async function(e){if(e.files&&e.files[0])try{const t=await window.compressImage(e.files[0],400,400,.8);document.getElementById("logo-preview-img").src=t,document.getElementById("set-logo-b64").value=t}catch(t){console.error("Logo compression failed",t)}};window.removeBlackFromLogo=function(){const e=document.getElementById("logo-preview-img"),t=document.getElementById("set-logo-b64");if(!t||!t.value){window.showLuxuryToast("الرجاء رفع شعار أولاً");return}const n=document.createElement("canvas"),o=n.getContext("2d"),i=new Image;i.crossOrigin="Anonymous",i.onload=function(){n.width=i.width,n.height=i.height,o.drawImage(i,0,0);const a=o.getImageData(0,0,n.width,n.height),r=a.data,d=r[0],s=r[1],l=r[2],g=d<50&&s<50&&l<50;for(let c=0;c<r.length;c+=4){const m=r[c],$=r[c+1],b=r[c+2],w=r[c+3];if(w===0)continue;const y=Math.max(m,$,b);if(g){if(y<35)r[c+3]=0;else if(y<85){const k=(y-35)/50;r[c+3]=w*k;const f=Math.max(k,.1);r[c]=Math.min(255,m/f),r[c+1]=Math.min(255,$/f),r[c+2]=Math.min(255,b/f)}}else y<30&&(r[c+3]=0)}o.putImageData(a,0,0);const u=n.toDataURL("image/png");if(e.src=u,t.value=u,window.showLuxuryToast("تمت معالجة الشعار وتصفية الحواف بنجاح"),window.applySettings){let c=window.settings||{};c.logo=u,window.applySettings(c)}},i.src=t.value};window.saveAppSettings=async function(){var n,o,i,a,r,d,s,l,g,u,c,m,$,b,w,y,k,f,I,E,T,p,v,S,x,h,A,R,_,q,z,j,C,M,P,H,Z,ee,te,ne,oe,ie,ae,se,re,le;const e=document.querySelector('button[onclick="window.saveAppSettings()"]');e&&(e.disabled=!0,e.innerHTML='<i class="fas fa-spinner fa-spin"></i> جاري الحفظ...');const t={nameAr:((n=document.getElementById("set-name-ar"))==null?void 0:n.value)||"",nameEn:((o=document.getElementById("set-name-en"))==null?void 0:o.value)||"",logo:((i=document.getElementById("set-logo-b64"))==null?void 0:i.value)||window.state.settings.logo||"logo.jpg",primaryColor:((a=document.getElementById("set-color-primary"))==null?void 0:a.value)||"",secondaryColor:((r=document.getElementById("set-color-secondary"))==null?void 0:r.value)||"",accentColor:((d=document.getElementById("set-color-accent"))==null?void 0:d.value)||"",bgColor:((s=document.getElementById("set-color-bg"))==null?void 0:s.value)||"",textColor:((l=document.getElementById("set-color-text"))==null?void 0:l.value)||"",hoverEffect:((g=document.getElementById("set-hover-effect"))==null?void 0:g.value)||"scale",cardStyle:((u=document.getElementById("set-card-style"))==null?void 0:u.value)||"glass",glassOpacity:parseFloat(((c=document.getElementById("set-glass-opacity"))==null?void 0:c.value)||"0.75"),logoBlend:((m=document.getElementById("set-logo-blend"))==null?void 0:m.value)||"auto",logoScale:(($=document.getElementById("set-logo-scale"))==null?void 0:$.value)||"1",defaultTheme:((b=document.getElementById("set-default-theme"))==null?void 0:b.value)||"",fontFamily:((w=document.getElementById("set-font-family"))==null?void 0:w.value)||"",borderRadius:((y=document.getElementById("set-border-radius"))==null?void 0:y.value)||"",glassBlur:parseInt(((k=document.getElementById("set-glass-blur"))==null?void 0:k.value)||"20"),shadowDepth:parseInt(((f=document.getElementById("set-shadow-depth"))==null?void 0:f.value)||"40"),animSpeed:parseFloat(((I=document.getElementById("set-anim-speed"))==null?void 0:I.value)||"1"),enableAnimations:((E=document.getElementById("set-enable-animations"))==null?void 0:E.value)==="true",contactAdmin:((T=document.getElementById("set-contact-mgmt"))==null?void 0:T.value)||"",contactSales:((p=document.getElementById("set-contact-sales"))==null?void 0:p.value)||"",contactComplaints:((v=document.getElementById("set-contact-complaints"))==null?void 0:v.value)||"",contactEmail:((S=document.getElementById("set-contact-email"))==null?void 0:S.value)||"",aboutUs:((x=document.getElementById("set-about-text"))==null?void 0:x.value)||"",locationUrl:((h=document.getElementById("set-location-link"))==null?void 0:h.value)||"",location:((A=document.getElementById("set-location-text"))==null?void 0:A.value)||"",socialInsta:((R=document.getElementById("set-insta-link"))==null?void 0:R.value)||"",socialSnap:((_=document.getElementById("set-snap-link"))==null?void 0:_.value)||"",socialTwitter:((q=document.getElementById("set-twitter-link"))==null?void 0:q.value)||"",maintenanceMode:((z=document.getElementById("set-maintenance-mode"))==null?void 0:z.checked)||!1,enableTextGradient:(j=document.getElementById("set-enable-text-grad"))==null?void 0:j.checked,textGradColor1:(C=document.getElementById("set-text-grad-1"))==null?void 0:C.value,textGradColor2:(M=document.getElementById("set-text-grad-2"))==null?void 0:M.value,enableTopbarGradient:(P=document.getElementById("set-enable-topbar-grad"))==null?void 0:P.checked,topbarGradColor1:(H=document.getElementById("set-topbar-grad-1"))==null?void 0:H.value,topbarGradColor2:(Z=document.getElementById("set-topbar-grad-2"))==null?void 0:Z.value,enablePrimaryGradient:(ee=document.getElementById("set-enable-primary-grad"))==null?void 0:ee.checked,primaryGradColor1:(te=document.getElementById("set-primary-grad-1"))==null?void 0:te.value,primaryGradColor2:(ne=document.getElementById("set-primary-grad-2"))==null?void 0:ne.value,enableSecondaryGradient:(oe=document.getElementById("set-enable-secondary-grad"))==null?void 0:oe.checked,secondaryGradColor1:(ie=document.getElementById("set-secondary-grad-1"))==null?void 0:ie.value,secondaryGradColor2:(ae=document.getElementById("set-secondary-grad-2"))==null?void 0:ae.value,enableAccentGradient:(se=document.getElementById("set-enable-accent-grad"))==null?void 0:se.checked,accentGradColor1:(re=document.getElementById("set-accent-grad-1"))==null?void 0:re.value,accentGradColor2:(le=document.getElementById("set-accent-grad-2"))==null?void 0:le.value,updatedAt:new Date().toISOString()};try{localStorage.removeItem("theme_manually_overridden"),await W(B(L,"settings"),t),window.showLuxuryToast("تم حفظ الإعدادات بنجاح"),window.createLog("تعديل إعدادات","تحديث شامل لإعدادات الموقع والمنصة","settings")}catch{window.showLuxuryToast("فشل الحفظ، تأكد من الصلاحيات","error")}finally{e&&(e.disabled=!1,e.innerHTML='<i class="fas fa-save"></i> حفظ التغييرات')}};window.toggleDesignPreview=function(){const e=document.getElementById("design-preview-widget");e&&e.classList.toggle("minimized")};window.makeDraggable=function(e){if(!e||e.dataset.draggable)return;e.dataset.draggable="true";let t=0,n=0,o=0,i=0;const a=e.querySelector("div");if(!a)return;a.onmousedown=r,a.ontouchstart=r;function r(l){if(l.target.tagName==="BUTTON"||l.target.tagName==="I")return;const g=l.clientX||l.touches&&l.touches[0].clientX,u=l.clientY||l.touches&&l.touches[0].clientY;o=g,i=u,document.onmouseup=s,document.ontouchend=s,document.onmousemove=d,document.ontouchmove=d,e.classList.add("dragging")}function d(l){const g=l.clientX||l.touches&&l.touches[0].clientX,u=l.clientY||l.touches&&l.touches[0].clientY;t=o-g,n=i-u,o=g,i=u;const c=e.getBoundingClientRect(),m=c.top-n,$=c.left-t;e.style.top=m+"px",e.style.left=$+"px",e.style.bottom="auto",e.style.right="auto",e.style.margin="0"}function s(){document.onmouseup=null,document.onmousemove=null,document.ontouchend=null,document.ontouchmove=null,e.classList.remove("dragging")}};window.filterUsersByRole=function(e,t){t&&(document.querySelectorAll("#users-roles-tabs .p-tab").forEach(n=>n.classList.remove("active")),t.classList.add("active")),window.state.userRoleFilter=e,window.syncAdminTables("users")};window.syncAdminTables=function(e){var i,a,r,d,s,l,g,u,c,m,$,b,w,y,k;if(e==="all"){["cars","ads","sales","bookings","users","plates","reviews","partners","brands","locations","blogs","whatsapp-monitor","quick-replies"].forEach(I=>window.syncAdminTables(I));return}if(e==="whatsapp-monitor"){window.renderWhatsAppMonitor();return}if(e==="quick-replies"||e==="quickReplies"){window.renderQuickRepliesAdmin&&window.renderQuickRepliesAdmin(),window.renderQuickRepliesBar&&window.renderQuickRepliesBar();return}const t=document.getElementById(`admin-${e}-table`);if(!t)return;let n=window.state[e]||[];const o=(((i=document.getElementById(`admin-${e}-search`))==null?void 0:i.value)||((a=document.getElementById(`${e}-search`))==null?void 0:a.value)||((r=document.getElementById(`${e.slice(0,-1)}-search`))==null?void 0:r.value)||"").toLowerCase();if(o&&(n=n.filter(f=>(f.make||f.title||f.name||f.model||f.phone||f.carRequested||f.carOrCompany||f.subtitle||"").toLowerCase().includes(o))),e==="notifications"&&!(((d=window.state.userProfile)==null?void 0:d.role)==="admin"||((s=window.state.userProfile)==null?void 0:s.role)==="supervisor")&&window.state.user&&(n=n.filter(I=>I.userId===window.state.user.uid||I.assignedTo===window.state.user.uid)),e==="cars"){const f=document.getElementById("admin-filter-car-make");f&&f.options.length<=1&&window.state.cars.length>0&&[...new Set(window.state.cars.map(p=>p.make))].sort().forEach(p=>{const v=document.createElement("option");v.value=p,v.textContent=p,f.appendChild(v)});const I=((l=document.getElementById("admin-filter-car-status"))==null?void 0:l.value)||"all",E=((g=document.getElementById("admin-filter-car-make"))==null?void 0:g.value)||"all";I!=="all"&&(n=n.filter(T=>T.status===I)),E!=="all"&&(n=n.filter(T=>T.make===E))}if(e==="bookings"){const f=document.getElementById("filter-booking-staff");f&&f.options.length<=1&&window.state.users&&window.state.users.forEach(x=>{if(x.email!=="zyrozyro98@gmail.com"&&(x.role==="admin"||x.role==="supervisor"||x.role==="staff")){const h=document.createElement("option");h.value=x.id,h.textContent=x.name||x.email||"مستخدم غير محدد",f.appendChild(h)}});const I=document.getElementById("filter-booking-sub-status");if(I&&I.options.length<=1){window.setBookingFilter(window.state.bookingFilter||"all",null,window.state.bookingSubStatusFilter||"all");return}const E=((u=document.getElementById("filter-booking-status"))==null?void 0:u.value)||window.state.bookingFilter||"all",T=((c=document.getElementById("filter-booking-sub-status"))==null?void 0:c.value)||window.state.bookingSubStatusFilter||"all",p=((m=document.getElementById("filter-booking-staff"))==null?void 0:m.value)||"all",v=(($=document.getElementById("filter-booking-type"))==null?void 0:$.value)||"all";window.state.bookingFilter=E,window.state.bookingSubStatusFilter=T,E!=="all"&&(n=n.filter(x=>{let h=x.status||"new";return E==="cancelled"&&(h==="rejected"||h==="cancelled")?!0:h===E})),T!=="all"&&(n=n.filter(x=>x.subStatus===T)),p!=="all"&&(n=n.filter(x=>x.assignedTo===p)),v!=="all"&&(n=n.filter(x=>(x.customerType||"individual")===v)),!(((b=window.state.userProfile)==null?void 0:b.role)==="admin"||((w=window.state.userProfile)==null?void 0:w.role)==="supervisor")&&window.state.user&&(n=n.filter(x=>x.assignedTo===window.state.user.uid))}if(e==="users"){n=n.filter(p=>p.email!=="zyrozyro98@gmail.com");const f=window.state.userRoleFilter||"all";f!=="all"&&(n=n.filter(p=>p.role===f));const I=document.getElementById("stat-users-total"),E=document.getElementById("stat-users-active"),T=document.getElementById("stat-users-admins");if(I&&(I.innerText=n.length),E){E.innerText=n.filter(v=>v.isAvailable).length;const p=E.nextElementSibling;p&&(p.innerText="متواجد حالياً")}if(T){const p=T.nextElementSibling;if(f==="all")T.innerText=n.filter(v=>v.role==="admin").length,p&&(p.innerText="مدراء النظام");else{T.innerText=n.length;const v={admin:"مدراء النظام",supervisor:"مشرفين",staff:"المندوبين"};p&&(p.innerText="إجمالي الـ "+(v[f]||""))}}}if(e==="bookings"?(((y=document.getElementById("filter-booking-sort"))==null?void 0:y.value)||"newest")==="oldest"?n.sort((I,E)=>new Date(I.createdAt||0)-new Date(E.createdAt||0)):n.sort((I,E)=>new Date(E.createdAt||0)-new Date(I.createdAt||0)):n.sort((f,I)=>new Date(I.createdAt||0)-new Date(f.createdAt||0)),n.length===0){t.innerHTML='<div class="no-data-admin" style="padding:40px; text-align:center; opacity:0.5;">لا توجد بيانات لهذه الفئة</div>';return}if(e==="users"){const f=window.state.bookings||[],I=((k=window.state.userProfile)==null?void 0:k.role)==="admin";let E=`<table class="admin-table-v2" style="width:100%; border-collapse:collapse; min-width:800px; font-size:14px;">
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
          <tbody>`;n.forEach(T=>{const p=f.filter(z=>z.assignedTo===T.id),v=p.filter(z=>z.status==="sold"||z.status==="done").length,S=p.filter(z=>z.status==="new"||z.status==="waiting"||z.status==="inquiry"||!z.status).length,x=p.filter(z=>z.status==="cancelled").length,A={admin:"مسؤول",supervisor:"مشرف",staff:"مندوب"}[T.role]||"مندوب",R=T.image||"logo.jpg",_=T.phone||"";let q="";if(_){let z=_.replace(/\D/g,"");z=window.normalizePhone(z),q=`<a href="https://wa.me/${z}" target="_blank" class="icon-btn-lite success" title="مراسلة واتساب"><i class="fab fa-whatsapp"></i></a>`}E+=`<tr style="border-bottom: 1px solid rgba(255,255,255,0.05); transition: background 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.02)'" onmouseout="this.style.background='transparent'">
              <td style="padding:15px;">
                  <div style="display:flex; align-items:center; gap:12px;">
                      <div style="width:40px; height:40px; border-radius:50%; overflow:hidden; background:#222; flex-shrink:0;">
                          <img src="${R}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='logo.jpg'">
                      </div>
                      <div>
                          <strong style="display:block; font-size:15px;">${T.name||T.email}</strong>
                          ${_?`<span style="font-size:12px; color:var(--text-dim);">${_}</span>`:""}
                      </div>
                  </div>
              </td>
              <td style="padding:15px;"><span style="color:var(--p-copper); font-size:13px;">${A}</span></td>
              <td style="padding:15px;"><span class="status-badge ${T.isAvailable?"online":"busy"}" style="font-size:11px;">● ${T.isAvailable?"متاح":"غير متاح"}</span></td>
              <td style="padding:15px; text-align:center;"><span style="color:#00a884; font-weight:bold; font-size:15px;">${v}</span></td>
              <td style="padding:15px; text-align:center;"><span style="color:var(--p-gold); font-weight:bold; font-size:15px;">${S}</span></td>
              <td style="padding:15px; text-align:center;"><span style="color:#e02424; font-weight:bold; font-size:15px;">${x}</span></td>
              <td style="padding:15px; text-align:center;">
                  <div style="display:flex; justify-content:center; gap:8px;">
                      ${q}
                      <button class="icon-btn-lite" onclick="window.editLuxuryItem('users', '${T.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                      ${I?`<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('users', '${T.id}')" title="حذف"><i class="fas fa-trash"></i></button>`:""}
                  </div>
              </td>
          </tr>`}),E+="</tbody></table>",t.innerHTML=E;return}t.innerHTML=n.map(f=>_e(e,f)).join("")};function _e(e,t){var u,c,m,$,b,w,y,k;((u=window.state.userProfile)==null?void 0:u.role)==="admin"||((c=window.state.userProfile)==null||c.role);const n=((m=window.state.userProfile)==null?void 0:m.role)==="admin",o=(($=window.state.userProfile)==null?void 0:$.role)==="supervisor",a=n||o&&["bookings","notifications"].includes(e),r=(t.status||"available").toLowerCase(),d=r==="sold"||r==="مباع"?"danger":r==="available"||r==="متاح"?"success":"warning",s=r==="sold"||r==="مباع"?"مباع":r==="available"||r==="متاح"?"متاح":"محجوز";if(e==="bookings"){const f=((b=window.state.users.find(v=>v.id===t.assignedTo))==null?void 0:b.name)||"غير محدد",I={new:"جديد",waiting:"بالانتظار",inquiry:"استفسار",sold:"مكتمل",done:"تم",cancelled:"مرفوض",rejected:"مرفوض"},E={not_contacted:"لم يتم التواصل",contacted:"تم التواصل",docs_received:"تم استلام الاوراق",waiting_calc:"انتظار رد العميل",waiting_docs:"إنتظار إكمال الاوراق",waiting_signature:"إنتظار توقيع العميل",docs_not_received:"لم يتم استلام الاوراق",signed:"تم التوقيع",delivered:"تم التسليم",done:"تم",no_response:"لم يتم رد العميل",obligations:"التزامات",calc_rejected:"رفض الحسبة",ineligible:"غير مسموح له",duplicate:"مكرر"},T=t.status==="cancelled"||t.status==="rejected"?"danger":t.status==="sold"||t.status==="done"?"success":"warning",p=t.subStatus?E[t.subStatus]||t.subStatus:"";return`
            <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:12px; border:1px solid var(--glass-border); margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                <div class="admin-item-info">
                    <strong style="display:block; font-size:16px;">${t.name||t.phone}</strong>
                    <div class="meta-row" style="font-size:12px; color:var(--text-dim); margin-top:5px; display:flex; gap:10px; flex-wrap:wrap;">
                        <span><i class="fas fa-car"></i> ${t.carOrCompany||t.carRequested||"-"}</span> | 
                        <span><i class="fas fa-user-tie"></i> ${f}</span>
                        ${p?`| <span style="color:var(--p-copper);"><i class="fas fa-info-circle"></i> ${p}</span>`:""}
                    </div>
                </div>
                <div class="admin-actions" style="display:flex; gap:10px; align-items:center;">
                    <span class="badge-${T}" style="font-size:10px; padding:3px 8px; border-radius:5px;">${I[t.status]||t.status||"جديد"}</span>
                    <button class="icon-btn-lite view" onclick="window.viewBookingDetails('${t.id}')" title="عرض التفاصيل"><i class="fas fa-eye"></i></button>
                    <button class="icon-btn-lite" onclick="window.editLuxuryItem('bookings', '${t.id}')" title="تعديل الحجز" aria-label="Edit Booking"><i class="fas fa-edit"></i></button>
                    ${a?`<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('bookings', '${t.id}')" title="حذف الحجز" aria-label="Delete Booking"><i class="fas fa-trash"></i></button>`:""}
                </div>
            </div>
        `}if(e==="cars")return`
            <div class="admin-item-row car-admin-row" style="background:rgba(255,255,255,0.02); padding:12px; border-radius:16px; border:1px solid var(--glass-border); margin-bottom:12px; display:flex; align-items:center; gap:20px; transition:all 0.3s ease;">
                <div class="admin-item-thumb" style="width:80px; height:60px; border-radius:10px; overflow:hidden; flex-shrink:0; background:#000;">
                    <img src="${t.image||"logo.jpg"}" style="width:100%; height:100%; object-fit:cover; opacity:0.8;" onerror="this.src='logo.jpg'">
                </div>
                <div class="admin-item-info" style="flex-grow:1;">
                    <div style="display:flex; align-items:center; gap:10px; margin-bottom:4px;">
                        <strong style="font-size:16px;">${t.make} ${t.model}</strong>
                        <span style="font-size:12px; color:var(--p-copper); font-weight:700;">${t.year}</span>
                    </div>
                    <div class="meta-row" style="font-size:12px; color:var(--text-dim); display:flex; gap:15px; flex-wrap:wrap;">
                        <span><i class="fas fa-tachometer-alt"></i> ${Number(t.mileage||0).toLocaleString()} كم</span>
                        <span><i class="fas fa-paint-brush"></i> ${t.color||"-"}</span>
                        <span style="color:var(--p-red); font-weight:800;">${t.price?Number(t.price).toLocaleString()+" ريال":t.monthlyInstallment?"قسط: "+Number(t.monthlyInstallment).toLocaleString()+" ريال":"عند التواصل"}</span>
                    </div>
                </div>
                <div class="admin-actions" style="display:flex; gap:8px; align-items:center;">
                    <span class="badge-${d}" style="font-size:10px; padding:4px 10px; border-radius:6px; font-weight:700;">${s}</span>
                    <button class="icon-btn-lite view" onclick="window.viewLuxuryCar('${t.id}')" title="عرض التفاصيل"><i class="fas fa-eye"></i></button>
                    ${a?`
                        <button class="icon-btn-lite" onclick="window.editLuxuryItem('cars', '${t.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                        <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('cars', '${t.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                    `:""}
                </div>
            </div>
        `;if(e==="users")return t.email==="zyrozyro98@gmail.com"?"":`
            <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:12px; border:1px solid var(--glass-border); margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                <div class="admin-item-info">
                    <strong style="display:block;">${t.name||t.email}</strong>
                    <div style="font-size:12px;">
                        <span style="color:var(--p-copper);">${t.role||"staff"}</span> | 
                        <span class="status-badge ${t.isAvailable?"online":"busy"}">● ${t.isAvailable?"متاح":"غير متاح"}</span>
                    </div>
                </div>
                <div class="admin-actions">
                    <button class="icon-btn-lite" onclick="window.editLuxuryItem('users', '${t.id}')" title="تعديل المستخدم" aria-label="Edit User"><i class="fas fa-edit"></i></button>
                    ${a?`<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('users', '${t.id}')" title="حذف المستخدم" aria-label="Delete User"><i class="fas fa-trash"></i></button>`:""}
                </div>
            </div>
        `;if(e==="plates")return`
            <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:12px; border:1px solid var(--glass-border); margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                <div class="admin-item-info">
                    <strong style="display:block; font-size:18px; letter-spacing:2px;">${t.number} ${t.letters}</strong>
                    <span style="font-size:12px; color:var(--p-copper);">${Number(t.price).toLocaleString()} ريال</span>
                </div>
                <div class="admin-actions" style="display:flex; gap:10px; align-items:center;">
                    <span class="badge-${d}" style="font-size:10px; padding:3px 8px; border-radius:5px;">${s}</span>
                    ${a?`
                        <button class="icon-btn-lite" onclick="window.editLuxuryItem('plates', '${t.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                        <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('plates', '${t.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                    `:""}
                </div>
            </div>
        `;if(e==="notifications"){const f=!!t.read,I=t.type||"system",E=((w=window.state.userProfile)==null?void 0:w.role)==="admin"||((y=window.state.userProfile)==null?void 0:y.role)==="supervisor",T=t.userId||t.assignedTo,p=(k=window.state.users)==null?void 0:k.find(x=>x.id===T),v=p?p.name||p.email:"نظام",S={wa_message:"fab fa-whatsapp",booking:"fas fa-calendar-check",system:"fas fa-info-circle",auth:"fas fa-shield-alt"};return`
      <div class="notification-premium-item ${f?"":"unread"}" onclick="window.handleNotificationClick('${t.id}', '${t.link||""}')">
          <div class="notif-icon-wrap">
              <i class="${S[I]||S.system}"></i>
          </div>
          <div class="notif-content">
              <div class="notif-header">
                  <div style="display:flex; flex-direction:column; gap:2px;">
                      <span class="notif-title">${t.title||"تنبيه بالنظام"}</span>
                      ${E?`<span style="font-size:11px; color:var(--p-gold); font-weight:bold;">الموظف: ${v}</span>`:""}
                  </div>
                  <span class="notif-time">${window.formatDateRelative?window.formatDateRelative(t.timestamp):new Date(t.timestamp).toLocaleString("ar-SA")}</span>
              </div>
              <p class="notif-body">${t.text||t.message||""}</p>
              <div class="notif-actions" onclick="event.stopPropagation()">
                  ${f?"":`
                      <button class="btn-premium btn-xs" style="padding:4px 12px; font-size:11px;" onclick="window.markNotificationRead('${t.id}')">
                          <i class="fas fa-check"></i> مقروء
                      </button>
                  `}
                  <button class="btn-premium btn-xs danger" style="padding:4px 12px; font-size:11px;" onclick="window.deleteLuxuryItem('notifications', '${t.id}')">
                      <i class="fas fa-trash"></i> حذف
                  </button>
              </div>
          </div>
      </div>
    `}if(e==="logs")return`
            <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:10px; border-radius:10px; font-size:12px; border-bottom:1px solid rgba(255,255,255,0.05);">
                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                    <strong style="color:var(--p-teal);">${t.action}</strong>
                    <span style="opacity:0.5;">${new Date(t.timestamp).toLocaleString()}</span>
                </div>
                <p style="opacity:0.8;">${t.details}</p>
                <div style="margin-top:5px; font-size:10px; opacity:0.6;">بواسطة: ${t.user}</div>
            </div>
        `;if(e==="ads")return`
            <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:16px; border:1px solid var(--glass-border); margin-bottom:12px; display:flex; align-items:center; gap:20px;">
                <div class="admin-item-thumb" style="width:100px; height:60px; border-radius:10px; overflow:hidden; flex-shrink:0; background:#000;">
                    <img src="${t.image||"logo.jpg"}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='logo.jpg'">
                </div>
                <div class="admin-item-info" style="flex-grow:1;">
                    <strong style="display:block; font-size:16px;">${t.title||"بدون عنوان"}</strong>
                    <p style="font-size:12px; color:var(--text-dim); margin-top:4px;">${t.subtitle||"لا يوجد عنوان فرعي"}</p>
                </div>
                <div class="admin-actions">
                    <button class="icon-btn-lite" onclick="window.editLuxuryItem('ads', '${t.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                    ${a?`<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('ads', '${t.id}')" title="حذف"><i class="fas fa-trash"></i></button>`:""}
                </div>
            </div>
        `;if(e==="sales"){const f=(t.url||"").trim();let I=f.includes("youtube.com")||f.includes("youtu.be"),E=t.poster||t.image||null;if(I&&!E){let T="";try{f.includes("v=")?T=f.split("v=")[1].split("&")[0]:f.includes("youtu.be/")?T=f.split("youtu.be/")[1].split("?")[0]:f.includes("embed/")?T=f.split("embed/")[1].split("?")[0]:T=f.split("/").pop().split("?")[0]}catch{T=""}T&&(E=`https://img.youtube.com/vi/${T}/mqdefault.jpg`)}return E=E||"logo.jpg",`
            <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:12px; border-radius:16px; border:1px solid var(--glass-border); margin-bottom:12px; display:flex; align-items:center; gap:20px;">
                <div class="admin-item-thumb" style="width:80px; height:50px; border-radius:10px; overflow:hidden; flex-shrink:0; background:#000;">
                    <img src="${E}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='logo.jpg'">
                </div>
                <div class="admin-item-info" style="flex-grow:1;">
                    <strong style="display:block; font-size:16px;">${t.title||t.name||"لحظة تسليم"}</strong>
                    <div style="font-size:11px; color:var(--text-dim); margin-top:4px; max-width:400px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                        <i class="fas fa-link"></i> ${f}
                    </div>
                </div>
                <div class="admin-actions">
                    <button class="icon-btn-lite view" onclick="window.openVideoLightbox('${f}')" title="معاينة"><i class="fas fa-eye"></i></button>
                    ${a?`
                        <button class="icon-btn-lite" onclick="window.editLuxuryItem('sales', '${t.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                        <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('sales', '${t.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                    `:""}
                </div>
            </div>
        `}if(e==="reviews"){const f=Number(t.rating||5),I=t.text?t.text.length>60?t.text.substring(0,60)+"...":t.text:"لا يوجد نص",E=t.avatar||t.image||"";return`
        <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:16px; border:1px solid var(--glass-border); margin-bottom:12px; display:flex; align-items:center; gap:20px;">
            <div class="admin-item-avatar" style="width:50px; height:50px; border-radius:50%; overflow:hidden; flex-shrink:0; background:var(--bg-alt); border:2px solid var(--p-copper); display:flex; align-items:center; justify-content:center; color:var(--p-copper); font-weight:900;">
                ${E?`<img src="${E}" style="width:100%; height:100%; object-fit:cover;">`:(t.name||"U").charAt(0)}
            </div>
            <div class="admin-item-info" style="flex-grow:1;">
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:4px;">
                    <strong style="font-size:16px;">${t.name||"عميل مجهول"}</strong>
                    <div class="review-stars-lite" style="color:#ffd700; font-size:11px;">
                        ${'<i class="fas fa-star"></i>'.repeat(f)}
                    </div>
                </div>
                <p style="font-size:13px; color:var(--text-dim); margin-top:2px;">"${I}"</p>
                ${t.car?`<span style="font-size:11px; color:var(--p-copper); opacity:0.8; display:block; margin-top:5px;"><i class="fas fa-car-side"></i> ${t.car}</span>`:""}
            </div>
            <div class="admin-actions">
                ${isAdmin?`
                    <button class="icon-btn-lite" onclick="window.editLuxuryItem('reviews', '${t.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                    <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('reviews', '${t.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                `:""}
            </div>
        </div>
    `}const l=t.make?`${t.make} ${t.model}`:t.title||t.name||"بدون عنوان",g=t.image||t.logo||t.poster||null;return`
        <div class="admin-item-row" onclick="window.editLuxuryItem('${e}', '${t.id}')" style="cursor:pointer;">
            <div style="display:flex; align-items:center; gap:15px;">
                ${g?`
                    <div style="width:50px; height:40px; border-radius:8px; overflow:hidden; flex-shrink:0;">
                        <img src="${g}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='logo.jpg'">
                    </div>
                `:""}
                <div class="admin-item-info">
                    <strong style="display:block;">${l}</strong>
                    ${t.price?`<span style="font-size:12px; color:var(--p-copper); font-weight:700;">${Number(t.price).toLocaleString()} ريال</span>`:""}
                </div>
            </div>
            <div class="admin-actions" style="display:flex; gap:8px; align-items:center;" onclick="event.stopPropagation()">
                ${t.status?`<span class="badge-${d}" style="font-size:10px; padding:3px 8px; border-radius:5px;">${s}</span>`:""}
                <button class="icon-btn-lite" onclick="window.editLuxuryItem('${e}', '${t.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                ${isAdmin?`<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('${e}', '${t.id}')" title="حذف"><i class="fas fa-trash"></i></button>`:""}
            </div>
        </div>
    `}window.updateStatistics=function(){var f,I,E,T;const e=document.getElementById("stat-cars-count-v2"),t=document.getElementById("stat-bookings-count-v2"),n=document.getElementById("stat-total-value-v2"),o=window.state.cars||[];let i=window.state.bookings||[];if(!(((f=window.state.userProfile)==null?void 0:f.role)==="admin"||((I=window.state.userProfile)==null?void 0:I.role)==="supervisor")&&window.state.user&&(i=i.filter(p=>p.assignedTo===window.state.user.uid)),e&&(e.innerText=o.length),t&&(t.innerText=i.length),n){const p=o.reduce((v,S)=>v+(parseFloat(S.price)||0),0);n.innerText=p.toLocaleString()+" ريال"}const r={all:i.length,new:i.filter(p=>p.status==="new"||!p.status).length,waiting:i.filter(p=>p.status==="waiting").length,inquiry:i.filter(p=>p.status==="inquiry").length,sold:i.filter(p=>p.status==="sold").length,done:i.filter(p=>p.status==="done").length,cancelled:i.filter(p=>p.status==="cancelled"||p.status==="rejected").length,sub:{not_contacted:i.filter(p=>p.subStatus==="not_contacted").length,contacted:i.filter(p=>p.subStatus==="contacted").length,docs_received:i.filter(p=>p.subStatus==="docs_received").length,waiting_calc:i.filter(p=>p.subStatus==="waiting_calc").length,waiting_docs:i.filter(p=>p.subStatus==="waiting_docs").length,waiting_signature:i.filter(p=>p.subStatus==="waiting_signature").length,docs_not_received:i.filter(p=>p.subStatus==="docs_not_received").length,signed:i.filter(p=>p.subStatus==="signed").length,delivered:i.filter(p=>p.subStatus==="delivered").length,done:i.filter(p=>p.subStatus==="done").length,no_response:i.filter(p=>p.subStatus==="no_response").length,obligations:i.filter(p=>p.subStatus==="obligations").length,calc_rejected:i.filter(p=>p.subStatus==="calc_rejected").length,ineligible:i.filter(p=>p.subStatus==="ineligible").length,duplicate:i.filter(p=>p.subStatus==="duplicate").length}};Object.entries(r).forEach(([p,v])=>{const S=document.getElementById(`count-${p}`);S&&(S.innerText=v)}),Object.entries(r.sub).forEach(([p,v])=>{const S=document.getElementById(`count-sub-${p}`);S&&(S.innerText=v)});const d=document.getElementById("bookings-badge");d&&(d.innerText=r.new,d.classList.toggle("hidden",r.new===0));const s=(E=window.state.user)==null?void 0:E.uid;if(((T=window.state.userProfile)==null?void 0:T.role)==="staff"&&s){const p=document.getElementById("staff-quick-stats");p&&p.classList.remove("hidden");const v=(window.state.bookings||[]).filter(j=>j.assignedTo===s),S=v.filter(j=>j.status==="new"||!j.status).length,x=v.length,h=v.filter(j=>j.status==="sold").length,A=x>0?Math.round(h/x*100):0,R=document.getElementById("staff-waiting-count"),_=document.getElementById("staff-total-assigned"),q=document.getElementById("staff-conversion-rate"),z=document.getElementById("availability-toggle");R&&(R.innerText=S),_&&(_.innerText=x),q&&(q.innerText=A+"%"),z&&(z.checked=window.state.userProfile.isAvailable!==!1)}const g=document.getElementById("total-inventory-value"),u=document.getElementById("overall-conversion-rate"),c=document.getElementById("active-bookings-count"),m=document.getElementById("conversion-bar");if(g){const p=(window.state.cars||[]).reduce((v,S)=>v+(parseFloat(S.price)||0),0);g.innerText=p.toLocaleString()+" ريال"}if(c&&(c.innerText=r.new+r.waiting+r.inquiry),u){const p=(window.state.bookings||[]).length,v=(window.state.bookings||[]).filter(x=>x.status==="sold"||x.status==="done").length,S=p>0?Math.round(v/p*100):0;u.innerText=S+"%",m&&(m.style.width=S+"%")}const $=document.getElementById("monthly-goal-percent"),b=document.getElementById("monthly-goal-fill");if($&&b){const p=(window.state.bookings||[]).filter(x=>{if(x.status!=="sold"&&x.status!=="done")return!1;const h=new Date(x.createdAt||0),A=new Date;return h.getMonth()===A.getMonth()&&h.getFullYear()===A.getFullYear()}).length,S=Math.min(100,Math.round(p/50*100));$.innerText=S+"%",b.style.width=S+"%"}const w=document.getElementById("supervisor-recent-logs");if(w&&window.state.logs){const p=[...window.state.logs].sort((v,S)=>new Date(S.timestamp)-new Date(v.timestamp)).slice(0,10);w.innerHTML=p.map(v=>`
      <div class="log-entry-lite">
        <div class="le-icon"><i class="fas ${v.type==="auth"?"fa-key":v.type==="data"?"fa-database":"fa-info-circle"}"></i></div>
        <div class="le-body">
          <div class="le-top"><strong>${v.action}</strong> <span>${new Date(v.timestamp).toLocaleTimeString()}</span></div>
          <p>${v.details}</p>
          <small>بواسطة: ${v.user}</small>
        </div>
      </div>
    `).join("")}const y=document.getElementById("status-donut-chart");if(y){const p=r.sold+r.done,v=r.new+r.waiting+r.inquiry,S=r.cancelled,x=p+v+S||1,h=Math.round(p/x*100),A=Math.round(v/x*100);y.style.background=`conic-gradient(
      #00a884 0% ${h}%, 
      var(--p-gold) ${h}% ${h+A}%, 
      #e02424 ${h+A}% 100%
    )`,y.setAttribute("data-pct",`${h}% ناجح`)}const k=document.getElementById("supervisor-leaderboard");if(k&&window.state.users&&window.state.bookings){const p=new Date,v=window.state.bookings.filter(x=>{const h=new Date(x.createdAt||0);return h.getMonth()===p.getMonth()&&h.getFullYear()===p.getFullYear()}),S=window.state.users.filter(x=>x.role==="staff"||x.role==="supervisor").map(x=>{const h=v.filter(R=>R.assignedTo===x.id&&(R.status==="sold"||R.status==="done")).length,A=v.filter(R=>R.assignedTo===x.id).length;return{...x,soldCount:h,totalAssigned:A}}).sort((x,h)=>h.soldCount-x.soldCount).slice(0,5);k.innerHTML=S.map((x,h)=>`
      <div class="leader-item">
        <div class="leader-rank">${h+1}</div>
        <div class="leader-avatar"><img src="${x.image||"logo.jpg"}" onerror="this.src='logo.jpg'"></div>
        <div class="leader-info">
          <strong>${x.name||x.email}</strong>
          <span>${x.soldCount} مبيعات / ${x.totalAssigned} طلبات</span>
        </div>
        <div class="leader-score">${x.soldCount>0?Math.round(x.soldCount/(x.totalAssigned||1)*100):0}%</div>
      </div>
    `).join("")}window.state.currentPeriodReport?window.switchPeriodReport(window.state.currentPeriodReport):window.switchPeriodReport("day"),window.renderSupervisorStaffList()};window.switchPeriodReport=function(e,t){if(window.state.currentPeriodReport=e,t)document.querySelectorAll(".p-tab").forEach(m=>m.classList.remove("active")),t.classList.add("active");else{const m=document.querySelectorAll(".p-tab"),b={day:0,week:1,month:2,year:3}[e]||0;m[b]&&(m.forEach(w=>w.classList.remove("active")),m[b].classList.add("active"))}const n=new Date;let o=new Date;e==="day"?o.setHours(0,0,0,0):e==="week"?o.setDate(n.getDate()-7):e==="month"?o.setMonth(n.getMonth()-1):e==="year"&&o.setFullYear(n.getFullYear()-1);const i=(window.state.bookings||[]).filter(m=>new Date(m.createdAt||0)>=o),a=(window.state.cars||[]).filter(m=>new Date(m.createdAt||0)>=o).length,r=(window.state.plates||[]).filter(m=>new Date(m.createdAt||0)>=o).length,d=i.length,s=i.filter(m=>m.status==="sold"||m.status==="done").length,l=i.filter(m=>m.status==="new"||m.status==="waiting"||m.status==="inquiry").length,g=d>0?Math.round(s/d*100):0,u=i.filter(m=>m.status==="sold"||m.status==="done").reduce((m,$)=>{const b=(window.state.cars||[]).find(w=>w.id===$.carId);return m+parseFloat((b==null?void 0:b.price)||0)},0),c={"period-total-count":d,"period-sold-count":s,"period-active-count":l,"period-conv-rate":g+"%","period-sold-value":u.toLocaleString()+" ريال","period-inventory-added":a+r};Object.entries(c).forEach(([m,$])=>{const b=document.getElementById(m);b&&(b.innerText=$)})};window.deleteLuxuryItem=async function(e,t){var n;if(confirm("هل أنت متأكد من الحذف؟ لا يمكن التراجع عن هذه العملية."))try{if(e==="users"){const o=(window.state.users||[]).find(a=>a.id===t);if((o==null?void 0:o.email)==="zyrozyro98@gmail.com"){window.showLuxuryToast("لا يمكن حذف هذا المطور الأساسي للنظام","error");return}if(((n=window.state.userProfile)==null?void 0:n.role)==="supervisor"&&(o==null?void 0:o.role)==="admin"){window.showLuxuryToast("لا يملك المشرف صلاحية حذف المدير","error");return}}await U(B(L,`${e}/${t}`)),window.showLuxuryToast("تم الحذف بنجاح"),window.createLog("حذف",`حذف عنصر من ${e} (ID: ${t})`,"data")}catch{window.showLuxuryToast("فشل الحذف","error")}};window.editLuxuryItem=function(e,t){const n=(window.state[e]||[]).find(i=>i.id===t);if(!n)return;if(e==="users"&&n.email==="zyrozyro98@gmail.com"){window.showLuxuryToast("لا يمكن تعديل بيانات هذا المستخدم الأساسي","error");return}window.state.currentEdit={type:e,id:t},document.getElementById("item-form")&&(e==="cars"&&(window.state.carImages=[],n.image&&window.state.carImages.push({type:"url",value:n.image,isMain:!0}),n.images&&Array.isArray(n.images)&&n.images.forEach(i=>{i!==n.image&&window.state.carImages.push({type:"url",value:i,isMain:!1})})),we(e,n),window.setModalTitle("item-modal",`تعديل: ${n.make||n.title||e}`),window.openModal("item-modal"))};window.insertQRVariable=function(e){const t=document.querySelector('#item-form textarea[name="content"]');if(t){const n=t.selectionStart,o=t.selectionEnd,i=t.value;t.value=i.substring(0,n)+e+i.substring(o),t.selectionStart=t.selectionEnd=n+e.length,t.focus()}};window.openCRUDModal=function(e,t=null){var i;if(window.state.currentEdit={type:e,id:t},!document.getElementById("item-form"))return;const o=t?((i=window.state[e])==null?void 0:i.find(a=>a.id===t))||{}:{};e==="cars"&&(window.state.carImages=[],o.image&&window.state.carImages.push({type:"url",value:o.image,isMain:!0}),o.images&&Array.isArray(o.images)&&o.images.forEach(a=>{a!==o.image&&window.state.carImages.push({type:"url",value:a,isMain:!1})})),we(e,o),window.setModalTitle("item-modal",t?`تعديل: ${e}`:`إضافة: ${e}`),window.openModal("item-modal")};function we(e,t={}){const n=document.getElementById("dynamic-form-fields");if(!n)return;let o=[];e==="cars"?(o=[{name:"make",label:"الماركة",type:"datalist",options:[...(window.state.brands||[]).map(a=>({v:a.name,t:a.name}))],required:!0},{name:"model",label:"الموديل",type:"text",required:!0},{name:"year",label:"السنة",type:"number"},{name:"price",label:"سعر الكاش",type:"number"},{name:"monthlyInstallment",label:"قسط شهري يبدأ بـ",type:"number"},{name:"mileage",label:"الممشى (كم)",type:"number"},{name:"engine",label:"المحرك",type:"datalist",placeholder:"مثال: 8 سليندر، 4.0L",options:[{v:"4 سليندر",t:"4 سليندر"},{v:"6 سليندر",t:"6 سليندر"},{v:"8 سليندر",t:"8 سليندر"},...(window.state.engines||[]).map(a=>({v:a.name,t:a.name}))].filter((a,r,d)=>a.v&&d.findIndex(s=>s.v===a.v)===r)},{name:"gearbox",label:"ناقل الحركة",type:"datalist",options:[{v:"عادي",t:"عادي"},{v:"أوتوماتيكي",t:"أوتوماتيكي"},{v:"CVT",t:"CVT"},...(window.state.gearboxes||[]).map(a=>({v:a.name,t:a.name}))].filter((a,r,d)=>a.v&&d.findIndex(s=>s.v===a.v)===r)},{name:"fuelType",label:"نوع الوقود",type:"select",options:[{v:"بنزين",t:"بنزين"},{v:"ديزل",t:"ديزل"},{v:"هايبرد",t:"هايبرد"},{v:"كهرباء",t:"كهرباء"}]},{name:"bodyType",label:"فئة السيارة",type:"datalist",options:[{v:"sedan",t:"سيدان"},{v:"suv",t:"SUV"},{v:"coupe",t:"كوبيه"},{v:"luxury",t:"فاخرة"},{v:"pickup",t:"بيك آب"},...(window.state.bodyTypes||[]).map(a=>({v:a.name,t:a.name}))].filter((a,r,d)=>a.v&&d.findIndex(s=>s.v===a.v)===r)},{name:"color",label:"اللون خارجي",type:"datalist",options:[{v:"أبيض",t:"أبيض"},{v:"أسود",t:"أسود"},{v:"فضي",t:"فضي"},{v:"رمادي",t:"رمادي"},...(window.state.exteriorColors||[]).map(a=>({v:a.name,t:a.name}))].filter((a,r,d)=>a.v&&d.findIndex(s=>s.v===a.v)===r)},{name:"interiorColor",label:"اللون داخلي",type:"datalist",options:[{v:"بيج",t:"بيج"},{v:"أسود",t:"أسود"},{v:"جملي",t:"جملي"},{v:"أحمر",t:"أحمر"},...(window.state.interiorColors||[]).map(a=>({v:a.name,t:a.name}))].filter((a,r,d)=>a.v&&d.findIndex(s=>s.v===a.v)===r)},{name:"status",label:"الحالة في المخزون",type:"select",options:[{v:"available",t:"متاح"},{v:"reserved",t:"محجوز"},{v:"sold",t:"مباع"},{v:"incoming",t:"قادم قريباً"},...(window.state.stockStatuses||[]).map(a=>({v:a.name,t:a.name}))].filter((a,r,d)=>a.v&&d.findIndex(s=>s.v===a.v)===r)},{name:"isFeatured",label:"عرض في قسم المميز؟",type:"select",options:[{v:!1,t:"لا"},{v:!0,t:"نعم"}]},{name:"desc",label:"وصف إضافي ومواصفات",type:"textarea"},{name:"_image_manager",label:"صور السيارة (المعرض)",type:"custom",html:`
        <div class="f-group full-width">
          <label>إدارة صور السيارة (المعرض والصورة الرئيسية)</label>
          <div class="img-manager-v2" id="car-image-manager">
            <!-- Rendered by window.renderCarImageManager -->
          </div>
          <input type="file" id="car-file-input" multiple accept="image/*" style="display:none;" onchange="window.handleCarFileSelect(this.files)">
        </div>
      `}],setTimeout(()=>window.renderCarImageManager(),100)):e==="ads"?o=[{name:"title",label:"العنوان",type:"text"},{name:"subtitle",label:"العنوان الفرعي",type:"text"},{name:"image",label:"صورة الإعلان (من الجهاز)",type:"file"},{name:"link",label:"الرابط (اختياري)",type:"text"}]:e==="sales"?o=[{name:"title",label:"العنوان",type:"text"},{name:"description",label:"وصف قصير",type:"textarea"},{name:"url",label:"رابط الفيديو (MP4 أو YouTube)",type:"text"},{name:"poster",label:"رابط صورة الغلاف",type:"text"}]:e==="reviews"?o=[{name:"name",label:"اسم العميل",type:"text",required:!0,placeholder:"مثال: عبدالله محمد"},{name:"car",label:"السيارة المشتراة (اختياري)",type:"text",placeholder:"مثال: تويوتا كامري 2024"},{name:"rating",label:"التقييم من 5 نجوم",type:"number",required:!0,placeholder:"5"},{name:"avatar",label:"رابط صورة العميل (اختياري)",type:"text",placeholder:"https://..."},{name:"text",label:"محتوى الرأي",type:"textarea",required:!0,placeholder:"لقد كانت تجربة رائعة مع هذا المعرض..."}]:e==="partners"?o=[{name:"name",label:"اسم الشريك",type:"text"},{name:"logo",label:"شعار الشريك (من الجهاز)",type:"file"},{name:"link",label:"رابط خارجي (اختياري)",type:"text"}]:e==="brands"?o=[{name:"name",label:"اسم العلامة التجارية",type:"text"},{name:"logo",label:"شعار البراند (من الجهاز)",type:"file"}]:e==="blogs"?o=[{name:"title",label:"عنوان المقال",type:"text"},{name:"image",label:"صورة المقال (من الجهاز)",type:"file"},{name:"content",label:"محتوى المقال",type:"textarea"}]:e==="locations"?o=[{name:"name",label:"اسم المدينة/الدولة",type:"text"},{name:"status",label:"الحالة",type:"select",options:[{v:"active",t:"نشط"},{v:"inactive",t:"غير نشط"}]}]:e==="plates"?o=[{name:"number",label:"رقم اللوحة",type:"text"},{name:"letters",label:"حروف اللوحة",type:"text"},{name:"price",label:"السعر",type:"number"},{name:"status",label:"الحالة",type:"select",options:[{v:"available",t:"متاح"},{v:"sold",t:"مباع"}]}]:e==="specs"?o=[{name:"name",label:"اسم المواصفة",type:"text"},{name:"icon",label:"أيقونة (FontAwesome)",type:"text"}]:e==="packages"?o=[{name:"name",label:"اسم الباقة",type:"text"},{name:"price",label:"السعر",type:"number"},{name:"features",label:"المميزات (فاصلة بين كل ميزة)",type:"textarea"}]:e==="bookings"?o=[{name:"name",label:"اسم العميل",type:"text"},{name:"phone",label:"الجوال",type:"text"},{name:"carRequested",label:"السيارة المطلوبة",type:"text"},{name:"status",label:"حالة الطلب",type:"select",options:[{v:"new",t:"جديد"},{v:"waiting",t:"بالانتظار"},{v:"inquiry",t:"استفسار"},{v:"sold",t:"مكتمل"},{v:"done",t:"تم"},{v:"cancelled",t:"مرفوض"}]},{name:"subStatus",label:"الحالة التفصيلية",type:"select",options:[{v:"not_contacted",t:"لم يتم التواصل"},{v:"contacted",t:"تم التواصل"},{v:"docs_received",t:"تم استلام الاوراق"},{v:"waiting_calc",t:"انتظار رد العميل"},{v:"waiting_docs",t:"إنتظار إكمال الاوراق"},{v:"waiting_signature",t:"إنتظار توقيع العميل"},{v:"docs_not_received",t:"لم يتم استلام الاوراق"},{v:"signed",t:"تم التوقيع"},{v:"delivered",t:"تم التسليم"},{v:"done",t:"تم"},{v:"no_response",t:"لم يتم رد العميل"},{v:"obligations",t:"التزامات"},{v:"calc_rejected",t:"رفض الحسبة"},{v:"ineligible",t:"غير مسموح له"},{v:"duplicate",t:"مكرر"}]},{name:"assignedTo",label:"الموظف المسؤول",type:"select",options:[{v:"",t:"غير محدد"},...window.state.users.filter(i=>i.email!=="zyrozyro98@gmail.com"&&(i.role==="staff"||i.role==="admin"||i.role==="supervisor")).map(i=>({v:i.id,t:i.name||(i.role==="admin"?"المدير: ":"المشرف: ")+(i.name||i.email)}))]},{name:"notes",label:"ملاحظات",type:"textarea"}]:e==="users"?o=[{name:"name",label:"الاسم الكامل",type:"text"},{name:"email",label:"البريد الإلكتروني",type:"text"},{name:"password",label:"كلمة المرور (عرض وتعديل)",type:"text"},{name:"role",label:"الصلاحية",type:"select",options:[{v:"staff",t:"موظف"},{v:"supervisor",t:"مشرف"},{v:"admin",t:"مدير"}]},{name:"isAvailable",label:"متاح لاستلام الطلبات؟",type:"select",options:[{v:!0,t:"نعم"},{v:!1,t:"لا"}]}]:e==="quickReplies"?o=[{name:"title",label:"عنوان الرد السريع",type:"text",required:!0,placeholder:"مثال: ترحيب بالعملاء الجدد"},{type:"custom",html:`
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
      `},{name:"content",label:"محتوى الرسالة الكامل",type:"textarea",required:!0,placeholder:"اكتب هنا نص الرسالة التي ستظهر للموظف لاستخدامها..."}]:e==="sales"?o=[{name:"title",label:"عنوان الفيديو",type:"text",required:!0,placeholder:"مثال: تسليم سيارة مرسيدس G-Class"},{name:"url",label:"رابط الفيديو (YouTube أو مباشر)",type:"text",required:!0,placeholder:"https://youtube.com/watch?v=..."},{name:"poster",label:"رابط صورة الغلاف (اختياري)",type:"text",placeholder:"https://..."},{name:"description",label:"وصف مبسط",type:"textarea",placeholder:"يسعدنا دائماً مشاركة لحظات نجاحنا..."}]:o=[{name:"name",label:"الاسم / العنوان",type:"text"},{name:"desc",label:"الوصف",type:"textarea"}],n.innerHTML=`
    <div class="form-grid-v3">
      ${o.map(i=>{if(i.type==="custom")return i.html;let a=t[i.name]!==void 0&&t[i.name]!==null?t[i.name]:"";i.name==="desc"&&!a&&(a=t.description||t.details||"");const r=i.required?"required":"",d=i.placeholder||i.label;let s="";return i.type==="select"?s=`
            <select name="${i.name}" class="filter-select" ${r}>
              ${i.options.map(l=>`<option value="${l.v}" ${l.v.toString()===a.toString()?"selected":""}>${l.t}</option>`).join("")}
            </select>
          `:i.type==="datalist"?s=`
            <input type="text" name="${i.name}" list="list-${i.name}" value="${a}" class="filter-select" ${r} autocomplete="off" placeholder="${d}">
            <datalist id="list-${i.name}">
              ${i.options.map(l=>`<option value="${l.v}">${l.t}</option>`).join("")}
            </datalist>
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
  `}window.handleCarFileSelect=function(e){if(e){for(let t=0;t<e.length;t++){const n=e[t];window.state.carImages.push({type:"file",value:n,preview:URL.createObjectURL(n),isMain:window.state.carImages.length===0})}window.renderCarImageManager()}};window.renderCarImageManager=function(){const e=document.getElementById("car-image-manager");if(!e)return;let n=`
    <div class="img-grid-v2">
      ${(window.state.carImages||[]).map((o,i)=>{const a=o.type==="url"?o.value:o.preview;return`
          <div class="img-item-v2 ${o.isMain?"is-main":""}" 
               draggable="true" 
               ondragstart="window.handleImageDragStart(event, ${i})"
               ondragover="window.handleImageDragOver(event)"
               ondragleave="window.handleImageDragLeave(event)"
               ondragend="window.handleImageDragEnd(event)"
               ondrop="window.handleImageDrop(event, ${i})">
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
  `;e.innerHTML=n};window.reorderCarImage=function(e,t){const n=window.state.carImages,o=e+t;if(o>=0&&o<n.length){const i=n[e];n[e]=n[o],n[o]=i,window.renderCarImageManager()}};window.removeCarImage=function(e){if(e<0||e>=window.state.carImages.length)return;const t=window.state.carImages[e].isMain;window.state.carImages.splice(e,1),t&&window.state.carImages.length>0&&(window.state.carImages[0].isMain=!0),window.renderCarImageManager()};window.handleImageDragStart=function(e,t){e.dataTransfer.setData("text/plain",t),e.currentTarget.classList.add("dragging")};window.handleImageDragOver=function(e){e.preventDefault(),e.currentTarget.classList.add("drag-over")};window.handleImageDragLeave=function(e){e.currentTarget.classList.remove("drag-over")};window.handleImageDragEnd=function(e){e.currentTarget.classList.remove("dragging")};window.handleImageDrop=function(e,t){e.preventDefault(),e.currentTarget.classList.remove("drag-over");const n=parseInt(e.dataTransfer.getData("text/plain"));if(n!==t){const o=window.state.carImages,i=o.splice(n,1)[0];o.splice(t,0,i),window.renderCarImageManager()}};window.setCarMainImage=function(e){window.state.carImages.forEach((t,n)=>t.isMain=n===e),window.renderCarImageManager()};window.saveLuxuryItem=async function(e){e&&e.preventDefault();const t=window.state.currentEdit;if(!t)return;const{type:n,id:o}=t,i=document.getElementById("item-form");if(!i)return;const a=i.querySelector('button[type="submit"]'),r=a.innerText;a&&(a.disabled=!0,a.innerText="جاري الحفظ والمعالجة...");const d=new FormData(i),s={};d.forEach((l,g)=>{if(g!=="main_img_file"&&g!=="gallery_files"){if(g==="password"&&!l)return;s[g]=l}});try{if(n==="cars"){const u=[];let c="";const m=window.state.carImages||[];for(let $=0;$<m.length;$++){const b=m[$];let w="";b.type==="url"?w=b.value:b.type==="file"&&(w=await window.compressImage(b.value,1e3,1e3,.6)),w&&(u.push(w),b.isMain&&(c=w))}!c&&u.length>0&&(c=u[0]),s.image=c,s.images=u}const l=["image","logo","avatar","poster"];for(const u of l)s[u]instanceof File&&s[u].size>0?s[u]=await window.compressImage(s[u],1e3,1e3,.7):s[u]instanceof File&&s[u].size===0&&delete s[u];if(["price","year","mileage","rating","installmentPeriod","monthlyInstallment"].forEach(u=>{s[u]!==void 0&&s[u]!==""&&s[u]!==null?s[u]=Number(s[u]):delete s[u]}),s.isFeatured!==void 0&&(s.isFeatured=s.isFeatured==="true"||s.isFeatured===!0),o||(s.createdAt=new Date().toISOString()),s.updatedAt=new Date().toISOString(),n==="users"&&!o){if(!s.password){window.showLuxuryToast("كلمة المرور مطلوبة للموظف الجديد","error"),a&&(a.disabled=!1,a.innerText=r);return}const u=pe(ge,"Secondary"),c=me(u);try{const $=(await Ee(c,s.email,s.password)).user.uid,b=B(L,`users/${$}`);await W(b,s),await de(u)}catch(m){throw await de(u),m}}else{if(n==="users"){const c=window._waServerActiveUrl||G;try{await fetch(`${c}/api/admin/update-user`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({adminUid:window.state.user.uid,targetUid:o,data:{password:s.password,email:s.email,name:s.name}})})}catch(m){console.warn("Backend Auth Sync failed:",m)}}const u=o?B(L,`${n}/${o}`):F(B(L,n));await(o?N(u,s):W(u,s)),n==="cars"&&(s.gearbox&&!(window.state.gearboxes||[]).some(c=>c.name===s.gearbox)&&(["عادي","أوتوماتيكي","CVT"].includes(s.gearbox)||await F(B(L,"gearboxes"),{name:s.gearbox})),s.bodyType&&!(window.state.bodyTypes||[]).some(c=>c.name===s.bodyType)&&(["sedan","suv","coupe","luxury","pickup"].includes(s.bodyType)||["سيدان","SUV","كوبيه","فاخرة","بيك آب"].includes(s.bodyType)||await F(B(L,"bodyTypes"),{name:s.bodyType})),s.make&&!(window.state.brands||[]).some(c=>c.name===s.make)&&await F(B(L,"brands"),{name:s.make}),s.engine&&!(window.state.engines||[]).some(c=>c.name===s.engine)&&(["4 سليندر","6 سليندر","8 سليندر"].includes(s.engine)||await F(B(L,"engines"),{name:s.engine})),s.color&&!(window.state.exteriorColors||[]).some(c=>c.name===s.color)&&(["أبيض","أسود","فضي","رمادي"].includes(s.color)||await F(B(L,"exteriorColors"),{name:s.color})),s.interiorColor&&!(window.state.interiorColors||[]).some(c=>c.name===s.interiorColor)&&(["بيج","أسود","جملي","أحمر"].includes(s.interiorColor)||await F(B(L,"interiorColors"),{name:s.interiorColor})),s.status&&!(window.state.stockStatuses||[]).some(c=>c.name===s.status)&&(["available","reserved","sold","incoming"].includes(s.status)||await F(B(L,"stockStatuses"),{name:s.status})))}window.showLuxuryToast(o?"تم تحديث البيانات بنجاح":"تم إضافة العنصر بنجاح"),window.closeModal("item-modal"),window.createLog(o?"تعديل":"إضافة",`${o?"تعديل":"إضافة"} في ${n} - ${s.make||s.title||o}`,"data")}catch(l){console.error("Save Error:",l),window.showLuxuryToast("حدث خطأ أثناء الحفظ: "+(l.message||"خطأ غير معروف"),"error")}finally{a&&(a.disabled=!1,a.innerText=r)}};window.openQuickReplyModal=function(){window.openCRUDModal("quickReplies")};window.renderQuickRepliesAdmin=function(){var o;const e=document.getElementById("quick-replies-list");if(!e)return;const t=(((o=document.getElementById("qr-search"))==null?void 0:o.value)||"").toLowerCase().trim(),n=(window.state.quickReplies||[]).filter(i=>(i.title||"").toLowerCase().includes(t)||(i.content||"").toLowerCase().includes(t));if(n.length===0){e.innerHTML='<div class="no-results-v2" style="grid-column:1/-1;"><p>لا توجد نتائج مطابقة لبحثك</p></div>';return}e.innerHTML=n.map(i=>`
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
    `).join("")};window.renderAdsSlider=function(){const e=document.getElementById("slider-track"),t=document.getElementById("slider-dots");if(!e)return;const n=window.state.ads||[];if(n.length===0){e.innerHTML='<div class="no-ads"></div>',t&&(t.innerHTML="");return}e.innerHTML=n.map(o=>`
        <div class="ad-slide">
            <img src="${o.image||"logo.jpg"}" class="ad-bg-img" alt="${o.title||"عرض خاص"}">
            <div class="ad-content">
                <h2 class="luxury-font">${o.title||""}</h2>
                <p>${o.subtitle||""}</p>
                ${o.link?`<a href="${o.link}" class="btn-premium"><span>اكتشف المزيد</span> <i class="fas fa-arrow-left" style="margin-right: 10px;"></i></a>`:""}
            </div>
        </div>
    `).join(""),t&&(t.innerHTML=n.map((o,i)=>`<div class="dot ${i===0?"active":""}" onclick="window.goToLuxurySlide(${i})"></div>`).join("")),window.state.sliderIndex=0,window.moveLuxurySlider(0)};window.goToLuxurySlide=function(e){window.state.sliderIndex=e,window.moveLuxurySlider(0)};window.moveLuxurySlider=function(e){var r;const t=document.getElementById("slider-track");if(!t)return;const n=((r=window.state.ads)==null?void 0:r.length)||0;if(n<=1){t.style.transform="translateX(0)";return}window.state.sliderIndex=(window.state.sliderIndex+e+n)%n;const o=window.state.sliderIndex*100,i=document.body.dir==="rtl";t.style.transform=`translateX(${i?o:-o}%)`,document.querySelectorAll(".slider-dots .dot").forEach((d,s)=>{d.classList.toggle("active",s===window.state.sliderIndex)})};window.calculateLuxuryFinancing=function(){var s,l,g;const e=Number((s=document.getElementById("calc-car-price"))==null?void 0:s.value)||0,t=Number((l=document.getElementById("calc-down-pay"))==null?void 0:l.value)||0,n=Number((g=document.getElementById("calc-years"))==null?void 0:g.value)||5,o=document.getElementById("calc-result-val");if(!o)return;const i=e-t;if(i<=0){o.innerText="0 ريال";return}const r=i*(1+.045*n),d=Math.round(r/(n*12));o.innerText=d.toLocaleString()+" ريال"};window.renderSalesVideos=function(){const e=document.getElementById("sales-container");if(!e)return;const t=window.state.sales||[];if(t.length===0){e.innerHTML='<div class="no-results-v2"><p>لا توجد مقاطع فيديو متاحة حالياً</p></div>';return}e.innerHTML=t.map(n=>{const o=(n.url||"").trim();let i=o.includes("youtube.com")||o.includes("youtu.be")||o.includes("youtube-nocookie.com"),a=o.includes("tiktok.com"),r=o.includes("instagram.com"),d=o.includes("snapchat.com"),s=n.poster||n.image||null;if(i&&!s){let l="";try{o.includes("v=")?l=o.split("v=")[1].split("&")[0]:o.includes("youtu.be/")?l=o.split("youtu.be/")[1].split("?")[0]:o.includes("embed/")?l=o.split("embed/")[1].split("?")[0]:l=o.split("/").pop().split("?")[0]}catch{l=""}l&&(s=`https://img.youtube.com/vi/${l}/hqdefault.jpg`)}return s=s||"logo.jpg",`
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
            </div>`}).join("")};window.openVideoLightbox=function(e){let t="";if(e.includes("youtube.com")||e.includes("youtu.be")){let o="";try{e.includes("v=")?o=e.split("v=")[1].split("&")[0]:e.includes("youtu.be/")?o=e.split("youtu.be/")[1].split("?")[0]:e.includes("embed/")?o=e.split("embed/")[1].split("?")[0]:o=e.split("/").pop().split("?")[0]}catch{o=""}t=`<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${o}?autoplay=1&modestbranding=1&rel=0" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`}else t=`<video controls autoplay style="width:100%; height:100%; border-radius:15px; background:#000;">
                        <source src="${e}" type="video/mp4">
                        متصفحك لا يدعم تشغيل الفيديو.
                    </video>`;const n=document.createElement("div");n.className="luxury-lightbox",n.id="video-lightbox",n.innerHTML=`
        <button class="lb-close" onclick="this.parentElement.remove()">&times;</button>
        <div class="lb-content animate-fade-in" style="max-width:1000px; width:95%; aspect-ratio:16/9; margin-top:0;">
            ${t}
        </div>
    `,document.body.appendChild(n)};window.toggleWAWidget=function(){const e=document.getElementById("wa-widget");e&&e.classList.toggle("hidden")};window.sendWAWidgetMsg=function(){var o;const e=document.getElementById("wa-input"),t=(o=e==null?void 0:e.value)==null?void 0:o.trim();if(!t)return;const n=window.state.settings.contactSales||"0500000000";window.open(`https://wa.me/${window.normalizePhone(n)}?text=${encodeURIComponent(t)}`,"_blank"),e&&(e.value=""),window.toggleWAWidget()};window.createLog=async function(e,t,n="general"){var o,i;try{const a=F(B(L,"logs"));await W(a,{user:((o=window.state.user)==null?void 0:o.email)||"Visitor",userId:((i=window.state.user)==null?void 0:i.uid)||null,action:e,details:t,category:n,timestamp:new Date().toISOString()})}catch(a){console.error("Log Error:",a)}};window.submitBooking=async function(e){var d,s,l,g,u,c,m,$,b,w,y,k,f,I,E,T,p,v,S,x,h,A,R,_,q;e.preventDefault();const t=e.target,n=t.querySelector('button[type="submit"]');let o=(((d=document.getElementById("b-phone-code"))==null?void 0:d.value)==="other"?(s=document.getElementById("b-phone-code-other"))==null?void 0:s.value:(l=document.getElementById("b-phone-code"))==null?void 0:l.value)||"966",i=((g=document.getElementById("b-phone"))==null?void 0:g.value)||"";o=o.replace(/\D/g,""),i=i.replace(/\D/g,""),i.startsWith("05")||i.startsWith("5")&&i.length===9||i.startsWith("9665")?(o="966",i.startsWith("05")&&(i=i.substring(1)),i.startsWith("966")&&(i=i.substring(3))):i.startsWith("07")||i.startsWith("7")&&i.length===9||i.startsWith("9677")?(o="967",i.startsWith("07")&&(i=i.substring(1)),i.startsWith("967")&&(i=i.substring(3))):(o&&i.startsWith(o)&&(i=i.substring(o.length)),o&&i.startsWith("00"+o)&&(i=i.substring(o.length+2)));const a=window.normalizePhone(o+i),r={customerType:((u=t.querySelector('[name="customer-type"]:checked'))==null?void 0:u.value)||"individual",carRequested:((c=document.getElementById("b-car"))==null?void 0:c.value)||"",name:((m=document.getElementById("b-name"))==null?void 0:m.value)||"",phone:a,age:(($=document.getElementById("b-age"))==null?void 0:$.value)||"",email:((b=document.getElementById("b-email"))==null?void 0:b.value)||"",nationality:((w=document.getElementById("b-nationality"))==null?void 0:w.value)==="مقيم"?((y=document.getElementById("b-nationality-other"))==null?void 0:y.value)||"مقيم":((k=document.getElementById("b-nationality"))==null?void 0:k.value)||"سعودي",city:((f=document.getElementById("b-city"))==null?void 0:f.value)==="أخرى"?((I=document.getElementById("b-city-other"))==null?void 0:I.value)||"أخرى":((E=document.getElementById("b-city"))==null?void 0:E.value)||"",paymentMethod:((T=t.querySelector('[name="payment-method"]:checked'))==null?void 0:T.value)||"كاش",bankName:((p=document.getElementById("b-bank-name"))==null?void 0:p.value)||"",installmentPeriod:((v=document.getElementById("b-installment-period"))==null?void 0:v.value)||"",salary:((S=document.getElementById("b-salary"))==null?void 0:S.value)||"",commitments:((x=document.getElementById("b-commitments"))==null?void 0:x.value)||"",workEntity:((h=document.getElementById("b-work-entity"))==null?void 0:h.value)||"حكومي",workStatus:((A=document.getElementById("b-work-status"))==null?void 0:A.value)||"معتمد",contactMethod:((R=t.querySelector('[name="contact-method"]:checked'))==null?void 0:R.value)||"الجوال",preferredTime:((_=t.querySelector('[name="preferred-time"]:checked'))==null?void 0:_.value)||"10am - 1pm",notes:((q=document.getElementById("b-notes"))==null?void 0:q.value)||"",status:"new",subStatus:"not_contacted",createdAt:new Date().toISOString()};n.disabled=!0,n.innerText="جاري الإرسال...";try{const z=B(L,"config/lastAssignedStaffIndex_v2"),j=window.state.users.filter(M=>M.role==="staff"&&M.isAvailable!==!1);j.length>0&&await K(z,M=>{let P=M||0;P>=j.length&&(P=0);const H=j[P];return r.assignedTo=H.id,(P+1)%j.length});const C=F(B(L,"bookings"));await W(C,r),r.assignedTo&&await F(B(L,"notifications"),{userId:r.assignedTo,type:"new_booking",title:"طلب جديد مسند إليك",body:`لديك طلب جديد من ${r.name} للسيارة ${r.carRequested}`,bookingId:C.key,read:!1,createdAt:new Date().toISOString()}),window.showLuxuryToast("تم إرسال طلبك بنجاح، سنتواصل معك قريباً"),t.reset()}catch(z){console.error(z),window.showLuxuryToast("حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً","error")}finally{n.disabled=!1,n.innerText="تأكيد طلب حجز الخدمة"}};window.fillAIInput=function(e){const t=document.getElementById("ai-chat-input");t&&(t.value=e)};window.clearAIChat=function(){const e=document.getElementById("ai-messages-area");e&&(e.innerHTML="")};window.askLuxuryAI=function(){var o;const e=document.getElementById("ai-chat-input"),t=(o=e==null?void 0:e.value)==null?void 0:o.trim();if(!t)return;J("user",t),e.value="";const n="ai-typing-"+Date.now();J("bot","جاري التفكير...",n),setTimeout(()=>{const i=document.getElementById(n);i&&i.remove();const a=Pe(t);J("bot",a)},1e3)};function J(e,t,n=null){const o=document.getElementById("ai-messages-area");if(!o)return;const i=document.createElement("div");i.className=`ai-msg ${e}`,n&&(i.id=n),i.innerHTML=`
        <div class="msg-icon"><i class="fas ${e==="bot"?"fa-robot":"fa-user"}"></i></div>
        <div class="msg-content">
            <p>${t}</p>
        </div>
    `,o.appendChild(i),o.scrollTop=o.scrollHeight}function Pe(e){const t=e.toLowerCase(),n=window.state.cars||[],o=window.state.bookings||[];return t.includes("قيمة")||t.includes("مخزون")?`إجمالي قيمة المخزون الحالي هو ${n.reduce((a,r)=>a+(parseFloat(r.price)||0),0).toLocaleString()} ريال سعودي لعدد ${n.length} سيارة.`:t.includes("موظف")||t.includes("أفضل")?"بناءً على البيانات الحالية، يتميز فريق المبيعات بنشاط عالٍ، والمنافسة قوية بين الموظفين لهذا الشهر.":t.includes("ملخص")||t.includes("أداء")?`حالة اليوم: يوجد ${o.filter(a=>a.status==="new"||!a.status).length} طلبات جديدة لم يتم معالجتها بعد، وإجمالي الطلبات في النظام هو ${o.length}.`:"أنا هنا لمساعدتك في إدارة المعرض. يمكنك سؤالي عن المخزون، الطلبات، أو الإحصائيات العامة."}window.renderWhatsAppMonitor=function(){var o,i;const e=document.getElementById("admin-wa-monitor-table");if(!e)return;const t=(((o=document.getElementById("wa-monitor-search"))==null?void 0:o.value)||"").toLowerCase();(i=document.getElementById("wa-monitor-filter"))!=null&&i.value;let n=(window.state.logs||[]).filter(a=>a.category==="whatsapp"||a.details.includes("WhatsApp"));if(t&&(n=n.filter(a=>a.details.toLowerCase().includes(t)||a.user.toLowerCase().includes(t))),n.length===0){e.innerHTML='<div class="no-data-admin" style="padding:40px; text-align:center;">لا توجد سجلات مراقبة حالياً</div>';return}e.innerHTML=n.map(a=>`
        <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:12px; border:1px solid var(--glass-border); margin-bottom:10px;">
            <div style="display:flex; justify-content:space-between;">
                <strong>${a.user}</strong>
                <span style="opacity:0.5; font-size:11px;">${new Date(a.timestamp).toLocaleString()}</span>
            </div>
            <p style="font-size:13px; margin:10px 0;">${a.details}</p>
            ${a.proofUrl?`<a href="${a.proofUrl}" target="_blank" class="btn-premium btn-sm" style="display:inline-block;">عرض الإثبات</a>`:""}
        </div>
    `).join("")};let D=null;const G="https://whatsapp-server-tq4f.onrender.com";window.WA_SERVER_URL_OVERRIDE||localStorage.getItem("wa_server_url");window.saveWAServerURL=async function(){const e=document.getElementById("wa-server-url-config");if(!e)return;let t=e.value.trim().replace(/\/$/,"");if(!t)return window.showLuxuryToast("يرجى إدخال الرابط","error");try{await W(B(L,"settings/waServerUrl"),t),localStorage.setItem("wa_server_url",t),window.showLuxuryToast("تم حفظ الرابط وبثه للجميع، سيتم تحديث الصفحة","success"),setTimeout(()=>location.reload(),1500)}catch{window.showLuxuryToast("خطأ في الصلاحيات لرفع الرابط","error")}};window.startStaffWASession=function(){const e=document.getElementById("wa-staff-select");if(!e||!e.value)return window.showLuxuryToast("يرجى اختيار موظف للربط","error");D&&(document.getElementById("wa-server-status").innerText="يتم الآن توليد كود الاستجابة للموظف...",document.getElementById("wa-server-status").style.color="var(--text-dim)",document.getElementById("wa-qr-container").style.display="none",D.emit("start_session",{userId:e.value}))};window.logoutStaffWASession=function(){const e=document.getElementById("wa-staff-select");if(!e||!e.value)return window.showLuxuryToast("يرجى اختيار الموظف أولاً","error");confirm("هل أنت متأكد من فصل رقم الواتساب لهذا الموظف وسجل المحادثة الخاصة به من السيرفر؟")&&D&&D.emit("logout_session",{userId:e.value})};window.initWhatsAppServer=async function(){const e=document.getElementById("wa-server-url-config");let t=null;window.location.hostname.includes("app.github.dev")&&(t=`https://${window.location.hostname.replace("-5173","-3001")}`,console.log("تم اكتشاف GitHub Codespaces، استخدام الرابط التلقائي:",t));let n=null;try{const a=await Se(B(L,"settings/waServerUrl"));a.exists()&&(n=a.val(),localStorage.setItem("wa_server_url",n))}catch(a){console.error("Firebase config error:",a)}const o=t||n||localStorage.getItem("wa_server_url")||G;window._waServerActiveUrl=o,e&&(e.value=o);const i=document.getElementById("wa-staff-select");if(i&&window.state&&window.state.users){const a=i.value;i.innerHTML='<option value="">-- اختر الموظف --</option>',window.state.users.filter(r=>r.role==="staff"||r.role==="admin"||r.role==="supervisor").forEach(r=>{const d=r.role==="admin"?"مدير":r.role==="supervisor"?"مشرف":"موظف";i.innerHTML+=`<option value="${r.id}" ${r.id===a?"selected":""}>${r.name||r.email||"موظف"} (${d})</option>`}),i.onchange=function(){this.value&&(D&&D.emit("join_room",this.value),window.startStaffWASession())},i.value&&(D&&D.emit("join_room",i.value),window.startStaffWASession())}typeof io<"u"&&!D&&(fetch(`${o}/ping`).catch(()=>{}),D=io(o,{reconnection:!0,reconnectionAttempts:10,reconnectionDelay:2e3,transports:["websocket","polling"],secure:!0}),D.on("connect_error",a=>{console.error("Connection Error:",a),a.message!=="websocket error"&&(window._waAlerted||(alert("عذراً، المتصفح لم يستطع الاتصال بخادم الواتساب. تأكد من أن الرابط يعمل في صفحة منفصلة. الخطأ: "+a.message),window._waAlerted=!0))}),D.on("connect",()=>{console.log("Connected to WhatsApp Server!");const a=document.getElementById("wa-connection-dot");a&&(a.style.background="#4de265",a.style.boxShadow="0 0 5px #4de265",a.title="متصل بالسيرفر"),window.state.user&&D.emit("join_room",window.state.user.uid),window.state.user&&window.startCurrentWASession&&setTimeout(()=>window.startCurrentWASession(),1500)}),D.on("qr",a=>{const r=document.getElementById("wa-staff-select"),d=document.getElementById("wa-server-status"),s=document.getElementById("wa-qr-container"),l=document.getElementById("wa-qr-canvas");if(r&&r.value===a.userId&&(d&&(d.innerText="في انتظار مسح كود الـ QR...",d.style.color="var(--text-color)"),s&&(s.style.display="block"),typeof QRCode<"u"&&l&&QRCode.toCanvas(l,a.qr,function(g){g&&console.error(g)})),window.state.user&&a.userId===window.state.user.uid){const g=document.getElementById("wa-my-status-title"),u=document.getElementById("wa-my-status-desc"),c=document.getElementById("wa-my-qr-container"),m=document.getElementById("wa-my-qr-canvas"),$=document.getElementById("btn-start-my-wa"),b=document.getElementById("btn-logout-my-wa");g&&(g.innerText="بانتظار مسح رمز QR..."),u&&(u.innerText="افتح واتساب على هاتفك وامسح الرمز الظاهر أدناه ليتم ربط حسابك."),c&&(c.style.display="block"),$&&($.innerText="تحديث الرمز"),b&&(b.style.display="none"),typeof QRCode<"u"&&m&&QRCode.toCanvas(m,a.qr,{width:250,margin:2},function(w){w&&console.error(w)})}}),D.on("ready",a=>{const r=document.getElementById("wa-staff-select"),d=document.getElementById("wa-connection-dot");if(d&&(d.style.background="#4de265",d.style.boxShadow="0 0 8px #4de265",d.title="واتساب جاهز للعمل"),r&&r.value===a.userId){const s=document.getElementById("wa-server-status"),l=document.getElementById("wa-qr-container");s&&(s.innerText=a.msg,s.style.color="#00a884"),l&&(l.style.display="none")}if(window.state.user&&a.userId===window.state.user.uid){const s=document.getElementById("wa-my-status-title"),l=document.getElementById("wa-my-status-desc"),g=document.getElementById("wa-my-qr-container"),u=document.getElementById("btn-start-my-wa"),c=document.getElementById("btn-logout-my-wa");s&&(s.innerText="واتساب متصل بنجاح"),l&&(l.innerText="حسابك الآن مرتبط بالنظام، يمكنك البدء في استقبال وإرسال الرسائل للعملاء."),g&&(g.style.display="none"),u&&(u.style.display="none"),c&&(c.style.display="inline-block"),window.showLuxuryToast("تم ربط حساب واتساب الخاص بك بنجاح","success")}}),D.on("disconnected",a=>{console.log("Disconnected Event:",a);const r=document.getElementById("wa-connection-dot");r&&(r.style.background="#ff4b4b",r.style.boxShadow="0 0 5px #ff4b4b",r.title="تم قطع الاتصال بالسيرفر");const d=a.msg||"تم قطع الاتصال بالسيرفر. يرجى إعادة الربط لتفعيل خدمات الدردشة.",s=document.getElementById("wa-staff-select");if(s&&s.value===a.userId){const l=document.getElementById("wa-server-status");l&&(l.innerText=d,l.style.color="red")}if(window.state.user&&a.userId===window.state.user.uid){const l=document.getElementById("wa-my-status-title"),g=document.getElementById("wa-my-status-desc"),u=document.getElementById("btn-start-my-wa"),c=document.getElementById("btn-logout-my-wa"),m=document.getElementById("wa-my-qr-container");l&&(l.innerText="الواتساب غير متصل"),g&&(g.innerText=d),m&&(m.style.display="none"),u&&(u.style.display="inline-block",u.innerText="إعادة الربط الآن"),c&&(c.style.display="none")}}),D.on("jid_resolved",({oldJid:a,newJid:r})=>{console.log(`JID Resolution detected: ${a} -> ${r}`);const s=(window.state.bookings||[]).find(l=>l.waJid===a);s&&(console.log(`Updating booking ${s.id} JID due to resolution`),N(B(L,`bookings/${s.id}`),{waJid:r,phone:window.normalizePhone(r)}).catch(l=>{}),window._currentWaPhone===a&&(window._currentWaPhone=r,typeof window.openStaffChat=="function"&&window.openStaffChat(r)))}),D.on("message",async a=>{var $,b,w;console.log("Real-time WA message received:",a);const r=window.normalizePhone,d=r(a.from),s=r(window._currentWaPhone),l=document.getElementById("details-modal"),g=l&&!l.classList.contains("hidden"),u=document.getElementById("wa-connection-dot");u&&(u.style.transform="scale(1.2)",setTimeout(()=>u.style.transform="scale(1)",300));const c=window.state.bookings||[];let m=c.find(y=>y.waJid===a.from);if(m||(m=c.find(y=>{if(!y.phone)return!1;const k=window.normalizePhone(y.phone);return!d.includes("@")&&k===d}),m&&!m.waJid&&(console.log(`Smart Pinning JID ${a.from} to booking ${m.id}`),N(B(L,`bookings/${m.id}`),{waJid:a.from}).catch(y=>{}),m.waJid=a.from)),g&&s&&d===s)setTimeout(()=>{window.fetchServerWAChat(window._currentWaPhone,a.userId)},500);else{if(a.isMe)return;const y=a.userId===(($=window.state.userProfile)==null?void 0:$.id),k=((b=window.state.userProfile)==null?void 0:b.role)==="admin"||((w=window.state.userProfile)==null?void 0:w.role)==="supervisor";(y||k)&&m&&window.showWAPushNotification&&window.showWAPushNotification(d,a.body,a.userId)}}))};window.showWAPushNotification=async function(e,t,n){window.playNotificationSound&&window.playNotificationSound();let o=document.getElementById("wa-push-notifications-container");o||(o=document.createElement("div"),o.id="wa-push-notifications-container",o.style.cssText="position:fixed; bottom:30px; left:25px; z-index:999999; display:flex; flex-direction:column-reverse; gap:12px; width:340px; pointer-events:none;",document.body.appendChild(o));const a=(window.state.bookings||[]).find(m=>m.phone&&window.normalizePhone(m.phone)===window.normalizePhone(e)),r=a&&a.name?a.name:e;let d=t||"رسالة جديدة";d.length>70&&(d=d.substring(0,70)+"...");const s=document.createElement("div");s.style.cssText="background:rgba(255,255,255,0.98); border-right:4px solid #00a884; border-radius:12px; padding:12px 15px; box-shadow:0 6px 20px rgba(0,0,0,0.15); pointer-events:auto; cursor:pointer; transform:translateX(-120%); transition:transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s, margin 0.3s; opacity:0; overflow:hidden; position:relative; direction:rtl;",s.innerHTML=`
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
    `;const l=s.querySelector(".fa-times-btn");l.onmouseover=()=>l.style.color="#e02424",l.onmouseout=()=>l.style.color="#999";const g=async()=>{var m;try{await F(B(L,"notifications"),{userId:n||((m=window.state.userProfile)==null?void 0:m.id)||"admin",type:"wa_message",title:"رسالة واتساب من "+r,body:d,phone:e,read:!1,createdAt:new Date().toISOString()})}catch($){console.warn("Could not save to notifications DB",$)}};let u=setTimeout(()=>{c(),g()},1e4);const c=()=>{s.style.transform="translateX(-120%)",s.style.opacity="0",s.style.marginTop=`-${s.offsetHeight}px`,setTimeout(()=>{s.parentNode&&s.parentNode.removeChild(s)},400)};l.onclick=m=>{m.stopPropagation(),clearTimeout(u),c()},s.onclick=()=>{clearTimeout(u),c(),a?(window.viewBookingDetails(a.id),setTimeout(()=>{const m=document.getElementById("details-modal").querySelector(".dash-tab.admin-only");m&&m.click()},100)):window.showLuxuryToast("الرسالة من رقم غير مسجل في أي طلب مفتوح","info")},o.insertBefore(s,o.firstChild),requestAnimationFrame(()=>{s.style.transform="translateX(0)",s.style.opacity="1"})};window.startCurrentWASession=function(){if(!window.state.user)return;const e=()=>{D.emit("start_session",{userId:window.state.user.uid});const t=document.getElementById("wa-my-status-title"),n=document.getElementById("wa-my-status-desc");t&&(t.innerText="جاري الاتصال..."),n&&(n.innerText="يتم الآن التواصل مع خادم الواتساب لتوليد رمز الاستجابة السريعة...")};D?D.connected?e():(D.once("connect",e),D.connect()):window.initWhatsAppServer()};window.logoutCurrentWASession=function(){window.state.user&&confirm("هل أنت متأكد من تسجيل الخروج من واتساب؟ لن تتمكن من المراسلة من هنا.")&&D&&D.emit("logout_session",{userId:window.state.user.uid})};window._waMediaCache=window._waMediaCache||{};window.fetchServerWAChat=async function(e,t){var i,a,r;if(!e)return;const n=document.getElementById("wa-server-chat-box");if(!n)return;let o=(i=window.state.userProfile)==null?void 0:i.id;if(((a=window.state.userProfile)==null?void 0:a.role)==="admin"||((r=window.state.userProfile)==null?void 0:r.role)==="supervisor")if(t)o=t;else{const s=(window.state.bookings||[]).find(l=>l.phone&&window.normalizePhone(l.phone)===window.normalizePhone(e));if(s&&s.assignedTo)o=s.assignedTo;else{n.innerHTML=`
                <div style="text-align:center; margin-top:auto; margin-bottom:auto;">
                    <div style="background:rgba(255,255,255,0.95); display:inline-block; padding:20px; border-radius:15px; font-size:13px; color:#555; box-shadow:0 10px 30px rgba(0,0,0,0.1); max-width:85%;">
                        <i class="fas fa-user-slash" style="color:#00a884; font-size:32px; margin-bottom:15px; display:block;"></i>
                        هذا الحجز غير مسند لموظف.<br>
                        سجل المحادثات متاح فقط للحجوزات المسندة.
                    </div>
                </div>`;return}}window._currentWaPhone=e,(!n.hasChildNodes()||n.innerHTML.includes("fa-circle-notch")||n.innerHTML.includes("fa-comment-dots"))&&(n.innerHTML='<div style="text-align:center; margin-top:auto; margin-bottom:auto;"><i class="fas fa-circle-notch fa-spin" style="font-size: 30px; color: #00a884; margin-bottom: 12px;"></i><br><div style="background: rgba(255,255,255,0.9); display: inline-block; padding: 8px 16px; border-radius: 12px; font-size: 12px; color: #555; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">جاري مزامنة الرسائل...</div></div>');try{const d=window._waServerActiveUrl||G,s=await fetch(`${d}/api/chat/${o}/${e}`);if(s.ok){const l=await s.json();if(l.messages&&l.messages.length>0){const g=n.scrollHeight-n.scrollTop-n.clientHeight<50;n.innerHTML="";const u=document.createElement("div");u.style.cssText="text-align:center; margin:10px 0 15px;",u.innerHTML='<span style="background:#fefed7; color:#54656f; font-size:11px; padding:6px 12px; border-radius:8px; box-shadow:0 1px 1px rgba(0,0,0,0.05); display:inline-block;"><i class="fas fa-lock" style="margin-left:4px; font-size:10px;"></i> الرسائل محمية ومسجلة عبر الخادم الداخلي</span>',n.appendChild(u),l.messages.forEach(c=>{const m=Number(c.timestamp),$=m?new Date(m>1e10?m:m*1e3).toLocaleTimeString("ar-SA",{hour:"numeric",minute:"2-digit",hour12:!0}):"";let b=(c.body||"").replace(/</g,"&lt;").replace(/>/g,"&gt;");b=b.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#027eb5; text-decoration:underline;">$1</a>');const w=document.createElement("div");w.style.padding="6px 8px 8px 10px",w.style.maxWidth="75%",w.style.fontSize="14.5px",w.style.marginBottom="4px",w.style.position="relative",w.style.boxShadow="0 1px 1.5px rgba(11,20,26,0.1)",w.style.whiteSpace="pre-wrap",w.style.lineHeight="1.4",w.style.wordBreak="break-word",w.style.overflowWrap="anywhere",c.isMe?(w.style.alignSelf="flex-end",w.style.background="#d9fdd3",w.style.color="#111b21",w.style.borderRadius="12px 0 12px 12px"):(w.style.alignSelf="flex-start",w.style.background="#ffffff",w.style.color="#111b21",w.style.borderRadius="0 12px 12px 12px");let y=`<div>${b}</div>`;if(c.media)if(window._waMediaCache[c.id]&&(c.media.data=window._waMediaCache[c.id]),c.media.data===null){const f=`btn-dl-${c.id}`,I=`cont-dl-${c.id}`;let E="مرفق";c.media.mimetype.startsWith("image/")?E="صورة":c.media.mimetype.startsWith("video/")?E="فيديو":(c.media.mimetype.startsWith("audio/")||c.type==="ptt")&&(E="مقطع صوتي"),y=`<div id="${I}" style="margin-bottom:8px; display:flex; align-items:center; gap:10px; background:rgba(0,0,0,0.05); padding:10px; border-radius:8px;">
                                <i class="fas fa-file-download" style="font-size:24px; color:#54656f;"></i>
                                <div style="flex:1;">
                                    <strong style="display:block; font-size:13px;">${E} سابق</strong>
                                    <span style="font-size:11px; opacity:0.7;">${c.media.filename||"اضغط للتحميل من السيرفر"}</span>
                                </div>
                                <button id="${f}" class="btn-premium btn-sm" onclick="window.downloadWAMedia('${o}', '${e}', '${c.id}', '${I}', '${c.media.mimetype}', '${c.type}')" style="padding:4px 10px; min-width:40px;"><i class="fas fa-download"></i></button>
                            </div>`+(b?`<div>${b}</div>`:"")}else c.media.mimetype.startsWith("image/")?y=`<div style="margin:-4px -6px 4px -8px; background:rgba(0,0,0,0.02); border-radius:10px 10px 0 0; overflow:hidden; text-align:center;"><img src="data:${c.media.mimetype};base64,${c.media.data}" style="max-width:100%; max-height:220px; border-radius:8px; display:inline-block; cursor:pointer; object-fit:cover;" onclick="window.viewFullImage(this.src)"></div>`+(b?`<div>${b}</div>`:""):c.media.mimetype.startsWith("audio/")||c.type==="ptt"?y=`<div style="display:flex; align-items:center; gap:10px;"><div style="background:#00a884; width:40px; height:40px; border-radius:50%; display:flex; justify-content:center; align-items:center; flex-shrink:0;"><i class="fas fa-play" style="color:white; margin-right:-2px; font-size:14px;"></i></div> <audio controls style="max-width:200px; height:35px;"><source src="data:${c.media.mimetype};base64,${c.media.data}" type="${c.media.mimetype}"></audio></div>`+(b?`<div style="margin-top:5px;">${b}</div>`:""):c.media.mimetype.startsWith("video/")?y=`<video controls style="max-width:100%; border-radius:8px; margin-bottom:5px;"><source src="data:${c.media.mimetype};base64,${c.media.data}" type="${c.media.mimetype}"></video>`+(b?`<div>${b}</div>`:""):y=`<div style="background:rgba(0,0,0,0.05); padding:10px; border-radius:8px; display:flex; align-items:center; gap:10px; margin-bottom:5px;"><i class="fas fa-file-alt" style="font-size:24px; color:#54656f;"></i> <div><strong style="display:block; font-size:13px;">ملف ${c.media.filename||"مرفق"}</strong><span style="font-size:11px; opacity:0.7;">تنزيل للعرض</span></div></div>`+(b?`<div>${b}</div>`:"");let k="";if(c.isMe){let f=c.ack!==void 0?c.ack:c.status==="read"?3:c.status==="delivered"?2:c.status==="sent"?1:void 0;f===1||f===0?k='<i class="fas fa-check" style="font-size:12px; margin-right:4px; color:#c7c7c7;"></i>':f===2?k='<i class="fas fa-check-double" style="font-size:12px; margin-right:4px; color:#c7c7c7;"></i>':f>=3?k='<i class="fas fa-check-double" style="font-size:12px; margin-right:4px; color:#53bdeb;"></i>':k='<i class="fas fa-check" style="font-size:12px; margin-right:4px; color:#c7c7c7;"></i>'}w.innerHTML=`${y} <div style="display:flex; justify-content:flex-end; align-items:center; margin-top:2px; float:left; margin-left:-5px; padding-left:10px; padding-top:2px;">
                      <span style="font-size:11px; color:#667781;">${$}</span>
                      ${k}
                    </div><div style="clear:both;"></div>`,n.appendChild(w)}),(g||n.innerHTML.includes("fa-lock"))&&setTimeout(()=>{n.scrollTo({top:n.scrollHeight,behavior:"smooth"})},100)}else n.innerHTML='<div style="text-align:center; margin-top:auto; margin-bottom:auto;"><div style="background:rgba(255,255,255,0.95); display:inline-block; padding:15px 30px; border-radius:15px; font-size:13px; color:#555; box-shadow:0 3px 10px rgba(0,0,0,0.08);"><i class="fas fa-comment-dots" style="color:#00a884; font-size:24px; margin-bottom:10px; display:block;"></i>لا توجد رسائل سابقة مع هذا الرقم.<br>يمكنك بدء دردشة جديدة الآن.</div></div>'}else n.innerHTML=`
                <div style="text-align:center; margin-top:auto; margin-bottom:auto;">
                    <div style="background:rgba(255,255,255,0.95); display:inline-block; padding:25px; border-radius:15px; font-size:14px; color:#555; box-shadow:0 3px 10px rgba(0,0,0,0.08);">
                        <i class="fab fa-whatsapp" style="font-size:50px; margin-bottom:15px; color:#8696a0;"></i>
                        <p style="margin-bottom:15px;">خادم واتساب غير متصل لهذا الموظف</p>
                        <button class="btn-premium btn-sm" onclick="window.closeModal('details-modal'); window.switchLuxuryTab('whatsapp-mgmt')">اذهب لإعدادات الواتساب</button>
                    </div>
                </div>
            `}catch{n.innerHTML='<div style="text-align:center; margin-top:auto; margin-bottom:auto;"><div style="background:rgba(255,255,255,0.95); display:inline-block; padding:15px 25px; border-radius:15px; font-size:13px; color:#e02424; box-shadow:0 3px 10px rgba(0,0,0,0.08);"><i class="fas fa-exclamation-triangle" style="font-size:24px; margin-bottom:10px; display:block;"></i>فشل الاتصال بالخادم. يرجى التأكد من تشغيل السيرفر.</div></div>'}};let O,X=[];window.startWARecording=async function(){window._waRecordingIntent=!0;try{const e=await navigator.mediaDevices.getUserMedia({audio:!0});if(!window._waRecordingIntent){e.getTracks().forEach(n=>n.stop());return}O=new MediaRecorder(e),X=[],window._waRecordingStartTime=Date.now(),O.ondataavailable=n=>{n.data.size>0&&X.push(n.data)},O.start();const t=document.getElementById("wa-mic-btn");t&&(t.style.color="red")}catch{window.showLuxuryToast("لم يتم السماح باستخدام الميكروفون","error"),window._waRecordingIntent=!1}};window.stopWARecording=function(e,t){window._waRecordingIntent&&(window._waRecordingIntent=!1,!(!O||O.state==="inactive")&&(O.onstop=async()=>{if(Date.now()-(window._waRecordingStartTime||Date.now())<500||X.length===0){O.stream.getTracks().forEach(d=>d.stop());const r=document.getElementById("wa-mic-btn");r&&(r.style.color="#54656f");return}const o=new Blob(X,{type:"audio/webm"}),i=new FileReader;i.readAsDataURL(o),i.onloadend=()=>{const r=i.result.split(",")[1];window.sendServerWAMessage(e,t,{data:r,mimetype:"audio/webm",filename:"voice_note.webm",ptt:!0},"")};const a=document.getElementById("wa-mic-btn");a&&(a.style.color="#54656f"),O.stream.getTracks().forEach(r=>r.stop())},O.stop()))};window.handleWAMediaSelect=function(e,t){const n=document.getElementById("wa-media-upload"),o=n.files&&n.files[0];if(!o)return;if(o.size>16*1024*1024){window.showLuxuryToast("حجم الملف كبير جداً، أقصى حد يسمح به الواتساب هو 16 ميجابايت","error");return}const i=new FileReader;i.onload=function(a){const r=a.target.result.split(",")[1],d=o.type||"application/octet-stream",s=o.name;let l=prompt("هل تريد إرفاق رسالة نصية مع هذا الملف؟ (اختياري)","");if(l===null){n.value="";return}window.sendServerWAMessage(e,t,{data:r,mimetype:d,filename:s},l)},i.readAsDataURL(o)};window.sendServerWAMessage=async function(e,t,n=null,o=null){const i=document.getElementById("wa-server-input");if(i&&i.disabled)return;const a=o!==null?o:i?i.value.trim():"";if(!n&&!a)return;let r=window.state.userProfile.id;window.state.userProfile.role==="admin"&&t&&(r=t),i&&o===null&&(i.value="",i.style.height="42px",i.focus());const d=document.getElementById("wa-server-chat-box");if(d){(d.innerHTML.includes("fa-comment-dots")||d.innerHTML.includes("fa-circle-notch")||!d.hasChildNodes())&&(d.innerHTML='<div style="text-align:center; margin:10px 0 15px;"><span style="background:#fefed7; color:#54656f; font-size:11px; padding:6px 12px; border-radius:8px; box-shadow:0 1px 1px rgba(0,0,0,0.05); display:inline-block;"><i class="fas fa-lock" style="margin-left:4px; font-size:10px;"></i> الرسائل محمية ومسجلة عبر الخادم الداخلي</span></div>');const s=new Date().toLocaleTimeString("ar-SA",{hour:"numeric",minute:"2-digit",hour12:!0});let l=(a||"").replace(/</g,"&lt;").replace(/>/g,"&gt;");l=l.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#027eb5; text-decoration:underline;">$1</a>');const g=document.createElement("div");g.style.padding="6px 8px 8px 10px",g.style.maxWidth="75%",g.style.fontSize="14.5px",g.style.marginBottom="4px",g.style.position="relative",g.style.boxShadow="0 1px 1.5px rgba(11,20,26,0.1)",g.style.whiteSpace="pre-wrap",g.style.lineHeight="1.4",g.style.wordBreak="break-word",g.style.overflowWrap="anywhere",g.style.alignSelf="flex-end",g.style.background="#d9fdd3",g.style.color="#111b21",g.style.borderRadius="12px 0 12px 12px";let u=`<div>${l}</div>`;n&&(u='<div style="margin-bottom:5px; font-size:12px; color:#555;"><i class="fas fa-paperclip"></i> تم إرسال مرفق</div>'+u);let c='<i class="fas fa-clock" style="font-size:12px; margin-right:4px; color:#c7c7c7;"></i>';g.innerHTML=`${u} <div style="display:flex; justify-content:flex-end; align-items:center; margin-top:2px; float:left; margin-left:-5px; padding-left:10px; padding-top:2px;"><span style="font-size:11px; color:#667781;">${s}</span>${c}</div><div style="clear:both;"></div>`,d.appendChild(g),setTimeout(()=>{d.scrollTo({top:d.scrollHeight,behavior:"smooth"})},50)}try{const s=window._waServerActiveUrl||G,l={userId:r,phone:e,message:a};n&&(l.media=n),(await fetch(`${s}/api/send`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)})).ok?setTimeout(()=>window.fetchServerWAChat(e,r),1500):(window.showLuxuryToast("الواتساب غير متصل في الإدارة، المرجو فحص الاتصال","error"),i&&o===null&&!n&&(i.value=a))}catch{window.showLuxuryToast("الخادم البرمجي مغلق أو متوقف","error"),i&&o===null&&!n&&(i.value=a)}finally{const s=document.getElementById("wa-media-upload");s&&(s.value="")}};window.openQuickReplyModal=function(){window.openCRUDModal("quickReplies")};window.editQuickReply=function(e){window.openCRUDModal("quickReplies",e)};window.addQuickReply=async function(e){window.openQuickReplyModal()};window.deleteQuickReply=async function(e,t){if(confirm("هل أنت متأكد من الحذف؟")){let n="";t&&(n=t.innerHTML,t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin"></i>');try{await U(B(L,`quickReplies/${e}`)),window.showLuxuryToast("تم الحذف بنجاح")}catch(o){console.error("Error deleting quick reply:",o),window.showLuxuryToast("فُقدت الصلاحية أو حدث خطأ أثناء الحذف","error"),t&&(t.disabled=!1,t.innerHTML=n)}}};window.renderQuickRepliesAdmin=function(){var o;const e=document.getElementById("quick-replies-list");if(!e)return;const t=(((o=document.getElementById("qr-search"))==null?void 0:o.value)||"").toLowerCase();let n=window.state.quickReplies||[];if(t&&(n=n.filter(i=>(i.title||"").toLowerCase().includes(t)||(i.content||"").toLowerCase().includes(t))),n.length===0){e.innerHTML=`
            <div class="no-results-v2 full-width">
                <i class="fas fa-search"></i>
                <p>${t?"لا توجد نتائج تطابق بحثك":"لا توجد نماذج ردود سريعة حالياً"}</p>
            </div>`;return}e.innerHTML=n.map(i=>`
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
    `).join("")};window._qrExpanded=!1;window.renderQuickRepliesBar=function(){const e=document.getElementById("wa-quick-replies-bar");if(!e)return;const t=window.state.quickReplies||[];if(t.length===0){e.style.display="none";return}e.style.display="flex";const n=window._qrExpanded;let o=t,i=!1;!n&&t.length>4&&(o=t.slice(0,4),i=!0);let a=o.map(r=>`
        <button onclick="window.applyQuickReplyById('${r.id}')" style="background:white; border:1px solid var(--glass-border); padding:6px 12px; border-radius:16px; font-size:12px; color:#54656f; cursor:pointer; flex-shrink:0; white-space:nowrap; transition:all 0.2s; box-shadow:0 1px 2px rgba(0,0,0,0.05);" onmouseover="this.style.background='#f0f2f5'" onmouseout="this.style.background='white'">
            ${r.title}
        </button>
    `).join("");i?a+='<button onclick="window._qrExpanded=true; window.renderQuickRepliesBar();" style="background:#00a884; color:white; border:none; padding:6px 12px; border-radius:16px; font-size:12px; cursor:pointer; flex-shrink:0;">عرض الكل <i class="fas fa-chevron-left" style="margin-right:4px;"></i></button>':n&&t.length>4&&(a+='<button onclick="window._qrExpanded=false; window.renderQuickRepliesBar();" style="background:#e02424; color:white; border:none; padding:6px 12px; border-radius:16px; font-size:12px; cursor:pointer; flex-shrink:0;">إخفاء <i class="fas fa-chevron-right" style="margin-right:4px;"></i></button>'),e.innerHTML=a};window.applyQuickReplyById=function(e){const t=(window.state.quickReplies||[]).find(n=>n.id===e);t&&t.content&&window.applyQuickReply(t.content)};window.applyQuickReply=function(e){var n;const t=document.getElementById("wa-server-input");if(t){let o=e;const i=((n=window.state.userProfile)==null?void 0:n.name)||"الموظف";o=o.replace(/\(اسم الموظف\)/g,i);let a="العميل",r="السيارة",d="غير محدد",s="غير محدد",l="غير محدد",g="غير محدد",u="غير محدد",c="غير محدد",m="غير محدد",$="غير محدد",b="غير محدد",w="غير محدد",y="",k="غير محدد",f="غير محدد",I="غير محدد",E="غير محدد",T="غير محدد",p="غير محدد",v="---";if(window._currentWaPhone){const S=window._currentWaPhone.toString(),x=(window.state.bookings||[]).filter(h=>h.phone&&h.phone.toString()===S||h.waJid&&h.waJid.toString()===S||h.phone&&S.includes(h.phone.toString()));if(x&&x.length>0){x.sort((R,_)=>(_.createdAt||0)-(R.createdAt||0));const h=x[0];h.name&&(a=h.name);let A=null;h.carId?A=(window.state.cars||[]).find(R=>R.id===h.carId):h.carRequested&&(A=(window.state.cars||[]).find(R=>{const _=`${R.make} ${R.model} ${R.year}`.toLowerCase();return _.includes(h.carRequested.toLowerCase())||h.carRequested.toLowerCase().includes(_)})),A?(d=A.make||d,s=A.model||s,l=A.year||l,g=A.price?Number(A.price).toLocaleString("ar-SA"):g,u=A.engine||u,c=A.mileage||c,m=A.fuelType||m,b=A.color||b,w=A.interiorColor||w,$={sedan:"سيدان",suv:"SUV",coupe:"كوبيه",luxury:"فاخرة",pickup:"بيك آب"}[A.bodyType]||A.bodyType||$,r=`${d} ${s} ${l}`.trim()):h.brand||h.model?(r=`${h.brand||""} ${h.model||""} ${h.year||""}`.trim(),d=h.brand||d,s=h.model||s,l=h.year||l):(h.carName||h.carRequested)&&(r=h.carName||h.carRequested),h.paymentMethod&&(y=h.paymentMethod==="cash"?"كاش":"تمويل"),h.bankName&&(k=h.bankName),h.installmentPeriod&&(f=h.installmentPeriod),h.salary&&(I=h.salary),h.commitments&&(E=h.commitments),h.workEntity&&(T=h.workEntity),h.workStatus&&(p=h.workStatus),h.id&&(v=h.id.toString().slice(-6).toUpperCase())}}o=o.replace(/\(رقم الطلب\)/g,v),o=o.replace(/\(اسم العميل\)/g,a),o=o.replace(/\(اسم السيارة\)/g,r),o=o.replace(/\(الماركة\)/g,d),o=o.replace(/\(الموديل\)/g,s),o=o.replace(/\(سنة الصنع\)/g,l),o=o.replace(/\(السعر\)/g,g),o=o.replace(/\(المحرك\)/g,u),o=o.replace(/\(الممشى\)/g,c),o=o.replace(/\(نوع الوقود\)/g,m),o=o.replace(/\(فئة السيارة\)/g,$),o=o.replace(/\(اللون الخارجي\)/g,b),o=o.replace(/\(اللون الداخلي\)/g,w),o=o.replace(/\(طريقة الشراء\)/g,y),o=o.replace(/\(اسم السيارة وتفاصيلها وطريقة الشراء وتفاصيله كاملة\)/g,`${r} - الدفع: ${y}`),o=o.replace(/\(اسم البنك الراتب عليه أو المفضل\)/g,k),o=o.replace(/\(اسم البنك\)/g,k),o=o.replace(/\(مدة الأقساط المفضل\)/g,f),o=o.replace(/\(مدة الأقساط\)/g,f),o=o.replace(/\(الراتب الشهري \(صافي\)\)/g,I),o=o.replace(/\(الراتب الشهري\)/g,I),o=o.replace(/\(الراتب\)/g,I),o=o.replace(/\(الإلتزامات الشهرية\)/g,E),o=o.replace(/\(الإلتزامات\)/g,E),o=o.replace(/\(جهة العمل\)/g,T),o=o.replace(/\(حالة الجهة\)/g,p),t.value=o,t.style.height="42px",t.style.height=Math.min(t.scrollHeight,150)+"px",t.focus()}};window.downloadWAMedia=async function(e,t,n,o,i,a){const r=document.getElementById(o.replace("cont-dl-","btn-dl-"));r&&(r.disabled=!0,r.innerHTML='<i class="fas fa-spinner fa-spin"></i>');try{const d=window._waServerActiveUrl||G,s=await fetch(`${d}/api/media/${e}/${t}/${n}`);if(!s.ok)throw new Error("Failed");const l=await s.json();if(!l.data)throw new Error("No data");window._waMediaCache[n]=l.data;const g=document.getElementById(o);if(!g)return;let u="";i.startsWith("image/")?u=`<div style="margin:-4px -6px 4px -8px; background:rgba(0,0,0,0.02); border-radius:10px 10px 0 0; overflow:hidden; text-align:center;"><img src="data:${i};base64,${l.data}" style="max-width:100%; max-height:220px; border-radius:8px; display:inline-block; cursor:pointer; object-fit:cover;" onclick="window.viewFullImage(this.src)"></div>`:i.startsWith("audio/")||a==="ptt"?u=`<div style="display:flex; align-items:center; gap:10px;"><div style="background:#00a884; width:40px; height:40px; border-radius:50%; display:flex; justify-content:center; align-items:center; flex-shrink:0;"><i class="fas fa-play" style="color:white; margin-right:-2px; font-size:14px;"></i></div> <audio controls style="max-width:200px; height:35px;"><source src="data:${i};base64,${l.data}" type="${i}"></audio></div>`:i.startsWith("video/")?u=`<video controls style="max-width:100%; border-radius:8px; margin-bottom:5px;"><source src="data:${i};base64,${l.data}" type="${i}"></video>`:u='<div style="background:rgba(0,0,0,0.05); padding:10px; border-radius:8px; display:flex; align-items:center; gap:10px; margin-bottom:5px;"><i class="fas fa-check-circle" style="font-size:24px; color:#00a884;"></i> <div><strong style="display:block; font-size:13px;">تم التحميل بنجاح</strong></div></div>',g.outerHTML=u}catch{r&&(r.disabled=!1,r.innerHTML='<i class="fas fa-redo"></i>'),window.showLuxuryToast("فشل تحميل الوسائط","error")}};document.addEventListener("DOMContentLoaded",()=>{document.addEventListener("click",e=>{const t=e.target.closest(".dash-tab");t&&t.dataset.tab&&window.switchLuxuryTab(t.dataset.tab)}),setTimeout(()=>{window.initWhatsAppServer()},3e3)});window.viewFullImage=function(e){let t=document.getElementById("wa-full-image-overlay");if(!t){t=document.createElement("div"),t.id="wa-full-image-overlay",t.style.cssText="position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.9); z-index:999999; display:flex; justify-content:center; align-items:center; opacity:0; transition:opacity 0.25s ease-in-out; backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px);";const o=document.createElement("div");o.innerHTML='<i class="fas fa-times"></i>',o.style.cssText="position:absolute; top:25px; right:30px; font-size:24px; color:white; cursor:pointer; padding:10px; z-index:1000000; background:rgba(255,255,255,0.1); border-radius:50%; width:45px; height:45px; display:flex; justify-content:center; align-items:center; border: 1px solid rgba(255,255,255,0.2); transition: background 0.2s;",o.onmouseover=()=>o.style.background="rgba(255,255,255,0.2)",o.onmouseout=()=>o.style.background="rgba(255,255,255,0.1)";const i=document.createElement("img");i.id="wa-full-image-element",i.style.cssText="max-width:90%; max-height:90%; border-radius:12px; box-shadow:0 15px 40px rgba(0,0,0,0.5); object-fit:contain; transform:scale(0.85); transition:transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);",t.appendChild(o),t.appendChild(i),document.body.appendChild(t);const a=()=>{t.style.opacity="0",i.style.transform="scale(0.85)",setTimeout(()=>{t.style.display="none"},250)};o.onclick=a,t.onclick=r=>{r.target===t&&a()}}const n=document.getElementById("wa-full-image-element");n.src=e,t.style.display="flex",t.offsetWidth,t.style.opacity="1",n.style.transform="scale(1)"};setTimeout(()=>{const e=document.getElementById("luxury-splash");e&&!e.classList.contains("hidden")&&(console.warn("Safety timeout: removing loader"),e.style.opacity="0",setTimeout(()=>{e.classList.add("hidden");try{e.remove()}catch{}},800),window.state&&(window.state.firstLoadDone=!0))},7e3);const ue=window.updateAppUI;window.updateAppUI=function(){var n,o;ue&&ue();const e=document.getElementById("user-display-name"),t=((n=window.state.userProfile)==null?void 0:n.role)==="admin";e&&!((o=window.state.userProfile)!=null&&o.name)&&(e.innerText=t?"مسؤول النظام":"موظف مبيعات")};console.log("--- WhatsApp Server Debug ---");console.log("Configured URL:",window._waServerActiveUrl);console.log("-----------------------------");window.promoteToAdmin=async function(e){if(confirm("تأكيد ترقية الموظف لصلاحية مسؤول؟"))try{await admin.database().ref("users/"+e).update({role:"admin"}),window.showLuxuryToast("تم ترقية الموظف بنجاح"),window.syncAdminTables("users")}catch{window.showLuxuryToast("خطأ بالصلاحيات","error")}};window.FirebaseSDK={ref:B,db:L,push:F,set:W,update:N,remove:U,auth:Q};window.markNotificationRead=async function(e){try{await N(B(L,"notifications/"+e),{read:!0}),window.showLuxuryToast("تم تحديد الإشعار كمقروء"),window.syncAdminTables("notifications")}catch(t){console.error(t)}};window.markAllNotificationsRead=async function(){const e=(window.state.notifications||[]).filter(t=>!t.read);if(e.length!==0)try{const t={};e.forEach(n=>{t["notifications/"+n.id+"/read"]=!0}),await N(B(L),t),window.showLuxuryToast("تم تحديد كافة الإشعارات كمقروءة"),window.syncAdminTables("notifications")}catch(t){console.error(t)}};window.clearAllNotifications=async function(){if(confirm("هل أنت متأكد من مسح كافة الإشعارات؟"))try{await U(B(L,"notifications")),window.showLuxuryToast("تم مسح كافة الإشعارات"),window.syncAdminTables("notifications")}catch(e){console.error(e)}};window.handleNotificationClick=function(e,t){if(window.markNotificationRead(e),t)if(t.startsWith("#")){const n=t.substring(1).split("/");n[0]==="booking"&&n[1]&&window.viewBookingDetails(n[1])}else window.open(t,"_blank")};window.formatDateRelative=function(e){if(!e)return"-";const t=new Date(e),o=Math.floor((new Date-t)/1e3);return o<60?"الآن":o<3600?"منذ "+Math.floor(o/60)+" دقيقة":o<86400?"منذ "+Math.floor(o/3600)+" ساعة":t.toLocaleDateString("ar-SA")};window.playNotificationSound=function(){if(!(window.state&&window.state.soundEnabled===!1))try{const e=new Audio("https://assets.mixkit.co/active_storage/sfx/2861/2861-preview.mp3");e.volume=.5,e.play().catch(t=>console.warn("Audio play failed:",t))}catch(e){console.warn("Audio error:",e)}};
