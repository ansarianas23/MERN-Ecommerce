import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchAllProductsCount, fetchProductsByFilters } from "./ProductAPI";

const initialState = {
    products: [],
    status: 'idle',
    totalItems: 0
}

export const fetchAllProductCountAsync = createAsyncThunk(
    'product/fetchAllProductsCount',
    async ()=>{
        const response  = await fetchAllProductsCount();
        return response;
    }
)

export const fetchProductsByFiltersAsync = createAsyncThunk(
    'product/fetchProductsByFilters',
    async ({filter, sort, pagination})=>{
        // console.log('from slice', sort);
        const response  = await fetchProductsByFilters(filter, sort, pagination);
        return response;
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
        .addCase(fetchAllProductCountAsync.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(fetchAllProductCountAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.totalItems = action.payload;
        })
        .addCase(fetchProductsByFiltersAsync.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.products = action.payload;
        })

        
    }

})


export const { incremenet } = productSlice.actions;

export const selectAllProducts = (state)=> state.product.products;
export const selectAllProductsTotalItems = (state)=> state.product.totalItems;

export default productSlice.reducer;