/* RASTER — demo dataset. One fictional tenant: Atelier Nord AG, Zürich,
   a design-supplies distributor. Every KPI in the product is COMPUTED from
   these tables, so totals reconcile across all 48 screens. */
"use strict";
const CHF = n => "CHF " + n.toLocaleString("de-CH",{minimumFractionDigits:2,maximumFractionDigits:2});
const NUM = n => n.toLocaleString("de-CH");
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const DATA = {
  company:{name:"Atelier Nord AG",city:"Zürich",founded:1962,vat:"CHE-204.881.517",plan:"Raster Business"},
  user:{name:"Lena Vogt",role:"Operations Lead",initials:"LV",email:"lena.vogt@ateliernord.ch"},
  revenueByMonth:[182400,196200,208750,194300,221480,238900,229150,214600,246320,258940,271380,289650],
  ordersByMonth:[412,438,461,447,489,512,498,471,526,548,571,596],
  visitorsByMonth:[28400,30120,33850,31240,35980,38420,36710,34980,39640,41280,43890,46120],
  customers:[
    {id:1,name:"Bürohaus Keller AG",contact:"Martina Keller",city:"Zürich",country:"CH",segment:"Wholesale",orders:34,spent:486200,status:"Active",since:2019},
    {id:2,name:"Papeterie Rüegg",contact:"Jonas Rüegg",city:"Bern",country:"CH",segment:"Retail",orders:21,spent:148350,status:"Active",since:2020},
    {id:3,name:"Studio Forma GmbH",contact:"Alba Ferreri",city:"Milan",country:"IT",segment:"Studio",orders:17,spent:96480,status:"Active",since:2021},
    {id:4,name:"Atelier Bois SARL",contact:"Claire Dubois",city:"Lyon",country:"FR",segment:"Studio",orders:12,spent:61240,status:"Active",since:2022},
    {id:5,name:"Nordlicht Verlag",contact:"Finn Aasen",city:"Oslo",country:"NO",segment:"Publishing",orders:26,spent:203910,status:"Active",since:2018},
    {id:6,name:"Grafikwerk Hamburg",contact:"Petra Lindner",city:"Hamburg",country:"DE",segment:"Wholesale",orders:29,spent:312670,status:"Active",since:2019},
    {id:7,name:"Casa Papel SL",contact:"Lucía Ferrer",city:"Barcelona",country:"ES",segment:"Retail",orders:9,spent:38420,status:"Dormant",since:2023},
    {id:8,name:"Helvetia Print SA",contact:"Marc Aubert",city:"Geneva",country:"CH",segment:"Wholesale",orders:41,spent:598300,status:"Active",since:2017},
    {id:9,name:"Kantoor & Co BV",contact:"Sanne de Vries",city:"Amsterdam",country:"NL",segment:"Retail",orders:14,spent:72960,status:"Active",since:2021},
    {id:10,name:"Fjell Paper AS",contact:"Ingrid Moe",city:"Bergen",country:"NO",segment:"Wholesale",orders:18,spent:121540,status:"Active",since:2020},
    {id:11,name:"Officina Carta Srl",contact:"Davide Riva",city:"Turin",country:"IT",segment:"Retail",orders:7,spent:21980,status:"Dormant",since:2024},
    {id:12,name:"Bureau Moderne SA",contact:"Hugo Lambert",city:"Brussels",country:"BE",segment:"Studio",orders:11,spent:54310,status:"Active",since:2022}
  ],
  products:[
    {id:1,sku:"PAP-1100",name:"Riso Paper A3 — Cream 120gsm",cat:"Paper",price:24.50,stock:1840,cost:13.10,status:"In stock"},
    {id:2,sku:"PAP-1140",name:"Riso Paper A3 — Swiss Red 120gsm",cat:"Paper",price:26.00,stock:620,cost:14.20,status:"In stock"},
    {id:3,sku:"INK-2205",name:"Letterpress Ink — Black 1kg",cat:"Ink",price:48.00,stock:312,cost:27.50,status:"In stock"},
    {id:4,sku:"INK-2213",name:"Letterpress Ink — Red 306 1kg",cat:"Ink",price:52.00,stock:48,cost:30.10,status:"Low stock"},
    {id:5,sku:"PRS-3010",name:"Proofing Press Bed 50×70",cat:"Presses",price:1890.00,stock:6,cost:1240.00,status:"Low stock"},
    {id:6,sku:"TLS-4102",name:"Type Case — Helvetica 12pt",cat:"Type",price:340.00,stock:23,cost:198.00,status:"In stock"},
    {id:7,sku:"TLS-4155",name:"Composing Stick — Steel 30cm",cat:"Tools",price:64.00,stock:145,cost:31.00,status:"In stock"},
    {id:8,sku:"BND-5080",name:"Book Cloth — Linen Black",cat:"Binding",price:38.50,stock:0,cost:21.40,status:"Out of stock"},
    {id:9,sku:"BND-5091",name:"Headband Tape — Red/White",cat:"Binding",price:9.80,stock:930,cost:4.10,status:"In stock"},
    {id:10,sku:"PAP-1220",name:"Grid Pad A4 — 5mm Raster",cat:"Paper",price:12.50,stock:2210,cost:5.60,status:"In stock"},
    {id:11,sku:"PAP-1231",name:"Tracing Pad A3 — 90gsm",cat:"Paper",price:18.90,stock:480,cost:8.90,status:"In stock"},
    {id:12,sku:"INK-2301",name:"Screen Ink — Opaque White 1kg",cat:"Ink",price:44.00,stock:167,cost:25.80,status:"In stock"},
    {id:13,sku:"TLS-4207",name:"Bone Folder — Boxwood",cat:"Tools",price:16.50,stock:356,cost:7.20,status:"In stock"},
    {id:14,sku:"PRS-3120",name:"Galley Tray — Zinc 40×30",cat:"Presses",price:92.00,stock:39,cost:52.00,status:"In stock"}
  ],
  orders:[
    {id:1042,customer:8,date:"2026-11-24",items:[{p:1,q:400},{p:3,q:24}],status:"Paid",channel:"Wholesale"},
    {id:1041,customer:1,date:"2026-11-24",items:[{p:10,q:300},{p:9,q:120}],status:"Paid",channel:"Wholesale"},
    {id:1040,customer:6,date:"2026-11-23",items:[{p:5,q:1},{p:6,q:2}],status:"Shipped",channel:"Wholesale"},
    {id:1039,customer:5,date:"2026-11-23",items:[{p:2,q:250},{p:4,q:12}],status:"Paid",channel:"Direct"},
    {id:1038,customer:2,date:"2026-11-22",items:[{p:10,q:80},{p:13,q:40}],status:"Paid",channel:"Retail"},
    {id:1037,customer:10,date:"2026-11-22",items:[{p:1,q:180},{p:12,q:20}],status:"Processing",channel:"Wholesale"},
    {id:1036,customer:3,date:"2026-11-21",items:[{p:11,q:60},{p:7,q:15}],status:"Paid",channel:"Direct"},
    {id:1035,customer:9,date:"2026-11-21",items:[{p:10,q:140},{p:2,q:60}],status:"Shipped",channel:"Retail"},
    {id:1034,customer:12,date:"2026-11-20",items:[{p:6,q:1},{p:14,q:4}],status:"Paid",channel:"Direct"},
    {id:1033,customer:4,date:"2026-11-20",items:[{p:3,q:18},{p:9,q:90}],status:"Cancelled",channel:"Direct"},
    {id:1032,customer:1,date:"2026-11-19",items:[{p:1,q:220},{p:4,q:8}],status:"Paid",channel:"Wholesale"},
    {id:1031,customer:8,date:"2026-11-19",items:[{p:10,q:500},{p:13,q:60}],status:"Paid",channel:"Wholesale"},
    {id:1030,customer:7,date:"2026-11-18",items:[{p:11,q:35},{p:9,q:50}],status:"Refunded",channel:"Retail"},
    {id:1029,customer:6,date:"2026-11-18",items:[{p:2,q:300},{p:3,q:30}],status:"Paid",channel:"Wholesale"},
    {id:1028,customer:11,date:"2026-11-17",items:[{p:10,q:45},{p:7,q:10}],status:"Paid",channel:"Retail"},
    {id:1027,customer:5,date:"2026-11-17",items:[{p:14,q:6},{p:12,q:14}],status:"Processing",channel:"Direct"}
  ],
  team:[
    {id:1,name:"Lena Vogt",role:"Operations Lead",dept:"Operations",email:"lena.vogt@ateliernord.ch",status:"Active",last:"2 min ago"},
    {id:2,name:"Marco Steiner",role:"Sales Director",dept:"Sales",email:"marco.steiner@ateliernord.ch",status:"Active",last:"14 min ago"},
    {id:3,name:"Aiko Tanaka",role:"Warehouse Manager",dept:"Logistics",email:"aiko.tanaka@ateliernord.ch",status:"Active",last:"1 h ago"},
    {id:4,name:"Jonas Frei",role:"Accountant",dept:"Finance",email:"jonas.frei@ateliernord.ch",status:"Active",last:"3 h ago"},
    {id:5,name:"Priya Nair",role:"Support Lead",dept:"Support",email:"priya.nair@ateliernord.ch",status:"Active",last:"26 min ago"},
    {id:6,name:"Tomás Rivera",role:"Sales Rep — Iberia",dept:"Sales",email:"tomas.rivera@ateliernord.ch",status:"Invited",last:"—"},
    {id:7,name:"Elif Yilmaz",role:"Designer",dept:"Studio",email:"elif.yilmaz@ateliernord.ch",status:"Active",last:"48 min ago"},
    {id:8,name:"Noah Berger",role:"Developer",dept:"Studio",email:"noah.berger@ateliernord.ch",status:"Suspended",last:"2 d ago"}
  ],
  tickets:[
    {id:318,subject:"Red 306 ink arrived with broken seals",customer:3,priority:"High",status:"Open",age:"2 h"},
    {id:317,subject:"Invoice 2026-0891 shows wrong VAT rate",customer:5,priority:"Medium",status:"Open",age:"5 h"},
    {id:316,subject:"Press bed delivery delayed to Lyon",customer:4,priority:"High",status:"In progress",age:"1 d"},
    {id:315,subject:"Grid pads: 5mm vs 4mm raster question",customer:9,priority:"Low",status:"Open",age:"1 d"},
    {id:314,subject:"Wholesale price list 2027 request",customer:6,priority:"Medium",status:"In progress",age:"2 d"},
    {id:313,subject:"Damaged type case, corner crushed",customer:12,priority:"Medium",status:"Resolved",age:"3 d"},
    {id:312,subject:"Book cloth black — restock date?",customer:2,priority:"Low",status:"Resolved",age:"4 d"}
  ],
  messages:[
    {id:1,from:"Marco Steiner",role:"Sales Director",subject:"Q4 wholesale push — grid pads moving fast",body:"Lena — the 5mm grid pads are outselling every other paper line this quarter. Helvetia Print alone took 500 units on Tuesday. I want a second pallet allocated before the December rush. Can warehouse confirm by Friday?",time:"09:12",unread:true,tag:"Sales"},
    {id:2,from:"Aiko Tanaka",role:"Warehouse Manager",subject:"Red 306 ink down to 48 units",body:"Stock alert: Letterpress Ink Red 306 is at 48 units, below the reorder line. Studio Forma already flagged broken seals on the last batch (ticket 318). Recommend we reorder 200 units and quarantine the current lot.",time:"08:47",unread:true,tag:"Stock"},
    {id:3,from:"Helvetia Print SA",role:"Customer",subject:"Re: Order 1042 confirmed",body:"Thank you for confirming order 1042. Please hold the A3 cream paper at the dock for our courier on Thursday morning. Invoice copy received and passed to accounting.",time:"Yesterday",unread:false,tag:"Orders"},
    {id:4,from:"Jonas Frei",role:"Accountant",subject:"November VAT reconciliation",body:"The November VAT file is ready for review. Two invoices carry the reduced rate incorrectly — 2026-0891 is one of them. I have flagged both in the billing queue.",time:"Yesterday",unread:false,tag:"Finance"},
    {id:5,from:"Priya Nair",role:"Support Lead",subject:"Ticket load this week",body:"Seven open tickets, two high priority. The Lyon press-bed delay is the sensitive one — Atelier Bois is a small studio and the press is their only machine. I have drafted a holding reply.",time:"Mon",unread:false,tag:"Support"}
  ],
  notifications:[
    {id:1,text:"Order 1042 paid — CHF 10,952.00 from Helvetia Print SA",time:"12 min ago",hot:true},
    {id:2,text:"Low stock: Letterpress Ink — Red 306 (48 units left)",time:"1 h ago",hot:true},
    {id:3,text:"New ticket 318 — broken seals on ink shipment",time:"2 h ago",hot:false},
    {id:4,text:"Marco Steiner mentioned you in «Q4 wholesale push»",time:"3 h ago",hot:false},
    {id:5,text:"Invoice 2026-0863 is 6 days overdue (Kantoor & Co BV)",time:"5 h ago",hot:true},
    {id:6,text:"Weekly report «November revenue» finished generating",time:"Yesterday",hot:false},
    {id:7,text:"Tomás Rivera accepted his team invitation",time:"Yesterday",hot:false}
  ],
  activity:[
    {who:"Lena Vogt",what:"changed order 1037 status to Processing",when:"09:41",hot:false},
    {who:"Jonas Frei",what:"issued invoice 2026-0912 for order 1042",when:"09:15",hot:false},
    {who:"System",what:"flagged Letterpress Ink — Red 306 as low stock",when:"08:47",hot:true},
    {who:"Priya Nair",what:"replied to ticket 318 (Studio Forma GmbH)",when:"08:20",hot:false},
    {who:"Marco Steiner",what:"exported report «November revenue» as PDF",when:"Yesterday 17:02",hot:false},
    {who:"Aiko Tanaka",what:"adjusted stock of Grid Pad A4 by −500 (order 1031)",when:"Yesterday 15:44",hot:false},
    {who:"System",what:"created backup snapshot raster-2026-11-24",when:"Yesterday 03:00",hot:false}
  ],
  files:[
    {name:"Price-List-2027.pdf",kind:"PDF",size:"2.4 MB",by:"Marco Steiner",when:"24 Nov"},
    {name:"Catalogue-Grid-2026.pdf",kind:"PDF",size:"18.1 MB",by:"Elif Yilmaz",when:"21 Nov"},
    {name:"VAT-November-2026.xlsx",kind:"XLS",size:"412 KB",by:"Jonas Frei",when:"24 Nov"},
    {name:"Warehouse-Plan-ZH.svg",kind:"SVG",size:"96 KB",by:"Aiko Tanaka",when:"19 Nov"},
    {name:"Press-Bed-Manual.pdf",kind:"PDF",size:"6.8 MB",by:"Noah Berger",when:"12 Nov"},
    {name:"Brand-Poster-A2.pdf",kind:"PDF",size:"9.3 MB",by:"Elif Yilmaz",when:"08 Nov"},
    {name:"Customers-Export.csv",kind:"CSV",size:"88 KB",by:"Lena Vogt",when:"22 Nov"},
    {name:"Ink-Safety-Sheets.zip",kind:"ZIP",size:"1.1 MB",by:"Priya Nair",when:"15 Nov"}
  ],
  warehouses:[
    {name:"Zürich — Main",code:"ZH-01",items:5214,util:82,status:"Operational"},
    {name:"Bern — Satellit",code:"BE-02",items:1187,util:54,status:"Operational"},
    {name:"Milan — Partner Depot",code:"MI-03",items:764,util:37,status:"Operational"},
    {name:"Lyon — Partner Depot",code:"LY-04",items:402,util:21,status:"Maintenance"}
  ],
  suppliers:[
    {name:"Papierfabrik Utzenstorf",country:"CH",lead:"6 days",products:5,rating:5},
    {name:"Farbenwerk Leipzig GmbH",country:"DE",lead:"9 days",products:4,rating:4},
    {name:"Metallgiesserei Aarau",country:"CH",lead:"14 days",products:3,rating:5},
    {name:"Tessuti di Biella Srl",country:"IT",lead:"11 days",products:2,rating:4}
  ]
};

