import axios from "axios"
import { setEmployeesByRestaurant } from "../store/slices/employees.slice";

export const getOrdersByRestaurant = async (restaurantName) => {
    try {
        const response = await axios.get("http://localhost:3001/restaurants");
        const restaurants = response.data;
        const selectedRestaurant = restaurants.find(restaurant => restaurant.name === restaurantName);
        if (!selectedRestaurant) {
            console.log("Restaurant not found");
            return [];
        }

        const orders = selectedRestaurant.orders;

        return orders;
    } catch (e) {
        console.log(e.response.data.message);
    }   
}

export const getEmployeesByRestaurant = (restaurantName) => {
    return async (dispatch) => {
        try {
            const response = await axios.get("http://localhost:3001/employees");
            const employees = response.data;
            const filteredEmployees = employees.filter(employee => employee.restaurant === restaurantName);
            dispatch(setEmployeesByRestaurant(filteredEmployees))
            return filteredEmployees;
        } catch (e) {
            console.log(e.response.data.message);
        }   
    }
}

export const getEmployeeByRestaurantAndPin = (restaurantName, pin) => {
    return async (dispatch) => {
        try {
            const response = await axios.get("http://localhost:3001/employees");
            const employees = response.data;
            const filteredEmployee = employees.filter(employee => employee.restaurant === restaurantName && employee.pin === pin);
            dispatch(setEmployeesByRestaurant(filteredEmployee))
            return filteredEmployee;
        } catch (e) {
            console.log(e.response.data.message);
        }   
    }
}
