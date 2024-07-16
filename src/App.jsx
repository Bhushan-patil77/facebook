import { useEffect, useState } from 'react'
import './App.css'
import Signup from './Signup'
import Login from './Login'
import Navbar from './Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './home/Home'
import Friends from './friends/Friends'
import Groups from './groups/Groups'
import ProtectedRoute from './ProtectedRoute' 

function App() {
  const location = useLocation()
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('user') !== null)
  const [searchInput, setSearchInput]=useState();
  const [field, setField ]=useState('Author.name')

  useEffect(() => {
    console.log(loggedIn)
  }, [loggedIn]) 

  const shouldShowNavbar = location.pathname !== '/Login' && location.pathname !== '/Signup'

  return (
    <>
      {shouldShowNavbar && <Navbar setSearchInput={setSearchInput} setField={setField} />}
      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Home searchInput={searchInput} field={field}/>} />
          <Route path='/Friends' element={<Friends />} />
          <Route path='/Groups' element={<Groups />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
