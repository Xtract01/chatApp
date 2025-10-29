import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlics";
import messageReducer from "./messageSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
  },
});
export default store;
