import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getAPI } from "../../util/utils";
import { useSelector } from "react-redux";

const API = getAPI();

export const itinerariesSlice = createSlice({
  name: "itineraries",
  initialState: [],
  reducers: {
    recieveAllItins: (state, action) => action.payload,
    addItemToItin: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (body) => {
        return { payload: { body } };
      },
    },
    updateItin: (state, { payload }) => {
      state.splice(payload.num, 1);
    },
  },
});

export const fetchItineraries = (currentUserID) => async (dispatch) => {
  try {
    let res = await axios.get(`${API}/itineraries/${currentUserID}`);
    let { payload } = res.data;
    dispatch(recieveAllItins(payload));
  } catch (error) {
    console.log(error.message);
  }
};

//     dispatch(recieveAllItins(itineraries));
//   } catch (error) {
//     console.log(error.message);
//   }
// };

export const selectItins = (state) => state.itineraries;

export const { recieveAllItins } = itinerariesSlice.actions;
export default itinerariesSlice.reducer;
