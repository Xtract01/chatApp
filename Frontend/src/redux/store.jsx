import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlics";
import messageReducer from "./messageSlice";
import socketReducer from "./socketSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
    socket: socketReducer,
  },
});
export default store;
