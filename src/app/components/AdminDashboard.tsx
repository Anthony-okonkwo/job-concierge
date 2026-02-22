import { motion } from "motion/react";
import { Users, DollarSign, Send, Award, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { KPICard } from "./KPICard";
import { PlanBadge } from "./PlanBadge";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export function AdminDashboard() {
  const platformKPIs = [
    {
      title: "Total Active Clients",
      value: 248,
      trend: 18,
      trendData: [180, 195, 210, 225, 235, 248],
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: "Revenue This Month",
      value: "$127K",
      trend: 24,
      trendData: [85, 92, 98, 105, 115, 127],
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      title: "Applications Submitted",
      value: "12.4K",
      trend: 12,
      trendData: [9200, 10100, 10800, 11300, 11800, 12400],
      icon: <Send className="w-5 h-5" />,
    },
    {
      title: "Avg ATS Score",
      value: 93,
      trend: 5,
      trendData: [88, 89, 90, 91, 92, 93],
      icon: <Award className="w-5 h-5" />,
    },
    {
      title: "Conversion Rate",
      value: "16.8%",
      trend: 8,
      trendData: [14.2, 14.8, 15.3, 15.8, 16.2, 16.8],
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ];

  const specialistPerformance = [
    {
      name: "Sarah Johnson",
      clients: 42,
      applications: 1847,
      avgATS: 95,
      interviewRate: 18.5,
      performance: "excellent",
    },
    {
      name: "Michael Chen",
      clients: 38,
      applications: 1654,
      avgATS: 94,
      interviewRate: 17.2,
      performance: "excellent",
    },
    {
      name: "Emily Rodriguez",
      clients: 35,
      applications: 1523,
      avgATS: 92,
      interviewRate: 16.8,
      performance: "good",
    },
    {
      name: "David Kim",
      clients: 31,
      applications: 1298,
      avgATS: 91,
      interviewRate: 15.3,
      performance: "good",
    },
    {
      name: "Jessica Taylor",
      clients: 28,
      applications: 1156,
      avgATS: 89,
      interviewRate: 14.1,
      performance: "average",
    },
  ];

  const planDistribution = [
    { name: "Silver", value: 98, color: "#9CA3AF" },
    { name: "Gold", value: 112, color: "#FBBF24" },
    { name: "LaunchPad", value: 38, color: "#0275D8" },
  ];

  const performanceChartData = [
    { specialist: "Sarah J.", apps: 1847, interviews: 342 },
    { specialist: "Michael C.", apps: 1654, interviews: 285 },
    { specialist: "Emily R.", apps: 1523, interviews: 256 },
    { specialist: "David K.", apps: 1298, interviews: 199 },
    { specialist: "Jessica T.", apps: 1156, interviews: 163 },
  ];

  const systemHealth = [
    { metric: "Automation Success Rate", value: "98.7%", status: "excellent", icon: CheckCircle },
    { metric: "Bot Failure Alerts", value: "3", status: "warning", icon: AlertCircle },
    { metric: "SLA Compliance", value: "96.2%", status: "excellent", icon: CheckCircle },
    { metric: "Support Tickets", value: "12", status: "good", icon: CheckCircle },
  ];

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

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0A2342] mb-2">Operations Overview</h1>
        <p className="text-gray-600">Platform-wide metrics and team performance</p>
      </motion.div>

      <div className="space-y-6">
        {/* Platform KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {platformKPIs.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
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
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Specialist
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Clients
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Applications
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Avg ATS
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Interview Rate
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Performance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {specialistPerformance.map((specialist, idx) => (
                    <motion.tr
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4 text-sm font-medium text-gray-900">
                        {specialist.name}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">{specialist.clients}</td>
                      <td className="py-4 px-4 text-sm font-semibold text-[#0275D8]">
                        {specialist.applications.toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                          {specialist.avgATS}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm font-semibold text-green-600">
                        {specialist.interviewRate}%
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${getPerformanceColor(
                            specialist.performance
                          )}`}
                        >
                          {specialist.performance}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
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

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={planDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {planDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 space-y-3">
              {planDistribution.map((plan, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: plan.color }}
                    />
                    <span className="text-sm text-gray-700">{plan.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {plan.value} clients
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Total Revenue/Month</span>
                <span className="text-lg font-bold text-[#0A2342]">$127,890</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Avg Revenue/Client</span>
                <span className="text-lg font-bold text-[#0275D8]">$516</span>
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

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="specialist" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="apps" fill="#0275D8" name="Applications" radius={[8, 8, 0, 0]} />
                <Bar dataKey="interviews" fill="#00C2D1" name="Interviews" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
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
            {systemHealth.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm text-gray-600">{item.metric}</p>
                    <Icon className={`w-5 h-5 ${getStatusColor(item.status)}`} />
                  </div>
                  <p className={`text-2xl font-bold ${getStatusColor(item.status)}`}>
                    {item.value}
                  </p>
                </motion.div>
              );
            })}
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

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-900">Performance Trending Up</h3>
                </div>
                <p className="text-sm text-blue-700">+12% improvement this month</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <h3 className="font-semibold text-yellow-900">3 Minor Alerts</h3>
                </div>
                <p className="text-sm text-yellow-700">Non-critical issues detected</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
