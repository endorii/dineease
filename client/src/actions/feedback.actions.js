import axios from "axios"

export const getFeedbackByRestaurant = async (restaurantId) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/feedback/${restaurantId}`);
        return response.data.feedbacks;
    } catch (e) {
        console.log(e.response.data.message);
    }   
}

