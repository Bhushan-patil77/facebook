import React, { useEffect, useRef, useState } from 'react'
import logoImage from './assets/facebookicon.png'
import { IoIosArrowForward, IoIosArrowRoundBack, IoIosSearch, IoMdArrowRoundBack, IoMdMenu, IoMdPhotos } from 'react-icons/io'
import { CgMenuGridO } from 'react-icons/cg'
import { FaFacebookMessenger, FaFlag, FaPlaceOfWorship, FaUserFriends } from 'react-icons/fa'
import { GoBellFill, GoHomeFill } from 'react-icons/go'
import { BiSolidUser, BiSolidVideos } from 'react-icons/bi'
import { HiMiniUserGroup } from 'react-icons/hi2'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import userIcon from './assets/user.png'
import settingsAndPrivacyIcon from './assets/settingsIcon.png'
import helpAndSupportIcon from './assets/help&SupportIcon.png'
import displayAndAccessibilityIcon from './assets/display&accessibilityicon.png'
import giveFeedbackIcon from './assets/giveFeedbackIcon.png'
import logoutIcon from './assets/logoutIcon.png'
import friendsIcon from './assets/friends.png'
import Login from './Login'
import { FaCircleQuestion } from 'react-icons/fa6'
import Friends from './friends/Friends'
import { BsGridFill, BsPeopleFill } from 'react-icons/bs'
import { RiFlagFill, RiMessengerFill, RiPagesFill, RiTriangleFill } from 'react-icons/ri'
import { MdGroups } from 'react-icons/md'
import { TiFlag } from 'react-icons/ti'
import { TbSearch } from 'react-icons/tb'
import { AiFillShop } from 'react-icons/ai'


