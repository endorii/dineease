import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Left from '../../assets/svg/angle-left.svg';
import { useEffect, useState } from "react";
import { Loader } from "./Loader";
import { getRestaurantById } from "../../actions/restaurants.actions";
import { fetchEmployees } from "../../store/slices/employees.slice";
import { GoBackButton } from "../../ui/buttons/GoBackButton";

export const LoginAs = () => {

    const { employees, isLoading } = useSelector(state => state.employees);
    const [restaurantName, setRestaurantName] = useState('');

    const { restaurantId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const positions = [...new Set(employees.map(employee => employee.position))];

    useEffect(() => {
        const fetchRestaurant = async () => {
            const restaurant = await getRestaurantById(restaurantId);
            setRestaurantName(restaurant.name);
            document.title = `Увійти в ресторан | ${restaurant.name}`;
        };

        fetchRestaurant();
    }, [restaurantId]);

    useEffect(() => {
        dispatch(fetchEmployees(restaurantId));
    }, [])

    return (
        <div className="flex flex-col w-screen h-screen justify-center items-center text-sky-900">
            <GoBackButton/>
            <div className="text-3xl text-center p-5">Увійти в ресторан
                <span className="text-4xl font-medium text-sky-950"> {restaurantName} </span>
                як:</div>
            <div>
                {isLoading ? <Loader /> :
                    <ul className="flex flex-wrap justify-center items-center gap-3 mt-3">
                        {employees.length > 0 ? positions.map((position, i) =>
                            <li className="flex justify-center items-center p-6 w-[250px] h-[130px] rounded-lg cursor-pointer shadow-lg hover:bg-sky-900/5 transition ease-out hover:ease-in
                            sm:w-[300px] sm:h-[130px]
                            md:w-[320px] sm:h-[140px]" key={i} onClick={() => { navigate(`/login/${restaurantId}/${position}`) }}>
                                <div className="text-2xl font-medium">{position === 'Admin' ? 'Адмін' : position === 'Accountant' ? 'Бухгалтер' : position === 'Waiter' ? 'Офіціант' : null}</div>
                            </li>
                        ) : <div>Нічого не знайдено</div>}
                    </ul>}
            </div>
        </div>
    )
}