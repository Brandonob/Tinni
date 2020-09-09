import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getAPI } from "../../util/utils";

const API = getAPI();

export const itinerariesSlice = createSlice({
  name: "itineraries",
  initialState: [],
  reducers: {
    recieveAllItins: (state, action) => action.payload,
  },
});

export const fetchAllPosts = () => async (dispatch) => {
  try {
    let res = await axios.get(`${API}/itineraries`);
    const { itineraries } = res.data.body;

    dispatch(recieveAllItins(itineraries));
  } catch (error) {
    console.log(error.message);
  }
};

export const selectItins = (state) => state.itineraries;

export const { recieveAllItins } = itinerariesSlice.actions;
export default itinerariesSlice.reducer;
