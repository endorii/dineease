import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { NewOrderModal } from "./NewOrderModal";
import { fetchMenuCategories } from "../../../store/slices/menuCategories.slice";
import { PayOrder } from "./PayOrder";
import { getTotalOrderValue } from "../../../functions";
import { Toaster } from 'react-hot-toast';
import { fetchMenuDishes } from "../../../store/slices/menuDishes.slice";
import { getOrdersByWaiter } from "../../../actions/orders.actions";
import { AnimatePresence } from "framer-motion";
import { SkeletonOrders } from "../../../ui/skeletons/SkeletonOrders";
import withHelmet from "../../../utils/helpers/withHelmet";

const Orders = () => {
    const [openNewOrderMenu, setOpenNewOrderMenu] = useState(false);
    const [openPayOrder, setOpenPayOrder] = useState(false);
    const [currentOrder, setCurrentOrder] = useState([])
    const dispatch = useDispatch()
    const { restaurantId } = useParams();
    const { orders, isLoading } = useSelector(state => state.orders)
    const openOrders = orders.filter(order => order.isOpen);

    useEffect(() => {
        dispatch(getOrdersByWaiter(restaurantId));
        dispatch(fetchMenuCategories(restaurantId));
        dispatch(fetchMenuDishes(restaurantId));
    }, [])

    return (
        <div className="h-screen">
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <AnimatePresence initial={openNewOrderMenu}>
                {openNewOrderMenu && <NewOrderModal setOpenNewOrderMenu={setOpenNewOrderMenu} />}

            </AnimatePresence>
            <AnimatePresence initial={openPayOrder}>
                {openPayOrder && <PayOrder setOpenPayOrder={setOpenPayOrder} currentOrder={currentOrder} />}
            </AnimatePresence>

            <div className="flex flex-col text-white justify-center bg-sky-50">
                <div className='flex justify-end p-3'>
                    <button className='px-6 py-3 bg-teal-700 rounded-lg hover:bg-teal-800 text-lg transition ease-out hover:ease-in' onClick={() => {
                        setOpenNewOrderMenu(true)
                    }}>Нове замовлення</button>
                </div>
            </div>
            <div className="p-5 bg-sky-50 overflow-y-scroll h-[80%]
            sm:p-2
            md:
            lg:p-10
            xl: 
            2xl: 
            ">
                <div className="shadow-md rounded-md">
                    {openOrders.length > 0 ?
                        <table className="w-full text-left text-sky-900
                        sm:
                        md:
                        lg:
                        xl: 
                        2xl: 
">
                            <thead className="uppercase bg-teal-700/10">
                                <tr>
                                    <th scope="col" className="p-2 text-sm
                                    sm:
                                    md:text-base
                                    lg:px-6 lg:py-3
                                    xl: 
                                    2xl: 
                                    ">
                                        Замовлення
                                    </th>
                                    <th scope="col" className="p-2 text-sm
                                    sm:
                                    md:text-base
                                    lg:px-6 lg:py-3
                                    xl: 
                                    2xl: 
                                    ">
                                        Дата відкриття
                                    </th>
                                    <th scope="col" className="p-2 text-sm text-center
                                    sm:
                                    md:text-base
                                    lg:px-6 lg:py-3
                                    xl: 
                                    2xl: 
                                    ">
                                        Статус
                                    </th>
                                    <th scope="col" className="p-2 text-sm text-center
                                    sm:
                                    md:text-base
                                    lg:px-6 lg:py-3
                                    xl: 
                                    2xl: 
                                    ">
                                        Сума
                                    </th>
                                </tr>
                            </thead>
                            {openOrders.length > 0 || !isLoading ? openOrders.map((order, i) => {
                                return (
                                    <tbody key={i}>
                                        <tr className="bg-white border-b border-gray-300 text-lg">
                                            <th scope="row" className="font-medium p-2 text-sm
                                            sm:
                                            md:text-base
                                            lg:px-6 lg:py-4
                                            xl: 
                                            2xl: 
                                            ">
                                                {order.tableNumber !== undefined ? `Столик ${order.tableNumber}` : "З  собою"} | Замовлення {order._id}
                                            </th>
                                            <td className="p-2 text-sm
                                            sm:
                                            md:text-base
                                            lg:px-6 lg:py-4
                                            xl: 
                                            2xl: 
                                            ">
                                                {order.time || order.date ? `${order.time} | ${order.date}` : "-"}
                                            </td>
                                            <td className="p-2 text-sm
                                            sm:
                                            md:text-base
                                            lg:px-6 lg:py-4
                                            xl: 
                                            2xl: 
                                            ">
                                                <div className="flex justify-center items-center gap-3">
                                                    <div className="">{order.isOpen ? 'Активне' : 'Закрите'}</div>
                                                    <button onClick={() => { setCurrentOrder(order); setOpenPayOrder(true) }} className='px-6 py-3 bg-teal-700 rounded-lg hover:bg-teal-800 text-white transition ease-out hover:ease-in'>Оплатити замовлення</button>
                                                </div>
                                            </td>
                                            <td className="p-2 font-medium text-sm text-center
                                            sm:
                                            md:text-base
                                            lg:px-6 lg:py-4
                                            xl: 
                                            2xl: 
                                            ">
                                                {getTotalOrderValue(order)}₴
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            }) : <SkeletonOrders />}
                        </table>
                        : <div className="text-3xl bg-white text-black p-10 text-center">Немає доступних замовлень, створіть нове, щоб побачити</div>}
                </div>
            </div>
        </div>
    )
}

export default withHelmet(Orders, "Список замовлень ")