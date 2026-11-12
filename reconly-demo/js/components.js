/* ============================================================
   Reconly — Component library (60+ components)
   Helpers return HTML strings. Screens compose them.
   API used by screens-a.js, screens-b.js AND screens-c.js —
   do not change signatures without updating all three files.
   ============================================================ */

function esc(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/* ---------- Badges ---------- */
function badge(text, kind = "neutral") { return `<span class="badge badge-${kind}">${esc(text)}</span>`; }
function statusBadge(s) {
  const map = {
    paid: ["Paid", "success"], open: ["Open", "info"], overdue: ["Overdue", "danger"],
    scheduled: ["Scheduled", "neutral"], draft: ["Draft", "neutral"], due: ["Due", "warning"],
    approval: ["Needs approval", "warning"], matched: ["Matched", "success"], review: ["Needs review", "warning"],
    active: ["Active", "success"], renewing: ["Renewing soon", "warning"], paused: ["Paused", "neutral"],
    connected: ["Connected", "success"], available: ["Available", "neutral"],
    "on-track": ["On track", "success"], action: ["Action needed", "danger"],
    online: ["Online", "success"], busy: ["Busy", "warning"], away: ["Away", "warning"],
    high: ["High risk", "danger"], medium: ["Medium risk", "warning"], low: ["Low risk", "success"]
  };
  const [label, kind] = map[s] || [s, "neutral"];
  return badge(label, kind);
}
function confidenceBadge(n) {
  const kind = n >= 90 ? "ai" : n >= 75 ? "info" : "warning";
  return `<span class="confidence"><span class="bar"><i style="width:${n}%"></i></span>${n}% AI</span>`;
}
function dueBadge(daysOverdue) {
  if (daysOverdue > 0) return badge(daysOverdue + "d overdue", "danger");
  if (daysOverdue === 0) return badge("Due today", "warning");
  return badge("Due in " + Math.abs(daysOverdue) + "d", "neutral");
}

/* ---------- Avatars ---------- */
function avatarHtml(name, size = "") {
  const cls = size ? "avatar avatar-" + size : "avatar";
  return `<span class="${cls}" style="background:${avatarColor(name)}" title="${esc(name)}">${esc(fmt.initials(name))}</span>`;
}
function avatarStack(names, max = 4) {
  const shown = names.slice(0, max);
  const extra = names.length - shown.length;
  return `<span class="avatar-stack">${shown.map(n => avatarHtml(n, "sm")).join("")}${extra > 0 ? `<span class="avatar avatar-sm" style="background:var(--surface-3);color:var(--text-3)">+${extra}</span>` : ""}</span>`;
}

/* ---------- Stat cards ---------- */
function statCard(o) {
  // o: {label, value, delta, deltaDir('up'|'down'), deltaGood(bool), sub, spark:[numbers], icon, accent}
  const tone = o.deltaGood !== undefined ? (o.deltaGood ? "delta-up" : "delta-down") : (o.deltaDir === "down" ? "delta-down" : "delta-up");
  const delta = o.delta ? `<span class="stat-delta ${tone}">${o.deltaDir === "down" ? "↓" : "↑"} ${esc(o.delta)}</span>` : "";
  const spark = o.spark ? `<span class="stat-spark">${sparkline(o.spark, { color: o.accent || "#10b981", w: 84, h: 26 })}</span>` : "";
  return `<div class="stat-card">
    <div class="stat-label">${o.icon || ""} ${esc(o.label)}</div>
    <div class="stat-value">${o.value}</div>
    <div class="stat-foot">
      <div class="stat-foot-text">${delta}<span class="stat-sub">${esc(o.sub || "")}</span></div>
      ${spark}
    </div>
  </div>`;
}

/* ---------- Progress / meters ---------- */
function progressBar(pct, kind = "") {
  return `<div class="progress ${kind}"><i style="width:${Math.max(0, Math.min(100, pct))}%"></i></div>`;
}
function budgetMeter(actual, budget) {
  const pct = Math.round((actual / budget) * 100);
  const kind = pct >= 100 ? "danger" : pct >= 90 ? "warning" : "";
  return `<div class="flex items-center gap-2"><div class="grow">${progressBar(pct, kind)}</div><span class="text-sm text-3" style="min-width:38px;text-align:right">${pct}%</span></div>`;
}

/* ---------- Forms ---------- */
function toggleInput(checked, id, label) {
  return `<label class="switch"><input type="checkbox" id="${id}" ${checked ? "checked" : ""}><span class="track"></span></label>${label ? `<span class="text-sm">${esc(label)}</span>` : ""}`;
}
function fieldHtml(label, control, hint) {
  return `<div class="field"><label>${esc(label)}</label>${control}${hint ? `<span class="hint">${esc(hint)}</span>` : ""}</div>`;
}

/* ---------- Cards & sections ---------- */
function sectionCard(title, sub, actions, body, foot) {
  return `<div class="card">
    <div class="card-head"><div><h3>${esc(title)}</h3>${sub ? `<div class="text-sm text-3">${esc(sub)}</div>` : ""}</div><div class="flex gap-2">${actions || ""}</div></div>
    <div class="card-body">${body}</div>
    ${foot ? `<div class="card-foot">${foot}</div>` : ""}
  </div>`;
}

/* ---------- Data table (sortable / filterable / paginated / searchable) ----------
   columns: [{key, label, sortable=true, render?(row)=>html, width?}]
   Register in window.AD.tables[tid]; app.js wires the controls. */
function dataTable(tid, columns, rows, opts = {}) {
  const pageSize = opts.pageSize || 8;
  const searchable = opts.searchable !== false;
  const toolbar = `<div class="table-toolbar">
      ${searchable ? `<div class="input-icon search-input"><span class="icon">⌕</span><input class="input" data-table-search="${tid}" placeholder="Search…" aria-label="Search table"></div>` : ""}
      ${opts.filters || ""}
      <span class="text-sm text-3" style="margin-left:auto" data-table-count="${tid}"></span>
    </div>`;
  const head = columns.map(c => `<th data-sort="${c.key}" class="${c.sortable === false ? "" : "sortable"}" ${c.width ? `style="width:${c.width}"` : ""}>${esc(c.label)}${c.sortable === false ? "" : " ↕"}</th>`).join("");
  return `<div class="card" data-table="${tid}">
    ${toolbar}
    <div class="table-wrap"><table class="data"><thead><tr>${head}</tr></thead><tbody data-table-body="${tid}"></tbody></table></div>
    <div class="card-foot flex items-center justify-between">
      <span class="text-sm text-3" data-table-pageinfo="${tid}"></span>
      <span class="pagination" data-table-pages="${tid}"></span>
    </div>
  </div>`;
}

/* Render table page (called by app.js) */
function renderTablePage(tid) {
  const t = window.AD.tables[tid];
  if (!t) return;
  let rows = t.rows.slice();
  if (t.query) {
    const q = t.query.toLowerCase();
    rows = rows.filter(r => t.columns.some(c => String(c.search ? c.search(r) : (r[c.key] ?? "")).toLowerCase().includes(q)));
  }
  if (t.sortKey) {
    rows.sort((a, b) => {
      const av = a[t.sortKey], bv = b[t.sortKey];
      const cmp = typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv));
      return t.sortDir === "desc" ? -cmp : cmp;
    });
  }
  const total = rows.length;
  const pages = Math.max(1, Math.ceil(total / t.pageSize));
  t.page = Math.min(t.page, pages);
  const start = (t.page - 1) * t.pageSize;
  const pageRows = rows.slice(start, start + t.pageSize);
  const body = document.querySelector(`[data-table-body="${tid}"]`);
  if (body) body.innerHTML = pageRows.map(r => `<tr>${t.columns.map(c => `<td>${c.render ? c.render(r) : esc(r[c.key] ?? "")}</td>`).join("")}</tr>`).join("") || `<tr><td colspan="${t.columns.length}" style="text-align:center;color:var(--text-3);padding:28px">No results match your filters.</td></tr>`;
  const count = document.querySelector(`[data-table-count="${tid}"]`);
  if (count) count.textContent = fmt.num(total) + " rows";
  const info = document.querySelector(`[data-table-pageinfo="${tid}"]`);
  if (info) info.textContent = total === 0 ? "No rows" : `Showing ${start + 1}–${Math.min(start + t.pageSize, total)} of ${fmt.num(total)}`;
  const pagesEl = document.querySelector(`[data-table-pages="${tid}"]`);
  if (pagesEl) {
    let html = "";
    for (let p = 1; p <= pages; p++) html += `<button class="page-btn ${p === t.page ? "active" : ""}" data-table-goto="${tid}:${p}">${p}</button>`;
    pagesEl.innerHTML = html;
  }
}

