import { motion } from "framer-motion";

export const LoadingScreen = () => (
  <div className="flex items-center justify-center h-full min-h-[300px]">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent"
    />
  </div>
);

export const CardSkeleton = ({ className }: { className?: string }) => (
  <div className={`rounded-xl border border-border bg-card p-6 animate-pulse ${className}`}>
    <div className="h-3 w-1/3 rounded bg-muted mb-4" />
    <div className="h-8 w-1/2 rounded bg-muted mb-2" />
    <div className="h-3 w-2/3 rounded bg-muted" />
  </div>
);
