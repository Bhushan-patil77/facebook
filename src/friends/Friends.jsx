import React, { useEffect, useState } from 'react'
import friendRequestIcons from '../assets/friendRequestsIcon.png'
import friendSuggestionsIcon from '../assets/friendSuggestionsIcon.png'
import allFriendsIcon from '../assets/allFriendsIcon.png'
import birthdaysIcon from '../assets/birthdaysIcon.png'
import settisngIcon from '../assets/settingsIcon.png'
import friendsIcon from '../assets/friends.png'
import { RiArrowRightSLine } from 'react-icons/ri'
import { IoIosArrowForward } from 'react-icons/io'
import { FaUserFriends } from 'react-icons/fa'
import Usercard from '../Usercard'
import { stringify } from 'postcss'


function Friends() {
  const [state, setState] =useState()
  const [message, setMessage] = useState('')
  const [posts, setPosts] = useState([])
  const [uniquePosts, setUniuePosts]=useState([])

  useEffect(()=>{
    getPosts()
   },[])


  const getUniquePosts = (fetchedPosts) =>{
      console.log(fetchedPosts);
      const mp = new Map();

      fetchedPosts.map((post)=>{
        mp.set(post.author._id, post)
      })
     setUniuePosts(Array.from(mp.values()))
  }




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

 getUniquePosts(response.data)


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

  
  return (
    <>
    
    <div className='bg-[#f0f2f5] w-screen border-1 border-red-500 h-[720px] py-1 flex justify-between'>

      <div className="left bg-white rounded-lg flex flex-col w-[22%] h-full p-2 ">
        <div className=' w-full flex justify-between p-2 opacity-0 mountAnimation'><p className='font-bold text-2xl'>Friends</p> <span className='flex justify-center items-center w-[36px] h-[36px] bg-gray-300 rounded-full'> <img className='w-5' src={settisngIcon}  alt="" /> </span></div>
        <ul className='opacity-0 mountAnimation'>
          <li className='flex items-center gap-3 rounded-lg p-2 bg-slate-100'> <span className='flex justify-center items-center w-[36px] h-[36px] bg-blue-500 rounded-full'> <FaUserFriends className='w-[25px] h-[25px] text-white' />  </span>  <p className='text-lg '>Home</p></li>
          <li className='flex items-center gap-3 rounded-lg p-2 hover:bg-slate-100 relative '> <span className='flex justify-center items-center w-[40px] h-[40px] bg-gray-200 rounded-full'> <img className='flex justify-center items-center w-[25px] h-[25px]' src={friendRequestIcons} alt="" />  </span>  <p className='text-lg '>Friend Requests</p> <IoIosArrowForward className='absolute right-0' /></li>
          <li className='flex items-center gap-3 rounded-lg p-2 hover:bg-slate-100 relative '> <span className='flex justify-center items-center w-[36px] h-[36px] bg-gray-200 rounded-full'> <img className='flex justify-center items-center w-[25px] h-[25px]' src={friendSuggestionsIcon} alt="" />  </span>  <p className='text-lg '>Suggestions</p> <IoIosArrowForward className='absolute right-0' /></li>
          <li className='flex items-center gap-3 rounded-lg p-2 hover:bg-slate-100 relative '> <span className='flex justify-center items-center w-[36px] h-[36px] bg-gray-200 rounded-full'> <img className='flex justify-center items-center w-[25px] h-[25px]' src={allFriendsIcon} alt="" />  </span>  <p className='text-lg '>All friends</p> <IoIosArrowForward className='absolute right-0' /></li>
          <li className='flex items-center gap-3 rounded-lg p-2 hover:bg-slate-100 relative '> <span className='flex justify-center items-center w-[36px] h-[36px] bg-gray-200 rounded-full'> <img className='flex justify-center items-center w-[25px] h-[25px]' src={birthdaysIcon} alt="" />  </span>  <p className='text-lg '>Birthdays</p> <IoIosArrowForward className='absolute right-0' /></li>
        </ul>
      </div>
      

      <div className="right bg-gray-100 rounded-lg w-[77%] h-full p-6 flex flex-col gap-12  overflow-y-auto no-scrollbar ">
        <span className='text-xl font-bold'>People You May Know</span>
        <div className="flex flex-wrap gap-8">
        {
        uniquePosts.length > 0 && uniquePosts.map((post, i)=>{
          return <div key={i} className='opacity-0 mountAnimation '><Usercard key={i} postInfo={post} /></div>
        })
       }
        </div>
      
      </div>

    </div>
    </>
  )
}

export default Friends