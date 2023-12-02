import axios from "axios"

export const getRestaurants = async () => {
    try {
        const response = await axios.get("http://localhost:3001/restaurants");
        return response.data
    } catch (e) {
        console.log(e.response.data.message);
    }   
}