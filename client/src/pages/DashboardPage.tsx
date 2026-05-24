import { ChartMock } from "../components/ChartMock";
import { EvidenceNote } from "../components/EvidenceNote";
import { GanttTimeline } from "../components/GanttTimeline";
import { MetricCard } from "../components/MetricCard";
import { SectionCard } from "../components/SectionCard";
import { StatusBadge } from "../components/StatusBadge";
import {
  dashboardMetrics,
  loadTrend,
  recoveryTrend,
  riskWatches,
  timelinePhases,
  trainingBlock,
} from "../data/mockData";

export function DashboardPage() {
  return (
    <div className="page page-stack">
      <header className="hero-panel">
        <p className="landing-eyebrow">Executive dashboard / 总览 Dashboard</p>
        <h1 className="page-title">{trainingBlock.name}</h1>
        <p className="page-subtitle">{trainingBlock.subtitle}</p>
        <div className="hero-badge-row">
          <StatusBadge status="neutral" label={`Week ${trainingBlock.currentWeek} / ${trainingBlock.totalWeeks}`} />
          <StatusBadge status="good" label={`Today: ${trainingBlock.trainingMode}`} />
          <StatusBadge status="watch" label={trainingBlock.mode} />
        </div>
      </header>

      <section className="metric-grid">
        {dashboardMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <div className="two-column">
        <GanttTimeline phases={timelinePhases} currentWeek={trainingBlock.currentWeek} />
        <SectionCard title="Risk Watch Cards" titleZh="风险观察卡片" eyebrow="Pattern-based watch">
          <div className="card-list">
            {riskWatches.map((risk) => (
              <article key={risk.title} className="risk-card">
                <div className="info-row">
                  <div>
                    <p className="risk-title">{risk.title}</p>
                    <p className="info-subtitle">{risk.titleZh}</p>
                  </div>
                  <StatusBadge status={risk.severity === "high" ? "risk" : "watch"} label={risk.severity} />
                </div>
                <p className="risk-detail">{risk.recommendation}</p>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="two-column">
        <ChartMock title="Training load trend" titleZh="训练负荷趋势" data={loadTrend} variant="dark" />
        <ChartMock title="Recovery capacity proxy" titleZh="恢复容量 Proxy" data={recoveryTrend} variant="green" />
      </div>

      <EvidenceNote title="Metric boundary / 指标边界" evidenceType="proxy">
        <p>Capacity, Efficiency, Productivity, Forecast, and Risk are displayed as proxy, trend, estimate, or watch language.</p>
        <p>这些指标是 proxy、trend、estimate 或 watch 语言，不是医学诊断或精确生理测量。</p>
      </EvidenceNote>
    </div>
  );
}
