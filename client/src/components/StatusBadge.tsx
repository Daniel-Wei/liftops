import type { MetricStatus } from "../types/appTypes";

type StatusBadgeProps = {
  status: MetricStatus;
  label?: string;
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  let classes = "border-slate-200 bg-slate-50 text-slate-700";

  if (status === "good") {
    classes = "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (status === "watch") {
    classes = "border-amber-200 bg-amber-50 text-amber-700";
  }

  if (status === "risk") {
    classes = "border-rose-200 bg-rose-50 text-rose-700";
  }

  return (
    <span className={`inline-flex w-fit rounded-full border px-2.5 py-1 text-xs font-black ${classes}`}>
      {label ?? status}
    </span>
  );
}
