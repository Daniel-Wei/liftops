import type { BlockMode } from "./training";

export type UserProfile = {
  id: string;
  displayName: string;
  displayNameZh: string;
  mode: BlockMode;
  modeLabel: string;
  modeLabelZh: string;
  trainingGoal: string;
  trainingGoalZh: string;
  priorityMuscles: string[];
  priorityMusclesZh: string[];
  units: "metric" | "imperial";
};
