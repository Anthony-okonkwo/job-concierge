import { motion } from "motion/react";
import { TrendingUp, Target, Award, Calendar } from "lucide-react";
import { KPICard } from "./KPICard";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function AnalyticsPage() {
  const kpiData = [
    {
      title: "Total Applications",
      value: 156,
      trend: 18,
      trendData: [120, 128, 135, 142, 149, 156],
      icon: <Target className="w-5 h-5" />,
    },
    {
      title: "Interview Rate",
      value: "16.8%",
      trend: 12,
      trendData: [12.5, 13.2, 14.1, 15.0, 15.8, 16.8],
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      title: "Avg ATS Score",
      value: 93,
      trend: 5,
      trendData: [88, 89, 90, 91, 92, 93],
      icon: <Award className="w-5 h-5" />,
    },
    {
      title: "Response Time",
      value: "4.2 days",
      trend: -15,
      trendData: [6.5, 6.0, 5.5, 5.0, 4.5, 4.2],
      icon: <Calendar className="w-5 h-5" />,
    },
  ];

  const applicationTrend = [
    { month: "Sep", applications: 18, interviews: 2 },
    { month: "Oct", applications: 24, interviews: 3 },
    { month: "Nov", applications: 32, interviews: 5 },
    { month: "Dec", applications: 28, interviews: 4 },
    { month: "Jan", applications: 38, interviews: 7 },
    { month: "Feb", applications: 47, interviews: 8 },
  ];

  const statusDistribution = [
    { name: "Applied", value: 42, color: "#0275D8" },
    { name: "Viewed", value: 28, color: "#8B5CF6" },
    { name: "Interview", value: 15, color: "#10B981" },
    { name: "Offer", value: 8, color: "#059669" },
    { name: "Rejected", value: 20, color: "#6B7280" },
  ];

  const rolePerformance = [
    { role: "Senior SWE", apps: 42, interviews: 9, offers: 3 },
    { role: "Full Stack", apps: 35, interviews: 7, offers: 2 },
    { role: "Frontend", apps: 28, interviews: 5, offers: 2 },
    { role: "Backend", apps: 24, interviews: 4, offers: 1 },
    { role: "DevOps", apps: 15, interviews: 2, offers: 0 },
  ];

  const topCompanies = [
    { name: "Tech Corp", applications: 8, status: "2 Interviews" },
    { name: "Cloud Solutions", applications: 6, status: "1 Offer" },
    { name: "Finance Inc", applications: 5, status: "1 Interview" },
    { name: "StartupXYZ", applications: 4, status: "Applied" },
    { name: "Digital Agency", applications: 4, status: "Viewed" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0A2342] mb-2">Analytics</h1>
        <p className="text-gray-600">Track your job search performance and insights</p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
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
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={applicationTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="applications"
                stroke="#0275D8"
                strokeWidth={3}
                dot={{ fill: "#0275D8", r: 6 }}
                name="Applications"
              />
              <Line
                type="monotone"
                dataKey="interviews"
                stroke="#00C2D1"
                strokeWidth={3}
                dot={{ fill: "#00C2D1", r: 6 }}
                name="Interviews"
              />
            </LineChart>
          </ResponsiveContainer>
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
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {statusDistribution.map((status, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: status.color }}
                  />
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
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rolePerformance}>
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
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Applications
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {topCompanies.map((company, idx) => (
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
                    <span className="text-sm font-semibold text-[#0275D8]">
                      {company.applications}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{company.status}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
          <h3 className="font-bold text-green-900 mb-2">🎯 Top Performing Resume</h3>
          <p className="text-sm text-green-800">
            Your <span className="font-semibold">Frontend_React_v4</span> resume has a 20% interview
            conversion rate - highest among all versions!
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-2">💡 Strategic Insight</h3>
          <p className="text-sm text-blue-800">
            Finance and Cloud roles show higher response rates. Consider focusing 60% of applications
            in these sectors.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
