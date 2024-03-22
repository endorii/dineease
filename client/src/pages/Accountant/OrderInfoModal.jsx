import Close from '../../assets/svg/close.svg';
import { Modal } from '../App/Modal';
import { motion } from 'framer-motion'
import { dropIn } from '../../functions';

export const OrderInfoModal = ({ setOpenInfo, order }) => {

    const arrayOf = [
        {
            title: 'Id:',
            item: order._id,
            errorDescr: 'Id не вказано'
        },
        {
            title: 'Id ресторану:',
            item: order.restaurant,
            errorDescr: 'Id не вказано'
        },
        {
            title: 'Id офіціанта:',
            item: order.waiter,
            errorDescr: 'Id не вказано'
        },
        {
            title: 'Час відкриття:',
            item: [order.date, order.time],
            errorDescr: 'Час не вказано, або замовлення не існує'
        },
    ]

    return (
        <Modal onClick={() => setOpenInfo(false)}>
            <motion.div onClick={(e) => e.stopPropagation()} variants={dropIn} initial='hidden' animate='visible' exit='exit' className='relative flex m-5 bg-gray-50 w-[95%] h-[90%] px-5 py-10 rounded-md shadow-xl cursor-default overflow-y-auto
            sm:
            md:
            lg:w-[70%]
            xl: 
            2xl: 
            '>
                <div>
                    <img className=' absolute top-2 right-2 w-8 cursor-pointer' onClick={() => { setOpenInfo(false) }} src={Close} alt="" />
                </div>
                <div className="flex flex-col w-full text-sky-900 gap-3">
                    <div className="flex flex-wrap gap-2 text-black bg-white shadow-lg rounded-md p-5 w-full">
                        {arrayOf.map((item, i) =>
                            <div key={i} className='w-[250px]'>
                                <div className="font-medium text-lg text-white mb-2 bg-sky-900 px-10 py-3 rounded-md">{item.title}</div>
                                <div className="flex flex-col justify-start w-full p-2 text-lg gap-1">
                                    {item.item ? <div>{item.item.toString()}</div> :
                                        <div className="flex flex-col justify-center items-center w-full h-auto bg-white m-5 p-[5%]">
                                            <div className="font-medium text-2xl mb-2">{item.errorDescr}</div>
                                        </div>
                                    }
                                </div>
                            </div>
                        )}

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