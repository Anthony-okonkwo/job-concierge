import { motion } from "motion/react";
import {
  User,
  Lock,
  Bell,
  CreditCard,
  Shield,
  Globe,
  Mail,
  Smartphone,
  Save,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { PlanBadge } from "./PlanBadge";
import { Separator } from "./ui/separator";

export function SettingsPage() {
  const settingsSections = [
    {
      id: "profile",
      title: "Profile Information",
      icon: User,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>First Name</Label>
              <Input defaultValue="John" />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input defaultValue="Doe" />
            </div>
          </div>
          <div>
            <Label>Email Address</Label>
            <Input type="email" defaultValue="john.doe@email.com" />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input type="tel" defaultValue="+1 (555) 123-4567" />
          </div>
          <div>
            <Label>LinkedIn Profile</Label>
            <Input defaultValue="linkedin.com/in/johndoe" />
          </div>
          <Button className="bg-gradient-to-r from-[#0275D8] to-[#00C2D1] text-white">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      ),
    },
    {
      id: "security",
      title: "Security & Privacy",
      icon: Lock,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Change Password</h4>
            <div className="space-y-3">
              <div>
                <Label>Current Password</Label>
                <Input type="password" />
              </div>
              <div>
                <Label>New Password</Label>
                <Input type="password" />
              </div>
              <div>
                <Label>Confirm New Password</Label>
                <Input type="password" />
              </div>
              <Button variant="outline">Update Password</Button>
            </div>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Two-Factor Authentication</h4>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Enable 2FA</p>
                <p className="text-sm text-gray-600">Add an extra layer of security</p>
              </div>
              <Switch />
            </div>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Privacy</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Profile Visibility</p>
                  <p className="text-sm text-gray-600">Allow recruiters to find you</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Share Analytics</p>
                  <p className="text-sm text-gray-600">Help improve our service</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: Bell,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Email Notifications</h4>
            <div className="space-y-3">
              {[
                { label: "Application Updates", desc: "Get notified when applications are submitted" },
                { label: "Interview Reminders", desc: "Receive reminders before interviews" },
                { label: "Resume Optimizations", desc: "Know when your resumes are ready" },
                { label: "Weekly Progress Report", desc: "Summary of your job search activity" },
                { label: "New Opportunities", desc: "Matching job recommendations" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Push Notifications</h4>
            <div className="space-y-3">
              {[
                { label: "Urgent Updates", desc: "Critical application updates" },
                { label: "Messages", desc: "New messages from your strategist" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={idx === 0} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "billing",
      title: "Billing & Subscription",
      icon: CreditCard,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Current Plan</h4>
            <div className="bg-gradient-to-br from-[#0275D8]/10 to-[#00C2D1]/10 rounded-xl p-6 border border-[#0275D8]/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#0A2342] mb-2">Career LaunchPad</h3>
                  <p className="text-sm text-gray-600">Full-service career acceleration</p>
                </div>
                <PlanBadge plan="launchpad" />
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Monthly Price:</span>
                  <span className="font-bold text-[#0A2342]">$999/month</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Next Billing Date:</span>
                  <span className="text-gray-900">March 1, 2026</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Applications Remaining:</span>
                  <span className="text-green-600 font-semibold">153 / 200</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  Change Plan
                </Button>
                <Button variant="outline" className="flex-1 text-red-600 border-red-200 hover:bg-red-50">
                  Cancel Subscription
                </Button>
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Payment Method</h4>
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                  <p className="text-sm text-gray-600">Expires 12/2027</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Update
              </Button>
            </div>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Billing History</h4>
            <div className="space-y-2">
              {[
                { date: "Feb 1, 2026", amount: "$999.00", status: "Paid" },
                { date: "Jan 1, 2026", amount: "$999.00", status: "Paid" },
                { date: "Dec 1, 2025", amount: "$999.00", status: "Paid" },
              ].map((invoice, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">{invoice.date}</p>
                      <p className="text-gray-600">{invoice.amount}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                      {invoice.status}
                    </span>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "preferences",
      title: "Preferences",
      icon: Globe,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Job Search Preferences</h4>
            <div className="space-y-4">
              <div>
                <Label>Target Job Titles</Label>
                <Input defaultValue="Senior Software Engineer, Full Stack Developer" />
              </div>
              <div>
                <Label>Preferred Locations</Label>
                <Input defaultValue="San Francisco, Remote, New York" />
              </div>
              <div>
                <Label>Minimum Salary (USD)</Label>
                <Input type="number" defaultValue="150000" />
              </div>
              <div>
                <Label>Industries</Label>
                <Input defaultValue="Technology, Finance, Healthcare" />
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Application Settings</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Auto-Apply to Matches</p>
                  <p className="text-sm text-gray-600">Automatically apply to highly matched jobs</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Resume Auto-Optimization</p>
                  <p className="text-sm text-gray-600">Optimize resumes without manual approval</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Language & Region</h4>
            <div className="space-y-4">
              <div>
                <Label>Language</Label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0275D8]">
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
              <div>
                <Label>Timezone</Label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0275D8]">
                  <option>Pacific Time (PT)</option>
                  <option>Mountain Time (MT)</option>
                  <option>Central Time (CT)</option>
                  <option>Eastern Time (ET)</option>
                </select>
              </div>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-[#0275D8] to-[#00C2D1] text-white">
            <Save className="w-4 h-4 mr-2" />
            Save Preferences
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0A2342] mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and configuration</p>
      </motion.div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingsSections.map((section, idx) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-[#0A2342] to-[#0A2342]/90 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#0275D8] to-[#00C2D1] rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">{section.title}</h2>
                </div>
              </div>
              <div className="p-6">{section.content}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
