export type TrainingMode = "push" | "maintain" | "lighter" | "recoveryPriority";

export type BlockMode =
  | "cut"
  | "contestPrep"
  | "photoshootPrep"
  | "highFatigueBlock"
  | "maintenancePerformance";

export type TrainingBlock = {
  id: string;
  name: string;
  nameZh: string;
  mode: BlockMode;
  currentWeek: number;
  totalWeeks: number;
  currentPhase: string;
  targetDate?: string;
};

export type TrainingPhaseType =
  | "baseline"
  | "deficit"
  | "accumulation"
  | "intensification"
  | "fatigueWatch"
  | "peak"
  | "recovery";

export type TrainingPhase = {
  id: string;
  name: string;
  nameZh: string;
  startWeek: number;
  endWeek: number;
  type: TrainingPhaseType;
};

export type CoreWorkPlan = {
  id: string;
  week: number;
  targetArea: string;
  targetAreaZh: string;
  plannedHardSets: number;
  completedHardSets: number;
  plannedVolumeLoad?: number;
  completedVolumeLoad?: number;
  priority: "primary" | "secondary";
};

export type SupportLoadPlan = {
  id: string;
  week: number;
  category: "accessories" | "cardio" | "mobility" | "posing" | "admin" | "recovery";
  label: string;
  labelZh: string;
  plannedUnits: number;
  completedUnits: number;
  unitLabel: string;
};

export type LoadSnapshot = {
  id: string;
  date: string;
  sessionRpeLoad: number;
  volumeLoad?: number;
  hardSets: number;
  cardioMinutes: number;
  steps: number;
  performanceIndex: number;
  topSetQuality: number;
};

export type TodayTrainingMode = {
  date: string;
  mode: TrainingMode;
  reason: string;
  reasonZh: string;
  focus: string[];
  focusZh: string[];
};
