import type { Complaint } from "@/types";

const today = new Date();
const daysAgo = (n: number) => { const d = new Date(today); d.setDate(d.getDate() - n); return d.toISOString().split("T")[0]; };

export const complaints: Complaint[] = [
  {
    id: "comp1", customerId: "c6", customerName: "Chidi Nwosu",
    title: "Delivery arrived 4 days late",
    description: "Customer placed an order expecting 2-day delivery. Order arrived on day 6 with no communication. Customer had to follow up twice before getting any update.",
    status: "open", createdAt: daysAgo(38), linkedFollowUpId: "f1",
  },
  {
    id: "comp2", customerId: "c11", customerName: "Amaka Obi",
    title: "Wrong items delivered",
    description: "Received 3 incorrect items in order. Requested replacement but never received a response or refund. Customer has since stopped ordering.",
    status: "open", createdAt: daysAgo(72), linkedFollowUpId: "f6",
  },
  {
    id: "comp3", customerId: "c19", customerName: "Peter Onyeka",
    title: "Product quality below expectation",
    description: "Accessories ordered did not match the description on the listing. Customer left a negative review online and has not returned since.",
    status: "escalated", createdAt: daysAgo(50), linkedFollowUpId: "f7",
  },
  {
    id: "comp4", customerId: "c13", customerName: "Taiwo Adeleke",
    title: "Invoice discrepancy",
    description: "Customer was charged more than quoted. Issue raised 85 days ago. No resolution provided to date.",
    status: "open", createdAt: daysAgo(87),
  },
  {
    id: "comp5", customerId: "c8", customerName: "Seun Akinwale",
    title: "No response to messages",
    description: "Customer sent two WhatsApp messages about a follow-up order. No one from the team responded within 7 days.",
    status: "open", createdAt: daysAgo(51), linkedFollowUpId: "f2",
  },
  {
    id: "comp6", customerId: "c3", customerName: "Fatima Bello",
    title: "Delayed refund",
    description: "Refund for a returned item was promised within 5 business days. Took 18 days.",
    status: "resolved", createdAt: daysAgo(40), resolvedAt: daysAgo(22),
    resolutionNotes: "Refund processed. Customer acknowledged receipt and apologised for the delay on our end.",
  },
  {
    id: "comp7", customerId: "c4", customerName: "Tunde Adeyemi",
    title: "Order fulfilment error",
    description: "One item was out of stock but was not communicated at time of order. Customer only found out on delivery day.",
    status: "resolved", createdAt: daysAgo(30), resolvedAt: daysAgo(28),
    resolutionNotes: "Called customer personally, offered 10% discount on next order. Customer satisfied.",
  },
  {
    id: "comp8", customerId: "c14", customerName: "Grace Nzegwu",
    title: "Product arrived damaged",
    description: "Cleaning supplies arrived with broken packaging. Some items were unusable. Customer requested replacement or refund.",
    status: "open", createdAt: daysAgo(90),
  },
  {
    id: "comp9", customerId: "c7", customerName: "Halima Usman",
    title: "Pricing inconsistency",
    description: "Price on website differed from what was charged at checkout. Small difference but created trust concern.",
    status: "resolved", createdAt: daysAgo(50), resolvedAt: daysAgo(48),
    resolutionNotes: "Refunded the difference and updated website pricing.",
  },
  {
    id: "comp10", customerId: "c15", customerName: "Kola Martins",
    title: "Wrong part delivered",
    description: "Auto part ordered was incompatible with the specified vehicle model. Customer requested return but process was not communicated clearly.",
    status: "escalated", createdAt: daysAgo(115),
  },
];
