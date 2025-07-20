import React from 'react'
import { assets } from '../assets/assets'

const NoSelectedUser = () => {
    return (
        <div className='w-full h-[820px] bg-gray-100 rounded-4xl flex flex-col gap-5 justify-center items-center opacity-60'>
            <div>
                <img src={assets.noChat} />
            </div>

            <div>
                <p className='font-Bangers text-2xl'>Select a user to start chatting</p>
            </div>

        </div>
    )
}

export default NoSelectedUser