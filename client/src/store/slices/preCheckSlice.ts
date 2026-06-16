import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { initialPreCheckDetailsInput } from "../../data/defaultValues";
import type {
  PreCheckLog,
  PreCheckDetailsLog,
} from "../../types/appTypes";
import {
  getPreCheckDraftUpdated,
  getTodayPreCheckLog,
  loadSavedPreCheckLogs,
} from "../../helpers/PreCheckHelpers";
import { getTodayDate } from "../../helpers/GenericHelpers";
import {
  getTodayPreCheck as getTodayPreCheckFromApi,
  savePreCheck as savePreCheckToApi,
  deletePreCheck as deletePreCheckFromApi,
} from "../../api/preCheckApi";
import { fromPreCheckDto, toPreCheckDto } from "../../api/preCheckDtoMapping";

type PreCheckRequestStatus = "idle" | "loading" | "saving" | "success" | "error";

type UpdatePreCheckDetailsPayload = {
  field: keyof PreCheckDetailsLog;
  value: number;
};

type PreCheckState = {
  preCheckDraft: PreCheckDetailsLog;
  preCheckDraftUpdated: boolean;
  savedPreCheckLogs: PreCheckLog[];
  status: PreCheckRequestStatus;
  error: string | null;
};

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Request failed. Please try again.";
}

function upsertPreCheckLog(logs: PreCheckLog[], nextLog: PreCheckLog) {
  const existingLogIndex = logs.findIndex((log) => log.date === nextLog.date);

  if (existingLogIndex === -1) {
    logs.unshift(nextLog);
    return;
  }

  logs[existingLogIndex] = nextLog;
}

// (Return type, Argument type, Thunk api config)
export const fetchTodayPreCheck = createAsyncThunk<
  PreCheckLog | null, 
  void, 
  { rejectValue: string }
>(
  "preCheck/fetchTodayPreCheck", // type prefix: pending, fulfilled, rejected generated
  async (_payload, thunkApi) => {
    try {
      const dto = await getTodayPreCheckFromApi();
      return dto === null ? null : fromPreCheckDto(dto);
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const savePreCheck = createAsyncThunk<
  PreCheckLog,
  void,
  { state: { preCheck: PreCheckState }; rejectValue: string }
>(
  "preCheck/savePreCheck",
  async (_payload, thunkApi) => {
    const state = thunkApi.getState();
    const savedTodayLog = getTodayPreCheckLog(state.preCheck.savedPreCheckLogs);

    try {
      const dto = toPreCheckDto(state.preCheck.preCheckDraft, savedTodayLog);
      const savedDto = await savePreCheckToApi(dto);
      return fromPreCheckDto(savedDto, state.preCheck.preCheckDraft);
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const deletePreCheckLog = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  "preCheck/deletePreCheck",
  async (id, thunkApi) => {
    try {
      await deletePreCheckFromApi(id);
      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  },
);

function getInitialPreCheckState(): PreCheckState {
  const savedPreCheckLogs = [...loadSavedPreCheckLogs()];
  const savedTodayPreCheckLog = getTodayPreCheckLog(savedPreCheckLogs);
  return {
    preCheckDraft: savedTodayPreCheckLog !== undefined ?
      {...savedTodayPreCheckLog.input} : {...initialPreCheckDetailsInput},
    preCheckDraftUpdated: savedTodayPreCheckLog === undefined,
    savedPreCheckLogs: savedPreCheckLogs,
    status: "idle",
    error: null,
  };
}

const preCheckSlice = createSlice({
  name: "preCheck",
  initialState: getInitialPreCheckState(),
  reducers: {
    updatePreCheckDraft: (state, action: PayloadAction<UpdatePreCheckDetailsPayload>) => {
      state.preCheckDraft[action.payload.field] = action.payload.value;
      state.preCheckDraftUpdated = getPreCheckDraftUpdated(
        state.savedPreCheckLogs,
        state.preCheckDraft,
      );
    },

    resetPreCheckDraft: () =>  {
      return getInitialPreCheckState();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodayPreCheck.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTodayPreCheck.fulfilled, (state, action) => {
        state.status = "success";
        state.error = null;

        if (action.payload === null) {
          return;
        }

        upsertPreCheckLog(state.savedPreCheckLogs, action.payload);
        state.preCheckDraft = { ...action.payload.input };
        state.preCheckDraftUpdated = false;
      })
      .addCase(fetchTodayPreCheck.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload ?? action.error.message ?? "Could not load today's pre-check.";
      })
      .addCase(savePreCheck.pending, (state) => {
        state.status = "saving";
        state.error = null;
      })
      .addCase(savePreCheck.fulfilled, (state, action) => {
        state.status = "success";
        state.error = null;
        upsertPreCheckLog(state.savedPreCheckLogs, action.payload);
        state.preCheckDraft = { ...action.payload.input };
        state.preCheckDraftUpdated = false;
      })
      .addCase(savePreCheck.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload ?? action.error.message ?? "Could not save pre-check.";
      })
      .addCase(deletePreCheckLog.pending, (state) => {
        state.status = "saving";
        state.error = null;
      })
      .addCase(deletePreCheckLog.fulfilled, (state, action) => {
        state.status = "success";
        state.error = null;

        const deletedLog = state.savedPreCheckLogs.find((log) => log.id === action.payload);
        state.savedPreCheckLogs = state.savedPreCheckLogs.filter((log) => log.id !== action.payload);

        if (deletedLog?.date === getTodayDate()) {
          state.preCheckDraft = { ...initialPreCheckDetailsInput };
          state.preCheckDraftUpdated = true;
        }
      })
      .addCase(deletePreCheckLog.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload ?? action.error.message ?? "Could not delete pre-check.";
      });
  },
});

export const { 
  updatePreCheckDraft,
  resetPreCheckDraft,
} = preCheckSlice.actions;

export const preCheckSliceReducer = preCheckSlice.reducer;
