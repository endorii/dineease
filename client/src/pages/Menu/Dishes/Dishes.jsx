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

const Dishes = () => {

    const [searchInput, setSearchInput] = useState('');
    const [openAddDishModal, setOpenAddDishModal] = useState(false);

    const {restaurant} = useParams();

    const dispatch = useDispatch();

    const { menu } = useSelector(state => state.menu);

    useEffect(() => {
        dispatch(fetchMenu(restaurant));
        // dispatch(fetchMenu());
    }, [])

    return (
        <>
            {/* {openAddDishModal ?
                <Modal>
                    <AddDishModal setOpenAddDishModal={setOpenAddDishModal} />
                </Modal>
                : null} */}
            <div className='flex flex-col h-full' >
                <div className="flex justify-between ">
                    <h2 className="text-3xl font-medium">Доступні страви для замовлень</h2>
                    <button className="flex items-center bg-green-500 hover:bg-green-600 rounded-lg px-7 py-2 text-white font-medium drop-shadow-md"
                        onClick={() => setOpenAddDishModal(true)}
                    >Додати
                        {/* <img className='w-7 inline pl-2' src={Plus} alt="" /> */}
                    </button>
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
                <div className="relative shadow-md sm:rounded-lg overflow-y-auto">

                    
                    {menu.length > 0 ? menu.map(menuCategory => 
                    
                    <div className='bg-sky-950 text-white'>
                        <div className='p-5 text-xl capitalize'>
                            {menuCategory.category}
                        </div>
                        <table className="w-full text-sm text-left text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-300">
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
                                    <h2 className='text-4xl p-6 text-center font-light bg-white'>Страв не знайдено</h2>
                            }
                        </tbody>
                    </table>
                    </div>
                    
                    ) : null}




                    {/* <table className="w-full text-sm text-left text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Назва
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Категорія
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ціна
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Час приготування
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Кількість
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
                                menuItems.length > 0 ?
                                    menuItems.map((item, i) => (
                                        item.name.toLowerCase().includes(searchInput.toLowerCase()) ? <DishListItem item={item} key={i} /> : null
                                    ))
                                    :
                                    <h2 className='text-4xl p-6 text-center font-light bg-white'>Страв не знайдено</h2>
                            }
                        </tbody>
                    </table> */}
                </div>
            </div>
        </>
    )
}

export default Dishes;