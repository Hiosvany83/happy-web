/* ============================================================
   AgentDesk — Screens B (15–37 of 37)
   Each function returns an HTML string. All numbers come from
   DATA / DATA.metrics — never hard-coded twice.
   ============================================================ */

const ScreensB = (() => {
  const { DATA, fmt, avatarColor } = window.AD;
  const { esc, badge, statusBadge, priorityBadge, channelBadge, sentimentBadge, confidenceBadge,
    avatarHtml, avatarStack, statCard, progressBar, slaTimer, toggleInput, fieldHtml, sectionCard,
    dataTable, openModal, closeModal, openDrawer, closeDrawer, toast, emptyState, copilotPanel,
    legend, kbd } = window.AD;
  const { svgLine, svgLineDual, svgBars, svgDonut, svgGauge, sparkline } = window.ADCharts;
  const M = DATA.metrics;
  const S = DATA.series14;

  function pageHead(title, sub, actions) {
    return `<div class="page-head"><div><h1>${esc(title)}</h1><div class="page-sub">${esc(sub)}</div></div>
      <div class="flex gap-2">${actions || ""}</div></div>`;
  }

  function ticketLink(t) { return `<a href="#/ticket/${t.id}" class="mono font-semibold">${t.id}</a>`; }

  function marketingNav() {
    return `<div class="marketing-nav">
      <a href="#/landing" class="flex items-center gap-2 font-bold text-lg"><span class="ai-chip">✦</span> AgentDesk</a>
      <div class="links"><a href="#/landing">Features</a><a href="#/pricing">Pricing</a><a href="#/kb">Docs</a></div>
      <div style="margin-left:auto" class="flex gap-2">
        <a href="#/auth/signin" class="btn btn-ghost btn-sm">Sign in</a>
        <a href="#/auth/signup" class="btn btn-sm">Get started</a>
      </div>
    </div>`;
  }

  function marketingFoot() {
    return `<div class="marketing-foot">AgentDesk · AI support operations · <a href="#/pricing">Pricing</a> · <a href="#/kb">Docs</a> · <a href="#/auth/signin">Sign in</a><br><span class="text-sm">Fictional demo template — all data on this page is invented.</span></div>`;
  }

  /* ============ 15. SLA & Escalations ============ */
  function sla() {
    const atRisk = DATA.tickets.filter(t => t.slaRisk).sort((a, b) => a.slaMin - b.slaMin);
    const breached = DATA.tickets.filter(t => t.slaMin < 0).length;
    const totalBreaches = DATA.slaPolicies.reduce((a, p) => a + p.breaches, 0);
    const onCall = [
      { days: "Mon – Wed", who: "Mara Jensen", role: "Support Lead", shift: "09:00 – 17:00 UTC" },
      { days: "Thu – Fri", who: "Diego Fuentes", role: "Senior Agent", shift: "09:00 – 17:00 UTC" },
      { days: "Weekend", who: "Kenji Watanabe", role: "Technical Agent", shift: "01:00 – 09:00 UTC" }
    ];
    const path = [
      { step: "1. AI triage", text: "The AI drafts a reply and checks confidence. Below 75% it escalates instead of replying." },
      { step: "2. On-call agent", text: "The on-call agent picks the ticket up within the plan's first-response target." },
      { step: "3. Support Lead", text: "If the clock hits 50% remaining, the Support Lead is paged in #support-alerts." },
      { step: "4. Engineering escalation", text: "Technical breaches go to engineering with logs attached, and the customer gets a status update." }
    ];
    return pageHead("SLA & Escalations", "Policies by plan · " + M.slaRisk + " tickets at risk · " + M.slaCompliance + "% compliance this cycle", `
      <button class="btn btn-secondary" onclick="toast('SLA report export started','success')">Export SLA report</button>
      <button class="btn" onclick="toast('New SLA policy draft created','success')">+ New policy</button>`) + `
    <div class="stat-grid mb-4">
      ${statCard({ label: "SLA compliance", value: M.slaCompliance + "%", delta: "1.2 pts up", deltaDir: "up", sub: "target: 95%+", icon: "⏱" })}
      ${statCard({ label: "Tickets at risk", value: M.slaRisk, delta: "1 breached", deltaDir: "down", deltaGood: false, sub: "sorted by SLA clock below", icon: "⚠", accent: "#f59e0b" })}
      ${statCard({ label: "Breached now", value: breached, sub: "first response overdue", icon: "🔴", accent: "#ef4444" })}
      ${statCard({ label: "Breaches this cycle", value: totalBreaches, sub: "across all 4 plans", icon: "📋" })}
      ${statCard({ label: "Avg first response", value: M.firstResponseMin + " min", delta: "0.4 min faster", deltaDir: "up", sub: "target: under 5 min", icon: "⚡" })}
    </div>
    <div class="grid col-7-5 mb-4">
      <div class="card">
        <div class="card-head"><div><h3>SLA policies by plan</h3><div class="text-sm text-3">First response and resolution targets, with compliance this cycle</div></div></div>
        <div class="table-wrap"><table class="data"><thead><tr><th>Plan</th><th>First response</th><th>Resolution</th><th>Compliance</th><th>Breaches</th><th></th></tr></thead>
        <tbody>${DATA.slaPolicies.map(p => `<tr>
          <td>${badge(p.plan, p.plan === "Enterprise" ? "brand" : p.plan === "Scale" ? "info" : "neutral")}</td>
          <td>${p.firstResponseMin >= 60 ? (p.firstResponseMin / 60) + " h" : p.firstResponseMin + " min"}</td>
          <td>${p.resolutionH} h</td>
          <td><div class="flex items-center gap-2" style="min-width:140px">${progressBar(p.compliance, "success")}<b>${p.compliance}%</b></div></td>
          <td>${p.breaches}</td>
          <td><button class="btn btn-ghost btn-sm" onclick="toast('Editing ${p.plan} SLA policy (demo action)','info')">Edit</button></td></tr>`).join("")}</tbody></table></div>
      </div>
      <div class="flex flex-col gap-4">
        <div class="card card-pad">
          <h3 class="mb-3">On-call this week</h3>
          <div class="stat-list">
            ${onCall.map(o => `<div class="row"><span>${o.days}<br><span class="text-xs text-3">${o.shift}</span></span><b>${o.who}<br><span class="text-xs text-3" style="font-weight:400">${o.role}</span></b></div>`).join("")}
          </div>
          <div class="divider"></div>
          <button class="btn btn-secondary btn-sm" style="width:100%" onclick="toast('On-call schedule exported','success')">View full rota →</button>
        </div>
        <div class="card card-pad">
          <h3 class="mb-3">Escalation path</h3>
          ${path.map(p => `<div class="mb-3"><div class="text-sm font-semibold">${esc(p.step)}</div><p class="text-sm text-2" style="line-height:1.6">${esc(p.text)}</p></div>`).join("")}
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-head"><div><h3>At-risk &amp; breached tickets</h3><div class="text-sm text-3">${atRisk.length} tickets inside or past their SLA window — sorted by time left</div></div>
      <a href="#/inbox" class="text-sm font-semibold">View inbox →</a></div>
      <div class="table-wrap"><table class="data"><thead><tr><th>Ticket</th><th>Subject</th><th>Customer</th><th>Plan</th><th>Priority</th><th>Assignee</th><th>SLA</th><th>Status</th></tr></thead>
      <tbody>${atRisk.map(t => `<tr>
        <td>${ticketLink(t)}</td>
        <td><div class="truncate" style="max-width:300px">${esc(t.subject)}</div></td>
        <td>${esc(t.customer)}</td><td>${badge(t.plan, "neutral")}</td>
        <td>${priorityBadge(t.priority)}</td><td>${esc(t.assignee)}</td>
        <td>${slaTimer(t.slaMin)}</td><td>${statusBadge(t.status)}</td></tr>`).join("")}</tbody></table></div>
    </div>`;
  }

  /* ============ 16. Macros & Canned Responses ============ */
  function macros() {
    const totalUses = DATA.macros.reduce((a, m) => a + m.uses, 0);
    const aiCount = DATA.macros.filter(m => m.aiGenerated).length;
    const top = DATA.macros.slice().sort((a, b) => b.uses - a.uses)[0];
    const cats = ["All", ...new Set(DATA.macros.map(m => m.category))];
    const cols = [
      { key: "name", label: "Macro", render: r => `<div class="font-semibold">${esc(r.name)}</div><div class="text-xs text-3">${esc(r.category)}</div>`, search: r => r.name + " " + r.category },
      { key: "category", label: "Category", render: r => badge(r.category, "neutral") },
      { key: "uses", label: "Uses", render: r => fmt.num(r.uses) },
      { key: "aiGenerated", label: "Source", render: r => r.aiGenerated ? badge("AI generated", "ai") : badge("Human", "neutral") },
      { key: "updated", label: "Updated", render: r => esc(r.updated) },
      { key: "id", label: "", render: r => `<div class="flex gap-2"><button class="btn btn-ghost btn-sm" onclick="toast('Macro inserted into the composer','success')">Use</button><button class="btn btn-ghost btn-sm" onclick="toast('Editing macro (demo action)','info')">Edit</button></div>`, sortable: false }
    ];
    window.AD.tables["macros"] = { columns: cols, rows: DATA.macros.slice(), page: 1, pageSize: 8, sortKey: "uses", sortDir: "desc", query: "" };
    return pageHead("Macros & Canned Responses", "Reusable replies your team sends in one click — " + M.macrosUsed + " uses this cycle", `
      <button class="btn btn-ai" onclick="toast('AI is drafting 3 new macros from recent tickets','info')">✦ Generate with AI</button>
      <button class="btn" onclick="toast('New macro editor opened (demo action)','info')">+ New macro</button>`) + `
    <div class="stat-grid mb-4">
      ${statCard({ label: "Total macros", value: DATA.macros.length, sub: "across " + cats.length + " categories", icon: "📄" })}
      ${statCard({ label: "Total uses", value: fmt.num(totalUses), sub: "this cycle", icon: "⚡" })}
      ${statCard({ label: "AI-generated", value: aiCount + " / " + DATA.macros.length, sub: "written by the copilot", icon: "✦" })}
      ${statCard({ label: "Most used", value: fmt.num(top.uses), sub: top.name, icon: "★" })}
    </div>
    <div class="flex gap-2 mb-4" style="flex-wrap:wrap">${cats.map((c, i) => `<button class="chip" ${i === 0 ? 'style="background:var(--brand-600);color:#fff;border-color:var(--brand-600)"' : ""} onclick="toast('Showing ${c === "All" ? "all" : c} macros','info')">${esc(c)}</button>`).join("")}</div>
    ${dataTable("macros", cols, DATA.macros, { pageSize: 8 })}`;
  }

  /* ============ 17. Workflows / Automation Builder ============ */
  function workflows() {
    const extra = [
      { id: "w-d1", name: "Auto-translate replies", trigger: "Ticket created", condition: "Language is not English", action: "Translate reply to customer language", status: "draft", runs: 0, success: null },
      { id: "w-d2", name: "Auto-close solved tickets", trigger: "Ticket solved", condition: "No reply for 7 days", action: "Close ticket, send CSAT survey", status: "draft", runs: 0, success: null },
      { id: "w-f1", name: "Sync to CRM", trigger: "Ticket solved", condition: "Customer has a CRM record", action: "Push resolution note to CRM", status: "failed", runs: 12, success: 0, note: "3 failures — CRM token expired" }
    ];
    const all = DATA.workflows.concat(extra);
    const cols = [
      { key: "name", title: "Active", items: all.filter(w => w.status === "active"), chip: "success" },
      { key: "name", title: "Paused", items: all.filter(w => w.status === "paused"), chip: "neutral" },
      { key: "name", title: "Draft", items: all.filter(w => w.status === "draft"), chip: "info" },
      { key: "name", title: "Failed", items: all.filter(w => w.status === "failed"), chip: "danger" }
    ];
    function wfCard(w) {
      return `<div class="kanban-card">
        <div class="flex items-center justify-between mb-2"><b class="text-sm">${esc(w.name)}</b>${statusBadge(w.status === "failed" ? "escalated" : w.status)}</div>
        <div class="text-xs text-3" style="line-height:1.6">${esc(w.trigger)} → ${esc(w.action)}</div>
        <div class="text-xs text-3 mt-2">${esc(w.condition)}</div>
        <div class="flex items-center gap-2 mt-3">
          <span class="text-xs"><b>${fmt.num(w.runs)}</b> runs</span>
          <span class="text-xs">· <b>${w.success === null ? "—" : w.success + "%"}</b> success</span>
          <button class="btn btn-ghost btn-sm" style="margin-left:auto" onclick="toast('Editing workflow (demo action)','info')">Edit</button>
        </div>
        ${w.note ? `<div class="text-xs mt-2" style="color:var(--danger-500)">⚠ ${esc(w.note)}</div>` : ""}
      </div>`;
    }
    return pageHead("Workflows / Automation Builder", "Rules that run themselves — " + DATA.workflows.filter(w => w.status === "active").length + " active · " + fmt.num(DATA.workflows.reduce((a, w) => a + w.runs, 0)) + " runs this cycle", `
      <button class="btn" onclick="toast('New workflow draft created','success')">+ New workflow</button>`) + `
    <div class="stat-grid mb-4">
      ${statCard({ label: "Active workflows", value: DATA.workflows.filter(w => w.status === "active").length, sub: "of " + DATA.workflows.length + " saved rules", icon: "⚙" })}
      ${statCard({ label: "Total runs", value: fmt.num(DATA.workflows.reduce((a, w) => a + w.runs, 0)), sub: "this cycle", icon: "▶" })}
      ${statCard({ label: "Avg success rate", value: Math.round(DATA.workflows.reduce((a, w) => a + w.success, 0) / DATA.workflows.length) + "%", sub: "across all rules", icon: "✓" })}
      ${statCard({ label: "Needs attention", value: 1, sub: "Sync to CRM failed 3 times", icon: "⚠", accent: "#ef4444" })}
    </div>
    <div class="kanban">
      ${cols.map(c => `<div class="kanban-col"><h4>${c.title} <span class="badge badge-${c.chip}">${c.items.length}</span></h4>${c.items.map(wfCard).join("") || `<div class="text-sm text-3" style="padding:12px 4px">No workflows here yet.</div>`}</div>`).join("")}
    </div>
    <p class="text-sm text-3 mt-4">Drafts and failed runs stay on the board until you publish, fix or delete them. <a href="#/triage">Triage rules</a> control the order in which rules are evaluated.</p>`;
  }

  /* ============ 18. Channels ============ */
  function channels() {
    const totalVol = DATA.channels.reduce((a, c) => a + c.volume, 0);
    const cards = DATA.channels.map(c => `<div class="card card-pad">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-3"><span style="font-size:26px">${c.icon}</span><div><div class="font-semibold text-lg">${esc(c.name)}</div><div class="text-sm text-3">${c.share}% of volume</div></div></div>
        ${statusBadge(c.status)}
      </div>
      <div class="stat-list">
        <div class="row"><span>Volume (14d)</span><b>${fmt.num(c.volume)} tickets</b></div>
        <div class="row"><span>Share</span><b>${c.share}%</b></div>
        <div class="row"><span>First response</span><b>${c.firstResponseMin} min</b></div>
        <div class="row"><span>CSAT</span><b>${c.csat} / 5</b></div>
      </div>
      <div class="mt-3 mb-4">${progressBar(c.share * 2, c.status === "degraded" ? "warning" : "success")}</div>
      <div class="flex items-center gap-3">
        ${toggleInput(c.status !== "degraded", "ch-" + c.id)}
        <span class="text-sm">${c.status === "degraded" ? "Degraded — reconnect needed" : "Connected"}</span>
        ${c.status === "degraded" ? `<button class="btn btn-secondary btn-sm" style="margin-left:auto" onclick="toast('Reconnecting Social / X — check the channel settings if this fails','info')">Reconnect</button>` : ""}
      </div>
    </div>`).join("");
    return pageHead("Channels", "Where tickets come from — " + fmt.num(totalVol) + " tickets in the last 14 days", `
      <button class="btn" onclick="toast('Channel setup opened (demo action)','info')">+ Connect a channel</button>`) + `
    <div class="grid grid-4 mb-4">${cards}</div>
    <div class="grid col-7-5 mb-4">
      <div class="card chart-card"><h4>Volume by channel</h4><div class="chart-sub">Tickets in the last 14 days · ${fmt.num(totalVol)} total</div>
        ${svgBars(DATA.channels.map(c => c.volume), DATA.channels.map(c => c.name.split(" ")[0]), { color: "#6366f1", highlight: 1 })}
        ${legend(DATA.channels.map(c => ({ color: "#6366f1", label: c.name + " — " + fmt.num(c.volume) + " (" + c.share + "%)" })))}
      </div>
      <div class="card card-pad">
        <h3 class="mb-2">⚠ Social / X is degraded</h3>
        <p class="text-sm text-2" style="line-height:1.65">Replies on Social / X are delayed — first response is ${DATA.channels.find(c => c.id === "ch-social").firstResponseMin} min against a ${M.firstResponseMin} min team average, and CSAT on the channel is ${DATA.channels.find(c => c.id === "ch-social").csat} / 5. The connection token likely expired.</p>
        <div class="divider"></div>
        <div class="stat-list">
          <div class="row"><span>Channel volume</span><b>${fmt.num(DATA.channels.find(c => c.id === "ch-social").volume)} tickets (7%)</b></div>
          <div class="row"><span>Last successful sync</span><b>Nov 7, 2026 · 22:41 UTC</b></div>
          <div class="row"><span>Queued replies</span><b>4 waiting</b></div>
        </div>
        <button class="btn btn-secondary btn-sm mt-4" onclick="toast('Reconnecting Social / X — check the channel settings if this fails','info')">Reconnect Social / X</button>
      </div>
    </div>`;
  }

  /* ============ 19. CSAT & Feedback ============ */
  function csat() {
    const dist = [5, 4, 3, 2, 1].map(star => ({ star, count: DATA.feedback.filter(f => f.rating === star).length }));
    const maxCount = Math.max(...dist.map(d => d.count), 1);
    const themes = {};
    DATA.feedback.forEach(f => { themes[f.theme] = (themes[f.theme] || 0) + 1; });
    const themeList = Object.entries(themes).sort((a, b) => b[1] - a[1]);
    const avg = (DATA.feedback.reduce((a, f) => a + f.rating, 0) / DATA.feedback.length).toFixed(1);
    const stars = n => "★".repeat(n) + "☆".repeat(5 - n);
    return pageHead("CSAT & Feedback", "What customers say after a ticket is solved — " + DATA.feedback.length + " surveys in the last 30 days", `
      <button class="btn btn-secondary" onclick="toast('Feedback export started — CSV will arrive by email','success')">Export feedback</button>`) + `
    <div class="stat-grid mb-4">
      ${statCard({ label: "CSAT", value: M.csat.toFixed(1) + " / 5", delta: "0.2 vs last month", deltaDir: "up", sub: "avg of " + DATA.feedback.length + " surveys", icon: "★" })}
      ${statCard({ label: "NPS", value: M.nps, delta: "4 pts vs last month", deltaDir: "up", sub: "promoters minus detractors", icon: "♥" })}
      ${statCard({ label: "5-star surveys", value: dist[0].count + " / " + DATA.feedback.length, sub: Math.round((dist[0].count / DATA.feedback.length) * 100) + "% of all surveys", icon: "★" })}
      ${statCard({ label: "Low ratings (≤ 2)", value: DATA.feedback.filter(f => f.rating <= 2).length, sub: "each opens a recovery task", icon: "⚠", accent: "#ef4444" })}
    </div>
    <div class="grid col-7-5 mb-4">
      <div class="card card-pad">
        <h3 class="mb-4">CSAT gauge</h3>
        <div class="flex items-center gap-6">
          ${svgGauge(Math.round((M.csat / 5) * 100), { label: "CSAT " + M.csat.toFixed(1) + " / 5", color: "#6366f1" })}
          <div>
            <div class="text-sm text-3 mb-2">Average rating <b style="color:var(--text)">${avg} / 5</b> across ${DATA.feedback.length} surveys</div>
            <div class="text-sm text-3">NPS <b style="color:var(--text)">${M.nps}</b> · Target CSAT 4.5 / 5</div>
            <div class="mt-3">${progressBar(Math.round((M.csat / 5) * 100), "success")}</div>
          </div>
        </div>
        <div class="divider"></div>
        <h3 class="mb-3">Rating distribution</h3>
        ${dist.map(d => `<div class="flex items-center gap-3 mb-2"><span class="text-sm" style="width:52px">${d.star} ★</span><div style="flex:1">${progressBar(Math.round((d.count / maxCount) * 100), d.star >= 4 ? "success" : d.star <= 2 ? "danger" : "warning")}</div><b class="text-sm" style="width:28px;text-align:right">${d.count}</b></div>`).join("")}
      </div>
      <div class="card card-pad">
        <h3 class="mb-2">✦ AI theme summary</h3>
        <p class="text-sm text-3 mb-4">The copilot grouped the ${DATA.feedback.length} surveys into ${themeList.length} themes. “Fast resolution” leads — customers notice speed first, tone second.</p>
        <div class="stat-list">
          ${themeList.map(([theme, count]) => `<div class="row"><span>${esc(theme)}</span><b>${count} mention${count === 1 ? "" : "s"} · ${Math.round((count / DATA.feedback.length) * 100)}%</b></div>`).join("")}
        </div>
        <div class="divider"></div>
        <p class="text-sm text-2" style="line-height:1.65"><b>Watch:</b> both “Escalation quality” mentions are 3 stars or lower — the VIP handoff lost context twice this week. The recovery workflow already creates a follow-up task for the Lead on any rating of 2 or less.</p>
        <a href="#/workflows" class="btn btn-secondary btn-sm mt-4">Review the recovery workflow →</a>
      </div>
    </div>
    <div class="card">
      <div class="card-head"><div><h3>Recent feedback</h3><div class="text-sm text-3">Newest first · ${DATA.feedback.length} surveys</div></div></div>
      <div class="card-body" style="padding-top:8px">
        ${DATA.feedback.map(f => `<div class="flex items-start gap-3" style="padding:14px 0;border-bottom:1px solid var(--border)">
          ${avatarHtml(f.customer, "")}
          <div class="grow">
            <div class="flex items-center gap-2" style="flex-wrap:wrap"><b>${esc(f.customer)}</b><span style="color:#f59e0b">${stars(f.rating)}</span>${badge(f.theme, "brand")}<span class="text-xs text-3">${esc(f.date)}</span></div>
            <p class="text-sm text-2 mt-1" style="line-height:1.6">“${esc(f.text)}”</p>
          </div>
          ${f.rating <= 2 ? `<button class="btn btn-secondary btn-sm" onclick="toast('Recovery task created for the Support Lead','success')">Start recovery</button>` : `<button class="btn btn-ghost btn-sm" onclick="toast('Thanks recorded for ${esc(f.customer)}','success')">Thank them</button>`}
        </div>`).join("")}
      </div>
    </div>`;
  }

  /* ============ 20. Reports & Exports ============ */
  function reports() {
    const cols = [
      { key: "name", label: "Report", render: r => `<div class="font-semibold">${esc(r.name)}</div><div class="text-xs text-3">${esc(r.cadence)}</div>`, search: r => r.name },
      { key: "cadence", label: "Cadence", render: r => esc(r.cadence) },
      { key: "format", label: "Format", render: r => badge(r.format, "neutral") },
      { key: "recipients", label: "Recipients", render: r => r.recipients + " people" },
      { key: "lastRun", label: "Last run", render: r => esc(r.lastRun) },
      { key: "id", label: "", render: r => `<button class="btn btn-secondary btn-sm" onclick="toast('Downloading ${esc(r.name)} (${esc(r.format)})','success')">Download</button>`, sortable: false }
    ];
    window.AD.tables["reports"] = { columns: cols, rows: DATA.reports.slice(), page: 1, pageSize: 8, sortKey: "lastRun", sortDir: "desc", query: "" };
    return pageHead("Reports & Exports", DATA.reports.length + " scheduled reports · " + DATA.reports.reduce((a, r) => a + r.recipients, 0) + " recipients in total", ``) + `
    <div class="grid col-7-5">
      <div>${dataTable("reports", cols, DATA.reports, { pageSize: 8 })}</div>
      <div class="card card-pad">
        <h3 class="mb-2">Schedule a report</h3>
        <p class="text-sm text-3 mb-4">Pick a report, a cadence and the people who should receive it. It runs automatically from then on.</p>
        ${fieldHtml("Report name", `<input class="input" placeholder="e.g. Weekly AI cost summary">`)}
        ${fieldHtml("Cadence", `<select class="select"><option>Daily · 07:00</option><option selected>Weekly · Mon 08:00</option><option>Weekly · Fri 17:00</option><option>Monthly · 1st</option></select>`)}
        ${fieldHtml("Format", `<select class="select"><option>PDF</option><option>CSV</option></select>`)}
        ${fieldHtml("Recipients", `<input class="input" placeholder="team@halcyon.app, lead@halcyon.app">`, "Comma-separated email addresses")}
        <button class="btn mt-4" style="width:100%" onclick="toast('Report scheduled — first run at the next cadence slot','success')">Create scheduled report</button>
      </div>
    </div>`;
  }

  /* ============ 21. Search / Command palette ============ */
  function search() {
    const topTickets = DATA.tickets.slice(0, 3);
    const topCustomers = DATA.customers.slice(0, 2);
    const topKb = DATA.kb.slice(0, 2);
    function cmdkItem(icon, main, sub, hint, href) {
      return `<a href="${href}" class="cmdk-item" style="text-decoration:none;color:inherit"><span>${icon}</span><span class="grow">${esc(main)}<div class="text-xs text-3">${esc(sub)}</div></span>${kbd(hint)}</a>`;
    }
    return pageHead("Search", "One place to jump anywhere in AgentDesk", ``) + `
    <div class="grid col-7-5">
      <div class="card card-pad">
        <div class="cmdk" style="width:100%">
          <div class="cmdk-input"><span>⌕</span><input placeholder="Search tickets, customers, articles…" value=""><span>${kbd("⌘ K")}</span></div>
          <div class="cmdk-list">
            <div class="cmdk-group">Actions</div>
            ${cmdkItem("＋", "Create a new ticket", "Open the ticket composer", "N", "#/inbox")}
            ${cmdkItem("✦", "Open AI Copilot Playground", "Test prompts before they reach customers", "P", "#/playground")}
            ${cmdkItem("⬇", "Export weekly report", "Support performance · PDF", "E", "#/reports")}
            <div class="cmdk-group">Tickets</div>
            ${topTickets.map(t => cmdkItem("📥", t.id + " — " + t.subject, t.customer + " · " + t.plan + " · " + t.status, "↵", "#/ticket/" + t.id)).join("")}
            <div class="cmdk-group">Customers</div>
            ${topCustomers.map(c => cmdkItem("🏢", c.name, c.contact + " · " + c.plan + " · " + fmt.money(c.mrr) + "/mo", "↵", "#/customer/" + c.id)).join("")}
            <div class="cmdk-group">Knowledge base</div>
            ${topKb.map(a => cmdkItem("📄", a.title, a.category + " · " + fmt.num(a.views) + " views", "↵", "#/article/" + a.id)).join("")}
          </div>
        </div>
        <p class="text-sm text-3 mt-4">Tip: press ${kbd("⌘ K")} anywhere in AgentDesk to open this palette. Use ↑ ↓ to move and ↵ to open a result.</p>
      </div>
      <div class="flex flex-col gap-4">
        <div class="card card-pad">
          <h3 class="mb-3">Recent searches</h3>
          <div class="flex gap-2" style="flex-wrap:wrap">
            ${["refund policy", "AD-1039", "SSO setup", "invoice charged twice", "webhook 502"].map(q => `<button class="chip" onclick="toast('Searching for ${esc(q)}','info')">⌕ ${esc(q)}</button>`).join("")}
          </div>
          <div class="divider"></div>
          <button class="btn btn-ghost btn-sm" onclick="toast('Search history cleared','info')">Clear history</button>
        </div>
        <div class="card card-pad">
          <h3 class="mb-2">What can I search?</h3>
          <div class="stat-list">
            <div class="row"><span>Tickets</span><b>${DATA.tickets.length} in queue</b></div>
            <div class="row"><span>Customers</span><b>${DATA.customers.length} accounts</b></div>
            <div class="row"><span>KB articles</span><b>${DATA.kb.length} articles</b></div>
            <div class="row"><span>Macros</span><b>${DATA.macros.length} replies</b></div>
          </div>
        </div>
      </div>
    </div>`;
  }

  /* ============ 22. Notifications ============ */
  function notifications() {
    const unread = DATA.notifications.filter(n => !n.read).length;
    const slaCount = DATA.notifications.filter(n => n.type === "sla").length;
    const aiCount = DATA.notifications.filter(n => n.type === "ai").length;
    const icons = { sla: "⏱", ai: "✦", csat: "★", billing: "$", kb: "📚", team: "👥" };
    return pageHead("Notifications", unread + " unread · newest first", `
      <button class="btn btn-secondary" onclick="toast('All notifications marked as read','success')">Mark all as read</button>`) + `
    <div class="tabs mb-4">
      <button class="tab active">All · ${DATA.notifications.length}</button>
      <button class="tab" onclick="toast('Showing unread notifications','info')">Unread · ${unread}</button>
      <button class="tab" onclick="toast('Showing SLA notifications','info')">SLA · ${slaCount}</button>
      <button class="tab" onclick="toast('Showing AI notifications','info')">AI · ${aiCount}</button>
    </div>
    <div class="card">
      <div class="card-body" style="padding-top:8px">
        ${DATA.notifications.map(n => `<div class="flex items-start gap-3" style="padding:14px 0;border-bottom:1px solid var(--border)">
          <span class="avatar ${n.type === "ai" ? "avatar-ai" : ""}" style="${n.type === "ai" ? "" : "background:var(--surface-3);color:var(--text-2)"}">${icons[n.type] || "•"}</span>
          <div class="grow">
            <div class="flex items-center gap-2"><b>${esc(n.title)}</b>${n.read ? "" : `<span style="width:8px;height:8px;border-radius:50%;background:var(--brand-600);display:inline-block" title="Unread"></span>`}<span class="text-xs text-3" style="margin-left:auto">${esc(n.time)}</span></div>
            <p class="text-sm text-2 mt-1" style="line-height:1.6">${esc(n.text)}</p>
          </div>
          <button class="btn btn-ghost btn-sm" onclick="toast('Notification marked as read','success')">${n.read ? "Read" : "Mark read"}</button>
        </div>`).join("")}
      </div>
      <div class="card-foot">Notifications are kept for 30 days. SLA and AI alerts also post to #support-alerts.</div>
    </div>`;
  }

  /* ============ 23. Settings — Workspace ============ */
  function settingsWorkspace() {
    const first5 = DATA.humans.slice(0, 5);
    const days = [
      { d: "Monday", on: true }, { d: "Tuesday", on: true }, { d: "Wednesday", on: true },
      { d: "Thursday", on: true }, { d: "Friday", on: true }, { d: "Saturday", on: false }, { d: "Sunday", on: false }
    ];
    return pageHead("Settings — Workspace", "Profile, business hours and your team", `
      <button class="btn" onclick="toast('Workspace settings saved','success')">Save changes</button>`) + `
    <div class="grid col-7-5 mb-4">
      <div class="flex flex-col gap-4">
        <div class="card card-pad">
          <h3 class="mb-4">Workspace profile</h3>
          ${fieldHtml("Workspace name", `<input class="input" value="Halcyon">`)}
          ${fieldHtml("Domain", `<input class="input" value="halcyon.app">`, "Your help center lives at help.halcyon.app")}
          ${fieldHtml("Timezone", `<select class="select"><option selected>UTC</option><option>Europe/Berlin (CET)</option><option>America/New_York (ET)</option><option>Asia/Tokyo (JST)</option></select>`)}
          ${fieldHtml("Support email", `<input class="input" value="support@halcyon.app">`)}
          <div class="flex items-center gap-3 mt-2">
            <span class="avatar avatar-lg" style="background:#6366f1">H</span>
            <div><div class="text-sm font-semibold">Workspace logo</div><div class="text-xs text-3">Shown in the sidebar and on customer emails</div></div>
            <button class="btn btn-secondary btn-sm" style="margin-left:auto" onclick="toast('Logo upload opened (demo action)','info')">Upload logo</button>
          </div>
        </div>
        <div class="card card-pad">
          <h3 class="mb-2">Business hours</h3>
          <p class="text-sm text-3 mb-4">Outside these hours the after-hours auto-reply runs. All times UTC.</p>
          ${days.map((d, i) => `<div class="flex items-center gap-3 mb-2"><span class="text-sm" style="width:110px">${d.d}</span>${toggleInput(d.on, "bh-" + i)}<span class="text-sm text-3">${d.on ? "09:00 – 17:00" : "Closed"}</span></div>`).join("")}
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <div class="card">
          <div class="card-head"><div><h3>Team members</h3><div class="text-sm text-3">${DATA.humans.length} human agents · first 5 shown</div></div>
          <a href="#/teams" class="text-sm font-semibold">View all →</a></div>
          <div class="table-wrap"><table class="data"><thead><tr><th>Agent</th><th>Role</th><th>Status</th></tr></thead>
          <tbody>${first5.map(h => `<tr><td><div class="flex items-center gap-2">${avatarHtml(h.name, "sm")}<span>${esc(h.name)}</span></div></td><td class="text-sm">${esc(h.role)}</td><td>${statusBadge(h.status)}</td></tr>`).join("")}</tbody></table></div>
        </div>
        <div class="card card-pad" style="border-color:var(--danger-500)">
          <h3 class="mb-2" style="color:var(--danger-500)">Danger zone</h3>
          <p class="text-sm text-2 mb-4" style="line-height:1.6">These actions affect the whole workspace. In this demo template they only show a message — nothing is actually changed or deleted.</p>
          <div class="flex gap-2" style="flex-wrap:wrap">
            <button class="btn btn-secondary btn-sm" onclick="toast('Ownership transfer is a demo action — nothing was changed','info')">Transfer ownership</button>
            <button class="btn btn-danger btn-sm" onclick="toast('Workspace deletion is disabled in this demo template','warning')">Delete workspace</button>
          </div>
        </div>
      </div>
    </div>`;
  }

  /* ============ 24. Settings — AI models & providers ============ */
  function settingsAI() {
    const models = [
      { name: "AD-4 Turbo", desc: "Fastest and most capable — best for drafting replies and triage.", cost: DATA.meta.tokenRatePer1k, context: "128K", isDefault: true },
      { name: "AD-4", desc: "Balanced quality and cost — good for summaries and KB drafts.", cost: 0.06, context: "32K", isDefault: false },
      { name: "AD-3.5", desc: "Lightweight and cheap — best for simple routing and tagging.", cost: 0.02, context: "16K", isDefault: false }
    ];
    return pageHead("Settings — AI models & providers", "Choose the default model, connect providers and set guardrails", `
      <button class="btn" onclick="toast('AI settings saved','success')">Save changes</button>`) + `
    <div class="grid col-7-5 mb-4">
      <div class="flex flex-col gap-4">
        <div class="card card-pad">
          <h3 class="mb-4">Models</h3>
          ${models.map(m => `<div class="flex items-start gap-3 mb-4" style="padding:14px;border:1px solid ${m.isDefault ? "var(--brand-500)" : "var(--border)"};border-radius:var(--radius-md)">
            <input type="radio" name="default-model" ${m.isDefault ? "checked" : ""} style="margin-top:4px;accent-color:var(--brand-600)">
            <div class="grow">
              <div class="flex items-center gap-2"><b>${esc(m.name)}</b>${m.isDefault ? badge("Default", "brand") : ""}</div>
              <p class="text-sm text-2 mt-1" style="line-height:1.6">${esc(m.desc)}</p>
              <div class="text-xs text-3 mt-2">$${m.cost.toFixed(2)} / 1K tokens · ${m.context} context window</div>
            </div>
          </div>`).join("")}
        </div>
        <div class="card card-pad">
          <h3 class="mb-4">Providers</h3>
          <div class="stat-list">
            <div class="row"><span>✦ AgentDesk AI<br><span class="text-xs text-3">Built-in · no key needed</span></span>${badge("Connected", "success")}</div>
            <div class="row"><span>OpenAI-compatible<br><span class="text-xs text-3">Key sk-••••••••3f9a</span></span><button class="btn btn-secondary btn-sm" onclick="toast('API key rotated — update any external clients using the old key','success')">Rotate key</button></div>
            <div class="row"><span>Anthropic-compatible<br><span class="text-xs text-3">No key configured</span></span><button class="btn btn-secondary btn-sm" onclick="toast('Anthropic provider setup opened (demo action)','info')">Connect</button></div>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <div class="card card-pad">
          <h3 class="mb-2">Guardrails</h3>
          <p class="text-sm text-3 mb-4">Hard limits the AI can never cross, whatever the prompt says.</p>
          <div class="flex flex-col gap-3 text-sm">
            <div class="flex items-center gap-3">${toggleInput(true, "gr-1")}<span>Never share API keys or tokens</span></div>
            <div class="flex items-center gap-3">${toggleInput(true, "gr-2")}<span>Escalate VIP customers to a human</span></div>
            <div class="flex items-center gap-3">${toggleInput(true, "gr-3")}<span>Max refund without approval: $500</span></div>
            <div class="flex items-center gap-3">${toggleInput(true, "gr-4")}<span>Detect customer language before replying</span></div>
            <div class="flex items-center gap-3">${toggleInput(false, "gr-5")}<span>Offer discounts without approval</span></div>
          </div>
          <div class="divider"></div>
          <div class="flex items-center gap-3 text-sm">${toggleInput(true, "gr-6")}<span>Require a human review for replies below 75% confidence</span></div>
        </div>
        ${copilotPanel({
          model: "AD-4 Turbo",
          summary: "Pax runs on AD-3.5 and escalates 18% of its tasks — above the 15% guardrail. Moving General Triage to AD-4 Turbo costs about $0.04 more per 1K tokens but should cut escalations back under the guardrail.",
          suggestions: [{ text: "Switch Pax from AD-3.5 to AD-4 Turbo for General Triage, and re-check its escalation rate after 7 days.", confidence: 88 }],
          sources: ["Fleet performance", "Escalation audit"]
        })}
      </div>
    </div>`;
  }

  /* ============ 25. Settings — Roles & permissions ============ */
  function settingsRoles() {
    const cols = ["tickets", "ai", "billing", "settings", "reports"];
    const labels = { tickets: "Tickets", ai: "AI", billing: "Billing", settings: "Settings", reports: "Reports" };
    const totalMembers = DATA.roles.reduce((a, r) => a + r.members, 0);
    return pageHead("Settings — Roles & permissions", DATA.roles.length + " roles · " + totalMembers + " members across the workspace", `
      <button class="btn" onclick="toast('New role editor opened (demo action)','info')">+ New role</button>`) + `
    <div class="card mb-4">
      <div class="card-head"><div><h3>Permission matrix</h3><div class="text-sm text-3">What each role can do — “manage” includes edit and delete, “view” is read-only</div></div></div>
      <div class="table-wrap"><table class="data"><thead><tr><th>Role</th><th>Members</th>${cols.map(c => `<th>${labels[c]}</th>`).join("")}<th></th></tr></thead>
      <tbody>${DATA.roles.map(r => `<tr>
        <td class="font-semibold">${esc(r.name)}</td>
        <td>${r.members} member${r.members === 1 ? "" : "s"}</td>
        ${cols.map(c => `<td>${r.perms[c] === "none" ? `<span class="text-3">—</span>` : badge(r.perms[c], r.perms[c] === "manage" || r.perms[c] === "all" ? "brand" : "neutral")}</td>`).join("")}
        <td><button class="btn btn-ghost btn-sm" onclick="toast('Editing the ${esc(r.name)} role (demo action)','info')">Edit</button></td></tr>`).join("")}</tbody></table></div>
      <div class="card-foot">Changes apply immediately. The Owner role cannot be edited or removed.</div>
    </div>
    <div class="grid grid-3">
      ${DATA.roles.slice(0, 3).map(r => `<div class="card card-pad">
        <div class="flex items-center justify-between mb-2"><b>${esc(r.name)}</b>${badge(r.members + " member" + (r.members === 1 ? "" : "s"), "brand")}</div>
        <p class="text-sm text-3" style="line-height:1.6">Tickets: <b style="color:var(--text)">${esc(r.perms.tickets)}</b> · AI: <b style="color:var(--text)">${esc(r.perms.ai)}</b> · Billing: <b style="color:var(--text)">${esc(r.perms.billing)}</b></p>
      </div>`).join("")}
    </div>`;
  }

  /* ============ 26. Settings — Billing & plan usage ============ */
  function settingsBilling() {
    const b = DATA.billing;
    const seatsPct = Math.round((b.seatsUsed / b.seatsTotal) * 100);
    const tokensPct = Math.round((b.tokensUsedM / b.tokensTotalM) * 100);
    const storagePct = Math.round((b.storageUsedGb / b.storageTotalGb) * 100);
    return pageHead("Settings — Billing & plan usage", "Plan, usage meters and invoices for the Halcyon workspace", `
      <button class="btn btn-secondary" onclick="toast('Billing portal opened (demo action)','info')">Manage payment method</button>
      <button class="btn" onclick="toast('Upgrade options opened (demo action)','info')">Upgrade plan</button>`) + `
    <div class="grid col-7-5 mb-4">
      <div class="card card-pad">
        <div class="flex items-center justify-between mb-3"><div><div class="font-bold text-xl">${esc(b.plan)} plan</div><div class="text-sm text-3">Billed monthly · next invoice ${esc(b.nextInvoice)}</div></div>${badge(b.plan, "brand")}</div>
        <div class="stat-list">
          <div class="row"><span>Price</span><b>${fmt.money(b.priceMo)} / month</b></div>
          <div class="row"><span>Seats</span><b>${b.seatsUsed} / ${b.seatsTotal} used</b></div>
          <div class="row"><span>AI tokens this cycle</span><b>${b.tokensUsedM}M / ${b.tokensTotalM}M</b></div>
          <div class="row"><span>AI cost this cycle</span><b>${fmt.money(M.aiCost)}</b></div>
          <div class="row"><span>Storage</span><b>${b.storageUsedGb} GB / ${b.storageTotalGb} GB</b></div>
        </div>
        <div class="divider"></div>
        <p class="text-sm text-2" style="line-height:1.65">Scale includes SLA targets of 60 min first response and 8 h resolution, ${b.seatsTotal} seats and ${b.tokensTotalM}M AI tokens per cycle. Overage is billed at $0.10 / 1K tokens.</p>
      </div>
      <div class="card card-pad">
        <h3 class="mb-4">Usage this cycle</h3>
        <div class="mb-4"><div class="flex justify-between text-sm mb-2"><span>Seats</span><b>${b.seatsUsed} / ${b.seatsTotal} (${seatsPct}%)</b></div>${progressBar(seatsPct, seatsPct > 85 ? "warning" : "success")}</div>
        <div class="mb-4"><div class="flex justify-between text-sm mb-2"><span>AI tokens</span><b>${b.tokensUsedM}M / ${b.tokensTotalM}M (${tokensPct}%)</b></div>${progressBar(tokensPct, "ai")}</div>
        <div class="mb-4"><div class="flex justify-between text-sm mb-2"><span>Storage</span><b>${b.storageUsedGb} GB / ${b.storageTotalGb} GB (${storagePct}%)</b></div>${progressBar(storagePct, "success")}</div>
        <div class="divider"></div>
        <p class="text-sm text-3" style="line-height:1.6">At the current pace you will use about ${Math.round(tokensPct + 8)}% of your token allowance by the end of the cycle — no overage expected.</p>
      </div>
    </div>
    <div class="card">
      <div class="card-head"><div><h3>Invoices</h3><div class="text-sm text-3">${b.invoices.length} invoices · all paid</div></div></div>
      <div class="table-wrap"><table class="data"><thead><tr><th>Invoice</th><th>Date</th><th>Amount</th><th>Status</th><th></th></tr></thead>
      <tbody>${b.invoices.map(inv => `<tr>
        <td class="mono font-semibold">${esc(inv.id)}</td><td>${esc(inv.date)}</td><td>${fmt.money(inv.amount)}</td>
        <td>${statusBadge(inv.status)}</td>
        <td><button class="btn btn-ghost btn-sm" onclick="toast('Downloading ${esc(inv.id)} (PDF)','success')">Download</button></td></tr>`).join("")}</tbody></table></div>
    </div>`;
  }

  /* ============ 27. Sign in ============ */
  function authSignin() {
    return `<div class="page-full"><div class="auth-wrap"><div class="auth-card">
      <div class="auth-logo"><span class="ai-chip" style="font-size:18px">✦</span><span class="font-bold text-xl">AgentDesk</span></div>
      <div class="card card-pad">
        <h2 class="mb-2">Sign in</h2>
        <p class="text-sm text-3 mb-4">Welcome back to the Halcyon workspace.</p>
        ${fieldHtml("Work email", `<input class="input" type="email" placeholder="you@halcyon.app" autocomplete="email">`)}
        ${fieldHtml("Password", `<input class="input" type="password" placeholder="Your password" autocomplete="current-password">`)}
        <div class="flex items-center justify-between mb-4">
          <label class="checkbox-row"><input type="checkbox" checked> Remember me</label>
          <a href="#/auth/forgot" class="text-sm font-semibold">Forgot password?</a>
        </div>
        <button class="btn btn-lg" style="width:100%" onclick="toast('Demo sign-in — no account is created','info')">Sign in</button>
        <div class="divider">or continue with</div>
        <div class="flex gap-2">
          <button class="btn btn-secondary" style="flex:1" onclick="toast('Google sign-in is a demo action in this template','info')">Google</button>
          <button class="btn btn-secondary" style="flex:1" onclick="toast('Microsoft sign-in is a demo action in this template','info')">Microsoft</button>
        </div>
        <p class="text-sm text-3 mt-4" style="text-align:center">No account yet? <a href="#/auth/signup" class="font-semibold">Create a workspace</a></p>
      </div>
      <p class="text-sm text-3 mt-4" style="text-align:center"><a href="#/landing">← Back to the site</a></p>
    </div></div></div>`;
  }

  /* ============ 28. Sign up ============ */
  function authSignup() {
    return `<div class="page-full"><div class="auth-wrap"><div class="auth-card">
      <div class="auth-logo"><span class="ai-chip" style="font-size:18px">✦</span><span class="font-bold text-xl">AgentDesk</span></div>
      <div class="card card-pad">
        <h2 class="mb-2">Create your workspace</h2>
        <p class="text-sm text-3 mb-4">14-day trial, no credit card required.</p>
        ${fieldHtml("Full name", `<input class="input" placeholder="Mara Jensen" autocomplete="name">`)}
        ${fieldHtml("Work email", `<input class="input" type="email" placeholder="you@company.com" autocomplete="email">`)}
        ${fieldHtml("Password", `<input class="input" type="password" placeholder="At least 8 characters" autocomplete="new-password">`)}
        ${fieldHtml("Workspace name", `<input class="input" placeholder="e.g. Halcyon">`)}
        ${fieldHtml("Plan", `<select class="select"><option>Starter — $29/mo</option><option>Growth — $99/mo</option><option selected>Scale — $249/mo</option><option>Enterprise — $890/mo</option></select>`)}
        <button class="btn btn-lg" style="width:100%" onclick="toast('Demo sign-up — no workspace is created','info')">Create workspace</button>
        <p class="text-sm text-3 mt-4" style="text-align:center;line-height:1.6">By creating a workspace you agree to the Terms and Privacy Policy. Already have an account? <a href="#/auth/signin" class="font-semibold">Sign in</a></p>
      </div>
      <p class="text-sm text-3 mt-4" style="text-align:center"><a href="#/landing">← Back to the site</a></p>
    </div></div></div>`;
  }

  /* ============ 29. Forgot password / 2FA ============ */
  function authForgot() {
    const boxes = [0, 1, 2, 3, 4, 5].map(i => `<input class="input" maxlength="1" inputmode="numeric" style="width:44px;text-align:center;font-size:18px;font-weight:700" aria-label="Digit ${i + 1}">`).join("");
    return `<div class="page-full"><div class="auth-wrap"><div class="auth-card">
      <div class="auth-logo"><span class="ai-chip" style="font-size:18px">✦</span><span class="font-bold text-xl">AgentDesk</span></div>
      <div class="card card-pad mb-4">
        <h2 class="mb-2">Reset your password</h2>
        <p class="text-sm text-3 mb-4">Enter your work email and we will send you a reset link.</p>
        ${fieldHtml("Work email", `<input class="input" type="email" placeholder="you@halcyon.app" autocomplete="email">`)}
        <button class="btn" style="width:100%" onclick="toast('Reset link sent — check your inbox','success')">Send reset link</button>
        <div class="mt-4" style="background:var(--surface-2);border:1px solid var(--border);border-radius:var(--radius-md);padding:12px">
          <div class="text-sm font-semibold" style="color:var(--success-500)">✓ Reset link sent</div>
          <p class="text-sm text-2 mt-1" style="line-height:1.6">Check your inbox for the reset link. It expires in 60 minutes — if it does not arrive, check spam or request a new one.</p>
        </div>
        <p class="text-sm text-3 mt-4" style="text-align:center"><a href="#/auth/signin" class="font-semibold">← Back to sign in</a></p>
      </div>
      <div class="card card-pad">
        <h3 class="mb-2">Two-factor authentication</h3>
        <p class="text-sm text-3 mb-4">Enter the 6-digit code from your authenticator app.</p>
        <div class="flex gap-2 mb-4">${boxes}</div>
        <button class="btn btn-secondary" style="width:100%" onclick="toast('Code verified (demo action)','success')">Verify</button>
        <p class="text-sm text-3 mt-3" style="text-align:center">Lost access to your authenticator? <a href="#/auth/signin" class="font-semibold">Contact support</a></p>
      </div>
    </div></div></div>`;
  }

  /* ============ 30. Empty — No tickets yet ============ */
  function emptyTickets() {
    return pageHead("Inbox", "0 open tickets · queue is clear", ``) + `
    <div class="card card-pad">
      ${emptyState({
        icon: "📭",
        title: "No tickets yet",
        text: "Your queue is clear. Tickets arrive here automatically from email, live chat and voice — or create one by hand when a customer reaches out another way.",
        cta: `<div class="flex gap-2 justify-center mt-4" style="flex-wrap:wrap">
          <button class="btn" onclick="openModal('New ticket','')">+ Create a ticket</button>
          <a href="#/channels" class="btn btn-secondary">Connect a channel</a>
        </div>`
      })}
    </div>`;
  }

  /* ============ 31. Empty — No AI agents yet ============ */
  function emptyAgents() {
    return pageHead("AI Agent Fleet", "0 AI agents · nothing deployed yet", ``) + `
    <div class="card card-pad">
      ${emptyState({
        icon: "🤖",
        title: "No AI agents yet",
        text: "Create your first AI agent to start answering tickets on its own. Pick a role — billing, technical, onboarding — set its guardrails, and it begins triaging in minutes.",
        cta: `<div class="flex gap-2 justify-center mt-4" style="flex-wrap:wrap">
          <button class="btn" onclick="toast('Agent builder opened (demo action)','info')">+ Create your first agent</button>
          <a href="#/fleet" class="btn btn-secondary">Browse agent templates</a>
        </div>`
      })}
    </div>`;
  }

  /* ============ 32. Empty — No KB articles ============ */
  function emptyKb() {
    return pageHead("Knowledge Base", "0 articles · help center is empty", ``) + `
    <div class="card card-pad">
      ${emptyState({
        icon: "📚",
        title: "No articles yet",
        text: "Articles answer the questions customers ask most — and let the AI resolve chats without a human. Write your first one, or let the copilot draft it from your recent tickets.",
        cta: `<div class="flex gap-2 justify-center mt-4" style="flex-wrap:wrap">
          <button class="btn" onclick="toast('New article editor opened (demo action)','info')">+ Write your first article</button>
          <button class="btn btn-ai" onclick="toast('AI drafted 2 new articles — review them in the Knowledge Base','success')">✦ Draft with AI</button>
        </div>`
      })}
    </div>`;
  }

  /* ============ 33. 404 ============ */
  function error404() {
    return `<div class="page-full"><div class="auth-wrap"><div class="auth-card" style="max-width:560px;text-align:center">
      <div style="font-size:96px;font-weight:800;letter-spacing:-0.04em;line-height:1">404</div>
      <h2 class="mt-2 mb-2">This page drifted off.</h2>
      <p class="text-sm text-3 mb-4" style="line-height:1.65">The page you are looking for does not exist, or it moved. Try searching for what you need, or head back to the Command Center.</p>
      <div class="flex gap-2 mb-4">
        <input class="input" placeholder="Search tickets, customers, articles…" style="flex:1">
        <button class="btn" onclick="toast('Search is a demo action on this page','info')">Search</button>
      </div>
      <a href="#/overview" class="btn btn-lg" style="width:100%">Back to Command Center</a>
      <div class="flex gap-4 justify-center mt-4 text-sm">
        <a href="#/overview" class="font-semibold">Command Center</a>
        <a href="#/inbox" class="font-semibold">Inbox</a>
        <a href="#/kb" class="font-semibold">Knowledge Base</a>
      </div>
    </div></div></div>`;
  }

  /* ============ 34. Landing page ============ */
  function landing() {
    const features = [
      { icon: "✦", title: "AI Copilot", text: "Drafts replies grounded in your knowledge base, with confidence scores and sources on every suggestion." },
      { icon: "⚙", title: "Smart triage", text: "Routes, tags and escalates tickets before a human sees them — with rules you control." },
      { icon: "🤖", title: "Agent fleet", text: "Six AI agents with roles, languages and guardrails, working alongside your human team." },
      { icon: "📊", title: "Live analytics", text: "First response, resolution, AI cost and CSAT — reconciled from one dataset, updated daily." },
      { icon: "📚", title: "Knowledge base", text: "Articles that deflect chats and keep the AI accurate, with AI drafts ready to review." },
      { icon: "⏱", title: "SLA guardrails", text: "Policies by plan, at-risk alerts and an on-call rota that keeps breaches rare." }
    ];
    return `<div class="page-full" style="display:block">
    ${marketingNav()}
    <div class="marketing-hero">
      <span class="badge badge-ai">✦ AI support operations</span>
      <h1>Support that runs itself</h1>
      <p>AgentDesk triages, answers and escalates customer tickets with AI agents your team controls — so humans only handle the conversations that need them.</p>
      <div class="hero-cta flex gap-2 justify-center mt-4" style="flex-wrap:wrap">
        <a href="#/auth/signup" class="btn btn-lg">Get started free</a>
        <a href="#/pricing" class="btn btn-secondary btn-lg">See pricing</a>
      </div>
      <div class="flex gap-6 justify-center mt-6 text-sm" style="flex-wrap:wrap">
        <span><b>${M.aiRate}%</b> AI resolution</span>
        <span><b>${M.csat.toFixed(1)} / 5</b> CSAT</span>
        <span><b>${M.firstResponseMin} min</b> first response</span>
      </div>
    </div>
    <div class="hero-shot" style="max-width:1020px;margin:0 auto;padding:0 24px 48px">
      <div class="card card-pad">
        <div class="flex items-center justify-between mb-4"><b>Command Center — live preview</b><span class="text-sm text-3">Last 14 days · ${fmt.num(M.totalResolved14)} tickets resolved</span></div>
        <div class="stat-grid mb-4">
          ${statCard({ label: "Open tickets", value: M.openTickets, sub: "of " + M.totalTickets + " in queue", icon: "📥" })}
          ${statCard({ label: "AI resolution rate", value: M.aiRate + "%", sub: fmt.num(M.aiResolved14) + " of " + fmt.num(M.totalResolved14) + " resolved", icon: "✦" })}
          ${statCard({ label: "CSAT", value: M.csat.toFixed(1) + " / 5", sub: "NPS " + M.nps, icon: "★" })}
        </div>
        ${svgLineDual(S.received, S.aiResolved, S.days, {})}
        ${legend([{ color: "#6366f1", label: "Received" }, { color: "#14b8a6", label: "Resolved by AI" }])}
      </div>
    </div>
    <div class="feature-grid" style="max-width:1020px;margin:0 auto;padding:0 24px 48px">
      ${features.map(f => `<div class="card card-pad"><div style="font-size:24px">${f.icon}</div><h3 class="mt-2 mb-2">${esc(f.title)}</h3><p class="text-sm text-2" style="line-height:1.65">${esc(f.text)}</p></div>`).join("")}
    </div>
    <div style="max-width:760px;margin:0 auto;padding:0 24px 48px;text-align:center">
      <p class="text-lg" style="line-height:1.6">“AgentDesk cut our first response time by 60%.”</p>
      <p class="text-sm text-3 mt-2">— Nora Fields, Fernhill Studio</p>
    </div>
    <div style="max-width:1020px;margin:0 auto;padding:0 24px 64px">
      <div class="card card-pad" style="text-align:center">
        <h2 class="mb-2">Ready to let support run itself?</h2>
        <p class="text-sm text-3 mb-4">Start a 14-day trial — no credit card required.</p>
        <a href="#/auth/signup" class="btn btn-lg">Get started free</a>
      </div>
    </div>
    ${marketingFoot()}
    </div>`;
  }

  /* ============ 35. Pricing ============ */
  function pricing() {
    const slaByPlan = {};
    DATA.slaPolicies.forEach(p => { slaByPlan[p.plan] = p; });
    const plans = [
      { name: "Starter", price: 29, featured: false, tag: "", features: [
        "5 seats", "2M AI tokens / cycle", "First response: " + slaByPlan.Starter.firstResponseMin + " min", "Resolution: " + slaByPlan.Starter.resolutionH + " h",
        "Knowledge base", "Email support"
      ] },
      { name: "Scale", price: 249, featured: true, tag: "Most popular", features: [
        "30 seats", "25M AI tokens / cycle", "First response: " + slaByPlan.Scale.firstResponseMin + " min", "Resolution: " + slaByPlan.Scale.resolutionH + " h",
        "AI Copilot + agent fleet", "SLA policies & on-call rota", "All channels incl. voice", "Priority support"
      ] },
      { name: "Enterprise", price: 890, featured: false, tag: "", features: [
        "Unlimited seats", "Unlimited AI tokens", "First response: " + slaByPlan.Enterprise.firstResponseMin + " min", "Resolution: " + slaByPlan.Enterprise.resolutionH + " h",
        "SSO / SAML", "Custom models & providers", "Dedicated success manager", "99.99% uptime SLA"
      ] }
    ];
    const faqs = [
      { q: "What counts as an AI token?", a: "Every 1,000 tokens of AI input and output costs $0.10. Scale includes 25M tokens per cycle; overage is billed at the same $0.10 / 1K rate." },
      { q: "Can I change plans later?", a: "Yes — upgrade or downgrade at any time. Seats, token allowance and SLA targets change with the plan, and billing is prorated to the day." },
      { q: "Is there a free trial?", a: "Every plan starts with a 14-day trial. No credit card is required, and you keep your workspace, tickets and articles if you upgrade." }
    ];
    return `<div class="page-full" style="display:block">
    ${marketingNav()}
    <div class="marketing-hero">
      <h1>Simple pricing that scales with your team</h1>
      <p>Start small, grow when your queue does. Every plan includes the AI Copilot, the knowledge base and unlimited viewers.</p>
    </div>
    <div class="pricing-grid">
      ${plans.map(p => `<div class="card card-pad price-card ${p.featured ? "featured" : ""}">
        ${p.tag ? `<span class="badge badge-brand mb-2" style="align-self:flex-start">${p.tag}</span>` : ""}
        <h3>${esc(p.name)}</h3>
        <div class="price mt-2">$${p.price}<span class="text-sm text-3" style="font-weight:400"> / mo</span></div>
        <ul class="mt-4 mb-4" style="list-style:none;padding:0">
          ${p.features.map(f => `<li>✓ ${esc(f)}</li>`).join("")}
        </ul>
        <a href="#/auth/signup" class="btn ${p.featured ? "" : "btn-secondary"}" style="margin-top:auto">Start with ${esc(p.name)}</a>
      </div>`).join("")}
    </div>
    <div style="max-width:1020px;margin:0 auto;padding:0 24px 48px;text-align:center">
      <p class="text-sm text-3" style="line-height:1.7">Also available: <b style="color:var(--text)">Growth — $99/mo</b> · 15 seats · 8M AI tokens / cycle · first response ${slaByPlan.Growth.firstResponseMin} min · resolution ${slaByPlan.Growth.resolutionH} h. All prices in USD, billed monthly.</p>
    </div>
    <div style="max-width:760px;margin:0 auto;padding:0 24px 64px">
      <h2 class="mb-4" style="text-align:center">Frequently asked questions</h2>
      ${faqs.map(f => `<div class="card card-pad mb-3"><h3 class="mb-2">${esc(f.q)}</h3><p class="text-sm text-2" style="line-height:1.65">${esc(f.a)}</p></div>`).join("")}
    </div>
    ${marketingFoot()}
    </div>`;
  }

  return { sla, macros, workflows, channels, csat, reports, search, notifications, settingsWorkspace, settingsAI, settingsRoles, settingsBilling, authSignin, authSignup, authForgot, emptyTickets, emptyAgents, emptyKb, error404, landing, pricing };
})();

if (typeof window !== "undefined") window.ScreensB = ScreensB;
if (typeof module !== "undefined") module.exports = ScreensB;
