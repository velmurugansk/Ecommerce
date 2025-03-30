import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../api/api'

export const userLogin = createAsyncThunk('auth/login', async (info) => {
    try {
        const response = await api.post('/auth/login', info, { withCredentials: true });        
        return response;
    } catch (error) {        
        return error.response.data;
    }
})

const initialState = {
    errorMessage: '',
    loading: '',
    userdata: '',
    successMessage: '',
    isAuthenticate: false
}

const authSlice = new createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearErrorMessage: (state) => {
            state.errorMessage = '';
        },
        clearSuccessMessage: (state) => {
            state.successMessage = '';
        },
        logoutState: (state) => {
            state.errorMessage = '';
            state.loading = '';
            state.userdata = '';
            state.successMessage = '';
            state.isAuthenticate = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true;
        }).addCase(userLogin.rejected, (state, { payload }) => {            
            state.loading = '';
            state.errorMessage = payload.error;
            state.isAuthenticate = false;
        }).addCase(userLogin.fulfilled, (state, { payload }) => {
            state.loading = '';
            state.successMessage = payload.data.message;
            state.userdata = payload.data.data;
            state.isAuthenticate = true;
        })
    }
})

export const { clearErrorMessage, clearSuccessMessage, logoutState } = authSlice.actions;
export default authSlice.reducer

