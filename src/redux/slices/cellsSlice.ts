import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MoveCell, DeleteCell, InsertCell, UpdateCell } from "../payload-types";
import { Cell } from "../cell";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const generateId = () => {
  return Math.random().toString(36).substr(2, 5);
};

const initialState: CellsState = {
  loading: false,
  error: null,
  order: ["time", "time2"],
  data: {
    time2: {
      id: "time2",
      type: "code",
      content: "this is a code cell",
    },
    time: {
      id: "time",
      type: "text",
      content: "this is a text cell",
    },
  },
};

const fetchCells = createAsyncThunk("cells/fetchCells", async () => {});

const cellsSlice = createSlice({
  name: "cells",
  initialState,
  reducers: {
    moveCell: (state, action: PayloadAction<MoveCell>) => {
      const { id, direction } = action.payload;
      const index = state.order.findIndex((i) => i === id);

      const targetIndex = direction === "up" ? index - 1 : index + 1;

      // invalid moving direction
      if (targetIndex < 0 || targetIndex > state.order.length) {
        return;
      }

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = id;
    },
    deleteCell: (state, action: PayloadAction<DeleteCell>) => {
      const id = action.payload.id;
      state.order = state.order.filter((i) => i !== id);
      delete state.data[id];
    },
    insertCell: (state, action: PayloadAction<InsertCell>) => {
      const { id, type, direction } = action.payload;
      const cell: Cell = {
        id: generateId(),
        content: "",
        type,
      };
      state.data[cell.id] = cell;
      const index = state.order.findIndex((i) => i === id);
      if (direction === "after") {
        state.order.splice(index, 0, cell.id);
      } else {
        state.order.splice(index - 1, 0, cell.id);
      }
    },
    updateCell: (state, action: PayloadAction<UpdateCell>) => {
      const { id, content } = action.payload;
      state.data[id].content = content;
    },
  },
});

export const {
  moveCell,
  deleteCell,
  updateCell,
  insertCell,
} = cellsSlice.actions;

export const cellsReducer = cellsSlice.reducer;
