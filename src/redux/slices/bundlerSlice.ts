import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cell } from "../cell";
import { BundlerStart, BundlerComplete } from "../payload-types";

interface BundlerState {
  [key: string]: {
    loading: boolean;
    code: string;
    error: string;
  };
}

const initialState: BundlerState = {};

const cellsSlice = createSlice({
  name: "bundler",
  initialState,
  reducers: {
    bundleStart: (state, action: PayloadAction<BundlerStart>) => {
      const id = action.payload.id;
      state[id].loading = true;
      state[id].error = "";
    },
    bundlerComplete: (state, action: PayloadAction<BundlerComplete>) => {
      const {
        id,
        output: { code, error },
      } = action.payload;
      state[id] = {
        loading: false,
        code,
        error,
      };
    },
  },
});

export default cellsSlice.reducer;
