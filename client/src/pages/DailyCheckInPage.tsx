import { EvidenceNote } from "../components/EvidenceNote";
import { SectionCard } from "../components/SectionCard";
import { checkInItems } from "../data/mockData";

export function DailyCheckInPage() {
  return (
    <div className="page page--narrow page-stack">
      <header className="page-header">
        <p className="eyebrow">Daily Check-in / 每日 Check-in</p>
        <h1 className="page-title">Static readiness inputs.</h1>
        <p className="page-subtitle">Phase 1 displays controls only. Nothing is saved.</p>
      </header>

      <SectionCard title="Today inputs" titleZh="今日输入" eyebrow="Display-only controls">
        <div className="slider-list">
          {checkInItems.map((item) => (
            <div key={item.label} className="slider-row">
              <div className="slider-row-header">
                <div>
                  <p className="slider-label">{item.label}</p>
                  <p className="info-subtitle">{item.labelZh}</p>
                </div>
                <span className="value-pill">{item.value}</span>
              </div>
              <input
                type="range"
                min="1"
                max={item.label === "Session RPE" ? "10" : "5"}
                value={item.value}
                disabled
                className="range-input"
                readOnly
              />
            </div>
          ))}
        </div>
      </SectionCard>

      <EvidenceNote title="Session-RPE load / Session-RPE 负荷" evidenceType="established">
        <p>Session-RPE load uses session RPE x duration as a practical internal load estimate.</p>
        <p>Session-RPE 负荷使用 session RPE x duration 作为实用内部负荷估计。</p>
      </EvidenceNote>
    </div>
  );
}
