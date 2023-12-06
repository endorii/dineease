import { useState } from "react"
// import { deleteMenuItem } from "./menuItemActions";
// import { fetchMenuItems } from "../../../../store/slices/menuItemsSlice";
import { useDispatch } from "react-redux";
// import { Modal } from "../../../../components/Modal";
// import { EditMenuItemModal } from "./EditMenuItemModal";

export const DishListItem = ({ item }) => {

    const [openInfo, setOpenInfo] = useState(false);

    const dispatch = useDispatch();
    const [editModal, setEditModal] = useState(false);

    return (
        <>
            {/* {editModal ? <Modal>
                <EditMenuItemModal setEditModal={setEditModal} currentDish={item}/>
            </Modal> : null} */}


            <tr className="bg-white border-b border-gray-300 text-gray-700" >
                <th scope="row" className="px-6 py-4 font-medium text-gray-900">
                    {item.name}
                </th>
                <td className="px-6 py-4">
                    {item.price}
                </td>
                <td className="px-6 py-4">
                    {item.time ? item.time : "немає інформації"}
                </td>
                <td className="px-6 py-4">
                    {item.weight}
                </td>
                <td className="px-2 py-1 text-right">
                    <button onClick={() => { setOpenInfo(!openInfo) }}
                        className="font-medium text-sky-700 rounded-md bg-gray-100 px-3 py-1 shadow hover:bg-sky-800/10">Інформація</button>
                </td>
                <td className="px-2 py-1 text-center">
                    <button onClick={() => { setEditModal(true) }}
                        className="font-medium text-sky-700 rounded-md bg-gray-100 px-3 py-1 shadow hover:bg-sky-800/10">Редагувати</button>
                </td>
                <td className="px-2 py-1 text-left">
                    <button onClick={() => {
                        // deleteMenuItem(item._id); 
                        // dispatch(fetchMenuItems())
                    }}
                        className="font-medium text-yellow-700 rounded-md bg-gray-100 px-3 py-1 shadow hover:bg-yellow-800/10">Видалити</button>
                </td>

            </tr>
            <div>
                {openInfo ?
                    <div className="flex justify-center w-full h-auto m-5 text-sky-900 gap-5">
                        <div className="bg-white shadow-inner border p-[5%]">
                            <div className="font-medium text-lg mb-2 bg-teal-600/10 px-10 py-3 rounded-md">Інгредієнти для приготування:</div>
                            <div className="flex flex-col justify-start w-full p-2 text-lg gap-1">
                                {item.ingredients ? item.ingredients.map((ingredient, i) => (
                                    <div key={i}>- {ingredient};</div>
                                )) :
                                    <div className="flex flex-col justify-center items-center w-full h-auto bg-white m-5 p-[5%]">
                                        <div className="font-medium text-2xl mb-2">Вибачте, інгредієнти не доступні</div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="bg-white shadow-inner border p-[5%]">
                            <div className="font-medium text-lg mb-2 bg-teal-600/10 px-10 py-3 rounded-md">Колорійність:</div>
                            <div className="flex flex-col justify-start w-full p-2 text-lg gap-1">
                                {item.calories ? <div>{item.calories}</div> :
                                    <div className="flex flex-col justify-center items-center w-full h-auto bg-white m-5 p-[5%]">
                                        <div className="font-medium text-2xl mb-2">Калорійність не вказано</div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    : null}
            </div>
        </>
    )
}

