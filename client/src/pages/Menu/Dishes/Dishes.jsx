// import { MenuItems } from "../../../../functions";
import Search from '../../../assets/svg/search.svg'
import { useEffect, useState } from "react";
import { DishListItem } from "./DishListItem";
// import { Modal } from '../../../../components/Modal'
// import { AddDishModal } from "../../../../components/AddDishModal";
// import { fetchMenu } from "../../../../store/slices/menuSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenuCategories } from "../../../store/slices/menuCategories.slice";
import { useParams } from "react-router-dom";
import Plus from '../../../assets/svg/plus.svg'
import { AddButton } from '../../../ui/buttons/AddButton';
import { Modal } from '../../../components/Modal';
import { AddDishModal } from '../../../components/AddDishModal';
import { fetchMenuDishes } from '../../../store/slices/menuDishes.slice';

const Dishes = () => {

    const [searchInput, setSearchInput] = useState('');
    const [openAddDishModal, setOpenAddDishModal] = useState(false);

    const { restaurantId } = useParams();

    const dispatch = useDispatch();

    const { menuCategories } = useSelector(state => state.menuCategories);
    const { menuDishes } = useSelector(state => state.menuDishes);

    useEffect(() => {
        dispatch(fetchMenuCategories(restaurantId));
        dispatch(fetchMenuDishes(restaurantId));
    }, [])

    return (

        <div className="flex flex-col h-full">
            {openAddDishModal ?
                <Modal>
                    <AddDishModal setOpenAddDishModal={setOpenAddDishModal} />
                </Modal>
                : null}
            <div className='h-full flex flex-col'>
                <div className='mb-5'>
                    <div className="flex justify-between ">
                        <h2 className="text-3xl font-medium text-sky-950">Доступні страви для замовлень</h2>
                        <AddButton customFunction={setOpenAddDishModal} />
                    </div>
                    <hr className='border-t-1 border-slate-300 my-10' />
                    <div className="flex w-full justify-between px-3 pb-4">
                        <div className='flex gap-3 items-center flex-wrap'>
                            <div className='px-4 py-2 bg-sky-700 text-white rounded-2xl hover:bg-sky-900 transition ease-out hover:ease-in cursor-pointer'>
                                Скинути фільтр
                            </div>
                            {menuCategories.length > 0 ? menuCategories.map((category, i) =>
                                <div className='px-4 py-2 bg-sky-700 text-white rounded-2xl hover:bg-sky-900 transition ease-out hover:ease-in cursor-pointer'>
                                    {category.category}
                                </div>
                            ) : null}
                        </div>
                        <div className='flex'>
                            <img
                                src={Search}
                                alt="" className="w-6 mr-2" />
                            <input className="p-3 rounded-lg border-2 border-gray-200" type="text" placeholder="Введать назву страви..." value={searchInput} onChange={(e) => {
                                setSearchInput(e.target.value);
                            }} />
                        </div>
                    </div>
                </div>
                <div className="overflow-y-scroll shadow-md gap-5 rounded-md">
                    <div className='w-full text-blue-100 '>
                        <table className="w-full text-left">
                            <thead className="text-xs text-gray-700 uppercase bg-sky-900/20 ">
                                <tr>
                                    <th scope="col" className="w-auto px-6 py-3">
                                        Назва
                                    </th>
                                    <th scope="col" className="w-[15%] px-1 py-1">
                                        Категорія
                                    </th>
                                    <th scope="col" className="w-[5%] px-1 py-1">

                                    </th>
                                    <th scope="col" className="w-[5%] px-1 py-1">

                                    </th>
                                    <th scope="col" className="w-[5%] px-1 py-1">

                                    </th>
                                    <th scope="col" className="w-[5%] px-1 py-1">

                                    </th>
                                </tr>
                            </thead>
                            <tbody >
                                {
                                    menuDishes.length > 0 ? menuDishes.map((dish, i) => (
                                        dish.name.toLowerCase().includes(searchInput.toLowerCase()) ? <DishListItem item={dish} key={i} /> : null
                                    )) : <h2 className='text-4xl text-sky-900 px-6 pt-10 font-light text'>Страв не знайдено</h2>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dishes;