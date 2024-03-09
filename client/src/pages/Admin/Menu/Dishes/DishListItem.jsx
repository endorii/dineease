import { useState } from "react"
import { useDispatch } from "react-redux";
import Info from "../../../../assets/svg/info.svg"
import { Modal } from "../../../App/Modal";
import { DishInfoModal } from "../../../Accountant/DishInfoModal";
import { ConfirmModal } from "../../ConfirmModal";
import { deleteDish } from "../../../../actions/menu.actions";
import { fetchMenuCategories } from "../../../../store/slices/menuCategories.slice";
import { fetchMenuDishes } from "../../../../store/slices/menuDishes.slice";
import { useParams } from "react-router-dom";
import { EditMenuItemModal } from "./EditMenuItemModal";
import toast from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import { SkeletonDishes } from "../../../../ui/skeletons/SkeletonDishes";

export const DishListItem = ({ item, categoryFilter }) => {

    const [openInfo, setOpenInfo] = useState(false);

    const { restaurantId } = useParams();

    const [openConfirm, setOpenConfirm] = useState(false);

    const dispatch = useDispatch();
    const [editModal, setEditModal] = useState(false);

    const notifyConfirm = (message) => { toast.success(message) }

    return (
        <>
            <AnimatePresence initial={editModal}>
                {editModal && <EditMenuItemModal setEditModal={setEditModal} currentDish={item} />}
            </AnimatePresence>

            <AnimatePresence initial={openInfo}>
                {openInfo && < DishInfoModal setOpenInfo={setOpenInfo} item={item} />}
            </AnimatePresence>

            <AnimatePresence initial={openConfirm}>
                {openConfirm && <ConfirmModal setModalOpen={setOpenConfirm} onConfirm={async () => {
                    await deleteDish(restaurantId, item._id);
                    dispatch(fetchMenuCategories(restaurantId));
                    dispatch(fetchMenuDishes(restaurantId));
                    notifyConfirm("Страву успішно видалено");
                    setOpenConfirm(false);
                }} />}
            </AnimatePresence>

            {categoryFilter === 'all' || item.categoryName === categoryFilter ? <tr className="bg-white border-b border-gray-300 text-gray-700" >
                <th scope="row" className="px-6 py-4 font-medium text-gray-900">
                    {item.name}
                </th>
                <td className="px-2 py-1 text-center">
                    {item.categoryName}
                </td>
                <td className="px-2 py-1 text-right">
                    <img src="" alt="" />
                    <img src={Info} onClick={() => { setOpenInfo(true) }}
                        className="h-11 cursor-pointer hover:shadow-2xl hover:bg-sky-950/10 p-1 rounded-2xl transition ease-out hover:ease-in" alt="" />
                </td>
                <td className="px-2 py-1 text-center">
                    <button onClick={() => { setEditModal(true) }}
                        className="font-medium text-sky-700 rounded-md bg-gray-100 px-3 py-1 shadow hover:bg-sky-800/10 transition ease-out hover:ease-in">Редагувати</button>
                </td>
                <td className="px-2 py-1 text-left">
                    <button onClick={() => { setOpenConfirm(true) }}
                        className="font-medium text-yellow-700 rounded-md bg-gray-100 px-3 py-1 shadow hover:bg-yellow-800/10 transition ease-out hover:ease-in">Видалити</button>
                </td>
            </tr> : null}
        </>
    )
}

