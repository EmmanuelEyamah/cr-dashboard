import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { TrendingDown, ArrowUpRight, Clock } from "lucide-react";
import { customers } from "@/data/customers";
import { RiskBadge } from "@/components/shared/RiskBadge";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export const RevenueAtRisk = () => {
  const atRiskCustomers = customers
    .filter(c => c.status !== "active")
    .map(c => {
      const days = Math.floor((Date.now() - new Date(c.lastPurchaseDate).getTime()) / 86400000);
      const monthlyValue = c.totalSpend / Math.max(1, Math.floor((Date.now() - new Date(c.joinDate).getTime()) / (86400000 * 30)));
      return { ...c, days, monthlyValue };
    })
    .sort((a, b) => b.monthlyValue - a.monthlyValue);

  const totalRisk = atRiskCustomers.reduce((s, c) => s + c.monthlyValue, 0);
  const atRiskOnly = atRiskCustomers.filter(c => c.status === "at-risk");
  const lostAndChurned = atRiskCustomers.filter(c => c.status === "lost" || c.status === "churned");

  return (
    <div className="p-4 md:p-6 space-y-5 max-w-[1400px]">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 rounded-xl bg-destructive/10"><TrendingDown size={18} className="text-destructive" /></div>
          <h1 className="text-2xl font-black">Revenue at Risk</h1>
        </div>
        <p className="text-sm text-muted-foreground">Estimated monthly revenue from customers no longer purchasing.</p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Est. Monthly Risk", value: `₦${(totalRisk / 1000).toFixed(0)}K`, sub: `across ${atRiskCustomers.length} inactive customers`, color: "text-destructive", big: true },
          { label: "At-Risk (31–60d)", value: `₦${(atRiskOnly.reduce((s, c) => s + c.monthlyValue, 0) / 1000).toFixed(0)}K/mo`, sub: `${atRiskOnly.length} customers — recoverable`, color: "text-amber-500" },
          { label: "Lost + Churned (60d+)", value: `₦${(lostAndChurned.reduce((s, c) => s + c.monthlyValue, 0) / 1000).toFixed(0)}K/mo`, sub: `${lostAndChurned.length} customers — needs win-back`, color: "text-destructive" },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
            <p className={`font-black mt-1 ${s.big ? "text-3xl" : "text-2xl"} ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
          </div>
        ))}
      </motion.div>

      {/* Table */}
      <motion.div variants={stagger} initial="hidden" animate="show"
        className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold">Customers by Revenue Exposure</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Customer</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground hidden md:table-cell">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground hidden md:table-cell">Days Inactive</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Lifetime Spend</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Est. Monthly Risk</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {atRiskCustomers.map((c, i) => (
                <motion.tr key={c.id} variants={fadeUp}
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors group">
                  <td className="px-5 py-3.5">
                    <div>
                      <p className="font-semibold">{c.name}</p>
                      {c.business && <p className="text-xs text-muted-foreground">{c.business}</p>}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell"><RiskBadge status={c.status} /></td>
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
                      <Clock size={12} />{c.days}d
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-semibold">₦{c.totalSpend.toLocaleString()}</td>
                  <td className="px-5 py-3.5">
                    <span className="font-bold text-destructive">₦{Math.round(c.monthlyValue).toLocaleString()}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <Link to={`/customers/${c.id}`}
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                      View <ArrowUpRight size={12} />
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};
