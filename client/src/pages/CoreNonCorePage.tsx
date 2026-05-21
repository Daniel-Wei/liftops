import { CoreNonCorePanel } from "../components/CoreNonCorePanel";
import { EvidenceNote } from "../components/EvidenceNote";
import {
  mockCoreWorkPlans,
  mockSupportLoadPlans,
} from "../data/mockData";

export function CoreNonCorePage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase text-slate-500">Core / Non-Core / 核心与非核心</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950 md:text-5xl">Separate productive work from support load.</h1>
        <p className="mt-2 max-w-2xl text-slate-500">
          Core is the work directly tied to the block goal. Support load can help, but it can also crowd recovery when it exceeds plan.
        </p>
      </header>

      <CoreNonCorePanel core={mockCoreWorkPlans} support={mockSupportLoadPlans} />

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-black text-slate-950">Core examples / 核心训练示例</h2>
          <div className="mt-4 grid gap-3">
            {mockCoreWorkPlans.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="font-bold text-slate-950">{item.targetArea}</p>
                <p className="text-sm text-slate-500">{item.targetAreaZh}</p>
                <p className="mt-2 text-sm text-slate-600">{item.completedHardSets}/{item.plannedHardSets} hard sets · {item.priority}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-black text-slate-950">Support load / 支持负荷</h2>
          <div className="mt-4 grid gap-3">
            {mockSupportLoadPlans.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="font-bold text-slate-950">{item.label}</p>
                <p className="text-sm text-slate-500">{item.labelZh}</p>
                <p className="mt-2 text-sm text-slate-600">{item.completedUnits}/{item.plannedUnits} {item.unitLabel}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <EvidenceNote
        type="heuristic"
        title="Non-core boundary"
        titleZh="非核心边界"
        childrenZh="Non-Core Overload 是产品观察语言，用于提示支持性工作可能挤占恢复，不代表诊断。"
      >
        Non-Core Overload is product watch language for support work that may crowd recovery; it is not a diagnosis.
      </EvidenceNote>
    </div>
  );
}
