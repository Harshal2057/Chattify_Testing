import React from 'react'
import { useState } from 'react'
import { assets } from '../assets/assets.js'
import { authStore } from '../store/authStore.js'

const Login = () => {

    //Store
    const {login , signUp ,logOut} = authStore();

    const [state, setstate] = useState("login")
    const [form , setForm] = useState({
      name :"",
      email : "",
      password : ""
    })

   const handleChange = (e) => {
  const { name, value } = e.target;
  setForm(prevForm => {
    const updatedForm = {
      ...prevForm,
      [name]: value
    };
    console.log(updatedForm); 
    return updatedForm;
  });
};

const handleSubmit = async(e) => {
    e.preventDefault();

    if (state === "login") {
       login(form);
    }else{
       signUp(form)
    }
   
}


  return (
    <div className='min-h-screen w-screen bg-gray-100 overflow-hidden'>
      
      <div className='min-h-screen w-screen relative'>
        
        {/* Background image */}
        <div className='min-h-screen w-screen relative z-0'>
          <img 
            src={assets.loginImage}
            className='clip-background h-screen w-full object-cover'
            alt="Background"
          />
        </div>

        {/* Overlay container */}
        <div className='bg-white w-4/6 h-4/5 p-3 absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-[60px]'>
            <div className='w-full h-full'>
                <div className='w-full h-full '>
                 <img 
                src={assets.loginImage} 
                className='clip-background w-full h-full object-cover relative rounded-[55px]'
                style={{ clipPath: 'polygon(0 0, 59% 0, 46% 100%, 0% 100%)' }}
                />
                </div>
               
             {/****************** Headings ********************************* */}
                <div className='absolute text-center top-10 left-[64%]'>
                    <div className='text-8xl font-bold font-Bangers'>
                        {state === "login" ?<p>Welcome!</p> :<p>Hey! There</p> }
                    </div>
                    <div className='text-gray-500 text-2xl font-Montserrat'>
                        <p>welcome to Chattify</p>
                    </div>
                </div>
            {/****************** Input ********************************* */}
            <form onSubmit={handleSubmit}>
                   <div className='w-4/12 h-auto flex flex-col gap-9 absolute text-center top-4/12 left-[60%] '>
                    {state === "signUp" && <div className=''>
                        <input type="text" name='name' value={form.name} onChange={handleChange}  placeholder='fullname'
                            className='w-full border-2 border-gray-300 p-3 text-start rounded-2xl'
                        />
                    </div>}

                    <div>
                       <input type="text" name='email' value={form.email} onChange={handleChange} placeholder='email'
                            className='w-full border-2 border-gray-300 p-3 text-start rounded-2xl'
                        />
                    </div>

                     <div>
                       <input type='password' name='password' value={form.password} onChange={handleChange} placeholder='password'
                            className='w-full border-2 border-gray-300 p-3 text-start rounded-2xl'
                        />
                    </div>
                </div>

                 <div 
            
            className='w-4/12 h-auto bg-[#F5761A] p-3 flex flex-col gap-9 rounded-3xl absolute text-center top-9/12 left-[60%] '>
                <button type='submit'>
                        {state === "login" ? <p>Login</p> : <p>Sign Up</p>}
                </button>
            </div>
            </form>
            {/****************** Input ********************************* */}
           
            {/****************** Input ********************************* */}
            <div className='w-4/12 h-auto  flex flex-col gap-9 rounded-3xl absolute text-center top-10/12 left-[60%] '>
               {state === "login" 
               ? <p>Don't have an account ? <span  onClick={() => setstate("signUp")} className='text-[#F5761A] font-semibold cursor-pointer'>Sign Up</span></p>
               : <p>Already have an account ? <span onClick={() => setstate("login")} className='text-[#F5761A] font-semibold cursor-pointer'>Login</span></p>}
            </div>


               
               
            </div>
        </div>
        
      </div>
    </div>
  )
}

export default Login;
