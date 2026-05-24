import { ChartMock } from "../components/ChartMock";
import { EvidenceNote } from "../components/EvidenceNote";
import { MetricCard } from "../components/MetricCard";
import { capacityMetrics, recoveryTrend } from "../data/mockData";

export function CapacityPage() {
  return (
    <div className="page page-stack">
      <header className="page-header">
        <p className="eyebrow">Capacity / 容量</p>
        <h1 className="page-title">Recovery capacity is a proxy, not a diagnosis.</h1>
      </header>

      <section className="metric-grid">
        {capacityMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <ChartMock title="Weekly capacity trend" titleZh="每周容量趋势" data={recoveryTrend} variant="green" />

      <EvidenceNote title="Capacity boundary / 容量边界" evidenceType="proxy">
        <p>Capacity uses wellness inputs such as fatigue, sleep, soreness, stress, and hunger as a recovery proxy.</p>
        <p>容量使用疲劳、睡眠、酸痛、压力和饥饿等 wellness 输入作为恢复 proxy。</p>
      </EvidenceNote>
    </div>
  );
}
