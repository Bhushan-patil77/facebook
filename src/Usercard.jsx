import React from 'react'
import technology from './assets/technology.jpg'

function Usercard({postInfo}) {
  return (
    <div className='w-[230px] h-[385px] border rounded-md flex flex-col justify-between bg-white shadow'>
      <div className="imageAndName flex flex-col">
        <div className='w-full h-[230px] rounded-md '><img className='w-full h-full object-cover  rounded-t-md' src={postInfo.author.profileImage} alt="" /></div>
        <span className='font-semibold p-2'>{postInfo.author.name}</span>
      </div>
      <div className="addFriendAndRemove flex flex-col gap-2 p-2">
        <div className="addFriend flex justify-center items-center rounded-md py-1 font-semibold text-blue-500 bg-blue-100"><button>Add Friend</button></div>
        <div className="addFriend flex justify-center items-center rounded-md py-1 font-semibold bg-gray-100"><button>Remove</button></div>
      </div>
    </div>
  )
}

export default Usercard