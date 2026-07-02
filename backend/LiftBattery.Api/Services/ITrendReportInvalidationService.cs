namespace LiftBattery.Api.Services;

public interface ITrendReportInvalidationService
{
    Task InvalidateForTrainingDataChangeAsync(
        int userId,
        DateOnly changedDate,
        CancellationToken cancellationToken = default);
}
