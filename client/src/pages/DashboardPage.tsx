import { ChartMock } from "../components/ChartMock";
import { EvidenceNote } from "../components/EvidenceNote";
import { GanttTimeline } from "../components/GanttTimeline";
import { MetricCard } from "../components/MetricCard";
import { SectionCard } from "../components/SectionCard";
import { StatusBadge } from "../components/StatusBadge";
import {
  dashboardMetrics,
  loadTrend,
  recoveryTrend,
  riskWatches,
  timelinePhases,
  trainingBlock,
} from "../data/mockData";

export function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header className="rounded-3xl bg-slate-950 p-6 text-white">
        <p className="text-xs font-black uppercase tracking-wide text-emerald-300">Executive dashboard / 总览 Dashboard</p>
        <h1 className="mt-3 text-3xl font-black md:text-5xl">{trainingBlock.name}</h1>
        <p className="mt-2 text-slate-300">{trainingBlock.subtitle}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <StatusBadge status="neutral" label={`Week ${trainingBlock.currentWeek} / ${trainingBlock.totalWeeks}`} />
          <StatusBadge status="good" label={`Today: ${trainingBlock.trainingMode}`} />
          <StatusBadge status="watch" label={trainingBlock.mode} />
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
        <GanttTimeline phases={timelinePhases} currentWeek={trainingBlock.currentWeek} />
        <SectionCard title="Risk Watch Cards" titleZh="风险观察卡片" eyebrow="Pattern-based watch">
          <div className="space-y-3">
            {riskWatches.map((risk) => (
              <article key={risk.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-black text-slate-950">{risk.title}</p>
                    <p className="text-sm text-slate-500">{risk.titleZh}</p>
                  </div>
                  <StatusBadge status={risk.severity === "high" ? "risk" : "watch"} label={risk.severity} />
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{risk.recommendation}</p>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <ChartMock title="Training load trend" titleZh="训练负荷趋势" data={loadTrend} color="bg-slate-950" />
        <ChartMock title="Recovery capacity proxy" titleZh="恢复容量 Proxy" data={recoveryTrend} color="bg-emerald-500" />
      </div>

      <EvidenceNote title="Metric boundary / 指标边界" evidenceType="proxy">
        <p>Capacity, Efficiency, Productivity, Forecast, and Risk are displayed as proxy, trend, estimate, or watch language.</p>
        <p className="mt-1 text-slate-500">这些指标是 proxy、trend、estimate 或 watch 语言，不是医学诊断或精确生理测量。</p>
      </EvidenceNote>
    </div>
  );
}
