import axios from "axios"
import { setOrders } from "../store/slices/orders.slice";

export const getAllOrders = async (restaurantId) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/orders/${restaurantId}`);

        return response.data.orders;
    } catch (e) {
        console.log(e.response.data.message);
    }
}

export const getOrdersByWaiter = (restaurantId) => {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5000/api/orders/${restaurantId}/waiter`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
            dispatch(setOrders(response.data.orders));
            return response.data.orders;

        } catch (e) {
            console.log(e.response.data.message);
        }
    }
}

export const getOrdersByWaiterId = (restaurantId, waiterId) => {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5000/api/orders/${restaurantId}/${waiterId}`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
            dispatch(setOrders(response.data.orders));
            return response.data.orders;

        } catch (e) {
            console.log(e.response.data.message);
        }
    }
}

export const addOrdersToRestaurant = async (restaurantId, items, date, time, tableNumber, waiterId) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/orders/${restaurantId}`, { items, date, time, tableNumber, waiterId });

        return response.data.orders;
    } catch (e) {
        console.log(e.response.data.message);
    }
}

export const closeOrder = async (restaurantId, orderId) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/orders/${restaurantId}/${orderId}`);

        return response.data.orders;
    } catch (e) {
        console.log(e.response.data.message);
    }
}

export const deleteOrder = async (restaurantId, orderId) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/orders/${restaurantId}/${orderId}`);

        return response.data.orders;
    } catch (e) {
        console.log(e.response.data.message);
    }
}

