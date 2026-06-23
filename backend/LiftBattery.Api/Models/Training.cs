namespace LiftBattery.Api.Models;

public sealed record TrainingSet(
    string Id,
    int SetNumber,
    int Reps,
    decimal WeightKg,
    decimal? Rpe,
    decimal? Rir,
    bool IsWarmup,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt);

public sealed record TrainingExercise(
    string Id,
    string MuscleGroup,
    string ExerciseName,
    IReadOnlyList<TrainingSet> Sets,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt);

public sealed record TrainingSession(
    string Id,
    TimeOnly StartTime,
    int DurationMinutes,
    decimal SessionRpe,
    IReadOnlyList<TrainingExercise> Exercises,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt);

public sealed record TrainingDay(
    string Id,
    string UserId,
    DateOnly Date,
    IReadOnlyList<TrainingSession> Sessions,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt);
