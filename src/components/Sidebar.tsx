"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  AlertTriangle,
  UserX,
  BarChart2,
  ClipboardList,
  MessageSquareWarning,
  TrendingDown,
  LineChart,
  Upload,
  Bell,
  Settings,
  X,
  UserPlus,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSettingsStore } from "@/stores/useSettingsStore";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/" },
  { label: "Customers", icon: Users, to: "/customers" },
  { label: "At-Risk", icon: AlertTriangle, to: "/at-risk" },
  { label: "Lost Customers", icon: UserX, to: "/lost" },
  {
    label: "Analytics",
    icon: BarChart2,
    children: [
      { label: "Retention", icon: LineChart, to: "/analytics/retention" },
      { label: "Revenue", icon: TrendingDown, to: "/analytics/revenue" },
    ],
  },
  { label: "Follow-Ups", icon: ClipboardList, to: "/follow-ups" },
  { label: "Complaints", icon: MessageSquareWarning, to: "/complaints" },
  { label: "Revenue at Risk", icon: TrendingDown, to: "/revenue" },
];

const bottomItems = [
  { label: "Import Data", icon: Upload, to: "/import" },
  { label: "Notifications", icon: Bell, to: "/notifications" },
  { label: "Settings", icon: Settings, to: "/settings" },
];

export const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useSettingsStore();
  const { location } = useRouterState();
  const path = location.pathname;

  const isActive = (to: string) =>
    to === "/" ? path === "/" : path.startsWith(to);

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-[260px] flex flex-col bg-sidebar border-r border-sidebar-border transition-transform duration-300 overflow-hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-primary to-transparent opacity-60" />
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-sidebar-border shrink-0">
          <img
            src="/assets/doxaiq-l.png"
            alt="DoxaIQ"
            className="h-7 w-auto block dark:hidden"
          />
          <img
            src="/assets/doxaiq-d.png"
            alt="DoxaIQ"
            className="h-7 w-auto hidden dark:block"
          />
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-sidebar-foreground/60 hover:text-sidebar-foreground"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          {navItems.map((item) => {
            if (item.children) {
              const childActive = item.children.some((c) => isActive(c.to));
              return (
                <div key={item.label}>
                  <div
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium cursor-default",
                      childActive
                        ? "text-sidebar-foreground"
                        : "text-sidebar-foreground/60",
                    )}
                  >
                    <item.icon size={17} />
                    <span className="flex-1">{item.label}</span>
                    <ChevronRight
                      size={14}
                      className={cn(
                        "transition-transform",
                        childActive && "rotate-90",
                      )}
                    />
                  </div>
                  <div className="ml-4 pl-3 border-l border-sidebar-border mt-0.5 space-y-0.5">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        label={child.label}
                        icon={child.icon}
                        active={isActive(child.to)}
                      />
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <NavLink
                key={item.to}
                to={item.to!}
                label={item.label}
                icon={item.icon}
                active={isActive(item.to!)}
              />
            );
          })}

          <div className="my-3 border-t border-sidebar-border" />

          {bottomItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              label={item.label}
              icon={item.icon}
              active={isActive(item.to)}
            />
          ))}
        </nav>

        {/* Add Customer CTA */}
        <div className="p-3 border-t border-sidebar-border shrink-0">
          <Link
            to="/customers/new"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            <UserPlus size={16} />
            Add Customer
          </Link>
        </div>
      </aside>
    </>
  );
};

const NavLink = ({
  to,
  label,
  icon: Icon,
  active,
}: {
  to: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
}) => (
  <motion.div
    whileHover={{ x: active ? 0 : 2 }}
    transition={{ duration: 0.15 }}
  >
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group",
        active
          ? "bg-linear-to-r from-[#6366f1] to-[#8b5cf6] text-white shadow-md shadow-primary/20"
          : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground",
      )}
    >
      <Icon
        size={17}
        className={cn(
          active
            ? "text-white"
            : "text-sidebar-foreground/60 group-hover:text-sidebar-foreground",
        )}
      />
      <span>{label}</span>
      {active && (
        <motion.div
          layoutId="nav-active"
          className="ml-auto w-1.5 h-1.5 rounded-full bg-white/70"
          transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
        />
      )}
    </Link>
  </motion.div>
);
