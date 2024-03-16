import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import './index.css';
import 'react-calendar/dist/Calendar.css';
import { Provider } from 'react-redux';
import store from './store/store';
import { Login } from './pages/App/Login';
import { ChooseRestaurant } from './pages/App/ChooseRestaurant';
import { LoginAs } from './pages/App/LoginAs';
import Account from './pages/Admin/Account';
import { Orders } from './pages/Waiter/Orders/Orders';
import { Tables } from './pages/Waiter/Tables/Tables';
import { CurrentEmployeeAccount } from './pages/Waiter/Account/CurrentEmployeeAccount';
import { Service } from './pages/Waiter/Service';
import { Checks } from './pages/Admin/Finances/Checks/Checks';
import Employees from './pages/Admin/Staff/Employees/Employees';
import Dishes from './pages/Admin/Menu/Dishes/Dishes';
import { Needs } from './pages/Admin/Staff/Needs/Needs';
import { Feedback } from './pages/Admin/Staff/Feedback/Feedback';
import UserAccount from './pages/Admin/Account/Information/UserAccount';
import { Sales } from './pages/Admin/Statistis/Sales/Sales';
import AccountantPanel from './pages/Accountant/AccountantPanel'
import { AccountantEmployees } from './pages/Accountant/AccountantEmployees';


const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<ChooseRestaurant />}></Route>
            <Route path='login/:restaurantId' element={<LoginAs />}></Route>
            <Route path='login/:restaurantId/:position' element={<Login />}></Route>
            <Route path=':restaurantId/Waiter/panel' element={<Service />}>
                <Route path='orders' element={<Orders />} />
                <Route path='tables' element={<Tables />} />
                <Route path='account' element={<CurrentEmployeeAccount />} />
            </Route>
            <Route path=':restaurantId/Admin/panel' element={<Account />}>
                <Route path='sales' element={<Sales />} />
                <Route path='checks' element={<Checks />} />
                <Route path='dishes' element={<Dishes />} />
                <Route path='employees' element={<Employees />} />
                <Route path='positions' element={<Checks />} />
                <Route path='feedback' element={<Feedback />} />
                <Route path='needs' element={<Needs />} />
                {/* <Route path='settings' element={<Checks />} /> */}
                <Route path='information' element={<UserAccount />} />

            </Route>
            <Route path=':restaurantId/Accountant/panel' element={<AccountantPanel />}>
                <Route path='sales' element={<Sales />} />
                <Route path='checks' element={<Checks />} />
                <Route path='hours' element={<Dishes />} />
                <Route path='employees' element={<AccountantEmployees />} />
                <Route path='information' element={<UserAccount />} />
            </Route>
        </>
    )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);

