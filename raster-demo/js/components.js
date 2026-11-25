/* RASTER — component library: render helpers, pure-SVG charts,
   modal/toast services, and the Style Guide registry.
   Every registry entry is a real, rendered component variant;
   REGISTRY.length is the honest component count printed in the README. */
"use strict";
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const initials = name => name.split(" ").map(w=>w[0]).slice(0,2).join("").toUpperCase();

/* — atoms — */
const badge = (txt, kind="") => {
  const hot = ["Overdue","Low stock","Out of stock","High","Open"].includes(txt);
  const sq = hot ? '<span class="sq"></span>' : (kind==="solid" ? '<span class="sq"></span>' : '<span class="sq-ink"></span>');
  return `<span class="badge ${kind}">${sq}${esc(txt)}</span>`;
};
const statusBadge = s => badge(s, s==="Paid"||s==="Active"||s==="Resolved"||s==="In stock" ? "" : "");
const avatar = (name, cls="") => `<span class="avatar ${cls}">${initials(name)}</span>`;
const marker = (cls="") => `<span class="marker ${cls}"></span>`;
const stat = (label, value, delta="", red=false) => `
  <div class="stat"><div class="micro">${label}</div>
  <div class="v ${red?"red":""}">${value}</div>
  ${delta?`<div class="d">${delta}</div>`:""}</div>`;
const secHead = (no, title, aside="") => `
  <div class="sec-head"><span class="no">${no}</span><h2>${title}</h2><span class="aside">${aside}</span></div>`;
const pageHead = (crumb, title, sub="", actions="") => `
  <div class="page-head">
    <div class="crumbs crumb"><a href="#/overview">Raster</a><span class="sep">/</span><span class="here">${crumb}</span></div>
    <div class="row-between" style="align-items:flex-end;flex-wrap:wrap">
      <h1>${title}</h1><div class="row gap-2">${actions}</div>
    </div>${sub?`<p class="sub">${sub}</p>`:""}
  </div>`;
const pager = (page=1, pages=4) => {
  let cells = `<a href="javascript:void 0">←</a>`;
  for(let i=1;i<=pages;i++) cells += i===page ? `<span class="cur">${i}</span>` : `<a href="javascript:void 0">${i}</a>`;
  cells += `<a href="javascript:void 0">→</a>`;
  return `<span class="pager">${cells}</span>`;
};
const tabs = (items, active) => `<div class="tabs">${items.map(t=>`<button class="tab ${t===active?"active":""}" onclick="toast('Tab: ${t}')">${t}</button>`).join("")}</div>`;
const progress = (pct, red=false, thin=false) => `<div class="progress ${red?"red":""} ${thin?"thin":""}"><i style="width:${pct}%"></i></div>`;

/* — tables — */
function table(cols, rows, opts={}){
  const head = cols.map(c=>`<th class="${c.r?"r":""}">${c.t}</th>`).join("");
  const body = rows.map((r,i)=>`<tr>${cols.map((c,j)=>{
    let v = typeof c.v==="function" ? c.v(r,i) : r[c.v];
    return `<td class="${c.r?"r":""} ${j===0&&opts.index?"no":""}">${v}</td>`;
  }).join("")}</tr>`).join("");
  const foot = opts.foot ? `<tfoot><tr>${opts.foot}</tr></tfoot>` : "";
  return `<div class="tbl-wrap"><table class="tbl ${opts.dense?"dense":""} ${opts.selectable?"selectable":""}"><thead><tr>${head}</tr></thead><tbody>${body}</tbody>${foot}</table></div>`;
}

