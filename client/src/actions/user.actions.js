import axios from 'axios';
import { setUser } from '../store/slices/user.slice';

export const loginByPass = (restaurantId, email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`http://localhost:5000/api/auth/loginByPass/${restaurantId}`, {email, password});
            dispatch(setUser(response.data.employee));
            localStorage.setItem('token', response.data.token);
            console.log(response.data.message);

        } catch (e) {
            console.log(e.response.data.message);
        }       
    }
}

export const loginByPin = (pin) => {
    return async dispatch => {
        try {
            const response = await axios.post("http://localhost:5000/api/auth/loginByPin", {pin});
            dispatch(setUser(response.data.employee));
            localStorage.setItem('token', response.data.token);
            console.log(response.data.message);

        } catch (e) {
            console.log(e.response.data.message);
        }       
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get("http://localhost:5000/api/auth/auth", {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
            dispatch(setUser(response.data.employee));
            localStorage.setItem('token', response.data.token);
        } catch (e) {
            console.log(e.response.data.message);
            localStorage.removeItem('token');
        }       
    }
}
