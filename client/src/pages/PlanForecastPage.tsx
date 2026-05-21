import { ChartMock } from "../components/ChartMock";
import { EvidenceNote } from "../components/EvidenceNote";
import { SectionCard } from "../components/SectionCard";
import { StatusBadge } from "../components/StatusBadge";
import { coreWorkItems, loadTrend, riskWatches, supportLoadItems } from "../data/mockData";

export function PlanForecastPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header>
        <p className="text-xs font-black uppercase tracking-wide text-slate-500">Plan & Forecast / 计划与预测</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950 md:text-5xl">Compare plan, completed work, and watch states.</h1>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        <SectionCard title="Weekly plan" titleZh="每周计划" eyebrow="Planned vs completed">
          <div className="space-y-3">
            {[...coreWorkItems, ...supportLoadItems].map((item) => (
              <div key={item.name} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-black">{item.name}</p>
                    <p className="text-sm text-slate-500">{item.nameZh}</p>
                  </div>
                  <StatusBadge status={item.status} label={item.utilisation} />
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Planned {item.planned} / Completed {item.completed}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>

        <ChartMock title="7-day load estimate" titleZh="7 天负荷估计" data={loadTrend} color="bg-sky-500" />
      </div>

      <SectionCard title="Forecast watches" titleZh="预测观察" eyebrow="Not deterministic prediction">
        <div className="grid gap-3 md:grid-cols-3">
          {riskWatches.map((risk) => (
            <div key={risk.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <StatusBadge status={risk.severity === "high" ? "risk" : "watch"} label={risk.title} />
              <p className="mt-3 text-sm leading-6 text-slate-600">{risk.recommendation}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <EvidenceNote title="Forecast boundary / 预测边界" evidenceType="watch">
        <p>Forecast means a trend-based watch or estimate, not a guaranteed prediction.</p>
        <p className="mt-1 text-slate-500">Forecast 是基于趋势的观察或估计，不是确定性预测。</p>
      </EvidenceNote>
    </div>
  );
}
