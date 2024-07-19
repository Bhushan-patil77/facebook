import React, { useEffect, useRef, useState } from 'react'
import friendsicon from '../assets/friends.png'
import adsManagericon from '../assets/adsManager.png'
import eventsicon from '../assets/events.png'
import facebookicon from '../assets/facebookicon.png'
import feedsicon from '../assets/feeds.png'
import groupsicon from '../assets/groups.png'
import marketplaceicon from '../assets/marketplace.png'
import savedicon from '../assets/saved.png'
import messengericon from '../assets/messenger.png'
import videoicon from '../assets/video.png'
import memoriesicon from '../assets/memories.png'
import usericon from '../assets/user.png'
import liveVideoIcon from '../assets/liveVideoIcon.png'
import photosVideosIcon from '../assets/photosVideosIcon.png'
import visibleToFriendsIcon from '../assets/visibleToFriendsIcon.png'
import feelingActivityIcon from '../assets/feelingActivityIcon.png'
import pagesicon from '../assets/pages.png'
import fundraisersicon from '../assets/fundraisers.png'
import '../styles/Custom.css'

import { IoIosArrowDown, IoMdArrowDropdown, IoMdPhotos } from 'react-icons/io'
import Navbar from '../Navbar'
import { json, useLocation, useNavigate } from 'react-router-dom'
import Post from './Post'
import { RiArrowDropDownFill, RiFileGifFill } from 'react-icons/ri'
import { FaUserTag } from 'react-icons/fa'
import { TbPhotoFilled } from 'react-icons/tb'
import { MdEmojiEmotions } from 'react-icons/md'
import { ImLocation2 } from 'react-icons/im'
import { HiGif } from 'react-icons/hi2'
import { RotatingLines } from 'react-loader-spinner'





