// RequestApprovalTable.tsx
import React, { useState, useEffect } from 'react';
import RequestData from '../../../utils/RequestData';
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegCheckCircle } from "react-icons/fa";

interface TableProps {
  selectedStatus: string | null;
}
let bgColor:string;
let statusIcon: any;

interface RequestItem {
  no: number;
  category: string;
  brand: string;
  specification: string;
  number: string;
  status: string;
}

const RequestApprovalTable: React.FC<TableProps> = ({ selectedStatus }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState<RequestItem[]>([]);
  
    useEffect(() => {
      const dataForSelectedStatus: RequestItem[] = RequestData.filter(
        (item) =>
          selectedStatus === null || item.status.toLowerCase() === selectedStatus.toLowerCase()
      );
      setFilteredData(dataForSelectedStatus);
    }, [selectedStatus]);
  
    useEffect(() => {
      const searchData = RequestData.filter(
        (item) =>
          (selectedStatus === null || item.status.toLowerCase() === selectedStatus.toLowerCase()) &&
          Object.values(item)
            .join(' ')
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
      setFilteredData(searchData);
    }, [searchTerm, selectedStatus]);

  RequestData.map(item =>{
    if (item.status.toLowerCase()== 'pending'){
         bgColor = 'py-1 px-6 bg-info rounded-lg';
         statusIcon = <AiOutlineExclamationCircle/>;
    }
    else if (item.status =='approved'){
        bgColor = 'py-1 px-6 bg-confirm rounded-lg';
        statusIcon = <FaRegCheckCircle/>
    }
    else if (item.status){
        bgColor = 'py-1 px-6 bg-danger rounded-lg';
        statusIcon = <RiDeleteBin6Line/>
    }
  })

  return (
    <div className="flex items-center flex-col w-full">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search Asset..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 pl-8 mb-4 border border-gray-300 rounded w-full"
        />
      </div>
      <table className="min-w-full bg-white border border-gray-300">
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
          {filteredData.map((item: RequestItem) => (
            
            <tr key={item.no}>
              <td className="py-2 px-4 border-b">{item.no}</td>
              <td className="py-2 px-4 border-b">{item.category}</td>
              <td className="py-2 px-4 border-b">{item.brand}</td>
              <td className="py-2 px-4 border-b">{item.specification}</td>
              <td className="py-2 px-4 border-b">{item.number}</td>
              <td className="py-2 px-4 border-b">
                <span className='px-4 py-2 border-2 rounded-lg my-2 border-info'>{item.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestApprovalTable;
