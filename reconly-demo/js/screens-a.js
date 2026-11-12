/* ============================================================
   Reconly — Screens A: Overview, Money in, Money out (part 1)
   ============================================================ */

const S = (window.AD.screens = window.AD.screens || {});
const M = () => DATA.metrics;
const pageHead = (title, sub, actions = "") => `
  <div class="page-head">
    <div><h2>${esc(title)}</h2><p>${esc(sub)}</p></div>
    <div class="actions">${actions}</div>
  </div>`;

/* ================= COMMAND CENTER ================= */
S["command"] = () => {
  const m = M(), h = DATA.headline, s = DATA.series12;
  const agingCurrent = DATA.invoices.filter(i => i.status === "open").reduce((a, i) => a + i.amount, 0);
  return `
  ${pageHead("Good morning, Dana", DATA.meta.today + " · " + DATA.meta.workspace + " · October closed net-positive for the first time since June", `
    <button class="btn btn-secondary" onclick="toast('Board pack PDF queued — check Reports','success')">Export board pack</button>
    <button class="btn btn-primary" onclick="document.getElementById('new-invoice-btn').click()">＋ New invoice</button>`)}
  <div class="grid grid-4 mb-4">
    ${statCard({ label: "Cash position", value: fmt.money(h.cash), sub: "Operating " + fmt.money(h.cashOperating) + " · MM " + fmt.money(h.cashMoneyMarket), spark: s.cash, accent: "#10b981" })}
    ${statCard({ label: "Net — October", value: "+" + fmt.money(m.netOct), delta: "vs −" + fmt.money(39800) + " in Aug", deltaDir: "up", deltaGood: true, sub: "Revenue " + fmt.money(h.revenueOct) + " · Spend " + fmt.money(h.expensesOct) })}
    ${statCard({ label: "MRR", value: fmt.money(h.mrr), delta: m.mrrGrowthPct + "% MoM", deltaDir: "up", deltaGood: true, sub: "ARR " + fmt.money(h.arr) + " · NRR " + DATA.mrrMovement.nrr + "%", spark: s.mrr, accent: "#8b5cf6" })}
    ${statCard({ label: "Runway", value: h.runwayMonths + " months", sub: "At Q3 avg net burn " + fmt.money(h.avgNetBurnQ3) + "/mo", spark: [31, 30, 29, 28, 28, 29, 30, 31], accent: "#38bdf8" })}
  </div>
  <div class="grid grid-2-1 mb-4">
    <div>
      ${sectionCard("Revenue vs expenses", "Trailing 12 months · USD", `<a class="btn btn-ghost btn-sm" href="#/cashflow">Cash flow →</a>`, `
        ${svgBarsDual(s.revenue, s.expenses, s.months, { c1: "#10b981", c2: "#f59e0b" })}
        ${legend([{ color: "#10b981", label: "Revenue" }, { color: "#f59e0b", label: "Expenses" }])}`,
        `<span class="text-sm text-2">Best month: <strong>October +${fmt.money(m.netOct)}</strong> · Worst: August −${fmt.money(39800)} (annual insurance + quarterly taxes)</span>`)}
    </div>
    ${copilotPanel({
      label: "Cash insight",
      summary: "October flipped the quarter: revenue of $412,850 beat spend of $356,220 by $56,630, ending the Jul–Sep burn streak. Two watch-outs: $37,450 of AR is overdue (INV-2039 is 18 days late) and the HubSpot renewal on Nov 17 can drop $1,870/yr by removing 11 idle seats.",
      suggestions: [
        { text: "Send the AI-drafted second reminder for INV-2039 (Corelink Health, $15,720)", confidence: 91 },
        { text: "Approve the HubSpot seat reduction before the Nov 17 renewal", confidence: 88 }
      ],
      sources: ["October P&L", "AR ledger", "Vendor contracts"]
    })}
  </div>
  <div class="grid grid-3">
    ${sectionCard("Accounts receivable", fmt.money(m.arOutstanding) + " outstanding · " + m.arOpenCount + " open invoices", `<a class="btn btn-ghost btn-sm" href="#/invoices">View all →</a>`, `
      <div class="flex flex-col gap-3">
        <div><div class="flex justify-between text-sm mb-2"><span>Current (not yet due)</span><strong>${fmt.money(agingCurrent)}</strong></div>${progressBar(Math.round(agingCurrent / m.arOutstanding * 100))}</div>
        <div><div class="flex justify-between text-sm mb-2"><span>Overdue 1–30 days</span><strong style="color:var(--danger-600)">${fmt.money(m.arOverdue)} · ${m.arOverdueCount} invoices</strong></div>${progressBar(Math.round(m.arOverdue / m.arOutstanding * 100), "danger")}</div>
        <div><div class="flex justify-between text-sm mb-2"><span>Overdue 31–60 / 60+</span><strong>${fmt.money(0)}</strong></div>${progressBar(0)}</div>
      </div>`, `<span class="text-sm text-3">Auto-reminders are on · next batch goes out Friday 09:00</span>`)}
    ${sectionCard("Payables this week", fmt.money(m.billsDueWeek) + " due across " + m.billsDueCount + " bills", `<a class="btn btn-ghost btn-sm" href="#/bills">View all →</a>`, `
      <div class="flex flex-col gap-2">
        ${DATA.bills.filter(b => b.status === "due").slice(0, 4).map(b => `<div class="flex items-center gap-2"><span class="grow text-sm"><strong>${esc(b.vendor)}</strong><br><span class="text-3">${esc(b.id)} · due ${esc(b.due)}</span></span><strong>${fmt.money(b.amount)}</strong></div>`).join("")}
      </div>`, `<span class="text-sm text-3">All matched to POs or usage reports · 0 blocked</span>`)}
    ${sectionCard("Approvals & close", m.approvalsCount + " approvals waiting · " + fmt.money(m.approvalsTotal), `<a class="btn btn-ghost btn-sm" href="#/approvals">Review →</a>`, `
      <div class="flex flex-col gap-3">
        ${DATA.approvals.slice(0, 2).map(a => `<div class="ai-note" style="margin:0"><strong>${esc(a.title)}</strong> — ${fmt.money(a.amount)}<br><span class="text-3">from ${esc(a.requester)} · waiting ${esc(a.age)}</span></div>`).join("")}
        <div class="divider"></div>
        <div><div class="flex justify-between text-sm mb-2"><span>October close</span><strong>${m.closeDone} of ${m.closeTotal} key tasks</strong></div>${progressBar(Math.round(m.closeDone / m.closeTotal * 100))}</div>
      </div>`, `<span class="text-sm text-3">Remaining: bank rec sign-off · accrual review</span>`)}
  </div>`;
};