/* ---------- Modal / drawer / toast ---------- */
function openModal(title, body, foot, size) {
  closeModal();
  const el = document.createElement("div");
  el.className = "modal-backdrop";
  el.id = "modal-root";
  el.innerHTML = `<div class="modal ${size === "lg" ? "modal-lg" : ""}" role="dialog" aria-modal="true">
    <div class="modal-head"><h3>${esc(title)}</h3><button class="btn btn-ghost btn-icon btn-sm" onclick="closeModal()" aria-label="Close">✕</button></div>
    <div class="modal-body">${body}</div>
    ${foot ? `<div class="modal-foot">${foot}</div>` : ""}
  </div>`;
  el.addEventListener("click", e => { if (e.target === el) closeModal(); });
  document.body.appendChild(el);
}
function closeModal() { const m = document.getElementById("modal-root"); if (m) m.remove(); }
function openDrawer(title, body) {
  closeDrawer();
  const wrap = document.createElement("div");
  wrap.id = "drawer-root";
  wrap.innerHTML = `<div class="drawer-backdrop" onclick="closeDrawer()"></div>
    <aside class="drawer"><div class="modal-head"><h3>${esc(title)}</h3><button class="btn btn-ghost btn-icon btn-sm" onclick="closeDrawer()" aria-label="Close">✕</button></div>
    <div class="modal-body">${body}</div></aside>`;
  document.body.appendChild(wrap);
}
function closeDrawer() { const d = document.getElementById("drawer-root"); if (d) d.remove(); }
function toast(msg, kind = "info") {
  const root = document.getElementById("toast-root");
  const icons = { info: "ℹ", success: "✓", warning: "⚠", danger: "✕" };
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<span style="color:var(--${kind === "info" ? "info" : kind}-500);font-weight:700">${icons[kind] || "ℹ"}</span><span>${msg}</span>`;
  root.appendChild(el);
  setTimeout(() => el.remove(), 4200);
}

/* ---------- Empty state ---------- */
function emptyState(o) {
  return `<div class="empty">
    <div class="empty-art">${o.icon || "📭"}</div>
    <h3>${esc(o.title)}</h3><p>${esc(o.text)}</p>
    ${o.cta || ""}
  </div>`;
}

/* ---------- AI copilot / insight panel ---------- */
function copilotPanel(o) {
  // o: {summary, suggestions:[{text, confidence}], sources:[strings], label?}
  const sug = (o.suggestions || []).map(s => `<div class="suggestion"><span class="ai-chip">✦ AI</span><div class="grow">${esc(s.text)}<div class="mt-2 flex items-center gap-2">${confidenceBadge(s.confidence)}<button class="btn btn-sm btn-secondary" onclick="toast('Applied — you can undo this from Activity','success')">Apply</button></div></div></div>`).join("");
  const sources = (o.sources || []).map(s => `<span class="chip">📄 ${esc(s)}</span>`).join("");
  return `<div class="copilot">
    <div class="copilot-head"><span class="ai-chip">✦ ${esc(o.label || "AI Insight")}</span><span class="text-sm text-3" style="margin-left:auto">Reconly AI</span></div>
    <div class="copilot-body">
      <div class="text-sm font-semibold mb-2">Summary</div>
      <p class="text-sm text-2" style="line-height:1.65">${esc(o.summary)}</p>
      ${sug ? `<div class="divider"></div><div class="text-sm font-semibold mb-2">Suggested actions</div><div class="flex flex-col gap-2">${sug}</div>` : ""}
      ${sources ? `<div class="divider"></div><div class="text-sm font-semibold mb-2">Grounded in</div><div class="flex gap-2" style="flex-wrap:wrap">${sources}</div>` : ""}
    </div>
  </div>`;
}

/* ---------- Misc ---------- */
function legend(items) {
  return `<div class="legend">${items.map(i => `<span><span class="swatch" style="background:${i.color}"></span>${esc(i.label)}</span>`).join("")}</div>`;
}
function kbd(keys) { return `<span class="kbd">${esc(keys)}</span>`; }
function moneyCell(n, strong) { return `<span class="${strong ? "font-semibold" : ""}" style="font-variant-numeric:tabular-nums">${fmt.money(n)}</span>`; }

if (typeof window !== "undefined") {
  window.AD = Object.assign(window.AD || {}, {
    esc, badge, statusBadge, confidenceBadge, dueBadge,
    avatarHtml, avatarStack, statCard, progressBar, budgetMeter, toggleInput, fieldHtml,
    sectionCard, dataTable, renderTablePage, openModal, closeModal, openDrawer, closeDrawer,
    toast, emptyState, copilotPanel, legend, kbd, moneyCell, tables: {}
  });
}
if (typeof module !== "undefined") module.exports = { esc };
