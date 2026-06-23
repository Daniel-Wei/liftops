using System.Globalization;
using LiftBattery.Api.DTOs;
using LiftBattery.Api.Models;

namespace LiftBattery.Api.Mapping;

public static class TrainingMapping
{
    public static TrainingDayDto ToDto(TrainingDay day)
    {
        return new TrainingDayDto(
            day.Id,
            day.UserId,
            day.Date.ToString("yyyy-MM-dd"),
            day.Sessions.Select(ToDto).ToList(),
            day.CreatedAt.ToString("O"),
            day.UpdatedAt.ToString("O"));
    }

    public static TrainingSession ToModel(SaveTrainingSessionDto dto, DateTimeOffset now)
    {
        if (!TimeOnly.TryParseExact(
            dto.StartTime,
            new[] { "HH:mm", "HH:mm:ss" },
            CultureInfo.InvariantCulture,
            DateTimeStyles.None,
            out var startTime))
        {
            throw new ArgumentException("Start time must use HH:mm format.");
        }

        return new TrainingSession(
            Guid.NewGuid().ToString("N"),
            startTime,
            dto.DurationMinutes,
            dto.SessionRpe,
            dto.Exercises.Select(exercise => ToModel(exercise, now)).ToList(),
            now,
            now);
    }

    public static TrainingSessionDto ToDto(TrainingSession session)
    {
        return new TrainingSessionDto(
            session.Id,
            session.StartTime.ToString("HH:mm", CultureInfo.InvariantCulture),
            session.DurationMinutes,
            session.SessionRpe,
            session.Exercises.Select(ToDto).ToList(),
            session.CreatedAt.ToString("O"),
            session.UpdatedAt.ToString("O"));
    }

    private static TrainingExerciseDto ToDto(TrainingExercise exercise)
    {
        return new TrainingExerciseDto(
            exercise.Id,
            exercise.MuscleGroup,
            exercise.ExerciseName,
            exercise.Sets.Select(ToDto).ToList(),
            exercise.CreatedAt.ToString("O"),
            exercise.UpdatedAt.ToString("O"));
    }

    private static TrainingSetDto ToDto(TrainingSet set)
    {
        return new TrainingSetDto(
            set.Id,
            set.SetNumber,
            set.Reps,
            set.WeightKg,
            set.Rpe,
            set.Rir,
            set.IsWarmup,
            set.CreatedAt.ToString("O"),
            set.UpdatedAt.ToString("O"));
    }

    private static TrainingExercise ToModel(TrainingExerciseDto dto, DateTimeOffset now)
    {
        return new TrainingExercise(
            dto.Id ?? Guid.NewGuid().ToString("N"),
            dto.MuscleGroup,
            dto.ExerciseName,
            dto.Sets.Select(set => ToModel(set, now)).ToList(),
            TryParseDateTimeOffset(dto.CreatedAt) ?? now,
            now);
    }

    private static TrainingSet ToModel(TrainingSetDto dto, DateTimeOffset now)
    {
        return new TrainingSet(
            dto.Id ?? Guid.NewGuid().ToString("N"),
            dto.SetNumber,
            dto.Reps,
            dto.WeightKg,
            dto.Rpe,
            dto.Rir,
            dto.IsWarmup,
            TryParseDateTimeOffset(dto.CreatedAt) ?? now,
            now);
    }

    private static DateTimeOffset? TryParseDateTimeOffset(string? value)
    {
        return DateTimeOffset.TryParse(value, out var dateTimeOffset)
            ? dateTimeOffset
            : null;
    }
}
