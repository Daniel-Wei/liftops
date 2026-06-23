using LiftBattery.Api.DTOs;

namespace LiftBattery.Api.Services;

public interface ITrainingSessionService
{
    Task<IReadOnlyList<TrainingDayDto>> GetByDateRangeAsync(
        string userId,
        DateOnly from,
        DateOnly to,
        CancellationToken cancellationToken = default);

    Task<TrainingDayDto> SaveSessionAsync(
        string userId,
        SaveTrainingSessionDto dto,
        CancellationToken cancellationToken = default);

    Task<TrainingSessionDto?> DeleteSessionAsync(
        string userId,
        string id,
        CancellationToken cancellationToken = default);
}
