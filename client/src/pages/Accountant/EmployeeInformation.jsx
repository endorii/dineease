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

    const basicInfo = [
        {
            title: "Ресторан",
            value: employee.restaurant,
        },
        {
            title: "Дата реєстрації",
            value: employee.registrationDate,
        },
        {
            title: "ID робітника",
            value: employee._id,
        }
    ];
    const globalInfo = [
        {
            title: "Тип часу роботи",
            value: employee.typeOfWorkingTime,
        },
        {
            title: "Професія",
            value: employee.position,
        },
        {
            title: "Локація",
            value: employee.location,
        },
        {
            title: "Стаж роботи",
            value: experienceCounter(+employee.experience),
        }
    ];

    useEffect(() => {
        dispatch(getOrdersByWaiterId(restaurantId, employee._id));
    }, [])

    return (
        <Modal onClick={() => setOpenInfo(false)}>
            <div onClick={(e) => e.stopPropagation()} className='flex justify-center cursor-default'>
                <div className='absolute bg-gray-100 shadow-xl w-[95%] h-max z-10 rounded-md my-5 py-5 pb-10 md:w-[80%] lg:w-[60%]'>
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
                            <div className='bg-white rounded-xl shadow-lg p-5 w-[90%]'>
                                <h3 className='text-2xl font-medium p-3'>Базова інформація:</h3>
                                <div className='flex flex-wrap gap-2 pb-5 lg:gap-5'>
                                    {basicInfo.map((item, i) =>
                                        <div className='p-2' key={i}>
                                            <p className='font-medium text-xl text-sky-800 '>{item.title}:</p>
                                            <p className='bg-sky-950 text-white mt-2 px-3 py-2 rounded-xl'>{item.value}</p>
                                        </div>)}
                                </div>
                            </div>

                            <div className='bg-white rounded-xl shadow-lg p-5 w-[90%]'>
                                <h3 className='text-2xl font-medium p-3'>Загальна інформація:</h3>
                                <div className='flex flex-wrap gap-2 pb-5 lg:gap-5'>
                                    {globalInfo.map((item, i) =>
                                        <div className='p-2' key={i}>
                                            <p className='font-medium text-xl text-sky-800 '>{item.title}:</p>
                                            <p className='bg-sky-950 text-white mt-2 px-3 py-2 rounded-xl'>{item.value}</p>
                                        </div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}