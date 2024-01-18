import { Navigate } from "react-router";
import React from 'react';

const ProtectedRoutes = ({children, redirectTo, user}) => {
    if (user.rol === "admin" || user.rol === "super_admin"){
        return children;
    }else { return <Navigate to="/" /> };
}

export default ProtectedRoutes;