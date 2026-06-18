import type { RootState } from "../liftBatteryStore";
import { createSelector } from "@reduxjs/toolkit";

const training = (state: RootState) => state.training;

export const getTrainingData = createSelector(
  [training],
  (training) =>  {
    return {
      trainingSessionDraft: training.trainingSessionDraft,
      status: training.status,
      error: training.error,
    }
  }
)


export const selectTrainingSessions = (state: RootState) => {
  return state.training.trainingSessions;
};
