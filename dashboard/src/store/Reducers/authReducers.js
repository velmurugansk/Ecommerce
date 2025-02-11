import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
// import axios from "axios";
export const adminlogin = createAsyncThunk('auth/adminlogin', async(info, {rejectWithValue, fulfillWithValue}) => {
    try{
        const data = await api.post('/adminlogin', info, {withCredentials:true});          
        localStorage.setItem('accessToken', data.data.token) 
        return fulfillWithValue(data);
    } catch(error) {
        // console.log(error.response)        
        return rejectWithValue(error.response.data);
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
        messageClear: (state) => {
            state.errorMessage='';
            // state.sucessMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(adminlogin.pending, (state) => {
            state.loader = true;
        })
        .addCase(adminlogin.rejected, (state,  {payload} ) => {   
            console.log(payload)                                 
            state.loader = false;
            state.errorMessage = payload.error;
        })
        .addCase(adminlogin.fulfilled, (state,  {payload} ) => {                                    
            state.loader = false;
            state.sucessMessage = payload.data.message;
        })
    }
})

export const {messageClear} = authReducers.actions
export default authReducers.reducer