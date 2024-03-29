import { updateEmployeeEndWorkingTime } from "../../actions/employees.actions";
import { logout } from "../../store/slices/user.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { ExitNumberPad } from "./ExitNumberPad";
import { useState } from "react";
import Close from "../../assets/svg/close.svg"
import { Modal } from "../App/Modal";
import { motion } from 'framer-motion'
import { dropIn } from "../../functions";

export const ExitModal = ({ now, setExitModalOpen }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [pinInput, setPinInput] = useState('');

    const { user } = useSelector(state => state.user);

    const notifyExit = () => toast('Робочу зміну закінчено.', {
        icon: 'ℹ️',
    });
    const notifyInvalid = () => toast.error('Введено невірний пін-код!');

    return (
        <Modal onClick={() => setExitModalOpen(false)}>
            <motion.div onClick={(e) => e.stopPropagation()} variants={dropIn} initial='hidden' animate='visible' exit='exit' className='flex justify-center cursor-default w-full'>
                <div className='absolute bg-gray-200 shadow-xl w-[95%] h-auto z-10 rounded-md text-center mt-5
                lg:w-[50%]'>
                    <div className='flex flex-col items-center gap-4 mt-5 p-10'>
                        <div className="font-thin text-2xl">Щоб завершити робочу зміну, введіть ваш пінкод</div>
                        <div className="font-thin text-xl">Кінець зміни о:
                            <span className="font-bold text-2xl text-sky-900"> {now.split(', ')[1]}</span>
                        </div>
                        <ExitNumberPad numbers={numbers} pinInput={pinInput} setPinInput={setPinInput} />
                        <div className="flex flex-row gap-x-5 mt-4">
                            <button className="flex items-center bg-yellow-600 hover:bg-yellow-700 rounded-lg mb-7 px-7 py-2 text-white font-medium drop-shadow-md transition ease-out hover:ease-in" onClick={() => {
                                setExitModalOpen(false)
                            }}>Відміна</button>
                            <div>
                                <button disabled={!pinInput || pinInput.length < 4} onClick={async () => {
                                    if (pinInput === user.pin) {
                                        await updateEmployeeEndWorkingTime(user._id, now.split(', ')[1]); dispatch(logout()); notifyExit(); navigate('/');
                                    } else {
                                        notifyInvalid();
                                    }
                                }} className="flex items-center bg-teal-600 hover:bg-teal-700 rounded-lg mb-7 px-7 py-2 text-white font-medium drop-shadow-md disabled:bg-teal-900/20 transition ease-out hover:ease-in">Закінчити</button>
                            </div>
                        </div>

                        <div className="absolute top-3 right-3 cursor-pointer" onClick={() => { setExitModalOpen(false) }}>
                            <img className="h-8" src={Close} alt="" />
                        </div>
                    </div>
                </div>
            </motion.div >
        </Modal>
    )
}