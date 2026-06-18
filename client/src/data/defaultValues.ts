import type {
  ProgramSettings,
  PreCheckDetailsLog,
  TrainingSessionDetails,
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
