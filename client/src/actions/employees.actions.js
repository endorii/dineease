import axios from "axios"

export const addEmployee = async (name, age, location, restaurantId, experience, phone, position, typeOfWorkingTime, salary, password, email, pin) => {
    try {
        const response = await axios.post("http://localhost:5000/api/employees", { name, age, location, restaurantId, experience, phone, position, typeOfWorkingTime, salary, password, email, pin }, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } });

        console.log(response.data.message);
    } catch (e) {
        console.log(e.response.data.message);
    }
};

export const getEmployeesByRestaurant = async (restaurantId) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/employees/${restaurantId}`);
        const employees = response.data.employees;
        return employees;
    } catch (e) {
        console.log(e.response.data.message);
    }
}

export const editEmployee = async (_id,  name, age, location, restaurantId, experience, phone, position, typeOfWorking, salary, password, email, pin) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/employees/${_id}`, { name, age, location, restaurantId, experience, phone, position, typeOfWorking, salary, password, email, pin}, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
        console.log(response.data.message);
        return response.data
    } catch (e) {
        console.log(e.response.data.message);
    }
}


export const deleteEmployee = async (_id) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/employees/${_id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
        console.log(response.data.message);
        return response.data
    } catch (e) {
        console.log(e.response.data.message);
    }
}

export const updateEmployeeStartWorkingTime = async (employeeId, currentDate, currentTime) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/employees/${employeeId}/updateStartWorkingTime`, { currentDate, currentTime }, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
        console.log(response.data.message);
        return response.data
    } catch (e) {
        console.log(e.response.data.message);
    }
}

export const updateEmployeeEndWorkingTime = async (employeeId, startTime, endTime) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/employees/${employeeId}/updateEndWorkingTime`, { startTime, endTime }, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
        console.log(response.data.message);
        return response.data
    } catch (e) {
        console.log(e.response.data.message);
    }
}

export const updateWaiterServedTables = async (employeeId, startTime) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/employees/${employeeId}/updateWaiterServedTables`, { startTime });
        console.log(response.data.message);
        return response.data
    } catch (e) {
        console.log(e.response.data.message);
    }
}
