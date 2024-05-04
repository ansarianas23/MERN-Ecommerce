import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUser, loginUser, updateUser } from "./authAPI";

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

export const updateUserAsync = createAsyncThunk(
    'user/updateUser',
    async (update)=>{
        // console.log("obj received at thunk", update);
        const response  = await updateUser(update);
        // console.log("response from thunk", response);
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

export const selectLoggedInUser = (state)=>state.user.loggedInUser;
export const selectError = (state)=>state.user.error;

export default authSlice.reducer;