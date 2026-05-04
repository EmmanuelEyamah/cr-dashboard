# DoxaIQ — Project Context

## What This Is
DoxaIQ is a customer retention and follow-up dashboard built for small and medium enterprises (SMEs). It helps business owners see who hasn't returned, who is at risk of churning, what complaints are unresolved, who needs a follow-up today, and how much revenue is quietly slipping away — all in one premium dashboard. This is a demo/prototype built to show potential DOXA clients what a proper retention system looks like.

## Target User
SME business owners and managers who currently track customers via WhatsApp, spreadsheets, or memory. No technical background assumed.

## Core Screens (18 total)

### Fully Built (14)
1. `/` — Dashboard / Home (command center, key metrics)
2. `/onboarding` — Onboarding / Setup (first-run wizard)
3. `/customers` — Customer List (all customers, filterable)
4. `/customers/:id` — Customer Profile (full history, RFM score, risk level)
5. `/customers/new` — Add / Edit Customer
6. `/at-risk` — At-Risk Customers
7. `/lost` — Lost Customers
8. `/analytics/retention` — Retention Analytics (charts)
9. `/follow-ups` — Follow-Up Queue (daily action list)
10. `/follow-ups/:id` — Follow-Up Detail
11. `/follow-ups/new` — Schedule Follow-Up
12. `/complaints` — Complaints Log
13. `/complaints/:id` — Complaint Detail
14. `/revenue` — Revenue at Risk
15. `/analytics/revenue` — Revenue Analytics

### Basic UI Shell (4)
16. `/import` — Import / Upload Data
17. `/notifications` — Notifications & Alerts
18. `/settings` — Settings

## Key Features (v1)
1. Dashboard with live-feel KPI cards (total customers, at-risk count, follow-ups due, revenue at risk, retention rate)
2. Customer list with risk segmentation: Active / At-Risk / Lost / Churned
3. Customer profiles with RFM score (Recency, Frequency, Monetary — each scored 1–5, shown on UI)
4. Follow-up queue sorted by urgency and due date
5. Complaints log with open/resolved/escalated status
6. Revenue at risk calculation from lapsed customers
7. Retention analytics with charts (Recharts)
8. Light and dark mode

## Out of Scope (v1)
- Real backend or database — all data is mock/static
- User authentication — open app, no login
- CSV import functionality (UI shell only)
- Real notifications (UI shell only)
- Settings functionality (UI shell only)

## Risk Rules (business logic)
| Status | Definition |
|---|---|
| Active | Purchased within last 30 days |
| At-Risk | No purchase in 31–60 days |
| Lost | No purchase in 61–90 days |
| Churned | No purchase in 90+ days |

## RFM Scoring
- **Recency (R):** Days since last purchase → scored 1–5 (5 = very recent)
- **Frequency (F):** Total number of purchases → scored 1–5
- **Monetary (M):** Total spend → scored 1–5
- Combined score shown as badge on Customer Profile and Customer List
- Score drives risk label automatically

## Mock Data Profile
- Business type: SME (mixed services — think a mid-size service/retail hybrid)
- ~50 realistic customers with varied risk levels
- 6 months of purchase history
- Mix of complaints, follow-ups pending, and resolved cases

## Brand & Design
- **Primary color:** `#6366F1` (Indigo) — premium, intelligent
- **Primary dark:** `#4F46E5`
- **Primary light:** `#818CF8`
- **Accent:** `#8B5CF6` (Violet) — for gradients and highlights
- **Dark background:** `#09090B` (near-black)
- **Dark card:** `#111118`
- **Sidebar dark:** `#0D0D14`
- **Light background:** `#FFFFFF`
- **Light card:** `#F8F8FC`
- **Font:** Satoshi (self-hosted)
- **Tone:** Dark & premium, data-driven, clean
- **Mode:** Both light and dark
- **Key UI components:** KPI stat cards, line/bar/area charts (Recharts), data tables, risk badges, RFM score rings, follow-up checklist, complaint status pills

## Sidebar Active State
`bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white shadow-lg shadow-[#6366F1]/25`

## Scrollbar
```css
::-webkit-scrollbar-thumb { background: #6366F1; }
::-webkit-scrollbar-thumb:hover { background: #4F46E5; }
```

## Constraints
- No backend — all data is hardcoded mock data in `/src/data/`
- No auth
- Must look production-ready — this is a sales demo
- Deadline: immediate
