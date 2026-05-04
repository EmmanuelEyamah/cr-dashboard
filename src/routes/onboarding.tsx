import { createFileRoute } from "@tanstack/react-router";
import { Onboarding } from "@/pages/Onboarding/Onboarding";
export const Route = createFileRoute("/onboarding")({ component: Onboarding });