/* — pure SVG charts — */
function scaleFn(data, h, pad=6){ const max=Math.max(...data)*1.08, min=0; return v => h-pad-((v-min)/(max-min))*(h-2*pad); }
function svgLine(data, {w=560,h=180,red=false,labels=null,area=false}={}){
  const y = scaleFn(data,h), step = (w-40)/(data.length-1);
  const pts = data.map((v,i)=>[30+i*step, y(v)]);
  const path = pts.map((p,i)=>(i?"L":"M")+p[0].toFixed(1)+","+p[1].toFixed(1)).join(" ");
  const grid = [0.25,0.5,0.75,1].map(f=>`<line x1="30" x2="${w-6}" y1="${h*f}" y2="${h*f}" style="stroke:var(--line-soft)" stroke-width="1"/>`).join("");
  const dots = pts.map((p,i)=> i===data.length-1 ? `<rect x="${p[0]-4}" y="${p[1]-4}" width="8" height="8" fill="var(--red)"/>` : "").join("");
  const fill = area ? `<path d="${path} L${pts[pts.length-1][0]},${h} L${pts[0][0]},${h} Z" style="fill:var(--ink)" opacity="0.07"/>` : "";
  const labs = labels ? labels.map((l,i)=> i%2===0 ? `<text class="axis-label" x="${30+i*step}" y="${h+16}" text-anchor="middle">${l}</text>` : "").join("") : "";
  const maxv = `<text class="axis-val" x="30" y="12">${NUM(Math.max(...data))}</text>`;
  return `<svg viewBox="0 0 ${w} ${h+22}" width="100%" role="img">${grid}${fill}<path d="${path}" fill="none" style="stroke:${red?"var(--red)":"var(--ink)"}" stroke-width="2.5"/>${dots}${labs}${maxv}</svg>`;
}
function svgBars(data, {w=560,h=180,labels=null,redLast=false}={}){
  const max = Math.max(...data)*1.08, bw = (w-40)/data.length;
  const bars = data.map((v,i)=>{ const bh=(v/max)*(h-16); const x=30+i*bw+bw*0.18, wd=bw*0.64;
    return `<rect x="${x}" y="${h-bh}" width="${wd}" height="${bh}" style="fill:${redLast&&i===data.length-1?"var(--red)":"var(--ink)"}"/>`; }).join("");
  const labs = labels ? labels.map((l,i)=> i%2===0 ? `<text class="axis-label" x="${30+i*bw+bw/2}" y="${h+16}" text-anchor="middle">${l}</text>` : "").join("") : "";
  return `<svg viewBox="0 0 ${w} ${h+22}" width="100%" role="img">${bars}<line x1="30" x2="${w-6}" y1="${h}" y2="${h}" style="stroke:var(--line)" stroke-width="2"/>${labs}</svg>`;
}
function svgStacked(rows, {w=560,h=180,labels=null}={}){
  const totals = rows.map(r=>r[0]+r[1]); const max=Math.max(...totals)*1.08, bw=(w-40)/rows.length;
  const bars = rows.map((r,i)=>{ const x=30+i*bw+bw*0.18, wd=bw*0.64; const h1=(r[0]/max)*(h-16), h2=(r[1]/max)*(h-16);
    return `<rect x="${x}" y="${h-h1}" width="${wd}" height="${h1}" style="fill:var(--ink)"/><rect x="${x}" y="${h-h1-h2}" width="${wd}" height="${h2}" style="fill:var(--red)"/>`; }).join("");
  const labs = labels ? labels.map((l,i)=> i%2===0 ? `<text class="axis-label" x="${30+i*bw+bw/2}" y="${h+16}" text-anchor="middle">${l}</text>` : "").join("") : "";
  return `<svg viewBox="0 0 ${w} ${h+22}" width="100%" role="img">${bars}<line x1="30" x2="${w-6}" y1="${h}" y2="${h}" style="stroke:var(--line)" stroke-width="2"/>${labs}</svg>`;
}
function svgDonut(parts, {size=180}={}){
  const total = parts.reduce((s,p)=>s+p.v,0); const r=70, c=2*Math.PI*r; let off=0;
  const segs = parts.map(p=>{ const frac=p.v/total; const s=`<circle cx="90" cy="90" r="${r}" fill="none" style="stroke:${p.c}" stroke-width="22" stroke-dasharray="${(frac*c).toFixed(1)} ${c.toFixed(1)}" stroke-dashoffset="${(-off).toFixed(1)}" transform="rotate(-90 90 90)"/>`; off+=frac*c; return s; }).join("");
  return `<svg viewBox="0 0 180 180" width="${size}" role="img">${segs}<text x="90" y="86" text-anchor="middle" style="font-size:26px;font-weight:900;fill:var(--ink)">${NUM(total)}</text><text class="axis-label" x="90" y="104" text-anchor="middle">TOTAL</text></svg>`;
}
function svgSpark(data, {w=120,h=34,red=false}={}){
  const max=Math.max(...data), min=Math.min(...data); const step=w/(data.length-1);
  const pts = data.map((v,i)=>`${(i*step).toFixed(1)},${(h-3-((v-min)/(max-min||1))*(h-6)).toFixed(1)}`).join(" ");
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" role="img"><polyline points="${pts}" fill="none" style="stroke:${red?"var(--red)":"var(--ink)"}" stroke-width="2"/></svg>`;
}
function svgGauge(pct, {size=180}={}){
  const r=74, c=Math.PI*r, filled=(pct/100)*c;
  return `<svg viewBox="0 0 180 100" width="${size}" role="img"><path d="M 8 96 A 74 74 0 0 1 172 96" fill="none" style="stroke:var(--paper-3)" stroke-width="16"/><path d="M 8 96 A 74 74 0 0 1 172 96" fill="none" style="stroke:var(--red)" stroke-width="16" stroke-dasharray="${filled.toFixed(1)} ${c.toFixed(1)}"/><text x="90" y="84" text-anchor="middle" style="font-size:30px;font-weight:900;fill:var(--ink)">${pct}%</text></svg>`;
}

