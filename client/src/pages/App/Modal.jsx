import { createPortal } from 'react-dom';
import { motion } from 'framer-motion'

export const Modal = ({ children, onClick }) => {
    return createPortal(
        <motion.div
            className='modal flex justify-center w-full h-full absolute top-0 l-0 bg-gray-700/[0.6] overflow-auto cursor-pointer'
            onClick={onClick}
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
            }}
        >
            {children}
        </motion.div>,
        document.getElementById('modal')
    );
}