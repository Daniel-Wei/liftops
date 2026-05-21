export type OpsTrend = "up" | "down" | "stable";
export type OpsStatus = "good" | "watch" | "risk" | "neutral";
export type EvidenceType = "established" | "simpleArithmetic" | "heuristic" | "proxy" | "watch";

export type OpsMetric = {
  id: string;
  label: string;
  labelZh: string;
  value: string;
  trend: OpsTrend;
  status: OpsStatus;
  evidenceType: EvidenceType;
  explanation: string;
  explanationZh: string;
};

export type UtilisationSummary = {
  corePercent: number;
  supportPercent: number;
  cardioPercent: number;
  nutritionAdherencePercent: number;
};

export type CapacitySummary = {
  recoveryCapacityProxy: number;
  plannedLoadIndex: number;
  capacityGap: number;
  status: OpsStatus;
};

export type EfficiencySummary = {
  efficiencyProxy: number;
  productivityTrend: number;
  fatigueCost: number;
  topSetQuality: number;
};

export type WeeklyReview = {
  id: string;
  week: number;
  summary: string;
  summaryZh: string;
  coreUtilisation: number;
  supportRatio: number;
  recoveryCapacityChange: string;
  riskChanges: string[];
  riskChangesZh: string[];
  nextReview: string;
  nextReviewZh: string;
};
