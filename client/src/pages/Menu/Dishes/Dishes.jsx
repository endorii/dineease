// import { MenuItems } from "../../../../functions";
import Search from '../../../assets/svg/search.svg'
import { useEffect, useState } from "react";
import { DishListItem } from "./DishListItem";
// import { Modal } from '../../../../components/Modal'
// import { AddDishModal } from "../../../../components/AddDishModal";
// import { fetchMenu } from "../../../../store/slices/menuSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu } from "../../../store/slices/menu.slice";
import { useParams } from "react-router-dom";
// import { fetchMenuItems } from "../../../../store/slices/menuItemsSlice";
import Plus from '../../../assets/svg/plus.svg'
import { AddButton } from '../../../ui/buttons/AddButton';

const Dishes = () => {

    const [searchInput, setSearchInput] = useState('');
    const [openAddDishModal, setOpenAddDishModal] = useState(false);

    const { restaurant } = useParams();

    const dispatch = useDispatch();

    const { menu } = useSelector(state => state.menu);

    useEffect(() => {
        dispatch(fetchMenu(restaurant));
        // dispatch(fetchMenu());
    }, [])

    return (
        <div className="h-screen">
            {/* {openAddDishModal ?
                <Modal>
                    <AddDishModal setOpenAddDishModal={setOpenAddDishModal} />
                </Modal>
                : null} */}
            <div className='flex flex-col'>
                <div>
                    <div className="flex justify-between ">
                        <h2 className="text-3xl font-medium text-sky-950">Доступні страви для замовлень</h2>
                        <AddButton customFunction={setOpenAddDishModal} />
                    </div>
                    <hr className='border-t-1 border-slate-300 my-10' />
                    <div className="flex w-full justify-end px-3 pb-4">
                        <img
                            src={Search}
                            alt="" className="w-6 mr-2" />
                        <input className="p-3 rounded-lg border-2 border-gray-200" type="text" placeholder="Введать назву страви..." value={searchInput} onChange={(e) => {
                            setSearchInput(e.target.value);
                        }} />
                    </div>
                </div>
                <div className=" h-[650px] flex flex-col shadow-md overflow-y-scroll gap-5">
                    {menu.length > 0 ? menu.map(menuCategory =>
                        <div className='w-full text-blue-100'>
                            <div className='px-5 py-3 text-xl capitalize bg-sky-950'>
                                {menuCategory.category}
                            </div>
                            <table className="w-full text-left">
                                <thead className="text-xs text-gray-700 uppercase bg-teal-800/30">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Назва
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Ціна
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Час приготування
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Вага
                                        </th>
                                        <th scope="col" className="px-1 py-1">

                                        </th>
                                        <th scope="col" className="px-1 py-1">

                                        </th>
                                        <th scope="col" className="px-1 py-1">

                                        </th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        menuCategory.items.length > 0 ?
                                            menuCategory.items.map((item, i) => (
                                                item.name.toLowerCase().includes(searchInput.toLowerCase()) ? <DishListItem item={item} key={i} /> : null
                                            ))
                                            :
                                            <h2 className='text-4xl text-sky-900 px-6 pt-10 font-light text'>Страв не знайдено</h2>
                                    }
                                </tbody>
                            </table>
                        </div>
                    ) : <h2 className='text-4xl p-6 text-center font-light bg-white'>Страв не знайдено</h2>}
                </div>
            </div>
        </div>
    )
}

export default Dishes;