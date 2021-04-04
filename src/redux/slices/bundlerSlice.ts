import { createSlice } from "@reduxjs/toolkit";

interface SliceState {}

const initialState: SliceState = {};

const cellsSlice = createSlice({
  name: "bundler",
  initialState,
  reducers: {},
});

export default cellsSlice.reducer;
