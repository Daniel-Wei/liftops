export type RiskWatchType =
  | "deloadWatch"
  | "cutPressureWatch"
  | "recoveryRisk"
  | "performanceRisk"
  | "nonCoreOverload"
  | "capacityGap";

export type RiskWatch = {
  id: string;
  type: RiskWatchType;
  severity: "low" | "medium" | "high";
  title: string;
  titleZh: string;
  signals: string[];
  signalsZh: string[];
  recommendation: string;
  recommendationZh: string;
};

export type TrendPoint = {
  label: string;
  trainingLoad: number;
  recoveryCapacity: number;
  fatigue: number;
  sleep: number;
  hunger: number;
  mood: number;
  bodyweight: number;
  cardio: number;
  performance: number;
  calories: number;
  carbs: number;
  monotony: number;
  strain: number;
  efficiency: number;
  productivity: number;
};

export type ForecastPoint = {
  label: string;
  plannedLoad: number;
  forecastLoad: number;
  fatigueForecast: number;
  recoveryForecast: number;
};
