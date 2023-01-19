import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import userService from "../services/user.service";
// import addParticipant from "./participants.js";

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

export const createBoard = createAsyncThunk(
  "boards/createBoard",
  async ({boardName, boardType, boardMode, boardPublic}, thunkAPI) => {
    try {
      const data = await userService.createBoard(boardName, boardType, boardMode, boardPublic);
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

export const dontGo = createAsyncThunk(
  "boards/dontGo",
  async (thunkAPI) => {
    return true;
  }
);

export const clearBoards = createAsyncThunk(
  "boards/clearBoards",
  async (thunkAPI) => {
    return true;
  }
);

const initialState = { boardsLoaded: false, boards : [], createdBoardId: 0, createdBoardMode: 0, nowGo: 0 };

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  extraReducers: {
    [getBoards.fulfilled]: (state, action) => {
      state.boardsLoaded = true;
      state.boards = action.payload.data;
    },
    [getBoards.rejected]: (state, action) => {
      state.boardsLoaded = false;
    },
    [createBoard.fulfilled]: (state, action) => {
      state.createdBoardId = action.payload.data.id;
      state.createdBoardMode = action.payload.data.boardMode;
      state.nowGo = 1;
    },
    [createBoard.rejected]: (state, action) => {
      state.createdBoardId = 0;
      state.createdBoardMode = 0;
      state.nowGo = 0;
    },
    [dontGo.fulfilled]: (state, action) => {
      state.nowGo = 0;
    },
    [clearBoards.fulfilled]: (state, action) => {
      state.boards = [];
    }
  },
});

const { reducer } = boardsSlice;
export default reducer;