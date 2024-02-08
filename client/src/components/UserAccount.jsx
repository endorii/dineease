import { useEffect } from 'react';
import Logout from '../assets/svg/logout.svg';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logout } from '../store/slices/user.slice';
import { useNavigate } from 'react-router-dom';
import { auth } from '../actions/user.actions';

const UserAccount = () => {

    const dispatch = useDispatch();

    const { user } = useSelector(state => state.user);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const experienceCounter = (experience) => {
        let lastDigit = experience % 10;
        let lastTwoDigits = experience % 100;

        if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
            return `${experience} років`;
        } else if (lastDigit === 1) {
            return `${experience} рік`;
        } else if (lastDigit >= 2 && lastDigit <= 4) {
            return `${experience} роки`;
        } else {
            return `${experience} років`;
        }
    }

    useEffect(() => {
        if (!token) {
            navigate('/')
        }
        dispatch(auth());
    }, [token])

    return (
        <div className='flex flex-col h-full' >
            <div className="flex justify-between ">
                <h2 className="text-3xl font-medium text-sky-900">Інформація про аккаунт</h2>
                <button className="flex items-center bg-yellow-600 hover:bg-yellow-700 rounded-lg px-7 py-2 text-white font-medium drop-shadow-md"
                    onClick={() =>
                        dispatch(logout())
                    }
                >
                    Вийти
                    <img className='w-7 inline pl-2' src={Logout} alt="" />
                </button>
            </div>
            <hr className='border-t-1 border-slate-300 my-5' />

            <div className='flex flex-col p-10 gap-5 overflow-y-scroll'>

                <div className='flex gap-5 justify-center w-full'>
                    <div className='flex flex-col bg-white shadow-xl p-10 rounded-xl w-full h-auto'>
                        <div className='flex items-center gap-5 mb-4 m-2'>
                            <h3 className='text-2xl font-medium'>{user.name}</h3>
                            <p className='text-lg font-medium rounded-md px-6 py-2 bg-sky-500 text-white'>{user.position}</p>
                        </div>
                        <hr />
                        <div className='flex flex-col gap-2 m-2 '>
                            <div className='text-gray-500'>Е-пошта:<span className='ml-6 text-lg text-black'>{user.email}</span></div>
                            <div className='text-gray-500'>Телефон:<span className='ml-6 text-lg text-black'>user.phone</span></div>
                        </div>
                    </div>
                    <div className='flex flex-col bg-white shadow-xl p-10 rounded-xl w-full h-auto'>
                        <div className='p-3'>
                            <p className='font-medium text-2xl text-center mb-5'>Час робочої зміни</p>
                            <p className='bg-gray-100 text-black text-5xl mt-2 px-5 py-3 rounded-xl text-center'>01:29:31</p>
                        </div>
                    </div>
                </div>

                <div className='flex gap-5'>
                    <div className='bg-white shadow-xl p-10 rounded-xl min-w-[60%] h-auto'>
                        <div>
                            <div className=''>
                                <h3 className='text-2xl font-medium p-3'>Базова інформація</h3>
                                <div className='flex gap-5 pb-5'>
                                    <div className='p-3'>
                                        <p className='font-medium text-xl text-sky-800 '>Ресторан</p>
                                        <p className='bg-sky-950 text-white mt-2 px-3 py-2 rounded-xl'>restaurant.name</p>
                                    </div>
                                    <div className='p-3'>
                                        <p className='font-medium text-xl text-sky-800 '>Дата реєстрації</p>
                                        <p className='bg-sky-950 text-white mt-2 px-3 py-2 rounded-xl'>user.registrationDate</p>
                                    </div>
                                    <div className='p-3'>
                                        <p className='font-medium text-xl text-sky-800 '>ID робітника</p>
                                        <p className='bg-sky-950 text-white mt-2 px-3 py-2 rounded-xl'>{user._id}</p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className=''>
                                <h3 className='text-2xl font-medium p-3'>Особиста інформація</h3>
                                <div className='flex gap-5 pb-5'>
                                    <div className='p-3'>
                                        <p className='font-medium text-xl text-sky-800'>Дата народження</p>
                                        <p className='bg-sky-950 text-white mt-2 px-3 py-2 rounded-xl'>user.birthDate</p>
                                    </div>
                                    <div className='p-3'>
                                        <p className='font-medium text-xl text-sky-800'>Адреса</p>
                                        <p className='bg-sky-950 text-white mt-2 px-3 py-2 rounded-xl'>user.location</p>
                                    </div>
                                    <div className='p-3'>
                                        <p className='font-medium text-xl text-sky-800'>Стаж роботи</p>
                                        <p className='bg-sky-950 text-white mt-2 px-3 py-2 rounded-xl'>{experienceCounter(+user.experience)} </p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <h3 className='text-2xl font-medium p-3'>Загальна інформація</h3>
                                <div className='flex gap-5 pb-5'>
                                    <div className='p-3'>
                                        <p className='font-medium text-xl text-sky-800 '>Тип часу роботи</p>
                                        <p className='bg-sky-950 text-white mt-2 px-3 py-2 rounded-xl'>Повний робочий день</p>
                                    </div>
                                    <div className='p-3'>
                                        <p className='font-medium text-xl text-sky-800 '>Професія</p>
                                        <p className='bg-sky-950 text-white mt-2 px-3 py-2 rounded-xl'>user.position</p>
                                    </div>
                                    <div className='p-3'>
                                        <p className='font-medium text-xl text-sky-800 '>Локація</p>
                                        <p className='bg-sky-950 text-white mt-2 px-3 py-2 rounded-xl'>user.restaurant.location</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col bg-white shadow-xl p-10 rounded-xl w-full h-auto'>
                        <div className='p-3'>
                            <p className='font-medium text-2xl text-center mb-5'>Ще деяка інформація</p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam eligendi autem earum esse quam provident nam inventore culpa quas tempore aspernatur cum laboriosam, cupiditate deserunt, officiis odio impedit ipsam dolores.
                            Et neque unde possimus quisquam mollitia explicabo eveniet in nisi, vero totam. Eligendi explicabo consequatur adipisci dolorum vitae, facere obcaecati deserunt! Culpa possimus, repudiandae quae at eos a tenetur quasi.
                            Voluptatem id earum nam quis optio obcaecati aliquid consequuntur laborum at fugiat, veniam atque repudiandae maiores et, alias ducimus saepe excepturi molestias perferendis cupiditate quibusdam voluptas iusto. Nulla, maxime optio.
                            Amet possimus, nesciunt minus sunt soluta, ut nisi sit ipsa asperiores dolorem pariatur veritatis architecto voluptate, eos aperiam illo. Eligendi quae voluptatibus eveniet officia harum laboriosam accusamus quidem quibusdam illo.
                            Non, dignissimos quos quis molestias voluptas, nisi ipsa quasi, totam possimus velit tenetur provident eius. Veniam, soluta? Aut, nisi, deleniti nemo libero ex cum aliquid accusantium odit commodi, non sunt!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserAccount;