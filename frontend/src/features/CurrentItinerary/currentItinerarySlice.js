import { createSlice } from "@reduxjs/toolkit";
export const currentItinerarySlice = createSlice({
  name: "currentItinerary",
  initialState: [],
  reducers: {
    addItemToItin: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (body) => {
        return { payload: { body } };
      },
    },
    updateItin: (state, action) => {
      state.splice(action.payload, 1);
    },
    reorder: (state, action) => {
      //   const result = Array.from(state);
      const [removed] = state.splice(action.payload.startIndex, 1);
      state.splice(action.payload.endIndex, 0, removed);

      return state;
    },
    updateTime: (state, action) => {
      debugger;
      state[action.payload.index].body.time.endTime = action.payload.timeEnd;
      return state;
    },
  },
});

export const selectCurrentItin = (state) => state.currentItinerary;
export const {
  addItemToItin,
  updateItin,
  reorder,
  updateTime,
} = currentItinerarySlice.actions;
export default currentItinerarySlice.reducer;
