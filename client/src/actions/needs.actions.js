import axios from "axios"

export const getNeedsByRestaurant = async (restaurantId) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/needs/${restaurantId}`);
        return response.data.needs;
    } catch (e) {
        console.log(e.response.data.message);
    }   
}

