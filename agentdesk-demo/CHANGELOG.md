# Changelog — AgentDesk

## 1.4.1 — Nov 8, 2026

- Fixed stat-card layout (sparkline no longer overlaps delta/sub text);
  delta color now reflects whether the change is good, not just its direction.
- Fixed mobile horizontal overflow: grid children get `min-width: 0` so wide
  tables scroll inside their card instead of widening the page (390px
  and 1024px verified, no page-level overflow).
- Chart y-axis labels use one decimal when the max is under 10 (no more
  duplicate "1" labels on the token-usage chart).
- Solved tickets show "Met" in the SLA column instead of "0m left"
  (Inbox, Customer 360).
- Landing hero now shows the 14-day average first response (3.7 min),
  not the last day's value.
- Corrected screen-count copy: 26 app screens (not 28) — the spec's
  numbered list contains 35 distinct screens; onboarding + maintenance
  bring the total to 37.
- Added UI8 listing preview images (`preview/`): cover 1600×800 plus
  real screenshots of the Command Center, Inbox and Ticket detail.

## 1.4.0 — Nov 8, 2026 (initial release)

- 37 screens: 26 app screens, 3 auth screens, 3 empty states, 404,
  maintenance page, landing page, pricing page, onboarding wizard.
- Dark-first design system with a full light theme (separate tokens).
- 60+ reusable components, including AI copilot panel, command palette
  (Cmd+K), kanban, sortable/filterable/paginated tables, SLA countdown,
  token/cost meter, streaming-look prompt output.
- Vanilla SVG charts (line, dual-line, bars, donut, gauge, sparkline) —
  no chart library.
- One consistent fictional dataset (`js/data.js`): all KPIs computed
  from the same arrays, so numbers reconcile across screens.
- Design tokens as CSS custom properties (`css/tokens.css`), structured
  `tokens.json`, and `design-dna.md` for AI coding tools.
- Documentation: getting started, customizing, file structure, browser
  support.
- Responsive tablet (1024px) and mobile (390px) variants of the 8 core
  screens.
- HTML/CSS/JS only — no Figma file included.
