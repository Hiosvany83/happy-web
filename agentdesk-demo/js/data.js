/* ============================================================
   AgentDesk — Dataset (fictional)
   ONE dataset for all 37 screens. Every KPI, table and chart
   is computed from these arrays — numbers reconcile by design.
   No real people, companies or data. All names are invented.
   ============================================================ */

const DATA = {
  meta: {
    product: "AgentDesk",
    version: "1.4.0",
    workspace: "Halcyon",
    workspacePlan: "Scale",
    currency: "USD",
    tokenRatePer1k: 0.10, // $0.10 per 1,000 AI tokens
    today: "Fri, Nov 8, 2026",
    weekLabel: "Oct 26 – Nov 8, 2026"
  },

  /* ---------------- AI agents ---------------- */
  aiAgents: [
    { id: "ai-ava",   name: "Ava",   role: "Billing & Payments",      model: "AD-4 Turbo", status: "working",    tasksToday: 148, resolvedToday: 96,  escalations: 9,  avgConfidence: 94, tokensToday: 4210000, uptime: 99.98, languages: ["EN", "ES", "DE"] },
    { id: "ai-nova",  name: "Nova",  role: "Technical Support",       model: "AD-4 Turbo", status: "working",    tasksToday: 173, resolvedToday: 108, escalations: 14, avgConfidence:  90, tokensToday: 5080000, uptime: 99.97, languages: ["EN", "ES"] },
    { id: "ai-orion", name: "Orion", role: "Onboarding & Setup",      model: "AD-4",       status: "working",    tasksToday: 96,  resolvedToday: 71,  escalations: 5,  avgConfidence: 93, tokensToday: 2940000, uptime: 99.99, languages: ["EN", "FR"] },
    { id: "ai-milo",  name: "Milo",  role: "Refunds & Orders",        model: "AD-4",       status: "idle",       tasksToday: 74,  resolvedToday: 58,  escalations: 4,  avgConfidence: 95, tokensToday: 2370000, uptime: 99.96, languages: ["EN", "ES", "PT"] },
    { id: "ai-iris",  name: "Iris",  role: "Account & Access",        model: "AD-4",       status: "working",    tasksToday: 88,  resolvedToday: 63,  escalations: 6,  avgConfidence: 92, tokensToday: 1980000, uptime: 99.98, languages: ["EN"] },
    { id: "ai-pax",   name: "Pax",   role: "General Triage",          model: "AD-3.5",     status: "escalated",  tasksToday: 121, resolvedToday: 41,  escalations: 22, avgConfidence: 84, tokensToday: 1840000, uptime: 99.91, languages: ["EN", "ES"] }
  ],

  /* ---------------- Human agents ---------------- */
  humans: [
    { id: "h-mara",   name: "Mara Jensen",   role: "Support Lead",      team: "Support", status: "online",  openTickets: 6, csat: 4.9, firstResponseMin: 3, shift: "09:00 – 17:00 UTC" },
    { id: "h-diego",  name: "Diego Fuentes", role: "Senior Agent",      team: "Support", status: "online",  openTickets: 8, csat: 4.8, firstResponseMin: 4, shift: "09:00 – 17:00 UTC" },
    { id: "h-amara",  name: "Amara Okafor",  role: "Support Agent",     team: "Support", status: "online",  openTickets: 5, csat: 4.7, firstResponseMin: 5, shift: "13:00 – 21:00 UTC" },
    { id: "h-kenji",  name: "Kenji Watanabe",role: "Technical Agent",   team: "Support", status: "busy",    openTickets: 9, csat: 4.8, firstResponseMin: 6, shift: "01:00 – 09:00 UTC" },
    { id: "h-sara",   name: "Sara Lindqvist",role: "Support Agent",     team: "Success", status: "online",  openTickets: 4, csat: 4.9, firstResponseMin: 3, shift: "09:00 – 17:00 UTC" },
    { id: "h-lucas",  name: "Lucas Meyer",   role: "Billing Agent",     team: "Billing", status: "away",    openTickets: 3, csat: 4.6, firstResponseMin: 7, shift: "09:00 – 17:00 UTC" },
    { id: "h-priya",  name: "Priya Nair",    role: "Support Agent",     team: "Success", status: "online",  openTickets: 7, csat: 4.7, firstResponseMin: 4, shift: "13:00 – 21:00 UTC" },
    { id: "h-tomas",  name: "Tomas Rivera",  role: "Escalations",       team: "Support", status: "offline", openTickets: 0, csat: 4.8, firstResponseMin: 5, shift: "17:00 – 01:00 UTC" }
  ],

  teams: [
    { id: "t-support", name: "Support",  members: 5, openTickets: 28, csat: 4.8, slaCompliance: 96 },
    { id: "t-success", name: "Success",  members: 2, openTickets: 11, csat: 4.8, slaCompliance: 98 },
    { id: "t-billing", name: "Billing",  members: 1, openTickets: 3,  csat: 4.6, slaCompliance: 94 }
  ],

  /* ---------------- Tickets (36 in the live queue) ----------------
     status: open | pending | solved | escalated
     priority: urgent | high | normal | low
     channel: email | chat | voice | social
     slaMin: minutes left on the SLA clock (negative = breached) */
  tickets: [
    { id: "AD-1042", subject: "Invoice charged twice after plan upgrade", customer: "Brightloop", company: "Brightloop Inc.", plan: "Scale", channel: "email", priority: "urgent", status: "open", assignee: "Ava", aiConfidence: 93, sentiment: "frustrated", slaMin: 18, slaRisk: true,  category: "Billing", tags: ["invoice", "duplicate-charge"], messages: 6, firstResponseMin: 2, createdH: 1 },
    { id: "AD-1041", subject: "SSO login fails for new workspace members", customer: "Cobalt Labs", company: "Cobalt Labs", plan: "Enterprise", channel: "chat", priority: "urgent", status: "open", assignee: "Nova", aiConfidence: 88, sentiment: "frustrated", slaMin: 24, slaRisk: true, category: "Technical", tags: ["sso", "login"], messages: 9, firstResponseMin: 1, createdH: 2 },
    { id: "AD-1040", subject: "Refund for annual plan cancelled on day 3", customer: "Fernhill Studio", company: "Fernhill Studio", plan: "Growth", channel: "chat", priority: "high", status: "open", assignee: "Milo", aiConfidence: 96, sentiment: "neutral", slaMin: 41, slaRisk: true, category: "Billing", tags: ["refund", "cancellation"], messages: 4, firstResponseMin: 3, createdH: 2 },
    { id: "AD-1039", subject: "API webhook deliveries timing out (502)", customer: "Harborline", company: "Harborline Ltd.", plan: "Enterprise", channel: "email", priority: "high", status: "escalated", assignee: "Kenji Watanabe", aiConfidence: 71, sentiment: "angry", slaMin: -12, slaRisk: true, category: "Technical", tags: ["api", "webhooks", "502"], messages: 14, firstResponseMin: 4, createdH: 3 },
    { id: "AD-1038", subject: "How do I invite my team to the workspace?", customer: "Petal & Pine", company: "Petal & Pine", plan: "Starter", channel: "chat", priority: "normal", status: "open", assignee: "Orion", aiConfidence: 97, sentiment: "positive", slaMin: 132, slaRisk: false, category: "Onboarding", tags: ["invites", "workspace"], messages: 3, firstResponseMin: 1, createdH: 3 },
    { id: "AD-1037", subject: "Export of conversations missing attachments", customer: "Wrenfield", company: "Wrenfield & Co.", plan: "Scale", channel: "email", priority: "high", status: "pending", assignee: "Diego Fuentes", aiConfidence: 82, sentiment: "neutral", slaMin: 58, slaRisk: false, category: "Technical", tags: ["export", "attachments"], messages: 7, firstResponseMin: 5, createdH: 4 },
    { id: "AD-1036", subject: "Password reset email never arrives", customer: "Kite & Anchor", company: "Kite & Anchor", plan: "Starter", channel: "chat", priority: "normal", status: "open", assignee: "Iris", aiConfidence: 95, sentiment: "neutral", slaMin: 96, slaRisk: false, category: "Account", tags: ["password", "email"], messages: 2, firstResponseMin: 2, createdH: 4 },
    { id: "AD-1035", subject: "Data residency question — EU region", customer: "Bluepine", company: "Bluepine GmbH", plan: "Enterprise", channel: "email", priority: "normal", status: "pending", assignee: "Mara Jensen", aiConfidence: 78, sentiment: "neutral", slaMin: 210, slaRisk: false, category: "Account", tags: ["gdpr", "data-residency"], messages: 5, firstResponseMin: 6, createdH: 5 },
    { id: "AD-1034", subject: "Mobile app crashes on ticket search", customer: "Moonshot Media", company: "Moonshot Media", plan: "Growth", channel: "social", priority: "high", status: "open", assignee: "Nova", aiConfidence: 86, sentiment: "frustrated", slaMin: 47, slaRisk: true, category: "Technical", tags: ["mobile", "crash", "search"], messages: 8, firstResponseMin: 3, createdH: 5 },
    { id: "AD-1033", subject: "Change billing owner after acquisition", customer: "Solstice", company: "Solstice Group", plan: "Scale", channel: "email", priority: "normal", status: "open", assignee: "Ava", aiConfidence: 91, sentiment: "neutral", slaMin: 154, slaRisk: false, category: "Billing", tags: ["billing-owner"], messages: 3, firstResponseMin: 4, createdH: 6 },
    { id: "AD-1032", subject: "AI answered in the wrong language", customer: "Fernway", company: "Fernway SAS", plan: "Growth", channel: "chat", priority: "high", status: "escalated", assignee: "Pax", aiConfidence: 64, sentiment: "frustrated", slaMin: 33, slaRisk: true, category: "AI Quality", tags: ["language", "ai-reply"], messages: 11, firstResponseMin: 2, createdH: 6 },
    { id: "AD-1031", subject: "Bulk import of 400 customers fails at row 212", customer: "Cloudhaven", company: "Cloudhaven Inc.", plan: "Enterprise", channel: "email", priority: "high", status: "open", assignee: "Nova", aiConfidence: 84, sentiment: "neutral", slaMin: 72, slaRisk: false, category: "Technical", tags: ["import", "csv"], messages: 6, firstResponseMin: 5, createdH: 7 },
    { id: "AD-1030", subject: "Request: dark mode for the customer portal", customer: "Juniper & Co", company: "Juniper & Co", plan: "Starter", channel: "chat", priority: "low", status: "open", assignee: "Orion", aiConfidence: 98, sentiment: "positive", slaMin: 300, slaRisk: false, category: "Feature Request", tags: ["dark-mode", "portal"], messages: 2, firstResponseMin: 1, createdH: 7 },
    { id: "AD-1029", subject: "Chargeback dispute — invoice #INV-8841", customer: "Brightloop", company: "Brightloop Inc.", plan: "Scale", channel: "email", priority: "urgent", status: "open", assignee: "Ava", aiConfidence: 90, sentiment: "angry", slaMin: 29, slaRisk: true, category: "Billing", tags: ["chargeback", "dispute"], messages: 10, firstResponseMin: 2, createdH: 8 },
    { id: "AD-1028", subject: "Slack integration stopped syncing", customer: "Foxglove", company: "Foxglove Ltd.", plan: "Growth", channel: "chat", priority: "normal", status: "pending", assignee: "Diego Fuentes", aiConfidence: 87, sentiment: "neutral", slaMin: 118, slaRisk: false, category: "Integrations", tags: ["slack", "sync"], messages: 5, firstResponseMin: 4, createdH: 8 },
    { id: "AD-1027", subject: "Two-factor authentication locked me out", customer: "Marigold", company: "Marigold Studio", plan: "Starter", channel: "chat", priority: "high", status: "open", assignee: "Iris", aiConfidence: 94, sentiment: "frustrated", slaMin: 52, slaRisk: false, category: "Account", tags: ["2fa", "lockout"], messages: 4, firstResponseMin: 1, createdH: 9 },
    { id: "AD-1026", subject: "AI escalated a VIP customer by mistake", customer: "Beacon & Lark", company: "Beacon & Lark", plan: "Enterprise", channel: "voice", priority: "urgent", status: "escalated", assignee: "Mara Jensen", aiConfidence: 58, sentiment: "angry", slaMin: 9, slaRisk: true, category: "AI Quality", tags: ["vip", "escalation"], messages: 13, firstResponseMin: 3, createdH: 9 },
    { id: "AD-1025", subject: "How to set up auto-replies for holidays", customer: "Petal & Pine", company: "Petal & Pine", plan: "Starter", channel: "chat", priority: "low", status: "solved", assignee: "Orion", aiConfidence: 99, sentiment: "positive", slaMin: 0, slaRisk: false, category: "Onboarding", tags: ["auto-reply", "holidays"], messages: 3, firstResponseMin: 1, createdH: 10, resolutionMin: 22 },
    { id: "AD-1024", subject: "Usage report shows wrong seat count", customer: "Harborline", company: "Harborline Ltd.", plan: "Enterprise", channel: "email", priority: "normal", status: "open", assignee: "Ava", aiConfidence: 89, sentiment: "neutral", slaMin: 187, slaRisk: false, category: "Billing", tags: ["seats", "report"], messages: 4, firstResponseMin: 6, createdH: 10 },
    { id: "AD-1023", subject: "Cannot attach files larger than 10 MB", customer: "Wrenfield", company: "Wrenfield & Co.", plan: "Scale", channel: "chat", priority: "normal", status: "pending", assignee: "Nova", aiConfidence: 92, sentiment: "neutral", slaMin: 143, slaRisk: false, category: "Technical", tags: ["attachments", "limits"], messages: 3, firstResponseMin: 2, createdH: 11 },
    { id: "AD-1022", subject: "Onboarding checklist for 12 new agents", customer: "Cobalt Labs", company: "Cobalt Labs", plan: "Enterprise", channel: "email", priority: "normal", status: "open", assignee: "Orion", aiConfidence: 96, sentiment: "positive", slaMin: 260, slaRisk: false, category: "Onboarding", tags: ["onboarding", "checklist"], messages: 2, firstResponseMin: 5, createdH: 12 },
    { id: "AD-1021", subject: "Invoice PDF is blank when downloaded", customer: "Solstice", company: "Solstice Group", plan: "Scale", channel: "email", priority: "high", status: "open", assignee: "Ava", aiConfidence: 90, sentiment: "frustrated", slaMin: 64, slaRisk: false, category: "Billing", tags: ["invoice", "pdf"], messages: 5, firstResponseMin: 3, createdH: 12 },
    { id: "AD-1020", subject: "Voice transcripts missing for 3 calls", customer: "Bluepine", company: "Bluepine GmbH", plan: "Enterprise", channel: "voice", priority: "normal", status: "pending", assignee: "Kenji Watanabe", aiConfidence: 81, sentiment: "neutral", slaMin: 176, slaRisk: false, category: "Technical", tags: ["voice", "transcripts"], messages: 6, firstResponseMin: 7, createdH: 13 },
    { id: "AD-1019", subject: "Refund status for order #88210", customer: "Kite & Anchor", company: "Kite & Anchor", plan: "Starter", channel: "chat", priority: "normal", status: "solved", assignee: "Milo", aiConfidence: 97, sentiment: "positive", slaMin: 0, slaRisk: false, category: "Billing", tags: ["refund", "order"], messages: 4, firstResponseMin: 2, createdH: 14, resolutionMin: 31 },
    { id: "AD-1018", subject: "Custom fields not showing in reports", customer: "Moonshot Media", company: "Moonshot Media", plan: "Growth", channel: "email", priority: "low", status: "open", assignee: "Diego Fuentes", aiConfidence: 85, sentiment: "neutral", slaMin: 320, slaRisk: false, category: "Technical", tags: ["custom-fields", "reports"], messages: 3, firstResponseMin: 6, createdH: 15 },
    { id: "AD-1017", subject: "Can we white-label the help center?", customer: "Fernhill Studio", company: "Fernhill Studio", plan: "Growth", channel: "email", priority: "normal", status: "pending", assignee: "Mara Jensen", aiConfidence: 88, sentiment: "positive", slaMin: 240, slaRisk: false, category: "Account", tags: ["white-label", "help-center"], messages: 4, firstResponseMin: 4, createdH: 16 },
    { id: "AD-1016", subject: "AI suggested a refund we cannot honor", customer: "Brightloop", company: "Brightloop Inc.", plan: "Scale", channel: "chat", priority: "high", status: "open", assignee: "Milo", aiConfidence: 66, sentiment: "frustrated", slaMin: 44, slaRisk: true, category: "AI Quality", tags: ["refund-policy", "ai-reply"], messages: 9, firstResponseMin: 2, createdH: 17 },
    { id: "AD-1015", subject: "Zapier trigger fires twice per ticket", customer: "Cloudhaven", company: "Cloudhaven Inc.", plan: "Enterprise", channel: "email", priority: "normal", status: "open", assignee: "Nova", aiConfidence: 83, sentiment: "neutral", slaMin: 198, slaRisk: false, category: "Integrations", tags: ["zapier", "triggers"], messages: 5, firstResponseMin: 5, createdH: 18 },
    { id: "AD-1014", subject: "Change workspace timezone to CET", customer: "Juniper & Co", company: "Juniper & Co", plan: "Starter", channel: "chat", priority: "low", status: "solved", assignee: "Iris", aiConfidence: 99, sentiment: "positive", slaMin: 0, slaRisk: false, category: "Account", tags: ["timezone"], messages: 2, firstResponseMin: 1, createdH: 19, resolutionMin: 9 },
    { id: "AD-1013", subject: "Macros not applying to chat tickets", customer: "Foxglove", company: "Foxglove Ltd.", plan: "Growth", channel: "chat", priority: "normal", status: "pending", assignee: "Amara Okafor", aiConfidence: 86, sentiment: "neutral", slaMin: 129, slaRisk: false, category: "Technical", tags: ["macros", "chat"], messages: 4, firstResponseMin: 3, createdH: 20 },
    { id: "AD-1012", subject: "Annual invoice needed for accounting", customer: "Marigold", company: "Marigold Studio", plan: "Starter", channel: "email", priority: "low", status: "solved", assignee: "Ava", aiConfidence: 98, sentiment: "positive", slaMin: 0, slaRisk: false, category: "Billing", tags: ["invoice", "accounting"], messages: 3, firstResponseMin: 2, createdH: 21, resolutionMin: 18 },
    { id: "AD-1011", subject: "Knowledge base search returns old articles", customer: "Beacon & Lark", company: "Beacon & Lark", plan: "Enterprise", channel: "chat", priority: "normal", status: "open", assignee: "Orion", aiConfidence: 89, sentiment: "neutral", slaMin: 164, slaRisk: false, category: "Technical", tags: ["kb", "search"], messages: 5, firstResponseMin: 4, createdH: 22 },
    { id: "AD-1010", subject: "Add a second admin to billing", customer: "Solstice", company: "Solstice Group", plan: "Scale", channel: "email", priority: "normal", status: "solved", assignee: "Iris", aiConfidence: 97, sentiment: "positive", slaMin: 0, slaRisk: false, category: "Account", tags: ["admin", "billing"], messages: 3, firstResponseMin: 2, createdH: 23, resolutionMin: 14 },
    { id: "AD-1009", subject: "CSAT survey not sending after resolution", customer: "Harborline", company: "Harborline Ltd.", plan: "Enterprise", channel: "email", priority: "low", status: "open", assignee: "Diego Fuentes", aiConfidence: 84, sentiment: "neutral", slaMin: 280, slaRisk: false, category: "Technical", tags: ["csat", "survey"], messages: 2, firstResponseMin: 6, createdH: 24 },
    { id: "AD-1008", subject: "Refund window — is it 14 or 30 days?", customer: "Petal & Pine", company: "Petal & Pine", plan: "Starter", channel: "chat", priority: "low", status: "solved", assignee: "Milo", aiConfidence: 99, sentiment: "positive", slaMin: 0, slaRisk: false, category: "Billing", tags: ["refund-policy"], messages: 2, firstResponseMin: 1, createdH: 25, resolutionMin: 7 },
    { id: "AD-1007", subject: "API rate limit hit during Black Friday", customer: "Cobalt Labs", company: "Cobalt Labs", plan: "Enterprise", channel: "email", priority: "high", status: "pending", assignee: "Nova", aiConfidence: 82, sentiment: "frustrated", slaMin: 91, slaRisk: false, category: "Technical", tags: ["api", "rate-limit"], messages: 7, firstResponseMin: 3, createdH: 26 }
  ],

  /* ---------------- 14-day series (sums reconcile with KPIs) ---------------- */
  series14: {
    days: ["Oct 26", "Oct 27", "Oct 28", "Oct 29", "Oct 30", "Oct 31", "Nov 1", "Nov 2", "Nov 3", "Nov 4", "Nov 5", "Nov 6", "Nov 7", "Nov 8"],
    received:  [48, 52, 44, 56, 47, 59, 50, 54, 49, 55, 51, 53, 44, 42],
    resolved:  [48, 52, 44, 56, 47, 59, 50, 54, 49, 55, 51, 53, 44, 42],
    aiResolved:[30, 33, 27, 35, 29, 37, 31, 33, 30, 34, 32, 33, 27, 26],
    firstResponseMin: [4.0, 3.8, 4.3, 3.6, 3.9, 3.4, 3.7, 3.5, 3.8, 3.4, 3.6, 3.5, 3.7, 3.6],
    tokensM: [1.18, 1.24, 1.12, 1.31, 1.19, 1.42, 1.26, 1.33, 1.21, 1.38, 1.29, 1.36, 1.24, 1.09]
  },

  /* ---------------- Customers ---------------- */
  customers: [
    { id: "c-brightloop", name: "Brightloop Inc.", contact: "Elena Marsh", email: "elena@brightloop.io", plan: "Scale", health: 82, mrr: 249, since: "Mar 2024", segment: "SaaS" },
    { id: "c-cobalt", name: "Cobalt Labs", contact: "Ravi Anand", email: "ravi@cobaltlabs.dev", plan: "Enterprise", health: 91, mrr: 890, since: "Jan 2023", segment: "Dev Tools" },
    { id: "c-harborline", name: "Harborline Ltd.", contact: "Tom Becker", email: "tom@harborline.co", plan: "Enterprise", health: 88, mrr: 890, since: "Jun 2023", segment: "Logistics" },
    { id: "c-fernhill", name: "Fernhill Studio", contact: "Nora Fields", email: "nora@fernhill.studio", plan: "Growth", health: 76, mrr: 99, since: "Sep 2024", segment: "Design" },
    { id: "c-bluepine", name: "Bluepine GmbH", contact: "Jonas Weber", email: "jonas@bluepine.de", plan: "Enterprise", health: 93, mrr: 890, since: "Feb 2023", segment: "Fintech" },
    { id: "c-petal", name: "Petal & Pine", contact: "Grace Liu", email: "grace@petalandpine.com", plan: "Starter", health: 71, mrr: 29, since: "May 2025", segment: "Retail" },
    { id: "c-moonshot", name: "Moonshot Media", contact: "Alex Duarte", email: "alex@moonshot.media", plan: "Growth", health: 79, mrr: 99, since: "Nov 2024", segment: "Media" },
    { id: "c-solstice", name: "Solstice Group", contact: "Ivy Chen", email: "ivy@solstice.group", plan: "Scale", health: 84, mrr: 249, since: "Aug 2023", segment: "Consulting" },
    { id: "c-wrenfield", name: "Wrenfield & Co.", contact: "Oscar Hale", email: "oscar@wrenfield.co", plan: "Scale", health: 73, mrr: 249, since: "Dec 2024", segment: "Legal" },
    { id: "c-cloudhaven", name: "Cloudhaven Inc.", contact: "Mia Park", email: "mia@cloudhaven.io", plan: "Enterprise", health: 90, mrr: 890, since: "Apr 2023", segment: "Cloud" },
    { id: "c-kite", name: "Kite & Anchor", contact: "Ben Ortiz", email: "ben@kiteanchor.com", plan: "Starter", health: 68, mrr: 29, since: "Jul 2025", segment: "E-commerce" },
    { id: "c-fernway", name: "Fernway SAS", contact: "Camille Roy", email: "camille@fernway.fr", plan: "Growth", health: 80, mrr: 99, since: "Jan 2025", segment: "Travel" },
    { id: "c-foxglove", name: "Foxglove Ltd.", contact: "Hannah Reed", email: "hannah@foxglove.uk", plan: "Growth", health: 77, mrr: 99, since: "Mar 2025", segment: "Health" },
    { id: "c-marigold", name: "Marigold Studio", contact: "Zoe Adams", email: "zoe@marigold.studio", plan: "Starter", health: 85, mrr: 29, since: "Jun 2025", segment: "Design" },
    { id: "c-beacon", name: "Beacon & Lark", contact: "Sam Whitfield", email: "sam@beaconlark.com", plan: "Enterprise", health: 69, mrr: 890, since: "Oct 2022", segment: "Retail" },
    { id: "c-juniper", name: "Juniper & Co", contact: "Leo Brandt", email: "leo@juniper.co", plan: "Starter", health: 88, mrr: 29, since: "Feb 2025", segment: "Consulting" }
  ],

  /* ---------------- Knowledge base ---------------- */
  kb: [
    { id: "kb-01", title: "How to reset your password and set up 2FA", category: "Account", status: "published", views: 4821, helpful: 94, updated: "Nov 2, 2026", aiDrafted: false },
    { id: "kb-02", title: "Understanding your invoice and billing cycle", category: "Billing", status: "published", views: 4102, helpful: 91, updated: "Oct 28, 2026", aiDrafted: true },
    { id: "kb-03", title: "Setting up SSO with SAML and Okta", category: "Account", status: "published", views: 2988, helpful: 89, updated: "Oct 21, 2026", aiDrafted: false },
    { id: "kb-04", title: "Refund policy: 30-day window explained", category: "Billing", status: "published", views: 2744, helpful: 96, updated: "Nov 5, 2026", aiDrafted: true },
    { id: "kb-05", title: "Connecting Slack and Microsoft Teams", category: "Integrations", status: "published", views: 2510, helpful: 90, updated: "Oct 18, 2026", aiDrafted: false },
    { id: "kb-06", title: "API webhooks: events, retries and signatures", category: "Developers", status: "published", views: 2231, helpful: 87, updated: "Oct 30, 2026", aiDrafted: false },
    { id: "kb-07", title: "Importing customers from CSV in bulk", category: "Getting Started", status: "published", views: 1987, helpful: 92, updated: "Nov 1, 2026", aiDrafted: true },
    { id: "kb-08", title: "Macros: save replies your team reuses daily", category: "Productivity", status: "published", views: 1743, helpful: 93, updated: "Oct 25, 2026", aiDrafted: true },
    { id: "kb-09", title: "SLA policies by plan and priority", category: "Account", status: "published", views: 1620, helpful: 88, updated: "Oct 15, 2026", aiDrafted: false },
    { id: "kb-10", title: "Troubleshooting the mobile app", category: "Technical", status: "published", views: 1498, helpful: 85, updated: "Nov 3, 2026", aiDrafted: false },
    { id: "kb-11", title: "AI Copilot: how suggestions are generated", category: "AI", status: "published", views: 1377, helpful: 95, updated: "Nov 6, 2026", aiDrafted: true },
    { id: "kb-12", title: "Exporting conversations and reports", category: "Productivity", status: "published", views: 1204, helpful: 90, updated: "Oct 29, 2026", aiDrafted: false },
    { id: "kb-13", title: "Data residency and GDPR compliance", category: "Account", status: "draft", views: 0, helpful: 0, updated: "Nov 7, 2026", aiDrafted: true },
    { id: "kb-14", title: "Voice transcripts: enabling and searching", category: "Technical", status: "draft", views: 0, helpful: 0, updated: "Nov 7, 2026", aiDrafted: true },
    { id: "kb-15", title: "White-labeling your help center", category: "Account", status: "ai-draft", views: 0, helpful: 0, updated: "Nov 8, 2026", aiDrafted: true },
    { id: "kb-16", title: "Holiday auto-replies and business hours", category: "Getting Started", status: "ai-draft", views: 0, helpful: 0, updated: "Nov 8, 2026", aiDrafted: true }
  ],

  /* ---------------- Macros ---------------- */
  macros: [
    { id: "m-01", name: "Refund approved — standard", category: "Billing", uses: 342, aiGenerated: false, updated: "Oct 30, 2026" },
    { id: "m-02", name: "Password reset instructions", category: "Account", uses: 318, aiGenerated: false, updated: "Oct 22, 2026" },
    { id: "m-03", name: "Apology for delayed response", category: "General", uses: 287, aiGenerated: true, updated: "Nov 4, 2026" },
    { id: "m-04", name: "Escalate to engineering", category: "Technical", uses: 196, aiGenerated: false, updated: "Oct 27, 2026" },
    { id: "m-05", name: "Invoice copy request", category: "Billing", uses: 174, aiGenerated: true, updated: "Nov 1, 2026" },
    { id: "m-06", name: "Welcome new workspace member", category: "Onboarding", uses: 158, aiGenerated: true, updated: "Nov 5, 2026" },
    { id: "m-07", name: "Bug report received — next steps", category: "Technical", uses: 141, aiGenerated: false, updated: "Oct 19, 2026" },
    { id: "m-08", name: "Plan upgrade confirmation", category: "Billing", uses: 129, aiGenerated: true, updated: "Oct 31, 2026" },
    { id: "m-09", name: "CSAT follow-up after resolution", category: "General", uses: 98, aiGenerated: true, updated: "Nov 6, 2026" },
    { id: "m-10", name: "Out of office / holiday notice", category: "General", uses: 87, aiGenerated: false, updated: "Oct 12, 2026" }
  ],

  /* ---------------- Automation rules / workflows ---------------- */
  workflows: [
    { id: "w-01", name: "VIP customers → human agent", trigger: "Ticket created", condition: "Plan = Enterprise", action: "Assign to Support Lead, skip AI", status: "active", runs: 184, success: 99 },
    { id: "w-02", name: "Billing keywords → Ava", trigger: "Ticket created", condition: "Category = Billing", action: "Route to Ava, confidence ≥ 90%", status: "active", runs: 412, success: 97 },
    { id: "w-03", name: "SLA at 50% → notify team", trigger: "SLA threshold", condition: "SLA remaining < 50%", action: "Post to #support-alerts", status: "active", runs: 96, success: 100 },
    { id: "w-04", name: "Low AI confidence → escalate", trigger: "AI reply drafted", condition: "Confidence < 75%", action: "Escalate to human, hold reply", status: "active", runs: 143, success: 98 },
    { id: "w-05", name: "CSAT ≤ 2 → recovery flow", trigger: "Survey submitted", condition: "CSAT ≤ 2 stars", action: "Create follow-up task for Lead", status: "active", runs: 27, success: 100 },
    { id: "w-06", name: "After-hours → auto-reply", trigger: "Ticket created", condition: "Outside business hours", action: "Send holiday auto-reply", status: "active", runs: 231, success: 99 },
    { id: "w-07", name: "Refund > $500 → approval", trigger: "Refund requested", condition: "Amount > $500", action: "Require manager approval", status: "paused", runs: 18, success: 100 },
    { id: "w-08", name: "Spam filter — marketing emails", trigger: "Ticket created", condition: "Sender is bulk mailer", action: "Close as spam", status: "active", runs: 64, success: 96 }
  ],

  /* ---------------- Channels ---------------- */
  channels: [
    { id: "ch-email", name: "Email", icon: "✉", volume: 268, share: 38, firstResponseMin: 4.6, csat: 4.5, status: "healthy" },
    { id: "ch-chat", name: "Live Chat", icon: "💬", volume: 301, share: 43, firstResponseMin: 1.8, csat: 4.7, status: "healthy" },
    { id: "ch-voice", name: "Voice", icon: "☎", volume: 84, share: 12, firstResponseMin: 2.4, csat: 4.6, status: "healthy" },
    { id: "ch-social", name: "Social / X", icon: "𝕏", volume: 51, share: 7, firstResponseMin: 6.2, csat: 4.3, status: "degraded" }
  ],

  /* ---------------- CSAT feedback ---------------- */
  feedback: [
    { id: "f-01", customer: "Cobalt Labs", rating: 5, theme: "Fast resolution", text: "Nova fixed our SSO issue in under an hour. The AI summary was spot on.", date: "Nov 8, 2026" },
    { id: "f-02", customer: "Brightloop", rating:  5, theme: "Tone", text: "The refund was handled well, but the first reply felt a bit robotic.", date: "Nov 7, 2026" },
    { id: "f-03", customer: "Bluepine", rating: 5, theme: "Fast resolution", text: "Clear answers, no back and forth. Best support experience we have had.", date: "Nov 7, 2026" },
    { id: "f-04", customer: "Fernhill Studio", rating: 5, theme: "KB accuracy", text: "The help center article answered everything before I even wrote in.", date: "Nov 6, 2026" },
    { id: "f-05", customer: "Beacon & Lark", rating: 2, theme: "Escalation quality", text: "Our VIP ticket was escalated by the AI without context. We had to repeat everything.", date: "Nov 6, 2026" },
    { id: "f-06", customer: "Petal & Pine", rating: 5, theme: "Tone", text: "Friendly, human tone even though I know an AI drafted the first reply.", date: "Nov 5, 2026" },
    { id: "f-07", customer: "Harborline", rating:  5, theme: "Fast resolution", text: "Webhook issue took a day, but updates were frequent and honest.", date: "Nov 5, 2026" },
    { id: "f-08", customer: "Moonshot Media", rating:  5, theme: "KB accuracy", text: "The mobile crash article was slightly outdated, otherwise great.", date: "Nov 4, 2026" },
    { id: "f-09", customer: "Solstice", rating: 5, theme: "Fast resolution", text: "Billing owner change done in one message. Impressive.", date: "Nov 4, 2026" },
    { id: "f-10", customer: "Kite & Anchor", rating: 5, theme: "Tone", text: "Milo explained the refund window patiently and clearly.", date: "Nov 3, 2026" },
    { id: "f-11", customer: "Fernway", rating:  4, theme: "Escalation quality", text: "The AI answered in English when we wrote in French. Small thing, but noticeable.", date: "Nov 3, 2026" },
    { id: "f-12", customer: "Marigold", rating: 4, theme: "KB accuracy", text: "Found the 2FA guide in seconds. Would love a video version.", date: "Nov 2, 2026" }
  ],

  /* ---------------- Notifications ---------------- */
  notifications: [
    { id: "n-01", type: "sla", title: "SLA at risk: AD-1039", text: "Webhook timeout ticket breached its first-response SLA.", time: "12 min ago", read: false },
    { id: "n-02", type: "ai", title: "Pax escalated 3 tickets", text: "Escalation rate above the 15% guardrail for General Triage.", time: "38 min ago", read: false },
    { id: "n-03", type: "csat", title: "New 2-star rating", text: "Beacon & Lark rated their VIP escalation experience.", time: "1 h ago", read: false },
    { id: "n-04", type: "billing", title: "AI credits at 74% of plan", text: "18.42M of 25M tokens used this cycle.", time: "2 h ago", read: false },
    { id: "n-05", type: "kb", title: "AI drafted 2 new articles", text: "White-label help center and holiday auto-replies are ready to review.", time: "3 h ago", read: true },
    { id: "n-06", type: "team", title: "Kenji is now on shift", text: "Technical coverage active until 09:00 UTC.", time: "5 h ago", read: true },
    { id: "n-07", type: "sla", title: "Weekly SLA report ready", text: "Compliance 96.4% — up 1.2 points vs last week.", time: "Yesterday", read: true },
    { id: "n-08", type: "ai", title: "Nova retrained on 214 new tickets", text: "Confidence on Technical tickets rose to 91%.", time: "Yesterday", read: true }
  ],

  /* ---------------- Reports ---------------- */
  reports: [
    { id: "r-01", name: "Weekly support performance", cadence: "Weekly · Mon 08:00", format: "PDF", recipients: 6, lastRun: "Nov 3, 2026" },
    { id: "r-02", name: "AI cost & token usage", cadence: "Weekly · Mon 08:00", format: "CSV", recipients: 3, lastRun: "Nov 3, 2026" },
    { id: "r-03", name: "CSAT & NPS digest", cadence: "Monthly · 1st", format: "PDF", recipients: 8, lastRun: "Nov 1, 2026" },
    { id: "r-04", name: "SLA compliance by team", cadence: "Weekly · Fri 17:00", format: "PDF", recipients: 4, lastRun: "Nov 7, 2026" },
    { id: "r-05", name: "Escalation audit (AI)", cadence: "Daily · 07:00", format: "CSV", recipients: 2, lastRun: "Nov 8, 2026" },
    { id: "r-06", name: "Knowledge base health", cadence: "Monthly · 1st", format: "PDF", recipients: 3, lastRun: "Nov 1, 2026" }
  ],

  /* ---------------- SLA policies ---------------- */
  slaPolicies: [
    { plan: "Enterprise", firstResponseMin: 15, resolutionH: 4, compliance: 97.2, breaches: 2 },
    { plan: "Scale", firstResponseMin: 60, resolutionH: 8, compliance: 96.1, breaches: 3 },
    { plan: "Growth", firstResponseMin: 240, resolutionH: 24, compliance: 95.4, breaches: 4 },
    { plan: "Starter", firstResponseMin: 480, resolutionH: 48, compliance: 94.8, breaches: 5 }
  ],

  /* ---------------- Roles & permissions ---------------- */
  roles: [
    { name: "Owner", members: 1, perms: { tickets: "all", ai: "manage", billing: "manage", settings: "manage", reports: "all" } },
    { name: "Support Lead", members: 1, perms: { tickets: "all", ai: "manage", billing: "view", settings: "manage", reports: "all" } },
    { name: "Senior Agent", members: 2, perms: { tickets: "all", ai: "configure", billing: "view", settings: "view", reports: "all" } },
    { name: "Agent", members: 5, perms: { tickets: "assigned", ai: "use", billing: "none", settings: "none", reports: "own" } },
    { name: "Viewer", members: 2, perms: { tickets: "view", ai: "none", billing: "none", settings: "none", reports: "view" } }
  ],

  /* ---------------- Billing ---------------- */
  billing: {
    plan: "Scale", priceMo: 249, nextInvoice: "Dec 1, 2026",
    seatsUsed: 24, seatsTotal: 30,
    tokensUsedM: 18.42, tokensTotalM: 25,
    storageUsedGb: 68, storageTotalGb: 100,
    invoices: [
      { id: "INV-8841", date: "Nov 1, 2026", amount: 249, status: "paid" },
      { id: "INV-8790", date: "Oct 1, 2026", amount: 249, status: "paid" },
      { id: "INV-8739", date: "Sep 1, 2026", amount: 249, status: "paid" },
      { id: "INV-8688", date: "Aug 1, 2026", amount: 249, status: "paid" }
    ]
  }
};

