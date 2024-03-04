import Search from '../../../../assets/svg/search.svg'
import { useEffect, useState } from "react";
import { DishListItem } from "./DishListItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenuCategories } from '../../../../store/slices/menuCategories.slice';
import { useParams } from "react-router-dom";
import { AddButton } from '../../../../ui/buttons/AddButton';
import { AddDishModal } from './AddDishModal';
import { fetchMenuDishes } from '../../../../store/slices/menuDishes.slice';
import { AddCategoryModal } from './AddCategoryModal';
import { AnimatePresence } from 'framer-motion';

const Dishes = () => {

    const [searchInput, setSearchInput] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [openAddDishModal, setOpenAddDishModal] = useState(false);
    const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);

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
            <AnimatePresence initial={openAddDishModal}>
                {openAddDishModal && <AddDishModal setOpenAddDishModal={setOpenAddDishModal} />}
            </AnimatePresence>
            <AnimatePresence initial={openAddCategoryModal}>
                {openAddCategoryModal && <AddCategoryModal openAddCategoryModal={openAddCategoryModal} setOpenAddCategoryModal={setOpenAddCategoryModal} />}
            </AnimatePresence>
            <div className='h-full flex flex-col'>
                <div className='mb-5'>
                    <div className="flex justify-between ">
                        <h2 className="text-3xl font-medium text-sky-950">Доступні страви для замовлень</h2>
                        <div className='flex gap-5'>
                            <AddButton customFunction={setOpenAddDishModal} buttonText={'Додати страву'} />
                            <AddButton customFunction={setOpenAddCategoryModal} buttonText={'Додати категорію'} />
                        </div>
                    </div>
                    <hr className='border-t-1 border-slate-300 my-5' />
                    <div className="flex w-full justify-between">
                        <div className='flex gap-3 items-center flex-wrap'>
                            <div className='py-2 text-gray-500'>
                                Фільтри:
                            </div>
                            <div className='px-4 py-2 bg-sky-700 text-white rounded-2xl hover:bg-sky-900 transition ease-out hover:ease-in cursor-pointer' onClick={() => { setCategoryFilter('all') }}>
                                Скинути фільтр
                            </div>
                            {menuCategories.length > 0 ? menuCategories.map((category, i) =>
                                <div className={categoryFilter === category.category ? 'px-4 py-2 bg-sky-950 text-white rounded-2xl hover:bg-sky-900 transition ease-out hover:ease-in cursor-pointer' : 'px-4 py-2 bg-sky-700 text-white rounded-2xl hover:bg-sky-900 transition ease-out hover:ease-in cursor-pointer'} onClick={() => { setCategoryFilter(category.category) }}>
                                    {category.category}
                                </div>
                            ) : null}
                        </div>
                        <div className='flex items-center'>
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
                        <div className='px-5 py-3 text-xl bg-sky-950 text-sky-100'>
                            Список пропозицій
                        </div>
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
                                        dish.name.toLowerCase().includes(searchInput.toLowerCase()) ? <DishListItem item={dish} key={i} categoryFilter={categoryFilter}
                                            setCategoryFilter={setCategoryFilter} /> : null
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