# DoxaIQ — Build Plan

## Phase 1 — Foundation
- [ ] Scaffold Vite + React 19 + TypeScript
- [ ] Install all dependencies (Tailwind v4, Framer Motion, TanStack Router, Zustand, Recharts, lucide-react, react-hot-toast, clsx, tailwind-merge, cva)
- [ ] Set up Satoshi font (copy OTF files to /public/fonts/)
- [ ] Configure index.css — DoxaIQ color system, CSS variables, light/dark, scrollbar, font
- [ ] Set up Tailwind v4 config
- [ ] Set up TanStack Router with all 18 routes
- [ ] Set up folder structure (components/, hooks/, stores/, types/, data/, lib/, pages/)
- [ ] lib/utils.ts — cn()
- [ ] useSettingsStore (theme toggle)
- [ ] Apply theme in App.tsx
- [ ] Shared components: Sidebar, Topbar, LoadingScreen, EmptyState, ErrorState

## Phase 2 — Mock Data
- [ ] /src/data/customers.ts — 50 customers with RFM scores, risk status, purchase history
- [ ] /src/data/followUps.ts — pending/completed follow-ups
- [ ] /src/data/complaints.ts — open/resolved/escalated complaints
- [ ] /src/data/revenue.ts — revenue figures and at-risk calculations
- [ ] /src/data/analytics.ts — chart data (retention trends, cohorts)
- [ ] /src/types/ — Customer, FollowUp, Complaint, Revenue types

## Phase 3 — Core Screens
- [ ] Dashboard / Home
- [ ] Customer List
- [ ] Customer Profile
- [ ] Add/Edit Customer
- [ ] At-Risk Customers
- [ ] Lost Customers
- [ ] Follow-Up Queue
- [ ] Follow-Up Detail
- [ ] Schedule Follow-Up
- [ ] Complaints Log
- [ ] Complaint Detail
- [ ] Revenue at Risk
- [ ] Retention Analytics
- [ ] Revenue Analytics
- [ ] Onboarding / Setup

## Phase 4 — Shell Screens
- [ ] Import / Upload Data (UI only)
- [ ] Notifications (UI only)
- [ ] Settings (UI only)

## Phase 5 — Polish
- [ ] Framer Motion animations on all screens
- [ ] RFM score rings/badges on customer cards and profiles
- [ ] Risk status pills (Active / At-Risk / Lost / Churned)
- [ ] Dark mode QA — every screen
- [ ] Responsive QA — mobile, tablet, desktop
- [ ] Empty states on all list screens
- [ ] Loading skeletons
- [ ] Recharts themed to DoxaIQ palette
- [ ] Sidebar active states and transitions
- [ ] react-hot-toast notifications wired to interactions
