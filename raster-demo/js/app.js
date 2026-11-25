/* RASTER — application shell: router, sidebar index, topbar, theme.
   Hash-routed SPA, zero dependencies. */
"use strict";
let THEME = "light";
function toggleTheme(){
  THEME = THEME === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", THEME);
  toast(THEME === "dark" ? "Dark theme — the same poster on black paper." : "Light theme — back to white stock.");
}
const NAV = [
  ["Dashboards",[["01","Overview","#/overview"],["02","Sales","#/sales"],["03","Operations","#/operations"],["04","Analytics","#/analytics"],["05","Revenue","#/revenue"]]],
  ["Commerce",[["06","Customers","#/customers"],["07","Products","#/products"],["08","Orders","#/orders"],["09","Invoices","#/invoices"]]],
  ["Work",[["10","Calendar","#/calendar"],["11","Tasks","#/tasks"],["12","Messages","#/messages","2"],["13","Notifications","#/notifications","7"],["16","Files","#/files"],["17","Tickets","#/tickets","5"]]],
  ["Logistics",[["18","Warehouses","#/warehouses"],["19","Suppliers","#/suppliers"]]],
  ["System",[["14","Team","#/team"],["15","Roles & Permissions","#/roles"],["21","Activity Log","#/activity"],["22","Reports Builder","#/reports"],["23","Search Results","#/search"],["20","Help Center","#/help"]]],
  ["Shopfront",[["24","Pricing","#/pricing"],["25","Checkout","#/checkout"]]],
  ["Galleries",[["28","Charts Gallery","#/charts"],["29","Tables Gallery","#/tables"],["30","Forms Gallery","#/forms"],["31","Style Guide","#/styleguide"],["32","Empty States","#/empty"]]],
  ["Pages",[["37","Onboarding","#/onboarding"],["27","User Profile","#/profile"],["26","Settings","#/settings/profile"],["33","Login","#/login"],["34","Register","#/register"],["35","404 Poster","#/404"],["36","500 Poster","#/500"],["38","Maintenance","#/maintenance"]]]
];
const ROUTES = {
  "": "overview", "overview":"overview", "sales":"sales", "operations":"operations",
  "analytics":"analytics", "revenue":"revenue", "customers":"customers", "products":"products",
  "orders":"orders", "invoices":"invoices", "calendar":"calendar", "tasks":"tasks",
  "messages":"messages", "notifications":"notifications", "team":"team", "roles":"roles",
  "files":"files", "tickets":"tickets", "help":"help", "activity":"activity",
  "reports":"reports", "search":"search", "pricing":"pricing", "checkout":"checkout",
  "warehouses":"warehouses", "suppliers":"suppliers", "onboarding":"onboarding",
  "profile":"profile", "charts":"charts", "tables":"tablesGallery", "forms":"formsGallery",
  "styleguide":"styleguide", "empty":"empty", "login":"login", "register":"register",
  "forgot":"forgot", "two-factor":"twofa", "404":"e404", "500":"e500", "maintenance":"maintenance",
  "settings/profile":"settingsProfile", "settings/organization":"settingsOrg",
  "settings/billing":"settingsBilling", "settings/api":"settingsApi", "settings/integrations":"settingsIntegrations"
};
const BARE = ["login","register","forgot","twofa","e404","e500","maintenance"];
const DETAIL = { "customers":"customerDetail", "products":"productDetail", "orders":"orderDetail", "invoices":"invoiceDetail" };

