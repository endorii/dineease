import { configureStore } from '@reduxjs/toolkit';
import restaurantSlice from './slices/restaurant.slice';
import employeesSlice from './slices/employees.slice';
import userSlice from './slices/user.slice';

const rootReducer = {
    restaurants: restaurantSlice,
    employees: employeesSlice,
    user: userSlice
}

const store = configureStore({
    reducer: rootReducer
})

export default store;