import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getEmployees } from '../../actions/employees.actions';

const initialState = {
    employees: [],
    isLoading: false,
    error: null
}

export const fetchEmployees = createAsyncThunk(
    "employees/fetchEmployees",
    async (restaurantName) => {
        const response = await getEmployees(restaurantName);
        return response;
    }
)

const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.isLoading = false;
                state.employees = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            })
    },
})

export default employeesSlice.reducer