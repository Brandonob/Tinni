import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        currentUserId: ""
    },
    reducers: {
        addUser: (state, action) => {
            state["currentUserId"] = action.payload
        },
        logOutUser: (state) => {
            state["currentUserId"] = ""
        }
    }
})

export const { addUser, logOutUser } = usersSlice.actions;
export default usersSlice.reducer;