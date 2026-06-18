import { MuscleGroup } from "../types/appTypes";

export type PreCheckDto = {
  id?: string;
  date: string;
  sleepQuality: number;
  soreness: number;
  stress: number;
  motivation: number;
  energy: number;
};

export type TrainingSetEntryDto = {
  id?: string;
  exerciseName: string;
  muscleGroup: MuscleGroup;
  reps: number;
  weightKg: number;
  rpe?: number;
  rir?: number;
  isWarmup: boolean;
};

export type TrainingSessionDto = {
  id?: string;
  date: string;
  durationMinutes: number;
  sessionRpe: number;
  sets: TrainingSetEntryDto[];
  createdAt?: string;
  updatedAt?: string;
};
