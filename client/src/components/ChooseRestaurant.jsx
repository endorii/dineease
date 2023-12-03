import Restaurant from '../assets/svg/house.svg';
import { getEmployeesByRestaurant } from "../actions/employees.actions";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchRestaurants } from '../store/slices/restaurant.slice';
import { useNavigate } from 'react-router-dom';

export const ChooseRestaurant = () => {

    const dispatch = useDispatch();

    const { restaurants } = useSelector(state => state.restaurants);

    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(fetchRestaurants());
    }, [])

    return (
        <div className="flex flex-col mt-[10%] justify-center items-center">
            <div className="text-4xl">Виберіть ваш ресторан</div>
            <div>
                <ul className="flex justify-center items-center gap-12 px-7 py-10">
                    {restaurants.length > 0 ? restaurants.map((restaurant) =>
                        <li className="flex items-center p-14 rounded-lg cursor-pointer shadow-lg hover:bg-gray-100" key={restaurant.id} onClick={() => { 
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