import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Close from '../assets/svg/close.svg'
import { useParams } from 'react-router-dom';
import { fetchMenuCategories } from '../store/slices/menuCategories.slice';
import { addDish } from '../actions/menu.actions';
import { fetchMenuDishes } from '../store/slices/menuDishes.slice';
import toast from 'react-hot-toast';
import { Modal } from './Modal';

export const AddDishModal = ({ setOpenAddDishModal }) => {

    const dispatch = useDispatch();

    const { restaurantId } = useParams();

    const { menuCategories } = useSelector(state => state.menuCategories);

    const [dishName, setDishName] = useState('');
    const [dishPrice, setDishPrice] = useState();
    const [dishTime, setDishTime] = useState();
    const [dishAmount, setDishAmount] = useState();
    const [dishWeight, setDishWeight] = useState();
    const [dishCal, setDishCal] = useState();
    const [dishCategory, setDishCategory] = useState(menuCategories[0].category);
    const [dishCategoryId, setDishCategoryId] = useState(null);
    const [dishIngredients, setDishIngredients] = useState(['']);
    const [dishLogo, setDishLogo] = useState('');

    const [dishNameTouched, setDishNameTouched] = useState(false);
    const [dishPriceTouched, setDishPriceTouched] = useState(false);
    const [dishTimeTouched, setDishTimeTouched] = useState(false);
    const [dishWeightTouched, setDishWeightTouched] = useState(false);
    const [dishCalTouched, setDishCalTouched] = useState(false);
    const [dishCategoryTouched, setDishCategoryTouched] = useState(false);
    const [dishIngredientsTouched, setDishIngredientsTouched] = useState(false);
    const [dishLogoTouched, setDishLogoTouched] = useState(false);
    const [dishAmountTouched, setDishAmountTouched] = useState(false);

    const [dishNameError, setDishNameError] = useState('Поле не може бути пустим');
    const [dishPriceError, setDishPriceError] = useState('Поле не може бути пустим');
    const [dishTimeError, setDishTimeError] = useState('Поле не може бути пустим');
    const [dishAmountError, setDishAmountError] = useState('Поле не може бути пустим');
    const [dishWeightError, setDishWeightError] = useState('Поле не може бути пустим');
    const [dishCalError, setDishCalError] = useState('Поле не може бути пустим');
    const [dishCategoryError, setDishCategoryError] = useState('Поле не може бути пустим');
    const [dishIngredientsError, setDishIngredientsError] = useState('Поле не може бути пустим');
    const [dishLogoError, setDishLogoError] = useState('Поле не може бути пустим');

    const notifySuccess = (message) => { toast.success(message) };

    const handleDishName = (e) => {
        setDishName(e.target.value);
        const re = /^[а-яА-ЯҐґЄєІіЇїҐґa-zA-Z\s]+$/;

        if (!re.test(String(e.target.value).toLowerCase())) {
            setDishNameError('Невірно введено Ім`я страви');
        } else {
            setDishNameError('');
        }
    };

    const handleDishPrice = (e) => {
        setDishPrice(e.target.value);
        if (e.target.value.trim() === '') {
            setDishPriceError('Поле не може бути пустим');
        } else {
            setDishPriceError('');
        }
    };

    const handleDishTime = (e) => {
        setDishTime(e.target.value);
        if (e.target.value.trim() === '') {
            setDishTimeError('Поле не може бути пустим');
        } else {
            setDishTimeError('');
        }
    };

    const handleDishAmount = (e) => {
        setDishAmount(e.target.value);
        if (e.target.value.trim() === '') {
            setDishAmountError('Поле не може бути пустим');
        } else {
            setDishAmountError('');
        }
    };

    const handleDishWeight = (e) => {
        setDishWeight(e.target.value);
        if (e.target.value.trim() === '') {
            setDishWeightError('Поле не може бути пустим');
        } else {
            setDishWeightError('');
        }
    };

    const handleDishCal = (e) => {
        setDishCal(e.target.value);
        if (e.target.value.trim() === '') {
            setDishCalError('Поле не може бути пустим');
        } else {
            setDishCalError('');
        }
    };

    const handleDishCategory = (e) => {
        setDishCategory(e.target.value);
        if (e.target.value.trim() === '') {
            setDishCategoryError('Поле не може бути пустим');
        } else {
            setDishCategoryError('');
        }
    };

    const handleDishIngredients = (e) => {
        setDishIngredients(e.target.value);
        if (e.target.value.trim() === '') {
            setDishIngredientsError('Поле не може бути пустим');
        } else {
            setDishIngredientsError('');
        }
    };

    const handleDishLogo = (e) => {
        setDishLogo(e.target.value);
        if (e.target.value.trim() === '') {
            setDishLogoError('Поле не може бути пустим');
        } else {
            setDishLogoError('');
        }
    };

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'dishname':
                setDishNameTouched(true);
                break;
            case 'dishprice':
                setDishPriceTouched(true);
                break;
            case 'dishtime':
                setDishTimeTouched(true);
                break;
            case 'dishamount':
                setDishAmountTouched(true);
                break;
            case 'dishweight':
                setDishWeightTouched(true);
                break;
            case 'dishcal':
                setDishCalTouched(true);
                break;
            case 'dishcategory':
                setDishCategoryTouched(true);
                break;
            case 'dishingredients':
                setDishIngredientsTouched(true);
                break;
            case 'dishlogo':
                setDishLogoTouched(true);
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
            <div className='relative bg-gray-50 m-16 rounded-3xl shadow-xl w-[66%]'>
                <div className="">
                    <img className="absolute right-2 top-2 z-20 w-10 cursor-pointer bg-white rounded-3xl" src={Close} alt="" onClick={() => {
                        setOpenAddDishModal(false)
                    }} />
                </div>

                <div>
                    <div className='text-3xl font-medium text-sky-950 text-center px-12 py-7'>Додати страву</div>
                    <hr className='border-t-1 border-slate-300' />
                </div>

                <div className='flex gap-3 p-7 mt-5'>
                    <div className='flex flex-col'>
                        <div className='flex gap-5 items-center'>
                            <label htmlFor="dishcategory" className="block font-medium mb-1 text-xl bg-sky-950 text-white px-4 py-3 rounded-xl">Категорія:</label>
                            <select id='dishcategory'
                                value={dishCategory}
                                onChange={(e) => {
                                    handleDishCategory(e);
                                    const selectedCategoryId = e.target.value;
                                    const selectedCategory = menuCategories.find(category => category.category === selectedCategoryId);
                                    console.log(selectedCategory);
                                    if (selectedCategory) {
                                        setDishCategoryId(selectedCategory._id);
                                    }
                                }}
                                name="dishcategory"
                                onBlur={(e) => { blurHandler(e) }}
                                className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5" required >
                                {menuCategories.map((category, i) => {
                                    return <option key={i} value={category.category}>{category.category}</option>
                                })}
                            </select>
                            {(dishCategoryTouched && dishCategoryError) && <div className="text-red-600">{dishCategoryError}</div>}
                        </div>
                        <div className='flex gap-5 items-center'>
                            <label htmlFor="dishname" className="block font-medium mb-1 text-xl bg-sky-950 text-white px-4 py-3 rounded-xl">Назва:</label>
                            <input
                                value={dishName}
                                onChange={(e) => { handleDishName(e) }}
                                type="text"
                                id="dishname"
                                name="dishname"
                                onBlur={(e) => { blurHandler(e) }}
                                className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5 " required
                            />
                            {(dishNameTouched && dishNameError) && <div className="text-red-600">{dishNameError}</div>}
                        </div>
                        <div className='flex gap-5 items-center'>
                            <label htmlFor="dishprice" className="block font-medium mb-1 text-xl bg-sky-950 text-white px-4 py-3 rounded-xl">Ціна:</label>
                            <input
                                value={dishPrice}
                                onChange={(e) => { handleDishPrice(e) }}
                                type="number"
                                name="dishprice"
                                id="dishprice"
                                onBlur={(e) => { blurHandler(e) }}
                                className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5 "
                                required />
                            {(dishPriceTouched && dishPriceError) && <div className="text-red-600">{dishPriceError}</div>}
                        </div>
                        <div className='flex gap-5 items-center'>
                            <label htmlFor="dishtime" className="block font-medium mb-1 text-xl bg-sky-950 text-white px-4 py-3 rounded-xl">Час:</label>
                            <input
                                value={dishTime}
                                onChange={(e) => { handleDishTime(e) }}
                                type="number"
                                name="dishtime"
                                id="dishtime"
                                onBlur={(e) => { blurHandler(e) }}
                                className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5 "
                                required />
                            {(dishTimeTouched && dishTimeError) && <div className="text-red-600">{dishTimeError}</div>}
                        </div>
                        <div className='flex gap-5 items-center'>
                            <label htmlFor="dishamount" className="block font-medium mb-1 text-xl bg-sky-950 text-white px-4 py-3 rounded-xl">Кількість:</label>
                            <input
                                value={dishAmount}
                                onChange={(e) => { handleDishAmount(e) }}
                                type="number"
                                name="dishamount"
                                id="dishamount"
                                onBlur={(e) => { blurHandler(e) }}
                                className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5 "
                                required />
                            {(dishAmountTouched && dishAmountError) && <div className="text-red-600">{dishAmountError}</div>}
                        </div>
                        <div className='flex gap-5 items-center'>
                            <label htmlFor="dishweight" className="block font-medium mb-1 text-xl bg-sky-950 text-white px-4 py-3 rounded-xl">Вага:</label>
                            <input
                                value={dishWeight}
                                onChange={(e) => { handleDishWeight(e) }}
                                type="number"
                                name="dishweight"
                                id="dishweight"
                                onBlur={(e) => { blurHandler(e) }}
                                className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5 "
                                required />
                            {(dishWeightTouched && dishWeightError) && <div className="text-red-600">{dishWeightError}</div>}
                        </div>
                        <div className='flex gap-5 items-center'>
                            <label htmlFor="dishcal" className="block font-medium mb-1 text-xl bg-sky-950 text-white px-4 py-3 rounded-xl">Калорійність:</label>
                            <input
                                value={dishCal}
                                onChange={(e) => { handleDishCal(e) }}
                                type="number"
                                name="dishcal"
                                id="dishcal"
                                onBlur={(e) => { blurHandler(e) }}
                                className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5 "
                                required />
                            {(dishCalTouched && dishCalError) && <div className="text-red-600">{dishCalError}</div>}
                        </div>


                        <div className='flex gap-5 items-center'>
                            <label htmlFor="dishlogo" className="block font-medium mb-1 text-xl bg-sky-950 text-white px-4 py-3 rounded-xl">Завантажити фотографію:</label>
                            <input
                                value={dishLogo}
                                onChange={(e) => { handleDishLogo(e) }}
                                type="file"
                                id="dishlogo"
                                name="dishlogo"
                                onBlur={(e) => { blurHandler(e) }}
                                className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5 " required
                            />
                            {(dishLogoTouched && dishLogoError) && <div className="text-red-600">{dishLogoError}</div>}
                        </div>
                    </div>
                    <div>
                        <div className='flex flex-col gap-5'>
                            <label htmlFor="dishingredients" className="block font-medium mb-1 text-xl bg-sky-950 text-white px-4 py-3 rounded-xl">Інгредієнти, (через кому):</label>
                            <textarea
                                value={dishIngredients}
                                onChange={(e) => { handleDishIngredients(e) }}
                                className='border bg-gray-50 border-sky-950 border-4 rounded-xl p-3 h-full'
                                name="dishingredients"
                                id="dishingredients"
                                cols="50"
                                rows="6">
                                onBlur={(e) => { blurHandler(e) }}

                            </textarea>
                            {(dishIngredientsTouched && dishIngredientsError) && <div className="text-red-600">{dishIngredientsError}</div>}
                        </div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <button
                        onClick={async (e) => {
                            e.preventDefault();
                            await addDish(restaurantId, dishCategoryId, dishName, dishPrice, dishTime, dishAmount, dishWeight, dishCal, dishCategory, dishIngredients, dishLogo);
                            dispatch(fetchMenuDishes(restaurantId));
                            dispatch(fetchMenuCategories(restaurantId));
                            setOpenAddDishModal(false);
                            notifySuccess('Страву добавлено');
                        }}
                        disabled={dishNameError || dishPriceError || dishTimeError || dishAmountError || dishWeightError || dishCategoryError}
                        className="bg-teal-600 hover:bg-teal-700 rounded-lg mt-10 px-7 py-2 text-white font-medium drop-shadow-md disabled:bg-teal-900/20 disabled:hover:bg-teal-900/20 disabled:text-gray-100 disabled:cursor-not-allowed">
                        Підтвердити
                    </button>
                </div>
            </div>
        </Modal>
    )
}