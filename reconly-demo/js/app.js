/* ============================================================
   Reconly — App shell: hash router, theme, global interactions
   ============================================================ */

const TITLES = {
  "command": ["Command Center", "Real-time cash, revenue and payables"],
  "cashflow": ["Cash Flow", "Where the money is, and where it is going"],
  "revenue": ["Revenue Analytics", "MRR, growth and retention"],
  "invoices": ["Invoices", "Accounts receivable"],
  "customers": ["Customers", "Who owes what — and how reliably they pay"],
  "invoice-detail": ["Invoice INV-2039", "Corelink Health · overdue"],
  "bills": ["Bills & Payables", "Accounts payable"],
  "bill-detail": ["Bill BILL-3121", "Amazon Web Services · approval"],
  "approvals": ["Approvals", "Every spend decision in one queue"],
  "automation": ["AI Invoice Automation", "Documents in, reconciled entries out"],
  "spend": ["Spend & Expenses", "Every dollar, categorised by AI"],
  "vendors": ["Vendors", "Supplier directory and spend"],
  "vendor-detail": ["Amazon Web Services", "Vendor profile"],
  "cards": ["Cards & Transactions", "Corporate cards, AI-categorised"],
  "payroll": ["Payroll", "People costs, on time"],
  "budgets": ["Budgets", "Plan vs. actual by department"],
  "ai-costs": ["AI Cost Intelligence", "What AI spend earns its keep"],
  "forecast": ["Forecast & Scenarios", "Runway under your assumptions"],
  "copilot": ["AI Finance Copilot", "Answers with receipts"],
  "tax": ["Tax & Compliance", "Collected, filed, due"],
  "reports": ["Reports", "Scheduled and on-demand"],
  "integrations": ["Integrations", "Connected finance stack"],
  "search": ["Global Search", "Invoices, bills, vendors, people"],
  "notifications": ["Notifications", "Finance signals, not noise"],
  "settings-profile": ["Settings — Profile", "Your account"],
  "settings-workspace": ["Settings — Workspace", "Workspace configuration"],
  "settings-team": ["Settings — Team & Roles", "People and permissions"],
  "settings-billing": ["Settings — Billing", "Plan, seats and invoices"],
  "landing": ["Reconly — Landing", "Public marketing page"],
  "pricing": ["Pricing", "Public pricing page"],
  "signin": ["Sign In", "Authentication"],
  "signup": ["Sign Up", "Authentication"],
  "verify": ["Verify Email", "Authentication"],
  "reset": ["Reset Password", "Authentication"],
  "onboarding": ["Onboarding", "Guided setup"],
  "states": ["Empty States", "Zero-data patterns"],
  "notfound": ["404 — Not Found", "Error state"],
  "maintenance": ["Maintenance", "Planned downtime state"]
};

