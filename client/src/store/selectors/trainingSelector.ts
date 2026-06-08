import type { RootState } from "../liftBatteryStore";

export const getTrainingData = (state: RootState) => {
  return {
    trainingSessions: state.training.trainingSessions
  };
};
