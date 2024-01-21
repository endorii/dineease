import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Statistic from '../assets/svg/statistic.svg';
import Finances from '../assets/svg/finances.svg';
import Menu from '../assets/svg/menu.svg';
import Access from '../assets/svg/access.svg';
import Settings from '../assets/svg/settings.svg';
import User from '../assets/svg/user.svg';
import { NavLink, Outlet } from 'react-router-dom';
import { auth } from '../actions/user.actions';
import toast, { Toaster } from 'react-hot-toast';

const NestedItem = ({ item }) => (
    <div className="px-1 mt-3 text-blue-600 text-lg font-medium text-sky-100">
        <NavLink className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "border-b-2" : "font-light"
        } to={item.path}>{item.title}</NavLink>
    </div>
);

const AccordionItem = ({ title, children, icon, menuOpen, setMenuOpen }) => {
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(auth());
    }, []);

    useEffect(() => {
        if (!menuOpen) {
            setOpen(false);
        }
    }, [menuOpen]);

    return (
        <li className="hover:bg-sky-900/30 hover:shadow-md py-2 transition ease-out hover:ease-in rounded-md">
            <div className='cursor-pointer' onClick={() => setMenuOpen(true)}>
                <img src={icon} alt="" className='inline w-6' />

                <div className="px-3 py-2 inline text-lg font-medium " onClick={() => children ? setOpen(!open) : null}>
                    {menuOpen ? title : null} {' '}
                    {children && menuOpen ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`transform transition duration-150 ease-out h-3 w-3 inline ${open ? 'rotate-180' : ''}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                    </svg> : null}
                </div>
            </div>

            {open && <div className="pl-8 pb-2 flex flex-col gap-1">{children}</div>}
        </li>
    )
}

const Accordion = ({ menuOpen, setMenuOpen }) => {

    const { user } = useSelector(state => state.user);
    const items = [
        {
            title: "Статистика", icon: Statistic, children:
                [
                    { title: "Продажі", path: "sales" },
                ]
        },
        {
            title: "Фінанси", icon: Finances, children:
                [
                    { title: "Чеки", path: "checks" },
                ]
        },
        {
            title: "Меню", icon: Menu, children:
                [
                    { title: "Товари", path: "dishes" },
                ]
        },
        {
            title: "Персонал", icon: Access, children:
                [
                    { title: "Працівники", path: "employees" },
                    // { title: "Посади", path: "positions" },
                    { title: "Зв'язок", path: "feedback" },
                    { title: "Потреби", path: "needs" }
                ]
        },

        {
            title: "Аккаунт", icon: Settings, children:
                [
                    { title: "Налаштування", path: "settings" },
                    { title: "Інформація", path: "information" },
                    // { title: "Сповіщення", path: "notifications" },
                ]
        }
    ];

    return (
        <div className='flex flex-col justify-between items-center h-[88vh]'>
            <ul className="w-full max-w-md mx-auto mt-4 flex flex-col gap-6 text-blue-00">
                {items.map((item, index) => (
                    <AccordionItem key={index} title={item.title} icon={item.icon} menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
                        {item.children?.map((item, index) => (
                            <NestedItem key={index} item={item} />
                        ))}
                    </AccordionItem>
                ))}
            </ul>
            <button onClick={() => setMenuOpen(true)}>
                <div className='text-black p-3 flex items-center'>
                    <div>
                        <img className='w-8' src={User} alt="" />
                    </div>
                    <div className=''>
                        <div className='text-sky-50 text-lg font-medium'>
                            {user.name}
                        </div>
                    </div>
                </div>
            </button>
        </div>
    )
}

const Account = () => {

    const [menuOpen, setMenuOpen] = useState(true)

    return (
        <div className="fixed flex w-screen h-screen">
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <aside className={menuOpen ? " text-white w-[220px] h-screen bg-sky-950 p-7 border-slate-300 overflow-auto shadow-3xl zindex-10" : "shadow-3xl text-white w-[85px] h-screen bg-sky-950 p-7 border-r border-slate-300"}>
                <div>
                    <svg onClick={() => setMenuOpen(!menuOpen)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`mb-6 h-6 w-6 inline transform transition duration-150 cursor-pointer ease-out ${menuOpen ? 'rotate-90' : 'rotate-[260deg]'}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                    </svg>
                </div>
                <Accordion menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

            </aside>
            <main className="flex-1">
                <div className="bg-slate-100 p-10 h-screen">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default Account;
