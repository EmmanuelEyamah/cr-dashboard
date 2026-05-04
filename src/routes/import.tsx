import { createFileRoute } from "@tanstack/react-router";
import { ImportData } from "@/pages/Import/ImportData";
export const Route = createFileRoute("/import")({ component: ImportData });
