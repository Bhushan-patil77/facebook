import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

function ProtectedRout() {
    const navigate = useNavigate()
    const loggedIn = localStorage.getItem('user')!=null;

  return loggedIn ? <Outlet/> : navigate('/Login')
}

export default ProtectedRout