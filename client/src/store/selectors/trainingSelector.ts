import type { RootState } from "../liftBatteryStore";
import { createSelector } from "@reduxjs/toolkit";
import { flattenTrainingDays } from "../../api/trainingSessionDtoMapping";

const training = (state: RootState) => state.training;

export const getTrainingData = createSelector([training], (state) => ({
  trainingSessionDraft: state.trainingSessionDraft,
  status: state.status,
  error: state.error,
  pendingMessage: state.pendingMessage,
  successMessage: state.successMessage,
  operationErrorMessage: state.operationErrorMessage,
}));

export const selectTrainingDays = (state: RootState) => state.training.trainingDays;

export const selectTrainingSessions = createSelector(
  [selectTrainingDays],
  flattenTrainingDays,
);
