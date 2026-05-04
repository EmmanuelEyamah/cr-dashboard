import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell, Clock, AlertTriangle, MessageSquareWarning, CheckCircle2,
  Trash2, CheckCheck, X, Filter,
} from "lucide-react";
import { useNotificationStore, type NotifType } from "@/stores/useNotificationStore";
import { cn } from "@/lib/utils";

const TYPE_META: Record<NotifType, { color: string; bg: string; icon: React.ElementType }> = {
  overdue:   { color: "text-destructive", bg: "bg-destructive/10", icon: Clock },
  escalated: { color: "text-destructive", bg: "bg-destructive/10", icon: MessageSquareWarning },
  "at-risk": { color: "text-amber-500",   bg: "bg-amber-500/10",   icon: AlertTriangle },
  resolved:  { color: "text-emerald-500", bg: "bg-emerald-500/10", icon: CheckCircle2 },
};

const FILTERS = [
  { key: "all",      label: "All" },
  { key: "unread",   label: "Unread" },
  { key: "overdue",  label: "Overdue" },
  { key: "at-risk",  label: "At-Risk" },
  { key: "escalated",label: "Escalated" },
  { key: "resolved", label: "Resolved" },
] as const;

type FilterKey = typeof FILTERS[number]["key"];

export const Notifications = () => {
  const { notifications, markRead, markAllRead, markSelectedRead, remove, removeSelected } = useNotificationStore();
  const [filter, setFilter] = useState<FilterKey>("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const unread   = notifications.filter(n => !n.read).length;
  const overdue  = notifications.filter(n => n.type === "overdue").length;
  const atRisk   = notifications.filter(n => n.type === "at-risk").length;
  const escalated = notifications.filter(n => n.type === "escalated").length;

  const visible = notifications.filter(n => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    return n.type === filter;
  });

  const allVisibleSelected = visible.length > 0 && visible.every(n => selected.has(n.id));

  const toggleSelect = (id: string) =>
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const toggleAll = () => {
    if (allVisibleSelected) {
      setSelected(prev => { const next = new Set(prev); visible.forEach(n => next.delete(n.id)); return next; });
    } else {
      setSelected(prev => { const next = new Set(prev); visible.forEach(n => next.add(n.id)); return next; });
    }
  };

  const selectedIds = [...selected];
  const hasSelection = selectedIds.length > 0;

  const handleBulkRead = () => { markSelectedRead(selectedIds); setSelected(new Set()); };
  const handleBulkDelete = () => { removeSelected(selectedIds); setSelected(new Set()); };

  return (
    <div className="p-4 md:p-6 max-w-3xl space-y-5">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black">Notifications</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {unread > 0 ? `${unread} unread notification${unread > 1 ? "s" : ""}` : "All caught up!"}
          </p>
        </div>
        {unread > 0 && (
          <button onClick={markAllRead}
            className="flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline shrink-0 mt-1">
            <CheckCheck size={14} />
            Mark all read
          </button>
        )}
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total", value: notifications.length, color: "text-foreground" },
          { label: "Unread", value: unread, color: "text-primary" },
          { label: "Overdue", value: overdue, color: "text-destructive" },
          { label: "At-Risk", value: atRisk, color: "text-amber-500" },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className={cn("text-2xl font-black mt-0.5", s.color)}>{s.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Filter tabs */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="flex items-center gap-1.5 flex-wrap">
        <Filter size={13} className="text-muted-foreground" />
        {FILTERS.map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-semibold transition-colors",
              filter === f.key
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}>
            {f.label}
          </button>
        ))}
      </motion.div>

      {/* Bulk action bar */}
      <AnimatePresence>
        {hasSelection && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-primary/5 border border-primary/20">
            <span className="text-xs font-semibold text-primary">{selectedIds.length} selected</span>
            <div className="flex items-center gap-2">
              <button onClick={handleBulkRead}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors">
                <CheckCheck size={13} />
                Mark read
              </button>
              <button onClick={handleBulkDelete}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive text-xs font-semibold hover:bg-destructive/20 transition-colors">
                <Trash2 size={13} />
                Delete
              </button>
              <button onClick={() => setSelected(new Set())} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                <X size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* List */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="space-y-2">
        {/* Select all row */}
        {visible.length > 1 && (
          <div className="flex items-center gap-3 px-1 pb-1">
            <input type="checkbox" checked={allVisibleSelected} onChange={toggleAll}
              className="w-4 h-4 rounded accent-primary cursor-pointer" />
            <span className="text-xs text-muted-foreground">Select all visible</span>
          </div>
        )}

        <AnimatePresence initial={false}>
          {visible.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="rounded-xl border border-border bg-card p-12 text-center">
              <Bell size={28} className="text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No notifications here</p>
            </motion.div>
          )}

          {visible.map((n, i) => {
            const meta = TYPE_META[n.type];
            const Icon = meta.icon;
            const isSelected = selected.has(n.id);

            return (
              <motion.div key={n.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0, overflow: "hidden" }}
                transition={{ delay: i * 0.03, layout: { duration: 0.2 } }}
                className={cn(
                  "flex items-start gap-3 p-4 rounded-xl border transition-colors group",
                  isSelected ? "border-primary/40 bg-primary/5" : n.read
                    ? "border-border bg-card opacity-60 hover:opacity-100"
                    : "border-border bg-card hover:border-primary/30"
                )}>

                {/* Checkbox */}
                <input type="checkbox" checked={isSelected} onChange={() => toggleSelect(n.id)}
                  className="w-4 h-4 rounded accent-primary cursor-pointer mt-0.5 shrink-0" />

                {/* Icon */}
                <div className={cn("p-2 rounded-lg shrink-0", meta.bg)}>
                  <Icon size={14} className={meta.color} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn("text-sm font-semibold", n.read && "font-medium")}>{n.title}</p>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.sub}</p>
                  <p className="text-[10px] text-muted-foreground/50 mt-1">{n.time}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  {!n.read && (
                    <button onClick={() => markRead(n.id)}
                      title="Mark as read"
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                      <CheckCheck size={14} />
                    </button>
                  )}
                  <button onClick={() => remove(n.id)}
                    title="Delete"
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
