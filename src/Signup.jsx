import './styles/Custom.css';
import { Checkmark } from 'react-checkmark'
import React, { useEffect, useRef, useState } from 'react';
import { IoClose, IoCloseOutline } from 'react-icons/io5';
import { RiArrowDropDownLine } from 'react-icons/ri';
import './styles/Custom.css'
import { useNavigate } from 'react-router-dom';
import { TbOval } from 'react-icons/tb';
import { Oval } from 'react-loader-spinner';
import { SiMaas } from 'react-icons/si';


function Signup({setisloggedin,setpopupshow}) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const years = [ 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994 ]

  const [active, setActive] = useState(false);
  const [parent, setParent] = useState(null);
  const [child, setChild] = useState(null);

  const [name, setName] = useState('');
  const [surName, setSurname]=useState('')
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
  const [focusedInput, setFocusedInput]=useState();
  const [typingInput, setTypingInput]=useState()
  const [errors, setErrors]=useState({'gmail':'', 'pass':'', 'name':'', 'surname':''})
  const [isFormValid, setIsFormValid]=useState(false)

  const navigate = useNavigate()

  const dayDropdown = useRef()
  const monthDropdown = useRef()
  const yearDropdown = useRef()

  useEffect(()=>{
    console.log(typingInput);
  let timer =  setTimeout(() => {

      setTypingInput('');
     clearTimeout(timer)
      
    }, 1000);
  },[typingInput])




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
    Object.keys(errors).map((e)=>{
      let flag = true;
      if(errors[e]!='valid')
      {
        flag=false
      }

      setIsFormValid(flag)
    })

    console.log(errors);
  },[errors])


  const projectId = '6xetdqeg0242';
  const baseUrl = 'https://academics.newtonschool.co/api/v1/user/signup';




// useEffect(()=>{
//   console.log('focusedInput', focusedInput);
//   console.log('typingInput', typingInput);

//   if(focusedInput !== typingInput)
//   {
//     validateInput(typingInput)
//   }

// },[focusedInput, typingInput])

// const validateInput = (inputToValidate) => {
//   let newErrors = { ...errors };

//   if (inputToValidate === 'email') {
//     if (email === '') {
//       newErrors.email = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       newErrors.email = 'Invalid email format';
//     } else {
//       delete newErrors.email;
//     }
//   }

//   if (inputToValidate === 'password') {
//     if (pass === '') {
//       newErrors.pass = 'Password is required';
//     } else if (pass.length < 6) {
//       newErrors.pass = 'Password must be at least 6 characters';
//     } else if (/\s/.test(pass)) {
//       newErrors.pass = 'Password must not contain spaces';
//     } else {
//       delete newErrors.pass;
//     }
//   }

  
//   if (inputToValidate === 'firstName') {
//     if (name === '') {
//       newErrors.name = 'Name is required';
//     } else if (/\s/.test(name)) {
//       newErrors.name = 'name must not contain spaces';
//     } else {
//       delete newErrors.name;
//     }
//   }

//   if (inputToValidate === 'surName') {
//     if (surName === '') {
//       newErrors.name = 'Surname is required';
//     } else if (/\s/.test(surName)) {
//       newErrors.name = 'Surname must not contain spaces';
//     } else {
//       delete newErrors.surname;
//     }
//   }

//   setErrors(newErrors);
// };


useEffect(()=>{
  if(!email)
  {
    setErrors((prev)=>{
      return {...prev , gmail:'gmail not available'}
    })
  }
  else if(email.includes(' '))
  {
    setErrors((prev)=>{
      return {...prev , gmail:'blank space is not allowed'}
    })
  }
  else if(!email.includes('@gmail.com'))
  {
    setErrors((prev)=>{
      return {...prev , gmail:'invalid gmail format'}
    })
  }
  else
  {
    setErrors((prev)=>{
      return {...prev , gmail:'valid'}
    })
  }

  
   
 
  },[email])

 


