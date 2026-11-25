/* RASTER — screens C: help, activity, reports, search, pricing, checkout,
   settings, auth, onboarding, profile, galleries, style guide, system pages */
"use strict";
SCREENS.help = () => `
  ${pageHead("20 — Help","Help Center","Guides written like the product is built: numbered, ruled, and to the point.", "")}
  <form class="row mb-6" onsubmit="event.preventDefault();location.hash='#/search'">
    <input class="f-input" placeholder="Search the guides — try «VAT»" style="flex:1"><button class="btn">Search</button></form>
  <div class="grid">
    ${[["01","Getting started","Set up your organisation, invite the team and import your first price list.","6 guides"],["02","Orders & invoices","VAT rates, reminders, refunds and the 14-day terms engine.","9 guides"],["03","Stock & warehouses","Reorder lines, stock counts and multi-location transfers.","5 guides"],["04","Reports & API","Build a report, schedule it, or pull the same numbers over the API.","7 guides"]].map(g=>`
    <div class="span-6"><div class="stat"><div class="micro red">Section ${g[0]}</div><div class="num-lg" style="font-size:24px">${g[1]}</div><p class="muted mt-2">${g[2]}</p><div class="mt-3 row-between"><span class="caption">${g[3]}</span><a href="#/search"><strong>Open →</strong></a></div></div></div>`).join("")}
  </div>
  <div class="mt-8">${secHead("33","Common questions")}
    <div class="accordion">${[["Why does my invoice show two VAT rates?","Most lines carry the Swiss standard rate of 8.1%; a small set of printed goods carries the reduced rate. The rate is set per product and can be overridden per invoice line."],["How do reorder lines work?","Each product has a reorder line. Crossing it flags the product on the Operations dashboard and adds it to the reorder list with its supplier lead time."],["Can I run two warehouses?","Yes — Raster tracks stock per location and counts utilisation per site. Transfers between sites are logged in the activity feed."]].map(q=>`<div class="acc-item"><button class="acc-head" onclick="this.parentNode.classList.toggle('open')">${q[0]}<span>＋</span></button><div class="acc-body">${q[1]}</div></div>`).join("")}</div>
  </div>`;

SCREENS.activity = () => `
  ${pageHead("21 — System","Activity Log","Every change in the workspace, in order. Nothing is deleted from this log.", `<button class="btn btn-outline" onclick="toast('Log exported (demo).')">Export</button>`)}
  <div style="max-width:820px"><div class="timeline">
    ${DATA.activity.concat(DATA.activity.map(a=>({...a,when:"23 Nov · "+a.when.replace(/^.*?·/,"").trim()}))).map(a=>`<div class="tl-item ${a.hot?"hot":""}"><strong>${a.who}</strong> <span class="muted">${a.what}</span><div class="caption">${a.when}</div></div>`).join("")}
  </div></div>`;

SCREENS.reports = () => `
  ${pageHead("22 — Reports","Reports Builder","Pick fields on the left, read the table in the middle, schedule it on the right. The preview below is live from the orders table.", `<button class="btn" onclick="toast('Report saved (demo).')">Save Report</button>`)}
  <div class="rb-grid">
    <div class="rb-fields plate">
      <div class="micro mb-4">Fields — Orders</div>
      ${["Order number","Customer","Date","Channel","Status","Line items","Subtotal","VAT","Total"].map((f,i)=>`<label class="check"><input type="checkbox" ${i<7?"checked":""} onchange="toast('Preview updates in the full product (demo).')"><span class="box"></span>${f}</label>`).join("")}
      <hr class="rule mt-4 mb-4"><div class="micro mb-4">Group by</div>
      <select class="f-select"><option>Month</option><option>Channel</option><option>Customer</option></select>
    </div>
    <div>
      ${secHead("34","Preview — orders by status")}
      ${table([{t:"Status",v:"s"},{t:"Orders",v:"n",r:1},{t:"Value",v:r=>CHF(r.v),r:1}], ["Paid","Processing","Shipped","Refunded","Cancelled"].map(s=>{ const os=DATA.orders.filter(o=>o.status===s); return {s, n:os.length, v:sum(os,o=>o.total)}; }), {foot:`<td>Total</td><td class="r">${DATA.orders.length}</td><td class="r">${CHF(KPI.ordersTotal)}</td>`})}
      <p class="caption mt-3">Preview is computed live from the same dataset as the Orders screen — change a status there and this table follows.</p>
    </div>
    <div class="plate">
      <div class="micro mb-4">Schedule</div>
      ${sw2("Email the report", true)}${sw2("Attach as PDF", true)}${sw2("Attach as CSV", false)}
      <div class="f-group mt-4"><label class="f-label">Frequency</label><select class="f-select"><option>Weekly — Monday 07:00</option><option>Monthly — 1st, 07:00</option></select></div>
      <div class="f-group"><label class="f-label">Recipients</label><input class="f-input" value="lena.vogt@ateliernord.ch"></div>
      <button class="btn btn-block" onclick="toast('Schedule saved (demo).')">Save schedule</button>
    </div>
  </div>`;
