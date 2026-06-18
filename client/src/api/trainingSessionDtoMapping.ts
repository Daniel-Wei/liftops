import type { TrainingSessionDto } from "./dtos";
import type { TrainingSession, TrainingSessionDetails } from "../types/appTypes";
import { createId, getTodayDate } from "../helpers/GenericHelpers";

function getDtoString(dto: TrainingSessionDto, camelKey: keyof TrainingSessionDto, pascalKey: string) {
  const dtoRecord = dto as unknown as Record<string, unknown>;
  const value = dtoRecord[camelKey] ?? dtoRecord[pascalKey];
  return typeof value === "string" ? value : undefined;
}

function getDtoNumber(dto: TrainingSessionDto, camelKey: keyof TrainingSessionDto, pascalKey: string) {
  const dtoRecord = dto as unknown as Record<string, unknown>;
  const value = dtoRecord[camelKey] ?? dtoRecord[pascalKey];
  return typeof value === "number" ? value : undefined;
}

export function toTrainingSessionDto(input: TrainingSessionDetails): TrainingSessionDto {
  return {
    date: input.date,
    durationMinutes: 0,
    sessionRpe: input.sessionRpe,
    sets: Array.from({ length: input.sets }, () => ({
      id: createId("set"),
      exerciseName: input.exerciseName,
      muscleGroup: input.primaryMuscleGroup,
      reps: input.reps,
      weightKg: input.weightKg,
      rir: input.rir,
      rpe: input.rpe,
      isWarmup: input.isWarmup,
    })),
  };
}

export function fromTrainingDto(dto: TrainingSessionDto): TrainingSession {
  const dtoDate = getDtoString(dto, "date", "Date") ?? getTodayDate();

  return {
    id: getDtoString(dto, "id", "Id") ?? `trainingSession-${dtoDate}`,
    date: dtoDate,
    durationMinutes: getDtoNumber(dto, "durationMinutes", "DurationMinutes") ?? 0,
    sessionRpe: getDtoNumber(dto, "sessionRpe", "SessionRpe") ?? 0,
    sets: dto.sets.map((set) => ({
      id: set.id ?? createId("set"),
      exerciseName: set.exerciseName,
      muscleGroup: set.muscleGroup,
      reps: set.reps,
      weightKg: set.weightKg,
      rpe: set.rpe,
      rir: set.rir,
      isWarmup: set.isWarmup,
    })),
    createdAt: getDtoString(dto, "createdAt", "CreatedAt") ?? `${dtoDate}T00:00:00.000Z`,
    updatedAt: getDtoString(dto, "updatedAt", "UpdatedAt") ?? `${dtoDate}T00:00:00.000Z`,
  };
}