function currentRoute() {
  const h = location.hash.replace(/^#\//, "").replace(/^#/, "");
  return TITLES[h] ? h : "command";
}

function render() {
  const route = currentRoute();
  const fn = window.AD.screens[route];
  const app = document.getElementById("app");
  app.innerHTML = fn ? fn() : window.AD.screens.notfound();
  const [title, sub] = TITLES[route] || TITLES.notfound;
  document.getElementById("crumb-title").textContent = title;
  document.getElementById("crumb-sub").textContent = sub;
  document.title = title + " · Reconly";
  document.querySelectorAll(".nav-item").forEach(a => a.classList.toggle("active", a.dataset.nav === route));
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("scrim").classList.remove("show");
  window.scrollTo(0, 0);
  app.scrollTop = 0;
  bindTables();
  bindInteractions(route);
}

/* Wire any dataTable on the page */
function bindTables() {
  Object.keys(window.AD.tables).forEach(tid => {
    const t = window.AD.tables[tid];
    t.page = t.page || 1;
    renderTablePage(tid);
    const search = document.querySelector(`[data-table-search="${tid}"]`);
    if (search) search.addEventListener("input", () => { t.query = search.value; t.page = 1; renderTablePage(tid); });
    document.querySelectorAll(`[data-table="${tid}"] th.sortable`).forEach(th => {
      th.addEventListener("click", () => {
        const key = th.dataset.sort;
        if (t.sortKey === key) t.sortDir = t.sortDir === "asc" ? "desc" : "asc";
        else { t.sortKey = key; t.sortDir = "asc"; }
        renderTablePage(tid);
      });
    });
    const pagesEl = document.querySelector(`[data-table-pages="${tid}"]`);
    if (pagesEl) pagesEl.addEventListener("click", e => {
      const btn = e.target.closest("[data-table-goto]");
      if (!btn) return;
      t.page = parseInt(btn.dataset.tableGoto.split(":")[1], 10);
      renderTablePage(tid);
    });
  });
}

/* Page-level interactive bindings (demo behaviours, no backend) */
function bindInteractions(route) {
  if (route === "copilot") bindCopilot();
  if (route === "forecast") bindForecast();
}

/* Copilot: pick a question -> typed answer from the keyword-matched dataset */
const COPILOT_QA = [
  { q: "Why did cash drop in August?", keys: ["cash drop", "august", "why did cash"], a: "Cash fell $398,810 across July→September because expenses ran ahead of revenue for three months: August expenses were $419,100 against $379,300 revenue (net −$39,800), driven by the annual insurance premium and two quarterly tax payments. October reversed the trend — revenue $412,850 vs expenses $356,220 (+$56,630) — and the balance is back to $1,284,600.", c: 94 },
  { q: "Which invoices are at risk?", keys: ["invoice", "risk", "overdue", "collect"], a: "Four invoices totalling $37,450 are overdue. The highest risk is INV-2039 (Corelink Health, $15,720, 18 days overdue, second reminder unsent). Ferrous Labs (INV-2037, $11,480) has paid late twice before. Reconly rates on-time recovery at 82% if reminders go out today.", c: 91 },
  { q: "Where can we cut $5K/month?", keys: ["cut", "save", "reduce", "5k"], a: "Three candidates clear $5K/month combined: (1) HubSpot — 11 idle seats, downgrade saves $1,870/yr and the renewal is due Nov 17; (2) ScribeAI duplicates EchoNotes — cancel saves $640/mo; (3) 14 idle Copilot seats save $280/mo. The bigger lever is AWS: $3,940 of October's true-up was untagged test instances — rightsizing the dev account is worth ≈ $2,900/mo.", c: 88 },
  { q: "What is our runway?", keys: ["runway", "burn", "survive"], a: "At Q3's average net burn of $41,320/month, the current cash of $1,284,600 covers 31.1 months. October was net-positive (+$56,630), so the trend-adjusted runway is longer; the Forecast screen models 24.6 months in the downside scenario (−15% revenue, +8% costs).", c: 96 },
  { q: "Summarise October for the board", keys: ["board", "summarise", "summarize", "october", "summary"], a: "October 2026: revenue $412,850 (+6.2% MoM), expenses $356,220 (−16.9% vs September's annual-premium month), net +$56,630. MRR grew to $386,400 (+1.7%) with NRR at 104.2%. Cash closed at $1,284,600. AR overdue stands at $37,450 across 4 invoices; auto-match reached 94.2% on 1,847 documents. The month close stands at 6 of 8 key tasks — two remain.", c: 93 }
];
function copilotAnswer(text) {
  const t = text.toLowerCase();
  const hit = COPILOT_QA.find(x => x.keys.some(k => t.includes(k)));
  return hit || { a: "Based on the live books: cash is $1,284,600, October closed net-positive at +$56,630, and $37,450 of AR is overdue across 4 invoices. Ask me about cash, overdue invoices, cost cuts, runway or a board summary for a deeper answer — every figure traces to a record above.", c: 84 };
}

function bindCopilot() {
  const input = document.getElementById("copilot-input");
  const log = document.getElementById("copilot-log");
  const send = document.getElementById("copilot-send");
  if (!input || !log) return;
  function ask(text) {
    const q = (text || input.value).trim();
    if (!q) return;
    const ans = copilotAnswer(q);
    log.insertAdjacentHTML("beforeend", `
      <div class="chat-row user"><div class="chat-bubble user">${esc(q)}</div></div>
      <div class="chat-row"><span class="avatar avatar-sm" style="background:#171310">✦</span><div class="chat-bubble">${esc(ans.a)}<div class="mt-2 flex items-center gap-2">${confidenceBadge(ans.c)}<span class="text-xs text-3">Sources: P&L · bank feed · AR ledger</span></div></div></div>`);
    input.value = "";
    log.scrollTop = log.scrollHeight;
  }
  send.addEventListener("click", () => ask());
  input.addEventListener("keydown", e => { if (e.key === "Enter") ask(); });
  document.querySelectorAll("[data-copilot-q]").forEach(b => b.addEventListener("click", () => ask(b.dataset.copilotQ)));
}

/* Forecast: sliders -> runway recompute */
function bindForecast() {
  const rev = document.getElementById("fc-rev"), cost = document.getElementById("fc-cost"), hire = document.getElementById("fc-hire");
  if (!rev) return;
  function update() {
    const r = parseInt(rev.value, 10), c = parseInt(cost.value, 10), h = parseInt(hire.value, 10);
    document.getElementById("fc-rev-val").textContent = (r >= 0 ? "+" : "") + r + "%";
    document.getElementById("fc-cost-val").textContent = (c >= 0 ? "+" : "") + c + "%";
    document.getElementById("fc-hire-val").textContent = h + " hires";
    const monthlyRev = 412850 * (1 + r / 100);
    const monthlyCost = 356220 * (1 + c / 100) + h * 8400;
    const net = monthlyRev - monthlyCost;
    const runway = net >= 0 ? "∞ (cash-positive)" : Math.max(1, Math.round(1284600 / -net * 10) / 10) + " months";
    document.getElementById("fc-net").textContent = fmt.money(Math.round(net)) + "/mo";
    document.getElementById("fc-runway").textContent = runway;
    const bar = document.getElementById("fc-net-bar");
    if (bar) bar.style.width = Math.min(100, Math.abs(net) / 1200) + "%";
  }
  [rev, cost, hire].forEach(el => el.addEventListener("input", update));
  update();
}

/* ---------- Global chrome ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("reconly-theme");
  if (saved) document.documentElement.dataset.theme = saved;

  document.getElementById("theme-toggle").addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("reconly-theme", next);
    toast("Theme: " + next + " mode", "info");
  });

  const sidebar = document.getElementById("sidebar"), scrim = document.getElementById("scrim");
  document.getElementById("nav-toggle").addEventListener("click", () => { sidebar.classList.toggle("open"); scrim.classList.toggle("show"); });
  scrim.addEventListener("click", () => { sidebar.classList.remove("open"); scrim.classList.remove("show"); });

  document.getElementById("ws-switcher").addEventListener("click", () => {
    openModal("Switch workspace", `
      <div class="flex flex-col gap-2">
        <button class="btn btn-secondary" style="justify-content:flex-start" onclick="closeModal();toast('Already in Arcadia Systems','info')">${avatarHtml("Arcadia Systems", "sm")} Arcadia Systems <span class="badge badge-success" style="margin-left:auto">Current</span></button>
        <button class="btn btn-secondary" style="justify-content:flex-start" onclick="closeModal();toast('Demo data only — one workspace included','info')">${avatarHtml("Northwind Studio", "sm")} Northwind Studio <span class="text-sm text-3" style="margin-left:auto">Client books</span></button>
        <button class="btn btn-secondary" style="justify-content:flex-start" onclick="closeModal();toast('Workspace creation is disabled in the demo','warning')">＋ Create workspace</button>
      </div>`);
  });

  document.getElementById("new-invoice-btn").addEventListener("click", () => {
    openModal("New invoice", `
      <div class="grid grid-2">
        ${fieldHtml("Customer", `<select class="select" id="ni-customer">${DATA.customers.map(c => `<option>${esc(c.name)}</option>`).join("")}</select>`)}
        ${fieldHtml("Amount (USD)", `<input class="input" id="ni-amount" type="number" placeholder="0.00">`)}
      </div>
      ${fieldHtml("Description", `<input class="input" id="ni-desc" placeholder="Platform subscription — annual">`)}
      <div class="grid grid-2">
        ${fieldHtml("Issue date", `<input class="input" type="date" value="2026-11-11">`)}
        ${fieldHtml("Terms", `<select class="select"><option>Net 30</option><option>Net 14</option><option>Due on receipt</option></select>`)}
      </div>`,
      `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
       <button class="btn btn-secondary" onclick="closeModal();toast('Draft INV-2052 saved','success')">Save draft</button>
       <button class="btn btn-primary" onclick="closeModal();toast('Invoice sent — AI will track it to payment','success')">Send invoice</button>`);
  });

  const paletteItems = [
    ...Object.keys(window.AD.screens).map(r => ({ label: (TITLES[r] || [r])[0], sub: "Screen", run: () => { location.hash = "#/" + r; } })),
    { label: "Create invoice", sub: "Action", run: () => document.getElementById("new-invoice-btn").click() },
    { label: "Toggle dark mode", sub: "Action", run: () => document.getElementById("theme-toggle").click() },
    { label: "Ask the AI copilot", sub: "Action", run: () => { location.hash = "#/copilot"; } }
  ];
  function openPalette() {
    openModal("Command palette", `
      <input class="input" id="palette-input" placeholder="Type a command or search…" style="margin-bottom:12px">
      <div class="flex flex-col gap-2" id="palette-list"></div>`, null, "lg");
    const input = document.getElementById("palette-input");
    const list = document.getElementById("palette-list");
    function draw() {
      const q = input.value.toLowerCase();
      const hits = paletteItems.filter(i => i.label.toLowerCase().includes(q)).slice(0, 8);
      list.innerHTML = hits.map((i, ix) => `<button class="btn btn-secondary" style="justify-content:flex-start" data-pal="${ix}">${esc(i.label)}<span class="text-sm text-3" style="margin-left:auto">${esc(i.sub)}</span></button>`).join("") || `<p class="text-sm text-3" style="padding:8px">No matches.</p>`;
      list.querySelectorAll("[data-pal]").forEach((b, ix) => b.addEventListener("click", () => { closeModal(); hits[ix].run(); }));
    }
    input.addEventListener("input", draw);
    draw();
    input.focus();
  }
  document.getElementById("cmdk-btn").addEventListener("click", openPalette);
  document.addEventListener("keydown", e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openPalette(); }
    if (e.key === "Escape") { closeModal(); closeDrawer(); }
    if (e.key === "/" && !/input|textarea|select/i.test(document.activeElement.tagName)) {
      e.preventDefault();
      const s = document.getElementById("topbar-search");
      if (s) s.focus();
    }
  });

  document.getElementById("topbar-search").addEventListener("keydown", e => {
    if (e.key === "Enter") location.hash = "#/search";
  });

  window.addEventListener("hashchange", render);
  render();
});