/* ================= CASH FLOW ================= */
S["cashflow"] = () => {
  const h = DATA.headline, s = DATA.series12;
  const receiptsNov = DATA.invoices.filter(i => i.status === "open" && i.due.includes("Nov")).reduce((a, i) => a + i.amount, 0);
  const billsNov = DATA.bills.filter(b => ["due", "scheduled"].includes(b.status) && b.due.includes("Nov")).reduce((a, b) => a + b.amount, 0);
  const projected = h.cash + receiptsNov - billsNov;
  const inflowRows = [
    { name: "Subscriptions (MRR collected)", amount: 386400 },
    { name: "Services & implementation", amount: 18950 },
    { name: "Usage overage", amount: 7500 }
  ];
  return `
  ${pageHead("Cash Flow", "Balances, movement and the next 30 days", `<button class="btn btn-secondary" onclick="toast('Cash flow statement exported (PDF)','success')">Export statement</button>`)}
  <div class="grid grid-4 mb-4">
    ${statCard({ label: "Total cash", value: fmt.money(h.cash), delta: "+4.6% in Oct", deltaDir: "up", deltaGood: true, sub: "Across 2 accounts", spark: s.cash })}
    ${statCard({ label: "Operating account", value: fmt.money(h.cashOperating), sub: "Mercury •4821 · daily operations" })}
    ${statCard({ label: "Money market", value: fmt.money(h.cashMoneyMarket), sub: "Mercury •9034 · 4.1% APY" })}
    ${statCard({ label: "Projected Nov 30", value: fmt.money(projected - DATA.payroll.nextRunEst), sub: "After Nov bills, expected receipts & payroll", accent: "#38bdf8", spark: [1284600, 1298000, 1312000, projected - DATA.payroll.nextRunEst] })}
  </div>
  <div class="grid grid-2-1">
    <div class="flex flex-col gap-4">
      ${sectionCard("Cash balance — trailing 12 months", "USD · month-end balances", "", svgArea(s.cash, s.months, { color: "#10b981", fmt: fmt.k }))}
      ${sectionCard("October flows", "Every inflow and outflow category reconciles to the P&L", "", `
        <table class="data"><thead><tr><th>Flow</th><th>Direction</th><th style="text-align:right">Amount</th><th style="width:34%">Share</th></tr></thead><tbody>
        ${inflowRows.map(r => `<tr><td class="font-semibold">${esc(r.name)}</td><td>${badge("Inflow", "success")}</td><td style="text-align:right">${moneyCell(r.amount)}</td><td>${progressBar(Math.round(r.amount / h.revenueOct * 100))}</td></tr>`).join("")}
        ${DATA.spendCategories.map(c => `<tr><td class="font-semibold">${esc(c.name)}</td><td>${badge("Outflow", "warning")}</td><td style="text-align:right">${moneyCell(c.amount)}</td><td>${progressBar(Math.round(c.amount / h.expensesOct * 100))}</td></tr>`).join("")}
        <tr><td class="font-semibold">Net change — October</td><td></td><td style="text-align:right"><strong style="color:var(--success-600)">+${fmt.money(M().netOct)}</strong></td><td></td></tr>
        </tbody></table>`)}
    </div>
    <div class="flex flex-col gap-4">
      ${sectionCard("Bank accounts", "Live bank feed via Mercury", "", `
        <div class="flex flex-col gap-3">
          <div class="card" style="box-shadow:none"><div class="card-body flex items-center gap-3"><span style="font-size:22px">🏦</span><div class="grow"><strong>Operating •4821</strong><div class="text-sm text-3">Synced 4 min ago</div></div><strong>${fmt.money(h.cashOperating)}</strong></div></div>
          <div class="card" style="box-shadow:none"><div class="card-body flex items-center gap-3"><span style="font-size:22px">💰</span><div class="grow"><strong>Money market •9034</strong><div class="text-sm text-3">4.1% APY · swept nightly</div></div><strong>${fmt.money(h.cashMoneyMarket)}</strong></div></div>
        </div>`, `<span class="text-sm text-3">Auto-sweep keeps operating above $250,000</span>`)}
      ${sectionCard("Next 30 days", "Committed out vs expected in", "", `
        <div class="flex flex-col gap-2 text-sm">
          <div class="flex justify-between"><span>Bills due in November</span><strong>−${fmt.money(billsNov)}</strong></div>
          <div class="flex justify-between"><span>Open invoices due in November</span><strong>+${fmt.money(receiptsNov)}</strong></div>
          <div class="flex justify-between"><span>Payroll — Nov 28 (est.)</span><strong>−${fmt.money(DATA.payroll.nextRunEst)}</strong></div>
          <div class="divider"></div>
          <div class="flex justify-between"><span>Projected Nov 30 (incl. payroll)</span><strong style="color:var(--success-600)">${fmt.money(projected - DATA.payroll.nextRunEst)}</strong></div>
        </div>`, `<span class="text-sm text-3">Assumes on-time payment of November invoices</span>`)}
      ${copilotPanel({ label: "Liquidity note", summary: "Even in the downside case (all November invoices 15 days late), the operating account stays above the $250,000 sweep floor. No action needed; the money-market sweep earned $1,024 in October interest.", suggestions: [], sources: ["Bank feed", "AR ledger", "AP schedule"] })}
    </div>
  </div>`;
};

