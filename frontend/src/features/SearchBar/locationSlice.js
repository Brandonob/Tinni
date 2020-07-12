import { createSlice } from "@reduxjs/toolkit";

export const LocationSlice = createSlice({
  name: "location",
  initialState: "",
  reducers: {
    receiveSearch: (state, action) => {
      action.payload;
    },
  },
});

export const { receiveLocation } = LocationSlice.actions;
export default LocationSlice.reducer;
