import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  Users, AlertTriangle, UserX, TrendingDown, ClipboardList,
  MessageSquareWarning, ArrowUpRight, ArrowDownRight, Activity,
} from "lucide-react";
import { customers } from "@/data/customers";
import { followUps } from "@/data/followUps";
import { complaints } from "@/data/complaints";
import { retentionData } from "@/data/analytics";
import { RiskBadge } from "@/components/shared/RiskBadge";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

export const Dashboard = () => {
  const total = customers.length;
  const active = customers.filter(c => c.status === "active").length;
  const atRisk = customers.filter(c => c.status === "at-risk").length;
  const lost = customers.filter(c => c.status === "lost").length;
  const churned = customers.filter(c => c.status === "churned").length;
  const retentionRate = Math.round((active / total) * 100);

  const revenueAtRisk = customers
    .filter(c => c.status === "at-risk" || c.status === "lost" || c.status === "churned")
    .reduce((sum, c) => sum + c.totalSpend * 0.15, 0);

  const overdueFollowUps = followUps.filter(f => f.status === "overdue").length;
  const pendingFollowUps = followUps.filter(f => f.status === "pending").length;
  const openComplaints = complaints.filter(c => c.status === "open" || c.status === "escalated").length;

  const recentAtRisk = customers
    .filter(c => c.status === "at-risk" || c.status === "lost")
    .slice(0, 5);

  const stats = [
    { label: "Total Customers", value: total, icon: Users, color: "text-primary", bg: "bg-primary/10", link: "/customers", trend: "+3 this month" },
    { label: "At Risk", value: atRisk, icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-500/10", link: "/at-risk", trend: "+2 this week", down: true },
    { label: "Lost Customers", value: lost, icon: UserX, color: "text-orange-500", bg: "bg-orange-500/10", link: "/lost", trend: `${churned} churned`, down: true },
    { label: "Retention Rate", value: `${retentionRate}%`, icon: Activity, color: "text-emerald-500", bg: "bg-emerald-500/10", link: "/analytics/retention", trend: "-4% vs last month", down: true },
    { label: "Revenue at Risk", value: `₦${(revenueAtRisk / 1000000).toFixed(1)}M`, icon: TrendingDown, color: "text-destructive", bg: "bg-destructive/10", link: "/revenue", trend: "est. monthly exposure", down: true },
    { label: "Follow-ups Due", value: pendingFollowUps + overdueFollowUps, icon: ClipboardList, color: "text-primary", bg: "bg-primary/10", link: "/follow-ups", trend: `${overdueFollowUps} overdue`, down: overdueFollowUps > 0 },
    { label: "Open Complaints", value: openComplaints, icon: MessageSquareWarning, color: "text-amber-500", bg: "bg-amber-500/10", link: "/complaints", trend: "needs attention", down: true },
    { label: "Active Customers", value: active, icon: Users, color: "text-emerald-500", bg: "bg-emerald-500/10", link: "/customers", trend: "purchased < 30 days" },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1400px]">
      {/* Header */}
      <motion.div variants={fadeUp} initial="hidden" animate="show">
        <h1 className="text-2xl font-black text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Customer retention overview — {new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </motion.div>

      {/* KPI Grid */}
      <motion.div variants={stagger} initial="hidden" animate="show"
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={fadeUp}>
            <Link to={stat.link}
              className="block rounded-xl border border-border bg-card p-4 md:p-5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 group">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon size={16} className={stat.color} />
                </div>
                <ArrowUpRight size={14} className="text-muted-foreground/40 group-hover:text-primary transition-colors" />
              </div>
              <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
              <p className="text-2xl font-black text-foreground mt-0.5">{stat.value}</p>
              <p className={`text-xs mt-1 flex items-center gap-1 ${stat.down ? "text-destructive/70" : "text-emerald-500"}`}>
                {stat.down ? <ArrowDownRight size={11} /> : <ArrowUpRight size={11} />}
                {stat.trend}
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts + At-Risk */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Retention Trend */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }}
          className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Retention Rate Trend</h2>
              <p className="text-xs text-muted-foreground">Last 6 months</p>
            </div>
            <Link to="/analytics/retention" className="text-xs text-primary hover:underline">View full →</Link>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={retentionData} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
              <defs>
                <linearGradient id="retentionGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[60, 90]} />
              <Tooltip
                contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "12px" }}
                formatter={(v: number) => [`${v}%`, "Retention"]}
              />
              <Area type="monotone" dataKey="rate" stroke="#6366f1" strokeWidth={2} fill="url(#retentionGrad)" dot={{ fill: "#6366f1", r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Segment Breakdown */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.25 }}
          className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold mb-4">Customer Segments</h2>
          <div className="space-y-3">
            {[
              { label: "Active", count: active, total, color: "bg-primary" },
              { label: "At-Risk", count: atRisk, total, color: "bg-amber-500" },
              { label: "Lost", count: lost, total, color: "bg-orange-500" },
              { label: "Churned", count: churned, total, color: "bg-destructive" },
            ].map(seg => (
              <div key={seg.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground font-medium">{seg.label}</span>
                  <span className="font-semibold">{seg.count}</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(seg.count / seg.total) * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    className={`h-full rounded-full ${seg.color}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-1">Retention Rate</p>
            <p className="text-3xl font-black text-primary">{retentionRate}%</p>
          </div>
        </motion.div>
      </div>

      {/* At-Risk Table + Follow-ups */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Needs Attention */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.3 }}
          className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold">Needs Attention</h2>
            <Link to="/at-risk" className="text-xs text-primary hover:underline">View all →</Link>
          </div>
          <div className="space-y-2">
            {recentAtRisk.map(c => (
              <Link key={c.id} to={`/customers/${c.id}`}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-xs font-bold text-primary">
                    {c.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">{c.name}</p>
                    <p className="text-xs text-muted-foreground">Last: {c.lastPurchaseDate}</p>
                  </div>
                </div>
                <RiskBadge status={c.status} />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Overdue Follow-ups */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.35 }}
          className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold">Overdue Follow-ups</h2>
            <Link to="/follow-ups" className="text-xs text-primary hover:underline">View all →</Link>
          </div>
          <div className="space-y-2">
            {followUps.filter(f => f.status === "overdue" || f.status === "pending").slice(0, 5).map(f => (
              <Link key={f.id} to={`/follow-ups/${f.id}`}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full shrink-0 ${f.status === "overdue" ? "bg-destructive" : f.priority === "high" ? "bg-amber-500" : "bg-primary"}`} />
                  <div>
                    <p className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-1">{f.title}</p>
                    <p className="text-xs text-muted-foreground">{f.customerName} · Due {f.dueDate}</p>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  f.status === "overdue" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
                }`}>
                  {f.status === "overdue" ? "Overdue" : "Pending"}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
