import React from 'react'
import { useState } from 'react';
import Modal from '../../../../components/modal/Modal';
import { FaUser } from 'react-icons/fa6';
import { BiCheck, BiCheckCircle } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import Dropdown, {Option, dropdownStyle} from '../../../../components/Fragments/DropDown';
import { FaAngleDown } from 'react-icons/fa';


function RequestValidation() {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [reject , setReject] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const reason:string[] = ['--choose the reason-- ','Already has the Asset', 'Not Allowed to have Asset ', 'other reasons'];
    const options: Option[] = reason.map(asset => ({
            OptionName: asset,
        }));
        const dropdownStyle: dropdownStyle = {
            buttonStyle: 'flex items-center w-full  rounded-md bg-warning overflow-y-auto py-2 shadow-sm px-4  text-md font-medium text-black hover:orange-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-100 focus:ring-orange-500',
            optionStyle: 'flex w-full mx-2 justify-center  items-center'
        };
    

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Request Validation"  >
       <div className=' m-4  flex flex-col gap-3 justify-start w-[700px]'>
        <div className='flex flex-row gap-2   '>
            <div className=' w-1/2 flex flex-col   '>
                <h1 className='font-bold text-md text-warning '>ASSET REQUESTED </h1>
                <div className=' p-3 border-2 border-warning rounded-xl w-full '>
                    <table className=''>
                        <tr className=' justify-start w-full  '>
                             <td className='text-md text-gray-500 w-1/2'>category</td>
                             <td className='w-1/2  pl-4 border-none  font-semibold '>Desktop</td>
                        </tr>
                        <tr className=' justify-start w-full  '>
                             <td className='text-md text-gray-500 w-1/2'>Processor</td>
                             <td className='w-1/2  pl-4 border-none  font-semibold '>i7</td>
                        </tr>
                        <tr className=' justify-start w-full  '>
                             <td className='text-md text-gray-500 w-1/2'>RAM</td>
                             <td className='w-1/2  pl-4 border-none  font-semibold '>16 GB</td>
                        </tr>
                        <tr className=' justify-start w-full  '>
                             <td className='text-md text-gray-500 w-1/2'>ScreenSize</td>
                             <td className='w-1/2  pl-4 border-none  font-semibold '>13-Inch</td>
                        </tr>
                     </table>
             </div>
         </div>
         <div className='flex flex-col w-1/2'>
            <h1 className=' font-semibold '>STAFF DETAILS </h1>
            <div className='bg-my-gray p-4 rounded-md flex flex-col justify-center items-center w-full '>
                <span className=' bg-gray-500 p-2 rounded-md ' >
                <FaUser className='text-4xl font-bold text-white '/>

                </span>
                <h1 className=' text-gray-400 font-medium  justify-center '>staff personal info, Department & Office info </h1>
            </div>
         </div>
             </div>
        <div className='bg-my-gray rounded-lg  p-4   '>
            <h1 className=' font-semibold  '>CURRENT ASSET</h1>
            <div className='flex flex-row  gap-2 justify-center w-full  '>
                <div className='bg-white rounded-lg p-3 flex-col w-1/3 gap-2  '>
                    <div className='flex flex-row  justify-between border-b-2 border-blue-white pb-2  '>
                        <h1 className=' font-semibold '>Desktops</h1>
                         <span className='border-2 border-my-blue rounded-lg px-3  text-my-blue'>2</span></div>
                <div className='flex flex-row justify-between mt-1 '>
                    <h3 className='flex items-center gap-2 '>
                        <BiCheckCircle className=' text-green-600 font-bold  text-xl '/>
                     Active</h3> 
                     <span className=' bg-green-300 text-green-600 rounded-lg px-3 '>0</span></div>
                <div className='flex flex-row justify-between mt-1 '>
                    <h3 className='flex items-center flex-row '>
                        <IoClose className='font-bold text-xl text-warning '/> Inactive</h3>
                        <span className=' bg-orange-200 text-warning rounded-lg px-3 '>2</span></div>
                </div>
                <div className='bg-white rounded-lg p-3 flex-col w-1/3 gap-2  '>
                    <div className='flex flex-row  justify-between border-b-2 border-blue-white pb-2  '>
                        <h1 className=' font-semibold '>Laptop</h1>
                         <span className='border-2 border-my-blue rounded-lg px-3  text-my-blue'>1</span></div>
                <div className='flex flex-row justify-between mt-1 '>
                    <h3 className='flex items-center gap-2 '>
                        <BiCheckCircle className=' text-green-600 font-bold  text-xl '/>
                     Active</h3> 
                     <span className=' bg-green-300 text-green-600 rounded-lg px-3 '>1</span></div>
                <div className='flex flex-row justify-between mt-1 '>
                    <h3 className='flex items-center flex-row '>
                        <IoClose className='font-bold text-xl text-warning '/> Inactive</h3>
                        <span className=' bg-orange-200 text-warning rounded-lg px-3 '>0</span></div>
                </div>
                <div className='bg-white rounded-lg p-3 flex-col w-1/3 gap-2  '>
                    <div className='flex flex-row  justify-between border-b-2 border-blue-white pb-2  '>
                        <h1 className=' font-semibold '>Projectors</h1>
                         <span className='border-2 border-my-blue rounded-lg px-3  text-my-blue'>3</span></div>
                <div className='flex flex-row justify-between mt-1 '>
                    <h3 className='flex items-center gap-2 '>
                        <BiCheckCircle className=' text-green-600 font-bold  text-xl '/>
                     Active</h3> 
                     <span className=' bg-green-300 text-green-600 rounded-lg px-3 '>1</span></div>
                <div className='flex flex-row justify-between mt-1 '>
                    <h3 className='flex items-center flex-row '>
                        <IoClose className='font-bold text-xl text-warning '/> Inactive</h3>
                        <span className=' bg-orange-200 text-warning rounded-lg px-3 '>2</span></div>
                </div>
                
            </div>
        </div>
        <div className='flex flex-col'>
            <h3 className=' font-bold '>Conclusion</h3>
            <div className='flex flex-row w-full gap-2 justify-center items-center '>
                <button className='w-1/2 flex flex-row gap-2 py-2 bg-green-100  items-center border-2 border-confirm  rounded-md px-2 pl-4  font-bold '> 
                <BiCheckCircle className=' font-extrabold text-2xl  text-confirm'/> I approve the Request</button>
                <div className='w-1/2 '>

                    {!reject ?
                    <button
                    onClick={() => setReject(true)}  
                    className='w-full border-2 border-warning rounded-md flex flex-row items-center justify-between font-semibold px-4 py-2 bg-orange-100'>
                        <IoClose className='text-warning font-bold text-xl '/> 
                         I reject the request
                         <FaAngleDown className='text-warning font-bold'/>  
                          </button> :
                        <Dropdown options={options} style={dropdownStyle}/>}
                    </div>

            </div>
             </div>
        </div>


      </Modal>
    </div>
  )
}

export default RequestValidation
