import React, { useState } from 'react';
import RequestData from '../../../../utils/RequestData';
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoClose } from 'react-icons/io5';

export function statusIcon(status:string){
  switch(status.toLocaleLowerCase()){
    case 'approved':
      return <FaRegCheckCircle className=' text-2xl font-bold  text-green-600'/>
      case 'rejected':
        return <IoClose className=' text-2xl font-bold  text-red-800'/>
        case 'pending':
          return <AiOutlineExclamationCircle className=' text-2xl font-bold text-yellow-700'/>
          default:
            return 

  }
 
}

 export function statusColor(status:string){
  switch(status.toLocaleLowerCase()){
    case 'approved':
      return   'bg-green-200'
      case 'rejected':
        return 'bg-danger'
        case 'pending':
          return 'bg-yellow-200'
          default:
            return 

  }
 
}


const RequestsTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');



  const filteredData = RequestData
    ? RequestData.filter((item: any) =>
        Object.values(item)
          .join(' ')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : [];


  return (
    <div>
      <input
        type="text"
        placeholder="Search Asset..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 mb-4 border border-gray-300 rounded"
      />
      <table className="min-w-full bg-white border-b border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">No</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Brand</th>
            <th className="py-2 px-4 border-b">Specification</th>
            <th className="py-2 px-4 border-b">Number</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item: any) => (
            <tr key={item.no}>
              <td className="py-2 px-4 border-b">{item.no}</td>
              <td className="py-2 px-4 border-b">{item.category}</td>
              <td className="py-2 px-4 border-b">{item.brand}</td>
              <td className="py-2 px-4 border-b">{item.specification}</td>
              <td className="py-2 px-4 border-b">{item.number}</td>
              <td className="py-2 px-4 border-b">
                <span className={`flex flex-row gap-1 items-center  ${statusColor(item.status)} rounded-3xl py-1 justify-center w-fit pr-4 pl-1`}>
                    {
                      statusIcon(item.status)
                    }
                  {item.status}
                 
                  </span>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestsTable;