function sw2(label, on){ return `<label class="switch" style="display:flex;padding:7px 0;border-bottom:1px dotted var(--line-soft)"><input type="checkbox" ${on?"checked":""}><span class="track"></span>${label}</label>`; }

SCREENS.search = () => {
  const res = [
    ["Product","Letterpress Ink — Red 306","INK-2213 · 48 units · "+CHF(52),"#/products/4"],
    ["Order","Order #1042 — Helvetia Print SA","24 Nov 2026 · "+CHF(DATA.orders[0].total)+" · Paid","#/orders/1042"],
    ["Customer","Helvetia Print SA","Geneva · Wholesale · "+CHF(598300)+" lifetime","#/customers/8"],
    ["Invoice","Invoice 2026-0863 — overdue","Kantoor & Co BV · 6 days overdue","#/invoices"],
    ["Guide","VAT rates on invoices","Help Center · Orders & invoices","#/help"],
    ["Product","Grid Pad A4 — 5mm Raster","PAP-1220 · "+NUM(2210)+" units · "+CHF(12.50),"#/products/10"]
  ];
  return `
  ${pageHead("23 — Search","Search Results","6 results across products, orders, customers, invoices and guides.", "")}
  <form class="row mb-6" onsubmit="event.preventDefault();toast('Search is a demo with fixed results.')"><input class="f-input" value="red" style="flex:1"><button class="btn">Search</button></form>
  ${tabs(["All results","Products","Orders","Customers","Guides"],"All results")}
  <div class="mt-4">${res.map(r=>`<div class="result"><div class="micro red">${r[0]}</div><a href="${r[3]}"><strong style="font-size:16px">${r[1]}</strong></a><div class="caption">${r[2]}</div></div>`).join("")}</div>`;
};

SCREENS.pricing = () => `
  ${pageHead("24 — Plans","Pricing","Three plans, set like a timetable. Prices in CHF, per month, billed yearly.", "")}
  <div class="price-cols">
    ${[["Raster Start","29","For one shop, one warehouse.",["1 warehouse","500 products","3 team seats","Orders & invoices","Email support"],false],
       ["Raster Business","79","For distributors with several sites.",["4 warehouses","Unlimited products","10 team seats","Reports builder & API","Priority support"],true],
       ["Raster Atelier","149","For groups and multi-company setups.",["Unlimited warehouses","Multi-company","Unlimited seats","Audit log & SSO","Named account manager"],false]].map(p=>`
    <div class="price-col ${p[4]?"hot":""}">
      ${p[4]?'<div class="micro red mb-4">■ Current plan — Atelier Nord AG</div>':`<div class="micro mb-4">Plan</div>`}
      <div class="h3">${p[0]}</div><div class="amt mt-3">${p[1]}<span style="font-size:18px;font-weight:700"> CHF</span></div>
      <p class="muted mt-2">${p[2]}</p><hr class="rule mt-5 mb-4">
      ${p[3].map(f=>`<div class="feat"><span class="marker"></span>${f}</div>`).join("")}
      <button class="btn ${p[4]?"":"btn-outline"} btn-block mt-6" onclick="location.hash='#/checkout'">${p[4]?"Current plan":"Choose "+p[0].split(" ")[1]}</button>
    </div>`).join("")}
  </div>
  <p class="caption mt-6">All plans include the full component library, both themes and every future 1.x update. Cancel any time; data exports stay available for 12 months.</p>`;

