import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

const user = JSON.parse(localStorage.getItem("user"));


const initialState = { inGame: false }

const gameSlice = createSlice({
    name: "game",
    initialState,
    extraReducers: {

    }
});

const { reducer } = gameSlice;
export default reducer;