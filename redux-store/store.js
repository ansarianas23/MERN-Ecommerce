import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../src/features/product/ProductSlice'
import authReducer from '../src/features/auth/authSlice'
import cartReducer from '../src/features/cart/CartSlice'
import orderReducer from '../src/features/order/orderSlice'


const store = configureStore({
    reducer: {
        product: productReducer,
        user: authReducer,
        cart: cartReducer,
        order: orderReducer
    }
})

export default store;
