import { createBrowserRouter } from "react-router-dom";

import Login from "../feature/auth/pages/Login.jsx";
import Signup from "../feature/auth/pages/Signup.jsx";
import Public from "../feature/auth/components/Public.jsx";
import Protected from "../feature/auth/components/Protected.jsx";
import Dashboard from "../feature/chat/Pages/Dashboard.jsx";


export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Protected>
                <Dashboard/>
            </Protected>
        ),
    },
    {
        path: "/login",
        element: (
            <Public>
                <Login />
            </Public>
        ),
    },
    {
        path: "/signup",
        element: (
            <Public>
                <Signup />
            </Public>
        ),
    },
]);