import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Search, Plus, ArrowUpRight } from "lucide-react";
import { customers } from "@/data/customers";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { cn } from "@/lib/utils";
import type { RiskStatus } from "@/types";

const tabs: { label: string; value: "all" | RiskStatus }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "At Risk", value: "at-risk" },
  { label: "Lost", value: "lost" },
  { label: "Churned", value: "churned" },
];

const rfmColor = (score: number) => {
  if (score >= 4) return "text-primary";
  if (score === 3) return "text-amber-500";
  return "text-destructive";
};

export const CustomerList = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | RiskStatus>("all");

  const filtered = customers.filter(c => {
    const matchTab = activeTab === "all" || c.status === activeTab;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.business ?? "").toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="p-4 md:p-6 space-y-5 max-w-[1400px]">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black">Customers</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{customers.length} total customers</p>
        </div>
        <Link to="/customers/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
          <Plus size={16} /> Add Customer
        </Link>
      </motion.div>

      {/* Search + Tabs */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}
        className="space-y-3">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email or business..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {tabs.map(tab => (
            <button key={tab.value} onClick={() => setActiveTab(tab.value)}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all",
                activeTab === tab.value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              )}>
              {tab.label} {tab.value !== "all" && `(${customers.filter(c => c.status === tab.value).length})`}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState message="No customers match your search." />
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.1 }}
          className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Customer</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground hidden md:table-cell">Last Purchase</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground hidden lg:table-cell">Total Spend</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground hidden lg:table-cell">RFM</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <motion.tr key={c.id}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors group">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                          {c.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{c.name}</p>
                          <p className="text-xs text-muted-foreground">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-muted-foreground hidden md:table-cell">{c.lastPurchaseDate}</td>
                    <td className="px-4 py-3.5 font-semibold hidden lg:table-cell">₦{c.totalSpend.toLocaleString()}</td>
                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      <div className="flex items-center justify-center gap-1">
                        {[c.rfm.recency, c.rfm.frequency, c.rfm.monetary].map((s, idx) => (
                          <span key={idx} className={`text-xs font-black ${rfmColor(s)}`}>{s}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3.5"><RiskBadge status={c.status} /></td>
                    <td className="px-4 py-3.5">
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
      )}
    </div>
  );
};
