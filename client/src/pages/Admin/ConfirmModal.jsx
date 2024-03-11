import { Modal } from "../App/Modal";
import Close from "../../assets/svg/close.svg";
import { motion } from 'framer-motion'
import { dropIn } from "../../functions";

export const ConfirmModal = ({ setModalOpen, onConfirm }) => {

    return (
        <Modal
            onClick={() => setModalOpen(false)}
        >
            <motion.div onClick={(e) => e.stopPropagation()} variants={dropIn} initial='hidden' animate='visible' exit='exit' className=' absolute flex justify-center cursor-default mt-16 w-[40%]'>
                <div className='relative bg-gray-200 shadow-xl w-full h-auto z-10 rounded-md'>
                    <div className='flex flex-col items-center mx-3 gap-4 mt-10 px-10'>
                        <div className="text-xl text-center mb-5">Ви впевнені, що хочете видалити цей елемент?. Натисніть 'Так' для видалення або 'Ні' для скасування. </div>
                        <div className="flex gap-10">
                            <button className="flex items-center bg-yellow-600 hover:bg-yellow-700 rounded-lg mb-7 px-7 py-2 text-white font-medium drop-shadow-md transition ease-out hover:ease-in" onClick={() => setModalOpen(false)}>Ні</button>
                            <button className="flex items-center bg-teal-600 hover:bg-teal-700 rounded-lg mb-7 px-7 py-2 text-white font-medium drop-shadow-md transition ease-out hover:ease-in" onClick={onConfirm}>Так</button>
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
