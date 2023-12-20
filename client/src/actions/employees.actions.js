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

export const addEmployee = async (name, age, restaurantName, experience, position, salary, password, email, pin) => {
    try {
        const response = await axios.post("http://localhost:5000/api/employees", { name, age, restaurantName, experience, position, salary, password, email, pin }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

        console.log(response.data.message);
    } catch (e) {
        console.log(e.response.data.message);
    }
};

export const getEmployeesByRestaurant = (restaurantName) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/employees?restaurantName=${restaurantName}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            const employees = response.data.employees;

            dispatch(setEmployeesByRestaurant(employees))
            return employees;
        } catch (e) {
            console.log(e.response.data.message);
        }
    }
}

export const editEmployee = async (_id, name, age, restaurantName, experience, position, salary, password, email, pin) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/employees/${_id}`, { _id, name, age, restaurantName, experience, position, salary, password, email, pin }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        console.log(response.data.message);
        return response.data
    } catch (e) {
        console.log(e.response.data.message);
    }
}


export const deleteEmployee = async (_id) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/employees/${_id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        console.log(response.data.message);
        return response.data
    } catch (e) {
        console.log(e.response.data.message);
    }
}