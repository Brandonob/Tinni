import { createSlice } from "@reduxjs/toolkit";

export const bussinesSlice = createSlice({
  name: "bussines",
  initialState: [],
  reducers: {
    setBussines: (state, action) => {
      return action.payload;
    },
  },
});

export const bussinesState = (state) => state.bussines;
export const { setBussines } = bussinesSlice.actions;
export default bussinesSlice.reducer;
