import usersReducer from "../features/Users/usersSlice";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import searchReducer from "../features/SearchBar/SearchBarSlice";
import itinerariesReducer from "../features/Itinerary/itinerarySlice";
import logger from "redux-logger";

export default configureStore({
  reducer: {
    search: searchReducer,
    users: usersReducer,
    itineraries: itinerariesReducer,
  },
  middleware: [...getDefaultMiddleware(), logger],
});
