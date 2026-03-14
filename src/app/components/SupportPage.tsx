import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Mail,
  Phone,
  HelpCircle,
  Book,
  Video,
  FileText,
  Send,
  Clock,
  Loader2,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function SupportPage() {
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  
  // 🚀 STATE MANAGEMENT
  const [tickets, setTickets] = useState<any[]>([]);
  const [isLoadingTickets, setIsLoadingTickets] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    category: "Resume Optimization",
    description: ""
  });

  // 🚀 FETCH TICKETS ON LOAD
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("jobConciergeToken");
        if (!token) return;

        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const userId = tokenPayload.sub;

        const response = await fetch(`${API_BASE_URL}/api/v1/support/tickets/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setTickets(data);
        }
      } catch (error) {
        console.error("Wahala fetching tickets:", error);
      } finally {
        setIsLoadingTickets(false);
      }
    };

    fetchTickets();
  }, [API_BASE_URL]);

  // 🚀 HANDLE FORM SUBMISSION
  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject || !formData.description) return alert("Please fill all fields");

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("jobConciergeToken");
      const tokenPayload = JSON.parse(atob(token!.split('.')[1]));
      const userId = tokenPayload.sub;

      const response = await fetch(`${API_BASE_URL}/api/v1/support/tickets`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          ...formData
        })
      });

      if (response.ok) {
        const newTicket = await response.json();
        setTickets([newTicket, ...tickets]);
        setFormData({ subject: "", category: "Resume Optimization", description: "" });
        alert("Support ticket submitted successfully!");
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit ticket. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🚀 ACTION HANDLERS
  const handleContactAction = (actionType: string) => {
    if (actionType === "Start Chat") {
      alert("Live Chat widget will initialize here!"); 
    } else if (actionType === "Send Email") {
      window.location.href = "mailto:support@jobconcierge.com";
    } else if (actionType === "Call Now") {
      window.location.href = "tel:18005624357";
    }
  };

  // 🚀 STATIC DATA (Keep these intact)
  const contactMethods = [
    { icon: MessageSquare, title: "Live Chat", description: "Chat with our support team", availability: "Available now", action: "Start Chat", color: "from-[#0275D8] to-[#00C2D1]" },
    { icon: Mail, title: "Email Support", description: "support@jobconcierge.com", availability: "Response within 24 hours", action: "Send Email", color: "from-purple-500 to-purple-600" },
    { icon: Phone, title: "Phone Support", description: "1-800-JOB-HELP", availability: "Mon-Fri, 9AM-6PM EST", action: "Call Now", color: "from-green-500 to-green-600" },
  ];

  const faqs = [
    { question: "How many applications can I submit per month?", answer: "It depends on your plan: Silver allows 60 applications/month, Gold allows 100, and Career LaunchPad allows 200+ applications per month." },
    { question: "How long does it take to optimize a resume?", answer: "Our AI-powered system typically optimizes resumes within 2-4 hours. For complex roles requiring manual review, it may take up to 24 hours." },
    { question: "Can I request changes to my optimized resume?", answer: "Yes! You can request unlimited revisions to your resume versions. Simply contact your assigned Talent Application Strategist or submit a revision request through the Resume Versions page." },
    { question: "What is the ATS score and why does it matter?", answer: "The ATS (Applicant Tracking System) score indicates how well your resume will perform when scanned by automated systems that most companies use. A score of 90+ significantly increases your chances of getting past initial screening." },
    { question: "How do I prepare for interviews?", answer: "Career LaunchPad members get personalized interview prep sessions. All members can access our interview guide library and request coaching calls through the Interviews page." },
    { question: "Can I upgrade or downgrade my plan?", answer: "Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the start of your next billing cycle." },
  ];

  const resources = [
    { icon: Book, title: "Knowledge Base", description: "Browse our comprehensive guides and tutorials", articles: "50+ articles" },
    { icon: Video, title: "Video Tutorials", description: "Watch step-by-step walkthroughs", articles: "20+ videos" },
    { icon: FileText, title: "Best Practices", description: "Learn from successful job seekers", articles: "15+ guides" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0A2342] mb-2">Support Center</h1>
        <p className="text-gray-600">We're here to help you succeed in your job search</p>
      </motion.div>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {contactMethods.map((method, idx) => {
          const Icon = method.icon;
          return (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-[#0A2342] mb-2">{method.title}</h3>
              <p className="text-sm text-gray-600 mb-1">{method.description}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                <Clock className="w-3 h-3" />
                <span>{method.availability}</span>
              </div>
              <Button 
                onClick={() => handleContactAction(method.action)} 
                className={`w-full bg-gradient-to-r ${method.color} text-white`}
              >
                {method.action}
              </Button>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Submit a Request Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-[#0A2342] mb-6">Submit a Support Request</h2>
          <form onSubmit={handleSubmitTicket} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <Input 
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                placeholder="Brief description of your issue" 
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0275D8]"
              >
                <option>Resume Optimization</option>
                <option>Application Support</option>
                <option>Interview Preparation</option>
                <option>Billing & Account</option>
                <option>Technical Issue</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Describe your issue</label>
              <Textarea 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Please provide as much detail as possible..." 
                rows={6} 
                required
              />
            </div>
            <Button disabled={isSubmitting} className="w-full bg-gradient-to-r from-[#0275D8] to-[#00C2D1] text-white">
              {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        </motion.div>

        {/* Dynamic Recent Tickets */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-[#0A2342] mb-6">Recent Tickets</h2>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {isLoadingTickets ? (
              <div className="flex justify-center p-4"><Loader2 className="w-6 h-6 animate-spin text-[#0275D8]" /></div>
            ) : tickets.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No support tickets found.</p>
            ) : (
              tickets.map((ticket, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-[#0275D8] transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-mono text-[#0275D8]">TICK-{ticket.id}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${ticket.status === "Resolved" ? "bg-green-100 text-green-700" : ticket.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"}`}>
                      {ticket.status || "Pending"}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 mb-2 truncate">{ticket.subject}</p>
                  <p className="text-xs text-gray-500">
                    {ticket.created_at ? new Date(ticket.created_at).toLocaleDateString() : 'Just now'}
                  </p>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Resources */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-8">
        <h2 className="text-xl font-bold text-[#0A2342] mb-4">Help Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {resources.map((resource, idx) => {
            const Icon = resource.icon;
            return (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer">
                <Icon className="w-8 h-8 text-[#0275D8] mb-3" />
                <h3 className="font-bold text-[#0A2342] mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                <span className="text-xs text-[#0275D8] font-semibold">{resource.articles}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* FAQs */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-[#0A2342] mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger className="text-left">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-[#0275D8] flex-shrink-0 mt-0.5" />
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent><p className="text-gray-600 ml-8">{faq.answer}</p></AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  );
}