function renderSidebar(active){
  document.getElementById("sidebar").innerHTML = `
    <div class="masthead"><div class="wordmark">Raster<span class="sq">.</span></div>
      <div class="tag micro">Swiss Editorial Admin<br>& Analytics — V. 1.0</div></div>
    ${NAV.map(([g,items])=>`<nav class="nav-group"><div class="micro"><span class="marker" style="width:6px;height:6px"></span>${g}</div>
      ${items.map(([no,label,href,count])=>`<a class="nav-item ${href==="#/"+active||("#/"+active).startsWith(href+"/")?"active":""}" href="${href}"><span class="no">${no}</span>${label}${count?`<span class="count">${count}</span>`:""}</a>`).join("")}
    </nav>`).join("")}
    <div class="side-foot">
      <div class="row">${avatar(DATA.user.name)}<div style="min-width:0"><strong style="display:block">${DATA.user.name}</strong><span class="caption">${DATA.user.role}</span></div></div>
      <button class="btn btn-outline btn-sm btn-block mt-4" onclick="toggleTheme()">Toggle theme</button>
    </div>`;
}
function renderTopbar(){
  document.getElementById("topbar").innerHTML = `
    <div class="tb-cell"><button class="tb-icon" id="nav-toggle" aria-label="Menu" onclick="document.body.classList.toggle('nav-open')">≡</button>
      <span class="micro-lg">Atelier Nord AG</span><span class="caption tb-hide">— Zürich</span></div>
    <div class="tb-cell tb-grow"><form class="tb-search" onsubmit="event.preventDefault();location.hash='#/search'">
      <span style="font-weight:900">⌕</span><input placeholder="Search orders, customers, SKUs — try «red»" aria-label="Search"></form>
      <span class="kbd tb-hide">⌘K</span></div>
    <div class="tb-cell"><button class="tb-btn" onclick="toggleTheme()">${THEME==="light"?"Dark":"Light"}</button>
      <button class="tb-icon" onclick="location.hash='#/notifications'" aria-label="Notifications">§<span class="dot"></span></button>
      <button class="tb-icon" onclick="location.hash='#/profile'" aria-label="Profile">LV</button></div>`;
  document.getElementById("colophon").innerHTML = `
    <div class="row-between" style="flex-wrap:wrap;gap:12px">
      <span class="caption">Raster 1.0.0 — Swiss Editorial Admin & Analytics Template · Pure HTML/CSS/JS · Zero dependencies</span>
      <span class="caption">Set in Libre Franklin · 48 screens · <a href="#/styleguide"><strong>Style Guide</strong></a></span>
    </div>`;
}
function skeleton(){
  return `<div class="page-head"><div class="skel skel-line" style="width:180px"></div><div class="skel" style="height:44px;width:min(480px,80%)"></div></div>
  <div class="grid"><div class="span-3"><div class="skel skel-block"></div></div><div class="span-3"><div class="skel skel-block"></div></div><div class="span-3"><div class="skel skel-block"></div></div><div class="span-3"><div class="skel skel-block"></div></div></div>
  <div class="skel mt-8" style="height:260px"></div>`;
}
let renderTimer = null;
function route(){
  const raw = location.hash.replace(/^#\/?/, "");
  const [head, param] = raw.split("/");
  let key, fn, arg;
  if(param !== undefined && DETAIL[head]){ key = head+"/"+param; fn = SCREENS[DETAIL[head]]; arg = decodeURIComponent(param); }
  else { key = raw; const name = ROUTES[raw]; fn = name ? SCREENS[name] : null; }
  const bare = fn && BARE.includes(Object.keys(SCREENS).find(k=>SCREENS[k]===fn));
  document.body.classList.toggle("bare", !!bare);
  document.body.classList.remove("nav-open");
  renderSidebar(raw);
  renderTopbar();
  const app = document.getElementById("app");
  clearTimeout(renderTimer);
  if(!fn){ app.innerHTML = SCREENS.e404(); window.scrollTo(0,0); return; }
  app.innerHTML = bare ? "" : skeleton();
  renderTimer = setTimeout(()=>{ app.innerHTML = fn(arg); window.scrollTo(0,0); app.focus({preventScroll:true}); }, bare ? 0 : 200);
}
window.addEventListener("hashchange", route);
document.addEventListener("keydown", e=>{ if((e.metaKey||e.ctrlKey) && e.key.toLowerCase()==="k"){ e.preventDefault(); location.hash="#/search"; }});
route();
