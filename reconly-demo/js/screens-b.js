/* ============================================================
   Reconly — Screens B: Money out (part 2), Intelligence
   ============================================================ */

const S2 = (window.AD.screens = window.AD.screens || {});
const MB = () => DATA.metrics;
const pageHeadB = (title, sub, actions = "") => `
  <div class="page-head">
    <div><h2>${esc(title)}</h2><p>${esc(sub)}</p></div>
    <div class="actions">${actions}</div>
  </div>`;

/* ================= VENDORS ================= */
S2["vendors"] = () => {
  AD.tables["vendors"] = {
    columns: [
      { key: "name", label: "Vendor", render: r => `<span class="flex items-center gap-2">${avatarHtml(r.name, "sm")}<a href="#/vendor-detail" class="font-semibold">${esc(r.name)}</a></span>` },
      { key: "category", label: "Category" },
      { key: "monthly", label: "Monthly", render: r => moneyCell(r.monthly, true) },
      { key: "ytd", label: "YTD spend", render: r => moneyCell(r.ytd) },
      { key: "renewal", label: "Renews" },
      { key: "owner", label: "Owner", render: r => `<span class="flex items-center gap-2">${avatarHtml(r.owner, "sm")}${esc(r.owner)}</span>` },
      { key: "status", label: "Status", render: r => statusBadge(r.status) }
    ],
    rows: DATA.vendors, pageSize: 8, page: 1
  };
  const monthlyTotal = DATA.vendors.reduce((a, v) => a + v.monthly, 0);
  return `
  ${pageHeadB("Vendors", "Supplier directory — spend, renewals and owners in one place", `<button class="btn btn-primary" onclick="toast('Vendor onboarding form opened','info')">＋ Add vendor</button>`)}
  <div class="grid grid-4 mb-4">
    ${statCard({ label: "Active vendors", value: String(DATA.vendors.length), sub: "Shown · directory total 47 vendors" })}
    ${statCard({ label: "Recurring monthly (top 10)", value: fmt.money(monthlyTotal), sub: "Subscriptions & usage-based" })}
    ${statCard({ label: "Renewing in 30 days", value: "2", sub: "HubSpot Nov 17 · AWS Dec 1" })}
    ${statCard({ label: "Duplicate categories", value: "1", delta: "$640/mo", deltaDir: "up", deltaGood: false, sub: "Transcription × 2 — see AI Costs" })}
  </div>
  ${dataTable("vendors", AD.tables["vendors"].columns, DATA.vendors, {})}
  <div class="mt-4">${copilotPanel({ label: "Vendor insight", summary: "HubSpot renews Nov 17 at +9% with 11 of 40 seats inactive. Vendors with an owner and a renewal alert saved an average of 12% at last renewal versus unowned ones — 9 of 47 vendors still have no owner.", suggestions: [{ text: "Assign owners to the 9 unowned vendors", confidence: 87 }], sources: ["Vendor directory", "Seat usage"] })}</div>`;
};

