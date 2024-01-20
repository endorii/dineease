import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNeeds } from "../store/slices/needs.slice";
import { useParams } from "react-router-dom";
import { formatDateString } from "../functions";
import TrashDone from "../assets/svg/trashDone.svg"
import { closeNeedsMessage } from "../actions/needs.actions";

export const Needs = () => {

    const dispatch = useDispatch();
    const { restaurantId } = useParams();
    const { needs } = useSelector(state => state.needs);

    useEffect(() => {
        dispatch(fetchNeeds(restaurantId));
    }, [])

    return (
        <div className="flex flex-col h-full ">
            <h2 className="text-3xl font-medium">Потреби, побажання та прохання</h2>
            <hr className='border-t-1 border-slate-300 my-10' />
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
                    {needs.length > 0 ? needs.map((need, i) =>
                        <tbody
                            key={i}
                        >
                            <tr className="bg-white border-b border-gray-300 text-gray-700">
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
                                    (need.priority === 'Не терміново' ? "p-3 text-lg w-[10%] text-center bg-sky-600/10 font-medium rounded-xl" :
                                        (need.priority === 'Терміново' ? "p-3 text-lg w-[10%] text-center bg-sky-600/30 font-medium rounded-xl" :
                                            (need.priority === 'Дуже терміново' ? "p-3 text-lg w-[10%] text-center bg-sky-600/60 font-medium rounded-xl" :
                                                "px-3 p-3 text-lg w-[10%] text-center bg-sky-600/50"
                                            )
                                        )
                                    )
                                }>
                                    {need.priority === 'Не терміново' ? 'Низька' : (need.priority === 'Терміново' ? 'Середня' : (need.priority === 'Дуже терміново' ? 'Висока' : null))}
                                </td>
                                <td className="px-3 p-3 w-[5%] text-center">
                                    <div className="cursor-pointer" onClick={async () => { await closeNeedsMessage(need.restaurant, need._id); dispatch(fetchNeeds(restaurantId)) }}>
                                        <img className="h-10" src={TrashDone} alt="" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    ) : null}
                </table>
                {needs.length > 0 ? null : <h2 className='text-4xl p-6 text-sky-950 text-center font-light bg-white'>Потреби відсутні</h2>}
            </div>
        </div>
    )
}