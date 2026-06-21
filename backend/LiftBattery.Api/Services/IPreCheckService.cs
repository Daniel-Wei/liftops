using LiftBattery.Api.DTOs;

namespace LiftBattery.Api.Services;

public interface IPreCheckService
{
    Task<PreCheckDto?> GetByDateAsync(
        string userId,
        DateOnly date,
        CancellationToken cancellationToken = default);

    Task<IReadOnlyList<PreCheckDto>> GetByDateRangeAsync(
        string userId,
        DateOnly from,
        DateOnly to,
        CancellationToken cancellationToken = default);

    Task<PreCheckDto> SaveAsync(
        string userId,
        PreCheckDto dto,
        CancellationToken cancellationToken = default);

    Task<PreCheckDto?> DeleteAsync(
        string userId,
        string id,
        CancellationToken cancellationToken = default);
}
