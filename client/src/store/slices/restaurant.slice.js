import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRestaurants } from '../../actions/restaurants.actions';

const initialState = {
    restaurants: [],
    isLoading: false,
    error: null
}

export const fetchRestaurants = createAsyncThunk(
    "restaurants/fetchRestaurants",
    async () => {
        const response = getRestaurants();
        return response;
    }
)

const restaurantSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRestaurants.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchRestaurants.fulfilled, (state, action) => {
                state.isLoading = false;
                state.restaurants = action.payload;
            })
            .addCase(fetchRestaurants.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            })
    },
})

export default restaurantSlice.reducer