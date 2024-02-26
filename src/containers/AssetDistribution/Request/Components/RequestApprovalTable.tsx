// RequestApprovalTable.tsx
import React, { useState, useEffect } from 'react';
import RequestData from '../../../../utils/RequestData';
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegCheckCircle } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { statusColor, statusIcon} from './RequestTable';

interface TableProps {
  selectedStatus: string | null;
}


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

  return (
    <div className="flex items-center flex-col w-full">
      <div className="flex items-center w-full gap-4 ">
        <input
          type="text"
          placeholder="Search Asset..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 pl-8 mb-4 border border-gray-300 rounded w-4/5"
        />
        <button className=' flex gap-3 w-1/5  mb-3 rounded-lg py-2 items-center justify-center bg-blue-white text-my-blue'> <CiCalendar className=' text-xl  text-my-blue font-bold ' /> filter By Date</button>
      </div>
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
          {filteredData.map((item: RequestItem) => (
            
            <tr key={item.no}>
              <td className="py-2 px-4 border-b">{item.no}</td>
              <td className="py-2 px-4 border-b">{item.category}</td>
              <td className="py-2 px-4 border-b">{item.brand}</td>
              <td className="py-2 px-4 border-b">{item.specification}</td>
              <td className="py-2 px-4 border-b">{item.number}</td>
              <td className="py-2 px-4 border-b">
              <span className={`flex flex-row gap-1 items-center  ${statusColor(item.status)} rounded-3xl py-1 justify-center w-fit pl-1 pr-4`}>
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

export default RequestApprovalTable;
