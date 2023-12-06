import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getEmployeeByRestaurantAndPin } from "../actions/employees.actions"
// import { addNeed } from "./needs.actions"
// import { addContactText } from "./contactText.actions"

export const CurrentEmployeeAccount = () => {

    const { employees } = useSelector(state => state.employees)
    const startTime = new Date('Fri Oct 24 2023 10:30:57 GMT+0300');
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
        const seconds = diffInSeconds % 60;
        const minutes = Math.floor(diffInSeconds / 60) % 60;
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const now = new Date().toLocaleString();

    useEffect(() => {
        dispatch(getEmployeeByRestaurantAndPin(restaurant, 1111));
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(getCurrentOnlineTime(startTime))
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="h-screen overflow-y-scroll">
            <div className="py-10">
                <div className="flex text-center justify-center gap-10 flex-wrap">
                    <div className="">
                        <div className="py-10 rounded-lg shadow-md bg-white w-auto top-[25%] left-[17%] flex flex-col fustify-center items-center text-4xl font-thin">
                            Час вашого сеансу:
                            <div className="text-9xl text-gray-700 font-bold p-10">
                                {currentTime}
                            </div>
                            <div>
                                <button className="px-6 py-3 bg-red-500 text-3xl text-white rounded-lg" onClick={async () => { navigate('/employees'); }}>Завершити робочу зміну</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-10 w-[43%] flex-col">
                        <div className=" bg-white rounded-xl shadow-md">
                            <p className="text-2xl p-5 font-medium text-gray-700">Загальна інформація:</p>
                            <ul className="flex flex-col gap-10 p-10 text-left text-xl font-thin">
                                <li>
                                    <p>
                                        Імя:
                                        {/* {employees[0].name} */}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Посада:
                                        {/* {employees[0].position} */}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Робочі години за весь час:
                                        {/* {employees[0].totalWorkingTime} */}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Кількість обслужених замовлень\столиків: 100
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className=" bg-white rounded-xl shadow-md">
                        <p className="text-2xl p-5 font-medium text-gray-700">Інформація за зміну:</p>
                        <ul className="flex flex-col gap-10 p-10 text-left text-xl font-thin">
                            <li>
                                <p>
                                    Початок робочої зміни о: {startTime.toLocaleTimeString()}
                                </p>
                            </li>
                            <li>
                                <p>
                                    Кількість обслужених замовлень\столиків за зміну: 100
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className=" bg-white rounded-xl shadow-md">
                        <p className="text-2xl p-5 font-medium text-gray-700">Побажання та потреби:</p>
                        <div className="px-10">
                            <textarea onChange={(e) => { setWishesAreaText(e.target.value) }} value={wishesAreaText} placeholder="Введіть повідомлення для адміністратора..." className="rounded-lg bg-gray-100 border-b-4 px-5 py-3 w-full text-lg" name="" id="" cols="30" rows="10"></textarea>
                            <button onClick={() => {
                                // addNeed(wishesAreaText, currentEmployee.name, now); setWishesAreaText('')
                            }} className="bg-green-500 hover:bg-green-600 rounded-lg m-5 px-7 py-2 text-white font-medium drop-shadow-md disabled:bg-green-900/20 disabled:hover:bg-green-900/20 disabled:text-gray-100 disabled:cursor-not-allowed">Відправити</button>
                        </div>
                        <div className=" bg-white rounded-xl shadow-md">
                            <p className="text-2xl p-5 font-medium text-gray-700">Зворотній зв'язок:</p>
                            <div className="px-10">
                                <textarea onChange={(e) => { setContactAreaText(e.target.value) }} value={contactAreaText} placeholder="Введіть повідомлення для адміністратора..." className="rounded-lg bg-gray-100 border-b-4 px-5 py-3 w-full text-lg" name="" id="" cols="30" rows="10"></textarea>
                                <button onClick={() => {
                                    // addContactText(contactAreaText, currentEmployee.name, now); 
                                    setContactAreaText('')
                                }} className="bg-green-500 hover:bg-green-600 rounded-lg m-5 px-7 py-2 text-white font-medium drop-shadow-md disabled:bg-green-900/20 disabled:hover:bg-green-900/20 disabled:text-gray-100 disabled:cursor-not-allowed">Відправити</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}