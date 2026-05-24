import { ChartMock } from "../components/ChartMock";
import { EvidenceNote } from "../components/EvidenceNote";
import { SectionCard } from "../components/SectionCard";
import { StatusBadge } from "../components/StatusBadge";
import { coreWorkItems, loadTrend, riskWatches, supportLoadItems } from "../data/mockData";

export function PlanForecastPage() {
  return (
    <div className="page page-stack">
      <header className="page-header">
        <p className="eyebrow">Plan & Forecast / 计划与预测</p>
        <h1 className="page-title">Compare plan, completed work, and watch states.</h1>
      </header>

      <div className="two-column">
        <SectionCard title="Weekly plan" titleZh="每周计划" eyebrow="Planned vs completed">
          <div className="card-list">
            {[...coreWorkItems, ...supportLoadItems].map((item) => (
              <div key={item.name} className="work-card">
                <div className="info-row">
                  <div>
                    <p className="work-title">{item.name}</p>
                    <p className="info-subtitle">{item.nameZh}</p>
                  </div>
                  <StatusBadge status={item.status} label={item.utilisation} />
                </div>
                <p className="work-detail">
                  Planned {item.planned} / Completed {item.completed}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>

        <ChartMock title="7-day load estimate" titleZh="7 天负荷估计" data={loadTrend} variant="blue" />
      </div>

      <SectionCard title="Forecast watches" titleZh="预测观察" eyebrow="Not deterministic prediction">
        <div className="three-column">
          {riskWatches.map((risk) => (
            <div key={risk.title} className="risk-card">
              <StatusBadge status={risk.severity === "high" ? "risk" : "watch"} label={risk.title} />
              <p className="risk-detail">{risk.recommendation}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <EvidenceNote title="Forecast boundary / 预测边界" evidenceType="watch">
        <p>Forecast means a trend-based watch or estimate, not a guaranteed prediction.</p>
        <p>Forecast 是基于趋势的观察或估计，不是确定性预测。</p>
      </EvidenceNote>
    </div>
  );
}
