import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import userService from "../services/user.service";


export const getUserCredentials = createAsyncThunk(
    "userCredentials/getCredentials",
    async (thunkAPI) => {
        try {
            const data = await userService.getUserCredentials();
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

const initialState = { userName: "", userEmail: "", userId: "", displayName: "" };

const userCredentialsSlice = createSlice({
  name: "userCredentials",
  initialState,
  extraReducers: {
    [getUserCredentials.fulfilled]: (state, action) => {
      state.userName = action.payload.data.userName;
      state.userEmail = action.payload.data.email;
      state.userId = action.payload.data.userId;
      state.displayName = action.payload.data.displayName;
    },
    [getUserCredentials.rejected]: (state, action) => {
      state.username = "";
      state.userEmail = "";
      state.userId = "";
      state.displayName = "";
    },
  },
});

const { reducer } = userCredentialsSlice;
export default reducer;