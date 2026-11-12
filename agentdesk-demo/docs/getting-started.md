# Getting started — AgentDesk

AgentDesk is a static HTML/CSS/JS dashboard template. There is no build
step, no bundler and no backend. Open `index.html` in a browser (or serve
the folder with any static server) and it works.

## Quick start

1. Unzip the package.
2. Open `index.html` — or serve the folder:
   - Python: `python3 -m http.server 8000` then open `http://localhost:8000`
   - Node: `npx serve .`
   - VS Code: right-click `index.html` → **Open with Live Server**
3. The demo opens on the **Command Center** (dark theme by default).
   Use the sun/moon button in the top bar to switch to the light theme.

> **Serving over HTTP is recommended.** Opening the file directly
> (`file://`) works, but some browsers restrict `localStorage` (theme
> memory) on `file://` URLs.

## Navigating the demo

- **Sidebar** — all 26 app screens, grouped: Overview, Support, Knowledge,
  Customers, Settings.
- **Cmd+K / Ctrl+K** — command palette: jump to any screen, ticket,
  customer or article.
- **Top bar** — theme toggle, notifications, "New ticket" (opens the
  ticket modal).
- **Hash routes** — every screen has a URL: `#/overview`, `#/inbox`,
  `#/ticket/AD-1042`, `#/fleet`, `#/analytics/ai`, `#/settings/billing`,
  `#/landing`, `#/pricing`, `#/auth/signin`, `#/404`, and more.
  Link to a screen directly by copying the URL.

## What is interactive

- **Tables** — click a column header to sort, type in the search box to
  filter, use the numbered pagination. Inbox filters (status / channel)
  re-filter the live queue.
- **Theme toggle** — switches dark/light and remembers the choice.
- **Command palette** — type to filter, ↑/↓ to move, Enter to go.
- **AI Copilot Playground** — type a prompt and press Run; the reply
  streams in character by character (demo text).
- **Modals, drawers, toasts** — "New ticket" opens a working form;
  actions show toast confirmations.
- **Toggles, tabs, segmented controls** — all live in the browser.

Everything is front-end demo behavior: no data leaves the browser, no
accounts, no API calls. The dataset is fictional (`js/data.js`) and is
shared by all screens so the numbers reconcile everywhere.

## Browser support

See `browser-support.md`.
