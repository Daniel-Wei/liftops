using LiftBattery.Api.Models;

namespace LiftBattery.Api.Repositories;

public interface IPreCheckRepository
{
    Task<PreCheckLog?> GetByDateAsync(
        string userId,
        DateOnly date,
        CancellationToken cancellationToken = default);

    Task<IReadOnlyList<PreCheckLog>> GetByDateRangeAsync(
        string userId,
        DateOnly from,
        DateOnly to,
        CancellationToken cancellationToken = default);

    Task<IReadOnlyList<PreCheckLog>> GetByDateRangeAsync(
        DateOnly from,
        DateOnly to,
        CancellationToken cancellationToken = default);

    Task<PreCheckLog> UpsertAsync(
        PreCheckLog log,
        CancellationToken cancellationToken = default);

    Task<PreCheckLog?> DeleteByIdAsync(
        string userId,
        string id,
        CancellationToken cancellationToken = default);
}
