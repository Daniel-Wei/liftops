import type { TrendReportChartDto } from "../api/dtos";
import {
  getExerciseDisplayLabel,
  getMuscleGroupDisplayLabel,
} from "../data/programValues";
import type { MuscleGroup } from "../types/appTypes";
import { ChartMock } from "./ChartMock";
import { MultiLineTrendChart } from "./MultiLineTrendChart";

type TrendsReportChartProps = {
  chart: TrendReportChartDto;
  weekLabels: string[];
};

export function TrendsReportChart({ chart, weekLabels }: TrendsReportChartProps) {
  if (chart.type === "estimatedPr") {
    return (
      <MultiLineTrendChart
        title={chart.title}
        series={chart.series.map((series) => ({
          ...series,
          label: getExerciseDisplayLabel(series.label),
          detail: series.detail
            ? getMuscleGroupDisplayLabel(series.detail as MuscleGroup)
            : undefined,
        }))}
        xLabels={weekLabels}
      />
    );
  }

  const series = chart.series[0];

  return (
    <ChartMock
      title={chart.title}
      data={series?.data ?? []}
      variant={series?.variant ?? "blue"}
    />
  );
}
