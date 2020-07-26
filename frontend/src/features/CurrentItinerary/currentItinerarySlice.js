import { createSlice } from "@reduxjs/toolkit";
export const currentItinerarySlice = createSlice({
    name: "currentItinerary",
    initialState: [],
    reducers: {
       addItemToItin:{
           reducer:(state, action)=>{
              state.push(action.payload)
           },
           prepare: (body) =>{
               return({payload:{body}})
           }
       }
    }
})
export const selectCurrentItin = state => state.currentItinerary

export const {addItemToItin} = currentItinerarySlice.actions
export default currentItinerarySlice.reducer