/* ================= REVENUE ANALYTICS ================= */
S["revenue"] = () => {
  const h = DATA.headline, mv = DATA.mrrMovement, s = DATA.series12;
  const segMap = {};
  DATA.customers.forEach(c => { segMap[c.segment] = (segMap[c.segment] || 0) + c.billedYtd; });
  const segs = Object.entries(segMap).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const segTotal = segs.reduce((a, x) => a + x[1], 0);
  const top = DATA.customers.slice().sort((a, b) => b.billedYtd - a.billedYtd).slice(0, 6);
  const waterfall = [
    { label: "Sep MRR", value: mv.start / 1000, total: true },
    { label: "New", value: mv.newBiz / 1000 },
    { label: "Expansion", value: mv.expansion / 1000 },
    { label: "Contraction", value: -mv.contraction / 1000 },
    { label: "Churn", value: -mv.churned / 1000 },
    { label: "Oct MRR", value: mv.end / 1000, total: true }
  ];
  return `
  ${pageHead("Revenue Analytics", "Recurring revenue quality: growth, expansion and churn", `<button class="btn btn-secondary" onclick="toast('Revenue report exported (CSV)','success')">Export CSV</button>`)}
  <div class="grid grid-4 mb-4">
    ${statCard({ label: "MRR", value: fmt.money(h.mrr), delta: M().mrrGrowthPct + "% MoM", deltaDir: "up", deltaGood: true, sub: "From " + fmt.num(DATA.customers.length) + " active customers shown", spark: s.mrr, accent: "#8b5cf6" })}
    ${statCard({ label: "ARR", value: fmt.money(h.arr), sub: "MRR × 12 · run-rate" })}
    ${statCard({ label: "Net revenue retention", value: mv.nrr + "%", delta: "+1.3 pts QoQ", deltaDir: "up", deltaGood: true, sub: "Expansion outpaces churn" })}
    ${statCard({ label: "Gross churn", value: mv.grossChurnPct + "%", delta: "−0.4 pts MoM", deltaDir: "down", deltaGood: true, sub: fmt.money(mv.churned) + " MRR churned in Oct" })}
  </div>
  <div class="grid grid-2-1 mb-4">
    ${sectionCard("MRR — trailing 12 months", "USD per month", "", svgArea(s.mrr, s.months, { color: "#8b5cf6", fmt: fmt.k }))}
    ${sectionCard("MRR movement — October", "Bridge from September to October ($K)", "", `
      ${svgWaterfall(waterfall, { w: 380, h: 246 })}
      <div class="text-sm text-2 mt-2">New logos ${fmt.money(mv.newBiz)} + expansion ${fmt.money(mv.expansion)} beat contraction ${fmt.money(mv.contraction)} and churn ${fmt.money(mv.churned)}.</div>`)}
  </div>
  <div class="grid grid-2">
    ${sectionCard("Revenue by segment", "Billed year to date · top segments", "", `
      <div class="flex flex-col gap-3">
      ${segs.map(([name, v]) => `<div><div class="flex justify-between text-sm mb-2"><span class="font-semibold">${esc(name)}</span><span>${fmt.money(v)} · ${Math.round(v / segTotal * 100)}%</span></div>${progressBar(Math.round(v / segs[0][1] * 100))}</div>`).join("")}
      </div>`)}
    ${sectionCard("Top customers by billed YTD", "Outstanding balances reconcile to the AR ledger", `<a class="btn btn-ghost btn-sm" href="#/invoices">AR ledger →</a>`, `
      <table class="data"><thead><tr><th>Customer</th><th>Segment</th><th style="text-align:right">Billed YTD</th><th style="text-align:right">Outstanding</th></tr></thead><tbody>
      ${top.map(c => `<tr><td><span class="flex items-center gap-2">${avatarHtml(c.name, "sm")}<strong>${esc(c.name)}</strong></span></td><td>${esc(c.segment)}</td><td style="text-align:right">${moneyCell(c.billedYtd)}</td><td style="text-align:right">${c.outstanding ? moneyCell(c.outstanding) : '<span class="text-3">—</span>'}</td></tr>`).join("")}
      </tbody></table>`)}
  </div>`;
};

