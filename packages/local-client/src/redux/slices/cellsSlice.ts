import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  MoveCell,
  DeleteCell,
  InsertCell,
  UpdateCellLanguage,
  UpdateCellContent,
} from "../payload-types";
import { Cell } from "../cell";
import { fetchCells, saveCells } from "./cellsThunks";

export interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  saveStatus: string | null;
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
  order: [],
  saveStatus: null,
  data: {},
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
        language: "javascript",
      };
      state.data[cell.id] = cell;
      if (id) {
        const index = state.order.findIndex((i) => i === id);
        state.order.splice(index + 1, 0, cell.id);
      } else {
        state.order.unshift(cell.id);
      }
    },
    updateCellContent: (state, action: PayloadAction<UpdateCellContent>) => {
      const { id, content } = action.payload;
      state.data[id].content = content;
    },
    updateCellLanguage: (state, action: PayloadAction<UpdateCellLanguage>) => {
      const { id, language } = action.payload;
      state.data[id].language = language;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCells.fulfilled, (state, { payload }) => {
      if (payload.length !== 0) {
        state.order = payload.map((cell) => cell.id);
        state.data = payload.reduce((accumulator, cell) => {
          accumulator[cell.id] = cell;
          return accumulator;
        }, {} as CellsState["data"]);
      } else {
        state.data = {
          yruf6: {
            id: "yruf6",
            type: "text",
            content:
              "# Welcome to javascript-notebook \n This is an interactive coding environment for JavaScript and Typescript, similar to Jupyter Notebook. \nThere are two types of cells \n - a text cell, the cell you are reading right now. You can click to edit this cell via markdown syntax, and the content will automatically render to HTML once you click outside the cell. \n - a code cell, where you may input some js or ts code for the browser to execute. \nYou can click on either of the two following buttons to create a cell.",
          },
          rxrdu: {
            id: "rxrdu",
            type: "code",
            language: "javascript",
            content:
              "// The built-in show() helper function can be used to display values in the preview window on the right \n// to execute, click the run button or hit ctrl + enter \nconst msg = { message: 'hello world' } \nshow(msg)",
          },
          uzuft: {
            id: "uzuft",
            type: "text",
            content:
              "You don't need to install third-party libraries locally to use them in this app. It will detect your `import` statement and try to fetch their source code from `unpkg.com`. For example, even if the react library is not installed, the following code will work",
          },
          ccry4: {
            id: "ccry4",
            type: "code",
            language: "javascript",
            content:
              "import React from 'react'; \nimport ReactDOM from 'react-dom'; \nconst App = () => <h1>greetings from React</h1>; \n\n// once react and react-dom is imported, it is recommended to use show() to display React components instead of ReactDOM.render()\nshow(<App />)",
          },
          lzxxx: {
            id: "lzxxx",
            type: "code",
            language: "javascript",
            content:
              "// as another example of fetching third party packages, let's make an API call using axios\nimport axios from 'axios'\nconst fetchPost = async () => {\n   const res = await axios.get('https://jsonplaceholder.typicode.com/posts/1')\n  show(res.data)\n}\nfetchPost()",
          },
          rfg90: {
            id: "rfg90",
            type: "text",
            content:
              "You can also have a mix usage of JavaScript and TypeScript by toggling the language mode on the top left corner.",
          },
          oi781: {
            id: "oi781",
            type: "code",
            language: "typescript",
            content:
              "interface Person {\n   name: string, \n   job: string\n}\nlet ross: Person = {\n   name: 'Ross Geller', \n   job: 'Divorcer'\n}\nshow(ross) ",
          },
          vh233: {
            id: "vh233",
            type: "text",
            content:
              "When you run javascript-notebook from the terminal, a notebook.js file is created under the root directory to save your progress every 1 minute. You can reopen the notebook via `npx javascript-notebook serve notebook.js`",
          },
        };
        state.order = [
          "yruf6",
          "rxrdu",
          "uzuft",
          "ccry4",
          "lzxxx",
          "rfg90",
          "oi781",
          "vh233",
        ];
      }
    });

    builder.addCase(fetchCells.rejected, (state, { payload }) => {
      state.loading = true;
      state.error = payload || "";
    });

    builder.addCase(fetchCells.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(saveCells.fulfilled, (state) => {
      state.saveStatus = "success";
    });

    builder.addCase(saveCells.pending, (state) => {
      state.saveStatus = null;
    });

    builder.addCase(saveCells.rejected, (state, { payload }) => {
      state.saveStatus = payload || "failed to save, please try again";
    });
  },
});

export const {
  moveCell,
  deleteCell,
  updateCellContent,
  updateCellLanguage,
  insertCell,
} = cellsSlice.actions;

export { fetchCells, saveCells };
export const cellsReducer = cellsSlice.reducer;
