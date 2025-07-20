import React, { useState } from 'react'
import { useEffect } from 'react'
import { assets } from '../assets/assets'
import { authStore } from '../store/authStore'
import { chatStore } from '../store/chatStore'



const UserCard = ({ profile, userName, notification , status }) => {

 

  return (
    <div>
      <div className='w-full bg-gray-100 p-2 flex gap-5 items-center rounded-xl '>
        {/* Profile */}
        <div className=' rounded-full relative border-4 border-violet-300'>
          <img src={profile || assets.userIcon} className='size-12 rounded-full relative' />
          {status === "Online"
          ?<div className='bg-green-400 rounded-full size-3 absolute bottom-[4%] left-[90%]'></div>
          :<div></div>
          }
        </div>

        {/* User and Message */}
        <div className='flex flex-col gap-1'>
          {/* Name of User */}
          <div>
            <p className='font-bold text-[18px]'>{userName || "Amit Khurana"}</p>
          </div>

          {/* Some content of the message */}
          {/* <div>
                          <p className='text-gray-600'>{message.length > 45 ? message.slice(0 ,35) + "..." : message}</p>
                        </div> */}
        </div>

      </div>

      {/* Notification */}
      <div className='size-6 bg-violet-300 text-center rounded-full relative  left-[90%] bottom-12'>
        <p className='text-white font-semibold'>{notification || 5}</p>
      </div>
    </div>
  )
}

const Sidebar = () => {

  const { onlineUsers , signUp } = authStore();
  const { users, getUser , setSelectedUser} = chatStore();

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  

  useEffect(() => {
    getUser()
  }, [getUser , signUp]);


  const filteredUsers = showOnlineOnly
    ? users.fillteredUser.filter((user) => onlineUsers.includes(user._id))
    : users.fillteredUser;

    // console.log("ONLINE USER =>" , onlineUsers);
    
  return (
    <div className='w-full h-full mt-5 flex flex-col '>
      <div className='text-4xl m-10'>
        <p className='font-Outfit'>Chats</p>
      </div>

      {/* //UserCard */}
      <div className="flex-1 overflow-y-auto scrollbar-none">
      {
        (filteredUsers || []).map((user, i) => (
          <button key={i}
          className='w-full h-auto '
          onClick={() => setSelectedUser(user)}
          >
            <UserCard profile={user.profilePic} userName={user.name} notification={5} status={onlineUsers.includes(user._id) ? "Online" : "Offline"}/>
          </button>
        ))
      }
      </div>


    </div>
  )
}

export default Sidebar


