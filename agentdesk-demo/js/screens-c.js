/* ============================================================
   AgentDesk — Screens C (36–40 of 40)
   Onboarding wizard, Maintenance page, Style Guide, Loading
   States and the Copilot Console. Same helpers and data as
   screens-a.js / screens-b.js.
   ============================================================ */

const ScreensC = (() => {
  const { DATA, fmt } = window.AD;
  const { esc, badge, statusBadge, priorityBadge, statCard, heroBand, progressBar, slaTimer,
    toggleInput, avatarHtml, avatarStack, confidenceBadge, copilotPanel, emptyState, kbd } = window.AD;
  const M = DATA.metrics;
  const S = DATA.series14;

  function pageHead(title, sub, actions) {
    return `<div class="page-head"><div><h1>${esc(title)}</h1><div class="page-sub">${esc(sub)}</div></div>
      <div class="flex gap-2">${actions || ""}</div></div>`;
  }

  /* ============ 36. Onboarding wizard ============ */
  function onboarding() {
    const steps = [
      { n: 1, title: "Your workspace", desc: "Name it and pick a plan", done: true, current: false },
      { n: 2, title: "Connect channels", desc: "Email, chat, voice, social", done: true, current: false },
      { n: 3, title: "Invite your team", desc: "Agents and roles", done: false, current: true },
      { n: 4, title: "Set up AI agents", desc: "Pick models and guardrails", done: false, current: false },
      { n: 5, title: "Done", desc: "Start answering tickets", done: false, current: false }
    ];
    return `<div class="page-full">
      <div class="marketing-nav">
        <div class="flex items-center gap-2"><span class="brand-mark">✦</span><span class="brand-name">Agent<span>Desk</span></span></div>
        <span class="text-sm text-3" style="margin-left:auto">Step 3 of 5 · <a href="#/overview">Skip setup →</a></span>
      </div>
      <div style="flex:1;display:flex;align-items:center;justify-content:center;padding:24px">
        <div style="width:100%;max-width:880px">
          <div class="grid col-3-2">
            <div>
              <h1 style="font-size:28px;margin-bottom:8px">Set up your workspace</h1>
              <p class="text-3" style="margin-bottom:24px">Five quick steps and your team can start answering tickets with AI help.</p>
              <div class="flex flex-col gap-3">
                ${steps.map(s => `<div class="flex items-start gap-3">
                  <span class="avatar ${s.done ? "avatar-ai" : ""}" style="${s.current ? "background:var(--brand-600)" : s.done ? "" : "background:var(--surface-3);color:var(--text-3)"}">${s.done ? "✓" : s.n}</span>
                  <div><div class="font-semibold" style="${s.current ? "" : "color:var(--text-3)"}">${esc(s.title)}</div>
                  <div class="text-sm text-3">${esc(s.desc)}</div></div>
                  ${s.current ? badge("Current step", "brand") : ""}
                </div>`).join("")}
              </div>
              <div class="mt-6"><div class="flex justify-between text-sm mb-2"><span class="text-3">Setup progress</span><b>40%</b></div>
              <div class="progress ai"><i style="width:40%"></i></div></div>
            </div>
            <div class="card card-pad">
              <h3 class="mb-2">Invite your team</h3>
              <p class="text-sm text-3 mb-4">Teammates get the Agent role by default. You can change roles later in Settings → Roles.</p>
              <div class="flex flex-col gap-3">
                <div class="field"><label>Work email</label><input class="input" placeholder="teammate@company.com"></div>
                <div class="field"><label>Role</label><select class="select"><option>Agent</option><option>Senior Agent</option><option>Support Lead</option><option>Viewer</option></select></div>
                <button class="btn btn-secondary" onclick="toast('Invite sent to teammate@company.com','success')">+ Add another</button>
                <div class="divider"></div>
                <div class="flex gap-2">
                  <button class="btn btn-secondary grow" onclick="toast('Step saved — back to channels','info')">← Back</button>
                  <a class="btn grow" href="#/overview" style="text-decoration:none">Continue →</a>
                </div>
                <p class="text-xs text-3" style="text-align:center">Invited so far: Mara Jensen, Diego Fuentes · ${DATA.humans.length} agents on the team</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="marketing-foot">AgentDesk · ${M.aiRate}% of tickets resolved by AI in the last 14 days</div>
    </div>`;
  }

  /* ============ 37. Maintenance ============ */
  function maintenance() {
    return `<div class="page-full">
      <div class="auth-wrap">
        <div style="text-align:center;max-width:520px">
          <div class="auth-logo"><span class="brand-mark" style="width:44px;height:44px;font-size:22px">✦</span></div>
          <h1 style="font-size:32px;margin-bottom:10px">We'll be back soon.</h1>
          <p class="text-3" style="line-height:1.65;margin-bottom:24px">AgentDesk is down for scheduled maintenance. Your tickets, agents and
          AI settings are safe — nothing is lost. Maintenance usually takes under 30 minutes.</p>
          <div class="card card-pad" style="text-align:left;margin-bottom:24px">
            <div class="stat-list">
              <div class="row"><span>Maintenance window</span><b>02:00 – 02:30 UTC</b></div>
              <div class="row"><span>Status</span><b>Database upgrade in progress</b></div>
              <div class="row"><span>Open tickets when we return</span><b>${M.openTickets}</b></div>
              <div class="row"><span>AI agents paused</span><b>${DATA.aiAgents.length} — they resume automatically</b></div>
            </div>
            <div class="mt-4"><div class="flex justify-between text-sm mb-2"><span class="text-3">Progress</span><b>60%</b></div>
            <div class="progress ai"><i style="width:60%"></i></div></div>
          </div>
          <div class="flex gap-2" style="justify-content:center">
            <a class="btn" href="#/overview" style="text-decoration:none">Check the dashboard</a>
            <button class="btn btn-secondary" onclick="toast('Status page opened (demo action)','info')">Status page</button>
          </div>
          <p class="text-xs text-3 mt-6">Urgent? Email support@agentdesk.app — the on-call team still answers.</p>
        </div>
      </div>
    </div>`;
  }

  /* ============ 38. Style Guide / design system ============ */
  function swatch(name, hex, token) {
    return `<div class="swatch-tile"><div class="sw" style="background:${hex}"></div><div class="sw-meta"><div class="sw-name">${esc(name)}</div><div class="sw-val">${esc(token)}<br>${esc(hex)}</div></div></div>`;
  }

  function styleguide() {
    const brand = [["50", "#eef2ff"], ["100", "#e0e7ff"], ["200", "#c7d2fe"], ["300", "#a5b4fc"], ["400", "#818cf8"], ["500", "#6366f1"], ["600", "#5457e5"], ["700", "#4345c4"], ["800", "#373a9e"], ["900", "#2e307f"]];
    const ai = [["50", "#f0fdfa"], ["100", "#ccfbf1"], ["200", "#99f6e4"], ["300", "#5eead4"], ["400", "#2dd4bf"], ["500", "#14b8a6"], ["600", "#0d9488"], ["700", "#0f766e"]];
    const semantic = [["Success 500", "#22c55e", "--success-500"], ["Success 400", "#4ade80", "--success-400"], ["Warning 500", "#f59e0b", "--warning-500"], ["Warning 400", "#fbbf24", "--warning-400"], ["Danger 500", "#ef4444", "--danger-500"], ["Danger 400", "#f87171", "--danger-400"], ["Info 500", "#0ea5e9", "--info-500"], ["Info 400", "#38bdf8", "--info-400"]];
    const chart = [["Chart 1", "#6366f1", "--chart-1"], ["Chart 2", "#14b8a6", "--chart-2"], ["Chart 3", "#f59e0b", "--chart-3"], ["Chart 4", "#38bdf8", "--chart-4"], ["Chart 5", "#f472b6", "--chart-5"], ["Chart 6", "#a78bfa", "--chart-6"]];
    const surfaces = [["Background", "var(--bg)", "--bg"], ["Background soft", "var(--bg-soft)", "--bg-soft"], ["Surface", "var(--surface)", "--surface"], ["Surface 2", "var(--surface-2)", "--surface-2"], ["Surface 3", "var(--surface-3)", "--surface-3"], ["Surface hover", "var(--surface-hover)", "--surface-hover"], ["Input background", "var(--input-bg)", "--input-bg"], ["Sidebar", "var(--sidebar-bg)", "--sidebar-bg"]];
    const texts = [["Text", "var(--text)", "--text"], ["Text 2", "var(--text-2)", "--text-2"], ["Text 3", "var(--text-3)", "--text-3"], ["Text 4", "var(--text-4)", "--text-4"], ["Border", "var(--border-strong)", "--border"], ["Brand 500", "var(--brand-500)", "--brand-500"], ["AI 500", "var(--ai-500)", "--ai-500"]];
    const typeScale = [
      { meta: "Step 1 · --text-xs · 11px\nMicro labels, table headers", style: "font-size:11px;text-transform:uppercase;letter-spacing:.06em;font-weight:600", text: "SLA at risk · 9 tickets" },
      { meta: "Step 2 · --text-sm · 12.5px\nSecondary UI text", style: "font-size:12.5px", text: "Updated 2 min ago · All times UTC" },
      { meta: "Step 3 · --text-base · 14px\nBody text", style: "font-size:14px", text: "The AI drafts a reply and checks confidence before sending." },
      { meta: "Step 4 · --text-xl · 20px\nCard & section titles", style: "font-size:20px;font-family:var(--font-display);font-weight:600", text: "Live queue — needs attention first" },
      { meta: "Step 5 · --text-3xl · 30px\nDisplay headings", style: "font-size:30px;font-family:var(--font-display);font-weight:700;letter-spacing:-.02em", text: "Support that runs itself" },
      { meta: "Step 6 · --text-hero · 46px\nHero numerals — one per screen", style: "font-size:46px;font-family:var(--font-display);font-weight:700;letter-spacing:-.03em;line-height:1", text: fmt.num(M.totalResolved14) }
    ];
    const spaces = [["1", 4], ["2", 8], ["3", 12], ["4", 16], ["5", 20], ["6", 24], ["8", 32], ["10", 40], ["12", 48], ["16", 64]];
    const radii = [["sm", "6px"], ["md", "8px"], ["lg", "12px"], ["xl", "16px"], ["2xl", "20px"], ["full", "9999px"]];
    const btnRow = (label, cls, extra = "") => `<div><div class="state-tag">${label}</div><div class="flex gap-2" style="flex-wrap:wrap">
      <button class="btn ${cls}" ${extra}>Primary</button><button class="btn btn-secondary ${cls}" ${extra}>Secondary</button><button class="btn btn-ghost ${cls}" ${extra}>Ghost</button><button class="btn btn-ai ${cls}" ${extra}>✦ AI action</button><button class="btn btn-danger ${cls}" ${extra}>Danger</button></div></div>`;
    return pageHead("Style Guide", "The AgentDesk design system, live inside the product — every token and component on this page is rendered by the same CSS that ships in this template. Toggle ☾ in the topbar: everything below adapts.", `
      <a class="btn btn-secondary" href="#/loading">Loading states →</a>
      <a class="btn" href="#/console">Copilot Console →</a>`) + `

    <div class="card mb-4"><div class="card-head"><div><h3>Color — brand &amp; AI accent</h3><div class="text-sm text-3">Indigo is the brand; teal marks everything AI-generated. Never hard-code a hex — use the token.</div></div></div>
      <div class="card-body">
        <div class="text-sm font-semibold mb-2">Brand — indigo</div>
        <div class="swatch-grid mb-4">${brand.map(([n, hex]) => swatch("Brand " + n, hex, "--brand-" + n)).join("")}</div>
        <div class="text-sm font-semibold mb-2">AI accent — teal</div>
        <div class="swatch-grid">${ai.map(([n, hex]) => swatch("AI " + n, hex, "--ai-" + n)).join("")}</div>
      </div></div>

    <div class="grid grid-2 mb-4">
      <div class="card"><div class="card-head"><h3>Semantic &amp; chart</h3></div><div class="card-body">
        <div class="swatch-grid mb-4">${semantic.map(([n, hex, tok]) => swatch(n, hex, tok)).join("")}</div>
        <div class="swatch-grid">${chart.map(([n, hex, tok]) => swatch(n, hex, tok)).join("")}</div>
      </div></div>
      <div class="card"><div class="card-head"><div><h3>Surfaces &amp; text</h3><div class="text-sm text-3">Theme-aware — these swatches follow the active theme</div></div></div><div class="card-body">
        <div class="swatch-grid mb-4">${surfaces.map(([n, v, tok]) => swatch(n, v, tok)).join("")}</div>
        <div class="swatch-grid">${texts.map(([n, v, tok]) => swatch(n, v, tok)).join("")}</div>
      </div></div>
    </div>

    <div class="card mb-4"><div class="card-head"><div><h3>Typography — two voices, six steps</h3><div class="text-sm text-3">Space Grotesk gives headlines and numerals their character; Inter carries the UI; JetBrains Mono handles numbers, timers and IDs.</div></div></div>
      <div class="card-body">
        <div class="grid grid-3 mb-4">
          <div><div class="state-tag">Display · --font-display</div><div style="font-family:var(--font-display);font-size:26px;font-weight:700;letter-spacing:-.02em">Space Grotesk</div><div class="text-sm text-3 mt-1">Aa Ee Gg Rr 0123456789 — headlines, page titles, stat values, hero numerals.</div></div>
          <div><div class="state-tag">Sans · --font-sans</div><div style="font-size:26px;font-weight:600">Inter</div><div class="text-sm text-3 mt-1">Aa Ee Gg Rr 0123456789 — body text, tables, forms, navigation.</div></div>
          <div><div class="state-tag">Mono · --font-mono</div><div class="mono" style="font-size:22px;font-weight:600">JetBrains Mono</div><div class="text-sm text-3 mt-1">AD-1042 · 18m left · $0.10 / 1K — IDs, SLA timers, token counts, code.</div></div>
        </div>
        ${typeScale.map(t => `<div class="type-row"><div class="type-meta">${esc(t.meta).replace(/\n/g, "<br>")}</div><div style="${t.style}">${esc(t.text)}</div></div>`).join("")}
        <div class="flex gap-6 mt-4" style="flex-wrap:wrap">
          <span class="text-sm"><b>Weights</b> · <span style="font-weight:400">400</span> <span style="font-weight:500">500</span> <span style="font-weight:600">600</span> <span style="font-weight:700">700</span> <span style="font-weight:800">800</span></span>
          <span class="text-sm text-3">Leading: tight 1.2 · normal 1.45 · relaxed 1.65</span>
          <span class="text-sm text-3">Headings track −0.01em · page titles −0.02em · hero −0.03em</span>
        </div>
      </div></div>

    <div class="grid grid-3 mb-4">
      <div class="card"><div class="card-head"><h3>Spacing — 8px base</h3></div><div class="card-body">
        ${spaces.map(([n, px]) => `<div class="space-row"><span style="width:74px">--space-${n}</span><span class="space-bar" style="width:${px * 2}px"></span><span>${px}px</span></div>`).join("")}
      </div></div>
      <div class="card"><div class="card-head"><h3>Radii</h3></div><div class="card-body">
        <div class="flex gap-3" style="flex-wrap:wrap">${radii.map(([n, v]) => `<div style="text-align:center"><span class="radius-tile" style="border-radius:${v}"></span><div class="text-xs text-3 mt-1">${n} · ${v}</div></div>`).join("")}</div>
      </div></div>
      <div class="card"><div class="card-head"><h3>Shadows</h3></div><div class="card-body">
        <div class="flex flex-col gap-3">
          <div class="card card-pad" style="box-shadow:var(--shadow-sm)"><span class="text-sm font-semibold">--shadow-sm</span><span class="text-sm text-3"> · cards at rest</span></div>
          <div class="card card-pad" style="box-shadow:var(--shadow-md)"><span class="text-sm font-semibold">--shadow-md</span><span class="text-sm text-3"> · toasts, raised panels</span></div>
          <div class="card card-pad" style="box-shadow:var(--shadow-lg)"><span class="text-sm font-semibold">--shadow-lg</span><span class="text-sm text-3"> · modals, drawers, hero shots</span></div>
        </div>
      </div></div>
    </div>

    <div class="card mb-4"><div class="card-head"><div><h3>Buttons — every variant, every state</h3><div class="text-sm text-3">Hover and focus rows are pinned with demo classes so all states are visible at once.</div></div></div>
      <div class="card-body flex flex-col gap-4">
        ${btnRow("Default", "")}
        ${btnRow("Hover (pinned)", "demo-hover")}
        ${btnRow("Disabled", "", "disabled")}
        <div><div class="state-tag">Sizes &amp; icon</div><div class="flex gap-2 items-center" style="flex-wrap:wrap">
          <button class="btn btn-sm">Small · 30px</button><button class="btn">Default · 36px</button><button class="btn btn-lg">Large · 44px</button>
          <button class="btn btn-icon" aria-label="Icon button">✦</button><button class="btn btn-secondary btn-icon btn-sm" aria-label="Small icon button">⚙</button>
          <button class="btn btn-success">Success</button></div></div>
      </div></div>

    <div class="grid grid-2 mb-4">
      <div class="card"><div class="card-head"><h3>Badges, pills &amp; chips</h3></div><div class="card-body flex flex-col gap-4">
        <div><div class="state-tag">Badge kinds</div><div class="flex gap-2" style="flex-wrap:wrap">${badge("Brand", "brand")}${badge("✦ AI", "ai")}${badge("Success", "success")}${badge("Warning", "warning")}${badge("Danger", "danger")}${badge("Info", "info")}${badge("Neutral", "neutral")}</div></div>
        <div><div class="state-tag">Status</div><div class="flex gap-2" style="flex-wrap:wrap">${statusBadge("open")}${statusBadge("pending")}${statusBadge("solved")}${statusBadge("escalated")}${statusBadge("working")}${statusBadge("paused")}</div></div>
        <div><div class="state-tag">Priority pills</div><div class="flex gap-2" style="flex-wrap:wrap">${priorityBadge("urgent")}${priorityBadge("high")}${priorityBadge("normal")}${priorityBadge("low")}</div></div>
        <div><div class="state-tag">Chips &amp; kbd</div><div class="flex gap-2 items-center" style="flex-wrap:wrap"><span class="chip">📄 Refund policy</span><span class="chip">🏷 billing · duplicate-charge</span>${kbd("⌘K")}${kbd("esc")}</div></div>
        <div><div class="state-tag">Avatars</div><div class="flex gap-3 items-center">${avatarHtml("Mara Jensen", "sm")}${avatarHtml("Diego Fuentes")}${avatarHtml("Kenji Watanabe", "lg")}${avatarStack(["Mara Jensen", "Diego Fuentes", "Kenji Watanabe", "Priya Nair", "Tom Becker"])}<span class="avatar avatar-ai">✦</span></div></div>
      </div></div>
      <div class="card"><div class="card-head"><h3>Forms — states included</h3></div><div class="card-body flex flex-col gap-4">
        <div class="grid grid-2">
          <div class="field"><label>Default</label><input class="input" value="Brightloop"></div>
          <div class="field"><label>Focus (pinned)</label><input class="input demo-focus" value="brightloop.io"></div>
          <div class="field"><label>Disabled</label><input class="input" value="Read only" disabled></div>
          <div class="field"><label>Error</label><input class="input input-error" value="not-an-email"><span class="error-msg">⚠ Enter a valid email address</span></div>
        </div>
        <div class="field"><label>With hint</label><input class="input" placeholder="teammate@company.com"><span class="hint">Teammates get the Agent role by default.</span></div>
        <div class="grid grid-2">
          <div class="field"><label>Select</label><select class="select"><option>Scale plan</option><option>Growth plan</option></select></div>
          <div class="field"><label>Textarea</label><textarea class="textarea" style="min-height:64px">Thanks for flagging this — I can see the duplicate charge…</textarea></div>
        </div>
        <div class="flex gap-6" style="flex-wrap:wrap">
          <label class="checkbox-row"><input type="checkbox" checked> Checkbox on</label>
          <label class="checkbox-row"><input type="checkbox"> Checkbox off</label>
          <label class="radio-row"><input type="radio" name="sg-r" checked> Radio</label>
          <span class="flex items-center gap-2">${toggleInput(true, "sg-t1")} <span class="text-sm">Toggle on</span></span>
          <span class="flex items-center gap-2">${toggleInput(false, "sg-t2")} <span class="text-sm">Toggle off</span></span>
          <span class="flex items-center gap-2"><label class="switch"><input type="checkbox" checked disabled><span class="track"></span></label> <span class="text-sm text-3">Disabled</span></span>
        </div>
        <div class="flex gap-4 items-center" style="flex-wrap:wrap">
          <div class="segmented"><button>Day</button><button class="active">Week</button><button>Month</button></div>
          <span class="text-sm text-3">Segmented control</span>
        </div>
      </div></div>
    </div>

    <div class="grid grid-2 mb-4">
      <div class="card"><div class="card-head"><h3>Data &amp; feedback</h3></div><div class="card-body flex flex-col gap-4">
        <div><div class="state-tag">Progress</div><div class="flex flex-col gap-2">${progressBar(74, "ai")}${progressBar(96, "success")}${progressBar(58, "warning")}${progressBar(22, "danger")}</div></div>
        <div><div class="state-tag">SLA timers &amp; AI confidence</div><div class="flex gap-3 items-center" style="flex-wrap:wrap">${slaTimer(132)}${slaTimer(24)}${slaTimer(-12)}${confidenceBadge(93)}${confidenceBadge(78)}${confidenceBadge(61)}</div></div>
        <div><div class="state-tag">Stat card</div>${statCard({ label: "AI resolution rate", value: M.aiRate + "%", delta: "4 pts vs last week", deltaDir: "up", sub: fmt.num(M.aiResolved14) + " of " + fmt.num(M.totalResolved14) + " resolved", spark: S.aiResolved.slice(-7), icon: "✦" })}</div>
        <div><div class="state-tag">Hero band</div>${heroBand({ label: "Tickets resolved — 14 days", value: fmt.num(M.totalResolved14), sub: "One hero number per main screen — never two.", minis: [{ value: M.aiRate + "%", label: "By AI" }] })}</div>
        <div><div class="state-tag">Overlays — try them</div><div class="flex gap-2" style="flex-wrap:wrap">
          <button class="btn btn-secondary btn-sm" onclick="toast('Tokens saved — 1,840 tokens · $0.18','success')">Toast</button>
          <button class="btn btn-secondary btn-sm" onclick="ADNewTicket()">Modal</button>
          <button class="btn btn-secondary btn-sm" onclick="openCmdk()">Command palette ⌘K</button></div></div>
      </div></div>
      <div class="card"><div class="card-head"><h3>AI components &amp; states</h3></div><div class="card-body flex flex-col gap-4">
        ${copilotPanel({ summary: "Duplicate charge on ticket AD-1042 after a plan upgrade. The customer is calm and asks for a refund of the extra $249.", suggestions: [{ text: "Apologize, confirm the refund of $249 and the 3–5 day timeline.", confidence: 93 }, { text: "Offer a one-month credit instead of a refund.", confidence: 78 }], sentiment: "neutral", sources: ["Refund policy", "Billing FAQ"] })}
        <div><div class="state-tag">Empty state</div>${emptyState({ icon: "📭", title: "Nothing here yet", text: "Empty states explain what belongs here and offer the next action — never a dead end.", cta: `<button class="btn btn-sm" onclick="toast('Demo action','info')">Create the first one</button>` })}</div>
        <div><div class="state-tag">Skeleton (loading)</div><div class="flex flex-col gap-2"><div class="skeleton" style="height:16px;width:55%"></div><div class="skeleton" style="height:16px;width:82%"></div><div class="skeleton" style="height:16px;width:38%"></div></div>
        <p class="text-sm text-3">Full loading compositions live in <a href="#/loading">Loading States</a>.</p></div>
      </div></div>
    </div>`;
  }

  /* ============ 39. Loading States (skeletons) ============ */
  function sk(w, h, extra = "") { return `<div class="skeleton" style="width:${w};height:${h}px;${extra}"></div>`; }

  function loading() {
    const statSkel = `<div class="stat-card">${sk("52%", 12)}<div style="height:8px"></div>${sk("68%", 26)}<div style="height:8px"></div>${sk("44%", 11)}</div>`;
    const tableRows = Array.from({ length: 8 }, (_, i) => `<div class="flex items-center gap-3" style="padding:11px 14px;border-bottom:1px solid var(--border)">
      <span class="skeleton" style="width:28px;height:28px;border-radius:50%;flex:none"></span>${sk((34 + (i * 7) % 26) + "%", 13)}<span style="flex:1"></span>${sk("64px", 20, "border-radius:9999px")}${sk("52px", 13)}</div>`).join("");
    const threadLine = w => `<div class="flex gap-3" style="padding:12px 0;border-bottom:1px solid var(--border)"><span class="skeleton" style="width:32px;height:32px;border-radius:50%;flex:none"></span><div class="grow flex flex-col gap-2">${sk("30%", 12)}${sk(w, 13)}${sk("62%", 13)}</div></div>`;
    return pageHead("Loading States", "Skeleton screens built with the .skeleton shimmer class — each one mirrors the real layout it replaces, so the page never jumps when data lands.", `
      <a class="btn btn-secondary" href="#/styleguide">← Style Guide</a>
      <button class="btn" onclick="toast('Skeletons show for ~600ms on first load in production use','info')">How it works</button>`) + `

    <div class="card mb-4">
      <div class="card-head"><div><h3>1 · Dashboard skeleton</h3><div class="text-sm text-3">Replaces the Command Center while the queue, charts and triage summary load</div></div><span class="badge badge-neutral mono">.skeleton</span></div>
      <div class="card-body">
        <div class="flex items-center justify-between mb-4">${sk("220px", 22)}${sk("150px", 34, "border-radius:8px")}</div>
        <div class="skeleton mb-4" style="height:104px;border-radius:16px"></div>
        <div class="stat-grid mb-4">${statSkel.repeat(5)}</div>
        <div class="grid col-7-5">
          <div class="skeleton" style="height:230px;border-radius:16px"></div>
          <div class="skeleton" style="height:230px;border-radius:16px"></div>
        </div>
      </div>
    </div>

    <div class="card mb-4">
      <div class="card-head"><div><h3>2 · Table skeleton</h3><div class="text-sm text-3">Replaces Inbox and Customers while rows are fetched — toolbar, header and eight phantom rows</div></div><span class="badge badge-neutral mono">.skeleton</span></div>
      <div class="card-body" style="padding:0">
        <div class="flex items-center gap-2" style="padding:12px 16px;border-bottom:1px solid var(--border)">${sk("220px", 34, "border-radius:8px")}${sk("130px", 34, "border-radius:8px")}<span style="flex:1"></span>${sk("70px", 13)}</div>
        <div class="flex items-center gap-3" style="padding:10px 14px;border-bottom:1px solid var(--border);background:var(--surface-2)">${sk("12%", 10)}${sk("26%", 10)}${sk("14%", 10)}${sk("10%", 10)}<span style="flex:1"></span>${sk("8%", 10)}</div>
        ${tableRows}
        <div class="flex items-center justify-between" style="padding:12px 16px">${sk("150px", 12)}<div class="flex gap-2">${sk("30px", 28, "border-radius:6px")}${sk("30px", 28, "border-radius:6px")}${sk("30px", 28, "border-radius:6px")}</div></div>
      </div>
    </div>

    <div class="card mb-4">
      <div class="card-head"><div><h3>3 · Ticket detail skeleton</h3><div class="text-sm text-3">Replaces the conversation view — thread lines on the left, the copilot panel warming up on the right</div></div><span class="badge badge-neutral mono">.skeleton</span></div>
      <div class="card-body">
        <div class="flex items-center gap-2 mb-4">${sk("240px", 22)}<span style="flex:1"></span>${sk("90px", 22, "border-radius:9999px")}${sk("90px", 22, "border-radius:9999px")}${sk("70px", 22, "border-radius:9999px")}</div>
        <div class="grid col-3-2">
          <div>${threadLine("88%")}${threadLine("76%")}${threadLine("81%")}
            <div class="flex gap-2 mt-4">${sk("100%", 44, "border-radius:12px")}</div></div>
          <div class="copilot"><div class="copilot-head"><span class="ai-chip">✦ AI Copilot</span><span class="text-sm text-3" style="margin-left:auto">Reading the thread…</span></div>
            <div class="copilot-body flex flex-col gap-2">${sk("38%", 12)}${sk("92%", 13)}${sk("84%", 13)}<div style="height:6px"></div>${sk("38%", 12)}${sk("96%", 40, "border-radius:12px")}${sk("96%", 40, "border-radius:12px")}</div></div>
        </div>
      </div>
    </div>

    <div class="card card-pad">
      <h3 class="mb-2">Usage</h3>
      <p class="text-sm text-2" style="line-height:1.65">Show the skeleton that matches the destination layout, keep it under ~600ms, and swap content in place — same widths, same heights, no layout shift. The shimmer is pure CSS (<span class="mono text-sm">.skeleton</span> in <span class="mono text-sm">css/components.css</span>) and respects the active theme automatically. Pair with the <a href="#/empty/tickets">empty states</a>: skeleton while loading, empty state when there is genuinely nothing to show.</p>
    </div>`;
  }

  /* ============ 40. Copilot Console (full-screen stage) ============ */
  function consoleScreen() {
    const feed = [
      { time: "14:52", who: "Pax", text: "escalated AD-1039 — confidence 61%, below its 75% guardrail", dot: "busy" },
      { time: "14:51", who: "Nova", text: "resolved AD-1041 (SSO login) from KB “SSO troubleshooting”", dot: "on" },
      { time: "14:49", who: "Ava", text: "answered 12 billing questions · avg confidence 94%", dot: "on" },
      { time: "14:47", who: "Orion", text: "walked 4 new workspaces through setup, start to finish", dot: "on" },
      { time: "14:44", who: "Iris", text: "reset 6 SSO sessions · tagged 12 access tickets", dot: "on" },
      { time: "14:41", who: "Milo", text: "idle — refund queue empty", dot: "idle" }
    ];
    const agentRows = DATA.aiAgents.map(a => `<div class="feed-row"><span class="status-dot ${a.status === "paused" ? "idle" : a.status === "escalated" ? "busy" : "on"}"></span><div class="grow"><b>${esc(a.name)}</b> · ${esc(a.role)}<div class="text-xs text-3">${a.tasksToday} tasks today · ${a.avgConfidence}% confidence</div></div></div>`).join("");
    return pageHead("Copilot Console", "Not another dashboard — the whole AI fleet on one stage. Ask a question, watch the agents work, ship the answer.", `
      <span class="badge badge-ai"><span class="dot"></span> Live · 6 agents on shift</span>
      <a class="btn btn-secondary" href="#/playground">Playground →</a>`) + `
    <div class="console-stage">
      <div class="text-center mb-6" style="text-align:center">
        <div class="ai-chip mb-2" style="justify-content:center">✦ Copilot Console</div>
        <h2 style="font-size:var(--text-display);letter-spacing:-.02em">Ask the fleet anything.</h2>
        <p class="text-3 mt-2" style="max-width:560px;margin-left:auto;margin-right:auto;line-height:1.6">One prompt runs across every agent, the knowledge base and the live queue — grounded, cited and inside the guardrails.</p>
      </div>
      <div class="console-grid">
        <div class="console-rail">
          <h4>Agents on shift</h4>
          <div class="console-feed">${agentRows}</div>
          <div class="divider"></div>
          <h4>Live activity</h4>
          <div class="console-feed">${feed.map(f => `<div class="feed-row"><span class="feed-time">${f.time}</span><div><b>${esc(f.who)}</b> ${esc(f.text)}</div></div>`).join("")}</div>
        </div>
        <div>
          <div class="console-thread mb-4">
            <div class="console-msg user">Which tickets will breach SLA in the next two hours, and what should we do first?</div>
            <div class="console-msg ai">
              <div class="ai-chip mb-2">✦ Fleet answer · 94% confidence</div>
              <p><b>${M.slaRisk} tickets</b> are inside their SLA window. Start with <b>AD-1039</b> — already breached, Pax escalated it at 14:52 with a full thread summary attached. Next are AD-1042 (18m left, duplicate-charge refund — Ava has a grounded draft ready at 93% confidence) and AD-1029 (29m left, chargeback — needs a human, Enterprise plan).</p>
              <div class="flex gap-2 mt-3" style="flex-wrap:wrap"><span class="chip">📄 SLA policies by plan</span><span class="chip">📄 Live queue · sorted by SLA clock</span></div>
              <div class="flex gap-2 mt-3"><a href="#/sla" class="btn btn-ai btn-sm">Open the SLA board →</a><a href="#/ticket/AD-1042" class="btn btn-secondary btn-sm">Review Ava's draft</a></div>
            </div>
            <div class="console-msg user">Draft the refund reply for AD-1042 in our voice.</div>
            <div class="console-msg ai">
              <div class="ai-chip mb-2">✦ Draft · grounded in Refund policy</div>
              <p id="console-output">Hi — thanks for flagging this. I can see the duplicate charge on your invoice. I have already raised a refund for the extra amount; it should reach your card within 3–5 business days. Your plan itself is correct, and I have flagged the proration so it does not happen again.</p>
              <div class="flex gap-2 mt-3"><button class="btn btn-sm" onclick="toast('Reply sent to the customer','success')">Send reply</button><button class="btn btn-sm btn-secondary" onclick="ADRunConsole()">↻ Regenerate</button></div>
            </div>
          </div>
          <div class="console-composer">
            <textarea id="console-prompt" placeholder="Ask about the queue, a customer, an agent, a policy…">Summarize today's escalations and tell me which guardrail to adjust first.</textarea>
            <div class="flex items-center gap-2 mt-2" style="flex-wrap:wrap">
              <select class="select" style="width:170px"><option>AD-4 Turbo</option><option>AD-4 Mini</option><option>AD-3.5 Legacy</option></select>
              <span class="chip">🌡 Temperature 0.3</span>
              <span class="chip">📄 KB grounding on</span>
              <span class="text-sm text-3" style="margin-left:auto">~1,840 tokens · $0.18</span>
              <button class="btn btn-ai" onclick="ADRunConsole()">Run ✦</button>
            </div>
          </div>
        </div>
        <div class="console-rail">
          <h4>Run telemetry</h4>
          <div class="stat-list">
            <div class="row"><span>Model</span><b>AD-4 Turbo</b></div>
            <div class="row"><span>Last run</span><b>1,840 tokens</b></div>
            <div class="row"><span>Cost</span><b>$0.18</b></div>
            <div class="row"><span>Confidence</span><b>94%</b></div>
            <div class="row"><span>Sources cited</span><b>2</b></div>
          </div>
          <div class="mt-4"><div class="flex justify-between text-sm mb-2"><span class="text-3">Cycle budget</span><b>74%</b></div>${progressBar(74, "ai")}<div class="text-xs text-3 mt-2">${fmt.tokens(M.tokensTotal)} of 25M tokens · ${fmt.money(M.aiCost)}</div></div>
          <div class="divider"></div>
          <h4>Guardrails</h4>
          <div class="flex flex-col gap-2 text-sm">
            <label class="checkbox-row"><input type="checkbox" checked> Escalate below 75% confidence</label>
            <label class="checkbox-row"><input type="checkbox" checked> Never share API keys or tokens</label>
            <label class="checkbox-row"><input type="checkbox" checked> Refunds over $500 need approval</label>
            <label class="checkbox-row"><input type="checkbox" checked> VIP customers go to a human</label>
          </div>
          <div class="divider"></div>
          <a href="#/triage" class="btn btn-secondary btn-sm" style="width:100%">Review triage rules →</a>
        </div>
      </div>
    </div>`;
  }

  /* Console streaming effect (mirrors the playground's, own target) */
  window.ADRunConsole = function () {
    const out = document.getElementById("console-output");
    const prompt = document.getElementById("console-prompt");
    if (!out) return;
    const full = "Three escalations today, all from Pax. Two lost thread context on VIP handoffs; one was a confidence dip on chargebacks. Adjust the VIP handoff guardrail first: attach the full thread summary before the transfer — it is the cheapest fix and covers two of the three. " +
      (prompt && prompt.value ? "Answering: “" + prompt.value.slice(0, 80) + "”." : "");
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
    window.AD.toast("Console run finished — 1,840 tokens · $0.18", "success");
  };

  return { onboarding, maintenance, styleguide, loading, consoleScreen };
})();

if (typeof window !== "undefined") window.ScreensC = ScreensC;
if (typeof module !== "undefined") module.exports = ScreensC;
