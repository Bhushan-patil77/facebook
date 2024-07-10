import React, { useEffect, useRef, useState } from 'react'
import userIcon from '../assets/user.png'
import lakshmiNarayan from '../assets/lakshmiNarayan.jpg'
import worldCup from '../assets/worldCup.jpg'
import wowGif from '../assets/wowgif.gif'
import caregif from '../assets/caregif.gif'
import sadgif from '../assets/sadgif.gif'
import laughgif from '../assets/laughgif.gif'
import likegif from '../assets/likegif.gif'
import likecoloredpng from '../assets/likecoloredpng.png'
import likeblankicon from '../assets/likeblankicon.png'
import commentblankicon from '../assets/commentblankicon.png'
import whatsappblankicon from '../assets/whatsappblankicon.png'
import shareblankicon from '../assets/shareblankicon.png'
import commenticon from '../assets/comment.png'
import shareicon from '../assets/share.png'
import { BiSolidLike } from 'react-icons/bi'
import { FaComment } from 'react-icons/fa'
import { RiShareForwardFill } from 'react-icons/ri'
import { HiOutlineEmojiHappy } from 'react-icons/hi'
import { IoCameraOutline } from 'react-icons/io5'
import { HiOutlineGif } from 'react-icons/hi2'
import { PiSticker } from 'react-icons/pi'
import { IoMdSend } from 'react-icons/io'
import { MdClose } from 'react-icons/md'

