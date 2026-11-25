/* RASTER — screens B: orders, invoices, calendar, tasks, messages,
   notifications, team, roles, files, tickets, warehouses, suppliers */
"use strict";
const orderRow = [
  {t:"No.",v:(r,i)=>i+1},{t:"Order",v:r=>`<a href="#/orders/${r.id}"><strong>#${r.id}</strong></a>`},
  {t:"Customer",v:r=>`<a href="#/customers/${r.customer}">${custById(r.customer).name}</a>`},
  {t:"Date",v:"date"},{t:"Lines",v:r=>r.items.length,r:1},{t:"Channel",v:"channel"},
  {t:"Status",v:r=>badge(r.status)},{t:"Total",v:r=>CHF(r.total),r:1}
];
SCREENS.orders = () => `
  ${pageHead("08 — Orders","Orders", DATA.orders.length+" orders in the current extract, "+CHF(KPI.ordersTotal)+" in total value.", `<button class="btn btn-outline" onclick="toast('Orders exported as CSV (demo).')">Export CSV</button><button class="btn" onclick="toast('Order form is a demo.')">New Order</button>`)}
  ${tabs(["All orders","Paid","Processing","Shipped","Cancelled"],"All orders")}
  <div class="mt-6">${table(orderRow, DATA.orders, {foot:`<td colspan="6">Total — ${DATA.orders.length} orders</td><td></td><td class="r">${CHF(KPI.ordersTotal)}</td>`})}</div>
  <div class="row-between mt-4"><span class="caption">Sorted by date, newest first</span>${pager(1,3)}</div>`;

SCREENS.orderDetail = (id) => {
  const o = DATA.orders.find(x=>x.id===+id) || DATA.orders[0];
  const c = custById(o.customer); const items = lineItems(o);
  const vat = Math.round((o.total - o.total/1.081)*100)/100;
  return `
  ${pageHead("08 — Orders", "Order #"+o.id, `Placed ${o.date} by ${c.name} via ${o.channel.toLowerCase()} channel.`, `<button class="btn btn-outline" onclick="toast('Packing slip printed (demo).')">Packing slip</button><button class="btn" onclick="location.hash='#/invoices'">View invoice</button>`)}
  <div class="kv">
    <div class="k"><div class="micro">Customer</div><strong><a href="#/customers/${c.id}">${c.name}</a></strong><div class="caption">${c.city} · ${c.country}</div></div>
    <div class="k"><div class="micro">Status</div><div class="mt-2">${badge(o.status)}</div></div>
    <div class="k"><div class="micro">Lines</div><strong>${items.length}</strong></div>
    <div class="k"><div class="micro">Total</div><strong>${CHF(o.total)}</strong></div>
  </div>
  <div class="mt-8">${secHead("23","Line items")}
    ${table([{t:"No.",v:(r,i)=>i+1},{t:"SKU",v:"sku"},{t:"Product",v:r=>`<a href="#/products/${r.p}">${r.name}</a>`},{t:"Qty",v:"q",r:1},{t:"Unit price",v:r=>CHF(r.price),r:1},{t:"Sum",v:r=>CHF(r.sum),r:1}], items,
      {foot:`<td colspan="4">Subtotal</td><td></td><td class="r">${CHF(o.total)}</td>`})}
    <div class="index-row mt-4"><span class="muted">VAT 8.1% included in line prices</span><span class="leader"></span><span>of which VAT</span><strong>${CHF(vat)}</strong></div>
  </div>
  <div class="grid mt-8">
    <div class="span-6">${secHead("24","Fulfilment")}<div class="steps"><span class="step done">01 Placed</span><span class="step ${o.status==="Processing"?"now":"done"}">02 Picked</span><span class="step ${o.status==="Shipped"||o.status==="Paid"?"done":""}">03 Shipped</span><span class="step ${o.status==="Paid"?"now":""}">04 Paid</span></div>
      <p class="muted mt-4">Ships from Zürich — Main (ZH-01). Courier collection at 16:30 on working days.</p></div>
    <div class="span-6">${secHead("25","Order activity")}<div class="timeline"><div class="tl-item"><strong>System</strong> <span class="muted">created order #${o.id} from ${o.channel.toLowerCase()} checkout</span><div class="caption">${o.date}</div></div><div class="tl-item hot"><strong>Lena Vogt</strong> <span class="muted">set status to ${o.status}</span><div class="caption">${o.date}</div></div></div></div>
  </div>`;
};

