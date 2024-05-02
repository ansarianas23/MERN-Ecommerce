import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUser, loginUser } from "./authAPI";

const initialState = {
    loggedInUser: null,
    status: 'idle',
    error: null
}

export const createUserAsync = createAsyncThunk(
    'user/createUser',
    async (userData)=>{
        const response  = await createUser(userData);
        return response;
    }
)

export const loginUserAsync = createAsyncThunk(
    'user/loginUser',
    async (loginInfo)=>{
        const response  = await loginUser(loginInfo);
        return response;
    }
)


export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(createUserAsync.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(createUserAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.loggedInUser = action.payload;
        })
        .addCase(loginUserAsync.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(loginUserAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.loggedInUser = action.payload;
        })
        .addCase(loginUserAsync.rejected, (state, action)=>{
            state.status = 'idle'
            state.error = action.error;
        })

    }

})


export const { incremenet } = authSlice.actions;

export const selectLoggedInUser = (state)=>state.user.loggedInUser;
export const selectError = (state)=>state.user.error;

export default authSlice.reducer;