import Error404 from "@/pages/404";
import { AppLayout } from "@/pages/_layouts/app";
import { AuthLayout } from "@/pages/_layouts/auth";
import { Dashboard } from "@/pages/app/dashboard/dashboard";
import { Orders } from "@/pages/app/orders/orders";
import { SignIn } from "@/pages/auth/SignIn";
import { SignUp } from "@/pages/auth/SignUp";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([

    { 
        path: '/' , 
        element: <AppLayout/> , 
        errorElement: <Error404/>,
        children: [
            { path: '/', element: <Dashboard/> },
            { path: '/orders', element: <Orders/> },
    ]},
    { 
        path: '/' , 
        element: <AuthLayout/> , 
        children: [
            { path: '/sign-in', element: <SignIn/>},
            { path: '/sign-up', element: <SignUp/>},
        ]}
])