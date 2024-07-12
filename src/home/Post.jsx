import React, { useEffect, useRef, useState } from 'react'
import '../styles/Custom.css'
import userIcon from '../assets/user.png'
import lakshmiNarayan from '../assets/lakshmiNarayan.jpg'
import worldCup from '../assets/worldCup.jpg'
import wowGif from '../assets/wowgif.gif'
import caregif from '../assets/caregif.gif'
import sadgif from '../assets/sadgif.gif'
import laughgif from '../assets/laughgif.gif'
import likegif from '../assets/likegif.gif'
import dislikegif from '../assets/dislikegif.gif'
import likecoloredpng from '../assets/likecoloredpng.png'
import likeblankicon from '../assets/likeblankicon.png'
import commentblankicon from '../assets/commentblankicon.png'
import whatsappblankicon from '../assets/whatsappblankicon.png'
import shareblankicon from '../assets/shareblankicon.png'
import commenticon from '../assets/comment.png'
import shareicon from '../assets/share.png'
import { BiSolidHide, BiSolidLike } from 'react-icons/bi'
import { FaComment, FaEdit } from 'react-icons/fa'
import { RiDeleteBin4Fill, RiShareForwardFill, RiUserForbidFill } from 'react-icons/ri'
import { HiOutlineEmojiHappy } from 'react-icons/hi'
import { IoCameraOutline, IoNotifications } from 'react-icons/io5'
import { HiOutlineGif } from 'react-icons/hi2'
import { PiSticker } from 'react-icons/pi'
import { IoIosSave, IoMdSend } from 'react-icons/io'
import { MdClearAll, MdClose, MdDelete, MdDeleteForever, MdReportProblem } from 'react-icons/md'

function Post({postInfo}) {
  const middleDivRef = useRef(null);


    const [years, setYears]=useState(null)
    const [months, setMonths]=useState(null)
    const [days, setDays]=useState(null)
    const [hours, setHours]=useState(null)
    const [message, setMessage]=useState(null)
    const [likeMessage, setLikeMessage]=useState(null)
    const [dislikeMessage, setDislikeMessage]=useState(null)
    const [commentMessage, setCommentMessage]=useState(null)
    const [comments, setComments] = useState([])
    const [commentingOnPostMessage, setCommentingOnPostMessage]=useState()
    const [deletengCommentOnPost, setDeletingCommentOnPost]=useState()
    const [commentContent, setCommentContent]=useState()
    const [lastCommentIndex, setLastCommentIndex]=useState()
    const [deletedCommentId, setDeletedCommentId]=useState()
    const [postDeleteMessage, setPostDeleteMessage]=useState()
    const [liked, setLiked]=useState()
    const postId = postInfo._id
    const token = localStorage.getItem('token')
    const myAuthorId = JSON.parse(localStorage.getItem('user'))._id;
   
    const yearMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


    const [active, setActive] = useState(false);
    const [parent, setParent] = useState(null);
    const [child, setChild] = useState(null);
    const commentPopup = useRef()
    const commentContainer = useRef()
    const postOptions = useRef()

 
    

    


    const getPostComments = async() =>{
      console.log('called');

      const url = `https://academics.newtonschool.co/api/v1/facebook/post/${postId}/comments`;
      const projectId = '6xetdqeg0242';
  
    
      try {
        setCommentMessage('Loading...');
    
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "projectID": projectId,
            "Authorization": `Bearer ${token}`
          }
        });

        const responseData = await response.json();

        console.log(responseData);
    
        if (responseData.status==='success') {
          setComments(responseData.data)
          setCommentMessage('success')
          setLastCommentIndex(responseData.data.length)
            console.log(responseData);
        } else {
          setCommentMessage('Failed to fetch comments');
        }
      } catch (error) {
        console.log(error);
      }
  }

  const commentOnPost = async() =>{

    const url = `https://academics.newtonschool.co/api/v1/facebook/comment/${postId}`;
    const projectId = '6xetdqeg0242';

    if(commentContent!=='')
    {

      try {
        setCommentingOnPostMessage('Loading...');
    
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "projectID": projectId,
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            'content': commentContent
          })
        });
    
          const responseData = await response.json();
  
          if (responseData.status==='success') {
            setCommentingOnPostMessage('success')
            setCommentContent('')
            getPostComments()
    
            console.log(responseData.data);
    
            const timer = setTimeout(()=>{
              document.getElementById(`comment${comments.length-1}${postId}`).scrollIntoView({behavior:'smooth'})
            },300)
          
          } else {
            setCommentingOnPostMessage('Failed to comment this post');
          }

      } catch (error) {
        console.log(error);
      }

    }

  
 
}

