import { useEffect, useState } from 'react'
import './App.css'
import Signup from './Signup'
import Login from './Login'
import Navbar from './Navbar'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Home from './home/Home'
import Friends from './friends/Friends'
import Groups from './groups/Groups'
import ProtectedRoute from './ProtectedRoute' 
import Profile from './Profile'
import Pages from './pages/Pages'
import Create from './pages/Create'
import Page from './pages/Page'

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('user') !== null)
  const [searchInput, setSearchInput]=useState();
  const [isSearching, setIsSearching]=useState()
  const [field, setField ]=useState('Author.name')




  useEffect(()=>{
 
    localStorage.setItem('path', location.pathname)
  },[location.pathname])


  const shouldShowNavbar = location.pathname !== '/Login' && location.pathname !== '/Signup'

  return (
    <div className='w-screen h-screen overflow-y-auto no-scrollbar'>
      {shouldShowNavbar && <Navbar setSearchInput={setSearchInput} setField={setField} setIsSearching={setIsSearching}/>}
      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Home searchInput={searchInput} field={field} isSearching={isSearching} setIsSearching={setIsSearching}/>} />
          <Route path='/Friends' element={<Friends />} />
          <Route path='/Groups' element={<Groups />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path='/Pages' element={<Pages />} />
          <Route path='/Page' element={<Page />} />
          <Route path='/Create' element={<Create />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
