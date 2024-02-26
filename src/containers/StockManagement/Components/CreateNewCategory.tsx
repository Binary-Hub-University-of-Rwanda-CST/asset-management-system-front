import React from 'react'
import { useState } from 'react';
import Modal from '../../../components/modal/Modal'



function CreateNewCategory() {
    const [isModalOpen, setIsModalOpen] = useState(true);

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const [categoryName, setCategoryName] = useState('');
    
    function handleCategoryName(e:any){
        setCategoryName(e.target.value);
    }

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Create New Asset Category"  >
       <div className='flex flex-col items-start p-5 w-[650px]'>
        <label htmlFor="category">Category name</label>
        <input type="text"
        onChange={handleCategoryName}
        
        className=' p-2 font-bold bg-my-gray rounded-md outline-none px-5  mt-2 w-full'
        placeholder='Enter category name '
        />
        <h3 className=' mb-2'>specifications &  values</h3>
        <div className='flex flex-col items-center  bg-my-gray rounded-md w-full py-5 px-5'>
            <h3 className=' font-bold text-md '>No specification Added</h3>
            <h5 className=' items-center   mb-2 text-sm text-gray-600'> please click the following button to create new <br />
            specification and value</h5>
            <button className=' border-my-blue border-2  items-center w-full rounded-md  py-2 bg-white text-my-blue text-xl '> Create <span className='font-bold'>-{categoryName? categoryName : 'new'}-</span>  specifification</button>
        </div>
        <button className=' w-full py-2 bg-my-blue rounded-md text-white text-xl mt-5'>create <span className='font-bold'>-{categoryName? categoryName : 'new'}-</span>  category</button>

       </div>
      </Modal>
    </div>
  )
}

export default CreateNewCategory
