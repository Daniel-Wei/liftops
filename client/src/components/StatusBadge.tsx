import type { EvidenceType, OpsStatus } from "../types/operations";
import type { TrainingMode } from "../types/training";

type StatusBadgeProps = {
  status?: OpsStatus;
  mode?: TrainingMode;
  evidenceType?: EvidenceType;
  label?: string;
  labelZh?: string;
};

const statusStyles: Record<OpsStatus, string> = {
  good: "border-emerald-200 bg-emerald-50 text-emerald-700",
  watch: "border-amber-200 bg-amber-50 text-amber-700",
  risk: "border-rose-200 bg-rose-50 text-rose-700",
  neutral: "border-slate-200 bg-slate-50 text-slate-700",
};

const modeStyles: Record<TrainingMode, string> = {
  push: "border-emerald-200 bg-emerald-50 text-emerald-700",
  maintain: "border-cyan-200 bg-cyan-50 text-cyan-700",
  lighter: "border-amber-200 bg-amber-50 text-amber-700",
  recoveryPriority: "border-violet-200 bg-violet-50 text-violet-700",
};

const evidenceStyles: Record<EvidenceType, string> = {
  established: "border-emerald-200 bg-emerald-50 text-emerald-700",
  simpleArithmetic: "border-cyan-200 bg-cyan-50 text-cyan-700",
  heuristic: "border-violet-200 bg-violet-50 text-violet-700",
  proxy: "border-amber-200 bg-amber-50 text-amber-700",
  watch: "border-slate-200 bg-slate-50 text-slate-700",
};

const modeLabels: Record<TrainingMode, { en: string; zh: string }> = {
  push: { en: "Push", zh: "推进" },
  maintain: { en: "Maintain", zh: "维持" },
  lighter: { en: "Lighter", zh: "降低输出" },
  recoveryPriority: { en: "Recovery Priority", zh: "优先恢复" },
};

export function StatusBadge({
  status,
  mode,
  evidenceType,
  label,
  labelZh,
}: StatusBadgeProps) {
  const style = mode
    ? modeStyles[mode]
    : evidenceType
      ? evidenceStyles[evidenceType]
      : status
        ? statusStyles[status]
        : statusStyles.neutral;
  const fallback = mode ? modeLabels[mode] : { en: label ?? status ?? evidenceType ?? "Neutral", zh: labelZh ?? "状态" };

  return (
    <span className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${style}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label ?? fallback.en}
      <span className="opacity-75">{labelZh ?? fallback.zh}</span>
    </span>
  );
}
