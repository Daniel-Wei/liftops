import type { TrendPoint } from "../types/appTypes";

type ChartMockProps = {
  title: string;
  titleZh?: string;
  data: TrendPoint[];
  color?: string;
};

export function ChartMock({ title, titleZh, data, color = "bg-sky-500" }: ChartMockProps) {
  const maxValue = Math.max(...data.map((point) => point.value));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-black uppercase tracking-wide text-slate-500">{title}</p>
      {titleZh ? <h2 className="mt-1 text-lg font-black text-slate-950">{titleZh}</h2> : null}

      <div className="mt-5 flex h-44 items-end gap-2">
        {data.map((point) => {
          const height = `${Math.max(12, (point.value / maxValue) * 100)}%`;

          return (
            <div key={point.label} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-36 w-full items-end rounded-xl bg-slate-100 p-1">
                <div className={`w-full rounded-lg ${color}`} style={{ height }} />
              </div>
              <span className="text-xs font-bold text-slate-500">{point.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
