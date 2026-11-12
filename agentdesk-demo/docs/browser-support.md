# Browser support — AgentDesk

AgentDesk is plain HTML, CSS and vanilla JavaScript (ES2019). No
framework, no build step, no polyfills.

| Browser | Supported |
|---------|-----------|
| Chrome / Edge (Chromium) 90+ | ✅ Fully supported |
| Firefox 90+ | ✅ Fully supported |
| Safari 15+ | ✅ Fully supported |
| Mobile Safari / Chrome (iOS, Android) | ✅ Responsive layouts at 390px |
| Internet Explorer | ❌ Not supported (uses CSS custom properties, `fetch`-free ES2019, SVG) |

Notes:

- **CSS custom properties** drive the entire theme system — any browser
  without them cannot render the template.
- **Google Fonts (Inter)** is loaded from `fonts.googleapis.com` with a
  system-font fallback. Offline, the template falls back to the system
  stack and still renders correctly.
- **localStorage** remembers the light/dark choice. On `file://` URLs
  some browsers restrict it; serve over HTTP for the full experience
  (see `getting-started.md`).
- **No external JavaScript** is loaded. Charts are hand-rolled SVG
  (`js/charts.js`); there is no Chart.js, no jQuery, no framework.
