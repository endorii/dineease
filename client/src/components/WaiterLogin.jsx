import NumberPad from "./NumberPad";
import { GoBackButton } from '../ui/buttons/GoBackButton';
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getEmployeesByRestaurant } from "../actions/employees.actions";

export const WaiterLogin = () => {

    const dispatch = useDispatch();
    const {restaurant, position} = useParams();

    useEffect(() => {
        dispatch(getEmployeesByRestaurant(restaurant));
    }, [])

    return (
        <div className="flex h-screen flex-1 flex-col justify-center px-6 lg:px-8">
            <GoBackButton/>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-5 text-center text-sky-900 text-3xl font-bold">
                    Введіть пін-код
                </h2>
            </div>
            <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
                <NumberPad />
            </div>
        </div>
    )
}