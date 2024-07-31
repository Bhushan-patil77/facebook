import React, { useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import './styles/Custom.css'
import Signup from './Signup';
import { FaFacebook } from 'react-icons/fa';
import { PiMetaLogoBold } from 'react-icons/pi';

function Login({setisloggedin,setpopupshow}) {
  const navigate = useNavigate()

  const [email, setEmail] = useState('bbb@gmail.com');
  const [pass, setPass] = useState('bbb');

  const [signupPopup, setSignupPopup] = useState(false)

  const myref = useRef();

  const projectId = '6xetdqeg0242';
  const baseUrl = 'https://academics.newtonschool.co/api/v1/user/login';

  const setloginStatus = () =>{
    setisloggedin(true)
    setpopupshow('')
  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    const email = e.target[0].value;
    const pass = e.target[1].value;

    handleLogin(email, pass)
  }

  const handleLogin = async (email, pass) => {
    
    if(email !=='' && pass !=='')
      {
              
        try {

              var response = await fetch(baseUrl, {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                  projectID: projectId
                },
                body: JSON.stringify({
                  email: email,
                  password: pass,
                  appType: 'facebook',
                }),
              })

              response = await response.json();

            if (response.status === "success")
            {
                localStorage.setItem("user", JSON.stringify(response.data.user))
                localStorage.setItem("token", response.token)
                console.log('navigating');
                navigate('/')
                
                
                
              }

              if (response.status === "fail") {
                alert(response.message)
              }

        }
        catch (error) 
        {
              console.log(error.message);
        }  
      }
      else
      {
        alert('Please Enter email and password..')
      }

  

  }
  return (


      <div className='w-screen h-screen bg-gradient-to-b from-white to-blue-200 xl:bg-[#f0f2f5] flex xl:flex-row flex-col xl:justify-center gap-12 xl:gap-0 items-center'>


          <div className='xl:hidden flex flex-col gap-12 p-4 w-full'>
            <span className='w-full flex justify-center text-sm text-gray-400'>English (UK)</span>
            <span className='w-full flex justify-center '><FaFacebook className='w-16 h-16 text-blue-500'  /></span>
          </div>

        {
          signupPopup && <div className='absolute w-full h-full z-50 flex flex-col justify-center items-center gap-2 '> <Signup/> <span className='flex gap-2'>Already have an account ? <p className='text-blue-500 font-bold cursor-pointer' onClick={()=>{setSignupPopup(false)}}>Login</p> </span></div>
        }

    

        <div className='w-[40%] h-full hidden xl:flex  justify-center pt-[18%]'>
          <div className='w-[70%] flex flex-col gap-4'>
          <h1 className='text-[#0866ff] text-6xl font-bold  fade-in delay-1'>facebook</h1>
          <p className='text-2xl font-semibold fade-inz delay-2'>Facebook helps you connect and share with the people in your life.</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 xl:bg-white rounded-xl w-full xl:w-[30%] p-4 fade-in delay-3">
          <form className='w-full flex flex-col gap-3' onSubmit={handleSubmit}>

            <input className='border borderbalck w-full h-[50px] text-lg pl-3 rounded-lg outline-[1px] outline-[#0866ff]' type="email" placeholder='Email address or phone number' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            <input className='border borderbalck w-full h-[50px] text-lg pl-3 rounded-lg outline-[1px] outline-[#0866ff]' type="password" placeholder='Password' value={pass} onChange={(e)=>{setPass(e.target.value)}} />
            <button type='submit' className='w-full h-[50px] bg-[#0866ff] rounded-full xl:rounded-lg text-white text-lg xl:font-bold'>Log in</button>

          </form>

          <p className='flex justify-center text-blue-500 py-2'>Forgotten password?</p>

          <div className="border xl:block hidden w-full "></div>

          <button className='border w-full xl:w-[45%] h-[50px] mt-4 rounded-full border-blue-500  xl:outline-none xl:rounded-lg xl:text-white text-blue-500 xl:bg-[#42b72a] xl:font-bold' onClick={()=>{setSignupPopup(true)}}>Create new account</button>

        </div>

        <div className="xl:hidden flex flex-col gap-6">
          <span className=' flex justify-center items-center gap-2'> <PiMetaLogoBold /> Meta</span>
          <span className="flex text-xs gap-3 text-gray-400"><p>About</p> <p>Help</p> <p>More</p></span>
        </div>

      </div>

  )
}

export default Login