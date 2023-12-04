import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store';
import { Login } from './components/Login';
import { ChooseRestaurant } from './components/ChooseRestaurant';
import { LoginAs } from './components/LoginAs';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<ChooseRestaurant />}></Route>
            <Route path='login/:restaurant' element={<LoginAs />}></Route>
            <Route path='login/:restaurant/:position' element={<Login />}></Route>
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

