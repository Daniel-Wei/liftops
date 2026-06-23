import type { MuscleGroup, TrendReportType } from "../types/appTypes";

export type PreCheckDto = {
  id?: string;
  date: string;
  sleepQuality: number;
  soreness: number;
  stress: number;
  motivation: number;
  energy: number;
  sleepHours?: number;
  sorenessRating?: number;
  motivationRating?: number;
  restingHeartRateDelta?: number;
  previousSessionRpe?: number;
  previousSessionDurationMinutes?: number;
};

export type TrainingSetDto = {
  id?: string;
  setNumber: number;
  reps: number;
  weightKg: number;
  rpe?: number;
  rir?: number;
  isWarmup: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type TrainingExerciseDto = {
  id?: string;
  muscleGroup: MuscleGroup;
  exerciseName: string;
  sets: TrainingSetDto[];
  createdAt?: string;
  updatedAt?: string;
};

export type TrainingSessionDto = {
  id?: string;
  startTime: string;
  durationMinutes: number;
  sessionRpe: number;
  exercises: TrainingExerciseDto[];
  createdAt?: string;
  updatedAt?: string;
};

export type TrainingDayDto = {
  id: string;
  userId: string;
  date: string;
  sessions: TrainingSessionDto[];
  createdAt: string;
  updatedAt: string;
};

export type SaveTrainingSessionDto = Omit<TrainingSessionDto, "id" | "createdAt" | "updatedAt"> & {
  date: string;
};

export type TrendReportSelectionDto = {
  muscleGroup: MuscleGroup;
  exerciseName: string;
};

export type CreateTrendReportRequestDto = {
  startWeek: string;
  endWeek: string;
  selections: TrendReportSelectionDto[];
  reportTypes: TrendReportType[];
};

export type TrendReportPointDto = {
  label: string;
  value: number;
};

export type TrendReportSeriesDto = {
  id: string;
  label: string;
  detail?: string;
  variant: "dark" | "green" | "blue" | "purple" | "amber";
  data: TrendReportPointDto[];
};

export type TrendReportChartDto = {
  type: TrendReportType;
  title: string;
  series: TrendReportSeriesDto[];
};

export type TrendReportResultDto = {
  startWeek: string;
  endWeek: string;
  weekLabels: string[];
  charts: TrendReportChartDto[];
};

export type TrendReportJobStatus =
  | "Queued"
  | "Processing"
  | "Completed"
  | "Failed"
  | "Cancelled";

export type TrendReportJobDto = {
  id: string;
  status: TrendReportJobStatus;
  progressPercent: number;
  currentStage: string;
  errorMessage?: string;
  createdAtUtc: string;
  startedAtUtc?: string;
  completedAtUtc?: string;
  updatedAtUtc: string;
  result?: TrendReportResultDto;
};
