import { createBrowserRouter } from "react-router";
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

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DashboardLayout,
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
  },
]);