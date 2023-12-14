import axios from "axios"

export const getFeedbackByRestaurant = async (restaurantName) => {
    try {
        const response = await axios.post("http://localhost:5000/api/restaurants/feedback", {restaurantName});
        return response.data.feedback;
    } catch (e) {
        console.log(e.response.data.message);
    }   
}