/* ================= VENDOR DETAIL ================= */
S2["vendor-detail"] = () => {
  const v = DATA.vendors[0]; // AWS
  return `
  ${pageHeadB(v.name, v.category + " · vendor since Jan 2023 · owner " + v.owner, `
    <button class="btn btn-secondary" onclick="toast('Contract PDF downloaded','success')">Contract</button>
    <button class="btn btn-primary" onclick="toast('Renewal playbook opened — 2 savings levers found','info')">Renewal playbook</button>`)}
  <div class="grid grid-4 mb-4">
    ${statCard({ label: "Monthly spend", value: fmt.money(v.monthly), delta: "+4.6% MoM", deltaDir: "up", deltaGood: false, sub: "Usage-based · no fixed commit", spark: v.trend, accent: "#38bdf8" })}
    ${statCard({ label: "YTD spend", value: fmt.money(v.ytd), sub: "Largest vendor by spend" })}
    ${statCard({ label: "Renewal / cycle", value: "Dec 1, 2026", sub: "Monthly billing · cancel anytime" })}
    ${statCard({ label: "Payment reliability", value: "100%", sub: "11 of 11 bills auto-matched in 2026" })}
  </div>
  <div class="grid grid-2-1">
    <div class="flex flex-col gap-4">
      ${sectionCard("Monthly spend — last 7 months", "USD", "", svgBars(v.trend, ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov*"], { color: "#38bdf8" }))}
      ${sectionCard("Recent bills", "Full history in Bills & Payables", `<a class="btn btn-ghost btn-sm" href="#/bills">All bills →</a>`, `
        <table class="data"><thead><tr><th>Bill</th><th>Period</th><th style="text-align:right">Amount</th><th>Status</th></tr></thead><tbody>
          <tr><td class="font-semibold">BILL-3121</td><td>October 2026</td><td style="text-align:right">${moneyCell(18940)}</td><td>${statusBadge("due")}</td></tr>
          <tr><td class="font-semibold">BILL-3087</td><td>September 2026</td><td style="text-align:right">${moneyCell(18100)}</td><td>${statusBadge("paid")}</td></tr>
          <tr><td class="font-semibold">BILL-3051</td><td>August 2026</td><td style="text-align:right">${moneyCell(17400)}</td><td>${statusBadge("paid")}</td></tr>
          <tr><td class="font-semibold">BILL-3019</td><td>July 2026</td><td style="text-align:right">${moneyCell(16900)}</td><td>${statusBadge("paid")}</td></tr>
        </tbody></table>`)}
    </div>
    <div class="flex flex-col gap-4">
      ${copilotPanel({ label: "Vendor analysis", summary: "Spend grew 25% in 7 months, tracking usage — but $3,940 of October was untagged dev instances. A Savings Plan on the stable baseline (≈ $14,200/mo) would cut ≈ 18% of compute cost, roughly $2,550/mo.", suggestions: [{ text: "Model a 1-year Savings Plan on the stable baseline", confidence: 90 }], sources: ["Usage reports", "Contract", "Tagging audit"] })}
      ${sectionCard("Vendor record", "", "", `
        <div class="flex flex-col gap-2 text-sm">
          <div class="flex justify-between"><span>Legal name</span><strong>Amazon Web Services, Inc.</strong></div>
          <div class="flex justify-between"><span>Tax ID</span><span>On file · W-9 verified</span></div>
          <div class="flex justify-between"><span>Payment method</span><span>ACH · Operating •4821</span></div>
          <div class="flex justify-between"><span>Bank details changed</span><span>Never in 2026 ✓</span></div>
          <div class="flex justify-between"><span>Security review</span><span>SOC 2 · reviewed Aug 2026</span></div>
          <div class="flex justify-between"><span>Owner</span><span>${esc(v.owner)}</span></div>
        </div>`)}
    </div>
  </div>`;
};

