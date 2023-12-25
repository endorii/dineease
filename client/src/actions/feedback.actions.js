import axios from "axios"

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
        const response = await axios.post(`http://localhost:5000/api/feedback/${restaurantId}`, {waiterName, message, time, date});

        console.log(response.data.message);
    } catch (e) {
        console.log(e.response.data.message);
    }   
}

