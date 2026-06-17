import type { TrainingSessionDto } from "./dtos";
import type { TrainingSession, TrainingSessionDetails } from "../types/appTypes";
import { getTodayDate } from "../helpers/GenericHelpers";

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
    durationMinutes: input.durationMinutes,
    sessionRpe: input.sessionRpe,
    exerciseName: input.exerciseName,
    muscleGroup: input.primaryMuscleGroup,
    reps: input.reps,
    sets: input.sets,
    weightKg: input.weightKg,
    rir: input.rir,
    rpe: input.rpe,
  };
}

export function fromTrainingDto(dto: TrainingSessionDto): TrainingSession {
  const dtoDate = getDtoString(dto, "date", "Date") ?? getTodayDate();

  return {
    id: getDtoString(dto, "id", "Id") ?? `trainingSession-${dtoDate}`,
    traingSessionDetails: {
      date: dtoDate,
      durationMinutes: getDtoNumber(dto, "durationMinutes", "DurationMinutes") ?? 0,
      sessionRpe: getDtoNumber(dto, "sessionRpe", "SessionRpe") ?? 0,
      exerciseName: getDtoString(dto, "exerciseName", "ExerciseName") ?? "",
      primaryMuscleGroup: dto.muscleGroup,
      sets: dto.sets,
      reps: getDtoNumber(dto, "reps", "Reps") ?? 0,
      weightKg: getDtoNumber(dto, "weightKg", "WeightKg") ?? 0,
      rpe: getDtoNumber(dto, "rpe", "Rpe"),
      rir: getDtoNumber(dto, "rir", "Rir"),
    }
  };
}
