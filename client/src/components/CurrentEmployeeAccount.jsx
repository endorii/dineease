import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getEmployeeByRestaurantAndPin } from "../actions/employees.actions"
import Logout from '../assets/svg/logout.svg'
import Send from '../assets/svg/send.svg'
import { logout } from "../store/slices/user.slice"
import { addNeedToRestaurant } from "../actions/needs.actions"
// import { addNeed } from "./needs.actions"
// import { addContactText } from "./contactText.actions"

export const CurrentEmployeeAccount = () => {

    const { employees } = useSelector(state => state.employees);
    const startTime = new Date('Sun Dec 10 2023 20:30:57 GMT+0300');
    const navigate = useNavigate();

    const [currentTime, setCurrentTime] = useState('');

    const [contactAreaText, setContactAreaText] = useState('');
    const [wishesAreaText, setWishesAreaText] = useState('');
    const { restaurant } = useParams();

    const dispatch = useDispatch();

    const getCurrentOnlineTime = (startTime) => {
        const now = new Date();
        const diffInMilliseconds = now - startTime;
        const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
        // const seconds = diffInSeconds % 60;
        const minutes = Math.floor(diffInSeconds / 60) % 60;
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours.toString().padStart(2, '0')}год. ${minutes.toString().padStart(2, '0')}хв.`;
    };

    const now = new Date().toLocaleString();
    const {user} = useSelector(state => state.user);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(getCurrentOnlineTime(startTime));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-sky-50 overflow-y-scroll h-[93vh]">
            <div className="p-10 flex justify-center gap-7 ">

                <div className="flex flex-col gap-5 w-[47%]">

                    <div className="bg-white border shadow-inner p-10 flex flex-col gap-5 rounded-lg">
                        <div className="text-3xl text-sky-900 font-medium text-center">Час вашого сеансу:</div>
                        <div className="text-center text-sky-900 text-8xl font-bold">{currentTime}</div>
                        <div className="w-full text-center mt-4">
                            <button onClick={() => {dispatch(logout()); navigate('/')}} className="bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-3 text-lg rounded-md m">
                                Закінчити робочу зміну
                                <img className="w-6 inline-block ml-3 mb-1" src={Logout} alt="" />
                            </button>
                        </div>
                    </div>

                    <div className=" flex flex-col gap-6 bg-white border shadow-inner p-10 rounded-lg">
                        <div className="text-3xl text-sky-900 font-medium text-center">Інформація за зміну:</div>
                        <ul className="text-xl text-sky-800">
                            <li>Кількість обслужених столиків: <span className="text-xl underline font-medium text-sky-950">10</span></li>
                            <li>Початок робочої зміни о: <span className="text-xl underline font-medium text-sky-950">20:30:57</span></li>
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
                            <textarea onChange={(e) => { setWishesAreaText(e.target.value) }} value={wishesAreaText} placeholder="Введіть повідомлення для адміністратора..." className="w-full text-lg p-5 outline-none text-sky-900 font-medium" name="" id="" rows="7"></textarea>
                            <button onClick={() => {
                                addNeedToRestaurant(restaurant, wishesAreaText, user.name, now); 
                                setWishesAreaText('');
                            }} className="p-6 bg-sky-800 hover:bg-sky-900 active:bg-sky-950 rounded-md "><img className="w-10" src={Send} alt="" /></button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 bg-white border shadow-inner p-10 rounded-lg">
                        <div className="text-3xl text-sky-900 font-medium text-center">Зворотній зв'язок:</div>
                        <div className="flex border-2 border-sky-900 rounded-xl p-1 mt-2">
                            <textarea onChange={(e) => { setContactAreaText(e.target.value) }} value={contactAreaText} placeholder="Введіть повідомлення для адміністратора..." className="w-full text-lg p-5 outline-none text-sky-900 font-medium" name="" id="" rows="7"></textarea>
                            <button onClick={() => {
                                // addContactText(contactAreaText, currentEmployee.name, now); 
                                setContactAreaText('');
                            }} className="p-6 bg-sky-800 hover:bg-sky-900 active:bg-sky-950 rounded-md "><img className="w-10" src={Send} alt="" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}