function Post({postInfo}) {

    const [years, setYears]=useState(null)
    const [months, setMonths]=useState(null)
    const [days, setDays]=useState(null)
    const [hours, setHours]=useState(null)
    const [message, setMessage]=useState(null)
    const [liked, setLiked]=useState()
    const postId = postInfo._id
    const token = localStorage.getItem('token')

    const [active, setActive] = useState(false);
    const [parent, setParent] = useState(null);
    const [child, setChild] = useState(null);
    const commentPopup = useRef()
    const commentContainer = useRef()

    const likePost = async() =>{

        const url = `https://academics.newtonschool.co/api/v1/facebook/like/${postId}`;
        const projectId = '6xetdqeg0242';
    
      
        try {
          setMessage('Loading...');
      
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "projectID": projectId,
              "Authorization": `Bearer ${token}`
            }
          });


          console.log(response);
      
          const responseData = await response.json();
      
          if (responseData.ok) {
              setMessage('success')
          } else {
            setMessage('Failed');
          }
        } catch (error) {
          console.log(error);
        }
    }

    useEffect(()=>{
        getTimeDifference(postInfo.createdAt)

    },[])


    function getTimeDifference(postDate) {
        const currentDate = new Date();
        const postCreatedDate = new Date(postDate);
      
        let years = currentDate.getFullYear() - postCreatedDate.getFullYear();
        let months = currentDate.getMonth() - postCreatedDate.getMonth();
        let days = currentDate.getDate() - postCreatedDate.getDate();
        let hours = currentDate.getHours() - postCreatedDate.getHours();
      
        if (hours < 0) {
          days -= 1;
          hours += 24;
        }
      
        if (days < 0) {
          months -= 1;
          const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0);
          days += previousMonth.getDate();
        }
      
        if (months < 0) {
          years -= 1;
          months += 12;
        }
      
        setYears(years)
        setMonths(months)
        setDays(days)
        setHours(hours)
      }
      
      

      
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


        <div className='w-[500px] rounded-lg flex flex-col gap-3 py-4 shadow border'>

            <div className='UserInfo flex items-center gap-3 px-4'>
                <div className="profilePhoto flex justify-center items-center rounded-full w-[40px] h-[40px] bg-slate-400 border "> <img className='rounded-full' src={postInfo.author.profileImage} alt="" /> </div>

                <div className='channalName&PostInfo flex flex-col justify-center leading-5 h-[40px] '>
                    <div className="channalInfo flex items-center gap-2 "> <span className='font-semibold'>{postInfo.author.name}</span> <div className='w-1 h-1 bg-gray-500 rounded-full' /> <span className='font-semibold text-blue-500'>Follow</span> </div>
                    <div className="postInfo flex items-center gap-2"> <span className='text-sm  text-gray-500'>Recomended post</span> <div className='w-1 h-1 bg-gray-500 rounded-full' /> <span className='text-sm text-gray-500'>{years > 0 ? `${years} years`: ``} {months > 0 ? `${months} months`: ``} {days > 0 ? `${days} days` : ``} { years == 0 && months==0 && days==0 ? `${hours} hours` : ``} ago</span> <div className='w-1 h-1 bg-gray-500 rounded-full' /> <span className='text-sm text-gray-500'>public</span> </div>
                </div>
            </div>

            <div className='WhatsOnUsersMind px-4'> {postInfo.content} </div>

            <div className='Photo w-full px-1'> <img className='w-full rounded' src={postInfo.images[0]} alt="" /> </div>

            <div className='LikedCommentsSharedCounts flex justify-between px-4'>
                <div className="likedCounts flex items-center gap-2"> <BiSolidLike className='text-blue-500 text-lg' /> <span className='font-semibold'>{postInfo.likeCount}</span> </div>

                <div className='commentsCount&Shares flex gap-4'>
                    <div className="flex items-center gap-1"> <span className='font-semibold'>{postInfo.commentCount}</span> <FaComment className='text-blue-500' /></div>
                    <div className="flex items-center gap-1"> <span className='font-semibold'>1.4k</span><RiShareForwardFill className='text-blue-500 text-xl' /></div>

                </div>
            </div>

            <div className='border-b-2 mx-4' />

            <div className='Like Comment Share Buttons relative flex justify-between px-8 '>
                <div className="like peer flex gap-2 items-center cursor-pointer "><img src={likeblankicon} alt="" /> <span>Like</span> </div>
                <div className="reactions bg-white px-4 gap-3 h-[40px] rounded-full flex justify-between absolute border transition-all duration-300 scale-0 -translate-x-[90px] -translate-y-6 peer-hover:-translate-y-[40px] peer-hover:translate-x-1 peer-hover:scale-100 hover:-translate-y-[40px] hover:translate-x-1 hover:scale-100"> <img className='cursor-pointer transition-all duration-300 hover:scale-[1.2] hover:-translate-y-2' src={likegif} alt="" onClick={()=>{likePost()}}/> <img className='cursor-pointer transition-all duration-300 hover:scale-[1.2] hover:-translate-y-2' src={wowGif} alt="" /> <img className='cursor-pointer transition-all duration-300 hover:scale-[1.2] hover:-translate-y-2' src={laughgif} alt="" />  <img className='cursor-pointer transition-all duration-300 hover:scale-[1.2] hover:-translate-y-2' src={caregif} alt="" /></div>

                <div className="comment flex gap-2 items-center cursor-pointer"   onClick={(e)=>{handleButtonClick(e, commentPopup)}}><img src={commentblankicon} alt="" /> <span>Comment</span></div>












                <div ref={commentPopup} className={`w-screen h-screen fixed left-0 top-0 backdrop-blur-[2px] ${child === commentPopup && active ? 'showFromTop' : 'hideFromBottom'}`} onClick={(e)=>{ commentContainer.current.contains(e.target) ? '' : setChild(null)}}>

                <div ref={commentContainer}  className={`createComment bg-white  absolute z-50 flex flex-col  justify-between  left-[23.3%] bottom-[5%] shadow rounded w-[820px] h-[670px] `}>
                    <div className="upper relative flex justify-center items-center shadow w-full h-[9%] text-lg font-bold tracking-wide bg-gray-100">Bhushan's Post  <MdClose className='absolute right-2 top-2 cursor-pointer ' onClick={()=>{setChild(null)}} /></div>

                    <div className="middle flex flex-col gap-3 pt-3 overflow-y-auto no-scrollbar w-full h-[74%] ">
                        <div className='UserInfo flex items-center gap-3 px-4'>
                            <div className="profilePhoto flex justify-center items-center rounded-full w-[40px] h-[40px] bg-slate-400 border ">
                                <img className='rounded-full' src={userIcon} alt="" />
                            </div>

                            <div className='channalName&PostInfo flex flex-col justify-center leading-5 h-[40px] '>
                                <div className="channalInfo flex items-center gap-2 ">
                                    <span className='font-semibold'>Bhushan Patil</span>
                                    <div className='w-1 h-1 bg-gray-500 rounded-full' />
                                    <span className='font-semibold text-blue-500'>Follow</span>
                                </div>
                                <div className="postInfo flex items-center gap-2">
                                    <span className='text-sm  text-gray-500'>Recomended post</span>
                                    <div className='w-1 h-1 bg-gray-500 rounded-full' />
                                    <span className='text-sm text-gray-500'>5 days ago</span>
                                    <div className='w-1 h-1 bg-gray-500 rounded-full' />
                                    <span className='text-sm text-gray-500'>public</span>
                                </div>
                            </div>
                        </div>

                        <div className='WhatsOnUsersMind px-4'>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cons uga molestiae dignissimos vel, nesciunt obcaecati laudantium earum error quaerat adipisci ea corrupti uga molestiae dignissimos vel, nesciunt obcaecati laudantium earum error quaerat adipisci ea corrupti rem magnam harum, maxime quia ullam omnis doloru uga molestiae dignissimos vel, nesciunt obcaecati laudantium earum error quaerat adipisci ea corrupti rem magnam harum, maxime quia ullam omnis doloru uga molestiae dignissimos vel, nesciunt obcaecati laudantium earum error quaerat adipisci ea corrupti rem magnam harum, maxime quia ullam omnis doloru rem magnam harum, maxime quia ullam omnis dolorum.
                        </div>

                        <div className='Photo w-full px-1'>
                            <img className='w-full rounded' src={worldCup} alt="" />
                        </div>
                    </div>

                    <div className="lower flex gap-2 shadow p-4">
                        <div className="profilePhoto flex justify-center items-center rounded-full w-[40px] h-[40px] bg-slate-400 border ">
                            <img className='rounded-full' src={userIcon} alt="" />
                        </div>

                        <div className='flex flex-col gap-2 p-3 bg-gray-100 rounded-xl  w-full'>
                            <div className="commentInput ">
                                <textarea
                                    className='w-full outline-none bg-gray-100 text-wrap resize-none overflow-hidden '
                                    placeholder='Write a comment...'
                                    rows="1"
                                    onInput={(e) => {
                                        e.target.style.height = 'auto';
                                        e.target.style.height = `${e.target.scrollHeight}px`;
                                        e.target.parentElement.parentElement.style.height = `${e.target.scrollHeight + 50}px`; 
                                    }}
                                ></textarea>
                            </div>
                            <div className='attachments&send flex justify-between'>
                                <div className="attachments flex gap-2">
                                <HiOutlineEmojiHappy />
                                <IoCameraOutline />
                                <HiOutlineGif />
                                <PiSticker />
                                </div>
                                <div className="sendbtn">
                                <IoMdSend />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                </div>

               











                <div className="send flex gap-2 items-center"><img src={whatsappblankicon} alt="" /> <span>Send</span></div>

                <div className="share flex gap-2 items-center"><img src={shareblankicon} alt="" /> <span>Share</span></div>
            </div>

        </div>
    )
}

export default Post