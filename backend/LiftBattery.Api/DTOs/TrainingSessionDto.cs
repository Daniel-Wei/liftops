namespace LiftBattery.Api.DTOs;

public sealed record TrainingSetDto(
    string? Id,
    int SetNumber,
    int Reps,
    decimal WeightKg,
    decimal? Rpe,
    decimal? Rir,
    bool IsWarmup,
    string? CreatedAt,
    string? UpdatedAt);

public sealed record TrainingExerciseDto(
    string? Id,
    string MuscleGroup,
    string ExerciseName,
    IReadOnlyList<TrainingSetDto> Sets,
    string? CreatedAt,
    string? UpdatedAt);

public sealed record TrainingSessionDto(
    string? Id,
    string StartTime,
    int DurationMinutes,
    decimal SessionRpe,
    IReadOnlyList<TrainingExerciseDto> Exercises,
    string? CreatedAt,
    string? UpdatedAt);

public sealed record TrainingDayDto(
    string Id,
    string UserId,
    string Date,
    IReadOnlyList<TrainingSessionDto> Sessions,
    string CreatedAt,
    string UpdatedAt);

public sealed record SaveTrainingSessionDto(
    string Date,
    string StartTime,
    int DurationMinutes,
    decimal SessionRpe,
    IReadOnlyList<TrainingExerciseDto> Exercises);