SCREENS.checkout = () => `
  ${pageHead("25 — Checkout","Checkout","Raster Business, billed yearly. This is a template demo — no payment is taken.", "")}
  <div class="grid">
    <div class="span-7">
      ${secHead("35","Payment")}
      <div class="f-row"><div class="f-group"><label class="f-label">Card number</label><input class="f-input" value="4242 4242 4242 4242"></div><div class="f-group"><label class="f-label">Name on card</label><input class="f-input" value="Lena Vogt"></div></div>
      <div class="f-row"><div class="f-group"><label class="f-label">Expiry</label><input class="f-input" value="08 / 28"></div><div class="f-group"><label class="f-label">CVC</label><input class="f-input" value="314"></div></div>
      <div class="f-group"><label class="f-label">Billing country</label><select class="f-select"><option>Switzerland</option><option>Germany</option><option>France</option></select></div>
      <label class="check"><input type="checkbox" checked><span class="box"></span>Email the invoice to accounting</label>
    </div>
    <div class="span-5">
      ${secHead("36","Summary")}
      <div class="plate-2">
        ${[["Raster Business — yearly","CHF 948.00"],["VAT 8.1%","CHF 76.79"],["Credit — November remainder","− CHF 41.20"]].map(r=>`<div class="index-row" style="padding:7px 0"><span>${r[0]}</span><span class="leader"></span><strong>${r[1]}</strong></div>`).join("")}
        <hr class="rule-thick mt-4 mb-4">
        <div class="row-between"><span class="h3">Total today</span><span class="num-lg">CHF 983.59</span></div>
        <button class="btn btn-red btn-block mt-6" onclick="confirmModal('Confirm subscription','Raster Business renews on 1 December at CHF 948.00 per year.')">Pay CHF 983.59</button>
        <p class="caption mt-3">Secured checkout. Cancel any time from Settings → Billing.</p>
      </div>
    </div>
  </div>`;

const settingsNav = (active) => `<div class="tabs mb-6">${["Profile|#/settings/profile","Organization|#/settings/organization","Billing|#/settings/billing","API Keys|#/settings/api","Integrations|#/settings/integrations"].map(s=>{const [t,r]=s.split("|"); return `<button class="tab ${t===active?"active":""}" onclick="location.hash='${r}'">${t}</button>`;}).join("")}</div>`;
SCREENS.settingsProfile = () => `
  ${pageHead("26 — Settings","Profile","Your personal account inside Atelier Nord AG.", "")}
  ${settingsNav("Profile")}
  <div class="grid"><div class="span-7">
    <div class="row mb-6">${avatar("Lena Vogt","xl")}<div><div class="h3">Lena Vogt</div><div class="caption">Operations Lead · member since 2021</div><button class="btn btn-outline btn-sm mt-2" onclick="toast('Avatar upload is a demo.')">Change initials plate</button></div></div>
    <div class="f-row"><div class="f-group"><label class="f-label">First name</label><input class="f-input" value="Lena"></div><div class="f-group"><label class="f-label">Last name</label><input class="f-input" value="Vogt"></div></div>
    <div class="f-group"><label class="f-label">Email</label><input class="f-input" value="lena.vogt@ateliernord.ch"></div>
    <div class="f-group"><label class="f-label">Language</label><select class="f-select"><option>Deutsch</option><option>English</option><option>Français</option></select></div>
    ${sw2("Weekly digest email", true)}${sw2("Mention notifications", true)}${sw2("Low-stock alerts", false)}
    <button class="btn mt-6" onclick="toast('Profile saved (demo).')">Save profile</button>
  </div>
  <div class="span-5">${secHead("37","Sessions")}${[["This browser — Zürich","Active now"],["iPhone — Raster app","2 h ago"],["iPad — Warehouse ZH-01","Yesterday"]].map(s=>`<div class="index-row" style="padding:8px 0"><span>${s[0]}</span><span class="leader"></span><strong>${s[1]}</strong></div>`).join("")}<button class="btn btn-outline btn-sm mt-4" onclick="confirmModal('Sign out everywhere?','All other sessions will be closed.')">Sign out other sessions</button></div></div>`;

SCREENS.settingsOrg = () => `
  ${pageHead("26 — Settings","Organization","The legal entity behind this workspace.", "")}
  ${settingsNav("Organization")}
  <div style="max-width:720px">
    <div class="f-group"><label class="f-label">Company name</label><input class="f-input" value="Atelier Nord AG"></div>
    <div class="f-row"><div class="f-group"><label class="f-label">VAT number</label><input class="f-input" value="CHE-204.881.517"></div><div class="f-group"><label class="f-label">Founded</label><input class="f-input" value="1962"></div></div>
    <div class="f-group"><label class="f-label">Address</label><textarea class="f-area" rows="2">Geroldstrasse 5&#10;8005 Zürich, Switzerland</textarea></div>
    <div class="f-row"><div class="f-group"><label class="f-label">Default currency</label><select class="f-select"><option>CHF — Swiss franc</option><option>EUR — Euro</option></select></div><div class="f-group"><label class="f-label">Invoice terms</label><select class="f-select"><option>14 days net</option><option>30 days net</option></select></div></div>
    <button class="btn" onclick="toast('Organisation saved (demo).')">Save organisation</button>
    <hr class="rule-thick mt-8 mb-4"><div class="h3 red">Danger zone</div>
    <p class="muted mt-2">Archiving the workspace makes every screen read-only. Exporting is free and unlimited.</p>
    <button class="btn btn-outline mt-4" onclick="confirmModal('Archive workspace?','Atelier Nord AG becomes read-only. This can be undone by an admin within 30 days.')">Archive workspace</button>
  </div>`;

