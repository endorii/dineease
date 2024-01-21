import { configureStore } from '@reduxjs/toolkit';
import restaurantSlice from './slices/restaurant.slice';
import employeesSlice from './slices/employees.slice';
import userSlice from './slices/user.slice';
import ordersSlice from './slices/orders.slice';
import menuCategoriesSlice from './slices/menuCategories.slice';
import needsSlice from './slices/needs.slice';
import feedbackSlice from './slices/feedback.slice';
import menuDishesSlice from './slices/menuDishes.slice';

const rootReducer = {
    restaurants: restaurantSlice,
    employees: employeesSlice,
    user: userSlice,
    orders: ordersSlice,
    menuCategories: menuCategoriesSlice,
    menuDishes: menuDishesSlice,
    needs: needsSlice,
    feedback: feedbackSlice
}

const store = configureStore({
    reducer: rootReducer
})

export default store;