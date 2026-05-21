import type { TrainingPhase } from "../types/training";

type PrepTimelineGanttProps = {
  phases: TrainingPhase[];
  currentWeek: number;
  totalWeeks: number;
};

const phaseStyles: Record<TrainingPhase["type"], string> = {
  baseline: "bg-emerald-500",
  deficit: "bg-cyan-500",
  accumulation: "bg-violet-500",
  intensification: "bg-slate-900",
  fatigueWatch: "bg-amber-500",
  peak: "bg-rose-500",
  recovery: "bg-teal-500",
};

export function PrepTimelineGantt({ phases, currentWeek, totalWeeks }: PrepTimelineGanttProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">Block timeline</p>
          <h2 className="mt-1 text-xl font-black text-slate-950">Gantt phase map / 阶段时间线</h2>
        </div>
        <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-bold text-white">
          Week {currentWeek} / 第 {currentWeek} 周
        </span>
      </div>

      <div className="mt-5 overflow-x-auto pb-2">
        <div className="min-w-[720px]">
          <div className="grid gap-1 text-center text-[10px] font-bold text-slate-400" style={{ gridTemplateColumns: `repeat(${totalWeeks}, minmax(0, 1fr))` }}>
            {Array.from({ length: totalWeeks }, (_, index) => (
              <span key={index + 1} className={index + 1 === currentWeek ? "text-slate-950" : undefined}>
                {index + 1}
              </span>
            ))}
          </div>
          <div className="relative mt-3 grid gap-x-1 gap-y-3" style={{ gridTemplateColumns: `repeat(${totalWeeks}, minmax(0, 1fr))` }}>
            <div
              className="pointer-events-none absolute inset-y-0 z-10 w-0.5 rounded-full bg-slate-950"
              style={{ left: `calc(${((currentWeek - 0.5) / totalWeeks) * 100}% - 1px)` }}
            />
            {phases.map((phase) => (
              <div key={phase.id} className="relative min-h-14 rounded-xl bg-slate-100 p-1" style={{ gridColumn: `${phase.startWeek} / ${phase.endWeek + 1}` }}>
                <div className={`flex h-full flex-col justify-center rounded-lg px-3 py-2 text-white ${phaseStyles[phase.type]}`}>
                  <span className="text-xs font-black leading-tight">{phase.name}</span>
                  <span className="mt-1 text-[11px] leading-tight opacity-85">{phase.nameZh}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