SCREENS.settingsBilling = () => `
  ${pageHead("26 — Settings","Billing","Raster Business — renews 1 December. Card on file ends in 4242.", "")}
  ${settingsNav("Billing")}
  <div class="grid">
    <div class="span-4">${stat("Current plan","Business")}<div class="mt-3"><button class="btn btn-outline btn-sm" onclick="location.hash='#/pricing'">Compare plans</button></div></div>
    <div class="span-4">${stat("Yearly price", CHF(948))}</div>
    <div class="span-4">${stat("Next renewal","1 Dec 2026")}</div>
  </div>
  <div class="mt-8">${secHead("38","Billing history")}
  ${table([{t:"Invoice",v:r=>`<strong>${r.id}</strong>`},{t:"Date",v:"d"},{t:"Description",v:"desc"},{t:"Amount",v:r=>CHF(r.a),r:1},{t:"Status",v:r=>badge(r.s)}],
    [{id:"RB-2025-114",d:"1 Dec 2025",desc:"Raster Business — yearly",a:948,s:"Paid"},{id:"RB-2024-098",d:"1 Dec 2024",desc:"Raster Business — yearly",a:948,s:"Paid"},{id:"RB-2024-031",d:"14 Mar 2024",desc:"Extra seats ×2",a:158,s:"Paid"},{id:"RB-2023-087",d:"1 Dec 2023",desc:"Raster Start — yearly",a:348,s:"Paid"}])}
  </div>`;

SCREENS.settingsApi = () => `
  ${pageHead("26 — Settings","API Keys","Keys are shown once. Treat them like the key to the warehouse.", `<button class="btn" onclick="toast('New key generated (demo).')">Generate Key</button>`)}
  ${settingsNav("API Keys")}
  ${table([{t:"Name",v:r=>`<strong>${r.n}</strong>`},{t:"Key",v:r=>`<code>${r.k}</code>`},{t:"Created",v:"c"},{t:"Last used",v:"u"},{t:"Status",v:r=>badge(r.s)},{t:"",v:()=>`<button class="btn btn-sm btn-outline" onclick="confirmModal('Revoke key?','Applications using this key will stop working immediately.')">Revoke</button>`}],
    [{n:"Production — web shop",k:"rk_live_••••••••••••4f2a",c:"3 Jan 2026",u:"4 min ago",s:"Active"},{n:"Warehouse tablet",k:"rk_live_••••••••••••91cd",c:"22 Aug 2026",u:"1 h ago",s:"Active"},{n:"Legacy import script",k:"rk_live_••••••••••••07b3",c:"9 May 2025",u:"Never",s:"Suspended"}])}
  <div class="mt-8">${secHead("39","Usage — last 30 days")}${svgBars([120,180,150,210,190,240,220,260],{h:140})}<p class="caption">API calls per day, thousands. Rate limit: 600 requests per minute per key.</p></div>`;

SCREENS.settingsIntegrations = () => `
  ${pageHead("26 — Settings","Integrations","Connected services. Each row is a ruled entry, not a rounded card.", "")}
  ${settingsNav("Integrations")}
  ${[["Shopfront","Your public web shop — orders flow into Raster in real time.","Connected"],["Payments — TWINT & cards","Card and TWINT payments settle against invoices automatically.","Connected"],["Accounting — SwissLedger","Invoices and VAT post to SwissLedger nightly.","Connected"],["Shipping — Die Post","Labels and tracking numbers for Swiss Post parcels.","Not connected"],["Newsletter — Mailwerk","Customer segments sync to Mailwerk lists.","Not connected"]].map((x,i)=>`
  <div class="row-between" style="border-top:1px solid var(--line-soft);padding:16px 0">
    <div class="row"><span class="num-badge">${String(i+1).padStart(2,"0")}</span><div><strong>${x[0]}</strong><div class="caption">${x[1]}</div></div></div>
    <span class="row gap-3">${badge(x[2])}<button class="btn btn-sm ${x[2]==="Connected"?"btn-outline":""}" onclick="toast('Integration screen is a demo.')">${x[2]==="Connected"?"Manage":"Connect"}</button></span>
  </div>`).join("")}`;

const authShell = (num, title, form, note) => `
  <div class="poster">
    <div class="poster-left">
      <div class="wordmark h-display" style="font-size:40px">Raster<span style="color:var(--red)">.</span></div>
      <div style="margin-top:auto"><div class="poster-num">${num}</div>
      <div class="micro mt-4">Swiss Editorial Admin — § ${num}</div>
      <p class="muted mt-3" style="max-width:340px">${note}</p></div>
    </div>
    <div class="poster-right"><div style="max-width:420px">
      <div class="micro red">Atelier Nord AG — Workspace</div>
      <h1 class="h1 mt-3">${title}</h1>
      <div class="mt-7">${form}</div>
    </div></div>
  </div>`;
