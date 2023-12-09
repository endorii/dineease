import { useEffect } from 'react';
import Logout from '../assets/svg/logout.svg';
// import { logout } from '../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

const UserAccount = () => {

    const dispatch = useDispatch();

    // const navigate = useNavigate();
    // const { name, phone, email, company } = useSelector(state => state.user.user)
    // const token = localStorage.getItem("token");

    const name = "Alex",
        salary = "40000 UAH",
        email = "someexampl@gmail.com",
        restaurant = 'spicy'


    useEffect(() => {
        // if (!token) {
        //     navigate('/auth/login')
        // }
    })

    return (
        <div className='flex flex-col' >
            <div className="flex justify-between ">
                <h2 className="text-3xl font-medium text-sky-900">Інформація про аккаунт</h2>
                <button className="flex items-center bg-yellow-600 hover:bg-yellow-700 rounded-lg px-7 py-2 text-white font-medium drop-shadow-md"
                // onClick={() => 
                // // dispatch(logout())
                // }
                >
                    Вийти
                    <img className='w-7 inline pl-2' src={Logout} alt="" />
                </button>
            </div>
            <hr className='border-t-1 border-slate-300 my-10' />

            <div className='flex justify-center items-center'>

                <div className='flex flex-col gap-10 bg-white w-[80%] p-20 shadow-inner border'>

                    <div className='flex flex-raw items-center gap-[10%]'>
                        <div className='mr-2 w-72 text-xl text-sky-800 font-medium bg-teal-600/20 py-3 px-5 rounded-md'>Початок робочої зміни: </div>
                        <input type="text" value="15:35:21" className="pl-5 block w-96 h-10 rounded-md border py-1.5 text-gray-900 shadow-sm text-lg" />
                    </div>
                    <div className='flex flex-raw items-center gap-[10%]'>
                        <div className='mr-2 w-72 text-xl text-sky-800 font-medium bg-teal-600/20 py-3 px-5 rounded-md'>Ім'я акаунту: </div>
                        <input type="text" value={name} className="pl-5 block w-96 h-10 rounded-md border py-1.5 text-gray-900 shadow-sm text-lg" />
                    </div>


                    <div className='flex flex-raw items-center gap-[10%]'>
                        <div className='mr-2 w-72 text-xl text-sky-800 font-medium bg-teal-600/20 py-3 px-5 rounded-md'>Ресторан: </div>
                        <input type="text" value={restaurant} className="pl-5 block w-96 h-10 rounded-md border py-1.5 text-gray-900 shadow-sm text-lg" />
                    </div>


                    <div className='flex flex-raw items-center gap-[10%]'>
                        <div className='mr-2 w-72 text-xl text-sky-800 font-medium bg-teal-600/20 py-3 px-5 rounded-md'>Email: </div>
                        <input type="text" value={email} className="pl-5 block w-96 h-10 rounded-md border py-1.5 text-gray-900 shadow-sm text-lg" />
                    </div>

                    <div className='flex flex-raw items-center gap-[10%]'>
                        <div className='mr-2 w-72 text-xl text-sky-800 font-medium bg-teal-600/20 py-3 px-5 rounded-md'>Зарплата </div>
                        <input type="text" value={salary} className="pl-5 block w-96 h-10 rounded-md border py-1.5 text-gray-900 shadow-sm text-lg" />
                    </div>

                </div>

            </div>

        </div>
    )
}

export default UserAccount;