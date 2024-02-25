import { Modal } from '../App/Modal';
import Close from '../../assets/svg/close.svg';


export const AdminLogoutModal = ({setExitModal, onConfirm}) => {
    return (
        <Modal>
            <div className='flex justify-center'>
                <div className='absolute bg-gray-200 shadow-xl w-[40%] h-auto z-10 rounded-md mt-12'>
                    <div className='flex flex-col items-center mx-3 gap-4 mt-5 p-10'>
                        <div className="text-xl text-center mb-5">"Ви впевнені, що хочете завершити робочу зміну? Натисніть 'Так' для видалення або 'Ні' для скасування." </div>
                        <div className="flex gap-10">
                            <button className="flex items-center bg-yellow-600 hover:bg-yellow-700 rounded-lg mb-7 px-7 py-2 text-white font-medium drop-shadow-md transition ease-out hover:ease-in" onClick={() => setExitModal(false)}>Ні</button>
                            <button className="flex items-center bg-teal-600 hover:bg-teal-700 rounded-lg mb-7 px-7 py-2 text-white font-medium drop-shadow-md transition ease-out hover:ease-in" onClick={onConfirm}>Так</button>
                        </div>
                        <div className="absolute top-2 right-2 cursor-pointer" onClick={() => { setExitModal(false) }}>
                            <img className="h-10" src={Close} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
} 