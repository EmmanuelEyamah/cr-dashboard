import { createFileRoute } from "@tanstack/react-router";
import { ComplaintDetail } from "@/pages/Complaints/ComplaintDetail";
export const Route = createFileRoute("/complaints/$id")({ component: ComplaintDetail });
