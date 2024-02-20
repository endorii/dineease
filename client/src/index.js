import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store';
import { Login } from './components/Login';
import { ChooseRestaurant } from './components/ChooseRestaurant';
import { LoginAs } from './components/LoginAs';
import Account from './components/Account';
import { Orders } from './components/Orders';
import { Tables } from './components/Tables';
import { CurrentEmployeeAccount } from './components/CurrentEmployeeAccount';
import { Service } from './components/Service';
import { Checks } from './pages/Statistis/Checks/Checks';
import Employees from './pages/Access/Employees/Employees';
import Dishes from './pages/Menu/Dishes/Dishes';
import { Needs } from './components/Needs';
import { Feedback } from './components/Feedback';
import UserAccount from './components/UserAccount';
import { Sales } from './components/Sales';
import AccountantPanel from './components/AccountantPanel';
import { AccountantEmployees } from './components/AccountantEmployees';

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

