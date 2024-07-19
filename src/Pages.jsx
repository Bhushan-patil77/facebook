import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { FaCaretDown } from 'react-icons/fa'
import { IoCameraSharp } from 'react-icons/io5'
import { SiPanasonic } from 'react-icons/si'
import filtersIcon from './assets/filtersIcon.png'
import { MdError } from 'react-icons/md'
import { BiSolidSelectMultiple } from 'react-icons/bi'

function Pages() {
    const [pageName, setPageName]=useState()
    const [category, setCategory]=useState()
    const [bio, setBio]=useState()
    const projectID = '6xetdqeg0242'
    const token = localStorage.getItem('token')
    const channelId = '669a23c74cde648cc396f337'

    

    const createPage = async() =>{
        const url = `https://academics.newtonschool.co/api/v1/facebook/channel/`
        const projectId = '6xetdqeg0242'
        const token = localStorage.getItem('token')

        const formData = new FormData();
        formData.append('name', pageName);
        formData.append('description', bio);
        formData.append('images', 'hello.jpg');

        try {

            let response = await fetch (url, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'projectID': projectId,
                },
                body: formData,
            })

            response = await response.json()

            console.log(response);
            
        } catch (error) {
            
        }
    }

    async function fetchPosts() {
      try {
          const response = await fetch(`https://academics.newtonschool.co/api/v1/facebook/channels/${channelId}/posts`, {
              headers: {
                  'Authorization': token,
                  'projectID': projectID
              }
          });
          
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const data = await response.json();
          console.log(data);
      } catch (error) {
          console.error('Error:', error);
      }
  }


  return (
    <div className='flex w-screen h-[720px] border border-black rounded'>

      <div className="left flex flex-col gap-4 border w-[25%] p-4">


        <span className='text-3xl font-bold'>Create a page</span>
        <span className='text-[17px] text-gray-500'>Your Page is where people go to learn more about you. Make sure that yours has all of the information they may need.</span>
        <label className='border flex flex-col rounded-md ' htmlFor="pageName">  <input className='w-full h-full py-3 px-2 rounded-md outline-none' id='pageName' type="text" placeholder='Page name. . .' value={pageName} onChange={(e)=>{setPageName(e.target.value)}} /></label>
        <span className='text-[13px] text-gray-500'>Use the name of your business, brand or organisation, or a name that helps explain your Page. Learn more</span>
        <label className='border flex flex-col rounded-md ' htmlFor="category">  <input className='w-full h-full py-3 px-2 rounded-md outline-none' id='category' type="text" placeholder='Category. . .' value={category} onChange={(e)=>{setCategory(e.target.value)}}/></label>
        <span className='text-[13px] text-gray-500'>Enter a category that best describes you.</span>
        <div className="BioInput  border rounded-md ">
                  <textarea id='textArea' className='w-full outline-none rounded-lg p-3 min-h-28 text-wrap resize-none overflow-hidden ' placeholder="Bio. . ." rows="1" value={bio} onChange={(e)=>{setBio(e.target.value)}}
                    onInput={(e) => {
                      e.target.style.height = 'auto';
                      e.target.style.height = `${e.target.scrollHeight}px`;
                      e.target.parentElement.parentElement.style.height = `${e.target.scrollHeight + 50}px`;
                    }}
                  ></textarea>
        </div>
        <span className='text-[13px] text-gray-500'>Tell people a little about what you do.</span>
        <button className={`border py-1 rounded-md  font-semibold cursor-pointer ${pageName && category && bio ? 'text-white bg-blue-500' : 'bg-gray-300 text-gray-400 cursor-not-allowed'}`} onClick={()=>{createPage()}}>Create Page</button>
        <span className='text-[13px] text-gray-500'>By creating a Page, you agree to the Pages, Groups and Events Policies</span>




      </div>

      <div className="right flex justify-center items-center border px-6 py-12 w-[70%] bg-gray-200">

        <div className="pageContainer w-full h-full bg-white rounded-lg flex flex-col gap-4 p-4">
            <span>Preview</span>
            <div className="content flex flex-col gap-3 overflow-y-auto no-scrollbar border border-black rounded-lg p-1 h-full">
                <div className="coverPhoto relative bg-gray-200 min-h-[350px] rounded-lg">
                    <div className="profilePhoto absolute -bottom-[16px] left-[41%]  w-[180px] h-[180px] bg-white p-1 rounded-full flex justify-center items-center ">
                                <input className='absolute w-0 h-0' id='profileImage' type="file" accept="image/*"  />
                                <label className='w-full h-full' htmlFor="profileImage"><img className='w-full h-full object-cover rounded-full border border-gray-400' src={JSON.parse(localStorage.getItem('user')).profileImage} alt="" /></label>
                                <div className="absolute w-[40px] h-[40px] flex justify-center items-center rounded-full p-2 bg-gray-100 bottom-4 -right-[2px]"> <IoCameraSharp className='w-full h-full' /> </div>
                    </div>

                </div>

                <span className=' flex justify-center items-center  py-8 text-3xl font-bold '>{pageName ? <span>{pageName}</span> : <span className='text-gray-200'>Page Name</span> }</span>

                {
                    bio && <span className=' text-center'>{bio}</span>
                }

                <span className='border-b mx-4'/>

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

                <div className="bg-gray-200 p-4 gap-4 rounded-md flex flex-row justify-center items-start">

                    <div className="bg-white rounded-md intro flex flex-col gap-4 justify-between w-full p-4">
                        <span className='text-lg font-bold'>Intro</span>
                        <span className='font-semibold flex items-center gap-2'> <BiSolidSelectMultiple className='text-xl text-gray-400' /> 0 followers</span>
                        <span className='font-semibold flex items-center gap-2'> <MdError className='text-xl text-gray-400'/>Page . {category ? <span>{category}</span> : <span>Category</span> }</span>
                    </div>


                    <div className="posts bg-white rounded-md flex flex-row justify-between p-4 w-full">
                    <span className='text-lg font-bold ' onClick={()=>{fetchPosts()}}>Posts</span>
                    <span className='bg-gray-200 flex justify-center items-center gap-2 px-3 rounded'> <img src={filtersIcon} alt="" /> Filters</span>

                    </div>

                </div>

                </div>
            </div>
        </div>
        
      </div>

  )
}

export default Pages