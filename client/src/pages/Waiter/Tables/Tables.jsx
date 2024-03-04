import { useEffect, useState } from 'react';
import { Modal } from '../../App/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../../store/slices/orders.slice';
import { useParams } from "react-router-dom";
import { NewOrderModal } from '../Orders/NewOrderModal';
import { Toaster } from 'react-hot-toast';
import { fetchMenuCategories } from '../../../store/slices/menuCategories.slice';
import { fetchMenuDishes } from '../../../store/slices/menuDishes.slice';
import { AnimatePresence } from 'framer-motion';
import { container, itemAnim, tables } from '../../../functions';
import { motion } from 'framer-motion'

export const Tables = () => {

    const dispatch = useDispatch();
    const { orders } = useSelector(state => state.orders);
    const { restaurantId } = useParams();

    const [openNewOrderMenu, setOpenNewOrderMenu] = useState(false);
    const [openPayOrder, setOpenPayOrder] = useState(false);
    const [currentTable, setCurrentTable] = useState();

    useEffect(() => {
        dispatch(fetchOrders(restaurantId));
        dispatch(fetchMenuCategories(restaurantId));
        dispatch(fetchMenuDishes(restaurantId));
    }, [])

    return (
        <div className='h-screen'>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />

            <AnimatePresence initial={openNewOrderMenu}>
                {openNewOrderMenu && <NewOrderModal setOpenNewOrderMenu={setOpenNewOrderMenu} setOpenPayOrder={setOpenPayOrder} openPayOrder={openPayOrder} currentTable={currentTable} />}
            </AnimatePresence>

            <div className="flex flex-col w-full text-white justify-center bg-sky-50">
                <div className='flex justify-end p-3'>
                    <button className='px-6 py-3 bg-teal-700 rounded-lg hover:bg-teal-800 text-lg transition ease-out hover:ease-in' onClick={() => {
                        setOpenNewOrderMenu(true)
                    }}>Нове замовлення</button>
                </div>
            </div>
            <div className='p-5 bg-sky-50 overflow-y-scroll h-[80%]'>
                <div className="bg-white  shadow-inner border">
                    <motion.div
                        className="flex flex-wrap p-4 text-xl justify-between"
                        variants={container}
                        initial="hidden"
                        animate="visible"
                    >
                        {tables.map((table) => {
                            let isTableBusy = orders.some(
                                (order) => order.tableNumber == table.table_id && order.isOpen === true
                            );
                            return (
                                <motion.div
                                    variants={itemAnim}
                                    onClick={() => {
                                        setCurrentTable(table.table_id);
                                    }}
                                    key={table.table_id}
                                    className="relative flex flex-col items-center w-1/7 p-4"
                                >
                                    <motion.button
                                        onClick={() => {
                                            setOpenNewOrderMenu(true);
                                        }}
                                        disabled={isTableBusy}
                                        className={
                                            isTableBusy
                                                ? 'bg-yellow-800 text-white rounded-md w-[160px] h-[160px] cursor-not-allowed transition ease-out hover:ease-in'
                                                : 'bg-teal-700 text-white rounded-md w-[160px] h-[160px] hover:bg-teal-900 transition ease-out hover:ease-in'
                                        }
                                    >
                                        Столик {table.table_id}
                                    </motion.button>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                </div>
            </div>
        </div>
    );
};