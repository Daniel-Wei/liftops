type LandingPageProps = {
  onOpenDashboard: () => void;
};

export function LandingPage({ onOpenDashboard }: LandingPageProps) {
  return (
    <main className="landing-page">
      <section className="landing-layout">
        <div>
          <p className="landing-eyebrow">LiftOps</p>
          <h1 className="landing-title">
            SaaS-style training operations dashboard.
          </h1>
          <p className="landing-copy">
            For serious lifters who want to manage Core / Non-Core work, Plan, Forecast, Utilisation,
            Capacity, Efficiency, Productivity, and Risk without pretending proxy metrics are exact physiology.
          </p>
          <p className="landing-copy-muted">
            面向认真训练者的 SaaS 风格训练运营 Dashboard。先看清训练状态，再决定是否推进。
          </p>

          <div className="landing-actions">
            <button
              type="button"
              onClick={onOpenDashboard}
              className="button-primary"
            >
              Open dashboard
            </button>
            <span className="button-secondary">
              Phase 1 static UI
            </span>
          </div>
        </div>

        <div className="dashboard-preview-shell">
          <div className="dashboard-preview">
            <div className="preview-header">
              <div>
                <p className="preview-eyebrow">Executive view</p>
                <h2 className="preview-title">Cut Block 03</h2>
              </div>
              <span className="status-badge status-badge--good">Maintain</span>
            </div>

            <div className="preview-grid">
              {["Core Utilisation", "Capacity Proxy", "Forecast Risk", "Efficiency Proxy"].map((label) => (
                <div key={label} className="preview-metric">
                  <p className="preview-eyebrow">{label}</p>
                  <p className="preview-value">{label === "Forecast Risk" ? "Medium" : "91%"}</p>
                </div>
              ))}
            </div>

            <div className="preview-risk">
              <p className="preview-eyebrow">Risk watch</p>
              <p className="preview-risk-title">Support load is drifting above plan.</p>
              <p className="preview-risk-copy">Watch state, not diagnosis. Review recovery before adding extra work.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
