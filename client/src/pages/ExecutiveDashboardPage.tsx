import { Activity, BatteryMedium, Dumbbell, Gauge, LineChart, Target, TrendingUp } from "lucide-react";
import { CoreNonCorePanel } from "../components/CoreNonCorePanel";
import { ForecastRiskCard } from "../components/ForecastRiskCard";
import { MetricCard } from "../components/MetricCard";
import { MultiMetricChart } from "../components/MultiMetricChart";
import { PlanUtilisationPanel } from "../components/PlanUtilisationPanel";
import { PrepTimelineGantt } from "../components/PrepTimelineGantt";
import { RecoveryCapacityPanel } from "../components/RecoveryCapacityPanel";
import { TrainingModeCard } from "../components/TrainingModeCard";
import {
  mockCapacity,
  mockCoreWorkPlans,
  mockOpsMetrics,
  mockRiskWatches,
  mockSupportLoadPlans,
  mockTrainingBlock,
  mockTrainingMode,
  mockTrainingPhases,
  mockTrendData,
  mockUtilisation,
} from "../data/mockData";

const icons = [Dumbbell, Gauge, BatteryMedium, Activity, LineChart, Target, TrendingUp];

export function ExecutiveDashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">Executive dashboard / 总览 Dashboard</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950 md:text-5xl">{mockTrainingBlock.name}</h1>
          <p className="mt-2 text-slate-500">
            Week {mockTrainingBlock.currentWeek} · {mockTrainingBlock.currentPhase} · {mockTrainingBlock.nameZh}
          </p>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {mockOpsMetrics.slice(0, 4).map((metric, index) => {
          const Icon = icons[index];
          return <MetricCard key={metric.id} metric={metric} icon={<Icon size={18} />} compact />;
        })}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_0.85fr]">
        <CoreNonCorePanel core={mockCoreWorkPlans} support={mockSupportLoadPlans} />
        <RecoveryCapacityPanel capacity={mockCapacity} />
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <PlanUtilisationPanel utilisation={mockUtilisation} />
        <MultiMetricChart
          title="Operations trend"
          titleZh="训练运营趋势"
          data={mockTrendData}
          lines={[
            { key: "trainingLoad", name: "Load", color: "#0f172a" },
            { key: "recoveryCapacity", name: "Capacity", color: "#10b981" },
            { key: "efficiency", name: "Efficiency proxy", color: "#8b5cf6" },
            { key: "performance", name: "Performance", color: "#0284c7" },
          ]}
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_0.85fr]">
        <PrepTimelineGantt
          phases={mockTrainingPhases}
          currentWeek={mockTrainingBlock.currentWeek}
          totalWeeks={mockTrainingBlock.totalWeeks}
        />
        <TrainingModeCard
          mode={mockTrainingMode.mode}
          title="Today: Maintain"
          titleZh="今日：维持"
          description={mockTrainingMode.reason}
          active
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {mockRiskWatches.map((risk) => (
          <ForecastRiskCard key={risk.id} risk={risk} />
        ))}
      </section>
    </div>
  );
}
