import type {
  SaveTrainingSessionDto,
  TrainingDayDto,
  TrainingExerciseDto,
  TrainingSessionDto,
  TrainingSetDto,
} from "./dtos";
import type {
  TrainingDay,
  TrainingExercise,
  TrainingSession,
  TrainingSessionDraft,
  TrainingSessionRecord,
  TrainingSet,
} from "../types/appTypes";
import { createId } from "../helpers/GenericHelpers";

const nowFallback = "1970-01-01T00:00:00.000Z";

export function toSaveTrainingSessionDto(input: TrainingSessionDraft): SaveTrainingSessionDto {
  return {
    date: input.date,
    startTime: input.startTime,
    durationMinutes: input.durationMinutes,
    sessionRpe: input.sessionRpe,
    exercises: input.exercises.map((exercise) => ({
      muscleGroup: exercise.muscleGroup,
      exerciseName: exercise.exerciseName,
      sets: exercise.sets.map((set, index) => ({
        setNumber: index + 1,
        reps: set.reps,
        weightKg: set.weightKg,
        rpe: set.rpe,
        rir: set.rir,
        isWarmup: set.isWarmup,
      })),
    })),
  };
}

function fromSetDto(dto: TrainingSetDto): TrainingSet {
  return {
    id: dto.id ?? createId("set"),
    setNumber: dto.setNumber,
    reps: dto.reps,
    weightKg: dto.weightKg,
    rpe: dto.rpe,
    rir: dto.rir,
    isWarmup: dto.isWarmup,
    createdAt: dto.createdAt ?? nowFallback,
    updatedAt: dto.updatedAt ?? nowFallback,
  };
}

function fromExerciseDto(dto: TrainingExerciseDto): TrainingExercise {
  return {
    id: dto.id ?? createId("exercise"),
    muscleGroup: dto.muscleGroup,
    exerciseName: dto.exerciseName,
    sets: dto.sets.map(fromSetDto),
    createdAt: dto.createdAt ?? nowFallback,
    updatedAt: dto.updatedAt ?? nowFallback,
  };
}

function fromSessionDto(dto: TrainingSessionDto): TrainingSession {
  return {
    id: dto.id ?? createId("session"),
    startTime: dto.startTime,
    durationMinutes: dto.durationMinutes,
    sessionRpe: dto.sessionRpe,
    exercises: dto.exercises.map(fromExerciseDto),
    createdAt: dto.createdAt ?? nowFallback,
    updatedAt: dto.updatedAt ?? nowFallback,
  };
}

export function fromTrainingDayDto(dto: TrainingDayDto): TrainingDay {
  return {
    id: dto.id,
    userId: dto.userId,
    date: dto.date,
    sessions: dto.sessions.map(fromSessionDto),
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}

export function flattenTrainingDays(days: TrainingDay[]): TrainingSessionRecord[] {
  return days.flatMap((day) => day.sessions.map((session) => ({
    ...session,
    userId: day.userId,
    date: day.date,
    sets: session.exercises.flatMap((exercise) => exercise.sets.map((set) => ({
      ...set,
      exerciseName: exercise.exerciseName,
      muscleGroup: exercise.muscleGroup,
    }))),
  })));
}
