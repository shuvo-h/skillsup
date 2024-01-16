import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminLayout from "../components/layout/AdminLayout";
import {  adminRoutes } from "./admin.routes";

const routerList = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "about",
                element: <About />
            },
            {
                path: "contact",
                element: <Contact />
            },
        ],
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [...adminRoutes],
    },
    {
        path: "/faculty",
        element: <App />,
        // children: [...adminRoutes],
    },
    {
        path: "/student",
        element: <AdminLayout />,
        // children: [...adminRoutes],
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
];

export const router = createBrowserRouter(routerList);