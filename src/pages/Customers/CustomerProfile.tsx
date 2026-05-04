import { motion } from "framer-motion";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Phone, Mail, Building2, Tag, Calendar, ShoppingBag, ClipboardList, MessageSquareWarning, TrendingUp, Star, AlertTriangle } from "lucide-react";
import { customers } from "@/data/customers";
import { followUps } from "@/data/followUps";
import { complaints } from "@/data/complaints";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { EmptyState } from "@/components/shared/EmptyState";

const RFMRing = ({ label, score }: { label: string; score: number }) => {
  const color = score >= 4 ? "#6366f1" : score === 3 ? "#f59e0b" : "#ef4444";
  const pct = (score / 5) * 100;
  const r = 20, circ = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative h-14 w-14">
        <svg viewBox="0 0 50 50" className="rotate-[-90deg]">
          <circle cx="25" cy="25" r={r} fill="none" stroke="var(--muted)" strokeWidth="4" />
          <motion.circle cx="25" cy="25" r={r} fill="none" stroke={color} strokeWidth="4"
            strokeLinecap="round"
            initial={{ strokeDasharray: `0 ${circ}` }}
            animate={{ strokeDasharray: `${(pct / 100) * circ} ${circ}` }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-black" style={{ color }}>
          {score}
        </span>
      </div>
      <span className="text-xs text-muted-foreground font-medium">{label}</span>
    </div>
  );
};