SCREENS.login = () => authShell("01","Sign in", `
  <form onsubmit="event.preventDefault();location.hash='#/overview'">
    <div class="f-group"><label class="f-label">Email</label><input class="f-input" type="email" value="lena.vogt@ateliernord.ch"></div>
    <div class="f-group"><label class="f-label">Password</label><input class="f-input" type="password" value="••••••••••"></div>
    <div class="row-between"><label class="check"><input type="checkbox" checked><span class="box"></span>Remember me</label><a href="#/forgot"><strong>Forgot password?</strong></a></div>
    <button class="btn btn-block mt-6" style="padding:14px">Sign in →</button>
    <p class="caption mt-4">No account yet? <a href="#/register"><strong>Create one</strong></a></p>
  </form>`, "The admin template set as a Zürich poster: one grid, one ink, one red. This screen is part of the product, not a placeholder.");
SCREENS.register = () => authShell("02","Register", `
  <form onsubmit="event.preventDefault();location.hash='#/onboarding'">
    <div class="f-row"><div class="f-group"><label class="f-label">First name</label><input class="f-input" value="Lena"></div><div class="f-group"><label class="f-label">Last name</label><input class="f-input" value="Vogt"></div></div>
    <div class="f-group"><label class="f-label">Work email</label><input class="f-input" type="email" placeholder="name@company.ch"></div>
    <div class="f-group"><label class="f-label">Password</label><input class="f-input" type="password" placeholder="12+ characters"><div class="f-help">Strength is shown as a ruled bar in the full product.</div></div>
    <label class="check"><input type="checkbox"><span class="box"></span>I agree to the terms and the data-processing addendum</label>
    <button class="btn btn-block mt-6" style="padding:14px">Create workspace →</button>
    <p class="caption mt-4">Already registered? <a href="#/login"><strong>Sign in</strong></a></p>
  </form>`, "Fourteen days free on every plan. No card required, no rounded corners anywhere.");
SCREENS.forgot = () => authShell("03","Reset", `
  <form onsubmit="event.preventDefault();toast('Reset link sent (demo). Check your inbox.')">
    <p class="muted">Enter the email you sign in with. We send a link that expires in 60 minutes.</p>
    <div class="f-group mt-5"><label class="f-label">Email</label><input class="f-input" type="email" placeholder="name@company.ch"></div>
    <button class="btn btn-block" style="padding:14px">Send reset link</button>
    <p class="caption mt-4">Remembered it? <a href="#/login"><strong>Back to sign in</strong></a></p>
  </form>`, "Password resets are single-use and logged in the workspace activity feed.");
SCREENS.twofa = () => authShell("04","Two factors", `
  <form onsubmit="event.preventDefault();location.hash='#/overview'">
    <p class="muted">Enter the 6-digit code from your authenticator app for <strong>lena.vogt@ateliernord.ch</strong>.</p>
    <div class="row gap-2 mt-6">${[1,0,8,4,"",""].map(v=>`<input class="f-input" style="text-align:center;font-size:22px;font-weight:900;padding:12px 0" maxlength="1" value="${v}">`).join("")}</div>
    <button class="btn btn-block mt-6" style="padding:14px">Verify →</button>
    <p class="caption mt-4">Lost your device? Use a recovery code from Settings → Profile.</p>
  </form>`, "Two-factor authentication is mandatory for Admin and Finance roles.");

SCREENS.onboarding = () => `
  <div style="max-width:960px;margin:0 auto;padding:var(--s9) var(--s6)">
    <div class="micro red">Setup — Step 2 of 4</div><h1 class="h1 mt-3">Your workspace,<br>on the grid.</h1>
    <div class="steps mt-7"><span class="step done">01 Account</span><span class="step now">02 Organisation</span><span class="step">03 Import</span><span class="step">04 Team</span></div>
    <div class="ob-steps mt-8">
      ${[["Organisation","Name, VAT and address of the legal entity.","Done"],["Price list","Import products from CSV or start with the demo catalogue.","Current"],["Warehouses","One site is enough to start; add satellites later.","Open"],["Team","Invite colleagues and assign the four roles.","Open"]].map((s,i)=>`
      <div class="stat"><div class="micro ${i===1?"red":""}">${s[2]}</div><div class="num-lg" style="font-size:20px">${s[0]}</div><p class="caption mt-2">${s[1]}</p></div>`).join("")}
    </div>
    <div class="grid mt-8"><div class="span-7">
      <div class="f-group"><label class="f-label">Organisation name</label><input class="f-input" value="Atelier Nord AG"></div>
      <div class="f-group"><label class="f-label">First price list</label><div class="upload"><div class="h3">Drop products.csv</div><div class="caption mt-2">or start with the 14-product demo catalogue</div></div></div>
    </div><div class="span-5"><div class="plate-ink"><div class="micro">Why a grid?</div><p class="mt-3">Every screen in Raster is composed on the same columns, so a warehouse tablet and a boardroom monitor show the same poster at different sizes.</p></div></div></div>
    <div class="row-between mt-8"><button class="btn btn-outline" onclick="location.hash='#/login'">← Back</button><button class="btn" onclick="location.hash='#/overview'">Continue →</button></div>
  </div>`;

