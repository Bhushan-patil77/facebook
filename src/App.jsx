import { useEffect, useState } from 'react'
import './App.css'
import Signup from './Signup'
import Login from './Login'
import Navbar from './Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './home/Home'
import Friends from './friends/Friends'
import Groups from './groups/Groups'

function App() {
  const location = useLocation()
  console.log(location.state);
  const [loggedIn, setLoggedIn]=useState()

  useEffect(()=>{
    setLoggedIn(localStorage.getItem('user')!=null)
  },[])

  return (
    <>
       {
        localStorage.getItem('user')!=null && <Navbar/>
       }

      <Routes>

        <Route path='/Signup' element={<Signup/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/' element={<Home/>} />
        <Route path='/Friends' element={<Friends/>} />
        <Route path='/Groups' element={<Groups/>} />

      </Routes>
    </>
  )
}

export default App
