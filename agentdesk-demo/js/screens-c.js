/* ============================================================
   AgentDesk — Screens C (36–37 of 37)
   Onboarding wizard + Maintenance page. Same helpers and data
   as screens-a.js / screens-b.js.
   ============================================================ */

const ScreensC = (() => {
  const { DATA, fmt } = window.AD;
  const { esc, badge, statCard } = window.AD;
  const M = DATA.metrics;

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

  return { onboarding, maintenance };
})();

if (typeof window !== "undefined") window.ScreensC = ScreensC;
if (typeof module !== "undefined") module.exports = ScreensC;
