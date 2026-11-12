/* ============================================================
   AgentDesk — Charts (vanilla SVG, no dependencies)
   All charts read CSS variables so they work in both themes.
   ============================================================ */

function chartColors() {
  const cs = getComputedStyle(document.documentElement);
  return {
    grid: cs.getPropertyValue("--chart-grid").trim() || "rgba(148,163,184,.12)",
    text: cs.getPropertyValue("--text-4").trim() || "#64748b",
    c1: "#6366f1", c2: "#14b8a6", c3: "#f59e0b", c4: "#38bdf8", c5: "#f472b6", c6: "#a78bfa"
  };
}

/* Smooth line chart with area fill + dots. values: number[], labels: string[] */
function svgLine(values, labels, opts = {}) {
  const W = opts.w || 560, H = opts.h || 200, P = { t: 12, r: 8, b: 24, l: 34 };
  const max = Math.max(...values) * 1.15, min = Math.min(0, Math.min(...values) * 0.9);
  const iw = W - P.l - P.r, ih = H - P.t - P.b;
  const x = i => P.l + (i / (values.length - 1)) * iw;
  const y = v => P.t + ih - ((v - min) / (max - min)) * ih;
  const col = opts.color || "#6366f1";
  const id = "lg" + Math.random().toString(36).slice(2, 8);
  let pts = values.map((v, i) => x(i).toFixed(1) + "," + y(v).toFixed(1)).join(" ");
  let path = "M" + values.map((v, i) => x(i).toFixed(1) + " " + y(v).toFixed(1)).join(" L");
  let grid = "";
  for (let g = 0; g <= 3; g++) {
    const gy = P.t + (ih / 3) * g;
    const raw = max - ((max - min) / 3) * g;
    const gv = max < 10 ? raw.toFixed(1) : Math.round(raw);
    grid += `<line x1="${P.l}" y1="${gy}" x2="${W - P.r}" y2="${gy}" stroke="var(--chart-grid)" stroke-width="1"/><text x="${P.l - 6}" y="${gy + 3}" text-anchor="end" font-size="10" fill="var(--text-4)">${gv}</text>`;
  }
  let xlabels = "";
  labels.forEach((l, i) => { if (i % 3 === 0) xlabels += `<text x="${x(i)}" y="${H - 6}" text-anchor="middle" font-size="10" fill="var(--text-4)">${l}</text>`; });
  let dots = "";
  if (opts.dots !== false) dots = values.map((v, i) => `<circle cx="${x(i)}" cy="${y(v)}" r="3" fill="var(--surface)" stroke="${col}" stroke-width="2"/>`).join("");
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Line chart">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${col}" stop-opacity="0.28"/><stop offset="100%" stop-color="${col}" stop-opacity="0"/>
    </linearGradient></defs>
    ${grid}
    <path d="${path} L${x(values.length - 1)} ${P.t + ih} L${P.l} ${P.t + ih} Z" fill="url(#${id})"/>
    <path d="${path}" fill="none" stroke="${col}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    ${dots}${xlabels}</svg>`;
}

/* Dual-line chart (two series) */
function svgLineDual(v1, v2, labels, opts = {}) {
  const W = opts.w || 560, H = opts.h || 200, P = { t: 12, r: 8, b: 24, l: 34 };
  const all = v1.concat(v2);
  const max = Math.max(...all) * 1.15, min = 0;
  const iw = W - P.l - P.r, ih = H - P.t - P.b;
  const x = i => P.l + (i / (v1.length - 1)) * iw;
  const y = v => P.t + ih - ((v - min) / (max - min)) * ih;
  const mk = (vals, col) => "M" + vals.map((v, i) => x(i).toFixed(1) + " " + y(v).toFixed(1)).join(" L");
  let grid = "";
  for (let g = 0; g <= 3; g++) {
    const gy = P.t + (ih / 3) * g;
    grid += `<line x1="${P.l}" y1="${gy}" x2="${W - P.r}" y2="${gy}" stroke="var(--chart-grid)" stroke-width="1"/>`;
  }
  let xl = "";
  labels.forEach((l, i) => { if (i % 3 === 0) xl += `<text x="${x(i)}" y="${H - 6}" text-anchor="middle" font-size="10" fill="var(--text-4)">${l}</text>`; });
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Comparison chart">
    ${grid}
    <path d="${mk(v1, "#6366f1")}" fill="none" stroke="#6366f1" stroke-width="2.5" stroke-linecap="round"/>
    <path d="${mk(v2, "#14b8a6")}" fill="none" stroke="#14b8a6" stroke-width="2.5" stroke-linecap="round"/>
    ${xl}</svg>`;
}

/* Vertical bar chart */
function svgBars(values, labels, opts = {}) {
  const W = opts.w || 560, H = opts.h || 200, P = { t: 12, r: 8, b: 24, l: 34 };
  const max = Math.max(...values) * 1.15;
  const iw = W - P.l - P.r, ih = H - P.t - P.b;
  const bw = Math.min(34, (iw / values.length) * 0.55);
  const col = opts.color || "#6366f1";
  const hl = opts.highlight;
  let bars = values.map((v, i) => {
    const h = (v / max) * ih;
    const bx = P.l + (i + 0.5) * (iw / values.length) - bw / 2;
    const by = P.t + ih - h;
    const fill = (hl !== undefined && i === hl) ? "#14b8a6" : col;
    return `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${bw}" height="${h.toFixed(1)}" rx="4" fill="${fill}" opacity="${hl !== undefined && i !== hl ? 0.45 : 1}"><title>${labels[i]}: ${v}</title></rect>`;
  }).join("");
  let xl = labels.map((l, i) => `<text x="${P.l + (i + 0.5) * (iw / labels.length)}" y="${H - 6}" text-anchor="middle" font-size="10" fill="var(--text-4)">${l}</text>`).join("");
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Bar chart">${bars}${xl}</svg>`;
}

