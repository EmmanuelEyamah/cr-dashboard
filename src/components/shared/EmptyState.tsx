import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  message: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState = ({ title, message, icon, action, className }: EmptyStateProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.97 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className={cn("flex flex-col items-center justify-center py-20 text-center px-4", className)}
  >
    {icon && <div className="mb-4 text-muted-foreground">{icon}</div>}
    {title && <h3 className="text-base font-semibold mb-1">{title}</h3>}
    <p className="text-sm text-muted-foreground max-w-xs">{message}</p>
    {action && <div className="mt-6">{action}</div>}
  </motion.div>
);
