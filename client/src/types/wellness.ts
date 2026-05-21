export type WellnessCheckIn = {
  id: string;
  date: string;
  fatigue: number;
  sleepQuality: number;
  soreness: number;
  stress: number;
  mood: number;
  hunger: number;
  foodFocus: number;
  trainingDrive: number;
  sessionRpe?: number;
  sessionDurationMinutes?: number;
  topSetRpe?: number;
  topSetRir?: number;
  note?: string;
};

export type WellnessMetricKey = Exclude<keyof WellnessCheckIn, "id" | "date" | "note">;

export type CheckInDimension = {
  key: WellnessMetricKey;
  label: string;
  labelZh: string;
  value: number;
  minLabel: string;
  maxLabel: string;
  evidence: "wellnessSelfReport" | "rirRpe" | "sessionRpe";
};
