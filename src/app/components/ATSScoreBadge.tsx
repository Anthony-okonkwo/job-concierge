import { motion } from "motion/react";

interface ATSScoreBadgeProps {
  score: number;
  className?: string;
}

export function ATSScoreBadge({ score, className = "" }: ATSScoreBadgeProps) {
  const getScoreColor = (score: number) => {
    if (score >= 93) return "bg-emerald-500";
    if (score >= 80) return "bg-green-500";
    if (score >= 70) return "bg-yellow-500";
    return "bg-orange-500";
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 93) return "text-emerald-700";
    if (score >= 80) return "text-green-700";
    if (score >= 70) return "text-yellow-700";
    return "text-orange-700";
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      className={`inline-flex items-center gap-2 ${className}`}
    >
      <div className="flex items-center gap-1.5 bg-white rounded-lg px-2.5 py-1 border border-gray-200 shadow-sm">
        <div className={`w-2 h-2 rounded-full ${getScoreColor(score)}`} />
        <span className={`text-sm font-semibold ${getScoreTextColor(score)}`}>
          {score}
        </span>
      </div>
    </motion.div>
  );
}
