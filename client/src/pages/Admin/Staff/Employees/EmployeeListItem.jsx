import { useState } from "react";
import { fetchEmployees } from "../../../../store/slices/employees.slice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import EditEmployee from "./EditEmployee";
import { ConfirmModal } from "../../ConfirmModal";
import { deleteEmployee } from "../../../../actions/employees.actions";
import toast from "react-hot-toast";

export const EmployeeListItem = ({ employee, positionFilter }) => {
    const dispatch = useDispatch();
    const { restaurantId } = useParams();

    const [currentEmployee, setCurrentEmployee] = useState(null);
    const [editEmployeeModalOpen, setEditEmployeeModalOpen] = useState(false);
    const [deleteEmployeeModalOpen, setDeleteEmployeeModalOpen] =
        useState(false);

    const notifyConfirm = (message) => {
        toast.success(message);
    };
    return (
        <>
            <AnimatePresence initial={editEmployeeModalOpen}>
                {editEmployeeModalOpen && (
                    <EditEmployee
                        setOpen={setEditEmployeeModalOpen}
                        currentEmployee={currentEmployee}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence initial={deleteEmployeeModalOpen}>
                {deleteEmployeeModalOpen && (
                    <ConfirmModal
                        setModalOpen={setDeleteEmployeeModalOpen}
                        onConfirm={async () => {
                            await deleteEmployee(currentEmployee._id);
                            dispatch(fetchEmployees(restaurantId));
                            notifyConfirm("Робітника звільнено.");
                            setDeleteEmployeeModalOpen(false);
                        }}
                    />
                )}
            </AnimatePresence>
            {positionFilter === "all" ||
            employee.position === positionFilter ? (
                <tr className="bg-white border-b border-gray-300 text-gray-700">
                    <th
                        scope="row"
                        className="pl-3 p-1 py-5 text-[12px] font-medium text-gray-900
                                md:text-base
                                "
                    >
                        {employee.name}
                    </th>
                    <td
                        className="p-1 text-[12px]
                                md:text-base
                                "
                    >
                        {employee.email ? employee.email : "-"}
                    </td>
                    <td
                        className="p-1 text-[12px] text-center
                                md:text-base
                                "
                    >
                        {employee.pin ? employee.pin : "-"}
                    </td>
                    <td
                        className="p-1 text-[12px]
                                md:text-base
                                "
                    >
                        {employee.position === "Admin"
                            ? "Адмін"
                            : employee.position === "Accountant"
                            ? "Бухгалтер"
                            : employee.position === "Waiter"
                            ? "Офіціант"
                            : null}
                    </td>
                    <td
                        className="p-1 text-[12px] text-center
            md:text-base
            "
                    >
                        {employee.workingTime &&
                        employee.workingTime.length > 0 ? (
                            <>
                                {
                                    employee.workingTime[
                                        employee.workingTime.length - 1
                                    ]?.entries.start
                                }{" "}
                                {
                                    employee.workingTime[
                                        employee.workingTime.length - 1
                                    ]?.date
                                }
                            </>
                        ) : (
                            "-"
                        )}
                    </td>

                    <td className="p-1 text-right">
                        <button
                            onClick={async () => {
                                setCurrentEmployee(employee);
                                setEditEmployeeModalOpen(true);
                                dispatch(fetchEmployees(restaurantId));
                            }}
                            className="font-medium text-sky-700 text-[12px] rounded-md bg-gray-100 px-1 py-1 shadow hover:bg-sky-800/10 transition ease-out hover:ease-in
                                        md:text-base
                                        "
                        >
                            Редагувати
                        </button>
                    </td>
                    <td className="p-1 pr-3 text-left">
                        <button
                            onClick={() => {
                                setCurrentEmployee(employee);
                                setDeleteEmployeeModalOpen(true);
                            }}
                            className="font-medium text-yellow-700 text-[12px] rounded-md bg-gray-100 px-1 py-1 shadow hover:bg-yellow-800/10 transition ease-out hover:ease-in
                                    md:text-base
                                    "
                        >
                            Видалити
                        </button>
                    </td>
                </tr>
            ) : null}
        </>
    );
};
