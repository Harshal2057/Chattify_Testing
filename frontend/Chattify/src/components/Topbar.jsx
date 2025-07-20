import React, { useState , useEffect} from 'react'
import { assets } from '../assets/assets'
import { authStore } from '../store/authStore';
import { chatStore } from '../store/chatStore';

const Topbar = () => {


  const {authUser , onlineUsers} = authStore();
  const {selectedUser} = chatStore();

  // console.log("the authuser => " , authUser);
  // console.log("the selected user => " , selectedUser);
  // console.log("onlineUsers =>", onlineUsers);

  const[status , setStatus] = useState("");

  useEffect(() => {
    if (selectedUser && onlineUsers.includes(selectedUser._id)) {
      setStatus("Online");
    } else {
      setStatus("Offline");
    }
  }, [onlineUsers, selectedUser]); 

  return (
    <div className='h-1/12 bg-gray-100 flex items-center p-3 rounded-2xl '>
        <div className='flex items-center gap-10'>

          {/* pofile */}
          <div className='rounded-full border-4 border-violet-300'>
            <img src={ selectedUser.profilePic || assets.userIcon} className='size-12 rounded-full'/>
          </div>

          {/* name */}
          <div className='font-Outfit text-2xl'>
            <p>{selectedUser.name}</p>
            <p className='text-sm text-gray-500'>{status}</p>
          </div>


        </div>
        </div>
  )
}

export default Topbar