import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import boardsReducer from "./slices/boards";
import gameReducer from "./slices/game";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  boards: boardsReducer,
  game: gameReducer,
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;