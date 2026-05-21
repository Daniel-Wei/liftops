import { useEffect, useState } from "react";
import {
  BarChart3,
  Boxes,
  CalendarClock,
  Gauge,
  Home,
  LayoutDashboard,
  LineChart,
  Settings,
  SlidersHorizontal,
  TrendingUp,
} from "lucide-react";
import { AppShell } from "./components/AppShell";
import type { NavItem } from "./components/Sidebar";
import { CapacityPage } from "./pages/CapacityPage";
import { CoreNonCorePage } from "./pages/CoreNonCorePage";
import { DailyCheckInPage } from "./pages/DailyCheckInPage";
import { EfficiencyProductivityPage } from "./pages/EfficiencyProductivityPage";
import { ExecutiveDashboardPage } from "./pages/ExecutiveDashboardPage";
import { LandingPage } from "./pages/LandingPage";
import { PlanForecastPage } from "./pages/PlanForecastPage";
import { SettingsPage } from "./pages/SettingsPage";
import { TrendsPage } from "./pages/TrendsPage";
import { WeeklyReviewPage } from "./pages/WeeklyReviewPage";

type PageKey =
  | "landing"
  | "dashboard"
  | "planForecast"
  | "coreNonCore"
  | "capacity"
  | "efficiency"
  | "checkIn"
  | "trends"
  | "weeklyReview"
  | "settings";

const navItems: NavItem<PageKey>[] = [
  { key: "landing", label: "Home", labelZh: "首页", icon: Home },
  { key: "dashboard", label: "Executive", labelZh: "总览", icon: LayoutDashboard },
  { key: "planForecast", label: "Plan & Forecast", labelZh: "计划预测", icon: CalendarClock },
  { key: "coreNonCore", label: "Core / Non-Core", labelZh: "核心非核心", icon: Boxes },
  { key: "capacity", label: "Capacity", labelZh: "容量", icon: Gauge },
  { key: "efficiency", label: "Efficiency", labelZh: "效率", icon: TrendingUp },
  { key: "checkIn", label: "Daily Check-in", labelZh: "每日记录", icon: SlidersHorizontal },
  { key: "trends", label: "Trends", labelZh: "趋势", icon: LineChart },
  { key: "weeklyReview", label: "Weekly Review", labelZh: "每周复盘", icon: BarChart3 },
  { key: "settings", label: "Settings", labelZh: "设置", icon: Settings },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageKey>("landing");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [currentPage]);

  const pages: Record<PageKey, JSX.Element> = {
    landing: <LandingPage onOpenDashboard={() => setCurrentPage("dashboard")} />,
    dashboard: <ExecutiveDashboardPage />,
    planForecast: <PlanForecastPage />,
    coreNonCore: <CoreNonCorePage />,
    capacity: <CapacityPage />,
    efficiency: <EfficiencyProductivityPage />,
    checkIn: <DailyCheckInPage />,
    trends: <TrendsPage />,
    weeklyReview: <WeeklyReviewPage />,
    settings: <SettingsPage />,
  };

  return (
    <AppShell
      navItems={navItems}
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      immersive={currentPage === "landing"}
    >
      {pages[currentPage]}
    </AppShell>
  );
}
