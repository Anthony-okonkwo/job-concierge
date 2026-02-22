import { motion } from "motion/react";

interface PlanBadgeProps {
  plan: "silver" | "gold" | "launchpad";
  className?: string;
}

export function PlanBadge({ plan, className = "" }: PlanBadgeProps) {
  const variants = {
    silver: "bg-gradient-to-r from-gray-400 to-gray-500 text-white",
    gold: "bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900",
    launchpad: "bg-gradient-to-r from-[#0275D8] to-[#00C2D1] text-white",
  };

  const labels = {
    silver: "Silver",
    gold: "Gold",
    launchpad: "Career LaunchPad",
  };

  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${variants[plan]} ${className}`}
    >
      {labels[plan]}
    </motion.span>
  );
}
