import { createFileRoute } from "@tanstack/react-router";
import { ScheduleFollowUp } from "@/pages/FollowUps/ScheduleFollowUp";
export const Route = createFileRoute("/follow-ups/new")({ component: ScheduleFollowUp });
