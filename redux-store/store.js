import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../src/features/product/ProductSlice'
import authReducer from '../src/features/auth/authSlice'
import cartReducer from '../src/features/cart/CartSlice'
import orderReducer from '../src/features/order/orderSlice'
import userReducers from '../src/features/user/UserSlice'


const store = configureStore({
    reducer: {
        product: productReducer,
        auth: authReducer,
        cart: cartReducer,
        order: orderReducer,
        user: userReducers
    }
})

export default store;
