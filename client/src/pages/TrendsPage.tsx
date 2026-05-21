import { LoadMonotonyChart } from "../components/LoadMonotonyChart";
import { MultiMetricChart } from "../components/MultiMetricChart";
import { TrendLineChart } from "../components/TrendLineChart";
import { mockTrendData } from "../data/mockData";

export function TrendsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase text-slate-500">Trends / 趋势</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950 md:text-5xl">Load, recovery, bodyweight, and pressure.</h1>
        <p className="mt-2 max-w-2xl text-slate-500">
          Static trend curves for training load, fatigue, sleep, hunger, mood, bodyweight, cardio, performance, calories, and carbs.
        </p>
      </header>

      <MultiMetricChart
        title="Training state trend"
        titleZh="训练状态趋势"
        data={mockTrendData}
        lines={[
          { key: "trainingLoad", name: "Training load", color: "#0f172a" },
          { key: "recoveryCapacity", name: "Capacity", color: "#10b981" },
          { key: "fatigue", name: "Fatigue", color: "#f59e0b" },
          { key: "performance", name: "Performance", color: "#0284c7" },
        ]}
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <TrendLineChart title="Bodyweight trend" titleZh="体重趋势" data={mockTrendData} dataKey="bodyweight" color="#0284c7" suffix=" kg" />
        <TrendLineChart title="Calories" titleZh="热量" data={mockTrendData} dataKey="calories" color="#e11d48" suffix=" kcal" />
        <TrendLineChart title="Carbs" titleZh="碳水" data={mockTrendData} dataKey="carbs" color="#8b5cf6" suffix=" g" />
        <TrendLineChart title="Cardio" titleZh="有氧" data={mockTrendData} dataKey="cardio" color="#06b6d4" suffix=" min" />
      </div>

      <LoadMonotonyChart data={mockTrendData} />
    </div>
  );
}
