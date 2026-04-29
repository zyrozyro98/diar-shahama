import{i as se,g as ue,a as pe,b as re,c as me,d as ge,s as fe,o as we,r as L,e as Y,u as q,f as O,h as j,j as K,k as ye,l as be,p as P,m as ve,n as ne,q as he,t as xe}from"./firebase-BfvlcbVS.js";import"./emoji-picker-CeBMFWb3.js";import"./vendor-Bg_btqvK.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function o(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(i){if(i.ep)return;i.ep=!0;const a=o(i);fetch(i.href,a)}})();const le={apiKey:"AIzaSyDQodWTn2wa0WzQuHqzZt2Ex6CdnQdrlUU",authDomain:"onecar1.firebaseapp.com",projectId:"onecar1",storageBucket:"onecar1.firebasestorage.app",messagingSenderId:"735648367644",appId:"1:735648367644:web:44ae368553280b14bdcbd9",measurementId:"G-RSTPV8SRXT",databaseURL:"https://onecar1-default-rtdb.firebaseio.com"},V=se(le);ue(V);const C=pe(V),Q=re(V);me(V);ge(V);window.state={cars:[],ads:[],bookings:[],users:[],notifications:[],logs:[],partners:[],locations:[],brands:[],agents:[],specs:[],packages:[],blogs:[],reviews:[],plates:[],sales:[],gearboxes:[],bodyTypes:[],engines:[],exteriorColors:[],interiorColors:[],stockStatuses:[],user:null,userProfile:null,settings:{enableTextGradient:!0,textGradColor1:"#b8860b",textGradColor2:"#ffffff",enableTopbarGradient:!0,topbarGradColor1:"#a11d21",topbarGradColor2:"#05080c",enablePrimaryGradient:!0,primaryGradColor1:"#a11d21",primaryGradColor2:"#1c7c8c"},lang:localStorage.getItem("luxury_lang")||"ar",soundEnabled:localStorage.getItem("luxury_sound_enabled")!=="false",tempImages:[],bookingFilter:"all",bookingSubStatusFilter:"all",currentReportPeriod:"day",firstLoadDone:!1,inventoryPage:1,inventorySize:8,sliderIndex:0};const ke={ar:{welcome:"مرحباً بك في عالم الفخامة",inventory:"مخزون السيارات المتاح",totalCars:"إجمالي السيارات",totalBookings:"إجمالي الطلبات",totalValue:"قيمة المخزون",searchPlaceholder:"ابحث عن سيارتك المثالية...",loading:"جاري التحميل...",noResults:"لم يتم العثور على نتائج تطابق بحثك",applyNow:"اطلبها الآن",details:"عرض التفاصيل",back:"رجوع",save:"حفظ",delete:"حذف",edit:"تعديل",cancel:"إلغاء",successMsg:"تمت العملية بنجاح",errorMsg:"حدث خطأ غير متوقع",staff:"قسم المبيعات والمتابعة",admin:"إدارة النظام",supervisor:"مشرف النظام"},en:{welcome:"Welcome to the World of Luxury",inventory:"Available Vehicle Inventory",totalCars:"Total Vehicles",totalBookings:"Total Bookings",totalValue:"Inventory Value",searchPlaceholder:"Search for your perfect car...",loading:"Loading...",noResults:"No results found matching your search",applyNow:"Request Now",details:"View Details",back:"Back",save:"Save",delete:"Delete",edit:"Edit",cancel:"Cancel",successMsg:"Operation successful",errorMsg:"An unexpected error occurred",staff:"Sales & Follow-up Department",admin:"System Administration",supervisor:"System Supervisor"}};window.showLuxuryToast=function(t,e="success"){const o=document.getElementById("toast-container");if(!o)return;const n=document.createElement("div");n.className=`toast-v2 ${e}`,n.style.cssText=`
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
  `;const i=e==="success"?"fa-check-circle":"fa-exclamation-circle";n.innerHTML=`<i class="fas ${i}"></i> <span>${t}</span>`,o.appendChild(n),setTimeout(()=>{n.style.opacity="0",n.style.transform="translateY(-20px)",n.style.transition="all 0.4s ease-in",setTimeout(()=>n.remove(),400)},4e3)};window.compressImage=function(t,e=1e3,o=1e3,n=.6){return new Promise((i,a)=>{if(!t||!(t instanceof File||t instanceof Blob)){i(t);return}const r=new FileReader;r.readAsDataURL(t),r.onload=d=>{const s=new Image;s.src=d.target.result,s.onload=()=>{const l=document.createElement("canvas");let g=s.width,u=s.height;g>u?g>e&&(u*=e/g,g=e):u>o&&(g*=o/u,u=o),l.width=g,l.height=u,l.getContext("2d").drawImage(s,0,0,g,u);const m=t.type==="image/png"||t.type==="image/webp"?"image/webp":"image/jpeg";i(l.toDataURL(m,n))},s.onerror=a},r.onerror=a})};window.openModal=function(t){const e=document.getElementById(t);if(e){e.classList.remove("hidden"),document.body.style.overflow="hidden";const o=document.querySelectorAll(".modal:not(.hidden)");e.style.zIndex=2e3+o.length*10,Ie(`modal-${t}`)}};window.closeModal=function(t,e=!1){var n;const o=document.getElementById(t);o&&(o.classList.add("hidden"),o.style.zIndex="",!e&&((n=history.state)==null?void 0:n.type)===`modal-${t}`&&history.back(),document.querySelector(".modal:not(.hidden)")||(document.body.style.overflow="auto"))};window.setModalTitle=function(t,e){const o=document.getElementById(t+"-title");o&&(o.innerText=e)};window.switchLuxuryTab=function(t){const e=document.querySelectorAll(".pane, .admin-tab-content"),o=document.querySelectorAll(".dash-tab, .admin-sidebar-nav li");e.forEach(r=>r.classList.add("hidden")),o.forEach(r=>r.classList.remove("active"));const n=document.getElementById(t),i=document.querySelector(`[data-tab="${t}"]`);n&&(n.classList.remove("hidden"),n.classList.add("active"),n.style.animation="fade-up 0.5s ease-out forwards"),i&&i.classList.add("active");const a=document.getElementById("bookings-submenu");if(a&&a.classList.toggle("active",t==="bookings-mgmt"||t==="all-bookings"),window.innerWidth<1024){const r=document.querySelector(".dash-sidebar, .admin-sidebar-v2");r&&r.classList.remove("active")}t==="whatsapp-monitor-mgmt"&&window.initWhatsAppServer&&window.initWhatsAppServer(),t==="whatsapp-mgmt"&&window.startCurrentWASession(),t==="quick-replies-mgmt"&&window.renderQuickRepliesAdmin&&window.renderQuickRepliesAdmin()};function Ie(t){var e;((e=history.state)==null?void 0:e.type)!==t&&history.pushState({type:t},"")}window.normalizePhone=function(t){if(!t)return"";const e=t.toString().trim();if(e.includes("@s.whatsapp.net"))return e.split("@")[0].replace(/\D/g,"");if(e.includes("@lid"))return e;let o=e.replace(/\D/g,"");if(o.startsWith("9660")?o="966"+o.substring(4):o.startsWith("9670")&&(o="967"+o.substring(4)),o.startsWith("966")||o.startsWith("967"))return o;if(o.startsWith("05"))return"966"+o.substring(1);if(o.startsWith("07"))return"967"+o.substring(1);if(o.startsWith("0"))return"966"+o.substring(1);if(o.length===9){if(o.startsWith("7"))return"967"+o;if(o.startsWith("5"))return"966"+o}return o};document.addEventListener("DOMContentLoaded",()=>{Ee(),de(),Se(),window.trackVisit(),$e()});function $e(){const t=document.querySelector(".mobile-btn"),e=document.querySelector(".nav-menu"),o=document.querySelector(".mobile-nav-overlay"),n=document.querySelector(".menu-close-btn"),i=(y=!1)=>{const b=y===!1?!e.classList.contains("active"):!1;e.classList.toggle("active",b),o.classList.toggle("active",b),document.body.style.overflow=b?"hidden":"";const x=t==null?void 0:t.querySelector("i");x&&(x.className=b?"fas fa-times":"fas fa-bars-staggered")};t&&(t.onclick=()=>i()),o&&(o.onclick=()=>i(!0)),n&&(n.onclick=()=>i(!0)),document.querySelectorAll(".nav-menu a").forEach(y=>{y.addEventListener("click",()=>i(!0))});const a=document.querySelector(".mobile-menu-header .dynamic-name-ar");a&&window.__DYNAMIC_NAME_AR__&&(a.innerText=window.__DYNAMIC_NAME_AR__);const r=document.getElementById("admin-trigger");r&&(r.onclick=y=>{y.preventDefault(),window.openModal("admin-modal")});const d=document.getElementById("theme-btn");d&&(d.onclick=()=>{const b=(document.body.getAttribute("data-theme")||"dark")==="dark"?"light":"dark";document.body.setAttribute("data-theme",b),localStorage.setItem("luxury_theme",b),localStorage.setItem("theme_manually_overridden","true"),d.innerHTML=b==="dark"?'<i class="fas fa-sun"></i>':'<i class="fas fa-moon"></i>'});const s=document.getElementById("lang-btn");s&&(s.onclick=()=>{window.state.lang=window.state.lang==="ar"?"en":"ar",localStorage.setItem("luxury_lang",window.state.lang),de(),window.applyInventoryFilters(),s.innerText=window.state.lang==="ar"?"EN":"AR"}),document.querySelectorAll(".dash-tab").forEach(y=>{y.onclick=()=>window.switchLuxuryTab(y.dataset.tab)});const l=document.getElementById("car-search-input");l&&(l.oninput=()=>window.applyInventoryFilters()),["filter-make","filter-type","filter-year","filter-sort"].forEach(y=>{const b=document.getElementById(y);b&&(b.onchange=()=>{window.state.inventoryPage=1,window.applyInventoryFilters()})});const u=document.getElementById("p-prev"),c=document.getElementById("p-next");u&&(u.onclick=()=>window.moveLuxurySlider(-1)),c&&(c.onclick=()=>window.moveLuxurySlider(1)),setInterval(()=>{const y=document.getElementById("luxury-splash");(!y||y.classList.contains("hidden"))&&window.moveLuxurySlider(1)},5e3),["calc-car-price","calc-down-pay","calc-years"].forEach(y=>{const b=document.getElementById(y);b&&(b.oninput=()=>window.calculateLuxuryFinancing()),b&&b.tagName==="SELECT"&&(b.onchange=()=>window.calculateLuxuryFinancing())}),document.querySelectorAll(".modal-close").forEach(y=>{y.onclick=b=>{b.stopPropagation();const x=y.closest(".modal");if(x){if(x.id==="admin-modal"&&window.state.user&&!confirm("هل تريد الخروج من لوحة التحكم؟"))return;window.closeModal(x.id)}}}),window.onclick=y=>{const b=document.getElementById("wa-emoji-picker");if(b&&b.style.display!=="none"){const k=y.target.closest(".fa-smile")!==null,$=b.contains(y.target);!k&&!$&&(b.style.display="none")}const x=Array.from(document.querySelectorAll(".modal:not(.hidden)"));if(x.length>0){const k=x[x.length-1];if(y.target===k){if(k.id==="admin-modal"&&window.state.user&&!confirm("هل تريد الخروج من لوحة التحكم؟"))return;window.closeModal(k.id)}}},window.addEventListener("popstate",y=>{const b=document.querySelectorAll(".modal:not(.hidden)");b.length>0&&b.forEach(x=>{var k;((k=y.state)==null?void 0:k.type)!==`modal-${x.id}`&&window.closeModal(x.id,!0)})}),window.onscroll=()=>{const y=document.getElementById("main-nav");y&&y.classList.toggle("scrolled",window.scrollY>50);const b=document.getElementById("scroll-jump");b&&b.classList.toggle("hidden",window.scrollY<500)},document.getElementById("scroll-jump")&&(document.getElementById("scroll-jump").onclick=()=>window.scrollTo({top:0,behavior:"smooth"}));const I=document.getElementById("login-form");I&&(I.onsubmit=y=>window.loginAdmin(y));const v=document.getElementById("booking-form");v&&(v.onsubmit=y=>window.submitBooking(y));const w=document.getElementById("item-form");w&&(w.onsubmit=y=>window.saveLuxuryItem(y))}function Ee(){const t=JSON.parse(localStorage.getItem("luxury-settings-cache")||"{}"),e=localStorage.getItem("theme_manually_overridden")==="true",o=(e?localStorage.getItem("luxury_theme"):t.defaultTheme)||"dark";e||localStorage.setItem("luxury_theme",o),document.body.setAttribute("data-theme",o);const n=document.getElementById("theme-btn");n&&(n.innerHTML=o==="dark"?'<i class="fas fa-sun"></i>':'<i class="fas fa-moon"></i>')}function de(){const t=window.state.lang;document.body.dir=t==="ar"?"rtl":"ltr",document.body.classList.toggle("en",t==="en");const e=ke[t];document.querySelectorAll("[data-i18n]").forEach(o=>{const n=o.getAttribute("data-i18n");e[n]&&(o.innerText=e[n])})}async function Se(){await fe(Q,xe);const t=["users","plates","locations","brands","agents","specs","packages","blogs","reviews","cars","ads","sales","settings","partners","custom_presets","gearboxes","bodyTypes","engines","exteriorColors","interiorColors","stockStatuses"],e=["bookings","notifications","logs","quickReplies"],o={};function n(i){o[i]||(o[i]=Y(L(C,i),a=>{var d,s;const r=a.val();if(i==="settings")window.state.settings=r||{},window.applySettings(r);else{const l=window.state[i]||[],g=r?Object.entries(r).map(([u,c])=>({...c,id:u})):[];if(window.state[i]=g,i==="cars"&&window.applyInventoryFilters(),i==="ads"&&window.renderAdsSlider(),i==="sales"&&window.renderSalesVideos(),i==="partners"&&window.renderPartners(),i==="reviews"&&window.renderPublicReviews(),i==="custom_presets"&&window.renderCustomPresets(),i==="notifications"&&window.state.user&&window.state.firstLoadDone){const u=((d=window.state.userProfile)==null?void 0:d.role)==="admin"||((s=window.state.userProfile)==null?void 0:s.role)==="supervisor",c=v=>v.filter(w=>!w.read&&(u||w.userId===window.state.user.uid||w.assignedTo===window.state.user.uid)),m=c(l).length;c(g).length>m&&window.playNotificationSound&&window.playNotificationSound()}window.state.user&&(window.syncAdminTables(i),window.updateStatistics())}Te()},a=>{console.warn(`Listener for ${i} failed:`,a.message),delete o[i]}))}we(Q,async i=>{if(window.state.user=i,i){const a=L(C,`users/${i.uid}`);Y(a,r=>{window.state.userProfile={...r.val(),id:i.uid},ie(),window.initWhatsAppServer&&window.initWhatsAppServer()}),e.forEach(n)}else window.state.userProfile=null,ie(),e.forEach(a=>{o[a]&&delete o[a]})}),t.forEach(n)}function Te(){var n,i;if(window.state.firstLoadDone)return;const t=window.state.settings,e=t==null?void 0:t.maintenanceMode,o=((n=window.state.userProfile)==null?void 0:n.role)==="admin"||((i=window.state.userProfile)==null?void 0:i.role)==="supervisor";if(e&&!o){const a=document.getElementById("luxury-splash");a&&(a.innerHTML=`
            <div class="maint-content" style="text-align:center; color:white; padding: 20px;">
                <i class="fas fa-tools" style="font-size:60px; color:var(--p-red); margin-bottom:20px;"></i>
                <h1 class="luxury-font" style="margin-bottom:10px;">الموقع تحت الصيانة</h1>
                <p style="opacity:0.8;">نعمل حالياً على تحديث المنصة لتقديم تجربة أفضل، سنعود قريباً جداً.</p>
                <div style="margin-top:30px;">
                    <button class="btn-premium btn-sm" onclick="window.openModal('admin-modal')">دخول الإدارة</button>
                </div>
            </div>
          `,a.style.opacity="1",a.classList.remove("hidden"));return}t&&Object.keys(t).length>0&&setTimeout(()=>{const a=document.getElementById("luxury-splash");a&&(a.style.opacity="0",setTimeout(()=>{a.classList.add("hidden"),a.remove()},800)),window.state.firstLoadDone=!0},1200)}function ie(){var r,d,s;const t=!!window.state.user,e=((r=window.state.userProfile)==null?void 0:r.role)==="admin",o=((d=window.state.userProfile)==null?void 0:d.role)==="supervisor";document.body.classList.toggle("is-logged-in",t),document.body.classList.toggle("is-admin",e),document.body.classList.toggle("is-supervisor",o);const n=document.getElementById("admin-login-ui"),i=document.getElementById("admin-dash-ui");n&&n.classList.toggle("hidden",t),i&&i.classList.toggle("hidden",!t);const a=document.getElementById("admin-trigger");if(a&&(a.innerText=t?"لوحة التحكم":"تسجيل الدخول"),document.querySelectorAll(".admin-only").forEach(l=>l.classList.toggle("hidden",!e&&!o)),document.querySelectorAll(".supervisor-only").forEach(l=>l.classList.toggle("hidden",!o&&!e)),document.querySelectorAll(".admin-strictly").forEach(l=>l.classList.toggle("hidden",!e)),document.querySelectorAll(".staff-only").forEach(l=>l.classList.toggle("hidden",e||o)),t){window.syncAdminTables("all"),window.updateStatistics();const l=document.getElementById("user-display-name"),g=document.getElementById("user-role-label");if(l&&(l.innerText=((s=window.state.userProfile)==null?void 0:s.name)||(e?"المسؤول العام":o?"المشرف العام":"الموظف")),g){let c="قسم المبيعات والمتابعة";e?c="إدارة النظام (Admin)":o&&(c="إدارة الرقابة والإشراف (Supervisor)"),g.innerText=c}const u=document.querySelector(".dash-tab.active");if(!u||u.classList.contains("hidden")){let c="bookings-mgmt";o&&(c="supervisor-dash");const m=document.querySelector(`.dash-tab[data-tab="${c}"]`);m&&m.click()}(o||e)&&(window.renderSupervisorStaffList(),window.populateStaffMonitorSelect())}}window.handleSupervisorExport=async function(t){var g,u,c;const e=document.getElementById("sup-export-type").value,o=document.getElementById("sup-export-start").value,n=document.getElementById("sup-export-end").value;let i=window.state[e]||[];Array.isArray(i)||(i=Object.values(i));let a=i;if(o||n){const m=o?new Date(o):new Date(0),I=n?new Date(n):new Date;I.setHours(23,59,59,999),a=i.filter(v=>{const w=v.createdAt||v.timestamp||0,y=new Date(w);return y>=m&&y<=I})}if(a.length===0){window.showLuxuryToast("لا توجد بيانات للفترة المحددة","warning");return}const d={cars:{make:"الماركة",model:"الموديل",year:"السنة",price:"السعر",monthlyInstallment:"القسط الشهري",color:"اللون الخارجى",interiorColor:"اللون الداخلى",mileage:"الممشى",engine:"المحرك",gearbox:"ناقل الحركة",fuelType:"نوع الوقود",status:"الحالة",createdAt:"تاريخ الإضافة"},bookings:{name:"اسم العميل",phone:"رقم الجوال",carRequested:"السيارة المطلوبة",city:"المدينة",nationality:"الجنسية",paymentMethod:"طريقة الشراء",salary:"الراتب",status:"الحالة",subStatus:"الحالة الفرعية",createdAt:"تاريخ الطلب",assignedTo:"الموظف المسؤول"},users:{name:"الاسم",email:"البريد الإلكتروني",role:"الدور",isAvailable:"متاح للاستلام",createdAt:"تاريخ الإنشاء"}}[e]||{},s=Object.keys(d),l=a.map(m=>{const I={};return s.forEach(v=>{let w=m[v];if(v==="createdAt"||v==="timestamp"||v==="lastLogin")w=w?new Date(w).toLocaleString("ar-SA"):"";else if(v==="assignedTo"&&w){const y=(window.state.users||[]).find(b=>b.id===w);w=y?y.name||y.email:w}else v==="status"?w={available:"متاح",reserved:"محجوز",sold:"مباع",incoming:"قادم قريباً",new:"جديد",done:"تم",cancelled:"ملغى",rejected:"مرفوض"}[w]||w:v==="isAvailable"&&(w=w?"نعم":"لا");I[d[v]]=w??""}),I});if(l.length===0||Object.keys(l[0]).length===0){window.showLuxuryToast("خطأ في معالجة البيانات للتصدير","error");return}if(t==="xlsx"){const m=XLSX.utils.json_to_sheet(l);m["!views"]=[{RTL:!0}];const I=Object.keys(l[0]).map(()=>({wch:20}));m["!cols"]=I;const v=XLSX.utils.book_new();XLSX.utils.book_append_sheet(v,m,"التقرير"),XLSX.writeFile(v,`تقرير_${e}_${new Date().toLocaleDateString("ar-EG").replace(/\//g,"-")}.xlsx`),window.showLuxuryToast("تم تصدير ملف Excel بنجاح"),window.createLog("تصدير بيانات",`تصدير تقرير ${e} بصيغة Excel`,"data")}else if(t==="pdf"){window.showLuxuryToast("جاري معالجة ملف PDF...");const m=document.createElement("div");m.style.position="absolute",m.style.top="-9999px",m.style.width="1000px",m.style.direction="rtl",m.style.fontFamily="'Cairo', sans-serif",m.style.padding="30px",m.style.background="#fff",m.style.color="#111";const I=a.length,v=o||n?`الفترة من: ${o||"البداية"} إلى: ${n||"اليوم"}`:"كافة البيانات",w=((g=window.state.settings)==null?void 0:g.logo)||"logo.jpg",y=Object.keys(l[0]);let b=`
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:3px solid #a11d21; padding-bottom:20px; margin-bottom:30px;">
        <div style="text-align:right;">
          <h1 style="color:#a11d21; margin:0; font-size:28px;">${((u=window.state.settings)==null?void 0:u.nameAr)||"ديار الشهامة"}</h1>
          <p style="margin:5px 0; opacity:0.7;">تقرير إداري مفصل - ${e==="cars"?"مخزون السيارات":e==="bookings"?"سجل الحجوزات":"قائمة الموظفين"}</p>
          <p style="font-size:12px; font-weight:bold;">${v}</p>
        </div>
        <img src="${w}" style="height:80px; width:auto; object-fit:contain;">
      </div>

      <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:20px; margin-bottom:30px;">
        <div style="background:#f9fafb; padding:15px; border-radius:10px; border:1px solid #eee;">
          <small style="color:#666;">إجمالي السجلات</small>
          <div style="font-size:20px; font-weight:bold; color:#a11d21;">${I}</div>
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
            ${y.map(k=>`<th style="padding:10px 5px; border:1px solid #a11d21; white-space:nowrap;">${k}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${l.map((k,$)=>`
            <tr style="background:${$%2===0?"#fff":"#fcfcfc"};">
              ${y.map(T=>`<td style="padding:8px 5px; border:1px solid #eee;">${k[T]}</td>`).join("")}
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div style="margin-top:40px; border-top:1px solid #eee; padding-top:10px; font-size:10px; color:#999; text-align:center;">
        هذا التقرير تم توليده آلياً من لوحة تحكم المشرف. جميع الحقوق محفوظة لشركة ${((c=window.state.settings)==null?void 0:c.nameAr)||"ديار الشهامة"}.
      </div>
    `;m.innerHTML=b,document.body.appendChild(m);const x={margin:[10,10],filename:`تقرير_${e}_${new Date().toLocaleDateString("ar-EG").replace(/\//g,"-")}.pdf`,image:{type:"jpeg",quality:1},html2canvas:{scale:2,useCORS:!0,letterRendering:!0},jsPDF:{unit:"mm",format:"a4",orientation:"landscape"}};html2pdf().set(x).from(m).save().then(()=>{document.body.removeChild(m),window.showLuxuryToast("تم استخراج التقرير بنجاح"),window.createLog("تصدير بيانات",`تصدير تقرير ${e} بصيغة PDF`,"data")}).catch(k=>{console.error(k),window.showLuxuryToast("خطأ أثناء استخراج PDF","error"),m.parentNode&&document.body.removeChild(m)})}};window.populateStaffMonitorSelect=function(){const t=document.getElementById("sup-monitor-staff-select");if(!t)return;const e=window.state.users.filter(o=>o.role==="staff");t.innerHTML='<option value="">-- اختر موظف --</option>'+e.map(o=>`<option value="${o.id}">${o.name||o.email}</option>`).join("")};window.monitorStaffChats=function(t){const e=document.getElementById("monitor-active-chats-list"),o=document.getElementById("monitor-chat-body"),n=document.getElementById("monitor-chat-header");if(!e||!o||!n)return;if(!t){e.innerHTML="",o.innerHTML="",n.innerText="اختر محادثة لبدء المراقبة";return}e.innerHTML='<div class="loading-v2">جاري جلب المحادثات...</div>';const i=L(C,"chats"),a=query(i,orderByChild("assignedTo"),equalTo(t));Y(a,r=>{const d=[];if(r.forEach(s=>{d.push({id:s.key,...s.val()})}),d.length===0){e.innerHTML='<div class="no-data">لا توجد محادثات نشطة لهذا الموظف</div>';return}e.innerHTML=d.map(s=>`
      <div class="monitor-chat-item" onclick="window.viewMonitorChat('${s.id}', '${s.customerName||s.customerPhone}')">
        <div class="m-chat-info">
          <strong>${s.customerName||"عميل"}</strong>
          <span>${s.customerPhone||""}</span>
        </div>
        <div class="m-chat-meta">
          <small>${new Date(s.lastMessageTime).toLocaleTimeString()}</small>
        </div>
      </div>
    `).join("")})};window.viewMonitorChat=function(t,e){const o=document.getElementById("monitor-chat-body"),n=document.getElementById("monitor-chat-header");if(!o||!n)return;n.innerText=`مراقبة: ${e}`,o.innerHTML='<div class="loading-v2">جاري تحميل الرسائل...</div>';const i=L(C,`messages/${t}`);Y(i,a=>{const r=[];a.forEach(d=>r.push(d.val())),o.innerHTML=r.map(d=>`
      <div class="chat-msg ${d.sender==="staff"?"sent":"received"}">
        <div class="msg-bubble">
          <p>${d.text}</p>
          <small>${new Date(d.timestamp).toLocaleTimeString()}</small>
        </div>
      </div>
    `).join(""),o.scrollTop=o.scrollHeight})};window.renderSupervisorStaffList=function(){const t=document.getElementById("supervisor-staff-list-v2");if(!t)return;const e=(window.state.users||[]).filter(n=>n.role==="staff"),o=window.state.bookings||[];if(e.length===0){t.innerHTML='<tr><td colspan="6" style="text-align:center; padding:30px; opacity:0.5;">لا يوجد موظفين مسجلين حالياً</td></tr>';return}t.innerHTML=e.map((n,i)=>{const a=o.filter(g=>g.assignedTo===n.id),r=a.filter(g=>g.status==="sold"||g.status==="done").length,d=a.length>0?Math.round(r/a.length*100):0,l=(n.phone||"").replace(/\D/g,"");return`
      <tr onclick="window.showStaffStats('${n.id}')" id="staff-row-${n.id}">
        <td><div class="staff-avatar-circle">${(n.name||"S")[0]}</div></td>
        <td>
            <div style="font-weight:700;">${n.name||"موظف بدون اسم"}</div>
            <div style="font-size:10px; opacity:0.5;">ID: ${n.id.substring(0,8)}</div>
        </td>
        <td>${n.email}</td>
        <td><span class="badge-v2" style="background:rgba(255,215,0,0.1); color:var(--p-gold); border:none;">${a.length} طلب</span></td>
        <td>
            <div style="font-size:12px; font-weight:bold; color:${d>50?"#10b981":"var(--p-gold)"}">${d}%</div>
            <div style="width:50px; height:3px; background:rgba(255,255,255,0.05); border-radius:2px; margin-top:4px;">
                <div style="width:${d}%; height:100%; background:currentColor; border-radius:2px;"></div>
            </div>
        </td>
        <td>
            <div class="action-btns-cell">
                ${n.phone?`
                    <a href="tel:${l}" class="btn-action-lite call" title="اتصال هاتفي" onclick="event.stopPropagation()">
                        <i class="fas fa-phone-alt"></i>
                    </a>
                    <a href="https://wa.me/${l}" target="_blank" class="btn-action-lite whatsapp" title="مراسلة واتساب" onclick="event.stopPropagation()">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                `:""}
                <button class="btn-action-lite" title="تعديل الاسم" onclick="event.stopPropagation(); window.updateStaffName('${n.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-action-lite" style="color:var(--p-red);" title="حذف الموظف" onclick="event.stopPropagation(); window.deleteStaff('${n.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
      </tr>
    `}).join("")};window.showStaffStats=function(t){const e=(window.state.users||[]).find(u=>u.id===t);if(!e)return;document.querySelectorAll(".staff-table tr").forEach(u=>u.classList.remove("selected"));const o=document.getElementById(`staff-row-${t}`);o&&o.classList.add("selected");const n=document.getElementById("staff-details-panel"),i=document.getElementById("staff-stats-grid"),a=document.getElementById("detail-staff-name"),r=document.getElementById("detail-staff-email"),d=document.getElementById("detail-staff-avatar");if(!n||!i)return;n.style.display="block",a.innerText=e.name||e.email,r.innerText=e.email,d.innerText=(e.name||"S")[0];const s=(window.state.bookings||[]).filter(u=>u.assignedTo===t),l={total:s.length,new:s.filter(u=>u.status==="new").length,waiting:s.filter(u=>u.status==="waiting").length,sold:s.filter(u=>u.status==="sold").length,cancelled:s.filter(u=>u.status==="cancelled").length,done:s.filter(u=>u.status==="done").length},g={total:{t:"إجمالي الطلبات",i:"fa-list",c:"var(--p-gold)"},new:{t:"طلبات جديدة",i:"fa-star",c:"#3b82f6"},waiting:{t:"بانتظار الإجراء",i:"fa-clock",c:"#f59e0b"},sold:{t:"تم المبايعة",i:"fa-check-circle",c:"#10b981"},cancelled:{t:"طلبات مرفوضة",i:"fa-times-circle",c:"#ef4444"},done:{t:"مكتملة",i:"fa-flag-checkered",c:"#8b5cf6"}};i.innerHTML=Object.keys(l).map(u=>`
    <div class="mini-stat-box">
        <i class="fas ${g[u].i}" style="color:${g[u].c}; margin-bottom:8px; font-size:18px;"></i>
        <label>${g[u].t}</label>
        <strong>${l[u]}</strong>
    </div>
  `).join(""),n.scrollIntoView({behavior:"smooth",block:"nearest"})};window.updateStaffName=async function(t){const e=prompt("أدخل الإسم الجديد للموظف:");if(e)try{await q(L(C,`users/${t}`),{name:e}),window.showLuxuryToast("تم تحديث الإسم بنجاح"),window.renderSupervisorStaffList()}catch{window.showLuxuryToast("خطأ في التحديث","error")}};window.deleteStaff=async function(t){if(confirm("هل أنت متأكد من حذف هذا الموظف؟ لن يتمكن من تسجيل الدخول بعد الآن."))try{await O(L(C,`users/${t}`)),window.showLuxuryToast("تم حذف الموظف من النظام"),window.renderSupervisorStaffList()}catch{window.showLuxuryToast("خطأ في الحذف","error")}};window.toggleAvailability=async function(){if(!window.state.userProfile)return;const t=window.state.userProfile.isAvailable||!1;try{await q(L(C,`users/${window.state.user.uid}`),{isAvailable:!t}),window.state.userProfile.isAvailable=!t,window.showLuxuryToast(t?"تم تعيين الحالة: غير متاح":"أنت متاح الآن لاستلام الطلبات"),window.updateStatistics()}catch{window.showLuxuryToast("فشل تحديث الحالة","error")}};window.toggleSound=function(){window.state.soundEnabled=!window.state.soundEnabled,localStorage.setItem("luxury_sound_enabled",window.state.soundEnabled);const t=document.getElementById("sound-toggle");t&&(t.checked=window.state.soundEnabled),window.showLuxuryToast(window.state.soundEnabled?"تم تفعيل التنبيهات الصوتية":"تم كتم التنبيهات")};window.setBookingFilter=function(t,e,o="all",n=null){window.state.bookingFilter=t,window.state.bookingSubStatusFilter=o;const i=document.getElementById("filter-booking-status");i&&i.value!==t&&(i.value=t);const a=document.getElementById("filter-booking-sub-status");if(a){const r={new:["not_contacted","contacted"],waiting:["docs_received","waiting_calc","waiting_docs","waiting_signature"],inquiry:["docs_not_received"],sold:["signed","delivered"],done:["done"],cancelled:["no_response","obligations","calc_rejected","ineligible","duplicate"]},d={not_contacted:"لم يتم التواصل",contacted:"تم التواصل",docs_received:"تم استلام الاوراق",waiting_calc:"انتظار رد العميل",waiting_docs:"إنتظار إكمال الاوراق",waiting_signature:"إنتظار توقيع العميل",docs_not_received:"لم يتم استلام الاوراق",signed:"تم التوقيع",delivered:"تم التسليم",done:"تم",no_response:"لم يتم رد العميل",obligations:"التزامات",calc_rejected:"رفض الحسبة",ineligible:"غير مسموح له",duplicate:"مكرر"};let s=t==="all"?Object.keys(d):r[t]||[];a.innerHTML='<option value="all">جميع الحالات الفرعية</option>',s.forEach(l=>{const g=document.createElement("option");g.value=l,g.textContent=d[l],a.appendChild(g)}),Array.from(a.options).some(l=>l.value===o)?a.value=o:(a.value="all",window.state.bookingSubStatusFilter="all",o="all")}document.querySelectorAll(".sub-tab.b-filter").forEach(r=>{if(r.getAttribute("onclick")&&r.getAttribute("onclick").includes(`'${t}'`)){document.querySelectorAll(".sub-tab.b-filter").forEach(s=>s.classList.remove("active")),r.classList.add("active"),document.querySelectorAll(".deep-submenu").forEach(s=>s.classList.remove("active"));const d=r.closest(".status-group");if(d){const s=d.querySelector(".deep-submenu");s&&s.classList.add("active")}}}),document.querySelectorAll(".deep-tab").forEach(r=>{r.classList.remove("active"),o!=="all"&&r.getAttribute("onclick")&&r.getAttribute("onclick").includes(`'${o}'`)&&r.classList.add("active")}),window.syncAdminTables("bookings")};window.applyInventoryFilters=function(){var w,y,b,x,k,$,T;if(!document.getElementById("cars-container"))return;const e=document.getElementById("filter-make"),o=document.getElementById("filter-year");e&&e.options.length<=1&&[...new Set(window.state.cars.map(h=>h.make))].sort().forEach(h=>{const E=document.createElement("option");E.value=h,E.textContent=h,e.appendChild(E)}),o&&o.options.length<=1&&[...new Set(window.state.cars.map(h=>h.year))].filter(Boolean).sort((h,E)=>E-h).forEach(h=>{const E=document.createElement("option");E.value=h,E.textContent=h,o.appendChild(E)});const n=document.getElementById("filter-type");if(n&&n.options.length<=1){const p={sedan:"سيدان",suv:"SUV",coupe:"كوبيه",luxury:"فاخرة",pickup:"بيك آب"};[...new Set(window.state.cars.map(E=>E.bodyType))].filter(Boolean).sort().forEach(E=>{const f=document.createElement("option");f.value=E,f.textContent=p[E]||E,n.appendChild(f)})}const i=(((w=document.getElementById("car-search-input"))==null?void 0:w.value)||"").toLowerCase(),a=((y=document.getElementById("filter-make"))==null?void 0:y.value)||"all",r=((b=document.getElementById("filter-type"))==null?void 0:b.value)||"all",d=((x=document.getElementById("filter-year"))==null?void 0:x.value)||"all",s=((k=document.getElementById("filter-sort"))==null?void 0:k.value)||"newest";let l=(($=window.state.cars)==null?void 0:$.filter(p=>{const h=!i||(p.make+" "+p.model).toLowerCase().includes(i),E=a==="all"||p.make===a,f=r==="all"||p.bodyType===r,S=d==="all"||p.year===d;return h&&E&&f&&S}))||[];s==="price-asc"?l.sort((p,h)=>(Number(p.price)||0)-(Number(h.price)||0)):s==="price-desc"?l.sort((p,h)=>(Number(h.price)||0)-(Number(p.price)||0)):s==="year-asc"?l.sort((p,h)=>(Number(p.year)||0)-(Number(h.year)||0)):l.sort((p,h)=>new Date(h.createdAt||0)-new Date(p.createdAt||0));const g=((T=window.state.cars)==null?void 0:T.filter(p=>p.isFeatured).slice(0,3))||[];Be(g.length>0?g:window.state.cars.slice(0,3));const u=l.length,c=window.state.inventoryPage||1,m=window.state.inventorySize||8,I=(c-1)*m,v=l.slice(I,I+m);renderCarGrid(v),Le(u,c,m)};function Be(t){const e=document.getElementById("featured-offers-container");if(!e||!t.length)return;const o=document.getElementById("featured-offers-section");o&&(o.style.display="block"),e.innerHTML=t.map(n=>`
        <div class="offer-card-v2" onclick="window.viewLuxuryCar('${n.id}')">
            <div class="offer-badge">عرض حصري</div>
            <div class="offer-img-box">
                <img src="${n.image||"logo.jpg"}" alt="${n.make}" loading="lazy" onerror="this.src='logo.jpg'">
            </div>
            <div class="offer-info">
                <h4>${n.make} ${n.model}</h4>
                <div class="offer-price">
                    <span>${n.price?Number(n.price).toLocaleString():n.monthlyInstallment?`قسط: ${Number(n.monthlyInstallment).toLocaleString()}`:"تواصل معنا"}</span>
                    ${n.price||n.monthlyInstallment?'<small style="font-size: 14px; margin-right: 5px;">ريال</small>':""}
                </div>
                <button class="btn-premium btn-sm" style="margin-top: 10px; width: 100%;">تفاصيل العرض</button>
            </div>
        </div>
    `).join("")}function Le(t,e,o){const n=document.getElementById("pagination-wrap");if(!n)return;const i=Math.ceil(t/o);if(i<=1){n.innerHTML="";return}let a="";e>1&&(a+=`<button class="p-btn nav-dir" onclick="window.state.inventoryPage=${e-1}; window.applyInventoryFilters(); window.scrollTo({top: document.getElementById('inventory').offsetTop - 100, behavior:'smooth'})"><i class="fas fa-chevron-right"></i> السابق</button>`);for(let r=1;r<=i;r++)a+=`<button class="p-btn ${r===e?"active":""}" onclick="window.state.inventoryPage=${r}; window.applyInventoryFilters(); window.scrollTo({top: document.getElementById('inventory').offsetTop - 100, behavior:'smooth'})">${r}</button>`;e<i&&(a+=`<button class="p-btn nav-dir" onclick="window.state.inventoryPage=${e+1}; window.applyInventoryFilters(); window.scrollTo({top: document.getElementById('inventory').offsetTop - 100, behavior:'smooth'})">التالي <i class="fas fa-chevron-left"></i></button>`),n.innerHTML=a}window.renderPartners=function(){const t=document.getElementById("front-partners-grid");!t||!window.state.partners||(t.innerHTML=window.state.partners.map(e=>`
    <div class="partner-logo-v2">
        <img src="${e.logo}" alt="${e.name}" title="${e.name}">
    </div>
  `).join(""))};window.renderPublicReviews=function(){const t=document.getElementById("public-reviews-container");if(!(!t||!window.state.reviews)){if(window.state.reviews.length===0){t.innerHTML='<div class="no-results-v2"><p>لا توجد آراء عملاء حالياً</p></div>';return}t.innerHTML=window.state.reviews.map(e=>{const o=e.avatar||e.image||"",n=e.name||"عميل غير معروف",i=e.car?`<span> اشترى <span style="color:var(--p-copper); font-weight:bold;">${e.car}</span></span>`:'<span>عميل مُحقّق <i class="fas fa-check-circle"></i></span>';return`
    <div class="review-card-v2" data-aos="zoom-in">
        <div class="review-stars">
            ${'<i class="fas fa-star"></i>'.repeat(Number(e.rating||5))}
        </div>
        <p class="review-text">"${e.text||"لا يوجد تعليق"}"</p>
        <div class="review-author">
           <div class="review-author-avatar">
                ${o?`<img src="${o}" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`:n.charAt(0)}
           </div>
           <div class="review-author-info" style="line-height:1.4;">
              <strong style="display:block; font-size:16px;">${n}</strong>
              <div style="font-size:12px; opacity:0.8;">${i}</div>
           </div>
        </div>
    </div>
  `}).join("")}};window.renderCarGrid=function(t){const e=document.getElementById("cars-container");if(e){if(t.length===0){e.innerHTML='<div class="no-results-v2"><i class="fas fa-search"></i> <p>لم يتم العثور على سيارات تطابق بحثك</p></div>';return}e.innerHTML=t.map(o=>`
    <div class="car-card-premium" onclick="window.viewLuxuryCar('${o.id}')" data-aos="fade-up">
      <div class="car-img-wrap">
        <img src="${o.image||"logo.jpg"}" alt="${o.make}" loading="lazy" onerror="this.src='logo.jpg'">
        <div class="car-price-v3">${o.price?`${Number(o.price).toLocaleString()} <small>ريال</small>`:o.monthlyInstallment?`قسط من: ${Number(o.monthlyInstallment).toLocaleString()} <small>ريال</small>`:"عند التواصل"}</div>
        <div class="car-badge-v3 ${o.status==="available"?"available":o.status==="reserved"?"reserved":o.status==="sold"?"sold":"custom"}">
          ${o.status==="available"?"متاح":o.status==="reserved"?"محجوز":o.status==="sold"?"مباع":o.status||"متاح"}
        </div>
      </div>
      <div class="car-info-v3">
        <span class="car-year-v3">${o.year}</span>
        <h3 class="car-title-v3">${o.make} ${o.model}</h3>
        <div class="car-specs-v3">
          <div class="spec-item-v3">
            <i class="fas fa-road"></i>
            <span>${(Number(o.mileage)||0).toLocaleString()} كم</span>
          </div>
          <div class="spec-item-v3">
            <i class="fas fa-gas-pump"></i>
            <span>${o.fuelType||"بنزين"}</span>
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
  `).join("")}};window.viewLuxuryCar=function(t){const e=window.state.cars.find(s=>s.id===t);if(!e||!document.getElementById("details-modal"))return;let n=e.images||[];n.length===0&&e.image&&(n=[e.image]),n.length===0&&(n=["logo.jpg"]),window.normalizePhone(window.state.settings.contactSales||"0500000000");const i=e.price?`${Number(e.price).toLocaleString()} ريال`:"عند التواصل",a=e.monthlyInstallment?`
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
            <img src="${n[0]}" id="active-luxury-img" alt="${e.make} ${e.model}" onerror="this.src='logo.jpg'">
            <div class="viewer-actions">
              <button class="viewer-btn" onclick="event.stopPropagation(); window.switchLuxuryDetailImg('${e.id}', -1)"><i class="fas fa-chevron-right"></i></button>
              <button class="viewer-btn" onclick="event.stopPropagation(); window.switchLuxuryDetailImg('${e.id}', 1)"><i class="fas fa-chevron-left"></i></button>
            </div>
            <div class="zoom-hint"><i class="fas fa-expand"></i> انقر للتكبير</div>
          </div>
          ${n.length>1?`
          <div class="thumbs-view custom-scrollbar">
            ${n.map((s,l)=>`
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
               <div class="s-info"><span>الحالة</span><strong>${e.status==="available"?"متاح":e.status==="sold"?"مباع":e.status==="reserved"?"محجوز":e.status||"متاح"}</strong></div>
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
  `,d=document.getElementById("details-modal-body");if(d){d.innerHTML=r,d.scrollTop=0;const s=document.getElementById("details-modal");if(s){s.scrollTop=0;const l=s.querySelector(".modal-inner");l&&(l.scrollTop=0)}window.openModal("details-modal")}window.trackCarView(t)};window.bookCar=function(t){const e=window.state.cars.find(i=>i.id===t);if(!e)return;const o=document.getElementById("b-car");o&&(o.value=`${e.make} ${e.model} ${e.year}`),window.closeModal("details-modal");const n=document.getElementById("booking");n&&(n.scrollIntoView({behavior:"smooth"}),o&&(o.focus(),o.style.borderColor="var(--p-copper)",setTimeout(()=>o.style.borderColor="",2e3)))};window.viewBookingDetails=function(t){var a;const e=(window.state.bookings||[]).find(r=>r.id===t);if(!e)return;(a=window.state.users.find(r=>r.id===e.assignedTo))!=null&&a.name,e.status==="sold"||e.status==="available"||e.status==="rejected"||e.status,e.status==="sold"||e.status;const o={new:"جديد",waiting:"بالانتظار",inquiry:"استفسار",sold:"مكتمل",rejected:"مرفوض",available:"متاح"},n=`
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
              <strong style="color:var(--p-copper); font-size:14px;">${o[e.status]||e.status}</strong>
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
                        ${Object.entries(o).map(([r,d])=>`<option value="${r}" ${r===(e.status||"new")?"selected":""}>${d}</option>`).join("")}
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
  `,i=document.getElementById("details-modal-body");if(i){i.innerHTML=n,i.scrollTop=0;const r=document.getElementById("details-modal");r&&(r.scrollTop=0),window.openModal("details-modal"),setTimeout(()=>{window.fetchServerWAChat&&window.fetchServerWAChat(e.waJid||e.phone,e.assignedTo||""),window.updateSubStatusOptions&&window.updateSubStatusOptions(e.status||"new",e.subStatus||"not_contacted"),window.renderQuickRepliesBar&&window.renderQuickRepliesBar();const d=document.querySelector("emoji-picker");d&&d.addEventListener("emoji-click",s=>{const l=document.getElementById("wa-server-input");l&&(l.value+=s.detail.unicode,l.focus())})},100)}};window.updateSubStatusOptions=function(t,e=null){const o=document.getElementById("update-booking-substatus");if(!o)return;const i={new:[{v:"not_contacted",t:"لم يتم التواصل"},{v:"contacted",t:"تم التواصل"}],waiting:[{v:"docs_received",t:"تم استلام الاوراق"},{v:"waiting_calc",t:"انتظار رد العميل"},{v:"waiting_docs",t:"إنتظار إكمال الاوراق"},{v:"waiting_signature",t:"إنتظار توقيع العميل"}],inquiry:[{v:"docs_not_received",t:"لم يتم استلام الاوراق"}],sold:[{v:"signed",t:"تم التوقيع"},{v:"delivered",t:"تم التسليم"}],rejected:[{v:"no_response",t:"لم يتم رد العميل"},{v:"obligations",t:"التزامات"},{v:"calc_rejected",t:"رفض الحسبة"},{v:"ineligible",t:"غير مسموح له"},{v:"duplicate",t:"مكرر"}]}[t]||[{v:"none",t:"-"}];o.innerHTML=i.map(a=>`<option value="${a.v}" ${a.v===e?"selected":""}>${a.t}</option>`).join("")};window.updateBookingQuickStatus=async function(t){var i,a,r;const e=(i=document.getElementById("update-booking-status"))==null?void 0:i.value,o=((a=document.getElementById("update-booking-substatus"))==null?void 0:a.value)||"",n=((r=document.getElementById("update-booking-details"))==null?void 0:r.value)||"";if(!(!e||!t))try{const d=L(C,`bookings/${t}`);await q(d,{status:e,subStatus:o,additionalDetails:n,updatedAt:new Date().toISOString()}),window.showLuxuryToast("تم تحديث حالة الطلب والتفاصيل بنجاح")}catch(d){console.error(d),window.showLuxuryToast("فشل تحديث الحالة","error")}};window.saveWAServerURL=async function(){var e;const t=(e=document.getElementById("wa-server-url-config"))==null?void 0:e.value;if(t){localStorage.setItem("wa_server_url",t);try{await j(L(C,"settings/waServerUrl"),t)}catch(o){console.error("Firebase save config error:",o)}window.showLuxuryToast("تم حفظ رابط السيرفر وتعميمه لجميع الموظفين بنجاح. يرجى إعادة تحميل الصفحة."),setTimeout(()=>location.reload(),1500)}};window.setLuxuryDetailImg=function(t,e){document.getElementById("active-luxury-img").src=e,document.querySelectorAll(".thumb-wrapper").forEach(o=>o.classList.remove("active")),t.classList.add("active")};window.switchLuxuryDetailImg=function(t,e){const o=window.state.cars.find(l=>l.id===t);if(!o)return;const n=o.images||[o.image||"logo.jpg"],i=document.getElementById("active-luxury-img").src;let a=n.findIndex(l=>i.includes(l));a===-1&&(a=0);let r=(a+e+n.length)%n.length;const d=n[r];document.getElementById("active-luxury-img").src=d;const s=document.querySelectorAll(".thumb-wrapper");s[r]&&(s.forEach(l=>l.classList.remove("active")),s[r].classList.add("active"))};window.openFullscreenGallery=function(t,e){const o=window.state.cars.find(a=>a.id===t);if(!o)return;const n=o.images||[o.image||"logo.jpg"],i=document.createElement("div");i.className="luxury-lightbox",i.innerHTML=`
        <div class="lb-close" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></div>
        <div class="lb-content">
            <img src="${e}" id="lb-main-img">
            <div class="lb-nav">
                <button onclick="window.navLightbox('${t}', -1)"><i class="fas fa-chevron-right"></i></button>
                <button onclick="window.navLightbox('${t}', 1)"><i class="fas fa-chevron-left"></i></button>
            </div>
        </div>
        <div class="lb-thumbs">
            ${n.map(a=>`<img src="${a}" class="lb-thumb ${a===e?"active":""}" onclick="document.getElementById('lb-main-img').src='${a}'; this.parentElement.querySelectorAll('.lb-thumb').forEach(t=>t.classList.remove('active')); this.classList.add('active');">`).join("")}
        </div>
    `,document.body.appendChild(i)};window.navLightbox=function(t,e){const o=window.state.cars.find(s=>s.id===t),n=o.images||[o.image||"logo.jpg"],i=document.getElementById("lb-main-img");let a=n.indexOf(i.src);a===-1&&(a=0);let r=a+e;r<0&&(r=n.length-1),r>=n.length&&(r=0),i.src=n[r];const d=document.querySelectorAll(".lb-thumb");d.forEach(s=>s.classList.remove("active")),d[r].classList.add("active")};window.trackCarView=async function(t){if(t)try{const e=L(C,`analytics/popularCars/${t}`);await K(e,o=>(o||0)+1)}catch(e){console.error("Tracking Error:",e)}};window.resetFilters=function(){["car-search-input","filter-make","filter-type","filter-year","filter-sort"].forEach(e=>{const o=document.getElementById(e);o&&(o.value=o.tagName==="SELECT"?e==="filter-sort"?"newest":"all":"")}),window.applyInventoryFilters()};window.trackVisit=async function(){try{const t=new Date().toISOString().split("T")[0];if(localStorage.getItem("visited_"+t))return;localStorage.setItem("visited_"+t,"true");const e=L(C,"analytics");await K(e,o=>{o||(o={totalVisits:0,dailyVisits:{},browsers:{},devices:{},popularCars:{}}),o.totalVisits=(o.totalVisits||0)+1,o.dailyVisits=o.dailyVisits||{},o.dailyVisits[t]=(o.dailyVisits[t]||0)+1;const n=navigator.userAgent;let i="Other";n.includes("Chrome")?i="Chrome":n.includes("Safari")?i="Safari":n.includes("Firefox")?i="Firefox":n.includes("Edge")&&(i="Edge"),o.browsers=o.browsers||{},o.browsers[i]=(o.browsers[i]||0)+1;const a=/iPhone|iPad|iPod|Android/i.test(n)?"mobile":"desktop";return o.devices=o.devices||{},o.devices[a]=(o.devices[a]||0)+1,o})}catch(t){console.error("Analytics Error:",t)}};window.loginAdmin=async function(t){var a,r;t.preventDefault();const e=(a=document.getElementById("admin-email"))==null?void 0:a.value,o=(r=document.getElementById("admin-pass"))==null?void 0:r.value,n=t.target.querySelector("button");if(!e||!o)return window.showLuxuryToast("يرجى إدخال البريد وكلمة المرور","error");const i=n.innerText;n.innerText="جاري التحقق...",n.disabled=!0;try{await ye(Q,e,o),window.showLuxuryToast("تم تسجيل الدخول بنجاح"),window.createLog("تسجيل دخول","نجاح تسجيل الدخول للنظام","auth"),window.closeModal("admin-modal")}catch(d){console.error(d),window.showLuxuryToast("خطأ في البيانات، يرجى المحاولة مرة أخرى","error")}finally{n.innerText=i,n.disabled=!1}};window.logout=async function(){confirm("هل أنت متأكد من تسجيل الخروج؟")&&(await window.createLog("تسجيل خروج","خرج المستخدم من النظام","auth"),await be(Q),window.showLuxuryToast("تم تسجيل الخروج"))};window.DESIGN_PRESETS={emerald:{primaryColor:"#065f46",secondaryColor:"#10b981",accentColor:"#fbbf24",glassBlur:25,borderRadius:20,cardStyle:"glass",glassOpacity:.6,light:{bgColor:"#ecfdf5",textColor:"#064e3b"},dark:{bgColor:"#022c22",textColor:"#ecfdf5"}},royal:{primaryColor:"#4c1d95",secondaryColor:"#8b5cf6",accentColor:"#f59e0b",glassBlur:15,borderRadius:12,cardStyle:"glass",glassOpacity:.8,light:{bgColor:"#f5f3ff",textColor:"#2e1065"},dark:{bgColor:"#0f0720",textColor:"#f5f3ff"}},midnight:{primaryColor:"#1e1b4b",secondaryColor:"#4338ca",accentColor:"#6366f1",glassBlur:30,borderRadius:24,cardStyle:"glass",glassOpacity:.7,light:{bgColor:"#f0f9ff",textColor:"#0c4a6e"},dark:{bgColor:"#020617",textColor:"#f0f9ff"}},classic:{primaryColor:"#a11d21",secondaryColor:"#1c7c8c",accentColor:"#b8860b",glassBlur:0,borderRadius:8,cardStyle:"solid",glassOpacity:1,light:{bgColor:"#f8fafc",textColor:"#0f172a"},dark:{bgColor:"#05080c",textColor:"#f8fafc"}},gold:{primaryColor:"#b8860b",secondaryColor:"#d4af37",accentColor:"#ffd700",glassBlur:10,borderRadius:0,cardStyle:"glass",glassOpacity:.9,light:{bgColor:"#fffdf0",textColor:"#2d2300"},dark:{bgColor:"#050500",textColor:"#fffdf0"}},ocean:{primaryColor:"#0f172a",secondaryColor:"#38bdf8",accentColor:"#2dd4bf",glassBlur:20,borderRadius:30,cardStyle:"glass",glassOpacity:.5,light:{bgColor:"#f0f9ff",textColor:"#0c4a6e"},dark:{bgColor:"#020617",textColor:"#f0f9ff"}},carbon:{primaryColor:"#171717",secondaryColor:"#404040",accentColor:"#ef4444",glassBlur:5,borderRadius:4,cardStyle:"solid",glassOpacity:1,light:{bgColor:"#f5f5f5",textColor:"#171717"},dark:{bgColor:"#0a0a0a",textColor:"#f5f5f5"}}};window.applyDesignPreset=function(t){const e=window.DESIGN_PRESETS[t];e&&(window.applySettings({...window.state.settings,...e}),showLuxuryToast(window.state.lang==="ar"?"تم تطبيق النمط بنجاح":"Preset applied successfully"))};window.saveCustomDesign=async function(){var o,n,i,a,r,d,s,l,g,u;const t=prompt(window.state.lang==="ar"?"أدخل اسماً لمظهرك المخصص:":"Enter a name for your custom design:");if(!t)return;const e={primaryColor:(o=document.getElementById("set-color-primary"))==null?void 0:o.value,secondaryColor:(n=document.getElementById("set-color-secondary"))==null?void 0:n.value,accentColor:(i=document.getElementById("set-color-accent"))==null?void 0:i.value,glassBlur:parseInt(((a=document.getElementById("set-glass-blur"))==null?void 0:a.value)||"20"),shadowDepth:parseInt(((r=document.getElementById("set-shadow-depth"))==null?void 0:r.value)||"40"),borderRadius:((d=document.getElementById("set-border-radius"))==null?void 0:d.value)||"16",cardStyle:((s=document.getElementById("set-card-style"))==null?void 0:s.value)||"glass",glassOpacity:parseFloat(((l=document.getElementById("set-glass-opacity"))==null?void 0:l.value)||"0.75"),bgColor:(g=document.getElementById("set-color-bg"))==null?void 0:g.value,textColor:(u=document.getElementById("set-color-text"))==null?void 0:u.value,name:t,createdAt:new Date().toISOString()};try{const c=P(L(C,"custom_presets"));await j(c,e),showLuxuryToast(window.state.lang==="ar"?"تم حفظ المظهر الخاص بنجاح":"Custom design saved successfully")}catch{showLuxuryToast("فشل الحفظ","error")}};window.deleteCustomPreset=async function(t){if(confirm(window.state.lang==="ar"?"هل أنت متأكد من حذف هذا المظهر؟":"Are you sure you want to delete this preset?"))try{await O(L(C,`custom_presets/${t}`)),showLuxuryToast(window.state.lang==="ar"?"تم الحذف":"Deleted")}catch{showLuxuryToast("Error","error")}};window.renderCustomPresets=function(){const t=document.getElementById("custom-presets-list");if(!t)return;const e=window.state.custom_presets||[];if(e.length===0){t.innerHTML=`<div style="grid-column: 1/-1; text-align:center; opacity:0.5; padding:20px;">${window.state.lang==="ar"?"لا يوجد مظاهر محفوظة":"No saved designs"}</div>`;return}t.innerHTML=e.map(o=>`
    <div class="custom-preset-card" style="background:var(--bg-card); border:1px solid var(--glass-border); padding:15px; border-radius:12px; display:flex; justify-content:space-between; align-items:center;">
       <div>
         <div style="font-weight:bold; margin-bottom:5px;">${o.name}</div>
         <div style="display:flex; gap:5px;">
            <span style="width:12px; height:12px; border-radius:50%; background:${o.primaryColor};"></span>
            <span style="width:12px; height:12px; border-radius:50%; background:${o.secondaryColor};"></span>
         </div>
       </div>
       <div style="display:flex; gap:10px;">
          <button class="btn-premium btn-sm" onclick="window.applySettings(window.state.custom_presets.find(x => x.id === '${o.id}'))" style="padding:5px 10px; font-size:11px;">تطبيق</button>
          <button class="btn-premium btn-sm" onclick="window.deleteCustomPreset('${o.id}')" style="background:var(--p-red); padding:5px 10px; font-size:11px;"><i class="fas fa-trash"></i></button>
       </div>
    </div>
  `).join("")};window.applySettings=function(t){var S,M,D,_;if(!t)return;const e=document.documentElement;if(t.defaultTheme&&!(localStorage.getItem("theme_manually_overridden")==="true")){document.body.setAttribute("data-theme",t.defaultTheme),localStorage.setItem("luxury_theme",t.defaultTheme);const B=document.getElementById("theme-btn");B&&(B.innerHTML=t.defaultTheme==="dark"?'<i class="fas fa-sun"></i>':'<i class="fas fa-moon"></i>')}t.primaryColor&&(e.style.setProperty("--p-red",t.primaryColor),e.style.setProperty("--p-red-glow",t.primaryColor+"66")),t.secondaryColor&&e.style.setProperty("--p-teal",t.secondaryColor),t.accentColor&&e.style.setProperty("--p-copper",t.accentColor);const o=t.logo||"logo.jpg";document.querySelectorAll(".logo-wrap img, .sidebar-brand img, .splash-logo img, #footer-logo-img, #nav-logo-img, #splash-logo-img").forEach(A=>{A.src=o});const n=t.nameAr||"ون كار",i=t.nameEn||"ONE CAR",a=window.state.lang==="ar"?n:i;document.querySelectorAll(".dynamic-name-ar").forEach(A=>A.innerText=n),document.querySelectorAll(".dynamic-name-en").forEach(A=>A.innerText=i),document.title=a+" | "+(window.state.lang==="ar"?"الفخامة في عالم السيارات":"Luxury Automotive"),t.fontFamily&&(e.style.setProperty("--font-main",t.fontFamily),document.body.style.fontFamily=t.fontFamily);const r="dynamic-design-styles";let d=document.getElementById(r);d||(d=document.createElement("style"),d.id=r,document.head.appendChild(d));let s="";const l=((S=t.dark)==null?void 0:S.bgColor)||t.bgColor,g=((M=t.dark)==null?void 0:M.textColor)||t.textColor,u=(D=t.light)==null?void 0:D.bgColor,c=(_=t.light)==null?void 0:_.textColor;if(l&&(s+=`body[data-theme="dark"] { --bg-main: ${l}; }
`),g&&(s+=`body[data-theme="dark"] { --text-main: ${g}; }
`),u&&(s+=`body[data-theme="light"] { --bg-main: ${u}; }
`),c&&(s+=`body[data-theme="light"] { --text-main: ${c}; }
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
    `;else{let A=t.glassOpacity!==void 0?t.glassOpacity:.75,B=t.glassBlur!==void 0?t.glassBlur:20;s+=`
      body[data-theme="dark"] .car-card-premium, body[data-theme="dark"] .modal-inner, body[data-theme="dark"] .stat-premium-card, body[data-theme="dark"] .nav-premium, body[data-theme="dark"] .admin-item-row {
         background: rgba(17, 24, 39, ${A}) !important;
         backdrop-filter: blur(${B}px) !important;
         -webkit-backdrop-filter: blur(${B}px) !important;
      }
      body[data-theme="light"] .car-card-premium, body[data-theme="light"] .modal-inner, body[data-theme="light"] .stat-premium-card, body[data-theme="light"] .nav-premium, body[data-theme="light"] .admin-item-row {
         background: rgba(255, 255, 255, ${A}) !important;
         backdrop-filter: blur(${B}px) !important;
         -webkit-backdrop-filter: blur(${B}px) !important;
         border: 1px solid rgba(0,0,0,0.05) !important;
      }
    `}if(t.logoBlend&&t.logoBlend!=="auto"){const A=t.logo||"logo.jpg";t.logoBlend==="mask"?s+=`
        .logo-wrap img, .sidebar-brand img, .splash-logo img, #footer-logo-img, #nav-logo-img, #splash-logo-img {
           /* Mask works ONLY if the logo image is a transparent PNG */
           -webkit-mask-image: url("${A}");
           mask-image: url("${A}");
           -webkit-mask-size: contain;
           mask-size: contain;
           -webkit-mask-repeat: no-repeat;
           mask-repeat: no-repeat;
           -webkit-mask-position: center;
           mask-position: center;
           ${t.enablePrimaryGradient?`background: linear-gradient(135deg, ${t.primaryGradColor1||"#a11d21"}, ${t.primaryGradColor2||"#1c7c8c"}) !important;`:"background-color: var(--p-gold) !important;"}
           content: url("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7") !important;
           object-fit: contain;
           display: inline-block;
           min-width: 40px;
           min-height: 40px;
        }
      `:s+=`
        .logo-wrap img, .sidebar-brand img, .splash-logo img, #footer-logo-img, #nav-logo-img, #splash-logo-img {
           mix-blend-mode: ${t.logoBlend};
        }
      `}if(t.logoScale&&(s+=`
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
    `),t.enableTextGradient){const A=t.textGradColor1||"#b8860b",B=t.textGradColor2||"#ffffff";s+=`
      .logo-brand-name h1, .luxury-font, .hero-main-title, .section-title-v2, .car-title-v3, .p-amount, .hero-secondary-title {
        background: linear-gradient(135deg, ${A}, ${B});
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        display: inline-block;
      }
    `}if(t.enableTopbarGradient){const A=t.topbarGradColor1||"#a11d21",B=t.topbarGradColor2||"#05080c";s+=`
      .top-bar-luxury {
        background: linear-gradient(90deg, ${A}, ${B}) !important;
      }
    `}if(t.enablePrimaryGradient){const A=t.primaryGradColor1||"#a11d21",B=t.primaryGradColor2||"#1c7c8c";s+=`
      .btn-premium, .car-price-v3, .car-badge-v3.available, .badge-v3.year, .p-header, .stat-icon, .car-badge-v3.custom {
        background: linear-gradient(135deg, ${A}, ${B}) !important;
        border: none !important;
        color: white !important;
      }
      .btn-premium:hover {
        filter: brightness(1.2);
        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
      }
    `}d.innerHTML=s;const m=document.getElementById("about-text-display");m&&(m.innerText=t.aboutUs||"نقدم لكم تجربة استثنائية في عالم السيارات...");const I=document.getElementById("location-text-display");I&&(I.innerText=t.location||"الرياض - معارض القادسية");const v=document.getElementById("f-phone-admin");v&&(v.innerText=t.contactAdmin||"...");const w=document.getElementById("f-phone-sales");w&&(w.innerText=t.contactSales||"...");const y=document.getElementById("f-phone-info");y&&(y.innerText=t.contactComplaints||"...");const b=document.getElementById("f-email-display");b&&(b.innerText=t.contactEmail||"...");const x=document.getElementById("contact-location-link");x&&(x.href=t.locationUrl||"#");const k=document.getElementById("meta-title");k&&(k.innerText=`${n} | ${t.metaTitle||"الفخامة والجودة تليق بك"}`);const $=document.getElementById("meta-description");$&&$.setAttribute("content",t.metaDesc||"وجهتكم الرائدة للسيارات الفاخرة والمعتمدة.");const T={"f-insta":t.socialInsta,"f-snap":t.socialSnap,"f-twitter":t.socialTwitter};Object.entries(T).forEach(([A,B])=>{const R=document.getElementById(A);R&&(R.href=B||"#")});const p={"set-name-ar":t.nameAr||"","set-name-en":t.nameEn||"","set-color-primary":t.primaryColor||"#a11d21","set-color-secondary":t.secondaryColor||"#1c7c8c","set-color-accent":t.accentColor||"#b8860b","set-color-bg":t.bgColor||"#05080c","set-color-text":t.textColor||"#f8fafc","set-hover-effect":t.hoverEffect||"scale","set-card-style":t.cardStyle||"glass","set-glass-opacity":t.glassOpacity!==void 0?t.glassOpacity:.75,"set-logo-blend":t.logoBlend||"auto","set-logo-scale":t.logoScale||"1","set-default-theme":t.defaultTheme||"dark","set-font-family":t.fontFamily||"'Cairo', sans-serif","set-border-radius":t.borderRadius||"16","set-glass-blur":t.glassBlur||20,"set-shadow-depth":t.shadowDepth||40,"set-anim-speed":t.animSpeed||1,"set-enable-animations":t.enableAnimations!==void 0?t.enableAnimations.toString():"true","set-contact-mgmt":t.contactAdmin||"","set-contact-sales":t.contactSales||"","set-contact-complaints":t.contactComplaints||"","set-contact-email":t.contactEmail||"","set-about-text":t.aboutUs||"","set-location-link":t.locationUrl||"","set-location-text":t.location||"","set-insta-link":t.socialInsta||"","set-snap-link":t.socialSnap||"","set-twitter-link":t.socialTwitter||"","set-text-grad-1":t.textGradColor1||"#b8860b","set-text-grad-2":t.textGradColor2||"#ffffff","set-topbar-grad-1":t.topbarGradColor1||"#a11d21","set-topbar-grad-2":t.topbarGradColor2||"#05080c","set-primary-grad-1":t.primaryGradColor1||"#a11d21","set-primary-grad-2":t.primaryGradColor2||"#1c7c8c"};Object.entries(p).forEach(([A,B])=>{const R=document.getElementById(A);if(R&&(R.value=B,R.type==="range"||R.type==="color")){let N=document.createEvent("HTMLEvents");N.initEvent("input",!1,!0),R.dispatchEvent(N)}});const h=document.getElementById("set-maintenance-mode");h&&(h.checked=t.maintenanceMode||!1);const E={"set-enable-text-grad":t.enableTextGradient!==void 0?t.enableTextGradient:!0,"set-enable-topbar-grad":t.enableTopbarGradient!==void 0?t.enableTopbarGradient:!0,"set-enable-primary-grad":t.enablePrimaryGradient!==void 0?t.enablePrimaryGradient:!0};Object.entries(E).forEach(([A,B])=>{const R=document.getElementById(A);R&&(R.checked=B)});const f=document.getElementById("logo-preview-img");f&&(f.src=o),localStorage.setItem("luxury-settings-cache",JSON.stringify(t))};window.resetToDefaultSettings=async function(){if(confirm("هل أنت متأكد من إعادة ضبط كافة الإعدادات؟ سيتم فقدان الشعارات والألوان المخصصة.")){const t={nameAr:"ون كار",nameEn:"ONE CAR",primaryColor:"#a11d21",secondaryColor:"#1c7c8c",accentColor:"#b8860b",defaultTheme:"dark",borderRadius:"16px",logo:"logo.jpg",aboutUs:"تجربة استثنائية في عالم السيارات",location:"الرياض - معارض القادسية"};await j(L(C,"settings"),t),window.showLuxuryToast("تمت إعادة الضبط بنجاح")}};window.markAllNotificationsRead=async function(){try{const t=window.state.notifications.map(e=>q(L(C,`notifications/${e.id}`),{read:!0}));await Promise.all(t),window.showLuxuryToast("تم تحديد الكل كمقروء")}catch(t){console.error(t)}};window.switchSettingsTab=function(t,e){document.querySelectorAll(".set-pane").forEach(n=>n.classList.add("hidden")),document.querySelectorAll(".set-tab").forEach(n=>n.classList.remove("active"));const o=document.getElementById(t);o&&o.classList.remove("hidden"),e&&e.classList.add("active")};window.previewLogo=async function(t){if(t.files&&t.files[0])try{const e=await window.compressImage(t.files[0],400,400,.8);document.getElementById("logo-preview-img").src=e,document.getElementById("set-logo-b64").value=e}catch(e){console.error("Logo compression failed",e)}};window.saveAppSettings=async function(){var o,n,i,a,r,d,s,l,g,u,c,m,I,v,w,y,b,x,k,$,T,p,h,E,f,S,M,D,_,A,B,R,N,H,W,G,Z,ee,te,oe;const t=document.querySelector('button[onclick="window.saveAppSettings()"]');t&&(t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin"></i> جاري الحفظ...');const e={nameAr:((o=document.getElementById("set-name-ar"))==null?void 0:o.value)||"",nameEn:((n=document.getElementById("set-name-en"))==null?void 0:n.value)||"",logo:((i=document.getElementById("set-logo-b64"))==null?void 0:i.value)||window.state.settings.logo||"logo.jpg",primaryColor:((a=document.getElementById("set-color-primary"))==null?void 0:a.value)||"",secondaryColor:((r=document.getElementById("set-color-secondary"))==null?void 0:r.value)||"",accentColor:((d=document.getElementById("set-color-accent"))==null?void 0:d.value)||"",bgColor:((s=document.getElementById("set-color-bg"))==null?void 0:s.value)||"",textColor:((l=document.getElementById("set-color-text"))==null?void 0:l.value)||"",hoverEffect:((g=document.getElementById("set-hover-effect"))==null?void 0:g.value)||"scale",cardStyle:((u=document.getElementById("set-card-style"))==null?void 0:u.value)||"glass",glassOpacity:parseFloat(((c=document.getElementById("set-glass-opacity"))==null?void 0:c.value)||"0.75"),logoBlend:((m=document.getElementById("set-logo-blend"))==null?void 0:m.value)||"auto",logoScale:((I=document.getElementById("set-logo-scale"))==null?void 0:I.value)||"1",defaultTheme:((v=document.getElementById("set-default-theme"))==null?void 0:v.value)||"",fontFamily:((w=document.getElementById("set-font-family"))==null?void 0:w.value)||"",borderRadius:((y=document.getElementById("set-border-radius"))==null?void 0:y.value)||"",glassBlur:parseInt(((b=document.getElementById("set-glass-blur"))==null?void 0:b.value)||"20"),shadowDepth:parseInt(((x=document.getElementById("set-shadow-depth"))==null?void 0:x.value)||"40"),animSpeed:parseFloat(((k=document.getElementById("set-anim-speed"))==null?void 0:k.value)||"1"),enableAnimations:(($=document.getElementById("set-enable-animations"))==null?void 0:$.value)==="true",contactAdmin:((T=document.getElementById("set-contact-mgmt"))==null?void 0:T.value)||"",contactSales:((p=document.getElementById("set-contact-sales"))==null?void 0:p.value)||"",contactComplaints:((h=document.getElementById("set-contact-complaints"))==null?void 0:h.value)||"",contactEmail:((E=document.getElementById("set-contact-email"))==null?void 0:E.value)||"",aboutUs:((f=document.getElementById("set-about-text"))==null?void 0:f.value)||"",locationUrl:((S=document.getElementById("set-location-link"))==null?void 0:S.value)||"",location:((M=document.getElementById("set-location-text"))==null?void 0:M.value)||"",socialInsta:((D=document.getElementById("set-insta-link"))==null?void 0:D.value)||"",socialSnap:((_=document.getElementById("set-snap-link"))==null?void 0:_.value)||"",socialTwitter:((A=document.getElementById("set-twitter-link"))==null?void 0:A.value)||"",maintenanceMode:((B=document.getElementById("set-maintenance-mode"))==null?void 0:B.checked)||!1,enableTextGradient:(R=document.getElementById("set-enable-text-grad"))==null?void 0:R.checked,textGradColor1:(N=document.getElementById("set-text-grad-1"))==null?void 0:N.value,textGradColor2:(H=document.getElementById("set-text-grad-2"))==null?void 0:H.value,enableTopbarGradient:(W=document.getElementById("set-enable-topbar-grad"))==null?void 0:W.checked,topbarGradColor1:(G=document.getElementById("set-topbar-grad-1"))==null?void 0:G.value,topbarGradColor2:(Z=document.getElementById("set-topbar-grad-2"))==null?void 0:Z.value,enablePrimaryGradient:(ee=document.getElementById("set-enable-primary-grad"))==null?void 0:ee.checked,primaryGradColor1:(te=document.getElementById("set-primary-grad-1"))==null?void 0:te.value,primaryGradColor2:(oe=document.getElementById("set-primary-grad-2"))==null?void 0:oe.value,updatedAt:new Date().toISOString()};try{localStorage.removeItem("theme_manually_overridden"),await j(L(C,"settings"),e),window.showLuxuryToast("تم حفظ الإعدادات بنجاح"),window.createLog("تعديل إعدادات","تحديث شامل لإعدادات الموقع والمنصة","settings")}catch{window.showLuxuryToast("فشل الحفظ، تأكد من الصلاحيات","error")}finally{t&&(t.disabled=!1,t.innerHTML='<i class="fas fa-save"></i> حفظ التغييرات')}};window.toggleDesignPreview=function(){const t=document.getElementById("design-preview-widget");t&&t.classList.toggle("minimized")};window.makeDraggable=function(t){if(!t||t.dataset.draggable)return;t.dataset.draggable="true";let e=0,o=0,n=0,i=0;const a=t.querySelector("div");if(!a)return;a.onmousedown=r;function r(l){l.target.tagName==="BUTTON"||l.target.tagName==="I"||(l.preventDefault(),n=l.clientX,i=l.clientY,document.onmouseup=s,document.onmousemove=d)}function d(l){l.preventDefault(),e=n-l.clientX,o=i-l.clientY,n=l.clientX,i=l.clientY,t.style.top=t.offsetTop-o+"px",t.style.left=t.offsetLeft-e+"px",t.style.bottom="auto",t.style.right="auto"}function s(){document.onmouseup=null,document.onmousemove=null}};window.filterUsersByRole=function(t,e){e&&(document.querySelectorAll("#users-roles-tabs .p-tab").forEach(o=>o.classList.remove("active")),e.classList.add("active")),window.state.userRoleFilter=t,window.syncAdminTables("users")};window.syncAdminTables=function(t){var i,a,r,d,s,l,g,u,c,m,I,v,w,y,b;if(t==="all"){["cars","ads","sales","bookings","users","plates","reviews","partners","brands","locations","blogs","whatsapp-monitor","quick-replies"].forEach(k=>window.syncAdminTables(k));return}if(t==="whatsapp-monitor"){window.renderWhatsAppMonitor();return}if(t==="quick-replies"||t==="quickReplies"){window.renderQuickRepliesAdmin&&window.renderQuickRepliesAdmin(),window.renderQuickRepliesBar&&window.renderQuickRepliesBar();return}const e=document.getElementById(`admin-${t}-table`);if(!e)return;let o=window.state[t]||[];const n=(((i=document.getElementById(`admin-${t}-search`))==null?void 0:i.value)||((a=document.getElementById(`${t}-search`))==null?void 0:a.value)||((r=document.getElementById(`${t.slice(0,-1)}-search`))==null?void 0:r.value)||"").toLowerCase();if(n&&(o=o.filter(x=>(x.make||x.title||x.name||x.model||x.phone||x.carRequested||x.carOrCompany||"").toLowerCase().includes(n))),t==="notifications"&&!(((d=window.state.userProfile)==null?void 0:d.role)==="admin"||((s=window.state.userProfile)==null?void 0:s.role)==="supervisor")&&window.state.user&&(o=o.filter(k=>k.userId===window.state.user.uid||k.assignedTo===window.state.user.uid)),t==="cars"){const x=document.getElementById("admin-filter-car-make");x&&x.options.length<=1&&window.state.cars.length>0&&[...new Set(window.state.cars.map(p=>p.make))].sort().forEach(p=>{const h=document.createElement("option");h.value=p,h.textContent=p,x.appendChild(h)});const k=((l=document.getElementById("admin-filter-car-status"))==null?void 0:l.value)||"all",$=((g=document.getElementById("admin-filter-car-make"))==null?void 0:g.value)||"all";k!=="all"&&(o=o.filter(T=>T.status===k)),$!=="all"&&(o=o.filter(T=>T.make===$))}if(t==="bookings"){const x=document.getElementById("filter-booking-staff");x&&x.options.length<=1&&window.state.users&&window.state.users.forEach(f=>{if(f.email!=="zyrozyro98@gmail.com"&&(f.role==="admin"||f.role==="supervisor"||f.role==="staff")){const S=document.createElement("option");S.value=f.id,S.textContent=f.name||f.email||"مستخدم غير محدد",x.appendChild(S)}});const k=document.getElementById("filter-booking-sub-status");if(k&&k.options.length<=1){window.setBookingFilter(window.state.bookingFilter||"all",null,window.state.bookingSubStatusFilter||"all");return}const $=((u=document.getElementById("filter-booking-status"))==null?void 0:u.value)||window.state.bookingFilter||"all",T=((c=document.getElementById("filter-booking-sub-status"))==null?void 0:c.value)||window.state.bookingSubStatusFilter||"all",p=((m=document.getElementById("filter-booking-staff"))==null?void 0:m.value)||"all",h=((I=document.getElementById("filter-booking-type"))==null?void 0:I.value)||"all";window.state.bookingFilter=$,window.state.bookingSubStatusFilter=T,$!=="all"&&(o=o.filter(f=>{let S=f.status||"new";return $==="cancelled"&&(S==="rejected"||S==="cancelled")?!0:S===$})),T!=="all"&&(o=o.filter(f=>f.subStatus===T)),p!=="all"&&(o=o.filter(f=>f.assignedTo===p)),h!=="all"&&(o=o.filter(f=>(f.customerType||"individual")===h)),!(((v=window.state.userProfile)==null?void 0:v.role)==="admin"||((w=window.state.userProfile)==null?void 0:w.role)==="supervisor")&&window.state.user&&(o=o.filter(f=>f.assignedTo===window.state.user.uid))}if(t==="users"){o=o.filter(p=>p.email!=="zyrozyro98@gmail.com");const x=window.state.userRoleFilter||"all";x!=="all"&&(o=o.filter(p=>p.role===x));const k=document.getElementById("stat-users-total"),$=document.getElementById("stat-users-active"),T=document.getElementById("stat-users-admins");if(k&&(k.innerText=o.length),$){$.innerText=o.filter(h=>h.isAvailable).length;const p=$.nextElementSibling;p&&(p.innerText="متواجد حالياً")}if(T){const p=T.nextElementSibling;if(x==="all")T.innerText=o.filter(h=>h.role==="admin").length,p&&(p.innerText="مدراء النظام");else{T.innerText=o.length;const h={admin:"مدراء النظام",supervisor:"مشرفين",staff:"المندوبين"};p&&(p.innerText="إجمالي الـ "+(h[x]||""))}}}if(t==="bookings"?(((y=document.getElementById("filter-booking-sort"))==null?void 0:y.value)||"newest")==="oldest"?o.sort((k,$)=>new Date(k.createdAt||0)-new Date($.createdAt||0)):o.sort((k,$)=>new Date($.createdAt||0)-new Date(k.createdAt||0)):o.sort((x,k)=>new Date(k.createdAt||0)-new Date(x.createdAt||0)),o.length===0){e.innerHTML='<div class="no-data-admin" style="padding:40px; text-align:center; opacity:0.5;">لا توجد بيانات لهذه الفئة</div>';return}if(t==="users"){const x=window.state.bookings||[],k=((b=window.state.userProfile)==null?void 0:b.role)==="admin";let $=`<table class="admin-table-v2" style="width:100%; border-collapse:collapse; min-width:800px; font-size:14px;">
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
          <tbody>`;o.forEach(T=>{const p=x.filter(B=>B.assignedTo===T.id),h=p.filter(B=>B.status==="sold"||B.status==="done").length,E=p.filter(B=>B.status==="new"||B.status==="waiting"||B.status==="inquiry"||!B.status).length,f=p.filter(B=>B.status==="cancelled").length,M={admin:"مسؤول",supervisor:"مشرف",staff:"مندوب"}[T.role]||"مندوب",D=T.image||"logo.jpg",_=T.phone||"";let A="";if(_){let B=_.replace(/\D/g,"");B=window.normalizePhone(B),A=`<a href="https://wa.me/${B}" target="_blank" class="icon-btn-lite success" title="مراسلة واتساب"><i class="fab fa-whatsapp"></i></a>`}$+=`<tr style="border-bottom: 1px solid rgba(255,255,255,0.05); transition: background 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.02)'" onmouseout="this.style.background='transparent'">
              <td style="padding:15px;">
                  <div style="display:flex; align-items:center; gap:12px;">
                      <div style="width:40px; height:40px; border-radius:50%; overflow:hidden; background:#222; flex-shrink:0;">
                          <img src="${D}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='logo.jpg'">
                      </div>
                      <div>
                          <strong style="display:block; font-size:15px;">${T.name||T.email}</strong>
                          ${_?`<span style="font-size:12px; color:var(--text-dim);">${_}</span>`:""}
                      </div>
                  </div>
              </td>
              <td style="padding:15px;"><span style="color:var(--p-copper); font-size:13px;">${M}</span></td>
              <td style="padding:15px;"><span class="status-badge ${T.isAvailable?"online":"busy"}" style="font-size:11px;">● ${T.isAvailable?"متاح":"غير متاح"}</span></td>
              <td style="padding:15px; text-align:center;"><span style="color:#00a884; font-weight:bold; font-size:15px;">${h}</span></td>
              <td style="padding:15px; text-align:center;"><span style="color:var(--p-gold); font-weight:bold; font-size:15px;">${E}</span></td>
              <td style="padding:15px; text-align:center;"><span style="color:#e02424; font-weight:bold; font-size:15px;">${f}</span></td>
              <td style="padding:15px; text-align:center;">
                  <div style="display:flex; justify-content:center; gap:8px;">
                      ${A}
                      <button class="icon-btn-lite" onclick="window.editLuxuryItem('users', '${T.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                      ${k?`<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('users', '${T.id}')" title="حذف"><i class="fas fa-trash"></i></button>`:""}
                  </div>
              </td>
          </tr>`}),$+="</tbody></table>",e.innerHTML=$;return}e.innerHTML=o.map(x=>Ce(t,x)).join("")};function Ce(t,e){var g,u,c,m,I,v,w,y;((g=window.state.userProfile)==null?void 0:g.role)==="admin"||((u=window.state.userProfile)==null||u.role);const o=((c=window.state.userProfile)==null?void 0:c.role)==="admin",n=((m=window.state.userProfile)==null?void 0:m.role)==="supervisor",a=o||n&&["bookings","notifications"].includes(t),r=e.status==="sold"?"danger":e.status==="available"?"success":"warning",d=e.status==="sold"?"مباع":e.status==="available"?"متاح":"محجوز";if(t==="bookings"){const b=((I=window.state.users.find(p=>p.id===e.assignedTo))==null?void 0:I.name)||"غير محدد",x={new:"جديد",waiting:"بالانتظار",inquiry:"استفسار",sold:"مكتمل",done:"تم",cancelled:"مرفوض",rejected:"مرفوض"},k={not_contacted:"لم يتم التواصل",contacted:"تم التواصل",docs_received:"تم استلام الاوراق",waiting_calc:"انتظار رد العميل",waiting_docs:"إنتظار إكمال الاوراق",waiting_signature:"إنتظار توقيع العميل",docs_not_received:"لم يتم استلام الاوراق",signed:"تم التوقيع",delivered:"تم التسليم",done:"تم",no_response:"لم يتم رد العميل",obligations:"التزامات",calc_rejected:"رفض الحسبة",ineligible:"غير مسموح له",duplicate:"مكرر"},$=e.status==="cancelled"||e.status==="rejected"?"danger":e.status==="sold"||e.status==="done"?"success":"warning",T=e.subStatus?k[e.subStatus]||e.subStatus:"";return`
            <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:12px; border:1px solid var(--glass-border); margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                <div class="admin-item-info">
                    <strong style="display:block; font-size:16px;">${e.name||e.phone}</strong>
                    <div class="meta-row" style="font-size:12px; color:var(--text-dim); margin-top:5px; display:flex; gap:10px; flex-wrap:wrap;">
                        <span><i class="fas fa-car"></i> ${e.carOrCompany||e.carRequested||"-"}</span> | 
                        <span><i class="fas fa-user-tie"></i> ${b}</span>
                        ${T?`| <span style="color:var(--p-copper);"><i class="fas fa-info-circle"></i> ${T}</span>`:""}
                    </div>
                </div>
                <div class="admin-actions" style="display:flex; gap:10px; align-items:center;">
                    <span class="badge-${$}" style="font-size:10px; padding:3px 8px; border-radius:5px;">${x[e.status]||e.status||"جديد"}</span>
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
        `;if(t==="notifications"){const b=!!e.read,x=e.type||"system",k=((v=window.state.userProfile)==null?void 0:v.role)==="admin"||((w=window.state.userProfile)==null?void 0:w.role)==="supervisor",$=e.userId||e.assignedTo,T=(y=window.state.users)==null?void 0:y.find(E=>E.id===$),p=T?T.name||T.email:"نظام",h={wa_message:"fab fa-whatsapp",booking:"fas fa-calendar-check",system:"fas fa-info-circle",auth:"fas fa-shield-alt"};return`
      <div class="notification-premium-item ${b?"":"unread"}" onclick="window.handleNotificationClick('${e.id}', '${e.link||""}')">
          <div class="notif-icon-wrap">
              <i class="${h[x]||h.system}"></i>
          </div>
          <div class="notif-content">
              <div class="notif-header">
                  <div style="display:flex; flex-direction:column; gap:2px;">
                      <span class="notif-title">${e.title||"تنبيه بالنظام"}</span>
                      ${k?`<span style="font-size:11px; color:var(--p-gold); font-weight:bold;">الموظف: ${p}</span>`:""}
                  </div>
                  <span class="notif-time">${window.formatDateRelative?window.formatDateRelative(e.timestamp):new Date(e.timestamp).toLocaleString("ar-SA")}</span>
              </div>
              <p class="notif-body">${e.text||e.message||""}</p>
              <div class="notif-actions" onclick="event.stopPropagation()">
                  ${b?"":`
                      <button class="btn-premium btn-xs" style="padding:4px 12px; font-size:11px;" onclick="window.markNotificationRead('${e.id}')">
                          <i class="fas fa-check"></i> مقروء
                      </button>
                  `}
                  <button class="btn-premium btn-xs danger" style="padding:4px 12px; font-size:11px;" onclick="window.deleteLuxuryItem('notifications', '${e.id}')">
                      <i class="fas fa-trash"></i> حذف
                  </button>
              </div>
          </div>
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
        `;if(t==="sales"){const b=(e.url||"").trim();let x=b.includes("youtube.com")||b.includes("youtu.be"),k=e.poster||e.image||null;if(x&&!k){let $="";try{b.includes("v=")?$=b.split("v=")[1].split("&")[0]:b.includes("youtu.be/")?$=b.split("youtu.be/")[1].split("?")[0]:b.includes("embed/")?$=b.split("embed/")[1].split("?")[0]:$=b.split("/").pop().split("?")[0]}catch{$=""}$&&(k=`https://img.youtube.com/vi/${$}/mqdefault.jpg`)}return k=k||"logo.jpg",`
            <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:12px; border-radius:16px; border:1px solid var(--glass-border); margin-bottom:12px; display:flex; align-items:center; gap:20px;">
                <div class="admin-item-thumb" style="width:80px; height:50px; border-radius:10px; overflow:hidden; flex-shrink:0; background:#000;">
                    <img src="${k}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='logo.jpg'">
                </div>
                <div class="admin-item-info" style="flex-grow:1;">
                    <strong style="display:block; font-size:16px;">${e.title||e.name||"لحظة تسليم"}</strong>
                    <div style="font-size:11px; color:var(--text-dim); margin-top:4px; max-width:400px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                        <i class="fas fa-link"></i> ${b}
                    </div>
                </div>
                <div class="admin-actions">
                    <button class="icon-btn-lite view" onclick="window.openVideoLightbox('${b}')" title="معاينة"><i class="fas fa-eye"></i></button>
                    ${a?`
                        <button class="icon-btn-lite" onclick="window.editLuxuryItem('sales', '${e.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                        <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('sales', '${e.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                    `:""}
                </div>
            </div>
        `}if(t==="reviews"){const b=Number(e.rating||5),x=e.text?e.text.length>60?e.text.substring(0,60)+"...":e.text:"لا يوجد نص",k=e.avatar||e.image||"";return`
        <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:16px; border:1px solid var(--glass-border); margin-bottom:12px; display:flex; align-items:center; gap:20px;">
            <div class="admin-item-avatar" style="width:50px; height:50px; border-radius:50%; overflow:hidden; flex-shrink:0; background:var(--bg-alt); border:2px solid var(--p-copper); display:flex; align-items:center; justify-content:center; color:var(--p-copper); font-weight:900;">
                ${k?`<img src="${k}" style="width:100%; height:100%; object-fit:cover;">`:(e.name||"U").charAt(0)}
            </div>
            <div class="admin-item-info" style="flex-grow:1;">
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:4px;">
                    <strong style="font-size:16px;">${e.name||"عميل مجهول"}</strong>
                    <div class="review-stars-lite" style="color:#ffd700; font-size:11px;">
                        ${'<i class="fas fa-star"></i>'.repeat(b)}
                    </div>
                </div>
                <p style="font-size:13px; color:var(--text-dim); margin-top:2px;">"${x}"</p>
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
    `}window.updateStatistics=function(){var x,k,$,T;const t=document.getElementById("stat-cars-count-v2"),e=document.getElementById("stat-bookings-count-v2"),o=document.getElementById("stat-total-value-v2"),n=window.state.cars||[];let i=window.state.bookings||[];if(!(((x=window.state.userProfile)==null?void 0:x.role)==="admin"||((k=window.state.userProfile)==null?void 0:k.role)==="supervisor")&&window.state.user&&(i=i.filter(p=>p.assignedTo===window.state.user.uid)),t&&(t.innerText=n.length),e&&(e.innerText=i.length),o){const p=n.reduce((h,E)=>h+(parseFloat(E.price)||0),0);o.innerText=p.toLocaleString()+" ريال"}const r={all:i.length,new:i.filter(p=>p.status==="new"||!p.status).length,waiting:i.filter(p=>p.status==="waiting").length,inquiry:i.filter(p=>p.status==="inquiry").length,sold:i.filter(p=>p.status==="sold").length,done:i.filter(p=>p.status==="done").length,cancelled:i.filter(p=>p.status==="cancelled"||p.status==="rejected").length,sub:{not_contacted:i.filter(p=>p.subStatus==="not_contacted").length,contacted:i.filter(p=>p.subStatus==="contacted").length,docs_received:i.filter(p=>p.subStatus==="docs_received").length,waiting_calc:i.filter(p=>p.subStatus==="waiting_calc").length,waiting_docs:i.filter(p=>p.subStatus==="waiting_docs").length,waiting_signature:i.filter(p=>p.subStatus==="waiting_signature").length,docs_not_received:i.filter(p=>p.subStatus==="docs_not_received").length,signed:i.filter(p=>p.subStatus==="signed").length,delivered:i.filter(p=>p.subStatus==="delivered").length,done:i.filter(p=>p.subStatus==="done").length,no_response:i.filter(p=>p.subStatus==="no_response").length,obligations:i.filter(p=>p.subStatus==="obligations").length,calc_rejected:i.filter(p=>p.subStatus==="calc_rejected").length,ineligible:i.filter(p=>p.subStatus==="ineligible").length,duplicate:i.filter(p=>p.subStatus==="duplicate").length}};Object.entries(r).forEach(([p,h])=>{const E=document.getElementById(`count-${p}`);E&&(E.innerText=h)}),Object.entries(r.sub).forEach(([p,h])=>{const E=document.getElementById(`count-sub-${p}`);E&&(E.innerText=h)});const d=document.getElementById("bookings-badge");d&&(d.innerText=r.new,d.classList.toggle("hidden",r.new===0));const s=($=window.state.user)==null?void 0:$.uid;if(((T=window.state.userProfile)==null?void 0:T.role)==="staff"&&s){const p=document.getElementById("staff-quick-stats");p&&p.classList.remove("hidden");const h=(window.state.bookings||[]).filter(R=>R.assignedTo===s),E=h.filter(R=>R.status==="new"||!R.status).length,f=h.length,S=h.filter(R=>R.status==="sold").length,M=f>0?Math.round(S/f*100):0,D=document.getElementById("staff-waiting-count"),_=document.getElementById("staff-total-assigned"),A=document.getElementById("staff-conversion-rate"),B=document.getElementById("availability-toggle");D&&(D.innerText=E),_&&(_.innerText=f),A&&(A.innerText=M+"%"),B&&(B.checked=window.state.userProfile.isAvailable!==!1)}const g=document.getElementById("total-inventory-value"),u=document.getElementById("overall-conversion-rate"),c=document.getElementById("active-bookings-count"),m=document.getElementById("conversion-bar");if(g){const p=(window.state.cars||[]).reduce((h,E)=>h+(parseFloat(E.price)||0),0);g.innerText=p.toLocaleString()+" ريال"}if(c&&(c.innerText=r.new+r.waiting+r.inquiry),u){const p=(window.state.bookings||[]).length,h=(window.state.bookings||[]).filter(f=>f.status==="sold"||f.status==="done").length,E=p>0?Math.round(h/p*100):0;u.innerText=E+"%",m&&(m.style.width=E+"%")}const I=document.getElementById("monthly-goal-percent"),v=document.getElementById("monthly-goal-fill");if(I&&v){const p=(window.state.bookings||[]).filter(f=>{if(f.status!=="sold"&&f.status!=="done")return!1;const S=new Date(f.createdAt||0),M=new Date;return S.getMonth()===M.getMonth()&&S.getFullYear()===M.getFullYear()}).length,E=Math.min(100,Math.round(p/50*100));I.innerText=E+"%",v.style.width=E+"%"}const w=document.getElementById("supervisor-recent-logs");if(w&&window.state.logs){const p=[...window.state.logs].sort((h,E)=>new Date(E.timestamp)-new Date(h.timestamp)).slice(0,10);w.innerHTML=p.map(h=>`
      <div class="log-entry-lite">
        <div class="le-icon"><i class="fas ${h.type==="auth"?"fa-key":h.type==="data"?"fa-database":"fa-info-circle"}"></i></div>
        <div class="le-body">
          <div class="le-top"><strong>${h.action}</strong> <span>${new Date(h.timestamp).toLocaleTimeString()}</span></div>
          <p>${h.details}</p>
          <small>بواسطة: ${h.user}</small>
        </div>
      </div>
    `).join("")}const y=document.getElementById("status-donut-chart");if(y){const p=r.sold+r.done,h=r.new+r.waiting+r.inquiry,E=r.cancelled,f=p+h+E||1,S=Math.round(p/f*100),M=Math.round(h/f*100);y.style.background=`conic-gradient(
      #00a884 0% ${S}%, 
      var(--p-gold) ${S}% ${S+M}%, 
      #e02424 ${S+M}% 100%
    )`,y.setAttribute("data-pct",`${S}% ناجح`)}const b=document.getElementById("supervisor-leaderboard");if(b&&window.state.users&&window.state.bookings){const p=new Date,h=window.state.bookings.filter(f=>{const S=new Date(f.createdAt||0);return S.getMonth()===p.getMonth()&&S.getFullYear()===p.getFullYear()}),E=window.state.users.filter(f=>f.role==="staff"||f.role==="supervisor").map(f=>{const S=h.filter(D=>D.assignedTo===f.id&&(D.status==="sold"||D.status==="done")).length,M=h.filter(D=>D.assignedTo===f.id).length;return{...f,soldCount:S,totalAssigned:M}}).sort((f,S)=>S.soldCount-f.soldCount).slice(0,5);b.innerHTML=E.map((f,S)=>`
      <div class="leader-item">
        <div class="leader-rank">${S+1}</div>
        <div class="leader-avatar"><img src="${f.image||"logo.jpg"}" onerror="this.src='logo.jpg'"></div>
        <div class="leader-info">
          <strong>${f.name||f.email}</strong>
          <span>${f.soldCount} مبيعات / ${f.totalAssigned} طلبات</span>
        </div>
        <div class="leader-score">${f.soldCount>0?Math.round(f.soldCount/(f.totalAssigned||1)*100):0}%</div>
      </div>
    `).join("")}window.state.currentPeriodReport?window.switchPeriodReport(window.state.currentPeriodReport):window.switchPeriodReport("day"),window.renderSupervisorStaffList()};window.switchPeriodReport=function(t,e){if(window.state.currentPeriodReport=t,e)document.querySelectorAll(".p-tab").forEach(m=>m.classList.remove("active")),e.classList.add("active");else{const m=document.querySelectorAll(".p-tab"),v={day:0,week:1,month:2,year:3}[t]||0;m[v]&&(m.forEach(w=>w.classList.remove("active")),m[v].classList.add("active"))}const o=new Date;let n=new Date;t==="day"?n.setHours(0,0,0,0):t==="week"?n.setDate(o.getDate()-7):t==="month"?n.setMonth(o.getMonth()-1):t==="year"&&n.setFullYear(o.getFullYear()-1);const i=(window.state.bookings||[]).filter(m=>new Date(m.createdAt||0)>=n),a=(window.state.cars||[]).filter(m=>new Date(m.createdAt||0)>=n).length,r=(window.state.plates||[]).filter(m=>new Date(m.createdAt||0)>=n).length,d=i.length,s=i.filter(m=>m.status==="sold"||m.status==="done").length,l=i.filter(m=>m.status==="new"||m.status==="waiting"||m.status==="inquiry").length,g=d>0?Math.round(s/d*100):0,u=i.filter(m=>m.status==="sold"||m.status==="done").reduce((m,I)=>{const v=(window.state.cars||[]).find(w=>w.id===I.carId);return m+parseFloat((v==null?void 0:v.price)||0)},0),c={"period-total-count":d,"period-sold-count":s,"period-active-count":l,"period-conv-rate":g+"%","period-sold-value":u.toLocaleString()+" ريال","period-inventory-added":a+r};Object.entries(c).forEach(([m,I])=>{const v=document.getElementById(m);v&&(v.innerText=I)})};window.deleteLuxuryItem=async function(t,e){var o;if(confirm("هل أنت متأكد من الحذف؟ لا يمكن التراجع عن هذه العملية."))try{if(t==="users"){const n=(window.state.users||[]).find(a=>a.id===e);if((n==null?void 0:n.email)==="zyrozyro98@gmail.com"){window.showLuxuryToast("لا يمكن حذف هذا المطور الأساسي للنظام","error");return}if(((o=window.state.userProfile)==null?void 0:o.role)==="supervisor"&&(n==null?void 0:n.role)==="admin"){window.showLuxuryToast("لا يملك المشرف صلاحية حذف المدير","error");return}}await O(L(C,`${t}/${e}`)),window.showLuxuryToast("تم الحذف بنجاح"),window.createLog("حذف",`حذف عنصر من ${t} (ID: ${e})`,"data")}catch{window.showLuxuryToast("فشل الحذف","error")}};window.editLuxuryItem=function(t,e){const o=(window.state[t]||[]).find(i=>i.id===e);if(!o)return;if(t==="users"&&o.email==="zyrozyro98@gmail.com"){window.showLuxuryToast("لا يمكن تعديل بيانات هذا المستخدم الأساسي","error");return}window.state.currentEdit={type:t,id:e},document.getElementById("item-form")&&(t==="cars"&&(window.state.carImages=[],o.image&&window.state.carImages.push({type:"url",value:o.image,isMain:!0}),o.images&&Array.isArray(o.images)&&o.images.forEach(i=>{i!==o.image&&window.state.carImages.push({type:"url",value:i,isMain:!1})})),ce(t,o),window.setModalTitle("item-modal",`تعديل: ${o.make||o.title||t}`),window.openModal("item-modal"))};window.insertQRVariable=function(t){const e=document.querySelector('#item-form textarea[name="content"]');if(e){const o=e.selectionStart,n=e.selectionEnd,i=e.value;e.value=i.substring(0,o)+t+i.substring(n),e.selectionStart=e.selectionEnd=o+t.length,e.focus()}};window.openCRUDModal=function(t,e=null){var i;if(window.state.currentEdit={type:t,id:e},!document.getElementById("item-form"))return;const n=e?((i=window.state[t])==null?void 0:i.find(a=>a.id===e))||{}:{};t==="cars"&&(window.state.carImages=[],n.image&&window.state.carImages.push({type:"url",value:n.image,isMain:!0}),n.images&&Array.isArray(n.images)&&n.images.forEach(a=>{a!==n.image&&window.state.carImages.push({type:"url",value:a,isMain:!1})})),ce(t,n),window.setModalTitle("item-modal",e?`تعديل: ${t}`:`إضافة: ${t}`),window.openModal("item-modal")};function ce(t,e={}){const o=document.getElementById("dynamic-form-fields");if(!o)return;let n=[];t==="cars"?(n=[{name:"make",label:"الماركة",type:"datalist",options:[...(window.state.brands||[]).map(a=>({v:a.name,t:a.name}))],required:!0},{name:"model",label:"الموديل",type:"text",required:!0},{name:"year",label:"السنة",type:"number"},{name:"price",label:"سعر الكاش",type:"number"},{name:"monthlyInstallment",label:"قسط شهري يبدأ بـ",type:"number"},{name:"mileage",label:"الممشى (كم)",type:"number"},{name:"engine",label:"المحرك",type:"datalist",placeholder:"مثال: 8 سليندر، 4.0L",options:[{v:"4 سليندر",t:"4 سليندر"},{v:"6 سليندر",t:"6 سليندر"},{v:"8 سليندر",t:"8 سليندر"},...(window.state.engines||[]).map(a=>({v:a.name,t:a.name}))].filter((a,r,d)=>a.v&&d.findIndex(s=>s.v===a.v)===r)},{name:"gearbox",label:"ناقل الحركة",type:"datalist",options:[{v:"عادي",t:"عادي"},{v:"أوتوماتيكي",t:"أوتوماتيكي"},{v:"CVT",t:"CVT"},...(window.state.gearboxes||[]).map(a=>({v:a.name,t:a.name}))].filter((a,r,d)=>a.v&&d.findIndex(s=>s.v===a.v)===r)},{name:"fuelType",label:"نوع الوقود",type:"select",options:[{v:"بنزين",t:"بنزين"},{v:"ديزل",t:"ديزل"},{v:"هايبرد",t:"هايبرد"},{v:"كهرباء",t:"كهرباء"}]},{name:"bodyType",label:"فئة السيارة",type:"datalist",options:[{v:"sedan",t:"سيدان"},{v:"suv",t:"SUV"},{v:"coupe",t:"كوبيه"},{v:"luxury",t:"فاخرة"},{v:"pickup",t:"بيك آب"},...(window.state.bodyTypes||[]).map(a=>({v:a.name,t:a.name}))].filter((a,r,d)=>a.v&&d.findIndex(s=>s.v===a.v)===r)},{name:"color",label:"اللون خارجي",type:"datalist",options:[{v:"أبيض",t:"أبيض"},{v:"أسود",t:"أسود"},{v:"فضي",t:"فضي"},{v:"رمادي",t:"رمادي"},...(window.state.exteriorColors||[]).map(a=>({v:a.name,t:a.name}))].filter((a,r,d)=>a.v&&d.findIndex(s=>s.v===a.v)===r)},{name:"interiorColor",label:"اللون داخلي",type:"datalist",options:[{v:"بيج",t:"بيج"},{v:"أسود",t:"أسود"},{v:"جملي",t:"جملي"},{v:"أحمر",t:"أحمر"},...(window.state.interiorColors||[]).map(a=>({v:a.name,t:a.name}))].filter((a,r,d)=>a.v&&d.findIndex(s=>s.v===a.v)===r)},{name:"status",label:"الحالة في المخزون",type:"datalist",options:[{v:"available",t:"متاح"},{v:"reserved",t:"محجوز"},{v:"sold",t:"مباع"},{v:"incoming",t:"قادم قريباً"},...(window.state.stockStatuses||[]).map(a=>({v:a.name,t:a.name}))].filter((a,r,d)=>a.v&&d.findIndex(s=>s.v===a.v)===r)},{name:"isFeatured",label:"عرض في قسم المميز؟",type:"select",options:[{v:!1,t:"لا"},{v:!0,t:"نعم"}]},{name:"desc",label:"وصف إضافي ومواصفات",type:"textarea"},{name:"_image_manager",label:"صور السيارة (المعرض)",type:"custom",html:`
        <div class="f-group full-width">
          <label>إدارة صور السيارة (المعرض والصورة الرئيسية)</label>
          <div class="img-manager-v2" id="car-image-manager">
            <!-- Rendered by window.renderCarImageManager -->
          </div>
          <input type="file" id="car-file-input" multiple accept="image/*" style="display:none;" onchange="window.handleCarFileSelect(this.files)">
        </div>
      `}],setTimeout(()=>window.renderCarImageManager(),100)):t==="ads"?n=[{name:"title",label:"العنوان",type:"text"},{name:"subtitle",label:"العنوان الفرعي",type:"text"},{name:"image",label:"صورة الإعلان (من الجهاز)",type:"file"},{name:"link",label:"الرابط (اختياري)",type:"text"}]:t==="sales"?n=[{name:"title",label:"العنوان",type:"text"},{name:"description",label:"وصف قصير",type:"textarea"},{name:"url",label:"رابط الفيديو (MP4 أو YouTube)",type:"text"},{name:"poster",label:"رابط صورة الغلاف",type:"text"}]:t==="reviews"?n=[{name:"name",label:"اسم العميل",type:"text",required:!0,placeholder:"مثال: عبدالله محمد"},{name:"car",label:"السيارة المشتراة (اختياري)",type:"text",placeholder:"مثال: تويوتا كامري 2024"},{name:"rating",label:"التقييم من 5 نجوم",type:"number",required:!0,placeholder:"5"},{name:"avatar",label:"رابط صورة العميل (اختياري)",type:"text",placeholder:"https://..."},{name:"text",label:"محتوى الرأي",type:"textarea",required:!0,placeholder:"لقد كانت تجربة رائعة مع هذا المعرض..."}]:t==="partners"?n=[{name:"name",label:"اسم الشريك",type:"text"},{name:"logo",label:"شعار الشريك (من الجهاز)",type:"file"},{name:"link",label:"رابط خارجي (اختياري)",type:"text"}]:t==="brands"?n=[{name:"name",label:"اسم العلامة التجارية",type:"text"},{name:"logo",label:"شعار البراند (من الجهاز)",type:"file"}]:t==="blogs"?n=[{name:"title",label:"عنوان المقال",type:"text"},{name:"image",label:"صورة المقال (من الجهاز)",type:"file"},{name:"content",label:"محتوى المقال",type:"textarea"}]:t==="locations"?n=[{name:"name",label:"اسم المدينة/الدولة",type:"text"},{name:"status",label:"الحالة",type:"select",options:[{v:"active",t:"نشط"},{v:"inactive",t:"غير نشط"}]}]:t==="plates"?n=[{name:"number",label:"رقم اللوحة",type:"text"},{name:"letters",label:"حروف اللوحة",type:"text"},{name:"price",label:"السعر",type:"number"},{name:"status",label:"الحالة",type:"select",options:[{v:"available",t:"متاح"},{v:"sold",t:"مباع"}]}]:t==="specs"?n=[{name:"name",label:"اسم المواصفة",type:"text"},{name:"icon",label:"أيقونة (FontAwesome)",type:"text"}]:t==="packages"?n=[{name:"name",label:"اسم الباقة",type:"text"},{name:"price",label:"السعر",type:"number"},{name:"features",label:"المميزات (فاصلة بين كل ميزة)",type:"textarea"}]:t==="bookings"?n=[{name:"name",label:"اسم العميل",type:"text"},{name:"phone",label:"الجوال",type:"text"},{name:"carRequested",label:"السيارة المطلوبة",type:"text"},{name:"status",label:"حالة الطلب",type:"select",options:[{v:"new",t:"جديد"},{v:"waiting",t:"بالانتظار"},{v:"inquiry",t:"استفسار"},{v:"sold",t:"مكتمل"},{v:"done",t:"تم"},{v:"cancelled",t:"مرفوض"}]},{name:"subStatus",label:"الحالة التفصيلية",type:"select",options:[{v:"not_contacted",t:"لم يتم التواصل"},{v:"contacted",t:"تم التواصل"},{v:"docs_received",t:"تم استلام الاوراق"},{v:"waiting_calc",t:"انتظار رد العميل"},{v:"waiting_docs",t:"إنتظار إكمال الاوراق"},{v:"waiting_signature",t:"إنتظار توقيع العميل"},{v:"docs_not_received",t:"لم يتم استلام الاوراق"},{v:"signed",t:"تم التوقيع"},{v:"delivered",t:"تم التسليم"},{v:"done",t:"تم"},{v:"no_response",t:"لم يتم رد العميل"},{v:"obligations",t:"التزامات"},{v:"calc_rejected",t:"رفض الحسبة"},{v:"ineligible",t:"غير مسموح له"},{v:"duplicate",t:"مكرر"}]},{name:"assignedTo",label:"الموظف المسؤول",type:"select",options:[{v:"",t:"غير محدد"},...window.state.users.filter(i=>i.email!=="zyrozyro98@gmail.com"&&(i.role==="staff"||i.role==="admin"||i.role==="supervisor")).map(i=>({v:i.id,t:i.name||(i.role==="admin"?"المدير: ":"المشرف: ")+(i.name||i.email)}))]},{name:"notes",label:"ملاحظات",type:"textarea"}]:t==="users"?n=[{name:"name",label:"الاسم الكامل",type:"text"},{name:"email",label:"البريد الإلكتروني",type:"text"},{name:"password",label:"كلمة المرور (عرض وتعديل)",type:"text"},{name:"role",label:"الصلاحية",type:"select",options:[{v:"staff",t:"موظف"},{v:"supervisor",t:"مشرف"},{v:"admin",t:"مدير"}]},{name:"isAvailable",label:"متاح لاستلام الطلبات؟",type:"select",options:[{v:!0,t:"نعم"},{v:!1,t:"لا"}]}]:t==="quickReplies"?n=[{name:"title",label:"عنوان الرد السريع",type:"text",required:!0,placeholder:"مثال: ترحيب بالعملاء الجدد"},{type:"custom",html:`
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
      `},{name:"content",label:"محتوى الرسالة الكامل",type:"textarea",required:!0,placeholder:"اكتب هنا نص الرسالة التي ستظهر للموظف لاستخدامها..."}]:t==="sales"?n=[{name:"title",label:"عنوان الفيديو",type:"text",required:!0,placeholder:"مثال: تسليم سيارة مرسيدس G-Class"},{name:"url",label:"رابط الفيديو (YouTube أو مباشر)",type:"text",required:!0,placeholder:"https://youtube.com/watch?v=..."},{name:"poster",label:"رابط صورة الغلاف (اختياري)",type:"text",placeholder:"https://..."},{name:"description",label:"وصف مبسط",type:"textarea",placeholder:"يسعدنا دائماً مشاركة لحظات نجاحنا..."}]:n=[{name:"name",label:"الاسم / العنوان",type:"text"},{name:"desc",label:"الوصف",type:"textarea"}],o.innerHTML=`
    <div class="form-grid-v3">
      ${n.map(i=>{if(i.type==="custom")return i.html;let a=e[i.name]!==void 0&&e[i.name]!==null?e[i.name]:"";i.name==="desc"&&!a&&(a=e.description||e.details||"");const r=i.required?"required":"",d=i.placeholder||i.label;let s="";return i.type==="select"?s=`
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
  `}window.handleCarFileSelect=function(t){if(t){for(let e=0;e<t.length;e++){const o=t[e];window.state.carImages.push({type:"file",value:o,preview:URL.createObjectURL(o),isMain:window.state.carImages.length===0})}window.renderCarImageManager()}};window.renderCarImageManager=function(){const t=document.getElementById("car-image-manager");if(!t)return;let o=`
    <div class="img-grid-v2">
      ${(window.state.carImages||[]).map((n,i)=>{const a=n.type==="url"?n.value:n.preview;return`
          <div class="img-item-v2 ${n.isMain?"is-main":""}" 
               draggable="true" 
               ondragstart="window.handleImageDragStart(event, ${i})"
               ondragover="window.handleImageDragOver(event)"
               ondragleave="window.handleImageDragLeave(event)"
               ondragend="window.handleImageDragEnd(event)"
               ondrop="window.handleImageDrop(event, ${i})">
            ${n.isMain?'<span class="main-badge">الرئيسية</span>':""}
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
  `;t.innerHTML=o};window.reorderCarImage=function(t,e){const o=window.state.carImages,n=t+e;if(n>=0&&n<o.length){const i=o[t];o[t]=o[n],o[n]=i,window.renderCarImageManager()}};window.removeCarImage=function(t){if(t<0||t>=window.state.carImages.length)return;const e=window.state.carImages[t].isMain;window.state.carImages.splice(t,1),e&&window.state.carImages.length>0&&(window.state.carImages[0].isMain=!0),window.renderCarImageManager()};window.handleImageDragStart=function(t,e){t.dataTransfer.setData("text/plain",e),t.currentTarget.classList.add("dragging")};window.handleImageDragOver=function(t){t.preventDefault(),t.currentTarget.classList.add("drag-over")};window.handleImageDragLeave=function(t){t.currentTarget.classList.remove("drag-over")};window.handleImageDragEnd=function(t){t.currentTarget.classList.remove("dragging")};window.handleImageDrop=function(t,e){t.preventDefault(),t.currentTarget.classList.remove("drag-over");const o=parseInt(t.dataTransfer.getData("text/plain"));if(o!==e){const n=window.state.carImages,i=n.splice(o,1)[0];n.splice(e,0,i),window.renderCarImageManager()}};window.setCarMainImage=function(t){window.state.carImages.forEach((e,o)=>e.isMain=o===t),window.renderCarImageManager()};window.saveLuxuryItem=async function(t){t&&t.preventDefault();const e=window.state.currentEdit;if(!e)return;const{type:o,id:n}=e,i=document.getElementById("item-form");if(!i)return;const a=i.querySelector('button[type="submit"]'),r=a.innerText;a&&(a.disabled=!0,a.innerText="جاري الحفظ والمعالجة...");const d=new FormData(i),s={};d.forEach((l,g)=>{if(g!=="main_img_file"&&g!=="gallery_files"){if(g==="password"&&!l)return;s[g]=l}});try{if(o==="cars"){const u=[];let c="";const m=window.state.carImages||[];for(let I=0;I<m.length;I++){const v=m[I];let w="";v.type==="url"?w=v.value:v.type==="file"&&(w=await window.compressImage(v.value,1e3,1e3,.6)),w&&(u.push(w),v.isMain&&(c=w))}!c&&u.length>0&&(c=u[0]),s.image=c,s.images=u}const l=["image","logo","avatar","poster"];for(const u of l)s[u]instanceof File&&s[u].size>0?s[u]=await window.compressImage(s[u],1e3,1e3,.7):s[u]instanceof File&&s[u].size===0&&delete s[u];if(["price","year","mileage","rating","installmentPeriod","monthlyInstallment"].forEach(u=>{s[u]!==void 0&&s[u]!==""&&s[u]!==null?s[u]=Number(s[u]):delete s[u]}),s.isFeatured!==void 0&&(s.isFeatured=s.isFeatured==="true"||s.isFeatured===!0),n||(s.createdAt=new Date().toISOString()),s.updatedAt=new Date().toISOString(),o==="users"&&!n){if(!s.password){window.showLuxuryToast("كلمة المرور مطلوبة للموظف الجديد","error"),a&&(a.disabled=!1,a.innerText=r);return}const u=se(le,"Secondary"),c=re(u);try{const I=(await ve(c,s.email,s.password)).user.uid,v=L(C,`users/${I}`);await j(v,s),await ne(u)}catch(m){throw await ne(u),m}}else{if(o==="users"){const c=window._waServerActiveUrl||U;try{await fetch(`${c}/api/admin/update-user`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({adminUid:window.state.user.uid,targetUid:n,data:{password:s.password,email:s.email,name:s.name}})})}catch(m){console.warn("Backend Auth Sync failed:",m)}}const u=n?L(C,`${o}/${n}`):P(L(C,o));await(n?q(u,s):j(u,s)),o==="cars"&&(s.gearbox&&!(window.state.gearboxes||[]).some(c=>c.name===s.gearbox)&&(["عادي","أوتوماتيكي","CVT"].includes(s.gearbox)||await P(L(C,"gearboxes"),{name:s.gearbox})),s.bodyType&&!(window.state.bodyTypes||[]).some(c=>c.name===s.bodyType)&&(["sedan","suv","coupe","luxury","pickup"].includes(s.bodyType)||["سيدان","SUV","كوبيه","فاخرة","بيك آب"].includes(s.bodyType)||await P(L(C,"bodyTypes"),{name:s.bodyType})),s.make&&!(window.state.brands||[]).some(c=>c.name===s.make)&&await P(L(C,"brands"),{name:s.make}),s.engine&&!(window.state.engines||[]).some(c=>c.name===s.engine)&&(["4 سليندر","6 سليندر","8 سليندر"].includes(s.engine)||await P(L(C,"engines"),{name:s.engine})),s.color&&!(window.state.exteriorColors||[]).some(c=>c.name===s.color)&&(["أبيض","أسود","فضي","رمادي"].includes(s.color)||await P(L(C,"exteriorColors"),{name:s.color})),s.interiorColor&&!(window.state.interiorColors||[]).some(c=>c.name===s.interiorColor)&&(["بيج","أسود","جملي","أحمر"].includes(s.interiorColor)||await P(L(C,"interiorColors"),{name:s.interiorColor})),s.status&&!(window.state.stockStatuses||[]).some(c=>c.name===s.status)&&(["available","reserved","sold","incoming"].includes(s.status)||await P(L(C,"stockStatuses"),{name:s.status})))}window.showLuxuryToast(n?"تم تحديث البيانات بنجاح":"تم إضافة العنصر بنجاح"),window.closeModal("item-modal"),window.createLog(n?"تعديل":"إضافة",`${n?"تعديل":"إضافة"} في ${o} - ${s.make||s.title||n}`,"data")}catch(l){console.error("Save Error:",l),window.showLuxuryToast("حدث خطأ أثناء الحفظ: "+(l.message||"خطأ غير معروف"),"error")}finally{a&&(a.disabled=!1,a.innerText=r)}};window.openQuickReplyModal=function(){window.openCRUDModal("quickReplies")};window.renderQuickRepliesAdmin=function(){var n;const t=document.getElementById("quick-replies-list");if(!t)return;const e=(((n=document.getElementById("qr-search"))==null?void 0:n.value)||"").toLowerCase().trim(),o=(window.state.quickReplies||[]).filter(i=>(i.title||"").toLowerCase().includes(e)||(i.content||"").toLowerCase().includes(e));if(o.length===0){t.innerHTML='<div class="no-results-v2" style="grid-column:1/-1;"><p>لا توجد نتائج مطابقة لبحثك</p></div>';return}t.innerHTML=o.map(i=>`
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
    `).join("")};window.renderAdsSlider=function(){const t=document.getElementById("slider-track"),e=document.getElementById("slider-dots");if(!t)return;const o=window.state.ads||[];if(o.length===0){t.innerHTML='<div class="no-ads"></div>',e&&(e.innerHTML="");return}t.innerHTML=o.map(n=>`
        <div class="ad-slide">
            <img src="${n.image||"logo.jpg"}" class="ad-bg-img" alt="${n.title||"عرض خاص"}">
            <div class="ad-content">
                <h2 class="luxury-font">${n.title||""}</h2>
                <p>${n.subtitle||""}</p>
                ${n.link?`<a href="${n.link}" class="btn-premium"><span>اكتشف المزيد</span> <i class="fas fa-arrow-left" style="margin-right: 10px;"></i></a>`:""}
            </div>
        </div>
    `).join(""),e&&(e.innerHTML=o.map((n,i)=>`<div class="dot ${i===0?"active":""}" onclick="window.goToLuxurySlide(${i})"></div>`).join("")),window.state.sliderIndex=0,window.moveLuxurySlider(0)};window.goToLuxurySlide=function(t){window.state.sliderIndex=t,window.moveLuxurySlider(0)};window.moveLuxurySlider=function(t){var r;const e=document.getElementById("slider-track");if(!e)return;const o=((r=window.state.ads)==null?void 0:r.length)||0;if(o<=1){e.style.transform="translateX(0)";return}window.state.sliderIndex=(window.state.sliderIndex+t+o)%o;const n=window.state.sliderIndex*100,i=document.body.dir==="rtl";e.style.transform=`translateX(${i?n:-n}%)`,document.querySelectorAll(".slider-dots .dot").forEach((d,s)=>{d.classList.toggle("active",s===window.state.sliderIndex)})};window.calculateLuxuryFinancing=function(){var s,l,g;const t=Number((s=document.getElementById("calc-car-price"))==null?void 0:s.value)||0,e=Number((l=document.getElementById("calc-down-pay"))==null?void 0:l.value)||0,o=Number((g=document.getElementById("calc-years"))==null?void 0:g.value)||5,n=document.getElementById("calc-result-val");if(!n)return;const i=t-e;if(i<=0){n.innerText="0 ريال";return}const r=i*(1+.045*o),d=Math.round(r/(o*12));n.innerText=d.toLocaleString()+" ريال"};window.renderSalesVideos=function(){const t=document.getElementById("sales-container");if(!t)return;const e=window.state.sales||[];if(e.length===0){t.innerHTML='<div class="no-results-v2"><p>لا توجد مقاطع فيديو متاحة حالياً</p></div>';return}t.innerHTML=e.map(o=>{const n=(o.url||"").trim();let i=n.includes("youtube.com")||n.includes("youtu.be")||n.includes("youtube-nocookie.com"),a=n.includes("tiktok.com"),r=n.includes("instagram.com"),d=n.includes("snapchat.com"),s=o.poster||o.image||null;if(i&&!s){let l="";try{n.includes("v=")?l=n.split("v=")[1].split("&")[0]:n.includes("youtu.be/")?l=n.split("youtu.be/")[1].split("?")[0]:n.includes("embed/")?l=n.split("embed/")[1].split("?")[0]:l=n.split("/").pop().split("?")[0]}catch{l=""}l&&(s=`https://img.youtube.com/vi/${l}/hqdefault.jpg`)}return s=s||"logo.jpg",`
            <div class="video-card-v2" data-aos="zoom-in" onclick="window.openVideoLightbox('${n}')">
                <div class="video-player-wrap">
                    <div class="video-inner">
                        <img src="${s}" alt="${o.title||"Success Moment"}" onerror="this.src='logo.jpg'" style="width:100%; height:100%; object-fit:cover;">
                        <div class="v-play-overlay">
                            <div class="v-play-btn"><i class="fas fa-play"></i></div>
                        </div>
                        ${i?'<div class="v-platform-icon"><i class="fab fa-youtube"></i></div>':a?'<div class="v-platform-icon"><i class="fab fa-tiktok"></i></div>':r?'<div class="v-platform-icon"><i class="fab fa-instagram"></i></div>':d?'<div class="v-platform-icon"><i class="fab fa-snapchat"></i></div>':""}
                    </div>
                </div>
                <div class="video-info-v2">
                    <span class="v-badge-gold"><i class="fas fa-award"></i> مبيعات ناجحة</span>
                    <h3>${o.title||o.name||"لحظة تسليم"}</h3>
                    <p>${o.description||"يسعدنا دائماً مشاركة لحظات نجاحنا مع عملائنا الكرام."}</p>
                </div>
            </div>`}).join("")};window.openVideoLightbox=function(t){let e="";if(t.includes("youtube.com")||t.includes("youtu.be")){let n="";try{t.includes("v=")?n=t.split("v=")[1].split("&")[0]:t.includes("youtu.be/")?n=t.split("youtu.be/")[1].split("?")[0]:t.includes("embed/")?n=t.split("embed/")[1].split("?")[0]:n=t.split("/").pop().split("?")[0]}catch{n=""}e=`<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${n}?autoplay=1&modestbranding=1&rel=0" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`}else e=`<video controls autoplay style="width:100%; height:100%; border-radius:15px; background:#000;">
                        <source src="${t}" type="video/mp4">
                        متصفحك لا يدعم تشغيل الفيديو.
                    </video>`;const o=document.createElement("div");o.className="luxury-lightbox",o.id="video-lightbox",o.innerHTML=`
        <button class="lb-close" onclick="this.parentElement.remove()">&times;</button>
        <div class="lb-content animate-fade-in" style="max-width:1000px; width:95%; aspect-ratio:16/9; margin-top:0;">
            ${e}
        </div>
    `,document.body.appendChild(o)};window.toggleWAWidget=function(){const t=document.getElementById("wa-widget");t&&t.classList.toggle("hidden")};window.sendWAWidgetMsg=function(){var n;const t=document.getElementById("wa-input"),e=(n=t==null?void 0:t.value)==null?void 0:n.trim();if(!e)return;const o=window.state.settings.contactSales||"0500000000";window.open(`https://wa.me/${window.normalizePhone(o)}?text=${encodeURIComponent(e)}`,"_blank"),t&&(t.value=""),window.toggleWAWidget()};window.createLog=async function(t,e,o="general"){var n,i;try{const a=P(L(C,"logs"));await j(a,{user:((n=window.state.user)==null?void 0:n.email)||"Visitor",userId:((i=window.state.user)==null?void 0:i.uid)||null,action:t,details:e,category:o,timestamp:new Date().toISOString()})}catch(a){console.error("Log Error:",a)}};window.submitBooking=async function(t){var d,s,l,g,u,c,m,I,v,w,y,b,x,k,$,T,p,h,E,f,S,M,D,_,A;t.preventDefault();const e=t.target,o=e.querySelector('button[type="submit"]');let n=(((d=document.getElementById("b-phone-code"))==null?void 0:d.value)==="other"?(s=document.getElementById("b-phone-code-other"))==null?void 0:s.value:(l=document.getElementById("b-phone-code"))==null?void 0:l.value)||"966",i=((g=document.getElementById("b-phone"))==null?void 0:g.value)||"";n=n.replace(/\D/g,""),i=i.replace(/\D/g,""),i.startsWith("05")||i.startsWith("5")&&i.length===9||i.startsWith("9665")?(n="966",i.startsWith("05")&&(i=i.substring(1)),i.startsWith("966")&&(i=i.substring(3))):i.startsWith("07")||i.startsWith("7")&&i.length===9||i.startsWith("9677")?(n="967",i.startsWith("07")&&(i=i.substring(1)),i.startsWith("967")&&(i=i.substring(3))):(n&&i.startsWith(n)&&(i=i.substring(n.length)),n&&i.startsWith("00"+n)&&(i=i.substring(n.length+2)));const a=window.normalizePhone(n+i),r={customerType:((u=e.querySelector('[name="customer-type"]:checked'))==null?void 0:u.value)||"individual",carRequested:((c=document.getElementById("b-car"))==null?void 0:c.value)||"",name:((m=document.getElementById("b-name"))==null?void 0:m.value)||"",phone:a,age:((I=document.getElementById("b-age"))==null?void 0:I.value)||"",email:((v=document.getElementById("b-email"))==null?void 0:v.value)||"",nationality:((w=document.getElementById("b-nationality"))==null?void 0:w.value)==="مقيم"?((y=document.getElementById("b-nationality-other"))==null?void 0:y.value)||"مقيم":((b=document.getElementById("b-nationality"))==null?void 0:b.value)||"سعودي",city:((x=document.getElementById("b-city"))==null?void 0:x.value)==="أخرى"?((k=document.getElementById("b-city-other"))==null?void 0:k.value)||"أخرى":(($=document.getElementById("b-city"))==null?void 0:$.value)||"",paymentMethod:((T=e.querySelector('[name="payment-method"]:checked'))==null?void 0:T.value)||"كاش",bankName:((p=document.getElementById("b-bank-name"))==null?void 0:p.value)||"",installmentPeriod:((h=document.getElementById("b-installment-period"))==null?void 0:h.value)||"",salary:((E=document.getElementById("b-salary"))==null?void 0:E.value)||"",commitments:((f=document.getElementById("b-commitments"))==null?void 0:f.value)||"",workEntity:((S=document.getElementById("b-work-entity"))==null?void 0:S.value)||"حكومي",workStatus:((M=document.getElementById("b-work-status"))==null?void 0:M.value)||"معتمد",contactMethod:((D=e.querySelector('[name="contact-method"]:checked'))==null?void 0:D.value)||"الجوال",preferredTime:((_=e.querySelector('[name="preferred-time"]:checked'))==null?void 0:_.value)||"10am - 1pm",notes:((A=document.getElementById("b-notes"))==null?void 0:A.value)||"",status:"new",subStatus:"not_contacted",createdAt:new Date().toISOString()};o.disabled=!0,o.innerText="جاري الإرسال...";try{const B=L(C,"config/lastAssignedStaffIndex_v2"),R=window.state.users.filter(H=>H.role==="staff"&&H.isAvailable!==!1);R.length>0&&await K(B,H=>{let W=H||0;W>=R.length&&(W=0);const G=R[W];return r.assignedTo=G.id,(W+1)%R.length});const N=P(L(C,"bookings"));await j(N,r),r.assignedTo&&await P(L(C,"notifications"),{userId:r.assignedTo,type:"new_booking",title:"طلب جديد مسند إليك",body:`لديك طلب جديد من ${r.name} للسيارة ${r.carRequested}`,bookingId:N.key,read:!1,createdAt:new Date().toISOString()}),window.showLuxuryToast("تم إرسال طلبك بنجاح، سنتواصل معك قريباً"),e.reset()}catch(B){console.error(B),window.showLuxuryToast("حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً","error")}finally{o.disabled=!1,o.innerText="تأكيد طلب حجز الخدمة"}};window.fillAIInput=function(t){const e=document.getElementById("ai-chat-input");e&&(e.value=t)};window.clearAIChat=function(){const t=document.getElementById("ai-messages-area");t&&(t.innerHTML="")};window.askLuxuryAI=function(){var n;const t=document.getElementById("ai-chat-input"),e=(n=t==null?void 0:t.value)==null?void 0:n.trim();if(!e)return;J("user",e),t.value="";const o="ai-typing-"+Date.now();J("bot","جاري التفكير...",o),setTimeout(()=>{const i=document.getElementById(o);i&&i.remove();const a=Ae(e);J("bot",a)},1e3)};function J(t,e,o=null){const n=document.getElementById("ai-messages-area");if(!n)return;const i=document.createElement("div");i.className=`ai-msg ${t}`,o&&(i.id=o),i.innerHTML=`
        <div class="msg-icon"><i class="fas ${t==="bot"?"fa-robot":"fa-user"}"></i></div>
        <div class="msg-content">
            <p>${e}</p>
        </div>
    `,n.appendChild(i),n.scrollTop=n.scrollHeight}function Ae(t){const e=t.toLowerCase(),o=window.state.cars||[],n=window.state.bookings||[];return e.includes("قيمة")||e.includes("مخزون")?`إجمالي قيمة المخزون الحالي هو ${o.reduce((a,r)=>a+(parseFloat(r.price)||0),0).toLocaleString()} ريال سعودي لعدد ${o.length} سيارة.`:e.includes("موظف")||e.includes("أفضل")?"بناءً على البيانات الحالية، يتميز فريق المبيعات بنشاط عالٍ، والمنافسة قوية بين الموظفين لهذا الشهر.":e.includes("ملخص")||e.includes("أداء")?`حالة اليوم: يوجد ${n.filter(a=>a.status==="new"||!a.status).length} طلبات جديدة لم يتم معالجتها بعد، وإجمالي الطلبات في النظام هو ${n.length}.`:"أنا هنا لمساعدتك في إدارة المعرض. يمكنك سؤالي عن المخزون، الطلبات، أو الإحصائيات العامة."}window.renderWhatsAppMonitor=function(){var n,i;const t=document.getElementById("admin-wa-monitor-table");if(!t)return;const e=(((n=document.getElementById("wa-monitor-search"))==null?void 0:n.value)||"").toLowerCase();(i=document.getElementById("wa-monitor-filter"))!=null&&i.value;let o=(window.state.logs||[]).filter(a=>a.category==="whatsapp"||a.details.includes("WhatsApp"));if(e&&(o=o.filter(a=>a.details.toLowerCase().includes(e)||a.user.toLowerCase().includes(e))),o.length===0){t.innerHTML='<div class="no-data-admin" style="padding:40px; text-align:center;">لا توجد سجلات مراقبة حالياً</div>';return}t.innerHTML=o.map(a=>`
        <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:12px; border:1px solid var(--glass-border); margin-bottom:10px;">
            <div style="display:flex; justify-content:space-between;">
                <strong>${a.user}</strong>
                <span style="opacity:0.5; font-size:11px;">${new Date(a.timestamp).toLocaleString()}</span>
            </div>
            <p style="font-size:13px; margin:10px 0;">${a.details}</p>
            ${a.proofUrl?`<a href="${a.proofUrl}" target="_blank" class="btn-premium btn-sm" style="display:inline-block;">عرض الإثبات</a>`:""}
        </div>
    `).join("")};let z=null;const U="https://whatsapp-server-tq4f.onrender.com";window.WA_SERVER_URL_OVERRIDE||localStorage.getItem("wa_server_url");window.saveWAServerURL=async function(){const t=document.getElementById("wa-server-url-config");if(!t)return;let e=t.value.trim().replace(/\/$/,"");if(!e)return window.showLuxuryToast("يرجى إدخال الرابط","error");try{await j(L(C,"settings/waServerUrl"),e),localStorage.setItem("wa_server_url",e),window.showLuxuryToast("تم حفظ الرابط وبثه للجميع، سيتم تحديث الصفحة","success"),setTimeout(()=>location.reload(),1500)}catch{window.showLuxuryToast("خطأ في الصلاحيات لرفع الرابط","error")}};window.startStaffWASession=function(){const t=document.getElementById("wa-staff-select");if(!t||!t.value)return window.showLuxuryToast("يرجى اختيار موظف للربط","error");z&&(document.getElementById("wa-server-status").innerText="يتم الآن توليد كود الاستجابة للموظف...",document.getElementById("wa-server-status").style.color="var(--text-dim)",document.getElementById("wa-qr-container").style.display="none",z.emit("start_session",{userId:t.value}))};window.logoutStaffWASession=function(){const t=document.getElementById("wa-staff-select");if(!t||!t.value)return window.showLuxuryToast("يرجى اختيار الموظف أولاً","error");confirm("هل أنت متأكد من فصل رقم الواتساب لهذا الموظف وسجل المحادثة الخاصة به من السيرفر؟")&&z&&z.emit("logout_session",{userId:t.value})};window.initWhatsAppServer=async function(){const t=document.getElementById("wa-server-url-config");let e=null;window.location.hostname.includes("app.github.dev")&&(e=`https://${window.location.hostname.replace("-5173","-3001")}`,console.log("تم اكتشاف GitHub Codespaces، استخدام الرابط التلقائي:",e));let o=null;try{const a=await he(L(C,"settings/waServerUrl"));a.exists()&&(o=a.val(),localStorage.setItem("wa_server_url",o))}catch(a){console.error("Firebase config error:",a)}const n=e||o||localStorage.getItem("wa_server_url")||U;window._waServerActiveUrl=n,t&&(t.value=n);const i=document.getElementById("wa-staff-select");if(i&&window.state&&window.state.users){const a=i.value;i.innerHTML='<option value="">-- اختر الموظف --</option>',window.state.users.filter(r=>r.role==="staff"||r.role==="admin"||r.role==="supervisor").forEach(r=>{const d=r.role==="admin"?"مدير":r.role==="supervisor"?"مشرف":"موظف";i.innerHTML+=`<option value="${r.id}" ${r.id===a?"selected":""}>${r.name||r.email||"موظف"} (${d})</option>`}),i.onchange=function(){this.value&&(z&&z.emit("join_room",this.value),window.startStaffWASession())},i.value&&(z&&z.emit("join_room",i.value),window.startStaffWASession())}typeof io<"u"&&!z&&(fetch(`${n}/ping`).catch(()=>{}),z=io(n,{reconnection:!0,reconnectionAttempts:10,reconnectionDelay:2e3,transports:["websocket","polling"],secure:!0}),z.on("connect_error",a=>{console.error("Connection Error:",a),a.message!=="websocket error"&&(window._waAlerted||(alert("عذراً، المتصفح لم يستطع الاتصال بخادم الواتساب. تأكد من أن الرابط يعمل في صفحة منفصلة. الخطأ: "+a.message),window._waAlerted=!0))}),z.on("connect",()=>{console.log("Connected to WhatsApp Server!");const a=document.getElementById("wa-connection-dot");a&&(a.style.background="#4de265",a.style.boxShadow="0 0 5px #4de265",a.title="متصل بالسيرفر"),window.state.user&&z.emit("join_room",window.state.user.uid),window.state.user&&window.startCurrentWASession&&setTimeout(()=>window.startCurrentWASession(),1500)}),z.on("qr",a=>{const r=document.getElementById("wa-staff-select"),d=document.getElementById("wa-server-status"),s=document.getElementById("wa-qr-container"),l=document.getElementById("wa-qr-canvas");if(r&&r.value===a.userId&&(d&&(d.innerText="في انتظار مسح كود الـ QR...",d.style.color="var(--text-color)"),s&&(s.style.display="block"),typeof QRCode<"u"&&l&&QRCode.toCanvas(l,a.qr,function(g){g&&console.error(g)})),window.state.user&&a.userId===window.state.user.uid){const g=document.getElementById("wa-my-status-title"),u=document.getElementById("wa-my-status-desc"),c=document.getElementById("wa-my-qr-container"),m=document.getElementById("wa-my-qr-canvas"),I=document.getElementById("btn-start-my-wa"),v=document.getElementById("btn-logout-my-wa");g&&(g.innerText="بانتظار مسح رمز QR..."),u&&(u.innerText="افتح واتساب على هاتفك وامسح الرمز الظاهر أدناه ليتم ربط حسابك."),c&&(c.style.display="block"),I&&(I.innerText="تحديث الرمز"),v&&(v.style.display="none"),typeof QRCode<"u"&&m&&QRCode.toCanvas(m,a.qr,{width:250,margin:2},function(w){w&&console.error(w)})}}),z.on("ready",a=>{const r=document.getElementById("wa-staff-select"),d=document.getElementById("wa-connection-dot");if(d&&(d.style.background="#4de265",d.style.boxShadow="0 0 8px #4de265",d.title="واتساب جاهز للعمل"),r&&r.value===a.userId){const s=document.getElementById("wa-server-status"),l=document.getElementById("wa-qr-container");s&&(s.innerText=a.msg,s.style.color="#00a884"),l&&(l.style.display="none")}if(window.state.user&&a.userId===window.state.user.uid){const s=document.getElementById("wa-my-status-title"),l=document.getElementById("wa-my-status-desc"),g=document.getElementById("wa-my-qr-container"),u=document.getElementById("btn-start-my-wa"),c=document.getElementById("btn-logout-my-wa");s&&(s.innerText="واتساب متصل بنجاح"),l&&(l.innerText="حسابك الآن مرتبط بالنظام، يمكنك البدء في استقبال وإرسال الرسائل للعملاء."),g&&(g.style.display="none"),u&&(u.style.display="none"),c&&(c.style.display="inline-block"),window.showLuxuryToast("تم ربط حساب واتساب الخاص بك بنجاح","success")}}),z.on("disconnected",a=>{console.log("Disconnected Event:",a);const r=document.getElementById("wa-connection-dot");r&&(r.style.background="#ff4b4b",r.style.boxShadow="0 0 5px #ff4b4b",r.title="تم قطع الاتصال بالسيرفر");const d=a.msg||"تم قطع الاتصال بالسيرفر. يرجى إعادة الربط لتفعيل خدمات الدردشة.",s=document.getElementById("wa-staff-select");if(s&&s.value===a.userId){const l=document.getElementById("wa-server-status");l&&(l.innerText=d,l.style.color="red")}if(window.state.user&&a.userId===window.state.user.uid){const l=document.getElementById("wa-my-status-title"),g=document.getElementById("wa-my-status-desc"),u=document.getElementById("btn-start-my-wa"),c=document.getElementById("btn-logout-my-wa"),m=document.getElementById("wa-my-qr-container");l&&(l.innerText="الواتساب غير متصل"),g&&(g.innerText=d),m&&(m.style.display="none"),u&&(u.style.display="inline-block",u.innerText="إعادة الربط الآن"),c&&(c.style.display="none")}}),z.on("jid_resolved",({oldJid:a,newJid:r})=>{console.log(`JID Resolution detected: ${a} -> ${r}`);const s=(window.state.bookings||[]).find(l=>l.waJid===a);s&&(console.log(`Updating booking ${s.id} JID due to resolution`),q(L(C,`bookings/${s.id}`),{waJid:r,phone:window.normalizePhone(r)}).catch(l=>{}),window._currentWaPhone===a&&(window._currentWaPhone=r,typeof window.openStaffChat=="function"&&window.openStaffChat(r)))}),z.on("message",async a=>{var I,v,w;console.log("Real-time WA message received:",a);const r=window.normalizePhone,d=r(a.from),s=r(window._currentWaPhone),l=document.getElementById("details-modal"),g=l&&!l.classList.contains("hidden"),u=document.getElementById("wa-connection-dot");u&&(u.style.transform="scale(1.2)",setTimeout(()=>u.style.transform="scale(1)",300));const c=window.state.bookings||[];let m=c.find(y=>y.waJid===a.from);if(m||(m=c.find(y=>{if(!y.phone)return!1;const b=window.normalizePhone(y.phone);return!d.includes("@")&&b===d}),m&&!m.waJid&&(console.log(`Smart Pinning JID ${a.from} to booking ${m.id}`),q(L(C,`bookings/${m.id}`),{waJid:a.from}).catch(y=>{}),m.waJid=a.from)),g&&s&&d===s)setTimeout(()=>{window.fetchServerWAChat(window._currentWaPhone,a.userId)},500);else{if(a.isMe)return;const y=a.userId===((I=window.state.userProfile)==null?void 0:I.id),b=((v=window.state.userProfile)==null?void 0:v.role)==="admin"||((w=window.state.userProfile)==null?void 0:w.role)==="supervisor";(y||b)&&m&&window.showWAPushNotification&&window.showWAPushNotification(d,a.body,a.userId)}}))};window.showWAPushNotification=async function(t,e,o){window.playNotificationSound&&window.playNotificationSound();let n=document.getElementById("wa-push-notifications-container");n||(n=document.createElement("div"),n.id="wa-push-notifications-container",n.style.cssText="position:fixed; bottom:30px; left:25px; z-index:999999; display:flex; flex-direction:column-reverse; gap:12px; width:340px; pointer-events:none;",document.body.appendChild(n));const a=(window.state.bookings||[]).find(m=>m.phone&&window.normalizePhone(m.phone)===window.normalizePhone(t)),r=a&&a.name?a.name:t;let d=e||"رسالة جديدة";d.length>70&&(d=d.substring(0,70)+"...");const s=document.createElement("div");s.style.cssText="background:rgba(255,255,255,0.98); border-right:4px solid #00a884; border-radius:12px; padding:12px 15px; box-shadow:0 6px 20px rgba(0,0,0,0.15); pointer-events:auto; cursor:pointer; transform:translateX(-120%); transition:transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s, margin 0.3s; opacity:0; overflow:hidden; position:relative; direction:rtl;",s.innerHTML=`
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
    `;const l=s.querySelector(".fa-times-btn");l.onmouseover=()=>l.style.color="#e02424",l.onmouseout=()=>l.style.color="#999";const g=async()=>{var m;try{await P(L(C,"notifications"),{userId:o||((m=window.state.userProfile)==null?void 0:m.id)||"admin",type:"wa_message",title:"رسالة واتساب من "+r,body:d,phone:t,read:!1,createdAt:new Date().toISOString()})}catch(I){console.warn("Could not save to notifications DB",I)}};let u=setTimeout(()=>{c(),g()},1e4);const c=()=>{s.style.transform="translateX(-120%)",s.style.opacity="0",s.style.marginTop=`-${s.offsetHeight}px`,setTimeout(()=>{s.parentNode&&s.parentNode.removeChild(s)},400)};l.onclick=m=>{m.stopPropagation(),clearTimeout(u),c()},s.onclick=()=>{clearTimeout(u),c(),a?(window.viewBookingDetails(a.id),setTimeout(()=>{const m=document.getElementById("details-modal").querySelector(".dash-tab.admin-only");m&&m.click()},100)):window.showLuxuryToast("الرسالة من رقم غير مسجل في أي طلب مفتوح","info")},n.insertBefore(s,n.firstChild),requestAnimationFrame(()=>{s.style.transform="translateX(0)",s.style.opacity="1"})};window.startCurrentWASession=function(){if(!window.state.user)return;const t=()=>{z.emit("start_session",{userId:window.state.user.uid});const e=document.getElementById("wa-my-status-title"),o=document.getElementById("wa-my-status-desc");e&&(e.innerText="جاري الاتصال..."),o&&(o.innerText="يتم الآن التواصل مع خادم الواتساب لتوليد رمز الاستجابة السريعة...")};z?z.connected?t():(z.once("connect",t),z.connect()):window.initWhatsAppServer()};window.logoutCurrentWASession=function(){window.state.user&&confirm("هل أنت متأكد من تسجيل الخروج من واتساب؟ لن تتمكن من المراسلة من هنا.")&&z&&z.emit("logout_session",{userId:window.state.user.uid})};window._waMediaCache=window._waMediaCache||{};window.fetchServerWAChat=async function(t,e){var i,a,r;if(!t)return;const o=document.getElementById("wa-server-chat-box");if(!o)return;let n=(i=window.state.userProfile)==null?void 0:i.id;if(((a=window.state.userProfile)==null?void 0:a.role)==="admin"||((r=window.state.userProfile)==null?void 0:r.role)==="supervisor")if(e)n=e;else{const s=(window.state.bookings||[]).find(l=>l.phone&&window.normalizePhone(l.phone)===window.normalizePhone(t));if(s&&s.assignedTo)n=s.assignedTo;else{o.innerHTML=`
                <div style="text-align:center; margin-top:auto; margin-bottom:auto;">
                    <div style="background:rgba(255,255,255,0.95); display:inline-block; padding:20px; border-radius:15px; font-size:13px; color:#555; box-shadow:0 10px 30px rgba(0,0,0,0.1); max-width:85%;">
                        <i class="fas fa-user-slash" style="color:#00a884; font-size:32px; margin-bottom:15px; display:block;"></i>
                        هذا الحجز غير مسند لموظف.<br>
                        سجل المحادثات متاح فقط للحجوزات المسندة.
                    </div>
                </div>`;return}}window._currentWaPhone=t,(!o.hasChildNodes()||o.innerHTML.includes("fa-circle-notch")||o.innerHTML.includes("fa-comment-dots"))&&(o.innerHTML='<div style="text-align:center; margin-top:auto; margin-bottom:auto;"><i class="fas fa-circle-notch fa-spin" style="font-size: 30px; color: #00a884; margin-bottom: 12px;"></i><br><div style="background: rgba(255,255,255,0.9); display: inline-block; padding: 8px 16px; border-radius: 12px; font-size: 12px; color: #555; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">جاري مزامنة الرسائل...</div></div>');try{const d=window._waServerActiveUrl||U,s=await fetch(`${d}/api/chat/${n}/${t}`);if(s.ok){const l=await s.json();if(l.messages&&l.messages.length>0){const g=o.scrollHeight-o.scrollTop-o.clientHeight<50;o.innerHTML="";const u=document.createElement("div");u.style.cssText="text-align:center; margin:10px 0 15px;",u.innerHTML='<span style="background:#fefed7; color:#54656f; font-size:11px; padding:6px 12px; border-radius:8px; box-shadow:0 1px 1px rgba(0,0,0,0.05); display:inline-block;"><i class="fas fa-lock" style="margin-left:4px; font-size:10px;"></i> الرسائل محمية ومسجلة عبر الخادم الداخلي</span>',o.appendChild(u),l.messages.forEach(c=>{const m=Number(c.timestamp),I=m?new Date(m>1e10?m:m*1e3).toLocaleTimeString("ar-SA",{hour:"numeric",minute:"2-digit",hour12:!0}):"";let v=(c.body||"").replace(/</g,"&lt;").replace(/>/g,"&gt;");v=v.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#027eb5; text-decoration:underline;">$1</a>');const w=document.createElement("div");w.style.padding="6px 8px 8px 10px",w.style.maxWidth="75%",w.style.fontSize="14.5px",w.style.marginBottom="4px",w.style.position="relative",w.style.boxShadow="0 1px 1.5px rgba(11,20,26,0.1)",w.style.whiteSpace="pre-wrap",w.style.lineHeight="1.4",w.style.wordBreak="break-word",w.style.overflowWrap="anywhere",c.isMe?(w.style.alignSelf="flex-end",w.style.background="#d9fdd3",w.style.color="#111b21",w.style.borderRadius="12px 0 12px 12px"):(w.style.alignSelf="flex-start",w.style.background="#ffffff",w.style.color="#111b21",w.style.borderRadius="0 12px 12px 12px");let y=`<div>${v}</div>`;if(c.media)if(window._waMediaCache[c.id]&&(c.media.data=window._waMediaCache[c.id]),c.media.data===null){const x=`btn-dl-${c.id}`,k=`cont-dl-${c.id}`;let $="مرفق";c.media.mimetype.startsWith("image/")?$="صورة":c.media.mimetype.startsWith("video/")?$="فيديو":(c.media.mimetype.startsWith("audio/")||c.type==="ptt")&&($="مقطع صوتي"),y=`<div id="${k}" style="margin-bottom:8px; display:flex; align-items:center; gap:10px; background:rgba(0,0,0,0.05); padding:10px; border-radius:8px;">
                                <i class="fas fa-file-download" style="font-size:24px; color:#54656f;"></i>
                                <div style="flex:1;">
                                    <strong style="display:block; font-size:13px;">${$} سابق</strong>
                                    <span style="font-size:11px; opacity:0.7;">${c.media.filename||"اضغط للتحميل من السيرفر"}</span>
                                </div>
                                <button id="${x}" class="btn-premium btn-sm" onclick="window.downloadWAMedia('${n}', '${t}', '${c.id}', '${k}', '${c.media.mimetype}', '${c.type}')" style="padding:4px 10px; min-width:40px;"><i class="fas fa-download"></i></button>
                            </div>`+(v?`<div>${v}</div>`:"")}else c.media.mimetype.startsWith("image/")?y=`<div style="margin:-4px -6px 4px -8px; background:rgba(0,0,0,0.02); border-radius:10px 10px 0 0; overflow:hidden; text-align:center;"><img src="data:${c.media.mimetype};base64,${c.media.data}" style="max-width:100%; max-height:220px; border-radius:8px; display:inline-block; cursor:pointer; object-fit:cover;" onclick="window.viewFullImage(this.src)"></div>`+(v?`<div>${v}</div>`:""):c.media.mimetype.startsWith("audio/")||c.type==="ptt"?y=`<div style="display:flex; align-items:center; gap:10px;"><div style="background:#00a884; width:40px; height:40px; border-radius:50%; display:flex; justify-content:center; align-items:center; flex-shrink:0;"><i class="fas fa-play" style="color:white; margin-right:-2px; font-size:14px;"></i></div> <audio controls style="max-width:200px; height:35px;"><source src="data:${c.media.mimetype};base64,${c.media.data}" type="${c.media.mimetype}"></audio></div>`+(v?`<div style="margin-top:5px;">${v}</div>`:""):c.media.mimetype.startsWith("video/")?y=`<video controls style="max-width:100%; border-radius:8px; margin-bottom:5px;"><source src="data:${c.media.mimetype};base64,${c.media.data}" type="${c.media.mimetype}"></video>`+(v?`<div>${v}</div>`:""):y=`<div style="background:rgba(0,0,0,0.05); padding:10px; border-radius:8px; display:flex; align-items:center; gap:10px; margin-bottom:5px;"><i class="fas fa-file-alt" style="font-size:24px; color:#54656f;"></i> <div><strong style="display:block; font-size:13px;">ملف ${c.media.filename||"مرفق"}</strong><span style="font-size:11px; opacity:0.7;">تنزيل للعرض</span></div></div>`+(v?`<div>${v}</div>`:"");let b="";if(c.isMe){let x=c.ack!==void 0?c.ack:c.status==="read"?3:c.status==="delivered"?2:c.status==="sent"?1:void 0;x===1||x===0?b='<i class="fas fa-check" style="font-size:12px; margin-right:4px; color:#c7c7c7;"></i>':x===2?b='<i class="fas fa-check-double" style="font-size:12px; margin-right:4px; color:#c7c7c7;"></i>':x>=3?b='<i class="fas fa-check-double" style="font-size:12px; margin-right:4px; color:#53bdeb;"></i>':b='<i class="fas fa-check" style="font-size:12px; margin-right:4px; color:#c7c7c7;"></i>'}w.innerHTML=`${y} <div style="display:flex; justify-content:flex-end; align-items:center; margin-top:2px; float:left; margin-left:-5px; padding-left:10px; padding-top:2px;">
                      <span style="font-size:11px; color:#667781;">${I}</span>
                      ${b}
                    </div><div style="clear:both;"></div>`,o.appendChild(w)}),(g||o.innerHTML.includes("fa-lock"))&&setTimeout(()=>{o.scrollTo({top:o.scrollHeight,behavior:"smooth"})},100)}else o.innerHTML='<div style="text-align:center; margin-top:auto; margin-bottom:auto;"><div style="background:rgba(255,255,255,0.95); display:inline-block; padding:15px 30px; border-radius:15px; font-size:13px; color:#555; box-shadow:0 3px 10px rgba(0,0,0,0.08);"><i class="fas fa-comment-dots" style="color:#00a884; font-size:24px; margin-bottom:10px; display:block;"></i>لا توجد رسائل سابقة مع هذا الرقم.<br>يمكنك بدء دردشة جديدة الآن.</div></div>'}else o.innerHTML=`
                <div style="text-align:center; margin-top:auto; margin-bottom:auto;">
                    <div style="background:rgba(255,255,255,0.95); display:inline-block; padding:25px; border-radius:15px; font-size:14px; color:#555; box-shadow:0 3px 10px rgba(0,0,0,0.08);">
                        <i class="fab fa-whatsapp" style="font-size:50px; margin-bottom:15px; color:#8696a0;"></i>
                        <p style="margin-bottom:15px;">خادم واتساب غير متصل لهذا الموظف</p>
                        <button class="btn-premium btn-sm" onclick="window.closeModal('details-modal'); window.switchLuxuryTab('whatsapp-mgmt')">اذهب لإعدادات الواتساب</button>
                    </div>
                </div>
            `}catch{o.innerHTML='<div style="text-align:center; margin-top:auto; margin-bottom:auto;"><div style="background:rgba(255,255,255,0.95); display:inline-block; padding:15px 25px; border-radius:15px; font-size:13px; color:#e02424; box-shadow:0 3px 10px rgba(0,0,0,0.08);"><i class="fas fa-exclamation-triangle" style="font-size:24px; margin-bottom:10px; display:block;"></i>فشل الاتصال بالخادم. يرجى التأكد من تشغيل السيرفر.</div></div>'}};let F,X=[];window.startWARecording=async function(){window._waRecordingIntent=!0;try{const t=await navigator.mediaDevices.getUserMedia({audio:!0});if(!window._waRecordingIntent){t.getTracks().forEach(o=>o.stop());return}F=new MediaRecorder(t),X=[],window._waRecordingStartTime=Date.now(),F.ondataavailable=o=>{o.data.size>0&&X.push(o.data)},F.start();const e=document.getElementById("wa-mic-btn");e&&(e.style.color="red")}catch{window.showLuxuryToast("لم يتم السماح باستخدام الميكروفون","error"),window._waRecordingIntent=!1}};window.stopWARecording=function(t,e){window._waRecordingIntent&&(window._waRecordingIntent=!1,!(!F||F.state==="inactive")&&(F.onstop=async()=>{if(Date.now()-(window._waRecordingStartTime||Date.now())<500||X.length===0){F.stream.getTracks().forEach(d=>d.stop());const r=document.getElementById("wa-mic-btn");r&&(r.style.color="#54656f");return}const n=new Blob(X,{type:"audio/webm"}),i=new FileReader;i.readAsDataURL(n),i.onloadend=()=>{const r=i.result.split(",")[1];window.sendServerWAMessage(t,e,{data:r,mimetype:"audio/webm",filename:"voice_note.webm",ptt:!0},"")};const a=document.getElementById("wa-mic-btn");a&&(a.style.color="#54656f"),F.stream.getTracks().forEach(r=>r.stop())},F.stop()))};window.handleWAMediaSelect=function(t,e){const o=document.getElementById("wa-media-upload"),n=o.files&&o.files[0];if(!n)return;if(n.size>16*1024*1024){window.showLuxuryToast("حجم الملف كبير جداً، أقصى حد يسمح به الواتساب هو 16 ميجابايت","error");return}const i=new FileReader;i.onload=function(a){const r=a.target.result.split(",")[1],d=n.type||"application/octet-stream",s=n.name;let l=prompt("هل تريد إرفاق رسالة نصية مع هذا الملف؟ (اختياري)","");if(l===null){o.value="";return}window.sendServerWAMessage(t,e,{data:r,mimetype:d,filename:s},l)},i.readAsDataURL(n)};window.sendServerWAMessage=async function(t,e,o=null,n=null){const i=document.getElementById("wa-server-input");if(i&&i.disabled)return;const a=n!==null?n:i?i.value.trim():"";if(!o&&!a)return;let r=window.state.userProfile.id;window.state.userProfile.role==="admin"&&e&&(r=e),i&&n===null&&(i.value="",i.style.height="42px",i.focus());const d=document.getElementById("wa-server-chat-box");if(d){(d.innerHTML.includes("fa-comment-dots")||d.innerHTML.includes("fa-circle-notch")||!d.hasChildNodes())&&(d.innerHTML='<div style="text-align:center; margin:10px 0 15px;"><span style="background:#fefed7; color:#54656f; font-size:11px; padding:6px 12px; border-radius:8px; box-shadow:0 1px 1px rgba(0,0,0,0.05); display:inline-block;"><i class="fas fa-lock" style="margin-left:4px; font-size:10px;"></i> الرسائل محمية ومسجلة عبر الخادم الداخلي</span></div>');const s=new Date().toLocaleTimeString("ar-SA",{hour:"numeric",minute:"2-digit",hour12:!0});let l=(a||"").replace(/</g,"&lt;").replace(/>/g,"&gt;");l=l.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#027eb5; text-decoration:underline;">$1</a>');const g=document.createElement("div");g.style.padding="6px 8px 8px 10px",g.style.maxWidth="75%",g.style.fontSize="14.5px",g.style.marginBottom="4px",g.style.position="relative",g.style.boxShadow="0 1px 1.5px rgba(11,20,26,0.1)",g.style.whiteSpace="pre-wrap",g.style.lineHeight="1.4",g.style.wordBreak="break-word",g.style.overflowWrap="anywhere",g.style.alignSelf="flex-end",g.style.background="#d9fdd3",g.style.color="#111b21",g.style.borderRadius="12px 0 12px 12px";let u=`<div>${l}</div>`;o&&(u='<div style="margin-bottom:5px; font-size:12px; color:#555;"><i class="fas fa-paperclip"></i> تم إرسال مرفق</div>'+u);let c='<i class="fas fa-clock" style="font-size:12px; margin-right:4px; color:#c7c7c7;"></i>';g.innerHTML=`${u} <div style="display:flex; justify-content:flex-end; align-items:center; margin-top:2px; float:left; margin-left:-5px; padding-left:10px; padding-top:2px;"><span style="font-size:11px; color:#667781;">${s}</span>${c}</div><div style="clear:both;"></div>`,d.appendChild(g),setTimeout(()=>{d.scrollTo({top:d.scrollHeight,behavior:"smooth"})},50)}try{const s=window._waServerActiveUrl||U,l={userId:r,phone:t,message:a};o&&(l.media=o),(await fetch(`${s}/api/send`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)})).ok?setTimeout(()=>window.fetchServerWAChat(t,r),1500):(window.showLuxuryToast("الواتساب غير متصل في الإدارة، المرجو فحص الاتصال","error"),i&&n===null&&!o&&(i.value=a))}catch{window.showLuxuryToast("الخادم البرمجي مغلق أو متوقف","error"),i&&n===null&&!o&&(i.value=a)}finally{const s=document.getElementById("wa-media-upload");s&&(s.value="")}};window.openQuickReplyModal=function(){window.openCRUDModal("quickReplies")};window.editQuickReply=function(t){window.openCRUDModal("quickReplies",t)};window.addQuickReply=async function(t){window.openQuickReplyModal()};window.deleteQuickReply=async function(t,e){if(confirm("هل أنت متأكد من الحذف؟")){let o="";e&&(o=e.innerHTML,e.disabled=!0,e.innerHTML='<i class="fas fa-spinner fa-spin"></i>');try{await O(L(C,`quickReplies/${t}`)),window.showLuxuryToast("تم الحذف بنجاح")}catch(n){console.error("Error deleting quick reply:",n),window.showLuxuryToast("فُقدت الصلاحية أو حدث خطأ أثناء الحذف","error"),e&&(e.disabled=!1,e.innerHTML=o)}}};window.renderQuickRepliesAdmin=function(){var n;const t=document.getElementById("quick-replies-list");if(!t)return;const e=(((n=document.getElementById("qr-search"))==null?void 0:n.value)||"").toLowerCase();let o=window.state.quickReplies||[];if(e&&(o=o.filter(i=>(i.title||"").toLowerCase().includes(e)||(i.content||"").toLowerCase().includes(e))),o.length===0){t.innerHTML=`
            <div class="no-results-v2 full-width">
                <i class="fas fa-search"></i>
                <p>${e?"لا توجد نتائج تطابق بحثك":"لا توجد نماذج ردود سريعة حالياً"}</p>
            </div>`;return}t.innerHTML=o.map(i=>`
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
    `).join("")};window._qrExpanded=!1;window.renderQuickRepliesBar=function(){const t=document.getElementById("wa-quick-replies-bar");if(!t)return;const e=window.state.quickReplies||[];if(e.length===0){t.style.display="none";return}t.style.display="flex";const o=window._qrExpanded;let n=e,i=!1;!o&&e.length>4&&(n=e.slice(0,4),i=!0);let a=n.map(r=>`
        <button onclick="window.applyQuickReplyById('${r.id}')" style="background:white; border:1px solid var(--glass-border); padding:6px 12px; border-radius:16px; font-size:12px; color:#54656f; cursor:pointer; flex-shrink:0; white-space:nowrap; transition:all 0.2s; box-shadow:0 1px 2px rgba(0,0,0,0.05);" onmouseover="this.style.background='#f0f2f5'" onmouseout="this.style.background='white'">
            ${r.title}
        </button>
    `).join("");i?a+='<button onclick="window._qrExpanded=true; window.renderQuickRepliesBar();" style="background:#00a884; color:white; border:none; padding:6px 12px; border-radius:16px; font-size:12px; cursor:pointer; flex-shrink:0;">عرض الكل <i class="fas fa-chevron-left" style="margin-right:4px;"></i></button>':o&&e.length>4&&(a+='<button onclick="window._qrExpanded=false; window.renderQuickRepliesBar();" style="background:#e02424; color:white; border:none; padding:6px 12px; border-radius:16px; font-size:12px; cursor:pointer; flex-shrink:0;">إخفاء <i class="fas fa-chevron-right" style="margin-right:4px;"></i></button>'),t.innerHTML=a};window.applyQuickReplyById=function(t){const e=(window.state.quickReplies||[]).find(o=>o.id===t);e&&e.content&&window.applyQuickReply(e.content)};window.applyQuickReply=function(t){var o;const e=document.getElementById("wa-server-input");if(e){let n=t;const i=((o=window.state.userProfile)==null?void 0:o.name)||"الموظف";n=n.replace(/\(اسم الموظف\)/g,i);let a="العميل",r="السيارة",d="غير محدد",s="غير محدد",l="غير محدد",g="غير محدد",u="غير محدد",c="غير محدد",m="غير محدد",I="غير محدد",v="غير محدد",w="غير محدد",y="",b="غير محدد",x="غير محدد",k="غير محدد",$="غير محدد",T="غير محدد",p="غير محدد";if(window._currentWaPhone){const h=window._currentWaPhone.toString(),E=(window.state.bookings||[]).filter(f=>f.phone&&f.phone.toString()===h||f.waJid&&f.waJid.toString()===h||f.phone&&h.includes(f.phone.toString()));if(E&&E.length>0){E.sort((M,D)=>(D.createdAt||0)-(M.createdAt||0));const f=E[0];f.name&&(a=f.name);let S=null;f.carId?S=(window.state.cars||[]).find(M=>M.id===f.carId):f.carRequested&&(S=(window.state.cars||[]).find(M=>{const D=`${M.make} ${M.model} ${M.year}`.toLowerCase();return D.includes(f.carRequested.toLowerCase())||f.carRequested.toLowerCase().includes(D)})),S?(d=S.make||d,s=S.model||s,l=S.year||l,g=S.price?Number(S.price).toLocaleString("ar-SA"):g,u=S.engine||u,c=S.mileage||c,m=S.fuelType||m,v=S.color||v,w=S.interiorColor||w,I={sedan:"سيدان",suv:"SUV",coupe:"كوبيه",luxury:"فاخرة",pickup:"بيك آب"}[S.bodyType]||S.bodyType||I,r=`${d} ${s} ${l}`.trim()):f.brand||f.model?(r=`${f.brand||""} ${f.model||""} ${f.year||""}`.trim(),d=f.brand||d,s=f.model||s,l=f.year||l):(f.carName||f.carRequested)&&(r=f.carName||f.carRequested),f.paymentMethod&&(y=f.paymentMethod==="cash"?"كاش":"تمويل"),f.bankName&&(b=f.bankName),f.installmentPeriod&&(x=f.installmentPeriod),f.salary&&(k=f.salary),f.commitments&&($=f.commitments),f.workEntity&&(T=f.workEntity),f.workStatus&&(p=f.workStatus)}}n=n.replace(/\(اسم العميل\)/g,a),n=n.replace(/\(اسم السيارة\)/g,r),n=n.replace(/\(الماركة\)/g,d),n=n.replace(/\(الموديل\)/g,s),n=n.replace(/\(سنة الصنع\)/g,l),n=n.replace(/\(السعر\)/g,g),n=n.replace(/\(المحرك\)/g,u),n=n.replace(/\(الممشى\)/g,c),n=n.replace(/\(نوع الوقود\)/g,m),n=n.replace(/\(فئة السيارة\)/g,I),n=n.replace(/\(اللون الخارجي\)/g,v),n=n.replace(/\(اللون الداخلي\)/g,w),n=n.replace(/\(طريقة الشراء\)/g,y),n=n.replace(/\(اسم السيارة وتفاصيلها وطريقة الشراء وتفاصيله كاملة\)/g,`${r} - الدفع: ${y}`),n=n.replace(/\(اسم البنك الراتب عليه أو المفضل\)/g,b),n=n.replace(/\(اسم البنك\)/g,b),n=n.replace(/\(مدة الأقساط المفضل\)/g,x),n=n.replace(/\(مدة الأقساط\)/g,x),n=n.replace(/\(الراتب الشهري \(صافي\)\)/g,k),n=n.replace(/\(الراتب الشهري\)/g,k),n=n.replace(/\(الراتب\)/g,k),n=n.replace(/\(الإلتزامات الشهرية\)/g,$),n=n.replace(/\(الإلتزامات\)/g,$),n=n.replace(/\(جهة العمل\)/g,T),n=n.replace(/\(حالة الجهة\)/g,p),e.value=n,e.style.height="42px",e.style.height=Math.min(e.scrollHeight,150)+"px",e.focus()}};window.downloadWAMedia=async function(t,e,o,n,i,a){const r=document.getElementById(n.replace("cont-dl-","btn-dl-"));r&&(r.disabled=!0,r.innerHTML='<i class="fas fa-spinner fa-spin"></i>');try{const d=window._waServerActiveUrl||U,s=await fetch(`${d}/api/media/${t}/${e}/${o}`);if(!s.ok)throw new Error("Failed");const l=await s.json();if(!l.data)throw new Error("No data");window._waMediaCache[o]=l.data;const g=document.getElementById(n);if(!g)return;let u="";i.startsWith("image/")?u=`<div style="margin:-4px -6px 4px -8px; background:rgba(0,0,0,0.02); border-radius:10px 10px 0 0; overflow:hidden; text-align:center;"><img src="data:${i};base64,${l.data}" style="max-width:100%; max-height:220px; border-radius:8px; display:inline-block; cursor:pointer; object-fit:cover;" onclick="window.viewFullImage(this.src)"></div>`:i.startsWith("audio/")||a==="ptt"?u=`<div style="display:flex; align-items:center; gap:10px;"><div style="background:#00a884; width:40px; height:40px; border-radius:50%; display:flex; justify-content:center; align-items:center; flex-shrink:0;"><i class="fas fa-play" style="color:white; margin-right:-2px; font-size:14px;"></i></div> <audio controls style="max-width:200px; height:35px;"><source src="data:${i};base64,${l.data}" type="${i}"></audio></div>`:i.startsWith("video/")?u=`<video controls style="max-width:100%; border-radius:8px; margin-bottom:5px;"><source src="data:${i};base64,${l.data}" type="${i}"></video>`:u='<div style="background:rgba(0,0,0,0.05); padding:10px; border-radius:8px; display:flex; align-items:center; gap:10px; margin-bottom:5px;"><i class="fas fa-check-circle" style="font-size:24px; color:#00a884;"></i> <div><strong style="display:block; font-size:13px;">تم التحميل بنجاح</strong></div></div>',g.outerHTML=u}catch{r&&(r.disabled=!1,r.innerHTML='<i class="fas fa-redo"></i>'),window.showLuxuryToast("فشل تحميل الوسائط","error")}};document.addEventListener("DOMContentLoaded",()=>{document.addEventListener("click",t=>{const e=t.target.closest(".dash-tab");e&&e.dataset.tab&&window.switchLuxuryTab(e.dataset.tab)}),setTimeout(()=>{window.initWhatsAppServer()},3e3)});window.viewFullImage=function(t){let e=document.getElementById("wa-full-image-overlay");if(!e){e=document.createElement("div"),e.id="wa-full-image-overlay",e.style.cssText="position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.9); z-index:999999; display:flex; justify-content:center; align-items:center; opacity:0; transition:opacity 0.25s ease-in-out; backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px);";const n=document.createElement("div");n.innerHTML='<i class="fas fa-times"></i>',n.style.cssText="position:absolute; top:25px; right:30px; font-size:24px; color:white; cursor:pointer; padding:10px; z-index:1000000; background:rgba(255,255,255,0.1); border-radius:50%; width:45px; height:45px; display:flex; justify-content:center; align-items:center; border: 1px solid rgba(255,255,255,0.2); transition: background 0.2s;",n.onmouseover=()=>n.style.background="rgba(255,255,255,0.2)",n.onmouseout=()=>n.style.background="rgba(255,255,255,0.1)";const i=document.createElement("img");i.id="wa-full-image-element",i.style.cssText="max-width:90%; max-height:90%; border-radius:12px; box-shadow:0 15px 40px rgba(0,0,0,0.5); object-fit:contain; transform:scale(0.85); transition:transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);",e.appendChild(n),e.appendChild(i),document.body.appendChild(e);const a=()=>{e.style.opacity="0",i.style.transform="scale(0.85)",setTimeout(()=>{e.style.display="none"},250)};n.onclick=a,e.onclick=r=>{r.target===e&&a()}}const o=document.getElementById("wa-full-image-element");o.src=t,e.style.display="flex",e.offsetWidth,e.style.opacity="1",o.style.transform="scale(1)"};setTimeout(()=>{const t=document.getElementById("luxury-splash");t&&!t.classList.contains("hidden")&&(console.warn("Safety timeout: removing loader"),t.style.opacity="0",setTimeout(()=>{t.classList.add("hidden");try{t.remove()}catch{}},800),window.state&&(window.state.firstLoadDone=!0))},7e3);const ae=window.updateAppUI;window.updateAppUI=function(){var o,n;ae&&ae();const t=document.getElementById("user-display-name"),e=((o=window.state.userProfile)==null?void 0:o.role)==="admin";t&&!((n=window.state.userProfile)!=null&&n.name)&&(t.innerText=e?"مسؤول النظام":"موظف مبيعات")};console.log("--- WhatsApp Server Debug ---");console.log("Configured URL:",window._waServerActiveUrl);console.log("-----------------------------");window.promoteToAdmin=async function(t){if(confirm("تأكيد ترقية الموظف لصلاحية مسؤول؟"))try{await admin.database().ref("users/"+t).update({role:"admin"}),window.showLuxuryToast("تم ترقية الموظف بنجاح"),window.syncAdminTables("users")}catch{window.showLuxuryToast("خطأ بالصلاحيات","error")}};window.FirebaseSDK={ref:L,db:C,push:P,set:j,update:q,remove:O,auth:Q};window.markNotificationRead=async function(t){try{await q(L(C,"notifications/"+t),{read:!0}),window.showLuxuryToast("تم تحديد الإشعار كمقروء"),window.syncAdminTables("notifications")}catch(e){console.error(e)}};window.markAllNotificationsRead=async function(){const t=(window.state.notifications||[]).filter(e=>!e.read);if(t.length!==0)try{const e={};t.forEach(o=>{e["notifications/"+o.id+"/read"]=!0}),await q(L(C),e),window.showLuxuryToast("تم تحديد كافة الإشعارات كمقروءة"),window.syncAdminTables("notifications")}catch(e){console.error(e)}};window.clearAllNotifications=async function(){if(confirm("هل أنت متأكد من مسح كافة الإشعارات؟"))try{await O(L(C,"notifications")),window.showLuxuryToast("تم مسح كافة الإشعارات"),window.syncAdminTables("notifications")}catch(t){console.error(t)}};window.handleNotificationClick=function(t,e){if(window.markNotificationRead(t),e)if(e.startsWith("#")){const o=e.substring(1).split("/");o[0]==="booking"&&o[1]&&window.viewBookingDetails(o[1])}else window.open(e,"_blank")};window.formatDateRelative=function(t){if(!t)return"-";const e=new Date(t),n=Math.floor((new Date-e)/1e3);return n<60?"الآن":n<3600?"منذ "+Math.floor(n/60)+" دقيقة":n<86400?"منذ "+Math.floor(n/3600)+" ساعة":e.toLocaleDateString("ar-SA")};window.playNotificationSound=function(){if(!(window.state&&window.state.soundEnabled===!1))try{const t=new Audio("https://assets.mixkit.co/active_storage/sfx/2861/2861-preview.mp3");t.volume=.5,t.play().catch(e=>console.warn("Audio play failed:",e))}catch(t){console.warn("Audio error:",t)}};
