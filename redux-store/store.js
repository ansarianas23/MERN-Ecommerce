import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { counterSlice } from "../src/features/product/ProductSlice";
import productReducer from '../src/features/product/ProductSlice'


const store = configureStore({
    reducer: {
        product: productReducer
    }
})

export default store;
