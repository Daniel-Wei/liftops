using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LiftBattery.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialPreCheckPersistence : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PreChecks",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PreCheckDate = table.Column<DateOnly>(type: "date", nullable: false),
                    SleepHours = table.Column<decimal>(type: "decimal(4,2)", precision: 4, scale: 2, nullable: false),
                    Soreness = table.Column<int>(type: "int", nullable: false),
                    Motivation = table.Column<int>(type: "int", nullable: false),
                    RestingHeartRateDelta = table.Column<int>(type: "int", nullable: false),
                    PreviousSessionRpe = table.Column<int>(type: "int", nullable: false),
                    PreviousSessionDurationMinutes = table.Column<int>(type: "int", nullable: false),
                    CreatedAtUtc = table.Column<DateTimeOffset>(type: "datetimeoffset(7)", precision: 7, nullable: false),
                    UpdatedAtUtc = table.Column<DateTimeOffset>(type: "datetimeoffset(7)", precision: 7, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PreChecks", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "UX_PreChecks_UserId_PreCheckDate",
                table: "PreChecks",
                columns: new[] { "UserId", "PreCheckDate" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PreChecks");
        }
    }
}
