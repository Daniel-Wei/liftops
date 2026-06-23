import {
  isPreCheckInput,
  isProgramSettings,
} from "../types/appTypeChecks";
import {
  initialPreCheckDetailsInput,
  defaultProgramSettings,
} from "../data/defaultValues";
import { 
    PRE_CHECK_DRAFT_STORAGE_KEY,
    PROGRAM_SETTINGS_STORAGE_KEY,
 } from "../data/localStorageKeys";

// #region: helper functions for pre-check
// Loads the current unsaved draft, falling back safely if storage is empty or invalid.
function loadPreCheck() {
  try {
    const savedValue = localStorage.getItem(PRE_CHECK_DRAFT_STORAGE_KEY);

    if (savedValue === null) {
      return initialPreCheckDetailsInput;
    }

    const parsedValue: unknown = JSON.parse(savedValue);

    if (isPreCheckInput(parsedValue)) {
      return parsedValue;
    }

    return initialPreCheckDetailsInput;
  } catch {
    return initialPreCheckDetailsInput;
  }
}


// #endregion

// #region: helper functions for program settings
function loadProgramSettings() {
  try {
    const savedValue = localStorage.getItem(PROGRAM_SETTINGS_STORAGE_KEY);

    if (savedValue === null) {
      return defaultProgramSettings;
    }

    const parsedValue: unknown = JSON.parse(savedValue);

    if (isProgramSettings(parsedValue)) {
      return parsedValue;
    }

    return defaultProgramSettings;
  } catch {
    return defaultProgramSettings;
  }
}
// #endregion
