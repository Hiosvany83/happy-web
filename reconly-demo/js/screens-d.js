/* ============================================================
   Reconly — Screens D: v1.1 additions (Creao UI8 audit fixes)
   Style Guide · Loading States · Cash Calendar · Product page
   ============================================================ */

const S4 = (window.AD.screens = window.AD.screens || {});
const pageHeadD = (title, sub, actions = "") => `
  <div class="page-head">
    <div><h2>${esc(title)}</h2><p>${esc(sub)}</p></div>
    <div class="actions">${actions}</div>
  </div>`;

/* ================= STYLE GUIDE ================= */
const SG_BRAND = [["50", "#ecfdf5"], ["100", "#d1fae5"], ["200", "#a7f3d0"], ["300", "#6ee7b7"], ["400", "#34d399"], ["500", "#10b981"], ["600", "#059669"], ["700", "#047857"], ["800", "#065f46"], ["900", "#064e3b"]];
const SG_AI = [["50", "#f5f3ff"], ["100", "#ede9fe"], ["200", "#ddd6fe"], ["300", "#c4b5fd"], ["400", "#a78bfa"], ["500", "#8b5cf6"], ["600", "#7c3aed"], ["700", "#6d28d9"]];
const SG_SEM = [["success-400", "#4ade80"], ["success-500", "#22c55e"], ["success-600", "#16a34a"], ["warning-400", "#fbbf24"], ["warning-500", "#f59e0b"], ["warning-600", "#d97706"], ["danger-400", "#fb7185"], ["danger-500", "#f43f5e"], ["danger-600", "#e11d48"], ["info-400", "#38bdf8"], ["info-500", "#0ea5e9"]];
const sgSwatch = (token, hex) => `<div class="sg-swatch"><div class="chip-color" style="background:${hex}"></div><div class="meta"><div class="tok">--${token}</div><div class="hex">${hex}</div></div></div>`;
const sgVarSwatch = (token, label) => `<div class="sg-swatch"><div class="chip-color" style="background:var(--${token})"></div><div class="meta"><div class="tok">--${token}</div><div class="hex">${label}</div></div></div>`;

