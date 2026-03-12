import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import { DashboardLayout } from "./components/DashboardLayout";
import { CustomerDashboard } from "./components/CustomerDashboard";
import { StaffDashboard } from "./components/StaffDashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { ApplicationsPage } from "./components/ApplicationsPage";
import { ResumeVersionsPage } from "./components/ResumeVersionsPage";
import { InterviewsPage } from "./components/InterviewsPage";
import { AnalyticsPage } from "./components/AnalyticsPage";
import { SupportPage } from "./components/SupportPage";
import { SettingsPage } from "./components/SettingsPage";

// The Bouncer: Checks for the JWT token before letting users see the Outlet (Dashboard)
const ProtectedRoute = () => {
  const token = localStorage.getItem("jobConciergeToken");
  
  if (!token) {
    // No token? Bounce them back to the login page immediately.
    return <Navigate to="/" replace />;
  }
  
  // Token exists? Open the gates and render the child components.
  return <Outlet />;
};

export const router = createBrowserRouter([
  // 1. The Public Route (Login)
  {
    path: "/",
    Component: LoginPage, 
  },
  
  // 2. The Protected Routes (Wrapped in our ProtectedRoute guard)
  {
    path: "/dashboard",
    Component: ProtectedRoute, // The guard sits here at the root of the dashboard
    children: [
      {
        path: "", // This matches exactly "/dashboard"
        Component: DashboardLayout, // The layout only renders if the guard passes
        children: [
          { index: true, Component: CustomerDashboard }, 
          { path: "staff", Component: StaffDashboard },  
          { path: "admin", Component: AdminDashboard },  
          { path: "applications", Component: ApplicationsPage },
          { path: "resumes", Component: ResumeVersionsPage },
          { path: "interviews", Component: InterviewsPage },
          { path: "analytics", Component: AnalyticsPage },
          { path: "support", Component: SupportPage },
          { path: "settings", Component: SettingsPage },
        ],
      }
    ],
  },
]);