/* ================= INVOICES ================= */
S["invoices"] = () => {
  const m = M();
  AD.tables["invoices"] = {
    columns: [
      { key: "id", label: "Invoice", render: r => `<a href="#/invoice-detail" class="font-semibold">${esc(r.id)}</a>`, search: r => r.id + " " + r.customer },
      { key: "customer", label: "Customer", render: r => `<span class="flex items-center gap-2">${avatarHtml(r.customer, "sm")}${esc(r.customer)}</span>` },
      { key: "desc", label: "Description" },
      { key: "amount", label: "Amount", render: r => moneyCell(r.amount, true) },
      { key: "issued", label: "Issued" },
      { key: "due", label: "Due" },
      { key: "status", label: "Status", render: r => statusBadge(r.status) },
      { key: "method", label: "Method", sortable: false }
    ],
    rows: DATA.invoices, pageSize: 8, page: 1
  };
  const agingCurrent = DATA.invoices.filter(i => i.status === "open").reduce((a, i) => a + i.amount, 0);
  return `
  ${pageHead("Invoices", "Accounts receivable — every invoice tracked to payment by AI", `
    <button class="btn btn-secondary" onclick="toast('AR aging exported (CSV)','success')">Export aging</button>
    <button class="btn btn-primary" onclick="document.getElementById('new-invoice-btn').click()">＋ New invoice</button>`)}
  <div class="grid grid-4 mb-4">
    ${statCard({ label: "Outstanding", value: fmt.money(m.arOutstanding), sub: m.arOpenCount + " open invoices · " + DATA.customers.length + " customers" })}
    ${statCard({ label: "Overdue", value: fmt.money(m.arOverdue), delta: m.arOverdueCount + " invoices", deltaDir: "up", deltaGood: false, sub: "Oldest: 18 days (INV-2039)", accent: "#f43f5e", spark: [12, 18, 15, 22, 31, 37] })}
    ${statCard({ label: "Collected in October", value: fmt.money(75190), sub: "4 invoices paid · avg 26 days to pay" })}
    ${statCard({ label: "Auto-reminders", value: "On", sub: "AI drafts · you approve sends over $10K" })}
  </div>
  <div class="grid grid-1-2">
    <div class="flex flex-col gap-4">
      ${sectionCard("Aging", "Where the outstanding balance sits", "", `
        <div class="flex flex-col gap-3">
          <div><div class="flex justify-between text-sm mb-2"><span>Current</span><strong>${fmt.money(agingCurrent)}</strong></div>${progressBar(Math.round(agingCurrent / m.arOutstanding * 100))}</div>
          <div><div class="flex justify-between text-sm mb-2"><span>1–30 days overdue</span><strong style="color:var(--danger-600)">${fmt.money(m.arOverdue)}</strong></div>${progressBar(Math.round(m.arOverdue / m.arOutstanding * 100), "danger")}</div>
          <div><div class="flex justify-between text-sm mb-2"><span>31–60 days</span><strong>$0</strong></div>${progressBar(0)}</div>
          <div><div class="flex justify-between text-sm mb-2"><span>60+ days</span><strong>$0</strong></div>${progressBar(0)}</div>
        </div>`, `<span class="text-sm text-3">Nothing has aged past 30 days in 2026</span>`)}
      ${copilotPanel({ label: "Collections insight", summary: "Corelink Health (INV-2039, $15,720) pays reliably but slowly — their last three invoices cleared at 41, 38 and 44 days. A reminder today historically brings payment by day 45, inside your cash plan.", suggestions: [{ text: "Send reminder #2 for INV-2039 with the payment link", confidence: 91 }], sources: ["AR ledger", "Payment history"] })}
    </div>
    <div>${dataTable("invoices", AD.tables["invoices"].columns, DATA.invoices, {})}</div>
  </div>`;
};

