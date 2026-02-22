import { motion } from "motion/react";
import {
  Users,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  Send,
  Zap,
  Target,
} from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { PlanBadge } from "./PlanBadge";
import { ATSScoreBadge } from "./ATSScoreBadge";
import { Button } from "./ui/button";

export function StaffDashboard() {
  const workQueue = [
    {
      client: "John Doe",
      plan: "launchpad" as const,
      appsDueToday: 8,
      pendingResumes: 3,
      sla: "on-track" as const,
    },
    {
      client: "Sarah Smith",
      plan: "gold" as const,
      appsDueToday: 5,
      pendingResumes: 1,
      sla: "on-track" as const,
    },
    {
      client: "Mike Johnson",
      plan: "silver" as const,
      appsDueToday: 12,
      pendingResumes: 5,
      sla: "behind" as const,
    },
    {
      client: "Emily Chen",
      plan: "gold" as const,
      appsDueToday: 15,
      pendingResumes: 7,
      sla: "urgent" as const,
    },
  ];

  const resumeQueue = [
    {
      client: "John Doe",
      jobTitle: "Senior Software Engineer",
      fitScore: 95,
      keywords: ["React", "TypeScript", "AWS", "Leadership"],
    },
    {
      client: "Sarah Smith",
      jobTitle: "Product Manager",
      fitScore: 88,
      keywords: ["Agile", "Roadmap", "Stakeholder Management"],
    },
    {
      client: "Mike Johnson",
      jobTitle: "Data Analyst",
      fitScore: 92,
      keywords: ["SQL", "Python", "Tableau", "Analytics"],
    },
  ];

  const atsQueue = [
    {
      client: "Emily Chen",
      role: "Marketing Manager",
      atsScore: 87,
      missingKeywords: ["SEO", "Analytics"],
      suggestions: "Add more quantifiable achievements",
    },
    {
      client: "John Doe",
      role: "Senior SWE",
      atsScore: 96,
      missingKeywords: [],
      suggestions: "Ready for submission",
    },
  ];

  const applicationQueue = [
    {
      client: "Sarah Smith",
      role: "Product Manager - SaaS",
      resumeReady: true,
      coverLetter: true,
      vpnState: "Active",
    },
    {
      client: "Mike Johnson",
      role: "Data Analyst - Finance",
      resumeReady: true,
      coverLetter: false,
      vpnState: "Active",
    },
    {
      client: "John Doe",
      role: "Senior SWE - Cloud",
      resumeReady: false,
      coverLetter: false,
      vpnState: "Inactive",
    },
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0A2342] mb-2">Assigned Clients</h1>
        <p className="text-gray-600">Your operational dashboard for client management</p>
      </motion.div>

      <div className="space-y-6">
        {/* Daily Work Queue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#0A2342]">Daily Work Queue</h2>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-gray-600">On Track</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <span className="text-gray-600">Behind</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="text-gray-600">Urgent</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Client</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Plan</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Apps Due Today
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Pending Resumes
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    SLA Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {workQueue.map((item, idx) => (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">{item.client}</td>
                    <td className="py-4 px-4">
                      <PlanBadge plan={item.plan} />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-semibold text-[#0275D8]">
                          {item.appsDueToday}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{item.pendingResumes}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <StatusBadge status={item.sla} />
                    </td>
                    <td className="py-4 px-4">
                      <Button size="sm" className="bg-[#0275D8] text-white hover:bg-[#0A2342]">
                        View Details
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Resume Optimization Queue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-xl font-bold text-[#0A2342] mb-6">Resume Optimization Queue</h2>

            <div className="space-y-4">
              {resumeQueue.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{item.client}</p>
                      <h4 className="font-semibold text-[#0A2342]">{item.jobTitle}</h4>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-200">
                      <Target className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-semibold text-green-700">{item.fitScore}%</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-2">Extracted Keywords:</p>
                    <div className="flex flex-wrap gap-2">
                      {item.keywords.map((keyword, kidx) => (
                        <span
                          key={kidx}
                          className="px-2 py-1 bg-[#0275D8]/10 text-[#0275D8] text-xs font-medium rounded"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button size="sm" className="w-full bg-gradient-to-r from-[#0275D8] to-[#00C2D1] text-white">
                    <Zap className="w-4 h-4 mr-2" />
                    Generate Resume
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ATS QA Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-xl font-bold text-[#0A2342] mb-6">ATS Quality Assurance</h2>

            <div className="space-y-4">
              {atsQueue.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{item.client}</p>
                      <h4 className="font-semibold text-[#0A2342]">{item.role}</h4>
                    </div>
                    <ATSScoreBadge score={item.atsScore} />
                  </div>

                  {item.missingKeywords.length > 0 && (
                    <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-yellow-800 mb-1">
                            Missing Keywords:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {item.missingKeywords.map((keyword, kidx) => (
                              <span
                                key={kidx}
                                className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded"
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-800">
                      <span className="font-semibold">Suggestion:</span> {item.suggestions}
                    </p>
                  </div>

                  <Button
                    size="sm"
                    className="w-full bg-green-600 text-white hover:bg-green-700"
                    disabled={item.atsScore < 90}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve for Submission
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Application Execution Queue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-xl font-bold text-[#0A2342] mb-6">Application Execution Queue</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Client</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Resume Ready
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Cover Letter
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    VPN State
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {applicationQueue.map((item, idx) => (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">{item.client}</td>
                    <td className="py-4 px-4 text-sm text-gray-900">{item.role}</td>
                    <td className="py-4 px-4">
                      {item.resumeReady ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Clock className="w-5 h-5 text-gray-400" />
                      )}
                    </td>
                    <td className="py-4 px-4">
                      {item.coverLetter ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Clock className="w-5 h-5 text-gray-400" />
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                          item.vpnState === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            item.vpnState === "Active" ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                        {item.vpnState}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <Button
                        size="sm"
                        className="bg-[#0275D8] text-white hover:bg-[#0A2342]"
                        disabled={!item.resumeReady || !item.coverLetter}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Submit Application
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
