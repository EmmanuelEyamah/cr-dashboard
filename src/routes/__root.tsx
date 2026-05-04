import { createRootRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { Toaster } from "react-hot-toast";

const PageTransition = () => {
  const { location } = useRouterState();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
};

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:ml-[260px] flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 pt-16">
          <PageTransition />
        </main>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "var(--card)",
            color: "var(--card-foreground)",
            border: "1px solid var(--border)",
            fontFamily: "Satoshi, sans-serif",
            fontSize: "14px",
          },
        }}
      />
    </div>
  ),
});
