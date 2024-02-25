import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';

const notifyError = (message) => toast.error(message);
const notifySuccess = (message) => toast.success(message);

export const getFeedbackByRestaurant = async (restaurantId) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/feedback/${restaurantId}`);
        return response.data.feedbacks;
    } catch (e) {
        console.log(e.response.data.message);
    }
}

export const addFeedbackToRestaurant = async (restaurantId, waiterName, message, time, date) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/feedback/${restaurantId}`, { waiterName, message, time, date });

        console.log(response.data.message);
    } catch (e) {
        console.log(e.response.data.message);
    }
}

export const closeFeedbackMessage = async (restaurantId, messageId) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/feedback/${restaurantId}/${messageId}`);
        notifySuccess(response.data.message)
        console.log(response.data.message);
    } catch (e) {
        notifyError(e.response.data.message)
        console.log(e.response.data.message);
    }
}