S4["styleguide"] = () => `
  ${pageHeadD("Style Guide", "The Reconly design system, living inside the product — every screen in this kit is built from the tokens and components on this page. Source of truth: css/tokens.css and tokens.json.", `<button class="btn btn-secondary" onclick="document.getElementById('theme-toggle').click()">Toggle theme to compare</button>`)}

  <div class="sg-section">
    ${sectionCard("Colour — brand (emerald)", "Money / go. Primary actions, positive deltas, the Reconly identity.", "", `<div class="sg-swatches">${SG_BRAND.map(([s, hex]) => sgSwatch("brand-" + s, hex)).join("")}</div>`)}
  </div>
  <div class="sg-section">
    ${sectionCard("Colour — AI accent (violet) & semantic", "Violet is reserved for AI-generated or AI-labelled UI. Semantic colours mean one thing everywhere.", "", `
      <div class="sg-swatches mb-4">${SG_AI.map(([s, hex]) => sgSwatch("ai-" + s, hex)).join("")}</div>
      <div class="sg-swatches">${SG_SEM.map(([t, hex]) => sgSwatch(t, hex)).join("")}</div>`)}
  </div>
  <div class="sg-section">
    ${sectionCard("Colour — surfaces & text (theme-aware)", "These tokens flip with the theme. Toggle dark/light (bottom of the sidebar) and watch this row change — components never hard-code a surface colour.", "", `
      <div class="sg-swatches">
        ${sgVarSwatch("bg", "app background")}${sgVarSwatch("surface", "card surface")}${sgVarSwatch("surface-2", "raised surface")}${sgVarSwatch("surface-3", "sunken surface")}
        ${sgVarSwatch("text", "primary text")}${sgVarSwatch("text-2", "secondary text")}${sgVarSwatch("text-3", "muted text")}${sgVarSwatch("border-strong", "strong border")}
      </div>`)}
  </div>

  <div class="sg-section">
    ${sectionCard("Typography — two voices", "Fraunces (display) carries the headlines and the hero figures — it is the product's voice. Inter (text) does the working UI. JetBrains Mono is for IDs, timers and code-like values.", "", `
      <div class="sg-type-row"><span class="spec">--font-display · Fraunces</span><span class="sample font-display" style="font-size:34px;font-weight:700">Reconciled, before you ask.</span></div>
      <div class="sg-type-row"><span class="spec">--font-sans · Inter</span><span class="sample" style="font-size:17px">Every figure in Reconly traces to a record.</span></div>
      <div class="sg-type-row"><span class="spec">--font-mono · JetBrains Mono</span><span class="sample mono" style="font-size:15px">INV-2039 · BILL-3121 · 94.2%</span></div>
      <div class="divider"></div>
      <div class="sg-type-row"><span class="spec">--text-hero · 68px · display</span><span class="sample font-display" style="font-size:68px;font-weight:700;line-height:1.05">31.1 mo</span></div>
      <div class="sg-type-row"><span class="spec">--text-5xl · 48px · display</span><span class="sample font-display" style="font-size:48px;font-weight:700">+$56,630</span></div>
      <div class="sg-type-row"><span class="spec">--text-4xl · 38px · display</span><span class="sample font-display" style="font-size:38px;font-weight:700">October close</span></div>
      <div class="sg-type-row"><span class="spec">--text-3xl · 30px · display</span><span class="sample font-display" style="font-size:30px;font-weight:700">Command Center</span></div>
      <div class="sg-type-row"><span class="spec">--text-2xl · 24px</span><span class="sample" style="font-size:24px;font-weight:700">Revenue vs expenses</span></div>
      <div class="sg-type-row"><span class="spec">--text-xl · 20px</span><span class="sample" style="font-size:20px;font-weight:600">Accounts receivable</span></div>
      <div class="sg-type-row"><span class="spec">--text-lg · 16px</span><span class="sample" style="font-size:16px">Cash clarity for lean finance teams</span></div>
      <div class="sg-type-row"><span class="spec">--text-base · 14px</span><span class="sample">Body text — invoices, bills, approvals and the copilot's answers.</span></div>
      <div class="sg-type-row"><span class="spec">--text-sm · 12.5px</span><span class="sample text-sm">Secondary text — table sub-lines, hints, footers.</span></div>
      <div class="sg-type-row"><span class="spec">--text-xs · 11px</span><span class="sample text-xs">Micro text — badges, table headers, token labels.</span></div>
      <p class="text-sm text-3 mt-3">Hierarchy rule: one hero figure per main screen, set in Fraunces at hero scale. Everything else steps down the scale — no two numbers on a screen shout at once.</p>`)}
  </div>

  <div class="grid grid-2 sg-section">
    ${sectionCard("Spacing — 8px base", "Ten steps cover every gap and padding in the product.", "", `
      ${[["space-1", 4], ["space-2", 8], ["space-3", 12], ["space-4", 16], ["space-5", 20], ["space-6", 24], ["space-8", 32], ["space-10", 40], ["space-12", 48], ["space-16", 64]].map(([t, px]) => `<div class="sg-space-row"><span class="tok">--${t}</span><span class="bar" style="width:${px * 3}px"></span><span class="text-3">${px}px</span></div>`).join("")}`)}
    ${sectionCard("Radii", "Cards are generous (xl), controls are calm (md), pills are full.", "", `
      <div class="sg-radius-row">
        ${[["radius-sm", "6px"], ["radius-md", "8px"], ["radius-lg", "12px"], ["radius-xl", "16px"], ["radius-2xl", "20px"], ["radius-full", "999px"]].map(([t, px]) => `<div class="sg-radius-box"><div class="box" style="border-radius:var(--${t})"></div>--${t}<br>${px}</div>`).join("")}
      </div>
      <div class="divider"></div>
      <div class="text-sm text-2">Shadows are theme tokens too: <span class="mono text-sm">--shadow-sm / md / lg</span> deepen in dark mode instead of disappearing.</div>`)}
  </div>

  <div class="sg-section">
    ${sectionCard("Buttons — variants, sizes & states", "Hover and focus rows are forced demo states so the full matrix is visible on one screen.", "", `
      <div class="sg-states">
        <div class="sg-state-row"><span class="st-label">Variants</span>
          <button class="btn btn-primary">Primary</button><button class="btn btn-secondary">Secondary</button><button class="btn btn-ghost">Ghost</button><button class="btn btn-ai">✦ AI action</button><button class="btn btn-danger">Danger</button><button class="btn btn-success">Success</button></div>
        <div class="sg-state-row"><span class="st-label">Default</span><button class="btn btn-primary">Save changes</button><button class="btn btn-secondary">Export</button></div>
        <div class="sg-state-row"><span class="st-label">Hover</span><button class="btn btn-primary demo-hover">Save changes</button><button class="btn btn-secondary demo-hover">Export</button><button class="btn btn-ghost demo-hover">Cancel</button></div>
        <div class="sg-state-row"><span class="st-label">Focus</span><button class="btn btn-primary demo-focus">Save changes</button><button class="btn btn-secondary demo-focus">Export</button></div>
        <div class="sg-state-row"><span class="st-label">Disabled</span><button class="btn btn-primary" disabled>Save changes</button><button class="btn btn-secondary" disabled>Export</button></div>
        <div class="sg-state-row"><span class="st-label">Sizes</span><button class="btn btn-primary btn-sm">Small</button><button class="btn btn-primary">Default</button><button class="btn btn-primary btn-lg">Large</button></div>
      </div>`)}
  </div>

  <div class="grid grid-2 sg-section">
    ${sectionCard("Badges, chips & avatars", "", "", `
      <div class="flex flex-col gap-4">
        <div class="flex gap-2" style="flex-wrap:wrap">${badge("Brand", "brand")}${badge("✦ AI", "ai")}${badge("Paid", "success")}${badge("Due soon", "warning")}${badge("Overdue", "danger")}${badge("Open", "info")}${badge("Draft", "neutral")}</div>
        <div class="flex gap-2 items-center" style="flex-wrap:wrap"><span class="text-sm text-3">AI confidence:</span>${confidenceBadge(94)}${confidenceBadge(82)}${confidenceBadge(64)}</div>
        <div class="flex gap-2 items-center" style="flex-wrap:wrap"><span class="text-sm text-3">Status:</span>${statusBadge("paid")}${statusBadge("overdue")}${statusBadge("approval")}${statusBadge("matched")}</div>
        <div class="flex gap-2" style="flex-wrap:wrap"><span class="chip">📄 October P&L</span><span class="chip">📄 AR ledger</span><span class="chip">⌘K</span></div>
        <div class="flex gap-3 items-center">${avatarHtml("Dana Whitfield", "lg")}${avatarHtml("Marcus Reid")}${avatarStack(["Priya Nair", "Kenji Watanabe", "Alex Duarte", "Sofia Lindqvist", "Tom Becker"])}<span class="text-sm text-3">Avatars derive colour from the name — no images.</span></div>
      </div>`)}
    ${sectionCard("Progress, segmented & tabs", "", "", `
      <div class="flex flex-col gap-4">
        <div><div class="text-sm text-3 mb-2">Budget meter — on track / warning / over</div><div class="flex flex-col gap-2">${progressBar(62)}${progressBar(88, "warning")}${progressBar(100, "danger")}${progressBar(45, "ai")}</div></div>
        <div><div class="text-sm text-3 mb-2">Segmented control</div><span class="segmented"><button>Week</button><button class="active">Month</button><button>Quarter</button></span></div>
        <div><div class="text-sm text-3 mb-2">Tabs</div><div class="tabs"><button class="active">Overview</button><button>Activity</button><button>Files</button><button>Settings</button></div></div>
        <div><div class="text-sm text-3 mb-2">Switch — on / off / disabled</div><div class="flex gap-4 items-center">${toggleInput(true, "sg-sw1")}${toggleInput(false, "sg-sw2")}<label class="switch"><input type="checkbox" disabled><span class="track"></span></label></div></div>
      </div>`)}
  </div>

  <div class="sg-section">
    ${sectionCard("Form controls — every state", "Error is a border, a shadow and a sentence — never colour alone.", "", `
      <div class="grid grid-2">
        ${fieldHtml("Default", `<input class="input" value="Corelink Health">`)}
        ${fieldHtml("Focus (forced demo)", `<input class="input demo-focus" value="ap@corelinkhealth.com">`)}
        ${fieldHtml("Disabled", `<input class="input" value="INV-2039" disabled>`)}
        <div class="field"><label>Error</label><input class="input demo-error" value="dana@arcadia"><span class="error-text">Enter a valid work email — this one is missing its domain.</span></div>
        ${fieldHtml("Select", `<select class="select"><option>Net 30</option><option>Net 14</option><option>Due on receipt</option></select>`)}
        ${fieldHtml("Hint text", `<input class="input" placeholder="Platform subscription — annual">`, "Shown on the customer's PDF")}
      </div>`)}
  </div>

  <div class="grid grid-2 sg-section">
    ${sectionCard("Stat card & empty state", "The two most repeated patterns in the product.", "", `
      <div class="flex flex-col gap-4">
        ${statCard({ label: "Cash position", value: fmt.money(DATA.headline.cash), hero: true, delta: "+4.6% in Oct", deltaDir: "up", deltaGood: true, sub: "Hero variant — Fraunces, one per screen" })}
        <div style="border:1px dashed var(--border-strong);border-radius:var(--radius-lg)">${emptyState({ icon: "🧾", title: "No invoices yet", text: "The compact empty pattern: icon, one line of guidance, one action.", cta: `<button class="btn btn-primary btn-sm" onclick="toast('This is the demo state','info')">＋ New invoice</button>` })}</div>
      </div>`)}
    ${sectionCard("Skeleton & AI suggestion", "Loading uses the .skeleton shimmer (see Loading States); AI output is always labelled and sourced.", "", `
      <div class="flex flex-col gap-4">
        <div><div class="skeleton skl" style="height:14px;width:42%;margin-bottom:8px"></div><div class="skeleton skl" style="height:14px;width:78%;margin-bottom:8px"></div><div class="skeleton skl" style="height:14px;width:63%"></div></div>
        <div class="suggestion"><span class="ai-chip">✦ AI</span><div class="grow">Send reminder #2 for INV-2039 (Corelink Health, $15,720)<div class="mt-2 flex items-center gap-2">${confidenceBadge(91)}<button class="btn btn-sm btn-secondary" onclick="toast('Applied — you can undo this from Activity','success')">Apply</button></div></div></div>
        <p class="text-sm text-3">Full component inventory with usage notes: <span class="mono">docs/components.md</span> in the download.</p>
      </div>`)}
  </div>`;

