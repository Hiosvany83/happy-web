/* ============================================================
   AgentDesk — Screens A (1–14 of 37)
   Each function returns an HTML string. All numbers come from
   DATA / DATA.metrics — never hard-coded twice.
   ============================================================ */

const ScreensA = (() => {
  const { DATA, fmt, avatarColor } = window.AD;
  const { esc, badge, statusBadge, priorityBadge, channelBadge, sentimentBadge, confidenceBadge,
    avatarHtml, avatarStack, statCard, progressBar, slaTimer, toggleInput, sectionCard,
    dataTable, emptyState, copilotPanel, legend } = window.AD;
  const { svgLine, svgLineDual, svgBars, svgDonut, svgGauge, sparkline } = window.ADCharts;
  const M = DATA.metrics;
  const S = DATA.series14;

  function pageHead(title, sub, actions) {
    return `<div class="page-head"><div><h1>${esc(title)}</h1><div class="page-sub">${esc(sub)}</div></div>
      <div class="flex gap-2">${actions || ""}</div></div>`;
  }

  function ticketRowLink(t) { return `<a href="#/ticket/${t.id}" class="mono font-semibold">${t.id}</a>`; }

  /* ============ 1. Overview / Command Center ============ */
  function overview() {
    const urgent = DATA.tickets.filter(t => t.status === "open" || t.status === "pending")
      .sort((a, b) => a.slaMin - b.slaMin).slice(0, 8);
    const donutSegs = [
      { value: M.aiResolved14, color: "#14b8a6", label: "AI resolved" },
      { value: M.totalResolved14 - M.aiResolved14 - 43, color: "#6366f1", label: "Human resolved" },
      { value: 43, color: "#f59e0b", label: "Macros" }
    ];
    return pageHead("Command Center", "Friday, Nov 8, 2026 · Live queue · All times UTC", `
      <button class="btn btn-secondary" onclick="toast('Queue refreshed — 0 new tickets since 14:52','success')">↻ Refresh</button>
      <button class="btn" onclick="ADNewTicket()">+ New ticket</button>`) + `
    <div class="stat-grid mb-4">
      ${statCard({ label: "Open tickets", value: M.openTickets, delta: "8% vs last week", deltaDir: "down", deltaGood: true, sub: "of " + M.totalTickets + " in queue", spark: S.received.slice(-7), icon: "📥" })}
      ${statCard({ label: "SLA at risk", value: M.slaRisk, delta: "1 breached", deltaDir: "down", sub: "96.4% compliance", spark: [6, 8, 5, 7, 9, 6, 7], accent: "#f59e0b", icon: "⏱" })}
      ${statCard({ label: "AI resolution rate", value: M.aiRate + "%", delta: "4 pts vs last week", deltaDir: "up", sub: fmt.num(M.aiResolved14) + " of " + fmt.num(M.totalResolved14) + " resolved", spark: S.aiResolved.slice(-7), icon: "✦" })}
      ${statCard({ label: "CSAT", value: M.csat.toFixed(1) + " / 5", delta: "0.2 vs last week", deltaDir: "up", sub: "NPS " + M.nps + " · " + DATA.feedback.length + " surveys", spark: [4.3, 4.4, 4.5, 4.4, 4.6, 4.5, 4.6], accent: "#6366f1", icon: "★" })}
      ${statCard({ label: "AI cost this cycle", value: fmt.money(M.aiCost), delta: "within budget", deltaDir: "up", deltaGood: true, sub: fmt.tokens(M.tokensTotal) + " tokens · $0.10 / 1K", spark: S.tokensM.slice(-7), accent: "#f472b6", icon: "◈" })}
    </div>

    <div class="grid col-7-5 mb-4">
      <div class="card chart-card">
        <h4>Ticket volume — last 14 days</h4>
        <div class="chart-sub">${fmt.num(M.totalResolved14)} received · ${fmt.num(M.totalResolved14)} resolved · AI resolved ${fmt.num(M.aiResolved14)}</div>
        ${svgLineDual(S.received, S.aiResolved, S.days, {})}
        ${legend([{ color: "#6366f1", label: "Received" }, { color: "#14b8a6", label: "Resolved by AI" }])}
      </div>
      <div class="card chart-card">
        <h4>How tickets get resolved</h4>
        <div class="chart-sub">Last 14 days · ${fmt.num(M.totalResolved14)} resolved</div>
        <div class="flex items-center gap-6">
          ${svgDonut(donutSegs, { size: 168, center: M.aiRate + "%" })}
          <div class="flex flex-col gap-2 text-sm">
            <span><span class="swatch" style="display:inline-block;width:10px;height:10px;border-radius:3px;background:#14b8a6;margin-right:6px"></span>AI resolved — ${fmt.num(M.aiResolved14)} (${M.aiRate}%)</span>
            <span><span class="swatch" style="display:inline-block;width:10px;height:10px;border-radius:3px;background:#6366f1;margin-right:6px"></span>Human resolved — ${fmt.num(M.totalResolved14 - M.aiResolved14 - 43)}</span>
            <span><span class="swatch" style="display:inline-block;width:10px;height:10px;border-radius:3px;background:#f59e0b;margin-right:6px"></span>Macros — 43</span>
          </div>
        </div>
      </div>
    </div>

    <div class="grid col-3-2 mb-4">
      <div class="card">
        <div class="card-head"><div><h3>Live queue — needs attention first</h3><div class="text-sm text-3">Sorted by SLA clock</div></div>
        <a href="#/inbox" class="text-sm font-semibold">View inbox →</a></div>
        <div class="table-wrap"><table class="data"><thead><tr><th>Ticket</th><th>Subject</th><th>Priority</th><th>AI</th><th>SLA</th><th>Status</th></tr></thead>
        <tbody>${urgent.map(t => `<tr>
          <td>${ticketRowLink(t)}</td>
          <td><div class="truncate" style="max-width:280px">${esc(t.subject)}</div><div class="text-xs text-3">${esc(t.customer)}</div></td>
          <td>${priorityBadge(t.priority)}</td><td>${confidenceBadge(t.aiConfidence)}</td>
          <td>${slaTimer(t.slaMin)}</td><td>${statusBadge(t.status)}</td></tr>`).join("")}</tbody></table></div>
      </div>
      <div class="copilot">
        <div class="copilot-head"><span class="ai-chip">✦ AI Triage summary</span><span class="text-sm text-3" style="margin-left:auto">Updated 2 min ago</span></div>
        <div class="copilot-body">
          <p class="text-sm text-2" style="line-height:1.65">AI triaged <b>${fmt.num(M.totalResolved14)}</b> tickets in the last 14 days. <b>${M.slaRisk} tickets</b> are inside their SLA window — AD-1039 already breached. Pax is escalating above its 15% guardrail; review its handoff rules.</p>
          <div class="divider"></div>
          <div class="stat-list">
            <div class="row"><span>Auto-triaged today</span><b>700 tasks · 6 agents</b></div>
            <div class="row"><span>Avg AI confidence</span><b>91%</b></div>
            <div class="row"><span>Escalations today</span><b>${M.aiEscalations} (${M.escRate}%)</b></div>
            <div class="row"><span>KB deflection</span><b>18% of chats solved by articles</b></div>
          </div>
          <div class="mt-4"><a href="#/triage" class="btn btn-ai btn-sm">Review triage rules →</a></div>
        </div>
      </div>
    </div>`;
  }

  /* ============ 2. AI Agent Fleet ============ */
  function fleet() {
    const cards = DATA.aiAgents.map(a => {
      const cost = Math.round((a.tokensToday / 1000) * DATA.meta.tokenRatePer1k);
      return `<div class="card card-pad">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <span class="avatar avatar-ai avatar-lg">${esc(a.name[0])}</span>
            <div><div class="font-semibold text-lg">${esc(a.name)}</div><div class="text-sm text-3">${esc(a.role)}</div></div>
          </div>${statusBadge(a.status)}
        </div>
        <div class="flex gap-2 mb-4">${badge(a.model, "brand")}${badge(a.languages.join(" · "), "neutral")}</div>
        <div class="stat-list">
          <div class="row"><span>Tasks today</span><b>${a.tasksToday}</b></div>
          <div class="row"><span>Resolved</span><b>${a.resolvedToday}</b></div>
          <div class="row"><span>Escalations</span><b>${a.escalations}</b></div>
          <div class="row"><span>Tokens today</span><b>${fmt.tokens(a.tokensToday)} · ${fmt.money(cost)}</b></div>
          <div class="row"><span>Uptime (30d)</span><b>${a.uptime}%</b></div>
        </div>
        <div class="mt-4"><div class="flex justify-between text-sm mb-2"><span class="text-3">Avg confidence</span><b>${a.avgConfidence}%</b></div>${progressBar(a.avgConfidence, "ai")}</div>
        <div class="mt-4"><a href="#/agent/${a.id}" class="btn btn-secondary btn-sm" style="width:100%">View agent →</a></div>
      </div>`;
    }).join("");
    return pageHead("AI Agent Fleet", "6 AI agents · " + M.aiTasks + " tasks today · " + fmt.money(M.aiCost) + " AI cost", `
      <button class="btn btn-secondary" onclick="toast('Fleet health check passed — all agents responding','success')">Run health check</button>
      <button class="btn" onclick="toast('Agent builder is a demo action in this template','info')">+ New AI agent</button>`) + `
    <div class="stat-grid mb-4">
      ${statCard({ label: "Active agents", value: DATA.aiAgents.filter(a => a.status !== "paused").length + " / 6", sub: "1 escalated (Pax)", icon: "🤖" })}
      ${statCard({ label: "Tasks today", value: fmt.num(M.aiTasks), delta: "12% vs yesterday", deltaDir: "up", sub: "across all agents", icon: "⚡" })}
      ${statCard({ label: "Avg confidence", value: "91%", delta: "2 pts vs last week", deltaDir: "up", sub: "threshold: 75%", icon: "✦" })}
      ${statCard({ label: "Escalation rate", value: M.escRate + "%", delta: "guardrail 15%", deltaDir: "down", sub: M.aiEscalations + " escalations today", icon: "⬆" })}
      ${statCard({ label: "Tokens today", value: fmt.tokens(M.tokensTotal), delta: "74% of plan", deltaDir: "up", sub: "cost " + fmt.money(M.aiCost), icon: "◈" })}
    </div>
    <div class="grid grid-3">${cards}</div>`;
  }

  /* ============ 3. Agent detail ============ */
  function agentDetail(id) {
    const a = DATA.aiAgents.find(x => x.id === id) || DATA.aiAgents[0];
    const myTickets = DATA.tickets.filter(t => t.assignee === a.name);
    const share = a.tasksToday / M.aiTasks;
    const perDay = S.resolved.map(v => Math.max(1, Math.round(v * share)));
    const cost = Math.round((a.tokensToday / 1000) * DATA.meta.tokenRatePer1k);
    return pageHead(a.name + " — " + a.role, a.model + " · Languages: " + a.languages.join(", ") + " · Uptime " + a.uptime + "%", `
      <button class="btn btn-secondary" onclick="toast('Guardrails saved','success')">Save guardrails</button>
      <button class="btn" onclick="toast('Retraining queued for ${esc(a.name)}','info')">Retrain agent</button>`) + `
    <div class="flex items-center gap-4 mb-4">
      <span class="avatar avatar-ai avatar-xl">${esc(a.name[0])}</span>
      <div>${statusBadge(a.status)} <span class="text-sm text-3" style="margin-left:8px">Last active 2 min ago · ${a.tasksToday} tasks today</span></div>
    </div>
    <div class="stat-grid mb-4">
      ${statCard({ label: "Tasks today", value: a.tasksToday, sub: "resolved " + a.resolvedToday, icon: "⚡" })}
      ${statCard({ label: "Avg confidence", value: a.avgConfidence + "%", sub: "threshold 75%", icon: "✦" })}
      ${statCard({ label: "Escalations", value: a.escalations, sub: Math.round((a.escalations / a.tasksToday) * 100) + "% of tasks", icon: "⬆" })}
      ${statCard({ label: "Tokens today", value: fmt.tokens(a.tokensToday), sub: "cost " + fmt.money(cost), icon: "◈" })}
      ${statCard({ label: "Resolution rate", value: Math.round((a.resolvedToday / a.tasksToday) * 100) + "%", sub: "resolved / tasks", icon: "✓" })}
    </div>
    <div class="grid col-7-5 mb-4">
      <div class="card chart-card"><h4>Tickets handled — last 14 days</h4><div class="chart-sub">Share of team volume: ${Math.round(share * 100)}%</div>
        ${svgBars(perDay, S.days.map(d => d.slice(4)), { color: "#14b8a6" })}</div>
      <div class="card card-pad">
        <h3 class="mb-4">Guardrails</h3>
        <div class="flex flex-col gap-3 text-sm">
          <label class="checkbox-row"><input type="checkbox" checked> Never share API keys or tokens</label>
          <label class="checkbox-row"><input type="checkbox" checked> Escalate VIP customers to a human</label>
          <label class="checkbox-row"><input type="checkbox" checked> Max refund without approval: $500</label>
          <label class="checkbox-row"><input type="checkbox" checked> Detect customer language before replying</label>
          <label class="checkbox-row"><input type="checkbox"> Offer discounts without approval</label>
        </div>
        <div class="divider"></div>
        <h3 class="mb-2">Handoff rules</h3>
        <p class="text-sm text-2" style="line-height:1.65">Escalate when confidence &lt; 75%, sentiment is Angry, or the customer asks for a human twice. Handoff includes full thread summary and cited KB sources.</p>
      </div>
    </div>
    <div class="card">
      <div class="card-head"><div><h3>Conversation history — ${esc(a.name)}</h3><div class="text-sm text-3">${myTickets.length} tickets assigned</div></div></div>
      <div class="table-wrap"><table class="data"><thead><tr><th>Ticket</th><th>Subject</th><th>Customer</th><th>Priority</th><th>AI conf.</th><th>Status</th></tr></thead>
      <tbody>${myTickets.map(t => `<tr><td>${ticketRowLink(t)}</td><td>${esc(t.subject)}</td><td>${esc(t.customer)}</td><td>${priorityBadge(t.priority)}</td><td>${confidenceBadge(t.aiConfidence)}</td><td>${statusBadge(t.status)}</td></tr>`).join("") || `<tr><td colspan="6" style="text-align:center;color:var(--text-3);padding:24px">No tickets assigned yet.</td></tr>`}</tbody></table></div>
    </div>`;
  }

  /* ============ 4. Inbox ============ */
  function inbox() {
    const cols = [
      { key: "id", label: "Ticket", render: r => ticketRowLink(r), search: r => r.id },
      { key: "subject", label: "Subject", render: r => `<div class="truncate" style="max-width:340px">${esc(r.subject)}</div><div class="text-xs text-3">${r.tags.map(esc).join(" · ")}</div>`, search: r => r.subject + " " + r.tags.join(" ") },
      { key: "customer", label: "Customer", render: r => `<div class="flex items-center gap-2">${avatarHtml(r.customer, "sm")}<span>${esc(r.customer)}</span></div><div class="text-xs text-3">${esc(r.plan)}</div>` },
      { key: "channel", label: "Channel", render: r => channelBadge(r.channel) },
      { key: "priority", label: "Priority", render: r => priorityBadge(r.priority) },
      { key: "assignee", label: "Assignee", render: r => `<span class="flex items-center gap-2">${DATA.aiAgents.some(a => a.name === r.assignee) ? `<span class="avatar avatar-ai avatar-sm">${esc(r.assignee[0])}</span>` : avatarHtml(r.assignee, "sm")}${esc(r.assignee)}</span>` },
      { key: "aiConfidence", label: "AI conf.", render: r => confidenceBadge(r.aiConfidence) },
      { key: "slaMin", label: "SLA", render: r => r.status === "solved" ? '<span class="text-3" style="font-size:13px">Met</span>' : slaTimer(r.slaMin) },
      { key: "status", label: "Status", render: r => statusBadge(r.status) }
    ];
    window.AD.tables["inbox"] = { columns: cols, rows: DATA.tickets.slice(), page: 1, pageSize: 10, sortKey: "slaMin", sortDir: "asc", query: "" };
    const filters = `<select class="select" style="width:150px" onchange="ADFilterInbox(this.value)">
        <option value="all">All statuses</option><option value="open">Open</option><option value="pending">Pending</option><option value="escalated">Escalated</option><option value="solved">Solved</option>
      </select>
      <select class="select" style="width:140px" onchange="ADFilterChannel(this.value)">
        <option value="all">All channels</option><option value="email">Email</option><option value="chat">Live Chat</option><option value="voice">Voice</option><option value="social">Social</option>
      </select>`;
    return pageHead("Inbox", M.openTickets + " open tickets · " + M.escalatedTickets + " escalated · " + M.slaRisk + " at SLA risk", `
      <button class="btn btn-secondary" onclick="toast('3 tickets assigned to Nova','success')">Bulk assign</button>
      <button class="btn" onclick="ADNewTicket()">+ New ticket</button>`) + `
    <div class="flex gap-2 mb-4" style="flex-wrap:wrap">
      <span class="chip">📥 All · ${DATA.tickets.length}</span>
      <span class="chip">🔴 Urgent · ${DATA.tickets.filter(t => t.priority === "urgent").length}</span>
      <span class="chip">⏱ SLA risk · ${M.slaRisk}</span>
      <span class="chip">✦ AI-handled · ${DATA.tickets.filter(t => DATA.aiAgents.some(a => a.name === t.assignee)).length}</span>
      <span class="chip">👤 Human · ${DATA.tickets.filter(t => !DATA.aiAgents.some(a => a.name === t.assignee)).length}</span>
    </div>
    ${dataTable("inbox", cols, DATA.tickets, { pageSize: 10, filters })}`;
  }

  /* ============ 5. Ticket / conversation detail ============ */
  function ticketDetail(id) {
    const t = DATA.tickets.find(x => x.id === id) || DATA.tickets[0];
    const isAI = DATA.aiAgents.some(a => a.name === t.assignee);
    const thread = [
      { who: t.customer, role: "Customer · " + t.plan + " plan", time: fmt.timeAgo(t.createdH), text: "Hi — " + ticketFirstLine(t) },
      { who: t.assignee, role: isAI ? "AI Agent · " + (DATA.aiAgents.find(a => a.name === t.assignee)?.model || "") : "Human Agent", time: fmt.timeAgo(Math.max(0, t.createdH - 1)), text: ticketReplyLine(t) },
      { who: t.customer, role: "Customer", time: fmt.timeAgo(Math.max(0, t.createdH - 1)) + " · reply", text: "Thanks — that helps. Can you also confirm the timeline for the fix?" }
    ];
    return pageHead(t.id + " — " + t.subject, t.customer + " · " + t.company + " · via " + t.channel, `
      <button class="btn btn-secondary" onclick="toast('Ticket assigned to Mara Jensen','success')">Reassign</button>
      <button class="btn" onclick="toast('${t.id} marked as solved','success')">Mark solved</button>`) + `
    <div class="flex gap-2 mb-4" style="flex-wrap:wrap">
      ${priorityBadge(t.priority)} ${statusBadge(t.status)} ${channelBadge(t.channel)} ${sentimentBadge(t.sentiment)} ${badge(t.category, "brand")}
      <span class="chip">🏷 ${t.tags.map(esc).join(" · ")}</span>
    </div>
    <div class="grid col-3-2">
      <div class="flex flex-col gap-4">
        <div class="card card-pad">
          <div class="flex items-center justify-between mb-2"><h3>Conversation</h3><span class="text-sm text-3">${t.messages} messages · First response ${t.firstResponseMin} min</span></div>
          ${thread.map(m => `<div class="thread-msg">${avatarHtml(m.who, "")}<div class="thread-body">
            <div class="msg-meta"><b style="color:var(--text)">${esc(m.who)}</b><span>${esc(m.role)}</span><span>· ${esc(m.time)}</span></div>
            <p>${esc(m.text)}</p></div></div>`).join("")}
          <div class="divider"></div>
          <div class="prompt-box"><textarea id="reply-box" placeholder="Write a reply… (AI will suggest as you type)"></textarea>
            <button class="btn btn-ai btn-sm" onclick="toast('Reply sent to ${esc(t.customer)}','success')">Send</button></div>
          <div class="flex gap-2 mt-3"><button class="btn btn-secondary btn-sm" onclick="toast('Macro applied: Refund approved — standard','success')">Insert macro</button>
          <button class="btn btn-ghost btn-sm" onclick="toast('Internal note saved','success')">+ Internal note</button></div>
        </div>
        <div class="note"><b>Internal note — Mara Jensen:</b> Customer is on the Scale plan since Aug 2023. Previous escalation in October was about the same invoice flow. Keep the tone factual, no discount without approval.</div>
      </div>
      <div class="flex flex-col gap-4">
        ${copilotPanel({
          model: "AD-4 Turbo",
          summary: "Customer reports " + t.subject.toLowerCase() + ". Likely cause: " + (t.category === "Billing" ? "duplicate charge after the plan upgrade — the proration ran twice." : t.category === "Technical" ? "a known issue fixed in release 1.4.0 — check the version first." : "a configuration question — answer from the KB and offer a walkthrough."),
          suggestions: [
            { text: "Thanks for flagging this — I can see the duplicate charge and I have already raised a refund for the extra amount. It should reach your card within 3–5 business days.", confidence: Math.min(98, t.aiConfidence + 3) },
            { text: "Could you confirm the last 4 digits of the card charged? That will let me match the exact invoice and close this today.", confidence: Math.max(70, t.aiConfidence - 8) }
          ],
          sentiment: t.sentiment,
          sources: ["Refund policy: 30-day window", "Understanding your invoice", "Escalation rules — VIP"]
        })}
        <div class="card card-pad">
          <h3 class="mb-3">SLA</h3>
          <div class="flex items-center gap-3 mb-2">${slaTimer(t.slaMin)}<span class="text-sm text-3">${t.plan} plan · first response target 60 min</span></div>
          ${progressBar(t.slaMin < 0 ? 100 : Math.max(8, 100 - (t.slaMin / 300) * 100), t.slaMin < 45 ? "danger" : "ai")}
          <div class="divider"></div>
          <div class="stat-list">
            <div class="row"><span>Created</span><b>${t.createdH}h ago</b></div>
            <div class="row"><span>First response</span><b>${t.firstResponseMin} min</b></div>
            <div class="row"><span>Assignee</span><b>${esc(t.assignee)} ${isAI ? "(AI)" : ""}</b></div>
            <div class="row"><span>AI confidence</span><b>${t.aiConfidence}%</b></div>
          </div>
        </div>
        <div class="card card-pad">
          <h3 class="mb-3">Customer</h3>
          <div class="flex items-center gap-3 mb-3">${avatarHtml(t.customer, "lg")}<div><div class="font-semibold">${esc(t.customer)}</div><div class="text-sm text-3">${esc(t.company)}</div></div></div>
          <a href="#/customer/c-brightloop" class="btn btn-secondary btn-sm" style="width:100%">Open Customer 360 →</a>
        </div>
      </div>
    </div>`;
  }
  function ticketFirstLine(t) {
    const map = {
      Billing: "I was charged twice this month and I need this fixed before our renewal.",
      Technical: "This started yesterday and it is blocking our team — can someone look at it today?",
      Account: "I need help with my account settings, the option I need is not where the docs say it is.",
      Onboarding: "We are new here and I want to make sure we set this up the right way.",
      "AI Quality": "The AI reply we received was wrong and it confused our customer.",
      "Feature Request": "Would it be possible to add this? It would save our team a lot of time.",
      Integrations: "The integration stopped working and our data is not syncing anymore."
    };
    return map[t.category] || "I need help with this issue, please.";
  }
  function ticketReplyLine(t) {
    const map = {
      Billing: "I can see the duplicate charge on your account. I have raised a refund for the extra amount and flagged the proration for review — no action needed from you.",
      Technical: "Thanks for the details. I reproduced the issue on our side and escalated it to engineering with your logs attached. I will update you as soon as a fix ships.",
      Account: "Here is the step-by-step for your account: open Settings → Workspace → Members, and you will find the option under Roles. I can also walk you through it on a call.",
      Onboarding: "Welcome aboard. I have prepared a short checklist for your team — invites, roles, and your first automation. Let me know if anything is unclear.",
      "AI Quality": "You are right, that reply was incorrect. I have corrected it, retrained the agent on this case, and a human will review similar replies this week.",
      "Feature Request": "Thanks for the suggestion — I have logged it with the product team and linked it to your account so you get notified if it ships.",
      Integrations: "I checked the connection logs and the sync token expired. I have reconnected it — your data should start syncing within a few minutes."
    };
    return map[t.category] || "Thanks for reaching out — I am looking into this now and will update you shortly.";
  }

  /* ============ 6. AI Triage & Automation ============ */
  function triage() {
    const rules = DATA.workflows.slice(0, 6);
    return pageHead("AI Triage & Automation", "Rules that decide what the AI answers, escalates or tags — before a human sees it", `
      <button class="btn" onclick="toast('New triage rule created (draft)','success')">+ New rule</button>`) + `
    <div class="stat-grid mb-4">
      ${statCard({ label: "Rules active", value: DATA.workflows.filter(w => w.status === "active").length + " / " + DATA.workflows.length, sub: "1 paused", icon: "⚙" })}
      ${statCard({ label: "Auto-triaged (14d)", value: fmt.num(M.totalResolved14), sub: "of all tickets", icon: "✦" })}
      ${statCard({ label: "Avg confidence", value: "91%", sub: "escalate below 75%", icon: "◈" })}
      ${statCard({ label: "Escalation rate", value: M.escRate + "%", sub: "guardrail 15%", icon: "⬆" })}
      ${statCard({ label: "Rule success rate", value: "99%", sub: "last 30 days", icon: "✓" })}
    </div>
    <div class="grid col-7-5 mb-4">
      <div class="card">
        <div class="card-head"><div><h3>Triage rules</h3><div class="text-sm text-3">Evaluated in order — first match wins</div></div></div>
        <div class="table-wrap"><table class="data"><thead><tr><th>Rule</th><th>Trigger</th><th>Condition</th><th>Action</th><th>Runs</th><th></th></tr></thead>
        <tbody>${rules.map(w => `<tr><td class="font-semibold">${esc(w.name)}</td><td>${esc(w.trigger)}</td><td>${esc(w.condition)}</td><td>${esc(w.action)}</td><td>${fmt.num(w.runs)}</td><td>${toggleInput(w.status === "active", "tgl-" + w.id)}</td></tr>`).join("")}</tbody></table></div>
      </div>
      <div class="flex flex-col gap-4">
        <div class="card card-pad">
          <h3 class="mb-2">Confidence thresholds</h3>
          <p class="text-sm text-3 mb-4">The AI only replies on its own above the threshold. Below it, the ticket escalates to a human with a draft attached.</p>
          <div class="field"><label>Auto-reply threshold — 90%</label><input type="range" min="50" max="99" value="90" style="width:100%;accent-color:var(--brand-600)"></div>
          <div class="field mt-4"><label>Escalate threshold — 75%</label><input type="range" min="50" max="95" value="75" style="width:100%;accent-color:var(--danger-500)"></div>
          <div class="field mt-4"><label>Auto-tag threshold — 80%</label><input type="range" min="50" max="99" value="80" style="width:100%;accent-color:var(--ai-500)"></div>
        </div>
        <div class="copilot"><div class="copilot-body">
          <div class="ai-chip mb-2">✦ AI insight</div>
          <p class="text-sm text-2" style="line-height:1.65">Pax escalates <b>18%</b> of its tasks — above the 15% guardrail. Its confidence on French tickets is 12 points lower than average. Consider routing French tickets to Orion until Pax is retrained.</p>
        </div></div>
      </div>
    </div>`;
  }

  /* ============ 7. AI Copilot Playground ============ */
  function playground() {
    const history = [
      { q: "Draft a refund reply for a customer charged twice", model: "AD-4 Turbo", tokens: 1840, cost: "$0.18", time: "2 min ago" },
      { q: "Summarize ticket AD-1039 for engineering", model: "AD-4 Turbo", tokens: 2210, cost: "$0.22", time: "18 min ago" },
      { q: "Translate this reply to French, formal tone", model: "AD-4", tokens: 940, cost: "$0.09", time: "1 h ago" },
      { q: "List the top 3 causes of escalations this week", model: "AD-4 Turbo", tokens: 3120, cost: "$0.31", time: "3 h ago" }
    ];
    return pageHead("AI Copilot Playground", "Test prompts, models and grounding before they reach customers", `
      <button class="btn btn-secondary" onclick="toast('Playground history cleared','info')">Clear history</button>`) + `
    <div class="grid col-7-5">
      <div class="card card-pad">
        <div class="flex gap-3 mb-4" style="flex-wrap:wrap">
          <select class="select" style="width:200px" id="pg-model"><option>AD-4 Turbo</option><option>AD-4</option><option>AD-3.5</option></select>
          <select class="select" style="width:180px"><option>Temperature 0.3 (precise)</option><option>Temperature 0.7 (balanced)</option><option>Temperature 1.0 (creative)</option></select>
          <label class="checkbox-row"><input type="checkbox" checked> Ground in KB</label>
          <label class="checkbox-row"><input type="checkbox" checked> Cite sources</label>
        </div>
        <div class="prompt-box mb-3"><textarea id="pg-prompt" placeholder="Ask the copilot anything — e.g. “Draft a reply for a customer whose invoice was charged twice…”">Draft a reply for a customer whose invoice was charged twice after upgrading.</textarea>
          <button class="btn btn-ai" onclick="ADRunPlayground()">▶ Run</button></div>
        <div class="card" style="background:var(--surface-2)">
          <div class="card-body">
            <div class="flex items-center gap-2 mb-2"><span class="ai-chip">✦ AI · AD-4 Turbo</span><span class="text-xs text-3">Grounded in 3 sources · 1,840 tokens · $0.18</span></div>
            <p class="text-sm text-2 typing-caret" id="pg-output" style="line-height:1.7">Hi Elena — thanks for flagging this. I can see the duplicate charge of $249 on invoice INV-8841. I have already raised a refund for the extra amount; it should reach your card within 3–5 business days. Your plan upgrade itself is correct, and I have flagged the proration for review so it does not happen again.</p>
            <div class="flex gap-2 mt-3" style="flex-wrap:wrap"><span class="chip">📄 Refund policy: 30-day window</span><span class="chip">📄 Understanding your invoice</span><span class="chip">📄 Escalation rules — VIP</span></div>
          </div>
        </div>
        <div class="flex gap-2 mt-4">
          <button class="btn btn-secondary btn-sm" onclick="toast('Copied to clipboard','success')">Copy output</button>
          <button class="btn btn-secondary btn-sm" onclick="toast('Saved as macro draft','success')">Save as macro</button>
          <button class="btn btn-ghost btn-sm" onclick="toast('Feedback recorded — thanks','success')">👍 Helpful</button>
          <button class="btn btn-ghost btn-sm" onclick="toast('Feedback recorded — the team will review','info')">👎 Not helpful</button>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <div class="card card-pad">
          <h3 class="mb-3">Token &amp; cost meter</h3>
          <div class="meter-row mb-2"><span class="text-sm">This session</span><b>5,990 tokens · $0.60</b></div>
          ${progressBar(24, "ai")}
          <div class="divider"></div>
          <div class="stat-list">
            <div class="row"><span>Plan allowance</span><b>25M tokens / cycle</b></div>
            <div class="row"><span>Used this cycle</span><b>${fmt.tokens(M.tokensTotal)} (74%)</b></div>
            <div class="row"><span>Cost this cycle</span><b>${fmt.money(M.aiCost)}</b></div>
          </div>
        </div>
        <div class="card">
          <div class="card-head"><h3>Run history</h3></div>
          <div class="card-body" style="padding-top:8px">
            ${history.map(h => `<div class="flex items-start gap-2" style="padding:10px 0;border-bottom:1px solid var(--border)">
              <span class="ai-chip">✦</span><div class="grow"><div class="text-sm font-medium">${esc(h.q)}</div>
              <div class="text-xs text-3">${h.model} · ${fmt.num(h.tokens)} tokens · ${h.cost} · ${h.time}</div></div></div>`).join("")}
          </div>
        </div>
      </div>
    </div>`;
  }

  return { overview, fleet, agentDetail, inbox, ticketDetail, triage, playground };
})();

