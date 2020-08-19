import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { getAPI } from '../../util/utils'
import { useSelector } from "react-redux";
import { userID } from '../Users/usersSlice'

const API = getAPI();

export const itinerariesSlice = createSlice({
    name: "itineraries",
    initialState: [],
    reducers: {
        recieveAllItins: (state, action) => action.payload
    }
})

export const fetchItineraries = () => async dispatch => {
    const currentUserID = useSelector(userID)
    try {
        let res = await axios.get(`${API}/itineraries/${currentUserID}`);
        let { body } = res.data;
        // debugger
        dispatch(recieveAllItins(body))
    } catch (error) {
        console.log(error.message);
    }
}

export const selectItins = state => state.itineraries

export const { recieveAllItins } = itinerariesSlice.actions;
export default itinerariesSlice.reducer;