useEffect(()=>{

  if(!pass)
  {
    setErrors((prev)=>{
      return {...prev , pass:'password not available'}
    })
  }

  else if(pass.includes(' '))
    {
      setErrors((prev)=>{
        return {...prev , pass:'blank space is not allowed'}
      })
    }
    else if(pass.length <= 5)
    {
      setErrors((prev)=>{
        return {...prev , pass:'password length should be greater than 5'}
      })
    }
    else
    {
      setErrors((prev)=>{
        return {...prev , pass:'valid'}
      })
    }

    
},[pass])

useEffect(()=>{
  if(!name)
  {
    setErrors((prev)=>{
      return {...prev , name:'name not available'}
    })
  }

else if(name.includes(' '))
    {
      setErrors((prev)=>{
        return {...prev , name:'blank space is not allowed'}
      })
    }
 
    else
    {
      setErrors((prev)=>{
        return {...prev , name:'valid'}
      })
    }

},[name])

useEffect(()=>{

  if(!surName)
  {
    setErrors((prev)=>{
      return {...prev , surname:'surname not available'}
    })
  }

  else if(surName.includes(' '))
    {
      setErrors((prev)=>{
        return {...prev , surname:'blank space is not allowed'}
      })
    }

    else
    {
      setErrors((prev)=>{
        return {...prev , surname:'valid'}
      })
    }

},[surName])


useEffect(()=>{
  setDays(new Date(year, month, 0).getDate())
},[month,year])



const getAge = () =>{
  var today = new Date();
  var age = today.getFullYear() - year;
  if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
    age--;
  }

  return age
}






