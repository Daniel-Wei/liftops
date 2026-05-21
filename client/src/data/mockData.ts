import type {
  CheckInItem,
  EvidenceType,
  Metric,
  NavItem,
  RiskWatch,
  SettingsMock,
  TimelinePhase,
  TrainingBlock,
  TrendPoint,
  WorkItem,
} from "../types/appTypes";

export const navItems: NavItem[] = [
  { key: "landing", label: "Home", labelZh: "首页" },
  { key: "dashboard", label: "Dashboard", labelZh: "总览" },
  { key: "planForecast", label: "Plan & Forecast", labelZh: "计划预测" },
  { key: "coreNonCore", label: "Core / Non-Core", labelZh: "核心/非核心" },
  { key: "capacity", label: "Capacity", labelZh: "容量" },
  { key: "efficiency", label: "Efficiency", labelZh: "效率" },
  { key: "dailyCheckIn", label: "Check-in", labelZh: "每日记录" },
  { key: "trends", label: "Trends", labelZh: "趋势" },
  { key: "weeklyReview", label: "Weekly Review", labelZh: "每周复盘" },
  { key: "settings", label: "Settings", labelZh: "设置" },
];

export const trainingBlock: TrainingBlock = {
  name: "Cut Block 03",
  subtitle: "Hypertrophy retention during a controlled cut",
  currentWeek: 9,
  totalWeeks: 16,
  mode: "High Fatigue Training Block",
  trainingMode: "Maintain",
};

export const dashboardMetrics: Metric[] = [
  {
    label: "Core Utilisation",
    labelZh: "核心训练使用率",
    value: "91%",
    trend: "stable",
    status: "good",
    evidenceType: "simpleArithmetic",
    explanation: "Completed priority hard sets compared with planned hard sets.",
    explanationZh: "用已完成重点 hard sets 对比计划 hard sets。",
  },
  {
    label: "Support Load Utilisation",
    labelZh: "支持负荷使用率",
    value: "119%",
    trend: "up",
    status: "watch",
    evidenceType: "simpleArithmetic",
    explanation: "Completed support work compared with planned support work.",
    explanationZh: "用已完成支持性工作对比计划支持性工作。",
  },
  {
    label: "Recovery Capacity Proxy",
    labelZh: "恢复容量 Proxy",
    value: "68",
    trend: "down",
    status: "watch",
    evidenceType: "proxy",
    explanation: "A recovery proxy based on wellness inputs, not a diagnosis.",
    explanationZh: "基于 wellness 输入的恢复 proxy，不是诊断。",
  },
  {
    label: "Training Load",
    labelZh: "训练负荷",
    value: "610 AU",
    trend: "up",
    status: "neutral",
    evidenceType: "established",
    explanation: "Session-RPE load uses session RPE x duration as a practical internal load estimate.",
    explanationZh: "Session-RPE 负荷使用 session RPE x duration 作为实用内部负荷估计。",
  },
  {
    label: "Forecast Risk",
    labelZh: "预测风险",
    value: "Medium",
    trend: "up",
    status: "watch",
    evidenceType: "watch",
    explanation: "A trend-based watch state, not a deterministic prediction.",
    explanationZh: "基于趋势的观察状态，不是确定性预测。",
  },
  {
    label: "Efficiency Proxy",
    labelZh: "效率 Proxy",
    value: "-8%",
    trend: "down",
    status: "watch",
    evidenceType: "heuristic",
    explanation: "Uses stimulus-to-fatigue as an interpretive framework, not exact physiology.",
    explanationZh: "使用 stimulus-to-fatigue 作为解释框架，不是精确生理测量。",
  },
  {
    label: "Productivity Trend",
    labelZh: "生产率趋势",
    value: "Stable",
    trend: "stable",
    status: "good",
    evidenceType: "proxy",
    explanation: "Looks at core work completion, performance trend, and top set quality.",
    explanationZh: "观察核心训练完成度、表现趋势和顶组质量。",
  },
];

