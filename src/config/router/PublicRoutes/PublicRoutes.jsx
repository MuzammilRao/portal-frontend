import React from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
export const PublicRoutes = () => {

    const { userAuth } = useSelector((state) => state.auth)

    return !userAuth ? <Outlet /> : <Navigate to="/dashboard" />
}

