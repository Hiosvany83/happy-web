/* ============================================================
   Reconly — Screens C: System, settings, public & states
   ============================================================ */

const S3 = (window.AD.screens = window.AD.screens || {});
const pageHeadC = (title, sub, actions = "") => `
  <div class="page-head">
    <div><h2>${esc(title)}</h2><p>${esc(sub)}</p></div>
    <div class="actions">${actions}</div>
  </div>`;

/* ================= INTEGRATIONS ================= */
S3["integrations"] = () => `
  ${pageHeadC("Integrations", "The finance stack, connected — sync health at a glance", `<button class="btn btn-secondary" onclick="toast('Integration directory opened','info')">Browse directory</button>`)}
  <div class="grid grid-3">
    ${DATA.integrations.map(i => `<div class="card"><div class="card-body">
      <div class="flex items-center gap-3 mb-3"><span style="font-size:22px">🔌</span><div class="grow"><strong>${esc(i.name)}</strong><div class="text-sm text-3">${esc(i.kind)}</div></div>${statusBadge(i.status)}</div>
      <p class="text-sm text-2 mb-3">${esc(i.detail)}</p>
      ${i.status === "connected"
        ? `<button class="btn btn-secondary btn-sm" onclick="toast('${esc(i.name)} settings opened','info')">Manage</button> <button class="btn btn-ghost btn-sm" onclick="toast('Sync triggered for ${esc(i.name)}','success')">Sync now</button>`
        : `<button class="btn btn-primary btn-sm" onclick="toast('${esc(i.name)} connection flow opened (OAuth)','info')">Connect</button>`}
    </div></div>`).join("")}
  </div>
  <div class="mt-4">${copilotPanel({ label: "Sync health", summary: "All 7 connected integrations are in sync; the last conflict was 41 days ago. Connecting Snowflake would enable the warehouse export the data team requested twice this quarter.", suggestions: [{ text: "Connect Snowflake (read-only export role)", confidence: 82 }], sources: ["Sync logs"] })}</div>`;

/* ================= GLOBAL SEARCH ================= */
S3["search"] = () => {
  const invoiceHits = DATA.invoices.slice(0, 5).map(i => ({ icon: "🧾", title: i.id + " — " + i.customer, sub: fmt.money(i.amount) + " · " + i.status + " · due " + i.due, href: "#/invoice-detail" }));
  const vendorHits = DATA.vendors.slice(0, 4).map(v => ({ icon: "🏢", title: v.name, sub: v.category + " · " + fmt.money(v.monthly) + "/mo", href: "#/vendor-detail" }));
  const peopleHits = DATA.team.slice(0, 3).map(t => ({ icon: "👤", title: t.name, sub: t.role, href: "#/settings-team" }));
  const group = (title, hits) => sectionCard(title, "", "", `<div class="flex flex-col gap-2">${hits.map(h => `<a href="${h.href}" class="flex items-center gap-3" style="padding:8px;border:1px solid var(--border);border-radius:var(--radius-sm)"><span style="font-size:18px">${h.icon}</span><span class="grow"><strong class="text-sm">${esc(h.title)}</strong><br><span class="text-sm text-3">${esc(h.sub)}</span></span><span class="text-3">→</span></a>`).join("")}</div>`);
  return `
  ${pageHeadC("Global Search", "One index across money in, money out and people", "")}
  <div class="card mb-4"><div class="card-body">
    <div class="input-icon search-input" style="max-width:none"><span class="icon">⌕</span><input class="input" id="global-search-input" placeholder="Try “invoice”, “aws”, “overdue”…" aria-label="Global search"></div>
    <div class="flex gap-2 mt-3" style="flex-wrap:wrap"><span class="text-sm text-3">Recent:</span><span class="chip">INV-2039</span><span class="chip">AWS true-up</span><span class="chip">HubSpot renewal</span><span class="chip">runway</span></div>
  </div></div>
  <div class="grid grid-3">
    ${group("Invoices", invoiceHits)}
    ${group("Vendors", vendorHits)}
    ${group("People", peopleHits)}
  </div>
  <script>document.getElementById('global-search-input').addEventListener('input',function(){var q=this.value.toLowerCase();document.querySelectorAll('#app .card a').forEach(function(a){});toast('Live filtering is wired in the full build — demo shows indexed results','info');},{once:true})<\/script>`;
};

