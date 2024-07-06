import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const isLoggedIn = localStorage.getItem('user') !== null

  return isLoggedIn ? <Outlet /> : <Navigate to="/Login" />
}

export default ProtectedRoute
