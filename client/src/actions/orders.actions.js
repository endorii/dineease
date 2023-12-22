import axios from "axios"

export const getOrdersByRestaurant = async (restaurantId) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/orders/${restaurantId}`);
        
        return response.data.orders;
    } catch (e) {
        console.log(e.response.data.message);
    }   
}

export const addOrdersToRestaurant = async (restaurantId, order) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/orders/${restaurantId}`, {order});
        
        return response.data.orders;
    } catch (e) {
        console.log(e.response.data.message);
    }   
}