/* ================= NOTIFICATIONS ================= */
S3["notifications"] = () => {
  const icons = { ar: "🧾", approval: "✔", ai: "✦", cash: "💵", tax: "🏛", budget: "🎯", close: "📊" };
  return `
  ${pageHeadC("Notifications", "Finance signals — money at risk first, noise never", `<button class="btn btn-secondary" onclick="toast('All notifications marked as read','success')">Mark all read</button><button class="btn btn-ghost" onclick="toast('Notification preferences opened','info')">Preferences</button>`)}
  <div class="flex flex-col gap-2" style="max-width:820px">
    ${DATA.notifications.map(n => `<div class="card" style="${n.read ? "opacity:.75" : ""}"><div class="card-body flex gap-3">
      <span style="font-size:20px">${icons[n.type] || "🔔"}</span>
      <div class="grow"><div class="flex items-center gap-2"><strong>${esc(n.title)}</strong>${n.read ? "" : '<span class="badge badge-ai">New</span>'}</div>
      <p class="text-sm text-2 mt-2">${esc(n.text)}</p></div>
      <span class="text-sm text-3" style="white-space:nowrap">${esc(n.time)}</span>
    </div></div>`).join("")}
  </div>`;
};

/* ================= SETTINGS — PROFILE ================= */
S3["settings-profile"] = () => `
  ${pageHeadC("Settings — Profile", "Your account, your security", `<button class="btn btn-primary" onclick="toast('Profile saved','success')">Save changes</button>`)}
  <div class="grid grid-2">
    <div class="card"><div class="card-head"><h3>Profile</h3></div><div class="card-body">
      <div class="flex items-center gap-3 mb-4">${avatarHtml("Dana Whitfield", "lg")}<div><button class="btn btn-secondary btn-sm" onclick="toast('Avatar upload opened','info')">Change avatar</button><div class="text-sm text-3 mt-2">PNG or JPG · 256×256 minimum</div></div></div>
      <div class="grid grid-2">
        ${fieldHtml("First name", `<input class="input" value="Dana">`)}
        ${fieldHtml("Last name", `<input class="input" value="Whitfield">`)}
      </div>
      ${fieldHtml("Work email", `<input class="input" value="dana@arcadiasystems.com">`, "Used for approvals and digests")}
      ${fieldHtml("Job title", `<input class="input" value="Chief Financial Officer">`)}
      ${fieldHtml("Timezone", `<select class="select"><option>America/New_York (ET)</option><option>America/Los_Angeles (PT)</option><option>Europe/London (GMT)</option></select>`)}
    </div></div>
    <div class="flex flex-col gap-4">
      <div class="card"><div class="card-head"><h3>Security</h3></div><div class="card-body flex flex-col gap-3">
        <div class="flex items-center gap-3"><div class="grow"><strong class="text-sm">Two-factor authentication</strong><div class="text-sm text-3">Authenticator app · enabled Mar 2026</div></div>${badge("On", "success")}</div>
        <div class="flex items-center gap-3"><div class="grow"><strong class="text-sm">Password</strong><div class="text-sm text-3">Last changed 64 days ago</div></div><button class="btn btn-secondary btn-sm" onclick="toast('Password change flow opened','info')">Change</button></div>
        <div class="flex items-center gap-3"><div class="grow"><strong class="text-sm">Active sessions</strong><div class="text-sm text-3">2 devices · this browser + iPhone</div></div><button class="btn btn-ghost btn-sm" onclick="toast('Other sessions signed out','warning')">Revoke others</button></div>
      </div></div>
      <div class="card"><div class="card-head"><h3>Email preferences</h3></div><div class="card-body flex flex-col gap-3">
        <div class="flex items-center gap-3"><span class="grow text-sm">Daily finance digest (07:00)</span>${toggleInput(true, "pf-1")}</div>
        <div class="flex items-center gap-3"><span class="grow text-sm">Approval requests — instant</span>${toggleInput(true, "pf-2")}</div>
        <div class="flex items-center gap-3"><span class="grow text-sm">Overdue invoice alerts</span>${toggleInput(true, "pf-3")}</div>
        <div class="flex items-center gap-3"><span class="grow text-sm">Product news</span>${toggleInput(false, "pf-4")}</div>
      </div></div>
    </div>
  </div>`;

