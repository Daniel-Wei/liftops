import { Dumbbell, Gauge } from "lucide-react";
import type { CoreWorkPlan, SupportLoadPlan } from "../types/training";
import { StatusBadge } from "./StatusBadge";

type CoreNonCorePanelProps = {
  core: CoreWorkPlan[];
  support: SupportLoadPlan[];
};

export function CoreNonCorePanel({ core, support }: CoreNonCorePanelProps) {
  const plannedCore = core.reduce((sum, item) => sum + item.plannedHardSets, 0);
  const completedCore = core.reduce((sum, item) => sum + item.completedHardSets, 0);
  const plannedSupport = support.reduce((sum, item) => sum + item.plannedUnits, 0);
  const completedSupport = support.reduce((sum, item) => sum + item.completedUnits, 0);
  const corePercent = Math.round((completedCore / plannedCore) * 100);
  const supportPercent = Math.round((completedSupport / plannedSupport) * 100);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">Core / Non-Core</p>
          <h2 className="mt-1 text-xl font-black text-slate-950">Work allocation / 训练分配</h2>
        </div>
        <StatusBadge status={supportPercent > 110 ? "watch" : "good"} label="watch" labelZh="观察" />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-slate-950 p-4 text-white">
          <div className="flex items-center gap-2">
            <Dumbbell size={18} className="text-emerald-300" />
            <p className="font-bold">Core Work / 核心训练</p>
          </div>
          <div className="mt-5 flex items-end gap-2">
            <span className="text-4xl font-black">{corePercent}%</span>
            <span className="pb-1 text-sm text-slate-400">{completedCore}/{plannedCore} hard sets</span>
          </div>
          <div className="mt-4 h-2 rounded-full bg-white/10">
            <div className="h-2 rounded-full bg-emerald-400" style={{ width: `${Math.min(corePercent, 100)}%` }} />
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="flex items-center gap-2">
            <Gauge size={18} className="text-amber-600" />
            <p className="font-bold text-slate-950">Support Load / 支持负荷</p>
          </div>
          <div className="mt-5 flex items-end gap-2">
            <span className="text-4xl font-black text-slate-950">{supportPercent}%</span>
            <span className="pb-1 text-sm text-slate-500">completed vs plan</span>
          </div>
          <div className="mt-4 h-2 rounded-full bg-slate-200">
            <div className="h-2 rounded-full bg-amber-500" style={{ width: `${Math.min(supportPercent, 100)}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {core.map((item) => (
          <div key={item.id} className="rounded-xl border border-slate-200 p-3">
            <p className="text-sm font-bold text-slate-950">{item.targetArea}</p>
            <p className="text-xs text-slate-500">{item.targetAreaZh}</p>
            <p className="mt-2 text-sm text-slate-600">
              {item.completedHardSets}/{item.plannedHardSets} hard sets
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
