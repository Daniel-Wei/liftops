import type {
  ProgramSettings,
  PreCheckDetailsLog,
  TrainingSessionDetails,
} from "../types/appTypes";

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
  durationMinutes: 0,
  exerciseName: "",
  primaryMuscleGroup: "Chest",
  reps: 0,
  sessionRpe: 0,
  sets: 0,
  weightKg: 0,  
};