function Navbar({ setSearchInput, setField, setIsSearching }) {
  const location = useLocation()

  const path = localStorage.getItem('path')
  const [inputText, setInputText] = useState()
  const [searchField, setSearchField] = useState('author.namez')

  const [active, setActive] = useState(false);
  const [parent, setParent] = useState(null);
  const [child, setChild] = useState(null);
  const profileDropdown = useRef()
  const profileDropdownM = useRef()
  const filterOptions = useRef()

  const [activeLink, setActiveLink] = useState('/')
  const [activeTab, setActiveTab] = useState(path)
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user') !== null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [profilePhoto, setProfilePhoto] = useState(userIcon)

  const [searchActive, setSearchActive] = useState(false);


  const navigate = useNavigate()

  useEffect(() => {
    setActiveLink(location.pathname)
  }, [location.pathname])

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('user') != null)
  })



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





  const handleButtonClick = (e, childRef) => {
    if (childRef.current !== child) {
      setParent(e.target);
      setChild(childRef);
      setActive(true);
    } else {
      setActive(!active);
    }
  };

  const handleLogout = () => {

    setChild(null)
    setParent(null)
    setActive(false)

    localStorage.clear()

    navigate('/Login')

  }



  return (

    <div className='z-50'>

      <div className='hidden xl:flex justify-between items-center px-4 bg-white w-screen h-[56px] shadow'>

        <div className='left relative flex gap-4'>
          <img className=' w-[40px] h-[40px] rounded-full' src={logoImage} alt="" />
          <div className='w-[240px] h-[40px] flex items-center justify-center p- border rounded-3xl bg-[#f0f2f5]'><IoIosSearch className='text-xl text-gray-400' /> <input className='bg-transparent outline-none text-lg  pl-3 w-[80%]' type="text" placeholder='Search Facebook' value={inputText} onChange={(e) => { navigate('/'); setInputText(e.target.value); setSearchInput(e.target.value) }} onFocus={(e) => { handleButtonClick(e, filterOptions) }} /> </div>
          <div ref={filterOptions} className={`absolute top-[120%] w-full bg-white border rounded-lg p-3 pb-6 boxShadow ${child === filterOptions && active ? 'showFromTop z-60' : 'hideFromBottom'}`}>
            <ul className='flex flex-col gap-3'>
              <li className={`flex items-center gap-4 text-lg font-semibold  cursor-pointer p-2 rounded-lg ${searchField === 'All' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'} ${child === filterOptions && active ? 'showFromTop z-50 delay1' : 'hideFromBottom'} `} onClick={() => { setField('All'); setSearchField('All') }}><BsGridFill /> All</li>
              <li className={`flex items-center gap-4 text-lg font-semibold  cursor-pointer p-2 rounded-lg ${searchField === 'author.name' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'} ${child === filterOptions && active ? 'showFromTop z-50 delay2 ' : 'hideFromBottom'} `} onClick={() => { setField('author.name'); setSearchField('author.name') }}> <BsPeopleFill /> People</li>
              <li className={`flex items-center gap-4 text-lg font-semibold  cursor-pointer p-2 rounded-lg ${searchField === 'Photos' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'} ${child === filterOptions && active ? 'showFromTop z-50 delay4' : 'hideFromBottom'} `} onClick={() => { setField('Photos'); setSearchField('Photos') }}> <IoMdPhotos /> Photos</li>
              <li className={`flex items-center gap-4 text-lg font-semibold  cursor-pointer p-2 rounded-lg ${searchField === 'Videos' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'} ${child === filterOptions && active ? 'showFromTop z-50 delay5' : 'hideFromBottom'} `} onClick={() => { setField('Videos'); setSearchField('Videos') }}> <BiSolidVideos /> Videos</li>
              <li className={`flex items-center gap-4 text-lg font-semibold  cursor-pointer p-2 rounded-lg ${searchField === 'Pages' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'} ${child === filterOptions && active ? 'showFromTop z-50 delay6' : 'hideFromBottom'} `} onClick={() => { setField('Pages'); setSearchField('Pages') }}> <RiPagesFill /> Pages</li>
              <li className={`flex items-center gap-4 text-lg font-semibold  cursor-pointer p-2 rounded-lg ${searchField === 'Places' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'} ${child === filterOptions && active ? 'showFromTop z-50 delay7' : 'hideFromBottom'} `} onClick={() => { setField('Places'); setSearchField('Places') }}> <FaPlaceOfWorship /> Places</li>
              <li className={`flex items-center gap-4 text-lg font-semibold  cursor-pointer p-2 rounded-lg ${searchField === 'Groups' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'} ${child === filterOptions && active ? 'showFromTop z-50 delay8' : 'hideFromBottom'} `} onClick={() => { setField('Groups'); setSearchField('Groups') }}> <MdGroups /> Groups</li>
            </ul>
          </div>
        </div>

        <div className="center flex h-full ">
          <div className='relative flex justify-center items-center  w-[111px] h-full cursor-pointer' onClick={() => { navigate('/') }}>   <GoHomeFill className={`w-[30px] h-[30px]  cursor-pointer transition-all duration-300 ${activeLink == '/' ? 'text-blue-500' : 'text-gray-400'}`} />               <span className={`absolute bg-blue-500 w-full h-1 rounded-full -bottom-1 opacity-0 transform transition-all duration-300 ${activeLink === '/' ? 'bottom-0 opacity-100' : ''} `} />  </div>
          <div className='relative flex justify-center items-center  w-[111px] h-full cursor-pointer' onClick={() => { navigate('/Pages') }}>   <RiFlagFill className={`w-[30px] h-[30px]  cursor-pointer transition-all duration-300 ${activeLink == '/Pages' ? 'text-blue-500' : 'text-gray-400'}`} />     <span className={`absolute bg-blue-500 w-full h-1 rounded-full -bottom-1 opacity-0 transform transition-all duration-300 ${activeLink === '/Pages' ? 'bottom-0 opacity-100' : ''} `} />  </div>
          <div className='relative flex justify-center items-center  w-[111px] h-full cursor-pointer' onClick={() => { navigate('/Friends') }}> <FaUserFriends className={`w-[30px] h-[30px] cursor-pointer transition-all duration-300 ${activeLink == '/Friends' ? 'text-blue-500' : 'text-gray-400'}`} />  <span className={`absolute bg-blue-500 w-full h-1 rounded-full -bottom-1 opacity-0 transform transition-all duration-300 ${activeLink === '/Friends' ? 'bottom-0 opacity-100' : ''} `} /> </div>
          <div className='relative flex justify-center items-center  w-[111px] h-full cursor-pointer' onClick={() => { navigate('/Groups') }}> <HiMiniUserGroup className={`w-[30px] h-[30px]  cursor-pointer transition-all duration-300 ${activeLink == '/Groups' ? 'text-blue-500' : 'text-gray-400'}`} /> <span className={`absolute bg-blue-500 w-full h-1 rounded-full -bottom-1 opacity-0 transform transition-all duration-300 ${activeLink === '/Groups' ? 'bottom-0 opacity-100' : ''} `} /> </div>
        </div>

        <div className="right  flex gap-3">

          {
            isLoggedIn && <div className={`relative flex justify-center items-center gap-3 cursor-pointer transition-all duration-700 ${isLoggedIn ? 'opacity-100' : 'opacity-0'}`} onClick={(e) => { handleButtonClick(e, profileDropdown) }}>
              <span className='font-semibold opacity-0 mountAnimation'>{user.name}</span> <div className="flex justify-center items-center  bg-[#e4e6eb] w-[40px] h-[40px] rounded-full opacity-0 mountAnimation"> <img className=' w-full h-full object-cover rounded-full' src={profilePhoto || userIcon} alt="" /> </div>
              <div ref={profileDropdown} className={`profileDropdown absolute w-[344px] -right-[160px] bg-white rounded-lg shadow top-[120%] cursor-pointer ${child === profileDropdown && active ? 'showFromTop z-50' : 'hideFromBottom'}`}>

                <div className='flex justify-center m-3 '>
                  <div className="flex flex-col p-3 gap-3 w-full shadow rounded-lg">
                    <div className='flex gap-3'> <div className='flex items-center gap-3 rounded-lg  hover:bg-slate-100 relative '> <span className='flex justify-center items-center w-[40px] h-[40px] bg-gray-200 rounded-full'> <BiSolidUser className='w-[60%] h-[60%] text-white' /> </span>  <p className='text-lg '> {user.name} </p> </div> </div>
                    <div className='border-[0.5px]' />
                    <div className='font-semibold text-blue-400'>See all profiles</div>
                  </div>
                </div>

                <ul>
                  <li className='flex items-center gap-3 rounded-lg p-2 hover:bg-slate-100 relative '> <span className='flex justify-center items-center w-[40px] h-[40px] bg-gray-200 rounded-full'> <img className='flex justify-center items-center w-[20px] h-[20px]' src={settingsAndPrivacyIcon} alt="" />  </span>  <p className='text-lg '>Settings & privacy</p> <IoIosArrowForward className='absolute right-1' /></li>
                  <li className='flex items-center gap-3 rounded-lg p-2 hover:bg-slate-100 relative '> <span className='flex justify-center items-center w-[36px] h-[36px] bg-gray-200 rounded-full'> <img className='flex justify-center items-center w-[20px] h-[20px]' src={helpAndSupportIcon} alt="" />  </span>  <p className='text-lg '>Help & support</p> <IoIosArrowForward className='absolute right-1' /></li>
                  <li className='flex items-center gap-3 rounded-lg p-2 hover:bg-slate-100 relative '> <span className='flex justify-center items-center w-[36px] h-[36px] bg-gray-200 rounded-full'> <img className='flex justify-center items-center w-[20px] h-[20px]' src={displayAndAccessibilityIcon} alt="" />  </span>  <p className='text-lg '>Display & accessibility</p> <IoIosArrowForward className='absolute right-1' /></li>
                  <li className='flex items-center gap-3 rounded-lg p-2 hover:bg-slate-100 relative '> <span className='flex justify-center items-center w-[36px] h-[36px] bg-gray-200 rounded-full'> <img className='flex justify-center items-center w-[20px] h-[20px]' src={giveFeedbackIcon} alt="" />  </span>  <p className='text-lg '>Give feedback</p> </li>
                  <li className='flex items-center gap-3 rounded-lg p-2 hover:bg-slate-100 relative ' onClick={() => { handleLogout() }}> <span className='flex justify-center items-center w-[36px] h-[36px] bg-gray-200 rounded-full'> <img className='flex justify-center items-center w-[20px] h-[20px]' src={logoutIcon} alt="" />  </span>  <p className='text-lg '  >Log out</p> </li>
                </ul>
              </div>
            </div>
          }


          <div className="flex justify-center items-center bg-[#e4e6eb] w-[40px] h-[40px] rounded-full"> <CgMenuGridO className='w-[70%] h-[70%]' /> </div>
          <div className="flex justify-center items-center bg-[#e4e6eb] w-[40px] h-[40px] rounded-full"> <FaFacebookMessenger className='w-[50%] h-[50%]' /> </div>
          <div className="flex justify-center items-center bg-[#e4e6eb] w-[40px] h-[40px] rounded-full"> <GoBellFill className='w-[70%] h-[70%]' /> </div>
        </div>

      </div>


      <div className=' xl:hidden flex flex-col justify-between items-center p-2 bg-white w-screen  border-b '>

        <div className='upper relative flex gap-4  w-full justify-between py-1 '>
          {
            searchActive ? <span className={`text-2xl font-bold text-blue-500 flex justify-center items-center  ${searchActive ? '' : 'hidden'}`} onClick={() => { setSearchActive(false); setIsSearching(false); navigate('/') }}><IoMdArrowRoundBack className='' /></span> : <span className={`text-2xl font-bold text-blue-500`}>facebook</span>
          }

          {
            searchActive && <div className={`w-full h-[40px] flex items-center justify-center  border rounded-3xl bg-[#f0f2f5] ${searchActive ? 'opacity-0 mountAnimation' : 'hideToBottom'}`}><IoIosSearch className='text-xl text-gray-400' /> <input className='bg-transparent outline-none text-lg  pl-3 w-[80%]' type="text" placeholder='Search Facebook' value={inputText} onChange={(e) => { navigate('/'); setInputText(e.target.value); setSearchInput(e.target.value); setIsSearching(true) }} onFocus={(e) => { handleButtonClick(e, filterOptions); }} /> </div>

          }


          <div className={`flex justify-center items-center gap-4  ${searchActive ? 'hidden' : 'opacity-0 mountAnimation'}`}>
            <span className={`w-[40px] h-[40px] flex justify-center items-center  rounded-full bg-gray-100 p-2 `} onClick={() => { setSearchActive(true); setIsSearching(true); navigate('/') }}><TbSearch className='w-full h-full' /></span>
            <span className='w-[40px] h-[40px] flex justify-center items-center  rounded-full bg-gray-100 p-2' onClick={(e) => { handleButtonClick(e, profileDropdownM) }}><IoMdMenu className='w-full h-full' /></span>
            <div ref={profileDropdownM} className={`profileDropdown absolute w-full right-0 bg-white rounded-lg boxShadow py-4 top-[100%] cursor-pointer z-100  ${child === profileDropdownM && active ? 'showFromTop' : 'hideFromBottom'}`}>

              <div className='flex justify-center m-3 '>
                <div className="flex flex-col p-3 gap-3 w-full shadow rounded-lg">
                  <div className='flex gap-3'> <div className='flex items-center gap-3 rounded-lg  hover:bg-slate-100 relative '> <span className='flex justify-center items-center w-[40px] h-[40px] bg-gray-200 rounded-full'> <BiSolidUser className='w-[60%] h-[60%] text-white' /> </span>  <p className='text-lg '> {user.name} </p> </div> </div>
                  <div className='border-[0.5px]' />
                  <div className='font-semibold text-blue-400'>See all profiles</div>
                </div>
              </div>

              <ul>
                <li className='flex items-center gap-3 rounded-lg p-2 hover:bg-slate-100 relative '> <span className='flex justify-center items-center w-[40px] h-[40px] bg-gray-200 rounded-full'> <img className='flex justify-center items-center w-[20px] h-[20px]' src={settingsAndPrivacyIcon} alt="" />  </span>  <p className='text-lg '>Settings & privacy</p> <IoIosArrowForward className='absolute right-1' /></li>
                <li className='flex items-center gap-3 rounded-lg p-2 hover:bg-slate-100 relative '> <span className='flex justify-center items-center w-[36px] h-[36px] bg-gray-200 rounded-full'> <img className='flex justify-center items-center w-[20px] h-[20px]' src={helpAndSupportIcon} alt="" />  </span>  <p className='text-lg '>Help & support</p> <IoIosArrowForward className='absolute right-1' /></li>
                <li className='flex items-center gap-3 rounded-lg p-2 hover:bg-slate-100 relative '> <span className='flex justify-center items-center w-[36px] h-[36px] bg-gray-200 rounded-full'> <img className='flex justify-center items-center w-[20px] h-[20px]' src={displayAndAccessibilityIcon} alt="" />  </span>  <p className='text-lg '>Display & accessibility</p> <IoIosArrowForward className='absolute right-1' /></li>
                <li className='flex items-center gap-3 rounded-lg p-2 hover:bg-slate-100 relative '> <span className='flex justify-center items-center w-[36px] h-[36px] bg-gray-200 rounded-full'> <img className='flex justify-center items-center w-[20px] h-[20px]' src={giveFeedbackIcon} alt="" />  </span>  <p className='text-lg '>Give feedback</p> </li>
                <li className='flex items-center gap-3 rounded-lg p-2 hover:bg-slate-100 relative ' onClick={() => { handleLogout() }}> <span className='flex justify-center items-center w-[36px] h-[36px] bg-gray-200 rounded-full'> <img className='flex justify-center items-center w-[20px] h-[20px]' src={logoutIcon} alt="" />  </span>  <p className='text-lg '  >Log out</p> </li>
              </ul>
            </div>
          </div>


        </div>

        <div className='w-full  h-[42px] flex justify-center items-center'>
          {
            searchActive ?
              <div className={`filterOptions w-full ${searchActive ? 'showFromTop' : 'hideToBottom'}`}>
                <ul className='flex justify-between'>
                  <li className={`flex flex-col justify-center items-center text-xs font-semibold cursor-pointer px-2 gap-1 py-1 border rounded-md ${searchField === 'All' ? 'bg-blue-500 text-white' : 'hover:bg-gray-300 bg-gray-200'}`} onClick={() => { setField('All'); setSearchField('All') }}>All</li>
                  <li className={`flex flex-col justify-center items-center text-xs font-semibold cursor-pointer px-2 gap-1 py-1 border rounded-md ${searchField === 'author.name' ? 'bg-blue-500 text-white' : 'hover:bg-gray-300 bg-gray-200'}`} onClick={() => { setField('author.name'); setSearchField('author.name') }}> People</li>
                  <li className={`flex flex-col justify-center items-center text-xs font-semibold cursor-pointer px-2 gap-1 py-1 border rounded-md ${searchField === 'Photos' ? 'bg-blue-500 text-white' : 'hover:bg-gray-300 bg-gray-200'}`} onClick={() => { setField('Photos'); setSearchField('Photos') }}> Photos</li>
                  <li className={`flex flex-col justify-center items-center text-xs font-semibold cursor-pointer px-2 gap-1 py-1 border rounded-md ${searchField === 'Pages' ? 'bg-blue-500 text-white' : 'hover:bg-gray-300 bg-gray-200'}`} onClick={() => { setField('Pages'); setSearchField('Pages') }}> Pages</li>
                  <li className={`flex flex-col justify-center items-center text-xs font-semibold cursor-pointer px-2 gap-1 py-1 border rounded-md ${searchField === 'Places' ? 'bg-blue-500 text-white' : 'hover:bg-gray-300 bg-gray-200'}`} onClick={() => { setField('Places'); setSearchField('Places') }}> Places</li>
                  <li className={`flex flex-col justify-center items-center text-xs font-semibold cursor-pointer px-2 gap-1 py-1 border rounded-md ${searchField === 'Groups' ? 'bg-blue-500 text-white' : 'hover:bg-gray-300 bg-gray-200'}`} onClick={() => { setField('Groups'); setSearchField('Groups') }}> Groups</li>
                </ul>
              </div>
              :
              <div className={`middle flex w-full justify-between py-2 ${searchActive ? 'slide-out hide' : 'slide-in'}`}>
                <div className='relative flex justify-center items-center w-full h-full cursor-pointer' onClick={() => { navigate('/') }}><GoHomeFill className={`w-[25px] h-[25px] cursor-pointer transition-all duration-300 ${activeLink === '/' ? 'text-blue-500' : 'text-gray-400'}`} /></div>
                <div className='relative flex justify-center items-center w-full h-full cursor-pointer' onClick={() => { navigate('/Pages') }}><RiFlagFill className={`w-[25px] h-[25px] cursor-pointer transition-all duration-300 ${activeLink === '/Pages' ? 'text-blue-500' : 'text-gray-400'}`} /></div>
                <div className='relative flex justify-center items-center w-full h-full cursor-pointer' onClick={() => { navigate('/Friends') }}><FaUserFriends className={`w-[25px] h-[25px] cursor-pointer transition-all duration-300 ${activeLink === '/Friends' ? 'text-blue-500' : 'text-gray-400'}`} /></div>
                <div className='relative flex justify-center items-center w-full h-full cursor-pointer' onClick={() => { navigate('/Groups') }}><HiMiniUserGroup className={`w-[25px] h-[25px] cursor-pointer transition-all duration-300 ${activeLink === '/Groups' ? 'text-blue-500' : 'text-gray-400'}`} /></div>
                <div className='relative flex justify-center items-center w-full h-full cursor-pointer' onClick={() => { navigate('/Messenger') }}><RiMessengerFill className={`w-[25px] h-[25px] cursor-pointer transition-all duration-300 ${activeLink === '/Messenger' ? 'text-blue-500' : 'text-gray-400'}`} /></div>
                <div className='relative flex justify-center items-center w-full h-full cursor-pointer' onClick={() => { navigate('/Market') }}><AiFillShop className={`w-[25px] h-[25px] cursor-pointer transition-all duration-300 ${activeLink === '/Market' ? 'text-blue-500' : 'text-gray-400'}`} /></div>
              </div>
          }
        </div>






        <div className="lower hidden flex gap-3">

          {
            isLoggedIn && <div className={`relative flex justify-center items-center gap-3 cursor-pointer transition-all duration-700 ${isLoggedIn ? 'opacity-100' : 'opacity-0'}`} onClick={(e) => { handleButtonClick(e, profileDropdown) }}>
              <span className='font-semibold opacity-0 mountAnimation'>{user.name}</span> <div className="flex justify-center items-center  bg-[#e4e6eb] w-[40px] h-[40px] rounded-full opacity-0 mountAnimation"> <img className=' w-full h-full object-cover rounded-full' src={profilePhoto || userIcon} alt="" /> </div>
              <div ref={profileDropdown} className={`profileDropdown absolute w-[344px] -right-[160px] bg-white rounded-lg shadow top-[120%] cursor-pointer ${child === profileDropdown && active ? 'showFromTop z-50' : 'hideFromBottom'}`}>

                <div className='flex justify-center m-3 '>
                  <div className="flex flex-col p-3 gap-3 w-full shadow rounded-lg">
                    <div className='flex gap-3'> <div className='flex items-center gap-3 rounded-lg  hover:bg-slate-100 relative '> <span className='flex justify-center items-center w-[40px] h-[40px] bg-gray-200 rounded-full'> <BiSolidUser className='w-[60%] h-[60%] text-white' /> </span>  <p className='text-lg '> {user.name} </p> </div> </div>
                    <div className='border-[0.5px]' />
                    <div className='font-semibold text-blue-400'>See all profiles</div>
                  </div>
                </div>

                <ul>
                  <li className='flex items-center gap-3 rounded-lg p-2 hover:bg-slate-100 relative '> <span className='flex justify-center items-center w-[40px] h-[40px] bg-gray-200 rounded-full'> <img className='flex justify-center items-center w-[20px] h-[20px]' src={settingsAndPrivacyIcon} alt="" />  </span>  <p className='text-lg '>Settings & privacy</p> <IoIosArrowForward className='absolute right-1' /></li>
                  <li className='flex items-center gap-3 rounded-lg p-2 hover:bg-slate-100 relative '> <span className='flex justify-center items-center w-[36px] h-[36px] bg-gray-200 rounded-full'> <img className='flex justify-center items-center w-[20px] h-[20px]' src={helpAndSupportIcon} alt="" />  </span>  <p className='text-lg '>Help & support</p> <IoIosArrowForward className='absolute right-1' /></li>
                  <li className='flex items-center gap-3 rounded-lg p-2 hover:bg-slate-100 relative '> <span className='flex justify-center items-center w-[36px] h-[36px] bg-gray-200 rounded-full'> <img className='flex justify-center items-center w-[20px] h-[20px]' src={displayAndAccessibilityIcon} alt="" />  </span>  <p className='text-lg '>Display & accessibility</p> <IoIosArrowForward className='absolute right-1' /></li>
                  <li className='flex items-center gap-3 rounded-lg p-2 hover:bg-slate-100 relative '> <span className='flex justify-center items-center w-[36px] h-[36px] bg-gray-200 rounded-full'> <img className='flex justify-center items-center w-[20px] h-[20px]' src={giveFeedbackIcon} alt="" />  </span>  <p className='text-lg '>Give feedback</p> </li>
                  <li className='flex items-center gap-3 rounded-lg p-2 hover:bg-slate-100 relative ' onClick={() => { handleLogout() }}> <span className='flex justify-center items-center w-[36px] h-[36px] bg-gray-200 rounded-full'> <img className='flex justify-center items-center w-[20px] h-[20px]' src={logoutIcon} alt="" />  </span>  <p className='text-lg '  >Log out</p> </li>
                </ul>
              </div>
            </div>
          }


          <div className="flex justify-center items-center bg-[#e4e6eb] w-[40px] h-[40px] rounded-full"> <CgMenuGridO className='w-[70%] h-[70%]' /> </div>
          <div className="flex justify-center items-center bg-[#e4e6eb] w-[40px] h-[40px] rounded-full"> <FaFacebookMessenger className='w-[50%] h-[50%]' /> </div>
          <div className="flex justify-center items-center bg-[#e4e6eb] w-[40px] h-[40px] rounded-full"> <GoBellFill className='w-[70%] h-[70%]' /> </div>
        </div>

      </div>

    </div>


  )
}

export default Navbar