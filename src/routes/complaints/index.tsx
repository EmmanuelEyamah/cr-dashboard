import { createFileRoute } from "@tanstack/react-router";
import { ComplaintsLog } from "@/pages/Complaints/ComplaintsLog";
export const Route = createFileRoute("/complaints/")({ component: ComplaintsLog });
