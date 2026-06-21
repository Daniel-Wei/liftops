using LiftBattery.Api.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace LiftBattery.Api.Data;

public sealed class LiftBatteryDbContext(DbContextOptions<LiftBatteryDbContext> options)
    : DbContext(options)
{
    public DbSet<PreCheckEntity> PreChecks => Set<PreCheckEntity>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(LiftBatteryDbContext).Assembly);
    }
}
