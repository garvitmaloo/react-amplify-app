import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";

import { AuthInitialState } from "../../types";

const initialState: AuthInitialState = {
  isSignedIn: false,
  userEmail: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsSignedIn: (state, action: PayloadAction<boolean>) => ({
      isSignedIn: action.payload,
      userEmail: state.userEmail,
    }),
    setUserEmail: (state, action: PayloadAction<string | null>) => ({
      isSignedIn: state.isSignedIn,
      userEmail: action.payload,
    }),
  },
});

export default authSlice;
