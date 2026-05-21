import { EvidenceNote } from "../components/EvidenceNote";
import { SectionCard } from "../components/SectionCard";
import { checkInItems } from "../data/mockData";

export function DailyCheckInPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <p className="text-xs font-black uppercase tracking-wide text-slate-500">Daily Check-in / 每日 Check-in</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950 md:text-5xl">Static readiness inputs.</h1>
        <p className="mt-3 text-slate-500">Phase 1 displays controls only. Nothing is saved.</p>
      </header>

      <SectionCard title="Today inputs" titleZh="今日输入" eyebrow="Display-only controls">
        <div className="space-y-5">
          {checkInItems.map((item) => (
            <div key={item.label}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <div>
                  <p className="font-black text-slate-950">{item.label}</p>
                  <p className="text-sm text-slate-500">{item.labelZh}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-black text-slate-700">
                  {item.value}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max={item.label === "Session RPE" ? "10" : "5"}
                value={item.value}
                disabled
                className="w-full accent-slate-950"
                readOnly
              />
            </div>
          ))}
        </div>
      </SectionCard>

      <EvidenceNote title="Session-RPE load / Session-RPE 负荷" evidenceType="established">
        <p>Session-RPE load uses session RPE x duration as a practical internal load estimate.</p>
        <p className="mt-1 text-slate-500">Session-RPE 负荷使用 session RPE x duration 作为实用内部负荷估计。</p>
      </EvidenceNote>
    </div>
  );
}
