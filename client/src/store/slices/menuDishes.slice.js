import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMenuDishes } from '../../actions/menu.actions';

const initialState = {
    menuDishes: [],
    isLoading: false,
    error: null
}

export const fetchMenuDishes = createAsyncThunk(
    "menuCategories/fetchMenuCategoryItems",
    async (restaurantId) => {
        const response = getMenuDishes(restaurantId);
        return response;
    }
)

const menuDishesSlice = createSlice({
    name: 'menuDishes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenuDishes.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMenuDishes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.menuDishes = action.payload;
            })
            .addCase(fetchMenuDishes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            })
    },
})

export default menuDishesSlice.reducer