import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNeeds } from "../../../../store/slices/needs.slice";
import { useParams } from "react-router-dom";
import { formatDateString } from "../../../../functions";
import TrashDone from "../../../../assets/svg/trashDone.svg"
import { ConfirmModal } from "../../ConfirmModal";
import { closeNeedsMessage } from "../../../../actions/needs.actions";

export const Needs = () => {

    const dispatch = useDispatch();
    const { restaurantId } = useParams();
    const { needs } = useSelector(state => state.needs);

    const [priorityFilter, setPriorityFilter] = useState('all');
    const [confirm, setConfirm] = useState(false);
    const [currentNeed, setCurrentNeed] = useState(false);

    const priorityList = [...new Set(needs.map(need => need.priority))];

    useEffect(() => {
        dispatch(fetchNeeds(restaurantId));
    }, [])

    return (
        <>
            {confirm ? <ConfirmModal
                setModalOpen={setConfirm}
                onConfirm={async () => {
                    await closeNeedsMessage(currentNeed.restaurant, currentNeed._id);
                    dispatch(fetchNeeds(restaurantId));
                    setConfirm(false);
                }}
            /> : null}
            <div className="flex flex-col h-full ">
                <h2 className="text-3xl font-medium">Потреби, побажання та прохання</h2>
                <hr className='border-t-1 border-slate-300 my-10' />
                <div className='flex gap-3 items-center flex-wrap mb-5'>
                    <div className='px-4 py-2 text-gray-500'>
                        Фільтри:
                    </div>
                    <button className='px-4 py-2 bg-sky-700 text-white rounded-2xl hover:bg-sky-900 transition ease-out hover:ease-in' onClick={() => { setPriorityFilter('all') }}>
                        Скинути фільтр
                    </button>

                    {priorityList.length > 0 ? priorityList.map((priority, i) =>
                        <button className={priorityFilter === priority ? 'px-4 py-2 bg-sky-950 text-white rounded-2xl hover:bg-sky-900 transition ease-out hover:ease-in' : 'px-4 py-2 bg-sky-700 text-white rounded-2xl hover:bg-sky-900 transition ease-out hover:ease-in'} onClick={() => { setPriorityFilter(priority) }}>
                            {priority}
                        </button>
                    ) : null}
                </div>
                <div className="overflow-y-scroll rounded-md">
                    <div className='px-5 py-3 text-xl bg-sky-950 text-sky-100'>
                        Список потреб
                    </div>
                    <table className="w-full text-left text-sky-900">
                        <thead className="text-xs text-gray-700 uppercase bg-sky-950/10">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Від
                                </th>
                                <th scope="col" className="px-1 py-3 text-center">
                                    Дата
                                </th>
                                <th scope="col" className="px-1 py-3 text-center">
                                    Контент
                                </th>
                                <th scope="col" className="px-1 py-3 text-center">
                                    Пріорітетність
                                </th>
                                <th scope="col" className="px-1 py-3 text-center">

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {needs.length > 0 ? needs.map((need, i) =>
                                priorityFilter === 'all' || need.priority === priorityFilter ?
                                    <tr className="bg-white border-b border-gray-300 text-gray-700" key={i}>
                                        <th scope="row" className="p-3 font-medium text-gray-900 whitespace-nowrap w-[10%] text-center">
                                            {need.waiterName}
                                        </th>
                                        <td className="p-3 w-[15%] text-center text-sky-800 font-bold">
                                            <div className="bg-teal-500/5 p-3 rounded-lg ">{formatDateString(need.date)} / {need.time}</div>
                                        </td>
                                        <td className="p-3 text-lg w-[50%] text-center">
                                            {need.message}
                                        </td>
                                        <td className={
                                            (need.priority === 'Низька' ? "p-3 text-lg w-[10%] text-center bg-sky-600/10 font-medium rounded-xl" :
                                                (need.priority === 'Середня' ? "p-3 text-lg w-[10%] text-center bg-sky-600/30 font-medium rounded-xl" :
                                                    (need.priority === 'Висока' ? "p-3 text-lg w-[10%] text-center bg-sky-600/60 font-medium rounded-xl" :
                                                        "px-3 p-3 text-lg w-[10%] text-center bg-sky-600/50"
                                                    )
                                                )
                                            )
                                        }>
                                            {need.priority}
                                        </td>
                                        <td className="px-3 p-3 w-[5%] text-center">
                                            <div className="cursor-pointer" onClick={() => {
                                                setConfirm(true);
                                                setCurrentNeed(need);
                                            }}>
                                                <img className="h-10" src={TrashDone} alt="" />
                                            </div>
                                        </td>
                                    </tr> : null
                            ) : null}
                        </tbody>
                    </table>
                    {needs.length > 0 ? null : <h2 className='text-4xl p-6 text-sky-950 text-center font-light bg-white'>Потреби відсутні</h2>}
                </div>
            </div>
        </>

    )
}