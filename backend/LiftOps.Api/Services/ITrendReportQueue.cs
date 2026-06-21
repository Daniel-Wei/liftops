namespace LiftOps.Api.Services;

public interface ITrendReportQueue
{
    Task EnqueueAsync(string jobId);
}
