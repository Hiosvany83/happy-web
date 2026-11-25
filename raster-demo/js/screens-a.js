/* RASTER — screens A: dashboards, analytics, revenue, customers, products */
"use strict";
const SCREENS = {};
const delta = (txt, up=true) => `<span class="${up?"":"faint"}">${up?'<span class="marker"></span>':'<span class="marker-hollow"></span>'} ${txt}</span>`;
const lineItems = o => o.items.map(it=>{ const p=prodById(it.p); return {...it, name:p.name, sku:p.sku, price:p.price, sum:p.price*it.q}; });

SCREENS.overview = () => `
  ${pageHead("01 — Overview","Overview","Atelier Nord AG at a glance. Every figure on this page is computed from the same tables you will find under Orders, Invoices and Products.", `<button class="btn btn-outline" onclick="toast('Report exported as PDF (demo).')">Export</button><button class="btn" onclick="location.hash='#/reports'">New Report</button>`)}
  <div class="grid">
    <div class="span-3">${stat("Revenue — December", CHF(KPI.revenueMonth), delta("+6.7% vs Nov"))}</div>
    <div class="span-3">${stat("Orders — December", NUM(KPI.ordersMonth), delta("+4.4% vs Nov"))}</div>
    <div class="span-3">${stat("Invoices outstanding", CHF(KPI.invoicesDue), `<span class="red" style="font-weight:700">${DATA.invoices.filter(i=>i.status==="Overdue").length} overdue</span>`)}</div>
    <div class="span-3">${stat("Active customers", KPI.customersActive + " / " + KPI.customers, delta("2 dormant accounts"))}</div>
  </div>
  <div class="mt-8">${secHead("02","Revenue — 12 months", `<a href="#/revenue">Full revenue report →</a>`)}
    <div class="grid"><div class="span-8">${svgLine(DATA.revenueByMonth,{labels:MONTHS,h:210})}</div>
    <div class="span-4">
      <div class="num-hero">${CHF(KPI.revenueYear).replace("CHF ","")}</div>
      <div class="micro mt-2">CHF — Revenue, trailing 12 months</div>
      <hr class="rule mt-6 mb-4">
      ${[["Best month","December — "+CHF(DATA.revenueByMonth[11])],["Average month",CHF(Math.round(KPI.revenueYear/12))],["Orders, 12 months",NUM(sum(DATA.ordersByMonth,x=>x))]].map(r=>`<div class="index-row" style="padding:6px 0"><span class="muted">${r[0]}</span><span class="leader"></span><strong>${r[1]}</strong></div>`).join("")}
    </div></div>
  </div>
  <div class="mt-8">${secHead("03","Latest orders", `<a href="#/orders">All orders →</a>`)}
    ${table([
      {t:"No.",v:(r,i)=>i+1},{t:"Order",v:r=>`<a href="#/orders/${r.id}"><strong>#${r.id}</strong></a>`},
      {t:"Customer",v:r=>custById(r.customer).name},{t:"Date",v:"date"},
      {t:"Channel",v:"channel"},{t:"Status",v:r=>badge(r.status)},{t:"Total",v:r=>CHF(r.total),r:1}
    ], DATA.orders.slice(0,6))}
  </div>
  <div class="grid mt-8">
    <div class="span-6">${secHead("04","Stock alerts", `<a href="#/products">Products →</a>`)}
      ${DATA.products.filter(p=>p.status!=="In stock").map(p=>`<div class="index-row" style="padding:7px 0"><span class="marker"></span><span>${p.name}</span><span class="leader"></span>${badge(p.status)}<strong class="num">${p.stock} left</strong></div>`).join("")}
    </div>
    <div class="span-6">${secHead("05","Activity", `<a href="#/activity">Full log →</a>`)}
      <div class="timeline">${DATA.activity.slice(0,4).map(a=>`<div class="tl-item ${a.hot?"hot":""}"><strong>${a.who}</strong> <span class="muted">${a.what}</span><div class="caption">${a.when}</div></div>`).join("")}</div>
    </div>
  </div>`;

SCREENS.sales = () => `
  ${pageHead("02 — Dashboards","Sales","The sales floor view: channels, top customers and the current month against target.", `<button class="btn btn-outline" onclick="toast('Sales board exported (demo).')">Export</button>`)}
  <div class="grid">
    <div class="span-3">${stat("Target — December", CHF(300000))}</div>
    <div class="span-3">${stat("Booked", CHF(KPI.revenueMonth), delta(Math.round(KPI.revenueMonth/3000)+"% of target"))}</div>
    <div class="span-3">${stat("Wholesale share", Math.round(sum(DATA.orders.filter(o=>o.channel==="Wholesale"),o=>o.total)/sum(DATA.orders,o=>o.total)*100)+"%", delta("of listed order value"))}</div>
    <div class="span-3">${stat("Avg. order value", CHF(Math.round(KPI.ordersTotal/DATA.orders.length)), delta("across "+DATA.orders.length+" listed orders"))}</div>
  </div>
  <div class="mt-6">${progress(Math.round(KPI.revenueMonth/3000))}<div class="row-between mt-2"><span class="micro">December target progress</span><span class="num small">${Math.round(KPI.revenueMonth/3000)}%</span></div></div>
  <div class="grid mt-8">
    <div class="span-7">${secHead("06","Orders by month")}${svgBars(DATA.ordersByMonth,{labels:MONTHS,h:190,redLast:true})}</div>
    <div class="span-5">${secHead("07","Top customers — lifetime")}
      ${[...DATA.customers].sort((a,b)=>b.spent-a.spent).slice(0,5).map((c,i)=>`<div class="index-row" style="padding:7px 0"><span class="num-badge">${String(i+1).padStart(2,"0")}</span><a href="#/customers/${c.id}">${c.name}</a><span class="leader"></span><strong>${CHF(c.spent)}</strong></div>`).join("")}
    </div>
  </div>
  <div class="mt-8">${secHead("08","Channel mix — listed orders")}
    ${table([{t:"Channel",v:"ch"},{t:"Orders",v:"n",r:1},{t:"Value",v:r=>CHF(r.v),r:1},{t:"Share",v:r=>`<span style="display:inline-block;width:120px;vertical-align:middle">${progress(r.pct)}</span> ${r.pct}%`,r:1}],
      ["Wholesale","Retail","Direct"].map(ch=>{ const os=DATA.orders.filter(o=>o.channel===ch); const v=sum(os,o=>o.total); return {ch, n:os.length, v, pct:Math.round(v/KPI.ordersTotal*100)}; }))}
  </div>`;

SCREENS.operations = () => `
  ${pageHead("03 — Dashboards","Operations","Warehouse and fulfilment: what is moving, what is stuck, and what runs out next.", `<button class="btn" onclick="location.hash='#/warehouses'">Warehouses</button>`)}
  <div class="grid">
    <div class="span-3">${stat("Units in stock", NUM(KPI.stockUnits), delta("across "+KPI.products+" products"))}</div>
    <div class="span-3">${stat("Low / out of stock", KPI.lowStock, `<span class="red" style="font-weight:700">Reorder required</span>`)}</div>
    <div class="span-3">${stat("Orders processing", DATA.orders.filter(o=>o.status==="Processing").length, delta("awaiting pick & pack"))}</div>
    <div class="span-3">${stat("Open tickets", KPI.openTickets, delta("2 high priority"))}</div>
  </div>
  <div class="grid mt-8">
    <div class="span-7">${secHead("09","Warehouse utilisation")}
      ${DATA.warehouses.map(w=>`<div style="padding:10px 0;border-bottom:1px solid var(--line-soft)"><div class="row-between"><strong>${w.name}</strong><span class="num">${w.util}%</span></div><div class="mt-2">${progress(w.util, w.util>75)}</div><div class="caption mt-2">${NUM(w.items)} units · ${w.status}</div></div>`).join("")}
    </div>
    <div class="span-5">${secHead("10","Fulfilment queue")}
      ${table([{t:"Order",v:r=>`<a href="#/orders/${r.id}"><strong>#${r.id}</strong></a>`},{t:"Customer",v:r=>custById(r.customer).name},{t:"Status",v:r=>badge(r.status)}], DATA.orders.filter(o=>o.status==="Processing"||o.status==="Shipped"))}
    </div>
  </div>
  <div class="mt-8">${secHead("11","Reorder list")}
    ${table([{t:"SKU",v:"sku"},{t:"Product",v:"name"},{t:"Stock",v:r=>`<strong class="num">${r.stock}</strong>`,r:1},{t:"Supplier lead",v:r=>r.cat==="Ink"?"9 days":"6 days"},{t:"Status",v:r=>badge(r.status)},{t:"",v:()=>`<button class="btn btn-sm" onclick="toast('Purchase order drafted (demo).')">Reorder</button>`}], DATA.products.filter(p=>p.status!=="In stock"))}
  </div>`;

SCREENS.analytics = () => `
  ${pageHead("04 — Analytics","Analytics","Traffic and conversion for the Atelier Nord web shop, set on the same grid as the money.", `<button class="btn btn-outline" onclick="toast('Analytics exported (demo).')">Export</button>`)}
  <div class="grid">
    <div class="span-3">${stat("Visitors — December", NUM(DATA.visitorsByMonth[11]), delta("+5.1% vs Nov"))}</div>
    <div class="span-3">${stat("Conversion", (KPI.ordersMonth/DATA.visitorsByMonth[11]*100).toFixed(2)+"%", delta("orders ÷ visitors"))}</div>
    <div class="span-3">${stat("Revenue / visitor", CHF(Math.round(KPI.revenueMonth/DATA.visitorsByMonth[11]*100)/100), delta("December"))}</div>
    <div class="span-3">${stat("Returning share", "38%", delta("of sessions"))}</div>
  </div>
  <div class="grid mt-8">
    <div class="span-8">${secHead("12","Visitors — 12 months")}${svgLine(DATA.visitorsByMonth,{labels:MONTHS,h:200,area:true})}</div>
    <div class="span-4">${secHead("13","Traffic sources")}
      ${svgDonut([{v:46,c:"var(--ink)"},{v:27,c:"var(--red)"},{v:16,c:"var(--ink-3)"},{v:11,c:"var(--line-soft)"}],{size:170})}
      <div class="mt-4">${[["Direct","46%"],["Search","27%"],["Referral","16%"],["Social","11%"]].map(r=>`<div class="index-row" style="padding:5px 0"><span>${r[0]}</span><span class="leader"></span><strong>${r[1]}</strong></div>`).join("")}</div>
    </div>
  </div>
  <div class="mt-8">${secHead("14","Visitors vs orders")}
    ${svgStacked(DATA.ordersByMonth.map((o,i)=>[o, Math.round(DATA.visitorsByMonth[i]/100)]),{labels:MONTHS,h:190})}
    <p class="caption mt-2">Ink — orders. Red — visitors (hundreds). The two series move together; December is the widest gap of the year.</p>
  </div>`;

SCREENS.revenue = () => `
  ${pageHead("05 — Revenue","Revenue","Twelve months of recognised revenue, the invoices behind it, and what is still owed.", `<button class="btn btn-outline" onclick="toast('Revenue ledger exported (demo).')">Export ledger</button>`)}
  <div class="grid">
    <div class="span-4">${stat("Revenue — 12 months", CHF(KPI.revenueYear), delta("+18.2% year on year"))}</div>
    <div class="span-4">${stat("Invoiced — listed orders", CHF(KPI.invoicesTotal), delta(DATA.invoices.length+" invoices"))}</div>
    <div class="span-4">${stat("Outstanding", CHF(KPI.invoicesDue), `<span class="red" style="font-weight:700">Collect before 31 Dec</span>`, true)}</div>
  </div>
  <div class="mt-8">${secHead("15","Monthly revenue")}${svgBars(DATA.revenueByMonth,{labels:MONTHS,h:200,redLast:true})}</div>
  <div class="mt-8">${secHead("16","Revenue by customer segment")}
    ${svgHBar([sum(DATA.customers.filter(c=>c.segment==="Wholesale"),c=>c.spent), sum(DATA.customers.filter(c=>c.segment==="Retail"),c=>c.spent), sum(DATA.customers.filter(c=>c.segment==="Studio"),c=>c.spent), sum(DATA.customers.filter(c=>c.segment==="Publishing"),c=>c.spent)],{labels:["WHOLESALE","RETAIL","STUDIO","PUBLISHING"],h:150})}
    <p class="caption">Lifetime billed per segment, computed from the customer table.</p>
  </div>
  <div class="mt-8">${secHead("17","Invoices due & overdue", `<a href="#/invoices">All invoices →</a>`)}
    ${table([{t:"Invoice",v:r=>`<a href="#/invoices/${r.id}"><strong>${r.id}</strong></a>`},{t:"Customer",v:r=>custById(r.customer).name},{t:"Due",v:"due"},{t:"Status",v:r=>badge(r.status)},{t:"Amount",v:r=>CHF(r.total),r:1}], DATA.invoices.filter(i=>i.status==="Due"||i.status==="Overdue"))}
  </div>`;

const custRow = [
  {t:"No.",v:(r,i)=>i+1},{t:"Customer",v:r=>`<a href="#/customers/${r.id}"><strong>${r.name}</strong></a>`},
  {t:"Contact",v:"contact"},{t:"City",v:r=>r.city+" · "+r.country},{t:"Segment",v:"segment"},
  {t:"Orders",v:"orders",r:1},{t:"Lifetime",v:r=>CHF(r.spent),r:1},{t:"Status",v:r=>badge(r.status)}
];
SCREENS.customers = () => `
  ${pageHead("06 — Customers","Customers", KPI.customers+" accounts, "+KPI.customersActive+" active. Lifetime value is summed from the same ledger as the revenue report.", `<button class="btn" onclick="openModal('New customer','<div class=\\'f-group\\'><label class=\\'f-label\\'>Company</label><input class=\\'f-input\\' placeholder=\\'Company name\\'></div><div class=\\'f-group\\'><label class=\\'f-label\\'>Contact email</label><input class=\\'f-input\\' placeholder=\\'name@company.ch\\'></div>','<button class=\\'btn btn-outline\\' onclick=\\'closeModal()\\'>Cancel</button><button class=\\'btn\\' onclick=\\'closeModal();toast(\\'Customer created (demo).\\')\\'>Create</button>')">New Customer</button>`)}
  ${tabs(["All accounts","Active","Dormant","Wholesale","Retail"],"All accounts")}
  <div class="mt-6">${table(custRow, DATA.customers, {foot:`<td colspan="5">Totals — ${KPI.customers} customers</td><td class="r">${KPI.lifetimeOrders}</td><td class="r">${CHF(KPI.lifetimeSpent)}</td><td></td>`})}</div>
  <div class="row-between mt-4"><span class="caption">Showing 1–${KPI.customers} of ${KPI.customers}</span>${pager(1,1)}</div>`;

SCREENS.customerDetail = (id) => {
  const c = custById(+id) || DATA.customers[0];
  const orders = DATA.orders.filter(o=>o.customer===c.id);
  return `
  ${pageHead("06 — Customers", c.name, `${c.segment} account since ${c.since} · ${c.city}, ${c.country}.`, `<button class="btn btn-outline" onclick="toast('Statement exported (demo).')">Statement</button><button class="btn" onclick="toast('Message composer is a demo.')">Message</button>`)}
  <div class="kv">
    <div class="k"><div class="micro">Contact</div><strong>${c.contact}</strong><div class="caption">${c.contact.toLowerCase().replace(" ",".")}@example.ch</div></div>
    <div class="k"><div class="micro">Lifetime value</div><strong>${CHF(c.spent)}</strong></div>
    <div class="k"><div class="micro">Orders (lifetime)</div><strong>${c.orders}</strong></div>
    <div class="k"><div class="micro">Status</div>${badge(c.status)}</div>
  </div>
  <div class="mt-8">${secHead("18","Orders on this account")}
    ${orders.length ? table([{t:"Order",v:r=>`<a href="#/orders/${r.id}"><strong>#${r.id}</strong></a>`},{t:"Date",v:"date"},{t:"Status",v:r=>badge(r.status)},{t:"Total",v:r=>CHF(r.total),r:1}], orders) : `<div class="empty"><div class="big">No orders<br>listed</div><p class="muted mt-4">This account has no orders in the current ledger extract.</p></div>`}
  </div>
  <div class="grid mt-8">
    <div class="span-6">${secHead("19","Notes")}<p>Prefers dock delivery before 09:00. Pays on 14-day terms; no late payments in ${2026-c.since} years of trading. Contact in German or English.</p></div>
    <div class="span-6">${secHead("20","Account activity")}<div class="timeline">${DATA.activity.slice(0,3).map(a=>`<div class="tl-item ${a.hot?"hot":""}"><strong>${a.who}</strong> <span class="muted">${a.what}</span><div class="caption">${a.when}</div></div>`).join("")}</div></div>
  </div>`;
};

const prodRow = [
  {t:"No.",v:(r,i)=>i+1},{t:"SKU",v:r=>`<span class="num">${r.sku}</span>`},
  {t:"Product",v:r=>`<a href="#/products/${r.id}"><strong>${r.name}</strong></a>`},
  {t:"Category",v:"cat"},{t:"Stock",v:r=>`<span class="num">${NUM(r.stock)}</span>`,r:1},
  {t:"Price",v:r=>CHF(r.price),r:1},{t:"Margin",v:r=>Math.round((r.price-r.cost)/r.price*100)+"%",r:1},{t:"Status",v:r=>badge(r.status)}
];
SCREENS.products = () => `
  ${pageHead("07 — Products","Products", KPI.products+" products, "+NUM(KPI.stockUnits)+" units in stock across four warehouses.", `<button class="btn" onclick="toast('Product form is a demo.')">New Product</button>`)}
  ${tabs(["All products","Paper","Ink","Presses","Type","Tools","Binding"],"All products")}
  <div class="mt-6">${table(prodRow, DATA.products)}</div>
  <div class="row-between mt-4"><span class="caption">${KPI.lowStock} products need attention</span>${pager(1,2)}</div>`;

SCREENS.productDetail = (id) => {
  const p = prodById(+id) || DATA.products[0];
  const usedIn = DATA.orders.filter(o=>o.items.some(it=>it.p===p.id));
  return `
  ${pageHead("07 — Products", p.name, `${p.sku} · ${p.cat}. Stock, pricing and every listed order that contains this product.`, `<button class="btn btn-outline" onclick="toast('Label printed (demo).')">Print label</button><button class="btn" onclick="toast('Stock adjustment is a demo.')">Adjust stock</button>`)}
  <div class="kv">
    <div class="k"><div class="micro">Price</div><strong>${CHF(p.price)}</strong></div>
    <div class="k"><div class="micro">Cost</div><strong>${CHF(p.cost)}</strong></div>
    <div class="k"><div class="micro">Margin</div><strong>${Math.round((p.price-p.cost)/p.price*100)}%</strong></div>
    <div class="k"><div class="micro">Stock</div><strong>${NUM(p.stock)} units</strong><div class="mt-2">${badge(p.status)}</div></div>
  </div>
  <div class="grid mt-8">
    <div class="span-7">${secHead("21","Demand — units per month")}${svgBars([42,55,48,63,58,71,66,74,69,82,77,88],{labels:MONTHS,h:180,redLast:true})}</div>
    <div class="span-5">${secHead("22","Appears in orders")}
      ${usedIn.length ? table([{t:"Order",v:r=>`<a href="#/orders/${r.id}"><strong>#${r.id}</strong></a>`},{t:"Qty",v:r=>r.items.find(it=>it.p===p.id).q,r:1},{t:"Status",v:r=>badge(r.status)}], usedIn) : `<p class="muted">No listed orders contain this product yet.</p>`}
    </div>
  </div>`;
};
