import React from 'react'
import technology from './assets/technology.jpg'
import { FaUserLarge } from 'react-icons/fa6'

function Usercard({postInfo}) {
  return (
    <div className='w-[150px] xl:w-[230px] xl:h-[385px] rounded-xl flex flex-col justify-between bg-white boxShadow'>
      <div className="imageAndName flex flex-col ">
        <div className='w-full xl:h-[230px] h-[150px] rounded-md bg-gray-50 p-[4px] '>{postInfo.author.profileImage != null ? <img className='w-full rounded-t-md' src={postInfo.author.profileImage} alt="" /> : <FaUserLarge className='w-full h-full text-gray-100 p-2'/> }</div>
        <span className='font-semibold p-2 capitalize xl:text-base text-sm'>{postInfo.author.name}</span>
      </div>
      <div className="addFriendAndRemove flex flex-col gap-2 p-2">
        <div className="addFriend flex justify-center items-center rounded-md py-1 font-semibold text-blue-500 bg-blue-100 xl:text-base text-sm"><button>Add Friend</button></div>
        <div className="addFriend flex justify-center items-center rounded-md py-1 font-semibold bg-gray-100 xl:text-base text-sm"><button>Remove</button></div>
      </div>
    </div>
  )
}

export default Usercard