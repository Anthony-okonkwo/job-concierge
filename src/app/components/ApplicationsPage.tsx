import { useState } from "react";
import { motion } from "motion/react";
import { Search, Filter, Download, Eye, ExternalLink, Calendar, Building } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { StatusBadge } from "./StatusBadge";
import { ATSScoreBadge } from "./ATSScoreBadge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function ApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const applications = [
    {
      id: "APP001",
      jobTitle: "Senior Software Engineer",
      company: "Tech Corp",
      location: "San Francisco, CA",
      appliedDate: "Feb 14, 2026",
      status: "interview" as const,
      atsScore: 96,
      resumeVersion: "SWE_TechStack_v3",
      salary: "$150K - $200K",
    },
    {
      id: "APP002",
      jobTitle: "Full Stack Developer",
      company: "StartupXYZ",
      location: "Remote",
      appliedDate: "Feb 13, 2026",
      status: "applied" as const,
      atsScore: 93,
      resumeVersion: "FullStack_Modern_v2",
      salary: "$130K - $180K",
    },
    {
      id: "APP003",
      jobTitle: "Frontend Engineer",
      company: "Digital Agency",
      location: "New York, NY",
      appliedDate: "Feb 11, 2026",
      status: "viewed" as const,
      atsScore: 95,
      resumeVersion: "Frontend_React_v4",
      salary: "$140K - $190K",
    },
    {
      id: "APP004",
      jobTitle: "Lead Developer",
      company: "Finance Inc",
      location: "Austin, TX",
      appliedDate: "Feb 8, 2026",
      status: "interview" as const,
      atsScore: 97,
      resumeVersion: "SWE_Leadership_v1",
      salary: "$160K - $210K",
    },
    {
      id: "APP005",
      jobTitle: "Senior React Developer",
      company: "Cloud Solutions",
      location: "Seattle, WA",
      appliedDate: "Feb 1, 2026",
      status: "offer" as const,
      atsScore: 98,
      resumeVersion: "Frontend_React_v3",
      salary: "$155K - $205K",
    },
    {
      id: "APP006",
      jobTitle: "DevOps Engineer",
      company: "Infrastructure Co",
      location: "Chicago, IL",
      appliedDate: "Jan 28, 2026",
      status: "rejected" as const,
      atsScore: 85,
      resumeVersion: "DevOps_AWS_v1",
      salary: "$135K - $175K",
    },
  ];

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: "Total Applications", value: applications.length, color: "text-[#0275D8]" },
    {
      label: "Interviews",
      value: applications.filter((a) => a.status === "interview").length,
      color: "text-green-600",
    },
    {
      label: "Offers",
      value: applications.filter((a) => a.status === "offer").length,
      color: "text-emerald-600",
    },
    {
      label: "Pending",
      value: applications.filter((a) => a.status === "applied" || a.status === "viewed").length,
      color: "text-blue-600",
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0A2342] mb-2">Applications</h1>
        <p className="text-gray-600">Track and manage all your job applications</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by job title or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="viewed">Viewed</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="offer">Offer</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((app, idx) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + idx * 0.1 }}
            className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Left: Job Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-[#0A2342] mb-1">{app.jobTitle}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Building className="w-4 h-4" />
                      <span className="font-medium">{app.company}</span>
                      <span className="text-gray-400">•</span>
                      <span>{app.location}</span>
                    </div>
                  </div>
                  <StatusBadge status={app.status} />
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Applied: {app.appliedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Salary:</span>
                    <span className="font-semibold text-green-600">{app.salary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Resume:</span>
                    <span className="text-[#0275D8] font-medium">{app.resumeVersion}</span>
                  </div>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3 lg:w-auto">
                <ATSScoreBadge score={app.atsScore} />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Job Post
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100"
        >
          <p className="text-gray-500">No applications found matching your criteria.</p>
        </motion.div>
      )}
    </div>
  );
}