/* ================= INVOICE DETAIL ================= */
S["invoice-detail"] = () => {
  const inv = DATA.invoices.find(i => i.id === "INV-2039");
  const lines = inv.lines || [{ item: inv.desc, qty: 1, price: inv.amount }];
  const total = lines.reduce((a, l) => a + l.qty * l.price, 0);
  return `
  ${pageHead("Invoice " + inv.id, inv.customer + " · issued " + inv.issued + " · due " + inv.due, `
    <button class="btn btn-secondary" onclick="toast('PDF downloaded','success')">Download PDF</button>
    <button class="btn btn-secondary" onclick="toast('Payment recorded — AR updated','success')">Record payment</button>
    <button class="btn btn-primary" onclick="toast('Reminder #2 sent to ap@corelinkhealth.com','success')">Send reminder</button>`)}
  <div class="grid grid-2-1">
    <div class="flex flex-col gap-4">
      <div class="card"><div class="card-body">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">${avatarHtml(inv.customer)}<div><div class="font-bold" style="font-size:17px">${esc(inv.customer)}</div><div class="text-sm text-3">ap@corelinkhealth.com · Terms Net 30</div></div></div>
          <div style="text-align:right"><div class="stat-value" style="font-size:26px">${fmt.money(inv.amount)}</div><div class="flex gap-2" style="justify-content:flex-end">${statusBadge(inv.status)}${dueBadge(18)}</div></div>
        </div>
        <table class="data"><thead><tr><th>Item</th><th style="text-align:right">Qty</th><th style="text-align:right">Price</th><th style="text-align:right">Amount</th></tr></thead><tbody>
        ${lines.map(l => `<tr><td class="font-semibold">${esc(l.item)}</td><td style="text-align:right">${l.qty}</td><td style="text-align:right">${moneyCell(l.price)}</td><td style="text-align:right">${moneyCell(l.qty * l.price)}</td></tr>`).join("")}
        <tr><td colspan="3" style="text-align:right" class="text-3">Total due</td><td style="text-align:right"><strong style="font-size:15px">${fmt.money(total)}</strong></td></tr>
        </tbody></table>
      </div></div>
      ${sectionCard("Activity", "Full audit trail for this invoice", "", `
        <div class="timeline">
          <div class="timeline-item"><span class="timeline-dot"></span><div><strong>Invoice issued</strong><div class="text-sm text-3">Sep 24, 2026 · sent to ap@corelinkhealth.com</div></div></div>
          <div class="timeline-item"><span class="timeline-dot"></span><div><strong>Viewed by customer</strong><div class="text-sm text-3">Sep 25, 2026 · opened 3 times</div></div></div>
          <div class="timeline-item"><span class="timeline-dot"></span><div><strong>Reminder #1 sent (AI-drafted, auto-approved &lt; $20K)</strong><div class="text-sm text-3">Oct 31, 2026</div></div></div>
          <div class="timeline-item"><span class="timeline-dot" style="background:var(--danger-500);box-shadow:0 0 0 3px var(--danger-50)"></span><div><strong>Marked overdue</strong><div class="text-sm text-3">Oct 24 was the due date · now 18 days overdue</div></div></div>
        </div>`)}
    </div>
    <div class="flex flex-col gap-4">
      ${copilotPanel({ label: "Collection risk", summary: "Risk: medium. Corelink has never defaulted; their AP cycle pays annual subscriptions at ~42 days. Expected payment: by Nov 14. No discount offer is recommended — it has not changed their timing historically.", suggestions: [{ text: "Send reminder #2 (friendly tone, payment link attached)", confidence: 91 }, { text: "Offer ACH auto-pay for the 2027 renewal", confidence: 84 }], sources: ["Payment history (3 invoices)", "Email engagement"] })}
      ${sectionCard("Payment", "How the customer can pay", "", `
        <div class="flex flex-col gap-2 text-sm">
          <div class="flex justify-between"><span>Method on file</span><strong>ACH transfer</strong></div>
          <div class="flex justify-between"><span>Payment link</span><a href="#/invoice-detail" onclick="toast('Payment link copied','success');return false">Copy link</a></div>
          <div class="flex justify-between"><span>Late fee policy</span><span>1.5%/mo after 30 days</span></div>
          <div class="flex justify-between"><span>Days sales outstanding (customer)</span><strong>41 days avg</strong></div>
        </div>`)}
    </div>
  </div>`;
};

