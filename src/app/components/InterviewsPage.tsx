import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Video, MapPin, Phone, Users, FileText, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";

export function InterviewsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [interviewData, setInterviewData] = useState<any>(null);
  const [hasError, setHasError] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const token = localStorage.getItem("jobConciergeToken");
        if (!token) throw new Error("No authentication token found");
        
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const currentUserId = tokenPayload.sub;

        const response = await fetch(`${API_BASE_URL}/api/v1/interviews/${currentUserId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) throw new Error("Wahala fetching interviews data");
        
        const rawData = await response.json();
        const interviewsArray = Array.isArray(rawData) ? rawData : [];
        
        const formattedInterviews = interviewsArray.map(i => ({
          id: i.id,
          jobTitle: i.job_title,
          company: i.company,
          date: i.date,
          time: i.time,
          type: i.type,
          platform: i.platform,
          interviewers: i.interviewers,
          stage: i.stage,
          notes: i.notes,
          preparationStatus: i.preparation_status || 'Pending',
          meetingLink: i.meeting_link,
          status: i.status || 'upcoming',
          outcome: i.outcome,
          feedback: i.feedback
        }));

        const upcoming = formattedInterviews.filter(i => i.status?.toLowerCase() !== 'completed' && i.status?.toLowerCase() !== 'past');
        const past = formattedInterviews.filter(i => i.status?.toLowerCase() === 'completed' || i.status?.toLowerCase() === 'past');

        setInterviewData({
          upcomingInterviews: upcoming,
          pastInterviews: past,
          stats: [
            { label: "Upcoming", value: upcoming.length, color: "text-[#0275D8]" },
            { label: "Total Completed", value: past.length, color: "text-green-600" },
            { label: "Total Tracked", value: formattedInterviews.length, color: "text-gray-600" },
          ]
        });

      } catch (error) {
        console.error("Failed to load interviews:", error);
        setHasError(true);
        setInterviewData({
          upcomingInterviews: [], pastInterviews: [],
          stats: [
            { label: "Upcoming", value: 0, color: "text-[#0275D8]" },
            { label: "Total Completed", value: 0, color: "text-green-600" },
            { label: "Total Tracked", value: 0, color: "text-gray-600" },
          ]
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterviews();
  }, [API_BASE_URL]);

  // ==========================================
  // 🚀 BUTTON ACTION HANDLERS
  // ==========================================
  const handleJoinMeeting = (link: string) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      alert("No meeting link provided for this interview yet!");
    }
  };

  const handleAddToCalendar = (interview: any) => {
    const title = encodeURIComponent(`Interview: ${interview.jobTitle} at ${interview.company}`);
    const details = encodeURIComponent(`Meeting Link: ${interview.meetingLink || 'TBD'}\n\nStage: ${interview.stage || 'Initial'}\nNotes: ${interview.notes || 'None'}`);
    
    // Safely parse the date and time
    let startDateStr = interview.date ? `${interview.date}T${interview.time || '00:00'}:00` : new Date().toISOString();
    let startDate = new Date(startDateStr);
    
    if (isNaN(startDate.getTime())) {
       startDate = new Date(); // Fallback to now if DB string is weird
    }
    
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // Assumes 1 hour interview

    const formatGoogleDate = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const dates = `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`;

    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}`;
    window.open(googleCalUrl, '_blank');
  };

  const handlePrepGuide = (interviewId: string) => {
    // 🚧 Placeholder for our next feature!
    alert(`AI Prep Guide logic for Interview ID: ${interviewId} Coming Soon!`);
  };

  // ==========================================

  const getTypeIcon = (type: string) => {
    if (type?.toLowerCase() === "video") return <Video className="w-4 h-4" />;
    if (type?.toLowerCase() === "phone") return <Phone className="w-4 h-4" />;
    return <MapPin className="w-4 h-4" />;
  };

  const getStatusColor = (status: string) => {
    if (status === "Ready") return "bg-green-100 text-green-700 border-green-200";
    if (status === "In Progress") return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-gray-100 text-gray-700 border-gray-200";
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-[#0A2342]">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-[#0275D8]" />
        <p className="text-lg font-medium">Loading your interview schedule...</p>
      </div>
    );
  }

  const { upcomingInterviews = [], pastInterviews = [], stats = [] } = interviewData || {};

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      
      {hasError && (
        <div className="mb-6 bg-orange-50 border border-orange-200 text-orange-800 px-4 py-3 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-orange-500" />
          <p className="text-sm">Unable to connect to live database. Showing cached layout.</p>
        </div>
      )}

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0A2342] mb-2">Interviews</h1>
        <p className="text-gray-600">Manage your interview schedule and preparation</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {(stats || []).map((stat: any, idx: number) => (
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
          {!upcomingInterviews || upcomingInterviews.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center border border-gray-100 shadow-sm">
              <Calendar className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No upcoming interviews scheduled yet.</p>
            </div>
          ) : (
            upcomingInterviews.map((interview: any, idx: number) => (
              <motion.div
                key={interview.id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row gap-4">
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
                        <span>{interview.date || 'TBD'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Clock className="w-4 h-4 text-[#0275D8]" />
                        <span>{interview.time || 'TBD'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        {getTypeIcon(interview.type)}
                        <span className="capitalize">
                          {interview.type || 'TBD'}
                          {interview.platform && ` (${interview.platform})`}
                        </span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center gap-2 text-sm mb-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 font-medium">Interviewers:</span>
                        <span className="text-gray-700">{interview.interviewers?.join(", ") || "TBD"}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                        <div>
                          <span className="text-gray-600 font-medium">Stage: </span>
                          <span className="text-[#0275D8] font-semibold">{interview.stage || 'Initial'}</span>
                        </div>
                      </div>
                    </div>

                    {interview.notes && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm text-blue-800">
                          <span className="font-semibold">Notes:</span> {interview.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 lg:w-48 pt-4 lg:pt-0">
                    {/* 🚀 WIRED BUTTONS HERE */}
                    {interview.meetingLink && (
                      <Button 
                        onClick={() => handleJoinMeeting(interview.meetingLink)}
                        className="w-full bg-gradient-to-r from-[#0275D8] to-[#00C2D1] text-white"
                      >
                        <Video className="w-4 h-4 mr-2" />
                        Join Meeting
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      onClick={() => handleAddToCalendar(interview)}
                      className="w-full"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Add to Calendar
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handlePrepGuide(interview.id)}
                      className="w-full"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Prep Guide
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
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
          {!pastInterviews || pastInterviews.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center border border-gray-100 shadow-sm">
               <p className="text-gray-500 text-sm">No completed interviews recorded yet.</p>
            </div>
          ) : (
            pastInterviews.map((interview: any, idx: number) => (
              <motion.div
                key={interview.id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
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
                    <div className="ml-13 space-y-2 mt-4 sm:mt-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Stage:</span>
                        <span className="text-sm font-medium text-gray-900">{interview.stage}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Outcome:</span>
                        <span className="text-sm font-semibold text-green-600">{interview.outcome || 'Pending'}</span>
                      </div>
                      {interview.feedback && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-2 mt-2">
                          <p className="text-sm text-green-800">{interview.feedback}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                     <Button variant="outline" size="sm" className="w-full sm:w-auto">
                       <FileText className="w-4 h-4 mr-2" />
                       View Details
                     </Button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}