/* ================= SETTINGS — WORKSPACE ================= */
S3["settings-workspace"] = () => `
  ${pageHeadC("Settings — Workspace", "How Arcadia Systems runs its books in Reconly", `<button class="btn btn-primary" onclick="toast('Workspace settings saved','success')">Save changes</button>`)}
  <div class="grid grid-2">
    <div class="card"><div class="card-head"><h3>General</h3></div><div class="card-body">
      ${fieldHtml("Workspace name", `<input class="input" value="Arcadia Systems">`)}
      ${fieldHtml("Legal entity", `<input class="input" value="Arcadia Systems, Inc. (Delaware)">`)}
      <div class="grid grid-2">
        ${fieldHtml("Base currency", `<select class="select"><option>USD — US Dollar</option><option>EUR — Euro</option><option>GBP — British Pound</option></select>`)}
        ${fieldHtml("Fiscal year starts", `<select class="select"><option>January</option><option>April</option><option>July</option></select>`)}
      </div>
      ${fieldHtml("Invoice numbering", `<input class="input" value="INV-{seq}">`, "Next invoice will be INV-2052")}
      ${fieldHtml("Default payment terms", `<select class="select"><option>Net 30</option><option>Net 14</option><option>Net 45</option></select>`)}
    </div></div>
    <div class="flex flex-col gap-4">
      <div class="card"><div class="card-head"><h3>Approval policy</h3></div><div class="card-body flex flex-col gap-3">
        <div class="flex items-center gap-3"><div class="grow"><strong class="text-sm">Auto-approve matched bills ≤ $500</strong><div class="text-sm text-3">Requires a full three-way match</div></div>${toggleInput(true, "ws-1")}</div>
        <div class="flex items-center gap-3"><div class="grow"><strong class="text-sm">Two-person rule for bank-detail changes</strong><div class="text-sm text-3">Fraud control — cannot be disabled</div></div>${toggleInput(true, "ws-2")}</div>
        <div class="flex items-center gap-3"><div class="grow"><strong class="text-sm">Require PO for bills over $1,000</strong><div class="text-sm text-3">Exceptions go to the automation queue</div></div>${toggleInput(true, "ws-3")}</div>
        <div class="flex items-center gap-3"><div class="grow"><strong class="text-sm">AI may send reminders ≤ $20,000</strong><div class="text-sm text-3">Larger amounts need a human send</div></div>${toggleInput(true, "ws-4")}</div>
      </div></div>
      <div class="card"><div class="card-head"><h3>Danger zone</h3></div><div class="card-body flex flex-col gap-3">
        <div class="flex items-center gap-3"><div class="grow"><strong class="text-sm">Export all data</strong><div class="text-sm text-3">Full ledger export (CSV + JSON)</div></div><button class="btn btn-secondary btn-sm" onclick="toast('Export queued — download link by email','success')">Export</button></div>
        <div class="flex items-center gap-3"><div class="grow"><strong class="text-sm">Delete workspace</strong><div class="text-sm text-3">Permanent · requires two owners</div></div><button class="btn btn-danger btn-sm" onclick="toast('Deletion requires a second owner — blocked','warning')">Delete</button></div>
      </div></div>
    </div>
  </div>`;

