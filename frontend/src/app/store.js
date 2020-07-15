import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import searchReducer from "../features/SearchBar/SearchBarSlice";
import logger from "redux-logger";

export default configureStore({
  reducer:{search: searchReducer},
  middleware: [...getDefaultMiddleware(), logger],
});
