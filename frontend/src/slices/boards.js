import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import userService from "../services/user.service";


export const getBoards = createAsyncThunk(
    "boards/getBoards",
    async (thunkAPI) => {
        try {
            const data = await userService.getBoards();
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

const initialState = { boardsLoaded: false, boards : [], mmrs : [], participants: [] };

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  extraReducers: {
    [getBoards.fulfilled]: (state, action) => {
      state.boardsLoaded = true;
      state.boards = action.payload.data.boards;
      state.mmrs = action.payload.data.mmrs;
      state.participants = action.payload.data.participants;
    },
    [getBoards.rejected]: (state, action) => {
      state.boardsLoaded = false;
    },
  },
});

const { reducer } = boardsSlice;
export default reducer;