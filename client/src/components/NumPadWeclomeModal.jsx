import { useEffect, useState } from "react";
// import { fetchOnlineEmployees } from "../store/slices/onlineEmployee.Slice";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "./Modal";
import { useNavigate, useParams } from "react-router-dom";
import { logout } from "../store/slices/user.slice";
// import { toast } from 'react-toastify';
// import { loginEmployee } from "../view/pages/Access/Employees/employee";
// import { setCurrentEmployee } from "../store/slices/currentEmployee.Slice";

export const NumPadWelcomeModal = ({ setOpen, employee, setEmployee }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {restaurant, position} = useParams();

    const [now, setNow] = useState(new Date().toLocaleTimeString());

    // const notify = () => toast.info("Робочу зміну почато!", {
    //     position: "top-right",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: false,
    //     pauseOnHover: false,
    //     draggable: false,
    //     progress: undefined,
    //     theme: "light"
    // });

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date().toLocaleTimeString());
        }, 1000);
    
        
        return () => clearInterval(timer);
    }, []);

    return (
        <Modal>
            <div className='flex justify-center '>
                <div className='absolute bg-gray-200 shadow-xl w-1/3 h-auto z-10 rounded-md mt-16'>
                    <div className='flex flex-col items-center mx-3 gap-4 mt-5'>
                        {employee.name ?
                            <>
                                <div className="font-thin text-xl">Вітаємо, {employee.name}</div>
                                <div className="font-thin text-xl">Розпочати робочу зміну?</div>
                                <div className="font-thin text-xl">Початок зміни о: {now}</div>
                                <div className="flex flex-row gap-x-5 mt-4">
                                    <button className="flex items-center bg-red-500 hover:bg-red-600 rounded-lg mb-7 px-7 py-2 text-white font-medium drop-shadow-md" onClick={() => {
                                        setEmployee({});
                                        dispatch(logout());
                                        setOpen(false)
                                    }}>Ні</button>
                                    <div>
                                        <button onClick={async () => {
                                            // await loginEmployee(employee.pin);
                                            // dispatch(setCurrentEmployee(employee));
                                            // dispatch(fetchOnlineEmployees());
                                            
                                            setOpen(false);
                                            // notify();
                                            setTimeout(() => {
                                                navigate(`/${restaurant}/${position}/panel`);
                                            }, 1000);
                                        }} className="flex items-center bg-green-500 hover:bg-green-600 rounded-lg mb-7 px-7 py-2 text-white font-medium drop-shadow-md">Так</button>

                                    </div>
                                </div>
                            </> :
                            <>
                                <div className="font-thin text-xl">Вибачте, співробітника з таким логіном не знайдено</div>
                                <button onClick={() => {
                                    setOpen(false);
                                }} className="flex items-center bg-green-500 hover:bg-green-600 rounded-lg mb-7 px-7 py-2 text-white font-medium drop-shadow-md">Ок</button>
                            </>}

                        <div className="absolute top-1 right-1 cursor-pointer" onClick={() => { setEmployee({}); dispatch(logout()); setOpen(false) }}>✖</div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}