/* ================= LOADING STATES ================= */
const skl = (h, w, extra = "") => `<div class="skeleton skl" style="height:${h}px;${w ? "width:" + w + ";" : ""}${extra}"></div>`;
S4["loading"] = () => `
  ${pageHeadD("Loading States", "Three skeleton patterns built on the shared .skeleton shimmer — shown live, exactly as they render while data is in flight. Any async screen in the kit swaps its content for the matching skeleton.", "")}
  <div class="flex flex-col gap-4">
    ${sectionCard("1 · Command Center skeleton", "Used on first paint and on workspace switch — KPI band, chart and three panels hold their shape.", "", `
      <div class="load-frame">
        <div class="grid grid-4 mb-4">${skl(74)}${skl(74)}${skl(74)}${skl(74)}</div>
        <div class="grid grid-2-1">
          <div>${skl(190)}</div>
          <div>${skl(190)}</div>
        </div>
        <div class="grid grid-3 mt-4">${skl(120)}${skl(120)}${skl(120)}</div>
      </div>`)}
    ${sectionCard("2 · Table skeleton — Invoices", "Used while the AR ledger filters or paginates — toolbar, six rows with avatar circles, pagination bar.", "", `
      <div class="load-frame">
        <div class="flex gap-2 mb-4">${skl(36, "220px")}${skl(36, "120px")}<span class="grow"></span>${skl(36, "90px")}</div>
        ${[92, 78, 88, 70, 84, 76].map(w => `<div class="flex items-center gap-3" style="padding:9px 0;border-bottom:1px solid var(--border)"><div class="skeleton sk-circle" style="width:26px;height:26px;flex:none"></div><div class="skeleton" style="height:13px;width:${w}%"></div></div>`).join("")}
        <div class="flex justify-between mt-4">${skl(14, "150px")}${skl(28, "170px")}</div>
      </div>`)}
    ${sectionCard("3 · Copilot skeleton", "Used while the AI Finance Copilot composes an answer — the panel, two message rows and the prompt box shimmer in place.", "", `
      <div class="load-frame">
        <div class="flex items-center gap-2 mb-4"><div class="skeleton sk-circle" style="width:28px;height:28px"></div>${skl(14, "180px")}</div>
        <div style="max-width:78%">${skl(15)}${skl(15, "88%")}${skl(15, "64%")}</div>
        <div style="max-width:64%;margin-left:auto" class="mt-4">${skl(15)}${skl(15, "72%")}</div>
        <div class="mt-4">${skl(46)}</div>
        <p class="text-sm text-3 mt-3">The shimmer runs at 1.4s and respects the theme — skeletons are drawn from surface tokens, never grey hard-codes.</p>
      </div>`)}
  </div>`;