SCREENS.profile = () => {
  const u = DATA.user;
  return `
  ${pageHead("27 — Account","User Profile","Lena Vogt — Operations Lead. This is the public-facing profile other members see.", `<button class="btn" onclick="location.hash='#/settings/profile'">Edit profile</button>`)}
  <div class="detail-hero">
    ${avatar(u.name,"xl red")}
    <div><div class="h2">${u.name}</div><div class="caption">${u.role} · Zürich · Member since 2021</div>
    <div class="row mt-3">${badge("Active")}${badge("Admin")}<span class="caption">${u.email}</span></div></div>
  </div>
  <div class="grid mt-8">
    <div class="span-4">${stat("Orders handled","1,204")}</div>
    <div class="span-4">${stat("Reports built","37")}</div>
    <div class="span-4">${stat("Tickets answered","312")}</div>
  </div>
  <div class="mt-8">${secHead("40","Recent activity by Lena")}<div class="timeline" style="max-width:760px">${DATA.activity.slice(0,5).map(a=>`<div class="tl-item ${a.hot?"hot":""}"><strong>${a.who}</strong> <span class="muted">${a.what}</span><div class="caption">${a.when}</div></div>`).join("")}</div></div>`;
};

SCREENS.charts = () => `
  ${pageHead("28 — Gallery","Charts Gallery","Every chart in Raster is pure SVG generated from data — no chart library, no canvas. Each figure is numbered and captioned.", "")}
  <div class="grid">
    <div class="span-6"><div class="fig"><div class="micro">Fig. 01 — Line</div><div class="mt-3">${svgLine(DATA.revenueByMonth,{labels:MONTHS,h:170})}</div><div class="cap"><span class="caption">Revenue, trailing 12 months</span><strong>${CHF(KPI.revenueYear)}</strong></div></div></div>
    <div class="span-6"><div class="fig"><div class="micro">Fig. 02 — Area</div><div class="mt-3">${svgLine(DATA.visitorsByMonth,{labels:MONTHS,h:170,area:true})}</div><div class="cap"><span class="caption">Visitors, trailing 12 months</span><strong>${NUM(sum(DATA.visitorsByMonth,x=>x))}</strong></div></div></div>
    <div class="span-6"><div class="fig"><div class="micro">Fig. 03 — Columns</div><div class="mt-3">${svgBars(DATA.ordersByMonth,{labels:MONTHS,h:170,redLast:true})}</div><div class="cap"><span class="caption">Orders per month — current month in red</span><strong>${NUM(sum(DATA.ordersByMonth,x=>x))}</strong></div></div></div>
    <div class="span-6"><div class="fig"><div class="micro">Fig. 04 — Stacked</div><div class="mt-3">${svgStacked(DATA.ordersByMonth.map((o,i)=>[o,Math.round(DATA.visitorsByMonth[i]/100)]),{labels:MONTHS,h:170})}</div><div class="cap"><span class="caption">Orders (ink) against visitors ÷100 (red)</span><strong>2 series</strong></div></div></div>
    <div class="span-4"><div class="fig"><div class="micro">Fig. 05 — Donut</div><div class="mt-3">${svgDonut([{v:46,c:"var(--ink)"},{v:27,c:"var(--red)"},{v:27,c:"var(--ink-3)"}],{size:170})}</div><div class="cap"><span class="caption">Traffic sources</span><strong>100%</strong></div></div></div>
    <div class="span-4"><div class="fig"><div class="micro">Fig. 06 — Gauge</div><div class="mt-3">${svgGauge(96,{size:190})}</div><div class="cap"><span class="caption">December target progress</span><strong>96%</strong></div></div></div>
    <div class="span-4"><div class="fig"><div class="micro">Fig. 07 — Horizontal</div><div class="mt-3">${svgHBar([486200,312670,203910,148350],{labels:["KELLER","GRAFIKW.","NORDLICHT","RÜEGG"],h:150})}</div><div class="cap"><span class="caption">Top customers, lifetime</span><strong>CHF</strong></div></div></div>
  </div>`;

