import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Close from '../assets/svg/close.svg'
import { useParams } from 'react-router-dom';
import { fetchMenuCategories } from '../store/slices/menuCategories.slice';
import { addMenuCategory } from '../actions/menu.actions';
import { fetchMenuDishes } from '../store/slices/menuDishes.slice';
import toast from 'react-hot-toast';
import { Modal } from './Modal';

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
            <div className='relative bg-gray-50 m-16 rounded-lg shadow-xl w-[40%]'>
                <div className="">
                    <img className="absolute right-2 top-2 z-20 w-12 cursor-pointer bg-white rounded-3xl" src={Close} alt="" onClick={() => {
                        setOpenAddCategoryModal(false)
                    }} />
                </div>
                <div className='flex w-auto z-10 rounded-md mt-10'>
                    <div className="flex justify-around w-full rounded-xl gap-3 p-10">
                        <div className='p-10 flex flex-col bg-white rounded-xl shadow-xl w-full'>
                            <div className='text-3xl font-medium text-center text-sky-900'>Додати категорію страв</div>
                            <form className='flex flex-col justify-center m-10 gap-4 text-sky-900' action="POST">
                                <div>
                                    <label htmlFor="categoryname" className="block font-medium mb-1 ">Назва категорії</label>
                                    <input
                                        value={categoryName}
                                        onChange={(e) => { handleCategoryName(e) }}
                                        type="text"
                                        name="categoryname"
                                        id="categoryname"
                                        onBlur={(e) => { blurHandler(e) }}
                                        className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
                                    {(categoryNameTouched && categoryNameError) && <div className="text-red-600">{categoryNameError}</div>}
                                </div>
                                <div>
                                    <label htmlFor="categorylogo" className="block font-medium mb-1 ">Завантажити фотографію</label>
                                    <input
                                        value={categoryLogo}
                                        onChange={(e) => { handleCategoryLogo(e) }}
                                        type="file"
                                        id="categorylogo"
                                        name="categorylogo"
                                        onBlur={(e) => { blurHandler(e) }}
                                        className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        required
                                    />
                                    {(categoryLogoTouched && categoryLogoError) && <div className="text-red-600">{categoryLogoError}</div>}
                                </div>
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
                                    className="bg-teal-600 hover:bg-teal-700 rounded-lg mb-7 mx-[30%] mt-10 px-7 py-2 text-white font-medium drop-shadow-md disabled:bg-teal-900/20 disabled:hover:bg-teal-900/20 disabled:text-gray-100 disabled:cursor-not-allowed">
                                    Підтвердити
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}