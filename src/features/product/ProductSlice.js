import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchAllProducts } from "./ProductAPI";

const initialState = {
    products: [],
    status: 'idle'
}

export const fetchAllProductAsync = createAsyncThunk(
    'product/fetchAllProducts',
    async ()=>{
        const response  = await fetchAllProducts();
        return response.products;
    }
)


export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers:{
        incremenet: (state, action)=>{
            state.value +=1;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllProductAsync.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(fetchAllProductAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.products = action.payload;
        })

        
    }

})


export const { incremenet } = productSlice.actions;

export const selectAllProducts = (state)=> state.product.products;

export default productSlice.reducer;