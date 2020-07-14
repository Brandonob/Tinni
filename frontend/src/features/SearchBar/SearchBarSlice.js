import { createSlice } from "@reduxjs/toolkit";

export const SearchBarSlice = createSlice({
  name: "search",
  initialState: [],
  reducers: {
    receiveSearch: (state, action) => {
      return action.payload;
    },
  },
});

export const { receiveSearch } = SearchBarSlice.actions;
export const searchResults = (state) => state.search;
export default SearchBarSlice.reducer;
