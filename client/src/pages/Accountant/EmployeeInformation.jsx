import { Modal } from '../App/Modal'
import Close from '../../assets/svg/close.svg'
import { experienceCounter } from "../../functions"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOrdersByWaiterId } from "../../actions/orders.actions"
import { useParams } from "react-router-dom"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import { Line } from 'react-chartjs-2';
  
export const EmployeeInformation = ({ employee, setOpenInfo }) => {

    const dispatch = useDispatch();
    const { restaurantId } = useParams();

    const { orders } = useSelector(state => state.orders);

    const [date, setDate] = useState(new Date());
    const dates = employee.workingTime.map(item => {
        const [day, month, year] = item.date.split(".");
        return new Date(year, month - 1, day);
    });

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
     const data = {
      labels,
      datasets: [
        {
          label: 'Dataset ',
          data: orders.map(order => order.date),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Dataset 2',
          data: orders.map(order => order.date),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
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

    useEffect(() => {
        dispatch(getOrdersByWaiterId(restaurantId, employee._id));
    }, [])

    return (
        <Modal>
            <div className='flex justify-center'>
                <div className='absolute bg-gray-100 shadow-xl w-[95%] h-auto z-10 rounded-md my-5 py-5'>
                    <div className="">
                        <img className="absolute right-2 top-2 z-20 w-10 cursor-pointer " src={Close} alt="" onClick={() => {
                            setOpenInfo(false)
                        }} />
                    </div>
                    <div className='flex flex-col items-center '>
                        <div className="p-5">
                            <h2 className="text-3xl font-thin"> Інформація про робітника <span className="font-medium">{employee.name}</span></h2>
                        </div>
                        <hr className='border-t-1 border-slate-300 w-full mb-5' />
                    </div>
                    <div>
                        <div>
                            <div>
                                <div className="flex flex-wrap justify-center gap-5">
                                    <div className='bg-white rounded-xl shadow-lg p-10 w-[48%]'>
                                        <h3 className='text-2xl font-medium p-3'>Базова інформація:</h3>
                                        <div className='flex gap-5 pb-5'>
                                            <div className='p-3'>
                                                <p className='font-medium text-xl text-sky-800 '>Ресторан</p>
                                                <p className='bg-sky-950 text-white mt-2 px-3 py-2 rounded-xl'>{employee.restaurant}</p>
                                            </div>
                                            <div className='p-3'>
                                                <p className='font-medium text-xl text-sky-800 '>Дата реєстрації</p>
                                                <p className='bg-sky-950 text-white mt-2 px-3 py-2 rounded-xl'>{employee.registrationDate}</p>
                                            </div>
                                            <div className='p-3'>
                                                <p className='font-medium text-xl text-sky-800 '>ID робітника</p>
                                                <p className='bg-sky-950 text-white mt-2 px-3 py-2 rounded-xl'>{employee._id}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='bg-white rounded-xl shadow-lg p-10 w-[48%]'>
                                        <h3 className='text-2xl font-medium p-3'>Загальна інформація:</h3>
                                        <div className='flex gap-5 pb-5'>
                                            <div className='p-3'>
                                                <p className='font-medium text-xl text-sky-800 '>Тип часу роботи</p>
                                                <p className='bg-sky-950 text-white mt-2 px-3 py-2 rounded-xl'>{employee.typeOfWorkingTime}</p>
                                            </div>
                                            <div className='p-3'>
                                                <p className='font-medium text-xl text-sky-800 '>Професія</p>
                                                <p className='bg-sky-950 text-white mt-2 px-3 py-2 rounded-xl'>{employee.position}</p>
                                            </div>
                                            <div className='p-3'>
                                                <p className='font-medium text-xl text-sky-800 '>Локація</p>
                                                <p className='bg-sky-950 text-white mt-2 px-3 py-2 rounded-xl'>{employee.location}</p>
                                            </div>
                                            <div className='p-3'>
                                                <p className='font-medium text-xl text-sky-800'>Стаж роботи</p>
                                                <p className='bg-sky-950 text-white mt-2 px-3 py-2 rounded-xl'>{experienceCounter(+employee.experience)} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center gap-5 mt-5">
                            {employee.position === 'Waiter' ? <div className="w-[71%] bg-white rounded-xl shadow-lg">
                                <div className="flex px-10 py-5 gap-5 items-center">
                                    <h3 className="text-2xl font-medium ">Статистика замовлень:</h3>
                                    <ul className="flex flex gap-1">
                                        <li>
                                            <button className="px-5 py-2 bg-sky-950 text-white text-lg rounded-lg">За день</button>
                                        </li>
                                        <li>
                                            <button className="px-5 py-2 bg-sky-950 text-white text-lg rounded-lg">За тиждень</button>
                                        </li>
                                        <li>
                                            <button className="px-5 py-2 bg-sky-950 text-white text-lg rounded-lg">За місяць</button>
                                        </li>
                                        <li>
                                            <button className="px-5 py-2 bg-sky-950 text-white text-lg rounded-lg">За рік</button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex px-7">
                                    
                                    <div className="w-full h-full">
                                        {/* <Line className='p-5' data={data}></Line> */}
                                    </div>
                                </div>
                            </div> : null}
                            <div className="w-[25%] bg-white rounded-xl shadow-lg">
                                <div>
                                    <h3 className="text-2xl font-medium px-10 py-5">Робочі години та відвідуваність:</h3>
                                </div>
                                <div className="flex gap-3 px-7 ">
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
                    </div>
                </div>
            </div>
        </Modal>
    )
}