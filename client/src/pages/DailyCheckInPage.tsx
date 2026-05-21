import { Calculator } from "lucide-react";
import { CheckInSlider } from "../components/CheckInSlider";
import { EvidenceNote } from "../components/EvidenceNote";
import { EmptyState } from "../components/EmptyState";
import { mockCheckInDimensions, mockWellnessCheckIns } from "../data/mockData";

const latest = mockWellnessCheckIns[mockWellnessCheckIns.length - 1];

export function DailyCheckInPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header className="rounded-2xl bg-slate-950 p-6 text-white shadow-sm">
        <p className="text-xs font-semibold uppercase text-slate-400">Daily Check-in / 每日 Check-in</p>
        <h1 className="mt-2 text-3xl font-black md:text-5xl">Input state, not a medical questionnaire.</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
          Phase 1 shows static wellness, RIR/RPE, and session-RPE fields. No input is saved.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {mockCheckInDimensions.map((dimension) => (
          <CheckInSlider key={dimension.key} dimension={dimension} />
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <EvidenceNote
          type="established"
          title="Session-RPE load"
          titleZh="Session-RPE 负荷"
          childrenZh="使用 session RPE x duration 作为训练课内部负荷示例。当前仅展示 mock 数据，不保存。"
        >
          Uses session RPE x duration as an internal training load example. This is display-only mock data in Phase 1.
        </EvidenceNote>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
              <Calculator size={18} />
            </div>
            <div>
              <h2 className="font-black text-slate-950">Today mock load / 今日示例负荷</h2>
              <p className="text-sm text-slate-500">Session RPE {latest.sessionRpe} x {latest.sessionDurationMinutes} minutes</p>
            </div>
          </div>
          <p className="mt-5 text-4xl font-black text-slate-950">
            {(latest.sessionRpe ?? 0) * (latest.sessionDurationMinutes ?? 0)} AU
          </p>
        </article>
      </section>

      <EmptyState
        title="Saving starts in Phase 2"
        titleZh="Phase 2 开始保存"
        description="Phase 1 is intentionally static, so check-ins do not persist."
        descriptionZh="Phase 1 刻意保持静态，因此 check-in 不会持久化。"
      />
    </div>
  );
}
