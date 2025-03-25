import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AllUser from "../components/AllUsers/AllUser";
import Edit from "../components/Edit/Edit";
import Login from "../components/Login/Login";
import UserDasboard from "../components/UserDasboard/UserDasboard";
import ProtectedRoute from "../components/ProtectedRoute";
// import ProtectedRoute from "../components/ProtectedRoute";

export let router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />
        },
        {
            path: "/userlist",
            element: <AllUser />

        }, {
            path: "/*",
            element: <h1>404 page not found</h1>
        },
        {
            path: "/edituser",
            element: <Edit />
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/dasboard",
            element: <UserDasboard />


        }
    ]
);