import { RecoveryCapacityPanel } from "../components/RecoveryCapacityPanel";
import { TrendLineChart } from "../components/TrendLineChart";
import { mockCapacity, mockTrendData, mockWellnessCheckIns } from "../data/mockData";

const latest = mockWellnessCheckIns[mockWellnessCheckIns.length - 1];

export function CapacityPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase text-slate-500">Capacity / 容量</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950 md:text-5xl">Recovery capacity as a proxy, not a verdict.</h1>
        <p className="mt-2 max-w-2xl text-slate-500">
          Uses mock wellness self-report dimensions: fatigue, sleep, soreness, stress, hunger, mood, and drive.
        </p>
      </header>

      <section className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        <RecoveryCapacityPanel capacity={mockCapacity} />
        <TrendLineChart title="Capacity trend" titleZh="容量趋势" data={mockTrendData} dataKey="recoveryCapacity" color="#10b981" />
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {[
          ["Fatigue", "疲劳", latest.fatigue],
          ["Sleep", "睡眠", latest.sleepQuality],
          ["Soreness", "酸痛", latest.soreness],
          ["Stress", "压力", latest.stress],
          ["Hunger", "饥饿", latest.hunger],
        ].map(([label, zh, value]) => (
          <article key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
            <p className="text-xs text-slate-400">{zh}</p>
            <p className="mt-4 text-3xl font-black text-slate-950">{value}/5</p>
          </article>
        ))}
      </section>
    </div>
  );
}