/* ================= BILLS ================= */
S["bills"] = () => {
  const m = M();
  AD.tables["bills"] = {
    columns: [
      { key: "id", label: "Bill", render: r => `<a href="#/bill-detail" class="font-semibold">${esc(r.id)}</a>` },
      { key: "vendor", label: "Vendor", render: r => `<span class="flex items-center gap-2">${avatarHtml(r.vendor, "sm")}<a href="#/vendor-detail">${esc(r.vendor)}</a></span>` },
      { key: "category", label: "Category" },
      { key: "amount", label: "Amount", render: r => moneyCell(r.amount, true) },
      { key: "due", label: "Due" },
      { key: "confidence", label: "AI match", render: r => confidenceBadge(r.confidence) },
      { key: "status", label: "Status", render: r => statusBadge(r.status) }
    ],
    rows: DATA.bills, pageSize: 8, page: 1
  };
  return `
  ${pageHead("Bills & Payables", "Accounts payable — captured, matched and scheduled by AI", `
    <button class="btn btn-secondary" onclick="toast('AP schedule exported (CSV)','success')">Export schedule</button>
    <button class="btn btn-primary" onclick="toast('Drop a PDF or forward to bills@arcadia.reconly.app — AI extracts it','info')">＋ Add bill</button>`)}
  <div class="grid grid-4 mb-4">
    ${statCard({ label: "Due this week", value: fmt.money(m.billsDueWeek), sub: m.billsDueCount + " bills · all matched" })}
    ${statCard({ label: "Scheduled later", value: fmt.money(DATA.bills.filter(b => b.status === "scheduled").reduce((a, b) => a + b.amount, 0)), sub: "GitHub · Linear · auto-pay on" })}
    ${statCard({ label: "Paid in November", value: fmt.money(720), sub: "Notion · paid Nov 4" })}
    ${statCard({ label: "Auto-match rate", value: DATA.headline.autoMatchRate + "%", delta: "+1.8 pts vs Sep", deltaDir: "up", deltaGood: true, sub: "Exceptions route to the queue", accent: "#8b5cf6", spark: [89, 90, 91, 92, 93, 94.2] })}
  </div>
  ${dataTable("bills", AD.tables["bills"].columns, DATA.bills, {})}
  <div class="mt-4">${copilotPanel({ label: "AP insight", summary: "All 8 bills due this week are matched and inside budget. Paying the AWS bill on its due date (Nov 14) instead of today keeps the operating account above the sweep floor through payroll.", suggestions: [{ text: "Schedule all 8 due bills for their exact due dates", confidence: 95 }], sources: ["AP ledger", "Bank balance", "Payment calendar"] })}</div>`;
};

/* ================= BILL DETAIL & APPROVAL ================= */
S["bill-detail"] = () => {
  const bill = DATA.bills.find(b => b.id === "BILL-3121");
  const lines = [
    { item: "EC2 compute — production", amount: 9840 },
    { item: "RDS — primary + replica", amount: 4260 },
    { item: "S3 storage & requests", amount: 2310 },
    { item: "Data transfer", amount: 1340 },
    { item: "Business support plan", amount: 1190 }
  ];
  return `
  ${pageHead("Bill " + bill.id + " — " + bill.vendor, "Extracted by AI from the vendor PDF · three-way matched", `
    <button class="btn btn-secondary" onclick="toast('Rejected — requester notified with your note','warning')">Reject</button>
    <button class="btn btn-secondary" onclick="toast('Changes requested from Kenji Watanabe','info')">Request changes</button>
    <button class="btn btn-primary" onclick="toast('Approved — scheduled for Nov 14','success')">Approve & schedule</button>`)}
  <div class="grid grid-2-1">
    <div class="flex flex-col gap-4">
      <div class="card"><div class="card-body">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">${avatarHtml(bill.vendor)}<div><div class="font-bold" style="font-size:17px">${esc(bill.vendor)}</div><div class="text-sm text-3">Invoice #AWS-88412 · billing period Oct 1–31, 2026</div></div></div>
          <div style="text-align:right"><div class="stat-value" style="font-size:26px">${fmt.money(bill.amount)}</div>${statusBadge(bill.status)} <span class="text-sm text-3">due ${esc(bill.due)}</span></div>
        </div>
        <table class="data"><thead><tr><th>Line item</th><th style="text-align:right">Amount</th></tr></thead><tbody>
        ${lines.map(l => `<tr><td class="font-semibold">${esc(l.item)}</td><td style="text-align:right">${moneyCell(l.amount)}</td></tr>`).join("")}
        <tr><td class="text-3" style="text-align:right">Subtotal $17,240 · Tax $1,700 · <strong>Total</strong></td><td style="text-align:right"><strong style="font-size:15px">${fmt.money(bill.amount)}</strong></td></tr>
        </tbody></table>
      </div></div>
      ${sectionCard("Approval chain", "Policy: bills over $10,000 need Controller + CFO", "", `
        <div class="timeline">
          <div class="timeline-item"><span class="timeline-dot"></span><div><strong>Captured & extracted</strong><div class="text-sm text-3">Nov 10, 06:12 · AI confidence 97% · Priya Nair verified fields</div></div></div>
          <div class="timeline-item"><span class="timeline-dot"></span><div><strong>Three-way match passed</strong><div class="text-sm text-3">PO-1042 ✓ · October usage report ✓ · contract rates ✓</div></div></div>
          <div class="timeline-item"><span class="timeline-dot" style="background:var(--warning-500);box-shadow:0 0 0 3px var(--warning-50)"></span><div><strong>Waiting: Marcus Reid (Controller)</strong><div class="text-sm text-3">Then Dana Whitfield (CFO) · SLA 2 business days</div></div></div>
        </div>`)}
    </div>
    <div class="flex flex-col gap-4">
      ${copilotPanel({ label: "Match analysis", summary: "Total matches the October usage report to the cent. Note: $3,940 of this bill is two untagged dev instances — the same item flagged in approval APR-209. Approving is safe; tagging the instances prevents a repeat next month.", suggestions: [{ text: "Approve and auto-tag untagged instances going forward", confidence: 93 }], sources: ["PO-1042", "Usage report", "AWS contract"] })}
      ${sectionCard("Payment details", "", "", `
        <div class="flex flex-col gap-2 text-sm">
          <div class="flex justify-between"><span>Pay from</span><strong>Operating •4821</strong></div>
          <div class="flex justify-between"><span>Scheduled date</span><strong>${esc(bill.due)}</strong></div>
          <div class="flex justify-between"><span>Category</span><span>${esc(bill.category)}</span></div>
          <div class="flex justify-between"><span>Budget impact</span><span>Cloud at 108% of Oct plan</span></div>
          <div class="flex justify-between"><span>Vendor YTD</span><strong>${fmt.money(196300)}</strong></div>
        </div>`)}
    </div>
  </div>`;
};

