import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Send, Target, TrendingUp, Award, Download, Eye, Calendar, MessageSquare, Zap, Loader2, AlertCircle } from "lucide-react";
import { KPICard } from "./KPICard";
import { PipelineCard } from "./PipelineCard";
import { PlanBadge } from "./PlanBadge";
import { ATSScoreBadge } from "./ATSScoreBadge";
import { Button } from "./ui/button";

export function CustomerDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const testClientId = "11111111-1111-1111-1111-111111111111";
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/dashboard/${testClientId}`);
        if (!response.ok) throw new Error("Wahala fetching customer dashboard data");
        
        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        console.error("Failed to load customer dashboard:", err);
        setError("Unable to connect to the live database.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-[#0A2342]">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-[#0275D8]" />
        <p className="text-lg font-medium">Loading your career dashboard...</p>
      </div>
    );
  }

  // Proper Error Handling: If there's no data, stop here and show the error cleanly
  if (error || !dashboardData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-[#0A2342]">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-xl font-bold text-red-600">Failed to load dashboard.</p>
        <p className="text-gray-500 mt-2">{error || "Data not found."}</p>
      </div>
    );
  }

  const { user, metrics, pipeline, resumeLibrary, recentActivity } = dashboardData;
  const selectedPlan = (user.planName || "launchpad").toLowerCase() as "silver" | "gold" | "launchpad";

  const kpiData = [
    { title: "Applications Submitted", value: metrics.applicationsSubmitted.value, trend: metrics.applicationsSubmitted.trend, icon: <Send className="w-5 h-5" /> },
    { title: "Remaining Quota", value: metrics.remainingQuota.value, icon: <Target className="w-5 h-5" /> },
    { title: "Interview Conversion", value: `${metrics.interviewConversion.value}%`, trend: metrics.interviewConversion.trend, icon: <TrendingUp className="w-5 h-5" /> },
    { title: "Avg ATS Score", value: metrics.avgAtsScore.value, trend: metrics.avgAtsScore.trend, icon: <Award className="w-5 h-5" /> },
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0A2342] mb-2">Welcome back, {user.name.split(' ')[0]}!</h1>
        <p className="text-gray-600">Your job pipeline is actively growing.</p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 space-y-6">
          
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiData.map((kpi, index) => <KPICard key={index} {...kpi} />)}
          </div>

          {/* Application Pipeline Board */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-[#0A2342] mb-6">Application Pipeline</h2>
            <div className="overflow-x-auto">
              <div className="flex gap-4 min-w-max pb-4">
                {["applied", "viewed", "interview"].map((stage) => (
                  <div key={stage} className="w-72 flex-shrink-0">
                    <div className="bg-gray-50 rounded-lg px-4 py-2 mb-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-[#0A2342] capitalize">{stage}</h3>
                        <span className="text-sm text-gray-500">{(pipeline[stage] || []).length}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {(pipeline[stage] || []).length === 0 ? (
                         <div className="text-sm text-center text-gray-400 py-4 border-2 border-dashed border-gray-100 rounded-lg">No records</div>
                      ) : (
                        (pipeline[stage] || []).map((card: any, idx: number) => (
                          <PipelineCard key={idx} {...card} />
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Resume Version Library */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-[#0A2342] mb-6">Resume Version Library</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Target Role</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">ATS Score</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Used In # Apps</th>
                  </tr>
                </thead>
                <tbody>
                  {resumeLibrary.length === 0 ? (
                    <tr><td colSpan={3} className="text-center py-6 text-gray-400 text-sm">No resumes available...</td></tr>
                  ) : (
                    resumeLibrary.map((resume: any, idx: number) => (
                      <motion.tr key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 text-sm text-gray-900">{resume.targetRole}</td>
                        <td className="py-4 px-4"><ATSScoreBadge score={resume.atsScore} /></td>
                        <td className="py-4 px-4 text-sm text-gray-600">{resume.usedInApps}</td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Activity Feed */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-[#0A2342] mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.length === 0 ? (
                <div className="text-center py-4 text-gray-400 text-sm">Waiting for new activity...</div>
              ) : (
                recentActivity.map((activity: any, idx: number) => (
                  <motion.div key={idx} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#0275D8] to-[#00C2D1] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Send className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{new Date(activity.timestamp).toLocaleString()}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar - Subscription Panel */}
        <div className="xl:col-span-1 space-y-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#0A2342]">Your Plan</h3>
              <PlanBadge plan={selectedPlan} />
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-gradient-to-br from-[#0275D8]/10 to-[#00C2D1]/10 rounded-lg p-4">
                <div className="text-3xl font-bold text-[#0A2342] mb-1">{user.totalQuota}</div>
                <div className="text-sm text-gray-600">Total Quota</div>
                <div className="mt-3 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#0275D8] to-[#00C2D1] h-full rounded-full" style={{ width: user.totalQuota === 0 ? '0%' : `${(metrics.applicationsSubmitted.value / user.totalQuota) * 100}%` }} />
                </div>
                <div className="text-xs text-gray-500 mt-2">{metrics.applicationsSubmitted.value} used • {metrics.remainingQuota.value} remaining</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}