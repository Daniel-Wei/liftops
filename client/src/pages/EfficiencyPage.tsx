import { ChartMock } from "../components/ChartMock";
import { EvidenceNote } from "../components/EvidenceNote";
import { MetricCard } from "../components/MetricCard";
import { efficiencyMetrics, recoveryTrend } from "../data/mockData";

export function EfficiencyPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header>
        <p className="text-xs font-black uppercase tracking-wide text-slate-500">Efficiency / 效率</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950 md:text-5xl">Useful output relative to fatigue cost.</h1>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {efficiencyMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} showExplanation />
        ))}
      </section>

      <ChartMock title="Fatigue cost trend" titleZh="疲劳成本趋势" data={recoveryTrend} color="bg-amber-500" />

      <EvidenceNote title="Stimulus-to-fatigue boundary / 刺激疲劳比边界" evidenceType="heuristic">
        <p>Efficiency is a proxy/trend based on stimulus-to-fatigue interpretation, not exact physiology.</p>
        <p className="mt-1 text-slate-500">Efficiency 是基于 stimulus-to-fatigue 解释框架的 proxy/trend，不是精确生理测量。</p>
      </EvidenceNote>
    </div>
  );
}
