import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useParams } from "react-router-dom";
import { AddButton } from "../../../../ui/buttons/AddButton";
import { fetchEmployees } from "../../../../store/slices/employees.slice";
import AddEmployee from "./AddEmployee";
import { AnimatePresence } from "framer-motion";
import { SkeletonEmployees } from "../../../../ui/skeletons/SkeletonEmployees";
import withHelmet from "../../../../utils/helpers/withHelmet";
import Search from "../../../../assets/svg/search.svg";
import { EmployeeListItem } from "./EmployeeListItem";

const Employees = () => {
    const [searchInput, setSearchInput] = useState("");
    const [positionFilter, setPositionFilter] = useState("all");

    const [addEmployeeModalOpen, setAddEmployeeModalOpen] = useState(false);

    const dispatch = useDispatch();

    const { restaurantId } = useParams();

    const { employees, isLoading } = useSelector((state) => state.employees);

    const positionsList = [
        ...new Set(employees.map((employee) => employee.position)),
    ];

    useEffect(() => {
        dispatch(fetchEmployees(restaurantId));
    }, []);

    return (
        <>
            <AnimatePresence initial={addEmployeeModalOpen}>
                {addEmployeeModalOpen && (
                    <AddEmployee setOpen={setAddEmployeeModalOpen} />
                )}
            </AnimatePresence>

            <div className="flex flex-col">
                <div className="flex justify-between ">
                    <h2 className="text-3xl font-medium text-sky-950">
                        Працівники
                    </h2>
                    <AddButton
                        customFunction={setAddEmployeeModalOpen}
                        buttonText={"Додати"}
                    />
                </div>
                <hr className="border-t-1 border-slate-300 my-5" />
                <div className="flex justify-between px-2 mb-5">
                    <div
                        className="flex gap-2 items-center flex-wrap w-[55%] 
                        lg:gap-3 lg:w-auto"
                    >
                        <div className="py-2 text-gray-500">Фільтри:</div>
                        <div
                            className="px-4 py-2 bg-sky-700 text-white rounded-2xl hover:bg-sky-900 transition ease-out hover:ease-in cursor-pointer"
                            onClick={() => {
                                setPositionFilter("all");
                            }}
                        >
                            Скинути фільтр
                        </div>
                        {positionsList.length > 0
                            ? positionsList.map((employee, i) => (
                                  <div
                                      key={i}
                                      className={
                                          positionFilter === employee
                                              ? "px-4 py-2 bg-sky-950 text-white rounded-2xl hover:bg-sky-900 transition ease-out hover:ease-in cursor-pointer"
                                              : "px-4 py-2 bg-sky-700 text-white rounded-2xl hover:bg-sky-900 transition ease-out hover:ease-in cursor-pointer"
                                      }
                                      onClick={() => {
                                          setPositionFilter(employee);
                                      }}
                                  >
                                      {employee}
                                  </div>
                              ))
                            : null}
                    </div>
                    <div className="flex items-center">
                        <img src={Search} alt="" className="w-6 mr-2" />
                        <input
                            className="p-3 rounded-lg border-2 border-gray-200 w-[90%]"
                            type="text"
                            placeholder="Введіть назву страви..."
                            value={searchInput}
                            onChange={(e) => {
                                setSearchInput(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg text-blue-100">
                    <div className="px-5 py-3 text-xl capitalize bg-sky-950">
                        Список працівників
                    </div>
                    <table className="w-full text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-sky-900/20">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-1 py-2 text-[12px]
                                md:px-3 md:text-md
                                lg:px-6 lg:py-3
                                "
                                >
                                    Ім'я
                                </th>
                                <th
                                    scope="col"
                                    className="px-1 py-2 text-[12px]
                                md:px-3 md:text-md
                                lg:px-6 lg:py-3
                                "
                                >
                                    Логін
                                </th>
                                <th
                                    scope="col"
                                    className="px-1 py-2 text-[12px]
                                md:px-3 md:text-md
                                lg:px-6 lg:py-3
                                "
                                >
                                    Пінкод
                                </th>
                                <th
                                    scope="col"
                                    className="px-1 py-2 text-[12px]
                                md:px-3 md:text-md
                                lg:px-6 lg:py-3
                                "
                                >
                                    Посада
                                </th>
                                <th
                                    scope="col"
                                    className="px-1 py-2 text-[12px] text-center
                                md:px-3 md:text-md"
                                >
                                    Востаннє здійснено вхід
                                </th>
                                <th scope="col" className="px-1 py-1"></th>
                                <th scope="col" className="px-1 py-1"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.length > 0 || !isLoading ? (
                                employees.map((employee, i) =>
                                    employee.name
                                        .toLowerCase()
                                        .includes(searchInput.toLowerCase()) ? (
                                        <EmployeeListItem
                                            key={i}
                                            employee={employee}
                                            positionFilter={positionFilter}
                                        />
                                    ) : null
                                )
                            ) : (
                                <SkeletonEmployees />
                            )}
                        </tbody>
                    </table>
                    {employees.length > 0 ? null : (
                        <h2 className="text-4xl p-6 text-center text-sky-950 font-light bg-white">
                            Працівників не знайдено
                        </h2>
                    )}
                </div>
            </div>
        </>
    );
};

export default withHelmet(Employees, "Працівники закладу");
