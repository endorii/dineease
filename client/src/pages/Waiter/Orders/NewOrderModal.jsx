import Test from '../../../../src/assets/img/test.jpg'
import Close from '../../../assets/svg/close.svg'
import Time from '../../../assets/svg/time.svg'
import Trash from '../../../assets/svg/trash.svg'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuCategories } from '../../../store/slices/menuCategories.slice';
import { useParams } from 'react-router-dom';
import { configureOrder, dropIn, getTotalInsideOrderValue } from '../../../functions';
import toast from 'react-hot-toast';
import { fetchMenuDishes } from '../../../store/slices/menuDishes.slice';
import { getOrdersByWaiter } from '../../../actions/orders.actions';
import { Modal } from '../../App/Modal';
import { motion } from 'framer-motion';

export const NewOrderModal = ({ setOpenNewOrderMenu, currentTable }) => {
    const [guests, setGuests] = useState([]);
    const [currentCategoryFood, setCurrentCategoryFood] = useState('');
    const [currentGuest, setCurrentGuest] = useState({});

    const notifySuccess = () => {
        toast.success('Замовлення успішно відправлено на кухню!');
    };

    const { user } = useSelector(state => state.user)

    const { menuCategories } = useSelector(state => state.menuCategories);
    const { menuDishes } = useSelector(state => state.menuDishes);

    const dispatch = useDispatch();
    const { restaurantId } = useParams();

    const addGuest = () => {
        const newGuest = {
            id: guests.length + 1,
            orderInfo: [],
        };

        setGuests([...guests, newGuest]);
    };

    const selectFoodForGuest = (currentGuest, foodItem) => {
        const updatedGuests = [...guests];
        currentGuest.orderInfo.push(foodItem);
        setGuests(updatedGuests);
    };

    const removeGuest = (guestId) => {
        const updatedGuests = guests.filter((guest) => guest.id !== guestId);
        setGuests(updatedGuests);
    };

    useEffect(() => {
        dispatch(fetchMenuCategories(restaurantId));
        dispatch(fetchMenuDishes(restaurantId));
        // dispatch(getOrdersByWaiter(restaurantId));
    }, [])

    return (
        <Modal onClick={() => setOpenNewOrderMenu(false)}>
            <motion.div onClick={(e) => e.stopPropagation()} variants={dropIn} initial='hidden' animate='visible' exit='exit' className='absolute w-full flex justify-center cursor-default
            m-5
            sm:
            md:
            lg:mt-10
            xl: 
            2xl:'>

                <div className='absolute bg-white shadow-xl w-[95%] z-10 rounded-md bg-gray-400'>
                    <div className=""><img className="absolute top-4 right-4 z-20 w-8 cursor-pointer
                sm:
                md:top-3 md:right-3 md:w-10
                lg:top-5 lg:right-5
                xl: 
                2xl: 
                " src={Close} alt="" onClick={() => {
                            setOpenNewOrderMenu(false)
                        }} /></div>
                    <div>
                        <div className="flex rounded-xl h-[90vh]">
                            <div className="bg-gray-200 w-[35%] h-full flex flex-col justify-between overflow-x-auto
                            sm:
                            md:w-[40%]
                            lg:w-[30%]
                            xl: 
                            2xl: 
                            ">
                                <div>
                                    <table className="w-full text-left text-gray-500 ">
                                        <thead className="text-gray-700 uppercase bg-gray-300">
                                            <tr className='text-center'>
                                                <th scope="col" className="p-1 text-[12px]
                                                sm:
                                                md:text-sm
                                                lg:text-base lg:p-3
                                                xl: 
                                                2xl: 
                                                ">
                                                    Назва
                                                </th>
                                                <th scope="col" className="p-1 text-[12px]
                                                sm:
                                                md:text-sm
                                                lg:text-base lg:p-3
                                                xl: 
                                                2xl: 
                                                ">
                                                    Кількість
                                                </th>
                                                <th scope="col" className="p-1 text-[12px]
                                                sm:
                                                md:text-sm
                                                lg:text-base lg:p-3
                                                xl: 
                                                2xl: 
                                                ">
                                                    Ціна
                                                </th>
                                            </tr>
                                        </thead>
                                    </table>
                                    <div className="p-3 flex flex-col gap-y-3 items-start
                                    sm:
                                    md:
                                    lg:
                                    xl: 
                                    2xl: 
                                    ">
                                        {guests.map((guest, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className={`bg-white w-full rounded-lg px-3 py-3 cursor-pointer ${currentGuest.id === guest.id ? 'border-4 border-sky-800' : ''}`} onClick={() => setCurrentGuest(guest)}>
                                                    <div className='flex justify-between p-2 items-center'>
                                                        <div className="text-base font-bold
                                                        sm:
                                                        md:
                                                        lg:
                                                        xl: 
                                                        2xl: 
                                                        ">Гість {guest.id}</div>
                                                        <button
                                                            className="text-lg font-bold px-4 py-2 bg-yellow-700 hover:bg-yellow-800 text-white rounded-xl transition ease-out hover:ease-in"
                                                            onClick={() => {
                                                                removeGuest(guest.id);
                                                            }}
                                                        >
                                                            <img className='w-8 h-8' src={Trash} alt="" />
                                                        </button>

                                                    </div>
                                                    <div className='flex justify-center mb-4'>
                                                        <hr className='w-full' />
                                                    </div>
                                                    <div className='w-full text-base
                                                    sm:
                                                    md:
                                                    lg:text-lg
                                                    xl: 
                                                    2xl: 
                                                    '>
                                                        <tbody className='bg-gray-100 p-1 m-2 rounded-xl w-full '>
                                                            {guest.orderInfo.map((dish, i) => {
                                                                return (
                                                                    <tr key={i} className="bg-white border-b border-gray-300 text-gray-700">
                                                                        <td className="w-[40%] p-1 text-left">
                                                                            {dish.name}
                                                                        </td>
                                                                        <td className=" w-[5%] p-3 text-center">
                                                                            1
                                                                        </td>
                                                                        <td className="w-[40%] p-1 text-right font-medium">
                                                                            {dish.price} ₴
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        <button onClick={() => addGuest()} className="text-lg font-medium" >+ Додати гостя</button>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 m-3 rounded-lg">
                                    <div className="flex justify-center bg-white px-3 py-4 rounded-lg">
                                        <button disabled={(!guests.every((order) => order.orderInfo[0])) || !guests.length} onClick={() => {
                                            notifySuccess();
                                            configureOrder(restaurantId, guests, currentTable, user._id);
                                            setOpenNewOrderMenu(false);
                                            dispatch(getOrdersByWaiter(restaurantId));
                                        }} className="w-full bg-teal-700 hover:bg-teal-800 p-3 rounded-lg text-white font-medium transition ease-out hover:ease-in disabled:bg-teal-900/40 disabled:cursor-not-allowed
                                        sm:
                                        md:
                                        lg:
                                        xl:text-lg
                                        2xl:
                                        ">
                                            Відправити на кухню
                                        </button>
                                    </div>
                                    <div className='bg-white rounded-lg p-3 flex flex-col gap-3 text-lg
                                    sm:
                                    md:
                                    lg:text-xl
                                    xl:text-2xl
                                    2xl: 
                                    '>
                                        <div className="flex w-full justify-between items-center flex-col
                                        sm:
                                        md:flex-row
                                        lg:
                                        xl: 
                                        2xl: 
                                        ">
                                            <div className="font-thin">Разом до сплати</div>
                                            <div className="font-medium">{getTotalInsideOrderValue(guests)} ₴</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 bg-white px-10 py-5 overflow-x-auto">
                                <div className="">
                                    <button disabled={currentCategoryFood === ""} onClick={() => {
                                        setCurrentCategoryFood('')
                                    }} className="text-lg text-white font-medium mb-10 bg-teal-700 px-5 py-2 rounded-xl hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-teal-900/40 transition ease-out hover:ease-in">Назад</button>
                                </div>
                                <div className="">
                                    <ul className="flex flex-wrap gap-7 justify-center">
                                        {currentCategoryFood ?
                                            menuDishes.map((dish, i) => currentCategoryFood === dish.categoryName ?
                                                <li key={i} className="bg-gray-100 rounded-lg shadow-md cursor-pointer"
                                                    onClick={() => { if (Object.keys(currentGuest).length !== 0) { selectFoodForGuest(currentGuest, dish) } }}>
                                                    <img className="w-[350px] h-[200px] object-cover object-[50% 100%] rounded-t-lg
                                                sm:
                                                md:
                                                lg:w-[270px] lg:h-[180px]
                                                xl: 
                                                2xl: 
                                                " src={Test} alt={dish.name} />
                                                    <div className="font-thin px-4 py-2 text-xl">{dish.name}</div>
                                                    <div className="flex justify-between">
                                                        <div className="flex items-center font-thin px-4 py-2 text-lg"> <img className="w-4 mr-1" src={Time} alt="" />{dish.readyTime}</div>

                                                        <div className="font-medium px-4 py-2 text-xl">{dish.price} ₴</div>
                                                    </div>
                                                </li> : null
                                            ) : (menuCategories.map((category, i) => (
                                                <li key={i} onClick={() => { setCurrentCategoryFood(category.category); }} className="bg-gray-100 rounded-lg shadow-md cursor-pointer ">
                                                    <img className="w-[350px] h-[200px] object-cover object-[50% 100%] rounded-t-lg
                                                    sm:
                                                    md:
                                                    lg:w-[270px] lg:h-[180px]
                                                    xl:w-[350px] xl:h-[200px] 
                                                    2xl: 
                                                    " src={Test} alt={category.alt} />
                                                    <div className="font-thin text-xl px-4 py-2">{category.category}</div>
                                                </li>
                                            )))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Modal>
    )
};

