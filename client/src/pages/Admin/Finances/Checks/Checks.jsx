import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TrashDone from "../../../../assets/svg/trashDone.svg"
import { fetchOrders } from "../../../../store/slices/orders.slice";
import Info from "../../../../assets/svg/info.svg"
import { ConfirmModal } from "../../ConfirmModal";
import { deleteOrder } from "../../../../actions/orders.actions";
import toast from "react-hot-toast";
import { OrderInfoModal } from "../../../Accountant/OrderInfoModal";
import { AnimatePresence } from "framer-motion";

export const Checks = () => {
    const dispatch = useDispatch();
    const { restaurantId } = useParams();
    const { orders } = useSelector(state => state.orders)

    const ordersStates = [...new Set(orders.map(order => order.isOpen))];
    console.log(ordersStates);

    const [orderState, setOrderState] = useState('all')

    const [orderDeleteOpen, setOrderDeleteOpen] = useState(false);
    const [orderInfoOpen, setOrderInfoOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState({});

    const notifySuccess = (message) => { toast.success(message) };

    useEffect(() => {
        dispatch(fetchOrders(restaurantId));
    }, [])

    return (
        <>
            <AnimatePresence initial={orderDeleteOpen}>
                {orderDeleteOpen && <ConfirmModal setModalOpen={setOrderDeleteOpen} onConfirm={
                    async () => {
                        await deleteOrder(restaurantId, currentOrder._id);
                        dispatch(fetchOrders(restaurantId));
                        notifySuccess('Замовлення успішно видалено');
                        setOrderDeleteOpen(false)
                    }
                } />}
            </AnimatePresence>
            <AnimatePresence initial={orderInfoOpen}>
                {orderInfoOpen && <OrderInfoModal setOpenInfo={setOrderInfoOpen} order={currentOrder} />}
            </AnimatePresence>

            <div className="flex flex-col h-full">
                <h2 className="text-3xl font-medium">Замовлення та чеки</h2>
                <hr className='border-t-1 border-slate-300 my-5' />
                <div className='flex gap-3 items-center flex-wrap pb-5'>
                    <div className='py-2 text-gray-500'>
                        Фільтри:
                    </div>
                    <div className='px-4 py-2 bg-sky-700 text-white rounded-2xl hover:bg-sky-900 transition ease-out hover:ease-in cursor-pointer' onClick={() => { setOrderState('all') }}>
                        Скинути фільтр
                    </div>
                    {ordersStates.length > 0 ? ordersStates.map((state, i) =>
                        <div className={orderState === state ? 'px-4 py-2 bg-sky-950 text-white rounded-2xl hover:bg-sky-900 transition ease-out hover:ease-in cursor-pointer' : 'px-4 py-2 bg-sky-700 text-white rounded-2xl hover:bg-sky-900 transition ease-out hover:ease-in cursor-pointer'} onClick={() => { setOrderState(state) }}>
                            {state ? "Відкрите" : "Закрите"}
                        </div>
                    ) : null}
                </div>
                <div className="relative overflow-y-scroll rounded-md">
                    <div className='px-5 py-3 text-xl bg-sky-950 text-sky-100'>
                        Список замовлень
                    </div>
                    <table className="w-full text-left text-sky-900">
                        <thead className="text-xs text-gray-700 uppercase bg-sky-950/10">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Замовлення
                                </th>
                                <th scope="col" className="px-1 py-3 text-center">
                                    Дата
                                </th>
                                <th scope="col" className="px-1 py-3 text-center">
                                    Стан
                                </th>
                                <th scope="col" className="px-1 py-3 text-center"></th>
                            </tr>
                        </thead>
                        {orders.length > 0 ? orders.map((order, i) =>
                            orderState === 'all' || orderState === order.isOpen ? <tbody
                                key={i}>
                                <tr className="bg-white border-b border-gray-300 text-gray-700">
                                    <th scope="row" className="p-3 font-medium text-gray-900 w-[20%] text-center">
                                        {order._id}
                                    </th>
                                    <td className="p-3 w-[15%] text-center text-sky-800 font-bold">
                                        <div className="bg-teal-500/5 p-3 rounded-lg ">{order.date} / {order.time} </div>
                                    </td>
                                    <td className={order.isOpen ? "p-3 text-lg w-[15%] text-center" : "p-3 text-lg w-[15%] text-center"}>
                                        <div className={order.isOpen ? "bg-teal-500/50 p-3 rounded-xl font-medium" : "bg-yellow-500/40 p-3 rounded-xl font-medium"}>
                                            {order.isOpen ? 'Відкрите' : 'Закрите'}
                                        </div>
                                    </td>
                                    <td className="p-3 w-[15%] text-center">
                                        <div className="flex justify-end mr-10">
                                            <div className="" onClick={() => { setCurrentOrder(order); setOrderInfoOpen(true) }}>
                                                <img className="h-11 cursor-pointer hover:shadow-2xl hover:bg-sky-950/10 p-1 rounded-2xl transition ease-out hover:ease-in" src={Info} alt="" />
                                            </div>
                                            <div className="" onClick={() => { setCurrentOrder(order); setOrderDeleteOpen(true) }}>
                                                <img className="h-11 cursor-pointer hover:shadow-2xl hover:bg-sky-950/10 p-1 rounded-2xl transition ease-out hover:ease-in" src={TrashDone} alt="" />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody> : null
                        ) : null}
                    </table>
                    {orders.length > 0 ? null : <h2 className='text-4xl p-6 text-center text-sky-950 font-light bg-white'>Повідомленя відсутні</h2>}
                </div>
            </div >
        </>
    )
}


