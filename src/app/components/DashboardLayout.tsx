import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, FileText, Calendar, BarChart3, Settings, 
  ChevronDown, User, LogOut, Sparkles, HelpCircle, File, 
  ChevronLeft, ChevronRight 
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

type UserRole = "customer" | "staff" | "admin";

export function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentRole, setCurrentRole] = useState<UserRole>("customer");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  
  // Dynamic User State
  const [userName, setUserName] = useState("Loading...");
  const [isOffline, setIsOffline] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'; // Fallback for local testing
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("jobConciergeToken");
        
        if (!token) {
          throw new Error("No auth token found");
        }

        // Decode the JWT payload to extract the real user's UUID (Supabase stores this in 'sub')
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const currentUserId = tokenPayload.sub;

        // Fetch using the dynamic ID and attach the token for security
        const response = await fetch(`${API_BASE_URL}/api/v1/dashboard/${currentUserId}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Pass the bouncer's stamp to NestJS
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserName(data.user?.name || data.name || "User");
          // If your backend returns the real role, you can set it here too!
          // setCurrentRole(data.user?.role || "customer");
          setIsOffline(false);
        } else {
          throw new Error("Failed response from backend");
        }
      } catch (e) {
        console.error("Layout failed to fetch user data:", e);
        setUserName("Offline User");
        setIsOffline(true);
      }
    };

    fetchUser();
  }, [API_BASE_URL]);

  // Clean Logout Function
  const handleLogout = () => {
    localStorage.removeItem("jobConciergeToken");
    navigate("/");
  };

  const mainNavItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" }, // Updated path to match protected route
    { label: "Applications", icon: FileText, path: "/dashboard/applications" },
    { label: "Resume Versions", icon: File, path: "/dashboard/resumes" },
    { label: "Interviews", icon: Calendar, path: "/dashboard/interviews" },
    { label: "Analytics", icon: BarChart3, path: "/dashboard/analytics" },
  ];

  const bottomNavItems = [
    { label: "Support", icon: HelpCircle, path: "/dashboard/support" },
    { label: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  const handleRoleSwitch = (role: UserRole) => {
    setCurrentRole(role);
    // You might want to update these to map to your new /dashboard paths if they differ
    if (role === "customer") navigate("/dashboard");
    if (role === "staff") navigate("/dashboard/staff");
    if (role === "admin") navigate("/dashboard/admin");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const NavItem = ({ item, onClick, collapsed = false }: { item: typeof mainNavItems[0]; onClick?: () => void; collapsed?: boolean; }) => {
    const Icon = item.icon;
    const active = isActive(item.path);
    return (
      <button
        onClick={() => { navigate(item.path); onClick?.(); }}
        className={`w-full flex items-center ${collapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg transition-all ${
          active ? "bg-[#0275D8] text-white shadow-lg" : "text-gray-300 hover:bg-white/5 hover:text-white"
        }`}
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        {!collapsed && <span className="font-medium">{item.label}</span>}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col">
      <header className="hidden lg:flex bg-[#0A2342] text-white px-6 py-4 sticky top-0 z-50 shadow-lg">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <button onClick={() => setDesktopSidebarCollapsed(!desktopSidebarCollapsed)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              {desktopSidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0275D8] to-[#00C2D1] rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-lg font-bold">JobConcierge</h1>
                <p className="text-xs text-gray-400">CyberPurview AI</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-all outline-none">
                  <div className="w-9 h-9 bg-gradient-to-br from-[#0275D8] to-[#00C2D1] rounded-full flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold">{userName}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">{currentRole}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleRoleSwitch("customer")}>Customer View</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleSwitch("admin")}>Admin View</DropdownMenuItem>
                <DropdownMenuSeparator />
                
                {/* Wired up the handleLogout function right here */}
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className={`hidden lg:flex lg:flex-col bg-[#0A2342] text-white fixed left-0 h-full z-40 transition-all duration-300 ${desktopSidebarCollapsed ? 'w-20' : 'w-64'}`} style={{ top: '72px' }}>
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {mainNavItems.map((item) => <NavItem key={item.path} item={item} collapsed={desktopSidebarCollapsed} />)}
          </nav>
          <div className="px-4 py-4 space-y-2 border-t border-white/10">
            {bottomNavItems.map((item) => <NavItem key={item.path} item={item} collapsed={desktopSidebarCollapsed} />)}
          </div>
        </aside>

        <div className={`flex-1 flex flex-col transition-all duration-300 ${desktopSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
          <main className="flex-1 overflow-auto bg-[#F7F9FC]"><Outlet /></main>
        </div>
      </div>

      <motion.button 
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.9 }} 
        onClick={() => setShowAIAssistant(!showAIAssistant)} 
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-[#0275D8] to-[#00C2D1] rounded-full shadow-lg flex items-center justify-center text-white z-50"
      >
        <Sparkles className="w-6 h-6" />
      </motion.button>
    </div>
  );
}