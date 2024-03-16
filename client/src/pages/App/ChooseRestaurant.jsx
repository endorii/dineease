import Restaurant from '../../assets/svg/house.svg';
import { useDispatch, useSelector } from 'react-redux';
import { Suspense, useEffect } from 'react';
import { fetchRestaurants } from '../../store/slices/restaurant.slice';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../actions/user.actions';
import { Loader } from './Loader';
import { Toaster } from 'react-hot-toast';
import withHelmet from '../../utils/helpers/withHelmet';

const ChooseRestaurant = () => {

    const dispatch = useDispatch();

    const { restaurants } = useSelector(state => state.restaurants);

    const navigate = useNavigate();

    const token = localStorage.getItem('accessToken')

    useEffect(() => {
        dispatch(fetchRestaurants());
        dispatch(auth());
    }, []);

    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, [token])

    return (
        <div className="flex flex-col w-screen h-screen justify-center items-center text-sky-900">
            <div className="text-4xl">Виберіть ваш ресторан</div>
            <div className='flex justify-center'>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
                <Suspense fallback={<Loader />}>
                    <ul className="flex justify-center items-center gap-12 px-7 py-10">
                        {restaurants.length > 0 ? restaurants.map((restaurant, i) =>
                            <li key={restaurant._id} className="flex items-center p-14 rounded-lg cursor-pointer shadow-lg hover:bg-sky-900/5 transition ease-out hover:ease-in" onClick={() => {
                                // dispatch(getEmployeesByRestaurant(restaurant._id));
                                navigate(`/login/${restaurant._id}`)
                            }}>
                                <img className="w-10 mr-2 inline-block" src={Restaurant} alt="" />
                                <div className="flex flex-col">
                                    <div className="text-2xl inline-block font-medium">{restaurant.name}</div>
                                    <div className="text-l inline-block font-thin text-gray-800">{restaurant.address}</div>
                                </div>
                            </li>
                        ) : <div>Немає доступних ресторанів</div>}
                    </ul>
                </Suspense>
            </div>
        </div>
    )
}

export default withHelmet(ChooseRestaurant, 'Виберіть ваш ресторан')