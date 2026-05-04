import { createFileRoute } from "@tanstack/react-router";
import { RetentionAnalytics } from "@/pages/Analytics/RetentionAnalytics";
export const Route = createFileRoute("/analytics/retention")({ component: RetentionAnalytics });
