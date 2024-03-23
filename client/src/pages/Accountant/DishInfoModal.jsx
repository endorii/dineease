import Close from '../../assets/svg/close.svg';
import { Modal } from '../App/Modal';
import { motion } from 'framer-motion'
import { dropIn } from '../../functions';

export const DishInfoModal = ({ setOpenInfo, item }) => {

    const arrayOf = [
        {
            title: 'Назва',
            item: item.name,
            errorDescr: 'Вагу не вказано'
        },
        {
            title: 'Ціна товару',
            item: item.price,
            errorDescr: 'Ціну не вказано'
        },
        {
            title: 'Вага',
            item: item.weight,
            errorDescr: 'Вагу не вказано'
        },
        {
            title: 'Час приготування',
            item: item.time,
            errorDescr: 'Час не вказано'
        },
        {
            title: 'Колорійність',
            item: item.calories,
            errorDescr: 'Калорійність не вказано'
        },
        {
            title: 'ID товару',
            item: item._id,
            errorDescr: 'Id не знайдено'
        }]

    return (
        <Modal onClick={() => setOpenInfo(false)}>
            <motion.div onClick={(e) => e.stopPropagation()} variants={dropIn} initial='hidden' animate='visible' exit='exit' className='relative flex items-center my-5 bg-gray-50 w-[90%] h-max rounded-md shadow-xl cursor-default'>
                <div>
                    <img className=' absolute top-2 right-2 w-10 cursor-pointer' onClick={() => { setOpenInfo(false) }} src={Close} alt="" />
                </div>
                <div className="flex justify-center w-full p-5 text-sky-900">
                    <div className="text-black flex flex-col gap-2 bg-white shadow-lg rounded-md p-5 gap-5
                    lg:flex-row lg:flex-wrap
                    ">
                        {arrayOf.map((item, i) =>
                            <div key={i}>
                                <div className="font-medium text-lg text-white mb-2 bg-sky-900 px-10 py-3 rounded-md">{item.title}:</div>
                                <div className="flex flex-col justify-start w-full p-2 text-lg gap-1">
                                    {item.item ? <div>{item.item}</div> :
                                        <div className="flex flex-col justify-center items-center w-full h-auto bg-white m-5 p-[5%]">
                                            <div className="font-medium text-2xl mb-2">{item.errorDescr}</div>
                                        </div>
                                    }
                                </div>
                            </div>
                        )}
                        <div>
                            <div className="font-medium text-lg text-white mb-2 bg-sky-900 px-10 py-3 rounded-md">Інгредієнти для приготування:</div>
                            <div className="flex flex-col justify-start w-full p-2 text-lg gap-1">
                                {item.ingredients ? item.ingredients.map((ingredient, i) => (
                                    <div key={i}>- {ingredient};</div>
                                )) :
                                    <div className="flex flex-col justify-center items-center w-full h-auto bg-white m-5 p-[5%]">
                                        <div className="font-medium text-2xl mb-2">Вибачте, інгредієнти не доступні</div>
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