import React from 'react';
import { FaTimes, FaPlus } from "react-icons/fa";
// import { BsExclamation } from 'react-icons/bs';
import Alert,{AlertType} from '../../../components/Alert/Alert';

interface UploadSummaryProps {
  totalUploadedAssets: number;
  status: string;
  onDeleteAll: () => void;
}

const UploadSummary: React.FC<UploadSummaryProps> = ({ totalUploadedAssets, status, onDeleteAll }) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex p-2 bg-blue-white   w-full justify-between rounded-md items-center '>
        <span className='font-bold text-sm'>UPLOADED ASSETS</span>
        <div className='flex gap-4 items-center '>
           <span className='bg-warning   rounded-full py-0 px-6 flex items-center'> 
            {status}  
           </span> 
         
            <span className='font-bold text-success'>{totalUploadedAssets}</span> 
          {/* <Alert
            alertType={AlertType.WARNING}
            title={status}
            description={''}   
            close={() => ''} 
            className={"border-2 border-white bg-warning "}
          /> */}
          <button className='rounded-full bg-danger p-2' onClick={onDeleteAll}>
            <FaTimes className='text-red-700' />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadSummary;
