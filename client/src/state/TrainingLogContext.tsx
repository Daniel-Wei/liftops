import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import { calculateReadiness } from "../domain/readiness";
import type {
  DailyTrainingLog,
  MainDriver,
  ReadinessResult,
  TrainingInput,
  TrainingLogAction,
  TrainingLogState,
} from "../types/appTypes";
import {
  MainDriverId,
  MetricStatus,
  ReadinessStatus,
  TrainingLogActionType,
} from "../types/appTypes";

const TODAY_DRAFT_STORAGE_KEY = "liftops.todayDraft";
const TRAINING_LOGS_STORAGE_KEY = "liftops.trainingLogs";

const initialTrainingInput: TrainingInput = {
  sleepHours: 6.5,
  soreness: 3,
  motivation: 3,
  restingHeartRateDelta: 4,
  previousSessionRpe: 8,
  previousSessionDurationMinutes: 75,
};

const fallbackTrainingLogState: TrainingLogState = {
  todayDraft: initialTrainingInput,
  logs: [],
};

type TrainingLogContextValue = {
  todayDraft: TrainingInput;
  currentReadiness: ReadinessResult;
  logs: DailyTrainingLog[];
  latestLog: DailyTrainingLog | null;
  last7Logs: DailyTrainingLog[];
  updateTodayDraft: (field: keyof TrainingInput, value: number) => void;
  resetTodayDraft: () => void;
  saveTodayLog: () => void;
  deleteLog: (id: string) => void;
};

type TrainingLogProviderProps = {
  children: ReactNode;
};

const TrainingLogContext = createContext<TrainingLogContextValue | null>(null);

// Checks that unknown JSON is an object before we read named fields from it.
function isStringKeyValuePairObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

// Primitive guards keep localStorage validation small and readable.
function isNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isReadinessStatus(value: unknown): value is ReadinessStatus {
  return value === ReadinessStatus.Ready
    || value === ReadinessStatus.Steady
    || value === ReadinessStatus.Caution
    || value === ReadinessStatus.Recovery;
}

function isMetricStatus(value: unknown): value is MetricStatus {
  return value === MetricStatus.Good
    || value === MetricStatus.Watch
    || value === MetricStatus.Risk
    || value === MetricStatus.Neutral;
}

// Verifies that a saved main driver uses one of our known driver ids.
function isMainDriverId(value: unknown): value is MainDriverId {
  return value === MainDriverId.ShortSleep
    || value === MainDriverId.HighSoreness
    || value === MainDriverId.LowMotivation
    || value === MainDriverId.RestingHeartRateAboveBaseline
    || value === MainDriverId.HardPreviousSessionLoad
    || value === MainDriverId.NoMajorIssues;
}

// Validates the editable TodayPage input shape after JSON.parse.
export function isTrainingInput(value: unknown): value is TrainingInput {
  if (!isStringKeyValuePairObjectRecord(value)) {
    return false;
  }

  return (
    isNumber(value.sleepHours)
    && isNumber(value.soreness)
    && isNumber(value.motivation)
    && isNumber(value.restingHeartRateDelta)
    && isNumber(value.previousSessionRpe)
    && isNumber(value.previousSessionDurationMinutes)
  );
}

// Validates one readiness driver stored inside a saved daily log.
function isMainDriver(value: unknown): value is MainDriver {
  if (!isStringKeyValuePairObjectRecord(value)) {
    return false;
  }

  return (
    isMainDriverId(value.id)
    && isString(value.message)
    && isString(value.reason)
  );
}

// Validates the calculated readiness result stored with a saved log.
function isReadinessResult(value: unknown): value is ReadinessResult {
  if (!isStringKeyValuePairObjectRecord(value)) {
    return false;
  }

  return (
    isNumber(value.score)
    && isReadinessStatus(value.status)
    && isString(value.statusLabel)
    && isString(value.statusLabelZh)
    && isMetricStatus(value.badgeStatus)
    && isString(value.recommendation)
    && isString(value.recommendationZh)
    && Array.isArray(value.mainDrivers)
    && value.mainDrivers.every(isMainDriver)
  );
}

// Validates one saved daily log from localStorage.
export function isDailyTrainingLog(value: unknown): value is DailyTrainingLog {
  if (!isStringKeyValuePairObjectRecord(value)) {
    return false;
  }

  return (
    isString(value.id)
    && isString(value.date)
    && isTrainingInput(value.input)
    && isReadinessResult(value.readiness)
    && isString(value.createdAt)
    && isString(value.updatedAt)
  );
}

// Validates the full saved log list from localStorage.
export function isDailyTrainingLogArray(value: unknown): value is DailyTrainingLog[] {
  return Array.isArray(value) && value.every(isDailyTrainingLog);
}

// Loads the current unsaved draft, falling back safely if storage is empty or invalid.
function loadTodayDraft() {
  try {
    const savedValue = localStorage.getItem(TODAY_DRAFT_STORAGE_KEY);

    if (savedValue === null) {
      return initialTrainingInput;
    }

    const parsedValue: unknown = JSON.parse(savedValue);

    if (isTrainingInput(parsedValue)) {
      return parsedValue;
    }

    return initialTrainingInput;
  } catch {
    return initialTrainingInput;
  }
}

