import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Users, DollarSign, Send, Award, TrendingUp, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { KPICard } from "./KPICard";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [hasError, setHasError] = useState(false); // To show offline warning banner

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch("${API_BASE_URL}/api/v1/dashboard/admin");
        if (!response.ok) throw new Error("Wahala fetching admin data");
        
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to load admin dashboard:", error);
        setHasError(true);
        
        // GRACEFUL FALLBACK: Feed it skeleton data instead of crashing
        setDashboardData({
          platformKPIs: [
            { title: "Total Active Clients", value: "...", trend: 0, iconName: "Users" },
            { title: "Revenue This Month", value: "...", trend: 0, iconName: "DollarSign" },
            { title: "Applications Submitted", value: "...", trend: 0, iconName: "Send" },
            { title: "Avg ATS Score", value: "...", trend: 0, iconName: "Award" },
            { title: "Conversion Rate", value: "...", trend: 0, iconName: "TrendingUp" }
          ],
          specialistPerformance: [],
          planDistribution: [],
          performanceChartData: [],
          systemHealth: [],
          totalRevenue: "...",
          avgRevenue: "..."
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const getPerformanceColor = (performance: string) => {
    if (performance === "excellent") return "text-green-600 bg-green-50";
    if (performance === "good") return "text-blue-600 bg-blue-50";
    return "text-yellow-600 bg-yellow-50";
  };

  const getStatusColor = (status: string) => {
    if (status === "excellent") return "text-green-600";
    if (status === "good") return "text-blue-600";
    return "text-yellow-600";
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Users": return <Users className="w-5 h-5" />;
      case "DollarSign": return <DollarSign className="w-5 h-5" />;
      case "Send": return <Send className="w-5 h-5" />;
      case "Award": return <Award className="w-5 h-5" />;
      case "TrendingUp": return <TrendingUp className="w-5 h-5" />;
      case "CheckCircle": return <CheckCircle className="w-5 h-5" />;
      case "AlertCircle": return <AlertCircle className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-[#0A2342]">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-[#0275D8]" />
        <p className="text-lg font-medium">Loading live operations data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Offline Warning Banner */}
      {hasError && (
        <div className="mb-6 bg-orange-50 border border-orange-200 text-orange-800 px-4 py-3 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-orange-500" />
          <p className="text-sm">Unable to connect to live operations database. Showing cached layout.</p>
        </div>
      )}

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0A2342] mb-2">Operations Overview</h1>
        <p className="text-gray-600">Platform-wide metrics and team performance</p>
      </motion.div>

      <div className="space-y-6">
        {/* Platform KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {dashboardData.platformKPIs.map((kpi: any, index: number) => (
            <KPICard key={index} {...kpi} icon={renderIcon(kpi.iconName)} />
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Specialist Performance Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-xl font-bold text-[#0A2342] mb-6">Specialist Performance</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Specialist</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Clients</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Applications</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Avg ATS</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Interview Rate</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.specialistPerformance.length === 0 ? (
                    <tr><td colSpan={6} className="text-center py-6 text-gray-400 text-sm">No specialist data available...</td></tr>
                  ) : (
                    dashboardData.specialistPerformance.map((specialist: any, idx: number) => (
                      <motion.tr
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-4 text-sm font-medium text-gray-900">{specialist.name}</td>
                        <td className="py-4 px-4 text-sm text-gray-600">{specialist.clients}</td>
                        <td className="py-4 px-4 text-sm font-semibold text-[#0275D8]">
                          {specialist.applications?.toLocaleString() || 0}
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                            {/* Fixed the snake_case vs camelCase mismatch here! */}
                            {specialist.avg_ats || specialist.avgATS || 0}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm font-semibold text-green-600">
                          {specialist.interview_rate || specialist.interviewRate || 0}%
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${getPerformanceColor(specialist.performance)}`}>
                            {specialist.performance}
                          </span>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Plan Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-xl font-bold text-[#0A2342] mb-6">Plan Distribution</h2>
            <div className="h-64 flex items-center justify-center">
              {dashboardData.planDistribution.length === 0 ? (
                 <span className="text-gray-400 text-sm">No chart data...</span>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dashboardData.planDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {dashboardData.planDistribution.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
            <div className="mt-6 space-y-3">
              {dashboardData.planDistribution.map((plan: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: plan.color }} />
                    <span className="text-sm text-gray-700">{plan.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{plan.value} clients</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Total Revenue/Month</span>
                <span className="text-lg font-bold text-[#0A2342]">{dashboardData.totalRevenue}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Avg Revenue/Client</span>
                <span className="text-lg font-bold text-[#0275D8]">{dashboardData.avgRevenue}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Performance Heat Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-xl font-bold text-[#0A2342] mb-6">Team Performance Overview</h2>
          <div className="h-80 flex items-center justify-center">
            {dashboardData.performanceChartData.length === 0 ? (
               <span className="text-gray-400 text-sm">No chart data...</span>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dashboardData.performanceChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="specialist" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="apps" fill="#0275D8" name="Applications" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="interviews" fill="#00C2D1" name="Interviews" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        {/* System Health */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-xl font-bold text-[#0A2342] mb-6">System Health</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dashboardData.systemHealth.length === 0 ? (
               <div className="col-span-full text-center py-4 text-gray-400 text-sm">No system metrics available...</div>
            ) : (
              dashboardData.systemHealth.map((item: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm text-gray-600">{item.metric}</p>
                    {renderIcon(item.iconName)}
                  </div>
                  <p className={`text-2xl font-bold ${getStatusColor(item.status)}`}>{item.value}</p>
                </motion.div>
              ))
            )}
          </div>
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-green-900">All Systems Operational</h3>
                </div>
                <p className="text-sm text-green-700">Platform running smoothly</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}