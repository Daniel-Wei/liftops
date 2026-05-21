import { EvidenceNote } from "../components/EvidenceNote";
import { SectionCard } from "../components/SectionCard";
import { settingsMock } from "../data/mockData";

export function SettingsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header>
        <p className="text-xs font-black uppercase tracking-wide text-slate-500">Settings / 设置</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950 md:text-5xl">Static setup preview.</h1>
      </header>

      <SectionCard title="Training setup" titleZh="训练设置" eyebrow="Mock settings">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-black uppercase text-slate-500">Mode preset</p>
            <p className="mt-2 text-xl font-black">{settingsMock.modePreset}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-black uppercase text-slate-500">Cycle length</p>
            <p className="mt-2 text-xl font-black">{settingsMock.cycleLength}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-black uppercase text-slate-500">Training goal</p>
            <p className="mt-2 text-xl font-black">{settingsMock.trainingGoal}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-black uppercase text-slate-500">Units</p>
            <p className="mt-2 text-xl font-black">{settingsMock.units}</p>
          </div>
        </div>
        <div className="mt-4 rounded-2xl bg-slate-950 p-4 text-white">
          <p className="text-xs font-black uppercase text-slate-400">Target muscle priorities</p>
          <p className="mt-2 text-xl font-black">{settingsMock.targetMuscles.join(", ")}</p>
        </div>
      </SectionCard>

      <EvidenceNote title="Evidence disclaimer / 证据说明" evidenceType="watch">
        <p>LiftOps is not a medical app, diagnosis tool, or coach replacement.</p>
        <p className="mt-1 text-slate-500">LiftOps 不是医疗 App、诊断工具或教练替代品。</p>
      </EvidenceNote>

      <EvidenceNote title="Heuristic metric disclaimer / 启发式指标说明" evidenceType="heuristic">
        <p>Efficiency, Productivity, Capacity, and Forecast are proxy, trend, watch, or heuristic labels.</p>
        <p className="mt-1 text-slate-500">Efficiency、Productivity、Capacity 和 Forecast 是 proxy、trend、watch 或 heuristic 标签。</p>
      </EvidenceNote>
    </div>
  );
}