/* Donut chart. segments: [{value, color, label}] */
function svgDonut(segments, opts = {}) {
  const size = opts.size || 180, thick = opts.thick || 22;
  const total = segments.reduce((a, s) => a + s.value, 0);
  const r = (size - thick) / 2, c = 2 * Math.PI * r;
  let off = 0;
  const arcs = segments.map(s => {
    const frac = s.value / total;
    const dash = frac * c;
    const el = `<circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${s.color}" stroke-width="${thick}" stroke-dasharray="${dash.toFixed(1)} ${(c - dash).toFixed(1)}" stroke-dashoffset="${(-off).toFixed(1)}" />`;
    off += dash;
    return el;
  }).join("");
  const center = opts.center || "";
  return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="Donut chart" style="transform: rotate(-90deg)">
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="var(--surface-3)" stroke-width="${thick}" />${arcs}
    ${center ? `<g style="transform: rotate(90deg); transform-origin: center;"><text x="50%" y="47%" text-anchor="middle" font-size="22" font-weight="800" fill="var(--text)">${center}</text></g>` : ""}
  </svg>`;
}

/* Gauge (semicircle). value 0-100 */
function svgGauge(value, opts = {}) {
  const W = 200, H = 112;
  const pct = Math.max(0, Math.min(100, value)) / 100;
  const col = opts.color || "#14b8a6";
  const arc = (p, stroke, width) => {
    const a0 = Math.PI, a1 = Math.PI + p * Math.PI;
    const x0 = 100 + 84 * Math.cos(a0), y0 = 100 + 84 * Math.sin(a0);
    const x1 = 100 + 84 * Math.cos(a1), y1 = 100 + 84 * Math.sin(a1);
    return `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A 84 84 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}" fill="none" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round"/>`;
  };
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Gauge ${value}%">
    ${arc(1, "var(--surface-3)", 14)}${arc(pct, col, 14)}
    <text x="100" y="92" text-anchor="middle" font-size="26" font-weight="800" fill="var(--text)">${value}</text>
    <text x="100" y="108" text-anchor="middle" font-size="10" fill="var(--text-4)">${opts.label || "out of 100"}</text>
  </svg>`;
}

/* Tiny sparkline */
function sparkline(values, opts = {}) {
  const W = opts.w || 96, H = opts.h || 30;
  const max = Math.max(...values), min = Math.min(...values);
  const range = (max - min) || 1;
  const x = i => (i / (values.length - 1)) * W;
  const y = v => H - 3 - ((v - min) / range) * (H - 6);
  const path = "M" + values.map((v, i) => x(i).toFixed(1) + " " + y(v).toFixed(1)).join(" L");
  const col = opts.color || "#14b8a6";
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Sparkline">
    <path d="${path}" fill="none" stroke="${col}" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="${x(values.length - 1)}" cy="${y(values[values.length - 1])}" r="2.6" fill="${col}"/>
  </svg>`;
}

if (typeof window !== "undefined") window.ADCharts = { svgLine, svgLineDual, svgBars, svgDonut, svgGauge, sparkline };
if (typeof module !== "undefined") module.exports = { svgLine, svgLineDual, svgBars, svgDonut, svgGauge, sparkline };
