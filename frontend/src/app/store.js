import usersReducer from "../features/Users/usersSlice";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import searchReducer from "../features/SearchBar/SearchBarSlice";
import itinerariesReducer from "../features/Itinerary/itinerarySlice";
import businessReducer from "../features/BusinessInfo/BusinessInfoSlice"
import currentItineraryReducer from "../features/CurrentItinerary/currentItinerarySlice"
import modalReducer from "../features/Modal/ModalSlice"
import logger from "redux-logger";

export default configureStore({
  reducer: {
    search: searchReducer, 
    modal: modalReducer,
    business: businessReducer,
    users: usersReducer,
    itineraries: itinerariesReducer,
    currentItinerary: currentItineraryReducer
  },
  middleware: [...getDefaultMiddleware(), logger],
});
