import axios from "axios"

export const getOrdersByRestaurant = async (restaurantName) => {
    try {
        const response = await axios.post("http://localhost:5000/api/restaurants/orders", {restaurantName});
        
        return response.data.orders;
    } catch (e) {
        console.log(e.response.data.message);
    }   
}
