import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const adminlogin = createAsyncThunk('auth/adminlogin', async(info) => {
    try{
        const {data} = await api.post('/adminlogin', info, {withCredentials:true,"Access-Control-Allow-Origin" : "*"});
        console.log(data)
    } catch(error) {
        console.log(error)
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