/* ================= APPROVALS ================= */
S["approvals"] = () => {
  const m = M();
  return `
  ${pageHead("Approvals", "Every spend decision in one queue — with the AI's homework attached", `<button class="btn btn-secondary" onclick="toast('Approval policy opened — thresholds are in Settings → Workspace','info')">Approval policy</button>`)}
  <div class="grid grid-3 mb-4">
    ${statCard({ label: "Waiting on you", value: fmt.money(m.approvalsTotal), sub: m.approvalsCount + " items · oldest 2 days" })}
    ${statCard({ label: "Auto-approved in Oct", value: "128 items", sub: "Under $500 + full three-way match" })}
    ${statCard({ label: "Avg decision time", value: "5.2 hours", delta: "−38% since AI notes", deltaDir: "down", deltaGood: true, sub: "Notes attach evidence to each item" })}
  </div>
  <div class="grid grid-2-1">
    <div class="flex flex-col gap-4">
      ${DATA.approvals.map(a => `
      <div class="card"><div class="card-body">
        <div class="flex items-start gap-3">
          ${avatarHtml(a.requester)}
          <div class="grow">
            <div class="flex items-center gap-2" style="flex-wrap:wrap"><strong>${esc(a.title)}</strong>${statusBadge(a.risk)}</div>
            <div class="text-sm text-3">${esc(a.id)} · requested by ${esc(a.requester)} · waiting ${esc(a.age)}</div>
            <div class="ai-note"><span class="ai-chip">✦ AI note</span> ${esc(a.aiNote)}</div>
          </div>
          <div style="text-align:right"><div class="font-bold" style="font-size:17px">${fmt.money(a.amount)}</div>
          <div class="flex gap-2 mt-2"><button class="btn btn-ghost btn-sm" onclick="toast('Changes requested from ${esc(a.requester)}','info')">Changes</button><button class="btn btn-primary btn-sm" onclick="toast('Approved — ${esc(a.title)}','success')">Approve</button></div></div>
        </div>
      </div></div>`).join("")}
    </div>
    <div class="flex flex-col gap-4">
      ${sectionCard("Policy snapshot", "Full policy lives in Settings → Workspace", "", `
        <div class="flex flex-col gap-2 text-sm">
          <div class="flex justify-between"><span>Auto-approve</span><span>≤ $500 + matched</span></div>
          <div class="flex justify-between"><span>Controller</span><span>≤ $10,000</span></div>
          <div class="flex justify-between"><span>CFO</span><span>≤ $25,000</span></div>
          <div class="flex justify-between"><span>CEO sign-off</span><span>&gt; $25,000</span></div>
          <div class="divider"></div>
          <div class="flex justify-between"><span>Bank-detail changes</span><span>Always 2 people</span></div>
          <div class="flex justify-between"><span>New vendors</span><span>Finance Admin review</span></div>
        </div>`)}
      ${copilotPanel({ label: "Queue insight", summary: "Two of seven items deserve a second look before approval: APR-209 carries $3,940 of untagged AWS usage, and APR-203 duplicates an existing transcription tool ($640/mo). The other five match policy and evidence.", suggestions: [{ text: "Approve the five clean items in one batch", confidence: 96 }], sources: ["Approval policy", "Vendor contracts", "Usage reports"] })}
    </div>
  </div>`;
};

