import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchOrders } from '../store/slices/orders.slice';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalOrderValue } from '../functions';
import { useParams } from 'react-router-dom';

export const Sales = () => {
    const dispatch = useDispatch();
    const { restaurantId } = useParams();
    const { orders } = useSelector(state => state.orders);
    const [monthlySales, setMonthlySales] = useState([]);
    const [yearlySales, setYearlySales] = useState({});
    const [dailySales, setDailySales] = useState({});
    const [weeklySales, setWeeklySales] = useState({});

    useEffect(() => {
        dispatch(fetchOrders(restaurantId));
    }, [dispatch, restaurantId]);

    useEffect(() => {
        const calculateMonthlySales = () => {
            const currentMonth = new Date().getMonth();
            const monthlySalesData = Array(12).fill(0);
            orders.forEach(order => {
                const month = new Date(order.date).getMonth();
                const totalOrderValue = getTotalOrderValue(order);
                monthlySalesData[month] += totalOrderValue;
            });
            setMonthlySales(monthlySalesData);
        };

        const calculateYearlySales = () => {
            const yearlySalesData = {};
            orders.forEach(order => {
                const year = new Date(order.date).getFullYear();
                const totalOrderValue = getTotalOrderValue(order);
                if (!yearlySalesData[year]) {
                    yearlySalesData[year] = 0;
                }
                yearlySalesData[year] += totalOrderValue;
            });
            setYearlySales(yearlySalesData);
        };

        const calculateDailySales = () => {
            const dailySalesData = {};
            orders.forEach(order => {
                const date = new Date(order.date.replace(/(\d{2}).(\d{2}).(\d{4})/, '$3-$2-$1'));
                const formattedDate = date.toISOString().slice(0, 10);
                const totalOrderValue = getTotalOrderValue(order);
                if (!dailySalesData[formattedDate]) {
                    dailySalesData[formattedDate] = 0;
                }
                dailySalesData[formattedDate] += totalOrderValue;
            });
            setDailySales(dailySalesData);
        };

        const calculateWeeklySales = () => {
            const weeklySalesData = {};
            orders.forEach(order => {
                const orderDate = new Date(order.date.replace(/(\d{2}).(\d{2}).(\d{4})/, '$3-$2-$1'));
                const orderWeek = new Date(orderDate.getTime() - orderDate.getDay() * 86400000);
                const formattedWeek = orderWeek.toISOString().slice(0, 10);
                const totalOrderValue = getTotalOrderValue(order);
                if (!weeklySalesData[formattedWeek]) {
                    weeklySalesData[formattedWeek] = 0;
                }
                weeklySalesData[formattedWeek] += totalOrderValue;
            });
            setWeeklySales(weeklySalesData);
        };

        calculateMonthlySales();
        calculateYearlySales();
        calculateDailySales();
        calculateWeeklySales();
    }, [orders]);

    const dataMonthly = {
        labels: [
            "Січень", "Лютий", "Березень", "Квітень",
            "Травень", "Червень", "Липень", "Серпень",
            "Вересень", "Жовтень", "Листопад", "Грудень"
        ],
        datasets: [
            {
                label: "Замовлення на суму",
                data: monthlySales,
                borderColor: 'rgb(10, 77, 165)',
                backgroundColor: 'rgb(10, 77, 165)',
                lineTension: 0.4,
            }
        ],
    };

    const dataYearly = {
        labels: Object.keys(yearlySales),
        datasets: [
            {
                label: "Замовлення на суму за рік",
                data: Object.values(yearlySales),
                borderColor: 'rgb(10, 77, 165)',
                backgroundColor: 'rgb(10, 77, 165)',
                lineTension: 0.4,
            }
        ],
    };

    const dataDaily = {
        labels: Object.keys(dailySales),
        datasets: [
            {
                label: "Замовлення на суму за день",
                data: Object.values(dailySales),
                borderColor: 'rgb(10, 77, 165)',
                backgroundColor: 'rgb(10, 77, 165)',
                lineTension: 0.4,
            }
        ],
    };

    const dataWeekly = {
        labels: Object.keys(weeklySales),
        datasets: [
            {
                label: "Замовлення на суму за тиждень",
                data: Object.values(weeklySales),
                borderColor: 'rgb(10, 77, 165)',
                backgroundColor: 'rgb(10, 77, 165)',
                lineTension: 0.4,
            }
        ],
    };

    const calculateProfitAndLoss = (salesData) => {
        let profit = 0;
        let loss = 0;
        salesData.forEach(sale => {
            if (sale >= 0) {
                profit += sale;
            } else {
                loss += sale;
            }
        });
        return { profit, loss };
    };

    const dailyProfitAndLoss = calculateProfitAndLoss(Object.values(dailySales));
    const weeklyProfitAndLoss = calculateProfitAndLoss(Object.values(weeklySales));
    const monthlyProfitAndLoss = calculateProfitAndLoss(monthlySales);
    const yearlyProfitAndLoss = calculateProfitAndLoss(Object.values(yearlySales));

    return (
        <div className='h-full overflow-y-scroll'>
            <h2 className="text-3xl font-medium">Статистика продажів</h2>
            <hr className='border-t-1 border-slate-300 my-6' />
            <div className='grid grid-cols-4 gap-5 w-full h-full p-5'>
                <div className='m-15 bg-white rounded-lg shadow-md col-span-2'>
                    <div className='px-5 py-3 bg-sky-950 text-white font-medium text-xl'>
                        За день:
                    </div>
                    <Line className='p-5' data={dataDaily}></Line>
                    <div className='px-5 py-3 bg-sky-950/5 font-medium text-xl flex justify-between'>
                        <div className='p-3 bg-teal-700/80 rounded-md text-white'>
                            Прибуток: {dailyProfitAndLoss.profit}$
                        </div>
                        <div className='p-3 bg-yellow-600/80 rounded-md text-white'>
                            Втрати: {dailyProfitAndLoss.loss}$
                        </div>
                    </div>
                </div>
                <div className='m-15 bg-white rounded-lg shadow-md col-span-2'>
                    <div className='px-5 py-3 bg-sky-950 text-white font-medium text-xl'>
                        За тиждень:
                    </div>
                    <Line className='p-5' data={dataWeekly}></Line>
                    <div className='px-5 py-3 bg-sky-950/5 font-medium text-xl flex justify-between'>
                        <div className='p-3 bg-teal-700/80 rounded-md text-white'>
                            Прибуток: {weeklyProfitAndLoss.profit}$
                        </div>
                        <div className='p-3 bg-yellow-600/80 rounded-md text-white'>
                            Втрати: {weeklyProfitAndLoss.loss}$
                        </div>
                    </div>
                </div>
                <div className='m-15 bg-white rounded-lg shadow-md col-span-2'>
                    <div className='px-5 py-3 bg-sky-950 text-white font-medium text-xl'>
                        За місяць:
                    </div>
                    <Line className='p-5' data={dataMonthly}></Line>
                    <div className='px-5 py-3 bg-sky-950/5 font-medium text-xl flex justify-between'>
                        <div className='p-3 bg-teal-700/80 rounded-md text-white'>
                            Прибуток: {monthlyProfitAndLoss.profit}$
                        </div>
                        <div className='p-3 bg-yellow-600/80 rounded-md text-white'>
                            Втрати: {monthlyProfitAndLoss.loss}$
                        </div>
                    </div>
                </div>
                <div className='m-15 bg-white rounded-lg shadow-md col-span-2'>
                    <div className='px-5 py-3 bg-sky-950 text-white font-medium text-xl'>
                        За рік:
                    </div>
                    <Line className='p-5 ' data={dataYearly}></Line>
                    <div className='px-5 py-3 bg-sky-950/5 font-medium text-xl flex justify-between'>
                        <div className='p-3 bg-teal-700/80 rounded-md text-white'>
                            Прибуток: {yearlyProfitAndLoss.profit}$
                        </div>
                        <div className='p-3 bg-yellow-600/80 rounded-md text-white'>
                            Втрати: {yearlyProfitAndLoss.loss}$
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
