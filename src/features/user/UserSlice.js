import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchLoggedinUserOrder } from "./UserAPI";

const initialState = {
    userOrders: [],
    status: 'idle'
}

export const fetchLoggedinUserOrderAsync = createAsyncThunk(
    'user/fetchLoggedinUser',
    async (id)=>{
        const response  = await fetchLoggedinUserOrder(id);
        return response;
    }
)


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchLoggedinUserOrderAsync.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(fetchLoggedinUserOrderAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.userOrders = action.payload;
        })
    }
})


export const { incremenet } = userSlice.actions;

export const selectUserOrders = (state)=>state.user.userOrders;

export default userSlice.reducer;