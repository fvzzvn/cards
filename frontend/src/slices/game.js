import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

const user = JSON.parse(localStorage.getItem("user"));


const initialState = { inGame: false, currentBoardId: 0, mainPlayerId: 0, mainPlayerName: "", leftPlayerId: 0, leftPlayerName: "", topPlayerId: 0, topPlayerName: "", rightPlayerId: 0, rightPlayerName: "",}

export const setLeftPlayer = createAsyncThunk(
    "game/setLeftPlayer",
    async ([id, name]) => {
        const data = {id: id, name: name};
      return { data };
    }
  );

  export const setRightPlayer = createAsyncThunk(
    "game/setRightPlayer",
    async ([id, name]) => {
        const data = {id: id, name: name};
      return { data };
    }
  );
  
  export const setTopPlayer = createAsyncThunk(
    "game/setTopPlayer",
    async ([id, name]) => {
        const data = {id: id, name: name};
      return { data };
    }
  );

  export const setMainPlayer = createAsyncThunk(
    "game/setMainPlayer",
    async ([id, name]) => {
        const data = {id: id, name: name};
      return { data };
    }
  );

const gameSlice = createSlice({
    name: "game",
    initialState,
    extraReducers: {
        [setLeftPlayer.fulfilled]: (state, action) => {
            console.log(action);
            state.leftPlayerId = action.payload.data.id;
            state.leftPlayerName = action.payload.data.name;
        },
        [setRightPlayer.fulfilled]: (state, action) => {
            state.rightPlayerId = action.payload.data.id;
            state.rightPlayerName = action.payload.data.name;
        },
        [setTopPlayer.fulfilled]: (state, action) => {
            state.topPlayerId = action.payload.data.id;
            state.topPlayerName = action.payload.data.name;
        },
        [setMainPlayer.fulfilled]: (state, action) => {
            state.mainPlayerId = action.payload.data.id;
            state.mainPlayerName = action.payload.data.name;
        },

    }
});

const { reducer } = gameSlice;
export default reducer;