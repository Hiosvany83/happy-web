# File structure — AgentDesk

```
agentdesk/
├── index.html            App shell: sidebar, topbar, screen container, overlays
├── css/
│   ├── tokens.css        Design tokens (colors, type, spacing, radii, layout)
│   ├── base.css          Reset, typography, utilities
│   ├── components.css    60+ components (buttons, tables, modals, copilot…)
│   ├── layout.css        App shell, grids, marketing/auth layouts
│   └── responsive.css    Breakpoints: 1100px tablet, 768px mobile, 480px small
├── js/
│   ├── data.js           Single fictional dataset + derived metrics + fmt helpers
│   ├── charts.js         Vanilla SVG charts: line, dual-line, bars, donut, gauge, sparkline
│   ├── components.js     Component library (HTML-string helpers, modal, toast, tables)
│   ├── screens-a.js      Screens 1–14 (overview … AI analytics)
│   ├── screens-b.js      Screens 15–37 (SLA … pricing)
│   └── app.js            Hash router, theme toggle, Cmd+K palette, table wiring
├── assets/
│   └── favicon.svg       Brand mark (SVG)
├── docs/
│   ├── getting-started.md
│   ├── customizing.md
│   ├── file-structure.md
│   └── browser-support.md
├── tokens.json           Structured design tokens (Design DNA / AI tools)
├── design-dna.md         Design system in prose, for AI coding tools
├── README.md
├── CHANGELOG.md
└── listing-ui8.txt       UI8 listing draft (not part of the template itself)
```

## Screen map (37 screens)

| # | Screen | Route |
|---|--------|-------|
| 1 | Overview / Command Center | `#/overview` |
| 2 | AI Agent Fleet | `#/fleet` |
| 3 | Agent detail | `#/agent/ai-ava` |
| 4 | Inbox | `#/inbox` |
| 5 | Ticket / conversation detail | `#/ticket/AD-1042` |
| 6 | AI Triage & Automation | `#/triage` |
| 7 | AI Copilot Playground | `#/playground` |
| 8 | Knowledge Base | `#/kb` |
| 9 | Article detail / editor | `#/article/kb-01` |
| 10 | Customers | `#/customers` |
| 11 | Customer 360 | `#/customer/c-brightloop` |
| 12 | Teams & Agents | `#/teams` |
| 13 | Analytics — Support performance | `#/analytics/support` |
| 14 | Analytics — AI performance | `#/analytics/ai` |
| 15 | SLA & Escalations | `#/sla` |
| 16 | Macros & Canned Responses | `#/macros` |
| 17 | Workflows / Automation Builder | `#/workflows` |
| 18 | Channels | `#/channels` |
| 19 | CSAT & Feedback | `#/csat` |
| 20 | Reports & Exports | `#/reports` |
| 21 | Search / Command palette | `#/search` |
| 22 | Notifications | `#/notifications` |
| 23 | Settings — Workspace | `#/settings/workspace` |
| 24 | Settings — AI models & providers | `#/settings/ai` |
| 25 | Settings — Roles & permissions | `#/settings/roles` |
| 26 | Settings — Billing & plan usage | `#/settings/billing` |
| 27 | Sign in | `#/auth/signin` |
| 28 | Sign up | `#/auth/signup` |
| 29 | Forgot password / 2FA | `#/auth/forgot` |
| 30 | Empty state — no tickets | `#/empty/tickets` |
| 31 | Empty state — no agents | `#/empty/agents` |
| 32 | Empty state — no KB articles | `#/empty/kb` |
| 33 | Error 404 | `#/404` |
| 34 | Landing page | `#/landing` |
| 35 | Pricing page | `#/pricing` |
| 36 | Onboarding wizard | `#/onboarding` |
| 37 | Maintenance page | `#/maintenance` |

Plus responsive tablet (1024px) and mobile (390px) variants of 8 core
screens (Overview, Inbox, Ticket detail, Agent Fleet, Analytics,
Customers, Settings, Landing) via `css/responsive.css`.
