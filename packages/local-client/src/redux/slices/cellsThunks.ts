import { createAsyncThunk } from "@reduxjs/toolkit";
import { Cell } from "../cell";
import axios from "axios";
import { RootState } from "../store";

export const fetchCells = createAsyncThunk<
  Cell[],
  undefined,
  { rejectValue: string }
>("cells/fetchCells", async (_, thunkAPI) => {
  try {
    const { data }: { data: Cell[] } = await axios.get("/cells");
    return data;
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
  return [];
});

export const saveCells = createAsyncThunk<
  void,
  undefined,
  { rejectValue: string; state: RootState }
>("cells/saveCells", async (_, { getState, rejectWithValue }) => {
  const { data, order } = getState().cells;
  const cells = order.map((id) => data[id]);
  try {
    await axios.post("/cells", { cells });
  } catch (error) {
    rejectWithValue(error.message);
  }
});