/* ================= CARDS & TRANSACTIONS ================= */
S2["cards"] = () => {
  AD.tables["transactions"] = {
    columns: [
      { key: "id", label: "ID", render: r => `<span class="font-semibold">${esc(r.id)}</span>` },
      { key: "holder", label: "Card holder", render: r => `<span class="flex items-center gap-2">${avatarHtml(r.holder, "sm")}${esc(r.holder)}</span>` },
      { key: "merchant", label: "Merchant" },
      { key: "amount", label: "Amount", render: r => moneyCell(r.amount, true) },
      { key: "date", label: "Date" },
      { key: "category", label: "AI category", render: r => `<span class="flex items-center gap-2"><span class="grow">${esc(r.category)}</span>${confidenceBadge(r.confidence)}</span>` },
      { key: "status", label: "Receipt", render: r => statusBadge(r.status) }
    ],
    rows: DATA.transactions, pageSize: 8, page: 1
  };
  return `
  ${pageHeadB("Cards & Transactions", "Corporate cards with AI categorisation and receipt matching", `<button class="btn btn-secondary" onclick="toast('Card policy opened','info')">Card policy</button><button class="btn btn-primary" onclick="toast('Virtual card issued — limit $2,000/mo','success')">＋ Issue card</button>`)}
  <div class="grid grid-4 mb-4">
    ${statCard({ label: "Card spend (Nov, so far)", value: fmt.money(DATA.transactions.reduce((a, t) => a + t.amount, 0)), sub: DATA.transactions.length + " transactions shown" })}
    ${statCard({ label: "Auto-categorised", value: "98.6%", sub: "3 need review (low confidence)", accent: "#8b5cf6", spark: [95, 96, 97, 98, 98, 98.6] })}
    ${statCard({ label: "Receipts matched", value: "9 of 12", sub: "Delta + Uber receipts missing" })}
    ${statCard({ label: "Active cards", value: "14", sub: "11 physical · 3 virtual" })}
  </div>
  ${dataTable("transactions", AD.tables["transactions"].columns, DATA.transactions, {})}
  <div class="mt-4">${copilotPanel({ label: "Card insight", summary: "Two receipts are missing (Delta $412, Uber $86) — both travellers get an automatic nudge Friday. One transaction scored 42% confidence (Uber, tagged Travel) and is queued for review rather than guessed.", suggestions: [{ text: "Send receipt nudges now instead of Friday", confidence: 86 }], sources: ["Card feed", "Receipt inbox"] })}</div>`;
};

/* ================= PAYROLL ================= */
S2["payroll"] = () => {
  const p = DATA.payroll;
  return `
  ${pageHeadB("Payroll", "People costs — the largest line in the P&L, fully reconciled", `<button class="btn btn-secondary" onclick="toast('Payroll journal exported to QuickBooks','success')">Export journal</button><button class="btn btn-primary" onclick="toast('November run is a draft until Nov 24','info')">Review Nov run</button>`)}
  <div class="grid grid-4 mb-4">
    ${statCard({ label: "October payroll (gross)", value: fmt.money(p.totalOct), sub: p.headcount + " employees · via Deel", spark: [204, 208, 211, 214, 216, 218.4], accent: "#10b981" })}
    ${statCard({ label: "Employer taxes & benefits", value: fmt.money(p.employerTaxesOct), sub: "Included in the Payroll category total" })}
    ${statCard({ label: "Next run", value: p.nextRun, sub: "Estimated " + fmt.money(p.nextRunEst) + " gross" })}
    ${statCard({ label: "Headcount", value: String(p.headcount), delta: "+2 in Oct", deltaDir: "up", deltaGood: true, sub: "Engineering +1 · CS +1" })}
  </div>
  <div class="grid grid-2-1">
    ${sectionCard("Gross pay by department — October", "Sums to the payroll total and the P&L category", "", `
      <div class="flex flex-col gap-3">
      ${p.byDept.map(d => `<div><div class="flex justify-between text-sm mb-2"><span class="font-semibold">${esc(d.dept)}</span><span>${fmt.money(d.amount)} · ${d.people} people</span></div>${progressBar(Math.round(d.amount / p.totalOct * 100))}</div>`).join("")}
      </div>`, `<span class="text-sm text-3">Per-employee average: ${fmt.money(Math.round(p.totalOct / p.headcount))}/month gross</span>`)}
    <div class="flex flex-col gap-4">
      ${sectionCard("Run calendar", "", "", `
        <div class="timeline">
          <div class="timeline-item"><span class="timeline-dot"></span><div><strong>October run paid</strong><div class="text-sm text-3">Oct 28 · ${fmt.money(p.totalOct)} · 0 corrections</div></div></div>
          <div class="timeline-item"><span class="timeline-dot"></span><div><strong>Journal posted to QuickBooks</strong><div class="text-sm text-3">Oct 29 · matched to bank debit</div></div></div>
          <div class="timeline-item"><span class="timeline-dot" style="background:var(--warning-500);box-shadow:0 0 0 3px var(--warning-50)"></span><div><strong>November draft closes</strong><div class="text-sm text-3">Nov 24 · 2 new starters, 1 leaver</div></div></div>
          <div class="timeline-item"><span class="timeline-dot"></span><div><strong>November run</strong><div class="text-sm text-3">Nov 28 · est. ${fmt.money(p.nextRunEst)}</div></div></div>
        </div>`)}
      ${copilotPanel({ label: "Payroll insight", summary: "November's estimate includes both new starters for a full month. One flag: the Sales team's overtime is 3.1× the company average for the second month — worth a look before it becomes the baseline.", suggestions: [], sources: ["Deel payroll", "HR roster"] })}
    </div>
  </div>`;
};