/* ================= SETTINGS — TEAM & ROLES ================= */
S3["settings-team"] = () => {
  AD.tables["team"] = {
    columns: [
      { key: "name", label: "Member", render: r => `<span class="flex items-center gap-2">${avatarHtml(r.name)}<span><strong>${esc(r.name)}</strong><br><span class="text-sm text-3">${esc(r.role)}</span></span></span>` },
      { key: "status", label: "Status", render: r => statusBadge(r.status) },
      { key: "act", label: "", sortable: false, render: () => `<button class="btn btn-ghost btn-sm" onclick="toast('Member actions opened','info')">Manage</button>` }
    ],
    rows: DATA.team, pageSize: 8, page: 1
  };
  return `
  ${pageHeadC("Settings — Team & Roles", "Who can see, approve and move money", `<button class="btn btn-primary" onclick="toast('Invite sent','success')">＋ Invite member</button>`)}
  <div class="grid grid-2-1">
    <div>${dataTable("team", AD.tables["team"].columns, DATA.team, { searchable: false })}</div>
    <div class="flex flex-col gap-4">
      ${sectionCard("Roles & approval limits", "Five roles ship with the template", "", `
        <div class="flex flex-col gap-3">
        ${DATA.roles.map(r => `<div class="card" style="box-shadow:none"><div class="card-body">
          <div class="flex items-center gap-2 mb-2"><strong>${esc(r.name)}</strong><span class="badge badge-neutral">${r.members} member${r.members === 1 ? "" : "s"}</span></div>
          <div class="text-sm text-2 flex flex-col gap-2">
            <span>Invoices: <strong>${esc(r.perms.invoices)}</strong></span>
            <span>Bills: <strong>${esc(r.perms.bills)}</strong></span>
            <span>AI automation: <strong>${esc(r.perms.ai)}</strong> · Settings: <strong>${esc(r.perms.settings)}</strong> · Reports: <strong>${esc(r.perms.reports)}</strong></span>
          </div></div></div>`).join("")}
        </div>`)}
    </div>
  </div>`;
};

/* ================= SETTINGS — BILLING ================= */
S3["settings-billing"] = () => {
  const b = DATA.billing;
  return `
  ${pageHeadC("Settings — Billing", "Your Reconly subscription", `<button class="btn btn-primary" onclick="toast('Plan change preview opened','info')">Change plan</button>`)}
  <div class="grid grid-2-1">
    <div class="flex flex-col gap-4">
      <div class="card"><div class="card-body">
        <div class="flex items-center gap-3 mb-4"><div class="grow"><div class="font-bold" style="font-size:19px">${esc(b.plan)} plan</div><div class="text-sm text-3">$${b.priceMo}/month · next invoice ${esc(b.nextInvoice)}</div></div>${badge("Active", "success")}</div>
        <div class="grid grid-3">
          <div><div class="text-sm text-3 mb-2">Seats</div><strong>${b.seatsUsed} / ${b.seatsTotal}</strong><div class="mt-2">${progressBar(Math.round(b.seatsUsed / b.seatsTotal * 100))}</div></div>
          <div><div class="text-sm text-3 mb-2">Documents / mo</div><strong>${fmt.num(b.docsUsed)} / ${fmt.num(b.docsTotal)}</strong><div class="mt-2">${progressBar(Math.round(b.docsUsed / b.docsTotal * 100))}</div></div>
          <div><div class="text-sm text-3 mb-2">Storage</div><strong>${b.storageUsedGb} / ${b.storageTotalGb} GB</strong><div class="mt-2">${progressBar(Math.round(b.storageUsedGb / b.storageTotalGb * 100))}</div></div>
        </div>
      </div></div>
      ${sectionCard("Invoices", "From Reconly, Inc.", "", `
        <table class="data"><thead><tr><th>Invoice</th><th>Date</th><th style="text-align:right">Amount</th><th>Status</th><th></th></tr></thead><tbody>
        ${b.invoices.map(i => `<tr><td class="font-semibold">${esc(i.id)}</td><td>${esc(i.date)}</td><td style="text-align:right">${moneyCell(i.amount)}</td><td>${statusBadge(i.status)}</td><td><button class="btn btn-ghost btn-sm" onclick="toast('PDF downloaded','success')">PDF</button></td></tr>`).join("")}
        </tbody></table>`)}
    </div>
    <div class="flex flex-col gap-4">
      <div class="card"><div class="card-head"><h3>Payment method</h3></div><div class="card-body">
        <div class="flex items-center gap-3"><span style="font-size:22px">💳</span><div class="grow"><strong class="text-sm">Visa •• 4242</strong><div class="text-sm text-3">Expires 08 / 2028</div></div><button class="btn btn-secondary btn-sm" onclick="toast('Payment method editor opened','info')">Update</button></div>
      </div></div>
      ${sectionCard("Plan comparison", "", "", `
        <div class="flex flex-col gap-2 text-sm">
          <div class="flex justify-between"><span>Starter</span><span>$79/mo · 500 docs</span></div>
          <div class="flex justify-between"><span><strong>Scale (current)</strong></span><span><strong>$249/mo · 2,500 docs</strong></span></div>
          <div class="flex justify-between"><span>Enterprise</span><span>Custom · unlimited</span></div>
        </div>`, `<button class="btn btn-ghost btn-sm" onclick="toast('Full pricing opened','info')">See pricing →</button>`)}
    </div>
  </div>`;
};

