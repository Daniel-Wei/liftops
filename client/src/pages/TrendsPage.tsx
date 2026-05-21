import { ChartMock } from "../components/ChartMock";
import { bodyweightTrend, loadTrend, nutritionTrend, recoveryTrend } from "../data/mockData";

export function TrendsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header>
        <p className="text-xs font-black uppercase tracking-wide text-slate-500">Trends / 趋势</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950 md:text-5xl">Mock trends for load, recovery, nutrition, and bodyweight.</h1>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        <ChartMock title="Training load" titleZh="训练负荷" data={loadTrend} color="bg-slate-950" />
        <ChartMock title="Fatigue / recovery proxy" titleZh="疲劳 / 恢复 Proxy" data={recoveryTrend} color="bg-emerald-500" />
        <ChartMock title="Bodyweight trend" titleZh="体重趋势" data={bodyweightTrend} color="bg-sky-500" />
        <ChartMock title="Calories / carbs proxy panel" titleZh="热量 / 碳水趋势面板" data={nutritionTrend} color="bg-violet-500" />
      </div>
    </div>
  );
}
