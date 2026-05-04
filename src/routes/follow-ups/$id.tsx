import { createFileRoute } from "@tanstack/react-router";
import { FollowUpDetail } from "@/pages/FollowUps/FollowUpDetail";
export const Route = createFileRoute("/follow-ups/$id")({ component: FollowUpDetail });
