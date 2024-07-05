import './styles/Custom.css';
import React, { useEffect, useRef, useState } from 'react';
import { IoClose, IoCloseOutline } from 'react-icons/io5';
import { RiArrowDropDownLine } from 'react-icons/ri';


function Signup({setisloggedin,setpopupshow}) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const years = [ 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994 ]

  const [active, setActive] = useState(false);
  const [parent, setParent] = useState(null);
  const [child, setChild] = useState(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [data, setData] = useState({});
  const [year, setYear]= useState(new Date().getFullYear())
  const [month, setMonth]=useState(new Date().getMonth()+1)
  const [stringMonth, setStringMonth]=useState(months[new Date().getMonth()])
  const [day, setDay]=useState(new Date().getDate())
  const [days, setDays]=useState(new Date(year, month, 0).getDate());
  const [localLoggedIn , setLocalLoggedIn]=useState()
  const [openned, setOpenned]=useState();

  const dayDropdown = useRef()
  const monthDropdown = useRef()
  const yearDropdown = useRef()


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


  useEffect(()=>{
    console.log(parent);
    console.log(child);
  },[child, parent])

  const projectId = '6xetdqeg0242';
  const baseUrl = 'https://academics.newtonschool.co/api/v1/user/signup';








useEffect(()=>{
  setDays(new Date(year, month, 0).getDate())
},[month,year])



const handleSubmit = (e) =>{
  console.log('called');
  e.preventDefault();
  let input = 0;

  const mobileNumber = e.target[0].value;
  const newPassword = e.target[1].value;
  const day = e.target[3].value;
  const month = e.target[5].value;
  const year = e.target[7].value;
  const firstName = e.target[8].value;
  const surname = e.target[9].value;

  const Form = document.getElementById('form');
  const gender = Form.querySelector('input[name="gender"]:checked').value;





  handleSignup(mobileNumber, newPassword, day, month, year, firstName, surname, gender)
}

  const handleSignup = async (mobileNumber, newPassword, day, month, year, firstName, surname, gender) => {

    if (mobileNumber && newPassword && day && month && year && firstName && surname && gender) {
      try {
        var response = await fetch(baseUrl, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            projectID: projectId
          },
          body: JSON.stringify({
            name: firstName,
            email: mobileNumber,
            password: newPassword,
            appType: 'facebook',
          }),
        })

        response = await response.json();
        console.log(response);


        if (response.status === "success") {
          localStorage.setItem("user", JSON.stringify(response.data.user))
          localStorage.setItem('userInfo', JSON.stringify({'Name': firstName, 'Surname': surname, 'Gender': gender ,'DOB': `${day}/${month}/${year}`}))
          localStorage.setItem("token", response.token)
          setisloggedin(true)
          setLocalLoggedIn(true)
          setpopupshow('')
        }

        if (response.status === "fail") {
          alert(response.message)
        }
      } catch (error) {
        console.log("something went wrong...!");
      }


    }
    else {
      alert("Enter all filds...")
    }




  }



  return (

    <div className='MAIN bg-[#f0f2f5] w-screen h-screen flex justify-center items-center'>

      <div className="relative shadow w-[30%] bg-white  flex flex-col  rounded-xl">
        <span className='absolute top-3 right-3'> <IoCloseOutline /></span>
        <div className="heading flex flex-col gap-1 border-b p-3 "> <p className='text-3xl font-bold'>Sign Up</p> <p className='tracking-tight font-semibold text-gray-600'>It's quick and easy.</p></div>
        <div id='form' className="form  p-4">
          <form action=""  onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 ">
              <div className="mobileoremail w-full ]  rounded text-lg"> <input className='bg-[#f5f6f7] w-full h-[40px] border-[1px] border-gray-300 rounded outline-none pl-2' type="text" placeholder='Mobile number or email address' />  </div>
              <div className="newpassword w-full ]  rounded text-lg"> <input className='bg-[#f5f6f7] w-full h-[40px] border-[1px] border-gray-300 rounded outline-none pl-2' type="text" placeholder='New password' /> </div>
              <div className="dob flex flex-col " >
                <p className='text-xs'>Date of birth</p>
                <div className='flex justify-between gap-2'>
                  <div className="day   relative w-full h-[40px] border-[1px] border-gray-300 rounded flex">  <input className='outline-none rounded pl-3 w-[80%] h-full z-40' type="number" value={day} onChange={(e)=>{setDay(e.value)}} />          <label htmlFor="daypeer" className='w-[20%]  flex justify-center items-center'  onClick={(e)=>{handleButtonClick(e, dayDropdown)}} ><RiArrowDropDownLine className='w-8 h-8  text-gray-500' /></label>           <div ref={dayDropdown}   className={`daydropdown  absolute z-40 flex flex-col w-full  top-[110%] overflow-auto no-scrollbar shadow rounded ${child === dayDropdown && active ? 'show' : 'hide'}`}>{Array(days).fill(0).map((d, i)=>{ return <p key={i} className='bg-white  hover:bg-blue-500 cursor-pointer pl-3 flex items-center' onClick={()=>{setDay(i+1); setActive(false)}}>{i+1}</p>})}</div> </div>
                  <div className="month relative w-full h-[40px] border-[1px] border-gray-300 rounded flex">  <input className='outline-none rounded pl-3 w-[80%] h-full z-40' type="text" value={stringMonth} onChange={(e)=>{setMonth(e.value)}} /> <label htmlFor="monthpeer" className='w-[20%]  flex justify-center items-center' onClick={(e)=>{handleButtonClick(e, monthDropdown)}}><RiArrowDropDownLine className='w-8 h-8  text-gray-500' /></label>        <div ref={monthDropdown} className={`monthdropdown  absolute z-40 flex flex-col w-full  top-[110%] overflow-auto no-scrollbar shadow rounded ${child === monthDropdown && active ? 'show' : 'hide'}`}>{Array(12).fill(0).map((d, i)=>{ return <p key={i} className='bg-white  hover:bg-blue-500 cursor-pointer pl-3 flex items-center' onClick={()=>{setMonth(i+1); setStringMonth(months[i]); setActive(false)}}>{months[i]}</p>})}</div> </div>
                  <div className="year  relative w-full h-[40px] border-[1px] border-gray-300 rounded flex">  <input className='outline-none rounded pl-3 w-[80%] h-full z-40' type="number" value={year} onChange={(e)=>{setYear(e.value)}} />        <label htmlFor="yearpeer" className='w-[20%]  flex justify-center items-center' onClick={(e)=>{handleButtonClick(e, yearDropdown)}}><RiArrowDropDownLine className='w-8 h-8  text-gray-500' /></label>          <div ref={yearDropdown}  className={`yeardropdown  absolute z-40 flex flex-col w-full  top-[110%] overflow-auto no-scrollbar shadow rounded ${child === yearDropdown && active ? 'show' : 'hide'}`}>{years.map((y, i)=>{ return <p key={i} className='bg-white  hover:bg-blue-500 cursor-pointer pl-3 flex items-center'  onClick={()=>{setYear(y); setActive(false)}}>{y}</p>})}</div> </div>
                </div>
              </div>
              <div className="firstnameandsurname w-full ]  rounded text-lg flex gap-2"> <input className='bg-[#f5f6f7] w-full h-[40px] border-[1px] border-gray-300 rounded outline-none pl-2' type="text" placeholder='First name' />   <input className='bg-[#f5f6f7] w-full h-[40px] border-[1px] border-gray-300 rounded outline-none pl-2' type="text" placeholder='Surname' /> </div>
              <div className="gender flex flex-col">
              <p className='text-xs'>Gender</p>
                <div className='flex justify-between gap-2'>
                  <label htmlFor='female' className="female w-full h-[40px] border-[1px] border-gray-300 rounded flex justify-between px-2 items-center">Female <input id='female' type="radio" name='gender' value={'female'}/> </label>
                  <label htmlFor='male' className="female w-full h-[40px] border-[1px] border-gray-300 rounded flex justify-between px-2 items-center">Male <input id='male' type="radio" name='gender' value={'male'}/> </label>
                  <label htmlFor='custome' className="female w-full h-[40px] border-[1px] border-gray-300 rounded flex justify-between px-2 items-center">Custome <input id='custome' type="radio" name='gender' value={'custome'}/> </label>
                </div>
              </div>
            </div>
            <div className="text flex flex-col gap-2 text-xs  text-gray-400 p-4"><p>People who use our service may have uploaded your contact information to Facebook. Learn more.</p> <p>By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive SMS notifications from us and can opt out at any time.</p></div>
            <div className="button flex justify-center items-center p-4"> <button type='submit' className='font-bold text-xl bg-[#00a400] text-white px-12 py-[4px] rounded-md'>Sign Up</button></div>
          </form>
        </div>
       
      </div>
       
    </div>
  )
}

export default Signup