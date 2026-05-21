import type { Metric } from "../types/appTypes";
import { EvidenceNote } from "./EvidenceNote";
import { StatusBadge } from "./StatusBadge";

type MetricCardProps = {
  metric: Metric;
  showExplanation?: boolean;
};

export function MetricCard({ metric, showExplanation = false }: MetricCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">{metric.label}</p>
          <p className="mt-1 text-xs text-slate-400">{metric.labelZh}</p>
        </div>
        <StatusBadge status={metric.status} label={metric.evidenceType} />
      </div>

      <div className="mt-5 flex items-end justify-between gap-3">
        <p className="text-3xl font-black text-slate-950">{metric.value}</p>
        <p className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
          {metric.trend}
        </p>
      </div>

      {showExplanation ? (
        <div className="mt-4">
          <EvidenceNote title={metric.evidenceType} evidenceType={metric.evidenceType}>
            <p>{metric.explanation}</p>
            <p className="mt-1 text-slate-500">{metric.explanationZh}</p>
          </EvidenceNote>
        </div>
      ) : null}
    </article>
  );
}
