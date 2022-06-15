import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import boardsReducer from "./slices/boards";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  boards: boardsReducer, 
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;