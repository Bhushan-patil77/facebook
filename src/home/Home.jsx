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

  const windowHeight = window.innerHeight;



  return (

    <>


      <div className={`bg-[#f0f2f5] w-screen  h-[720px] py- flex justify-between`}>


        <div className="left flex flex-col w-[22%] bg-white rounded-lg border max-h-full overflow-auto no-scrollbar p-2">
          <ul className='flex flex-col  items-start p-4 relative opacity-0 mountAnimation'>
            <li className='flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2' onClick={()=>{navigate('/Profile')}}><img className='w-[28px] h-[28px] rounded-full' src={usericon} alt="" />     <p className='font-semibold  text-[15  px]'>{user.name}</p></li>
            <li className='flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2' onClick={()=>{navigate('/Friends')}}><img className='w-[28px] h-[28px] rounded-full' src={friendsicon} alt="" />     <p className='font-semibold  text-[15  px]'>Friends</p></li>
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
              <li className='flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2 ' onClick={()=>{navigate('/Pages')}}><img className='w-[28px] h-[28px] rounded-full' src={pagesicon} alt="" />    <p className='font-semibold  text-[15  px]' >Pages</p></li>
              <li className='flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2'><img className='w-[28px] h-[28px] rounded-full' src={memoriesicon} alt="" />    <p className='font-semibold  text-[15  px]'>Memories</p></li>
              <label className={`flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2 transition-all transform duration-300 relative ${seeMore ? '' : 'opacity-0 absolute -translate-y-16'}`}> <input className='absolute opacity-0 peer' type="checkbox" onChange={() => { setSeeMore(!seeMore) }} /> <span className='w-[28px] h-[28px] rounded-full bg-slate-200 flex justify-center items-center transition-all duration-300 '><IoIosArrowDown className={`transition-all duration-500 ${seeMore ? 'rotate-180' : '-rotate-180'}`} /></span> <p className='font-semibold  text-[15  px]'>See less</p></label>
            </ul>

          </ul>
        </div>




        <div className="center w-[57%]  px-16 bg-white rounded-lg border flex flex-col  gap-4 items-center pt-4 overflow-y-auto no-scrollbar">


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
                                        return <div key={i} className='w-full boxShadow rounded-lg'><Post key={i} postInfo={post} setPostDeleted={setPostDeleted} setPostCommentCount={setPostCommentCount}/></div>
                                      })
          }

        </div>


        <div className="right w-[21%] bg-white rounded-lg border flex flex-col gap-4  overflow-y-auto no-scrollbar p-1">
          <img className='rounded-md w-full' src="data:image/jpeg;base64,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" alt="" />
          <img className='rounded-md w-full' src="https://facebook-react-clone-react-project-2-glsb.onrender.com/static/media/microsoft-protction.1c38640d090e24a5156b.jpg" alt="" />
          <img className='rounded-md w-full' src="https://facebook-react-clone-react-project-2-glsb.onrender.com/static/media/Screenshot%20(354).0537dfe5b3be4884d75f.png" alt="" />
          <img className='rounded-md w-full' src="https://facebook-react-clone-react-project-2-glsb.onrender.com/static/media/Screenshot%20(355).fe0ac7eb4543d2395f18.png" alt="" />
        </div>


      </div>

    </>
  )
}

export default Home