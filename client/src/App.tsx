import { useState } from "react";
import { AppShell } from "./components/AppShell";
import { navItems } from "./data/mockData";
import type { PageKey } from "./types/appTypes";
import { CapacityPage } from "./pages/CapacityPage";
import { CoreNonCorePage } from "./pages/CoreNonCorePage";
import { DailyCheckInPage } from "./pages/DailyCheckInPage";
import { DashboardPage } from "./pages/DashboardPage";
import { EfficiencyPage } from "./pages/EfficiencyPage";
import { LandingPage } from "./pages/LandingPage";
import { PlanForecastPage } from "./pages/PlanForecastPage";
import { SettingsPage } from "./pages/SettingsPage";
import { TrendsPage } from "./pages/TrendsPage";
import { WeeklyReviewPage } from "./pages/WeeklyReviewPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageKey>("landing");

  function renderPage() {
    switch (currentPage) {
      case "landing":
        return <LandingPage onOpenDashboard={() => setCurrentPage("dashboard")} />;
      case "dashboard":
        return <DashboardPage />;
      case "planForecast":
        return <PlanForecastPage />;
      case "coreNonCore":
        return <CoreNonCorePage />;
      case "capacity":
        return <CapacityPage />;
      case "efficiency":
        return <EfficiencyPage />;
      case "dailyCheckIn":
        return <DailyCheckInPage />;
      case "trends":
        return <TrendsPage />;
      case "weeklyReview":
        return <WeeklyReviewPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  }

  return (
    <AppShell navItems={navItems} currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </AppShell>
  );
}
