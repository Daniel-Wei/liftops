using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace LiftBattery.Api.Data;

public sealed class LiftBatteryDbContextFactory : IDesignTimeDbContextFactory<LiftBatteryDbContext>
{
    public LiftBatteryDbContext CreateDbContext(string[] args)
    {
        var connectionString = Environment.GetEnvironmentVariable(
            "ConnectionStrings__LiftBatteryDatabase");

        if (string.IsNullOrWhiteSpace(connectionString))
        {
            throw new InvalidOperationException(
                "Set ConnectionStrings__LiftBatteryDatabase before running EF Core commands.");
        }

        var options = new DbContextOptionsBuilder<LiftBatteryDbContext>()
            .UseSqlServer(connectionString)
            .Options;
        return new LiftBatteryDbContext(options);
    }
}
