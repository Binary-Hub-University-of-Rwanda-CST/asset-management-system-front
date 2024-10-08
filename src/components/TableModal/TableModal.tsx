import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaSearch, FaFileExcel } from "react-icons/fa";
import { RoomInterface, AssetInterface } from "../../containers/StockManagement/Components/DataTable";
import { formatHeaderName } from "../../utils/functions";
import Papa from "papaparse";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  tableHeaders: string[];
  tableData: Record<string, any>[];
  tag?: string[];
  onRowClick?: (room: RoomInterface) => void;
  onRowDoubleClick?: (asset: AssetInterface) => void; 
}

const TableModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  tableHeaders,
  tableData,
  tag,
  onRowClick,
  onRowDoubleClick,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    if (isOpen) {
      setFilteredData(tableData); // Initialize filtered data with tableData on modal open
    }
  }, [isOpen, tableData]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    // Filter table data based on search term
    const filtered = tableData.filter((row) =>
      tableHeaders.some((header) => {
        const value = row[header]; // Access nested value
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
    setFilteredData(filtered);
  }, [searchTerm, tableData, tableHeaders]);

  const exportToCSV = () => {
    const formattedHeaders = tableHeaders.map(formatHeaderName);
    const csvData = [
      formattedHeaders,
      ...filteredData.map((row) => tableHeaders.map((header) => row[header])),
    ];

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `${title}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-screen h-full flex items-center justify-center bg-black bg-opacity-50 pt-20 px-4 z-50"
          onClick={handleOverlayClick}
        >
          <div className="bg-white w-full h-full py-4 rounded-t-xl animate__animated animate__fadeInUp animate__faster">
            <div className="flex flex-row gap-3 items-center bold border-blue-white border-b-2 pb-2 mx-0 px-5">
              <button
                className="flex gap-1 items-center text-my-blue bg-blue-white rounded-lg py-1 px-2 top-2 left-2 hover:text-gray-800"
                onClick={onClose}
              >
                <FaArrowLeft /> Back to list
              </button>
              <h4 className="font-bold text-md pr-5">{title}</h4>
              {tag &&
                tag.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-white text-my-blue font-bold text-sm rounded-md px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
            </div>

            <div className="flex flex-col px-6 py-2">
              <div className="flex flex-row w-full relative">
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search..."
                  className="py-1 text-sm w-11/12 bg-my-gray rounded-lg px-8 focus:outline-my-gray focus:bg-white pl-10 relative"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="absolute left-4 top-4 transform -translate-y-1/2 text-gray-500">
                  <FaSearch />
                </span>

                <button
                  className="flex items-center justify-center rounded-md px-8 bg-green-600 w-1/12 ml-4 text-white text-sm"
                  onClick={exportToCSV}
                >
                  <FaFileExcel className="" /> Export
                </button>
              </div>

              <div className="overflow-x-auto mt-4">
                <div style={{ maxHeight: "600px" }}>
                  {filteredData.length > 0 ? (
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-md  text-black uppercase">
                            #
                          </th>
                          {tableHeaders.map((header) => (
                            <th
                              key={header}
                              className="px-4 py-3 text-left text-sm font-md  text-black uppercase"
                            >
                              {formatHeaderName(header)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map((row, rowIndex) => (
                          <tr
                            key={rowIndex}
                            className="border-t py-1 cursor-pointer hover:bg-blue-white "
                            onClick={() =>
                              onRowClick && onRowClick(row as RoomInterface)
                            }
                            onDoubleClick={() => 
                              onRowDoubleClick && onRowDoubleClick(row as AssetInterface) 
                            } // Add this line
                          >
                            <td className="px-4 py-1 text-sm">
                              {rowIndex + 1}
                            </td>
                            {tableHeaders.map((header, cellIndex) => (
                              <td key={cellIndex} className="px-4 text-sm py-1">
                                {row[header]}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <h1 className="text-center">No data found</h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TableModal;