/* ================= BUDGETS ================= */
S2["budgets"] = () => {
  const m = MB();
  return `
  ${pageHeadB("Budgets", "Plan vs. actual — October closed inside plan overall", `<button class="btn btn-secondary" onclick="toast('Budget template exported','success')">Export</button><button class="btn btn-primary" onclick="toast('Q1 2027 planning workspace created','success')">Plan Q1 2027</button>`)}
  <div class="grid grid-3 mb-4">
    ${statCard({ label: "October budget", value: fmt.money(m.deptBudget), sub: "Across " + DATA.departments.length + " departments" })}
    ${statCard({ label: "October actual", value: fmt.money(m.deptActual), delta: "−4.5% under", deltaDir: "down", deltaGood: true, sub: "Savings held despite cloud overage" })}
    ${statCard({ label: "Departments over plan", value: "0", sub: "Engineering closest at 96%" })}
  </div>
  <div class="flex flex-col gap-4">
    ${DATA.departments.map(d => {
      const pct = Math.round(d.actual / d.budget * 100);
      return `<div class="card"><div class="card-body">
        <div class="flex items-center gap-3" style="flex-wrap:wrap">
          <div class="grow" style="min-width:200px"><strong>${esc(d.name)}</strong><div class="text-sm text-3">Lead ${esc(d.lead)} · ${d.headcount} people</div></div>
          <div style="min-width:220px" class="grow">${budgetMeter(d.actual, d.budget)}</div>
          <div style="text-align:right;min-width:170px"><strong>${fmt.money(d.actual)}</strong> <span class="text-3">of ${fmt.money(d.budget)}</span><div class="text-sm ${pct >= 95 ? "text-3" : "text-3"}">${fmt.money(d.budget - d.actual)} remaining · ${pct}% used</div></div>
        </div>
      </div></div>`;
    }).join("")}
  </div>
  <div class="mt-4">${copilotPanel({ label: "Budget insight", summary: "Every department landed inside plan — the first clean month since June. Engineering's 96% includes the AWS overage; without it they'd be at 93%. Q1 planning should lift the cloud line by ~8% rather than pretend October's usage was a one-off.", suggestions: [{ text: "Pre-fill Q1 cloud budget at +8% in the planning workspace", confidence: 89 }], sources: ["Budgets", "AP ledger", "Usage reports"] })}</div>`;
};

