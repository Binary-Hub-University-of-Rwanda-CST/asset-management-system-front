import React from "react";
import { FaSearch, FaFileExcel } from "react-icons/fa";

interface TableProps {
  tableHeaders: string[];
  tableData: Record<string, any>[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filteredData: Record<string, any>[];
  exportToCSV: () => void;
}

export const  Table: React.FC<TableProps> = ({
  tableHeaders,
  tableData,
  searchTerm,
  onSearchChange,
  filteredData,
  exportToCSV,
}) => {
  return (
    <div className="flex flex-col px-6  py-2 ">
      <div className=" flex flex-row w-full relative">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
          className="py-2 text-md w-11/12 bg-my-gray rounded-lg px-8 text-xl focus:outline-my-gray focus:bg-white pl-10 relative"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <span className="absolute left-4 top-6 transform -translate-y-1/2 text-gray-500">
          <FaSearch />
        </span>

        <button
          className=" flex  items-center justify-center rounded-lg px-8 bg-green-600 w-1/12 ml-4 text-white text-xl"
          onClick={exportToCSV}
        >
          <FaFileExcel className="" />Export
        </button>
      </div>

      <div className="overflow-x-auto mt-4">
        <div style={{ maxHeight: "600px" }}>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  No
                </th>
                {tableHeaders.map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="">
              {filteredData.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t">
                  <td className="px-4 py-2">{rowIndex + 1}</td>
                  {tableHeaders.map((header, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-4 py-2"
                    >
                      {row[header.toLowerCase().replace(/\s+/g, "_")]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};