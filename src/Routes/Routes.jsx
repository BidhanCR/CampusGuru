import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Main from "../Layout/Main";
import Register from "../components/Register";
import Login from "../components/Login";
import ErrorPage from "../pages/ErrorPage";
import Colleges from "../pages/Colleges";
import CollegeDetails from "../pages/CollegeDetails";
import Admission from "../pages/Admission";
import MyCollege from "../pages/MyCollege";
import Profile from "../components/Profile";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage/>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/colleges", element: <Colleges /> },
      { path: "/college/:id", element: <CollegeDetails /> },
      { path: "/admission", element: <PrivateRoute><Admission /></PrivateRoute> },
      { path: "/my-college", element: <PrivateRoute><MyCollege /></PrivateRoute> },
      { path: "/profile", element: <PrivateRoute><Profile /></PrivateRoute> },
    ],
  },
]);

export default router;
