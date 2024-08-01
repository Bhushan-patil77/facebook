import React, { useEffect, useState } from 'react'
import { FaPlus, FaUserPlus } from 'react-icons/fa'
import { FiPlus } from 'react-icons/fi'
import { TiMessages, TiPlus } from 'react-icons/ti'
import facebookicon from '../assets/facebookicon.png'
import usericon from '../assets/user.png'
import { useNavigate } from 'react-router-dom'
import { PiEyeBold } from 'react-icons/pi'
import { HiOutlineSpeakerphone } from 'react-icons/hi'
import { IoNotificationsOutline } from 'react-icons/io5'
import { FaMeta, FaUsersViewfinder } from 'react-icons/fa6'
import { TbFileLike } from 'react-icons/tb'
import { MdDelete } from 'react-icons/md'
import { HiPlusCircle } from 'react-icons/hi2'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { AiFillLike, AiFillPlusCircle } from 'react-icons/ai'
import { BiLogoMeta } from 'react-icons/bi'

function Pages() {
  const navigate = useNavigate()
  const [pages, setPages] = useState()
  const [message, setMessage] = useState()
  const [delay, setDelay] = useState()
  const user = JSON.parse(localStorage.getItem('user'))

  const yearMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  useEffect(() => {
    getPages()
  }, [])

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

  const deletePage = async (pageId) => {
    const url = `https://academics.newtonschool.co/api/v1/facebook/channel/${pageId}`
    const projectId = '6xetdqeg0242'
    const token = localStorage.getItem('token')



    try {


      let response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'projectID': projectId,
        },
      })

      getPages()


      response = await response.json()

      if (response.status === 'success') {
        setMessage('Success')
        setCreatedPageId(response.data._id)
        getPages()
      }


    } catch (error) {

    }
  }



  return (
    <div className='w-full h-[79%] xl:p-0 p-1 xl:h-[720px] flex opacity-0 mountAnimation'>

      <div className="left hidden  w-[25%] shadow border p-3 xl:flex flex-col gap-8">

        <div className="upper flex flex-col gap-4">
          <span className='text-xl font-bold'>Pages</span>

          <button className='flex justify-center items-center gap-1 text-blue-500 font-semibold  py-1 bg-gray-50 rounded-md cursor-pointer' onClick={() => { navigate('/Create') }}> <FiPlus />Create new  page</button>

        </div>

        <div className="lower">
          <ul className='flex flex-col gap-2'>
            <li className='flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2'> <span className='w-[40px] h-[40px] rounded-full bg-gray-100 flex justify-center items-center'><FaMeta className='w-[28px] h-[28px]' />  </span>  <p className='font-semibold  text-[17px]'>Meta Business Suite</p></li>
            <li className='flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2'> <span className='w-[40px] h-[40px] rounded-full bg-gray-100 flex justify-center items-center'><FaUsersViewfinder className='w-[28px] h-[28px]' /> </span>   <p className='font-semibold  text-[17px]'>Discover</p></li>
            <li className='flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2'> <span className='w-[40px] h-[40px] rounded-full bg-gray-100 flex justify-center items-center'><TbFileLike className='w-[28px] h-[28px]' />  </span>  <p className='font-semibold  text-[17px]'>Liked Pages</p></li>
            <li className='flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2'> <span className='w-[40px] h-[40px] rounded-full bg-gray-100 flex justify-center items-center'><FaUserPlus className='w-[28px] h-[28px]' />  </span>  <p className='font-semibold  text-[17px]'>Invites</p></li>

          </ul>
        </div>

      </div>

      <div className="right xl:w-[75%] w-full bg-gray-100 flex flex-col gap-8 xl:px-[100px] xl:py-8 py-2 overflow-y-auto no-scrollbar">

        <div className='flex flex-row xl:hidden gap-2 w-full overflow-x-auto no-scrollbar min-h-8 font-semibold'>
          <span className='flex items-center gap-2 bg-gray-300 px-3 rounded-full whitespace-nowrap text-blue-500 cursor-pointer' onClick={() => { navigate('/Create') }}><AiFillPlusCircle /> Create Page </span>
          <span className='flex items-center gap-2 bg-gray-300 px-3 rounded-full whitespace-nowrap'><AiFillLike /> Liked Pages</span>
          <span className='flex items-center gap-2 bg-gray-300 px-3 rounded-full whitespace-nowrap'><FaUserPlus /> Invites</span>
          <span className='flex items-center gap-2 bg-gray-300 px-3 rounded-full whitespace-nowrap'><BiLogoMeta /> Meta Business Suite</span>
        </div>

        <span className='text-xl font-bold'>All pages</span>

        {
          message === 'Success' && pages.map((page, i) => {
            const createdAt = new Date(page.createdAt);

            return <div key={i} className={`relative xl:boxShadow shadow rounded-md opacity-0 mountAnimation showFromBottom`}>
              <div className="pageCard relative p-4 xl:p-8 bg-white rounded-lg w-full flex flex-col gap-6 peer ">
                <div className="upper flex gap-4 ">
                  <div className="image  w-[50px] h-[50px] flex justify-center items-center rounded-full"> <img className='w-full h-full rounded-full' src={page.image || usericon} alt="" /></div>
                  <div className="channelName flex flex-col">
                    <span className='text-lg font-bold'>{page.name}</span>
                    <span className='text-xs'>{createdAt.getDate()} {yearMonths[createdAt.getMonth()]} {createdAt.getFullYear()}</span>
                  </div>
                </div>
                <div className="lower w-full  flex  justify-between ">
                  <div className="viewPage cursor-pointer flex justify-center  gap-4 items-center rounded-lg px-3 xl:px-8 py-2 bg-blue-50 text-blue-500 font-semibold" onClick={() => { navigate('/page', { state: page._id }) }} ><PiEyeBold className='text-lg' />View Page</div>
                  <div className="promote  cursor-pointer flex justify-center  gap-4 items-center rounded-lg px-3 xl:px-8 py-2 bg-gray-100 font-semibold"><HiOutlineSpeakerphone className='text-lg' />Promote</div>
                  <div className="promote  cursor-pointer hidden xl:flex justify-center  gap-4 items-center rounded-lg xl:px-8 py-2  font-semibold"><IoNotificationsOutline className='text-lg' />Notification</div>
                  <div className="promote  cursor-pointer hidden xl:flex justify-center  gap-4 items-center rounded-lg xl:px-8 py-2 font-semibold"><TiMessages className='text-lg' />Messages</div>
                </div>


              </div>
              <span className={`absolute hidden xl:block right-4 top-4 opacity-0 peer-hover:opacity-100 hover:opacity-100 cursor-pointer ${page.owner._id !== user._id ? 'hidden' : ''}`} onClick={() => { deletePage(page._id) }}><MdDelete /></span>
              <span className={`absolute  xl:hidden right-4 top-4  cursor-pointer ${page.owner._id !== user._id ? 'hidden' : ''}`} onClick={() => { deletePage(page._id) }}><MdDelete /></span>
            </div>
          })
        }



      </div>

    </div>
  )
}

export default Pages