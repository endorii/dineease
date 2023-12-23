import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getNeedsByRestaurant } from '../../actions/needs.actions';

const initialState = {
    needs: [],
    isLoading: false,
    error: null
}

export const fetchNeeds = createAsyncThunk(
    "needs/fetchNeeds",
    async (restaurantId) => {
        const response = getNeedsByRestaurant(restaurantId);
        return response;
    }
)

const needsSlice = createSlice({
    name: 'needs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNeeds.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchNeeds.fulfilled, (state, action) => {
                state.isLoading = false;
                state.needs = action.payload;
            })
            .addCase(fetchNeeds.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            })
    },
})

export default needsSlice.reducer