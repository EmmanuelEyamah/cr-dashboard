import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Upload, Users, BarChart2 } from "lucide-react";

const steps = [
  { icon: Users, title: "Add your customers", desc: "Import from CSV or add manually. All you need is a name and phone number." },
  { icon: Upload, title: "Log purchase history", desc: "Add past purchases so DoxaIQ can calculate who is active, at-risk, or lost." },
  { icon: BarChart2, title: "See your retention picture", desc: "Your dashboard shows who needs attention, what revenue is at risk, and what to do next." },
];

export const Onboarding = () => (
  <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6">
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      className="w-full max-w-2xl">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4">
          <BarChart2 size={28} className="text-white" />
        </div>
        <h1 className="text-3xl font-black mb-2">Welcome to DoxaIQ</h1>
        <p className="text-muted-foreground">Your customer retention system. Three steps to get started.</p>
      </div>

      <div className="space-y-3 mb-8">
        {steps.map((step, i) => (
          <motion.div key={step.title}
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
            className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <step.icon size={18} className="text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-primary">Step {i + 1}</span>
              </div>
              <p className="font-semibold text-sm mt-0.5">{step.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{step.desc}</p>
            </div>
            <CheckCircle2 size={18} className="text-emerald-500 shrink-0 ml-auto mt-0.5" />
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3">
        <Link to="/customers/new"
          className="flex-1 text-center py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors">
          Add First Customer
        </Link>
        <Link to="/"
          className="flex-1 text-center py-3 rounded-xl border border-border font-semibold text-sm hover:bg-muted transition-colors">
          Go to Dashboard
        </Link>
      </div>
    </motion.div>
  </div>
);
