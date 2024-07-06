import React, { useEffect, useRef, useState } from 'react'
import logoImage from './assets/facebookicon.png'
import { IoIosArrowForward, IoIosSearch } from 'react-icons/io'
import { CgMenuGridO } from 'react-icons/cg'
import { FaFacebookMessenger, FaUserFriends } from 'react-icons/fa'
import { GoBellFill, GoHomeFill } from 'react-icons/go'
import { BiSolidUser } from 'react-icons/bi'
import { HiMiniUserGroup } from 'react-icons/hi2'
import { Link, useNavigate } from 'react-router-dom'
import userIcon from './assets/user.png'
import settingsAndPrivacyIcon from './assets/settingsIcon.png'
import helpAndSupportIcon from './assets/help&SupportIcon.png'
import displayAndAccessibilityIcon from './assets/display&accessibilityicon.png'
import giveFeedbackIcon from './assets/giveFeedbackIcon.png'
import logoutIcon from './assets/logoutIcon.png'
import Login from './Login'


function Navbar() {
  const [active, setActive] = useState(false);
  const [parent, setParent] = useState(null);
  const [child, setChild] = useState(null);
  const profileDropdown = useRef()

  const [activeLink , setActiveLink]=useState('/')
  const [isLoggedIn, setIsLoggedIn]=useState(localStorage.getItem('user')!==null);
  const [user, setUser]=useState(JSON.parse(localStorage.getItem('user')))

  const navigate = useNavigate()

  useEffect(()=>{
    setIsLoggedIn(localStorage.getItem('user')!=null)
  })

  useEffect(()=>{
    navigate(`${activeLink}`)
  },[activeLink])

  
  useEffect(() => {
    const handleClick = (e) => {
      if (child && !child.current.contains(e.target) && e.target !== parent) {
        setActive(false);
        setChild(null);
        setParent(null);
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [child, parent]);

  useEffect(()=>{
    // console.log(isLoggedIn);
  },[isLoggedIn])



  const handleButtonClick = (e, childRef) => {
    if (childRef.current !== child) {
      setParent(e.target);
      setChild(childRef);
      setActive(true);
    } else {
      setActive(!active);
    }
  };

  const handleLogout = () =>{
     
    setChild(null)
    setParent(null)
    setActive(false)

    localStorage.removeItem('user')

    navigate('/Login')

  }



  return (


    <div className='flex justify-between items-center px-4 bg-white w-screen h-[56px]'>

          <div className='left flex gap-4'>
            <img className=' w-[40px] h-[40px] rounded-full' src={logoImage} alt="" />
            <div className='w-[240px] h-[40px] flex items-center justify-center p- border rounded-3xl bg-[#f0f2f5]'><IoIosSearch className='text-xl text-gray-400' /> <input className='bg-transparent outline-none text-lg  pl-3 w-[80%]' type="text" placeholder='Search Facebook' /> </div>
          </div>

          <div className="center flex h-full ">
            <div  className='relative flex justify-center items-center  w-[111px] h-full cursor-pointer' onClick={()=>{setActiveLink('/')}}>   <GoHomeFill className={`w-[30px] h-[30px]  cursor-pointer transition-all duration-300 ${activeLink == '/' ? 'text-blue-500' : 'text-gray-400'}`}/>               <span className={`absolute bg-blue-500 w-full h-1 rounded-full -bottom-1 opacity-0 transform transition-all duration-300 ${activeLink === '/' ? 'bottom-0 opacity-100' : ''} `}/>  </div>  
            <div className='relative flex justify-center items-center  w-[111px] h-full cursor-pointer' onClick={()=>{setActiveLink('/Friends')}}> <FaUserFriends className={`w-[30px] h-[30px] cursor-pointer transition-all duration-300 ${activeLink == '/Friends' ? 'text-blue-500' : 'text-gray-400'}`}/> <span className={`absolute bg-blue-500 w-full h-1 rounded-full -bottom-1 opacity-0 transform transition-all duration-300 ${activeLink === '/Friends' ? 'bottom-0 opacity-100' : ''} `}/> </div> 
            <div className='relative flex justify-center items-center  w-[111px] h-full cursor-pointer' onClick={()=>{setActiveLink('/Groups')}}> <HiMiniUserGroup className={`w-[30px] h-[30px]  cursor-pointer transition-all duration-300 ${activeLink == '/Groups' ? 'text-blue-500' : 'text-gray-400'}`}/> <span className={`absolute bg-blue-500 w-full h-1 rounded-full -bottom-1 opacity-0 transform transition-all duration-300 ${activeLink === '/Groups' ? 'bottom-0 opacity-100' : ''} `}/> </div> 
          </div>

          <div className="right flex gap-3">
           
           {
                       isLoggedIn && <div className={`relative flex justify-center items-center gap-3 cursor-pointer transition-all duration-700 ${isLoggedIn ? 'opacity-100' : 'opacity-0'}`}  onClick={(e)=>{handleButtonClick(e, profileDropdown)}}>
                                          <span className='font-semibold opacity-0 mountAnimation'>{user.name}</span> <div className="flex justify-center items-center bg-[#e4e6eb] w-[40px] h-[40px] rounded-full opacity-0 mountAnimation"><BiSolidUser className='w-[70%] h-[70%] text-white' /> </div>
                                          <div ref={profileDropdown} className={`profileDropdown absolute w-[344px] -right-[160px] bg-white rounded-lg shadow top-[120%] cursor-pointer ${child === profileDropdown && active ? 'showFromTop' : 'hideFromBottom'}`}>

                                              <div className='flex justify-center m-3'>
                                                <div className="flex flex-col p-3 gap-3 w-full shadow rounded-lg">
                                                  <div className='flex gap-3'> <div className='flex items-center gap-3 rounded-lg  hover:bg-slate-100 relative '> <span className='flex justify-center items-center w-[40px] h-[40px] bg-gray-200 rounded-full'> <BiSolidUser className='w-[60%] h-[60%] text-white'/> </span>  <p className='text-lg '> {user.name} </p> </div> </div> 
                                                  <div className='border-[0.5px]'/>
                                                  <div className='font-semibold text-blue-400'>See all profiles</div>
                                                </div>
                                              </div>

                                              <ul>
                                                  <li className='flex items-center gap-3 rounded-lg p-2 hover:bg-slate-100 relative '> <span className='flex justify-center items-center w-[40px] h-[40px] bg-gray-200 rounded-full'> <img className='flex justify-center items-center w-[20px] h-[20px]' src={settingsAndPrivacyIcon} alt="" />  </span>  <p className='text-lg '>Settings & privacy</p> <IoIosArrowForward className='absolute right-1' /></li>
                                                  <li className='flex items-center gap-3 rounded-lg p-2 hover:bg-slate-100 relative '> <span className='flex justify-center items-center w-[36px] h-[36px] bg-gray-200 rounded-full'> <img className='flex justify-center items-center w-[20px] h-[20px]' src={helpAndSupportIcon} alt="" />  </span>  <p className='text-lg '>Help & support</p> <IoIosArrowForward className='absolute right-1' /></li>
                                                  <li className='flex items-center gap-3 rounded-lg p-2 hover:bg-slate-100 relative '> <span className='flex justify-center items-center w-[36px] h-[36px] bg-gray-200 rounded-full'> <img className='flex justify-center items-center w-[20px] h-[20px]' src={displayAndAccessibilityIcon} alt="" />  </span>  <p className='text-lg '>Display & accessibility</p> <IoIosArrowForward className='absolute right-1' /></li>
                                                  <li className='flex items-center gap-3 rounded-lg p-2 hover:bg-slate-100 relative '> <span className='flex justify-center items-center w-[36px] h-[36px] bg-gray-200 rounded-full'> <img className='flex justify-center items-center w-[20px] h-[20px]' src={giveFeedbackIcon} alt="" />  </span>  <p className='text-lg '>Give feedback</p> </li>
                                                  <li className='flex items-center gap-3 rounded-lg p-2 hover:bg-slate-100 relative ' onClick={()=>{handleLogout()}}> <span className='flex justify-center items-center w-[36px] h-[36px] bg-gray-200 rounded-full'> <img className='flex justify-center items-center w-[20px] h-[20px]' src={logoutIcon} alt="" />  </span>  <p className='text-lg '  >Log out</p> </li>
                                              </ul>
                                          </div> 
                                      </div>
           } 


            <div className="flex justify-center items-center bg-[#e4e6eb] w-[40px] h-[40px] rounded-full"> <CgMenuGridO className='w-[70%] h-[70%]' /> </div>
            <div className="flex justify-center items-center bg-[#e4e6eb] w-[40px] h-[40px] rounded-full"> <FaFacebookMessenger className='w-[50%] h-[50%]' /> </div>
            <div className="flex justify-center items-center bg-[#e4e6eb] w-[40px] h-[40px] rounded-full"> <GoBellFill className='w-[70%] h-[70%]' /> </div>
          </div>

    </div>

  
  )
}

export default Navbar