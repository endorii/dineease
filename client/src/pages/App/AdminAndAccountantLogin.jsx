import { useEffect, useState } from "react";
import { GoBackButton } from "../../ui/buttons/GoBackButton";
import { auth, loginByPass } from "../../actions/user.actions";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import withHelmet from "../../utils/helpers/withHelmet";

const AdminAndAccountantLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [emailError, setEmailError] = useState("Email не може бути пустим");
    const [passwordError, setPasswordError] = useState(
        "Пароль не може бути пустим"
    );

    const dispatch = useDispatch();
    const { restaurantId, position } = useParams();

    const emailHandler = (e) => {
        setEmail(e.target.value);
        const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError("Невірно веедено email ");
        } else {
            setEmailError("");
        }
    };

    const passwordHandler = (e) => {
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

    const blurHandler = (e) => {
        switch (e.target.name) {
            case "email":
                setEmailTouched(true);
                break;
            case "password":
                setPasswordTouched(true);
                break;
            default:
        }
    };

    const routeChange = () => {
        return navigate(`/${restaurantId}/${position}/panel/sales`);
    };

    const navigate = useNavigate();

    useEffect(() => {}, []);

    return (
        <div className="flex justify-center items-center w-screen h-screen px-6 py-12 text-sky-900 bg-gray-200">
            <Toaster position="top-right" reverseOrder={false} />
            <GoBackButton />
            <div className="bg-white p-10 rounded-xl shadow-xl">
                <div className="mx-auto w-full">
                    <h2 className="text-center text-4xl leading-9 tracking-tight">
                        Увійти в свій акаунт
                    </h2>
                </div>

                <div className="mt-10 flex justify-center">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label
                                htmlFor="email"
                                className="block font-medium leading-6 text-lg"
                            >
                                Електронна адреса (Email)
                            </label>
                            <div className="mt-2">
                                <input
                                    value={email}
                                    onChange={(e) => emailHandler(e)}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="pl-3 block w-full h-12 text-xl rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                                    onBlur={(e) => blurHandler(e)}
                                />
                            </div>
                            {emailTouched && emailError && (
                                <div className="text-yellow-700">
                                    {emailError}
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block font-medium leading-6 text-lg"
                                >
                                    Пароль
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    value={password}
                                    onChange={(e) => passwordHandler(e)}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="pl-3 text-xl block w-full h-12 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                                    onBlur={(e) => blurHandler(e)}
                                />
                            </div>
                            {passwordTouched && passwordError && (
                                <div className="text-yellow-700">
                                    {passwordError}
                                </div>
                            )}
                        </div>

                        <div>
                            <button
                                onClick={async (e) => {
                                    e.preventDefault();
                                    dispatch(
                                        loginByPass(
                                            restaurantId,
                                            email,
                                            password,
                                            routeChange,
                                            position
                                        )
                                    );
                                }}
                                disabled={emailError || passwordError}
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-teal-800 px-3 py-3 text-md font-semibold leading-6 text-white shadow-sm hover:bg-teal-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-900 disabled:bg-teal-700/50 disabled:cursor-not-allowed"
                            >
                                Увійти
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default withHelmet(AdminAndAccountantLogin, "Увійти в свій акаунт");
