import { EvidenceNote } from "../components/EvidenceNote";
import { SectionCard } from "../components/SectionCard";
import { StatusBadge } from "../components/StatusBadge";
import { coreWorkItems, supportLoadItems } from "../data/mockData";

export function CoreNonCorePage() {
  return (
    <div className="page page-stack">
      <header className="page-header">
        <p className="eyebrow">Core / Non-Core / 核心与非核心</p>
        <h1 className="page-title">Protect the work that drives the block.</h1>
      </header>

      <div className="two-column">
        <SectionCard title="Core work" titleZh="核心训练工作" eyebrow="Priority hard sets">
          <div className="card-list">
            {coreWorkItems.map((item) => (
              <div key={item.name} className="work-card">
                <div className="info-row">
                  <p className="work-title">{item.name}</p>
                  <StatusBadge status={item.status} label={item.utilisation} />
                </div>
                <p className="info-subtitle">{item.nameZh}</p>
                <p className="work-detail">{item.completed} of {item.planned}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Support load" titleZh="支持负荷" eyebrow="Helpful, but limited">
          <div className="card-list">
            {supportLoadItems.map((item) => (
              <div key={item.name} className="work-card">
                <div className="info-row">
                  <p className="work-title">{item.name}</p>
                  <StatusBadge status={item.status} label={item.utilisation} />
                </div>
                <p className="info-subtitle">{item.nameZh}</p>
                <p className="work-detail">{item.completed} of {item.planned}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <EvidenceNote title="Non-Core Overload / 非核心负荷过高" evidenceType="watch">
        <p>Support work can help, but too much optional work may crowd recovery.</p>
        <p>支持性训练可以有帮助，但过量可选训练可能挤占恢复。</p>
      </EvidenceNote>
    </div>
  );
}