/* ================= AI INVOICE AUTOMATION ================= */
S["automation"] = () => {
  const m = M();
  AD.tables["exceptions"] = {
    columns: [
      { key: "doc", label: "Document", render: r => `<span class="font-semibold">${esc(r.doc)}</span>` },
      { key: "vendor", label: "Vendor" },
      { key: "issue", label: "Issue" },
      { key: "amount", label: "Amount at risk", render: r => r.amount ? moneyCell(r.amount) : '<span class="text-3">—</span>' },
      { key: "confidence", label: "AI confidence", render: r => confidenceBadge(r.confidence) },
      { key: "act", label: "", sortable: false, render: () => `<button class="btn btn-sm btn-secondary" onclick="toast('Exception opened in the review workspace','info')">Resolve</button>` }
    ],
    rows: DATA.exceptions, pageSize: 8, page: 1
  };
  const steps = [
    { n: "1,847", t: "Documents received", d: "Email · uploads · bank feed · API" },
    { n: "1,803", t: "Extracted cleanly", d: "Vendor, totals, tax, dates, PO" },
    { n: "1,741", t: "Auto-matched", d: "Three-way: PO · receipt · contract" },
    { n: "11", t: "Exceptions for humans", d: "Everything else posted itself" }
  ];
  return `
  ${pageHead("AI Invoice Automation", "Documents in — reconciled, categorised entries out", `<button class="btn btn-secondary" onclick="toast('Automation rules opened','info')">Rules</button><button class="btn btn-primary" onclick="toast('Forward any bill to bills@arcadia.reconly.app','info')">＋ Add documents</button>`)}
  <div class="grid grid-4 mb-4">
    ${statCard({ label: "Auto-match rate", value: DATA.headline.autoMatchRate + "%", delta: "+1.8 pts vs Sep", deltaDir: "up", deltaGood: true, sub: "Of " + fmt.num(DATA.headline.docsProcessedOct) + " documents in Oct", accent: "#8b5cf6", spark: [89, 90, 91, 92, 93, 94.2] })}
    ${statCard({ label: "Duplicates caught", value: "3", sub: fmt.money(9540) + " in double-payments prevented" })}
    ${statCard({ label: "Exceptions open", value: String(m.exceptionsCount), sub: "Median AI confidence 71% — needs eyes" })}
    ${statCard({ label: "Hours saved (Oct)", value: "212 h", sub: "≈ 5.3 work-weeks of manual entry" })}
  </div>
  ${sectionCard("October pipeline", "How documents flowed through the system", "", `
    <div class="grid grid-4">
      ${steps.map((s, i) => `<div class="card" style="box-shadow:none"><div class="card-body" style="text-align:center"><div class="stat-value" style="color:${i === 3 ? "var(--warning-600)" : "var(--brand-600)"}">${s.n}</div><div class="font-semibold text-sm mt-2">${esc(s.t)}</div><div class="text-sm text-3">${esc(s.d)}</div></div></div>`).join("")}
    </div>`)}
  <div class="mt-4 mb-4">${dataTable("exceptions", AD.tables["exceptions"].columns, DATA.exceptions, {})}</div>
  ${copilotPanel({ label: "Automation insight", summary: "The biggest exception cluster is amount mismatches on usage-based cloud bills (AWS, Datadog, Vercel). Enabling the usage-report connector for Vercel would auto-clear two of this month's eleven exceptions and lift the match rate toward 95%.", suggestions: [{ text: "Connect the Vercel usage report (2 min, read-only)", confidence: 89 }], sources: ["Exception log", "Integration catalog"] })}`;
};

/* ================= SPEND & EXPENSES ================= */
S["spend"] = () => {
  const m = M(), cats = DATA.spendCategories;
  return `
  ${pageHead("Spend & Expenses", "Every dollar out — categorised, checked against budget", `<button class="btn btn-secondary" onclick="toast('Spend report exported (CSV)','success')">Export CSV</button>`)}
  <div class="grid grid-4 mb-4">
    ${statCard({ label: "October spend", value: fmt.money(m.spendTotal), delta: "−16.9% vs Sep", deltaDir: "down", deltaGood: true, sub: "September carried annual premiums" })}
    ${statCard({ label: "vs October budget", value: fmt.money(m.deptBudget), sub: "Under budget by " + fmt.money(m.deptBudget - m.spendTotal) + " (−4.5%)" })}
    ${statCard({ label: "Top category", value: "Payroll 61%", sub: fmt.money(218400) + " of total spend" })}
    ${statCard({ label: "AI categorisation", value: "98.6%", sub: "Of transactions auto-categorised", accent: "#8b5cf6", spark: [96, 97, 97, 98, 98, 98.6] })}
  </div>
  <div class="grid grid-2-1">
    ${sectionCard("Spend by category — October", "Click a category in Cards & Transactions to drill into receipts", "", `
      <div style="text-align:center"><div style="position:relative;display:inline-block">${svgDonut(cats.map(c => ({ value: c.amount, color: c.color, label: c.name })), { size: 240, center: fmt.money(m.spendTotal) })}<div class="text-sm text-3" style="position:absolute;left:0;right:0;top:58%">October spend</div></div></div>
      ${legend(cats.map(c => ({ color: c.color, label: c.name + " · " + fmt.money(c.amount) })))}`)}
    <div class="flex flex-col gap-4">
      ${sectionCard("Category movement", "vs September", "", `
        <div class="flex flex-col gap-3">
        ${cats.map(c => `<div class="flex items-center gap-2 text-sm"><span class="swatch" style="background:${c.color}"></span><span class="grow font-semibold">${esc(c.name)}</span><span>${fmt.money(c.amount)}</span>${c.deltaPct === 0 ? badge("flat", "neutral") : badge((c.deltaPct > 0 ? "+" : "") + c.deltaPct + "%", c.deltaPct > 5 ? "warning" : c.deltaPct < 0 ? "success" : "neutral")}</div>`).join("")}
        </div>`, `<span class="text-sm text-3">Travel +12.4% is conference season · cloud +6.8% is the untagged instances</span>`)}
      ${copilotPanel({ label: "Spend insight", summary: "Software & SaaS crept +1.4% but hides $640/mo of duplicate transcription tooling and $280/mo of idle Copilot seats — $11,040/yr of quiet waste, itemised in AI Cost Intelligence.", suggestions: [{ text: "Open the AI Cost Intelligence findings", confidence: 94 }], sources: ["Card feed", "Vendor contracts"] })}
    </div>
  </div>`;
};
