import { MetricStatus, type TimelinePhase } from "../types/appTypes";
import { StatusBadge } from "./StatusBadge";

type GanttTimelineProps = {
  phases: TimelinePhase[];
  currentWeek: number;
};

export function GanttTimeline({ phases, currentWeek }: GanttTimelineProps) {
  return (
    <section className="gantt-card">
      <div className="gantt-header">
        <div>
          <p className="section-eyebrow">Training block timeline</p>
          <h2 className="section-title">Gantt-style plan / Gantt 风格计划</h2>
        </div>
        <StatusBadge status={MetricStatus.Neutral} label={`Week ${currentWeek}`} />
      </div>

      <div className="gantt-body">
        {phases.map((phase) => {
          const totalWeeks = 20;
          const left = `${((phase.startWeek - 1) / totalWeeks) * 100}%`;
          const width = `${((phase.endWeek - phase.startWeek + 1) / totalWeeks) * 100}%`;
          const barClassName = `gantt-bar gantt-bar--${phase.status}`;

          return (
            <div key={phase.name} className="gantt-row">
              <div className="gantt-row-top">
                <span className="gantt-phase-name">{phase.name}</span>
                <span className="gantt-week">
                  W{phase.startWeek}-W{phase.endWeek}
                </span>
              </div>
              <div className="gantt-track">
                <div className={barClassName} style={{ left, width }} />
              </div>
              <p className="gantt-phase-zh">{phase.nameZh}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
