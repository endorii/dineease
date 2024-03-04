import Close from '../../assets/svg/close.svg';
import { Modal } from '../App/Modal';
import { motion } from 'framer-motion'
import { dropIn } from '../../functions';


export const OrderInfoModal = ({ setOpenInfo, order }) => {
    return (
        <Modal onClick={() => setOpenInfo(false)}>
            <motion.div onClick={(e) => e.stopPropagation()} variants={dropIn} initial='hidden' animate='visible' exit='exit' className='relative flex items-center m-24 bg-gray-50 w-[70%] rounded-md shadow-xl cursor-default'>
                <div>
                    <img className=' absolute top-2 right-2 w-10 cursor-pointer' onClick={() => { setOpenInfo(false) }} src={Close} alt="" />
                </div>
                <div className="flex justify-center w-full m-5 text-sky-900 gap-10">
                    <div className="text-black flex flex-col gap-2 bg-white shadow-lg rounded-md p-[3%]">
                        <div>
                            <div className="font-medium text-lg text-white mb-2 bg-sky-900 px-10 py-3 rounded-md">Id:</div>
                            <div className="flex flex-col justify-start w-full p-2 text-lg gap-1">
                                {order._id ? <div>{order._id}</div> :
                                    <div className="flex flex-col justify-center items-center w-full h-auto bg-white m-5 p-[5%]">
                                        <div className="font-medium text-2xl mb-2">Id не вказано</div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div>
                            <div className="font-medium text-lg text-white mb-2 bg-sky-900 px-10 py-3 rounded-md">Id ресторану:</div>
                            <div className="flex flex-col justify-start w-full p-2 text-lg gap-1">
                                {order.restaurant ? <div>{order.restaurant}</div> :
                                    <div className="flex flex-col justify-center items-center w-full h-auto bg-white m-5 p-[5%]">
                                        <div className="font-medium text-2xl mb-2">Id не вказано</div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div>
                            <div className="font-medium text-lg text-white mb-2 bg-sky-900 px-10 py-3 rounded-md">Id офіціанта:</div>
                            <div className="flex flex-col justify-start w-full p-2 text-lg gap-1">
                                {order.waiter ? <div>{order.waiter}</div> :
                                    <div className="flex flex-col justify-center items-center w-full h-auto bg-white m-5 p-[5%]">
                                        <div className="font-medium text-2xl mb-2">Id не вказано</div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div>
                            <div className="font-medium text-lg text-white mb-2 bg-sky-900 px-10 py-3 rounded-md">Час відкриття:</div>
                            <div className="flex flex-col justify-start w-full p-2 text-lg gap-1">
                                {order.date && order.time ? <div>{order.date}, {order.time}</div> :
                                    <div className="flex flex-col justify-center items-center w-full h-auto bg-white m-5 p-[5%]">
                                        <div className="font-medium text-2xl mb-2">Час не вказано, або замовлення не існує</div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div>
                            <div className="font-medium text-lg text-white mb-2 bg-sky-900 px-10 py-3 rounded-md">Стан:</div>
                            <div className="flex flex-col justify-start w-full p-2 text-lg gap-1">
                                {order ? <div>{order.isOpen ? 'Відкрите' : "Закрите"}</div> :
                                    <div className="flex flex-col justify-center items-center w-full h-auto bg-white m-5 p-[5%]">
                                        <div className="font-medium text-2xl mb-2">Час не вказано, або замовлення не існує</div>
                                    </div>
                                }
                            </div>
                        </div>

                    </div>
                    <div className="flex flex-col gap-5 bg-white shadow-lg rounded-md p-[3%] text-black">
                        <div>
                            <div className="font-medium text-lg text-white mb-2 bg-sky-900 px-10 py-3 rounded-md">Замовлення:</div>
                            <div className="flex flex-col justify-start w-full p-2 text-lg gap-1">
                                {order.items ? order.items[0].orderInfo.map((item, i) => (
                                    <ul key={i} className='p-3 bg-gray-100 rounded-xl font-medium'>
                                        <li>{item.name}</li>
                                        <li>{item.price} UAH</li>
                                        <hr />
                                    </ul>
                                )) :
                                    <div className="flex flex-col justify-center items-center w-full h-auto bg-white m-5 p-[5%]">
                                        <div className="font-medium text-2xl mb-2">Немає даних про замовлення</div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </motion.div>
        </Modal>
    )
}