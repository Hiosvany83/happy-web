/* ============================================================
   Reconly — Dataset (fictional)
   ONE dataset for all 38 screens. Every KPI, table and chart
   is computed from these arrays — numbers reconcile by design:
   October revenue − expenses = net; category spend sums to
   total expenses; department actuals sum to the same total;
   open invoices sum to AR outstanding; the approvals queue
   sums to its headline total. No real companies or people.
   ============================================================ */

const DATA = {
  meta: {
    product: "Reconly",
    version: "1.0.0",
    workspace: "Arcadia Systems",
    workspacePlan: "Scale",
    currency: "USD",
    today: "Tue, Nov 11, 2026",
    monthLabel: "October 2026",
    closeLabel: "October close · 6 of 8 tasks"
  },

  /* ---------------- Headline metrics (Oct 2026) ---------------- */
  headline: {
    cash: 1284600, cashOperating: 986300, cashMoneyMarket: 298300,
    mrr: 386400, mrrPrev: 379800, arr: 4636800,
    revenueOct: 412850, expensesOct: 356220,
    avgNetBurnQ3: 41320, runwayMonths: 31.1,
    autoMatchRate: 94.2, docsProcessedOct: 1847,
    aiSpendOct: 8940, aiTokensM: 96.4,
    taxCollectedOct: 31260, closePct: 75
  },

  /* ---------------- 12-month series (Nov 2025 – Oct 2026) ---------------- */
  series12: {
    months: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    revenue:  [301200, 309800, 315400, 322100, 330600, 339200, 347500, 356900, 371850, 379300, 388650, 412850],
    expenses: [338900, 344200, 349800, 355100, 361400, 366800, 372300, 378900, 416050, 419100, 428610, 356220],
    cash:     [1558930, 1524530, 1490130, 1457130, 1426330, 1398730, 1373930, 1351930, 1307730, 1267930, 1227970, 1284600],
    mrr:      [318900, 324500, 329800, 334200, 339750, 345100, 351600, 358900, 366400, 372950, 379800, 386400]
  },
  mrrMovement: { start: 379800, newBiz: 14250, expansion: 6480, contraction: 3215, churned: 10915, end: 386400, nrr: 104.2, grossChurnPct: 2.9 },

  /* ---------------- Spend categories (sum = October expenses) ---------------- */
  spendCategories: [
    { name: "Payroll & benefits", amount: 218400, deltaPct: -1.2, color: "#10b981" },
    { name: "Cloud & infrastructure", amount: 41260, deltaPct: 6.8, color: "#38bdf8" },
    { name: "Marketing & growth", amount: 31540, deltaPct: 3.1, color: "#f59e0b" },
    { name: "Software & SaaS tools", amount: 23870, deltaPct: 1.4, color: "#8b5cf6" },
    { name: "Contractors", amount: 18900, deltaPct: -4.6, color: "#f472b6" },
    { name: "Rent & operations", amount: 12750, deltaPct: 0.0, color: "#facc15" },
    { name: "Travel & events", amount: 6320, deltaPct: 12.4, color: "#fb7185" },
    { name: "Other", amount: 3180, deltaPct: -2.0, color: "#94a3b8" }
  ],

  /* ---------------- Departments & budgets (actuals sum = October expenses) ---------------- */
  departments: [
    { id: "d-eng", name: "Engineering", budget: 168000, actual: 161340, headcount: 41, lead: "Kenji Watanabe" },
    { id: "d-sales", name: "Sales & Marketing", budget: 74500, actual: 71280, headcount: 17, lead: "Alex Duarte" },
    { id: "d-ga", name: "G&A", budget: 58200, actual: 55910, headcount: 7, lead: "Dana Whitfield" },
    { id: "d-product", name: "Product & Design", budget: 41800, actual: 39470, headcount: 9, lead: "Nora Fields" },
    { id: "d-cs", name: "Customer Success", budget: 30400, actual: 28220, headcount: 12, lead: "Sara Lindqvist" }
  ],

  payroll: {
    totalOct: 218400, headcount: 86, nextRun: "Nov 28, 2026", nextRunEst: 221900, employerTaxesOct: 16980,
    byDept: [
      { dept: "Engineering", people: 41, amount: 118600 },
      { dept: "Sales", people: 17, amount: 44300 },
      { dept: "Customer Success", people: 12, amount: 24900 },
      { dept: "Product & Design", people: 9, amount: 21400 },
      { dept: "G&A", people: 7, amount: 9200 }
    ]
  },

  /* ---------------- Customers (accounts receivable) ---------------- */
  customers: [
    { id: "c-northwind", name: "Northwind Retail", contact: "Elena Marsh", email: "ap@northwindretail.com", terms: "Net 30", billedYtd: 214600, outstanding: 35300, since: "Mar 2024", segment: "Retail" },
    { id: "c-helios", name: "Helios Energy", contact: "Ravi Anand", email: "finance@heliosenergy.com", terms: "Net 30", billedYtd: 168200, outstanding: 12950, since: "Jan 2024", segment: "Energy" },
    { id: "c-vantage", name: "Vantage Media", contact: "Tom Becker", email: "tom@vantage.media", terms: "Net 14", billedYtd: 121450, outstanding: 23470, since: "Jun 2024", segment: "Media" },
    { id: "c-corelink", name: "Corelink Health", contact: "Ivy Chen", email: "ap@corelinkhealth.com", terms: "Net 30", billedYtd: 98700, outstanding: 15720, since: "Feb 2025", segment: "Health" },
    { id: "c-bluepeak", name: "Bluepeak Logistics", contact: "Jonas Weber", email: "jonas@bluepeak.co", terms: "Net 30", billedYtd: 76300, outstanding: 9840, since: "Sep 2024", segment: "Logistics" },
    { id: "c-marina", name: "Marina Foods Group", contact: "Grace Liu", email: "grace@marinafoods.com", terms: "Net 30", billedYtd: 54900, outstanding: 4980, since: "May 2025", segment: "Food" },
    { id: "c-quantia", name: "Quantia", contact: "Mia Park", email: "finance@quantia.ai", terms: "Net 14", billedYtd: 88250, outstanding: 8450, since: "Nov 2024", segment: "AI" },
    { id: "c-ferrous", name: "Ferrous Labs", contact: "Oscar Hale", email: "oscar@ferrouslabs.com", terms: "Net 30", billedYtd: 41600, outstanding: 11480, since: "Dec 2024", segment: "Dev Tools" },
    { id: "c-alto", name: "Alto Studio", contact: "Zoe Adams", email: "zoe@alto.studio", terms: "Net 14", billedYtd: 28400, outstanding: 5270, since: "Apr 2025", segment: "Design" },
    { id: "c-greenfield", name: "Greenfield Legal", contact: "Leo Brandt", email: "leo@greenfield.legal", terms: "Net 30", billedYtd: 31200, outstanding: 13960, since: "Jul 2025", segment: "Legal" }
  ],

  /* ---------------- Invoices (AR). Open + overdue sum to $141,420; overdue = $37,450 (4) ----------------
     status: open | overdue | paid | draft */
  invoices: [
    { id: "INV-2050", customer: "Quantia", amount: 8450, issued: "Nov 5, 2026", due: "Dec 5, 2026", status: "open", desc: "Platform subscription — Q1", method: "ACH" },
    { id: "INV-2049", customer: "Northwind Retail", amount: 16900, issued: "Nov 2, 2026", due: "Dec 2, 2026", status: "open", desc: "Usage — October", method: "ACH" },
    { id: "INV-2048", customer: "Greenfield Legal", amount: 13960, issued: "Oct 31, 2026", due: "Nov 30, 2026", status: "open", desc: "Platform subscription — annual", method: "Card" },
    { id: "INV-2047", customer: "Bluepeak Logistics", amount: 9840, issued: "Oct 30, 2026", due: "Nov 29, 2026", status: "open", desc: "Implementation — phase 2", method: "ACH" },
    { id: "INV-2046", customer: "Northwind Retail", amount: 18400, issued: "Oct 28, 2026", due: "Nov 27, 2026", status: "open", desc: "Platform subscription — annual", method: "ACH" },
    { id: "INV-2045", customer: "Helios Energy", amount: 12950, issued: "Oct 27, 2026", due: "Nov 26, 2026", status: "open", desc: "Usage — October", method: "ACH" },
    { id: "INV-2042", customer: "Vantage Media", amount: 23470, issued: "Oct 25, 2026", due: "Nov 24, 2026", status: "open", desc: "Platform subscription — annual", method: "Wire" },
    { id: "INV-2040", customer: "Alto Studio", amount: 5270, issued: "Oct 8, 2026", due: "Nov 7, 2026", status: "overdue", desc: "Usage — September", method: "Card" },
    { id: "INV-2037", customer: "Ferrous Labs", amount: 11480, issued: "Oct 2, 2026", due: "Nov 1, 2026", status: "overdue", desc: "Platform subscription — annual", method: "ACH" },
    { id: "INV-2036", customer: "Marina Foods Group", amount: 4980, issued: "Sep 29, 2026", due: "Oct 29, 2026", status: "overdue", desc: "Onboarding & training", method: "ACH" },
    { id: "INV-2039", customer: "Corelink Health", amount: 15720, issued: "Sep 24, 2026", due: "Oct 24, 2026", status: "overdue", desc: "Platform subscription — annual", method: "ACH", lines: [
      { item: "Platform subscription — annual (120 seats)", qty: 1, price: 12000 },
      { item: "Implementation & data migration", qty: 1, price: 2940 },
      { item: "Usage overage — September", qty: 1, price: 780 }
    ] },
    { id: "INV-2035", customer: "Helios Energy", amount: 21300, issued: "Sep 20, 2026", due: "Oct 20, 2026", status: "paid", desc: "Platform subscription — annual", method: "ACH" },
    { id: "INV-2034", customer: "Vantage Media", amount: 17850, issued: "Sep 18, 2026", due: "Oct 18, 2026", status: "paid", desc: "Usage — September", method: "Wire" },
    { id: "INV-2033", customer: "Northwind Retail", amount: 26400, issued: "Sep 15, 2026", due: "Oct 15, 2026", status: "paid", desc: "Platform subscription — annual", method: "ACH" },
    { id: "INV-2032", customer: "Corelink Health", amount: 9620, issued: "Sep 11, 2026", due: "Oct 11, 2026", status: "paid", desc: "Usage — August", method: "ACH" },
    { id: "INV-2051", customer: "Marina Foods Group", amount: 6300, issued: "—", due: "—", status: "draft", desc: "Expansion — 40 seats", method: "ACH" }
  ],

  /* ---------------- Bills (AP) ----------------
     status: due | scheduled | paid | approval */
  bills: [
    { id: "BILL-3118", vendor: "Google Workspace", amount: 2870, due: "Nov 13, 2026", status: "due", category: "Software & SaaS tools", confidence: 99, matched: "Auto-matched · PO-1042" },
    { id: "BILL-3121", vendor: "Amazon Web Services", amount: 18940, due: "Nov 14, 2026", status: "due", category: "Cloud & infrastructure", confidence: 97, matched: "Auto-matched · usage report" },
    { id: "BILL-3119", vendor: "Deel", amount: 890, due: "Nov 14, 2026", status: "due", category: "Payroll & benefits", confidence: 98, matched: "Auto-matched · Oct payroll" },
    { id: "BILL-3122", vendor: "Datadog", amount: 3420, due: "Nov 15, 2026", status: "due", category: "Cloud & infrastructure", confidence: 96, matched: "Auto-matched · usage report" },
    { id: "BILL-3123", vendor: "Harbor Point Offices", amount: 8480, due: "Nov 15, 2026", status: "due", category: "Rent & operations", confidence: 100, matched: "Recurring · lease" },
    { id: "BILL-3120", vendor: "Slack", amount: 1540, due: "Nov 15, 2026", status: "due", category: "Software & SaaS tools", confidence: 99, matched: "Auto-matched · 118 seats" },
    { id: "BILL-3124", vendor: "Figma", amount: 1890, due: "Nov 16, 2026", status: "due", category: "Software & SaaS tools", confidence: 98, matched: "Auto-matched · 14 seats" },
    { id: "BILL-3125", vendor: "HubSpot", amount: 4150, due: "Nov 17, 2026", status: "due", category: "Software & SaaS tools", confidence: 95, matched: "Auto-matched · renewal" },
    { id: "BILL-3126", vendor: "GitHub", amount: 1260, due: "Nov 24, 2026", status: "scheduled", category: "Software & SaaS tools", confidence: 99, matched: "Auto-matched · 60 seats" },
    { id: "BILL-3127", vendor: "Linear", amount: 640, due: "Nov 26, 2026", status: "scheduled", category: "Software & SaaS tools", confidence: 99, matched: "Auto-matched · 32 seats" },
    { id: "BILL-3112", vendor: "Notion", amount: 720, due: "Nov 4, 2026", status: "paid", category: "Software & SaaS tools", confidence: 99, matched: "Auto-matched · 72 seats" }
  ],

  /* ---------------- Approvals queue (sums to $31,940) ---------------- */
  approvals: [
    { id: "APR-209", title: "AWS true-up — October overage", requester: "Kenji Watanabe", amount: 12400, age: "2 h", risk: "high", aiNote: "Usage +18% vs September. Two untagged instances account for $3,940 — tagging recommended before approval." },
    { id: "APR-208", title: "HubSpot annual renewal", requester: "Alex Duarte", amount: 6850, age: "5 h", risk: "medium", aiNote: "Renewal is +9% vs last year. 11 of 40 seats were inactive in October — a 29-seat plan would save $1,870/yr." },
    { id: "APR-207", title: "Datadog overage — log ingestion", requester: "Kenji Watanabe", amount: 4320, age: "8 h", risk: "medium", aiNote: "Log volume doubled after the Oct 28 deploy. Matches the incident window; no anomaly pattern." },
    { id: "APR-206", title: "Contractor invoice — brand project", requester: "Nora Fields", amount: 2980, age: "1 d", risk: "low", aiNote: "Matches SOW-14 milestones 1–2. Timesheet attached; rates match the master agreement." },
    { id: "APR-205", title: "Office equipment — 8 chairs", requester: "Dana Whitfield", amount: 2140, age: "1 d", risk: "low", aiNote: "Within the $2,500 facilities threshold. Vendor matches the approved supplier list." },
    { id: "APR-204", title: "Conference travel — 2 people", requester: "Sara Lindqvist", amount: 1890, age: "2 d", risk: "low", aiNote: "Flights booked 21 days ahead; per-diem within policy for the destination." },
    { id: "APR-203", title: "New software — transcription tool", requester: "Priya Nair", amount: 1360, age: "2 d", risk: "high", aiNote: "Possible duplicate: the workspace already pays for two transcription tools ($1,530/mo combined). See AI Cost Intelligence." }
  ],

  /* ---------------- Automation exceptions (11 open) ---------------- */
  exceptions: [
    { id: "EXC-311", doc: "BILL-3128", vendor: "Amazon Web Services", issue: "Amount differs from PO by +$214", amount: 214, confidence: 61 },
    { id: "EXC-310", doc: "BILL-3129", vendor: "Zoom", issue: "Missing purchase order", amount: 1490, confidence: 88 },
    { id: "EXC-309", doc: "RCPT-8841", vendor: "Uber", issue: "Receipt total unreadable (photo blur)", amount: 86, confidence: 42 },
    { id: "EXC-308", doc: "BILL-3130", vendor: "Figma", issue: "Possible duplicate of BILL-3124", amount: 1890, confidence: 79 },
    { id: "EXC-307", doc: "BILL-3131", vendor: "Mercury Bank", issue: "Bank details changed since last payment", amount: 0, confidence: 55 },
    { id: "EXC-306", doc: "INV-2052", vendor: "Quantia", issue: "Tax ID missing on customer record", amount: 0, confidence: 90 },
    { id: "EXC-305", doc: "BILL-3132", vendor: "Deel", issue: "Currency differs (EUR vs USD account)", amount: 1240, confidence: 83 },
    { id: "EXC-304", doc: "RCPT-8836", vendor: "Delta", issue: "Receipt missing — card transaction unmatched", amount: 412, confidence: 67 },
    { id: "EXC-303", doc: "BILL-3133", vendor: "Vercel", issue: "Amount differs from contract by −$38", amount: 38, confidence: 92 },
    { id: "EXC-302", doc: "BILL-3134", vendor: "Loom", issue: "Vendor not in approved supplier list", amount: 300, confidence: 71 },
    { id: "EXC-301", doc: "RCPT-8829", vendor: "Staples", issue: "Tax amount does not match rate", amount: 57, confidence: 64 }
  ],

  /* ---------------- Vendors ---------------- */
  vendors: [
    { id: "v-aws", name: "Amazon Web Services", category: "Cloud & infrastructure", monthly: 18940, ytd: 196300, renewal: "Dec 1, 2026", status: "active", trend: [15200, 15800, 16100, 16900, 17400, 18100, 18940], owner: "Kenji Watanabe" },
    { id: "v-hubspot", name: "HubSpot", category: "Software & SaaS tools", monthly: 4150, ytd: 45600, renewal: "Nov 17, 2026", status: "renewing", trend: [3800, 3800, 3800, 4150, 4150, 4150, 4150], owner: "Alex Duarte" },
    { id: "v-datadog", name: "Datadog", category: "Cloud & infrastructure", monthly: 3420, ytd: 31400, renewal: "Jan 15, 2027", status: "active", trend: [2400, 2560, 2710, 2980, 3120, 3260, 3420], owner: "Kenji Watanabe" },
    { id: "v-gws", name: "Google Workspace", category: "Software & SaaS tools", monthly: 2870, ytd: 33500, renewal: "Dec 13, 2026", status: "active", trend: [2690, 2690, 2780, 2780, 2870, 2870, 2870], owner: "Dana Whitfield" },
    { id: "v-figma", name: "Figma", category: "Software & SaaS tools", monthly: 1890, ytd: 20100, renewal: "Feb 1, 2027", status: "active", trend: [1620, 1750, 1750, 1890, 1890, 1890, 1890], owner: "Nora Fields" },
    { id: "v-slack", name: "Slack", category: "Software & SaaS tools", monthly: 1540, ytd: 16900, renewal: "Dec 20, 2026", status: "active", trend: [1430, 1430, 1540, 1540, 1540, 1540, 1540], owner: "Dana Whitfield" },
    { id: "v-github", name: "GitHub", category: "Software & SaaS tools", monthly: 1260, ytd: 13800, renewal: "Jan 28, 2027", status: "active", trend: [1260, 1260, 1260, 1260, 1260, 1260, 1260], owner: "Kenji Watanabe" },
    { id: "v-deel", name: "Deel", category: "Payroll & benefits", monthly: 890, ytd: 9400, renewal: "Mar 1, 2027", status: "active", trend: [820, 840, 860, 860, 880, 890, 890], owner: "Sara Lindqvist" },
    { id: "v-notion", name: "Notion", category: "Software & SaaS tools", monthly: 720, ytd: 7900, renewal: "Feb 14, 2027", status: "active", trend: [720, 720, 720, 720, 720, 720, 720], owner: "Nora Fields" },
    { id: "v-linear", name: "Linear", category: "Software & SaaS tools", monthly: 640, ytd: 6800, renewal: "Jan 10, 2027", status: "active", trend: [640, 640, 640, 640, 640, 640, 640], owner: "Kenji Watanabe" }
  ],

  /* ---------------- Card transactions (AI-categorised) ---------------- */
  transactions: [
    { id: "TX-9031", holder: "Kenji Watanabe", merchant: "Amazon Web Services", amount: 18940, date: "Nov 10, 2026", category: "Cloud & infrastructure", confidence: 99, status: "matched" },
    { id: "TX-9030", holder: "Alex Duarte", merchant: "Google Ads", amount: 6840, date: "Nov 10, 2026", category: "Marketing & growth", confidence: 97, status: "matched" },
    { id: "TX-9029", holder: "Nora Fields", merchant: "Figma", amount: 1890, date: "Nov 9, 2026", category: "Software & SaaS tools", confidence: 98, status: "matched" },
    { id: "TX-9028", holder: "Sara Lindqvist", merchant: "Delta Airlines", amount: 412, date: "Nov 9, 2026", category: "Travel & events", confidence: 88, status: "review" },
    { id: "TX-9027", holder: "Diego Fuentes", merchant: "Uber", amount: 86, date: "Nov 8, 2026", category: "Travel & events", confidence: 42, status: "review" },
    { id: "TX-9026", holder: "Priya Nair", merchant: "Staples", amount: 213, date: "Nov 8, 2026", category: "Rent & operations", confidence: 93, status: "matched" },
    { id: "TX-9025", holder: "Marcus Reid", merchant: "Zoom", amount: 1490, date: "Nov 7, 2026", category: "Software & SaaS tools", confidence: 91, status: "matched" },
    { id: "TX-9024", holder: "Amara Okafor", merchant: "LinkedIn Ads", amount: 2210, date: "Nov 7, 2026", category: "Marketing & growth", confidence: 96, status: "matched" },
    { id: "TX-9023", holder: "Leo Brandt", merchant: "WeWork", amount: 640, date: "Nov 6, 2026", category: "Rent & operations", confidence: 90, status: "matched" },
    { id: "TX-9022", holder: "Kenji Watanabe", merchant: "Vercel", amount: 380, date: "Nov 6, 2026", category: "Cloud & infrastructure", confidence: 95, status: "matched" },
    { id: "TX-9021", holder: "Dana Whitfield", merchant: "DocuSign", amount: 145, date: "Nov 5, 2026", category: "Software & SaaS tools", confidence: 94, status: "matched" },
    { id: "TX-9020", holder: "Tom Becker", merchant: "The Capital Grille", amount: 268, date: "Nov 5, 2026", category: "Travel & events", confidence: 76, status: "review" }
  ],

  /* ---------------- AI tooling spend (sums to $8,940 in October) ---------------- */
  aiTools: [
    { name: "LLM API — Provider A", kind: "API", cost: 4120, tokensM: 61.2, trend: [3100, 3380, 3560, 3790, 3940, 4120], flag: null },
    { name: "LLM API — Provider B", kind: "API", cost: 1290, tokensM: 35.2, trend: [1480, 1410, 1360, 1320, 1300, 1290], flag: null },
    { name: "Reconly Copilot seats", kind: "Seats", cost: 1280, tokensM: 0, trend: [1280, 1280, 1280, 1280, 1280, 1280], flag: "14 of 64 seats idle in October — $280/mo recoverable" },
    { name: "Transcription — EchoNotes", kind: "Seats", cost: 890, tokensM: 0, trend: [890, 890, 890, 890, 890, 890], flag: null },
    { name: "Support AI widget", kind: "Usage", cost: 720, tokensM: 0, trend: [540, 590, 630, 680, 700, 720], flag: null },
    { name: "Transcription — ScribeAI", kind: "Seats", cost: 640, tokensM: 0, trend: [640, 640, 640, 640, 640, 640], flag: "Duplicate category: EchoNotes already covers transcription — $640/mo" }
  ],

  /* ---------------- Tax & compliance ---------------- */
  taxRows: [
    { jurisdiction: "United States — California", type: "Sales tax", collected: 18420, filed: "Q3 filed Oct 20", nextDue: "Dec 15, 2026", status: "on-track" },
    { jurisdiction: "United States — New York", type: "Sales tax", collected: 6840, filed: "Q3 filed Oct 20", nextDue: "Dec 15, 2026", status: "on-track" },
    { jurisdiction: "European Union", type: "VAT (MOSS)", collected: 4120, filed: "Q3 filed Oct 28", nextDue: "Jan 20, 2027", status: "on-track" },
    { jurisdiction: "United Kingdom", type: "VAT", collected: 1880, filed: "Q3 filed Oct 25", nextDue: "Dec 7, 2026", status: "action" }
  ],

  /* ---------------- Integrations ---------------- */
  integrations: [
    { name: "Stripe", kind: "Payments / AR", status: "connected", detail: "1,284 payouts synced · last sync 4 min ago" },
    { name: "Mercury", kind: "Banking", status: "connected", detail: "2 accounts · balance feed live" },
    { name: "QuickBooks Online", kind: "Accounting", status: "connected", detail: "Two-way sync · 0 conflicts" },
    { name: "Deel", kind: "Payroll", status: "connected", detail: "86 employees · next run Nov 28" },
    { name: "HubSpot", kind: "CRM", status: "connected", detail: "Deals → invoices enabled" },
    { name: "Slack", kind: "Notifications", status: "connected", detail: "#finance-ops · approvals channel" },
    { name: "Google Workspace", kind: "Identity / SSO", status: "connected", detail: "SSO + SCIM provisioning" },
    { name: "Snowflake", kind: "Data warehouse", status: "available", detail: "Export warehouse-ready finance data" }
  ],

  /* ---------------- Reports ---------------- */
  reports: [
    { id: "r-01", name: "Monthly P&L — October 2026", cadence: "Monthly · 5th", format: "PDF", recipients: 8, lastRun: "Nov 5, 2026" },
    { id: "r-02", name: "Cash flow statement", cadence: "Weekly · Mon 08:00", format: "PDF", recipients: 5, lastRun: "Nov 10, 2026" },
    { id: "r-03", name: "Board pack — finance section", cadence: "Monthly · 12th", format: "PDF", recipients: 4, lastRun: "Oct 12, 2026" },
    { id: "r-04", name: "AR aging & collections", cadence: "Weekly · Fri 16:00", format: "CSV", recipients: 3, lastRun: "Nov 7, 2026" },
    { id: "r-05", name: "AI spend & automation savings", cadence: "Monthly · 1st", format: "CSV", recipients: 3, lastRun: "Nov 1, 2026" },
    { id: "r-06", name: "Tax summary — Q4 to date", cadence: "Quarterly", format: "PDF", recipients: 2, lastRun: "Nov 3, 2026" }
  ],

  /* ---------------- Notifications ---------------- */
  notifications: [
    { id: "n-01", type: "ar", title: "INV-2039 is 18 days overdue", text: "Corelink Health · $15,720. AI drafted a second reminder — review it in Invoices.", time: "26 min ago", read: false },
    { id: "n-02", type: "approval", title: "Approval waiting: AWS true-up", text: "$12,400 from Kenji Watanabe. AI flagged $3,940 of untagged usage.", time: "2 h ago", read: false },
    { id: "n-03", type: "ai", title: "Duplicate payment prevented", text: "Figma bill BILL-3130 matched BILL-3124 with 79% confidence and was held.", time: "3 h ago", read: false },
    { id: "n-04", type: "cash", title: "Cash position updated", text: "Balance $1,284,600 after the Northwind annual payment landed.", time: "5 h ago", read: true },
    { id: "n-05", type: "tax", title: "UK VAT return due Dec 7", text: "£-equivalent $1,880 collected in October. Draft return is ready to review.", time: "Yesterday", read: true },
    { id: "n-06", type: "budget", title: "Engineering at 96% of budget", text: "$161,340 of $168,000 with the month closed — inside plan.", time: "Yesterday", read: true },
    { id: "n-07", type: "ai", title: "Auto-match rate rose to 94.2%", text: "Up 1.8 points vs September across 1,847 documents.", time: "Nov 9", read: true },
    { id: "n-08", type: "close", title: "October close — 6 of 8 tasks done", text: "2 tasks remain: bank rec sign-off and accrual review.", time: "Nov 9", read: true }
  ],

  /* ---------------- Team (finance) ---------------- */
  team: [
    { name: "Dana Whitfield", role: "Chief Financial Officer", initials: "DW", status: "online" },
    { name: "Marcus Reid", role: "Controller", initials: "MR", status: "online" },
    { name: "Priya Nair", role: "AP Specialist", initials: "PN", status: "online" },
    { name: "Leo Brandt", role: "AR Specialist", initials: "LB", status: "busy" },
    { name: "Sara Lindqvist", role: "Finance Operations", initials: "SL", status: "online" },
    { name: "Tom Becker", role: "CEO — final approver", initials: "TB", status: "away" }
  ],

  roles: [
    { name: "Owner", members: 1, perms: { invoices: "manage", bills: "approve any", ai: "manage", settings: "manage", reports: "all" } },
    { name: "Finance Admin", members: 2, perms: { invoices: "manage", bills: "approve ≤ $25K", ai: "manage", settings: "manage", reports: "all" } },
    { name: "Controller", members: 1, perms: { invoices: "manage", bills: "approve ≤ $10K", ai: "configure", settings: "view", reports: "all" } },
    { name: "Approver", members: 3, perms: { invoices: "view", bills: "approve ≤ $5K", ai: "use", settings: "none", reports: "own" } },
    { name: "Viewer", members: 4, perms: { invoices: "view", bills: "none", ai: "none", settings: "none", reports: "view" } }
  ],

  closeChecklist: [
    { task: "Bank reconciliation — operating account", done: true, owner: "Marcus Reid" },
    { task: "Bank reconciliation — money market", done: true, owner: "Marcus Reid" },
    { task: "AR subledger agrees to GL", done: true, owner: "Leo Brandt" },
    { task: "AP accruals posted (AWS, Datadog)", done: true, owner: "Priya Nair" },
    { task: "Payroll journal posted", done: true, owner: "Sara Lindqvist" },
    { task: "Deferred revenue roll-forward", done: true, owner: "Marcus Reid" },
    { task: "Bank rec sign-off (CFO)", done: false, owner: "Dana Whitfield" },
    { task: "Accrual review — marketing prepay", done: false, owner: "Marcus Reid" }
  ],

  /* ---------------- Reconly subscription (Settings → Billing) ---------------- */
  billing: {
    plan: "Scale", priceMo: 249, nextInvoice: "Dec 1, 2026",
    seatsUsed: 24, seatsTotal: 30,
    docsUsed: 1847, docsTotal: 2500,
    storageUsedGb: 41, storageTotalGb: 100,
    invoices: [
      { id: "INV-R-1041", date: "Nov 1, 2026", amount: 249, status: "paid" },
      { id: "INV-R-1036", date: "Oct 1, 2026", amount: 249, status: "paid" },
      { id: "INV-R-1031", date: "Sep 1, 2026", amount: 249, status: "paid" },
      { id: "INV-R-1026", date: "Aug 1, 2026", amount: 249, status: "paid" }
    ]
  }
};

