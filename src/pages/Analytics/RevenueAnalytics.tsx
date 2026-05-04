import { motion } from "framer-motion";
import { revenueData } from "@/data/analytics";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const fmt = (v: number) => `₦${(v / 1000000).toFixed(1)}M`;
const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

export const RevenueAnalytics = () => {
  const totalRevenue = revenueData.reduce((s, d) => s + d.revenue, 0);
  const totalAtRisk = revenueData.reduce((s, d) => s + d.atRiskRevenue, 0);
  const totalRecovered = revenueData.reduce((s, d) => s + d.recovered, 0);
  const latest = revenueData[revenueData.length - 1];
  const prev = revenueData[revenueData.length - 2];
  const trend = ((latest.revenue - prev.revenue) / prev.revenue * 100).toFixed(1);

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1400px]">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-black">Revenue Analytics</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Revenue performance and at-risk exposure over 6 months</p>
      </motion.div>

      <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "6-Month Revenue", value: fmt(totalRevenue), sub: "total earned" },
          { label: "Latest Month", value: fmt(latest.revenue), sub: `${Number(trend) >= 0 ? "+" : ""}${trend}% vs prior month`, positive: Number(trend) >= 0 },
          { label: "Total At Risk", value: fmt(totalAtRisk), sub: "cumulative exposure", negative: true },
          { label: "Revenue Recovered", value: fmt(totalRecovered), sub: "from win-back efforts", positive: true },
        ].map(k => (
          <motion.div key={k.label} variants={fadeUp} className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs text-muted-foreground">{k.label}</p>
            <p className={`text-2xl font-black mt-1 ${k.negative ? "text-destructive" : ""}`}>{k.value}</p>
            <p className={`text-xs mt-1 ${k.positive ? "text-emerald-500" : k.negative ? "text-destructive/70" : "text-muted-foreground"}`}>{k.sub}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.15 }}
        className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold mb-4">Revenue vs At-Risk Exposure</h2>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={revenueData} margin={{ left: -10, right: 10 }}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={v => `₦${(v / 1000000).toFixed(1)}M`} />
            <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "10px", fontSize: "12px" }} formatter={(v: number, name: string) => [fmt(v), name]} />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} fill="url(#revGrad)" name="Revenue" dot={{ fill: "#6366f1", r: 4 }} />
            <Area type="monotone" dataKey="atRiskRevenue" stroke="#ef4444" strokeWidth={2} fill="url(#riskGrad)" name="At-Risk Revenue" dot={{ fill: "#ef4444", r: 3 }} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }}
        className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold mb-4">Monthly Revenue Breakdown</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={revenueData} margin={{ left: -10, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={v => `₦${(v / 1000000).toFixed(1)}M`} />
            <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "10px", fontSize: "12px" }} formatter={(v: number, name: string) => [fmt(v), name]} />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Bar dataKey="revenue" fill="#6366f1" radius={[6, 6, 0, 0]} name="Revenue" />
            <Bar dataKey="recovered" fill="#10b981" radius={[6, 6, 0, 0]} name="Recovered" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};
