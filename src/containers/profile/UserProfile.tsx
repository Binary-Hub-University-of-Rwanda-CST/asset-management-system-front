import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { BiUser } from 'react-icons/bi';
import { FaCircle, FaUser, FaUserCircle } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineLogout } from 'react-icons/ai';

const UserProfile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="mr-4 animate__animated animate__faster">
    <div className="flex flex-col bg-white rounded-lg p-2">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-2 mb-2">
          <div className="flex flex-row items-center gap-1">
            <div className="flex item-center flex-col">
              <div className="flex text-black text-2xl font-bold px-2">User Profile</div>
              <div className="px-2 rounded-md bg-primary-700 text-black w-max text-sm">
                All Information that describe a system user 
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>

    <div className="rounded-lg py-4 flex flex-col   gap-6 bg-white  mt-4 p-4  "> 
      <h3 className=' text-xl   font-bold '>Profile Information</h3>
    <div className="flex items-center justify-center flex-row w-full gap-4  ">
       <div className=' flex w-1/5 flex-col gap-2 '> 
       <div className=" bg-blue-white rounded-md w-fit p-5  text-gray-400  ">
        <FaUser className='text-7xl '/>  
       </div>
       <div className=' bg-blue-white rounded-md p-1 flex flex-row font-bold gap-4 items-center '> 
      <FaUserCircle className=' text-2xl '/> 
      {/* {user?.role.name} */}
      Asset Manager 
       </div>
       <div className=' flex rounded-full border border-green-300 text-green-600 font-bold w-fit pr-3 gap-2  items-center  '>
        <FaCircle className='text-2xl text-green-400 animate__animated  animate__bounceIn animate__infinite  animate__fast'/> 
         Active</div>
         <div className='flex gap-3 font-bold  p-1 '>
          <RiLockPasswordLine className='text-2xl '/> 
          My Password 
         </div>
         <div className='flex gap-3 font-bold  p-1  bg-warning rounded-md  '> 
          <AiOutlineLogout className='text-2xl '/>   
          Logout
         </div>
       </div> 
       <div className=' w-4/5 flex flex-col  ' >
       <p className=' flex flex-col  my-1'> Full Names <span className='font-bold capitalize '>{user?.names}</span></p>
       <p className=' flex flex-col  my-1'> Phone <span className='font-bold  '>{user?.phone}</span></p>
       <p className=' flex flex-col  my-1'> Email <span className='font-bold  '>{user?.email}</span></p>
       {/* <p className=' flex flex-col  my-1'> Full Names <span className='font-bold  '>{user?.names}</span></p> */}
       </div>
       
        </div>
      </div>
     
    </div>
  
   
  );
};

export default UserProfile; 
