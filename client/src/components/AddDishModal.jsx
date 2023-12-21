import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Close from '../assets/svg/close.svg'
// import { addMenuCategory } from '../view/pages/Menu/Dishes/menuActions';
// import { fetchMenu } from '../store/slices/menuSlice';
// import { addMenuItem } from '../view/pages/Menu/Dishes/menuItemActions';
// import { fetchMenuItems } from '../store/slices/menuItemsSlice';

export const AddDishModal = ({ setOpenAddDishModal }) => {

    const dispatch = useDispatch();

    const { menu } = useSelector(state => state.menu);

    const [dishName, setDishName] = useState('');
    const [dishPrice, setDishPrice] = useState();
    const [dishTime, setDishTime] = useState();
    const [dishAmount, setDishAmount] = useState();
    const [dishWeight, setDishWeight] = useState();
    const [dishCategory, setDishCategory] = useState('');
    const [dishIngredients, setDishIngredients] = useState(['']);
    const [dishLogo, setDishLogo] = useState('');

    const [categoryName, setCategoryName] = useState('');
    const [categoryLogo, setCategoryLogo] = useState('');

    const [dishNameTouched, setDishNameTouched] = useState(false);
    const [dishPriceTouched, setDishPriceTouched] = useState(false);
    const [dishTimeTouched, setDishTimeTouched] = useState(false);
    const [dishWeightTouched, setDishWeightTouched] = useState(false);
    const [dishCategoryTouched, setDishCategoryTouched] = useState(false);
    const [dishIngredientsTouched, setDishIngredientsTouched] = useState(false);
    const [dishLogoTouched, setDishLogoTouched] = useState(false);
    const [dishAmountTouched, setDishAmountTouched] = useState(false);

    const [categoryNameTouched, setCategoryNameTouched] = useState(false);
    const [categoryLogoTouched, setCategoryLogoTouched] = useState(false);

    const [dishNameError, setDishNameError] = useState('Поле не може бути пустим');
    const [dishPriceError, setDishPriceError] = useState('Поле не може бути пустим');
    const [dishTimeError, setDishTimeError] = useState('Поле не може бути пустим');
    const [dishAmountError, setDishAmountError] = useState('Поле не може бути пустим');
    const [dishWeightError, setDishWeightError] = useState('Поле не може бути пустим');
    const [dishCategoryError, setDishCategoryError] = useState('Поле не може бути пустим');
    const [dishIngredientsError, setDishIngredientsError] = useState('Поле не може бути пустим');
    const [dishLogoError, setDishLogoError] = useState('Поле не може бути пустим');

    const [categoryNameError, setCategoryNameError] = useState('Поле не можу бути пустим');
    const [categoryLogoError, setCategoryLogoError] = useState('Поле не можу бути пустим');



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
        // dispatch(fetchMenuItems());
        // dispatch(fetchMenu());
    }, [])

    return (
        <div className='flex justify-center'>
            <div className=""><img className="absolute top-16 right-20 z-20 w-12 cursor-pointer bg-white rounded-3xl" src={Close} alt="" onClick={() => {
                setOpenAddDishModal(false)
            }} />
            </div>
            <div className='absolute flex w-auto z-10 rounded-md mt-10'>
                <div className="flex justify-around w-full rounded-xl gap-3 p-10">
                    <div className='flex flex-col p-10 bg-white rounded-xl'>
                        <div className='text-3xl font-medium text-center text-sky-900'>Додати страву</div>
                        <form className='flex flex-col justify-around m-10 gap-3 text-sky-900' action="">
                            <div className='flex gap-3'>
                                <div className=''>
                                    <label htmlFor="dishname" className="block font-medium mb-1 ">Назва продукту</label>
                                    <input
                                        value={dishName}
                                        onChange={(e) => { handleDishName(e) }}
                                        type="text"
                                        id="dishname"
                                        name="dishname"
                                        onBlur={(e) => { blurHandler(e) }}
                                        className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required
                                    />
                                    {(dishNameTouched && dishNameError) && <div className="text-red-600">{dishNameError}</div>}
                                </div>
                                <div>
                                    <label htmlFor="dishprice" className="block font-medium mb-1">Ціна</label>
                                    <input
                                        value={dishPrice}
                                        onChange={(e) => { handleDishPrice(e) }}
                                        type="number"
                                        name="dishprice"
                                        id="dishprice"
                                        onBlur={(e) => { blurHandler(e) }}
                                        className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                        required />
                                    {(dishPriceTouched && dishPriceError) && <div className="text-red-600">{dishPriceError}</div>}
                                </div>
                                <div>
                                    <label htmlFor="dishtime" className="block font-medium mb-1">Час приготування</label>
                                    <input
                                        value={dishTime}
                                        onChange={(e) => { handleDishTime(e) }}
                                        type="number"
                                        name="dishtime"
                                        id="dishtime"
                                        onBlur={(e) => { blurHandler(e) }}
                                        className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                        required />
                                    {(dishTimeTouched && dishTimeError) && <div className="text-red-600">{dishTimeError}</div>}
                                </div>
                                <div>
                                    <label htmlFor="dishamount" className="block font-medium mb-1">Кількість</label>
                                    <input
                                        value={dishAmount}
                                        onChange={(e) => { handleDishAmount(e) }}
                                        type="number"
                                        name="dishamount"
                                        id="dishamount"
                                        onBlur={(e) => { blurHandler(e) }}
                                        className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                        required />
                                    {(dishAmountTouched && dishAmountError) && <div className="text-red-600">{dishAmountError}</div>}
                                </div>
                                <div>
                                    <label htmlFor="dishweight" className="block font-medium mb-1">Вага</label>
                                    <input
                                        value={dishWeight}
                                        onChange={(e) => { handleDishWeight(e) }}
                                        type="number"
                                        name="dishweight"
                                        id="dishweight"
                                        onBlur={(e) => { blurHandler(e) }}
                                        className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                        required />
                                    {(dishWeightTouched && dishWeightError) && <div className="text-red-600">{dishWeightError}</div>}
                                </div>
                                <div>
                                    <label htmlFor="dishcategory" className="block font-medium mb-1 ">Категорія</label>
                                    <select id='dishcategory'
                                        value={dishCategory}
                                        onChange={(e) => handleDishCategory(e)}
                                        name="dishcategory"
                                        onBlur={(e) => { blurHandler(e) }}
                                        className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required >
                                        {menu.map((category, i) => {
                                            return <option key={i} value={category.category}>{category.category}</option>
                                        })}
                                    </select>
                                    {(dishCategoryTouched && dishCategoryError) && <div className="text-red-600">{dishCategoryError}</div>}
                                </div>
                            </div>
                            <div className='flex gap-5'>
                                <div>
                                    <label htmlFor="dishingredients" className="block font-medium mb-1 ">Інгредієнти, (через кому з великої букви)</label>
                                    <textarea
                                        value={dishIngredients}
                                        onChange={(e) => { handleDishIngredients(e) }}
                                        className='border bg-gray-50 p-3 shadow-inner '
                                        name="dishingredients"
                                        id="dishingredients"
                                        cols="50"
                                        rows="11">
                                        onBlur={(e) => { blurHandler(e) }}

                                    </textarea>
                                    {(dishIngredientsTouched && dishIngredientsError) && <div className="text-red-600">{dishIngredientsError}</div>}
                                </div>
                                <div>
                                    <label htmlFor="dishlogo" className="block font-medium mb-1 ">Завантажити фотографію</label>
                                    <input
                                        value={dishLogo}
                                        onChange={(e) => { handleDishLogo(e) }}
                                        type="file"
                                        id="dishlogo"
                                        name="dishlogo"
                                        onBlur={(e) => { blurHandler(e) }}
                                        className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required
                                    />
                                    {(dishLogoTouched && dishLogoError) && <div className="text-red-600">{dishLogoError}</div>}
                                </div>
                            </div>
                            <button
                                onClick={async (e) => {
                                    e.preventDefault();
                                    // await addMenuItem(dishName, dishPrice, dishTime, dishAmount, dishWeight, dishCategory, dishIngredients, dishLogo); dispatch(fetchMenuItems()); dispatch(fetchMenu()); setOpenAddDishModal(false) 
                                }}
                                disabled={dishNameError || dishPriceError || dishTimeError || dishAmountError || dishWeightError || dishCategoryError}
                                className="bg-teal-600 hover:bg-teal-700 rounded-lg mb-7 mx-[30%] mt-10 px-7 py-2 text-white font-medium drop-shadow-md disabled:bg-teal-900/20 disabled:hover:bg-teal-900/20 disabled:text-gray-100 disabled:cursor-not-allowed">
                                Підтвердити
                            </button>
                        </form>
                    </div>
                    <div className='w-[35%] p-10 flex flex-col bg-white rounded-xl'>
                        <div className='text-3xl font-medium text-center text-sky-900'>Додати категорію страв</div>
                        <form className='flex flex-col justify-center m-10 gap-4 text-sky-900' action="POST">
                            <div>
                                <label htmlFor="categoryname" className="block font-medium mb-1 ">Назва категорії</label>
                                <input
                                    value={categoryName}
                                    onChange={(e) => { setCategoryName(e.target.value) }}
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
                                    onChange={(e) => { setCategoryLogo(e.target.value) }}
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
                                    // await addMenuCategory(categoryLogo, categoryName); dispatch(fetchMenuItems()); dispatch(fetchMenu());
                                    setOpenAddDishModal(false)
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
    )
}