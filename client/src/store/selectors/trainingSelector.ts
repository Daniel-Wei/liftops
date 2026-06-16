import type { RootState } from "../liftBatteryStore";

export const selectTrainingSessions = (state: RootState) => {
  return state.training.trainingSessions;
};
