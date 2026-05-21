import { EvidenceNote } from "../components/EvidenceNote";
import { SectionCard } from "../components/SectionCard";
import { StatusBadge } from "../components/StatusBadge";
import { coreWorkItems, supportLoadItems } from "../data/mockData";

export function CoreNonCorePage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header>
        <p className="text-xs font-black uppercase tracking-wide text-slate-500">Core / Non-Core / 核心与非核心</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950 md:text-5xl">Protect the work that drives the block.</h1>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        <SectionCard title="Core work" titleZh="核心训练工作" eyebrow="Priority hard sets">
          <div className="space-y-3">
            {coreWorkItems.map((item) => (
              <div key={item.name} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-black">{item.name}</p>
                  <StatusBadge status={item.status} label={item.utilisation} />
                </div>
                <p className="mt-1 text-sm text-slate-500">{item.nameZh}</p>
                <p className="mt-2 text-sm text-slate-600">{item.completed} of {item.planned}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Support load" titleZh="支持负荷" eyebrow="Helpful, but limited">
          <div className="space-y-3">
            {supportLoadItems.map((item) => (
              <div key={item.name} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-black">{item.name}</p>
                  <StatusBadge status={item.status} label={item.utilisation} />
                </div>
                <p className="mt-1 text-sm text-slate-500">{item.nameZh}</p>
                <p className="mt-2 text-sm text-slate-600">{item.completed} of {item.planned}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <EvidenceNote title="Non-Core Overload / 非核心负荷过高" evidenceType="watch">
        <p>Support work can help, but too much optional work may crowd recovery.</p>
        <p className="mt-1 text-slate-500">支持性训练可以有帮助，但过量可选训练可能挤占恢复。</p>
      </EvidenceNote>
    </div>
  );
}
