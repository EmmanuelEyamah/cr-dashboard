import { createFileRoute } from "@tanstack/react-router";
import { AtRisk } from "@/pages/Customers/AtRisk";
export const Route = createFileRoute("/at-risk")({ component: AtRisk });
