import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ForecastPoint, TrendPoint } from "../types/forecast";

type ChartPoint = TrendPoint | ForecastPoint;

type MetricLine<T extends ChartPoint> = {
  key: keyof T;
  name: string;
  color: string;
};

type MultiMetricChartProps<T extends ChartPoint> = {
  title: string;
  titleZh: string;
  data: T[];
  lines: MetricLine<T>[];
};

export function MultiMetricChart<T extends ChartPoint>({ title, titleZh, data, lines }: MultiMetricChartProps<T>) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">{title}</p>
          <h2 className="text-xl font-black text-slate-950">{titleZh}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {lines.map((line) => (
            <span key={line.key as string} className="flex items-center gap-1 text-xs font-semibold text-slate-500">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: line.color }} />
              {line.name}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-5 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 16, left: -18, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="label" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} />
            <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ border: "1px solid #e2e8f0", borderRadius: 14, boxShadow: "0 12px 36px rgba(15,23,42,0.12)" }} />
            {lines.map((line) => (
              <Line key={line.key as string} type="monotone" dataKey={line.key as string} name={line.name} stroke={line.color} strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
