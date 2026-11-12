/* ============================================================
   AgentDesk — App shell
   Hash router (37 screens), theme toggle, command palette
   (Cmd+K), data-table wiring, inbox filters, new-ticket modal,
   copilot playground streaming effect.
   ============================================================ */

(function () {
  const { DATA, fmt } = window.AD;
  const M = DATA.metrics;

  /* ---------------- Routes ---------------- */
  // shell: "app" = sidebar + topbar; "full" = standalone page (auth/landing/pricing/404)
  const ROUTES = [
    { path: "overview", title: "Command Center", fn: () => ScreensA.overview(), nav: "overview", shell: "app" },
    { path: "fleet", title: "AI Agent Fleet", fn: () => ScreensA.fleet(), nav: "fleet", shell: "app" },
    { path: "agent/:id", title: "Agent detail", fn: p => ScreensA.agentDetail(p.id), nav: "fleet", shell: "app" },
    { path: "inbox", title: "Inbox", fn: () => ScreensA.inbox(), nav: "inbox", shell: "app" },
    { path: "ticket/:id", title: "Ticket", fn: p => ScreensA.ticketDetail(p.id), nav: "inbox", shell: "app" },
    { path: "triage", title: "AI Triage & Automation", fn: () => ScreensA.triage(), nav: "triage", shell: "app" },
    { path: "playground", title: "AI Copilot Playground", fn: () => ScreensA.playground(), nav: "playground", shell: "app" },
    { path: "kb", title: "Knowledge Base", fn: () => ScreensA.kb(), nav: "kb", shell: "app" },
    { path: "article/:id", title: "Article", fn: p => ScreensA.article(p.id), nav: "kb", shell: "app" },
    { path: "customers", title: "Customers", fn: () => ScreensA.customers(), nav: "customers", shell: "app" },
    { path: "customer/:id", title: "Customer 360", fn: p => ScreensA.customer360(p.id), nav: "customers", shell: "app" },
    { path: "teams", title: "Teams & Agents", fn: () => ScreensA.teams(), nav: "teams", shell: "app" },
    { path: "analytics/support", title: "Analytics — Support", fn: () => ScreensA.analyticsSupport(), nav: "analytics-support", shell: "app" },
    { path: "analytics/ai", title: "Analytics — AI", fn: () => ScreensA.analyticsAI(), nav: "analytics-ai", shell: "app" },
    { path: "sla", title: "SLA & Escalations", fn: () => ScreensB.sla(), nav: "sla", shell: "app" },
    { path: "macros", title: "Macros & Canned Responses", fn: () => ScreensB.macros(), nav: "macros", shell: "app" },
    { path: "workflows", title: "Workflows", fn: () => ScreensB.workflows(), nav: "workflows", shell: "app" },
    { path: "channels", title: "Channels", fn: () => ScreensB.channels(), nav: "channels", shell: "app" },
    { path: "csat", title: "CSAT & Feedback", fn: () => ScreensB.csat(), nav: "csat", shell: "app" },
    { path: "reports", title: "Reports & Exports", fn: () => ScreensB.reports(), nav: "reports", shell: "app" },
    { path: "search", title: "Search", fn: () => ScreensB.search(), nav: "inbox", shell: "app" },
    { path: "notifications", title: "Notifications", fn: () => ScreensB.notifications(), nav: "inbox", shell: "app" },
    { path: "settings/workspace", title: "Settings — Workspace", fn: () => ScreensB.settingsWorkspace(), nav: "settings-workspace", shell: "app" },
    { path: "settings/ai", title: "Settings — AI Models", fn: () => ScreensB.settingsAI(), nav: "settings-ai", shell: "app" },
    { path: "settings/roles", title: "Settings — Roles", fn: () => ScreensB.settingsRoles(), nav: "settings-roles", shell: "app" },
    { path: "settings/billing", title: "Settings — Billing", fn: () => ScreensB.settingsBilling(), nav: "settings-billing", shell: "app" },
    { path: "auth/signin", title: "Sign in", fn: () => ScreensB.authSignin(), nav: null, shell: "full" },
    { path: "auth/signup", title: "Sign up", fn: () => ScreensB.authSignup(), nav: null, shell: "full" },
    { path: "auth/forgot", title: "Forgot password", fn: () => ScreensB.authForgot(), nav: null, shell: "full" },
    { path: "empty/tickets", title: "No tickets", fn: () => ScreensB.emptyTickets(), nav: "inbox", shell: "app" },
    { path: "empty/agents", title: "No AI agents", fn: () => ScreensB.emptyAgents(), nav: "fleet", shell: "app" },
    { path: "empty/kb", title: "No articles", fn: () => ScreensB.emptyKb(), nav: "kb", shell: "app" },
    { path: "404", title: "Page not found", fn: () => ScreensB.error404(), nav: null, shell: "full" },
    { path: "landing", title: "AgentDesk — AI Support Operations", fn: () => ScreensB.landing(), nav: null, shell: "full" },
    { path: "pricing", title: "Pricing", fn: () => ScreensB.pricing(), nav: null, shell: "full" },
    { path: "onboarding", title: "Onboarding", fn: () => ScreensC.onboarding(), nav: null, shell: "full" },
    { path: "maintenance", title: "Maintenance", fn: () => ScreensC.maintenance(), nav: null, shell: "full" }
  ];

  function matchRoute(hash) {
    const parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    for (const r of ROUTES) {
      const rp = r.path.split("/");
      if (rp.length !== parts.length) continue;
      const params = {};
      let ok = true;
      for (let i = 0; i < rp.length; i++) {
        if (rp[i].startsWith(":")) params[rp[i].slice(1)] = decodeURIComponent(parts[i]);
        else if (rp[i] !== parts[i]) { ok = false; break; }
      }
      if (ok) return { route: r, params };
    }
    return { route: ROUTES.find(r => r.path === "404"), params: {} };
  }

  function render() {
    const { route, params } = matchRoute(location.hash || "#/overview");
    const screen = document.getElementById("screen");
    const app = document.getElementById("app");
    if (route.shell === "full") {
      app.classList.add("full-page");
      document.querySelector(".sidebar").style.display = "none";
      document.querySelector(".topbar").style.display = "none";
      screen.style.maxWidth = "none";
      screen.style.padding = "0";
    } else {
      app.classList.remove("full-page");
      document.querySelector(".sidebar").style.display = "";
      document.querySelector(".topbar").style.display = "";
      screen.style.maxWidth = "";
      screen.style.padding = "";
    }
    try {
      screen.innerHTML = route.fn(params);
    } catch (e) {
      console.error(e);
      screen.innerHTML = `<div class="empty"><div class="empty-art">⚠</div><h3>Something went wrong rendering this screen</h3><p>${e.message}</p><a class="btn" href="#/overview">Back to Command Center</a></div>`;
    }
    document.title = route.title + " — AgentDesk";
    const crumb = document.getElementById("crumb-current");
    if (crumb) crumb.textContent = route.title;
    document.querySelectorAll(".nav-item[data-route]").forEach(a => {
      a.classList.toggle("active", a.dataset.route === route.nav);
    });
    document.getElementById("sidebar").classList.remove("open");
    bindTables();
    window.scrollTo(0, 0);
    updateNavCounts();
  }

  function updateNavCounts() {
    const open = document.getElementById("nav-open-count");
    if (open) open.textContent = M.openTickets;
    const sla = document.getElementById("nav-sla-count");
    if (sla) sla.textContent = M.slaRisk;
  }

  /* ---------------- Data tables ---------------- */
  function bindTables() {
    document.querySelectorAll("[data-table-search]").forEach(input => {
      const tid = input.dataset.tableSearch;
      input.addEventListener("input", () => {
        const t = window.AD.tables[tid];
        if (!t) return;
        t.query = input.value; t.page = 1;
        window.AD.renderTablePage(tid);
      });
    });
    document.querySelectorAll("th.sortable[data-sort]").forEach(th => {
      th.addEventListener("click", () => {
        const card = th.closest("[data-table]");
        if (!card) return;
        const tid = card.dataset.table;
        const t = window.AD.tables[tid];
        if (!t) return;
        const key = th.dataset.sort;
        if (t.sortKey === key) t.sortDir = t.sortDir === "asc" ? "desc" : "asc";
        else { t.sortKey = key; t.sortDir = "asc"; }
        window.AD.renderTablePage(tid);
      });
    });
    Object.keys(window.AD.tables).forEach(tid => window.AD.renderTablePage(tid));
  }

  document.addEventListener("click", e => {
    const goto = e.target.closest("[data-table-goto]");
    if (goto) {
      const [tid, page] = goto.dataset.tableGoto.split(":");
      const t = window.AD.tables[tid];
      if (t) { t.page = parseInt(page, 10); window.AD.renderTablePage(tid); }
    }
  });

  /* ---------------- Inbox filters ---------------- */
  window.ADFilterInbox = function (status) {
    const t = window.AD.tables["inbox"];
    if (!t) return;
    t.rows = status === "all" ? DATA.tickets.slice() : DATA.tickets.filter(x => x.status === status);
    t.page = 1;
    window.AD.renderTablePage("inbox");
  };
  window.ADFilterChannel = function (channel) {
    const t = window.AD.tables["inbox"];
    if (!t) return;
    t.rows = channel === "all" ? DATA.tickets.slice() : DATA.tickets.filter(x => x.channel === channel);
    t.page = 1;
    window.AD.renderTablePage("inbox");
  };

  /* ---------------- New ticket modal ---------------- */
  window.ADNewTicket = function () {
    const custOpts = DATA.customers.map(c => `<option>${c.name}</option>`).join("");
    const aiOpts = DATA.aiAgents.map(a => `<option>${a.name} (AI)</option>`).join("");
    const humanOpts = DATA.humans.map(h => `<option>${h.name}</option>`).join("");
    window.AD.openModal("New ticket", `
      <div class="flex flex-col gap-4">
        <div class="field"><label>Subject</label><input class="input" id="nt-subject" placeholder="Brief summary of the issue"></div>
        <div class="grid grid-2">
          <div class="field"><label>Customer</label><select class="select">${custOpts}</select></div>
          <div class="field"><label>Channel</label><select class="select"><option>Email</option><option>Live Chat</option><option>Voice</option><option>Social</option></select></div>
        </div>
        <div class="grid grid-2">
          <div class="field"><label>Priority</label><select class="select"><option>Normal</option><option>Low</option><option>High</option><option>Urgent</option></select></div>
          <div class="field"><label>Assignee</label><select class="select">${aiOpts}${humanOpts}</select></div>
        </div>
        <div class="field"><label>Description</label><textarea class="textarea" placeholder="What does the customer need?"></textarea></div>
        <label class="checkbox-row"><input type="checkbox" checked> Let the AI triage and draft the first reply</label>
      </div>`,
      `<button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
       <button class="btn" onclick="closeModal(); toast('Ticket AD-1043 created and assigned — AI is drafting the first reply','success')">Create ticket</button>`);
  };

  /* ---------------- Theme ---------------- */
  function initTheme() {
    const saved = localStorage.getItem("agentdesk-theme");
    const theme = saved || "dark";
    document.documentElement.setAttribute("data-theme", theme);
    syncThemeIcon();
  }
  function syncThemeIcon() {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;
    btn.textContent = document.documentElement.getAttribute("data-theme") === "dark" ? "☾" : "☀";
  }
  document.getElementById("theme-toggle").addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("agentdesk-theme", next);
    syncThemeIcon();
    render(); // re-render charts with the new theme palette
  });

  /* ---------------- Command palette (Cmd+K) ---------------- */
  const PALETTE_ITEMS = [
    { group: "Navigate", label: "Go to Command Center", hint: "Screen", run: () => location.hash = "#/overview" },
    { group: "Navigate", label: "Go to Inbox", hint: "Screen", run: () => location.hash = "#/inbox" },
    { group: "Navigate", label: "Go to AI Agent Fleet", hint: "Screen", run: () => location.hash = "#/fleet" },
    { group: "Navigate", label: "Go to AI Copilot Playground", hint: "Screen", run: () => location.hash = "#/playground" },
    { group: "Navigate", label: "Go to Analytics — AI", hint: "Screen", run: () => location.hash = "#/analytics/ai" },
    { group: "Navigate", label: "Go to Knowledge Base", hint: "Screen", run: () => location.hash = "#/kb" },
    { group: "Navigate", label: "Go to Customers", hint: "Screen", run: () => location.hash = "#/customers" },
    { group: "Navigate", label: "Go to Settings — Billing", hint: "Screen", run: () => location.hash = "#/settings/billing" },
    { group: "Actions", label: "Create a new ticket", hint: "Action", run: () => ADNewTicket() },
    { group: "Actions", label: "Toggle light / dark theme", hint: "Action", run: () => document.getElementById("theme-toggle").click() },
    { group: "Actions", label: "Draft an article with AI", hint: "Action", run: () => { location.hash = "#/kb"; toast("AI drafted 2 new articles — review them below", "success"); } }
  ];
  DATA.tickets.slice(0, 6).forEach(t => PALETTE_ITEMS.push({ group: "Tickets", label: t.id + " — " + t.subject, hint: t.status, run: () => location.hash = "#/ticket/" + t.id }));
  DATA.customers.slice(0, 5).forEach(c => PALETTE_ITEMS.push({ group: "Customers", label: c.name + " — " + c.plan, hint: "Customer", run: () => location.hash = "#/customer/" + c.id }));
  DATA.kb.slice(0, 5).forEach(a => PALETTE_ITEMS.push({ group: "Knowledge Base", label: a.title, hint: a.category, run: () => location.hash = "#/article/" + a.id }));

  let cmdkIndex = 0, cmdkFiltered = PALETTE_ITEMS;
  window.openCmdk = function () {
    const root = document.getElementById("cmdk-root");
    root.innerHTML = `<div class="cmdk-backdrop" id="cmdk-backdrop">
      <div class="cmdk" role="dialog" aria-label="Command palette">
        <div class="cmdk-input"><span>⌕</span><input id="cmdk-input" placeholder="Search tickets, customers, articles, screens…" autocomplete="off"><span class="kbd">esc</span></div>
        <div class="cmdk-list" id="cmdk-list"></div>
      </div></div>`;
    const input = document.getElementById("cmdk-input");
    const renderList = () => {
      const q = input.value.toLowerCase();
      cmdkFiltered = PALETTE_ITEMS.filter(i => !q || i.label.toLowerCase().includes(q) || i.group.toLowerCase().includes(q));
      cmdkIndex = 0;
      let html = "", lastGroup = "";
      cmdkFiltered.slice(0, 12).forEach((item, i) => {
        if (item.group !== lastGroup) { html += `<div class="cmdk-group">${item.group}</div>`; lastGroup = item.group; }
        html += `<div class="cmdk-item ${i === cmdkIndex ? "active" : ""}" data-cmdk="${i}"><span class="grow">${item.label}</span><span class="text-xs text-3">${item.hint}</span></div>`;
      });
      document.getElementById("cmdk-list").innerHTML = html || `<div class="cmdk-item">No results for “${input.value}”.</div>`;
    };
    renderList();
    input.addEventListener("input", renderList);
    input.addEventListener("keydown", e => {
      if (e.key === "ArrowDown") { e.preventDefault(); cmdkIndex = Math.min(cmdkFiltered.length - 1, cmdkIndex + 1); renderList(); }
      if (e.key === "ArrowUp") { e.preventDefault(); cmdkIndex = Math.max(0, cmdkIndex - 1); renderList(); }
      if (e.key === "Enter" && cmdkFiltered[cmdkIndex]) { closeCmdk(); cmdkFiltered[cmdkIndex].run(); }
      if (e.key === "Escape") closeCmdk();
    });
    document.getElementById("cmdk-list").addEventListener("click", e => {
      const item = e.target.closest("[data-cmdk]");
      if (item) { closeCmdk(); cmdkFiltered[parseInt(item.dataset.cmdk, 10)].run(); }
    });
    document.getElementById("cmdk-backdrop").addEventListener("click", e => { if (e.target.id === "cmdk-backdrop") closeCmdk(); });
    input.focus();
  };
  function closeCmdk() { document.getElementById("cmdk-root").innerHTML = ""; }
  document.addEventListener("keydown", e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openCmdk(); }
    if (e.key === "Escape") closeCmdk();
  });

  /* ---------------- Copilot playground streaming ---------------- */
  window.ADRunPlayground = function () {
    const out = document.getElementById("pg-output");
    const prompt = document.getElementById("pg-prompt");
    if (!out) return;
    const full = "Hi — thanks for flagging this. I can see the duplicate charge on your invoice. I have already raised a refund for the extra amount; it should reach your card within 3–5 business days. Your plan itself is correct, and I have flagged the proration so it does not happen again. " +
      (prompt && prompt.value ? "Drafted from your prompt: “" + prompt.value.slice(0, 80) + "”." : "");
    out.textContent = "";
    out.classList.add("typing-caret");
    let i = 0;
    const tick = () => {
      out.textContent = full.slice(0, i);
      i += 3;
      if (i <= full.length) setTimeout(tick, 12);
      else out.classList.remove("typing-caret");
    };
    tick();
    window.AD.toast("Copilot run finished — 1,840 tokens · $0.18", "success");
  };

  /* ---------------- Boot ---------------- */
  window.addEventListener("hashchange", render);
  initTheme();
  if (!location.hash) location.hash = "#/overview";
  render();
})();
