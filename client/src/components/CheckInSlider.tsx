import type { CheckInDimension } from "../types/wellness";
import { StatusBadge } from "./StatusBadge";

type CheckInSliderProps = {
  dimension: CheckInDimension;
};

export function CheckInSlider({ dimension }: CheckInSliderProps) {
  const max = dimension.key === "topSetRpe" || dimension.key === "sessionRpe" ? 10 : dimension.key === "topSetRir" ? 5 : 5;
  const percent = Math.max(0, Math.min(100, (Number(dimension.value) / max) * 100));

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-bold text-slate-950">{dimension.label}</p>
          <p className="text-sm text-slate-500">{dimension.labelZh}</p>
        </div>
        <StatusBadge
          evidenceType={dimension.evidence === "wellnessSelfReport" ? "watch" : dimension.evidence === "sessionRpe" ? "established" : "proxy"}
          label={String(dimension.value)}
          labelZh={dimension.evidence === "sessionRpe" ? "sRPE" : "值"}
        />
      </div>
      <div className="mt-5 h-2 rounded-full bg-slate-100">
        <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${percent}%` }} />
      </div>
      <div className="mt-2 flex justify-between text-xs font-semibold text-slate-400">
        <span>{dimension.minLabel}</span>
        <span>{dimension.maxLabel}</span>
      </div>
    </article>
  );
}
