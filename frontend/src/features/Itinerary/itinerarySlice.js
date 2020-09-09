<<<<<<< HEAD
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getAPI } from "../../util/utils";
=======
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { getAPI } from '../../util/utils'
import { useSelector } from "react-redux";

>>>>>>> 9cef3f025907410cdc4d615b64fb6100eb16828b

const API = getAPI();

export const itinerariesSlice = createSlice({
<<<<<<< HEAD
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
=======
    name: "itineraries",
    initialState: [],
    reducers: {
        recieveAllItins: (state, action) => action.payload,
        addItemToItin:{
            reducer:(state, action)=>{
               state.push(action.payload)
            },
            prepare: (body) =>{
                return({payload:{body}})
            }
        },
        updateItin:(state,{payload})=>{
            state.splice(payload.num,1)
        }
    }
})

export const fetchItineraries = (currentUserID) => async dispatch => {
    debugger
    try {
        let res = await axios.get(`${API}/itineraries/${currentUserID}`);
        let { payload } = res.data;
        // debugger
        dispatch(recieveAllItins(payload))
    } catch (error) {
        console.log(error.message);
    }
}
>>>>>>> 9cef3f025907410cdc4d615b64fb6100eb16828b

    dispatch(recieveAllItins(itineraries));
  } catch (error) {
    console.log(error.message);
  }
};

export const selectItins = (state) => state.itineraries;

export const { recieveAllItins } = itinerariesSlice.actions;
export default itinerariesSlice.reducer;
