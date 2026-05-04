import { createFileRoute } from "@tanstack/react-router";
import { AddCustomer } from "@/pages/Customers/AddCustomer";
export const Route = createFileRoute("/customers/new")({ component: AddCustomer });
