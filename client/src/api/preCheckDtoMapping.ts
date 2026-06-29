import type { PreCheckDto } from "./dtos";
import { initialPreCheckDetailsInput } from "../data/defaultValues";
import type { PreCheckDetailsLog, PreCheckLog } from "../types/appTypes";
import { getTodayDate } from "../helpers/GenericHelpers";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function scaleTenToFive(value: number) {
  return clamp(Math.round(value / 2), 1, 5);
}

function scaleFiveToTen(value: number) {
  return clamp(value * 2, 1, 10);
}

function getSleepQualityFromHours(sleepHours: number) {
  if (sleepHours >= 8) {
    return 5;
  }

  if (sleepHours >= 7) {
    return 4;
  }

  if (sleepHours >= 6) {
    return 3;
  }

  if (sleepHours >= 5) {
    return 2;
  }

  return 1;
}

function getSleepHoursFromQuality(sleepQuality: number) {
  const sleepHoursByQuality: Record<number, number> = {
    1: 4.5,
    2: 5.5,
    3: 6.5,
    4: 7.25,
    5: 8,
  };

  return sleepHoursByQuality[clamp(sleepQuality, 1, 5)] ?? initialPreCheckDetailsInput.sleepHours;
}

function normalizeLegacyRestingHeartRate(value: number) {
  return value < 30 ? 65 + value : value;
}

function getStressFromRestingHeartRateBpm(restingHeartRateBpm: number) {
  if (restingHeartRateBpm <= 55) {
    return 1;
  }

  if (restingHeartRateBpm <= 70) {
    return 2;
  }

  if (restingHeartRateBpm <= 85) {
    return 3;
  }

  if (restingHeartRateBpm <= 100) {
    return 4;
  }

  return 5;
}

function getDtoString(dto: PreCheckDto, camelKey: keyof PreCheckDto, pascalKey: string) {
  const dtoRecord = dto as unknown as Record<string, unknown>;
  const value = dtoRecord[camelKey] ?? dtoRecord[pascalKey];
  return typeof value === "string" ? value : undefined;
}

function getDtoNumber(dto: PreCheckDto, camelKey: keyof PreCheckDto, pascalKey: string) {
  const dtoRecord = dto as unknown as Record<string, unknown>;
  const value = dtoRecord[camelKey] ?? dtoRecord[pascalKey];
  return typeof value === "number" ? value : undefined;
}

function getDtoId(dto: PreCheckDto) {
  const dtoRecord = dto as unknown as Record<string, unknown>;
  const value = dtoRecord.id ?? dtoRecord.Id;
  return typeof value === "number" ? value : 0;
}

export function toPreCheckDto(input: PreCheckDetailsLog, savedLog?: PreCheckLog): PreCheckDto {
  return {
    id: savedLog?.id,
    date: getTodayDate(),
    sleepQuality: getSleepQualityFromHours(input.sleepHours),
    soreness: scaleTenToFive(input.soreness),
    stress: getStressFromRestingHeartRateBpm(input.restingHeartRateBpm),
    motivation: scaleTenToFive(input.motivation),
    energy: scaleTenToFive(input.motivation),
    sleepHours: input.sleepHours,
    sorenessRating: input.soreness,
    motivationRating: input.motivation,
    restingHeartRateBpm: input.restingHeartRateBpm,
    previousSessionRpe: input.previousSessionRpe,
    previousSessionDurationMinutes: input.previousSessionDurationMinutes,
  };
}

export function fromPreCheckDto(dto: PreCheckDto, fallbackInput = initialPreCheckDetailsInput): PreCheckLog {
  const dtoDate = getDtoString(dto, "date", "Date") ?? getTodayDate();
  const dtoSleepQuality = getDtoNumber(dto, "sleepQuality", "SleepQuality") ?? 3;
  const dtoSoreness = getDtoNumber(dto, "soreness", "Soreness") ?? 3;
  const dtoMotivation = getDtoNumber(dto, "motivation", "Motivation") ?? 3;
  const dtoSleepHours = getDtoNumber(dto, "sleepHours", "SleepHours");
  const dtoSorenessRating = getDtoNumber(dto, "sorenessRating", "SorenessRating");
  const dtoMotivationRating = getDtoNumber(dto, "motivationRating", "MotivationRating");
  const dtoRestingHeartRateBpm = getDtoNumber(dto, "restingHeartRateBpm", "RestingHeartRateBpm");
  const dtoRestingHeartRateDelta = getDtoNumber(dto, "restingHeartRateDelta", "RestingHeartRateDelta");
  const dtoPreviousSessionRpe = getDtoNumber(dto, "previousSessionRpe", "PreviousSessionRpe");
  const dtoPreviousSessionDurationMinutes = getDtoNumber(
    dto,
    "previousSessionDurationMinutes",
    "PreviousSessionDurationMinutes",
  );
  const input = {
    sleepHours: dtoSleepHours ?? getSleepHoursFromQuality(dtoSleepQuality),
    soreness: dtoSorenessRating ?? scaleFiveToTen(dtoSoreness),
    motivation: dtoMotivationRating ?? scaleFiveToTen(dtoMotivation),
    restingHeartRateBpm: dtoRestingHeartRateBpm
      ?? (dtoRestingHeartRateDelta === undefined
        ? fallbackInput.restingHeartRateBpm
        : normalizeLegacyRestingHeartRate(dtoRestingHeartRateDelta)),
    previousSessionRpe: dtoPreviousSessionRpe ?? fallbackInput.previousSessionRpe,
    previousSessionDurationMinutes:
      dtoPreviousSessionDurationMinutes ?? fallbackInput.previousSessionDurationMinutes,
  };

  return {
    id: getDtoId(dto),
    date: dtoDate,
    input,
  };
}
