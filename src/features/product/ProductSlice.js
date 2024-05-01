import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchAllProductsCount, fetchBrands, fetchCategories, fetchProductById, fetchProductsByFilters } from "./ProductAPI";

const initialState = {
    products: [],
    selectedProduct: null,
    brands: [],
    categories: [],
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

export const fetchProductByIdAsync = createAsyncThunk(
    'product/fetchProductById',
    async (id)=>{
        const response  = await fetchProductById(id);
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

export const fetchBrandsAsync = createAsyncThunk(
    'product/fetchBrands',
    async ()=>{
        const response  = await fetchBrands();
        return response;
    }
)

export const fetchCategoriesAsync = createAsyncThunk(
    'product/fetchCategories',
    async ()=>{
        const response  = await fetchCategories();
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
        .addCase(fetchBrandsAsync.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(fetchBrandsAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.brands = action.payload;
        })
        .addCase(fetchCategoriesAsync.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(fetchCategoriesAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.categories = action.payload;
        })
        .addCase(fetchProductByIdAsync.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(fetchProductByIdAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.selectedProduct = action.payload;
        })

    }

})


export const { incremenet } = productSlice.actions;

export const selectAllProducts = (state)=> state.product.products;
export const selectAllBrands = (state)=> state.product.brands;
export const selectAllCategories = (state)=> state.product.categories;
export const selectAllProductsTotalItems = (state)=> state.product.totalItems;
export const selectProduct = (state)=> state.product.selectedProduct;

export default productSlice.reducer;