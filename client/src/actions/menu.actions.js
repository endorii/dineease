import axios from "axios"
// import { setEmployeesByRestaurant } from "../store/slices/employees.slice";

export const getMenuByRestaurant = async (restaurantId) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/menu/${restaurantId}`);
        return response.data.menu
    } catch (e) {
        console.log(e.response.data.message);
    }   
}

