import React, { useEffect, useRef, useState } from 'react'
import coverPhoto from './assets/technology.jpg'
import userIcon from './assets/user.png'
import liveVideoIcon from './assets/liveVideoIcon.png'
import photosAndVideosIcon from './assets/photosVideosIcon.png'
import feelingActivityIcon from './assets/feelingActivityIcon.png'
import visibleToFriendsIcon from './assets/visibleToFriendsIcon.png'
import { IoCameraSharp } from 'react-icons/io5'
import { MdEdit, MdEmojiEmotions, MdKeyboardArrowDown, MdOutlineArrowDropDown } from 'react-icons/md'
import { HiPlus } from 'react-icons/hi2'
import { FaCaretDown, FaPlus, FaUserTag } from 'react-icons/fa'
import { BsThreeDots } from 'react-icons/bs'
import { IoMdArrowDropdown } from 'react-icons/io'
import { TbPhotoFilled } from 'react-icons/tb'
import { ImLocation2 } from 'react-icons/im'
import { RiFileGifFill } from 'react-icons/ri'
import { PiList } from 'react-icons/pi'
import { LuLayoutGrid } from 'react-icons/lu'
import Post from './home/Post'
import './styles/Custom.css'

function Profile() {

    const [active, setActive] = useState(false);
    const [parent, setParent] = useState(null);
    const [child, setChild] = useState(null);

    const [posts, setPosts] = useState([])
    const [message, setMessage] = useState('')
    const [postTitle, setPostTitle] = useState('Technology')
    const [postContent, setPostContent] = useState()
    const [postAttachment, setPostAttachment] = useState()
    const [postDeleted, setPostDeleted] = useState()

    const user = JSON.parse(localStorage.getItem('user'))




    const token = localStorage.getItem('token');
    const projectID = '6xetdqeg0242';



    const createPostPopup = useRef()
    const createPostContainer = useRef()

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

    const getPosts = async () => {

        const url = `https://academics.newtonschool.co/api/v1/facebook/post?filter={"author.name":"${user.name}"}`
        console.log(user._id);
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

    useEffect(() => {
        getPosts()
    }, [])

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
        <div className='flex flex-col items-center overflow-y-auto no-scrollbar  w-full max-h-screen  '>
            <div className='w-full flex justify-center items-center bg-white'>
            <div className="coverPhotoContainer relative   rounded-lg w-[70%]  mb-4">
                <div className='relative'>
                    <img className=' w-full rounded-lg' src={coverPhoto} alt="" />
                    <div className="profilePhoto absolute -bottom-[90px] left-9  w-[180px] h-[180px] bg-white p-1 rounded-full flex justify-center items-center ">
                        <img className='w-full h-full rounded-full border border-gray-400' src={userIcon} alt="" />
                        <div className="absolute w-[40px] h-[40px] flex justify-center items-center rounded-full p-2 bg-gray-100 bottom-4 -right-[2px]"> <IoCameraSharp className='w-full h-full' /> </div>
                    </div>
                </div>


                <div className="bottom flex justify-between pl-[240px]   p-8 ">
                    <div className="name text-3xl font-bold ">Bhushan Patil</div>
                    <div className="flex gap-4">
                        <div className="addStory bg-blue-500 text-white font-semibold flex gap-2 justify-center items-center px-4 rounded-md"><FaPlus /> Add to story</div>
                        <div className="addStory bg-gray-200   flex gap-2 justify-center items-center px-4 rounded-md"><MdEdit />Edit profile</div>
                        <div className="addStory bg-gray-200   flex justify-center items-center px-4 rounded-md"><MdKeyboardArrowDown /></div>
                    </div>
                </div>

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

            <div className="bottom flex gap-4 w-[70%] max-h-[720px] overflow-y-auto no-scrollbar pt-4 ">

                <div className="left w-[40%] flex flex-col gap-4 sticky top-0 border">
                    <div className="intro flex flex-col justify-between w-full h-[250px] p-3 shadow rounded-lg bg-white">
                        <span className='text-2xl font-bold'>Intro</span>
                        <span className='flex justify-center items-center bg-gray-100 rounded-md py-2 font-semibold' >Add Bio</span>
                        <span className='flex justify-center items-center bg-gray-100 rounded-md py-2 font-semibold' >Edit Details</span>
                        <span className='flex justify-center items-center bg-gray-100 rounded-md py-2 font-semibold' >Add Featured</span>
                    </div>

                    <div className="photos lex flex-col justify-between w-full h-[250px] p-4 shadow rounded-lg bg-white">
                        <span className='text-2xl font-bold'>Photos</span>

                    </div>
                </div>

                <div className="right flex flex-col gap-5 w-[60%] px-4 ">
                    <div className="createPost bg-white w-full rounded-lg p-3 flex flex-col gap-3 shadow" onClick={(e) => { handleButtonClick(e, createPostPopup) }}>

                        <div className="upper flex items-center justify-between ">
                            <div className="profilePhoto flex justify-center items-center rounded-full w-[40px] h-[40px] bg-slate-400 border "> <img className='rounded-full' src={userIcon} alt="" /> </div>
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
                                    <div className="profilePhoto flex justify-center items-center rounded-full w-[40px] h-[40px] bg-slate-400 border "> <img className='rounded-full' src={userIcon} alt="" /> </div>
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
                        message === 'Success' && posts.length > 0 && posts.map((post,i) => {
                            if(post.author._id===user._id)
                            {
                                return  <div key={i} className='w-full bg-white rounded-lg'><Post key={i} postInfo={post} setPostDeleted={setPostDeleted} /></div>
                            }
                           
                        })
                    }


                </div>

            </div>

            </div>

        </div>
    )
}

export default Profile