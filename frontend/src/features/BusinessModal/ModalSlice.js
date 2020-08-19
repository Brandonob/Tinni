import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: false,
  reducers: {
    updateModal: (state, action) => action.payload,
  },
});

export const { updateModal } = modalSlice.actions;
export const modalState = (state) => state.modal;
export default modalSlice.reducer;
