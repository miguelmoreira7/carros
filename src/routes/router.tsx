import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import LoginAndRegisterForm from "../components/LoginAndRegisterForm";

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
                element: <LoginAndRegisterForm/>
            },
        ]

    }
])