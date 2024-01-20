import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import Logout from '../assets/svg/logout.svg'
import Send from '../assets/svg/send.svg'
import { addFeedbackToRestaurant } from "../actions/feedback.actions"
import { addNeedToRestaurant } from "../actions/needs.actions"

import toast, { Toaster } from 'react-hot-toast';
import { auth } from "../actions/user.actions"
import { Modal } from "./Modal"
import { ExitModal } from "./ExitModal";

export const CurrentEmployeeAccount = () => {

    const notify = () => toast.success('Повідомлення надіслано!');

    const [currentTime, setCurrentTime] = useState('');
    const [priority, setPriority] = useState('');

    const [contactAreaText, setContactAreaText] = useState('');
    const [wishesAreaText, setWishesAreaText] = useState('');
    const { restaurantId } = useParams();

    const dispatch = useDispatch();

    const now = new Date().toLocaleString();
    const { user } = useSelector(state => state.user);
    const lastIndex = user?.workingTime?.length - 1;
    const startTime = user?.workingTime?.[lastIndex]?.entries?.start;
    const [exitModalOpen, setExitModalOpen] = useState(false);

    function msToTime(duration) {
        const seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        const pad = (num) => (num < 10 ? "0" + num : num);

        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }

    const getCurrentOnlineTime = (startTime) => {

        const [startHours, startMinutes, startSeconds] = startTime.split(':').map(Number);
        const now = new Date();
        const start = new Date();
        start.setHours(startHours, startMinutes, startSeconds);

        const result = now - start;

        return msToTime(result);
    };

    useEffect(() => {
        dispatch(auth());
        const timer = setInterval(() => {
            setCurrentTime(getCurrentOnlineTime(startTime));
        }, 1000);
        return () => clearInterval(timer);
    }, [startTime]);

    return (

        <>
            {
                exitModalOpen ?
                    <Modal>
                        <ExitModal now={now} setExitModalOpen={setExitModalOpen} />
                    </Modal> : null
            }
            <div className="bg-sky-50 overflow-y-scroll h-[93vh]">
                <div className="p-10 flex justify-center gap-7 ">

                    <div className="flex flex-col gap-5 w-[47%]">

                        <div className="bg-white border shadow-inner p-10 flex flex-col gap-5 rounded-lg">
                            <div className="text-3xl text-sky-900 font-medium text-center">Час вашого сеансу:</div>
                            <div className="text-center text-sky-900 text-8xl font-bold">{currentTime}</div>
                            <div className="w-full text-center mt-4">
                                <button onClick={async () => { setExitModalOpen(true) }} className="bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-3 text-lg rounded-md transition ease-out hover:ease-in">
                                    Закінчити робочу зміну
                                    <img className="w-6 inline-block ml-3 mb-1" src={Logout} alt="" />
                                </button>

                            </div>
                        </div>

                        <div className=" flex flex-col gap-6 bg-white border shadow-inner p-10 rounded-lg">
                            <div className="text-3xl text-sky-900 font-medium text-center">Інформація за зміну:</div>
                            <ul className="text-xl text-sky-800">
                                <li>Кількість обслужених столиків: <span className="text-xl underline font-medium text-sky-950">{user?.workingTime?.filter(date => date.date === now.split(', ')[0])[0].servedTablesNumber}</span></li>
                                <li>Початок робочої зміни о: <span className="text-xl underline font-medium text-sky-950">{startTime}</span></li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-6 bg-white border shadow-inner p-10 rounded-lg">
                            <div className="text-3xl text-sky-900 font-medium text-center">Загальна інформація:</div>
                            <ul className="text-xl text-sky-800">
                                <li>Ім'я: <span className="text-xl underline font-medium text-sky-950">{user.name}</span></li>
                                <li>Посада: <span className="text-xl underline font-medium text-sky-950">{user.position}</span></li>
                            </ul>
                        </div>

                    </div>
                    <div className="flex flex-col gap-5 w-[47%]">
                        <div className="flex flex-col gap-4 bg-white border shadow-inner p-10 rounded-lg">
                            <div className="text-3xl text-sky-900 font-medium text-center">Побажання та потреби:</div>
                            <div className="flex border-2 border-sky-900 rounded-xl p-1 mt-2">
                                <div className="flex flex-col w-full">
                                    <textarea onChange={(e) => { setWishesAreaText(e.target.value) }} value={wishesAreaText} placeholder="Введіть повідомлення для адміністратора..." className="w-full text-lg p-5 outline-none text-sky-900 font-medium" name="" id="" rows="7"></textarea>
                                    <div className="flex justify-around items-center text text-xl font-medium my-3 h-auto">
                                        <div className="flex items-center gap-3 bg-sky-500 text-white px-5 py-2 rounded-md">
                                            <input value="Не терміново" className="w-8 h-8" type="radio" name="priority" onChange={(e) => setPriority(e.target.value)} />Не терміново
                                        </div>
                                        <div className="flex items-center gap-3 bg-sky-700 text-white px-5 py-2 rounded-md">
                                            <input value="Терміново" className="w-8 h-8" type="radio" name="priority" onChange={(e) => setPriority(e.target.value)} />Терміново
                                        </div>
                                        <div className="flex items-center gap-3 bg-sky-900 text-white px-5 py-2 rounded-md">
                                            <input value="Дуже терміново" className="w-8 h-8" type="radio" name="priority" onChange={(e) => setPriority(e.target.value)} />Дуже терміново
                                        </div>
                                    </div>

                                </div>
                                <button disabled={wishesAreaText === '' || !priority} onClick={() => {
                                    notify();
                                    setPriority('');
                                    addNeedToRestaurant(restaurantId, user.name, wishesAreaText, now.split(', ')[1], now.split(', ')[0], priority);
                                    setWishesAreaText('');
                                }} className="p-6 bg-sky-800 hover:bg-sky-900 active:bg-sky-950 rounded-md disabled:bg-sky-900/30 disabled:cursor-not-allowed transition ease-out hover:ease-in"><img className="w-10" src={Send} alt="" /></button>
                                <Toaster
                                    position="top-right"
                                    reverseOrder={false}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 bg-white border shadow-inner p-10 rounded-lg">
                            <div className="text-3xl text-sky-900 font-medium text-center">Зворотній зв'язок:</div>
                            <div className="flex border-2 border-sky-900 rounded-xl p-1 mt-2">
                                <textarea onChange={(e) => { setContactAreaText(e.target.value) }} value={contactAreaText} placeholder="Введіть повідомлення для адміністратора..." className="w-full text-lg p-5 outline-none text-sky-900 font-medium " name="" id="" rows="7"></textarea>
                                <button disabled={contactAreaText === ''} onClick={() => {
                                    notify();
                                    addFeedbackToRestaurant(restaurantId, user.name, contactAreaText, now.split(', ')[1], now.split(', ')[0]);
                                    setContactAreaText('');
                                }} className="p-6 bg-sky-800 hover:bg-sky-900 active:bg-sky-950 rounded-md disabled:bg-sky-900/30 disabled:cursor-not-allowed transition ease-out hover:ease-in"><img className="w-10" src={Send} alt="" /></button>
                                <Toaster
                                    position="top-right"
                                    reverseOrder={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}