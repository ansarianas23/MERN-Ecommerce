import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { counterSlice } from "../src/features/product/ProductSlice";
import productReducer from '../src/features/product/ProductSlice'
import authReducer from '../src/features/auth/authSlice'


const store = configureStore({
    reducer: {
        product: productReducer,
        user: authReducer
    }
})

export default store;