export const CustomerProfile = () => {
  const { id } = useParams({ from: "/customers/$id" });
  const customer = customers.find(c => c.id === id);

  if (!customer) return (
    <div className="p-6">
      <EmptyState title="Customer not found" message="This customer does not exist." />
    </div>
  );

  const customerFollowUps = followUps.filter(f => f.customerId === id);
  const customerComplaints = complaints.filter(c => c.customerId === id);
  const daysSinceLast = Math.floor((Date.now() - new Date(customer.lastPurchaseDate).getTime()) / 86400000);
  const avgOrder = customer.totalPurchases > 0 ? Math.round(customer.totalSpend / customer.totalPurchases) : 0;
  const topPurchase = customer.purchases.length > 0 ? Math.max(...customer.purchases.map(p => p.amount)) : 0;
  const openFollowUps = customerFollowUps.filter(f => f.status === "pending" || f.status === "overdue").length;
  const openComplaints = customerComplaints.filter(c => c.status === "open" || c.status === "escalated").length;
  const rfmAvg = ((customer.rfm.recency + customer.rfm.frequency + customer.rfm.monetary) / 3).toFixed(1);

  return (
    <div className="p-4 md:p-6 space-y-5 max-w-[1200px]">
      {/* Back */}
      <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <Link to="/customers" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft size={15} /> Back to Customers
        </Link>
      </motion.div>

      {/* Profile Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="rounded-xl border border-border bg-card p-5 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-black shrink-0">
            {customer.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-xl font-black">{customer.name}</h1>
              <RiskBadge status={customer.status} />
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              {customer.business && <span className="flex items-center gap-1.5"><Building2 size={13} />{customer.business}</span>}
              <span className="flex items-center gap-1.5"><Mail size={13} />{customer.email}</span>
              <span className="flex items-center gap-1.5"><Phone size={13} />{customer.phone}</span>
            </div>
            {customer.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {customer.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    <Tag size={10} />{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <Link to="/follow-ups/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shrink-0">
            <ClipboardList size={15} /> Schedule Follow-up
          </Link>
        </div>
      </motion.div>

      {/* Stats + RFM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Key Stats */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
          className="md:col-span-2 rounded-xl border border-border bg-card p-5 space-y-4">
          {/* Row 1 — spending */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Total Spend", value: `₦${customer.totalSpend.toLocaleString()}`, icon: ShoppingBag, color: "text-primary" },
              { label: "Purchases", value: customer.totalPurchases, icon: ShoppingBag, color: "" },
              { label: "Avg Order", value: `₦${avgOrder.toLocaleString()}`, icon: TrendingUp, color: "text-emerald-500" },
              { label: "Top Purchase", value: `₦${topPurchase.toLocaleString()}`, icon: Star, color: "text-amber-500" },
            ].map(s => (
              <div key={s.label}>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className={`text-xl font-black mt-0.5 ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-border/50" />

          {/* Row 2 — activity */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Days Since Last", value: daysSinceLast, sub: "days ago", icon: Calendar, color: daysSinceLast > 60 ? "text-destructive" : daysSinceLast > 30 ? "text-amber-500" : "text-emerald-500" },
              { label: "Member Since", value: customer.joinDate.slice(0, 7), sub: "", icon: Calendar, color: "" },
              { label: "Open Follow-ups", value: openFollowUps, sub: `of ${customerFollowUps.length} total`, icon: ClipboardList, color: openFollowUps > 0 ? "text-amber-500" : "text-emerald-500" },
              { label: "Open Complaints", value: openComplaints, sub: `of ${customerComplaints.length} total`, icon: AlertTriangle, color: openComplaints > 0 ? "text-destructive" : "text-emerald-500" },
            ].map(s => (
              <div key={s.label}>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className={`text-xl font-black mt-0.5 ${s.color}`}>{s.value}</p>
                {s.sub && <p className="text-[10px] text-muted-foreground/60 mt-0.5">{s.sub}</p>}
              </div>
            ))}
          </div>

          <div className="border-t border-border/50" />

          {/* Row 3 — RFM summary bar */}
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground shrink-0">RFM Avg</p>
            <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-linear-to-r from-primary to-accent"
                initial={{ width: 0 }}
                animate={{ width: `${(Number(rfmAvg) / 5) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              />
            </div>
            <p className="text-xs font-black text-primary shrink-0">{rfmAvg}/5</p>
          </div>
        </motion.div>

        {/* RFM Scores */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
          className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs font-semibold text-muted-foreground mb-4">RFM Score</p>
          <div className="flex items-center justify-around">
            <RFMRing label="Recency" score={customer.rfm.recency} />
            <RFMRing label="Frequency" score={customer.rfm.frequency} />
            <RFMRing label="Monetary" score={customer.rfm.monetary} />
          </div>
          <div className="mt-4 pt-3 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">Overall Score</p>
            <p className="text-2xl font-black text-primary">{customer.rfm.total}/5</p>
          </div>
        </motion.div>
      </div>

      {/* Purchase History + Follow-ups + Complaints */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Purchases */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold mb-3">Purchase History</h2>
          {customer.purchases.length === 0
            ? <EmptyState message="No purchases recorded." />
            : <div className="space-y-2">
              {customer.purchases.map(p => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/40">
                  <div>
                    <p className="text-sm font-medium">{p.description}</p>
                    <p className="text-xs text-muted-foreground">{p.date}</p>
                  </div>
                  <p className="text-sm font-bold text-primary">₦{p.amount.toLocaleString()}</p>
                </div>
              ))}
            </div>
          }
        </motion.div>

        {/* Follow-ups & Complaints */}
        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}
            className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold">Follow-ups</h2>
              <span className="text-xs text-muted-foreground">{customerFollowUps.length} total</span>
            </div>
            {customerFollowUps.length === 0
              ? <EmptyState message="No follow-ups yet." icon={<ClipboardList size={24} />} />
              : <div className="space-y-2">
                {customerFollowUps.map(f => (
                  <Link key={f.id} to={`/follow-ups/${f.id}`}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/40 hover:bg-muted/70 transition-colors">
                    <p className="text-sm font-medium line-clamp-1">{f.title}</p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${f.status === "done" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : f.status === "overdue" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}>
                      {f.status}
                    </span>
                  </Link>
                ))}
              </div>
            }
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}
            className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold">Complaints</h2>
              <span className="text-xs text-muted-foreground">{customerComplaints.length} total</span>
            </div>
            {customerComplaints.length === 0
              ? <EmptyState message="No complaints on record." icon={<MessageSquareWarning size={24} />} />
              : <div className="space-y-2">
                {customerComplaints.map(c => (
                  <Link key={c.id} to={`/complaints/${c.id}`}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/40 hover:bg-muted/70 transition-colors">
                    <p className="text-sm font-medium line-clamp-1">{c.title}</p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.status === "resolved" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : c.status === "escalated" ? "bg-destructive/10 text-destructive" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}>
                      {c.status}
                    </span>
                  </Link>
                ))}
              </div>
            }
          </motion.div>
        </div>
      </div>

      {customer.notes && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
          className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold mb-2">Notes</h2>
          <p className="text-sm text-muted-foreground">{customer.notes}</p>
        </motion.div>
      )}
    </div>
  );
};
