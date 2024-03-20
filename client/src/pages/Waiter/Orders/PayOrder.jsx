import { useState } from 'react'
import Close from '../../../assets/svg/close.svg'
import { PayNumberPad } from './PayNumberPad'
import { useDispatch, useSelector } from 'react-redux'
import { dropInToLeft, getTotalOrderValue } from '../../../functions'
import { closeOrder, getOrdersByWaiter } from '../../../actions/orders.actions'
import { useParams } from 'react-router-dom'
import { updateWaiterServedTables } from '../../../actions/employees.actions'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast';
import { Modal } from '../../App/Modal'

export const PayOrder = ({ setOpenPayOrder, currentOrder }) => {

    const [cashInputValue, setCashInputValue] = useState(0);
    const [cardInputValue, setCardInputValue] = useState(0);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cash');
    const { restaurantId } = useParams();
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const notifySuccess = () => {
        toast.success('Замовлення успішно закрито!');
    };

    return (
        <Modal onClick={() => setOpenPayOrder(false)}>
            <motion.div onClick={(e) => e.stopPropagation()} variants={dropInToLeft} initial='hidden' animate='visible' exit='exit' className='absolute w-full flex justify-center mt-5
            sm:
            md:
            lg:mt-10
            xl: 
            2xl: 
            '>
                <div className='absolute flex justify-center bg-white w-[95%] cursor-default
                '>
                    <div className="">
                        <img className="absolute top-2 right-2 z-20 w-10 cursor-pointer
                        sm:
                        md:top-5 md:right-5 
                        lg:top-5 lg:right-5
                        xl: 
                        2xl: 
                        " src={Close} alt="" onClick={() => {
                                setOpenPayOrder(false)
                            }} />
                    </div>
                    <div className='flex bg-white z-10 rounded-md'>
                        <div className="flex rounded-xl">
                            <div className="h-full flex items-center">
                                <PayNumberPad selectedPaymentMethod={selectedPaymentMethod} setCashInputValue={setCashInputValue} setCardInputValue={setCardInputValue} cashInputValue={cashInputValue} cardInputValue={cardInputValue} />
                            </div>
                            <div className="flex flex-col bg-white px-8 py-10 justify-between">
                                <div>
                                    <div className='font-medium text-4xl mb-10'>
                                        <p className='font-thin text-gray-400 text-base
                                        sm:text-base
                                        md:
                                        lg:text-lg lg:mb-5
                                        xl: 
                                        2xl: 
                                        '>Замовлення: {currentOrder._id}</p>
                                        <p className=' text-xl mt-4
                                        sm:
                                        md:text-2xl
                                        lg:text-3xl
                                        xl: 
                                        2xl: 
                                        '>Разом до сплати:
                                            <span className='ml-2 px-3 py-2 bg-sky-800 text-white rounded-lg'>
                                                {getTotalOrderValue(currentOrder)}₴
                                            </span>
                                        </p>
                                    </div>
                                    <div>
                                        <ul className='flex flex-col font-medium text-xl gap-1 '>Виберіть спосіб оплати:
                                            <li onClick={() => { setSelectedPaymentMethod('cash') }} className={`text-base border-2 px-4 py-2 rounded-lg hover:border-blue-500 
                                            sm:
                                            md:text-2xl
                                            lg:
                                            xl: 
                                            2xl: 
                 ${selectedPaymentMethod === 'cash' ? 'border-sky-700' : null}`}>
                                                <div className='flex w-full justify-between items-center'>
                                                    <p className='w-full 
                                                    sm:
                                                    md:text-lg
                                                    lg:text-xl
                                                    xl: 
                                                    2xl: 
                                                    '>💵 Готівкою</p>
                                                    <div className='flex'>
                                                        <input onClick={() => {
                                                            if (cashInputValue <= 0) {
                                                                setCashInputValue('')
                                                            }
                                                        }} onChange={(e) => { setCashInputValue(e.target.value) }} value={cashInputValue} className='text-2xl w-full text-right px-1 focus:outline-none
                                                        sm:
                                                        md:text-3xl 
                                                        lg:text-4xl
                                                        xl: 
                                                        2xl:  
                                                    ' type="number" />
                                                        <p className='text-xl
                                                        sm:text-2xl
                                                        md:text-3xl
                                                        lg:text-4xl
                                                        '>₴</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li onClick={() => { setSelectedPaymentMethod('card') }} className={`text-base border-2 px-4 py-2 rounded-lg hover:border-blue-500 
                                            sm:t
                                            md:text-2xl
                                            lg:
                                            xl: 
                                            2xl: 
                 ${selectedPaymentMethod === 'card' ? 'border-sky-700' : null}`}>
                                                <div className='flex w-full justify-between items-center'>
                                                    <p className='w-full
                                                    sm:
                                                    md:text-lg
                                                    lg:text-xl
                                                    xl: 
                                                    2xl: 
                                                    '>💳 Карткою</p>
                                                    <div className='flex'>
                                                        <input onClick={() => {
                                                            if (cardInputValue <= 0) {
                                                                setCardInputValue('')
                                                            }
                                                        }} onChange={(e) => { setCardInputValue(e.target.value) }} value={cardInputValue} className='text-2xl w-full text-right px-1 focus:outline-none
                                                        sm:
                                                        md:text-3xl 
                                                        lg:text-4xl
                                                        xl: 
                                                        2xl: 
                                                    ' type="number" />
                                                        <p className='text-xl
                                                        sm:text-2xl
                                                        md:text-3xl
                                                        lg:text-4xl
                                                        '>₴</p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='flex items-center justify-between gap-4
                                    sm:p-3
                                    md:p-4
                                    lg:p-5
                                    '>
                                        <div className='flex items-center'>
                                            <label className="relative inline-flex items-center mr-5 cursor-pointer">
                                                <input type="checkbox" value="" className="sr-only peer" />
                                                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                            </label>
                                            <span className="text-base text-black pb-1
                                            sm:
                                            md:text-base
                                            lg:text-lg
                                            ">Друкувати чек</span>
                                        </div>
                                        <div className='flex items-center text-xl w-full
                                        sm:
                                        md:text-2xl
                                        lg:text-3xl
                                        '>
                                            Сума:
                                            <p className='text-left text-2xl font-medium px-3 py-2 bg-sky-800 rounded-lg text-white ml-2
                                            sm:
                                            md:text-2xl
                                            lg:text-3xl
                                            '> {Number(cardInputValue) + Number(cashInputValue)}₴</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex gap-[10%] justify-center items-center text-white'>
                                    <button className='bg-yellow-600 font-medium hover:bg-yellow-700 rounded-md px-3 py-2
                                    sm:
                                    md:text-xl
                                    lg:
                                    xl: 
                                    2xl: 
                                    '>Закрити без оплати</button>
                                    <button onClick={async () => {
                                        await closeOrder(restaurantId, currentOrder._id);
                                        await updateWaiterServedTables(user._id, user.workingTime.filter(item => item.entries.end === null)[0].entries.start);
                                        setOpenPayOrder(false);
                                        notifySuccess();
                                        dispatch(getOrdersByWaiter(restaurantId, user._id));
                                    }} disabled={(Number(cardInputValue) + Number(cashInputValue)) < getTotalOrderValue(currentOrder)} className='bg-teal-600 font-medium hover:bg-teal-700 rounded-md disabled:bg-teal-900/30 disabled:cursor-not-allowed transition ease-out hover:ease-in px-3 py-2
                                    sm:
                                    md:text-xl
                                    lg:
                                    xl: 
                                    2xl: 
                                    '>Сплатити замовлення</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Modal>
    )
}