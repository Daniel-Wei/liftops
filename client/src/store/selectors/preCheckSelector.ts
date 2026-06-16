import type { RootState } from "../liftBatteryStore";
import { calculateReadiness } from "../../domain/readiness";
import { sortPreCheckLogsNewestFirst } from "../../helpers/PreCheckHelpers";
import { createSelector } from "@reduxjs/toolkit";

const preCheck = (state: RootState) => state.preCheck;

export const getPreCheckData = createSelector(
  [preCheck],
  (preCheck) =>  {
    return {
      preCheckDraft: preCheck.preCheckDraft,
      preCheckDraftUpdated: preCheck.preCheckDraftUpdated,
      savedPreCheckLogs: preCheck.savedPreCheckLogs,
      latest7Logs: sortPreCheckLogsNewestFirst(preCheck.savedPreCheckLogs).slice(0, 7),
      status: preCheck.status,
      error: preCheck.error,
    }
  }
)

const selectPreCheckDraft = (state: RootState) => state.preCheck.preCheckDraft;

export const selectCurrentReadiness = createSelector(
  [selectPreCheckDraft],
  (preCheckDraft) => calculateReadiness(preCheckDraft),
);
