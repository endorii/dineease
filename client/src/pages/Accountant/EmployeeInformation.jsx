import { Modal } from '../App/Modal'
import Close from '../../assets/svg/close.svg'
import { experienceCounter } from "../../functions"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getOrdersByWaiterId } from "../../actions/orders.actions"
import { useParams } from "react-router-dom"

export const EmployeeInformation = ({ employee, setOpenInfo }) => {

    const dispatch = useDispatch();
    const { restaurantId } = useParams();

    useEffect(() => {
        dispatch(getOrdersByWaiterId(restaurantId, employee._id));
    }, [])

    return (
        <Modal>
            <div className='flex justify-center'>
                <div className='absolute bg-gray-100 shadow-xl w-[60%] h-auto z-10 rounded-md my-5 py-5 pb-10'>
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
                        <div className="flex flex-col items-center gap-5">
                            <div className='bg-white rounded-xl shadow-lg p-10 w-[90%]'>
                                <h3 className='text-2xl font-medium p-3'>Базова інформація:</h3>
                                <div className='flex flex-wrap gap-5 pb-5'>
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

                            <div className='bg-white rounded-xl shadow-lg p-10 w-[90%]'>
                                <h3 className='text-2xl font-medium p-3'>Загальна інформація:</h3>
                                <div className='flex flex-wrap gap-5 pb-5'>
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
            </div>
        </Modal>
    )
}