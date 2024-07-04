import React, { useState, useEffect, } from "react";
import { FaArrowLeft, FaTrashAlt, FaRegCheckCircle } from "react-icons/fa";
import Dropdown, {dropdownStyle, DropdownProps} from "../../../components/Fragments/DropDown";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  tableHeaders: string[];
  tableData: Record<string, any>[];
  tag?: string[];
}

const ValidationModal: React.FC<ModalProps> = ({ isOpen, onClose, title, tableHeaders, tableData, tag }) => {

  const [filteredData, setFilteredData] = useState<Record<string, any>[]>([]);



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


  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-screen h-full flex items-center justify-center bg-black bg-opacity-50 pt-20 px-4 z-50"
         onClick={handleOverlayClick}>
          <div className="bg-white w-full h-full py-4 rounded-t-xl animate__animated animate__fadeInUp animate__faster">
            <div className="flex flex-row gap-3 items-center bold border-blue-white border-b-2 pb-2 mx-0 px-5">
              <button
                className="flex gap-1 items-center text-my-blue bg-blue-white rounded-lg py-1 px-2 top-2 left-2 hover:text-gray-800"
                onClick={onClose}
              >
                <FaArrowLeft /> Back to list
              </button>
              <h4 className="font-bold text-md pr-5">{title}</h4>
              {tag && tag.map(tag => <span key={tag} className="bg-blue-white text-my-blue font-bold text-sm rounded-md px-2 py-1">{tag}</span>)}
              <div>
                    <button className=" border border-danger flex gap-2 p-2 rounded-md  ">
                        <FaTrashAlt className=" text-red-700"/> 
                         remove
                    </button>
                    <button className="flex  gap-2 bg-my-blue text-white rounded-md p-2 ">
                        <FaRegCheckCircle/>
                        save Assets Data 
                    </button>
              </div>
            </div>

            <div className="flex flex-col px-6 py-2">

              <div className="overflow-x-auto mt-4">
                <div style={{ maxHeight: "600px" }}>
                  {filteredData.length > 0 ? (
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-bold text-black uppercase">Action</th>
                          <th className="px-4 py-2 text-left text-sm font-bold text-black uppercase">No</th>
                          {tableHeaders.map(header => (
                            <th key={header} className="px-4 py-3 text-left text-sm font-bold text-black uppercase">{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map((row, rowIndex) => (
                          <tr
                            key={rowIndex}
                            className="border-t py-1 cursor-pointer hover:bg-blue-white "
                          >
                            <td className="px-4 py-1 font-sm"><button className=" px-2 py-1 rounded-md border bg-danger border-red-500"> 
                                <FaTrashAlt className=" text-red-700"/></button></td>
                            <td className="px-4 py-1 font-sm">{rowIndex + 1}</td>

                            {tableHeaders.map((header, cellIndex) => (
                              <td key={cellIndex} className="px-4 font-sm py-1">{row[header]}</td>
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

export default ValidationModal; 
