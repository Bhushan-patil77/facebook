import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { FiPlus } from 'react-icons/fi'
import { TiMessages, TiPlus } from 'react-icons/ti'
import facebookicon from '../assets/facebookicon.png'
import usericon from '../assets/user.png'
import { useNavigate } from 'react-router-dom'
import { PiEyeBold } from 'react-icons/pi'
import { HiOutlineSpeakerphone } from 'react-icons/hi'
import { IoNotificationsOutline } from 'react-icons/io5'

function Pages() {
    const navigate = useNavigate()
    const [pages, setPages]=useState()
    const [message, setMessage]=useState()

    const yearMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    useEffect(()=>{
        getPages()
    },[])

    const getPages = async () => {

        const url = 'https://academics.newtonschool.co/api/v1/facebook/channel'
        const projectId = '6xetdqeg0242';
    
        try {
    
          setMessage('Loading...')
    
          var response = await fetch(url, {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              projectID: projectId
            }
          })
    
          response = await response.json();
    
          if (response.status === "success") {
    
            const data = response.data

            console.log(data);
    
            if (response.results > 0) {
              setMessage('Success')
              setPages(data)
            }
            if (response.results == 0) {
              setMessage('No Post Found')
            }
    
    
          }
    
          if (response.status === "fail") {
            alert(response.message)
            setMessage('failed')
          }
    
    
        } catch (error) {
          console.log(error);
        }
    
      }

  return (
    <div className='w-full h-[720px] flex '> 

     <div className="left  w-[25%] shadow border p-3 flex flex-col gap-8">

       <div className="upper flex flex-col gap-4">
        <span className='text-xl font-bold'>Pages</span>

        <button className='flex justify-center items-center gap-1 text-blue-500 font-semibold  py-1 bg-gray-50 rounded-md cursor-pointer' onClick={()=>{navigate('/Create')}}> <FiPlus />Create new  page</button>

       </div>

       <div className="lower">
        <ul className='flex flex-col gap-2'>
        <li className='flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2'><img className='w-[28px] h-[28px] rounded-full' src={facebookicon} alt="" />    <p className='font-semibold  text-[17px]'>Meta Business Suite</p></li>
        <li className='flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2'><img className='w-[28px] h-[28px] rounded-full' src={facebookicon} alt="" />    <p className='font-semibold  text-[17px]'>Discover</p></li>
        <li className='flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2'><img className='w-[28px] h-[28px] rounded-full' src={facebookicon} alt="" />    <p className='font-semibold  text-[17px]'>Liked Pages</p></li>
        <li className='flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2'><img className='w-[28px] h-[28px] rounded-full' src={facebookicon} alt="" />    <p className='font-semibold  text-[17px]'>Invites</p></li>

        </ul>
       </div>

     </div>

     <div className="right w-[75%] bg-gray-100 flex flex-col gap-8 px-[100px] py-8 overflow-y-auto no-scrollbar">

        <span className='text-xl font-bold'>All pages</span>

        {
            message==='Success' && pages.map((page, i)=>{
                const createdAt = new Date(page.createdAt);
                return   <div key={i} className="pageCard p-8 bg-white rounded-lg w-full flex flex-col gap-6">
                            <div className="upper flex gap-4">
                            <div className="image  w-[50px] h-[50px] flex justify-center items-center rounded-full"> <img className='w-full h-full rounded-full' src={page.image || usericon} alt="" /></div>
                            <div className="channelName flex flex-col">
                                <span className='text-lg font-bold'>{page.name}</span>
                                <span className='text-xs'>{createdAt.getDate()} {yearMonths[createdAt.getMonth()]} {createdAt.getFullYear()}</span>
                            </div>
                            </div>
                            <div className="lower w-full  flex  justify-between">
                                <div className="viewPage cursor-pointer flex justify-center gap-4 items-center rounded-lg px-8 py-2 bg-blue-50 text-blue-500 font-semibold" onClick={()=>{navigate('/page', {state:page._id})}} ><PiEyeBold  className='text-lg'/>View Page</div>
                                <div className="promote  cursor-pointer flex justify-center  gap-4 items-center rounded-lg px-8 py-2 bg-gray-100 font-semibold"><HiOutlineSpeakerphone className='text-lg' />Promote</div>
                                <div className="promote  cursor-pointer flex justify-center  gap-4 items-center rounded-lg px-8 py-2  font-semibold"><IoNotificationsOutline className='text-lg' />Notification</div>
                                <div className="promote  cursor-pointer flex justify-center  gap-4 items-center rounded-lg px-8 py-2 font-semibold"><TiMessages className='text-lg' />Messages</div>
                            </div>
                        </div>
            })
        }

      
       
     </div>

    </div>
  )
}

export default Pages