/* — services — */
function toast(msg, light=false){
  const t = document.createElement("div"); t.className = "toast" + (light?" light":"");
  t.innerHTML = `<strong style="text-transform:uppercase;font-size:11px;letter-spacing:.1em">Raster</strong><br>${msg}`;
  document.getElementById("toast-root").appendChild(t);
  setTimeout(()=>{ t.style.opacity="0"; setTimeout(()=>t.remove(),250); }, 3400);
}
function openModal(title, body, foot="", size=""){
  document.getElementById("modal-root").innerHTML = `
  <div class="modal-veil" onclick="if(event.target===this)closeModal()">
    <div class="modal ${size}" role="dialog" aria-label="${esc(title)}">
      <div class="modal-head"><span class="h3">${title}</span><button class="icon-btn" onclick="closeModal()" aria-label="Close">✕</button></div>
      <div class="modal-body">${body}</div>
      ${foot?`<div class="modal-foot">${foot}</div>`:""}
    </div></div>`;
}
function closeModal(){ document.getElementById("modal-root").innerHTML=""; }
function confirmModal(title, body){
  openModal(title, `<p>${body}</p>`, `<button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-red" onclick="closeModal();toast('Done. The change is recorded in the activity log.')">Confirm</button>`, "sm");
}

/* ============================================================
   STYLE GUIDE REGISTRY — each entry renders live in #/styleguide.
   The count is computed, never typed by hand.
   ============================================================ */
const R = [];
const reg = (group, name, html) => R.push({group, name, html});
const BTNSTYLES = [["Ink","btn"],["Red","btn btn-red"],["Outline","btn btn-outline"],["Ghost","btn btn-ghost"]];
for(const [n,c] of BTNSTYLES) for(const [sn,sc] of [["Small","btn-sm"],["Default",""],["Large","btn-lg"]])
  reg("Buttons", `${n} — ${sn}`, `<button class="${c} ${sc}">${n} Button</button>`);
reg("Buttons","Ink — block",`<button class="btn btn-block">Block Button</button>`);
reg("Buttons","Outline — block",`<button class="btn btn-outline btn-block">Block Outline</button>`);
reg("Buttons","Ink — disabled",`<button class="btn" disabled>Disabled</button>`);
reg("Buttons","Outline — disabled",`<button class="btn btn-outline" disabled>Disabled</button>`);
reg("Buttons","Ink — loading",`<button class="btn"><span class="spin"></span>Saving</button>`);
reg("Buttons","Red — loading",`<button class="btn btn-red"><span class="spin"></span>Paying</button>`);
reg("Buttons","Ink — icon right",`<button class="btn">Export <span>→</span></button>`);
reg("Buttons","Outline — icon left",`<button class="btn btn-outline"><span>←</span> Back</button>`);
for(const g of ["✕","+","←","→","⋯","↓"]) reg("Buttons",`Icon button — ${g}`,`<button class="icon-btn">${g}</button>`);
reg("Buttons","Icon button — red",`<button class="icon-btn red">✕</button>`);
reg("Buttons","Button group",`<span class="btn-group"><button class="btn btn-outline">Day</button><button class="btn">Week</button><button class="btn btn-outline">Month</button></span>`);

for(const s of ["Paid","Due","Overdue","Shipped","Processing","Active","Dormant","Open","Resolved","In stock","Low stock","Out of stock","High","Invited","Suspended"])
  reg("Badges & tags", `Status — ${s}`, badge(s));
reg("Badges & tags","Badge — solid", badge("Featured","badge-solid"));
reg("Badges & tags","Badge — red", badge("New","badge-red"));
reg("Badges & tags","Tag — plain",`<span class="tag">Wholesale</span>`);
reg("Badges & tags","Tag — removable",`<span class="tag">Zürich <button aria-label="Remove">✕</button></span>`);
reg("Badges & tags","Tag — with count",`<span class="tag">Paper <strong>14</strong></span>`);

for(const [n,c] of [["Small","sm"],["Default",""],["Large","lg"],["Extra large","xl"]]) reg("Avatars",`Avatar — ${n}`, avatar("Lena Vogt", c));
reg("Avatars","Avatar — red", avatar("Marco Steiner","red"));
reg("Avatars","Avatar — outline", avatar("Aiko Tanaka","line"));
reg("Avatars","Avatar stack — 3",`<span class="avatar-stack">${avatar("Lena Vogt")}${avatar("Marco Steiner","red")}${avatar("Aiko Tanaka","line")}</span>`);
reg("Avatars","Avatar stack — 5 + count",`<span class="avatar-stack">${avatar("Lena Vogt")}${avatar("Marco Steiner")}${avatar("Aiko Tanaka")}${avatar("Jonas Frei")}<span class="avatar line">+4</span></span>`);

