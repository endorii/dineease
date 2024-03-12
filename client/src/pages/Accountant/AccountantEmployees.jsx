import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useParams } from 'react-router-dom';
import { fetchEmployees } from '../../store/slices/employees.slice';
import { EmployeeInformation } from './EmployeeInformation';
import { AnimatePresence } from 'framer-motion';

export const AccountantEmployees = () => {

    const dispatch = useDispatch();

    const { restaurantId } = useParams()

    const { employees } = useSelector(state => state.employees);

    const [openInfo, setOpenInfo] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(false);

    useEffect(() => {
        dispatch(fetchEmployees(restaurantId));
    }, []);

    return (
        <>
            <AnimatePresence initial={openInfo}>
                {openInfo && <EmployeeInformation employee={currentEmployee} setOpenInfo={setOpenInfo} />}
            </AnimatePresence>

            <div className='flex flex-col' >
                <div className="flex justify-between ">
                    <h2 className="text-3xl font-medium text-sky-950">Працівники</h2>
                </div>
                <hr className='border-t-1 border-slate-300 my-10' />

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg text-blue-100">
                    <div className='px-5 py-3 text-xl capitalize bg-sky-950'>
                        Список працівників
                    </div>
                    <table className="w-full text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-sky-900/20">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Ім'я
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Логін
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Посада
                                </th>
                                <th scope="col" className="px-1 py-3">
                                    Востаннє здійснено вхід
                                </th>
                                <th scope="col" className="px-1 py-1">
                                    <span className="sr-only"></span>
                                </th>
                            </tr>
                        </thead>
                        {employees.length > 0 ? employees.map((employee, i) =>
                            <tbody key={i}>
                                <tr className="bg-white border-b border-gray-300 text-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900">
                                        {employee.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {employee.email ? employee.email : "-"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {employee.position}
                                    </td>
                                    <td className="px-1 py-4">
                                        {employee.workingTime[employee.workingTime.length - 1]?.entries.start} | {employee.workingTime[employee.workingTime.length - 1]?.date}
                                    </td>
                                    <td className="px-2 py-1 text-center">
                                        <button onClick={async () => {
                                            setCurrentEmployee(employee);
                                            setOpenInfo(!openInfo);
                                            dispatch(fetchEmployees(restaurantId));
                                        }}

                                            className="font-medium text-sky-700 rounded-md bg-gray-100 px-3 py-1 shadow hover:bg-sky-800/10 transition ease-out hover:ease-in">Інформація</button>
                                    </td>
                                </tr>
                            </tbody>
                        ) : null}
                    </table>
                    {employees.length > 0 ? null : <h2 className='text-4xl p-6 text-center text-sky-950 font-light bg-white'>Працівників не знайдено</h2>}
                </div>
            </div>
        </>
    )
}