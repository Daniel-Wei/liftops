import { ArrowRight, BarChart3, Gauge, ShieldCheck } from "lucide-react";
import { StatusBadge } from "../components/StatusBadge";

type LandingPageProps = {
  onOpenDashboard: () => void;
};

const conceptCards = [
  ["Core / Non-Core", "核心 / 非核心"],
  ["Plan / Forecast", "计划 / 预测"],
  ["Utilisation / Capacity", "使用率 / 容量"],
  ["Efficiency / Productivity", "效率 / 生产率"],
];

export function LandingPage({ onOpenDashboard }: LandingPageProps) {
  return (
    <main className="min-h-screen bg-[#070b12] px-4 py-8 text-white md:px-10 md:py-12">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <section className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300">
            <Gauge size={16} className="text-emerald-300" />
            LiftOps · SaaS-style training operations
          </div>
          <div>
            <h1 className="max-w-3xl text-5xl font-black leading-[1.02] md:text-7xl">
              Run training like an operations system.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              A SaaS-style training operations dashboard for serious lifters.
              Manage core work, support load, capacity, efficiency, productivity, and risk.
            </p>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
              面向认真训练者的 SaaS 风格训练运营 Dashboard。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onOpenDashboard}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 shadow-xl shadow-emerald-950/40"
            >
              Open dashboard / 打开 Dashboard
              <ArrowRight size={18} />
            </button>
            <span className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300">
              Phase 1: static mock UI
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {conceptCards.map(([en, zh]) => (
              <div key={en} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <ShieldCheck size={18} className="text-cyan-300" />
                <p className="mt-3 text-sm font-bold">{en}</p>
                <p className="text-xs text-slate-400">{zh}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/30">
          <div className="rounded-[1.5rem] bg-[#f4f6f8] p-4 text-slate-950">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">Executive dashboard</p>
                <h2 className="mt-1 text-2xl font-black">Week 9 · High Compliance Block</h2>
              </div>
              <StatusBadge mode="maintain" />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["Core Utilisation", "94%", "simple arithmetic"],
                ["Support Load", "124%", "watch"],
                ["Recovery Capacity", "63/100", "proxy"],
                ["Efficiency", "71", "heuristic"],
              ].map(([label, value, tag]) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
                  <p className="mt-3 text-3xl font-black">{value}</p>
                  <p className="mt-2 text-xs font-semibold text-slate-500">{tag}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl bg-slate-950 p-4 text-white">
              <div className="flex items-center gap-2">
                <BarChart3 size={18} className="text-emerald-300" />
                <p className="font-bold">Risk forecast / 风险预测</p>
              </div>
              <div className="mt-4 grid grid-cols-7 items-end gap-2">
                {[42, 54, 62, 70, 58, 64, 60].map((height, index) => (
                  <span key={index} className="rounded-t-lg bg-emerald-400" style={{ height: `${height}px` }} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
