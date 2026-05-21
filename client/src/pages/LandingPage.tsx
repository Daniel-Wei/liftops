type LandingPageProps = {
  onOpenDashboard: () => void;
};

export function LandingPage({ onOpenDashboard }: LandingPageProps) {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto grid min-h-screen max-w-7xl gap-10 px-6 py-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-emerald-300">LiftOps</p>
          <h1 className="mt-5 max-w-3xl text-5xl font-black leading-tight md:text-7xl">
            SaaS-style training operations dashboard.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            For serious lifters who want to manage Core / Non-Core work, Plan, Forecast, Utilisation,
            Capacity, Efficiency, Productivity, and Risk without pretending proxy metrics are exact physiology.
          </p>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
            面向认真训练者的 SaaS 风格训练运营 Dashboard。先看清训练状态，再决定是否推进。
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onOpenDashboard}
              className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 shadow-xl shadow-emerald-950/40"
            >
              Open dashboard
            </button>
            <span className="rounded-full border border-white/15 px-6 py-3 text-sm font-black text-slate-300">
              Phase 1 static UI
            </span>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/40">
          <div className="rounded-2xl bg-white p-5 text-slate-950">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase text-slate-500">Executive view</p>
                <h2 className="text-2xl font-black">Cut Block 03</h2>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                Maintain
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {["Core Utilisation", "Capacity Proxy", "Forecast Risk", "Efficiency Proxy"].map((label) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-black uppercase text-slate-500">{label}</p>
                  <p className="mt-3 text-3xl font-black">{label === "Forecast Risk" ? "Medium" : "91%"}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-slate-950 p-4 text-white">
              <p className="text-xs font-black uppercase text-slate-400">Risk watch</p>
              <p className="mt-2 text-lg font-black">Support load is drifting above plan.</p>
              <p className="mt-2 text-sm text-slate-300">Watch state, not diagnosis. Review recovery before adding extra work.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
