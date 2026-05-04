import { motion } from "framer-motion";
import { retentionData, rfmDistribution, customerSegments } from "@/data/analytics";
import { customers } from "@/data/customers";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

export const RetentionAnalytics = () => {
  const avgRetention = Math.round(retentionData.reduce((s, d) => s + d.rate, 0) / retentionData.length);
  const latest = retentionData[retentionData.length - 1];
  const prev = retentionData[retentionData.length - 2];
  const trend = latest.rate - prev.rate;

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1400px]">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-black">Retention Analytics</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Customer retention trends over the last 6 months</p>
      </motion.div>

      {/* KPIs */}
      <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Current Retention", value: `${latest.rate}%`, sub: `${trend >= 0 ? "+" : ""}${trend}% vs last month`, positive: trend >= 0 },
          { label: "6-Month Average", value: `${avgRetention}%`, sub: "overall average" },
          { label: "Active Now", value: customers.filter(c => c.status === "active").length, sub: "purchased < 30 days" },
          { label: "At-Risk Now", value: customers.filter(c => c.status === "at-risk").length, sub: "need attention" },
        ].map(k => (
          <motion.div key={k.label} variants={fadeUp} className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs text-muted-foreground">{k.label}</p>
            <p className="text-2xl font-black mt-1">{k.value}</p>
            <p className={`text-xs mt-1 ${k.positive === false ? "text-destructive" : k.positive ? "text-emerald-500" : "text-muted-foreground"}`}>{k.sub}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Retention Rate Chart */}
      <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.15 }}
        className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold mb-4">Retention Rate Over Time</h2>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={retentionData} margin={{ left: -20, right: 10, top: 5, bottom: 0 }}>
            <defs>
              <linearGradient id="retGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[55, 90]} />
            <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "10px", fontSize: "12px" }} formatter={(v: number) => [`${v}%`, "Retention Rate"]} />
            <Area type="monotone" dataKey="rate" stroke="#6366f1" strokeWidth={2.5} fill="url(#retGrad)" dot={{ fill: "#6366f1", r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Stacked Bar + Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }}
          className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold mb-4">Customer Status by Month</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={retentionData} margin={{ left: -20, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "10px", fontSize: "12px" }} />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              <Bar dataKey="active" stackId="a" fill="#6366f1" radius={[0, 0, 0, 0]} name="Active" />
              <Bar dataKey="atRisk" stackId="a" fill="#f59e0b" name="At Risk" />
              <Bar dataKey="lost" stackId="a" fill="#f97316" name="Lost" />
              <Bar dataKey="churned" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} name="Churned" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.25 }}
          className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold mb-4">Current Segment Distribution</h2>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="55%" height={200}>
              <PieChart>
                <Pie data={customerSegments} cx="50%" cy="50%" innerRadius={55} outerRadius={80}
                  paddingAngle={3} dataKey="value">
                  {customerSegments.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "10px", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2.5">
              {customerSegments.map(s => (
                <div key={s.name} className="flex items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: s.color }} />
                  <span className="text-xs text-muted-foreground">{s.name}</span>
                  <span className="text-xs font-bold ml-auto">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* RFM Distribution */}
      <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.3 }}
        className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold mb-4">RFM Score Distribution</h2>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={rfmDistribution} margin={{ left: -20, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="score" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "10px", fontSize: "12px" }} />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} name="Customers">
              {rfmDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};
