import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TrendPoint } from "../types/forecast";

type TrendLineChartProps = {
  title: string;
  titleZh: string;
  data: TrendPoint[];
  dataKey: keyof TrendPoint;
  color: string;
  suffix?: string;
};

export function TrendLineChart({ title, titleZh, data, dataKey, color, suffix }: TrendLineChartProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase text-slate-500">{title}</p>
      <h2 className="text-lg font-black text-slate-950">{titleZh}</h2>
      <div className="mt-4 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 14, left: -18, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="label" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} />
            <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} domain={["dataMin - 5", "dataMax + 5"]} />
            <Tooltip
              formatter={(value) => [`${value}${suffix ?? ""}`, title]}
              contentStyle={{ border: "1px solid #e2e8f0", borderRadius: 14, boxShadow: "0 12px 36px rgba(15,23,42,0.12)" }}
            />
            <Line type="monotone" dataKey={dataKey as string} stroke={color} strokeWidth={3} dot={{ r: 3, strokeWidth: 2, fill: "#ffffff" }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
