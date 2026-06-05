import type {
  ReadinessControl,
  MuscleGroup,
} from "../types/appTypes";

export const readinessControls = [
  {
    field: "sleepHours",
    label: "Sleep Hours",
    labelZh: "睡眠时长",
    min: 0,
    max: 12,
    step: 0.5,
    unit: "h",
    output: "Changes: recovery capacity",
  },
  {
    field: "soreness",
    label: "Soreness",
    labelZh: "肌肉酸痛",
    min: 1,
    max: 10,
    step: 1,
    unit: "/10",
    output: "Changes: training tolerance",
  },
  {
    field: "motivation",
    label: "Motivation",
    labelZh: "训练动力",
    min: 1,
    max: 10,
    step: 1,
    unit: "/10",
    output: "Changes: readiness score",
  },
  {
    field: "restingHeartRateDelta",
    label: "Resting HR Delta",
    labelZh: "静息心率变化",
    min: -5,
    max: 20,
    step: 1,
    unit: "bpm",
    output: "Changes: recovery watch",
  },
  {
    field: "previousSessionRpe",
    label: "Previous Session RPE",
    labelZh: "上次训练 RPE",
    min: 1,
    max: 10,
    step: 1,
    unit: "/10",
    output: "Changes: fatigue cost",
  },
  {
    field: "previousSessionDurationMinutes",
    label: "Previous Session Duration",
    labelZh: "上次训练时长",
    min: 20,
    max: 120,
    step: 5,
    unit: "min",
    output: "Feeds: previous session load",
  },
] satisfies ReadinessControl[];

export const muscleGroupOptions: MuscleGroup[] = [
  "Chest",
  "Back",
  "Shoulders",
  "Biceps",
  "Triceps",
  "Quads",
  "Hamstrings",
  "Glutes",
  "Calves",
  "Abs",
];

export const savedSessionPageSizeOptions = [5, 10];