import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMenuCategoriesByRestaurant } from '../../actions/menu.actions';

const initialState = {
    menuCategories: [],
    isLoading: false,
    error: null
}

export const fetchMenuCategories = createAsyncThunk(
    "menuCategories/fetchMenuCategories",
    async (restaurantId) => {
        const response = getMenuCategoriesByRestaurant(restaurantId);
        return response;
    }
)

const menuCategoriesSlice = createSlice({
    name: 'menuCategories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenuCategories.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMenuCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.menuCategories = action.payload;
            })
            .addCase(fetchMenuCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            })
    },
})

export default menuCategoriesSlice.reducer