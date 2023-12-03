import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getEmployees } from '../../actions/employees.actions';

const initialState = {
    employees: [],
    isLoading: false,
    error: null
}

export const fetchEmployees = createAsyncThunk(
    "employees/fetchEmployees",
    async () => {
        const response = await getEmployees();
        return response;
    }
)

const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        setEmployeesByRestaurant(state, action){
            state.employees = action.payload;
        }
    },
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

export const {setEmployeesByRestaurant} = employeesSlice.actions;

export default employeesSlice.reducer