/* ================= PUBLIC: LANDING ================= */
S3["landing"] = () => `
  <div class="public-nav"><span class="flex items-center gap-2"><span class="logo" style="width:28px;height:28px;font-size:15px">✓</span><strong>Reconly</strong></span>
    <span class="flex gap-3 items-center"><a href="#/pricing">Pricing</a><a href="#/signin">Sign in</a><a class="btn btn-primary btn-sm" href="#/signup">Start free</a></span></div>
  <section class="hero">
    <span class="badge badge-ai">✦ AI invoice automation · 94.2% auto-match</span>
    <h1>Your books, <span style="color:var(--brand-600)">reconciled</span> before you ask.</h1>
    <p>Reconly unifies cash flow, invoicing, payables, budgets and payroll in one finance operations dashboard — and its AI matches, categorises and drafts the work your team used to do by hand.</p>
    <div class="flex gap-2" style="justify-content:center"><a class="btn btn-primary" href="#/signup">Start free — no card</a><a class="btn btn-secondary" href="#/command">View live demo</a></div>
    <div class="hero-shot"><div class="card" style="text-align:left"><div class="card-body">
      <div class="grid grid-4">
        ${statCard({ label: "Cash position", value: "$1,284,600", sub: "Operating + money market" })}
        ${statCard({ label: "Net — October", value: "+$56,630", sub: "Revenue beat spend" })}
        ${statCard({ label: "Auto-match", value: "94.2%", sub: "1,847 documents" })}
        ${statCard({ label: "Runway", value: "31.1 months", sub: "At Q3 average burn" })}
      </div>
      <div class="mt-4">${svgBarsDual(DATA.series12.revenue, DATA.series12.expenses, DATA.series12.months, { c1: "#10b981", c2: "#f59e0b", h: 150 })}</div>
    </div></div></div>
  </section>
  <section class="section"><h2>Everything finance ops touches</h2><p class="sub">Thirty-eight production screens — not wireframes.</p>
    <div class="grid grid-3">
      ${[["🧾", "Smart invoicing", "Invoices that chase themselves: AI reminders tuned to each customer's payment history."], ["📥", "AP automation", "Bills extracted, three-way matched and scheduled. Humans only see the exceptions."], ["≋", "Cash clarity", "Live balances, 30-day projection and runway — computed from the actual ledgers."], ["🎯", "Budgets that hold", "Plan vs. actual by department, with the overage explained before month-end."], ["🧠", "AI cost intelligence", "Duplicate tools, idle seats and untagged cloud spend — flagged with the savings attached."], ["✦", "A copilot with receipts", "Ask about the books; every answer cites the records it came from."]].map(([i, t, d]) => `<div class="card"><div class="card-body"><div style="font-size:24px" class="mb-2">${i}</div><strong>${t}</strong><p class="text-sm text-2 mt-2">${d}</p></div></div>`).join("")}
    </div></section>
  <section class="section"><h2>Loved by lean finance teams</h2><p class="sub">Fictional quotes, real workflows.</p>
    <div class="grid grid-3">
      ${[["We close in four days now. The exceptions queue is the whole job — everything else posts itself.", "Dana Whitfield", "CFO, Arcadia Systems"], ["The copilot's board summary matched our P&L to the cent. That's when I stopped double-checking it.", "Marcus Reid", "Controller"], ["It caught a duplicate Figma bill and $640/mo of duplicate transcription tools in the first week.", "Priya Nair", "AP Specialist"]].map(([q, n, r]) => `<div class="card"><div class="card-body"><p class="text-sm" style="line-height:1.7">“${q}”</p><div class="flex items-center gap-2 mt-3">${avatarHtml(n, "sm")}<span class="text-sm"><strong>${n}</strong><br><span class="text-3">${r}</span></span></div></div></div>`).join("")}
    </div></section>
  <section class="section" style="text-align:center"><h2>Close your next month in days, not weeks</h2><p class="sub">Free 14-day trial · connect your bank and accounting in minutes.</p><a class="btn btn-primary" href="#/signup">Start free</a></section>
  <footer class="public-foot">© 2026 Reconly (demo brand) · This landing page is one of the 38 screens included in the template.</footer>`;

