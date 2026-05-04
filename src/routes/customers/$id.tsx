import { createFileRoute } from "@tanstack/react-router";
import { CustomerProfile } from "@/pages/Customers/CustomerProfile";
export const Route = createFileRoute("/customers/$id")({ component: CustomerProfile });
