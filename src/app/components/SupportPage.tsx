import { motion } from "motion/react";
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
  CheckCircle,
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
  const contactMethods = [
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with our support team",
      availability: "Available now",
      action: "Start Chat",
      color: "from-[#0275D8] to-[#00C2D1]",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "support@jobconcierge.com",
      availability: "Response within 24 hours",
      action: "Send Email",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "1-800-JOB-HELP",
      availability: "Mon-Fri, 9AM-6PM EST",
      action: "Call Now",
      color: "from-green-500 to-green-600",
    },
  ];

  const faqs = [
    {
      question: "How many applications can I submit per month?",
      answer:
        "It depends on your plan: Silver allows 60 applications/month, Gold allows 100, and Career LaunchPad allows 200+ applications per month.",
    },
    {
      question: "How long does it take to optimize a resume?",
      answer:
        "Our AI-powered system typically optimizes resumes within 2-4 hours. For complex roles requiring manual review, it may take up to 24 hours.",
    },
    {
      question: "Can I request changes to my optimized resume?",
      answer:
        "Yes! You can request unlimited revisions to your resume versions. Simply contact your assigned Talent Application Strategist or submit a revision request through the Resume Versions page.",
    },
    {
      question: "What is the ATS score and why does it matter?",
      answer:
        "The ATS (Applicant Tracking System) score indicates how well your resume will perform when scanned by automated systems that most companies use. A score of 90+ significantly increases your chances of getting past initial screening.",
    },
    {
      question: "How do I prepare for interviews?",
      answer:
        "Career LaunchPad members get personalized interview prep sessions. All members can access our interview guide library and request coaching calls through the Interviews page.",
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer:
        "Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the start of your next billing cycle.",
    },
  ];

  const resources = [
    {
      icon: Book,
      title: "Knowledge Base",
      description: "Browse our comprehensive guides and tutorials",
      articles: "50+ articles",
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Watch step-by-step walkthroughs",
      articles: "20+ videos",
    },
    {
      icon: FileText,
      title: "Best Practices",
      description: "Learn from successful job seekers",
      articles: "15+ guides",
    },
  ];

  const recentTickets = [
    {
      id: "TICK-1234",
      subject: "Resume optimization for Senior SWE role",
      status: "Resolved",
      date: "Feb 14, 2026",
    },
    {
      id: "TICK-1235",
      subject: "Interview prep for Finance Inc",
      status: "In Progress",
      date: "Feb 15, 2026",
    },
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
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-lg flex items-center justify-center mb-4`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-[#0A2342] mb-2">{method.title}</h3>
              <p className="text-sm text-gray-600 mb-1">{method.description}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                <Clock className="w-3 h-3" />
                <span>{method.availability}</span>
              </div>
              <Button className={`w-full bg-gradient-to-r ${method.color} text-white`}>
                {method.action}
              </Button>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Submit a Request */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-xl font-bold text-[#0A2342] mb-6">Submit a Support Request</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <Input placeholder="Brief description of your issue" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0275D8]">
                <option>Resume Optimization</option>
                <option>Application Support</option>
                <option>Interview Preparation</option>
                <option>Billing & Account</option>
                <option>Technical Issue</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe your issue
              </label>
              <Textarea
                placeholder="Please provide as much detail as possible..."
                rows={6}
              />
            </div>
            <Button className="w-full bg-gradient-to-r from-[#0275D8] to-[#00C2D1] text-white">
              <Send className="w-4 h-4 mr-2" />
              Submit Request
            </Button>
          </form>
        </motion.div>

        {/* Recent Tickets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-xl font-bold text-[#0A2342] mb-6">Recent Tickets</h2>
          <div className="space-y-4">
            {recentTickets.map((ticket, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-lg p-4 hover:border-[#0275D8] transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-mono text-[#0275D8]">{ticket.id}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      ticket.status === "Resolved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-900 mb-2">{ticket.subject}</p>
                <p className="text-xs text-gray-500">{ticket.date}</p>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            View All Tickets
          </Button>
        </motion.div>
      </div>

      {/* Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-xl font-bold text-[#0A2342] mb-4">Help Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {resources.map((resource, idx) => {
            const Icon = resource.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
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
              <AccordionContent>
                <p className="text-gray-600 ml-8">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  );
}