/* ================= CASH CALENDAR (the surprise screen) ================= */
function calDetailHtml(day) {
  const evs = (window.AD.calEvents || {})[day] || [];
  const today = DATA.meta.today;
  if (!evs.length) return `<div class="empty" style="padding:32px 16px"><div class="empty-art" style="width:64px;height:64px;font-size:26px">🗓</div><h3>Nov ${day} — nothing due</h3><p>No invoices land and no bills leave on this day. Days like this are the runway.</p></div>`;
  const net = evs.reduce((a, e) => a + (e.kind === "in" ? e.amount || 0 : e.kind === "note" ? 0 : -(e.amount || 0)), 0);
  return `<div class="flex items-baseline justify-between mb-2"><h3 style="font-size:17px">Nov ${day}, 2026</h3><span class="text-sm ${net >= 0 ? "text-success" : "text-danger"} font-semibold">${net >= 0 ? "+" : "−"}${fmt.money(Math.abs(net))} net</span></div>
  ${day === 11 ? `<div class="text-sm text-3 mb-2">Today — the books are live as of this morning's bank sync.</div>` : ""}
  ${evs.map(e => `<div class="cal-detail-ev"><span style="font-size:17px">${e.kind === "in" ? "🧾" : e.kind === "note" ? "📌" : "📥"}</span><div class="grow"><strong>${esc(e.label)}</strong><div class="text-sm text-3">${esc(e.detail)}</div></div>${e.amount ? `<strong style="color:${e.kind === "in" ? "var(--success-600)" : "var(--danger-600)"}">${e.kind === "in" ? "+" : "−"}${fmt.money(e.amount)}</strong>` : ""}</div>`).join("")}`;
}

S4["calendar"] = () => {
  const dayOf = s => { const m = String(s).match(/Nov (\d+), 2026/); return m ? parseInt(m[1], 10) : null; };
  const events = {};
  const add = (day, ev) => { if (day) (events[day] = events[day] || []).push(ev); };
  DATA.invoices.forEach(i => { const d = dayOf(i.due); if (d && ["open", "overdue"].includes(i.status)) add(d, { kind: "in", label: i.id + " — " + i.customer, detail: i.desc + " · due this day" + (i.status === "overdue" ? " · already overdue — reminder #2 drafted" : " · expected in"), amount: i.amount }); });
  DATA.bills.forEach(b => { const d = dayOf(b.due); if (d && ["due", "scheduled"].includes(b.status)) add(d, { kind: "out", label: b.id + " — " + b.vendor, detail: b.category + " · " + (b.status === "scheduled" ? "auto-pay scheduled" : "due — matched, awaiting the date"), amount: b.amount }); });
  add(17, { kind: "out", short: "HubSpot", label: "HubSpot annual renewal", detail: "Approval open · removing 11 idle seats first saves $1,870/yr", amount: 6850 });
  add(24, { kind: "note", label: "November payroll draft closes", detail: "2 new starters · 1 leaver · review by Nov 24", amount: 0 });
  add(28, { kind: "big", short: "Payroll", label: "Payroll run — November", detail: DATA.payroll.headcount + " employees · via Deel · estimated gross", amount: DATA.payroll.nextRunEst });
  add(30, { kind: "note", label: "November close begins", detail: "Bank rec sign-off + accrual review — the last two close tasks", amount: 0 });
  window.AD.calEvents = events;

  const receiptsNov = DATA.invoices.filter(i => i.status === "open" && i.due.includes("Nov")).reduce((a, i) => a + i.amount, 0);
  const billsNov = DATA.bills.filter(b => ["due", "scheduled"].includes(b.status) && b.due.includes("Nov")).reduce((a, b) => a + b.amount, 0);
  const projected = DATA.headline.cash + receiptsNov - billsNov - DATA.payroll.nextRunEst;

  const firstOffset = (new Date(2026, 10, 1).getDay() + 6) % 7; // Mon-first
  let busiest = 14, busiestCount = -1;
  Object.entries(events).forEach(([d, evs]) => { if (evs.length > busiestCount) { busiestCount = evs.length; busiest = parseInt(d, 10); } });
  const cells = [];
  for (let i = 0; i < 42; i++) {
    const dayNum = i - firstOffset + 1;
    if (dayNum < 1) { cells.push(`<div class="cal-day out"><span class="d-num">${31 + dayNum}</span></div>`); continue; }
    if (dayNum > 30) { cells.push(`<div class="cal-day out"><span class="d-num">${dayNum - 30}</span></div>`); continue; }
    const evs = events[dayNum] || [];
    const net = evs.reduce((a, e) => a + (e.kind === "in" ? e.amount || 0 : e.kind === "note" ? 0 : -(e.amount || 0)), 0);
    const chips = evs.slice(0, 2).map(e => {
      const nm = e.short || (e.label.split(" — ")[1] || e.label);
      const shortName = nm.length > 14 ? nm.split(" ")[0] : nm;
      return `<span class="cal-ev ${e.kind === "big" ? "big" : e.kind}">${e.kind === "note" ? "📌 " + esc(e.label.split(" — ")[0]) : (e.kind === "in" ? "▲ " : "▼ ") + fmt.money(e.amount) + " " + esc(shortName)}</span>`;
    }).join("");
    const more = evs.length > 2 ? `<span class="text-xs text-3">+${evs.length - 2} more</span>` : "";
    cells.push(`<div class="cal-day ${dayNum === 11 ? "today" : ""} ${dayNum === busiest ? "selected" : ""}" data-cal-day="${dayNum}" role="button" tabindex="0" aria-label="November ${dayNum}">
      <span class="d-num">${dayNum}${net !== 0 ? `<span class="d-net" style="color:${net >= 0 ? "var(--success-600)" : "var(--danger-600)"}">${net >= 0 ? "+" : "−"}${fmt.k(Math.abs(net))}</span>` : ""}</span>
      ${chips}${more}</div>`);
  }
  return `
  ${pageHeadD("Cash Calendar", "November 2026 as a wall calendar — every invoice landing and every bill leaving, on the day it happens. Click any day for the detail. No KPI cards, no chart: the month itself is the interface.", `<a class="btn btn-secondary" href="#/cashflow">Cash Flow view →</a>`)}
  <div class="grid grid-4 mb-4">
    ${statCard({ label: "Expected in — November", value: fmt.money(receiptsNov), hero: true, sub: "Open invoices falling due this month", accent: "#10b981" })}
    ${statCard({ label: "Committed out — bills", value: fmt.money(billsNov), sub: "Due + scheduled bills in November" })}
    ${statCard({ label: "Payroll — Nov 28", value: fmt.money(DATA.payroll.nextRunEst), sub: DATA.payroll.headcount + " employees · the month's biggest single day", accent: "#f43f5e" })}
    ${statCard({ label: "Projected Nov 30", value: fmt.money(projected), sub: "Matches the Cash Flow projection, payroll included", accent: "#38bdf8" })}
  </div>
  <div class="grid grid-2-1">
    <div class="card"><div class="card-body">
      <div class="cal-week"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
      <div class="cal-grid">${cells.join("")}</div>
      <div class="flex gap-3 mt-4" style="flex-wrap:wrap"><span class="cal-ev in">▲ money in</span><span class="cal-ev out">▼ money out</span><span class="cal-ev big">▼ payroll-scale</span><span class="text-sm text-3">Ring = today (Nov 11) · click a day for its detail →</span></div>
    </div></div>
    <div class="card"><div class="card-body" id="cal-detail">${calDetailHtml(busiest)}</div>
    <div class="card-foot">Every event on this calendar is a row in Invoices, Bills or Payroll — the calendar is a view, not a copy.</div></div>
  </div>`;
};

/* ================= PRODUCT PAGE (demo entry) ================= */
S4["product"] = () => `
  <div class="prod-wrap">
    <nav class="prod-nav">
      <span class="flex items-center gap-2"><span class="logo">✓</span><strong style="font-size:16.5px">Reconly</strong><span class="badge badge-neutral">UI Kit · v1.1</span></span>
      <span class="flex gap-4 items-center"><a href="#features">Features</a><a href="#screens">Screens</a><a href="#/styleguide">Style guide</a><a class="btn btn-secondary btn-sm" href="#/pricing">SaaS pricing page</a><a class="btn btn-primary btn-sm" href="#/command">Open the live demo →</a></span>
    </nav>

    <header class="prod-hero">
      <span class="badge badge-ai">✦ HTML · CSS · JS — no build step, no framework</span>
      <h1>The finance-ops dashboard kit that reads like a <span style="color:var(--brand-600)">real product</span>.</h1>
      <p class="lede">Cash flow, invoicing, payables with AI three-way matching, budgets, payroll — and an AI finance copilot that answers from the data on the page. 42 screens, one reconciled dataset, light + dark.</p>
      <div class="flex gap-2" style="justify-content:center;flex-wrap:wrap"><a class="btn btn-primary btn-lg" href="#/command">Open the live demo</a><a class="btn btn-secondary btn-lg" href="#/styleguide">See the design system</a></div>
      <div class="prod-price mt-4"><span class="amount">$79</span><span class="text-3 text-left" style="text-align:left">one-time · per end product<br>launch pricing $39–49</span></div>
    </header>

    <div class="prod-shot"><div class="frame"><img src="presentation/01-command-center.png" alt="Reconly Command Center — cash position hero figure, revenue vs expenses, AI cash insight panel"></div>
      <p class="text-sm text-3" style="text-align:center;margin-top:10px">The Command Center — one hero figure per screen, set in the Fraunces display face.</p></div>

    <section class="section" style="padding-bottom:6px">
      <div class="grid grid-4">
        ${statCard({ label: "Screens", value: "42", sub: "App, public, auth, states + this page" })}
        ${statCard({ label: "Components", value: "60+", sub: "Documented in docs/components.md" })}
        ${statCard({ label: "Themes", value: "2", sub: "Light + dark, token-driven" })}
        ${statCard({ label: "Dependencies", value: "0", sub: "No framework · no build · no jQuery" })}
      </div>
    </section>

    <section class="section" id="features"><h2>Why this kit clears the bar</h2><p class="sub">Six things reviewers look for — all six are in the download.</p>
      <div class="grid grid-3">
        ${[["🎨", "A design system, not screens", "An in-product Style Guide screen: colour tokens, the Fraunces + Inter type scale with a true hero size, spacing, radii — and every component in every state (default, hover, focus, disabled, error)."], ["✦", "A copilot with receipts", "A working AI Finance Copilot that answers questions from the on-page dataset, with confidence meters and cited sources on every answer — plus AI insight panels across the app."], ["🧾", "Automation that reconciles", "AP three-way matching, an exceptions queue, approvals with AI notes attached. And the demo data actually reconciles: category spend = department actuals = total expenses."], ["🌗", "Light + dark, from one file", "Every colour is a CSS variable in tokens.css — both themes, the charts and the skeletons follow when you change the emerald scale."], ["◌", "States are screens too", "Loading skeletons for the dashboard, tables and the copilot; six empty states with guidance instead of dead ends; 404 and maintenance included."], ["📚", "Docs + design source", "Six documentation files, a changelog, tokens.json for AI coding tools, and one Figma-importable SVG artboard per screen in design-source/."]].map(([i, t, d]) => `<div class="card"><div class="card-body"><div style="font-size:24px" class="mb-2">${i}</div><strong>${t}</strong><p class="text-sm text-2 mt-2" style="line-height:1.65">${d}</p></div></div>`).join("")}
      </div></section>

    <section class="section" id="screens"><h2>The screens</h2><p class="sub">Eight of the 42 — the live demo has all of them, populated with the Arcadia Systems dataset.</p>
      <div class="prod-gallery">
        ${[["02-ai-copilot.png", "AI Finance Copilot — answers with receipts"], ["03-invoices-table.png", "Invoices — a dense AR table that sorts, searches and paginates"], ["04-dark-mode.png", "Dark mode — the same Command Center, token-flipped"], ["05-style-guide.png", "Style Guide — the system, inside the product"], ["06-loading-states.png", "Loading States — skeletons for dashboard, table and copilot"], ["07-cash-calendar.png", "Cash Calendar — November as a wall calendar of money in and out"], ["08-empty-states.png", "Empty States — six zero-data patterns with guidance"], ["01-command-center.png", "Command Center — the hero-figure hierarchy"]].map(([f, c]) => `<figure><div class="frame"><img src="presentation/${f}" alt="${esc(c)}" loading="lazy"></div><figcaption>${esc(c)}</figcaption></figure>`).join("")}
      </div></section>

    <section class="section"><h2>What's in the download</h2><p class="sub">One ZIP. Open index.html and it runs.</p>
      <div class="grid grid-2-1">
        <div class="card"><div class="card-body"><div class="flex flex-col gap-3 text-sm" style="line-height:1.6">
          ${["42 screens — 29 app screens (incl. Cash Calendar), landing, pricing, 4 auth, onboarding, style guide, empty states, loading states, 404, maintenance — plus this product page", "60+ components with all states documented in the in-product Style Guide", "Fraunces display + Inter text type system with a 6-step scale and hero figures", "Hand-rolled SVG charts — line, area, grouped bars, donut, MRR waterfall, sparklines", "Working demo logic: hash router, ⌘K command palette, sortable tables, live forecast sliders, copilot Q&A", "Design source: tokens.json + one Figma-importable SVG per screen + design-dna.md", "Full docs: getting started, customization, components, file structure, browser support, deployment"].map(x => `<div class="flex gap-2"><span style="color:var(--brand-600);font-weight:700">✓</span><span>${x}</span></div>`).join("")}
        </div></div></div>
        <div class="price-card hot"><span class="badge badge-ai" style="align-self:flex-start">Complete kit</span>
          <h3>Reconly — AI Finance Operations Dashboard</h3>
          <div class="price">$79</div>
          <ul><li>✓ All 42 screens, light + dark</li><li>✓ Design tokens + design source</li><li>✓ Docs + changelog</li><li>✓ One license per end product</li></ul>
          <a class="btn btn-primary" href="#/command" style="justify-content:center">Open the live demo →</a>
          <p class="text-sm text-3" style="text-align:center">HTML/CSS/JS only — no Figma file; design source is SVG + tokens.</p>
        </div>
      </div></section>

    <footer class="public-foot">Reconly is a fictional product; “Arcadia Systems” is the demo tenant whose books populate every screen. · This product page is the demo's entry point — the app is one click away, and deep links (e.g. #/copilot) work as always.</footer>
  </div>`;
