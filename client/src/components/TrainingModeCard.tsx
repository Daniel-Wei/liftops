import { Activity, Gauge, Moon, TrendingUp } from "lucide-react";
import type { TrainingMode } from "../types/training";
import { StatusBadge } from "./StatusBadge";

type TrainingModeCardProps = {
  mode: TrainingMode;
  title: string;
  titleZh: string;
  description: string;
  active?: boolean;
};

const icons = {
  push: TrendingUp,
  maintain: Gauge,
  lighter: Activity,
  recoveryPriority: Moon,
};

export function TrainingModeCard({
  mode,
  title,
  titleZh,
  description,
  active = false,
}: TrainingModeCardProps) {
  const Icon = icons[mode];

  return (
    <article className={`rounded-2xl border p-4 shadow-sm ${active ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-950"}`}>
      <div className="flex items-start justify-between gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${active ? "bg-white text-slate-950" : "bg-slate-100 text-slate-700"}`}>
          <Icon size={18} />
        </div>
        {active ? <StatusBadge mode={mode} /> : null}
      </div>
      <h3 className="mt-4 text-lg font-black">{title}</h3>
      <p className={active ? "text-sm text-slate-300" : "text-sm text-slate-500"}>{titleZh}</p>
      <p className={active ? "mt-3 text-sm leading-6 text-slate-300" : "mt-3 text-sm leading-6 text-slate-600"}>
        {description}
      </p>
    </article>
  );
}
