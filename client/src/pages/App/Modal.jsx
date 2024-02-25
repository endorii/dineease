import { createPortal } from 'react-dom';

export const Modal = ({ children }) => {
    return createPortal(
        <div className='modal flex justify-center w-full h-full absolute top-0 l-0 bg-gray-700/[0.6] overflow-auto'>
            {children}
        </div>,
        document.getElementById('modal')
    );
}