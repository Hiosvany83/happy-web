# AgentDesk — Design DNA

> Structured design-system data for AI coding tools (Cursor, Claude, v0, Bolt,
> Windsurf, GitHub Copilot). Paste this file — or `tokens.json` — into your AI
> coding tool and ask it to build new screens in the AgentDesk style.
> The CSS source of truth is `css/tokens.css`; this file mirrors it in prose.

## Product

**AgentDesk — AI Support & Agent Operations Dashboard.** A coded HTML/CSS/JS
dashboard template. Dark-first, light theme included. 37 screens (28 app +
3 auth + 3 empty states + 1 error + landing + pricing) + responsive tablet
(1024px) and mobile (390px) variants of 8 core screens. HTML/CSS/JS only —
no Figma file included.

## Color

**Brand (indigo):** `#6366f1` primary. Scale: 50 `#eef2ff`, 100 `#e0e7ff`,
200 `#c7d2fe`, 300 `#a5b4fc`, 400 `#818cf8`, 500 `#6366f1`, 600 `#5457e5`,
700 `#4345c4`, 800 `#373a9e`, 900 `#2e307f`.

**AI accent (teal):** `#14b8a6`. Use for everything AI-generated: copilot
panels, AI badges, AI confidence bars, AI buttons (gradient teal → indigo).
Scale: 50 `#f0fdfa`, 100 `#ccfbf1`, 200 `#99f6e4`, 300 `#5eead4`,
400 `#2dd4bf`, 500 `#14b8a6`, 600 `#0d9488`, 700 `#0f766e`.

**Semantic:** success `#22c55e` (light `#4ade80`), warning `#f59e0b`
(`#fbbf24`), danger `#ef4444` (`#f87171`), info `#0ea5e9` (`#38bdf8`).

**Dark theme (default):** bg `#0a0e16`, bg-soft `#0e1320`, surface `#111827`,
surface-2 `#162032`, surface-3 `#1b2942`, hover `#1e2c47`,
border `rgba(148,163,184,0.16)`, border-strong `rgba(148,163,184,0.28)`,
text `#f1f5f9`, text-2 `#cbd5e1`, text-3 `#94a3b8`, text-4 `#64748b`,
sidebar `#0b101c`, input `#0d1424`.

**Light theme:** bg `#f3f5f9`, surface `#ffffff`, surface-2 `#f8fafc`,
surface-3 `#eef2f7`, border `rgba(15,23,42,0.10)`,
border-strong `rgba(15,23,42,0.20)`, text `#0f172a`, text-2 `#334155`,
text-3 `#64748b`, text-4 `#94a3b8`, sidebar stays dark `#0f172a`.

**Chart palette (in order):** `#6366f1` indigo, `#14b8a6` teal, `#f59e0b`
amber, `#38bdf8` sky, `#f472b6` pink, `#a78bfa` violet.

## Typography

- **Sans:** Inter, system fallback. **Mono:** JetBrains Mono (numbers, timers,
  IDs, code).
- **Scale:** xs 11, sm 12.5, base 14, lg 16, xl 20, 2xl 24, 3xl 30.
- **Line height:** tight 1.2 (headings), normal 1.45 (body), relaxed 1.65
  (long text).
- **Weights:** 400 normal, 500 medium, 600 semibold, 700 bold, 800 extrabold.
- **Headings:** bold, letter-spacing −0.01em, tight leading. Page titles are
  24px extrabold with −0.02em tracking. Table headers are 11px uppercase,
  0.06em tracking, muted.

## Spacing & shape

- **Spacing scale (8px base):** 4, 8, 12, 16, 20, 24, 32, 40, 48, 64.
- **Radii:** sm 6, md 8, lg 12, xl 16, 2xl 20, full 9999 (pills/avatars).
- **Shadows (dark):** sm `0 1px 2px rgba(0,0,0,.45)`,
  md `0 8px 24px rgba(0,0,0,.45)`, lg `0 20px 48px rgba(0,0,0,.55)`.
- **Layout:** sidebar 264px (collapsed 76px), topbar 64px, content max 1320px.
- **Breakpoints:** tablet ≤1100px (sidebar collapses to icons, grids to 2–3
  columns), mobile ≤768px (sidebar becomes an overlay drawer, single
  column), small mobile ≤480px.

## Component patterns

- **Stat / bento cards:** surface bg, 1px border, 16px radius, label (12.5px,
  muted, medium) → value (24px, extrabold, −0.02em) → delta (↑/↓, green/red)
  + sub-note. Optional sparkline bottom-right.
- **Data tables:** header row on surface-2, 11px uppercase muted headers,
  12px/14px row padding, row hover on surface-hover, sortable headers show ↕,
  footer with "Showing X–Y of Z" + numbered pagination.
- **Badges:** 22px tall pills, 11px semibold, translucent bg (16% of the
  color) + saturated text. Kinds: brand, ai, success, warning, danger,
  neutral, info. Priority pills: Urgent red, High amber, Normal sky, Low
  neutral.
- **Buttons:** 36px tall, 13.5px semibold, 8px radius. Primary indigo-600;
  secondary surface-2 + strong border; ghost transparent; AI = teal→indigo
  gradient; danger red-600. Small 30px, large 44px.
- **AI Copilot panel:** gradient bg (teal 8% → indigo 6%), 1px teal border
  (28% opacity), 16px radius, "✦ AI Copilot" header, summary → suggested
  replies (each with a confidence bar) → sentiment → grounded sources chips.
- **Command palette (Cmd+K):** centered overlay, 640px, search input on top,
  grouped results, `kbd` hints.
- **Forms:** inputs on input-bg, 1px strong border, 8px radius, 9px/12px
  padding; focus = indigo border + 3px indigo ring (25% opacity).
  Toggle switch 40×22px, indigo when on. Tabs: bottom-border active state,
  indigo text + border.
- **Charts:** vanilla SVG, no library. Line (area fill 28%→0 gradient),
  dual-line, bars (34px max width, 4px radius), donut (22px ring), gauge
  (semicircle), sparkline (96×30). Grid lines use `--chart-grid`; labels are
  10px muted.
- **Empty states:** centered, 96px dashed art box, 18px title, 13.5px muted
  text (max 420px), primary CTA.
- **Avatars:** initials, deterministic color from the name (8-color palette),
  2px surface border; stack overlaps by −8px.

## Data & tone

- **Fictional dataset:** one consistent dataset (`js/data.js`) drives every
  screen — ticket counts, agent names, token costs and CSAT reconcile across
  screens because KPIs are computed from the same arrays. Keep it that way:
  never hard-code a number that already exists in the data.
- **Tone:** plain, professional English. AI features are labeled "✦ AI" and
  never pretend to call a real model — demo data is mock data.
- **AI cost model used in the demo:** $0.10 per 1,000 tokens;
  18.42M tokens = $1,842 per cycle.

## How to extend (prompt for your AI coding tool)

> "Using AgentDesk's design DNA (tokens.json + design-dna.md), build a new
> screen in the same style: dark-first tokens, 16px cards, 8px spacing grid,
> Inter, indigo #6366f1 primary with teal #14b8a6 for AI elements, data from
> js/data.js, vanilla SVG charts, responsive at 1100px and 768px."
