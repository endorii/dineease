import { useEffect, useState } from "react";
// import { editEmployee } from "./employee";
import Plus from '../../../assets/svg/plus.svg';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchEmployees } from "../../../store/slices/employees.slice";
import { editEmployee } from "../../../actions/employees.actions";
// import { fetchEmployees } from "../../../../store/slices/employeesSlice";

const EditEmployee = ({ setOpen, currentEmployee }) => {

    const { restaurant } = useParams();

    const [_id, setId] = useState(currentEmployee._id);
    const [name, setName] = useState(currentEmployee.name);
    const [age, setAge] = useState(currentEmployee.age);
    const [restaurantName, setRestaurantName] = useState(`${restaurant}`);
    const [experience, setExperience] = useState(currentEmployee.experience);
    const [position, setPosition] = useState(currentEmployee.position);
    const [salary, setSalary] = useState(currentEmployee.salary);
    const [password, setPassword] = useState(currentEmployee.password);
    const [email, setEmail] = useState(currentEmployee.email);
    const [pin, setPin] = useState(currentEmployee.pin);

    const [nameTouched, setNameTouched] = useState(false);
    const [ageTouched, setAgeTouched] = useState('');
    const [restaurantTouched, setRestaurantTouched] = useState('');
    const [experienceTouched, setExperienceTouched] = useState('');
    const [positionTouched, setPositionTouched] = useState(false);
    const [salaryTouched, setSalaryTouched] = useState('');
    const [passwordTouched, setPasswordTouched] = useState('');
    const [emailTouched, setEmailTouched] = useState(false);
    const [pinTouched, setPinTouched] = useState(false);

    const [nameError, setNameError] = useState('Поле не може бути пустим');
    const [ageError, setAgeError] = useState('Поле не може бути пустим');
    const [restaurantError, setRestaurantError] = useState('Поле не може бути пустим');
    const [experienceError, setExperienceError] = useState('Поле не може бути пустим');
    const [positionError, setPositionError] = useState('Поле не може бути пустим');
    const [salaryError, setSalaryError] = useState('Поле не може бути пустим');
    const [passwordError, setPasswordError] = useState('Поле не може бути пустим');
    const [emailError, setEmailError] = useState('Поле не може бути пустим');
    const [pinError, setPinError] = useState('Поле не може бути пустим');

    const dispatch = useDispatch();

    const handleName = (e) => {
        setName(e.target.value);
        const re = /^[а-яА-ЯҐґЄєІіЇїҐґa-zA-Z\s]+$/

        if (!re.test(String(e.target.value).toLowerCase())) {
            setNameError('Невірно введено Ім`я')
        } else {
            setNameError('')
        }
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
        const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Невірно веедено логін ')
        } else {
            setEmailError('')
        }
    }

    const handlePin = (e) => {
        setPin(e.target.value);
        const re = /^\d{4}$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setPinError('Невірно веедено пінкод')
        } else {
            setPinError('')
        }
    }

    const handlePosition = (e) => {
        setPosition(e.target.value);
        const re = /^[а-яА-ЯҐґЄєІіЇїҐґa-zA-Z\s]+$/;
        if (position) {
            setPositionError('')
        }

        if (!re.test(String(position))) {
            setPositionError('Невірно веедено посаду')
        } else {
            setPositionError('')
        }
    }
    const handleAge = (e) => {
        setAge(e.target.value);
        const re = /^\d+$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setAgeError('Невірно введено вік')
        } else {
            setAgeError('')
        }
    }

    const handleRestaurant = (e) => {
        setRestaurantName(e.target.value);
        const re = /^[а-яА-ЯҐґЄєІіЇїҐґa-zA-Z\s]+$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setRestaurantError('Невірно введено ресторан')
        } else {
            setRestaurantError('')
        }
    }

    const handleExperience = (e) => {
        setExperience(e.target.value);
        const re = /^\d+$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setExperienceError('Невірно введено досвід')
        } else {
            setExperienceError('')
        }
    }

    const handleSalary = (e) => {
        setSalary(e.target.value);
        const re = /^\d+$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setSalaryError('Невірно введено зарплату')
        } else {
            setSalaryError('')
        }
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
        if (!re.test(String(e.target.value))) {
            setPasswordError('Пароль повинен бути більше 7 символів, містити одну велику літеру та цифру')
        } else {
            setPasswordError('')
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                setNameTouched(true);
                break;
            case 'age':
                setAgeTouched(true);
                break;
            case 'restaurant':
                setRestaurantTouched(true);
                break;
            case 'experience':
                setExperienceTouched(true);
                break;
            case 'position':
                setPositionTouched(true);
                break;
            case 'salary':
                setSalaryTouched(true);
                break;
            case 'password':
                setPasswordTouched(true);
                break;
            case 'email':
                setEmailTouched(true);
                break;
            case 'pin':
                setPinTouched(true);
                break;
            default: ;
        }
    }

    useEffect(() => {
        if (name) {
            setNameError('');
        }
        if (age) {
            setAgeError('');
        }
        if (experience) {
            setExperienceError('');
        }
        if (position) {
            setPositionError('');
        }
        if (salary) {
            setSalaryError('');
        }
        if (password) {
            setPasswordError('');
        }
        if (pin) {
            setPinError('');
        }
        if (email) {
            setEmailError('');
        }
    }, []);


    return (
        <div className='flex justify-center '>
            <div className='absolute bg-white shadow-xl w-1/2 h-auto z-10 rounded-md mt-16'>
                <div className='flex flex-col items-center mx-3 gap-3'>
                    <span className='top-2 right-2 absolute cursor-pointer'
                        onClick={() => setOpen(false)}>✖
                    </span>
                    <span className='text-center text-2xl mt-6 font-semibold'>Змінити дані працівника</span>
                    <ul className='flex justify-center w-[60%] m-10 gap-10 text-sky-900'>
                        <div className="flex flex-col gap-5 w-full">
                            <li>
                                <label htmlFor="name" className="block font-medium mb-1">Ім'я</label>
                                <input
                                    value={name}
                                    onChange={(e) => handleName(e)}
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-black" required
                                    onBlur={(e) => { blurHandler(e) }}
                                />
                                {(nameTouched && nameError) && <div className="text-red-600">{nameError}</div>}
                            </li>
                            <li>
                                <label htmlFor="age" className="block font-medium mb-1">Вік</label>
                                <input
                                    value={age}
                                    onChange={(e) => handleAge(e)}
                                    type="text"
                                    id="age"
                                    name="age"
                                    className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-black" required
                                    onBlur={(e) => { blurHandler(e) }}
                                />
                                {(ageTouched && ageError) && <div className="text-red-600">{ageError}</div>}
                            </li>
                            <li>
                                <label htmlFor="restaurant" className="block font-medium mb-1">Ресторан</label>
                                <input
                                    disabled
                                    value={restaurantName}
                                    onChange={(e) => handleRestaurant(e)}
                                    type="text"
                                    id="restaurant"
                                    name="restaurant"
                                    className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-black" required
                                    onBlur={(e) => { blurHandler(e) }}
                                />
                                {(restaurantTouched && restaurantError) && <div className="text-red-600">{restaurantError}</div>}
                            </li>
                            <li>
                                <label htmlFor="experience" className="block font-medium mb-1">Досвід (роки)</label>
                                <input
                                    value={experience}
                                    onChange={(e) => handleExperience(e)}
                                    type="text"
                                    id="experience"
                                    name="experience"
                                    className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-black" required
                                    onBlur={(e) => { blurHandler(e) }}
                                />
                                {(experienceTouched && experienceError) && <div className="text-red-600">{experienceError}</div>}
                            </li>
                        </div>
                        <div className="flex flex-col gap-5 w-full">
                            <li>
                                <label htmlFor="position" className="block font-medium mb-1 ">Посада</label>
                                <select id='positions'
                                    value={position}
                                    name="position"
                                    onChange={(e) => handlePosition(e)}
                                    onBlur={(e) => { blurHandler(e) }}
                                    className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-black" required >
                                    <option value="Waiter">Waiter</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Accountant">Accountant</option>
                                </select>
                                {(positionTouched && positionError) && <div className="text-red-600">{positionError}</div>}
                            </li>
                            <li>
                                <label htmlFor="salary" className="block font-medium mb-1">Зарплата</label>
                                <input
                                    value={salary}
                                    onChange={(e) => handleSalary(e)}
                                    type="text"
                                    id="salary"
                                    name="salary"
                                    className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-black" required
                                    onBlur={(e) => { blurHandler(e) }}
                                />
                                {(salaryTouched && salaryError) && <div className="text-red-600">{salaryError}</div>}
                            </li>

                            {position === "Waiter" ? <li>
                                <label htmlFor="pin" className="block font-medium mb-1 ">ПІН-код</label>
                                <input
                                    value={pin}
                                    onChange={(e) => { handlePin(e) }}
                                    onBlur={(e) => { blurHandler(e) }}
                                    type="text"
                                    name="pin"
                                    id="pin"
                                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-black" required />
                                {(pinTouched && pinError) && <div className="text-red-600">{pinError}</div>}
                            </li> : <>
                                <li>
                                    <label htmlFor="login" className="block font-medium mb-1 ">Логін</label>
                                    <input
                                        value={email}
                                        onChange={(e) => handleEmail(e)}
                                        onBlur={(e) => { blurHandler(e) }}
                                        type="text"
                                        name="login"
                                        id="login"
                                        className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-black" required />
                                    {(emailTouched && emailError) && <div className="text-red-600">{emailError}</div>}
                                </li>
                                <li>
                                    <label htmlFor="password" className="block font-medium mb-1">Пароль</label>
                                    <input
                                        value={password}
                                        onChange={(e) => handlePassword(e)}
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-black" required
                                        onBlur={(e) => { blurHandler(e) }}
                                    />
                                    {(passwordTouched && passwordError) && <div className="text-red-600">{passwordError}</div>}
                                </li>
                            </>}
                        </div>
                    </ul>

                    <button disabled={nameError || positionError} className="flex items-center bg-green-500 hover:bg-green-600 rounded-lg mb-7 mx-[30%] px-7 py-2 text-white font-medium drop-shadow-md disabled:bg-green-900/20 disabled:hover:bg-green-900/20 disabled:text-gray-100 disabled:cursor-not-allowed"
                        onClick={async () => {
                            setOpen(false);
                            await editEmployee(_id, 
                                name,
                                age,
                                restaurantName,
                                experience,
                                position,
                                salary,
                                password,
                                email,
                                pin);
                            dispatch(fetchEmployees());
                        }}

                    >Підтвердити
                        <img className='w-7 inline pl-2' src={Plus} alt="" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditEmployee;