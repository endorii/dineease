import NumberPad from "./NumberPad";
import { GoBackButton } from '../ui/buttons/GoBackButton';
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getEmployeesByRestaurant } from "../actions/employees.actions";
import { auth } from "../actions/user.actions";

export const WaiterLogin = () => {

    const dispatch = useDispatch();
    const {restaurantId} = useParams();

    useEffect(() => {
        dispatch(getEmployeesByRestaurant(restaurantId));
        dispatch(auth());
    }, [])

    return (
        <div className="flex h-screen flex-1 flex-col justify-center px-6 lg:px-8">
            <GoBackButton/>
            <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
                <NumberPad />
            </div>
        </div>
    )
}