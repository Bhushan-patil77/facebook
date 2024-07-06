import { useEffect, useState } from 'react'
import './App.css'
import Signup from './Signup'
import Login from './Login'
import Navbar from './Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './home/Home'
import Friends from './friends/Friends'
import Groups from './groups/Groups'
import ProtectedRoute from './ProtectedRoute' // Correct import

function App() {
  const location = useLocation()
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('user') !== null)

  useEffect(() => {
    console.log(loggedIn)
  }, [loggedIn]) // Add loggedIn to the dependency array

  const shouldShowNavbar = location.pathname !== '/Login' && location.pathname !== '/Signup'

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/Friends' element={<Friends />} />
          <Route path='/Groups' element={<Groups />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
