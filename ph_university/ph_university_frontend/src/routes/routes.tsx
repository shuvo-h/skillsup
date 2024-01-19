import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminLayout from "../components/layout/AdminLayout";
import { routeGenerator } from "../utilities/routesGenerator";
import { adminPaths } from "./admin.routes";
import { facultyPaths } from "./faculty.routes";
import { studentPaths } from "./student.routes";

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
        children: routeGenerator(adminPaths),
    },
    {
        path: "/faculty",
        element: <App />,
        children: routeGenerator(facultyPaths),
    },
    {
        path: "/student",
        element: <AdminLayout />,
        children: routeGenerator(studentPaths),
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