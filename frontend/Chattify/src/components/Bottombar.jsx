import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { chatStore } from '../store/chatStore';
import toast from 'react-hot-toast';


const Bottombar = () => {

  const fileInputRef = useRef(null)
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");

  //Store
  const { sendMessage } = chatStore();

  const handlePinChange = (e) => {
    const file = e.target.files[0];

    setImage(URL.createObjectURL(file));
  }

    const clearForm = () => {
    console.log("Clearing form...");
    setText("");
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    console.log("Form cleared - text:", "", "image:", null);
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    console.log("in handle submit");
    
    console.log("Form submitted - text:", text, "image:", image);


    if (!text.trim() && !fileInputRef.current.files[0]) {
      return;
    }

    const messageData = new FormData();
    messageData.append("text", text.trim());

    if (fileInputRef.current.files[0]) {
      messageData.append("image", fileInputRef.current.files[0]);
    }


    try {
      await sendMessage(messageData)

  // Clear form after successful send
      clearForm();

    } catch (error) {
      console.log("Error occured while sending message", error);

      toast.error("Error occured while sending message", error)

    }


  }


  return (
    <div className='h-1/12 w-full  rounded-2xl'>

      {
        image
          ? <div className='absolute bottom-[13%] left-[27%]'>
            <FontAwesomeIcon icon={faXmark} onClick={() => setImage(null)} className='text-xl text-violet-300 font-bold border-4 border-violet-300 bg-white rounded-full px-1 absolute left-[90%] bottom-[95%]' />
            <img src={image} className='size-40 rounded-2xl' />
          </div>
          : <></>
      }

      <form className='w-full h-full flex gap-4 rounded-2xl' onSubmit={handleSubmitForm}>
        {/* Input field */}
        <div className='w-full h-full p-2 bg-gray-100 rounded-2xl' >
          <input
            onChange={(e) => setText(e.target.value)}
            type="text" value={text} name="text" placeholder='Type your message ....' className='w-full h-full bg-transparent text-xl  focus:outline-none' />
        </div>

        <div className='w-2/12  flex justify-between '>
          <div
            onClick={() => fileInputRef.current.click()}
            className='p-1 border-4 border-violet-300 rounded-full hover:scale-105'>
            <img src={assets.pin} className='size-10' />
          </div>

          <input ref={fileInputRef} onChange={handlePinChange} type="file" name="image" accept='image/*' className='hidden' />

          <button type='submit' className='p-2 px-2 border-4 border-violet-300 rounded-full hover:scale-105'>
            <img src={assets.send} className='size-9' />
          </button>
        </div>
      </form>
    </div>
  )
}

export default Bottombar