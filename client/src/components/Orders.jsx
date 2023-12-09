import { useEffect, useState } from "react"
import { Modal } from "./Modal";
// import { NewOrderModal } from "./NewOrderModal";
// import { PayOrder } from "./PayOrder";
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from "../store/slices/orders.slice";
// import { getTotalOrderValue } from "../functions";
// import { fetchMenu } from "../store/slices/menuSlice";
// import { fetchMenuItems } from "../store/slices/menuItemsSlice";
import { useParams } from "react-router-dom";
import { NewOrderModal } from "./NewOrderModal";
import { fetchMenu } from "../store/slices/menu.slice";

export const Orders = () => {

    const [openNewOrderMenu, setOpenNewOrderMenu] = useState(false);
    const [openPayOrder, setOpenPayOrder] = useState(false);
    const [currentOrder, setcurrentOrder] = useState([])

    const dispatch = useDispatch()
    const { orders } = useSelector(state => state.orders)

    const { restaurant } = useParams();

    const openOrders = orders.filter(order => order.isOpen);

    useEffect(() => {
        dispatch(fetchOrders(restaurant));
        dispatch(fetchMenu(restaurant));
        // dispatch(fetchMenuItems());
    }, [])

    return (
        <div className="h-[65%]">
            {openNewOrderMenu ? <Modal>
                <NewOrderModal setOpenNewOrderMenu={setOpenNewOrderMenu} setOpenPayOrder={setOpenPayOrder} />
            </Modal> : null}
            {/* {openPayOrder ? <Modal>
                <PayOrder setOpenPayOrder={setOpenPayOrder} currentOrder={currentOrder} />
            </Modal> : null} */}
            <div className="flex flex-col text-white justify-center bg-sky-50">
                <div className='flex justify-end p-3'>
                    <button className='px-6 py-3 bg-teal-700 rounded-lg hover:bg-teal-800 text-lg' onClick={() => {
                        setOpenNewOrderMenu(true)
                    }}>Нове замовлення</button>
                </div>
            </div>
            <div className="p-10 bg-sky-50 overflow-y-scroll h-[85vh]">
                <div className="shadow-inner border rounded-md">
                    {openOrders.length > 0 ?
                        <table className="w-full text-left text-sky-900">
                            <thead className="uppercase bg-sky-200">
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
                            {openOrders.length > 0 ? openOrders.map((order, i) => {
                                return (
                                    <tbody key={i}>
                                        <tr className="bg-white border-b border-gray-300 text-lg">
                                            <th scope="row" className="px-6 py-4 font-medium">
                                                {order.tableNumber !== undefined ? `Столик ${order.tableNumber}` : "З  собою"} | Замовлення {order._id}
                                            </th>
                                            <td className="px-6 py-4">
                                                {order.openingTime ? order.openingTime : "-"}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify items-center">
                                                    <div className="mr-7">Нове</div>
                                                    <button onClick={() => { setcurrentOrder(order); setOpenPayOrder(true) }} className='px-6 py-3 bg-teal-700 rounded-lg hover:bg-teal-800 text-white'>Оплатити замовлення</button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-medium">
                                                {/* {getTotalOrderValue(order)} */}
                                                300₴
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            }) : null}
                        </table>
                        : <div className="text-3xl bg-white text-black p-10 text-center">Немає доступних замовлень, створіть нове, щоб побачити</div>}
                </div>
            </div>
        </div>
    )
}