import axios from "axios"

export const getOrdersByRestaurant = async (restaurantId) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/orders/${restaurantId}`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
        
        return response.data.orders;
    } catch (e) {
        console.log(e.response.data.message);
    }   
}

export const addOrdersToRestaurant = async (restaurantId, items, date, time, tableNumber, waiterId) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/orders/${restaurantId}`, {items, date, time, tableNumber, waiterId});
        
        return response.data.orders;
    } catch (e) {
        console.log(e.response.data.message);
    }   
}

export const closeOrder = async (restaurantId, orderId) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/orders/${restaurantId}`, {orderId});
        
        return response.data.orders;
    } catch (e) {
        console.log(e.response.data.message);
    }   
}

