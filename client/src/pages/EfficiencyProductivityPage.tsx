import { EvidenceNote } from "../components/EvidenceNote";
import { MultiMetricChart } from "../components/MultiMetricChart";
import { TrendLineChart } from "../components/TrendLineChart";
import { mockEfficiency, mockTrendData } from "../data/mockData";

export function EfficiencyProductivityPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase text-slate-500">Efficiency & Productivity / 效率与生产率</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950 md:text-5xl">Output relative to fatigue cost.</h1>
        <p className="mt-2 max-w-2xl text-slate-500">
          These are proxy and heuristic views. They do not measure muscle growth directly.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          ["Efficiency Proxy", "效率 Proxy", mockEfficiency.efficiencyProxy],
          ["Productivity Trend", "生产率趋势", mockEfficiency.productivityTrend],
          ["Fatigue Cost", "疲劳成本", mockEfficiency.fatigueCost],
        ].map(([label, zh, value]) => (
          <article key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
            <p className="text-xs text-slate-400">{zh}</p>
            <p className="mt-4 text-4xl font-black text-slate-950">{value}</p>
            <p className="mt-2 text-xs font-bold text-amber-700">proxy / heuristic</p>
          </article>
        ))}
      </section>

      <MultiMetricChart
        title="Proxy comparison"
        titleZh="Proxy 对比"
        data={mockTrendData}
        lines={[
          { key: "efficiency", name: "Efficiency proxy", color: "#8b5cf6" },
          { key: "productivity", name: "Productivity trend", color: "#10b981" },
          { key: "fatigue", name: "Fatigue cost", color: "#f59e0b" },
          { key: "performance", name: "Performance", color: "#0284c7" },
        ]}
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <TrendLineChart title="Top output trend" titleZh="有效产出趋势" data={mockTrendData} dataKey="productivity" color="#10b981" />
        <TrendLineChart title="Fatigue cost" titleZh="疲劳成本" data={mockTrendData} dataKey="fatigue" color="#f59e0b" />
      </div>

      <EvidenceNote
        type="heuristic"
        title="Stimulus-to-fatigue boundary"
        titleZh="刺激疲劳比边界"
        childrenZh="这里的 Efficiency 是解释性 proxy，不是精确生理测量，也不直接测量肌肥大。"
      >
        Efficiency is an interpretive proxy, not exact physiology and not a direct measurement of hypertrophy.
      </EvidenceNote>
    </div>
  );
}
