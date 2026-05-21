import { ChartMock } from "../components/ChartMock";
import { EvidenceNote } from "../components/EvidenceNote";
import { MetricCard } from "../components/MetricCard";
import { capacityMetrics, recoveryTrend } from "../data/mockData";

export function CapacityPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header>
        <p className="text-xs font-black uppercase tracking-wide text-slate-500">Capacity / 容量</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950 md:text-5xl">Recovery capacity is a proxy, not a diagnosis.</h1>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {capacityMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <ChartMock title="Weekly capacity trend" titleZh="每周容量趋势" data={recoveryTrend} color="bg-emerald-500" />

      <EvidenceNote title="Capacity boundary / 容量边界" evidenceType="proxy">
        <p>Capacity uses wellness inputs such as fatigue, sleep, soreness, stress, and hunger as a recovery proxy.</p>
        <p className="mt-1 text-slate-500">容量使用疲劳、睡眠、酸痛、压力和饥饿等 wellness 输入作为恢复 proxy。</p>
      </EvidenceNote>
    </div>
  );
}
