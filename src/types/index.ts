export type RiskStatus = "active" | "at-risk" | "lost" | "churned";

export interface RFMScore {
  recency: number;
  frequency: number;
  monetary: number;
  total: number;
}

export interface Purchase {
  id: string;
  date: string;
  amount: number;
  description: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  business?: string;
  avatar?: string;
  status: RiskStatus;
  rfm: RFMScore;
  totalSpend: number;
  totalPurchases: number;
  lastPurchaseDate: string;
  joinDate: string;
  purchases: Purchase[];
  tags: string[];
  notes?: string;
}

export type FollowUpStatus = "pending" | "done" | "escalated" | "overdue";
export type FollowUpPriority = "high" | "medium" | "low";

export interface FollowUp {
  id: string;
  customerId: string;
  customerName: string;
  title: string;
  notes: string;
  dueDate: string;
  status: FollowUpStatus;
  priority: FollowUpPriority;
  outcome?: string;
  createdAt: string;
}

export type ComplaintStatus = "open" | "resolved" | "escalated";

export interface Complaint {
  id: string;
  customerId: string;
  customerName: string;
  title: string;
  description: string;
  status: ComplaintStatus;
  createdAt: string;
  resolvedAt?: string;
  resolutionNotes?: string;
  linkedFollowUpId?: string;
}

export interface RevenueAtRiskItem {
  customerId: string;
  customerName: string;
  status: RiskStatus;
  totalSpend: number;
  lastPurchaseDate: string;
  daysSinceLastPurchase: number;
  estimatedMonthlyValue: number;
}

export interface RetentionDataPoint {
  month: string;
  rate: number;
  active: number;
  atRisk: number;
  lost: number;
  churned: number;
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  atRiskRevenue: number;
  recovered: number;
}
