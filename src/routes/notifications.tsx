import { createFileRoute } from "@tanstack/react-router";
import { Notifications } from "@/pages/Notifications/Notifications";
export const Route = createFileRoute("/notifications")({ component: Notifications });
