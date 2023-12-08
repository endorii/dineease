import axios from "axios"

export const getNeedsByRestaurant = async (restaurantName) => {
    try {
        const response = await axios.get("http://localhost:3001/restaurants");
        const restaurants = response.data;
        const selectedRestaurant = restaurants.find(restaurant => restaurant.name === restaurantName);
        if (!selectedRestaurant) {
            console.log("Restaurant not found");
            return [];
        }
        const needs = selectedRestaurant.needs;
        return needs;
    } catch (e) {
        console.log(e.response.data.message);
    }   
}

