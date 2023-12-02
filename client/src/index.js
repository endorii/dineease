import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store';
import { ChooseRestaurant } from './components/ChooseRestaurant';
import App from './App';
import { ChooseLoginMethod } from './components/ChooseLoginMethod';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<App />}>
                <Route path='choose/restaurant' element={<ChooseRestaurant /> }/>
                <Route path='choose/login-method' element={<ChooseLoginMethod />} />
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

