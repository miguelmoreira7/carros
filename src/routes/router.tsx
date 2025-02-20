import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import LoginAndRegister from "../pages/LoginAndRegister";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/loginOrRegister',
                element: <LoginAndRegister/>
            },
        ]

    }
])