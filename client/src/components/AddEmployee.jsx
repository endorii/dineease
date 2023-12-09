import { useState, useEffect } from "react";
// import { addEmployee } from "./employee";
import { useDispatch } from "react-redux";
// import { fetchEmployees } from "../../../../store/slices/employeesSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";
// import { fetchPositions } from "../../../../store/slices/positions.Slice";

const AddEmployee = ({ setOpen }) => {

    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [pin, setPin] = useState('');
    const [position, setPosition] = useState('Waiter');

    const [nameTouched, setNameTouched] = useState(false);
    const [loginTouched, setLoginTouched] = useState(false);
    const [pinTouched, setPinTouched] = useState(false);
    const [positionTouched, setPositionTouched] = useState(false);

    const [nameError, setNameError] = useState('Поле не може бути пустим');
    const [loginError, setLoginError] = useState('Поле не може бути пустим');
    const [pinError, setPinError] = useState('Поле не може бути пустим');
    const [positionError, setPositionError] = useState('');

    // const { positions } = useSelector(state => state.positions)

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

    const handleLogin = (e) => {
        setLogin(e.target.value);
        const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setLoginError('Невірно веедено логін ')
        } else {
            setLoginError('')
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
        const re = /^[а-яА-ЯҐґЄєІіЇїҐґa-zA-Z\s]+$/

        if (position) {
            setPositionError('')
        }

        if (!re.test(String(position))) {
            setPositionError('Невірно веедено посаду')
        } else {
            setPositionError('')
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                setNameTouched(true);
                break;
            case 'login':
                setLoginTouched(true);
                break;
            case 'pin':
                setPinTouched(true);
                break;
            case 'position':
                setPositionTouched(true);
                break;
            default: ;
        }
    }

    useEffect(() => {
        // dispatch(fetchPositions());
        // if (position) {
        //     setPositionError('')
        // }
    }, [])

    return (
        <div className='flex justify-center '>
            <div className='absolute bg-white shadow-xl w-1/2 h-auto z-10 rounded-md mt-16'>
                <div className='flex flex-col items-center mx-3 gap-3'>
                    <span className='top-2 right-2 absolute cursor-pointer'
                        onClick={() => setOpen(false)}>✖
                    </span>
                    <span className='text-center text-3xl mt-6 text-sky-900 font-semibold'>Ведіть дані нового працівника</span>
                    <ul className='flex flex-col justify-center m-10 w-[35%] gap-3 text-sky-900'>
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
                            <label htmlFor="login" className="block font-medium mb-1 ">Логін</label>
                            <input
                                value={login}
                                onChange={(e) => handleLogin(e)}
                                onBlur={(e) => { blurHandler(e) }}
                                type="text"
                                name="login"
                                id="login"
                                className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-black" required />
                            {(loginTouched && loginError) && <div className="text-red-600">{loginError}</div>}
                        </li>
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
                        </li> : null}
                    </ul>

                    <button disabled={nameError || loginError || positionError} className="flex items-center bg-teal-700 hover:bg-teal-800 rounded-lg mb-7 mx-[30%] px-7 py-2 text-white font-medium drop-shadow-md disabled:bg-teal-900/20 disabled:hover:bg-teal-900/20 disabled:text-gray-100 disabled:cursor-not-allowed"
                        onClick={async () => {
                            setOpen(false);
                            // await addEmployee(name, login, pin, position);
                            // dispatch(fetchEmployees());
                        }}
                    >Підтвердити
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddEmployee;