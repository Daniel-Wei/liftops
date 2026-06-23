using LiftBattery.Api.Models;

namespace LiftBattery.Api.Repositories;

public interface ITrainingLogRepository
{
    Task<IReadOnlyList<TrainingDay>> GetByDateRangeAsync(
        string userId,
        DateOnly from,
        DateOnly to,
        CancellationToken cancellationToken = default);

    Task<TrainingDay> AddSessionAsync(
        string userId,
        DateOnly date,
        TrainingSession session,
        CancellationToken cancellationToken = default);

    Task<TrainingSession?> DeleteSessionAsync(
        string userId,
        string sessionId,
        CancellationToken cancellationToken = default);
}
