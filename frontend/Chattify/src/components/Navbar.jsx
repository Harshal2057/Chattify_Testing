import React from 'react'
import { assets } from '../assets/assets';
//Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from 'react-router'
import { authStore } from '../store/authStore';

const Navbar = () => {

     const { logOut } = authStore();
     const navigate = useNavigate();

  return (
   <div className='bg-gray-100 p-2 flex justify-center rounded-3xl'>
                    <img src={assets.ChattifyLogo}
                        className="w-1/12"
                    />
                        {/* DROPDOWN */}
                    <details className="dropdown relative left-[42%]">
                        <summary className="btn m-1 border-4 border-violet-300 p-2 rounded-full">
                            <FontAwesomeIcon icon={faUser} className='text-2xl text-violet-300' />
                        </summary>
                        <ul className="menu dropdown-content relative right-0.5 text-xl bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            <li onClick={() => navigate("/profile")}><a>Profile</a></li>
                            <li onClick={() => logOut()} ><a>Log Out</a></li>
                        </ul>
                    </details>
                </div>
  )
}

export default Navbar