import { EvidenceNote } from "../components/EvidenceNote";
import { SectionCard } from "../components/SectionCard";
import { weeklyReview } from "../data/mockData";

export function WeeklyReviewPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header>
        <p className="text-xs font-black uppercase tracking-wide text-slate-500">Weekly Review / 每周复盘</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950 md:text-5xl">Review the training operations week.</h1>
      </header>

      <SectionCard title="Weekly summary" titleZh="每周总结" eyebrow="Static review">
        <p className="text-lg font-bold text-slate-950">{weeklyReview.summary}</p>
        <p className="mt-2 text-slate-500">{weeklyReview.summaryZh}</p>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-black uppercase text-slate-500">Core utilisation</p>
            <p className="mt-2 text-3xl font-black">{weeklyReview.coreUtilisation}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-black uppercase text-slate-500">Support load ratio</p>
            <p className="mt-2 text-3xl font-black">{weeklyReview.supportLoadRatio}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-black uppercase text-slate-500">Capacity change</p>
            <p className="mt-2 text-3xl font-black">{weeklyReview.capacityChange}</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Risk watch changes" titleZh="风险观察变化">
        <ul className="space-y-3">
          {weeklyReview.riskChanges.map((change) => (
            <li key={change} className="rounded-2xl bg-slate-50 p-4 font-bold text-slate-700">
              {change}
            </li>
          ))}
        </ul>
      </SectionCard>

      <EvidenceNote title="Next week review / 下周复盘重点" evidenceType="watch">
        <p>{weeklyReview.nextWeek}</p>
        <p className="mt-1 text-slate-500">{weeklyReview.nextWeekZh}</p>
      </EvidenceNote>
    </div>
  );
}