/* ---------------- Derived metrics (single source of truth) ---------------- */
function sum(arr) { return arr.reduce((a, b) => a + b, 0); }

DATA.metrics = (() => {
  const t = DATA.tickets;
  const open = t.filter(x => x.status === "open" || x.status === "pending").length;
  const solved = t.filter(x => x.status === "solved").length;
  const escalated = t.filter(x => x.status === "escalated").length;
  const slaRisk = t.filter(x => x.slaRisk).length;
  const totalResolved14 = sum(DATA.series14.resolved);
  const aiResolved14 = sum(DATA.series14.aiResolved);
  const aiRate = Math.round((aiResolved14 / totalResolved14) * 100);
  const csatAvg = DATA.feedback.reduce((a, f) => a + f.rating, 0) / DATA.feedback.length;
  const tokensTotal = sum(DATA.aiAgents.map(a => a.tokensToday));
  const aiCost = (tokensTotal / 1000) * DATA.meta.tokenRatePer1k;
  const aiTasks = sum(DATA.aiAgents.map(a => a.tasksToday));
  const aiEsc = sum(DATA.aiAgents.map(a => a.escalations));
  const escRate = Math.round((aiEsc / aiTasks) * 100);
  const firstResp = (sum(DATA.series14.firstResponseMin) / DATA.series14.firstResponseMin.length);
  return {
    openTickets: open, solvedTickets: solved, escalatedTickets: escalated,
    totalTickets: t.length, slaRisk,
    totalResolved14, aiResolved14, aiRate,
    csat: Math.round(csatAvg * 10) / 10,
    nps: 62, tokensTotal, aiCost: Math.round(aiCost),
    aiTasks, aiEscalations: aiEsc, escRate,
    firstResponseMin: Math.round(firstResp * 10) / 10,
    resolutionH: 4.3, backlogDelta: -8, slaCompliance: 96.4,
    kbPublished: DATA.kb.filter(a => a.status === "published").length,
    kbDrafts: DATA.kb.filter(a => a.status !== "published").length,
    macrosUsed: sum(DATA.macros.map(m => m.uses)),
    customersTotal: DATA.customers.length,
    mrrTotal: sum(DATA.customers.map(c => c.mrr))
  };
})();

/* ---------------- Formatting helpers ---------------- */
const fmt = {
  num: n => n.toLocaleString("en-US"),
  money: n => "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 }),
  tokens: n => (n / 1e6).toFixed(2) + "M",
  pct: n => n + "%",
  sla: min => {
    if (min < 0) return "breached " + Math.abs(min) + "m ago";
    if (min < 60) return min + "m left";
    const h = Math.floor(min / 60), m = min % 60;
    return h + "h " + String(m).padStart(2, "0") + "m left";
  },
  initials: name => name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(),
  timeAgo: h => h < 1 ? "just now" : h === 1 ? "1h ago" : h + "h ago"
};

const AVATAR_COLORS = ["#6366f1", "#14b8a6", "#f59e0b", "#38bdf8", "#f472b6", "#a78bfa", "#22c55e", "#fb7185"];
function avatarColor(name) {
  let h = 0; for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

if (typeof window !== "undefined") window.AD = { DATA, fmt, avatarColor };
if (typeof module !== "undefined") module.exports = { DATA, fmt, avatarColor };
