import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { TrendPoint } from "../types/forecast";
import { EvidenceNote } from "./EvidenceNote";

type LoadMonotonyChartProps = {
  data: TrendPoint[];
};

export function LoadMonotonyChart({ data }: LoadMonotonyChartProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase text-slate-500">Load monotony / strain</p>
      <h2 className="text-xl font-black text-slate-950">Load pattern watch / 负荷模式观察</h2>
      <div className="mt-5 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 16, left: -18, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="label" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} />
            <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ border: "1px solid #e2e8f0", borderRadius: 14 }} />
            <Bar dataKey="monotony" name="Monotony" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            <Bar dataKey="strain" name="Strain" fill="#f59e0b" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4">
        <EvidenceNote type="watch" childrenZh="Monotony/strain 在 Phase 1 仅作为负荷模式观察示例；真实计算放到后续 domain logic。">
          Monotony/strain is shown as a load-pattern watch example in Phase 1; real calculations belong in later domain logic.
        </EvidenceNote>
      </div>
    </section>
  );
}
