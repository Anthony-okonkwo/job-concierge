import { motion } from "motion/react";
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  Phone,
  Users,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "./ui/button";

export function InterviewsPage() {
  const upcomingInterviews = [
    {
      id: "INT001",
      jobTitle: "Senior Software Engineer",
      company: "Tech Corp",
      date: "Feb 18, 2026",
      time: "2:00 PM - 3:00 PM PST",
      type: "video",
      platform: "Zoom",
      interviewers: ["John Smith", "Sarah Johnson"],
      stage: "Technical Round",
      notes: "Focus on system design and architecture",
      meetingLink: "https://zoom.us/j/123456789",
      preparationStatus: "Ready",
    },
    {
      id: "INT002",
      jobTitle: "Lead Developer",
      company: "Finance Inc",
      date: "Feb 20, 2026",
      time: "10:00 AM - 11:30 AM CST",
      type: "phone",
      interviewers: ["Mike Chen"],
      stage: "HR Screening",
      notes: "Discuss salary expectations and availability",
      preparationStatus: "In Progress",
    },
    {
      id: "INT003",
      jobTitle: "Full Stack Developer",
      company: "StartupXYZ",
      date: "Feb 22, 2026",
      time: "3:00 PM - 4:00 PM EST",
      type: "onsite",
      location: "123 Tech Street, San Francisco, CA",
      interviewers: ["Emily Davis", "David Kim", "Lisa Wong"],
      stage: "Final Round",
      notes: "Panel interview with team leads",
      preparationStatus: "Pending",
    },
  ];

  const pastInterviews = [
    {
      id: "INT004",
      jobTitle: "Senior React Developer",
      company: "Cloud Solutions",
      date: "Feb 12, 2026",
      stage: "Technical Round",
      outcome: "Offer Extended",
      feedback: "Excellent technical skills and communication",
    },
    {
      id: "INT005",
      jobTitle: "Frontend Engineer",
      company: "Digital Agency",
      date: "Feb 10, 2026",
      stage: "HR Screening",
      outcome: "Moved to Next Round",
      feedback: "Strong cultural fit, proceeding to technical assessment",
    },
  ];

  const stats = [
    { label: "Upcoming", value: upcomingInterviews.length, color: "text-[#0275D8]" },
    { label: "This Week", value: 2, color: "text-green-600" },
    { label: "Total Completed", value: pastInterviews.length, color: "text-gray-600" },
  ];

  const getTypeIcon = (type: string) => {
    if (type === "video") return <Video className="w-4 h-4" />;
    if (type === "phone") return <Phone className="w-4 h-4" />;
    return <MapPin className="w-4 h-4" />;
  };

  const getStatusColor = (status: string) => {
    if (status === "Ready") return "bg-green-100 text-green-700 border-green-200";
    if (status === "In Progress") return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0A2342] mb-2">Interviews</h1>
        <p className="text-gray-600">Manage your interview schedule and preparation</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Upcoming Interviews */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="text-xl font-bold text-[#0A2342] mb-4">Upcoming Interviews</h2>
        <div className="space-y-4">
          {upcomingInterviews.map((interview, idx) => (
            <motion.div
              key={interview.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Left: Interview Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-[#0A2342] mb-1">{interview.jobTitle}</h3>
                      <p className="text-sm text-gray-600 font-medium">{interview.company}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        interview.preparationStatus
                      )}`}
                    >
                      {interview.preparationStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Calendar className="w-4 h-4 text-[#0275D8]" />
                      <span>{interview.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Clock className="w-4 h-4 text-[#0275D8]" />
                      <span>{interview.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      {getTypeIcon(interview.type)}
                      <span className="capitalize">
                        {interview.type}
                        {interview.platform && ` (${interview.platform})`}
                      </span>
                    </div>
                    {interview.location && (
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <MapPin className="w-4 h-4 text-[#0275D8]" />
                        <span className="truncate">{interview.location}</span>
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 font-medium">Interviewers:</span>
                      <span className="text-gray-700">{interview.interviewers.join(", ")}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <span className="text-gray-600 font-medium">Stage: </span>
                        <span className="text-[#0275D8] font-semibold">{interview.stage}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      <span className="font-semibold">Notes:</span> {interview.notes}
                    </p>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-row lg:flex-col gap-2 lg:w-48">
                  {interview.meetingLink && (
                    <Button className="flex-1 lg:flex-none bg-gradient-to-r from-[#0275D8] to-[#00C2D1] text-white">
                      <Video className="w-4 h-4 mr-2" />
                      Join Meeting
                    </Button>
                  )}
                  <Button variant="outline" className="flex-1 lg:flex-none">
                    <Calendar className="w-4 h-4 mr-2" />
                    Add to Calendar
                  </Button>
                  <Button variant="outline" className="flex-1 lg:flex-none">
                    <FileText className="w-4 h-4 mr-2" />
                    Prep Guide
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Past Interviews */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-bold text-[#0A2342] mb-4">Past Interviews</h2>
        <div className="space-y-4">
          {pastInterviews.map((interview, idx) => (
            <motion.div
              key={interview.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#0275D8] to-[#00C2D1] rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0A2342]">{interview.jobTitle}</h3>
                      <p className="text-sm text-gray-600">{interview.company}</p>
                      <p className="text-xs text-gray-500 mt-1">{interview.date}</p>
                    </div>
                  </div>
                  <div className="ml-13 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Stage:</span>
                      <span className="text-sm font-medium text-gray-900">{interview.stage}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Outcome:</span>
                      <span className="text-sm font-semibold text-green-600">{interview.outcome}</span>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-2 mt-2">
                      <p className="text-sm text-green-800">{interview.feedback}</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
