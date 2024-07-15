 
 
import React from 'react';
import { useDispatch } from 'react-redux';
import { saveValidatedData } from '../../../actions/saveUploaded.action';
import { BiTrash } from 'react-icons/bi';
import { FaCube } from 'react-icons/fa';

interface DynamicTableProps {
  data: Record<string, string | number>[];
}

const DynamicTable: React.FC<DynamicTableProps> = ({ data }) => {
  const dispatch = useDispatch();

  const handleDelete = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    dispatch(saveValidatedData(newData));
  };

  if (data.length === 0) {
    return <p>No data available</p>;
  }

  const headers = Object.keys(data[0]);

  return (
    <div className="overflow-auto ">
      <div className=' flex items-center  gap-2 font-bold  capitalize '>
        <FaCube className='text-my-blue '/>
       uploaded assets 
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
          <th className="px-4 py-2 text-left text-sm font-bold text-black uppercase">
                            #
                          </th>
            {headers.map((header) => (
              
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header.replace(/_/g, ' ')}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            
            <tr key={rowIndex}>
              <td className="px-2 py-1 font-sm">
                              {rowIndex + 1}
                            </td>
              {Object.values(row).map((value, cellIndex) => (
                <td key={cellIndex} className="px-6 py-4 whitespace-nowrap">
                  {value}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleDelete(rowIndex)}
                  className="text-red-600 hover:text-red-900 border border-danger  px-4  py-1 rounded-md  hover:bg-danger "
                >
                  <BiTrash/> 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
