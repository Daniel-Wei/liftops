import type {
  ProgramSettings,
  PreCheckDetailsLog,
  TrainingSessionDetails,
  TrendReportType,
} from "../types/appTypes";
import { getLocalDateString } from "../helpers/GenericHelpers";

export const defaultProgramSettings: ProgramSettings = {
  currentWeek: 1,
  totalWeeks: 12,
  mode: "Strength / hypertrophy",
  priorityMuscles: ["Back", "Glutes", "Quads"],
  weeklyPriorityHardSetTarget: 50,
};

export const initialPreCheckDetailsInput: PreCheckDetailsLog = {
  sleepHours: 7.5,
  soreness: 3,
  motivation: 7,
  restingHeartRateDelta: 1,
  previousSessionRpe: 7,
  previousSessionDurationMinutes: 60,
};

export const initialTrainingSessionDetailsInput: TrainingSessionDetails = {
  date: getLocalDateString(),
  exerciseName: "Bench Press",
  primaryMuscleGroup: "Chest",
  isWarmup: false,
  reps: 8,
  sessionRpe: 7,
  sets: 3,
  weightKg: 60,
};

export const defaultReportTypeOptions: Array<{ value: TrendReportType; label: string }> = [
  { value: "readiness", label: "练前状态分数趋势" },
  { value: "sleep", label: "睡眠时长趋势" },
  { value: "sessionLoad", label: "每周训练负荷" },
  { value: "volume", label: "每周训练量" },
  { value: "estimatedPr", label: "动作预计单次最大重量趋势" },
];
