# AgentDesk — AI Support & Agent Operations Dashboard

A coded HTML/CSS/JS dashboard template for support teams that run AI
agents: triage tickets, measure AI cost and quality, and keep humans in
the loop — with a working AI copilot panel on every key screen.

**HTML/CSS/JS only — no Figma file included.** Includes design tokens
(`tokens.json` + `design-dna.md`) ready for AI coding tools (Cursor,
Claude, v0, Bolt, Windsurf, GitHub Copilot).

## At a glance

- **40 screens** — 29 app screens + 3 auth + 3 empty states + 1 error
  page + landing + pricing + onboarding wizard + maintenance page
- **In-product Style Guide** — tokens, type scale and the component
  library *with states* (default / hover / focus / disabled / empty /
  error), rendered live inside the app (`#/styleguide`); plus a
  **Loading States** screen with three skeleton compositions (`#/loading`)
- **Copilot Console** — a full-screen, non-dashboard stage: the whole AI
  fleet, a live activity feed, a working prompt composer and run
  telemetry (`#/console`)
- **Typography with character** — Space Grotesk display type for
  headlines and hero numerals, Inter for UI, JetBrains Mono for IDs and
  timers; a documented six-step type scale with a 46px hero size, and
  one hero number per main screen
- **Product landing as entry** — the demo opens on a product page
  (gallery, features, $79 price block) with the app one click away;
  deep links to every screen keep working
- **Presentation pack** — `presentation/`: 8 images at 1600×1200 with
  browser device frames
- **Light + dark themes** — dark-first, separate design tokens per theme,
  remembered across visits
- **Responsive** — desktop 1440px, tablet 1024px, mobile 390px variants
  of the 8 core screens
- **60+ components** — sidebar, topbar, bento stat cards, hero stat
  band, SVG charts (line, bar, donut, gauge, sparkline),
  sortable/filterable/paginated data tables, kanban, badges, avatars,
  toggles, tabs, modals, drawers, toasts, command palette (Cmd+K),
  AI copilot panel, SLA countdown, token/cost meter, empty states,
  skeletons
- **One consistent fictional dataset** — every KPI, table and chart is
  computed from a single dataset (`js/data.js`), so numbers reconcile
  across all screens
- **Zero dependencies** — no framework, no build step, no external JS.
  Charts are hand-rolled SVG. Open `index.html` and it works.

## Screens

| Group | Screens |
|-------|---------|
| Command | Overview / Command Center, AI Agent Fleet, Agent detail, Analytics — Support, Analytics — AI |
| Support | Inbox, Ticket detail, AI Triage & Automation, AI Copilot Playground, Copilot Console, SLA & Escalations |
| Knowledge | Knowledge Base, Article editor, Macros, Workflows, Channels |
| Customers | Customers, Customer 360, Teams & Agents, CSAT & Feedback, Reports & Exports |
| Design system | Style Guide, Loading States |
| Utility | Search / Command palette, Notifications, 3 empty states, 404, Maintenance |
| Settings | Workspace, AI Models & Providers, Roles & Permissions, Billing & Plan Usage |
| Auth | Sign in, Sign up, Forgot password / 2FA |
| Marketing | Landing page, Pricing page, Onboarding wizard |

Full screen map: `docs/file-structure.md`.

## Quick start

Open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

See `docs/getting-started.md`. Customization: `docs/customizing.md`.

## Design tokens

`css/tokens.css` is the source of truth (CSS custom properties).
`tokens.json` mirrors it as structured data, and `design-dna.md`
documents palettes, type, spacing and component patterns for AI coding
tools.

## Demo data

All names, companies, tickets and numbers are fictional and generated
for the demo. The AI cost model in the demo is $0.10 per 1,000 tokens
(18.42M tokens = $1,842 per cycle). No data leaves the browser.

## License

Standard UI8 single-license terms apply to the purchased product. See
the UI8 product page for the full license.
