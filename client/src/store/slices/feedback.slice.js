import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedbackByRestaurant } from '../../actions/feedback.actions';

const initialState = {
    feedback: [],
    isLoading: false,
    error: null
}

export const fetchFeedback = createAsyncThunk(
    "feedback/fetchFeedback",
    async (restaurantId) => {
        const response = getFeedbackByRestaurant(restaurantId);
        return response;
    }
)

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeedback.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchFeedback.fulfilled, (state, action) => {
                state.isLoading = false;
                state.feedback = action.payload;
            })
            .addCase(fetchFeedback.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            })
    },
})

export default feedbackSlice.reducer