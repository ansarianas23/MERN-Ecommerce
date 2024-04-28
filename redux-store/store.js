import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../src/features/product-list/ProductSlice";

const rootReducers = combineReducers({
    counter : counterSlice,
})

const store = configureStore({
    reducer: rootReducers
})

export default store;
