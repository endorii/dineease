import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "./Modal";
import { useNavigate, useParams } from "react-router-dom";
import { logout } from "../store/slices/user.slice";
import {  updateEmployeeStartWorkingTime } from "../actions/employees.actions";

export const NumPadWelcomeModal = ({ setOpen, employee, setEmployee }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { restaurantId, position } = useParams();

    const [now, setNow] = useState(new Date().toLocaleString());

    const currentDate = now.split(', ')[0];
    const currentTime = now.split(', ')[1];

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date().toLocaleString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Modal>
            <div className='flex justify-center'>
                <div className='absolute bg-gray-200 shadow-xl w-1/3 h-auto z-10 rounded-md mt-16'>
                    <div className='flex flex-col items-center mx-3 gap-4 mt-5'>
                        {employee.name ?
                            <>
                                <div className="font-thin text-xl">Вітаємо, {employee.name}</div>
                                <div className="font-thin text-xl">Розпочати робочу зміну?</div>
                                <div className="font-thin text-xl">Початок зміни о: {now.split(', ')[1]}</div>
                                <div className="flex flex-row gap-x-5 mt-4">
                                    <button className="flex items-center bg-yellow-600 hover:bg-yellow-700 rounded-lg mb-7 px-7 py-2 text-white font-medium drop-shadow-md transition ease-out hover:ease-in" onClick={() => {
                                        setEmployee({});
                                        dispatch(logout());
                                        setOpen(false)
                                    }}>Ні</button>
                                    <div>
                                        <button onClick={async () => {
                                            updateEmployeeStartWorkingTime(employee._id, currentDate, currentTime);
                                            setOpen(false);
                                            setTimeout(() => {
                                                navigate(`/${restaurantId}/${position}/panel/orders`);
                                            }, 1000);
                                        }} className="flex items-center bg-teal-600 hover:bg-teal-700 rounded-lg mb-7 px-7 py-2 text-white font-medium drop-shadow-md transition ease-out hover:ease-in">Так</button>

                                    </div>
                                </div>
                            </> :
                            <>
                                <div className="font-thin text-xl">Вибачте, співробітника з таким логіном не знайдено</div>
                                <button onClick={() => {
                                    setOpen(false);
                                }} className="flex items-center bg-green-500 hover:bg-green-600 rounded-lg mb-7 px-7 py-2 text-white font-medium drop-shadow-md transition ease-out hover:ease-in">Ок</button>
                            </>}

                        <div className="absolute top-1 right-1 cursor-pointer" onClick={() => { setEmployee({}); dispatch(logout()); setOpen(false) }}>✖</div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}