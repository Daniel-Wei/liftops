using System.Text.Json;
using Azure.Core.Serialization;
using LiftBattery.Api.Data;
using LiftBattery.Api.Options;
using LiftBattery.Api.Repositories;
using LiftBattery.Api.Services;
using Microsoft.Azure.Functions.Worker;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var host = new HostBuilder()
    .ConfigureFunctionsWorkerDefaults()
    .ConfigureServices((context, services) =>
    {
        services.Configure<WorkerOptions>(options =>
        {
            options.Serializer = new JsonObjectSerializer(new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                PropertyNameCaseInsensitive = true,
            });
        });

        var databaseConnection = context.Configuration.GetConnectionString("LiftBatteryDatabase")
            ?? throw new InvalidOperationException(
                "ConnectionStrings:LiftBatteryDatabase is required for PreCheck persistence.");

        services.Configure<PreCheckOptions>(
            context.Configuration.GetSection(PreCheckOptions.SectionName));
        services.AddDbContext<LiftBatteryDbContext>(options =>
            options.UseSqlServer(databaseConnection, sqlOptions => sqlOptions.EnableRetryOnFailure()));
        services.AddSingleton(TimeProvider.System);
        services.AddScoped<IPreCheckRepository, PreCheckRepository>();
        services.AddSingleton<ITrainingLogRepository, TrainingLogRepository>();
        services.AddScoped<IPreCheckService, PreCheckService>();
        services.AddSingleton<ITrainingSessionService, TrainingSessionService>();
        services.AddSingleton<ITrendReportJobRepository, TrendReportJobRepository>();
        services.AddSingleton<ITrendReportQueue, TrendReportServiceBusQueue>();
        services.AddScoped<ITrendReportService, TrendReportService>();
    })
    .Build();

host.Run();
