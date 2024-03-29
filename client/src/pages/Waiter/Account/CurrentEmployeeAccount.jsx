import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import Logout from '../../../assets/svg/logout.svg'
import Send from '../../../assets/svg/send.svg'
import { addFeedbackToRestaurant } from "../../../actions/feedback.actions"
import { addNeedToRestaurant } from "../../../actions/needs.actions"
import toast, { Toaster } from 'react-hot-toast';
import { auth } from "../../../actions/user.actions"
import { ExitModal } from "../ExitModal"
import { AnimatePresence } from "framer-motion"
import { getCurrentOnlineTime } from "../../../functions"
import Calendar from 'react-calendar';

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

    const dates = user?.workingTime ? user.workingTime.map(item => {
        const [day, month, year] = item.date.split(".");
        return new Date(year, month - 1, day);
    }) : [];

    const priorities = ['Низька', 'Середня', 'Висока']

    const [date, setDate] = useState(new Date());
    const onChange = date => setDate(date);

    const tileClassName = ({ date, view }) => {
        if (dates.find(d => d.getTime() === date.getTime())) {
            return 'highlight';
        }
    }
    useEffect(() => {
        document.title = `Інформація про аканут ${user.name ? user.name : ''}`;
    }, [user])

    useEffect(() => {
        dispatch(auth());
        const timer = setInterval(() => {
            setCurrentTime(getCurrentOnlineTime(startTime));
        }, 1000);
        return () => clearInterval(timer);
    }, [startTime]);

    return (
        <>
            <AnimatePresence initial={exitModalOpen}>
                {exitModalOpen && <ExitModal now={now} setExitModalOpen={setExitModalOpen} />}
            </AnimatePresence>
            <div className="bg-sky-50 overflow-y-scroll h-[93vh]">
                <div className="p-10 flex flex-col justify-between gap-7
                lg:flex-row lg:gap-3 lg:p-5">
                    <div className="flex flex-col gap-5 w-full">
                        <div className="bg-white border shadow-inner p-10 flex flex-col gap-5 rounded-lg">
                            <div className="text-3xl text-sky-900 font-medium text-center">Час вашого сеансу:</div>
                            <div className="text-center text-sky-900 text-8xl font-bold">{currentTime}</div>
                            <div className="w-full text-center mt-4">
                                <button onClick={async () => { setExitModalOpen(true) }} className="bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-3 text-lg rounded-md transition ease-out hover:ease-in">
                                    Закінчити робочу зміну
                                    <img className="w-6 inline-block ml-3 mb-1" src={Logout} alt="" />
                                </button>
                            </div>
                            <div className="flex gap-4 bg-white border shadow-md py-5 rounded-lg justify-center">
                                <Calendar
                                    onChange={onChange}
                                    value={date}
                                    tileClassName={tileClassName}
                                />
                                <style>{`
                                .react-calendar {
                                border: none;
                                margin: 30px
                                }
                                .highlight {
                                    background: rgb(8 47 73);;
                                    color: white;
                                }
                            `}</style>
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
                    <div className="flex flex-col gap-5 w-full">
                        <div className="flex flex-col gap-4 bg-white border shadow-inner p-10 rounded-lg">
                            <div className="text-3xl text-sky-900 font-medium text-center">Побажання та потреби:</div>
                            <div className="flex border-2 border-sky-900 rounded-xl p-1 mt-2">
                                <div className="flex flex-col w-full">
                                    <textarea onChange={(e) => { setWishesAreaText(e.target.value) }} value={wishesAreaText} placeholder="Введіть повідомлення для адміністратора..." className="w-full text-lg p-5 outline-none text-sky-900 font-medium" name="" id="" rows="7"></textarea>
                                    <div className="flex justify-around items-center text text-base font-medium my-3 h-auto
                                    lg:gap-1 lg:flex-wrap">
                                        {priorities.map((item, i) => 
                                            <div className={`flex items-center gap-3 ${item === 'Низька' ? 'bg-sky-500' : item === 'Середня' ? 'bg-sky-700' : item === 'Висока' ? 'bg-sky-900' : ''} text-white p-2 rounded-md w-full m-1`} key={i}>
                                                <input value={item} className="w-8 h-8" type="radio" name="priority" onChange={(e) => setPriority(e.target.value)} />{item}
                                            </div>
                                        )}
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
                                <textarea onChange={(e) => { setContactAreaText(e.target.value) }} value={contactAreaText} placeholder="Введіть повідомлення для адміністратора..." className="w-full text-lg p-5 outline-none text-sky-900 font-medium " rows="7"></textarea>
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