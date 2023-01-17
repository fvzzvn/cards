import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import userService from "../services/user.service";

export const addParticipant = createAsyncThunk(
    "participants/addParticipant",
    async ({userId, boardId}, thunkAPI) => {
      try {
        const data = await userService.addParticipant(userId, boardId);
        return{ data };
      } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
        }
    }
  );

const initialState = { lastBoardId: 0 };

const participantsSlice = createSlice({
  name: "participants",
  initialState,
  extraReducers: {
    [addParticipant.fulfilled]: (state, action) => {
      // state.lastBoardId = action.payload.data.boardId;
    },
    [addParticipant.rejected]: (state, action) => {
      // state.lastBoardId = 0;
    },
  },
});

const { reducer } = participantsSlice;
export default reducer;

