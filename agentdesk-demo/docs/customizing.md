# Customizing AgentDesk

## 1. Change the colors (design tokens)

All colors live in `css/tokens.css` as CSS custom properties. Edit the
`:root` block (dark theme) and the `[data-theme="light"]` block (light
theme). Every component reads these variables — never hard-code a color
in a component.

Example — make the brand color emerald:

```css
:root {
  --brand-500: #10b981;
  --brand-600: #059669;
}
```

`tokens.json` mirrors the same values in structured form for AI coding
tools (Cursor, Claude, v0, Bolt). If you change a token in CSS, update
`tokens.json` too — and vice versa.

## 2. Change the data

Edit `js/data.js`. It is the **single source of truth**: agents, tickets,
customers, knowledge-base articles, macros, workflows, channels, feedback,
notifications, reports, SLA policies, roles and billing.

- **KPIs are computed**, not typed: `DATA.metrics` derives open tickets,
  AI resolution rate, CSAT, token cost and more from the arrays. Change the
  arrays and every screen updates consistently.
- **AI cost model:** `meta.tokenRatePer1k` is `$0.10` per 1,000 tokens.
  Cost = tokens ÷ 1,000 × rate.
- **Ticket statuses:** `open`, `pending`, `solved`, `escalated`.
  Priorities: `urgent`, `high`, `normal`, `low`.
  Channels: `email`, `chat`, `voice`, `social`.

## 3. Add a screen

1. Write a function in `js/screens-a.js` or `js/screens-b.js` that
   returns an HTML string. Use the helpers in `js/components.js`
   (`statCard`, `dataTable`, `copilotPanel`, `badge`, …) and charts from
   `js/charts.js` (`svgLine`, `svgBars`, `svgDonut`, `svgGauge`).
2. Register the route in `js/app.js` (`ROUTES` array): path, title,
   function, sidebar key, shell (`"app"` or `"full"`).
3. If it belongs in the sidebar, add a `.nav-item` in `index.html`
   with `data-route` matching the route's `nav` key.

## 4. Change the font

Replace the Google Fonts link in `index.html` and the `--font-sans`
variable in `css/tokens.css`. The system stack is the fallback, so the
template works offline with a system font.

## 5. Remove the demo data

To ship with your own data, replace the arrays in `js/data.js` with your
own (same shape). The screens do not depend on any specific names —
they read whatever the arrays contain. Keep `id` fields unique.
