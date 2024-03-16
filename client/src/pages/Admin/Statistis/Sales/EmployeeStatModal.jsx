import { Modal } from "../../../App/Modal";
import Close from "../../../../assets/svg/close.svg";
import { motion } from 'framer-motion'
import { dropIn } from "../../../../functions";
import { useState } from "react";
import { useSelector } from "react-redux";
import Calendar from 'react-calendar';
import { Line } from "react-chartjs-2";

export const EmployeeStatModal = ({ setModalOpen, employee }) => {

    const { orders } = useSelector(state => state.orders);

    const [statFilter, setStatFilter] = useState("За день")

    const statFiltersArray = ["За день", "За тиждень", "За місяць", "За рік"]

    const [date, setDate] = useState(new Date());
    const dates = employee.workingTime.map(item => {
        const [day, month, year] = item.date.split(".");
        return new Date(year, month - 1, day);
    });

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Прийняті замовлення (Обслужено столиків)',
                data: null,
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.4)',
            },
        ],
    };
    console.log(dates);

    const onChange = date => setDate(date);

    const tileClassName = ({ date, view }) => {
        if (dates.find(d => d.getTime() === date.getTime())) {
            return 'highlight';
        }
    }

    // Функція для групування даних за датою
    function groupByDate(data) {
        const grouped = data.reduce((acc, item) => {
            const date = item.date;
            if (!acc[date]) {
                acc[date] = 0;
            }
            acc[date] += Number(item.servedTablesNumber);
            return acc;
        }, {});

        return Object.entries(grouped).map(([date, servedTablesNumber]) => ({ date, servedTablesNumber }));
    }

    // Функція для групування даних за тижнем, місяцем або роком
    function groupByPeriod(data, period) {
        const grouped = data.reduce((acc, item) => {
            const date = new Date(item.date.split(".").reverse().join("-"));
            let periodKey;
            switch (period) {
                case "За тиждень":
                    periodKey = `${date.getFullYear()}-W${Math.ceil(date.getDate() / 7)}`;
                    break;
                case "За місяць":
                    periodKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
                    break;
                case "За рік":
                    periodKey = date.getFullYear().toString();
                    break;
                default:
                    return acc;
            }
            if (!acc[periodKey]) {
                acc[periodKey] = 0;
            }
            acc[periodKey] += Number(item.servedTablesNumber);
            return acc;
        }, {});

        return Object.entries(grouped).map(([period, servedTablesNumber]) => ({ period, servedTablesNumber }));
    }

    // Використання функцій
    let groupedData;
    switch (statFilter) {
        case "За день":
            groupedData = groupByDate(employee.workingTime);
            break;
        case "За тиждень":
        case "За місяць":
        case "За рік":
            groupedData = groupByPeriod(employee.workingTime, statFilter);
            break;
        default:
            groupedData = [];
    }

    // Оновлення даних діаграми
    chartData.labels = groupedData.map(item => item.date || item.period);
    chartData.datasets[0].data = groupedData.map(item => item.servedTablesNumber);


    return (
        <Modal
            onClick={() => setModalOpen(false)}
        >
            <motion.div onClick={(e) => e.stopPropagation()} variants={dropIn} initial='hidden' animate='visible' exit='exit' className=' absolute flex justify-center cursor-default mt-16'>
                <div className='relative bg-gray-200 shadow-xl w-full h-auto z-10 rounded-md px-24'>
                    <div className='flex flex-col items-center mx-3 gap-4 py-10 mb-5'>
                        <div className="flex justify-center gap-5 mt-5">
                            {employee.position === 'Waiter' ? <div className="w-full bg-white rounded-xl shadow-lg">
                                <div className="flex px-10 py-5 gap-5 items-center">
                                    <h3 className="text-2xl font-medium ">Статистика замовлень:</h3>
                                    <ul className="flex flex gap-1">
                                        {statFiltersArray.map((stat, i) =>
                                            <li key={i}>
                                                <button className={statFilter === stat ? "px-5 py-2 bg-sky-950 text-white text-lg rounded-lg transition ease-out hover:ease-in" : "px-5 py-2 bg-sky-700 text-white text-lg rounded-lg transition ease-out hover:ease-in"} onClick={() => setStatFilter(stat)}>{stat}</button>
                                            </li>)}
                                    </ul>
                                </div>
                                <div className="flex px-7">
                                    <div className="w-full h-full">
                                        <Line className='p-5' data={chartData} />
                                    </div>
                                </div>
                            </div> : null}
                            <div className="bg-white rounded-xl shadow-lg">
                                <div>
                                    <h3 className="text-2xl font-medium px-10 py-5">Робочі години та відвідуваність:</h3>
                                </div>
                                <div className="flex justify-center px-7 ">
                                    <div className="bg-white">
                                        <Calendar
                                            onChange={onChange}
                                            value={date}
                                            tileClassName={tileClassName}
                                        />
                                        <style>{`
                                            .react-calendar {
                                            
                                                border: none;
                                                margin: 30px
                                            }
                                            .highlight {
                                            background: rgb(8 47 73);;
                                            color: white;
                                            }
                            
                                        `}</style>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute top-2 right-2 cursor-pointer" onClick={() => { setModalOpen(false) }}>
                            <img className="h-10" src={Close} alt="" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </Modal>
    )
}
