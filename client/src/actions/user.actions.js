import axios from 'axios';
import { setUser } from '../store/slices/user.slice';

// export const registration = async (email, name, phone, company, password) => {
//     try {
//         const response = await axios.post("http://localhost:3001", {email, name, phone, company, password});
        
//         console.log(response.data.message);

//     } catch (e) {
//         console.log(e.response.data.message);
//     }   
// }

export const login = (restaurant, position, email, password) => {
    return async (dispatch) => {
        try {
            const response = await axios.get("http://localhost:3001/employees", {restaurant, position, email, password});
            const users = response.data;
            const filteredUser = users.filter(user => user.restaurant === restaurant && user.position === position && user.email === email && user.password === password);
            localStorage.setItem('token', filteredUser[0].name);
            dispatch(setUser(filteredUser));
            return filteredUser; 

        } catch (e) {
            console.log(e.response.data.message);
        }       
    }
}

// export const auth = () => {
//     return async dispatch => {
//         try {
//             const response = await axios.get("http://localhost:5000/auth", {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
//             dispatch(setUser(response.data.user));
//             localStorage.setItem('token', response.data.token);
//         } catch (e) {
//             console.log(e.response.data.message);
//             localStorage.removeItem('token');
//         }       
//     }
// }
