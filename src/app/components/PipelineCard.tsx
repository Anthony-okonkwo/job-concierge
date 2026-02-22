import { motion } from "motion/react";
import { ATSScoreBadge } from "./ATSScoreBadge";

interface PipelineCardProps {
  jobTitle: string;
  company: string;
  resumeVersion: string;
  atsScore: number;
  dateApplied: string;
  onClick?: () => void;
}

export function PipelineCard({ jobTitle, company, resumeVersion, atsScore, dateApplied, onClick }: PipelineCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(10, 35, 66, 0.1)" }}
      onClick={onClick}
      className="bg-white rounded-lg p-4 border border-gray-200 cursor-pointer transition-all"
    >
      <h4 className="font-semibold text-[#0A2342] mb-1 line-clamp-1">{jobTitle}</h4>
      <p className="text-sm text-gray-600 mb-3">{company}</p>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Resume:</span>
          <span className="text-[#0275D8] font-medium truncate ml-2">{resumeVersion}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">ATS Score:</span>
          <ATSScoreBadge score={atsScore} />
        </div>
        
        <div className="text-xs text-gray-400 pt-1 border-t border-gray-100">
          {dateApplied}
        </div>
      </div>
    </motion.div>
  );
}