/* ---------------- Derived metrics (single source of truth) ---------------- */
function sum(arr) { return arr.reduce((a, b) => a + b, 0); }

DATA.metrics = (() => {
  const openInv = DATA.invoices.filter(i => ["open", "overdue"].includes(i.status));
  const overdueInv = DATA.invoices.filter(i => i.status === "overdue");
  const arOutstanding = sum(openInv.map(i => i.amount));
  const arOverdue = sum(overdueInv.map(i => i.amount));
  const billsDueWeek = sum(DATA.bills.filter(b => b.status === "due").map(b => b.amount));
  const approvalsTotal = sum(DATA.approvals.map(a => a.amount));
  const spendTotal = sum(DATA.spendCategories.map(c => c.amount));
  const deptActual = sum(DATA.departments.map(d => d.actual));
  const deptBudget = sum(DATA.departments.map(d => d.budget));
  const aiSpend = sum(DATA.aiTools.map(t => t.cost));
  const netOct = DATA.headline.revenueOct - DATA.headline.expensesOct;
  const closeDone = DATA.closeChecklist.filter(t => t.done).length;
  return {
    arOutstanding, arOverdue, arOverdueCount: overdueInv.length, arOpenCount: openInv.length,
    billsDueWeek, billsDueCount: DATA.bills.filter(b => b.status === "due").length,
    approvalsTotal, approvalsCount: DATA.approvals.length,
    spendTotal, deptActual, deptBudget, aiSpend, netOct,
    closeDone, closeTotal: DATA.closeChecklist.length,
    mrrGrowthPct: Math.round(((DATA.headline.mrr - DATA.headline.mrrPrev) / DATA.headline.mrrPrev) * 1000) / 10,
    exceptionsCount: DATA.exceptions.length,
    customersTotal: DATA.customers.length,
    vendorsTotal: DATA.vendors.length
  };
})();

/* ---------------- Formatting helpers ---------------- */
const fmt = {
  num: n => n.toLocaleString("en-US"),
  money: n => "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 }),
  money2: n => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  k: v => v >= 1e6 ? "$" + (v / 1e6).toFixed(2).replace(/\.?0+$/, "") + "M" : "$" + Math.round(v / 1000) + "K",
  pct: n => n + "%",
  initials: name => name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
};

const AVATAR_COLORS = ["#10b981", "#38bdf8", "#f59e0b", "#8b5cf6", "#f472b6", "#22c55e", "#facc15", "#fb7185"];
function avatarColor(name) {
  let h = 0; for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

if (typeof window !== "undefined") window.AD = { DATA, fmt, avatarColor };
if (typeof module !== "undefined") module.exports = { DATA, fmt, avatarColor };
