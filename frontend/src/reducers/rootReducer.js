import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import userAuthenticate from "./userAuthenticate";

const rootReducer = combineReducers({
    "auth":authReducer,    
    "cookieAuth":userAuthenticate
});

export default rootReducer;