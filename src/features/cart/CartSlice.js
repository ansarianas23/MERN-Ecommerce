import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addToCart, deleteItemFromCart, fetchItemsByUserId, resetCart, updateCart } from "./CartAPI";


const initialState = {
    cartItems: [],
    status: 'idle'
}

export const addToCartAsync = createAsyncThunk(
    'cart/addToCart',
    async (Item)=>{
        const response  = await addToCart(Item);
        return response;
    }
)


export const fetchItemsByUserIdAsync = createAsyncThunk(
    'cart/fetchItemsByUserId',
    async (userId)=>{
        const response  = await fetchItemsByUserId(userId);
        return response;
    }
)

export const updateCartAsync = createAsyncThunk(
    'cart/updateCart',
    async (update)=>{
        const response  = await updateCart(update);
        return response;
    }
)


export const deleteItemFromCartAsync = createAsyncThunk(
    'cart/deleteItemFromCart',
    async (itemId)=>{
        const response  = await deleteItemFromCart(itemId);
        return response;
    }
)

export const resetCartAsync = createAsyncThunk(
    'cart/resetCart',
    async (userId)=>{
        const response  = await resetCart(userId);
        return response;
    }
)


export const counterSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addToCartAsync.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(addToCartAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.cartItems.push(action.payload);
        })  
        .addCase(fetchItemsByUserIdAsync.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.cartItems = action.payload;
        })  
        .addCase(updateCartAsync.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(updateCartAsync.fulfilled, (state, action)=>{
            state.status = 'idle';
            const index =  state.cartItems.findIndex(item=>item.id===action.payload.id)
            state.cartItems[index] = action.payload;
        })  
        .addCase(deleteItemFromCartAsync.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(deleteItemFromCartAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            const index = state.cartItems?.findIndex(Item=> Item.id === action.payload.id);
            state.cartItems.splice(index, 1);
        })  
        .addCase(resetCartAsync.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(resetCartAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.cartItems = []
        })  
    }

})


export const { incremenet } = counterSlice.actions;

export const selectedCartItems = (state) => state.cart.cartItems;
export const selectCartStatus = (state) => state.cart.status;

export default counterSlice.reducer;