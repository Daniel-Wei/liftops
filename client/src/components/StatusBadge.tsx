import type { MetricStatus } from "../types/appTypes";

type StatusBadgeProps = {
  status: MetricStatus;
  label?: string;
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  let className = "status-badge status-badge--neutral";

  if (status === "good") {
    className = "status-badge status-badge--good";
  }

  if (status === "watch") {
    className = "status-badge status-badge--watch";
  }

  if (status === "risk") {
    className = "status-badge status-badge--risk";
  }

  return <span className={className}>{label ?? status}</span>;
}
