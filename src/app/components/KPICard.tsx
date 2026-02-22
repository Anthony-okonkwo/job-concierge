import { motion } from "motion/react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface KPICardProps {
  title: string;
  value: string | number;
  trend?: number;
  trendData?: number[];
  icon?: React.ReactNode;
  className?: string;
}

export function KPICard({ title, value, trend, trendData, icon, className = "" }: KPICardProps) {
  const chartData = trendData?.map((val, idx) => ({ value: val, index: idx })) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(10, 35, 66, 0.15)" }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 relative overflow-hidden ${className}`}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0275D8]/5 to-transparent pointer-events-none" />
      
      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="text-3xl font-bold text-[#0A2342]"
            >
              {value}
            </motion.div>
          </div>
          {icon && (
            <div className="w-10 h-10 bg-gradient-to-br from-[#0275D8] to-[#00C2D1] rounded-lg flex items-center justify-center text-white">
              {icon}
            </div>
          )}
        </div>

        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-sm ${trend >= 0 ? "text-green-600" : "text-red-600"}`}>
            {trend >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="font-medium">{Math.abs(trend)}%</span>
            <span className="text-gray-500 ml-1">vs last month</span>
          </div>
        )}

        {chartData.length > 0 && (
          <div className="mt-4 -mx-2">
            <ResponsiveContainer width="100%" height={40}>
              <LineChart data={chartData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#0275D8"
                  strokeWidth={2}
                  dot={false}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </motion.div>
  );
}