/* ================= PUBLIC: PRICING ================= */
S3["pricing"] = () => {
  const tiers = [
    { name: "Starter", price: 79, blurb: "For small teams getting off spreadsheets", feats: ["500 documents / mo", "Invoicing & bills", "Cash flow dashboard", "2 seats included", "Email support"], cta: "Start free" },
    { name: "Scale", price: 249, blurb: "For finance teams closing monthly", feats: ["2,500 documents / mo", "Everything in Starter", "AI automation + copilot", "Budgets, payroll & tax", "30 seats included", "Priority support"], cta: "Start free", hot: true },
    { name: "Enterprise", price: null, blurb: "For multi-entity and audit-heavy orgs", feats: ["Unlimited documents", "Everything in Scale", "Multi-entity consolidation", "Custom roles & SSO/SAML", "Dedicated success manager"], cta: "Talk to sales" }
  ];
  return `
  <div class="public-nav"><span class="flex items-center gap-2"><span class="logo" style="width:28px;height:28px;font-size:15px">✓</span><strong>Reconly</strong></span>
    <span class="flex gap-3 items-center"><a href="#/landing">Product</a><a href="#/signin">Sign in</a><a class="btn btn-primary btn-sm" href="#/signup">Start free</a></span></div>
  <section class="hero" style="padding-bottom:24px"><h1>Pricing that pays for itself in week one</h1><p>The average workspace finds $920/mo of duplicate and idle spend in its first scan.</p></section>
  <section class="section" style="padding-top:8px"><div class="grid grid-3">
    ${tiers.map(t => `<div class="price-card ${t.hot ? "hot" : ""}">${t.hot ? '<span class="badge badge-ai" style="align-self:flex-start">Most popular</span>' : ""}
      <h3>${t.name}</h3><p class="text-sm text-3">${t.blurb}</p>
      <div class="price">${t.price ? "$" + t.price : "Custom"}${t.price ? '<span style="font-size:14px;color:var(--text-3);font-weight:500"> / month</span>' : ""}</div>
      <ul>${t.feats.map(f => `<li>✓ ${f}</li>`).join("")}</ul>
      <a class="btn ${t.hot ? "btn-primary" : "btn-secondary"}" href="#/signup" style="justify-content:center">${t.cta}</a></div>`).join("")}
  </div>
  <p class="text-sm text-3" style="text-align:center;margin-top:20px">All plans: 14-day free trial · no card required · cancel anytime. Prices in USD.</p></section>
  <footer class="public-foot">© 2026 Reconly (demo brand) · Pricing page included in the template.</footer>`;
};

/* ================= AUTH SCREENS ================= */
function authLayout(title, sub, form, foot) {
  return `<div class="auth-wrap"><div class="auth-card">
    <div class="flex items-center gap-2 mb-4"><span class="logo">✓</span><strong style="font-size:17px">Reconly</strong></div>
    <h2>${esc(title)}</h2><p>${esc(sub)}</p>
    ${form}
    <div class="divider"></div><div class="text-sm text-3" style="text-align:center">${foot}</div>
  </div></div>`;
}
S3["signin"] = () => authLayout("Welcome back", "Sign in to Arcadia Systems", `
  <button class="btn btn-secondary" style="width:100%;justify-content:center" onclick="toast('Google SSO is decorative in the demo','info')">Continue with Google</button>
  <div class="divider">or</div>
  ${fieldHtml("Work email", `<input class="input" type="email" value="dana@arcadiasystems.com">`)}
  ${fieldHtml("Password", `<input class="input" type="password" value="••••••••••">`)}
  <div class="flex items-center justify-between mb-4"><label class="flex items-center gap-2 text-sm"><input type="checkbox" checked> Remember me</label><a href="#/reset" class="text-sm">Forgot password?</a></div>
  <a class="btn btn-primary" href="#/command" style="width:100%;justify-content:center">Sign in</a>`,
  `New to Reconly? <a href="#/signup">Create an account</a>`);
