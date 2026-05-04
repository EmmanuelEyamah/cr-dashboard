import { createFileRoute } from "@tanstack/react-router";
import { RevenueAtRisk } from "@/pages/Revenue/RevenueAtRisk";
export const Route = createFileRoute("/revenue")({ component: RevenueAtRisk });
