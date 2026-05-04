import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSettingsStore } from "@/stores/useSettingsStore";
import {
  Sun, Moon, Eye, EyeOff, Shield, Smartphone, LogOut,
  Monitor, Globe, CheckCircle2, Palette, Building2, BarChart2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

// ─── Primitives ────────────────────────────────────────────────────────────────

const Row = ({ label, sub, children }: { label: string; sub?: string; children: React.ReactNode }) => (
  <div className="flex items-center justify-between gap-4 py-3.5 border-b border-border/50 last:border-0">
    <div>
      <p className="text-sm font-medium">{label}</p>
      {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
    </div>
    <div className="shrink-0">{children}</div>
  </div>
);

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button onClick={onChange}
    className={cn(
      "relative w-10 h-5.5 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30",
      checked ? "bg-primary" : "bg-muted"
    )}>
    <span className={cn(
      "absolute top-0.5 left-0.5 w-4.5 h-4.5 rounded-full bg-white shadow-sm transition-transform duration-200",
      checked ? "translate-x-4.5" : "translate-x-0"
    )} />
  </button>
);

const PasswordField = ({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-muted-foreground">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder ?? "••••••••"}
          className="w-full pr-10 pl-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
        />
        <button type="button" onClick={() => setShow(v => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
          {show ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
    </div>
  );
};

// ─── Tab definitions ────────────────────────────────────────────────────────────

const TABS = [
  { key: "appearance", label: "Appearance", icon: Palette },
  { key: "business",   label: "Business",   icon: Building2 },
  { key: "thresholds", label: "Thresholds", icon: BarChart2 },
  { key: "security",   label: "Security",   icon: Shield },
] as const;

type TabKey = typeof TABS[number]["key"];

const SECURITY_TABS = [
  { key: "password", label: "Password" },
  { key: "twofa",    label: "Two-Factor" },
  { key: "sessions", label: "Sessions" },
] as const;

type SecurityTabKey = typeof SECURITY_TABS[number]["key"];

const SESSIONS = [
  { id: 1, device: "MacBook Pro", browser: "Chrome 124", location: "Lagos, Nigeria", time: "Active now", icon: Monitor, current: true },
  { id: 2, device: "iPhone 15 Pro", browser: "Safari Mobile", location: "Lagos, Nigeria", time: "2 hours ago", icon: Smartphone, current: false },
  { id: 3, device: "Windows PC", browser: "Edge 124", location: "Abuja, Nigeria", time: "3 days ago", icon: Globe, current: false },
];

// ─── Tab panels ────────────────────────────────────────────────────────────────

const AppearanceTab = () => {
  const { theme, toggleTheme } = useSettingsStore();
  return (
    <div className="space-y-2">
      <Row label="Theme" sub={theme === "dark" ? "Dark mode is currently active" : "Light mode is currently active"}>
        <button onClick={toggleTheme}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-muted transition-colors text-sm font-medium">
          {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          {theme === "dark" ? "Switch to light" : "Switch to dark"}
        </button>
      </Row>
      <Row label="Font size" sub="Controls dashboard text size">
        <select className="px-3 py-1.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
          <option>Default</option>
          <option>Large</option>
          <option>Compact</option>
        </select>
      </Row>
      <Row label="Sidebar" sub="Collapsed or expanded by default on load">
        <select className="px-3 py-1.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
          <option>Expanded</option>
          <option>Collapsed</option>
        </select>
      </Row>
    </div>
  );
};

const BusinessTab = () => (
  <div className="space-y-2">
    {[
      { label: "Business Name", placeholder: "e.g. Chukwu Ventures", sub: "Shown on reports and exports" },
      { label: "Owner / Contact", placeholder: "e.g. Emeka Chukwu", sub: "Primary contact name" },
      { label: "Industry", placeholder: "e.g. Retail", sub: "Helps tailor risk recommendations" },
      { label: "Currency", placeholder: "e.g. NGN", sub: "Used for all monetary values" },
      { label: "Email", placeholder: "e.g. hello@business.com", sub: "For system notifications" },
      { label: "Phone", placeholder: "e.g. 08012345678", sub: "Business contact number" },
    ].map(f => (
      <Row key={f.label} label={f.label} sub={f.sub}>
        <input placeholder={f.placeholder}
          className="w-48 px-3 py-1.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-right" />
      </Row>
    ))}
    <div className="pt-3">
      <button onClick={() => toast.success("Business profile saved!")}
        className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
        Save Profile
      </button>
    </div>
  </div>
);

const ThresholdsTab = () => {
  const [atRisk, setAtRisk] = useState(30);
  const [lost, setLost] = useState(60);
  const [churned, setChurned] = useState(90);

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground pb-2">
        These thresholds determine when a customer's status changes based on days since their last purchase.
      </p>
      {[
        { label: "At-Risk", sub: "Days without a purchase before flagging as at-risk", value: atRisk, set: setAtRisk, color: "text-primary bg-primary/10" },
        { label: "Lost", sub: "Days before escalating from at-risk to lost", value: lost, set: setLost, color: "text-amber-500 bg-amber-500/10" },
        { label: "Churned", sub: "Days before marking as fully churned", value: churned, set: setChurned, color: "text-destructive bg-destructive/10" },
      ].map(t => (
        <Row key={t.label} label={t.label} sub={t.sub}>
          <div className="flex items-center gap-2">
            <button onClick={() => t.set(v => Math.max(1, v - 5))}
              className="w-7 h-7 rounded-lg border border-border hover:bg-muted text-sm font-bold transition-colors">−</button>
            <span className={cn("text-sm font-bold px-3 py-1 rounded-lg min-w-18 text-center", t.color)}>
              {t.value} days
            </span>
            <button onClick={() => t.set(v => v + 5)}
              className="w-7 h-7 rounded-lg border border-border hover:bg-muted text-sm font-bold transition-colors">+</button>
          </div>
        </Row>
      ))}
      <div className="pt-3">
        <button onClick={() => toast.success("Thresholds updated!")}
          className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
          Save Thresholds
        </button>
      </div>
    </div>
  );
};

const SecurityTab = () => {
  const [secTab, setSecTab] = useState<SecurityTabKey>("password");
  const [twoFA, setTwoFA] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(false);
  const [current, setCurrent] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [pwError, setPwError] = useState("");

  const handleChangePw = () => {
    if (!current) { setPwError("Enter your current password."); return; }
    if (newPw.length < 8) { setPwError("New password must be at least 8 characters."); return; }
    if (newPw !== confirm) { setPwError("Passwords don't match."); return; }
    setPwError("");
    setCurrent(""); setNewPw(""); setConfirm("");
    toast.success("Password updated successfully!");
  };

  return (
    <div className="space-y-4">
      {/* Security sub-tabs */}
      <div className="flex gap-1 p-1 rounded-lg bg-muted w-fit">
        {SECURITY_TABS.map(t => (
          <button key={t.key} onClick={() => setSecTab(t.key)}
            className={cn(
              "px-4 py-1.5 rounded-md text-xs font-semibold transition-all duration-150",
              secTab === t.key
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}>
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {secTab === "password" && (
          <motion.div key="password"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="space-y-4">
            <div className="rounded-lg border border-border/50 bg-muted/20 px-4 py-3 text-xs text-muted-foreground">
              Choose a strong password with at least 8 characters, including numbers and symbols.
            </div>
            <PasswordField label="Current password" value={current} onChange={setCurrent} />
            <PasswordField label="New password" value={newPw} onChange={setNewPw} placeholder="Min. 8 characters" />
            <PasswordField label="Confirm new password" value={confirm} onChange={setConfirm} />
            {pwError && (
              <p className="text-xs text-destructive">{pwError}</p>
            )}
            <button onClick={handleChangePw}
              className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
              Update Password
            </button>
          </motion.div>
        )}

        {secTab === "twofa" && (
          <motion.div key="twofa"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="space-y-2">
            <Row label="Two-Factor Authentication" sub="Require a 6-digit code from your authenticator app when signing in">
              <Toggle checked={twoFA} onChange={() => {
                setTwoFA(v => !v);
                toast.success(twoFA ? "2FA disabled" : "2FA enabled — set up your authenticator app");
              }} />
            </Row>
            <Row label="Login alerts" sub="Send an email when a new device or location signs in">
              <Toggle checked={loginAlerts} onChange={() => setLoginAlerts(v => !v)} />
            </Row>
            <Row label="Auto session timeout" sub="Sign out automatically after 30 minutes of inactivity">
              <Toggle checked={sessionTimeout} onChange={() => setSessionTimeout(v => !v)} />
            </Row>
            {twoFA && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-xs text-primary">
                2FA is active. Use Google Authenticator or Authy to generate codes.
              </motion.div>
            )}
          </motion.div>
        )}

        {secTab === "sessions" && (
          <motion.div key="sessions"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="space-y-3">
            <div className="flex justify-end">
              <button
                onClick={() => toast("All other sessions signed out", { icon: "🔒" })}
                className="text-xs text-destructive font-semibold hover:underline">
                Sign out all others
              </button>
            </div>
            {SESSIONS.map(s => {
              const Icon = s.icon;
              return (
                <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/20">
                  <div className="p-2 rounded-lg bg-muted shrink-0">
                    <Icon size={15} className="text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">{s.device}</p>
                      {s.current && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          <CheckCircle2 size={9} />
                          This device
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{s.browser} · {s.location} · {s.time}</p>
                  </div>
                  {!s.current && (
                    <button
                      onClick={() => toast(`${s.device} signed out`)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                      <LogOut size={14} />
                    </button>
                  )}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Main page ──────────────────────────────────────────────────────────────────

export const AppSettings = () => {
  const [tab, setTab] = useState<TabKey>("appearance");

  return (
    <div className="p-4 md:p-6 max-w-2xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-black">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage your DoxaIQ preferences and account security</p>
      </motion.div>

      {/* Top-level tabs */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}
        className="flex gap-1 border-b border-border relative">
        {TABS.map(t => {
          const Icon = t.icon;
          const active = tab === t.key;
          return (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold transition-colors relative",
                active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}>
              <Icon size={14} />
              {t.label}
              {active && (
                <motion.div layoutId="settings-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }} />
              )}
            </button>
          );
        })}
      </motion.div>

      {/* Panel */}
      <AnimatePresence mode="wait">
        <motion.div key={tab}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
          className="rounded-xl border border-border bg-card p-6">
          {tab === "appearance"  && <AppearanceTab />}
          {tab === "business"    && <BusinessTab />}
          {tab === "thresholds"  && <ThresholdsTab />}
          {tab === "security"    && <SecurityTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
