import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const initialState = {
    value: 0,
    status: 'idle'
}

export const incremenetAsyncThunk = createAsyncThunk(
    'counter/fetchCount',
    async (amount)=>{
        const response  = await fetchCount(amount);
        return response.data;
    }
)


export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers:{
        incremenet: (state, action)=>{
            state.value +=1;
        }
    }

})


export const { incremenet } = counterSlice.actions;

export default counterSlice.reducer;