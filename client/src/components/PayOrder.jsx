import { useState } from 'react'
import Close from '../assets/svg/close.svg'
import { PayNumberPad } from './PayNumberPad'
// import { getTotalOrderValue } from '../functions'
// import { closeOrder } from './ordersActions'
import { useDispatch } from 'react-redux'
import { getTotalOrderValue } from '../functions'
// import { fetchOrders } from '../store/slices/ordersSlice'

export const PayOrder = ({ setOpenPayOrder, currentOrder }) => {

    const [cashInputValue, setCashInputValue] = useState(0);
    const [cardInputValue, setCardInputValue] = useState(0);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cash');

    const dispatch = useDispatch();

    return (
        <div className='flex justify-center'>
            <div className=""><img className="absolute top-14 right-20 z-20 w-12 cursor-pointer" src={Close} alt="" onClick={() => {
                setOpenPayOrder(false)
            }} />
            </div>
            <div className='absolute flex bg-white shadow-xl w-[95%] z-10 rounded-md mt-10 bg-gray-400'>
                <div className="flex rounded-xl h-[90vh]">
                    <div className="bg-gray-200 w-[30%] h-full flex items-center">
                        <PayNumberPad />
                    </div>
                    <div className="flex-1 flex flex-col bg-white px-32 py-10 justify-between">
                        <div>
                            <div className='font-medium text-4xl mb-10'>
                                <p className='font-thin text-lg text-gray-400 mb-5'>Замовлення: {currentOrder._id}</p>
                                <p>Разом до сплати: {getTotalOrderValue(currentOrder)}₴</p>
                            </div>

                            <div>
                                <ul className='flex flex-col font-medium text-xl gap-1 '>Виберіть спосіб оплати:
                                    <li onClick={() => {setSelectedPaymentMethod('cash')}} className={`text-2xl border-2 w-full px-4 py-2 rounded-lg hover:border-blue-500 ${selectedPaymentMethod === 'cash' ? 'border-sky-700' : null}`}>
                                        <div className='flex w-full justify-between items-center'>
                                            <p>💵 Готівкою</p>
                                            <div className='flex'>
                                                <input onChange={(e) => { setCashInputValue(e.target.value) }} value={cashInputValue} className='w-auto text-right px-1 text-4xl focus:outline-none' type="number" />
                                                <p className='text-4xl'>₴</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li onClick={() => {setSelectedPaymentMethod('card')}} className={`text-2xl border-2 w-full px-4 py-2 rounded-lg hover:border-blue-500 ${selectedPaymentMethod === 'card' ? 'border-sky-700' : null}`}>
                                        <div className='flex w-full justify-between items-center'>
                                            <p>💳 Карткою</p>
                                            <div className='flex'>
                                                <input onChange={(e) => { setCardInputValue(e.target.value) }} value={cardInputValue} className='text-right text-4xl px-1 focus:outline-none' type="number" />
                                                <p className='text-4xl'>₴</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className='flex p-5 items-center justify-between'>
                                <div className='flex items-center'>
                                    <label className="relative inline-flex items-center mr-5 cursor-pointer">
                                        <input type="checkbox" value="" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                    </label>
                                    <span className="text-xl text-black pb-1">Друкувати чек</span>
                                </div>
                                <div className='text-3xl'>
                                    Сума: 
                                    <p className='text-4xl inline font-medium'> {Number(cardInputValue) + Number(cashInputValue)}₴</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-[20%] justify-center items-center text-white'>
                            <button className='bg-yellow-600 px-6 py-4 text-2xl font-medium hover:bg-yellow-700 rounded-md'>Закрити без оплати</button>
                            <button onClick={async () => {
                                // await closeOrder(currentOrder._id);
                                 setOpenPayOrder(false); 
                                //  dispatch(fetchOrders())
                                 }} className='bg-teal-600 px-6 py-4 text-2xl font-medium hover:bg-teal-700 rounded-md'>Сплатити замовлення</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}