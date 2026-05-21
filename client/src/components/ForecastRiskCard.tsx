import { AlertTriangle, Gauge, TrendingDown } from "lucide-react";
import type { RiskWatch } from "../types/forecast";
import { StatusBadge } from "./StatusBadge";

type ForecastRiskCardProps = {
  risk: RiskWatch;
};

const severityStatus = {
  low: "neutral",
  medium: "watch",
  high: "risk",
} as const;

const icons = {
  deloadWatch: TrendingDown,
  cutPressureWatch: Gauge,
  recoveryRisk: AlertTriangle,
  performanceRisk: TrendingDown,
  nonCoreOverload: Gauge,
  capacityGap: AlertTriangle,
};

export function ForecastRiskCard({ risk }: ForecastRiskCardProps) {
  const Icon = icons[risk.type];

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white">
          <Icon size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="font-black text-slate-950">{risk.title}</h3>
              <p className="text-sm text-slate-500">{risk.titleZh}</p>
            </div>
            <StatusBadge status={severityStatus[risk.severity]} label={risk.severity} labelZh="严重度" />
          </div>
          <div className="mt-4 grid gap-2">
            {risk.signals.map((signal, index) => (
              <div key={signal} className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600">
                <p className="font-semibold text-slate-800">{signal}</p>
                <p>{risk.signalsZh[index]}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">{risk.recommendation}</p>
          <p className="mt-1 text-sm leading-6 text-slate-500">{risk.recommendationZh}</p>
        </div>
      </div>
    </article>
  );
}
