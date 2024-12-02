import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home";
import Cards from "../Pages/Cards";
import AddCards from "../Pages/AddCards";
import SignOut from "../Pages/SignOut";
import Update from "../Pages/Update";
import Login from "../Pages/Login";
import PrivateRoute from "../Private/PrivateRoute";
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        {
            path: '/',
            element: <Home></Home>,
        },
        {
            path: 'cards',
            element: <PrivateRoute><Cards></Cards></PrivateRoute>,
            loader: () => fetch('https://conceptual-server-smoky.vercel.app/schedule')
        },
        {
            path: 'addCards',
            element:<PrivateRoute><AddCards></AddCards></PrivateRoute>,
        },
        {
            path: 'sign',
            element: <SignOut></SignOut>
        },
        {
            path: '/update/:id',
            element: <Update></Update>,
            loader: ({params}) => fetch(`https://conceptual-server-smoky.vercel.app/schedule/${params.id}`)
        },
        {
            path: 'login',
            element: <Login></Login>,
        }

      ]
    },
  ]);
  export default router