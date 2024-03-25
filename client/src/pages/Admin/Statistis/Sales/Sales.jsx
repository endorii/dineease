import { useEffect, useState } from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from 'react-chartjs-2';
import { fetchOrders } from '../../../../store/slices/orders.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchEmployees } from '../../../../store/slices/employees.slice';
import User from '../../../../assets/img/user.png'
import { EmployeeStatModal } from './EmployeeStatModal';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { container, itemAnim } from '../../../../functions';
import withHelmet from '../../../../utils/helpers/withHelmet';

const Sales = () => {
    const dispatch = useDispatch();
    const { restaurantId } = useParams();
    const { orders } = useSelector(state => state.orders);
    const { employees } = useSelector(state => state.employees);

    const [statModal, setStatModal] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState({});

    useEffect(() => {
        dispatch(fetchOrders(restaurantId));
        dispatch(fetchEmployees(restaurantId));
    }, []);

    // Отримання сьогоднішньої дати і віднімання місяця
    const dateMonthLimit = new Date();
    dateMonthLimit.setMonth(dateMonthLimit.getMonth() - 1);

    // Фільтрація замовлень, які старіше місяця
    const recentMonthOrders = orders.filter(order => new Date(order.date) >= dateMonthLimit);

    const openOrders = [];
    const ordersByDate = recentMonthOrders.reduce((acc, order) => {
        const date = order.date;
        const total = order.items.reduce((sum, item) => sum + item.orderInfo.reduce((itemSum, info) => itemSum + info.price, 0), 0);
        if (!order.isOpen) {
            acc[date] = (acc[date] || 0) + total;
        } else {
            openOrders.push(order);
        }
        return acc;
    }, {});

    const openOrdersByDate = openOrders.reduce((acc, order) => {
        const date = order.date;
        const total = order.items.reduce((sum, item) => sum + item.orderInfo.reduce((itemSum, info) => itemSum + info.price, 0), 0);
        acc[date] = (acc[date] || 0) + total;
        return acc;
    }, {});

    // Підготовка даних для діаграми
    const labels = Object.keys(ordersByDate);
    const data = Object.values(ordersByDate);
    const sumOfOrders = data.reduce((acc, value) => acc + value, 0)

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Закриті замовлення',
                data: data,
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.4)',
            },
            {
                label: 'Відкриті замовлення',
                data: Object.values(openOrdersByDate),
                fill: false,
                backgroundColor: '#ca8a04',
                borderColor: '#ca8a04a1',
            },
        ],
    };

    return (
        <>
            <AnimatePresence initial={statModal}>
                {statModal && <EmployeeStatModal setModalOpen={setStatModal} employee={currentEmployee}/>}
            </AnimatePresence>

            <div className='h-full w-full overflow-y-scroll'>
                <h2 className="text-3xl font-medium">Статистика продажів</h2>
                <hr className='border-t-1 border-slate-300 my-4' />
                <div className='flex flex-col justify-center w-full gap-3 p-2
                lg:p-5 lg:gap-5 xl:flex-row'>
                    <div className='flex flex-col m-15 bg-white rounded-lg shadow-md col-span-2 h-[70%] w-full'>
                        <div className='px-5 py-3 bg-sky-950 text-white font-medium text-xl rounded-t-lg'>
                            За місяць:
                        </div>
                        <div className='flex-grow p-5'>
                            <Line data={chartData} />
                        </div>
                        <div className='px-5 py-3 bg-sky-950/5 font-medium text-base flex justify-between
                        md:text-lg
                        lg:text-xl'>
                            <div className='p-3 bg-teal-700/80 rounded-md text-white'>
                                Прибуток: {sumOfOrders}₴
                            </div>
                        </div>
                    </div>
                    <div className='m-15 bg-white rounded-lg shadow-md col-span-2 w-full'>
                        <motion.div className='p-5 flex flex-col gap-3' variants={container} initial="hidden" animate="visible">
                            {employees.map((employee, i) => (
                                <motion.div key={i} className="flex items-center p-4 bg-gray-50 rounded-md" variants={itemAnim}>
                                    <img src={User} alt="" className="h-10 w-10 flex-none rounded-full" />
                                    <motion.div className="ml-4 flex-auto">
                                        <motion.div className="font-medium">{employee.name}</motion.div>
                                        <motion.div className="mt-1 text-slate-700">{employee.email ? employee.email : "-"}</motion.div>
                                    </motion.div>
                                    <motion.button className="pointer-events-auto ml-4 flex-none rounded-md px-4 py-2 font-medium text-white bg-teal-600 hover:bg-teal-700 shadow-sm border transition ease-out hover:ease-in" onClick={() => { setStatModal(true); setCurrentEmployee(employee) }}>Переглянути</motion.button>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default withHelmet(Sales, "Статистика продажів"); 
