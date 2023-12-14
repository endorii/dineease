import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect } from 'react';
import { Line } from "react-chartjs-2";
import { fetchOrders } from '../store/slices/orders.slice';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalOrderValue } from '../functions';
import { useParams } from 'react-router-dom';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};

export const Sales = () => {

    const dispatch = useDispatch();

    const {restaurant} = useParams();

    const { orders } = useSelector(state => state.orders);

    const labels = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];
    // const labels = orders.map(order => order.openingTime.substring(0, 10));

    const data = {
        labels,
        datasets: [
            {
                label: "Графік замовлень за цей рік",
                data: orders.map(order => getTotalOrderValue(order)),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            // {
            //     label: 'Dataset 2',
            //     data: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22],
            //     borderColor: 'rgb(53, 162, 235)',
            //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
            // },
        ],
    };

    useEffect(() => {
        dispatch(fetchOrders(restaurant));
    }, [])

    return (
        <>
            <h2 className="text-3xl font-medium">Статистика продажів</h2>
            <hr className='border-t-1 border-slate-300 my-6' />
            <div className='m-15 bg-white rounded-lg shadow-md w-[900px]'>
                <Line className='p-5 '
                    data={data}
                ></Line>
            </div>
        </>
    )
}


