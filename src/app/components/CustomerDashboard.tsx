import { useState } from "react";
import { motion } from "motion/react";
import {
  Send,
  Target,
  TrendingUp,
  Award,
  Download,
  Eye,
  Calendar,
  MessageSquare,
  Zap,
} from "lucide-react";
import { KPICard } from "./KPICard";
import { PipelineCard } from "./PipelineCard";
import { PlanBadge } from "./PlanBadge";
import { ATSScoreBadge } from "./ATSScoreBadge";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

export function CustomerDashboard() {
  const [selectedPlan] = useState<"silver" | "gold" | "launchpad">("launchpad");

  const kpiData = [
    {
      title: "Applications Submitted",
      value: 47,
      trend: 15,
      trendData: [32, 35, 38, 42, 45, 47],
      icon: <Send className="w-5 h-5" />,
    },
    {
      title: "Remaining Quota",
      value: 153,
      trendData: [200, 180, 165, 160, 155, 153],
      icon: <Target className="w-5 h-5" />,
    },
    {
      title: "Interview Conversion",
      value: "18%",
      trend: 12,
      trendData: [10, 12, 14, 15, 17, 18],
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      title: "Avg ATS Score",
      value: 94,
      trend: 3,
      trendData: [88, 90, 91, 92, 93, 94],
      icon: <Award className="w-5 h-5" />,
    },
  ];

  const pipelineData = {
    applied: [
      {
        jobTitle: "Senior Software Engineer",
        company: "Tech Corp",
        resumeVersion: "SWE_TechStack_v3",
        atsScore: 96,
        dateApplied: "Feb 14, 2026",
      },
      {
        jobTitle: "Full Stack Developer",
        company: "StartupXYZ",
        resumeVersion: "FullStack_Modern_v2",
        atsScore: 93,
        dateApplied: "Feb 13, 2026",
      },
    ],
    viewed: [
      {
        jobTitle: "Frontend Engineer",
        company: "Digital Agency",
        resumeVersion: "Frontend_React_v4",
        atsScore: 95,
        dateApplied: "Feb 11, 2026",
      },
    ],
    interview: [
      {
        jobTitle: "Lead Developer",
        company: "Finance Inc",
        resumeVersion: "SWE_Leadership_v1",
        atsScore: 97,
        dateApplied: "Feb 8, 2026",
      },
      {
        jobTitle: "Engineering Manager",
        company: "Growth Co",
        resumeVersion: "Manager_Tech_v2",
        atsScore: 94,
        dateApplied: "Feb 7, 2026",
      },
    ],
    offer: [
      {
        jobTitle: "Senior React Developer",
        company: "Cloud Solutions",
        resumeVersion: "Frontend_React_v3",
        atsScore: 98,
        dateApplied: "Feb 1, 2026",
      },
    ],
    rejected: [
      {
        jobTitle: "DevOps Engineer",
        company: "Infrastructure Co",
        resumeVersion: "DevOps_AWS_v1",
        atsScore: 85,
        dateApplied: "Jan 28, 2026",
      },
    ],
  };

  const resumeVersions = [
    { id: "RES001", targetRole: "Senior Software Engineer", atsScore: 96, usedIn: 12 },
    { id: "RES002", targetRole: "Full Stack Developer", atsScore: 93, usedIn: 8 },
    { id: "RES003", targetRole: "Frontend Engineer", atsScore: 95, usedIn: 15 },
    { id: "RES004", targetRole: "Engineering Manager", atsScore: 94, usedIn: 6 },
  ];

  const activityFeed = [
    { type: "application", text: "Application submitted to Tech Corp", time: "2 hours ago" },
    { type: "resume", text: "Resume optimized for Senior SWE role", time: "5 hours ago" },
    { type: "interview", text: "Interview scheduled with Growth Co", time: "1 day ago" },
    { type: "response", text: "Recruiter responded from Finance Inc", time: "2 days ago" },
    { type: "application", text: "Application submitted to StartupXYZ", time: "3 days ago" },
  ];

  const planDetails = {
    silver: { limit: 60, analytics: "Basic", features: ["60 Applications/Month", "Basic Analytics"] },
    gold: {
      limit: 100,
      analytics: "Full",
      features: ["100 Applications/Month", "Full Analytics", "Recruiter Outreach"],
    },
    launchpad: {
      limit: 200,
      analytics: "Advanced",
      features: [
        "200+ Applications/Month",
        "Weekly Coaching",
        "Interview Prep",
        "Salary Negotiation Support",
      ],
    },
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0A2342] mb-2">Welcome back, John!</h1>
        <p className="text-gray-600">Your job pipeline is actively growing.</p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Content - 3 columns */}
        <div className="xl:col-span-3 space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiData.map((kpi, index) => (
              <KPICard key={index} {...kpi} />
            ))}
          </div>

          {/* Application Pipeline Board */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-xl font-bold text-[#0A2342] mb-6">Application Pipeline</h2>

            <div className="overflow-x-auto">
              <div className="flex gap-4 min-w-max pb-4">
                {["applied", "viewed", "interview", "offer", "rejected"].map((stage, stageIdx) => (
                  <div key={stage} className="w-72 flex-shrink-0">
                    <div className="bg-gray-50 rounded-lg px-4 py-2 mb-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-[#0A2342] capitalize">{stage}</h3>
                        <span className="text-sm text-gray-500">
                          {pipelineData[stage as keyof typeof pipelineData].length}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {pipelineData[stage as keyof typeof pipelineData].map((card, idx) => (
                        <PipelineCard key={idx} {...card} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Resume Version Library */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-xl font-bold text-[#0A2342] mb-6">Resume Version Library</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Resume ID
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Target Role
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      ATS Score
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Used In # Apps
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {resumeVersions.map((resume, idx) => (
                    <motion.tr
                      key={resume.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4 text-sm font-medium text-[#0275D8]">{resume.id}</td>
                      <td className="py-4 px-4 text-sm text-gray-900">{resume.targetRole}</td>
                      <td className="py-4 px-4">
                        <ATSScoreBadge score={resume.atsScore} />
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">{resume.usedIn}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            Preview
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-xl font-bold text-[#0A2342] mb-6">Recent Activity</h2>

            <div className="space-y-4">
              {activityFeed.map((activity, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-[#0275D8] to-[#00C2D1] rounded-lg flex items-center justify-center flex-shrink-0">
                    {activity.type === "application" && <Send className="w-5 h-5 text-white" />}
                    {activity.type === "resume" && <Zap className="w-5 h-5 text-white" />}
                    {activity.type === "interview" && <Calendar className="w-5 h-5 text-white" />}
                    {activity.type === "response" && <MessageSquare className="w-5 h-5 text-white" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar - Subscription Panel */}
        <div className="xl:col-span-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-20"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#0A2342]">Your Plan</h3>
              <PlanBadge plan={selectedPlan} />
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-gradient-to-br from-[#0275D8]/10 to-[#00C2D1]/10 rounded-lg p-4">
                <div className="text-3xl font-bold text-[#0A2342] mb-1">
                  {planDetails[selectedPlan].limit}
                </div>
                <div className="text-sm text-gray-600">Applications / Month</div>
                <div className="mt-3 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#0275D8] to-[#00C2D1] h-full rounded-full"
                    style={{ width: "23.5%" }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-2">47 used • 153 remaining</div>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-gray-700 mb-3">Plan Features</h4>
                <ul className="space-y-2">
                  {planDetails[selectedPlan].features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {selectedPlan === "launchpad" && (
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <h4 className="font-semibold text-sm text-gray-700 mb-3">Premium Services</h4>
                <Button className="w-full bg-gradient-to-r from-[#0275D8] to-[#00C2D1] text-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  Request Interview Prep
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-[#0275D8] text-[#0275D8] hover:bg-[#0275D8]/5"
                >
                  <Award className="w-4 h-4 mr-2" />
                  Request Training
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-[#0275D8] text-[#0275D8] hover:bg-[#0275D8]/5"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  On-the-Job Support
                </Button>
              </div>
            )}

            {selectedPlan !== "launchpad" && (
              <Button className="w-full bg-gradient-to-r from-[#0275D8] to-[#00C2D1] text-white">
                Upgrade to {selectedPlan === "silver" ? "Gold" : "Career LaunchPad"}
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