S3["signup"] = () => authLayout("Create your workspace", "Free 14-day trial · no card required", `
  <div class="grid grid-2">${fieldHtml("First name", `<input class="input" placeholder="Dana">`)}${fieldHtml("Last name", `<input class="input" placeholder="Whitfield">`)}</div>
  ${fieldHtml("Work email", `<input class="input" type="email" placeholder="you@company.com">`)}
  ${fieldHtml("Company", `<input class="input" placeholder="Acme, Inc.">`)}
  ${fieldHtml("Password", `<input class="input" type="password" placeholder="12+ characters">`, "Use 12+ characters with a number and a symbol")}
  <label class="flex items-start gap-2 text-sm mb-4"><input type="checkbox" style="margin-top:3px"> I agree to the Terms and Privacy Policy</label>
  <a class="btn btn-primary" href="#/verify" style="width:100%;justify-content:center">Create account</a>`,
  `Already have an account? <a href="#/signin">Sign in</a>`);
S3["verify"] = () => authLayout("Check your inbox", "We sent a 6-digit code to dana@arcadiasystems.com", `
  <div class="otp">${[4, 8, 2].map(n => `<input class="input" maxlength="1" value="${n}">`).join("")}<input class="input" maxlength="1" placeholder="·"><input class="input" maxlength="1" placeholder="·"><input class="input" maxlength="1" placeholder="·"></div>
  <a class="btn btn-primary" href="#/onboarding" style="width:100%;justify-content:center">Verify & continue</a>
  <p class="text-sm text-3 mt-3" style="text-align:center">Didn't get it? <a href="#/verify" onclick="toast('A new code was sent','success');return false">Resend code</a> · expires in 14:32</p>`,
  `<a href="#/signin">← Back to sign in</a>`);
S3["reset"] = () => authLayout("Reset your password", "We'll email you a secure reset link", `
  ${fieldHtml("Work email", `<input class="input" type="email" placeholder="you@company.com">`)}
  <button class="btn btn-primary" style="width:100%;justify-content:center" onclick="toast('Reset link sent — check your inbox','success')">Send reset link</button>
  <p class="text-sm text-3 mt-3" style="text-align:center">Links expire after 30 minutes and can be used once.</p>`,
  `<a href="#/signin">← Back to sign in</a>`);

/* ================= ONBOARDING ================= */
S3["onboarding"] = () => `
  <div style="max-width:760px;margin:0 auto">
    <div class="flex items-center gap-2 mb-4"><span class="logo">✓</span><strong>Set up Arcadia Systems</strong><span class="badge badge-neutral" style="margin-left:auto">Step 2 of 4</span></div>
    ${progressBar(50)}
    <div class="card mt-4"><div class="card-body">
      <h3 class="mb-2" style="font-size:17px">Connect your money stack</h3>
      <p class="text-sm text-2 mb-4">Reconly becomes useful the moment your balances and ledgers flow in. Everything is read-only until you say otherwise.</p>
      <div class="flex flex-col gap-2">
        ${[["Mercury — bank balances & feed", "Connected · 2 accounts", true], ["QuickBooks Online — general ledger", "Connected · two-way sync", true], ["Stripe — payouts & tax reports", "Not connected", false], ["Deel — payroll", "Not connected", false]].map(([n, s, done]) => `
        <div class="flex items-center gap-3" style="padding:10px;border:1px solid var(--border);border-radius:var(--radius-sm)">
          <span style="font-size:19px">🔌</span><div class="grow"><strong class="text-sm">${n}</strong><div class="text-sm text-3">${s}</div></div>
          ${done ? badge("Connected", "success") : `<button class="btn btn-secondary btn-sm" onclick="toast('OAuth flow opened','info')">Connect</button>`}
        </div>`).join("")}
      </div>
      <div class="divider"></div>
      <h4 class="mb-2">Books snapshot</h4>
      <div class="grid grid-2">
        ${fieldHtml("Monthly revenue (approx.)", `<input class="input" value="$412,850">`)}
        ${fieldHtml("Team size", `<select class="select"><option>51–100 (86)</option><option>11–50</option><option>101–250</option></select>`)}
      </div>
      <div class="flex gap-2 mt-4"><a class="btn btn-ghost" href="#/command">Skip for now</a><a class="btn btn-primary" href="#/command" style="margin-left:auto">Continue →</a></div>
    </div></div>
    <p class="text-sm text-3 mt-3" style="text-align:center">You can change everything later in Settings. No card required during the trial.</p>
  </div>`;

