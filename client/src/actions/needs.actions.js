import axios from "axios"

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