/* ================= AI COST INTELLIGENCE ================= */
S2["ai-costs"] = () => {
  const m = MB();
  const maxCost = Math.max(...DATA.aiTools.map(t => t.cost));
  return `
  ${pageHeadB("AI Cost Intelligence", "What the AI stack costs — and what it earns back", `<button class="btn btn-secondary" onclick="toast('AI spend report exported (PDF)','success')">Export report</button>`)}
  <div class="grid grid-4 mb-4">
    ${statCard({ label: "AI spend — October", value: fmt.money(m.aiSpend), sub: "Tools below sum to this total", accent: "#8b5cf6", spark: [7.9, 8.2, 8.4, 8.6, 8.8, 8.94] })}
    ${statCard({ label: "Tokens processed", value: DATA.headline.aiTokensM + "M", sub: "Across 2 API providers" })}
    ${statCard({ label: "Identified waste", value: fmt.money(920) + "/mo", delta: fmt.money(11040) + "/yr", deltaDir: "up", deltaGood: false, sub: "Duplicates + idle seats" })}
    ${statCard({ label: "Automation ROI", value: "23.7×", sub: "212 h saved vs tooling cost" })}
  </div>
  <div class="grid grid-2-1">
    ${sectionCard("AI tools — October cost", "Flags are raised by Reconly, not by the vendors", "", `
      <div class="flex flex-col gap-4">
      ${DATA.aiTools.map(t => `<div>
        <div class="flex items-center gap-2 text-sm" style="flex-wrap:wrap"><strong class="grow">${esc(t.name)}</strong><span class="text-3">${esc(t.kind)}${t.tokensM ? " · " + t.tokensM + "M tokens" : ""}</span><strong>${fmt.money(t.cost)}</strong></div>
        <div class="mt-2">${progressBar(Math.round(t.cost / maxCost * 100))}</div>
        ${t.flag ? `<div class="ai-note"><span class="ai-chip">✦ Flag</span> ${esc(t.flag)}</div>` : ""}
      </div>`).join("")}
      </div>`)}
    <div class="flex flex-col gap-4">
      ${copilotPanel({ label: "Optimisation plan", summary: "Cancel ScribeAI ($640/mo — EchoNotes covers transcription), reclaim 14 idle Copilot seats ($280/mo), and consolidate API traffic to Provider A at the current volume tier (−$190/mo). Total: $1,110/mo without touching a single workflow anyone uses daily.", suggestions: [{ text: "Cancel ScribeAI at the Nov 30 renewal", confidence: 93 }, { text: "Reclaim the 14 idle Copilot seats", confidence: 97 }], sources: ["Seat activity", "API usage", "Contracts"] })}
      ${sectionCard("Cost per outcome", "Unit economics the CFO actually asks about", "", `
        <div class="flex flex-col gap-2 text-sm">
          <div class="flex justify-between"><span>Cost per auto-matched document</span><strong>$0.64</strong></div>
          <div class="flex justify-between"><span>Cost per support reply drafted</span><strong>$0.11</strong></div>
          <div class="flex justify-between"><span>Cost per 1M tokens (blended)</span><strong>$61.30</strong></div>
          <div class="flex justify-between"><span>Manual-entry cost avoided</span><strong>$18,900/mo</strong></div>
        </div>`)}
    </div>
  </div>`;
};

