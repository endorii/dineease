import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Close from '../assets/svg/close.svg'
import { useParams } from 'react-router-dom';
import { fetchMenuCategories } from '../store/slices/menuCategories.slice';
import { addMenuCategory } from '../actions/menu.actions';
import { fetchMenuDishes } from '../store/slices/menuDishes.slice';
import toast from 'react-hot-toast';
import { Modal } from './Modal';
// import { Transition } from '@headlessui/react'

export const AddCategoryModal = ({ setOpenAddCategoryModal }) => {

    const dispatch = useDispatch();

    const { restaurantId } = useParams();

    const [categoryName, setCategoryName] = useState('');
    const [categoryLogo, setCategoryLogo] = useState('');

    const [categoryNameTouched, setCategoryNameTouched] = useState(false);
    const [categoryLogoTouched, setCategoryLogoTouched] = useState(false);

    const [categoryNameError, setCategoryNameError] = useState('Поле не можу бути пустим');
    const [categoryLogoError, setCategoryLogoError] = useState('Поле не можу бути пустим');

    const notifySuccess = (message) => { toast.success(message) };

    const handleCategoryName = (e) => {
        setCategoryName(e.target.value);
        const re = /^[а-яА-ЯҐґЄєІіЇїҐґa-zA-Z\s]+$/;

        if (!re.test(String(e.target.value).toLowerCase())) {
            setCategoryNameError('Невірно введено Ім`я страви');
        } else {
            setCategoryNameError('');
        }
    };

    const handleCategoryLogo = (e) => {
        setCategoryLogo(e.target.value);
        if (e.target.value.trim() === '') {
            setCategoryLogoError('Поле не може бути пустим');
        } else {
            setCategoryLogoError('');
        }
    };

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'categoryname':
                setCategoryNameTouched(true);
                break;
            case 'categorylogo':
                setCategoryLogoTouched(true);
                break;

            default: ;
        }
    }

    useEffect(() => {
        dispatch(fetchMenuDishes(restaurantId));
        dispatch(fetchMenuCategories(restaurantId));
    }, [])

    return (
        <Modal>
            <div className='relative bg-gray-50 m-16 rounded-lg shadow-xl h-[450px]'>
                <div className="">
                    <img className="absolute right-2 top-2 z-20 w-10 cursor-pointer " src={Close} alt="" onClick={() => {
                        setOpenAddCategoryModal(false)
                    }} />
                </div>

                <div>
                    <div className='text-3xl font-medium text-sky-950 text-center px-12 py-7'>Додати страву</div>
                    <hr className='border-t-1 border-slate-300' />
                </div>


                <div className='flex flex-col gap-3 px-10 py-7 mt-5'>
                    <div className='flex gap-2'>
                        <div className='flex flex-col gap-8'>
                            <div className='flex gap-5 items-center justify-between relative'>
                                <label htmlFor="dishname" className="block font-medium mb-1 text-xl bg-sky-900 text-white px-4 py-3 rounded-xl">Назва:</label>
                                <input
                                    value={categoryName}
                                    onChange={(e) => { handleCategoryName(e) }}
                                    type="text"
                                    id="dishname"
                                    name="dishname"
                                    onBlur={(e) => { blurHandler(e) }}
                                    className={categoryNameTouched && categoryNameError ? "bg-gray-50 border border-red-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5 " : "bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5"} required
                                />
                                {(categoryNameTouched && categoryNameError) && <div className="absolute -top-7 left-[50%] text-red-600 text-center">{categoryNameError}</div>}
                            </div>
                            <div className='flex gap-5 items-center justify-between relative'>
                                <label htmlFor="dishlogo" className="block font-medium mb-1 text-xl bg-sky-900 text-white px-4 py-3 rounded-xl">Фотографія:</label>
                                <input
                                    value={categoryLogo}
                                    onChange={(e) => { handleCategoryLogo(e) }}
                                    type="file"
                                    id="dishlogo"
                                    name="dishlogo"
                                    onBlur={(e) => { blurHandler(e) }}
                                    className={categoryLogoTouched && categoryLogoError ? "bg-gray-50 border border-red-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5 " : "bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5"} required
                                />
                                {(categoryLogoTouched && categoryLogoError) && <div className="absolute -top-7 left-[50%] text-red-600 text-center">{categoryLogoError}</div>}
                            </div>
                        </div>

                    </div>
                    <div className='flex justify-center'>
                        <button
                            onClick={async (e) => {
                                e.preventDefault();
                                await addMenuCategory(restaurantId, categoryName, categoryLogo);
                                dispatch(fetchMenuCategories(restaurantId));
                                dispatch(fetchMenuCategories(restaurantId));
                                setOpenAddCategoryModal(false);
                                notifySuccess('Категорію додано!');
                            }}
                            disabled={categoryNameError}
                            className="bg-teal-600 hover:bg-teal-700 rounded-lg mb-7 mt-10 px-7 py-2 text-white font-medium drop-shadow-md disabled:bg-teal-900/20 disabled:hover:bg-teal-900/20 disabled:text-gray-100 disabled:cursor-not-allowed">
                            Підтвердити
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}