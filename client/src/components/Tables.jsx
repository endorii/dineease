import { useEffect, useState } from 'react';
// import { NewOrderModal } from './NewOrderModal';
import { Modal } from './Modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../store/slices/orders.slice';
// import { fetchMenuItems } from '../store/slices/menuItemsSlice';
// import { fetchMenu } from '../store/slices/menuSlice';
// import { fetchMenuItems } from "../store/slices/menuItemsSlice";
import { useParams } from "react-router-dom";

export const Tables = () => {
    
    const dispatch = useDispatch();

    const { orders } = useSelector(state => state.orders);
    const { restaurant } = useParams();

    const tables = [
        { table_id: 1, busy: false, booked: false },
        { table_id: 2, busy: false, booked: false },
        { table_id: 3, busy: false, booked: false },
        { table_id: 4, busy: false, booked: false },
        { table_id: 5, busy: false, booked: false },
        { table_id: 6, busy: false, booked: false },
        { table_id: 7, busy: false, booked: false },
        { table_id: 8, busy: false, booked: false },
        { table_id: 9, busy: false, booked: false },
        { table_id: 10, busy: false, booked: false },
        { table_id: 11, busy: false, booked: false },
        { table_id: 12, busy: false, booked: false },
        { table_id: 13, busy: false, booked: false },
        { table_id: 14, busy: false, booked: false },
        { table_id: 15, busy: false, booked: false },
        { table_id: 16, busy: false, booked: false },
        { table_id: 17, busy: false, booked: false },
        { table_id: 18, busy: false, booked: false },
        { table_id: 19, busy: false, booked: false },
        { table_id: 20, busy: false, booked: false },
        { table_id: 21, busy: false, booked: false },
        { table_id: 22, busy: false, booked: false },
        { table_id: 23, busy: false, booked: false },
        { table_id: 24, busy: false, booked: false },
        { table_id: 25, busy: false, booked: false },
        { table_id: 26, busy: false, booked: false },
        { table_id: 27, busy: false, booked: false },
        { table_id: 28, busy: false, booked: false },
        { table_id: 29, busy: false, booked: false },
        { table_id: 30, busy: false, booked: false },
        { table_id: 31, busy: false, booked: false },
        { table_id: 32, busy: false, booked: false },
        { table_id: 33, busy: false, booked: false },
        { table_id: 34, busy: false, booked: false },
        { table_id: 35, busy: false, booked: false },
        { table_id: 36, busy: false, booked: false },
    ];

    const [openNewOrderMenu, setOpenNewOrderMenu] = useState(false);
    const [openPayOrder, setOpenPayOrder] = useState(false);

    const [currentTable, setCurrentTable] = useState();

    useEffect(() => {
        dispatch(fetchOrders(restaurant));
        // dispatch(fetchMenu());
        // dispatch(fetchMenuItems());
    }, [])

    return (
        <div className='h-screen'>
            {/* {openNewOrderMenu ? <Modal>
                <NewOrderModal setOpenNewOrderMenu={setOpenNewOrderMenu} setOpenPayOrder={setOpenPayOrder} openPayOrder={openPayOrder} currentTable={currentTable} />
            </Modal> : null} */}
            <div className="flex flex-col w-full text-white justify-center bg-sky-900">
                <div className='flex justify-end p-3'>
                    <button className='px-6 py-3 bg-teal-700 rounded-lg hover:bg-teal-800 text-lg' onClick={() => {
                        setOpenNewOrderMenu(true)
                    }}>Нове замовлення</button>
                </div>
            </div>
            <div className="bg-white m-5 overflow-y-scroll h-[80%] shadow-inner border">
                    <div className="flex flex-wrap p-4 text-xl justify-between ">
                        {tables.map((table) => {
                            let isTableBusy = orders.some(order => order.tableNumber == table.table_id && order.isOpen === true);
                            return (
                                <div onClick={() => { setCurrentTable(table.table_id) }} key={table.table_id} className="relative flex flex-col items-center w-1/6 p-4">
                                    <button
                                        onClick={() => { setOpenNewOrderMenu(true); }} disabled={isTableBusy}
                                        className={ isTableBusy ? 'bg-yellow-800 text-white rounded-md w-[160px] h-[160px] cursor-not-allowed' : 'bg-teal-700 text-white rounded-md w-[160px] h-[160px] hover:bg-teal-900' }
                                    >
                                        Столик {table.table_id}
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>
        </div>
    );
};