import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { UserX, ArrowUpRight, Clock } from "lucide-react";
import { customers } from "@/data/customers";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { EmptyState } from "@/components/shared/EmptyState";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export const LostCustomers = () => {
  const lost = customers.filter(c => c.status === "lost" || c.status === "churned");
  const lostOnly = customers.filter(c => c.status === "lost");
  const churnedOnly = customers.filter(c => c.status === "churned");
  const totalLostRevenue = lost.reduce((s, c) => s + c.totalSpend * 0.12, 0);

  return (
    <div className="p-4 md:p-6 space-y-5 max-w-[1400px]">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 rounded-xl bg-orange-500/10"><UserX size={18} className="text-orange-500" /></div>
          <h1 className="text-2xl font-black">Lost Customers</h1>
        </div>
        <p className="text-sm text-muted-foreground">Customers 61+ days inactive. These need a win-back strategy.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Lost (61–90d)", value: lostOnly.length, color: "text-orange-500" },
          { label: "Churned (90d+)", value: churnedOnly.length, color: "text-destructive" },
          { label: "Total Inactive", value: lost.length, color: "text-foreground" },
          { label: "Est. Lost Revenue/mo", value: `₦${(totalLostRevenue / 1000).toFixed(0)}K`, color: "text-destructive" },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className={`text-2xl font-black mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </motion.div>

      {lost.length === 0
        ? <EmptyState title="No lost customers" message="Great — no customers are lost yet." icon={<UserX size={32} />} />
        : (
          <motion.div variants={stagger} initial="hidden" animate="show"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {lost.map(c => {
              const days = Math.floor((Date.now() - new Date(c.lastPurchaseDate).getTime()) / 86400000);
              return (
                <motion.div key={c.id} variants={fadeUp}
                  className="rounded-xl border border-border bg-card p-5 hover:border-orange-500/30 transition-all group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center text-sm font-bold text-orange-600 dark:text-orange-400">
                        {c.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{c.name}</p>
                        <p className="text-xs text-muted-foreground">₦{c.totalSpend.toLocaleString()} lifetime</p>
                      </div>
                    </div>
                    <RiskBadge status={c.status} />
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <Clock size={12} />
                    <span className="text-destructive font-semibold">{days} days inactive</span>
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/customers/${c.id}`}
                      className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg border border-border text-xs font-semibold hover:bg-muted transition-colors">
                      View <ArrowUpRight size={12} />
                    </Link>
                    <Link to="/follow-ups/new"
                      className="flex-1 flex items-center justify-center py-2 rounded-lg bg-orange-500 text-white text-xs font-semibold hover:bg-orange-600 transition-colors">
                      Win Back
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
