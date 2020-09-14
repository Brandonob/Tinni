import { createSlice } from "@reduxjs/toolkit";

export const currentItinInfoSlice = createSlice({
  name: "CurrentItinInfo",
  initialState: {
    id: null,
    Title: "My Itinerary",
    Date: "",
    Time: "12:00 ",
  },
  reducers: {
    // addItemToItin: {
    //   reducer: (state, action) => {
    //     state.push(action.payload);
    //     return handleTime(state);
    //   },
    //   prepare: (body) => {
    //     return { payload: { body } };
    //   },
    // },
    updateTitle: (state, action) => {
      state.title = action.payload;
      return state;
    },
    updateDate: (state, action) => {
      state.date = action.payload;
      return state;
    },
    updateTime: (state, action) => {
      state.title = action.payload;
      return state;
    },
  },
});

export const selectCurrentItinInfo = (state) => state.currentItinInfoSlice;
export const {
  updateTime,
  updateTitle,
  updateDate,
  createID,
} = currentItinInfoSlice.actions;
export default currentItinInfoSlice.reducer;
