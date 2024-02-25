import axios from 'axios';
import { setUser } from '../store/slices/user.slice';
import toast, { Toaster } from 'react-hot-toast';

const notifyError = (message) => toast.error(message);
const notifySuccess = (message) => toast.success(message);

export const loginByPass = (restaurantId, email, password, routeChange) => {
    return async dispatch => {
        try {
            const response = await axios.post(`http://localhost:5000/api/auth/loginByPass/${restaurantId}`, {email, password});
            dispatch(setUser(response.data.employee));
            localStorage.setItem('accessToken', response.data.accessToken);
            routeChange();
            notifySuccess(response.data.message)
            console.log(response.data);

        } catch (e) {
            notifyError(e.response.data.message)
            console.log(e.response.data.message);
        }       
    }
}

export const loginByPin = (restaurantId, pin) => {
    return async dispatch => {
        try {
            const response = await axios.post(`http://localhost:5000/api/auth/loginByPin/${restaurantId}`, {pin});
            dispatch(setUser(response.data.employee));
            localStorage.setItem('accessToken', response.data.accessToken);
            console.log(response.data.message);

        } catch (e) {
            console.log(e.response.data.message);
        }       
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get("http://localhost:5000/api/auth/auth", {headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`}});
            dispatch(setUser(response.data.employee));
            localStorage.setItem('accessToken', response.data.accessToken);
        } catch (e) {
            console.log(e.response.data.message);
            localStorage.removeItem('token');
        }       
    }
}