if (typeof window !== "undefined") window.ScreensA = ScreensA;
if (typeof module !== "undefined") module.exports = ScreensA;

/* ---- Screens 8–14 appended ---- */
Object.assign(ScreensA, (() => {
  const { DATA, fmt } = window.AD;
  const { esc, badge, statusBadge, priorityBadge, channelBadge, confidenceBadge,
    avatarHtml, statCard, progressBar, toggleInput, sectionCard,
    dataTable, copilotPanel, legend } = window.AD;
  const { svgLine, svgLineDual, svgBars, svgDonut, svgGauge } = window.ADCharts;
  const M = DATA.metrics;
  const S = DATA.series14;

  function pageHead(title, sub, actions) {
    return `<div class="page-head"><div><h1>${esc(title)}</h1><div class="page-sub">${esc(sub)}</div></div>
      <div class="flex gap-2">${actions || ""}</div></div>`;
  }

  /* ============ 8. Knowledge Base ============ */
  function kb() {
    const cols = [
      { key: "title", label: "Article", render: r => `<a href="#/article/${r.id}" class="font-semibold">${esc(r.title)}</a><div class="text-xs text-3">${esc(r.category)}</div>`, search: r => r.title + " " + r.category },
      { key: "status", label: "Status", render: r => statusBadge(r.status) + (r.aiDrafted ? ` <span style="margin-left:4px">${badge("AI", "ai")}</span>` : "") },
      { key: "views", label: "Views", render: r => fmt.num(r.views) },
      { key: "helpful", label: "Helpful", render: r => r.helpful ? r.helpful + "%" : "—" },
      { key: "updated", label: "Updated", render: r => esc(r.updated) }
    ];
    window.AD.tables["kb"] = { columns: cols, rows: DATA.kb.slice(), page: 1, pageSize: 8, sortKey: "views", sortDir: "desc", query: "" };
    const cats = ["All", "Account", "Billing", "Technical", "Getting Started", "Integrations", "Developers", "Productivity", "AI"];
    return pageHead("Knowledge Base", M.kbPublished + " published · " + M.kbDrafts + " drafts · 18% of chats deflected by articles", `
      <button class="btn btn-secondary" onclick="toast('AI drafted 2 new articles — review them below','success')">✦ Draft with AI</button>
      <button class="btn" onclick="toast('New article editor opened (demo action)','info')">+ New article</button>`) + `
    <div class="flex gap-2 mb-4" style="flex-wrap:wrap">${cats.map((c, i) => `<button class="chip" ${i === 0 ? 'style="background:var(--brand-600);color:#fff;border-color:var(--brand-600)"' : ""}>${c}</button>`).join("")}</div>
    ${dataTable("kb", cols, DATA.kb, { pageSize: 8 })}`;
  }

  /* ============ 9. Article detail / editor ============ */
  function article(id) {
    const a = DATA.kb.find(x => x.id === id) || DATA.kb[0];
    const versions = [
      { v: "v1.4", date: a.updated, author: "Mara Jensen", note: "Updated screenshots for the new settings layout." },
      { v: "v1.3", date: "Oct 28, 2026", author: "Ava (AI)", note: "AI rewrite — shortened steps, added FAQ." },
      { v: "v1.2", date: "Oct 12, 2026", author: "Diego Fuentes", note: "Added troubleshooting section." },
      { v: "v1.1", date: "Sep 30, 2026", author: "Mara Jensen", note: "First published version." }
    ];
    return pageHead("Edit article", a.category + " · " + fmt.num(a.views) + " views · " + (a.helpful ? a.helpful + "% found it helpful" : "Not published yet"), `
      <button class="btn btn-secondary" onclick="toast('Preview opened in a new tab (demo)','info')">Preview</button>
      <button class="btn" onclick="toast('Article published — visible in the help center','success')">${a.status === "published" ? "Save changes" : "Publish article"}</button>`) + `
    <div class="grid col-3-2">
      <div class="card card-pad">
        <div class="field mb-4"><label>Title</label><input class="input" value="${esc(a.title)}"></div>
        <div class="field mb-4"><label>Category</label><select class="select"><option>${esc(a.category)}</option><option>Account</option><option>Billing</option><option>Technical</option><option>Getting Started</option></select></div>
        <div class="field"><label>Body</label><textarea class="textarea" style="min-height:260px">## ${esc(a.title)}

This article explains ${esc(a.title.toLowerCase())} step by step.

### Before you start
Make sure you are signed in as a workspace admin. Some steps require the Owner or Support Lead role.

### Steps
1. Open **Settings → Workspace** in the sidebar.
2. Follow the checklist on the right — each step takes under a minute.
3. If anything looks different from the screenshots, check that you are on version 1.4.0 or later.

### Still stuck?
Open a ticket from the help center and reference this article — the AI copilot will pick up where you left off.</textarea></div>
        <div class="flex items-center gap-3 mt-4">
          ${toggleInput(a.status === "published", "pub-toggle")}<span class="text-sm">Published in help center</span>
          <span class="text-sm text-3" style="margin-left:auto">Last saved 2 min ago · Autosave on</span>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        ${copilotPanel({
          model: "AD-4 Turbo",
          summary: "This article is performing well: " + (a.helpful || 90) + "% of readers found it helpful. The AI suggests shortening step 2 and adding a screenshot of the new settings layout — the current one is from v1.3.",
          suggestions: [
            { text: "Rewrite step 2 in plain language and add the new settings screenshot.", confidence: 93 },
            { text: "Add a short FAQ: “What if I am not an admin?” — it is the #1 search that lands here.", confidence: 89 }
          ],
          sources: ["Article analytics", "Search terms — last 30 days"]
        })}
        <div class="card">
          <div class="card-head"><h3>Version history</h3></div>
          <div class="card-body" style="padding-top:8px">
            ${versions.map(v => `<div class="flex items-start gap-3" style="padding:10px 0;border-bottom:1px solid var(--border)">
              <span class="badge badge-brand">${v.v}</span><div class="grow"><div class="text-sm font-medium">${esc(v.note)}</div>
              <div class="text-xs text-3">${esc(v.author)} · ${esc(v.date)}</div></div>
              <button class="btn btn-ghost btn-sm" onclick="toast('Restored ${v.v} (demo action)','info')">Restore</button></div>`).join("")}
          </div>
        </div>
      </div>
    </div>`;
  }

  /* ============ 10. Customers ============ */
  function customers() {
    const atRisk = DATA.customers.filter(c => c.health < 75).length;
    const avgHealth = Math.round(DATA.customers.reduce((a, c) => a + c.health, 0) / DATA.customers.length);
    const cols = [
      { key: "name", label: "Customer", render: r => `<div class="flex items-center gap-2">${avatarHtml(r.name, "sm")}<div><div class="font-semibold">${esc(r.name)}</div><div class="text-xs text-3">${esc(r.contact)} · ${esc(r.email)}</div></div></div>`, search: r => r.name + " " + r.contact + " " + r.email },
      { key: "plan", label: "Plan", render: r => badge(r.plan, r.plan === "Enterprise" ? "brand" : r.plan === "Scale" ? "info" : "neutral") },
      { key: "segment", label: "Segment", render: r => esc(r.segment) },
      { key: "health", label: "Health", render: r => `<div class="flex items-center gap-2" style="min-width:120px">${progressBar(r.health, r.health < 75 ? "warning" : "success")}<b>${r.health}</b></div>` },
      { key: "mrr", label: "MRR", render: r => fmt.money(r.mrr) },
      { key: "since", label: "Customer since", render: r => esc(r.since) },
      { key: "id", label: "", render: r => `<a href="#/customer/${r.id}" class="btn btn-ghost btn-sm">360° →</a>`, sortable: false }
    ];
    window.AD.tables["customers"] = { columns: cols, rows: DATA.customers.slice(), page: 1, pageSize: 8, sortKey: "health", sortDir: "asc", query: "" };
    return pageHead("Customers", M.customersTotal + " accounts · " + fmt.money(M.mrrTotal) + " MRR · " + atRisk + " at risk", `
      <button class="btn btn-secondary" onclick="toast('Customer export started — CSV will arrive by email','success')">Export CSV</button>
      <button class="btn" onclick="toast('New customer form opened (demo action)','info')">+ New customer</button>`) + `
    <div class="stat-grid mb-4">
      ${statCard({ label: "Total customers", value: M.customersTotal, sub: "5 Enterprise · 3 Scale", icon: "🏢" })}
      ${statCard({ label: "Monthly recurring", value: fmt.money(M.mrrTotal), delta: "6% vs last month", deltaDir: "up", sub: "across all plans", icon: "$" })}
      ${statCard({ label: "Avg health score", value: avgHealth + " / 100", sub: "at risk below 75", icon: "♥" })}
      ${statCard({ label: "At-risk accounts", value: atRisk, delta: "1 improved this week", deltaDir: "down", sub: "health < 75", icon: "⚠" })}
      ${statCard({ label: "Avg CSAT", value: M.csat.toFixed(1) + " / 5", sub: "last 30 days", icon: "★" })}
    </div>
    ${dataTable("customers", cols, DATA.customers, { pageSize: 8 })}`;
  }

  /* ============ 11. Customer 360 ============ */
  function customer360(id) {
    const c = DATA.customers.find(x => x.id === id) || DATA.customers[0];
    const myTickets = DATA.tickets.filter(t => t.company === c.name);
    const myFeedback = DATA.feedback.filter(f => f.customer === c.name);
    const csat = myFeedback.length ? (myFeedback.reduce((a, f) => a + f.rating, 0) / myFeedback.length).toFixed(1) : "—";
    return pageHead(c.name, c.segment + " · Customer since " + c.since + " · " + c.plan + " plan", `
      <button class="btn btn-secondary" onclick="toast('Note added to ${esc(c.name)}','success')">+ Add note</button>
      <button class="btn" onclick="toast('Opening a ticket for ${esc(c.name)}','info')">+ New ticket</button>`) + `
    <div class="grid col-3-2 mb-4">
      <div class="card card-pad">
        <div class="flex items-center gap-4 mb-4">
          ${avatarHtml(c.name, "xl")}
          <div><div class="font-bold text-xl">${esc(c.name)}</div><div class="text-sm text-3">${esc(c.contact)} · ${esc(c.email)}</div></div>
          <span style="margin-left:auto">${badge(c.plan, "brand")}</span>
        </div>
        <div class="stat-list">
          <div class="row"><span>Health score</span><b>${c.health} / 100</b></div>
          <div class="row"><span>MRR</span><b>${fmt.money(c.mrr)} / mo</b></div>
          <div class="row"><span>Tickets (in queue)</span><b>${myTickets.length}</b></div>
          <div class="row"><span>CSAT (surveys)</span><b>${csat} / 5</b></div>
          <div class="row"><span>Primary contact</span><b>${esc(c.contact)}</b></div>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        ${copilotPanel({
          model: "AD-4 Turbo",
          summary: c.name + " is a " + c.plan + " customer since " + c.since + " with a health score of " + c.health + "/100. " + (c.health < 75 ? "Health is below the 75 guardrail — recent tickets were mostly billing and AI-quality issues. A proactive check-in from the Success team is recommended this week." : "Account is healthy. Recent tickets were routine, and CSAT is above the team average."),
          suggestions: [
            { text: "Proactive check-in: “Hi " + c.contact.split(" ")[0] + " — I noticed two billing tickets this month. Want a 15-minute call to review your invoices?”", confidence: 91 },
            { text: "Offer the new SSO guide — their team grew to 12 seats last month.", confidence: 86 }
          ],
          sources: ["Ticket history", "CSAT surveys", "Billing records"]
        })}
        <div class="card card-pad">
          <h3 class="mb-2">Health</h3>
          <div class="flex items-center gap-4">${svgGauge(c.health, { label: "health score", color: c.health < 75 ? "#f59e0b" : "#14b8a6" })}
          <p class="text-sm text-2" style="line-height:1.65">Health blends ticket volume, CSAT, response times and plan usage. Below 75 the account is flagged at-risk and appears in the weekly Success review.</p></div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-head"><div><h3>Tickets — ${esc(c.name)}</h3><div class="text-sm text-3">${myTickets.length} in the live queue</div></div></div>
      <div class="table-wrap"><table class="data"><thead><tr><th>Ticket</th><th>Subject</th><th>Priority</th><th>Status</th><th>AI conf.</th><th>SLA</th></tr></thead>
      <tbody>${myTickets.map(t => `<tr><td><a href="#/ticket/${t.id}" class="mono font-semibold">${t.id}</a></td><td>${esc(t.subject)}</td><td>${priorityBadge(t.priority)}</td><td>${statusBadge(t.status)}</td><td>${confidenceBadge(t.aiConfidence)}</td><td>${t.status === "solved" ? '<span class="text-3" style="font-size:13px">Met</span>' : slaTimer(t.slaMin)}</td></tr>`).join("") || `<tr><td colspan="6" style="text-align:center;color:var(--text-3);padding:24px">No tickets in the live queue.</td></tr>`}</tbody></table></div>
    </div>`;
  }

  /* ============ 12. Teams & Agents ============ */
  function teams() {
    const teamCards = DATA.teams.map(tm => {
      const members = DATA.humans.filter(h => h.team === tm.name);
      return `<div class="card card-pad">
        <div class="flex items-center justify-between mb-3"><h3>${esc(tm.name)}</h3>${badge(tm.members + " members", "brand")}</div>
        <div class="flex items-center gap-2 mb-4">${avatarStack(members.map(m => m.name))}<span class="text-sm text-3">${members.map(m => m.name.split(" ")[0]).join(", ")}</span></div>
        <div class="stat-list">
          <div class="row"><span>Open tickets</span><b>${tm.openTickets}</b></div>
          <div class="row"><span>CSAT</span><b>${tm.csat.toFixed(1)} / 5</b></div>
          <div class="row"><span>SLA compliance</span><b>${tm.slaCompliance}%</b></div>
        </div>
        <div class="mt-3">${progressBar(tm.slaCompliance, "success")}</div>
      </div>`;
    }).join("");
    const cols = [
      { key: "name", label: "Agent", render: r => `<div class="flex items-center gap-2">${avatarHtml(r.name)}<div><div class="font-semibold">${esc(r.name)}</div><div class="text-xs text-3">${esc(r.role)}</div></div></div>`, search: r => r.name + " " + r.role },
      { key: "team", label: "Team", render: r => badge(r.team, "neutral") },
      { key: "status", label: "Status", render: r => statusBadge(r.status) },
      { key: "openTickets", label: "Open", render: r => r.openTickets },
      { key: "csat", label: "CSAT", render: r => r.csat.toFixed(1) + " / 5" },
      { key: "firstResponseMin", label: "First response", render: r => r.firstResponseMin + " min" },
      { key: "shift", label: "Shift (UTC)", render: r => esc(r.shift) }
    ];
    window.AD.tables["teams"] = { columns: cols, rows: DATA.humans.slice(), page: 1, pageSize: 8, sortKey: "openTickets", sortDir: "desc", query: "" };
    return pageHead("Teams & Agents", DATA.humans.length + " human agents · " + DATA.teams.length + " teams · Coverage 24/5 across 3 shifts", `
      <button class="btn" onclick="toast('Invite sent (demo action)','success')">+ Invite agent</button>`) + `
    <div class="grid grid-3 mb-4">${teamCards}</div>
    ${dataTable("teams", cols, DATA.humans, { pageSize: 8 })}`;
  }

  /* ============ 13. Analytics — Support performance ============ */
  function analyticsSupport() {
    const byTeam = DATA.teams.map(tm => ({ team: tm.name, resolved: Math.round(M.totalResolved14 * (tm.openTickets / M.openTickets)), csat: tm.csat, sla: tm.slaCompliance }));
    return pageHead("Analytics — Support performance", "Last 14 days · " + DATA.meta.weekLabel, `
      <select class="select" style="width:170px"><option>Last 14 days</option><option>Last 30 days</option><option>Last 90 days</option></select>
      <button class="btn btn-secondary" onclick="toast('Report export started','success')">Export</button>`) + `
    <div class="stat-grid mb-4">
      ${statCard({ label: "First response", value: M.firstResponseMin + " min", delta: "0.4 min faster", deltaDir: "up", sub: "target: under 5 min", icon: "⚡" })}
      ${statCard({ label: "Avg resolution", value: M.resolutionH + " h", delta: "0.6 h faster", deltaDir: "up", sub: "target: under 8 h", icon: "✓" })}
      ${statCard({ label: "Backlog", value: M.openTickets + " open", delta: M.backlogDelta + "% vs last week", deltaDir: "down", sub: "falling for 3 weeks", icon: "📥" })}
      ${statCard({ label: "SLA compliance", value: M.slaCompliance + "%", delta: "1.2 pts up", deltaDir: "up", sub: "14 breaches this cycle", icon: "⏱" })}
      ${statCard({ label: "CSAT", value: M.csat.toFixed(1) + " / 5", delta: "0.2 up", deltaDir: "up", sub: "NPS " + M.nps, icon: "★" })}
    </div>
    <div class="grid col-7-5 mb-4">
      <div class="card chart-card"><h4>Received vs resolved</h4><div class="chart-sub">Daily volume, last 14 days</div>
        ${svgLineDual(S.received, S.resolved, S.days, {})}
        ${legend([{ color: "#6366f1", label: "Received" }, { color: "#14b8a6", label: "Resolved" }])}</div>
      <div class="card chart-card"><h4>First response by channel</h4><div class="chart-sub">Minutes to first human or AI reply</div>
        ${svgBars(DATA.channels.map(c => c.firstResponseMin), DATA.channels.map(c => c.name.split(" ")[0]), { color: "#38bdf8" })}
        <div class="stat-list mt-4">${DATA.channels.map(c => `<div class="row"><span>${c.icon} ${esc(c.name)}</span><b>${c.firstResponseMin} min · CSAT ${c.csat}</b></div>`).join("")}</div></div>
    </div>
    <div class="card">
      <div class="card-head"><div><h3>Performance by team</h3><div class="text-sm text-3">Resolved volume is split by each team's share of the open queue</div></div></div>
      <div class="table-wrap"><table class="data"><thead><tr><th>Team</th><th>Resolved (14d)</th><th>CSAT</th><th>SLA compliance</th><th></th></tr></thead>
      <tbody>${byTeam.map(r => `<tr><td class="font-semibold">${esc(r.team)}</td><td>${fmt.num(r.resolved)}</td><td>${r.csat.toFixed(1)} / 5</td><td>${r.sla}%</td><td style="width:180px">${progressBar(r.sla, "success")}</td></tr>`).join("")}</tbody></table></div>
    </div>`;
  }

  /* ============ 14. Analytics — AI performance ============ */
  function analyticsAI() {
    const byAgent = DATA.aiAgents.map(a => ({
      name: a.name, tasks: a.tasksToday, resolved: a.resolvedToday,
      rate: Math.round((a.resolvedToday / a.tasksToday) * 100),
      esc: Math.round((a.escalations / a.tasksToday) * 100),
      conf: a.avgConfidence, tokens: a.tokensToday,
      cost: Math.round((a.tokensToday / 1000) * DATA.meta.tokenRatePer1k)
    }));
    return pageHead("Analytics — AI performance", "Automation, escalation and cost — last 14 days", `
      <select class="select" style="width:170px"><option>Last 14 days</option><option>Last 30 days</option></select>
      <button class="btn btn-secondary" onclick="toast('AI report export started','success')">Export</button>`) + `
    <div class="stat-grid mb-4">
      ${statCard({ label: "Automation rate", value: M.aiRate + "%", delta: "4 pts vs last week", deltaDir: "up", sub: fmt.num(M.aiResolved14) + " of " + fmt.num(M.totalResolved14) + " resolved", icon: "✦" })}
      ${statCard({ label: "Escalation rate", value: M.escRate + "%", delta: "guardrail 15%", deltaDir: "down", sub: M.aiEscalations + " escalations today", icon: "⬆" })}
      ${statCard({ label: "Tokens (14d)", value: fmt.tokens(M.tokensTotal), delta: "74% of plan", deltaDir: "up", sub: "25M allowance / cycle", icon: "◈" })}
      ${statCard({ label: "AI cost (14d)", value: fmt.money(M.aiCost), delta: "$0.10 / 1K tokens", deltaDir: "up", sub: "on pace for $1,842 / cycle", icon: "$" })}
      ${statCard({ label: "Avg confidence", value: "91%", delta: "2 pts up", deltaDir: "up", sub: "lowest: Pax 84%", icon: "◈" })}
    </div>
    <div class="grid col-7-5 mb-4">
      <div class="card chart-card"><h4>Token usage — last 14 days</h4><div class="chart-sub">Millions of tokens per day · total ${fmt.tokens(M.tokensTotal)}</div>
        ${svgLine(S.tokensM, S.days, { color: "#14b8a6" })}</div>
      <div class="card chart-card"><h4>Cost by AI agent</h4><div class="chart-sub">Today · $0.10 per 1K tokens</div>
        ${svgBars(byAgent.map(a => a.cost), byAgent.map(a => a.name), { color: "#6366f1", highlight: 1 })}
        <div class="stat-list mt-4">${byAgent.map(a => `<div class="row"><span>${esc(a.name)}</span><b>${fmt.tokens(a.tokens)} · ${fmt.money(a.cost)}</b></div>`).join("")}</div></div>
    </div>
    <div class="card">
      <div class="card-head"><div><h3>Per-agent performance</h3><div class="text-sm text-3">Today · sorted by automation rate</div></div></div>
      <div class="table-wrap"><table class="data"><thead><tr><th>Agent</th><th>Tasks</th><th>Resolved</th><th>Automation</th><th>Escalation</th><th>Confidence</th><th>Tokens</th><th>Cost</th></tr></thead>
      <tbody>${byAgent.sort((a, b) => b.rate - a.rate).map(a => `<tr>
        <td><span class="flex items-center gap-2"><span class="avatar avatar-ai avatar-sm">${esc(a.name[0])}</span><b>${esc(a.name)}</b></span></td>
        <td>${a.tasks}</td><td>${a.resolved}</td><td><b>${a.rate}%</b></td><td>${a.esc}%</td><td>${confidenceBadge(a.conf)}</td>
        <td>${fmt.tokens(a.tokens)}</td><td>${fmt.money(a.cost)}</td></tr>`).join("")}</tbody></table></div>
      <div class="card-foot">Pax is below the 90% confidence bar — its handoff rules are under review. See <a href="#/triage">Triage &amp; Automation</a>.</div>
    </div>`;
  }

  return { kb, article, customers, customer360, teams, analyticsSupport, analyticsAI };
})());