const inp = (label, inner, help="") => `<div style="min-width:210px;flex:1"><label class="f-label">${label}</label>${inner}${help?`<div class="f-help">${help}</div>`:""}</div>`;
for(const [t,ty] of [["Text","text"],["Email","email"],["Password","password"],["Number","number"],["Search","search"],["URL","url"],["Telephone","tel"],["Date","date"],["Time","time"]])
  reg("Form fields", `Input — ${t}`, inp(t, `<input class="f-input" type="${ty}" placeholder="${t} value">`));
reg("Form fields","Input — with help", inp("VAT number", `<input class="f-input" value="CHE-204.881.517">`, "Swiss format CHE-xxx.xxx.xxx"));
reg("Form fields","Input — with error", inp("Email", `<input class="f-input f-error" value="lena@">`, "") + `<div class="f-err-msg" style="width:100%">Enter a valid email address.</div>`);
reg("Form fields","Input — disabled", inp("Customer no.", `<input class="f-input" value="C-100248" disabled>`));
reg("Form fields","Input — CHF prefix", inp("Amount", `<span class="f-prefix"><span class="pre">CHF</span><input class="f-input" value="1,250.00"></span>`));
reg("Form fields","Input — unit suffix", inp("Weight", `<span class="f-prefix"><input class="f-input" value="48"><span class="pre">KG</span></span>`));
reg("Form fields","Textarea", inp("Notes", `<textarea class="f-area" rows="3">Hold at dock for courier.</textarea>`));
reg("Form fields","Textarea — error", inp("Reason", `<textarea class="f-area f-error" rows="2"></textarea>`) + `<div class="f-err-msg" style="width:100%">A reason is required for refunds.</div>`);
reg("Form fields","Select", inp("Segment", `<select class="f-select"><option>Wholesale</option><option>Retail</option><option>Studio</option></select>`));
reg("Form fields","Select — multiple", inp("Channels", `<select class="f-select" multiple size="3"><option>Direct</option><option>Retail</option><option>Wholesale</option></select>`));
reg("Form fields","Select — disabled", inp("Country", `<select class="f-select" disabled><option>Switzerland</option></select>`));
reg("Form fields","Upload — dropzone", `<div class="upload" style="flex:1"><div class="h3">Drop files</div><div class="caption mt-2">PDF, CSV or SVG — max 25 MB</div></div>`);
reg("Form fields","Upload — compact", `<div class="row" style="flex:1"><button class="btn btn-outline">Choose file</button><span class="caption">No file chosen</span></div>`);
reg("Form fields","Upload — with file", `<div class="row" style="flex:1"><span class="tag">Price-List-2027.pdf <button>✕</button></span><span class="caption">2.4 MB</span></div>`);

const chk = (label, cls="", checked=false, dis=false) => `<label class="check ${cls}"><input type="checkbox" ${checked?"checked":""} ${dis?"disabled":""}><span class="box"></span>${label}</label>`;
reg("Checks & switches","Checkbox — unchecked", chk("Email reports"));
reg("Checks & switches","Checkbox — checked", chk("Email reports","",true));
reg("Checks & switches","Checkbox — indeterminate", `<label class="check indet"><input type="checkbox"><span class="box"></span>Some channels</label>`);
reg("Checks & switches","Checkbox — disabled", chk("Locked field","",false,true));
reg("Checks & switches","Checkbox — disabled checked", chk("Required field","",true,true));
const rad = (label, checked=false, dis=false) => `<label class="check radio"><input type="radio" name="sg-r" ${checked?"checked":""} ${dis?"disabled":""}><span class="box"></span>${label}</label>`;
reg("Checks & switches","Radio — unchecked", rad("Monthly"));
reg("Checks & switches","Radio — checked", rad("Yearly", true));
reg("Checks & switches","Radio — disabled", rad("Weekly", false, true));
const sw = (label, on=false, dis=false) => `<label class="switch"><input type="checkbox" ${on?"checked":""} ${dis?"disabled":""}><span class="track"></span>${label}</label>`;
reg("Checks & switches","Switch — off", sw("Dark mode"));
reg("Checks & switches","Switch — on", sw("Dark mode", true));
reg("Checks & switches","Switch — disabled off", sw("API access", false, true));
reg("Checks & switches","Switch — disabled on", sw("API access", true, true));
for(const v of [25,50,75,100]) reg("Checks & switches",`Range — ${v}%`, `<span style="flex:1;min-width:180px"><input class="f-range" type="range" value="${v}"><span class="caption">${v}%</span></span>`);
reg("Checks & switches","Quantity stepper", `<span class="stepper"><button>−</button><input value="12"><button>+</button></span>`);
reg("Checks & switches","Segmented control", `<span class="btn-group"><button class="btn btn-outline btn-sm">List</button><button class="btn btn-sm">Grid</button></span>`);

