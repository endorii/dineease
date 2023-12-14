import axios from "axios"

export const getNeedsByRestaurant = async (restaurantName) => {
    try {
        const response = await axios.post("http://localhost:5000/api/restaurants/needs", {restaurantName});
        return response.data.needs;
    } catch (e) {
        console.log(e.response.data.message);
    }   
}

