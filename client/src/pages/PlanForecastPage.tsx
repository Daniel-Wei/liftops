import { CalendarClock } from "lucide-react";
import { EvidenceNote } from "../components/EvidenceNote";
import { ForecastRiskCard } from "../components/ForecastRiskCard";
import { MultiMetricChart } from "../components/MultiMetricChart";
import { PlanUtilisationPanel } from "../components/PlanUtilisationPanel";
import {
  mockForecastData,
  mockRiskWatches,
  mockTrainingBlock,
  mockUtilisation,
} from "../data/mockData";

export function PlanForecastPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase text-slate-500">Plan & Forecast / 计划与预测</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950 md:text-5xl">Plan the week. Watch the trend.</h1>
        <p className="mt-2 text-slate-500">
          {mockTrainingBlock.currentPhase} · Week {mockTrainingBlock.currentWeek}
        </p>
      </header>

      <section className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <PlanUtilisationPanel utilisation={mockUtilisation} />
        <MultiMetricChart
          title="7-day forecast"
          titleZh="7 天趋势估计"
          data={mockForecastData}
          lines={[
            { key: "plannedLoad", name: "Planned load", color: "#0f172a" },
            { key: "forecastLoad", name: "Forecast load", color: "#0284c7" },
            { key: "fatigueForecast", name: "Fatigue watch", color: "#f59e0b" },
            { key: "recoveryForecast", name: "Recovery estimate", color: "#10b981" },
          ]}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {mockRiskWatches.map((risk) => (
          <ForecastRiskCard key={risk.id} risk={risk} />
        ))}
      </section>

      <EvidenceNote
        type="watch"
        title="Forecast boundary"
        titleZh="预测边界"
        childrenZh="Forecast 是趋势观察，不是确定性预测，也不是医学或恢复诊断。"
      >
        Forecast is a trend watch, not a deterministic prediction and not a medical or recovery diagnosis.
      </EvidenceNote>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
            <CalendarClock size={18} />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-950">Weekly plan / 每周计划</h2>
            <p className="text-sm text-slate-500">Static plan preview only. Phase 2 can make this editable.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
