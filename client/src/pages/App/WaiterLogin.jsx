import NumberPad from "../Waiter/NumberPad";
import { GoBackButton } from "../../ui/buttons/GoBackButton";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "../../actions/user.actions";
import { fetchEmployees } from "../../store/slices/employees.slice";
import withHelmet from "../../utils/helpers/withHelmet";

const WaiterLogin = () => {
    const dispatch = useDispatch();
    const { restaurantId } = useParams();

    useEffect(() => {
        dispatch(fetchEmployees(restaurantId));
    }, []);

    return (
        <div className="flex h-screen flex-1 flex-col justify-center items-center px-6 bg-gray-200">
            <GoBackButton />
            <div
                className="w-[310px] 
            sm:w-[370px]"
            >
                <NumberPad />
            </div>
        </div>
    );
};

export default withHelmet(WaiterLogin, "Увійти в акаунт");
