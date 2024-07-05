import { useEffect, useState } from 'react'
import './App.css'
import Signup from './Signup'
import Login from './Login'
import Navbar from './Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './home/Home'
import Friends from './friends/Friends'
import Groups from './groups/Groups'
import ProtectedRout from './ProtectedRout'

function App() {
  const location = useLocation()
  const [loggedIn, setLoggedIn]=useState(localStorage.getItem('user')!==null)

  useEffect(()=>{
    console.log(loggedIn);
  },[])

  return (
    <>
      
      <Navbar/>
      <Routes>

        <Route path='/Login' element={<Login/>} />

        <Route element={<ProtectedRout/>}>
          <Route path='/' element={<Home/>} />
          <Route path='/Friends' element={<Friends/>} />
          <Route path='/Groups' element={<Groups/>} />
        </Route>
 
      </Routes>
      
    </>
  )
}

export default App
