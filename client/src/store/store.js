import { configureStore } from '@reduxjs/toolkit';
import restaurantSlice from './slices/restaurant.slice';
import employeesSlice from './slices/employees.slice';
import userSlice from './slices/user.slice';
import ordersSlice from './slices/orders.slice';
import menuSlice from './slices/menu.slice';
import needsSlice from './slices/needs.slice';

const rootReducer = {
    restaurants: restaurantSlice,
    employees: employeesSlice,
    user: userSlice,
    orders: ordersSlice,
    menu: menuSlice,
    needs: needsSlice
}

const store = configureStore({
    reducer: rootReducer
})

export default store;