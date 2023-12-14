import axios from "axios"
// import { setEmployeesByRestaurant } from "../store/slices/employees.slice";

export const getMenuByRestaurant = async (restaurantName) => {
    try {
        const response = await axios.post("http://localhost:5000/api/restaurants/menu", {restaurantName});
        return response.data.menu
    } catch (e) {
        console.log(e.response.data.message);
    }   
}

