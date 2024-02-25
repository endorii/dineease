import { useEffect, useState } from 'react';
import Logout from '../../../../assets/svg/logout.svg';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logout } from '../../../../store/slices/user.slice';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../../actions/user.actions';
import { experienceCounter } from '../../../../functions';
import Calendar from 'react-calendar';
import { updateEmployeeEndWorkingTime } from '../../../../actions/employees.actions';
import { AdminLogoutModal } from '../../AdminLogoutModal';

const UserAccount = () => {

    const dispatch = useDispatch();

    const { user } = useSelector(state => state.user);
    const token = localStorage.getItem("accessToken");
    const navigate = useNavigate();

    const [date, setDate] = useState(new Date());
    const [exitModal, setExitModal] = useState(false);

    const onChange = date => setDate(date);

    const tileClassName = ({ date, view }) => {
        if (dates.find(d => d.getTime() === date.getTime())) {
            return 'highlight';
        }
    }

    const dates = user?.workingTime ? user.workingTime.map(item => {
        const [day, month, year] = item.date.split(".");
        return new Date(year, month - 1, day);
    }) : [];

    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, [token]);

    useEffect(() => {
        dispatch(auth());
    }, []);

    return (
        <>
            {exitModal && <AdminLogoutModal setExitModal={setExitModal} onConfirm={async () => {
                setExitModal(false)
                await updateEmployeeEndWorkingTime(user._id);
                dispatch(logout());
            }} />}
            <div className='flex flex-col h-full' >
                <div className="flex justify-between ">
                    <h2 className="text-3xl font-medium text-sky-900">Інформація про аккаунт</h2>
                    <button className="flex items-center bg-yellow-600 hover:bg-yellow-700 rounded-lg px-7 py-2 text-white font-medium drop-shadow-md"
                        onClick={() => {
                            setExitModal(true)
                        }}
                    >
                        Вийти
                        <img className='w-7 inline pl-2' src={Logout} alt="" />
                    </button>
                </div>
                <hr className='border-t-1 border-slate-300 my-5' />

                <div className='flex flex-col pb-10 gap-5 overflow-y-scroll'>

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
                            <div className="flex flex-col items-center">
                                <div>
                                    <h3 className="text-2xl font-medium px-10 py-5">Робочі години та відвідуваність:</h3>
                                </div>
                                <div className="bg-white rounded-xl shadow-lg m-5 p-5">
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserAccount;