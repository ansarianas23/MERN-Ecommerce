import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterSlice from "./src/features/product-list/ProductListSlice"

const rootReducers = combineReducers({
    counter : counterSlice,
})

const store = configureStore({
    reducer: rootReducers
})

export default store;
