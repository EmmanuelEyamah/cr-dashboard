import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { customers } from "@/data/customers";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const inputClass = "w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";
const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</label>
    {children}
  </div>
);

export const ScheduleFollowUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ customerId: "", title: "", notes: "", dueDate: "", priority: "medium" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customerId || !form.title || !form.dueDate) { toast.error("Please fill required fields."); return; }
    toast.success("Follow-up scheduled!");
    navigate({ to: "/follow-ups" });
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl space-y-5">
      <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}>
        <Link to="/follow-ups" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft size={15} /> Back to Follow-ups
        </Link>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-black mb-1">Schedule Follow-up</h1>
        <p className="text-sm text-muted-foreground mb-6">Create a follow-up task for a customer.</p>

        <form onSubmit={submit} className="rounded-xl border border-border bg-card p-6 space-y-5">
          <Field label="Customer *">
            <select value={form.customerId} onChange={set("customerId")} className={inputClass}>
              <option value="">Select customer...</option>
              {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </Field>
          <Field label="Title *">
            <input value={form.title} onChange={set("title")} placeholder="e.g. Re-engagement call" className={inputClass} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Due Date *">
              <input type="date" value={form.dueDate} onChange={set("dueDate")} className={inputClass} />
            </Field>
            <Field label="Priority">
              <select value={form.priority} onChange={set("priority")} className={inputClass}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </Field>
          </div>
          <Field label="Notes">
            <textarea value={form.notes} onChange={set("notes")} rows={3} placeholder="Context, what to say, what to offer..."
              className={cn(inputClass, "resize-none")} />
          </Field>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
              Schedule
            </button>
            <Link to="/follow-ups" className="px-6 py-2.5 rounded-xl border border-border text-sm font-semibold hover:bg-muted transition-colors">
              Cancel
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
