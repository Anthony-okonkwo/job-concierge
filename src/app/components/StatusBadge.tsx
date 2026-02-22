import { motion } from "motion/react";

interface StatusBadgeProps {
  status: "applied" | "viewed" | "interview" | "offer" | "rejected" | "on-track" | "behind" | "urgent";
  className?: string;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const variants = {
    applied: "bg-blue-100 text-blue-700 border-blue-200",
    viewed: "bg-purple-100 text-purple-700 border-purple-200",
    interview: "bg-green-100 text-green-700 border-green-200",
    offer: "bg-emerald-100 text-emerald-700 border-emerald-200",
    rejected: "bg-gray-100 text-gray-700 border-gray-200",
    "on-track": "bg-green-100 text-green-700 border-green-200",
    behind: "bg-yellow-100 text-yellow-700 border-yellow-200",
    urgent: "bg-red-100 text-red-700 border-red-200",
  };

  const labels = {
    applied: "Applied",
    viewed: "Viewed",
    interview: "Interview",
    offer: "Offer",
    rejected: "Rejected",
    "on-track": "On Track",
    behind: "Behind",
    urgent: "Urgent",
  };

  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${variants[status]} ${className}`}
    >
      {labels[status]}
    </motion.span>
  );
}
