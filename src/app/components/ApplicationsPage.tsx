import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Search, Filter, Eye, ExternalLink, Calendar, Building, Loader2, AlertCircle } from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [hasError, setHasError] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/dashboard/applications`);
        if (!response.ok) throw new Error("Wahala fetching applications data");
        
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error("Failed to load applications:", error);
        setHasError(true);
        
        // GRACEFUL FALLBACK: Feed it skeleton data so the UI doesn't look broken
        setApplications([
          {
            id: "fallback-1",
            jobTitle: "...",
            company: "...",
            location: "...",
            appliedDate: "...",
            status: "applied", 
            atsScore: "...",
            resumeVersion: "...",
            salary: "..."
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      (app.jobTitle || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.company || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { 
      label: "Total Applications", 
      value: hasError ? "..." : applications.length, 
      color: "text-[#0275D8]" 
    },
    {
      label: "Interviews",
      value: hasError ? "..." : applications.filter((a) => a.status === "interview").length,
      color: "text-green-600",
    },
    {
      label: "Offers",
      value: hasError ? "..." : applications.filter((a) => a.status === "offer").length,
      color: "text-emerald-600",
    },
    {
      label: "Pending",
      value: hasError ? "..." : applications.filter((a) => a.status === "applied" || a.status === "viewed").length,
      color: "text-blue-600",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-[#0A2342]">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-[#0275D8]" />
        <p className="text-lg font-medium">Loading your job applications...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* Offline Warning Banner */}
      {hasError && (
        <div className="mb-6 bg-orange-50 border border-orange-200 text-orange-800 px-4 py-3 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-orange-500" />
          <p className="text-sm">Unable to connect to live database. Showing placeholder layout.</p>
        </div>
      )}

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0A2342] mb-2">Applications</h1>
        <p className="text-gray-600">Track and manage all your job applications</p>
      </motion.div>

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
              disabled={hasError}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter} disabled={hasError}>
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
                  {!hasError && <StatusBadge status={app.status} />}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Applied: {app.appliedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Salary:</span>
                    <span className={hasError ? "font-semibold text-gray-400" : "font-semibold text-green-600"}>{app.salary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Resume:</span>
                    <span className={hasError ? "text-gray-400 font-medium" : "text-[#0275D8] font-medium"}>{app.resumeVersion}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3 lg:w-auto">
                <ATSScoreBadge score={app.atsScore} />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled={hasError}>
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" disabled={hasError}>
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Job Post
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredApplications.length === 0 && !hasError && (
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