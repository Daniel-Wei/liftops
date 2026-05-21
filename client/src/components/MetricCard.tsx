import type { ReactNode } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import type { OpsMetric } from "../types/operations";
import { EvidenceNote } from "./EvidenceNote";
import { StatusBadge } from "./StatusBadge";

type MetricCardProps = {
  metric: OpsMetric;
  icon?: ReactNode;
  compact?: boolean;
};

const trendIcons = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  stable: ArrowRight,
};

export function MetricCard({ metric, icon, compact = false }: MetricCardProps) {
  const TrendIcon = trendIcons[metric.trend];

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">{metric.label}</p>
          <p className="text-xs text-slate-400">{metric.labelZh}</p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={metric.status} label={metric.status} labelZh="状态" />
          {icon ? (
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              {icon}
            </div>
          ) : null}
        </div>
      </div>
      <div className="mt-5 flex items-end justify-between gap-3">
        <span className="text-3xl font-black text-slate-950">{metric.value}</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
          <TrendIcon size={14} />
          {metric.trend}
        </span>
      </div>
      {!compact ? (
        <div className="mt-4">
          <EvidenceNote type={metric.evidenceType} childrenZh={metric.explanationZh}>
            {metric.explanation}
          </EvidenceNote>
        </div>
      ) : (
        <p className="mt-3 text-xs leading-5 text-slate-500">{metric.explanation}</p>
      )}
    </article>
  );
}
