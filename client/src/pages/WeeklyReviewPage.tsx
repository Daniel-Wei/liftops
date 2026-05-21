import { WeeklyReviewCard } from "../components/WeeklyReviewCard";
import { ForecastRiskCard } from "../components/ForecastRiskCard";
import { EvidenceNote } from "../components/EvidenceNote";
import { mockRiskWatches, mockWeeklyReview } from "../data/mockData";

export function WeeklyReviewPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase text-slate-500">Weekly Review / 每周复盘</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950 md:text-5xl">Run the weekly operating review.</h1>
        <p className="mt-2 max-w-2xl text-slate-500">
          Summarize core utilisation, support ratio, capacity change, risk watch changes, and next-week review focus.
        </p>
      </header>

      <WeeklyReviewCard review={mockWeeklyReview} />

      <section className="grid gap-4 lg:grid-cols-3">
        {mockRiskWatches.map((risk) => (
          <ForecastRiskCard key={risk.id} risk={risk} />
        ))}
      </section>

      <EvidenceNote
        type="watch"
        title="Review language"
        titleZh="复盘语言"
        childrenZh="每周复盘应保持趋势和观察语言，不把 risk watch 写成医学结论。"
      >
        Weekly review should use trend and watch language, not convert risk watches into medical conclusions.
      </EvidenceNote>
    </div>
  );
}
