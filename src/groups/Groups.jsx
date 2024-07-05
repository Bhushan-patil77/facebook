import '../styles/Custom.css';
import React, { useEffect, useRef, useState } from 'react'
import groupsicon from '../assets/groups.png'
import settingsicon from '../assets/settingsIcon.png'
import { SiMeilisearch } from 'react-icons/si'
import { BsXDiamondFill } from 'react-icons/bs'
import { HiMiniUserGroup, HiPlus } from 'react-icons/hi2'
import { IoIosSearch } from 'react-icons/io'
import { LuPlus } from 'react-icons/lu'
import { FaPlus } from 'react-icons/fa'
import { PiPlusBold } from 'react-icons/pi'
import Navbar from '../Navbar';

function Groups() {
  const [active, setActive] = useState(false);
  const [parent, setParent] = useState(null);
  const [child, setChild] = useState(null);

  const searchDropdown = useRef()






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




  return (

    <>


      <div className='bg-[#f0f2f5] w-screen border-1 border-red-500 h-[720px] py-1 flex justify-between'>

      <div className="left bg-white rounded-lg flex flex-col gap-2 w-[22%] h-full p-2 ">

        <div className=' w-full flex justify-between p-2 '><p className='font-bold text-2xl'>Groups</p> <span className='flex justify-center items-center w-[36px] h-[36px] bg-gray-300 rounded-full'> <img className='w-5' src={settingsicon}  alt="" /> </span></div>
        <div className='w-full h-[36px] relative flex items-center justify-center mb-3 border rounded-3xl bg-[#f0f2f5]' onClick={(e)=>{handleButtonClick(e, searchDropdown)}} ><IoIosSearch className='text-xl text-gray-400' /> <input className='bg-transparent outline-none text-l  pl-3 w-[80%]' type="text" placeholder='Search Facebook' /> <div ref={searchDropdown} className={`absolute w-[100%] h-[150px] top-[110%] bg-white rounded-lg z-50  ${child === searchDropdown && active ? 'show bottom-shadow' : 'hide'}`}></div> </div>

        <ul>
          <li className='flex items-center gap-3 rounded-lg p-2 bg-slate-100'> <span className='flex justify-center items-center w-[36px] h-[36px] bg-blue-500 rounded-full text-white text-lg'> <SiMeilisearch />  </span>  <p className='text-lg '>Your feed</p></li>
          <li className='flex items-center gap-3 rounded-lg p-2 hover:bg-slate-100 relative '> <span className='flex justify-center items-center w-[40px] h-[40px] bg-gray-200 rounded-full text-lg'> <BsXDiamondFill />  </span>  <p className='text-lg '>Discover</p> </li>
          <li className='flex items-center gap-3 rounded-lg p-2 hover:bg-slate-100 relative '> <span className='flex justify-center items-center w-[36px] h-[36px] bg-gray-200 rounded-full text-xl'> <HiMiniUserGroup/>  </span>  <p className='text-lg '>Your groups </p> </li>
        </ul>

        <div className='flex justify-center items-center gap-2  w-full h-[36px] bg-[#ebf5ff] rounded text-blue-500 font-semibold'> <PiPlusBold /> Create New Group</div>

      </div>

      <div className="right bg-white rounded-lg w-[77%] h-full "></div>

      </div>

  </>
  )
}

export default Groups