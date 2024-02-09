import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Close from '../../../assets/svg/close.svg';
import { fetchMenuDishes } from "../../../store/slices/menuDishes.slice";
import { fetchMenuCategories } from "../../../store/slices/menuCategories.slice";
import { useParams } from "react-router-dom";
import { editDish } from "../../../actions/menu.actions";
import { Modal } from "../../../components/Modal";
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
    const [dishCategory, setdishCategory] = useState(currentDish.toCategory);
    const [dishIngredients, setDishIngredients] = useState(currentDish.ingredients);
    const [dishLogo, setDishLogo] = useState('');

    const notifyEdit = (message) => { toast.success(message) };

    useEffect(() => {
        dispatch(fetchMenuCategories(restaurantId));
        dispatch(fetchMenuDishes(restaurantId));
    }, [])


    return (
        <Modal>
            <div className='flex justify-center'>
                <div className=""><img className="absolute top-16 right-20 z-20 w-12 cursor-pointer bg-white rounded-3xl" src={Close} alt="" onClick={() => {
                    setEditModal(false)
                }} />
                </div>
                <div className='absolute flex bg-gray-none w-[95%] z-10 rounded-md mt-10'>
                    <div className="flex justify-around w-full rounded-xl h-full gap-3 p-10">
                        <div className='w-full flex flex-col p-10 bg-white rounded-xl'>
                            <div className='text-3xl font-medium text-center'>Змінити страву</div>
                            <form className='flex flex-wrap justify-around m-10 gap-3' action="">
                                <div className='flex flex-col w-1/2'>
                                    <div>
                                        <label htmlFor="dish_name" className="block text-sm font-medium text-gray-900 mb-1 ">Назва продукту</label>
                                        <input
                                            value={dishName}
                                            onChange={(e) => { setDishName(e.target.value) }}
                                            type="text"
                                            id="first_name"
                                            name="name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required
                                        />
                                        {/* {(nameTouched && nameError) && <div className="text-red-600">{nameError}</div>} */}
                                    </div>
                                    <div>
                                        <label htmlFor="value" className="block text-sm font-medium text-gray-900 mb-1">Ціна</label>
                                        <input
                                            value={dishPrice}
                                            onChange={(e) => { setDishPrice(e.target.value) }}
                                            type="number"
                                            name="value"
                                            id="value"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                            required />
                                    </div>
                                    <div>
                                        <label htmlFor="time" className="block text-sm font-medium text-gray-900 mb-1">Час приготування</label>
                                        <input
                                            value={dishTime}
                                            onChange={(e) => { setDishTime(e.target.value) }}
                                            type="number"
                                            name="time"
                                            id="time"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                            required />
                                    </div>
                                    <div>
                                        <label htmlFor="amount" className="block text-sm font-medium text-gray-900 mb-1">Кількість</label>
                                        <input
                                            value={dishAmount}
                                            onChange={(e) => { setDishAmount(e.target.value) }}
                                            type="number"
                                            name="amount"
                                            id="amount"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                            required />
                                    </div>
                                    <div>
                                        <label htmlFor="weight" className="block text-sm font-medium text-gray-900 mb-1">Вага</label>
                                        <input
                                            value={dishWeight}
                                            onChange={(e) => { setDishWeight(e.target.value) }}
                                            type="text"
                                            name="weight"
                                            id="weight"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                            required />
                                    </div>

                                    <div>
                                        <label htmlFor="cal" className="block text-sm font-medium text-gray-900 mb-1">Калорійність</label>
                                        <input
                                            value={dishCal}
                                            onChange={(e) => { setDishCal(e.target.value) }}
                                            type="text"
                                            name="cal"
                                            id="cal"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                            required />
                                    </div>
                                    <div>
                                        <label htmlFor="category" className="block text-sm font-medium text-gray-900 mb-1 ">Категорія</label>
                                        <select id='category'
                                            value={dishCategory}
                                            onChange={(e) => setdishCategory(e.target.value)}
                                            name="category"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required >
                                            {menuCategories.map((category, i) => {
                                                return <option key={i} value={category.category}>{category.category}</option>
                                            })}
                                        </select>
                                        {/* {(positionTouched && positionError) && <div className="text-red-600">{positionError}</div>} */}
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <div>
                                        <label htmlFor="file" className="block text-sm font-medium text-gray-900 mb-1 ">Інгредієнти, (через кому з великої букви)</label>
                                        <textarea
                                            value={dishIngredients}
                                            onChange={(e) => { setDishIngredients([e.target.value]) }}
                                            className='border p-3'
                                            name=""
                                            id=""
                                            cols="50"
                                            rows="11">

                                        </textarea>
                                        {/* {(nameTouched && nameError) && <div className="text-red-600">{nameError}</div>} */}
                                    </div>
                                    <div>
                                        <label htmlFor="file" className="block text-sm font-medium text-gray-900 mb-1 ">Завантажити фотографію</label>
                                        <input
                                            value={dishLogo}
                                            onChange={(e) => { setDishLogo(e.target.value) }}
                                            type="file"
                                            id="file"
                                            name="file"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required
                                        />
                                        {/* {(nameTouched && nameError) && <div className="text-red-600">{nameError}</div>} */}
                                    </div>
                                </div>
                                <button
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        await editDish(restaurantId, currentDish._id, dishName, dishPrice, dishTime, dishAmount, dishWeight, dishCategory, dishIngredients, dishLogo);
                                        dispatch(fetchMenuDishes(restaurantId));
                                        dispatch(fetchMenuCategories(restaurantId));
                                        setEditModal(false);
                                        notifyEdit('Інформацію про страву успішно оновлено!')
                                    }}
                                    className="flex items-center bg-green-500 hover:bg-green-600 rounded-lg mt-10 mx-[30%] px-7 py-2 text-white font-medium drop-shadow-md disabled:bg-green-900/20 disabled:hover:bg-green-900/20 disabled:text-gray-100 disabled:cursor-not-allowed"
                                >Підтвердити зміну
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}