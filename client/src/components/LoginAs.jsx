import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Left from '../assets/svg/angle-left.svg';
import { useEffect, useState } from "react";
import { getEmployeesByRestaurant } from "../actions/employees.actions";
import { Loader } from "./Loader";
import { getRestaurantById } from "../actions/restaurants.actions";

export const LoginAs = () => {

    const { employees, isLoading } = useSelector(state => state.employees);
    const [restaurantName, setRestaurantName] = useState('');

    const { restaurantId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const positions = [...new Set(employees.map(employee => employee.position))];

    useEffect(() => {
        dispatch(getEmployeesByRestaurant(restaurantId));
    }, [])

    useEffect(() => {
        const fetchRestaurant = async () => {
            const restaurant = await getRestaurantById(restaurantId);
            setRestaurantName(restaurant.name);
        };

        fetchRestaurant();
    }, [restaurantId]);

    return (
        <div className="flex flex-col w-screen h-screen justify-center items-center text-sky-900">
            <button onClick={() => navigate(-1)} className="absolute flex flex-row items-center top-10 left-10 text-center shadow-lg rounded-lg text-lg px-5 py-1 hover:bg-gray-100 font-medium transition ease-out hover:ease-in">
                <img className="w-12" src={Left} alt="" />
                Повернутися назад
            </button>
            <div className="text-4xl">Увійти в ресторан
                <span className="text-5xl font-medium text-sky-950"> {restaurantName} </span>
                як:</div>
            <div>
                {isLoading ? <Loader /> :
                    <ul className="flex justify-center items-center gap-12 px-7 py-10 mt-10">
                        {employees.length > 0 ? positions.map((position, i) =>
                            <li className="flex items-center p-14 rounded-lg cursor-pointer shadow-lg hover:bg-sky-900/5 transition ease-out hover:ease-in" key={i} onClick={() => { navigate(`/login/${restaurantId}/${position}`) }}>
                                <div className="flex flex-col">
                                    <div className="text-2xl inline-block font-medium">{position}</div>
                                </div>
                            </li>
                        ) : <div>Нічого не знайдено</div>}
                    </ul>}
            </div>
        </div>
    )
}