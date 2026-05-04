import { createFileRoute } from "@tanstack/react-router";
import { FollowUpQueue } from "@/pages/FollowUps/FollowUpQueue";
export const Route = createFileRoute("/follow-ups/")({ component: FollowUpQueue });
