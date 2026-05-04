import type { RetentionDataPoint, RevenueDataPoint } from "@/types";

export const retentionData: RetentionDataPoint[] = [
  { month: "Nov", rate: 78, active: 18, atRisk: 4, lost: 2, churned: 1 },
  { month: "Dec", rate: 81, active: 19, atRisk: 3, lost: 2, churned: 1 },
  { month: "Jan", rate: 76, active: 17, atRisk: 5, lost: 3, churned: 1 },
  { month: "Feb", rate: 72, active: 16, atRisk: 6, lost: 3, churned: 2 },
  { month: "Mar", rate: 69, active: 15, atRisk: 7, lost: 4, churned: 2 },
  { month: "Apr", rate: 74, active: 16, atRisk: 5, lost: 4, churned: 2 },
];

export const revenueData: RevenueDataPoint[] = [
  { month: "Nov", revenue: 4200000, atRiskRevenue: 820000, recovered: 210000 },
  { month: "Dec", revenue: 5100000, atRiskRevenue: 740000, recovered: 380000 },
  { month: "Jan", revenue: 3900000, atRiskRevenue: 980000, recovered: 290000 },
  { month: "Feb", revenue: 4400000, atRiskRevenue: 1100000, recovered: 320000 },
  { month: "Mar", revenue: 3750000, atRiskRevenue: 1350000, recovered: 180000 },
  { month: "Apr", revenue: 4650000, atRiskRevenue: 1180000, recovered: 410000 },
];

export const rfmDistribution = [
  { score: "Champions (5)", count: 3, color: "#6366f1" },
  { score: "Loyal (4)", count: 5, color: "#8b5cf6" },
  { score: "At Risk (3)", count: 5, color: "#f59e0b" },
  { score: "Lost (2)", count: 4, color: "#f97316" },
  { score: "Churned (1)", count: 3, color: "#ef4444" },
];

export const customerSegments = [
  { name: "Active", value: 8, color: "#6366f1" },
  { name: "At-Risk", value: 5, color: "#f59e0b" },
  { name: "Lost", value: 4, color: "#f97316" },
  { name: "Churned", value: 3, color: "#ef4444" },
];
