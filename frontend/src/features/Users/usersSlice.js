import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        currentUserId: "",
        userInfo: ""
    },
    reducers: {
        addUser: (state, action) => {
            state["currentUserId"] = action.payload
        },
        logOutUser: (state) => {
            state["currentUserId"] = ""
            state["userInfo"] = ""
        },
        addInfo: (state, action) => {
            state["userInfo"] = action.payload
        }
    }
})

export const selectInfo = state => state.users.userInfo;
export const selectUserID = state => state.users.currentUserId;


export const { addUser, logOutUser, addInfo } = usersSlice.actions;
export default usersSlice.reducer;