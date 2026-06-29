using LiftBattery.Api.DTOs;
using LiftBattery.Api.Models;

namespace LiftBattery.Api.Mapping;

public static class PreCheckMapping
{
    public static PreCheckDto ToDto(PreCheckModel log)
    {
        return new PreCheckDto(
            log.Id,
            log.Date.ToString("yyyy-MM-dd"),
            log.SleepQuality,
            log.Soreness,
            log.Stress,
            log.Motivation,
            log.Energy,
            log.SleepHours,
            log.SorenessRating,
            log.MotivationRating,
            NormalizeRestingHeartRateBpm(log.RestingHeartRateBpm),
            null,
            log.PreviousSessionRpe,
            log.PreviousSessionDurationMinutes);
    }

    public static PreCheckModel ToModel(
        PreCheckDto dto,
        int userId,
        DateOnly date,
        DateTimeOffset now,
        PreCheckModel? existingLog)
    {
        return new PreCheckModel(
            existingLog?.Id ?? dto.Id ?? 0,
            userId,
            date,
            dto.SleepHours ?? GetSleepHours(dto.SleepQuality),
            dto.SorenessRating ?? ScaleFiveToTen(dto.Soreness),
            dto.MotivationRating ?? ScaleFiveToTen(dto.Motivation),
            dto.RestingHeartRateBpm
                ?? (dto.RestingHeartRateDelta.HasValue
                    ? NormalizeRestingHeartRateBpm(dto.RestingHeartRateDelta.Value)
                    : GetRestingHeartRateBpm(dto.Stress)),
            dto.PreviousSessionRpe ?? 1,
            dto.PreviousSessionDurationMinutes ?? 20,
            existingLog?.CreatedAtUtc ?? now,
            now);
    }

    private static decimal GetSleepHours(int sleepQuality)
    {
        return Math.Clamp(sleepQuality, 1, 5) switch
        {
            1 => 4.5m,
            2 => 5.5m,
            3 => 6.5m,
            4 => 7.25m,
            _ => 8m,
        };
    }

    private static int ScaleFiveToTen(int value)
    {
        return Math.Clamp(value * 2, 1, 10);
    }

    private static int NormalizeRestingHeartRateBpm(int value)
    {
        return value < 30 ? 65 + value : value;
    }

    private static int GetRestingHeartRateBpm(int stress)
    {
        return Math.Clamp(stress, 1, 5) switch
        {
            1 => 55,
            2 => 65,
            3 => 78,
            4 => 92,
            _ => 105,
        };
    }
}
