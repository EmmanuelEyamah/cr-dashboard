import { Menu, Sun, Moon, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { useNotificationStore } from "@/stores/useNotificationStore";

export const Topbar = () => {
  const { theme, toggleTheme, toggleSidebar } = useSettingsStore();
  const unreadCount = useNotificationStore(s => s.unreadCount());

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-[260px] z-30 h-16 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 md:px-6">
      {/* Left */}
      <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
        <Menu size={20} />
      </button>

      {/* Right */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Theme toggle */}
        <motion.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Toggle theme"
        >
          <AnimatedThemeIcon theme={theme} />
        </motion.button>

        {/* Notifications bell — links to /notifications, shows live unread count */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
          <Link to="/notifications"
            className="flex p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Notifications">
            <Bell size={20} />
          </Link>
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.span
                key={unreadCount}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="absolute -top-0.5 -right-0.5 min-w-4.5 h-4.5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center px-1 pointer-events-none"
              >
                {unreadCount > 99 ? "99+" : unreadCount}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Avatar */}
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold ml-1">
          D
        </div>
      </div>
    </header>
  );
};

const AnimatedThemeIcon = ({ theme }: { theme: "light" | "dark" }) => (
  <motion.div
    key={theme}
    initial={{ rotate: -30, opacity: 0 }}
    animate={{ rotate: 0, opacity: 1 }}
    transition={{ duration: 0.2 }}
  >
    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
  </motion.div>
);