export const riskWatches: RiskWatch[] = [
  {
    title: "Deload Watch",
    titleZh: "Deload 观察",
    severity: "medium",
    signals: ["Fatigue up 3 days", "Sleep quality down", "Top set RPE rising"],
    signalsZh: ["疲劳连续 3 天上升", "睡眠质量下降", "顶组 RPE 上升"],
    recommendation: "Review load and recovery before adding extra work.",
    recommendationZh: "在增加额外训练前，先 review 负荷和恢复。",
  },
  {
    title: "Cut Pressure Watch",
    titleZh: "减脂压力观察",
    severity: "medium",
    signals: ["Hunger rising", "Food focus rising", "Cardio above plan"],
    signalsZh: ["饥饿感上升", "食物关注度上升", "有氧超过计划"],
    recommendation: "Treat this as a watch signal and discuss adjustments with a coach if needed.",
    recommendationZh: "把它当作观察信号，如有需要和教练讨论调整。",
  },
  {
    title: "Non-Core Overload",
    titleZh: "非核心负荷过高",
    severity: "low",
    signals: ["Optional accessories above plan", "Cardio above plan"],
    signalsZh: ["可选辅助训练超过计划", "有氧超过计划"],
    recommendation: "Keep support work useful, but avoid crowding recovery.",
    recommendationZh: "保留有用支持训练，但避免挤占恢复。",
  },
];

export const coreWorkItems: WorkItem[] = [
  { name: "Back priority hard sets", nameZh: "背部重点 hard sets", planned: "18 sets", completed: "17 sets", utilisation: "94%", status: "good" },
  { name: "Glutes priority hard sets", nameZh: "臀部重点 hard sets", planned: "16 sets", completed: "15 sets", utilisation: "94%", status: "good" },
  { name: "Delts target volume", nameZh: "三角肌目标训练量", planned: "14 sets", completed: "13 sets", utilisation: "93%", status: "good" },
];

export const supportLoadItems: WorkItem[] = [
  { name: "Cardio", nameZh: "有氧", planned: "180 min", completed: "215 min", utilisation: "119%", status: "watch" },
  { name: "Optional accessories", nameZh: "可选辅助训练", planned: "10 sets", completed: "15 sets", utilisation: "150%", status: "watch" },
  { name: "Mobility", nameZh: "活动度", planned: "4 sessions", completed: "3 sessions", utilisation: "75%", status: "neutral" },
];

export const capacityMetrics: Metric[] = [
  { label: "Fatigue", labelZh: "疲劳", value: "4 / 5", trend: "up", status: "watch", evidenceType: "watch", explanation: "Subjective wellness self-report.", explanationZh: "主观 wellness 自评。" },
  { label: "Sleep Quality", labelZh: "睡眠质量", value: "3 / 5", trend: "down", status: "watch", evidenceType: "watch", explanation: "Subjective sleep quality input.", explanationZh: "主观睡眠质量输入。" },
  { label: "Soreness", labelZh: "酸痛", value: "4 / 5", trend: "up", status: "watch", evidenceType: "watch", explanation: "Subjective soreness input.", explanationZh: "主观酸痛输入。" },
  { label: "Stress", labelZh: "压力", value: "3 / 5", trend: "stable", status: "neutral", evidenceType: "watch", explanation: "Subjective stress input.", explanationZh: "主观压力输入。" },
  { label: "Hunger", labelZh: "饥饿感", value: "4 / 5", trend: "up", status: "watch", evidenceType: "watch", explanation: "Cut pressure signal, not a diagnosis.", explanationZh: "减脂压力信号，不是诊断。" },
  { label: "Capacity Gap", labelZh: "容量差距", value: "-12", trend: "down", status: "watch", evidenceType: "proxy", explanation: "Planned load is above the current recovery proxy.", explanationZh: "计划负荷高于当前恢复 proxy。" },
];

export const efficiencyMetrics: Metric[] = [
  { label: "Efficiency Proxy", labelZh: "效率 Proxy", value: "-8%", trend: "down", status: "watch", evidenceType: "heuristic", explanation: "Useful output relative to fatigue cost, shown as a heuristic trend.", explanationZh: "相对于疲劳成本的有效输出，以启发式趋势展示。" },
  { label: "Productivity Trend", labelZh: "生产率趋势", value: "Stable", trend: "stable", status: "good", evidenceType: "proxy", explanation: "Productive output trend, not direct muscle growth measurement.", explanationZh: "有效产出趋势，不是直接测量肌肉增长。" },
  { label: "Core Output Quality", labelZh: "核心产出质量", value: "82 / 100", trend: "stable", status: "good", evidenceType: "proxy", explanation: "Mock view of performance trend and top set quality.", explanationZh: "表现趋势和顶组质量的 mock 视图。" },
  { label: "Fatigue Cost", labelZh: "疲劳成本", value: "High", trend: "up", status: "watch", evidenceType: "watch", explanation: "Fatigue cost is a watch label, not exact physiology.", explanationZh: "疲劳成本是观察标签，不是精确生理测量。" },
];