reg("Navigation","Tabs — plain", tabs(["Overview","Orders","Invoices"],"Overview"));
reg("Navigation","Tabs — with red active", tabs(["All","Paid","Due","Overdue"],"Due"));
reg("Navigation","Breadcrumb — 2 levels", `<span class="crumbs"><a>Customers</a><span class="sep">/</span><span class="here">Helvetia Print SA</span></span>`);
reg("Navigation","Breadcrumb — 4 levels", `<span class="crumbs"><a>Settings</a><span class="sep">/</span><a>Organisation</a><span class="sep">/</span><a>Billing</a><span class="sep">/</span><span class="here">Invoices</span></span>`);
reg("Navigation","Pagination — numbers", pager(2,5));
reg("Navigation","Pagination — first page", pager(1,4));
reg("Navigation","Pagination — with summary", `<span class="row gap-4">${pager(3,6)}<span class="caption">Page 3 of 6 — 96 orders</span></span>`);
reg("Navigation","Menu", `<span class="menu"><a>Profile <span>→</span></a><a>Settings <span>→</span></a><a>Sign out <span class="red">✕</span></a></span>`);
reg("Navigation","Steps — checkout", `<span class="steps" style="flex:1;min-width:260px"><span class="step done">01 Cart</span><span class="step now">02 Payment</span><span class="step">03 Done</span></span>`);
reg("Navigation","Index row — dotted leader", `<span class="index-row" style="flex:1"><strong>Grid Pad A4</strong><span class="leader"></span><span class="num">CHF 12.50</span></span>`);

const al = (cls, t, body) => `<div class="alert ${cls}" style="flex:1"><div><div class="t">${t}</div><div>${body}</div></div></div>`;
reg("Feedback", "Alert — ink rule", al("", "Note", "Two invoices carry the reduced VAT rate."));
reg("Feedback", "Alert — red rule", al("red", "Low stock", "Red 306 ink is below the reorder line."));
reg("Feedback", "Alert — filled ink", al("fill", "Saved", "Price list 2027 is now the default."));
reg("Feedback", "Alert — filled red", al("fill-red", "Overdue", "Invoice 2026-0904 is 6 days overdue."));
reg("Feedback", "Alert — with action", `<div class="alert red" style="flex:1"><div style="flex:1"><div class="t">Stock</div><div>48 units of Red 306 remain.</div></div><button class="btn btn-sm">Reorder</button></div>`);
reg("Feedback", "Toast — dark (demo)", `<button class="btn btn-outline" onclick="toast('Order 1042 marked as paid.')">Show toast</button>`);
reg("Feedback", "Toast — light (demo)", `<button class="btn btn-outline" onclick="toast('Export ready — check your downloads.', true)">Show toast</button>`);
for(const p of [25,50,75]) reg("Feedback", `Progress — ${p}%`, `<span style="flex:1;min-width:180px">${progress(p)}<span class="caption">${p}%</span></span>`);
reg("Feedback","Progress — red", `<span style="flex:1;min-width:180px">${progress(82,true)}</span>`);
reg("Feedback","Progress — thin", `<span style="flex:1;min-width:180px">${progress(64,false,true)}</span>`);
reg("Feedback","Skeleton — lines", `<span style="flex:1"><span class="skel skel-line" style="display:block;width:70%"></span><span class="skel skel-line" style="display:block;width:45%"></span></span>`);
reg("Feedback","Skeleton — block", `<span class="skel skel-block" style="flex:1;min-width:180px"></span>`);

const demoRows = [{n:"Grid Pad A4",v:"CHF 12.50"},{n:"Riso Paper A3",v:"CHF 24.50"},{n:"Bone Folder",v:"CHF 16.50"}];
reg("Tables","Table — standard", table([{t:"Product",v:"n"},{t:"Price",v:"v",r:1}], demoRows));
reg("Tables","Table — dense", table([{t:"Product",v:"n"},{t:"Price",v:"v",r:1}], demoRows, {dense:true}));
reg("Tables","Table — with index", table([{t:"No.",v:(r,i)=>i+1},{t:"Product",v:"n"},{t:"Price",v:"v",r:1}], demoRows, {index:true}));
reg("Tables","Table — with totals", table([{t:"Product",v:"n"},{t:"Price",v:"v",r:1}], demoRows, {foot:`<td>Total</td><td class="r">CHF 53.50</td>`}));
reg("Tables","Table — with status", table([{t:"Product",v:"n"},{t:"State",v:()=>badge("In stock")}], demoRows.slice(0,2)));
reg("Tables","Table — sortable head", `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Product ↕</th><th class="r">Price ↕</th></tr></thead><tbody><tr><td>Grid Pad A4</td><td class="r">CHF 12.50</td></tr></tbody></table></div>`);

