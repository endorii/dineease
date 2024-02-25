import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Close from '../../../../assets/svg/close.svg';
import { fetchMenuDishes } from "../../../../store/slices/menuDishes.slice";
import { fetchMenuCategories } from "../../../../store/slices/menuCategories.slice";
import { useParams } from "react-router-dom";
import { editDish } from "../../../../actions/menu.actions";
import { Modal } from "../../../App/Modal";
import toast from "react-hot-toast";

export const EditMenuItemModal = ({ setEditModal, currentDish }) => {

    const dispatch = useDispatch();

    const { menuCategories } = useSelector(state => state.menuCategories);

    const { restaurantId } = useParams();

    const [dishName, setDishName] = useState(currentDish.name);
    const [dishPrice, setDishPrice] = useState(currentDish.price);
    const [dishTime, setDishTime] = useState(currentDish.time);
    const [dishAmount, setDishAmount] = useState(currentDish.amount);
    const [dishWeight, setDishWeight] = useState(currentDish.weight);
    const [dishCal, setDishCal] = useState(currentDish.calories);
    const [dishCategory, setDishCategory] = useState(currentDish.categoryName);
    const [dishCategoryId, setDishCategoryId] = useState(currentDish.category);
    const [dishIngredients, setDishIngredients] = useState(currentDish.ingredients);
    const [dishLogo, setDishLogo] = useState(currentDish.logoPath);

    const handleDishName = (e) => {
        setDishName(e.target.value);
    };

    const handleDishPrice = (e) => {
        setDishPrice(e.target.value);
    };

    const handleDishTime = (e) => {
        setDishTime(e.target.value);
    };

    const handleDishAmount = (e) => {
        setDishAmount(e.target.value);
    };

    const handleDishWeight = (e) => {
        setDishWeight(e.target.value);
    };

    const handleDishCal = (e) => {
        setDishCal(e.target.value);
    };

    const handleDishCategory = (e) => {
        setDishCategory(e.target.value);
    };

    const handleDishIngredients = (e) => {
        setDishIngredients(e.target.value);
    };

    const handleDishLogo = (e) => {
        setDishLogo(e.target.value);
    };
    const notifyEdit = (message) => { toast.success(message) };

    useEffect(() => {
        dispatch(fetchMenuCategories(restaurantId));
        dispatch(fetchMenuDishes(restaurantId));
    }, [])


    return (
        <Modal>
            <div className='relative bg-gray-50 m-16 rounded-lg shadow-xl w-[66%]'>
                <div className="">
                    <img className="absolute right-2 top-2 z-20 w-10 cursor-pointer" src={Close} alt="" onClick={() => {
                        setEditModal(false)
                    }} />
                </div>

                <div>
                    <div className='text-3xl font-medium text-sky-950 text-center px-12 py-7'>Змінити інформацію про страву</div>
                    <hr className='border-t-1 border-slate-300' />
                </div>

                <div className='flex flex-col gap-3 px-10 py-7 mt-5'>
                    <div className='flex gap-2'>
                        <div className='flex flex-col gap-8'>
                            <div className='flex gap-5 items-center relative'>
                                <label htmlFor="dishcategory" className="block font-medium mb-1 text-xl bg-sky-900 text-white px-4 py-3 rounded-xl">Категорія:</label>
                                <div className='flex flex-col justify-between'>
                                    <select id='dishcategory'
                                        value={dishCategory}
                                        onChange={(e) => {
                                            handleDishCategory(e);
                                            const selectedCategoryId = e.target.value;
                                            const selectedCategory = menuCategories.find(category => category.category === selectedCategoryId);
                                            console.log(selectedCategory);
                                        }}
                                        name="dishcategory"

                                        className={"bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5"} required >
                                        {menuCategories.map((category, i) => {
                                            return <option key={i} value={category.category}>{category.category}</option>
                                        })}
                                    </select>
                                </div>

                            </div>
                            <div className='flex gap-5 items-center justify-between relative'>
                                <label htmlFor="dishname" className="block font-medium mb-1 text-xl bg-sky-900 text-white px-4 py-3 rounded-xl">Назва:</label>
                                <input
                                    value={dishName}
                                    onChange={(e) => { handleDishName(e) }}
                                    type="text"
                                    id="dishname"
                                    name="dishname"

                                    className={"bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5"} required
                                />

                            </div>
                            <div className='flex gap-5 items-center justify-between relative'>
                                <label htmlFor="dishprice" className="block font-medium mb-1 text-xl bg-sky-900 text-white px-4 py-3 rounded-xl">Ціна:</label>
                                <input
                                    value={dishPrice}
                                    onChange={(e) => { handleDishPrice(e) }}
                                    type="number"
                                    name="dishprice"
                                    id="dishprice"

                                    className={"bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5"}
                                    required />

                            </div>
                            <div className='flex gap-5 items-center justify-between relative'>
                                <label htmlFor="dishtime" className="block font-medium mb-1 text-xl bg-sky-900 text-white px-4 py-3 rounded-xl">Час:</label>
                                <input
                                    value={dishTime}
                                    onChange={(e) => { handleDishTime(e) }}
                                    type="number"
                                    name="dishtime"
                                    id="dishtime"

                                    className={"bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5"}
                                    required />

                            </div>
                        </div>
                        <div className='flex flex-col gap-8'>
                            <div className='flex gap-5 items-center justify-between relative'>
                                <label htmlFor="dishamount" className="block font-medium mb-1 text-xl bg-sky-900 text-white px-4 py-3 rounded-xl">Кількість:</label>
                                <input
                                    value={dishAmount}
                                    onChange={(e) => { handleDishAmount(e) }}
                                    type="number"
                                    name="dishamount"
                                    id="dishamount"

                                    className={"bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5"}
                                    required />

                            </div>
                            <div className='flex gap-5 items-center justify-between relative'>
                                <label htmlFor="dishweight" className="block font-medium mb-1 text-xl bg-sky-900 text-white px-4 py-3 rounded-xl">Вага:</label>
                                <input
                                    value={dishWeight}
                                    onChange={(e) => { handleDishWeight(e) }}
                                    type="text"
                                    name="dishweight"
                                    id="dishweight"

                                    className={"bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5"}
                                    required />

                            </div>
                            <div className='flex gap-5 items-center justify-between relative'>
                                <label htmlFor="dishcal" className="block font-medium mb-1 text-xl bg-sky-900 text-white px-4 py-3 rounded-xl">Калорійність:</label>
                                <input
                                    value={dishCal}
                                    onChange={(e) => { handleDishCal(e) }}
                                    type="number"
                                    name="dishcal"
                                    id="dishcal"

                                    className={"bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5"}
                                    required />

                            </div>
                            <div className='flex gap-5 items-center justify-between relative'>
                                <label htmlFor="dishlogo" className="block font-medium mb-1 text-xl bg-sky-900 text-white px-4 py-3 rounded-xl">Фотографія:</label>
                                <input
                                    value={dishLogo}
                                    onChange={(e) => { handleDishLogo(e) }}
                                    type="file"
                                    id="dishlogo"
                                    name="dishlogo"

                                    className={"bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5"} required
                                />

                            </div>
                        </div>
                    </div>
                    <div className='flex mt-5'>
                        <div className='flex flex-col gap-5 w-[75%] relative'>
                            <label htmlFor="dishingredients" className="block font-medium mb-1 text-xl bg-sky-900 text-white px-4 py-3 rounded-xl">Інгредієнти, (через кому):</label>
                            <textarea
                                value={dishIngredients}
                                onChange={(e) => { handleDishIngredients(e) }}
                                className='border bg-gray-50 border-sky-950 border-4 rounded-xl p-3 h-full'
                                name="dishingredients"
                                id="dishingredients"
                                cols="50"
                                rows="6">

                            </textarea>

                        </div>
                        <div className='flex justify-center w-[25%]'>
                            <button
                            disabled={!dishName || !dishPrice || !dishTime || !dishAmount || !dishWeight || !dishCal || !dishCategory}
                                onClick={async (e) => {
                                    e.preventDefault();
                                    await editDish(restaurantId, dishCategoryId, currentDish._id, dishName, dishPrice, dishTime, dishAmount, dishWeight, dishCal, dishCategory, dishIngredients, dishLogo);
                                    dispatch(fetchMenuDishes(restaurantId));
                                    dispatch(fetchMenuCategories(restaurantId));
                                    setEditModal(false);
                                    notifyEdit('Інформацію про страву успішно оновлено!')
                                }}
                                className="flex items-center bg-teal-600 hover:bg-teal-700 rounded-lg mt-10 mx-[30%] px-7 py-2 text-white font-medium drop-shadow-md disabled:bg-green-900/20 disabled:hover:bg-green-900/20 disabled:text-gray-100 disabled:cursor-not-allowed"
                            >Підтвердити зміну
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </Modal>
    )
}
