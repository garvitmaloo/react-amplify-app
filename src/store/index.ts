import { configureStore } from "@reduxjs/toolkit";

import counterSlice from "./slices/counterSlice";
import authSlice from "./slices/authSlice";

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