/* ================= EMPTY STATES SHOWCASE ================= */
S3["states"] = () => `
  ${pageHeadC("Empty States", "Zero-data patterns used across the product — guidance, not dead ends", "")}
  <div class="grid grid-3">
    <div class="card"><div class="card-body">${emptyState({ icon: "🧾", title: "No invoices yet", text: "Create your first invoice and Reconly will track it, remind the customer and reconcile the payment automatically.", cta: `<button class="btn btn-primary btn-sm" onclick="document.getElementById('new-invoice-btn').click()">＋ New invoice</button>` })}</div></div>
    <div class="card"><div class="card-body">${emptyState({ icon: "📥", title: "Inbox zero — bills", text: "Every bill has been matched and scheduled. New documents appear here the moment they arrive.", cta: `<button class="btn btn-secondary btn-sm" onclick="toast('Forward bills to bills@arcadia.reconly.app','info')">Add a bill</button>` })}</div></div>
    <div class="card"><div class="card-body">${emptyState({ icon: "⌕", title: "No results for “payroll taxes”", text: "Nothing in invoices, bills or vendors matches. Check the spelling, or search for a document ID like BILL-3121.", cta: `<button class="btn btn-secondary btn-sm" onclick="toast('Filters cleared','info')">Clear filters</button>` })}</div></div>
    <div class="card"><div class="card-body">${emptyState({ icon: "🎉", title: "Approvals clear", text: "Nothing is waiting on you. Auto-approved items and their audit trail live under each bill.", cta: `<a class="btn btn-secondary btn-sm" href="#/bills">View bills</a>` })}</div></div>
    <div class="card"><div class="card-body">${emptyState({ icon: "🔌", title: "No integrations yet", text: "Connect your bank and accounting tool to unlock live balances, auto-match and the copilot's full context.", cta: `<a class="btn btn-primary btn-sm" href="#/integrations">Browse integrations</a>` })}</div></div>
    <div class="card"><div class="card-body">${emptyState({ icon: "📊", title: "No reports scheduled", text: "Schedule the monthly P&L and the board pack once — Reconly rebuilds them from live data every cycle.", cta: `<a class="btn btn-primary btn-sm" href="#/reports">Create a report</a>` })}</div></div>
  </div>`;

/* ================= 404 & MAINTENANCE ================= */
S3["notfound"] = () => `
  <div class="error-wrap"><div class="code">404</div><h2>This page doesn't exist</h2>
  <p>The link may be broken, or the page moved. Your books, thankfully, reconcile — this route doesn't.</p>
  <div class="flex gap-2" style="justify-content:center"><a class="btn btn-primary" href="#/command">Go to Command Center</a><a class="btn btn-secondary" href="#/search">Search instead</a></div></div>`;
S3["maintenance"] = () => `
  <div class="error-wrap"><div style="font-size:52px">🛠</div><h2>Scheduled maintenance</h2>
  <p>Reconly is down for a planned upgrade on <strong>Sunday, Nov 16 · 02:00–02:40 ET</strong>. Scheduled payments and reminders are queued and will run immediately after.</p>
  <span class="badge badge-warning">Status: upgrading the matching engine</span>
  <div class="mt-4"><a class="btn btn-secondary" href="#/command">Back to the app</a></div></div>`;
