import type { UtilisationSummary } from "../types/operations";

type PlanUtilisationPanelProps = {
  utilisation: UtilisationSummary;
};

const items = [
  { key: "corePercent", label: "Core Utilisation", zh: "核心使用率", color: "bg-emerald-500" },
  { key: "supportPercent", label: "Support Load", zh: "支持负荷", color: "bg-amber-500" },
  { key: "cardioPercent", label: "Cardio", zh: "有氧", color: "bg-cyan-500" },
  { key: "nutritionAdherencePercent", label: "Nutrition", zh: "营养目标", color: "bg-violet-500" },
] as const;

export function PlanUtilisationPanel({ utilisation }: PlanUtilisationPanelProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase text-slate-500">Plan utilisation</p>
      <h2 className="mt-1 text-xl font-black text-slate-950">Completed vs planned / 实际 vs 计划</h2>
      <div className="mt-5 space-y-4">
        {items.map((item) => {
          const value = utilisation[item.key];
          return (
            <div key={item.key}>
              <div className="mb-2 flex justify-between gap-3 text-sm">
                <span className="font-bold text-slate-700">{item.label}</span>
                <span className="text-slate-500">{item.zh} · {value}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${Math.min(value, 100)}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
