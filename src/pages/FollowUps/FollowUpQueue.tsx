import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Plus, Clock, AlertCircle, CheckCircle2 } from "lucide-react";
import { followUps } from "@/data/followUps";
import { EmptyState } from "@/components/shared/EmptyState";
import { cn } from "@/lib/utils";
import type { FollowUpStatus } from "@/types";

const tabs: { label: string; value: "all" | FollowUpStatus }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Overdue", value: "overdue" },
  { label: "Done", value: "done" },
  { label: "Escalated", value: "escalated" },
];

const priorityColor = { high: "bg-destructive/10 text-destructive", medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400", low: "bg-primary/10 text-primary" };
const statusIcon = { pending: Clock, overdue: AlertCircle, done: CheckCircle2, escalated: AlertCircle };
const statusColor = { pending: "text-primary", overdue: "text-destructive", done: "text-emerald-500", escalated: "text-destructive" };

export const FollowUpQueue = () => {
  const [tab, setTab] = useState<"all" | FollowUpStatus>("all");
  const filtered = tab === "all" ? followUps : followUps.filter(f => f.status === tab);
  const sorted = [...filtered].sort((a, b) => {
    const order = { overdue: 0, pending: 1, escalated: 2, done: 3 };
    return order[a.status] - order[b.status];
  });

  return (
    <div className="p-4 md:p-6 space-y-5 max-w-[1200px]">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black">Follow-Up Queue</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {followUps.filter(f => f.status === "overdue").length} overdue · {followUps.filter(f => f.status === "pending").length} pending
          </p>
        </div>
        <Link to="/follow-ups/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
          <Plus size={16} /> Schedule Follow-up
        </Link>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}
        className="flex gap-1.5 overflow-x-auto pb-1">
        {tabs.map(t => (
          <button key={t.value} onClick={() => setTab(t.value)}
            className={cn("px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all",
              tab === t.value ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground")}>
            {t.label}
          </button>
        ))}
      </motion.div>

      {sorted.length === 0
        ? <EmptyState title="No follow-ups" message="Nothing here yet." />
        : (
          <div className="space-y-2">
            {sorted.map((f, i) => {
              const Icon = statusIcon[f.status];
              return (
                <motion.div key={f.id}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}>
                  <Link to={`/follow-ups/${f.id}`}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all group">
                    <Icon size={18} className={cn(statusColor[f.status], "shrink-0")} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold line-clamp-1">{f.title}</p>
                        <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", priorityColor[f.priority])}>
                          {f.priority}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{f.customerName} · Due {f.dueDate}</p>
                    </div>
                    <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full shrink-0",
                      f.status === "done" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                      f.status === "overdue" ? "bg-destructive/10 text-destructive" :
                      f.status === "escalated" ? "bg-destructive/10 text-destructive" :
                      "bg-primary/10 text-primary")}>
                      {f.status}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
    </div>
  );
};
