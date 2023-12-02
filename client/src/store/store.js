import { configureStore } from '@reduxjs/toolkit';
import restaurantSlice from './slices/restaurant.slice';
import employeesSlice from './slices/employees.slice';

const rootReducer = {
    restaurants: restaurantSlice,
    employees: employeesSlice,
}

const store = configureStore({
    reducer: rootReducer
})

export default store;