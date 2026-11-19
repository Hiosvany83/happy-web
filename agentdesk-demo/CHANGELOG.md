# Changelog — AgentDesk

## 1.5.0 — Nov 19, 2026

Presentation & design-system release — the template now shows its system, not just its screens:

- **In-product Style Guide** (`#/styleguide`, new screen): color tokens, the type scale, spacing, radii, shadows and the component library with states (default / hover / focus / disabled / empty / error), rendered live by the shipping CSS.
- **Loading States** (`#/loading`, new screen): three skeleton compositions (dashboard, table, ticket detail) built with the `.skeleton` class, each matched to the layout it replaces.
- **Copilot Console** (`#/console`, new screen): a full-screen, non-dashboard stage — agents on shift, live activity feed, working prompt composer with streaming output, run telemetry and guardrails.
- **Typography:** Space Grotesk display font for headlines and numerals (Inter stays for UI; JetBrains Mono now actually loaded); a documented six-step type scale with a true 46px hero size.
- **Hero numbers:** Command Center, AI Agent Fleet, both Analytics screens, SLA and CSAT each lead with one hero figure in the new `.hero-band` component — no more flat hierarchy.
- **Product landing page:** the demo now opens on a product page (hero, 8-image gallery, six features, full screen inventory, $79 price block) with the app one click away; deep links unchanged.
- **Presentation pack:** `presentation/` — 8 images at 1600×1200 with browser device frames.
- New components: hero band, skeleton compositions, form error/disabled states, console stage. Screen count: **40**.
- Nav: Copilot Console (Support) and a Design System section (Style Guide, Loading States); command palette updated.

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
