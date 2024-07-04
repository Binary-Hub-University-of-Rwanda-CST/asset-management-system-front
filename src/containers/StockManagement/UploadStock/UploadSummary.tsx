import React from 'react'

import { FaTimes, FaPlus } from "react-icons/fa";
function UploadSummary() {
  return (
    <div className='flex flex-col gap-2  '>
      <div className='flex p-2 bg-blue-white w-full justify-between rounded-md items-center   '>
        <span className='font-bold text-sm '>1.LAPTOP  </span>
       <div className='flex gap-4 '>
       <span className=' bg-white border-2 border-my-blue rounded-full py-0  px-6  flex items-center'>muhabura building</span>
       <span className=' font-bold text-success'>230</span> 
       <button className=' rounded-full  bg-danger p-2 '>
        <FaTimes className='text-red-700'/>
        </button>
       </div>
      </div>
      <div className='flex p-2 bg-blue-white w-full justify-between rounded-md items-center   '>
        <span className='font-bold text-sm '>1.PROJECT  </span>
       <div className='flex gap-4 '>
       <span className=' bg-white border-2 border-my-blue rounded-full py-0  px-6  flex items-center'>Agaciro building</span>
       <span className=' font-bold text-success'>75</span>  
       <button className=' rounded-full  bg-danger p-2 '>
        <FaTimes className='text-red-700'/>
        </button>
       </div>
      </div>
      
      <button className=' flex justify-start items-center gap-4 p-2  border-2 border-blue-white rounded-md font-bold text-sm   capitalize '>
        <FaPlus className='font-bold text-md  text-my-blue'/>
        add other assets</button>  
    </div>
  )
}

export default UploadSummary