reg("Figures & plates","Stat — plain", stat("Revenue — Dec", "CHF 289,650"));
reg("Figures & plates","Stat — red figure", stat("Overdue", "CHF 8,412.00", "", true));
reg("Figures & plates","Stat — delta up", stat("Orders", "596", `<span class="marker"></span> +4.4% vs Nov`));
reg("Figures & plates","Stat — delta down", stat("Returns", "1.8%", `<span class="marker-hollow"></span> −0.3 pts vs Nov`));
reg("Figures & plates","Hero numeral", `<span class="num-hero">1,337</span>`);
reg("Figures & plates","Plate — paper", `<div class="plate" style="flex:1"><div class="micro">Plate</div><div class="mt-2">Ruled border, white ground.</div></div>`);
reg("Figures & plates","Plate — tinted", `<div class="plate-2" style="flex:1"><div class="micro">Plate 2</div><div class="mt-2">Turned-page tint.</div></div>`);
reg("Figures & plates","Plate — ink", `<div class="plate-ink" style="flex:1"><div class="micro">Plate Ink</div><div class="mt-2">The poster, inverted.</div></div>`);
reg("Figures & plates","Plate — red", `<div class="plate-red" style="flex:1"><div class="micro">Plate Red</div><div class="mt-2">Used once per view, at most.</div></div>`);
reg("Figures & plates","Key–value block", `<div class="kv" style="flex:1"><div class="k"><div class="micro">Founded</div><strong>1962</strong></div><div class="k"><div class="micro">City</div><strong>Zürich</strong></div></div>`);

reg("Charts","Chart — line", `<span style="flex:1;min-width:300px">${svgLine([12,19,15,24,21,29,26,34],{h:110})}</span>`);
reg("Charts","Chart — area", `<span style="flex:1;min-width:300px">${svgLine([12,19,15,24,21,29,26,34],{h:110,area:true})}</span>`);
reg("Charts","Chart — columns", `<span style="flex:1;min-width:300px">${svgBars([12,19,15,24,21,29,26,34],{h:110})}</span>`);
reg("Charts","Chart — stacked", `<span style="flex:1;min-width:300px">${svgStacked([[8,4],[11,6],[9,5],[14,7],[12,6],[16,8]],{h:110})}</span>`);
reg("Charts","Chart — donut", svgDonut([{v:62,c:"var(--ink)"},{v:24,c:"var(--red)"},{v:14,c:"var(--ink-3)"}],{size:130}));
reg("Charts","Chart — sparkline", svgSpark([4,7,5,9,8,12,10,14]));
reg("Charts","Chart — sparkline red", svgSpark([14,10,12,8,9,5,7,4],{red:true}));
reg("Charts","Chart — gauge", svgGauge(68,{size:150}));

reg("Lists & rows","Timeline — item", `<div class="timeline" style="flex:1"><div class="tl-item"><strong>Lena Vogt</strong> <span class="muted">issued invoice 2026-0912</span><div class="caption">09:15</div></div></div>`);
reg("Lists & rows","Timeline — hot item", `<div class="timeline" style="flex:1"><div class="tl-item hot"><strong>System</strong> <span class="muted">flagged Red 306 as low stock</span><div class="caption">08:47</div></div></div>`);
reg("Lists & rows","Notification row", `<div class="row" style="flex:1"><span class="marker"></span><span style="flex:1">Order 1042 paid — CHF 11,176.00</span><span class="caption">12 min</span></div>`);
reg("Lists & rows","Search result row", `<div class="result" style="flex:1"><div class="micro red">Product</div><strong>Letterpress Ink — Red 306</strong><div class="caption">INK-2213 · 48 units · CHF 52.00</div></div>`);
reg("Lists & rows","Feature row", `<div class="feat" style="flex:1"><span class="marker"></span>Unlimited products<span class="leader"></span><strong>Included</strong></div>`);
reg("Lists & rows","Kanban card", `<div class="kb-card" style="flex:1;max-width:280px"><div class="micro red">Wholesale</div><div class="t">Restock Riso Paper A3 — Cream</div><div class="row mt-2">${avatar("Aiko Tanaka","sm")}<span class="caption">Due Fri</span></div></div>`);
reg("Lists & rows","Calendar event", `<div style="flex:1"><div class="cal-ev">09:00 Courier — Helvetia Print</div><div class="cal-ev red">14:30 VAT review</div></div>`);
reg("Lists & rows","File plate", `<div class="file-plate" style="flex:1;max-width:240px"><div class="file-glyph">PDF</div><div class="mt-4"><strong>Price-List-2027.pdf</strong></div><div class="caption">2.4 MB · Marco Steiner</div></div>`);