/* ================= FORECAST & SCENARIOS ================= */
S2["forecast"] = () => {
  const s = DATA.series12;
  const projected = [1319000, 1353000, 1391000, 1426000, 1464000, 1501000];
  return `
  ${pageHeadB("Forecast & Scenarios", "Move the levers — the runway math updates live", `<button class="btn btn-secondary" onclick="toast('Scenario saved as “Base — Nov plan”','success')">Save scenario</button>`)}
  <div class="grid grid-2-1">
    <div class="flex flex-col gap-4">
      ${sectionCard("Projected cash — next 6 months (base case)", "Built from AR/AP schedules, payroll and the MRR trend", "", svgArea(projected, ["Dec", "Jan", "Feb", "Mar", "Apr", "May"], { color: "#38bdf8", fmt: fmt.k }))}
      ${sectionCard("Scenario presets", "One click loads the assumptions", "", `
        <div class="grid grid-3">
          <div class="card" style="box-shadow:none"><div class="card-body"><strong>Downside</strong><div class="text-sm text-3 mt-2">Revenue −15% · costs +8% · hiring freeze</div><div class="font-bold mt-2" style="color:var(--danger-600)">24.6 mo runway</div></div></div>
          <div class="card" style="box-shadow:none;border-color:var(--brand-500)"><div class="card-body"><strong>Base case</strong><div class="text-sm text-3 mt-2">Trend growth · planned hiring · October cost base</div><div class="font-bold mt-2" style="color:var(--success-600)">Cash-positive</div></div></div>
          <div class="card" style="box-shadow:none"><div class="card-body"><strong>Upside</strong><div class="text-sm text-3 mt-2">Revenue +12% · NRR 108% · 3 enterprise logos</div><div class="font-bold mt-2" style="color:var(--success-600)">Cash-positive + hiring</div></div></div>
        </div>`)}
    </div>
    <div class="flex flex-col gap-4">
      <div class="card"><div class="card-head"><h3>Levers</h3></div><div class="card-body flex flex-col gap-4">
        <div class="field"><label class="flex justify-between"><span>Revenue change</span><strong id="fc-rev-val">+0%</strong></label><input type="range" id="fc-rev" min="-30" max="30" value="0" style="width:100%"></div>
        <div class="field"><label class="flex justify-between"><span>Cost change</span><strong id="fc-cost-val">+0%</strong></label><input type="range" id="fc-cost" min="-20" max="30" value="0" style="width:100%"></div>
        <div class="field"><label class="flex justify-between"><span>New hires (at $8,400/mo each)</span><strong id="fc-hire-val">0 hires</strong></label><input type="range" id="fc-hire" min="0" max="12" value="0" style="width:100%"></div>
        <div class="divider"></div>
        <div class="flex justify-between text-sm"><span>Monthly net</span><strong id="fc-net">—</strong></div>
        <div class="progress"><i id="fc-net-bar" style="width:40%"></i></div>
        <div class="flex justify-between text-sm"><span>Runway at this pace</span><strong id="fc-runway">—</strong></div>
      </div></div>
      ${copilotPanel({ label: "Scenario read", summary: "The base case stays cash-positive because October's cost base dropped 16.9% while MRR compounded. The plan only breaks if revenue falls >13% with costs held flat — the downside preset shows that path at 24.6 months of runway, still beyond any covenant horizon.", suggestions: [], sources: ["Forecast model v3", "AR/AP schedules"] })}
    </div>
  </div>`;
};

/* ================= AI FINANCE COPILOT ================= */
S2["copilot"] = () => `
  ${pageHeadB("AI Finance Copilot", "Ask about the books — every answer cites its records", `<span class="badge badge-ai">✦ Reconly AI</span>`)}
  <div class="grid grid-2-1">
    <div class="card"><div class="card-body">
      <div id="copilot-log" class="chat-log">
        <div class="chat-row"><span class="avatar avatar-sm" style="background:#171310">✦</span><div class="chat-bubble">Morning, Dana. October closed at <strong>+$56,630</strong> and cash is <strong>$1,284,600</strong>. Two things need you: INV-2039 is 18 days overdue, and the ScribeAI duplicate ($640/mo) is still live. Ask me anything — or tap a question.</div></div>
      </div>
      <div class="chat-input">
        <input class="input grow" id="copilot-input" placeholder="Ask about cash, invoices, runway, cuts…" aria-label="Ask the copilot">
        <button class="btn btn-primary" id="copilot-send">Ask ✦</button>
      </div>
      <div class="text-sm text-3 mt-2">Answers are computed from the live dataset on this page — try “runway” or “cut”.</div>
    </div></div>
    <div class="flex flex-col gap-4">
      ${sectionCard("Suggested questions", "Tap to ask", "", `
        <div class="flex flex-col gap-2">
          ${COPILOT_QA.map(x => `<button class="btn btn-secondary" style="justify-content:flex-start" data-copilot-q="${esc(x.q)}">✦ ${esc(x.q)}</button>`).join("")}
        </div>`)}
      ${sectionCard("Guardrails", "How the copilot is allowed to act", "", `
        <div class="flex flex-col gap-2 text-sm">
          <div class="flex items-center gap-2">${toggleInput(true, "cp-1")}<span>Draft reminders — send only ≤ $20K automatically</span></div>
          <div class="flex items-center gap-2">${toggleInput(true, "cp-2")}<span>Never move money without a human approval</span></div>
          <div class="flex items-center gap-2">${toggleInput(false, "cp-3")}<span>Share figures outside the workspace</span></div>
          <div class="flex items-center gap-2">${toggleInput(true, "cp-4")}<span>Always cite the records behind a number</span></div>
        </div>`)}
    </div>
  </div>`;

