import { ChartMock } from "../components/ChartMock";
import { EvidenceNote } from "../components/EvidenceNote";
import { MetricCard } from "../components/MetricCard";
import { efficiencyMetrics, recoveryTrend } from "../data/mockData";

export function EfficiencyPage() {
  return (
    <div className="page page-stack">
      <header className="page-header">
        <p className="eyebrow">Efficiency / 效率</p>
        <h1 className="page-title">Useful output relative to fatigue cost.</h1>
      </header>

      <section className="metric-grid">
        {efficiencyMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} showExplanation />
        ))}
      </section>

      <ChartMock title="Fatigue cost trend" titleZh="疲劳成本趋势" data={recoveryTrend} variant="amber" />

      <EvidenceNote title="Stimulus-to-fatigue boundary / 刺激疲劳比边界" evidenceType="heuristic">
        <p>Efficiency is a proxy/trend based on stimulus-to-fatigue interpretation, not exact physiology.</p>
        <p>Efficiency 是基于 stimulus-to-fatigue 解释框架的 proxy/trend，不是精确生理测量。</p>
      </EvidenceNote>
    </div>
  );
}
