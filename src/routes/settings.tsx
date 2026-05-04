import { createFileRoute } from "@tanstack/react-router";
import { AppSettings } from "@/pages/Settings/AppSettings";
export const Route = createFileRoute("/settings")({ component: AppSettings });
