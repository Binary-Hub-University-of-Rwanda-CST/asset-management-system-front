import React, { useState } from 'react';
import RequestData from '../../../utils/RequestData';

 

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
              <td className="py-2 px-4 border-b">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestsTable;
