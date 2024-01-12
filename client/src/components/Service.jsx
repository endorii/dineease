import { NavLink, Outlet, useNavigate } from "react-router-dom"
// import Notification from '../assets/icons/notification.svg';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "../actions/user.actions";


export const Service = () => {
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        
        dispatch(auth());

        if (!token) {
            navigate('/')
        }
    }, [token])

    return (
        <div className="fixed flex flex-col text-white justify-center w-screen">
            <aside className="text-blue-100">
                <div className="h-16 bg-sky-950">
                    <div className="flex justify-between items-center">
                        <ul className="flex items-center text-lg">
                            <li>
                                <NavLink className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "p-5 text-center bg-sky-50 text-sky-950 rounded-t-md " : "p-5 text-center hover:bg-sky-50 hover:text-sky-950 text-sky-50 transition ease-out hover:ease-in rounded-t-md"
                                } to="orders" >Замовлення</NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "p-5 text-center bg-sky-50 text-sky-950 rounded-t-md " : "p-5 text-center hover:bg-sky-50 hover:text-sky-950 text-sky-50 transition ease-out hover:ease-in rounded-t-md"
                                } to="tables" >Столи</NavLink>
                            </li>
                        </ul>
                        <div className="flex text-lg">
                            {/* <div className="p-4 text-center hover:bg-sky-900">
                                <img className="w-9" src={Notification} alt="" />
                            </div> */}
                            <div className="p-5 text-center font-medium">
                                <NavLink className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "p-5 text-center bg-sky-50 text-sky-950 rounded-t-md " : "p-5 text-center hover:bg-sky-50 hover:text-sky-950 text-sky-50 transition ease-out hover:ease-in rounded-t-md"
                                } to="account">
                                    {user.name}
                                </NavLink>
                            </div>
                            <div className="p-5 border-r-0 text-center hover:bg-sky-900 flex items-center" >
                                {/* {isAuth ? <img className=" h-2" src={GreenDot} alt="" /> : <img className=" h-2" src={RedDot} alt="" />} */}
                                </div>
                        </div>
                    </div>
                </div>
            </aside>
            <main className="">
                <div className="bg-slate-100 text-black">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}