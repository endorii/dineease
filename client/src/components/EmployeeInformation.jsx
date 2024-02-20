import { Modal } from "./Modal"
import Close from '../assets/svg/close.svg'
import { experienceCounter } from "../functions"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOrdersByWaiter, getOrdersByWaiterId } from "../actions/orders.actions"
import { useParams } from "react-router-dom"

export const EmployeeInformation = ({ employee, setOpenInfo }) => {

    const dispatch = useDispatch();
    const { restaurantId } = useParams();

    const { orders } = useSelector(state => state.orders);

    useEffect(() => {
        dispatch(getOrdersByWaiterId(restaurantId, employee._id));
    }, [])

    return (
        <Modal>
            <div className='flex justify-center'>
                <div className='absolute bg-gray-100 shadow-xl w-[95%] h-auto z-10 rounded-md my-5'>
                    <div className="">
                        <img className="absolute right-2 top-2 z-20 w-10 cursor-pointer " src={Close} alt="" onClick={() => {
                            setOpenInfo(false)
                        }} />
                    </div>
                    <div className='flex flex-col items-center '>
                        <div className="p-10">
                            <h2 className="text-3xl font-thin"> Інформація про робітника <span className="font-medium">{employee.name}</span></h2>
                        </div>
                        <hr className='border-t-1 border-slate-300 w-full mb-10' />
                    </div>
                    <div>
                        <div>
                            <div>
                                <div className="flex flex-wrap justify-center gap-5">
                                    <div className='bg-white rounded-xl shadow-lg p-10'>
                                        <h3 className='text-2xl font-medium p-3'>Базова інформація:</h3>
                                        <div className='flex gap-5 pb-5'>
                                            <div className='p-3'>
                                                <p className='font-medium text-xl text-sky-800 '>Ресторан</p>
                                                <p className='bg-sky-950 text-white mt-2 px-3 py-2 rounded-xl'>restaurant.name</p>
                                            </div>
                                            <div className='p-3'>
                                                <p className='font-medium text-xl text-sky-800 '>Дата реєстрації</p>
                                                <p className='bg-sky-950 text-white mt-2 px-3 py-2 rounded-xl'>user.registrationDate</p>
                                            </div>
                                            <div className='p-3'>
                                                <p className='font-medium text-xl text-sky-800 '>ID робітника</p>
                                                <p className='bg-sky-950 text-white mt-2 px-3 py-2 rounded-xl'>{employee._id}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='bg-white rounded-xl shadow-lg p-10'>
                                        <h3 className='text-2xl font-medium p-3'>Особиста інформація:</h3>
                                        <div className='flex gap-5 pb-5'>
                                            <div className='p-3'>
                                                <p className='font-medium text-xl text-sky-800'>Дата народження</p>
                                                <p className='bg-sky-950 text-white mt-2 px-3 py-2 rounded-xl'>user.birthDate</p>
                                            </div>
                                            <div className='p-3'>
                                                <p className='font-medium text-xl text-sky-800'>Адреса</p>
                                                <p className='bg-sky-950 text-white mt-2 px-3 py-2 rounded-xl'>user.location</p>
                                            </div>
                                            <div className='p-3'>
                                                <p className='font-medium text-xl text-sky-800'>Номер телефону</p>
                                                <p className='bg-sky-950 text-white mt-2 px-3 py-2 rounded-xl'>user.phoneNumber</p>
                                            </div>
                                            <div className='p-3'>
                                                <p className='font-medium text-xl text-sky-800'>Стаж роботи</p>
                                                <p className='bg-sky-950 text-white mt-2 px-3 py-2 rounded-xl'>{experienceCounter(+employee.experience)} </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='bg-white rounded-xl shadow-lg p-10'>
                                        <h3 className='text-2xl font-medium p-3'>Загальна інформація:</h3>
                                        <div className='flex gap-5 pb-5'>
                                            <div className='p-3'>
                                                <p className='font-medium text-xl text-sky-800 '>Тип часу роботи</p>
                                                <p className='bg-sky-950 text-white mt-2 px-3 py-2 rounded-xl'>Повний робочий день</p>
                                            </div>
                                            <div className='p-3'>
                                                <p className='font-medium text-xl text-sky-800 '>Професія</p>
                                                <p className='bg-sky-950 text-white mt-2 px-3 py-2 rounded-xl'>{employee.position}</p>
                                            </div>
                                            <div className='p-3'>
                                                <p className='font-medium text-xl text-sky-800 '>Локація</p>
                                                <p className='bg-sky-950 text-white mt-2 px-3 py-2 rounded-xl'>user.restaurant.location</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {employee.position === 'Waiter' ? <div>
                            <div>
                                <h3 className="text-2xl font-medium px-10 py-5">Статистика замовлень:</h3>
                            </div>
                            <div>
                                <div></div>
                            </div>
                        </div> : null}
                        <div>
                            <div>
                                <h3 className="text-2xl font-medium px-10 py-5">Робочі години та відвідуваність:</h3>
                            </div>
                            <div className="flex gap-3 mx-3 ">
                                {employee.workingTime.map((item, i) => 
                                    <div className="p-5 rounded-xl bg-white shadow-lg">
                                        {item.date}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}