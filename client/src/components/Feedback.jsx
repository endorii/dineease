import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedback } from "../store/slices/feedback.slice";
import { useParams } from "react-router-dom";
import { formatDateString } from "../functions";
import TrashDone from "../assets/svg/trashDone.svg"
import { closeFeedbackMessage } from "../actions/feedback.actions";

export const Feedback = () => {

    const dispatch = useDispatch();
    const { restaurantId } = useParams();
    const { feedback } = useSelector(state => state.feedback);

    useEffect(() => {
        dispatch(fetchFeedback(restaurantId))
    }, [])

    return (
        <div className="flex flex-col h-full">
            <h2 className="text-3xl font-medium">Зворотній зв'язок</h2>
            <hr className='border-t-1 border-slate-300 my-10' />
            <div className="relative overflow-y-scroll rounded-md">
                <div className='px-5 py-3 text-xl bg-sky-950 text-sky-100'>
                    Список повідомлень
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

                            </th>
                        </tr>
                    </thead>
                    {feedback.length > 0 ? feedback.map((message, i) =>
                        <tbody
                            key={i}>
                            <tr className="bg-white border-b border-gray-300 text-gray-700">
                                <th scope="row" className="p-3 font-medium text-gray-900 w-[10%] text-center">
                                    {message.waiterName}
                                </th>
                                <td className="p-3 w-[15%] text-center text-sky-800 font-bold">
                                    <div className="bg-teal-500/5 p-3 rounded-lg ">{formatDateString(message.date)} / {message.time} </div>
                                </td>
                                <td className="p-3 text-lg w-[60%] text-center">
                                    {message.message}
                                </td>
                                <td className="p-3 w-[5%] text-center">
                                    <div className="cursor-pointer" onClick={async() => {

                                        await closeFeedbackMessage(message.restaurant, message._id);
                                        dispatch(fetchFeedback(restaurantId));
                                        }}>
                                        <img className="h-10" src={TrashDone} alt="" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    ) : null}
                </table>
                {feedback.length > 0 ? null : <h2 className='text-4xl p-6 text-center text-sky-950 font-light bg-white'>Повідомленя відсутні</h2>}
            </div>
        </div>
    )
}