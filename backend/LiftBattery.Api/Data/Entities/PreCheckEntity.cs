namespace LiftBattery.Api.Data.Entities;

public sealed class PreCheckEntity
{
    public string Id { get; set; } = string.Empty;

    public string UserId { get; set; } = string.Empty;

    public DateOnly PreCheckDate { get; set; }

    public decimal SleepHours { get; set; }

    public int Soreness { get; set; }

    public int Motivation { get; set; }

    public int RestingHeartRateDelta { get; set; }

    public int PreviousSessionRpe { get; set; }

    public int PreviousSessionDurationMinutes { get; set; }

    public DateTimeOffset CreatedAtUtc { get; set; }

    public DateTimeOffset UpdatedAtUtc { get; set; }
}
