import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { MessageSquareWarning, ArrowUpRight } from "lucide-react";
import { complaints } from "@/data/complaints";
import { EmptyState } from "@/components/shared/EmptyState";
import { cn } from "@/lib/utils";
import type { ComplaintStatus } from "@/types";

const tabs: { label: string; value: "all" | ComplaintStatus }[] = [
  { label: "All", value: "all" },
  { label: "Open", value: "open" },
  { label: "Escalated", value: "escalated" },
  { label: "Resolved", value: "resolved" },
];

const statusStyle: Record<ComplaintStatus, string> = {
  open: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  escalated: "bg-destructive/10 text-destructive",
  resolved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

export const ComplaintsLog = () => {
  const [tab, setTab] = useState<"all" | ComplaintStatus>("all");
  const filtered = tab === "all" ? complaints : complaints.filter(c => c.status === tab);
  const open = complaints.filter(c => c.status === "open").length;
  const escalated = complaints.filter(c => c.status === "escalated").length;

  return (
    <div className="p-4 md:p-6 space-y-5 max-w-[1200px]">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 rounded-xl bg-amber-500/10"><MessageSquareWarning size={18} className="text-amber-500" /></div>
          <h1 className="text-2xl font-black">Complaints Log</h1>
        </div>
        <p className="text-sm text-muted-foreground">{open} open · {escalated} escalated · {complaints.filter(c => c.status === "resolved").length} resolved</p>
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

      {filtered.length === 0
        ? <EmptyState title="No complaints" message="Nothing here." />
        : (
          <div className="space-y-3">
            {filtered.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <Link to={`/complaints/${c.id}`}
                  className="flex items-start justify-between gap-4 p-4 md:p-5 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all group">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={cn("text-xs font-semibold px-2.5 py-0.5 rounded-full", statusStyle[c.status])}>{c.status}</span>
                      <span className="text-xs text-muted-foreground">{c.customerName} · {c.createdAt}</span>
                    </div>
                    <p className="text-sm font-semibold group-hover:text-primary transition-colors">{c.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{c.description}</p>
                  </div>
                  <ArrowUpRight size={16} className="text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0 mt-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
    </div>
  );
};
