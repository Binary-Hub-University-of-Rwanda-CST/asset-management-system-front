import React from 'react'
import { Link } from 'react-router-dom'
function PageNotFound() {
  return (
    <div className=' flex w-full h-full justify-center items-center  flex-col'>
      <h1 className=' animate-bounce text-xl  '>sorry page you are looking for not found</h1>
      
      <Link to='/' className= ' bg-blue-white py-2 rounded-xl px-10 text-my-blue font-bold hover:underline '>back to home</Link>
    </div>
  )
}

export default PageNotFound
