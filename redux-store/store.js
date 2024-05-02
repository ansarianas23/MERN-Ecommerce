import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../src/features/product/ProductSlice'
import authReducer from '../src/features/auth/authSlice'
import cartReducer from '../src/features/cart/CartSlice'


const store = configureStore({
    reducer: {
        product: productReducer,
        user: authReducer,
        cart: cartReducer
    }
})

export default store;
