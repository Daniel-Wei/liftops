import type { RootState } from "../liftBatteryStore";

export const selectProgramSettings = (state: RootState) => {
  return state.programSettings.programSettingDetails;
};
