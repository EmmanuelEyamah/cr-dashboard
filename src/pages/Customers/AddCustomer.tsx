import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</label>
    {children}
  </div>
);

const inputClass = "w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";

export const AddCustomer = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", business: "", notes: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) { toast.error("Name and phone are required."); return; }
    toast.success(`${form.name} added successfully!`);
    navigate({ to: "/customers" });
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl">
      <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <Link to="/customers" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-5 block">
          <ArrowLeft size={15} /> Back to Customers
        </Link>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-black mb-1">Add Customer</h1>
        <p className="text-sm text-muted-foreground mb-6">Create a new customer record to start tracking retention.</p>

        <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Full Name *">
              <input value={form.name} onChange={set("name")} placeholder="e.g. Adaeze Okonkwo" className={inputClass} />
            </Field>
            <Field label="Phone *">
              <input value={form.phone} onChange={set("phone")} placeholder="+234 803 000 0000" className={inputClass} />
            </Field>
            <Field label="Email">
              <input value={form.email} onChange={set("email")} type="email" placeholder="email@example.com" className={inputClass} />
            </Field>
            <Field label="Business / Company">
              <input value={form.business} onChange={set("business")} placeholder="Optional" className={inputClass} />
            </Field>
          </div>
          <Field label="Notes">
            <textarea value={form.notes} onChange={set("notes")} placeholder="Any important context about this customer..."
              rows={3} className={cn(inputClass, "resize-none")} />
          </Field>
          <div className="flex gap-3 pt-2">
            <button type="submit"
              className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
              Add Customer
            </button>
            <Link to="/customers"
              className="px-6 py-2.5 rounded-xl border border-border text-sm font-semibold hover:bg-muted transition-colors">
              Cancel
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
