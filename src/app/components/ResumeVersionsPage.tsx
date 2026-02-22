import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download, Eye, Edit, Copy, FileText, Target, TrendingUp, Loader2, X } from "lucide-react";
import { Button } from "./ui/button";
import { ATSScoreBadge } from "./ATSScoreBadge";

export function ResumeVersionsPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  
  // --- MODAL STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetRoleInput, setTargetRoleInput] = useState("");

  const resumeVersions = [
    {
      id: "RES001",
      name: "SWE_TechStack_v3",
      targetRole: "Senior Software Engineer",
      atsScore: 96,
      usedIn: 12,
      successRate: 18,
      lastUpdated: "Feb 10, 2026",
      keywords: ["React", "TypeScript", "AWS", "Leadership", "Microservices"],
    },
    {
      id: "RES002",
      name: "FullStack_Modern_v2",
      targetRole: "Full Stack Developer",
      atsScore: 93,
      usedIn: 8,
      successRate: 15,
      lastUpdated: "Feb 5, 2026",
      keywords: ["JavaScript", "Node.js", "React", "PostgreSQL", "Docker"],
    },
    {
      id: "RES003",
      name: "Frontend_React_v4",
      targetRole: "Frontend Engineer",
      atsScore: 95,
      usedIn: 15,
      successRate: 20,
      lastUpdated: "Feb 8, 2026",
      keywords: ["React", "Next.js", "Tailwind CSS", "UI/UX", "Performance"],
    },
    {
      id: "RES004",
      name: "SWE_Leadership_v1",
      targetRole: "Engineering Manager",
      atsScore: 94,
      usedIn: 6,
      successRate: 25,
      lastUpdated: "Feb 1, 2026",
      keywords: ["Team Leadership", "Agile", "Architecture", "Mentoring", "Strategy"],
    },
    {
      id: "RES005",
      name: "DevOps_AWS_v1",
      targetRole: "DevOps Engineer",
      atsScore: 85,
      usedIn: 4,
      successRate: 10,
      lastUpdated: "Jan 25, 2026",
      keywords: ["AWS", "Kubernetes", "CI/CD", "Terraform", "Monitoring"],
    },
  ];

  const stats = [
    { label: "Total Resume Versions", value: resumeVersions.length, icon: FileText },
    {
      label: "Avg ATS Score",
      value: Math.round(resumeVersions.reduce((acc, r) => acc + r.atsScore, 0) / resumeVersions.length),
      icon: Target,
    },
    {
      label: "Total Applications",
      value: resumeVersions.reduce((acc, r) => acc + r.usedIn, 0),
      icon: TrendingUp,
    },
  ];

  // --- API CONNECTION 1: Trigger the AI Generator from the Modal ---
  const submitNewResume = async () => {
    if (!targetRoleInput.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch("http://localhost:3001/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetRole: targetRoleInput }),
      });

      if (!response.ok) throw new Error("Failed to generate resume");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Tailored_${targetRoleInput.replace(/\s+/g, "_")}_Resume.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      
      // Close modal and clear input on success
      setIsModalOpen(false);
      setTargetRoleInput("");
      
    } catch (error) {
      console.error("Generation error:", error);
      alert("Error generating resume. Is the backend running on port 3001?");
    } finally {
      setIsGenerating(false);
    }
  };

  // --- API CONNECTION 2: Download Existing Resume ---
  const handleDownload = async (resumeId: string, roleName: string) => {
    setDownloadingId(resumeId);
    try {
      const response = await fetch("http://localhost:3001/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetRole: roleName }), 
      });

      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${roleName.replace(/\s+/g, "_")}_Resume.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download PDF.");
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto relative">
      
      {/* --- MODAL OVERLAY --- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#0A2342]">Create Tailored Resume</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                  disabled={isGenerating}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Enter the job title or role you are targeting. Our AI will analyze your master profile and generate a highly optimized PDF variant.
              </p>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Job Role</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0275D8] focus:border-[#0275D8] outline-none transition-all"
                  placeholder="e.g., Senior Node.js Engineer"
                  value={targetRoleInput}
                  onChange={(e) => setTargetRoleInput(e.target.value)}
                  disabled={isGenerating}
                  autoFocus
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setIsModalOpen(false)}
                  disabled={isGenerating}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={submitNewResume}
                  disabled={isGenerating || !targetRoleInput.trim()}
                  className="bg-gradient-to-r from-[#0275D8] to-[#00C2D1] text-white"
                >
                  {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FileText className="w-4 h-4 mr-2" />}
                  {isGenerating ? "Generating..." : "Generate AI Resume"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0A2342] mb-2">Resume Versions</h1>
        <p className="text-gray-600">Manage and optimize your tailored resume versions</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-[#0275D8] to-[#00C2D1] rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#0A2342]">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Create New Button - NOW TRIGGERS THE MODAL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <Button 
          onClick={() => setIsModalOpen(true)}
          disabled={isGenerating}
          className="bg-gradient-to-r from-[#0275D8] to-[#00C2D1] text-white"
        >
          <FileText className="w-4 h-4 mr-2" />
          Create New Resume Version
        </Button>
      </motion.div>

      {/* Resume Versions List */}
      <div className="space-y-4">
        {resumeVersions.map((resume, idx) => (
          <motion.div
            key={resume.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + idx * 0.1 }}
            className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left: Resume Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#0A2342] mb-1">{resume.name}</h3>
                    <p className="text-sm text-gray-600">{resume.targetRole}</p>
                  </div>
                  <ATSScoreBadge score={resume.atsScore} />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Used In</p>
                    <p className="text-lg font-semibold text-[#0275D8]">{resume.usedIn} apps</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Success Rate</p>
                    <p className="text-lg font-semibold text-green-600">{resume.successRate}%</p>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-xs text-gray-500 mb-1">Last Updated</p>
                    <p className="text-sm text-gray-700">{resume.lastUpdated}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-2">Key Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {resume.keywords.map((keyword, kidx) => (
                      <span
                        key={kidx}
                        className="px-3 py-1 bg-[#0275D8]/10 text-[#0275D8] text-xs font-medium rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex flex-row lg:flex-col gap-2 lg:w-auto">
                <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                
                <Button 
                  onClick={() => handleDownload(resume.id, resume.targetRole)}
                  disabled={downloadingId === resume.id}
                  variant="outline" size="sm" className="flex-1 lg:flex-none"
                >
                  {downloadingId === resume.id ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                  Download
                </Button>

                <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}