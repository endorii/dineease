import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';

const notifyError = (message) => toast.error(message);
const notifySuccess = (message) => toast.success(message);

export const getNeedsByRestaurant = async (restaurantId) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/needs/${restaurantId}`);
        return response.data.needs;
    } catch (e) {
        console.log(e.response.data.message);
    }   
}

export const addNeedToRestaurant = async (restaurantId, waiterName, message, time, date, priority) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/needs/${restaurantId}`, {waiterName, message, time, date, priority});

        console.log(response.data.message);
    } catch (e) {
        console.log(e.response.data.message);
    }   
}

export const closeNeedsMessage = async (restaurantId, messageId) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/needs/${restaurantId}/${messageId}`);
        notifySuccess(response.data.message)
        console.log(response.data.message);
    } catch (e) {
        notifyError(e.response.data.message)
        console.log(e.response.data.message);
    }   
}