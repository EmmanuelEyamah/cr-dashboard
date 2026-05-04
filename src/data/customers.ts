import type { Customer } from "@/types";

const today = new Date();
const daysAgo = (n: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0];
};

const monthsAgo = (n: number) => {
  const d = new Date(today);
  d.setMonth(d.getMonth() - n);
  return d.toISOString().split("T")[0];
};

function rfm(r: number, f: number, m: number) {
  return { recency: r, frequency: f, monetary: m, total: Math.round((r + f + m) / 3) };
}

export const customers: Customer[] = [
  {
    id: "c1", name: "Adaeze Okonkwo", email: "adaeze@okonkwoltd.com", phone: "+234 803 411 2210",
    business: "Okonkwo Interiors", status: "active", rfm: rfm(5, 5, 5), totalSpend: 2480000,
    totalPurchases: 14, lastPurchaseDate: daysAgo(5), joinDate: monthsAgo(18),
    tags: ["VIP", "repeat buyer"], notes: "Prefers WhatsApp updates. Premium client.",
    purchases: [
      { id: "p1", date: daysAgo(5), amount: 180000, description: "Office supplies bulk" },
      { id: "p2", date: daysAgo(32), amount: 220000, description: "Furniture package" },
      { id: "p3", date: daysAgo(65), amount: 195000, description: "Décor items" },
    ],
  },
  {
    id: "c2", name: "Emeka Chukwu", email: "emeka.chukwu@gmail.com", phone: "+234 812 300 9988",
    business: "ChukwuTech Solutions", status: "active", rfm: rfm(5, 4, 4), totalSpend: 1120000,
    totalPurchases: 9, lastPurchaseDate: daysAgo(12), joinDate: monthsAgo(12),
    tags: ["loyal"], purchases: [
      { id: "p4", date: daysAgo(12), amount: 145000, description: "IT accessories" },
      { id: "p5", date: daysAgo(45), amount: 90000, description: "Networking gear" },
    ],
  },
  {
    id: "c3", name: "Fatima Bello", email: "fatima.bello@outlook.com", phone: "+234 706 812 3344",
    status: "active", rfm: rfm(4, 3, 4), totalSpend: 680000, totalPurchases: 6,
    lastPurchaseDate: daysAgo(20), joinDate: monthsAgo(8), tags: ["active"],
    purchases: [
      { id: "p6", date: daysAgo(20), amount: 95000, description: "Skincare products" },
      { id: "p7", date: daysAgo(55), amount: 110000, description: "Wellness package" },
    ],
  },
  {
    id: "c4", name: "Tunde Adeyemi", email: "tunde.ade@gmail.com", phone: "+234 803 555 1234",
    business: "Adeyemi Logistics", status: "active", rfm: rfm(4, 4, 3), totalSpend: 890000,
    totalPurchases: 8, lastPurchaseDate: daysAgo(25), joinDate: monthsAgo(14), tags: ["loyal"],
    purchases: [
      { id: "p8", date: daysAgo(25), amount: 120000, description: "Fleet supplies" },
    ],
  },
  {
    id: "c5", name: "Ngozi Eze", email: "ngozi.eze@yahoo.com", phone: "+234 817 223 9900",
    status: "active", rfm: rfm(4, 3, 3), totalSpend: 520000, totalPurchases: 5,
    lastPurchaseDate: daysAgo(28), joinDate: monthsAgo(10), tags: ["active"],
    purchases: [
      { id: "p9", date: daysAgo(28), amount: 75000, description: "Office stationery" },
    ],
  },
  {
    id: "c6", name: "Chidi Nwosu", email: "chidi.nwosu@gmail.com", phone: "+234 809 441 7722",
    status: "at-risk", rfm: rfm(3, 3, 3), totalSpend: 445000, totalPurchases: 5,
    lastPurchaseDate: daysAgo(38), joinDate: monthsAgo(9), tags: ["needs follow-up"],
    notes: "Complained about delivery speed in last order.",
    purchases: [
      { id: "p10", date: daysAgo(38), amount: 85000, description: "Workshop tools" },
      { id: "p11", date: daysAgo(75), amount: 60000, description: "Safety equipment" },
    ],
  },
  {
    id: "c7", name: "Halima Usman", email: "halima.usman@gmail.com", phone: "+234 703 887 2211",
    business: "Usman Catering", status: "at-risk", rfm: rfm(3, 2, 3), totalSpend: 310000,
    totalPurchases: 4, lastPurchaseDate: daysAgo(44), joinDate: monthsAgo(7), tags: ["at-risk"],
    purchases: [
      { id: "p12", date: daysAgo(44), amount: 70000, description: "Catering supplies" },
    ],
  },
  {
    id: "c8", name: "Seun Akinwale", email: "seun.a@live.com", phone: "+234 805 312 6600",
    status: "at-risk", rfm: rfm(2, 3, 4), totalSpend: 760000, totalPurchases: 7,
    lastPurchaseDate: daysAgo(50), joinDate: monthsAgo(15), tags: ["high value", "at-risk"],
    notes: "Has not responded to last two WhatsApp messages.",
    purchases: [
      { id: "p13", date: daysAgo(50), amount: 140000, description: "Bulk merchandise" },
      { id: "p14", date: daysAgo(82), amount: 95000, description: "Seasonal stock" },
    ],
  },
  {
    id: "c9", name: "Rukayat Lawal", email: "rukayat.lawal@gmail.com", phone: "+234 816 992 4455",
    business: "Lawal Beauty Hub", status: "at-risk", rfm: rfm(3, 2, 2), totalSpend: 225000,
    totalPurchases: 3, lastPurchaseDate: daysAgo(55), joinDate: monthsAgo(6), tags: ["at-risk"],
    purchases: [
      { id: "p15", date: daysAgo(55), amount: 65000, description: "Beauty products" },
    ],
  },
  {
    id: "c10", name: "Biodun Ogunleye", email: "biodun.og@gmail.com", phone: "+234 812 001 5599",
    status: "at-risk", rfm: rfm(2, 2, 3), totalSpend: 390000, totalPurchases: 4,
    lastPurchaseDate: daysAgo(58), joinDate: monthsAgo(11), tags: ["at-risk"],
    purchases: [
      { id: "p16", date: daysAgo(58), amount: 98000, description: "Construction materials" },
    ],
  },
  {
    id: "c11", name: "Amaka Obi", email: "amaka.obi@gmail.com", phone: "+234 806 772 3310",
    business: "Obi Farms", status: "lost", rfm: rfm(2, 2, 2), totalSpend: 185000,
    totalPurchases: 3, lastPurchaseDate: daysAgo(70), joinDate: monthsAgo(8), tags: ["lost"],
    notes: "Had unresolved complaint 2 months ago.",
    purchases: [
      { id: "p17", date: daysAgo(70), amount: 50000, description: "Farm inputs" },
    ],
  },
  {
    id: "c12", name: "Yusuf Ibrahim", email: "yusuf.ibrahim@gmail.com", phone: "+234 703 441 8820",
    status: "lost", rfm: rfm(2, 1, 2), totalSpend: 145000, totalPurchases: 2,
    lastPurchaseDate: daysAgo(78), joinDate: monthsAgo(5), tags: ["lost"],
    purchases: [
      { id: "p18", date: daysAgo(78), amount: 75000, description: "Office equipment" },
    ],
  },
  {
    id: "c13", name: "Taiwo Adeleke", email: "taiwo.ade@gmail.com", phone: "+234 815 663 9988",
    business: "Adeleke Events", status: "lost", rfm: rfm(1, 2, 3), totalSpend: 490000,
    totalPurchases: 5, lastPurchaseDate: daysAgo(85), joinDate: monthsAgo(16), tags: ["high value", "lost"],
    purchases: [
      { id: "p19", date: daysAgo(85), amount: 120000, description: "Event supplies" },
      { id: "p20", date: daysAgo(120), amount: 95000, description: "Audio equipment" },
    ],
  },
  {
    id: "c14", name: "Grace Nzegwu", email: "grace.nzegwu@yahoo.com", phone: "+234 802 883 4421",
    status: "lost", rfm: rfm(1, 1, 2), totalSpend: 110000, totalPurchases: 2,
    lastPurchaseDate: daysAgo(88), joinDate: monthsAgo(4), tags: ["lost"],
    purchases: [
      { id: "p21", date: daysAgo(88), amount: 55000, description: "Cleaning supplies" },
    ],
  },
  {
    id: "c15", name: "Kola Martins", email: "kola.martins@gmail.com", phone: "+234 814 220 7765",
    business: "Martins Auto", status: "churned", rfm: rfm(1, 1, 1), totalSpend: 95000,
    totalPurchases: 2, lastPurchaseDate: daysAgo(110), joinDate: monthsAgo(7), tags: ["churned"],
    purchases: [
      { id: "p22", date: daysAgo(110), amount: 48000, description: "Auto parts" },
    ],
  },
  {
    id: "c16", name: "Blessing Adekunle", email: "blessing.ak@gmail.com", phone: "+234 805 331 9920",
    status: "churned", rfm: rfm(1, 1, 1), totalSpend: 78000, totalPurchases: 1,
    lastPurchaseDate: daysAgo(125), joinDate: monthsAgo(5), tags: ["churned"],
    purchases: [
      { id: "p23", date: daysAgo(125), amount: 78000, description: "Interior furnishings" },
    ],
  },
  {
    id: "c17", name: "Musa Garba", email: "musa.garba@gmail.com", phone: "+234 708 991 4433",
    business: "Garba Traders", status: "active", rfm: rfm(5, 4, 5), totalSpend: 1850000,
    totalPurchases: 12, lastPurchaseDate: daysAgo(8), joinDate: monthsAgo(20),
    tags: ["VIP", "loyal", "bulk buyer"],
    purchases: [
      { id: "p24", date: daysAgo(8), amount: 210000, description: "Wholesale goods" },
      { id: "p25", date: daysAgo(40), amount: 180000, description: "Bulk purchase" },
    ],
  },
  {
    id: "c18", name: "Sade Fashola", email: "sade.fashola@gmail.com", phone: "+234 803 778 5544",
    status: "active", rfm: rfm(4, 4, 4), totalSpend: 720000, totalPurchases: 7,
    lastPurchaseDate: daysAgo(15), joinDate: monthsAgo(11), tags: ["active", "loyal"],
    purchases: [
      { id: "p26", date: daysAgo(15), amount: 95000, description: "Fashion merchandise" },
    ],
  },
  {
    id: "c19", name: "Peter Onyeka", email: "peter.onyeka@gmail.com", phone: "+234 812 445 6611",
    status: "at-risk", rfm: rfm(2, 3, 3), totalSpend: 430000, totalPurchases: 5,
    lastPurchaseDate: daysAgo(47), joinDate: monthsAgo(9), tags: ["at-risk"],
    notes: "Left a negative review online last month.",
    purchases: [
      { id: "p27", date: daysAgo(47), amount: 88000, description: "Tech accessories" },
    ],
  },
  {
    id: "c20", name: "Ifeoma Agu", email: "ifeoma.agu@outlook.com", phone: "+234 817 220 8830",
    business: "Agu Pharmaceuticals", status: "active", rfm: rfm(5, 5, 4), totalSpend: 1380000,
    totalPurchases: 10, lastPurchaseDate: daysAgo(7), joinDate: monthsAgo(14), tags: ["VIP"],
    purchases: [
      { id: "p28", date: daysAgo(7), amount: 160000, description: "Medical supplies" },
      { id: "p29", date: daysAgo(38), amount: 140000, description: "Lab equipment" },
    ],
  },
];
