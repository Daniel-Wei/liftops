import type { Metric } from "../types/appTypes";
import { EvidenceNote } from "./EvidenceNote";
import { StatusBadge } from "./StatusBadge";

type MetricCardProps = {
  metric: Metric;
  showExplanation?: boolean;
};

export function MetricCard({ metric, showExplanation = false }: MetricCardProps) {
  return (
    <article className="metric-card">
      <div className="metric-card-header">
        <div>
          <p className="metric-label">{metric.label}</p>
          <p className="metric-label-zh">{metric.labelZh}</p>
        </div>
        <StatusBadge status={metric.status} label={metric.evidenceType} />
      </div>

      <div className="metric-card-bottom">
        <p className="metric-value">{metric.value}</p>
        <p className="metric-trend">{metric.trend}</p>
      </div>

      {showExplanation ? (
        <div className="metric-note">
          <EvidenceNote title={metric.evidenceType} evidenceType={metric.evidenceType}>
            <p>{metric.explanation}</p>
            <p>{metric.explanationZh}</p>
          </EvidenceNote>
        </div>
      ) : null}
    </article>
  );
}
