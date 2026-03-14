import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  Loader2,
  AlertCircle
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { PlanBadge } from "./PlanBadge"; // Make sure this component exists
import { Separator } from "./ui/separator";

export function SettingsPage() {
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  
  // 🚀 CORE STATE
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // 🚀 FORM STATES
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedin: ""
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [billingInfo, setBillingInfo] = useState({
    planName: "launchpad",
    totalQuota: 0,
    remainingQuota: 0,
  });

  // 🚀 FETCH REAL USER DATA
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("jobConciergeToken");
        if (!token) throw new Error("No token found");

        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const userId = tokenPayload.sub;

        // Fetch user info from your backend
        const response = await fetch(`${API_BASE_URL}/api/v1/dashboard/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!response.ok) throw new Error("Wahala fetching settings data");
        
        const data = await response.json();
        
        // Populate the forms with the DB data
        const names = (data.user?.name || data.name || "").split(" ");
        setProfileForm({
          firstName: names[0] || "",
          lastName: names.slice(1).join(" ") || "",
          email: data.user?.email || data.email || "",
          phone: data.user?.phone || "+234 (0) 800 000 0000",
          linkedin: data.user?.linkedin || `linkedin.com/in/${names[0]?.toLowerCase() || 'user'}`
        });

        setBillingInfo({
          planName: data.user?.planName || "launchpad",
          totalQuota: data.user?.totalQuota || 0,
          remainingQuota: data.metrics?.remainingQuota?.value || 0,
        });

      } catch (error) {
        console.error("Failed to load settings:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [API_BASE_URL]);

  // 🚀 HANDLE PROFILE UPDATE
  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem("jobConciergeToken");
      const tokenPayload = JSON.parse(atob(token!.split('.')[1]));
      const userId = tokenPayload.sub;

      const response = await fetch(`${API_BASE_URL}/api/v1/users/${userId}/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: `${profileForm.firstName} ${profileForm.lastName}`.trim(),
          phone: profileForm.phone,
          linkedin: profileForm.linkedin
        })
      });

      if (!response.ok) throw new Error("Failed to update profile");
      alert("Profile updated successfully, TonyStark!");
    } catch (error) {
      console.error(error);
      alert("Failed to save profile changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // 🚀 HANDLE PASSWORD UPDATE
  const handleUpdatePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return alert("New passwords do not match!");
    }
    
    setIsSaving(true);
    try {
      const token = localStorage.getItem("jobConciergeToken");
      // Note: You will need a dedicated endpoint for password changes
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/change-password`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        })
      });

      if (!response.ok) throw new Error("Failed to change password");
      alert("Password updated successfully!");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      console.error(error);
      alert("Wahala updating password. Check your current password.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-[#0A2342]">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-[#0275D8]" />
        <p className="text-lg font-medium">Loading account settings...</p>
      </div>
    );
  }

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
              <Input 
                value={profileForm.firstName} 
                onChange={(e) => setProfileForm({...profileForm, firstName: e.target.value})}
                disabled={hasError || isSaving} 
              />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input 
                value={profileForm.lastName} 
                onChange={(e) => setProfileForm({...profileForm, lastName: e.target.value})}
                disabled={hasError || isSaving} 
              />
            </div>
          </div>
          <div>
            <Label>Email Address</Label>
            {/* Email usually shouldn't be easily editable without verification, so we leave it disabled or read-only */}
            <Input type="email" value={profileForm.email} disabled className="bg-gray-100 text-gray-500" />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input 
              type="tel" 
              value={profileForm.phone} 
              onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
              disabled={hasError || isSaving} 
            />
          </div>
          <div>
            <Label>LinkedIn Profile</Label>
            <Input 
              value={profileForm.linkedin} 
              onChange={(e) => setProfileForm({...profileForm, linkedin: e.target.value})}
              disabled={hasError || isSaving} 
            />
          </div>
          <Button 
            onClick={handleSaveProfile}
            disabled={hasError || isSaving} 
            className="bg-gradient-to-r from-[#0275D8] to-[#00C2D1] text-white"
          >
            {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
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
                <Input 
                  type="password" 
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                  disabled={hasError || isSaving} 
                />
              </div>
              <div>
                <Label>New Password</Label>
                <Input 
                  type="password" 
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                  disabled={hasError || isSaving} 
                />
              </div>
              <div>
                <Label>Confirm New Password</Label>
                <Input 
                  type="password" 
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                  disabled={hasError || isSaving} 
                />
              </div>
              <Button onClick={handleUpdatePassword} variant="outline" disabled={hasError || isSaving || !passwordForm.newPassword}>
                {isSaving ? "Updating..." : "Update Password"}
              </Button>
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
              <Switch disabled={hasError} />
            </div>
          </div>
        </div>
      ),
    },
    // ... Notifications array remains the same ...
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
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                  <Switch defaultChecked disabled={hasError} />
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
                  <h3 className="text-xl font-bold text-[#0A2342] mb-2 capitalize">Career {billingInfo.planName}</h3>
                  <p className="text-sm text-gray-600">Full-service career acceleration</p>
                </div>
                {/* Fallback badge if PlanBadge component isn't strictly typed */}
                <div className="px-3 py-1 bg-[#0275D8] text-white text-xs font-bold rounded-full uppercase tracking-wide">
                  {billingInfo.planName}
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Monthly Price:</span>
                  <span className="font-bold text-[#0A2342]">$999/month</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Applications Remaining:</span>
                  <span className="text-green-600 font-semibold">{billingInfo.remainingQuota} / {billingInfo.totalQuota}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" disabled={hasError}>Upgrade Plan</Button>
              </div>
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
                <Input defaultValue="Senior Software Engineer, Full Stack Developer" disabled={hasError} />
              </div>
              <div>
                <Label>Minimum Salary (USD)</Label>
                <Input type="number" defaultValue="150000" disabled={hasError} />
              </div>
            </div>
          </div>
          <Button disabled={hasError} className="bg-gradient-to-r from-[#0275D8] to-[#00C2D1] text-white">
            <Save className="w-4 h-4 mr-2" />
            Save Preferences
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      {hasError && (
        <div className="mb-6 bg-orange-50 border border-orange-200 text-orange-800 px-4 py-3 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-orange-500" />
          <p className="text-sm">Unable to connect to live database. Settings are currently in read-only offline mode.</p>
        </div>
      )}

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0A2342] mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and configuration</p>
      </motion.div>

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