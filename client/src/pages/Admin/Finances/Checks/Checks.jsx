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
import { SkeletonChecks } from "../../../../ui/skeletons/SkeletonChecks";
import withHelmet from "../../../../utils/helpers/withHelmet";

const Checks = () => {
    const dispatch = useDispatch();
    const { restaurantId } = useParams();
    const { orders, isLoading } = useSelector(state => state.orders)

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
                <div className='flex gap-2 items-center flex-wrap pb-5
                sm:
                md:
                lg:gap-3
                xl: 
                2xl: 
                '>
                    <div className='py-2 text-gray-500'>
                        Фільтри:
                    </div>
                    <div className='px-4 py-2 bg-sky-700 text-white rounded-2xl hover:bg-sky-900 transition ease-out hover:ease-in cursor-pointer' onClick={() => { setOrderState('all') }}>
                        Скинути фільтр
                    </div>
                    {ordersStates.length > 0 ? ordersStates.map((state, i) =>
                        <div className={`px-4 py-2 text-white rounded-2xl hover:bg-sky-900 transition ease-out hover:ease-in cursor-pointer ${orderState === state ? 'bg-sky-950' : 'bg-sky-700'}`} onClick={() => { setOrderState(state) }}>
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
                                <th scope="col" className="px-4 py-1 
                                sm:
                                md:
                                lg:px-10 lg:py-3
                                xl: 
                                2xl: 
                                ">
                                    Замовлення
                                </th>
                                <th scope="col" className="px-4 py-1 text-center
                                sm:
                                md:
                                lg:px-1 lg:py-3
                                xl: 
                                2xl: 
                                ">
                                    Дата
                                </th>
                                <th scope="col" className="px-4 py-1 text-center
                                sm:
                                md:
                                lg:px-1 lg:py-3 
                                xl: 
                                2xl: 
                                ">
                                    Стан
                                </th>
                                <th scope="col" className="text-center
                                sm:
                                md:
                                lg:
                                xl: 
                                2xl: 
                                "></th>
                            </tr>
                        </thead>
                        {orders.length > 0 || !isLoading ? orders.map((order, i) =>
                            orderState === 'all' || orderState === order.isOpen ?
                                <tbody
                                    key={i}>
                                    <tr className="bg-white border-b border-gray-300 text-gray-700">
                                        <th scope="row" className="px-5 font-medium text-gray-900 w-[20%] text-sm
                                        sm:
                                        md:
                                        lg:px-10
                                        xl: 
                                        2xl: 
                                    ">
                                            {order._id.slice(0, 10)}...
                                        </th>
                                        <td className="w-[15%] text-center text-sm font-bold
                                        sm:
                                        md:text-base
                                        lg:p-1
                                        xl: 
                                        2xl: 
                                    ">
                                            <div className="p-3 rounded-lg ">{order.date} {order.time} </div>
                                        </td>
                                        <td className="p-3 text-lg w-[15%] text-center">
                                            <div className={`p-3 rounded-xl font-medium ${order.isOpen ? "bg-teal-500/50" : "bg-yellow-500/40"}`}>
                                                {order.isOpen ? 'Відкрите' : 'Закрите'}
                                            </div>
                                        </td>
                                        <td className="w-[15%]">
                                            <div className="flex justify-center items-center">
                                                <div className="" onClick={() => { setCurrentOrder(order); setOrderInfoOpen(true) }}>
                                                    <img className="h-10 cursor-pointer hover:shadow-2xl hover:bg-sky-950/10 p-1 rounded-2xl transition ease-out hover:ease-in" src={Info} alt="" />
                                                </div>
                                                <div className="" onClick={() => { setCurrentOrder(order); setOrderDeleteOpen(true) }}>
                                                    <img className="h-11 cursor-pointer hover:shadow-2xl hover:bg-sky-950/10 p-1 rounded-2xl transition ease-out hover:ease-in" src={TrashDone} alt="" />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody> : null
                        ) : <SkeletonChecks />}
                    </table>
                    {orders.length > 0 ? null : <h2 className='text-4xl p-6 text-center text-sky-950 font-light bg-white'>Повідомленя відсутні</h2>}
                </div>
            </div >
        </>
    )
}

export default withHelmet(Checks, "Замовлення та чеки")