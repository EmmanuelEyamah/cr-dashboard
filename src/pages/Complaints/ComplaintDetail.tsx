import { motion } from "framer-motion";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, User, Calendar, CheckCircle2, AlertTriangle } from "lucide-react";
import { complaints } from "@/data/complaints";
import { EmptyState } from "@/components/shared/EmptyState";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const statusStyle = {
  open: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  escalated: "bg-destructive/10 text-destructive",
  resolved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

export const ComplaintDetail = () => {
  const { id } = useParams({ from: "/complaints/$id" });
  const complaint = complaints.find(c => c.id === id);

  if (!complaint) return <div className="p-6"><EmptyState title="Not found" message="Complaint does not exist." /></div>;

  return (
    <div className="p-4 md:p-6 max-w-2xl space-y-5">
      <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}>
        <Link to="/complaints" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft size={15} /> Back to Complaints
        </Link>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="rounded-xl border border-border bg-card p-6 space-y-5">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-lg font-black leading-snug">{complaint.title}</h1>
          <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full shrink-0", statusStyle[complaint.status])}>
            {complaint.status}
          </span>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><User size={13} />{complaint.customerName}</span>
          <span className="flex items-center gap-1.5"><Calendar size={13} />Opened {complaint.createdAt}</span>
          {complaint.resolvedAt && <span className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-emerald-500" />Resolved {complaint.resolvedAt}</span>}
        </div>

        <div className="rounded-lg bg-muted/50 p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Description</p>
          <p className="text-sm text-foreground leading-relaxed">{complaint.description}</p>
        </div>

        {complaint.resolutionNotes && (
          <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4">
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 size={12} /> Resolution Notes
            </p>
            <p className="text-sm text-foreground">{complaint.resolutionNotes}</p>
          </div>
        )}

        {complaint.status !== "resolved" && (
          <div className="flex gap-3 pt-2">
            <button onClick={() => toast.success("Complaint marked as resolved.")}
              className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
              Mark Resolved
            </button>
            {complaint.status !== "escalated" && (
              <button onClick={() => toast.error("Complaint escalated.")}
                className="flex-1 py-2.5 rounded-xl border border-destructive/30 text-destructive text-sm font-semibold hover:bg-destructive/5 transition-colors flex items-center justify-center gap-2">
                <AlertTriangle size={14} /> Escalate
              </button>
            )}
          </div>
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <Link to={`/customers/${complaint.customerId}`}
          className="text-sm text-primary hover:underline">
          View {complaint.customerName}'s profile →
        </Link>
      </motion.div>
    </div>
  );
};
