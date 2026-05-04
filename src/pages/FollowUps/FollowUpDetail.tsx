import { motion } from "framer-motion";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, User, Calendar, Flag, CheckCircle2 } from "lucide-react";
import { followUps } from "@/data/followUps";
import { EmptyState } from "@/components/shared/EmptyState";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const priorityColor = { high: "text-destructive bg-destructive/10", medium: "text-amber-500 bg-amber-500/10", low: "text-primary bg-primary/10" };
const statusColor = { pending: "text-primary bg-primary/10", overdue: "text-destructive bg-destructive/10", done: "text-emerald-600 bg-emerald-500/10", escalated: "text-destructive bg-destructive/10" };

export const FollowUpDetail = () => {
  const { id } = useParams({ from: "/follow-ups/$id" });
  const followUp = followUps.find(f => f.id === id);

  if (!followUp) return <div className="p-6"><EmptyState title="Not found" message="This follow-up does not exist." /></div>;

  return (
    <div className="p-4 md:p-6 max-w-2xl space-y-5">
      <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}>
        <Link to="/follow-ups" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft size={15} /> Back to Follow-ups
        </Link>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="rounded-xl border border-border bg-card p-6 space-y-5">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-lg font-black leading-snug">{followUp.title}</h1>
          <div className="flex gap-2 shrink-0">
            <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", priorityColor[followUp.priority])}>{followUp.priority}</span>
            <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", statusColor[followUp.status])}>{followUp.status}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <User size={14} />
            <span>{followUp.customerName}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar size={14} />
            <span>Due {followUp.dueDate}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Flag size={14} />
            <span>Created {followUp.createdAt}</span>
          </div>
        </div>

        <div className="rounded-lg bg-muted/50 p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Notes</p>
          <p className="text-sm text-foreground leading-relaxed">{followUp.notes}</p>
        </div>

        {followUp.outcome && (
          <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4">
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 size={12} /> Outcome
            </p>
            <p className="text-sm text-foreground">{followUp.outcome}</p>
          </div>
        )}

        {followUp.status !== "done" && (
          <div className="flex gap-3 pt-2">
            <button onClick={() => toast.success("Marked as done!")}
              className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
              Mark as Done
            </button>
            <button onClick={() => toast.error("Follow-up escalated.")}
              className="flex-1 py-2.5 rounded-xl border border-border text-sm font-semibold hover:bg-muted transition-colors">
              Escalate
            </button>
          </div>
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <Link to={`/customers/${followUp.customerId}`}
          className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
          View {followUp.customerName}'s full profile →
        </Link>
      </motion.div>
    </div>
  );
};
