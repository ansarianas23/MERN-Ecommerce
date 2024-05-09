import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createOrder, fetchAllOrders, fetchAllOrdersCount, updateOrder } from './orderAPI'


const initialState = {
    orders: [],
    status: 'idle',
    currentOrder: null,
    totalOrders: 0
}


export const fetchAllOrdersCountAsync = createAsyncThunk(
    'order/fetchAllOrdersCount',
    async ()=>{
        const response  = await fetchAllOrdersCount();
        return response;
    }
)


export const createOrderAsync = createAsyncThunk(
    'order/createOrder',
    async (order)=>{
        const response  = await createOrder(order);
        return response;
    }
)


export const fetchAllOrdersAsync = createAsyncThunk(
    'order/fetchAllOrders',
    async (pagination)=>{
        const response  = await fetchAllOrders(pagination);
        return response.data;
    }
)

export const updateOrderAsync = createAsyncThunk(
    'order/updateOrder',
    async (update)=>{
        const response  = await updateOrder(update);
        return response;
    }
)


export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers:{
        resetOrder:(state)=>{
            state.currentOrder = null
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createOrderAsync.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(createOrderAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.orders.push(action.payload);
            state.currentOrder = action.payload
        })  
        .addCase(fetchAllOrdersAsync.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(fetchAllOrdersAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.orders = action.payload;
        })  
        .addCase(fetchAllOrdersCountAsync.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(fetchAllOrdersCountAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.totalOrders = action.payload;
        })
        .addCase(updateOrderAsync.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(updateOrderAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            const index =  state.orders.findIndex(order=>order.id===action.payload.id)
            state.orders[index] = action.payload;
        })
    }

})


export const { resetOrder } = orderSlice.actions;
export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectAllOrders = (state) => state.order.orders;
export const selectAllOrdersCounts = (state)=> state.order.totalOrders;
export default orderSlice.reducer;