import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Restaurant from '../assets/svg/house.svg';
import { fetchEmployees } from "../store/slices/employees.slice";

export const ChooseLoginMethod = () => {

    const dispatch = useDispatch();
    const { employees } = useSelector(state => state.employees);

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [])

    return (
        <div className="flex flex-col mt-[10%] justify-center items-center">
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
        </div>
    )
}