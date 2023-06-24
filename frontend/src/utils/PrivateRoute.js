import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'

const PrivateRoute = () => {
    const isAuthenticated = false
  return !isAuthenticated ? <Navigate to="/login" /> : <Outlet/>
}

export default PrivateRoute;