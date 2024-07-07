import React from 'react'
import { FaDatabase, FaPlus, FaTrashAlt } from 'react-icons/fa'

const UploadedAssetList = () => {
  return (
    <div className=' flex flex-col gap-2  justify-start w-full  px-4 '>
      <div className="flex justfiy-start gap-2 items-center capitalize font-bold ">
       <FaDatabase/>
        desktops
      </div>
      <div className="flex w-full ">
        <table className='w-full border '>
          <tr className=' text-left text-sm  border  '>
            <th className='border p-1 p px-2  '>#</th>
            <th className='border p-1 p px-2  '>Serila number </th>
            <th className='border p-1 p px-2  '>Sub Category</th>
            <th className='border p-1 p px-2  '> Brand </th>
            <th className='border p-1 p px-2  '>Proccessor</th>
            <th className='border p-1 p px-2  '>Ram</th>
            <th className='border p-1 p px-2  '> Screen Size </th>
            <th className='border p-1 p px-2  '>   </th> 
          </tr>
          <tr className=' border '>
              <td className='border px-2 py-1 '>1</td>
              <td className='border px-2 py-1 '>134232</td>
              <td className='border px-2 py-1 '>desktop</td>
              <td className='border px-2 py-1 '>potivo </td>
              <td className='border px-2 py-1 '>i7</td>
              <td className='border px-2 py-1 '>16GB</td>
              <td className='border px-2 py-1 '>13 - inch </td>
              <td className=' border   '>
                <div className='flex p-1 py-1  border  border-danger rounded-md  justify-center  '> 
                  < FaTrashAlt className='text-red-700  '/>
                  </div>
                </td>
            </tr>
          <tr className=' border '>
              <td className='border px-2 py-1 '>1</td>
              <td className='border px-2 py-1 '>134232</td>
              <td className='border px-2 py-1 '>desktop</td>
              <td className='border px-2 py-1 '>potivo </td>
              <td className='border px-2 py-1 '>i7</td>
              <td className='border px-2 py-1 '>16GB</td>
              <td className='border px-2 py-1 '>13 - inch </td>
              <td className=' border   '>
                <div className='flex p-1 py-1  border  border-danger rounded-md  justify-center  '> 
                  < FaTrashAlt className='text-red-700  '/>
                  </div>
                </td>
            </tr>
          <tr className=' border '>
              <td className='border px-2 py-1 '>2</td>
              <td className='border px-2 py-1 '>134232</td>
              <td className='border px-2 py-1 '>desktop</td>
              <td className='border px-2 py-1 '>potivo </td>
              <td className='border px-2 py-1 '>i7</td>
              <td className='border px-2 py-1 '>16GB</td>
              <td className='border px-2 py-1 '>13 - inch </td>
              <td className=' border   '>
                <div className='flex p-1 py-1  border  border-danger rounded-md  justify-center  '> 
                  < FaTrashAlt className='text-red-700  '/>
                  </div>
                </td>
            </tr>
          <tr className=' border '>
              <td className='border px-2 py-1 '>3</td>
              <td className='border px-2 py-1 '>134232</td>
              <td className='border px-2 py-1 '>desktop</td>
              <td className='border px-2 py-1 '>potivo </td>
              <td className='border px-2 py-1 '>i7</td>
              <td className='border px-2 py-1 '>16GB</td>
              <td className='border px-2 py-1 '>13 - inch </td>
              <td className=' border   '>
                <div className='flex p-1 py-1  border  border-danger rounded-md  justify-center  '> 
                  < FaTrashAlt className='text-red-700  '/>
                  </div>
                </td>
            </tr>
          <tr className=' border '>
              <td className='border px-2 py-1 '>4</td>
              <td className='border px-2 py-1 '>134232</td>
              <td className='border px-2 py-1 '>desktop</td>
              <td className='border px-2 py-1 '>potivo </td>
              <td className='border px-2 py-1 '>i7</td>
              <td className='border px-2 py-1 '>16GB</td>
              <td className='border px-2 py-1 '>13 - inch </td>
              <td className=' border   '>
                <div className='flex p-1 py-1  border  border-danger rounded-md  justify-center  '> 
                  < FaTrashAlt className='text-red-700  '/>
                  </div>
                </td>
            </tr>

        </table>
      </div>
      <button className="flex gap-2 bg-blue-white rounded-md  font-bold text-sm p-2  items-center   ">
        <FaPlus className=' text-my-blue'/>
        add other assets collection 
      </button>
    </div>
  )
}

export default UploadedAssetList
