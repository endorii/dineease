import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllOrders, getOrdersByRestaurant } from '../../actions/orders.actions';

const initialState = {
    orders: [],
    isLoading: false,
    error: null
}

export const fetchOrders = createAsyncThunk(
    "orders/fetchOrders",
    async (restaurantId) => {
        const response = getAllOrders(restaurantId);
        return response;
    }
)

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrders(state, action) {
            state.orders = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            })
    },
})

export const {setOrders} = ordersSlice.actions;

export default ordersSlice.reducer