function Home({searchInput, field}) {
  const navigate = useNavigate()

  const [seeMore, setSeeMore] = useState(false)
  const [message, setMessage] = useState('')
  const [posts, setPosts] = useState([])
  const [postTitle, setPostTitle]=useState('Technology')
  const [postContent, setPostContent]=useState()
  const [postAttachment, setPostAttachment]=useState()
  const [postDeleted, setPostDeleted]=useState()
  const [userInput, setUserInput]=useState(searchInput)
  const [postCommentCount, setPostCommentCount]=useState()
  const user = JSON.parse(localStorage.getItem('user'))

  const [active, setActive] = useState(false);
  const [parent, setParent] = useState(null);
  const [child, setChild] = useState(null);

  const createPostPopup = useRef()
  const createPostContainer = useRef()

  const token = localStorage.getItem('token'); 
  const projectID = '6xetdqeg0242'; 

  useEffect(()=>{
    searchInput !=='' ? searchPosts() : getPosts();
  },[searchInput, field])



console.log(field);
  


  const getPosts = async () => {

    const url = 'https://academics.newtonschool.co/api/v1/facebook/post'
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
      console.log(response);

      if (response.status === "success") {

        const data = response.data

        if (response.results > 0) {
          setMessage('Success')
          setPosts(data)
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

  const searchPosts = async () => {

    const url = `https://academics.newtonschool.co/api/v1/facebook/post?search={"${field}":"${searchInput}"}`
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
      console.log(response);

      if (response.status === "success") {

        const data = response.data

        if (response.results > 0) {
          setMessage('Success')
          setPosts(data)
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


  const createPost = async () => {
    const url = 'https://academics.newtonschool.co/api/v1/facebook/post/';

    const formData = new FormData();
    formData.append('title', postTitle);
    formData.append('content', postContent);
    formData.append('images', postAttachment);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'projectID': projectID,
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Post created successfully:', responseData);
      setParent(null)
      setChild(null)
      setPostContent('')
      setPostAttachment(null)
      getPosts()
      return responseData;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }




 useEffect(()=>{
  getPosts()
 },[postDeleted])

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


        <div className="left flex flex-col w-[20%] bg-white rounded-lg border max-h-full overflow-auto no-scrollbar p-2">
          <ul className='flex flex-col  items-start p-4 relative opacity-0 mountAnimation'>
            <li className='flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2' onClick={()=>{navigate('/Profile')}}><img className='w-[28px] h-[28px] rounded-full' src={usericon} alt="" />     <p className='font-semibold  text-[15  px]'>{user.name}</p></li>
            <li className='flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2 cursor-pointer' onClick={()=>{navigate('/Friends')}}><img className='w-[28px] h-[28px] rounded-full' src={friendsicon} alt="" />     <p className='font-semibold  text-[15  px]'>Friends</p></li>
            <li className='flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2'><img className='w-[28px] h-[28px] rounded-full' src={facebookicon} alt="" />    <p className='font-semibold  text-[15  px]'>Welcome</p></li>
            <li className='flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2'><img className='w-[28px] h-[28px] rounded-full' src={memoriesicon} alt="" />    <p className='font-semibold  text-[15  px]'>Memories</p></li>
            <li className='flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2'><img className='w-[28px] h-[28px] rounded-full' src={savedicon} alt="" />       <p className='font-semibold  text-[15  px]'>Saved</p></li>
            <li className='flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2'><img className='w-[28px] h-[28px] rounded-full' src={groupsicon} alt="" />      <p className='font-semibold  text-[15  px]'>Groups</p></li>
            <li className='flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2'><img className='w-[28px] h-[28px] rounded-full' src={videoicon} alt="" />       <p className='font-semibold  text-[15  px]'>Video</p></li>
            <li className='flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2'><img className='w-[28px] h-[28px] rounded-full' src={marketplaceicon} alt="" /> <p className='font-semibold  text-[15  px]'>Marketplace</p></li>
            <li className='flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2'><img className='w-[28px] h-[28px] rounded-full' src={feedsicon} alt="" />       <p className='font-semibold  text-[15  px]'>Feeds</p></li>
            <li className='flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2'><img className='w-[28px] h-[28px] rounded-full' src={eventsicon} alt="" />      <p className='font-semibold  text-[15  px]'>Events</p></li>
            <li className='flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2'><img className='w-[28px] h-[28px] rounded-full' src={adsManagericon} alt="" />  <p className='font-semibold  text-[15  px]'>Ads Manager</p></li>
            <label className={`flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2  transition-all transform duration-300 relative ${seeMore ? 'opacity-0 h-0 translate-y-16' : 'py-2'}`}> <input className='absolute opacity-0 peer' type="checkbox" onChange={() => { setSeeMore(!seeMore) }} /> <span className='w-[28px] h-[28px] rounded-full bg-slate-200 flex justify-center items-center transition-all duration-300 rotate-180 '><IoIosArrowDown className={`transition-all  duration-500 ${seeMore ? '-rotate-180' : 'rotate-180'}`} /></span> <p className='font-semibold  text-[15  px]'>See more</p></label>
            <ul className={`w-full overflow-hidden transition-all transform duration-300 ${seeMore ? 'h-[400px]' : 'h-0'}`}>
              <li className='flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2'><img className='w-[28px] h-[28px] rounded-full' src={messengericon} alt="" />     <p className='font-semibold  text-[15  px]'>Messenger</p></li>
              <li className='flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2'><img className='w-[28px] h-[28px] rounded-full' src={pagesicon} alt="" />    <p className='font-semibold  text-[15  px]' onClick={()=>{navigate('/Pages')}}>Pages</p></li>
              <li className='flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2'><img className='w-[28px] h-[28px] rounded-full' src={memoriesicon} alt="" />    <p className='font-semibold  text-[15  px]'>Memories</p></li>
              <label className={`flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2 transition-all transform duration-300 relative ${seeMore ? '' : 'opacity-0 absolute -translate-y-16'}`}> <input className='absolute opacity-0 peer' type="checkbox" onChange={() => { setSeeMore(!seeMore) }} /> <span className='w-[28px] h-[28px] rounded-full bg-slate-200 flex justify-center items-center transition-all duration-300 '><IoIosArrowDown className={`transition-all duration-500 ${seeMore ? 'rotate-180' : '-rotate-180'}`} /></span> <p className='font-semibold  text-[15  px]'>See less</p></label>
            </ul>

          </ul>
        </div>




        <div className="center w-[55%] px-16 bg-white rounded-lg border flex flex-col  gap-4 items-center pt-4 overflow-y-auto no-scrollbar">


          <div className="createPost w-full rounded-lg p-3 flex flex-col gap-3 boxShadow" onClick={(e) => { handleButtonClick(e, createPostPopup) }}>

            <div className="upper flex items-center justify-between ">
              <div className="profilePhoto flex justify-center items-center rounded-full w-[40px] h-[40px] bg-slate-400 border "> <img className='rounded-full' src={usericon} alt="" /> </div>
              <div className="inputDiv border rounded-full w-[89%] flex pl-3 items-center h-[40px] bg-gray-100 text-gray-400 hover:bg-gray-200 cursor-pointer">What's on your mind, Bhushan</div>
            </div>

            <div className='border-b' />

            <div className="lower flex justify-between">
              <div className="liveVideo flex gap-2 items-center justify-center w-full py-1 hover:bg-gray-100 rounded-lg cursor-pointer"> <img src={liveVideoIcon} alt="" /> <span>Live video</span> </div>
              <div className='photo/video flex gap-2 items-center justify-center w-full py-1 hover:bg-gray-100 rounded-lg cursor-pointer'> <img src={photosVideosIcon} alt="" /> <span>Live video</span> </div>
              <div className='feeling/activity flex gap-2 items-center justify-center w-full py-1 hover:bg-gray-100 rounded-lg cursor-pointer'> <img src={feelingActivityIcon} alt="" /> <span>Live video</span> </div>
            </div>

          </div>


          <div ref={createPostPopup} className={`w-screen h-screen fixed left-0 top-0 backdrop-blur-[2px] ${child === createPostPopup && active ? 'showFromTop z-50' : 'hideFromBottom'}`} onClick={(e) => { createPostContainer.current.contains(e.target) ? '' : setChild(null) }}>

            <div ref={createPostContainer} className={`createComment bg-white  absolute z-50 flex flex-col justify-between gap-3 p-3  left-[23.3%] bottom-[5%] rounded-lg w-[820px] h-[670px] boxShadow `}>

              <div className="heading p-3 border rounded-lg bg-slate-100 flex justify-center text-lg tracking-wider font-bold"> Create post </div>

              <div className='profilephoto&name flex justify-between items-center p-3 bg-slate-100 rounded-lg'>

                <div className='flex items-center gap-2'>
                  <div className="profilePhoto flex justify-center items-center rounded-full w-[40px] h-[40px] bg-slate-400 border "> <img className='rounded-full' src={usericon} alt="" /> </div>
                  <div className="channalInfo flex items-center gap-2 "> <span className='font-semibold'>Bhushan Patil</span> </div>
                </div>

                <div className='visibleToList flex justify-between gap-2 items-center   bg-gray-200 rounded text-sm px-2 py-1'> <img className='h-[70%]' src={visibleToFriendsIcon} alt="" /> <span>Friends</span> <IoMdArrowDropdown /> </div>


              </div>

              <div className="whatsOnYourMind flex-grow bg-slate-100 rounded-lg" onClick={()=>{document.getElementById('textArea').focus()}}>
                <div className="commentInput  p-3 ">
                  <textarea
                    id='textArea'
                    className='w-full bg-slate-100 outline-none rounded-lg pl-2 min-h-16 text-wrap resize-none overflow-hidden '
                    placeholder="What's on your mind, Bhushan. . ."
                    rows="1"
                    onChange={(e)=>{setPostContent(e.target.value)}}
                    value={postContent}
                    onInput={(e) => {
                      e.target.style.height = 'auto';
                      e.target.style.height = `${e.target.scrollHeight}px`;
                      e.target.parentElement.parentElement.style.height = `${e.target.scrollHeight + 50}px`;
                    }}
                  ></textarea>
                </div>
              </div>

              <div className="attachments flex justify-between px-3 py-4 border bg-slate-100 rounded-lg">
                <span>Add to your post</span>

                <div className="attachments flex gap-4">
                  <label htmlFor='uploadPhoto'>
                    <TbPhotoFilled className='w-6 h-6 cursor-pointer' />
                    <input className='border border-black absolute w-0 h-0 opacity-0' id='uploadPhoto' type="file" accept="image/*" onChange={(e) => setPostAttachment(new Blob([e.target.files[0]], { type: e.target.files[0].type }))} />
                  </label>
                  <span><FaUserTag className='w-6 h-6 cursor-pointer' /></span>
                  <span><MdEmojiEmotions className='w-6 h-6 cursor-pointer' /></span>
                  <span><ImLocation2 className='w-6 h-6 cursor-pointer' /></span>
                  <span><RiFileGifFill className='w-6 h-6 cursor-pointer' /></span>
                </div>

              </div>

              <div className="postBtn border w-full h-[35px] rounded-lg bg-blue-500 flex justify-center items-center text-white cursor-pointer an" onClick={() => { createPost() }}> Post </div>

            </div>

          </div>

          {
            message ==='Loading...' ? <RotatingLines   height="60" width="60" color="green"  strokeWidth="9" animationDuration="0.1" wrapperClass="animate-spin animate-bounce"/> 
                                    :
                                      posts.map((post, i) => {
                                        return <div className='w-full boxShadow rounded-lg'><Post key={i} postInfo={post} setPostDeleted={setPostDeleted} setPostCommentCount={setPostCommentCount}/></div>
                                      })
          }

        </div>


        <div className="right w-[20%] bg-white rounded-lg border"></div>


      </div>

    </>
  )
}

export default Home