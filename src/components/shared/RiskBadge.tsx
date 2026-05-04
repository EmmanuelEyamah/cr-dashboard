import { cn } from "@/lib/utils";
import type { RiskStatus } from "@/types";

const config: Record<RiskStatus, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  "at-risk": { label: "At Risk", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  lost: { label: "Lost", className: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" },
  churned: { label: "Churned", className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
};

interface RiskBadgeProps {
  status: RiskStatus;
  className?: string;
}

export const RiskBadge = ({ status, className }: RiskBadgeProps) => {
  const { label, className: statusClass } = config[status];
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold", statusClass, className)}>
      {label}
    </span>
  );
};
