import { Ruler, Target, Trophy } from "lucide-react";
import { EvidenceNote } from "../components/EvidenceNote";
import { EmptyState } from "../components/EmptyState";
import { mockTrainingBlock, mockUser } from "../data/mockData";

const modes = [
  ["Cut Mode", "减脂模式"],
  ["Contest Prep Mode", "备赛模式"],
  ["Photoshoot Prep Mode", "拍摄准备模式"],
  ["High Fatigue Training Block", "高疲劳训练周期"],
  ["Maintenance / Performance", "维持 / 表现模式"],
];

const lengths = ["6 weeks", "8 weeks", "12 weeks", "16 weeks", "20-24 weeks"];

export function SettingsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase text-slate-500">Settings / 设置</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950 md:text-5xl">Static operating setup.</h1>
        <p className="mt-2 max-w-2xl text-slate-500">
          Mode preset, cycle length, training goal, target priorities, units, and metric disclaimers.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          [Trophy, "Mode", "模式", mockUser.modeLabel, mockUser.modeLabelZh],
          [Target, "Goal", "目标", mockUser.trainingGoal, mockUser.trainingGoalZh],
          [Ruler, "Units", "单位", mockUser.units, "kg / cm"],
        ].map(([Icon, label, zh, value, helper]) => {
          const DisplayIcon = Icon as typeof Trophy;
          return (
            <article key={String(label)} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
                <DisplayIcon size={18} />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase text-slate-500">{String(label)}</p>
              <p className="text-xs text-slate-400">{String(zh)}</p>
              <p className="mt-3 text-lg font-black text-slate-950">{String(value)}</p>
              <p className="mt-1 text-sm text-slate-500">{String(helper)}</p>
            </article>
          );
        })}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase text-slate-500">Final architecture / 最终架构</p>
        <h2 className="mt-1 text-2xl font-black text-slate-950">React + Azure Functions + Docker</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {[
            ["React frontend", "React 前端", "Phase 1 static UI, later connected to API."],
            [".NET 8 Azure Functions", ".NET 8 Azure Functions", "Planned backend API in Phase 4."],
            ["Docker", "Docker", "Containerized frontend now; API container added after Functions project exists."],
          ].map(([label, zh, body]) => (
            <div key={label} className="rounded-xl bg-slate-50 p-4">
              <p className="font-bold text-slate-950">{label}</p>
              <p className="text-sm text-slate-500">{zh}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-black text-slate-950">Mode preset / 模式预设</h2>
          <div className="mt-4 grid gap-2">
            {modes.map(([en, zh]) => {
              const active = en === mockUser.modeLabel;
              return (
                <div key={en} className={`rounded-xl border p-3 ${active ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-slate-50"}`}>
                  <p className="font-bold">{en}</p>
                  <p className={active ? "text-sm text-slate-300" : "text-sm text-slate-500"}>{zh}</p>
                </div>
              );
            })}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-black text-slate-950">Cycle length / 周期长度</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {lengths.map((length) => {
              const active = length === `${mockTrainingBlock.totalWeeks} weeks`;
              return (
                <span key={length} className={`rounded-full border px-4 py-2 text-sm font-bold ${active ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-slate-50 text-slate-600"}`}>
                  {length}
                </span>
              );
            })}
          </div>
          <div className="mt-5 rounded-xl bg-slate-50 p-4">
            <p className="font-bold text-slate-950">Priority muscles / 重点肌群</p>
            <p className="mt-2 text-sm text-slate-600">{mockUser.priorityMuscles.join(", ")}</p>
            <p className="text-sm text-slate-500">{mockUser.priorityMusclesZh.join("、")}</p>
          </div>
        </article>
      </section>

      <EvidenceNote
        type="heuristic"
        title="Heuristic metric disclaimer"
        titleZh="启发式指标免责声明"
        childrenZh="MV/MEV/MAV/MRV、Capacity、Efficiency、Productivity 和 Forecast 在 LiftOps 中都是启发式、proxy 或 watch 语言。"
      >
        MV/MEV/MAV/MRV, Capacity, Efficiency, Productivity, and Forecast are heuristic, proxy, or watch language in LiftOps.
      </EvidenceNote>

      <EmptyState
        title="Editable settings arrive in Phase 2"
        titleZh="Phase 2 添加可编辑设置"
        description="Phase 1 only previews the setup surface."
        descriptionZh="Phase 1 只预览设置界面。"
      />
    </div>
  );
}
