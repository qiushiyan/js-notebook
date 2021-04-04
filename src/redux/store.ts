import { configureStore } from "@reduxjs/toolkit";
import { cellsReducer } from "./slices/cellsSlice";
import bundlerReducer from "./slices/bundlerSlice";

export const store = configureStore({
  reducer: {
    cells: cellsReducer,
    bundler: bundlerReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