/* Derived, reconciling figures */
const prodById = id => DATA.products.find(p=>p.id===id);
const custById = id => DATA.customers.find(c=>c.id===id);
const orderTotal = o => o.items.reduce((s,it)=>s + prodById(it.p).price*it.q, 0);
DATA.orders.forEach(o=>{ o.total = orderTotal(o); });
DATA.invoices = DATA.orders.filter(o=>o.status!=="Cancelled").map((o,i)=>({
  id:"2026-" + String(912-i*7).padStart(4,"0"), order:o.id, customer:o.customer, date:o.date,
  due: o.date.replace(/-\d\d$/,"-28"), total:o.total,
  status: o.status==="Paid" ? "Paid" : (o.status==="Refunded" ? "Refunded" : (i%4===3 ? "Overdue" : "Due"))
}));
const sum = (arr,f) => arr.reduce((s,x)=>s+f(x),0);
const KPI = {
  revenueYear: sum(DATA.revenueByMonth, x=>x),
  revenueMonth: DATA.revenueByMonth[11],
  ordersMonth: DATA.ordersByMonth[11],
  ordersTotal: sum(DATA.orders, o=>o.total),
  invoicesTotal: sum(DATA.invoices, i=>i.total),
  invoicesDue: sum(DATA.invoices.filter(i=>i.status==="Due"||i.status==="Overdue"), i=>i.total),
  customers: DATA.customers.length,
  customersActive: DATA.customers.filter(c=>c.status==="Active").length,
  products: DATA.products.length,
  stockUnits: sum(DATA.products, p=>p.stock),
  lowStock: DATA.products.filter(p=>p.status!=="In stock").length,
  openTickets: DATA.tickets.filter(t=>t.status!=="Resolved").length,
  teamActive: DATA.team.filter(t=>t.status==="Active").length,
  lifetimeOrders: sum(DATA.customers, c=>c.orders),
  lifetimeSpent: sum(DATA.customers, c=>c.spent)
};
