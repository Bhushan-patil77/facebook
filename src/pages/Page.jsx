import React, { useEffect, useRef, useState } from 'react'
import { FaCaretDown, FaPlus, FaRegUser, FaUserCheck, FaUserTag } from 'react-icons/fa'
import { FiPlus } from 'react-icons/fi'
import { TiMessages, TiPlus } from 'react-icons/ti'
import facebookicon from '../assets/facebookicon.png'
import usericon from '../assets/user.png'
import liveVideoIcon from '../assets/liveVideoIcon.png'
import photosAndVideosIcon from '../assets/photosVideosIcon.png'
import feelingActivityIcon from '../assets/feelingActivityIcon.png'
import visibleToFriendsIcon from '../assets/visibleToFriendsIcon.png'
import technology from '../assets/technology.jpg'
import { useLocation, useNavigate } from 'react-router-dom'
import { PiEyeBold, PiGenderMaleBold, PiList } from 'react-icons/pi'
import { HiOutlineSpeakerphone } from 'react-icons/hi'
import { IoCameraSharp, IoNotificationsOutline } from 'react-icons/io5'
import { MdEdit, MdEmojiEmotions, MdKeyboardArrowDown, MdOutlineMailOutline } from 'react-icons/md'
import { BsThreeDots } from 'react-icons/bs'
import { IoMdArrowDropdown } from 'react-icons/io'
import { TbPhoneCalling, TbPhotoFilled } from 'react-icons/tb'
import { ImLocation2 } from 'react-icons/im'
import { RiFileGifFill } from 'react-icons/ri'
import { LuLayoutGrid } from 'react-icons/lu'
import Post from '../home/Post'
import { CgGenderMale } from 'react-icons/cg'
function Page() {
    const navigate = useNavigate()
    const location = useLocation()
    const pageId=location.state

    const [active, setActive] = useState(false);
    const [parent, setParent] = useState(null);
    const [child, setChild] = useState(null);

    const [pageInfo, setPageInfo]=useState()
    const [posts, setPosts] = useState([])
    const [author, setAuthor]=useState();
    const [image, setImage]=useState()
    const [message, setMessage] = useState('')
    const [postTitle, setPostTitle] = useState('Technology')
    const [postContent, setPostContent] = useState()
    const [postAttachment, setPostAttachment] = useState()
    const [postDeleted, setPostDeleted] = useState()

    const createPostPopup = useRef()
    const createPostContainer = useRef()

    useEffect(()=>{
        getPageInfo()
        getPagePosts()
    },[])


    const getPageInfo = async () => {

        const url = `https://academics.newtonschool.co/api/v1/facebook/channel/${pageId}`
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

            setPageInfo(data)
            setAuthor(data.owner.name)
            setImage(data.image)   //set name and image in post
    
          }
    
    
        } catch (error) {
          console.log(error);
        }
    
      }

      const getPagePosts = async () => {                                      //GOT THE POSTS OF PAGE. SHOW THEM ON PAGE

        const url = `https://academics.newtonschool.co/api/v1/facebook/channel/${pageId}/posts`
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
            console.log(response);

            setPosts(data)
            
    
          }
    
    
        } catch (error) {
          console.log(error);
        }
    
      }


  return (
    
    <div className='w-full h-[720px] flex '> 

    <div className="left  w-[25%] shadow border p-3 flex flex-col gap-8">

      <div className="upper flex flex-col gap-4">
       <span className='text-xl font-bold'>Manage Page</span>

       <button className='flex justify-center items-center gap-1 text-blue-500 font-semibold  py-1 bg-gray-50 rounded-md cursor-pointer' onClick={()=>{navigate('/Create')}}> <FiPlus />Create new  page</button>

      </div>

      <div className="lower">
       <ul className='flex flex-col gap-2'>
       <li className='flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2'><img className='w-[28px] h-[28px] rounded-full' src={facebookicon} alt="" />    <p className='font-semibold  text-[17px]'>Professional dashboard</p></li>
       <li className='flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2'><img className='w-[28px] h-[28px] rounded-full' src={facebookicon} alt="" />    <p className='font-semibold  text-[17px]'>Insights</p></li>
       <li className='flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2'><img className='w-[28px] h-[28px] rounded-full' src={facebookicon} alt="" />    <p className='font-semibold  text-[17px]'>Ad Center</p></li>
       <li className='flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2'><img className='w-[28px] h-[28px] rounded-full' src={facebookicon} alt="" />    <p className='font-semibold  text-[17px]'>Create Ads</p></li>
       <li className='flex items-center gap-3  cursor-pointer hover:bg-slate-50 rounded-lg w-full px-2 py-2'><img className='w-[28px] h-[28px] rounded-full' src={facebookicon} alt="" />    <p className='font-semibold  text-[17px]'>Settings</p></li>
       <button className='flex justify-center items-center gap-4 text-blue-500 font-semibold  py-1 bg-gray-50 rounded-md cursor-pointer'><HiOutlineSpeakerphone />Promote</button>

       </ul>
      </div>

    </div>

    <div className="right w-[75%] bg-gray-100 flex flex-col gap-8 px-[30px] py-1 overflow-y-auto no-scrollbar">

        {
            pageInfo &&  <div className='flex flex-col items-center overflow-y-auto no-scrollbar  w-full h-full  '>

                                    <div className='w-full flex justify-center items-center bg-white'>
                                        <div className="coverPhotoContainer relative rounded-lg w-[95%] mb-4">
                                            <div className='relative w-full '>
                                                <img className=' w-full rounded-lg' src={technology} alt="" />
                                                <div className="profilePhoto absolute -bottom-[90px] left-9  w-[180px] h-[180px] bg-white p-1 rounded-full flex justify-center items-center ">
                                                    <input className='absolute w-0 h-0' id='profileImage' type="file" accept="image/*"  />
                                                    <label className='w-full h-full' htmlFor="profileImage"><img className='w-full h-full object-cover rounded-full border border-gray-400' src={pageInfo.image} alt="" /></label>
                                                    <div className="absolute w-[40px] h-[40px] flex justify-center items-center rounded-full p-2 bg-gray-100 bottom-4 -right-[2px]"> <IoCameraSharp className='w-full h-full' /> </div>
                                                </div>
                                            </div>


                                            <div className="bottom flex justify-between pl-[240px]   p-8 ">
                                                <div className="name text-3xl font-bold ">{pageInfo.owner.name}</div>
                                                <div className="flex gap-4">
                                                    <div className="addStory bg-blue-500 text-white font-semibold flex gap-2 justify-center items-center px-4 rounded-md"><FaPlus /> Follow </div>
                                                    <div className="addStory bg-gray-200   flex gap-2 justify-center items-center px-4 rounded-md"><HiOutlineSpeakerphone /> Promote</div>
                                                    <div className="addStory bg-gray-200   flex justify-center items-center px-4 rounded-md"><MdKeyboardArrowDown /></div>
                                                </div>
                                            </div>

                                            <div className="description  px-8 pb-8">{pageInfo.description}</div>

                                            <div className="border mx-8"></div>

                                            <div className="navbar px-8  flex items-center justify-between">
                                                <ul className='flex gap-8 font-semibold text-lg text-gray-400 tracking-wider p-3'>
                                                    <li className='text-blue-500 flex items-center flex-col'>Posts <span className='w-[120%] h-1 bg-blue-500'></span></li>
                                                    <li>About</li>
                                                    <li>Friends</li>
                                                    <li>Photos</li>
                                                    <li>Videos</li>
                                                    <li>Check-ins</li>
                                                    <li className='flex items-center '>More <FaCaretDown /></li>
                                                </ul>

                                                <div className='bg-gray-200 flex justify-center items-center  px-4 py-2 rounded-md'><BsThreeDots /></div>
                                            </div>


                                        </div>

                                    </div>

                                    <div className='flex w-full justify-center bg-gray-100'>

                                        <div className="bottom flex gap-4 w-[100%] max-h-[720px] overflow-y-auto no-scrollbar pt-4 ">

                                            <div className="left w-[40%] flex flex-col gap-4 sticky top-0 border">
                                                <div className="intro flex flex-col justify-betwee gap-2 w-full  p-3 shadow rounded-lg bg-white">
                                                    <span className='text-2xl font-bold'>Intro</span>
                                                    <p className='text-sm'>{pageInfo.description}</p>
                                                    <div className='border-b'/>
                                                    <div className='flex items-center gap-6'><FaRegUser className='text-xl' /> <span>{pageInfo.owner.name}</span></div>
                                                    <div className='flex items-center gap-6'><PiGenderMaleBold className='text-xl' /> <span>{pageInfo.owner.gender}</span></div>
                                                    <div className='flex items-center gap-6'><MdOutlineMailOutline className='text-xl' /> <span>{pageInfo.owner.email}</span></div>
                                                    <div className='flex items-center gap-6'><TbPhoneCalling  className='text-xl' /> <span>{pageInfo.owner.phone}</span></div>
                                                </div>

                                                <div className="photos flex flex-col gap-4 w-full  p-4 shadow rounded-lg bg-white">

                                                    <span className='text-2xl font-bold'>Photos</span>

                                                    <div className="photos flex justify-between gap-4 flex-wrap">
                                                        <img className='rounded-md w-[30%]' src={pageInfo.image} alt="" />
                                                        <img className='rounded-md w-[30%]' src={pageInfo.owner.profileImage} alt="" />
                                                        <img className='rounded-md w-[30%]' src={pageInfo.owner.profileImage} alt="" />
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="right flex flex-col gap-5 w-[60%] px-4 ">
                                                <div className="createPost bg-white w-full rounded-lg p-3 flex flex-col gap-3 shadow" onClick={(e) => { handleButtonClick(e, createPostPopup) }}>

                                                    <div className="upper flex items-center justify-between ">
                                                        <div className="profilePhoto flex justify-center items-center rounded-full w-[40px] h-[40px] bg-slate-400 border "> <img className='rounded-full' src={usericon} alt="" /> </div>
                                                        <div className="inputDiv border rounded-full w-[89%] flex pl-3 items-center h-[40px] bg-gray-100 text-gray-400 hover:bg-gray-200 cursor-pointer">What's on your mind, Bhushan</div>
                                                    </div>

                                                    <div className='border-b' />

                                                    <div className="lower flex justify-between">
                                                        <div className="liveVideo flex gap-2 items-center justify-center w-full py-1 hover:bg-gray-100 rounded-lg cursor-pointer"> <img src={liveVideoIcon} alt="" /> <span>Live video</span> </div>
                                                        <div className='photo/video flex gap-2 items-center justify-center w-full py-1 hover:bg-gray-100 rounded-lg cursor-pointer'> <img src={photosAndVideosIcon} alt="" /> <span>Live video</span> </div>
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

                                                        <div className="whatsOnYourMind flex-grow bg-slate-100 rounded-lg">
                                                            <div className="commentInput  p-3 ">
                                                                <textarea
                                                                    className='w-full bg-slate-100 outline-none rounded-lg pl-2 min-h-16 text-wrap resize-none overflow-hidden '
                                                                    placeholder="What's on your mind, Bhushan. . ."
                                                                    rows="1"
                                                                    onChange={(e) => { setPostContent(e.target.value) }}
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

                                                <div className="yourPosts shadow rounded-lg px-4 bg-white ">

                                                    <div className="upper flex justify-between  py-2">
                                                        <div className="heading text-xl font-bold">Posts</div>
                                                        <div className="flex gap-4">
                                                            <span className='flex gap-2 items-center bg-gray-100 px-2 py-1 rounded-md'>Filters</span>
                                                            <span className='flex gap-2 items-center bg-gray-100 px-2 py-1 rounded-md'>Manage posts</span>
                                                        </div>
                                                    </div>

                                                    <div className='w-full border' />

                                                    <div className="lower flex justify-between py-3">
                                                        <div className="listView w-full flex gap-2 justify-center items-center text-blue-500 font-semibold"> <PiList />List view</div>
                                                        <div className="gridView w-full flex gap-2 justify-center items-center font-semibold text-gray-400"> <LuLayoutGrid />Grid view</div>
                                                    </div>

                                                </div>

                                                {
                                                   posts && posts.map((post, i)=>{
                                                      if(post != null)
                                                     {
                                                           return <div className='shadow bg-white rounded-md'><Post postInfo={post} author={author} image={image}/></div>
                                                     }
                                                   })
                                                }


                                            </div>

                                        </div>

                                    </div>

                          </div>
        }

       

    </div>

   </div>
  )
}

export default Page