import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersByRestaurant } from '../../actions/orders.actions';

const initialState = {
    orders: [],
    isLoading: false,
    error: null
}

export const fetchOrders = createAsyncThunk(
    "orders/fetchOrders",
    async (restaurantId) => {
        const response = getOrdersByRestaurant(restaurantId);
        return response;
    }
)

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
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

export default ordersSlice.reducer