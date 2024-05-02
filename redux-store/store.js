import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../src/features/product/ProductSlice'
import authReducer from '../src/features/auth/authSlice'


const store = configureStore({
    reducer: {
        product: productReducer,
        user: authReducer
    }
})

export default store;
