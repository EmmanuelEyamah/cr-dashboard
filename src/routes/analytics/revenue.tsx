import { createFileRoute } from "@tanstack/react-router";
import { RevenueAnalytics } from "@/pages/Analytics/RevenueAnalytics";
export const Route = createFileRoute("/analytics/revenue")({ component: RevenueAnalytics });