SCREENS.tablesGallery = () => `
  ${pageHead("29 — Gallery","Tables Gallery","The table is Raster's main component. Six production variants, all driven by one renderer.", "")}
  ${secHead("41","Variant 1 — Standard with index")}
  ${table([{t:"No.",v:(r,i)=>i+1},{t:"Product",v:"name"},{t:"SKU",v:"sku"},{t:"Stock",v:r=>NUM(r.stock),r:1},{t:"Price",v:r=>CHF(r.price),r:1}], DATA.products.slice(0,5),{index:true})}
  <div class="mt-8">${secHead("42","Variant 2 — Dense with status")}</div>
  ${table([{t:"Product",v:"name"},{t:"Status",v:r=>badge(r.status)},{t:"Stock",v:r=>NUM(r.stock),r:1}], DATA.products.slice(0,6),{dense:true})}
  <div class="mt-8">${secHead("43","Variant 3 — With totals footer")}</div>
  ${table(orderRow.slice(1), DATA.orders.slice(0,4), {foot:`<td colspan="5">Subtotal — 4 orders</td><td></td><td class="r">${CHF(sum(DATA.orders.slice(0,4),o=>o.total))}</td>`})}`;

SCREENS.formsGallery = () => `
  ${pageHead("30 — Gallery","Forms Gallery","Forms are set like order slips: label above, hairline box, red focus. Every state is shown.", `<button class="btn" onclick="toast('Form submitted (demo).')">Submit demo form</button>`)}
  <div class="grid">
    <div class="span-6">
      ${secHead("44","Text fields")}
      <div class="f-group"><label class="f-label">Company</label><input class="f-input" value="Atelier Nord AG"></div>
      <div class="f-group"><label class="f-label">Email — with error</label><input class="f-input f-error" value="lena@"><div class="f-err-msg">Enter a valid email address.</div></div>
      <div class="f-group"><label class="f-label">Amount</label><span class="f-prefix"><span class="pre">CHF</span><input class="f-input" value="1,250.00"></span><div class="f-help">Prices include VAT 8.1% unless marked net.</div></div>
      <div class="f-group"><label class="f-label">Notes</label><textarea class="f-area" rows="3">Hold at dock for the courier.</textarea></div>
    </div>
    <div class="span-6">
      ${secHead("45","Choices")}
      <div class="f-group"><label class="f-label">Segment</label><select class="f-select"><option>Wholesale</option><option>Retail</option><option>Studio</option></select></div>
      <div class="stack gap-3"><label class="check"><input type="checkbox" checked><span class="box"></span>Email reports weekly</label><label class="check"><input type="checkbox"><span class="box"></span>Include dormant accounts</label></div>
      <div class="stack gap-3 mt-5"><label class="check radio"><input type="radio" name="fg" checked><span class="box"></span>Monthly digest</label><label class="check radio"><input type="radio" name="fg"><span class="box"></span>Weekly digest</label></div>
      <div class="stack gap-3 mt-5">${sw2("Dark mode", false)}${sw2("Grid overlay (Style Guide)", false)}</div>
      <div class="f-group mt-5"><label class="f-label">Discount — <span id="fg-rv">25%</span></label><input class="f-range" type="range" value="25" oninput="document.getElementById('fg-rv').textContent=this.value+'%'"></div>
    </div>
  </div>`;

