import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  TrainingSession,
  TrainingSessionDetails,
} from "../../types/appTypes";
import { loadSavedTrainingSessions } from "../../helpers/TrainingPageHelpers";
import { getTrainingSessions } from "../../api/trainingSessionApi";
import { getErrorMessage, RequestStatus } from "./sliceHelpers";
import { fromTrainingDto, toTrainingSessionDto } from "../../api/trainingSessionDtoMapping";
import { initialTrainingSessionDetailsInput } from "../../data/defaultValues";
import { 
  saveTrainingSession as saveTrainingSessionToApi,
  deleteTrainingSession as deleteTrainingSessionFromApi,
} from "../../api/trainingSessionApi";

type UpdateTrainingSessionDetailsPayload = {
  [Field in keyof TrainingSessionDetails] -?: {
    field: Field;
    value: TrainingSessionDetails[Field];
  };
}[keyof TrainingSessionDetails];

function updateDraftField<Field extends keyof TrainingSessionDetails>(
  draft: TrainingSessionDetails,
  field: Field,
  value: TrainingSessionDetails[Field],
) {
  draft[field] = value;
}

type TrainingState = {
  trainingSessionDraft: TrainingSessionDetails;
  trainingSessions: TrainingSession[],
  status: RequestStatus,
  error: string | null,
};

function getInitialTrainingState(): TrainingState {
  const savedTrainingSessions = [...loadSavedTrainingSessions()];
  return {
    trainingSessionDraft: initialTrainingSessionDetailsInput,
    trainingSessions: savedTrainingSessions,
    status: "idle",
    error: null,
  };
}

// (Return type, Argument type, Thunk api config)
export const fetchTrainingSessions = createAsyncThunk<
  TrainingSession[], 
  {from: string, to: string}, 
  { rejectValue: string }
>(
  "training/getTrainingSessions", // type prefix: pending, fulfilled, rejected generated
  async (payload, thunkApi) => {
    try {
      const { from, to } = payload;
      const dto = await getTrainingSessions(from, to);
      return dto.map(fromTrainingDto);
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const saveTrainingSession = createAsyncThunk<
  TrainingSession,
  void,
  { state: { training: TrainingState }; rejectValue: string }
>(
  "training/saveTrainingSession",
  async (_payload, thunkApi) => {
    const state = thunkApi.getState();

    try {
      const dto = toTrainingSessionDto(state.training.trainingSessionDraft);
      const savedDto = await saveTrainingSessionToApi(dto);
      return fromTrainingDto(savedDto);
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const deleteTrainingSession = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  "training/deleteTrainingSession",
  async (id, thunkApi) => {
    try {
      await deleteTrainingSessionFromApi(id);
      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  },
);

const trainingSlice = createSlice({
  name: "training",
  initialState: getInitialTrainingState(),
  reducers: {
    updateTrainingSessionDraft: (
      state,
      action: PayloadAction<UpdateTrainingSessionDetailsPayload>,
    ) => {
      updateDraftField(
        state.trainingSessionDraft,
        action.payload.field,
        action.payload.value,
      );
  },
},
  extraReducers: (builder) => {
      builder
        .addCase(fetchTrainingSessions.pending, (state) => {
          state.status = "loading";
          state.error = null;
        })
        .addCase(fetchTrainingSessions.fulfilled, (state, action) => {
          state.status = "success";
          state.error = null;
  
          state.trainingSessions = action.payload;
        })
        .addCase(fetchTrainingSessions.rejected, (state, action) => {
          state.status = "error";
          state.error = action.payload ?? action.error.message ?? "Could not load training sessions.";
        })
        .addCase(saveTrainingSession.pending, (state) => {
          state.status = "saving";
          state.error = null;
        })
        .addCase(saveTrainingSession.fulfilled, (state, action) => {
          state.status = "success";
          state.error = null;
          state.trainingSessions.push(action.payload);
        })
        .addCase(saveTrainingSession.rejected, (state, action) => {
          state.status = "error";
          state.error = action.payload ?? action.error.message ?? "Could not save training session.";
        })
        .addCase(deleteTrainingSession.pending, (state) => {
          state.status = "saving";
          state.error = null;
        })
        .addCase(deleteTrainingSession.fulfilled, (state, action) => {
          state.status = "success";
          state.error = null;
          state.trainingSessions = state.trainingSessions.filter(ts => ts.id !== action.payload);
        })
        .addCase(deleteTrainingSession.rejected, (state, action) => {
          state.status = "error";
          state.error = action.payload ?? action.error.message ?? "Could not delete training session.";
        });
      }
});

export const {
  updateTrainingSessionDraft,
} = trainingSlice.actions;

export const trainingSliceReducer = trainingSlice.reducer;
