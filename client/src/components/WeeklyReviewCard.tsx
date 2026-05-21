import { ClipboardCheck } from "lucide-react";
import type { WeeklyReview } from "../types/operations";

type WeeklyReviewCardProps = {
  review: WeeklyReview;
};

export function WeeklyReviewCard({ review }: WeeklyReviewCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white">
          <ClipboardCheck size={18} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">Week {review.week} review</p>
          <h2 className="text-xl font-black text-slate-950">Weekly operating review / 每周运营复盘</h2>
        </div>
      </div>
      <p className="mt-5 text-sm leading-6 text-slate-600">{review.summary}</p>
      <p className="mt-1 text-sm leading-6 text-slate-500">{review.summaryZh}</p>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-xl bg-emerald-50 p-3">
          <p className="text-sm font-semibold text-emerald-700">Core utilisation</p>
          <p className="mt-1 text-2xl font-black text-emerald-900">{review.coreUtilisation}%</p>
        </div>
        <div className="rounded-xl bg-amber-50 p-3">
          <p className="text-sm font-semibold text-amber-700">Support ratio</p>
          <p className="mt-1 text-2xl font-black text-amber-900">{review.supportRatio}%</p>
        </div>
        <div className="rounded-xl bg-cyan-50 p-3">
          <p className="text-sm font-semibold text-cyan-700">Capacity change</p>
          <p className="mt-1 text-2xl font-black text-cyan-900">{review.recoveryCapacityChange}</p>
        </div>
      </div>
      <div className="mt-5 rounded-xl bg-slate-50 p-4">
        <p className="font-bold text-slate-950">Next review / 下周 review</p>
        <p className="mt-2 text-sm text-slate-600">{review.nextReview}</p>
        <p className="mt-1 text-sm text-slate-500">{review.nextReviewZh}</p>
      </div>
    </article>
  );
}