const handleSubmit = (e) =>{
  e.preventDefault();

  let age = getAge()


  if(age >= 13)
  {
    const mobileNumber = e.target[0].value;
    const newPassword = e.target[1].value;
    const day = e.target[2].value;
    const month = e.target[3].value;
    const year = e.target[4].value;
    const firstName = e.target[5].value;
    const surname = e.target[6].value;
  
    const Form = document.getElementById('form');
    const gender = Form.querySelector('input[name="gender"]:checked').value;
  
    handleSignup(mobileNumber, newPassword, day, month, year, firstName, surname, gender)
  }
  else
  {
      alert('Age is less than 13 years. You cannot create account')
  }

 }



  const handleSignup = async (mobileNumber, newPassword, day, month, year, firstName, surname, gender) => {

    if (mobileNumber && newPassword && day && month && year && firstName && surname && gender) {
      try {
        console.log('tried');
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
        
          console.log(response.token);
          navigate('/')
        }

        if (response.status === "fail") {
          alert(response.message)
        }
      } catch (error) {
        console.log(error);
        console.log("something went wrong...!");
      }


    }
    else {
      alert("Enter all filds...")
    }




  }






  return (

    <div className='MAIN  w-full h-[85%] flex justify-center items-center backdrop-1 rounded-xl px-'>

     

      <div className="relative  xl:w-[30%] bg-white  flex flex-col  rounded-xl fade-in boxShadow ">
        <div className="heading flex flex-col gap-1 border-b p-3 "> <p className='text-3xl font-bold'>Sign Up</p> <p className='tracking-tight font-semibold text-gray-600'>It's quick and easy.</p></div>
        <div id='form' className="form  p-4">
          <form action=""  onSubmit={handleSubmit}  >
            <div className="flex flex-col gap-2 ">
              <div className="mobileoremail relative  w-full  rounded text-lg"> <input className='bg-[#f5f6f7] w-full h-[40px] border-[1px] border-gray-300 rounded outline-none pl-2' value={email} fildType='gmail' type="text" placeholder='Mobile number or email address'  onClick={()=>{setFocusedInput('email')}} onChange={(e)=>{setEmail(e.target.value);setTypingInput('email')}}/> { typingInput === 'email' ? <div className='absolute right-2 top-[15px]'><Oval strokeWidth={8} width={10} height={10}/></div> : <div className='absolute right-2 top-[15px] w-2 h-2'>{errors.gmail === 'valid' ? <Checkmark size='10px'/> : ''}</div> }   { errors.gmail !== 'valid' && typingInput ==='email' ? <div className="absolute  h-4 text-[9px] font-semibold left-4 -top-[8px] bg-gray-100 px-3  tracking-widest  text-red-400 flex justify-center items-center rounded-lg "> {errors.gmail}</div> : ''}  </div>
              <div className="newpassword relative w-full ]  rounded text-lg"> <input className='bg-[#f5f6f7] w-full h-[40px] border-[1px] border-gray-300 rounded outline-none pl-2' value={pass} fildType='password' type="text" placeholder='New password' onClick={()=>{setFocusedInput('password')}} onChange={(e)=>{setPass(e.target.value); setTypingInput('password')}}/>  { typingInput === 'password' ? <div className='absolute right-2 top-[15px]'><Oval strokeWidth={8} width={10} height={10}/></div> : <div className='absolute right-2 top-[15px] w-2 h-2'>{errors.pass === 'valid' ? <Checkmark size='10px'/> : ''}</div> }  { errors.pass !== 'valid' && typingInput ==='password' ? <div className="absolute  h-4 text-[9px] font-semibold left-4 -top-[8px] bg-gray-100 px-3  tracking-widest  text-red-300 flex justify-center items-center rounded-lg "> {errors.pass}</div> : ''}  </div>
              {/* <div className="newpassword w-full ]  rounded text-lg"> <input className='bg-[#f5f6f7] w-full h-[40px] border-[1px] border-gray-300 rounded outline-none pl-2' type="text" placeholder='Confirm password' /> </div> */}
              <div className="dob flex flex-col " >
                <p className='text-xs'>Date of birth</p>
                <div className='flex justify-between gap-2'>
                  <div className="day   relative w-full h-[40px] border-[1px] border-gray-300 rounded flex" >  <input className='outline-none rounded pl-3 w-[80%] h-full z-40' type="number" value={day} onChange={(e)=>{setDay(e.value);}} />          <label htmlFor="daypeer" className='w-[20%]  flex justify-center items-center'  onClick={(e)=>{handleButtonClick(e, dayDropdown); setFocusedInput('day')}} onChange={()=>{typingInput('day')}}><RiArrowDropDownLine className='w-8 h-8  text-gray-500' /></label>           <div ref={dayDropdown}   className={`daydropdown  absolute z-40 flex flex-col w-full  top-[110%] max-h-[300px] overflow-auto no-scrollbar shadow rounded ${child === dayDropdown && active ? 'showFromTop' : 'hideFromBottom'}`}>{Array(days).fill(0).map((d, i)=>{ return <p key={i} className='bg-white  hover:bg-blue-500 cursor-pointer pl-3 flex items-center' onClick={()=>{setDay(i+1); setActive(false)}}>{i+1}</p>})}</div> </div>
                  <div className="month relative w-full h-[40px] border-[1px] border-gray-300 rounded flex">  <input className='outline-none rounded pl-3 w-[80%] h-full z-40' type="text" value={stringMonth} onChange={(e)=>{setMonth(e.value)}} /> <label htmlFor="monthpeer" className='w-[20%]  flex justify-center items-center' onClick={(e)=>{handleButtonClick(e, monthDropdown); setFocusedInput('month')} } onChange={()=>{typingInput('month')}}><RiArrowDropDownLine className='w-8 h-8  text-gray-500' /></label>                           <div ref={monthDropdown} className={`monthdropdown  absolute z-40 flex flex-col w-full  top-[110%] max-h-[300px] overflow-auto no-scrollbar shadow rounded ${child === monthDropdown && active ? 'showFromTop' : 'hideFromBottom'}`}>{Array(12).fill(0).map((d, i)=>{ return <p key={i} className='bg-white  hover:bg-blue-500 cursor-pointer pl-3 flex items-center' onClick={()=>{setMonth(i+1); setStringMonth(months[i]); setActive(false)}}>{months[i]}</p>})}</div> </div>
                  <div className="year  relative w-full h-[40px] border-[1px] border-gray-300 rounded flex">  <input className='outline-none rounded pl-3 w-[80%] h-full z-40' type="number" value={year} onChange={(e)=>{setYear(e.value)}} />        <label htmlFor="yearpeer" className='w-[20%]  flex justify-center items-center' onClick={(e)=>{handleButtonClick(e, yearDropdown); setFocusedInput('year')}} onChange={()=>{typingInput('year')}}><RiArrowDropDownLine className='w-8 h-8  text-gray-500' /></label>                            <div ref={yearDropdown}  className={`yeardropdown  absolute z-40 flex flex-col w-full  top-[110%] max-h-[300px] overflow-auto no-scrollbar shadow rounded ${child === yearDropdown && active ? 'showFromTop' : 'hideFromBottom'}`}>{years.map((y, i)=>{ return <p key={i} className='bg-white  hover:bg-blue-500 cursor-pointer pl-3 flex items-center'  onClick={()=>{setYear(y); setActive(false)}}>{y}</p>})}</div> </div>
                </div>
              </div>
              <div className="firstnameandsurname w-full ]  rounded text-lg flex gap-2"> <div className='w-full relative'><input className='bg-[#f5f6f7] w-full h-[40px] border-[1px] border-gray-300 rounded outline-none pl-2' type="text" placeholder='First name' onClick={()=>{setFocusedInput('firstName')}} onChange={(e)=>{setName(e.target.value);setTypingInput('firstName')}}/>    { typingInput === 'firstName' ? <div className='absolute right-2 top-[15px]'><Oval strokeWidth={8} width={10} height={10}/></div> : <div className='absolute right-2 top-[15px] w-2 h-2'>{errors.name === 'valid' ? <Checkmark size='10px'/> : ''}</div> }  { errors.name !== 'valid' && typingInput ==='firstName' ? <div className="absolute  h-4 text-[9px] font-semibold left-4 -top-[8px] bg-gray-100 px-3  tracking-widest  text-red-300 flex justify-center items-center rounded-lg "> {errors.name}</div> : ''}    </div> <div className="relative w-full" > <input className='bg-[#f5f6f7] w-full h-[40px] border-[1px] border-gray-300 rounded outline-none pl-2' type="text" placeholder='Surname' onClick={()=>{setFocusedInput('surName')}} onChange={(e)=>{setSurname(e.target.value) ;setTypingInput('surName')}} />    { typingInput === 'surName' ? <div className='absolute right-2 top-[15px]'><Oval strokeWidth={8} width={10} height={10}/></div> : <div className='absolute right-2 top-[15px] w-2 h-2'>{errors.surname === 'valid' ? <Checkmark size='10px'/> : ''}</div> } { errors.surname !== 'valid' && typingInput ==='surName' ? <div className="absolute  h-4 text-[9px] font-semibold left-4 -top-[8px] bg-gray-100 px-3  tracking-widest  text-red-300 flex justify-center items-center rounded-lg "> {errors.surname}</div> : ''}  </div> </div>
              <div className="gender flex flex-col" onClick={()=>{setFocusedInput('gender')}}>
              <p className='text-xs'>Gender</p>
                <div className='flex justify-between gap-2'>
                  <label htmlFor='female' className="female w-full h-[40px] border-[1px] border-gray-300 rounded flex justify-between px-2 items-center">Female <input id='female' type="radio" name='gender' defaultChecked value={'female'}/> </label>
                  <label htmlFor='male' className="female w-full h-[40px] border-[1px] border-gray-300 rounded flex justify-between px-2 items-center">Male <input id='male' type="radio" name='gender' value={'male'}/> </label>
                  <label htmlFor='custome' className="female w-full h-[40px] border-[1px] border-gray-300 rounded flex justify-between px-2 items-center">Custome <input id='custome' type="radio" name='gender' value={'custome'}/> </label>
                </div>
              </div>
            </div>
            <div className="text flex flex-col gap-2 text-xs  text-gray-400 p-4"><p>People who use our service may have uploaded your contact information to Facebook. Learn more.</p> <p>By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive SMS notifications from us and can opt out at any time.</p></div>
            <div className="button flex justify-center items-center p-4"> <button type='submit' className={`font-bold text-xl   px-12 py-[4px] rounded-md ${errors.gmail==='valid' && errors.pass==='valid' && errors.name==='valid' && errors.surname==='valid' ? 'bg-[#00a400] text-white' : 'bg-gray-200 text-gray-400 pointer-events-none'}`}>Sign Up</button></div>
          </form>
        </div>
       
      </div>
       
    </div>
  )
}

export default Signup