reg("Overlays","Modal — small (demo)", `<button class="btn btn-outline" onclick="openModal('Small modal','<p>A 380px dialog on the grid.</p>','<button class=\\'btn\\' onclick=\\'closeModal()\\'>OK</button>','sm')">Open SM</button>`);
reg("Overlays","Modal — medium (demo)", `<button class="btn btn-outline" onclick="openModal('Medium modal','<p>The default 520px dialog.</p>','<button class=\\'btn\\' onclick=\\'closeModal()\\'>OK</button>')">Open MD</button>`);
reg("Overlays","Modal — large (demo)", `<button class="btn btn-outline" onclick="openModal('Large modal','<p>A 760px dialog for tables and forms.</p>','<button class=\\'btn\\' onclick=\\'closeModal()\\'>OK</button>','lg')">Open LG</button>`);
reg("Overlays","Confirm dialog (demo)", `<button class="btn btn-outline" onclick="confirmModal('Delete product?','This removes the product from the catalogue. Orders keep their history.')">Open confirm</button>`);
reg("Overlays","Tooltip text", `<span>Hover the <span class="tooltip" title="Set in Libre Franklin 900">dotted term</span> for a native tooltip.</span>`);
reg("Overlays","Keyboard keys", `<span>Press <span class="kbd">⌘</span> <span class="kbd">K</span> to search.</span>`);

reg("Miscellaneous","Stars — full", `<span class="stars">★★★★★</span>`);
reg("Miscellaneous","Stars — partial", `<span class="stars">★★★★<span class="off">★</span></span>`);
reg("Miscellaneous","Accordion — closed", `<div class="accordion" style="flex:1"><div class="acc-item"><button class="acc-head" onclick="this.parentNode.classList.toggle('open')">Shipping & returns <span>＋</span></button><div class="acc-body">Orders ship from Zürich within 2 working days.</div></div></div>`);
reg("Miscellaneous","Price display", `<span><span style="font-size:40px;font-weight:900">CHF 79</span> <span class="muted">/ month</span></span>`);
reg("Miscellaneous","Markers set", `<span class="row gap-3"><span class="marker"></span><span class="marker-ink"></span><span class="marker-hollow"></span><span class="caption">red · ink · hollow</span></span>`);
reg("Miscellaneous","Rules set", `<span style="flex:1"><hr class="rule-thick"><br><hr class="rule"><br><hr class="rule-soft"></span>`);
reg("Miscellaneous","Form — inline search", `<form class="row" style="flex:1" onsubmit="event.preventDefault();toast('Search is a demo in this template.')"><input class="f-input" placeholder="Search orders, customers, SKUs" style="flex:1"><button class="btn">Search</button></form>`);
reg("Miscellaneous","Filter bar", `<span class="row" style="flex:1;flex-wrap:wrap"><select class="f-select" style="width:auto"><option>All channels</option><option>Wholesale</option></select><select class="f-select" style="width:auto"><option>Last 30 days</option><option>Last 12 months</option></select><button class="btn btn-outline">Apply</button></span>`);