/* ================= TAX & COMPLIANCE ================= */
S2["tax"] = () => {
  const m = MB();
  return `
  ${pageHeadB("Tax & Compliance", "Indirect taxes collected, filed and due — by jurisdiction", `<button class="btn btn-secondary" onclick="toast('Tax summary exported (PDF)','success')">Export summary</button>`)}
  <div class="grid grid-3 mb-4">
    ${statCard({ label: "Collected in October", value: fmt.money(DATA.headline.taxCollectedOct), sub: "Across " + DATA.taxRows.length + " jurisdictions — ties to the rows below" })}
    ${statCard({ label: "Next deadline", value: "Dec 7, 2026", sub: "UK VAT return · draft ready" })}
    ${statCard({ label: "Filings on time (2026)", value: "11 of 11", sub: "No penalties, no notices" })}
  </div>
  ${sectionCard("Jurisdictions", "Collected in October · filing status · next due date", "", `
    <table class="data"><thead><tr><th>Jurisdiction</th><th>Type</th><th style="text-align:right">Collected (Oct)</th><th>Latest filing</th><th>Next due</th><th>Status</th></tr></thead><tbody>
    ${DATA.taxRows.map(t => `<tr><td class="font-semibold">${esc(t.jurisdiction)}</td><td>${esc(t.type)}</td><td style="text-align:right">${moneyCell(t.collected)}</td><td>${esc(t.filed)}</td><td>${esc(t.nextDue)}</td><td>${statusBadge(t.status)}</td></tr>`).join("")}
    </tbody></table>`)}
  <div class="grid grid-2 mt-4">
    ${sectionCard("Compliance checklist", "Standing obligations", "", `
      <div class="flex flex-col gap-2">
        ${[["W-9 / W-8 collection for all vendors", true], ["Sales-tax nexus review (2 new states in 2026)", true], ["UK VAT draft return — review by Dec 1", false], ["1099-NEC prep — contractor list verified", true], ["EU VAT MOSS — Q4 registration check", false]].map(([t, done]) => `<label class="flex items-center gap-2 text-sm"><input type="checkbox" ${done ? "checked" : ""}> ${esc(t)}</label>`).join("")}
      </div>`)}
    ${copilotPanel({ label: "Compliance note", summary: "October collections reconcile to the cent against Stripe tax reports in all four jurisdictions. The UK return is the only item needing a human before December — the draft is ready and the liability equals the $1,880 collected.", suggestions: [{ text: "Open the UK VAT draft return", confidence: 95 }], sources: ["Stripe tax reports", "Filing calendar"] })}
  </div>`;
};

