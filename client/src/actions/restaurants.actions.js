import axios from "axios";

export const getRestaurants = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/restaurants");
        return response.data.restaurants;
    } catch (e) {
        console.log(e.response.data.message);
    }
};

export const getRestaurantById = async (restaurantId) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/restaurants/${restaurantId}`);
        return response.data.restaurant.name;
    } catch (e) {
        console.log(e.response.data.message);
    }
};
