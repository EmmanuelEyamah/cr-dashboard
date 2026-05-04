import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowUpRight, Clock } from "lucide-react";
import { customers } from "@/data/customers";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { EmptyState } from "@/components/shared/EmptyState";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export const AtRisk = () => {
  const atRisk = customers.filter(c => c.status === "at-risk");
  const totalAtRiskRevenue = atRisk.reduce((s, c) => s + c.totalSpend * 0.15, 0);

  return (
    <div className="p-4 md:p-6 space-y-5 max-w-[1400px]">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 rounded-xl bg-amber-500/10"><AlertTriangle size={18} className="text-amber-500" /></div>
          <h1 className="text-2xl font-black">At-Risk Customers</h1>
        </div>
        <p className="text-sm text-muted-foreground">Customers who haven't purchased in 31–60 days. Act now before they're lost.</p>
      </motion.div>

      {/* Summary */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "Customers At Risk", value: atRisk.length, color: "text-amber-500" },
          { label: "Est. Revenue at Risk", value: `₦${(totalAtRiskRevenue / 1000).toFixed(0)}K/mo`, color: "text-destructive" },
          { label: "Avg Days Since Last Purchase", value: `${Math.round(atRisk.reduce((s, c) => s + Math.floor((Date.now() - new Date(c.lastPurchaseDate).getTime()) / 86400000), 0) / (atRisk.length || 1))} days`, color: "text-foreground" },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className={`text-2xl font-black mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Customer Cards */}
      {atRisk.length === 0
        ? <EmptyState title="No at-risk customers" message="All customers have purchased recently." icon={<AlertTriangle size={32} />} />
        : (
          <motion.div variants={stagger} initial="hidden" animate="show"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {atRisk.map(c => {
              const days = Math.floor((Date.now() - new Date(c.lastPurchaseDate).getTime()) / 86400000);
              const urgency = days > 55 ? "high" : days > 45 ? "medium" : "low";
              return (
                <motion.div key={c.id} variants={fadeUp}
                  className="rounded-xl border border-border bg-card p-5 hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/5 transition-all group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center text-sm font-bold text-amber-600 dark:text-amber-400">
                        {c.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{c.name}</p>
                        {c.business && <p className="text-xs text-muted-foreground">{c.business}</p>}
                      </div>
                    </div>
                    <RiskBadge status={c.status} />
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock size={12} />
                      <span className={urgency === "high" ? "text-destructive font-semibold" : urgency === "medium" ? "text-amber-500 font-semibold" : ""}>{days} days since last purchase</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Total spend</span>
                      <span className="font-semibold">₦{c.totalSpend.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">RFM Score</span>
                      <span className="font-bold text-amber-500">{c.rfm.total}/5</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/customers/${c.id}`}
                      className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg border border-border text-xs font-semibold hover:bg-muted transition-colors">
                      View Profile <ArrowUpRight size={12} />
                    </Link>
                    <Link to="/follow-ups/new"
                      className="flex-1 flex items-center justify-center py-2 rounded-lg bg-amber-500 text-white text-xs font-semibold hover:bg-amber-600 transition-colors">
                      Follow Up
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
    </div>
  );
};
