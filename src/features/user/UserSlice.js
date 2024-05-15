import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchLoggedinUser, fetchLoggedinUserOrders, updateUser } from "./UserAPI";

const initialState = {
    userOrders: [],
    userInfo: null,
    status: 'idle'
}

export const fetchLoggedinUserOrdersAsync = createAsyncThunk(
    'user/fetchLoggedinUser',
    async ()=>{
        const response  = await fetchLoggedinUserOrders();
        return response;
    }
)

export const fetchLoggedinUserAsync = createAsyncThunk(
    'auth/fetchLoggedinUser',
    async ()=>{
        const response  = await fetchLoggedinUser();
        return response;
    }
)
export const updateUserAsync = createAsyncThunk(
    'auth/updateUser',
    async (update)=>{
        const response  = await updateUser(update);
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
        .addCase(fetchLoggedinUserOrdersAsync.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(fetchLoggedinUserOrdersAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.userOrders = action.payload;
        })
        .addCase(updateUserAsync.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(updateUserAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.userInfo = action.payload;
        })
        .addCase(fetchLoggedinUserAsync.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(fetchLoggedinUserAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.userInfo = action.payload;
        })
    }
})


export const { incremenet } = userSlice.actions;

export const selectUserOrders = (state)=>state.user.userOrders;
export const selectUserInfo = (state)=>state.user.userInfo;

export default userSlice.reducer;