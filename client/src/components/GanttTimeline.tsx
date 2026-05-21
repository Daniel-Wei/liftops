import type { TimelinePhase } from "../types/appTypes";
import { StatusBadge } from "./StatusBadge";

type GanttTimelineProps = {
  phases: TimelinePhase[];
  currentWeek: number;
};

export function GanttTimeline({ phases, currentWeek }: GanttTimelineProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">Training block timeline</p>
          <h2 className="text-xl font-black text-slate-950">Gantt-style plan / Gantt 风格计划</h2>
        </div>
        <StatusBadge status="neutral" label={`Week ${currentWeek}`} />
      </div>

      <div className="mt-5 space-y-3">
        {phases.map((phase) => {
          const totalWeeks = 20;
          const left = `${((phase.startWeek - 1) / totalWeeks) * 100}%`;
          const width = `${((phase.endWeek - phase.startWeek + 1) / totalWeeks) * 100}%`;

          return (
            <div key={phase.name}>
              <div className="mb-1 flex items-center justify-between gap-3 text-sm">
                <span className="font-bold text-slate-700">{phase.name}</span>
                <span className="text-slate-400">
                  W{phase.startWeek}-W{phase.endWeek}
                </span>
              </div>
              <div className="relative h-8 rounded-full bg-slate-100">
                <div
                  className={`absolute top-1 h-6 rounded-full ${
                    phase.status === "active" ? "bg-emerald-500" : phase.status === "done" ? "bg-slate-950" : "bg-slate-300"
                  }`}
                  style={{ left, width }}
                />
              </div>
              <p className="mt-1 text-xs text-slate-500">{phase.nameZh}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
