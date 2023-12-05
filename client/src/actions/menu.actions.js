import axios from "axios"
// import { setEmployeesByRestaurant } from "../store/slices/employees.slice";

export const getMenuByRestaurant = async (restaurantName) => {
    try {
        const response = await axios.get("http://localhost:3001/restaurants");
        const restaurants = response.data;
        const filteredRestaurant = restaurants.filter(restaurant => restaurant.name === restaurantName);
        const menu = filteredRestaurant[0].menu;
        return menu;
    } catch (e) {
        console.log(e.response.data.message);
    }   
}

