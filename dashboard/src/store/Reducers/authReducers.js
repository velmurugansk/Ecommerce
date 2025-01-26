import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const adminlogin = createAsyncThunk('auth/adminlogin', async(info) => {
    console.log(info)
    try{
        // const {data} = await api.post('/adminlogin', info, {withCredentials:true});
    } catch(error) {

    }
})

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