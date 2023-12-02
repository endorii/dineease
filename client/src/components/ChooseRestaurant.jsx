import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants } from "../store/slices/restaurant.slice";
import Restaurant from '../assets/svg/house.svg';
import { fetchEmployees } from "../store/slices/employees.slice";

export const ChooseRestaurant = () => {

    const dispatch = useDispatch();
    const { restaurants } = useSelector(state => state.restaurants);
    const { employees } = useSelector(state => state.employees);

    const [currentRestaurant, setCurrentRestaurant] = useState('')

    useEffect(() => {
        dispatch(fetchEmployees());
        dispatch(fetchRestaurants());
    }, [])

    return (
        <div className="flex flex-col mt-[10%] justify-center items-center">
            {currentRestaurant ? <>
                <button className="absolute top-10 left-10 px-10 py-3 bg-green-200 text-lg rounded-mg shadow-md" onClick={() => { setCurrentRestaurant('') }}> Повернутися назад </button>
                <div className="text-4xl">Увійти як</div>
                <div>
                    <ul className="flex justify-center items-center gap-12 px-7 py-10">
                        {employees ? employees.map((employee, i) =>
                            <li className="flex items-center p-14 rounded-lg cursor-pointer shadow-lg hover:bg-gray-100" key={i}>
                                {/* <img className="w-10 mr-2 inline-block" src={Restaurant} alt="" /> */}
                                <div className="flex flex-col">
                                    <div className="text-2xl inline-block font-medium">{employee.position}</div>
                                    {/* <div className="text-l inline-block font-thin text-gray-800">{restaurant.address}</div> */}
                                </div>
                            </li>
                        ) : null}
                    </ul>
                </div>
            </> : <>
                <div className="text-4xl">Виберіть ваш ресторан</div>
                <div>
                    <ul className="flex justify-center items-center gap-12 px-7 py-10">
                        {restaurants.length > 0 ? restaurants.map((restaurant) =>
                            <li className="flex items-center p-14 rounded-lg cursor-pointer shadow-lg hover:bg-gray-W100" key={restaurant.id}>
                                <img className="w-10 mr-2 inline-block" src={Restaurant} alt="" />
                                <div className="flex flex-col">
                                    <div className="text-2xl inline-block font-medium">{restaurant.name}</div>
                                    <div className="text-l inline-block font-thin text-gray-800">{restaurant.address}</div>
                                </div>
                            </li>
                        ) : null}
                    </ul>
                </div>
            </>}

        </div>
    )
}