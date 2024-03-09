import { useState } from 'react';
import { useEffect } from 'react';
import { deleteEmployee } from '../../../../actions/employees.actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useParams } from 'react-router-dom';
import { AddButton } from '../../../../ui/buttons/AddButton';
import EditEmployee from './EditEmployee';
import { fetchEmployees } from '../../../../store/slices/employees.slice';
import { ConfirmModal } from '../../ConfirmModal';
import toast from 'react-hot-toast';
import AddEmployee from './AddEmployee';
import { AnimatePresence } from 'framer-motion';
import { Loader } from '../../../App/Loader';
import { SkeletonEmployees } from '../../../../ui/skeletons/SkeletonEmployees';

const Employees = () => {
    const [addEmployeeModalOpen, setAddEmployeeModalOpen] = useState(false);
    const [editEmployeeModalOpen, setEditEmployeeModalOpen] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);
    const [deleteEmployeeModalOpen, setDeleteEmployeeModalOpen] = useState(false);

    const dispatch = useDispatch();

    const { restaurantId } = useParams()

    const { employees, isLoading } = useSelector(state => state.employees);

    const notifyConfirm = (message) => { toast.success(message) }

    useEffect(() => {
        dispatch(fetchEmployees(restaurantId));
    }, []);

    return (
        <>
            <AnimatePresence initial={addEmployeeModalOpen}>
                {addEmployeeModalOpen && <AddEmployee setOpen={setAddEmployeeModalOpen} />}
            </AnimatePresence>

            <AnimatePresence initial={editEmployeeModalOpen}>
                {editEmployeeModalOpen && <EditEmployee setOpen={setEditEmployeeModalOpen} currentEmployee={currentEmployee} />}
            </AnimatePresence>

            <AnimatePresence initial={deleteEmployeeModalOpen}>
                {deleteEmployeeModalOpen && <ConfirmModal
                    setModalOpen={setDeleteEmployeeModalOpen}
                    onConfirm={async () => {
                        await deleteEmployee(currentEmployee._id);
                        dispatch(fetchEmployees(restaurantId));
                        notifyConfirm('Робітника звільнено.');
                        setDeleteEmployeeModalOpen(false);
                    }} />}
            </AnimatePresence>

            <div className='flex flex-col' >
                <div className="flex justify-between ">
                    <h2 className="text-3xl font-medium text-sky-950">Працівники</h2>
                    <AddButton customFunction={setAddEmployeeModalOpen} buttonText={"Додати"} />
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
                                    Пінкод
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Посада
                                </th>
                                <th scope="col" className="px-1 py-3">
                                    Востаннє здійснено вхід
                                </th>
                                <th scope="col" className="px-1 py-1">
                                    <span className="sr-only">Змінити</span>
                                </th>
                                <th scope="col" className="px-1 py-1">
                                    <span className="sr-only">Опції</span>
                                </th>
                            </tr>
                        </thead>
                        {employees.length > 0 || !isLoading ? employees.map((employee, i) =>
                            <tbody key={i}>
                                <tr className="bg-white border-b border-gray-300 text-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900">
                                        {employee.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {employee.email ? employee.email : "-"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {employee.pin ? employee.pin : "-"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {employee.position}
                                    </td>
                                    <td className="px-1 py-4">
                                        {employee.workingTime[employee.workingTime.length - 1]?.entries.start} | {employee.workingTime[employee.workingTime.length - 1]?.date}
                                    </td>
                                    <td className="px-2 py-1 text-right">
                                        <button onClick={async () => {
                                            setCurrentEmployee(employee)
                                            setEditEmployeeModalOpen(true);
                                            dispatch(fetchEmployees(restaurantId));
                                        }}
                                            className="font-medium text-sky-700 rounded-md bg-gray-100 px-3 py-1 shadow hover:bg-sky-800/10 transition ease-out hover:ease-in">Редагувати</button>
                                    </td>
                                    <td className="px-2 py-1 text-left">
                                        <button onClick={() => {
                                            setCurrentEmployee(employee);
                                            setDeleteEmployeeModalOpen(true);
                                        }} className="font-medium text-yellow-700 rounded-md bg-gray-100 px-3 py-1 shadow hover:bg-yellow-800/10 transition ease-out hover:ease-in">Видалити</button>
                                    </td>
                                </tr>
                            </tbody>
                        ) : <SkeletonEmployees/>}
                    </table>
                    {employees.length > 0 ? null : <h2 className='text-4xl p-6 text-center text-sky-950 font-light bg-white'>Працівників не знайдено</h2>}
                </div>

            </div>
        </>
    )
}

export default Employees;