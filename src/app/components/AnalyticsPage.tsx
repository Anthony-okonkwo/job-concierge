import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { TrendingUp, Target, Award, Calendar, Loader2, AlertCircle } from "lucide-react";
import { KPICard } from "./KPICard";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

export function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [hasError, setHasError] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        // Corrected URL to match our DashboardController routing
        const response = await fetch(`${API_BASE_URL}/api/v1/dashboard/analytics`);
        if (!response.ok) throw new Error("Wahala fetching analytics data");
        
        const data = await response.json();
        setAnalyticsData(data);
      } catch (error) {
        console.error("Failed to load analytics:", error);
        setHasError(true);
        
        // GRACEFUL FALLBACK: Feed it skeleton data instead of crashing
        setAnalyticsData({
          kpiData: [
            { title: "Total Applications", value: "...", trend: 0, trendData: [], iconName: "Target" },
            { title: "Interview Rate", value: "...", trend: 0, trendData: [], iconName: "TrendingUp" },
            { title: "Avg ATS Score", value: "...", trend: 0, trendData: [], iconName: "Award" },
            { title: "Response Time", value: "...", trend: 0, trendData: [], iconName: "Calendar" },
          ],
          applicationTrend: [],
          statusDistribution: [],
          rolePerformance: [],
          topCompanies: []
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Target": return <Target className="w-5 h-5" />;
      case "TrendingUp": return <TrendingUp className="w-5 h-5" />;
      case "Award": return <Award className="w-5 h-5" />;
      case "Calendar": return <Calendar className="w-5 h-5" />;
      default: return <Target className="w-5 h-5" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-[#0A2342]">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-[#0275D8]" />
        <p className="text-lg font-medium">Crunching your application data...</p>
      </div>
    );
  }

  // Removed the early return crash here!

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* Offline Warning Banner */}
      {hasError && (
        <div className="mb-6 bg-orange-50 border border-orange-200 text-orange-800 px-4 py-3 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-orange-500" />
          <p className="text-sm">Unable to connect to live database. Showing cached/placeholder layout.</p>
        </div>
      )}

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0A2342] mb-2">Analytics</h1>
        <p className="text-gray-600">Track your job search performance and insights</p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {analyticsData.kpiData.map((kpi: any, index: number) => (
          <KPICard key={index} {...kpi} icon={renderIcon(kpi.iconName)} />
        ))}
      </div>

      {/* Application Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
      >
        <h2 className="text-xl font-bold text-[#0A2342] mb-6">Application Trend</h2>
        <div className="h-80 flex items-center justify-center">
          {analyticsData.applicationTrend.length === 0 ? (
            <span className="text-gray-400 text-sm">No trend data available...</span>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData.applicationTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="applications" stroke="#0275D8" strokeWidth={3} dot={{ fill: "#0275D8", r: 6 }} name="Applications" />
                <Line type="monotone" dataKey="interviews" stroke="#00C2D1" strokeWidth={3} dot={{ fill: "#00C2D1", r: 6 }} name="Interviews" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Status Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-xl font-bold text-[#0A2342] mb-6">Application Status Distribution</h2>
          <div className="h-64 flex items-center justify-center">
            {analyticsData.statusDistribution.length === 0 ? (
              <span className="text-gray-400 text-sm">No distribution data...</span>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.statusDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analyticsData.statusDistribution.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="mt-4 space-y-2">
            {analyticsData.statusDistribution.map((status: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color || '#ccc' }} />
                  <span className="text-gray-700">{status.name}</span>
                </div>
                <span className="font-semibold text-gray-900">{status.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Role Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-xl font-bold text-[#0A2342] mb-6">Performance by Role Type</h2>
          <div className="h-64 flex items-center justify-center">
            {analyticsData.rolePerformance.length === 0 ? (
               <span className="text-gray-400 text-sm">No role data available...</span>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData.rolePerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="role" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="apps" fill="#0275D8" name="Applications" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="interviews" fill="#00C2D1" name="Interviews" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="offers" fill="#10B981" name="Offers" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>
      </div>

      {/* Top Companies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <h2 className="text-xl font-bold text-[#0A2342] mb-6">Top Companies Applied</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Rank</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Company</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Applications</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.topCompanies.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-400 text-sm">No company data available...</td>
                </tr>
              ) : (
                analyticsData.topCompanies.map((company: any, idx: number) => (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#0275D8] to-[#00C2D1] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{idx + 1}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">{company.name}</td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-semibold text-[#0275D8]">{company.applications}</span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">{company.status}</td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}