/* — registry addendum: further honest variants — */
function svgHBar(data, {w=520,h=150,labels=null}={}){
  const max=Math.max(...data)*1.1, bh=h/data.length;
  const bars=data.map((v,i)=>`<rect x="90" y="${i*bh+bh*0.2}" width="${((v/max)*(w-150)).toFixed(1)}" height="${bh*0.6}" style="fill:${i===0?"var(--red)":"var(--ink)"}"/><text class="axis-label" x="0" y="${i*bh+bh*0.58}">${labels?labels[i]:""}</text><text class="axis-val" x="${95+(v/max)*(w-150)}" y="${i*bh+bh*0.58}">${NUM(v)}</text>`).join("");
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img">${bars}</svg>`;
}
reg("Buttons","Link — ink", `<a href="javascript:void 0" style="font-weight:700">View all orders →</a>`);
reg("Buttons","Link — red", `<a href="javascript:void 0" style="font-weight:700;color:var(--red)">Overdue invoices →</a>`);
reg("Buttons","Link — underlined", `<a href="javascript:void 0" style="text-decoration:underline;text-underline-offset:3px">Download price list</a>`);
reg("Buttons","Button — with count", `<button class="btn btn-outline">Tickets <span class="badge badge-red" style="margin-left:4px">5</span></button>`);
reg("Badges & tags","Badge — large", `<span class="badge" style="font-size:12px;padding:5px 12px"><span class="sq"></span>Wholesale account</span>`);
reg("Badges & tags","Badge — numeric", `<span class="badge badge-solid">48 units</span>`);
reg("Badges & tags","Tag group", `<span class="row gap-2"><span class="tag">Paper</span><span class="tag">Ink</span><span class="tag">Presses</span></span>`);
reg("Badges & tags","Priority — set", `<span class="row gap-2">${badge("High")}${badge("Medium")}${badge("Low")}</span>`);
reg("Avatars","Avatar — with status", `<span style="position:relative;display:inline-block">${avatar("Priya Nair")}<span style="position:absolute;bottom:-3px;right:-3px;width:10px;height:10px;background:var(--red);border:2px solid var(--paper)"></span></span>`);
reg("Avatars","Avatar — initials long", avatar("Bürohaus Keller AG","lg red"));
reg("Form fields","Input — small", inp("Code", `<input class="f-input" style="padding:6px 10px" value="ZH-01">`));
reg("Form fields","Input — large", inp("Headline", `<input class="f-input" style="padding:14px;font-size:18px;font-weight:700" value="Raster">`));
reg("Form fields","Select — small", inp("Per page", `<select class="f-select" style="padding:6px 10px;width:auto"><option>25</option><option>50</option></select>`));
reg("Form fields","Input — with button", `<span class="f-prefix" style="flex:1"><input class="f-input" placeholder="Coupon code"><button class="btn" style="border-left:0">Apply</button></span>`);
reg("Form fields","Date range pair", `<span class="row" style="flex:1"><input class="f-input" type="date" value="2026-11-01"><span class="micro">to</span><input class="f-input" type="date" value="2026-11-30"></span>`);
reg("Checks & switches","Checkbox group", `<span class="stack gap-2">${chk("Orders","",true)}${chk("Invoices","",true)}${chk("Returns","")}</span>`);
reg("Checks & switches","Radio group", `<span class="stack gap-2">${rad("Weekly digest","")}${rad("Monthly digest",true)}${rad("No digest","")}</span>`);
reg("Navigation","Nav item — default", `<a class="nav-item" style="flex:1;border:1px solid var(--line-soft)"><span class="no">07</span>Orders</a>`);
reg("Navigation","Nav item — active", `<a class="nav-item active" style="flex:1;border:1px solid var(--line-soft)"><span class="no">07</span>Orders</a>`);
reg("Navigation","Nav item — with count", `<a class="nav-item" style="flex:1;border:1px solid var(--line-soft)"><span class="no">12</span>Tickets<span class="count">5</span></a>`);
reg("Feedback","Alert — dismissible", `<div class="alert" style="flex:1"><div style="flex:1"><div class="t">Backup done</div><div>Snapshot raster-2026-11-24 created at 03:00.</div></div><button class="icon-btn" onclick="this.closest('.alert').remove()">✕</button></div>`);
reg("Feedback","Progress — labelled", `<span style="flex:1;min-width:180px"><span class="row-between"><span class="micro">Warehouse ZH-01</span><span class="num">82%</span></span>${progress(82)}</span>`);
reg("Tables","Table — with avatars", table([{t:"Member",v:r=>`<span class="row gap-3">${avatar(r.n,"sm")}${r.n}</span>`},{t:"Role",v:"role"}], [{n:"Lena Vogt",role:"Operations Lead"},{n:"Marco Steiner",role:"Sales Director"}]));
reg("Tables","Table — with actions", table([{t:"File",v:"n"},{t:"",v:()=>`<button class="btn btn-sm btn-outline">Open</button>`}], [{n:"Price-List-2027.pdf"},{n:"VAT-November-2026.xlsx"}]));
reg("Figures & plates","Stat — with sparkline", `<div class="stat" style="flex:1"><div class="micro">Visitors</div><div class="v">46,120</div><div class="mt-2">${svgSpark([28,30,33,31,35,38,36,39,41,43,46])}</div></div>`);
reg("Figures & plates","Stat — compact", `<div class="row gap-3"><span class="num-lg">312</span><span class="micro">Units of<br>Black Ink 1kg</span></div>`);
reg("Charts","Chart — horizontal bars", `<span style="flex:1;min-width:300px">${svgHBar([486200,312670,203910],{labels:["KELLER","GRAFIKWERK","NORDLICHT"],h:110})}</span>`);
reg("Charts","Chart — line red", `<span style="flex:1;min-width:300px">${svgLine([34,29,31,24,26,19,21,15],{h:110,red:true})}</span>`);
reg("Lists & rows","Team row", `<div class="row" style="flex:1">${avatar("Jonas Frei")}<span style="flex:1"><strong>Jonas Frei</strong><div class="caption">Accountant · Finance</div></span>${badge("Active")}</div>`);
reg("Lists & rows","Product row", `<div class="row" style="flex:1"><span class="num-badge">03</span><span style="flex:1"><strong>Letterpress Ink — Black 1kg</strong><div class="caption">INK-2205</div></span><strong>CHF 48.00</strong></div>`);
reg("Lists & rows","Order row", `<div class="row" style="flex:1"><span class="num-badge red">#1042</span><span style="flex:1"><strong>Helvetia Print SA</strong><div class="caption">24 Nov 2026 · 2 lines</div></span>${badge("Paid")}</div>`);
reg("Miscellaneous","Divider — with label", `<span class="row" style="flex:1"><hr class="rule" style="flex:1"><span class="micro">Or continue with</span><hr class="rule" style="flex:1"></span>`);
reg("Miscellaneous","Code block", `<code style="flex:1;background:var(--ink);color:var(--paper);padding:14px 16px;font-size:12px;display:block">raster.config = { accent: "#e30613", grid: 12 }</code>`);
reg("Miscellaneous","Rating — with count", `<span class="row gap-2"><span class="stars">★★★★★</span><span class="caption">5.0 · 214 reviews</span></span>`);

const REGISTRY = R;
