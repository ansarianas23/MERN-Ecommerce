import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const initialState = {
    value: 0,
    status: 'idle'
}

export const incremenetAsyncThunk = createAsyncThunk(
    'counter/fetchCount',
    async (amount)=>{
        const response  = await fetchCount(amount);
        return response;
    }
)


export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers:{
    },
    extraReducers:(builder)=>{
        builder
        .addCase(incremenetAsyncThunk.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(incremenetAsyncThunk.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.userOrders = action.payload;
        })
    }

})


export const { incremenet } = counterSlice.actions;

export default counterSlice.reducer;