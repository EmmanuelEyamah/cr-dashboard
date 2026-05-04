import type { FollowUp } from "@/types";

const today = new Date();
const daysAgo = (n: number) => { const d = new Date(today); d.setDate(d.getDate() - n); return d.toISOString().split("T")[0]; };
const daysFromNow = (n: number) => { const d = new Date(today); d.setDate(d.getDate() + n); return d.toISOString().split("T")[0]; };

export const followUps: FollowUp[] = [
  {
    id: "f1", customerId: "c6", customerName: "Chidi Nwosu", title: "Follow up on delivery complaint",
    notes: "Customer complained about late delivery on last order. Call to apologize and offer discount on next purchase.",
    dueDate: today.toISOString().split("T")[0], status: "pending", priority: "high",
    createdAt: daysAgo(3),
  },
  {
    id: "f2", customerId: "c8", customerName: "Seun Akinwale", title: "Re-engage — no response in 2 weeks",
    notes: "High-value customer gone quiet. Try a different channel — call instead of WhatsApp.",
    dueDate: today.toISOString().split("T")[0], status: "overdue", priority: "high",
    createdAt: daysAgo(7),
  },
  {
    id: "f3", customerId: "c13", customerName: "Taiwo Adeleke", title: "Win-back offer — 85 days inactive",
    notes: "Send personalised win-back message with a limited-time offer.",
    dueDate: daysAgo(2), status: "overdue", priority: "high",
    createdAt: daysAgo(10),
  },
  {
    id: "f4", customerId: "c7", customerName: "Halima Usman", title: "Check in after 44-day gap",
    notes: "Send a friendly check-in message. Ask if there's anything we can help with.",
    dueDate: daysFromNow(1), status: "pending", priority: "medium",
    createdAt: daysAgo(2),
  },
  {
    id: "f5", customerId: "c9", customerName: "Rukayat Lawal", title: "Follow up on last purchase satisfaction",
    notes: "Ask about experience with beauty products. Offer loyalty discount.",
    dueDate: daysFromNow(2), status: "pending", priority: "medium",
    createdAt: daysAgo(1),
  },
  {
    id: "f6", customerId: "c11", customerName: "Amaka Obi", title: "Address unresolved complaint",
    notes: "Complaint was never properly closed. Reach out with resolution and apology.",
    dueDate: daysFromNow(1), status: "pending", priority: "high",
    createdAt: daysAgo(5),
  },
  {
    id: "f7", customerId: "c19", customerName: "Peter Onyeka", title: "Respond to negative review",
    notes: "Customer left a public review. Reach out privately to resolve and make it right.",
    dueDate: today.toISOString().split("T")[0], status: "pending", priority: "high",
    createdAt: daysAgo(1),
  },
  {
    id: "f8", customerId: "c10", customerName: "Biodun Ogunleye", title: "58-day re-engagement",
    notes: "Regular customer who has gone quiet. Share new product catalogue.",
    dueDate: daysFromNow(3), status: "pending", priority: "medium",
    createdAt: daysAgo(1),
  },
  {
    id: "f9", customerId: "c1", customerName: "Adaeze Okonkwo", title: "Quarterly relationship check-in",
    notes: "VIP customer — schedule a call to discuss upcoming needs and show appreciation.",
    dueDate: daysFromNow(5), status: "pending", priority: "low",
    createdAt: daysAgo(2),
  },
  {
    id: "f10", customerId: "c12", customerName: "Yusuf Ibrahim", title: "Win-back after 78 days",
    notes: "Reached out once with no reply. Try one more time with a value offer.",
    dueDate: daysAgo(1), status: "overdue", priority: "medium",
    createdAt: daysAgo(8),
  },
  {
    id: "f11", customerId: "c2", customerName: "Emeka Chukwu", title: "Upsell opportunity — new product range",
    notes: "Loyal customer. Share new IT product range that fits his purchase history.",
    dueDate: daysFromNow(7), status: "pending", priority: "low",
    createdAt: daysAgo(1),
  },
  {
    id: "f12", customerId: "c17", customerName: "Musa Garba", title: "Bulk order renewal check-in",
    notes: "VIP bulk buyer. Check if next order is needed soon.",
    dueDate: daysFromNow(4), status: "pending", priority: "medium",
    createdAt: daysAgo(2),
  },
  {
    id: "f13", customerId: "c15", customerName: "Kola Martins", title: "Final win-back attempt",
    notes: "110 days inactive. Last attempt before marking as permanently churned.",
    dueDate: daysAgo(5), status: "done", priority: "high",
    outcome: "No response. Marked as churned in system.", createdAt: daysAgo(15),
  },
  {
    id: "f14", customerId: "c3", customerName: "Fatima Bello", title: "Post-purchase satisfaction check",
    notes: "20 days since last order. Quick check-in to build loyalty.",
    dueDate: daysFromNow(2), status: "done", priority: "low",
    outcome: "Customer happy. Promised to order again next month.", createdAt: daysAgo(3),
  },
];
