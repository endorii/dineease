import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    isAuth: false,
    error: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setUser(state, action){
            state.isAuth = true;
            state.user = action.payload;
        },
        logout(state){
            localStorage.removeItem('accessToken');
            state.isAuth = false;
            state.user = {};
        },
        setUserError(state, action){
            state.error = action.payload
        }
    }
})

export const {setUser, logout, setUserError} = userSlice.actions;

export default userSlice.reducer;