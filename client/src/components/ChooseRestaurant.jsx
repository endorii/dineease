import Restaurant from '../assets/svg/house.svg';
import { getEmployeesByRestaurant } from "../actions/employees.actions";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchRestaurants } from '../store/slices/restaurant.slice';
import { useNavigate } from 'react-router-dom';
import { auth } from '../actions/user.actions';

export const ChooseRestaurant = () => {

    const dispatch = useDispatch();

    const { restaurants } = useSelector(state => state.restaurants);

    const navigate = useNavigate();

    const token = localStorage.getItem('token')
    
    useEffect(() => {
        dispatch(fetchRestaurants());
        dispatch(auth());
    }, []);

    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, [token])


    return (
        <div className="flex flex-col w-screen h-screen justify-center items-center text-sky-900">
            <div className="text-4xl">Виберіть ваш ресторан</div>
            <div>
                <ul className="flex justify-center items-center gap-12 px-7 py-10">
                    {restaurants.length > 0 ? restaurants.map((restaurant) =>
                        <li className="flex items-center p-14 rounded-lg cursor-pointer shadow-lg hover:bg-sky-900/5" key={restaurant.id} onClick={() => { 
                            dispatch(getEmployeesByRestaurant(restaurant.name)); 
                            navigate(`/login/${restaurant.name}`)}}>
                            <img className="w-10 mr-2 inline-block" src={Restaurant} alt="" />
                            <div className="flex flex-col">
                                <div className="text-2xl inline-block font-medium">{restaurant.name}</div>
                                <div className="text-l inline-block font-thin text-gray-800">{restaurant.address}</div>
                            </div>
                        </li>
                    ) : <div>Немає доступних ресторанів</div>}
                </ul>
            </div>
        </div> 
    )
}