/* ================= REPORTS ================= */
S2["reports"] = () => {
  const m = MB();
  return `
  ${pageHeadB("Reports", "Scheduled packs and on-demand exports — always from the same numbers", `<button class="btn btn-primary" onclick="toast('Report builder opened','info')">＋ New report</button>`)}
  <div class="grid grid-2-1">
    <div class="flex flex-col gap-4">
      ${DATA.reports.map(r => `<div class="card"><div class="card-body flex items-center gap-3">
        <span style="font-size:20px">📊</span>
        <div class="grow"><strong>${esc(r.name)}</strong><div class="text-sm text-3">${esc(r.cadence)} · ${esc(r.format)} · ${r.recipients} recipients · last run ${esc(r.lastRun)}</div></div>
        <button class="btn btn-secondary btn-sm" onclick="toast('Report run started — PDF lands in Reports','success')">Run now</button>
        <button class="btn btn-ghost btn-sm" onclick="toast('Schedule editor opened','info')">Schedule</button>
      </div></div>`).join("")}
    </div>
    <div class="flex flex-col gap-4">
      ${sectionCard("October close checklist", m.closeDone + " of " + m.closeTotal + " key tasks complete", "", `
        <div class="mb-3">${progressBar(Math.round(m.closeDone / m.closeTotal * 100))}</div>
        <div class="flex flex-col gap-2">
        ${DATA.closeChecklist.map(t => `<label class="flex items-center gap-2 text-sm"><input type="checkbox" ${t.done ? "checked" : ""}> <span class="grow">${esc(t.task)}</span><span class="text-3">${esc(t.owner)}</span></label>`).join("")}
        </div>`, `<span class="text-sm text-3">Close target: 5th business day · October closed on day 4</span>`)}
      ${copilotPanel({ label: "Reporting insight", summary: "Every scheduled report draws from the same reconciled dataset as these screens — the board pack's cash figure, the P&L's net and this dashboard can never disagree.", suggestions: [], sources: ["Report definitions"] })}
    </div>
  </div>`;
};

/* ================= CUSTOMERS (AR directory) ================= */
S2["customers"] = () => {
  const m = MB();
  const overdueCust = new Set(DATA.invoices.filter(i => i.status === "overdue").map(i => i.customer));
  const billedTotal = DATA.customers.reduce((a, c) => a + c.billedYtd, 0);
  AD.tables["customers"] = {
    columns: [
      { key: "name", label: "Customer", render: r => `<span class="flex items-center gap-2">${avatarHtml(r.name)}<span><strong>${esc(r.name)}</strong><br><span class="text-sm text-3">${esc(r.contact)} · ${esc(r.email)}</span></span></span>` },
      { key: "segment", label: "Segment" },
      { key: "terms", label: "Terms" },
      { key: "billedYtd", label: "Billed YTD", render: r => moneyCell(r.billedYtd) },
      { key: "outstanding", label: "Outstanding", render: r => r.outstanding ? moneyCell(r.outstanding, true) : '<span class="text-3">—</span>' },
      { key: "since", label: "Customer since" },
      { key: "health", label: "Status", sortable: false, render: r => overdueCust.has(r.name) ? badge("Has overdue", "danger") : r.outstanding ? badge("Open balance", "info") : badge("Settled", "success") }
    ],
    rows: DATA.customers, pageSize: 8, page: 1
  };
  return `
  ${pageHeadB("Customers", "The AR directory — outstanding balances reconcile to the invoice ledger, per customer", `<button class="btn btn-primary" onclick="toast('Customer onboarding form opened','info')">＋ Add customer</button>`)}
  <div class="grid grid-4 mb-4">
    ${statCard({ label: "Customers", value: String(DATA.customers.length), sub: "Active accounts shown" })}
    ${statCard({ label: "Billed YTD", value: fmt.money(billedTotal), sub: "Across all customers" })}
    ${statCard({ label: "Outstanding", value: fmt.money(m.arOutstanding), sub: "Ties to Invoices · per-customer below" })}
    ${statCard({ label: "With overdue balances", value: String(overdueCust.size), delta: fmt.money(m.arOverdue), deltaDir: "up", deltaGood: false, sub: "Oldest 18 days" })}
  </div>
  ${dataTable("customers", AD.tables["customers"].columns, DATA.customers, {})}
  <div class="mt-4">${copilotPanel({ label: "Customer insight", summary: "Northwind Retail is the largest account by both billed YTD ($214,600) and outstanding ($35,300 across two invoices) — and pays like clockwork at 26 days. The overdue risk sits with smaller accounts: Corelink, Ferrous, Marina Foods and Alto Studio hold all $37,450 of overdue AR.", suggestions: [{ text: "Offer auto-pay enrollment to the four overdue accounts", confidence: 85 }], sources: ["AR ledger", "Payment history"] })}</div>`;
};