SCREENS.styleguide = () => {
  const groups = [...new Set(REGISTRY.map(r=>r.group))];
  let n = 0;
  const sections = groups.map((g,i)=>{
    const items = REGISTRY.filter(r=>r.group===g);
    return `<div class="sg-block"><h3><span class="no">${String(i+1).padStart(2,"0")}</span> ${g} <span class="caption" style="margin-left:auto">${items.length} components</span></h3>
      <div class="grid" style="gap:20px">${items.map(it=>{ n++; return `<div class="span-4"><div class="sg-demo">${it.html}</div><div class="sg-meta"><span>${String(n).padStart(3,"0")} — ${it.name}</span></div></div>`; }).join("")}</div></div>`;
  }).join("");
  return `
  ${pageHead("31 — System","Style Guide","The whole library, live on one page: "+REGISTRY.length+" components in "+groups.length+" groups, the tokens that drive them, and the grid every screen is built on.", `<button class="btn btn-outline" onclick="document.body.classList.toggle('grid-on');toast('Grid overlay toggled. The red columns are the skeleton of every screen.')">Toggle grid overlay</button><button class="btn" onclick="toggleTheme()">Toggle theme</button>`)}
  <div class="grid mb-6">
    <div class="span-3">${stat("Components", REGISTRY.length)}</div>
    <div class="span-3">${stat("Component groups", groups.length)}</div>
    <div class="span-3">${stat("Type scale steps","12")}</div>
    <div class="span-3">${stat("Accents","1 — Swiss red")}</div>
  </div>
  ${secHead("46","Colour — paper, ink, one red")}
  <div class="swatches">
    ${[["Paper","#FFFFFF","var(--paper)"],["Paper 2","#F4F4F2","var(--paper-2)"],["Ink","#111111","var(--ink)"],["Swiss Red","#E30613","var(--red)"]].map(s=>`<div class="swatch" style="background:${s[2]};${s[0]==="Ink"||s[0]==="Swiss Red"?"color:#fff":""}"><div class="micro">${s[0]}</div><strong>${s[1]}</strong></div>`).join("")}
  </div>
  <p class="caption mt-3">In dark theme the same swatches reprint on black paper: paper becomes #111111, ink becomes #FFFFFF, the red does not move.</p>
  <div class="mt-8">${secHead("47","Type — Libre Franklin")}</div>
  <div style="border-top:1px solid var(--line)">
    <div class="h-display" style="font-size:72px;padding:10px 0">Grid Systems</div>
    <div class="row-between" style="border-top:1px solid var(--line-soft);padding:8px 0"><span>Display 900 — headlines & numerals</span><span class="caption">96 / 64 / 44</span></div>
    <div class="row-between" style="border-top:1px solid var(--line-soft);padding:8px 0"><span style="font-weight:800">Headline 800 — section titles</span><span class="caption">24 / 20 / 16</span></div>
    <div class="row-between" style="border-top:1px solid var(--line-soft);padding:8px 0"><span>Body 400/500 — UI text & prose</span><span class="caption">14 / 13 / 12</span></div>
    <div class="row-between" style="border-top:1px solid var(--line-soft);border-bottom:1px solid var(--line);padding:8px 0"><span class="micro">Micro 700 — labels, tracked +0.14em</span><span class="caption">11 / 10</span></div>
  </div>
  <div class="mt-8">${sections}</div>`;
};

SCREENS.empty = () => `
  ${pageHead("32 — System","Empty States","Four ways Raster says «nothing here yet» — always with the next action attached.", "")}
  <div class="grid">
    <div class="span-6"><div class="empty"><div class="micro red">Orders</div><div class="big mt-3">No orders<br>yet</div><p class="muted mt-4">When the first order arrives it will be numbered, ruled and totalled here.</p><button class="btn mt-6" onclick="toast('Order form is a demo.')">Create order</button></div></div>
    <div class="span-6"><div class="empty"><div class="micro red">Search</div><div class="big mt-3">Nothing<br>found</div><p class="muted mt-4">No products, orders or customers match «risograph». Try a SKU or a company name.</p><button class="btn btn-outline mt-6" onclick="location.hash='#/products'">Browse products</button></div></div>
    <div class="span-6"><div class="empty"><div class="micro red">Inbox</div><div class="big mt-3">All<br>read</div><p class="muted mt-4">The inbox is empty. New conversations will be listed here with unread senders set in black weight.</p></div></div>
    <div class="span-6"><div class="empty"><div class="micro red">Reports</div><div class="big mt-3">No reports<br>saved</div><p class="muted mt-4">Build the first one from any table in the product — the builder keeps your field selection.</p><button class="btn mt-6" onclick="location.hash='#/reports'">Open builder</button></div></div>
  </div>`;

const errorPoster = (num, title, body, cta, hash) => `
  <div class="poster">
    <div class="poster-left"><div class="wordmark h-display" style="font-size:40px">Raster<span style="color:var(--red)">.</span></div>
      <div style="margin-top:auto"><div class="poster-num" style="color:var(--red)">${num}</div><div class="micro mt-4">Error — § ${num}</div></div></div>
    <div class="poster-right"><div style="max-width:440px"><h1 class="h1">${title}</h1><p class="muted mt-4">${body}</p>
      <button class="btn mt-7" onclick="location.hash='${hash}'">${cta}</button>
      <p class="caption mt-5">Raster — Swiss Editorial Admin. Even the error pages keep the grid.</p></div></div>
  </div>`;
SCREENS.e404 = () => errorPoster("404","Page not<br>on the grid","The route you asked for does not exist in this template. It may have been renumbered — the index in the sidebar lists all 48 screens.","Back to overview","#/overview");
SCREENS.e500 = () => errorPoster("500","Something<br>broke","A server error, set in the same type as everything else. The incident has been written to the activity log with a red square.","Retry overview","#/overview");
SCREENS.maintenance = () => errorPoster("§","Down for<br>maintenance","Raster is being re-set, like type in a chase. Planned window: Sunday 02:00–03:00 CET. Your data is untouched.","Check status","#/overview");
