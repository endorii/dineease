import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchEmployees } from "../../../../store/slices/employees.slice";
import { editEmployee } from "../../../../actions/employees.actions";
import Close from "../../../../assets/svg/close.svg";
import { getRestaurantById } from "../../../../actions/restaurants.actions";
import toast from "react-hot-toast";
import { Modal } from "../../../App/Modal";
import { motion } from "framer-motion";
import { dropIn, setClassesForInputs } from "../../../../functions";

const EditEmployee = ({ setOpen, currentEmployee }) => {
    const { restaurantId } = useParams();

    const [_id, setId] = useState(currentEmployee._id);
    const [name, setName] = useState(currentEmployee.name);
    const [age, setAge] = useState(currentEmployee.age);
    const [restaurantName, setRestaurantName] = useState(
        currentEmployee.restaurant
    );
    const [experience, setExperience] = useState(currentEmployee.experience);
    const [position, setPosition] = useState(
        currentEmployee.position === "Admin"
            ? "Адмін"
            : currentEmployee.position === "Accountant"
            ? "Бухгалтер"
            : currentEmployee.position === "Waiter"
            ? "Офіціант"
            : null
    );
    const [salary, setSalary] = useState(currentEmployee.salary);
    const [password, setPassword] = useState(currentEmployee.password);
    const [email, setEmail] = useState(currentEmployee.email);
    const [pin, setPin] = useState(currentEmployee.pin);

    const [location, setLocation] = useState(currentEmployee.location || "-");
    const [phone, setPhone] = useState(currentEmployee.phone || "-");
    const [typeOfWorking, setTypeOfWorking] = useState(
        currentEmployee.typeOfWorkingTime || "-"
    );

    const [nameTouched, setNameTouched] = useState(false);
    const [ageTouched, setAgeTouched] = useState(false);
    const [restaurantTouched, setRestaurantTouched] = useState(false);
    const [experienceTouched, setExperienceTouched] = useState(false);
    const [positionTouched, setPositionTouched] = useState(false);
    const [salaryTouched, setSalaryTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    const [pinTouched, setPinTouched] = useState(false);

    const [locationTouched, setLocationTouched] = useState(false);
    const [phoneTouched, setPhoneTouched] = useState(false);
    const [typeOfWorkingTouched, setTypeOfWorkingTouched] = useState(false);

    const [nameError, setNameError] = useState("Поле не може бути пустим");
    const [ageError, setAgeError] = useState("Поле не може бути пустим");
    const [restaurantError, setRestaurantError] = useState(
        "Поле не може бути пустим"
    );
    const [experienceError, setExperienceError] = useState(
        "Поле не може бути пустим"
    );
    const [positionError, setPositionError] = useState(
        "Поле не може бути пустим"
    );
    const [salaryError, setSalaryError] = useState("Поле не може бути пустим");
    const [passwordError, setPasswordError] = useState(
        "Поле не може бути пустим"
    );
    const [emailError, setEmailError] = useState("Поле не може бути пустим");
    const [pinError, setPinError] = useState("Поле не може бути пустим");

    const [locationError, setLocationError] = useState(
        "Поле не може бути пустим"
    );
    const [phoneError, setPhoneError] = useState(
        phone ? null : "Поле не може бути пустим"
    );
    const [typeOfWorkingError, setTypeOfWorkingError] = useState(
        "Поле не може бути пустим"
    );

    const dispatch = useDispatch();

    const notifyConfirm = (message) => toast.success(message);

    const handleName = (e) => {
        setName(e.target.value);
        const re = /^[а-яА-ЯҐґЄєІіЇїҐґa-zA-Z\s]+$/;

        if (!re.test(String(e.target.value).toLowerCase())) {
            setNameError("Невірно введено Ім`я");
        } else {
            setNameError("");
        }
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
        const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError("Невірно веедено логін ");
        } else {
            setEmailError("");
        }
    };

    const handlePin = (e) => {
        setPin(e.target.value);
        const re = /^\d{4}$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setPinError("Невірно веедено пінкод");
        } else {
            setPinError("");
        }
    };

    const handlePosition = (e) => {
        setPosition(e.target.value);
        const re = /^[а-яА-ЯҐґЄєІіЇїҐґa-zA-Z\s]+$/;
        if (position) {
            setPositionError("");
        }

        if (!re.test(String(position))) {
            setPositionError("Невірно веедено посаду");
        } else {
            setPositionError("");
        }
    };
    const handleAge = (e) => {
        setAge(e.target.value);
        const re = /^\d+$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setAgeError("Невірно введено вік");
        } else {
            setAgeError("");
        }
    };

    const handleRestaurant = (e) => {
        setRestaurantName(e.target.value);
        const re = /^[а-яА-ЯҐґЄєІіЇїҐґa-zA-Z\s]+$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setRestaurantError("Невірно введено ресторан");
        } else {
            setRestaurantError("");
        }
    };

    const handleExperience = (e) => {
        setExperience(e.target.value);
        const re = /^\d+$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setExperienceError("Невірно введено досвід");
        } else {
            setExperienceError("");
        }
    };

    const handleSalary = (e) => {
        setSalary(e.target.value);
        const re = /^\d+$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setSalaryError("Невірно введено зарплату");
        } else {
            setSalaryError("");
        }
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
        if (!re.test(String(e.target.value))) {
            setPasswordError(
                "Пароль повинен бути більше 7 символів, містити одну велику літеру та цифру"
            );
        } else {
            setPasswordError("");
        }
    };

    const handlePhoneNumber = (e) => {
        setPhone(e.target.value);
        const re = /^\+380\d{9}$/;
        if (!re.test(String(e.target.value))) {
            setPhoneError("Невірно введено номер телефону");
        } else {
            setPhoneError("");
        }
    };

    const handleLocation = (e) => {
        setLocation(e.target.value);
        const re = /^[a-zA-Zа-яА-Я0-9\s,.'-]{3,}$/;
        if (!re.test(String(e.target.value))) {
            setLocationError("Невірно введено адресу");
        } else {
            setLocationError("");
        }
    };

    const blurHandler = (e) => {
        switch (e.target.name) {
            case "name":
                setNameTouched(true);
                break;
            case "age":
                setAgeTouched(true);
                break;
            case "restaurant":
                setRestaurantTouched(true);
                break;
            case "experience":
                setExperienceTouched(true);
                break;
            case "position":
                setPositionTouched(true);
                break;
            case "salary":
                setSalaryTouched(true);
                break;
            case "password":
                setPasswordTouched(true);
                break;
            case "email":
                setEmailTouched(true);
                break;
            case "pin":
                setPinTouched(true);
                break;
            case "typeOfWorking":
                setTypeOfWorkingTouched(true);
                break;
            case "phone":
                setPhoneTouched(true);
                break;
            case "location":
                setLocationTouched(true);
                break;
            default:
        }
    };

    useEffect(() => {
        if (name) {
            setNameError("");
        }
        if (age) {
            setAgeError("");
        }
        if (experience) {
            setExperienceError("");
        }
        if (position) {
            setPositionError("");
        }
        if (salary) {
            setSalaryError("");
        }
        if (password) {
            setPasswordError("");
        }
        if (pin) {
            setPinError("");
        }
        if (email) {
            setEmailError("");
        }
    }, []);

    useEffect(() => {
        const fetchRestaurant = async () => {
            const restaurant = await getRestaurantById(restaurantId);
            setRestaurantName(restaurant.name);
        };

        fetchRestaurant();
    }, [restaurantId]);

    return (
        <Modal onClick={() => setOpen(false)}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute w-[95%] flex justify-center m-5 cursor-default h-max
            lg:w-[70%]"
            >
                <div className="relative bg-white shadow-xl w-full z-10 rounded-md">
                    <div className="flex flex-col items-center mx-3 gap-3">
                        <img
                            className="absolute top-2 right-2 w-8 cursor-pointer"
                            src={Close}
                            onClick={() => setOpen(false)}
                            alt=""
                        />
                        <span className="text-center text-2xl mt-6 font-semibold">
                            Змінити дані працівника
                        </span>
                        <ul className="flex justify-center w-[60%] m-10 gap-10 text-sky-900">
                            <div className="flex flex-col gap-5 w-full">
                                <li>
                                    <label
                                        htmlFor="name"
                                        className="block font-medium mb-1"
                                    >
                                        Ім'я
                                    </label>
                                    <input
                                        value={name}
                                        onChange={(e) => handleName(e)}
                                        type="text"
                                        id="name"
                                        name="name"
                                        className={setClassesForInputs(
                                            nameTouched,
                                            nameError
                                        )}
                                        required
                                        onBlur={(e) => {
                                            blurHandler(e);
                                        }}
                                    />
                                    {nameTouched && nameError && (
                                        <div className="text-red-600">
                                            {nameError}
                                        </div>
                                    )}
                                </li>
                                <li>
                                    <label
                                        htmlFor="age"
                                        className="block font-medium mb-1"
                                    >
                                        Вік
                                    </label>
                                    <input
                                        value={age}
                                        onChange={(e) => handleAge(e)}
                                        type="text"
                                        id="age"
                                        name="age"
                                        className={setClassesForInputs(
                                            ageTouched,
                                            ageError
                                        )}
                                        required
                                        onBlur={(e) => {
                                            blurHandler(e);
                                        }}
                                    />
                                    {ageTouched && ageError && (
                                        <div className="text-red-600">
                                            {ageError}
                                        </div>
                                    )}
                                </li>
                                <li>
                                    <label
                                        htmlFor="location"
                                        className="block font-medium mb-1"
                                    >
                                        Місце проживання
                                    </label>
                                    <input
                                        value={location}
                                        onChange={(e) => handleLocation(e)}
                                        type="text"
                                        id="location"
                                        name="location"
                                        className={setClassesForInputs(
                                            locationTouched,
                                            locationError
                                        )}
                                        required
                                        onBlur={(e) => {
                                            blurHandler(e);
                                        }}
                                    />
                                    {locationTouched && locationError && (
                                        <div className="text-red-600">
                                            {locationError}
                                        </div>
                                    )}
                                </li>
                                <li>
                                    <label
                                        htmlFor="restaurant"
                                        className="block font-medium mb-1"
                                    >
                                        Ресторан
                                    </label>
                                    <input
                                        disabled
                                        value={restaurantName}
                                        onChange={(e) => handleRestaurant(e)}
                                        type="text"
                                        id="restaurant"
                                        name="restaurant"
                                        className={setClassesForInputs(
                                            restaurantTouched,
                                            restaurantError
                                        )}
                                        required
                                        onBlur={(e) => {
                                            blurHandler(e);
                                        }}
                                    />
                                    {restaurantTouched && restaurantError && (
                                        <div className="text-red-600">
                                            {restaurantError}
                                        </div>
                                    )}
                                </li>
                                <li>
                                    <label
                                        htmlFor="experience"
                                        className="block font-medium mb-1"
                                    >
                                        Досвід (роки)
                                    </label>
                                    <input
                                        value={experience}
                                        onChange={(e) => handleExperience(e)}
                                        type="text"
                                        id="experience"
                                        name="experience"
                                        className={setClassesForInputs(
                                            experienceTouched,
                                            experienceError
                                        )}
                                        required
                                        onBlur={(e) => {
                                            blurHandler(e);
                                        }}
                                    />
                                    {experienceTouched && experienceError && (
                                        <div className="text-red-600">
                                            {experienceError}
                                        </div>
                                    )}
                                </li>
                            </div>
                            <div className="flex flex-col gap-5 w-full">
                                <li>
                                    <label
                                        htmlFor="phone"
                                        className="block font-medium mb-1"
                                    >
                                        Телефон
                                    </label>
                                    <input
                                        value={phone}
                                        onChange={(e) => handlePhoneNumber(e)}
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className={setClassesForInputs(
                                            phoneTouched,
                                            phoneError
                                        )}
                                        required
                                        onBlur={(e) => {
                                            blurHandler(e);
                                        }}
                                    />
                                    {phoneTouched && phoneError && (
                                        <div className="text-red-600">
                                            {phoneError}
                                        </div>
                                    )}
                                </li>
                                <li>
                                    <label
                                        htmlFor="position"
                                        className="block font-medium mb-1 "
                                    >
                                        Посада
                                    </label>
                                    <select
                                        id="positions"
                                        value={
                                            position === "Адмін"
                                                ? "Admin"
                                                : position === "Бухгалтер"
                                                ? "Accountant"
                                                : position === "Офіціант"
                                                ? "Waiter"
                                                : null
                                        }
                                        name="position"
                                        onChange={(e) => handlePosition(e)}
                                        onBlur={(e) => {
                                            blurHandler(e);
                                        }}
                                        className={setClassesForInputs(
                                            positionTouched,
                                            positionError
                                        )}
                                        required
                                    >
                                        <option value="Waiter">Офіціант</option>
                                        <option value="Admin">Адмін</option>
                                        <option value="Accountant">
                                            Бухгалтер
                                        </option>
                                    </select>
                                    {positionTouched && positionError && (
                                        <div className="text-red-600">
                                            {positionError}
                                        </div>
                                    )}
                                </li>
                                <li>
                                    <label
                                        htmlFor="typeOfWorking"
                                        className="block font-medium mb-1 "
                                    >
                                        Тип часу роботи
                                    </label>
                                    <select
                                        id="typeOfWorking"
                                        value={typeOfWorking}
                                        name="typeOfWorking"
                                        onChange={(e) =>
                                            setTypeOfWorking(e.target.value)
                                        }
                                        onBlur={(e) => {
                                            blurHandler(e);
                                        }}
                                        className={setClassesForInputs(
                                            typeOfWorkingTouched,
                                            typeOfWorkingError
                                        )}
                                        required
                                    >
                                        <option value="Не повний робочий день">
                                            Не повний робочий день
                                        </option>
                                        <option value="Повний робочий день">
                                            Повний робочий день
                                        </option>
                                        <option value="Понаднормова зміна">
                                            Понаднормова зміна
                                        </option>
                                    </select>
                                    {typeOfWorkingTouched &&
                                        typeOfWorkingError && (
                                            <div className="text-red-600">
                                                {typeOfWorkingError}
                                            </div>
                                        )}
                                </li>
                                <li>
                                    <label
                                        htmlFor="salary"
                                        className="block font-medium mb-1"
                                    >
                                        Зарплата
                                    </label>
                                    <input
                                        value={salary}
                                        onChange={(e) => handleSalary(e)}
                                        type="text"
                                        id="salary"
                                        name="salary"
                                        className={setClassesForInputs(
                                            salaryTouched,
                                            salaryError
                                        )}
                                        required
                                        onBlur={(e) => {
                                            blurHandler(e);
                                        }}
                                    />
                                    {salaryTouched && salaryError && (
                                        <div className="text-red-600">
                                            {salaryError}
                                        </div>
                                    )}
                                </li>

                                {position === "Waiter" ? (
                                    <li>
                                        <label
                                            htmlFor="pin"
                                            className="block font-medium mb-1 "
                                        >
                                            ПІН-код
                                        </label>
                                        <input
                                            value={pin}
                                            onChange={(e) => {
                                                handlePin(e);
                                            }}
                                            onBlur={(e) => {
                                                blurHandler(e);
                                            }}
                                            type="text"
                                            name="pin"
                                            id="pin"
                                            className={setClassesForInputs(
                                                pinTouched,
                                                pinError
                                            )}
                                            required
                                        />
                                        {pinTouched && pinError && (
                                            <div className="text-red-600">
                                                {pinError}
                                            </div>
                                        )}
                                    </li>
                                ) : (
                                    <>
                                        <li>
                                            <label
                                                htmlFor="login"
                                                className="block font-medium mb-1 "
                                            >
                                                Логін
                                            </label>
                                            <input
                                                value={email}
                                                onChange={(e) => handleEmail(e)}
                                                onBlur={(e) => {
                                                    blurHandler(e);
                                                }}
                                                type="text"
                                                name="login"
                                                id="login"
                                                className={setClassesForInputs(
                                                    emailTouched,
                                                    emailError
                                                )}
                                                required
                                            />
                                            {emailTouched && emailError && (
                                                <div className="text-red-600">
                                                    {emailError}
                                                </div>
                                            )}
                                        </li>
                                        <li>
                                            <label
                                                htmlFor="password"
                                                className="block font-medium mb-1"
                                            >
                                                Пароль
                                            </label>
                                            <input
                                                value={password}
                                                onChange={(e) =>
                                                    handlePassword(e)
                                                }
                                                type="password"
                                                id="password"
                                                name="password"
                                                className={setClassesForInputs(
                                                    passwordTouched,
                                                    passwordError
                                                )}
                                                required
                                                onBlur={(e) => {
                                                    blurHandler(e);
                                                }}
                                            />
                                            {passwordTouched &&
                                                passwordError && (
                                                    <div className="text-red-600">
                                                        {passwordError}
                                                    </div>
                                                )}
                                        </li>
                                    </>
                                )}
                            </div>
                        </ul>

                        <button
                            disabled={nameError || positionError}
                            className="flex items-center bg-teal-700 hover:bg-teal-800 rounded-lg mb-7 mx-[30%] px-7 py-2 text-white font-medium drop-shadow-md disabled:bg-teal-900/20 disabled:hover:bg-teal-900/20 disabled:text-gray-100 disabled:cursor-not-allowed transition ease-out hover:ease-in"
                            onClick={async () => {
                                await editEmployee(
                                    _id,
                                    name,
                                    age,
                                    location,
                                    restaurantId,
                                    experience,
                                    phone,
                                    position,
                                    typeOfWorking,
                                    salary,
                                    password,
                                    email,
                                    pin
                                );
                                dispatch(fetchEmployees(restaurantId));
                                notifyConfirm("Інформацію робітника змінено.");
                                setOpen(false);
                            }}
                        >
                            Підтвердити
                        </button>
                    </div>
                </div>
            </motion.div>
        </Modal>
    );
};

export default EditEmployee;
