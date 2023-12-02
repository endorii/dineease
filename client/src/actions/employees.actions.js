import axios from "axios"

export const getEmployees = async () => {
    try {
        const response = await axios.get("http://localhost:3001/employees");
        return response.data
    } catch (e) {
        console.log(e.response.data.message);
    }   
}