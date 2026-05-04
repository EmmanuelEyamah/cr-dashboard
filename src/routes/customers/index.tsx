import { createFileRoute } from "@tanstack/react-router";
import { CustomerList } from "@/pages/Customers/CustomerList";
export const Route = createFileRoute("/customers/")({ component: CustomerList });
