import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUser, loginUser } from "./authAPI";
import { updateUser } from "../user/UserAPI";

const initialState = {
    loggedInUser: null,     // this should only contain user identity like "id", "role"
    status: 'idle',
    error: null
}

export const createUserAsync = createAsyncThunk(
    'auth/createUser',
    async (userData)=>{
        const response  = await createUser(userData);
        return response;
    }
)

export const loginUserAsync = createAsyncThunk(
    'auth/loginUser',
    async (loginInfo, {rejectWithValue})=>{
        try {
            const response  = await loginUser(loginInfo);
            return response;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const signOutUserAsync = createAsyncThunk(
    'auth/signOut',
    async ()=>{
        const response  = await signOut();
        return response;
    }
)

export const authSlice = createSlice({
    name: 'auth',
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
            state.error = action.payload;
        })
        .addCase(signOutUserAsync.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(signOutUserAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.loggedInUser = null;
        })
    }

})


export const { incremenet } = authSlice.actions;

export const selectLoggedInUser = (state)=>state.auth.loggedInUser;
export const selectError = (state)=>state.auth.error;

export default authSlice.reducer;