// Loads saved history logs, falling back to an empty history if storage is empty or invalid.
function loadTrainingLogs() {
  try {
    const savedValue = localStorage.getItem(TRAINING_LOGS_STORAGE_KEY);

    if (savedValue === null) {
      return [];
    }

    const parsedValue: unknown = JSON.parse(savedValue);

    if (isDailyTrainingLogArray(parsedValue)) {
      return parsedValue;
    }

    return [];
  } catch {
    return [];
  }
}

// Builds the initial reducer state from the two separate localStorage keys.
function loadInitialTrainingLogState(): TrainingLogState {
  return {
    todayDraft: loadTodayDraft(),
    logs: loadTrainingLogs(),
  };
}

// Uses the browser date as the saved daily log date key.
function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

// Keeps latestLog and last7Logs consistent without mutating the original logs array.
function sortLogsNewestFirst(logs: DailyTrainingLog[]) {
  return [...logs].sort((firstLog, secondLog) => (
    secondLog.date.localeCompare(firstLog.date)
    || secondLog.updatedAt.localeCompare(firstLog.updatedAt)
  ));
}

// Central reducer for app-level training draft and saved log history.
function trainingLogReducer(
  state: TrainingLogState,
  action: TrainingLogAction,
): TrainingLogState {
  switch (action.type) {
    case TrainingLogActionType.UpdateTodayDraft:
      return {
        ...state,
        todayDraft: {
          ...state.todayDraft,
          [action.field]: action.value,
        },
      };

    case TrainingLogActionType.ResetTodayDraft:
      return {
        ...state,
        todayDraft: initialTrainingInput,
      };

    case TrainingLogActionType.SaveTodayLog: {
      const now = new Date().toISOString();
      const today = getTodayDate();
      const currentReadiness = calculateReadiness(state.todayDraft);
      const existingLog = state.logs.find((log) => log.date === today);

      if (existingLog) {
        return {
          ...state,
          logs: state.logs.map((log) => {
            if (log.date !== today) {
              return log;
            }

            return {
              ...log,
              input: state.todayDraft,
              readiness: currentReadiness,
              updatedAt: now,
            };
          }),
        };
      }

      const newLog: DailyTrainingLog = {
        id: `log-${today}-${Date.now()}`,
        date: today,
        input: state.todayDraft,
        readiness: currentReadiness,
        createdAt: now,
        updatedAt: now,
      };

      return {
        ...state,
        logs: [newLog, ...state.logs],
      };
    }

    case TrainingLogActionType.DeleteLog:
      return {
        ...state,
        logs: state.logs.filter((log) => log.id !== action.id),
      };
  }
}

// Provides training draft, saved logs, and derived readiness data to dashboard pages.
export function TrainingLogProvider({ children }: TrainingLogProviderProps) {
  const [state, dispatch] = useReducer(
    trainingLogReducer,
    fallbackTrainingLogState,
    loadInitialTrainingLogState,
  );
  const currentReadiness = calculateReadiness(state.todayDraft);
  const sortedLogs = sortLogsNewestFirst(state.logs);
  const latestLog = sortedLogs[0] ?? null;
  const last7Logs = sortedLogs.slice(0, 7);

  useEffect(() => {
    try {
      localStorage.setItem(TODAY_DRAFT_STORAGE_KEY, JSON.stringify(state.todayDraft));
    } catch {
      // Keep the UI usable if browser storage is unavailable.
    }
  }, [state.todayDraft]);

  useEffect(() => {
    try {
      localStorage.setItem(TRAINING_LOGS_STORAGE_KEY, JSON.stringify(state.logs));
    } catch {
      // Keep the UI usable if browser storage is unavailable.
    }
  }, [state.logs]);

  // Updates one numeric field in the current unsaved Today draft.
  function updateTodayDraft(field: keyof TrainingInput, value: number) {
    dispatch({ type: TrainingLogActionType.UpdateTodayDraft, field, value });
  }

  // Restores the Today draft to the default input values.
  function resetTodayDraft() {
    dispatch({ type: TrainingLogActionType.ResetTodayDraft });
  }

  // Saves or updates today's log using the current draft and readiness result.
  function saveTodayLog() {
    dispatch({ type: TrainingLogActionType.SaveTodayLog });
  }

  // Removes one saved log from history by id.
  function deleteLog(id: string) {
    dispatch({ type: TrainingLogActionType.DeleteLog, id });
  }

  const contextValue: TrainingLogContextValue = {
    todayDraft: state.todayDraft,
    currentReadiness,
    logs: state.logs,
    latestLog,
    last7Logs,
    updateTodayDraft,
    resetTodayDraft,
    saveTodayLog,
    deleteLog,
  };

  return (
    <TrainingLogContext.Provider value={contextValue}>
      {children}
    </TrainingLogContext.Provider>
  );
}

// Consumer hook for pages that need training log state.
export function useTrainingLog() {
  const context = useContext(TrainingLogContext);

  if (context === null) {
    throw new Error("useTrainingLog must be used inside TrainingLogProvider.");
  }

  return context;
}
