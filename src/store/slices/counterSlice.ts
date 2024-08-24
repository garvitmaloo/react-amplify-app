import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  reducers: {
    increaseByOne: (state) => state + 1,
    decreaseByOne: (state) => state - 1,
  },
  initialState: 0,
});

export default counterSlice;
