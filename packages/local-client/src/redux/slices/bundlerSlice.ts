import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import esBundle from "../../bundler";
import { BundlerOutput, BundlerInput } from "../payload-types";

interface BundlerState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        error: string;
      }
    | undefined;
}

interface RejectValue {
  id: string;
  error: string;
}

const initialState: BundlerState = {};

export const createBundle = createAsyncThunk<
  BundlerOutput,
  BundlerInput,
  { rejectValue: RejectValue }
>("bundler/create", async (payload, thunkAPI) => {
  const { id, input, hasTypescript } = payload;
  const { code, error } = await esBundle(input, hasTypescript);
  if (code === "" && error !== "") {
    thunkAPI.rejectWithValue({ id, error });
  } else if (code !== "" && !error) {
    return { code, error };
  }
  return { code, error };
});

const bundlerSlice = createSlice({
  name: "bundler",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createBundle.pending, (state, { meta }) => {
      const id = meta.arg.id;
      state[id] = {
        loading: true,
        code: "",
        error: "",
      };
    });

    builder.addCase(createBundle.fulfilled, (state, { payload, meta }) => {
      const { code } = payload;
      const id = meta.arg.id;
      state[id] = {
        loading: false,
        code,
        error: "",
      };
    });

    builder.addCase(createBundle.rejected, (state, { payload }) => {
      if (payload) {
        const { id, error } = payload;
        state[id] = {
          loading: false,
          error,
          code: "",
        };
      }
    });
  },
});

export default bundlerSlice.reducer;
