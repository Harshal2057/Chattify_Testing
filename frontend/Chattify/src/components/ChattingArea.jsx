import React from 'react'
import { chatStore } from '../store/chatStore'
import { useEffect , useRef } from 'react';
import { authStore } from '../store/authStore';
import { assets } from '../assets/assets';

const ChattingArea = () => {

  const{messages , getMessages , isLoadingMessage , selectedUser , subscribeToMessages , unSubscribeToMessages} = chatStore();
  const {authUser} = authStore();

  const messageEndRef = useRef(null)

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unSubscribeToMessages()

  }, [getMessages , selectedUser._id , subscribeToMessages ,unSubscribeToMessages ])

 useEffect(() => {

  if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({behavior:"smooth"})
  }
 },[messages])

  return (
    <div className='h-full bg-gray-100 rounded-3xl p-3 '>
        
        <div className="h-full overflow-y-scroll scrollbar-none">
          { Array.isArray(messages) && messages.map((message , i) => {
            return(
              <div key={i}
                className={`chat ${message.senderId === authUser.user._id ? "chat-end" : "chat-start" }`}
              >
                  <div className='chat-image avatar'>
                      <div className='size-10 rounded-full border'>
                              <img src={message.senderId === authUser.user._id ? authUser.user.profilePic || assets.userIcon : selectedUser.profilePic || assets.userIcon } alt='' />
                      </div>
                  </div>

                  <div className='chat-header mb-1'>
                      <time className='text-xs opacity-50 ml-1'>{message.createdAt}</time>
                  </div>
                  <div className='chat-bubble flex'>
                        {message.images && (
                          <img src={message.images} alt='attachment'
                          className='size-40 rounded-md mb-2'
                          ref={messageEndRef}
                          />
                        )}
                        {message.text && <p>{message.text}</p>}
                  </div>
              </div>
            )
          })}
        </div>

        </div>
  )
}

export default ChattingArea