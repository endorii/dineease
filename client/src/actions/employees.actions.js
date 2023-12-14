import axios from "axios"
import { setEmployeesByRestaurant } from "../store/slices/employees.slice";

export const getEmployees = async () => {
    try {
        const response = await axios.get("http://localhost:3001/employees");
        return response.data
    } catch (e) {
        console.log(e.response.data.message);
    }   
}

export const getEmployeesByRestaurant = (restaurantName) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/employees?restaurantName=${restaurantName}`);
            const employees = response.data.employees;
            
            dispatch(setEmployeesByRestaurant(employees))
            return employees;
        } catch (e) {
            console.log(e.response.data.message);
        }   
    }
}
