import React from 'react';
import { FaDatabase, FaPlus, FaTrashAlt } from 'react-icons/fa';

interface Props {   
  validatedData: Record<string, any>[];
}

const UploadedAssetList: React.FC<Props> = ({ validatedData }) => {
  if (validatedData.length === 0) {
    return <div>No data to display</div>;
  }

  // Assuming keys are consistent across all objects in validatedData
  const assetKeys = Object.keys(validatedData[0]);

  return (
    <div className='flex flex-col gap-2 justify-start w-full px-4'>
      <div className="flex justify-start gap-2 items-center capitalize font-bold">
        <FaDatabase />
        desktops
      </div>
      <div className="flex w-full">
        <table className='w-full border'>
          <thead className='text-left text-sm border'>
            <tr>
              {assetKeys.map((key) => (
                <th key={key} className='border p-1 px-2'>{key}</th>
              ))}
              <th className='border p-1 px-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {validatedData.map((asset, index) => (
              <tr key={index} className='border'>
                {assetKeys.map((key) => (
                  <td key={key} className='border px-2 py-1'>{asset[key]}</td>
                ))}
                <td className='border'>
                  <div className='flex p-1 py-1 border border-danger rounded-md justify-center'>
                    <FaTrashAlt className='text-red-700' />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="flex gap-2 bg-blue-white rounded-md font-bold text-sm p-2 items-center">
        <FaPlus className='text-my-blue' />
        add other assets collection
      </button>
    </div>
  );
}

export default UploadedAssetList;  
 