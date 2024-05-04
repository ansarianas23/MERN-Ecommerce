import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUser, loginUser, updateUser } from "./authAPI";

const initialState = {
    loggedInUser: null,
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
    async (loginInfo)=>{
        const response  = await loginUser(loginInfo);
        return response;
    }
)

export const updateUserAsync = createAsyncThunk(
    'auth/updateUser',
    async (update)=>{
        // console.log("obj received at thunk", update);
        const response  = await updateUser(update);
        // console.log("response from thunk", response);
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
            state.error = action.error;
        })
        .addCase(updateUserAsync.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(updateUserAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.loggedInUser = action.payload;
        })

    }

})


export const { incremenet } = authSlice.actions;

export const selectLoggedInUser = (state)=>state.auth.loggedInUser;
export const selectError = (state)=>state.auth.error;

export default authSlice.reducer;