const deletePost = async() =>{

  const url = `https://academics.newtonschool.co/api/v1/facebook/post/${postId}`;
  const projectId = '6xetdqeg0242';


  try {
    setPostDeleteMessage('Loading...');

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "projectID": projectId,
        "Authorization": `Bearer ${token}`
      }
    
    });



   if(response.status == 204)
   {
    setDeletingCommentOnPost('success')
    console.log('post deleted');
   }
   else if(response.status==404)
   {
    setDeletingCommentOnPost('post not found')
    console.log('post not found');
   }
  
  } catch (error) {
    alert(error)
  }
}

const deleteCommentOnPost = async(commentId) =>{

  const url = `https://academics.newtonschool.co/api/v1/facebook/comment/${commentId}`;
  const projectId = '6xetdqeg0242';


  try {
    setDeletingCommentOnPost('Loading...');

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "projectID": projectId,
        "Authorization": `Bearer ${token}`
      }
    
    });


    console.log(response);

   if(response.status == 204)
   {
    setDeletingCommentOnPost('success')
    console.log('success');
    getPostComments()
    setDeletedCommentId(postId)
    
   }
   else if(response.status==404)
   {
    setDeletingCommentOnPost('comment not found')
    console.log('comment not found');
   }
  
  } catch (error) {
    alert(error)
  }
}


    const likePost = async() =>{

        const url = `https://academics.newtonschool.co/api/v1/facebook/like/${postId}`;
        const projectId = '6xetdqeg0242';
    
      
        try {
          setLikeMessage('Loading...');
      
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "projectID": projectId,
              "Authorization": `Bearer ${token}`
            }
          });


         
      
          const responseData = await response.json();

          console.log(responseData);
      
          if (responseData.status==='success') {
            setLikeMessage('success')
            setDislikeMessage('fail')
              console.log(responseData);
          } else {
            setLikeMessage('Failed to like this post');
          }
        } catch (error) {
          console.log(error);
        }
    }

    const dislikePost = async() =>{

      const url = `https://academics.newtonschool.co/api/v1/facebook/dislike/${postId}`;
      const projectId = '6xetdqeg0242';
  
    
      try {
    
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "projectID": projectId,
            "Authorization": `Bearer ${token}`
          }
        });


     
    
        const responseData = await response.json();

        console.log(responseData);
    
        if (responseData.status==='success') {
            setDislikeMessage('success')
            setLikeMessage('fail')
        } else if(responseData. message== 'You already disliked this post') {
          setDislikeMessage('You already disliked this post');
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


        <div className='relative w-[500px] rounded-lg flex flex-col gap-3 py-4 shadow  '>

            <span className='absolute top-0 right-4 text-lg font-bold cursor-pointer' onClick={(e)=>{handleButtonClick(e, postOptions)}} >...</span>
            <div ref={postOptions} className={`absolute w-[320px]  bg-white border right-4 p-3 top-8 rounded-lg  ${child === postOptions && active ? 'showFromTop z-50' : 'hideFromBottom'} `}>
              <ul className='flex flex-col gap-4'>
                <li className='flex gap-3 cursor-pointer' onClick={()=>{setParent(null); setChild(null)}}> <IoIosSave />  <span className='flex flex-col gap-1 '> <p className=' leading-3 font-semibold'>Save Post</p>  <p className='text-xs text-gray-300'>Add this to your saved items.</p></span> </li>
                <li className='flex gap-3 cursor-pointer' onClick={()=>{setParent(null); setChild(null)}}> <FaEdit />  <span className='flex flex-col gap-1 '> <p className=' leading-3 font-semibold'>Edit Post</p>  <p className='text-xs text-gray-300'>Edit content of post.</p></span> </li>
                <li className='flex gap-3 cursor-pointer' onClick={()=>{setParent(null); setChild(null)}}> <BiSolidHide />  <span className='flex flex-col gap-1 '> <p className=' leading-3 font-semibold'>Hide Post</p>  <p className='text-xs text-gray-300'>Add this to your saved items.</p></span> </li>
                <li className='flex gap-3 cursor-pointer' onClick={()=>{setParent(null); setChild(null)}}> <IoNotifications />  <span className='flex flex-col gap-1 '> <p className=' leading-3 font-semibold'>Turn on notifications from this post</p>  <p className='text-xs text-gray-300'>You will receive notifications for this post.</p></span> </li>
                <li className='flex gap-3 cursor-pointer' onClick={()=>{setParent(null); setChild(null)}}> <MdClearAll />  <span className='flex flex-col gap-1 '> <p className=' leading-3 font-semibold'>Hide all from anamika</p>  <p className='text-xs text-gray-300'>See fewer posts like this.</p></span> </li>
                <li className='flex gap-3 cursor-pointer' onClick={()=>{setParent(null); setChild(null)}}> <MdReportProblem />  <span className='flex flex-col gap-1 '> <p className=' leading-3 font-semibold'>Report Post</p>  <p className='text-xs text-gray-300'>We won't let anamika know who reported this.</p></span> </li>
                <li className='flex gap-3 cursor-pointer' onClick={()=>{setParent(null); setChild(null)}}> <RiUserForbidFill />  <span className='flex flex-col gap-1 '> <p className=' leading-3 font-semibold'>Block anamika's profile</p>  <p className='text-xs text-gray-300'>You won't be able to see or contact each other.</p></span> </li>
                <li className='flex gap-3 cursor-pointer' onClick={()=>{deletePost(); setParent(null); setChild(null)}}> <RiDeleteBin4Fill />  <span className='flex flex-col gap-1 '> <p className=' leading-3 font-semibold'>Delete your post</p>  <p className='text-xs text-gray-300'>Your post will be deleted permanantly</p></span> </li>
              </ul>
            </div>

            <div className='UserInfo flex items-center gap-3 px-4  '>
                <div className="profilePhoto flex justify-center items-center rounded-full w-[40px] h-[40px] bg-slate-400 border "> <img className='rounded-full' src={postInfo.author.profileImage} alt="" /> </div>

                <div className='channalName&PostInfo flex flex-col justify-center leading-5 h-[40px] '>
                    <div className="channalInfo flex items-center gap-2 "> <span className='font-semibold'>{postInfo.author.name}</span> <div className='w-1 h-1 bg-gray-500 rounded-full' /> <span className='font-semibold text-blue-500'>Follow</span> </div>
                    <div className="postInfo flex items-center gap-2"> <span className='text-sm  text-gray-500'>Recomended post</span> <div className='w-1 h-1 bg-gray-500 rounded-full' /> <span className='text-sm text-gray-500'>{years > 0 ? `${years} years`: ``} {months > 0 ? `${months} months`: ``} {days > 0 ? `${days} days` : ``} { years == 0 && months==0 && days==0 ? `${hours} hours` : ``} ago</span> <div className='w-1 h-1 bg-gray-500 rounded-full' /> <span className='text-sm text-gray-500'>public</span> </div>
                </div>
            </div>

            <div className='WhatsOnUsersMind px-4'> {postInfo.content} </div>

            <div className='Photo relative w-full px-1'> <span className='absolute top-[45%] left-[45%] text-white font-bold '> {likeMessage == 'success' ? <p className='popLike'><img className='w-[40px] ' src={likegif} alt="" /></p> : ''} {dislikeMessage == 'success' ? <p className='popDislike'> <img className='w-[40px] ' src={dislikegif} alt="" /> </p> : '' } </span> <img className='w-full rounded' src={postInfo.images[0]} alt="" /> </div>

            <div className='LikedCommentsSharedCounts flex justify-between px-4'>
                <div className="likedCounts flex items-center gap-2"> <BiSolidLike className={`${likeMessage === 'success' ? 'text-lg text-blue-500 liked' : 'text-blue-500'}`} /> <span className='font-semibold text-sm'>{likeMessage === 'success' ? 'You and other ' : ''}{postInfo.likeCount}</span> </div>

                <div className='commentsCount&Shares flex gap-4'>
                    <div className="flex items-center gap-1"> <span className='font-semibold'>{postInfo.commentCount}</span> <FaComment className='text-blue-500' /></div>
                    <div className="flex items-center gap-1"> <span className='font-semibold'>1.4k</span><RiShareForwardFill className='text-blue-500 text-xl' /></div>

                </div>
            </div>

            <div className='border-b-2 mx-4' />

            <div className='Like Comment Share Buttons relative flex justify-between px-8 '>
                <div className="like peer flex gap-2 items-center cursor-pointer "><img src={likeblankicon} alt="" /> <span>Like</span> </div>
                <div className="reactions bg-white px-4 gap-3 h-[25px] rounded-full flex justify-between absolute border transition-all duration-300 scale-0 -translate-x-[90px] -translate-y-6 peer-hover:-translate-y-[25px] peer-hover:translate-x-1 peer-hover:scale-100 hover:-translate-y-[25px] hover:translate-x-1 hover:scale-100"> <img className='cursor-pointer transition-all duration-300 hover:scale-[1.2] hover:-translate-y-2' src={likegif} alt="" onClick={()=>{likePost()}}/> <img className='cursor-pointer transition-all duration-300 hover:scale-[1.2] hover:-translate-y-2' src={dislikegif} alt="" onClick={()=>{dislikePost()}}/> <img className='cursor-pointer transition-all duration-300 hover:scale-[1.2] hover:-translate-y-2' src={wowGif} alt="" /> <img className='cursor-pointer transition-all duration-300 hover:scale-[1.2] hover:-translate-y-2' src={laughgif} alt="" />  <img className='cursor-pointer transition-all duration-300 hover:scale-[1.2] hover:-translate-y-2' src={caregif} alt="" /></div>

                <div className="comment flex gap-2 items-center cursor-pointer"   onClick={(e)=>{handleButtonClick(e, commentPopup); getPostComments()}}><img src={commentblankicon} alt="" /> <span>Comment</span></div>












                <div ref={commentPopup} className={`w-screen h-screen fixed left-0 top-0 backdrop-blur-[2px] ${child === commentPopup && active ? 'showFromTop z-50' : 'hideFromBottom'}`} onClick={(e)=>{ commentContainer.current.contains(e.target) ? '' : setChild(null)}}>

                <div ref={commentContainer}  className={`createComment bg-white  absolute z-50 flex flex-col  justify-between  left-[23.3%] bottom-[5%] boxShadow rounded w-[820px] h-[670px] `}>
                    <div className="upper relative flex justify-center items-center shadow w-full h-[9%] text-lg font-bold tracking-wide bg-gray-100">Bhushan's Post  <MdClose className='absolute right-2 top-2 cursor-pointer ' onClick={()=>{setChild(null)}} /></div>

                    <div ref={middleDivRef} id='middle' className="middle flex flex-col gap-3 pt-3 overflow-y-auto no-scrollbar w-full h-[74%] ">
                        <div className='UserInfo flex items-center gap-3 px-4'>
                            <div className="profilePhoto flex justify-center items-center rounded-full w-[40px] h-[40px] bg-slate-400 border ">
                                <img className='rounded-full' src={postInfo.author.profileImage} alt="" />
                            </div>

                            <div className='channalName&PostInfo flex flex-col justify-center leading-5 h-[40px] '>
                                <div className="channalInfo flex items-center gap-2 ">
                                    <span className='font-semibold'>{postInfo.author.name}</span>
                                    <div className='w-1 h-1 bg-gray-500 rounded-full' />
                                    <span className='font-semibold text-blue-500'>Follow</span>
                                </div>
                                <div className="postInfo flex items-center gap-2">
                                    <span className='text-sm  text-gray-500'>Recomended post</span>
                                    <div className='w-1 h-1 bg-gray-500 rounded-full' />
                                    <span className='text-sm text-gray-500'>{years > 0 ? `${years} years`: ``} {months > 0 ? `${months} months`: ``} {days > 0 ? `${days} days` : ``} { years == 0 && months==0 && days==0 ? `${hours} hours` : ``} ago</span>
                                    <div className='w-1 h-1 bg-gray-500 rounded-full' />
                                    <span className='text-sm text-gray-500'>public</span>
                                </div>
                            </div>
                        </div>

                        <div  className='WhatsOnUsersMind px-4'> {postInfo.content} </div>

                        <div className='Photo w-full px-1'>
                            <img className='w-full rounded' src={postInfo.images[0]} alt="" />
                        </div>

                        {
                          comments.map((comment, i)=>{
                              
                            return   <div id={`comment${i}${postId}`} key={`comment${i}${postId}`} className={`commentsOnPost relative flex gap-2 px-4`}>
                                          
                                          <div className="profilePhoto flex justify-center items-center rounded-full w-[40px] h-[40px] bg-slate-400 border ">
                                              <img className='rounded-full' src={userIcon} alt="" />
                                          </div>
                                          
                
                                          <div className="nameAndComment relative flex flex-col bg-slate-200 rounded-lg px-3 gap-1 py-1 min-w-[200px]" >
                                            <div className="flex justify-between items-center relative"> <span className='font-semibold'>{comment.author_details.name}</span> <span className='text-[9px] peer'>{new Date(comment.createdAt).getDate()} {yearMonths[new Date(comment.createdAt).getMonth()]} {new Date(comment.createdAt).getFullYear()}</span> <p className='absolute text-[9px] -right-10 opacity-0 peer-hover:opacity-100'>{new Date(comment.createdAt).getHours()} : {new Date(comment.createdAt).getMinutes()}</p></div>
                                            
                                            <span>{comment.content}</span>

                                           { 
                                             comment.author === myAuthorId && <div className="deleteIcon flex items-center gap-3  absolute -right-[120px] bottom-1"><MdDeleteForever className='peer cursor-pointer text-slate-500' onClick={()=>{deleteCommentOnPost(comment._id);}}/> <p className='opacity-0  transition-all duration-700 peer-hover:opacity-100 text-[9px] font-semibold text-red-400'> Delete your comment</p></div> 
                                           }

                
                                          </div>

                                      </div>
                          })
                        }





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
                                    onChange={(e)=>{setCommentContent(e.target.value)}}
                                    value={commentContent}
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
                                <div className="sendbtn cursor-pointer" onClick={()=>{commentOnPost(); }}>
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