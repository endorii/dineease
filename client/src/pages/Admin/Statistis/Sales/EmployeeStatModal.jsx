import { Modal } from "../../../App/Modal";
import Close from "../../../../assets/svg/close.svg";
import { motion } from 'framer-motion'
import { dropIn } from "../../../../functions";

export const EmployeeStatModal = ({ setModalOpen }) => {

    return (
        <Modal
            onClick={() => setModalOpen(false)}
        >
            <motion.div onClick={(e) => e.stopPropagation()} variants={dropIn} initial='hidden' animate='visible' exit='exit' className=' absolute flex justify-center cursor-default mt-16 w-[90%]'>
                <div className='relative bg-gray-200 shadow-xl w-full h-auto z-10 rounded-md'>
                    <div className='flex flex-col items-center mx-3 gap-4 mt-10 px-10'>
                        <div className="text-xl text-center mb-5">Текст для заповнення модального вікна</div>
                        
                        <div className="absolute top-2 right-2 cursor-pointer" onClick={() => { setModalOpen(false) }}>
                            <img className="h-10" src={Close} alt="" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </Modal>
    )
}
