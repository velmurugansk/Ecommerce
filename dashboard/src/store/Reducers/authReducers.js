import { createSlice } from "@reduxjs/toolkit";

export const authReducers = createSlice({
    name : 'auth',
    initialState : {
        sucessMessage  : '',
        errorMessage  : '',
        loader : false,
        userInfo : ''
    },
    reducers : {

    },
    extraReducers: () => {

    }
})

export default authReducers.reducer