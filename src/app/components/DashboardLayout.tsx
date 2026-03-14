import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, FileText, Calendar, BarChart3, Settings, 
  ChevronDown, User, LogOut, Sparkles, HelpCircle, File, 
  ChevronLeft, ChevronRight, Menu, X 
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
  
  const [userName, setUserName] = useState("Loading...");
  const [isOffline, setIsOffline] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'; 
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("jobConciergeToken");
        if (!token) throw new Error("No auth token found");

        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const currentUserId = tokenPayload.sub;

        const response = await fetch(`${API_BASE_URL}/api/v1/dashboard/${currentUserId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserName(data.user?.name || data.name || "User");
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

  const handleLogout = () => {
    localStorage.removeItem("jobConciergeToken");
    navigate("/");
  };

  const mainNavItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" }, 
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
    if (role === "customer") navigate("/dashboard");
    if (role === "staff") navigate("/dashboard/staff");
    if (role === "admin") navigate("/dashboard/admin");
    setSidebarOpen(false); 
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const NavItem = ({ item, onClick, collapsed = false }: { item: typeof mainNavItems[0]; onClick?: () => void; collapsed?: boolean; }) => {
    const Icon = item.icon;
    const active = isActive(item.path);
    return (
      <button
        onClick={() => { 
          navigate(item.path); 
          onClick?.(); 
          setSidebarOpen(false); 
        }}
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
    // 🚀 FIX 1: Changed min-h-screen to h-[100dvh] and added strict flex-col bounds
    <div className="h-[100dvh] w-full bg-[#F7F9FC] flex flex-col overflow-hidden">
      
      {/* 🚀 DESKTOP HEADER (Fixed height, cannot shrink) */}
      <header className="shrink-0 hidden lg:flex bg-[#0A2342] text-white px-6 py-4 z-50 shadow-lg">
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
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* 🚀 MOBILE HEADER */}
      <header className="shrink-0 lg:hidden flex items-center justify-between bg-[#0A2342] text-white px-4 py-4 z-40 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#0275D8] to-[#00C2D1] rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold">JobConcierge</h1>
        </div>
        <button onClick={() => setSidebarOpen(true)} className="p-2 focus:outline-none">
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* 🚀 FIX 2: Middle section strictly takes up the remaining viewport height */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* MOBILE SIDEBAR OVERLAY */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/50 lg:hidden transition-opacity"
            onClick={() => setSidebarOpen(false)} 
          />
        )}

        {/* 🚀 FIX 3: Sidebar is now perfectly attached to the bottom using lg:static */}
        <aside 
          className={`
            fixed inset-y-0 left-0 z-50 flex flex-col h-full bg-[#0A2342] text-white transition-all duration-300 ease-in-out
            lg:static lg:translate-x-0
            ${desktopSidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}
            ${sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full"}
          `}
        >
          {/* Mobile Profile & Close Button */}
          <div className="flex items-center justify-between p-4 lg:hidden border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#0275D8] to-[#00C2D1] rounded-lg flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold truncate w-32">{userName}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">{currentRole}</p>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-white/10 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* TOP NAVIGATION */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {mainNavItems.map((item) => <NavItem key={item.path} item={item} collapsed={desktopSidebarCollapsed && !sidebarOpen} />)}
          </nav>

          {/* 🚀 FIX 4: mt-auto combined with strict height pushes this to the floor seamlessly */}
          <div className="mt-auto px-4 py-6 space-y-2 border-t border-white/10 shrink-0 bg-[#0A2342]">
            {bottomNavItems.map((item) => <NavItem key={item.path} item={item} collapsed={desktopSidebarCollapsed && !sidebarOpen} />)}
            
            <button
              onClick={handleLogout}
              className={`w-full flex items-center ${desktopSidebarCollapsed && !sidebarOpen ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all lg:hidden`}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {(!desktopSidebarCollapsed || sidebarOpen) && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </aside>

        {/* 🚀 MAIN CONTENT AREA (Scrolls independently) */}
        <main className="flex-1 overflow-y-auto bg-[#F7F9FC] relative">
          <Outlet />
        </main>
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