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
    time: {
      id: "time",
      type: "text",
      content:
        "# welcome to js-notebook \n There is a additional helper function `show()` to make it easier to display values in the preview window. `show()` can be called to display primitive values (`show('hello')`) and objects (`show({ language: 'javascript' })`). If you want to use `show()` multiple times in one code cell, you need to specify the second argument to be `true`. <br/> You can also use it with jsx elements or general React components, but `react` and `react-dom` must be imported first ",
    },
    time2: {
      id: "time2",
      type: "code",
      content:
        "// use the show() helper to render a React component \n import React from 'react' \n import ReactDOM from 'react-dom' \n\n const App = () => <h1>hello world</h1> \n show(<App />)",
    },
  },
};

const cellsSlice = createSlice({
  name: "cells",
  initialState,
  reducers: {
    moveCell: (state, action: PayloadAction<MoveCell>) => {
      const { id, direction } = action.payload;
      const index = state.order.findIndex((i) => i === id);

      const targetIndex = direction === "up" ? index - 1 : index + 1;
      // invalid moving direction
      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
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
      const { id, type } = action.payload;
      const cell: Cell = {
        id: generateId(),
        content: "",
        type,
      };
      state.data[cell.id] = cell;
      if (id) {
        const index = state.order.findIndex((i) => i === id);
        state.order.splice(index + 1, 0, cell.id);
      } else {
        state.order.unshift(cell.id);
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
