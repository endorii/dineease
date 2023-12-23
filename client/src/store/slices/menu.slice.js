import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMenuByRestaurant } from '../../actions/menu.actions';

const initialState = {
    menu: [],
    isLoading: false,
    error: null
}

export const fetchMenu = createAsyncThunk(
    "menu/fetchMenu",
    async (restaurantId) => {
        const response = getMenuByRestaurant(restaurantId);
        return response;
    }
)

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenu.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMenu.fulfilled, (state, action) => {
                state.isLoading = false;
                state.menu = action.payload;
            })
            .addCase(fetchMenu.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            })
    },
})

export default menuSlice.reducer