import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../App/Modal";
import { useNavigate, useParams } from "react-router-dom";
import { logout } from "../../store/slices/user.slice";
import { updateEmployeeStartWorkingTime } from "../../actions/employees.actions";
import toast from 'react-hot-toast';
import { motion } from 'framer-motion'
import { dropIn } from "../../functions";

export const NumPadWelcomeModal = ({ setOpen }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { restaurantId, position } = useParams();

    const [now, setNow] = useState(new Date().toLocaleString());

    const currentDate = now.split(', ')[0];
    const currentTime = now.split(', ')[1];

    const notifySuccess = () => {
        toast.success('Ви успішно розпочали зміну!');
    };

    const { user } = useSelector(state => state.user)

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date().toLocaleString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Modal onClick={() => {setOpen(false); dispatch(logout())}}>
            <motion.div onClick={(e) => e.stopPropagation()} variants={dropIn} initial='hidden' animate='visible' exit='exit' className='absolute flex justify-center cursor-default mt-16'>
                <div className='relative bg-gray-200 shadow-xl w-full h-auto z-10 rounded-md px-24'>
                    <div className='flex flex-col items-center mx-3 gap-4 mt-5'>
                        {user.name ?
                            <>
                                <div className="font-thin text-xl">Вітаємо, {user.name}</div>
                                <div className="font-thin text-xl">Розпочати робочу зміну?</div>
                                <div className="font-thin text-xl">Початок зміни о: {now.split(', ')[1]}</div>
                                <div className="flex flex-row gap-x-5 mt-4">
                                    <button className="flex items-center bg-yellow-600 hover:bg-yellow-700 rounded-lg mb-7 px-7 py-2 text-white font-medium drop-shadow-md transition ease-out hover:ease-in" onClick={() => {
                                        dispatch(logout());
                                        setOpen(false)
                                    }}>Ні</button>
                                    <div>
                                        <button onClick={() => {
                                            notifySuccess();
                                            updateEmployeeStartWorkingTime(user._id, currentDate, currentTime);
                                            setOpen(false);
                                            navigate(`/${restaurantId}/${position}/panel/orders`);
                                        }} className="flex items-center bg-teal-600 hover:bg-teal-700 rounded-lg mb-7 px-7 py-2 text-white font-medium drop-shadow-md transition ease-out hover:ease-in">Так</button>

                                    </div>
                                </div>
                            </> :
                            <>
                                <div className="font-thin text-xl">Вибачте, співробітника з таким логіном не знайдено</div>
                                <button onClick={() => {
                                    setOpen(false);
                                }} className="flex items-center bg-green-500 hover:bg-green-600 rounded-lg mb-7 px-7 py-2 text-white font-medium drop-shadow-md transition ease-out hover:ease-in">Ок</button>
                            </>
                        }
                        <div className="absolute top-1 right-1 cursor-pointer" onClick={() => {
                            dispatch(logout()); setOpen(false)
                        }}>✖</div>
                    </div>
                </div>
            </motion.div>
        </Modal>
    )
}