const invRow = [
  {t:"Invoice",v:r=>`<a href="#/invoices/${r.id}"><strong>${r.id}</strong></a>`},
  {t:"Order",v:r=>`<a href="#/orders/${r.order}">#${r.order}</a>`},
  {t:"Customer",v:r=>custById(r.customer).name},{t:"Issued",v:"date"},{t:"Due",v:"due"},
  {t:"Status",v:r=>badge(r.status)},{t:"Amount",v:r=>CHF(r.total),r:1}
];
SCREENS.invoices = () => `
  ${pageHead("09 — Invoices","Invoices", DATA.invoices.length+" invoices issued against listed orders. "+CHF(KPI.invoicesDue)+" still outstanding.", `<button class="btn" onclick="toast('Invoice form is a demo.')">New Invoice</button>`)}
  ${tabs(["All invoices","Paid","Due","Overdue","Refunded"],"All invoices")}
  <div class="mt-6">${table(invRow, DATA.invoices, {foot:`<td colspan="5">Total invoiced</td><td></td><td class="r">${CHF(KPI.invoicesTotal)}</td>`})}</div>
  <div class="row-between mt-4"><span class="caption">Terms: 14 days net</span>${pager(1,2)}</div>`;

SCREENS.invoiceDetail = (id) => {
  const inv = DATA.invoices.find(x=>x.id===id) || DATA.invoices[0];
  const o = DATA.orders.find(x=>x.id===inv.order); const c = custById(inv.customer); const items = lineItems(o);
  return `
  ${pageHead("09 — Invoices", "Invoice "+inv.id, `Issued ${inv.date} · due ${inv.due} · for order #${inv.order}.`, `<button class="btn btn-outline" onclick="toast('Invoice PDF downloaded (demo).')">Download PDF</button><button class="btn" onclick="toast('Reminder sent (demo).')">Send reminder</button>`)}
  <div class="grid">
    <div class="span-7">
      <div class="plate">
        <div class="row-between"><div><div class="micro">From</div><strong>Atelier Nord AG</strong><div class="caption">Geroldstrasse 5, 8005 Zürich<br>VAT CHE-204.881.517</div></div>
        <div style="text-align:right"><div class="micro">To</div><strong>${c.name}</strong><div class="caption">${c.city} · ${c.country}<br>Attn. ${c.contact}</div></div></div>
        <hr class="rule-thick mt-6 mb-4">
        ${table([{t:"Product",v:"name"},{t:"Qty",v:"q",r:1},{t:"Unit",v:r=>CHF(r.price),r:1},{t:"Sum",v:r=>CHF(r.sum),r:1}], items, {foot:`<td colspan="3">Total due</td><td class="r">${CHF(inv.total)}</td>`})}
        <p class="caption mt-4">Payable within 14 days to IBAN CH93 0076 2011 6238 5295 7. Prices include VAT 8.1%.</p>
      </div>
    </div>
    <div class="span-5">
      ${secHead("26","Payment state")}
      <div class="stack gap-3">
        <div class="index-row"><span>Status</span><span class="leader"></span>${badge(inv.status)}</div>
        <div class="index-row"><span>Issued</span><span class="leader"></span><strong>${inv.date}</strong></div>
        <div class="index-row"><span>Due</span><span class="leader"></span><strong>${inv.due}</strong></div>
        <div class="index-row"><span>Amount</span><span class="leader"></span><strong>${CHF(inv.total)}</strong></div>
      </div>
      <hr class="rule mt-6 mb-4">
      <p class="muted">Reminders are sent automatically on days 1, 7 and 14 after the due date. Overdue invoices pause new wholesale orders for the account.</p>
    </div>
  </div>`;
};

SCREENS.calendar = () => {
  const evs = {3:[["09:00","Courier — Keller AG"]],9:[["14:30","VAT review","red"]],12:[["10:00","Press demo — Studio Forma"]],18:[["08:00","Stock count ZH-01"]],24:[["09:00","Courier — Helvetia","red"],["16:30","Team review"]],27:[["11:00","Supplier call — Utzenstorf"]]};
  let cells = "";
  for(let d=-1; d<34; d++){
    const day = d+1; const inMonth = day>=1 && day<=30;
    const ev = inMonth && evs[day] ? evs[day].map(e=>`<div class="cal-ev ${e[2]||""}">${e[0]} ${e[1]}</div>`).join("") : "";
    cells += `<div class="cal-cell ${inMonth?"":"dim"} ${day===24?"today":""}"><span class="d">${inMonth?day:(day<1?30+day:day-30)}</span>${ev}</div>`;
  }
  return `
  ${pageHead("10 — Calendar","November 2026","Collections, stock counts and reviews for the whole operation, on one ruled sheet.", `<button class="btn btn-outline">← October</button><button class="btn">New Event</button>`)}
  <div class="cal"><div class="cal-head">${["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d=>`<div>${d}</div>`).join("")}</div><div class="cal-grid">${cells}</div></div>
  <div class="grid mt-8">
    <div class="span-6">${secHead("27","Next up")}${Object.entries(evs).slice(0,3).map(([d,list])=>list.map(e=>`<div class="index-row" style="padding:6px 0"><strong class="num">${d} Nov</strong><span>${e[1]}</span><span class="leader"></span><span class="num">${e[0]}</span></div>`).join("")).join("")}</div>
    <div class="span-6">${secHead("28","Legend")}<p class="muted">Red rule — money or deadlines. Ink rule — logistics and people. Today is boxed in red. The calendar is a table, like everything else in Raster.</p></div>
  </div>`;
};

SCREENS.tasks = () => {
  const cols = [
    ["To do", [["Wholesale","Reorder Riso Paper Cream 400 units","Aiko Tanaka","Fri"],["Studio","Shoot grid pads for catalogue 2027","Elif Yilmaz","Mon"]]],
    ["In progress", [["Finance","Fix VAT rate on invoice 2026-0891","Jonas Frei","Today"],["Support","Draft holding reply — Lyon press delay","Priya Nair","Today"]]],
    ["In review", [["Sales","Wholesale price list 2027 — final pass","Marco Steiner","Wed"],["Ops","Warehouse plan for December rush","Lena Vogt","Thu"]]],
    ["Done", [["Ops","Stock count — Bern satellite","Aiko Tanaka","Done"],["Studio","Poster A2 sent to print","Elif Yilmaz","Done"]]]
  ];
  return `
  ${pageHead("11 — Tasks","Board","Work in four ruled columns. Drag and drop is visual in this demo; the board is fully responsive.", `<button class="btn">New Task</button>`)}
  <div class="kanban">${cols.map(([name,cards],ci)=>`
    <div class="kb-col ${ci===1?"red":""}"><div class="kb-head"><span class="h3">${name}</span><span class="num-badge">${cards.length}</span></div>
    ${cards.map(([tag,t,who,due])=>`<div class="kb-card"><div class="micro ${ci===1?"red":""}">${tag}</div><div class="t">${t}</div><div class="row mt-3" style="justify-content:space-between">${avatar(who,"sm")}<span class="caption">${due}</span></div></div>`).join("")}
    <button class="btn btn-ghost btn-sm" onclick="toast('Task composer is a demo.')">+ Add task</button></div>`).join("")}
  </div>`;
};

SCREENS.messages = () => `
  ${pageHead("12 — Messages","Inbox", DATA.messages.filter(m=>m.unread).length+" unread of "+DATA.messages.length+" conversations.", `<button class="btn" onclick="toast('Composer is a demo.')">Compose</button>`)}
  <div class="inbox">
    <div class="inbox-list">${DATA.messages.map((m,i)=>`
      <button class="msg-row ${i===0?"active":""} ${m.unread?"unread":""}" onclick="document.querySelectorAll('.msg-row').forEach(x=>x.classList.remove('active'));this.classList.add('active')">
        <span class="row-between"><span class="from">${m.from}</span><span class="caption">${m.time}</span></span>
        <span style="display:block;font-weight:600" class="mt-2">${m.subject}</span>
        <span class="caption" style="display:block">${m.body.slice(0,72)}…</span>
        <span class="mt-2" style="display:block">${badge(m.tag)}</span>
      </button>`).join("")}
    </div>
    <div class="inbox-read">
      <div class="micro red">${DATA.messages[0].tag} — Internal</div>
      <h2 class="h2 mt-2">${DATA.messages[0].subject}</h2>
      <div class="row mt-4">${avatar(DATA.messages[0].from)}<div><strong>${DATA.messages[0].from}</strong><div class="caption">${DATA.messages[0].role} · Today ${DATA.messages[0].time}</div></div></div>
      <div class="thread-msg"><p>${DATA.messages[0].body}</p></div>
      <div class="thread-msg"><div class="row">${avatar("Aiko Tanaka")}<div><strong>Aiko Tanaka</strong><div class="caption">Warehouse Manager · 09:31</div></div></div><p class="mt-3">Warehouse can confirm Friday. Current grid pad stock is ${NUM(prodById(10).stock)} units after order 1031 — one more pallet is realistic.</p></div>
      <div class="f-group mt-6"><label class="f-label">Reply</label><textarea class="f-area" rows="3" placeholder="Write a reply…"></textarea></div>
      <button class="btn" onclick="toast('Reply sent (demo).')">Send reply</button>
    </div>
  </div>`;

SCREENS.notifications = () => `
  ${pageHead("13 — Notifications","Notifications","Everything that happened, newest first. Red squares need a decision.", `<button class="btn btn-outline" onclick="toast('All notifications marked read (demo).')">Mark all read</button>`)}
  <div style="max-width:760px">
  ${DATA.notifications.map(n=>`<div class="row" style="border-top:1px solid var(--line-soft);padding:14px 0;align-items:flex-start"><span class="${n.hot?"marker":"marker-hollow"}" style="margin-top:6px"></span><span style="flex:1"><span style="font-weight:${n.hot?800:500}">${n.text}</span></span><span class="caption" style="white-space:nowrap">${n.time}</span></div>`).join("")}
  </div>`;

const teamRow = [
  {t:"Member",v:r=>`<span class="row gap-3">${avatar(r.name)}<span><strong>${r.name}</strong><div class="caption">${r.email}</div></span></span>`},
  {t:"Role",v:"role"},{t:"Department",v:"dept"},{t:"Last active",v:"last"},{t:"Status",v:r=>badge(r.status)},
  {t:"",v:()=>`<button class="btn btn-sm btn-outline" onclick="toast('Member editor is a demo.')">Edit</button>`}
];
SCREENS.team = () => `
  ${pageHead("14 — Team","Team", DATA.team.length+" members, "+KPI.teamActive+" active. One invited, one suspended.", `<button class="btn" onclick="toast('Invite form is a demo.')">Invite Member</button>`)}
  ${table(teamRow, DATA.team)}
  <div class="grid mt-8">
    <div class="span-6">${secHead("29","Departments")}${["Operations","Sales","Logistics","Finance","Support","Studio"].map(d=>`<div class="index-row" style="padding:6px 0"><span>${d}</span><span class="leader"></span><strong>${DATA.team.filter(t=>t.dept===d).length}</strong></div>`).join("")}</div>
    <div class="span-6">${secHead("30","Seat usage")}${stat("Seats used", DATA.team.length+" / 10")}<div class="mt-3">${progress(80)}</div><p class="caption mt-2">Raster Business plan — 10 seats included.</p></div>
  </div>`;

SCREENS.roles = () => {
  const perms = [["View orders",1,1,1,0],["Create & edit orders",1,1,0,0],["Issue invoices",1,0,0,0],["Refund payments",1,0,0,0],["Manage products",1,1,1,0],["Adjust stock",1,0,1,0],["Manage team",1,0,0,0],["API access",1,0,0,0],["Export reports",1,1,0,1]];
  const cell = v => v ? `<span class="marker" title="Allowed"></span>` : `<span class="faint">—</span>`;
  return `
  ${pageHead("15 — Access","Roles & Permissions","Four roles. A red square means the permission is granted; a dash means it is not.", `<button class="btn" onclick="toast('Role editor is a demo.')">New Role</button>`)}
  ${table([{t:"Permission",v:"p"},{t:"Admin",v:r=>cell(r.v[0])},{t:"Sales",v:r=>cell(r.v[1])},{t:"Warehouse",v:r=>cell(r.v[2])},{t:"Support",v:r=>cell(r.v[3])}], perms.map(p=>({p:p[0], v:p.slice(1)})))}
  <div class="grid mt-8">
    ${[["Admin","Full access, including billing and API keys.","1 member"],["Sales","Orders and customers; no refunds, no stock.","2 members"],["Warehouse","Stock and fulfilment; no prices, no invoices.","1 member"],["Support","Tickets and read-only orders.","1 member"]].map((r,i)=>`<div class="span-3"><div class="stat"><div class="micro">Role 0${i+1}</div><div class="num-lg" style="font-size:22px">${r[0]}</div><p class="caption mt-2">${r[1]}</p><div class="mt-2">${badge(r[2])}</div></div></div>`).join("")}
  </div>`;
};

SCREENS.files = () => `
  ${pageHead("16 — Files","Files", DATA.files.length+" files in the shared library. Set as plates, not rounded cards.", `<button class="btn" onclick="toast('Upload is a demo.')">Upload</button>`)}
  <div class="upload mb-6"><div class="h3">Drop files here</div><div class="caption mt-2">PDF, CSV, SVG, ZIP — max 25 MB per file</div></div>
  <div class="file-grid">${DATA.files.map(f=>`
    <div class="file-plate"><div class="file-glyph">${f.kind}</div>
      <div class="mt-4"><strong>${f.name}</strong></div>
      <div class="caption">${f.size} · ${f.by}</div>
      <div class="row-between mt-3"><span class="caption">${f.when} 2026</span><button class="btn btn-sm btn-outline" onclick="toast('Download started (demo).')">Get</button></div>
    </div>`).join("")}
  </div>`;

SCREENS.tickets = () => `
  ${pageHead("17 — Support","Tickets", KPI.openTickets+" open of "+DATA.tickets.length+". The Lyon press-bed delay is the sensitive one.", `<button class="btn" onclick="toast('Ticket form is a demo.')">New Ticket</button>`)}
  ${tabs(["All tickets","Open","In progress","Resolved"],"All tickets")}
  <div class="mt-6">${table([
    {t:"Ticket",v:r=>`<strong>#${r.id}</strong>`},{t:"Subject",v:r=>`<strong>${r.subject}</strong>`},
    {t:"Customer",v:r=>custById(r.customer).name},{t:"Priority",v:r=>badge(r.priority)},
    {t:"Age",v:"age"},{t:"Status",v:r=>badge(r.status)},
    {t:"",v:()=>`<button class="btn btn-sm btn-outline" onclick="toast('Ticket view is a demo.')">Open</button>`}
  ], DATA.tickets)}</div>`;

SCREENS.warehouses = () => `
  ${pageHead("18 — Logistics","Warehouses","Four locations, "+NUM(sum(DATA.warehouses,w=>w.items))+" units between them.", "")}
  ${table([{t:"Code",v:r=>`<strong>${r.code}</strong>`},{t:"Warehouse",v:"name"},{t:"Units",v:r=>NUM(r.items),r:1},
    {t:"Utilisation",v:r=>`<span style="display:inline-block;width:140px;vertical-align:middle">${progress(r.util, r.util>75)}</span> ${r.util}%`,r:1},
    {t:"Status",v:r=>badge(r.status)}], DATA.warehouses)}
  <div class="mt-8">${secHead("31","Stock by product — Zürich main")}
    ${table(prodRow.slice(1,6), DATA.products.slice(0,8))}
  </div>`;

SCREENS.suppliers = () => `
  ${pageHead("19 — Logistics","Suppliers","Four suppliers feed the catalogue. Lead times are working days from order confirmation.", `<button class="btn" onclick="toast('Supplier form is a demo.')">New Supplier</button>`)}
  ${table([{t:"Supplier",v:r=>`<strong>${r.name}</strong>`},{t:"Country",v:"country"},{t:"Lead time",v:"lead"},{t:"Product lines",v:"products",r:1},{t:"Rating",v:r=>`<span class="stars">${"★".repeat(r.rating)}<span class="off">${"★".repeat(5-r.rating)}</span></span>`}], DATA.suppliers)}
  <div class="mt-8">${secHead("32","Reorder watch")}<p class="muted" style="max-width:640px">Red 306 ink (Farbenwerk Leipzig, 9 days) and the proofing press bed (Metallgiesserei Aarau, 14 days) are the two lines where lead time exceeds remaining cover. Both are flagged on the Operations dashboard.</p></div>`;
