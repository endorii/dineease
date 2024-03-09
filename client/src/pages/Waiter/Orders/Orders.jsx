import { useEffect, useState } from "react"
import { Modal } from "../../App/Modal";
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

export const Orders = () => {
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
        <div className="h-[65%]">
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
            <div className="p-10 bg-sky-50 overflow-y-scroll h-[85vh]">
                <div className="shadow-inner border rounded-md">
                    {openOrders.length > 0 ?
                        <table className="w-full text-left text-sky-900">
                            <thead className="uppercase bg-teal-700/10">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Замовлення
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Дата відкриття
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Статус
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Сума
                                    </th>
                                </tr>
                            </thead>
                            {openOrders.length > 0 || !isLoading ? openOrders.map((order, i) => {
                                return (
                                    <tbody key={i}>
                                        <tr className="bg-white border-b border-gray-300 text-lg">
                                            <th scope="row" className="px-6 py-4 font-medium">
                                                {order.tableNumber !== undefined ? `Столик ${order.tableNumber}` : "З  собою"} | Замовлення {order._id}
                                            </th>
                                            <td className="px-6 py-4">
                                                {order.time || order.date ? `${order.time} | ${order.date}` : "-"}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify items-center">
                                                    <div className="mr-7">Нове</div>
                                                    <button onClick={() => { setCurrentOrder(order); setOpenPayOrder(true) }} className='px-6 py-3 bg-teal-700 rounded-lg hover:bg-teal-800 text-white transition ease-out hover:ease-in'>Оплатити замовлення</button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-medium">
                                                {getTotalOrderValue(order)}₴
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            }) : <SkeletonOrders /> }
                        </table>
                        : <div className="text-3xl bg-white text-black p-10 text-center">Немає доступних замовлень, створіть нове, щоб побачити</div>}
                </div>
            </div>
        </div>
    )
}