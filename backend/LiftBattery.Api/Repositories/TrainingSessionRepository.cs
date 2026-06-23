using System.Collections.Concurrent;
using LiftBattery.Api.Models;

namespace LiftBattery.Api.Repositories;

public sealed class TrainingLogRepository : ITrainingLogRepository
{
    private readonly ConcurrentDictionary<string, TrainingDay> _daysByUserAndDate = new();

    public Task<IReadOnlyList<TrainingDay>> GetByDateRangeAsync(
        string userId,
        DateOnly from,
        DateOnly to,
        CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        var days = _daysByUserAndDate.Values
            .Where(day => day.UserId == userId && day.Date >= from && day.Date <= to)
            .OrderBy(day => day.Date)
            .ToList();

        return Task.FromResult<IReadOnlyList<TrainingDay>>(days);
    }

    public Task<TrainingDay> AddSessionAsync(
        string userId,
        DateOnly date,
        TrainingSession session,
        CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();
        var key = GetKey(userId, date);
        var now = DateTimeOffset.UtcNow;

        var day = _daysByUserAndDate.AddOrUpdate(
            key,
            _ => new TrainingDay(
                Guid.NewGuid().ToString("N"),
                userId,
                date,
                new[] { session },
                now,
                now),
            (_, existing) => existing with
            {
                Sessions = existing.Sessions.Append(session).ToList(),
                UpdatedAt = now,
            });

        return Task.FromResult(day);
    }

    public Task<TrainingSession?> DeleteSessionAsync(
        string userId,
        string sessionId,
        CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        foreach (var item in _daysByUserAndDate)
        {
            var day = item.Value;

            if (day.UserId != userId)
            {
                continue;
            }

            var session = day.Sessions.FirstOrDefault(candidate => candidate.Id == sessionId);

            if (session is null)
            {
                continue;
            }

            var remainingSessions = day.Sessions
                .Where(candidate => candidate.Id != sessionId)
                .ToList();

            if (remainingSessions.Count == 0)
            {
                _daysByUserAndDate.TryRemove(item.Key, out _);
            }
            else
            {
                _daysByUserAndDate[item.Key] = day with
                {
                    Sessions = remainingSessions,
                    UpdatedAt = DateTimeOffset.UtcNow,
                };
            }

            return Task.FromResult<TrainingSession?>(session);
        }

        return Task.FromResult<TrainingSession?>(null);
    }

    private static string GetKey(string userId, DateOnly date)
    {
        return $"{userId}|{date:yyyy-MM-dd}";
    }
}