export const timelinePhases: TimelinePhase[] = [
  { name: "Base Block", nameZh: "基础阶段", startWeek: 1, endWeek: 4, status: "done" },
  { name: "Progressive Deficit", nameZh: "逐步赤字", startWeek: 5, endWeek: 8, status: "done" },
  { name: "High Compliance", nameZh: "高执行阶段", startWeek: 9, endWeek: 12, status: "active" },
  { name: "Fatigue Watch", nameZh: "疲劳观察", startWeek: 13, endWeek: 15, status: "upcoming" },
  { name: "Peak / Test Week", nameZh: "峰值/测试周", startWeek: 16, endWeek: 16, status: "upcoming" },
  { name: "Recovery", nameZh: "恢复阶段", startWeek: 17, endWeek: 20, status: "upcoming" },
];

export const loadTrend: TrendPoint[] = [
  { label: "Mon", value: 520 },
  { label: "Tue", value: 580 },
  { label: "Wed", value: 610 },
  { label: "Thu", value: 560 },
  { label: "Fri", value: 640 },
  { label: "Sat", value: 590 },
  { label: "Sun", value: 610 },
];

export const recoveryTrend: TrendPoint[] = [
  { label: "Mon", value: 76 },
  { label: "Tue", value: 74 },
  { label: "Wed", value: 70 },
  { label: "Thu", value: 72 },
  { label: "Fri", value: 66 },
  { label: "Sat", value: 68 },
  { label: "Sun", value: 68 },
];

export const bodyweightTrend: TrendPoint[] = [
  { label: "W1", value: 68.8 },
  { label: "W2", value: 68.4 },
  { label: "W3", value: 68.0 },
  { label: "W4", value: 67.7 },
  { label: "W5", value: 67.2 },
  { label: "W6", value: 66.9 },
];

export const nutritionTrend: TrendPoint[] = [
  { label: "Mon", value: 2150 },
  { label: "Tue", value: 2120 },
  { label: "Wed", value: 2100 },
  { label: "Thu", value: 2180 },
  { label: "Fri", value: 2090 },
  { label: "Sat", value: 2140 },
  { label: "Sun", value: 2110 },
];

export const checkInItems: CheckInItem[] = [
  { label: "Fatigue", labelZh: "疲劳", value: 4 },
  { label: "Sleep Quality", labelZh: "睡眠质量", value: 3 },
  { label: "Soreness", labelZh: "酸痛", value: 4 },
  { label: "Stress", labelZh: "压力", value: 3 },
  { label: "Mood", labelZh: "情绪", value: 3 },
  { label: "Hunger", labelZh: "饥饿感", value: 4 },
  { label: "Food Focus", labelZh: "食物关注度", value: 4 },
  { label: "Training Drive", labelZh: "训练动力", value: 3 },
  { label: "Session RPE", labelZh: "训练课 RPE", value: 8 },
  { label: "Top Set RIR", labelZh: "顶组 RIR", value: 1 },
];

export const weeklyReview = {
  summary: "Core work stayed on plan while support load drifted above target.",
  summaryZh: "核心训练基本按计划完成，但支持负荷高于目标。",
  coreUtilisation: "91%",
  supportLoadRatio: "119%",
  capacityChange: "-6 points",
  riskChanges: ["Deload watch moved to medium", "Cut pressure watch stayed medium", "Non-core overload appeared"],
  nextWeek: "Review support load before adding extra cardio or accessories.",
  nextWeekZh: "下周增加额外有氧或辅助训练前，先 review 支持负荷。",
};

export const settingsMock: SettingsMock = {
  modePreset: "High Fatigue Training Block",
  cycleLength: "16 weeks",
  trainingGoal: "Hypertrophy retention during cut",
  targetMuscles: ["Back", "Glutes", "Delts"],
  units: "Metric",
};

export const evidenceLabels: { type: EvidenceType; label: string }[] = [
  { type: "established", label: "Established" },
  { type: "simpleArithmetic", label: "Simple arithmetic" },
  { type: "heuristic", label: "Heuristic" },
  { type: "proxy", label: "Proxy" },
  { type: "watch", label: "Watch" },
];
