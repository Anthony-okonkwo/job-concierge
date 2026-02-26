import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download, Eye, Edit, Copy, FileText, Target, TrendingUp, Loader2, X, AlertCircle, Save } from "lucide-react";
import { Button } from "./ui/button";
import { ATSScoreBadge } from "./ATSScoreBadge";

export function ResumeVersionsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [resumeVersions, setResumeVersions] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  
  // --- MODAL STATES ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetRoleInput, setTargetRoleInput] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentPreviewResume, setCurrentPreviewResume] = useState<any>(null);

  // --- EDIT MODAL STATES ---
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingResume, setEditingResume] = useState<any>(null);
  const [editSummary, setEditSummary] = useState("");
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  const testClientId = "11111111-1111-1111-1111-111111111111";
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  // --- FETCH DATA FROM DATABASE ---
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/dashboard/${testClientId}`);
        if (!response.ok) throw new Error("Wahala fetching resumes");
        const data = await response.json();
        setResumeVersions(data.resumeLibrary || []);
      } catch (error) {
        console.error("Failed to load resumes:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResumes();
  }, []);

  const stats = [
    { label: "Total Resume Versions", value: resumeVersions.length, icon: FileText },
    { label: "Avg ATS Score", value: resumeVersions.length > 0 ? Math.round(resumeVersions.reduce((acc, r) => acc + (r.atsScore || 0), 0) / resumeVersions.length) : 0, icon: Target },
    { label: "Total Applications", value: resumeVersions.reduce((acc, r) => acc + (r.usedInApps || 0), 0), icon: TrendingUp },
  ];

  const submitNewResume = async () => {
    if (!targetRoleInput.trim()) return;
    setIsGenerating(true);
    try {
      // Hits the new GENERATE endpoint
      const response = await fetch("${API_BASE_URL}/api/v1/resumes/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetRole: targetRoleInput }),
      });
      if (!response.ok) throw new Error("Failed to generate resume");
      
      const data = await response.json();
      const newResume = data.resume; // The saved DB record

      setResumeVersions([newResume, ...resumeVersions]);
      setIsModalOpen(false);
      setTargetRoleInput("");
      
      // Open preview automatically
      handlePreview(newResume);
    } catch (error) {
      alert("Error generating resume.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePreview = (resume: any) => {
    setCurrentPreviewResume(resume);
    // Point directly to the new PDF render endpoint (add timestamp to bypass browser cache)
    setPreviewUrl(`${API_BASE_URL}/api/v1/resumes/${resume.id}/pdf?t=${Date.now()}`);
    setIsPreviewOpen(true);
  };

  const handleDownload = (resume: any) => {
    setDownloadingId(resume.id);
    const url = `${API_BASE_URL}/api/v1/resumes/${resume.id}/pdf`;
    const a = document.createElement("a");
    a.href = url;
    a.download = `${resume.targetRole.replace(/\s+/g, "_")}_Resume.pdf`;
    a.click();
    setDownloadingId(null);
  };

  // --- EDIT FUNCTIONS ---
  const openEditModal = (resume: any) => {
    if (!resume.content) {
      alert("Old resume format detected. Cannot edit content missing from DB.");
      return;
    }
    setEditingResume(resume);
    setEditSummary(resume.content.summary || "");
    setIsEditOpen(true);
  };

  const saveEdits = async () => {
    setIsSavingEdit(true);
    try {
      const updatedContent = { ...editingResume.content, summary: editSummary };
      const response = await fetch(`${API_BASE_URL}/api/v1/resumes/${editingResume.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: updatedContent }),
      });
      
      if (!response.ok) throw new Error("Update failed");
      const data = await response.json();

      setResumeVersions(resumeVersions.map(r => r.id === editingResume.id ? data.resume : r));
      setIsEditOpen(false);
      handlePreview(data.resume); // Show updated PDF immediately!
    } catch (error) {
      alert("Failed to save changes.");
    } finally {
      setIsSavingEdit(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-[#0275D8]" />
        <p className="mt-4 font-medium">Loading your resume library...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto relative">
      {/* NEW RESUME MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#0A2342]">Create Tailored Resume</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-full text-gray-500" disabled={isGenerating}><X className="w-5 h-5" /></button>
              </div>
              <input 
                type="text" 
                className="w-full px-4 py-2 border rounded-lg mb-6 outline-none focus:ring-2 focus:ring-[#0275D8] disabled:opacity-50 disabled:bg-gray-100" 
                placeholder="e.g., Senior Node.js Engineer" 
                value={targetRoleInput} 
                onChange={(e) => setTargetRoleInput(e.target.value)} 
                disabled={isGenerating}
                autoFocus
              />
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsModalOpen(false)} disabled={isGenerating}>Cancel</Button>
                <Button onClick={submitNewResume} disabled={isGenerating || !targetRoleInput.trim()} className="bg-gradient-to-r from-[#0275D8] to-[#00C2D1] text-white min-w-[180px]">
                  {isGenerating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Generating AI PDF...</> : <><FileText className="w-4 h-4 mr-2" />Generate AI Resume</>}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EDIT MODAL (NEW) */}
      <AnimatePresence>
        {isEditOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#0A2342]">Edit Professional Summary</h2>
                <button onClick={() => setIsEditOpen(false)} className="p-1 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
              </div>
              <textarea 
                className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0275D8] outline-none"
                value={editSummary}
                onChange={(e) => setEditSummary(e.target.value)}
              />
              <div className="flex justify-end gap-3 mt-4">
                <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
                <Button onClick={saveEdits} disabled={isSavingEdit} className="bg-gradient-to-r from-[#0275D8] to-[#00C2D1] text-white">
                  {isSavingEdit ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />} Save & Re-render PDF
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PREVIEW MODAL */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-md px-4 py-8">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-2xl w-full max-w-5xl h-full max-h-[90vh] flex flex-col shadow-2xl">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-bold text-[#0A2342]">{currentPreviewResume?.targetRole}</h2>
                <button onClick={() => setIsPreviewOpen(false)} className="p-2 hover:bg-gray-200 rounded-full"><X className="w-5 h-5" /></button>
              </div>
              <div className="flex-1 bg-gray-100 flex items-center justify-center">
                {!previewUrl ? <Loader2 className="w-8 h-8 animate-spin text-[#0275D8]" /> : <iframe src={`${previewUrl}`} className="w-full h-full border-none" title="Resume Preview" />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DASHBOARD UI */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0A2342] mb-2">Resume Versions</h1>
        <p className="text-gray-600">Manage and optimize your tailored resume versions</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0275D8] rounded-lg flex items-center justify-center"><stat.icon className="text-white w-5 h-5" /></div>
            <div><p className="text-sm text-gray-600">{stat.label}</p><p className="text-2xl font-bold">{stat.value}</p></div>
          </div>
        ))}
      </div>

      <Button onClick={() => setIsModalOpen(true)} className="mb-6 bg-gradient-to-r from-[#0275D8] to-[#00C2D1] text-white"><FileText className="w-4 h-4 mr-2" />Create New Resume Version</Button>

      {hasError && (
        <div className="mb-6 bg-orange-50 border border-orange-200 text-orange-800 px-4 py-3 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <p>Database connection failed. Showing local storage only.</p>
        </div>
      )}

      <div className="space-y-4">
        {resumeVersions.map((resume, idx) => (
          <div key={resume.id || idx} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-[#0A2342]">{resume.targetRole}</h3>
                  <ATSScoreBadge score={resume.atsScore} />
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div><p className="text-xs text-gray-500">Used In</p><p className="font-semibold text-[#0275D8]">{resume.usedInApps || 0} apps</p></div>
                  <div><p className="text-xs text-gray-500">Success Rate</p><p className="font-semibold text-green-600">{resume.successRate || 0}%</p></div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(resume.keywords || []).map((keyword: string, kidx: number) => (
                    <span key={kidx} className="px-3 py-1 bg-[#0275D8]/10 text-[#0275D8] text-xs font-medium rounded-full">{keyword}</span>
                  ))}
                </div>
              </div>
              <div className="flex flex-row lg:flex-col gap-2">
                <Button onClick={() => handlePreview(resume)} variant="outline" size="sm"><Eye className="w-4 h-4 mr-2" />Preview</Button>
                {/* CONNECTED THE EDIT BUTTON */}
                <Button onClick={() => openEditModal(resume)} variant="outline" size="sm"><Edit className="w-4 h-4 mr-2" />Edit</Button>
                <Button onClick={() => handleDownload(resume)} disabled={downloadingId === resume.id} variant="outline" size="sm">
                  {downloadingId === resume.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                  Download
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}