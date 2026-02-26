import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { LayoutDashboard, FileText, Calendar, BarChart3, Settings, ChevronDown, User, LogOut, Menu, X, Sparkles, HelpCircle, File, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

type UserRole = "customer" | "staff" | "admin";

export function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentRole, setCurrentRole] = useState<UserRole>("admin");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  
  // Dynamic User State
  const [userName, setUserName] = useState("...");
  const [isOffline, setIsOffline] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetching the same dashboard endpoint just to grab the dynamic user name
        const response = await fetch(`${API_BASE_URL}/api/v1/dashboard/test-client-123`);
        if (response.ok) {
          const data = await response.json();
          setUserName(data.user?.name || "Unknown User");
        } else {
          throw new Error("Failed response");
        }
      } catch (e) {
        console.error("Layout failed to fetch user data");
        setUserName("..."); // Graceful placeholder
        setIsOffline(true);
      }
    };
    fetchUser();
  }, []);

  const mainNavItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/" },
    { label: "Applications", icon: FileText, path: "/applications" },
    { label: "Resume Versions", icon: File, path: "/resumes" },
    { label: "Interviews", icon: Calendar, path: "/interviews" },
    { label: "Analytics", icon: BarChart3, path: "/analytics" },
  ];

  const bottomNavItems = [
    { label: "Support", icon: HelpCircle, path: "/support" },
    { label: "Settings", icon: Settings, path: "/settings" },
  ];

  const handleRoleSwitch = (role: UserRole) => {
    setCurrentRole(role);
    if (role === "customer") navigate("/");
    if (role === "staff") navigate("/staff");
    if (role === "admin") navigate("/admin");
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname === "/staff" || location.pathname === "/admin";
    }
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
        title={collapsed ? item.label : undefined}
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        {!collapsed && <span className="font-medium">{item.label}</span>}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col">
      {/* Desktop Top Bar */}
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
                <p className="text-xs text-gray-400">AI-Powered Platform</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {currentRole === "admin" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <span className="text-sm capitalize">{currentRole} View</span>
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Switch View</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleRoleSwitch("customer")}>Customer View</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleRoleSwitch("staff")}>Staff View</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleRoleSwitch("admin")}>Admin View</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-all">
                  <div className="w-9 h-9 bg-gradient-to-br from-[#0275D8] to-[#00C2D1] rounded-full flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold">{userName}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><User className="w-4 h-4 mr-2" />Profile</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600"><LogOut className="w-4 h-4 mr-2" />Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className={`hidden lg:flex lg:flex-col bg-[#0A2342] text-white fixed left-0 h-full z-40 transition-all duration-300 ${desktopSidebarCollapsed ? 'w-20' : 'w-64'}`} style={{ top: '72px' }}>
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {mainNavItems.map((item) => <NavItem key={item.path} item={item} collapsed={desktopSidebarCollapsed} />)}
          </nav>

          <div className="px-4 py-4 space-y-2 border-t border-white/10">
            {bottomNavItems.map((item) => <NavItem key={item.path} item={item} collapsed={desktopSidebarCollapsed} />)}
          </div>

          {!desktopSidebarCollapsed && (
            <div className="p-4 border-t border-white/10">
              <div className="px-3 py-2 rounded-lg bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#0275D8] to-[#00C2D1] rounded-full flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold truncate">{userName}</p>
                    <p className="text-xs text-gray-400 capitalize">{currentRole}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-40 lg:hidden" />
              <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "spring", damping: 25 }} className="fixed left-0 top-0 h-full w-72 bg-[#0A2342] text-white z-50 lg:hidden flex flex-col">
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#0275D8] to-[#00C2D1] rounded-lg flex items-center justify-center">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h1 className="text-lg font-bold">JobConcierge</h1>
                      <p className="text-xs text-gray-400">AI-Powered Platform</p>
                    </div>
                  </div>
                  <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-white/10 rounded-lg"><X className="w-5 h-5" /></button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                  {mainNavItems.map((item) => <NavItem key={item.path} item={item} onClick={() => setSidebarOpen(false)} />)}
                </nav>

                <div className="px-4 py-4 space-y-2 border-t border-white/10">
                  {bottomNavItems.map((item) => <NavItem key={item.path} item={item} onClick={() => setSidebarOpen(false)} />)}
                </div>

                <div className="p-4 border-t border-white/10">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-all">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#0275D8] to-[#00C2D1] rounded-full flex items-center justify-center">
                          <User className="w-5 h-5" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-sm font-semibold truncate">{userName}</p>
                          <p className="text-xs text-gray-400 capitalize">{currentRole}</p>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem><User className="w-4 h-4 mr-2" />Profile</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600"><LogOut className="w-4 h-4 mr-2" />Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${desktopSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`} style={{ marginTop: '0' }}>
          <header className="lg:hidden bg-[#0A2342] text-white px-4 py-4 sticky top-0 z-30 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-white/10 rounded-lg"><Menu className="w-6 h-6" /></button>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#0275D8] to-[#00C2D1] rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="font-bold">JobConcierge</span>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto"><Outlet /></main>
        </div>
      </div>

      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setShowAIAssistant(!showAIAssistant)} className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-[#0275D8] to-[#00C2D1] rounded-full shadow-lg flex items-center justify-center text-white z-30 hover:shadow-xl transition-shadow">
        <Sparkles className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {showAIAssistant && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className="fixed bottom-24 right-8 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-30">
            <div className="bg-gradient-to-r from-[#0275D8] to-[#00C2D1] px-4 py-3">
              <h3 className="font-bold text-white">AI Strategy Assistant</h3>
            </div>
            <div className="p-4 space-y-3">
              {isOffline ? (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <p className="text-sm text-orange-800"><span className="font-semibold">Offline Mode</span><br/>Connect to the live database to unlock AI-powered insights.</p>
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800"><span className="font-semibold">Analyzing Pipeline...</span><br/>Fetching your latest career data to generate personalized AI strategies.</p>
                </div>
              )}
              <Button className="w-full bg-gradient-to-r from-[#0275D8] to-[#00C2D1] text-white" disabled={isOffline}>
                Optimize Strategy
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}