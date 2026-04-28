import { createBrowserRouter } from "react-router-dom";
import Home from "../features/auth/pages/Home";
import Login from "../features/auth/pages/Login";
import Signup from "../features/auth/pages/Signup";
import Public from "../features/auth/components/Public";
import Protected from "../features/auth/components/Protected";
import Dashboard from "../features/chat/Pages/Dashboard";


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