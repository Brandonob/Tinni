import { configureStore } from "@reduxjs/toolkit";
// import searchReducer from "../features/SearchBar/SearchBarSlice";
import usersReducer from "../features/Users/usersSlice"
import itinerariesReducer from "../features/Itinerary/itinerarySlice"

// const reducer = {
//   search: searchReducer,
// };

export default configureStore({
  reducer: {
    users: usersReducer,
    itineraries: itinerariesReducer,
  },
});
