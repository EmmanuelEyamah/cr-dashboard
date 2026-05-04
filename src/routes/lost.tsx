import { createFileRoute } from "@tanstack/react-router";
import { LostCustomers } from "@/pages/Customers/LostCustomers";
export const Route = createFileRoute("/lost")({ component: LostCustomers });
