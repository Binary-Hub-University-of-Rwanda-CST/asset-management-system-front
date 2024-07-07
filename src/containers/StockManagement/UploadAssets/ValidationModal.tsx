import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaTrashAlt, FaRegCheckCircle } from "react-icons/fa";
import { TiArrowBack } from "react-icons/ti";
import Dropdown, { dropdownStyle, Option } from "../../../components/Fragments/DropDown";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  tableHeaders: string[];
  tableData: Record<string, any>[];
  tag?: string[];
}

const ValidationModal: React.FC<ModalProps> = ({ isOpen, onClose, title, tableHeaders, tableData, tag }) => {
  const [filteredData, setFilteredData] = useState<Record<string, any>[]>(tableData);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showRemove, setShowRemove] =  useState(false);

  const validateData = () => {
    // Implement your data validation logic here
    // For simplicity, we assume all data is valid initially
    setFilteredData(tableData);
    console.log(filteredData);
    
  };

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

  const handleSaveData = () => {
    // Handle saving validated data
    console.log("Saving data:", filteredData);
    onClose();
  };

  const handleCategoryChange = (option: Option) => {
    setSelectedCategory(option.value as string);
  };
  const handleRemove =(showRemove:boolean) =>setShowRemove(!showRemove);

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-screen h-full flex items-center justify-center bg-black bg-opacity-50 pt-20 px-4 z-50"
         onClick={handleOverlayClick}>
          <div className="bg-white w-full h-full py-4 rounded-t-xl animate__animated animate__fadeInUp animate__faster">
            <div className="flex flex-row gap-3 justify-between  items-center bold border-blue-white border-b-2 pb-2 mx-0 px-5">
              <div className=" flex gap-2 ">
                <button
                  className="flex gap-1 items-center text-my-blue bg-blue-white rounded-lg py-1 px-2 top-2 left-2 hover:text-gray-800"
                  onClick={onClose}
                >
                  <FaArrowLeft /> Back to list
                </button>
                <h4 className="font-bold text-md pr-5">{title}</h4>
                {tag && tag.map(tag => <span key={tag} className="bg-blue-white text-my-blue font-bold text-sm rounded-md px-2 py-1">{tag}</span>)}
              </div>
              <div className="flex gap-2  ">
                { !showRemove? <button
                onClick={()=>setShowRemove(true)}
                className=" border border-danger flex gap-2 p-2 rounded-md  items-center  py-1 ">
                   <FaTrashAlt className=" text-red-700"/> 
                  Remove
                </button>: 
                <button
                onClick={()=>setShowRemove(false)}
                className=" border border-danger flex gap-2 p-2 rounded-md  items-center  py-1   ">
                   <TiArrowBack className=" text-red-700"/> 
                  cancel 
                </button>
                }
                { !showRemove && <button 
                  className={`flex items-center gap-2 bg-my-blue text-white rounded-md py-1  p-2 ${!selectedCategory ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-80'}`} 
                  onClick={handleSaveData}
                  disabled={!selectedCategory}
                >
                  <FaRegCheckCircle/>
                  Save Assets Data
                </button>}
              </div>
            </div>

            <div className="flex flex-col px-6 py-2">
              <div className="overflow-x-auto mt-4">
                <div style={{ maxHeight: "600px" }}>
                  {filteredData.length > 0 ? (
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          {showRemove && <th className="px-4 py-2 text-left text-sm font-bold text-black uppercase"></th>}
                           <th className="px-4 py-2 text-left text-sm font-bold text-black uppercase">#</th>
                          {tableHeaders.map(header => (
                            <th key={header} className="px-4 py-3 text-left text-sm font-bold text-black uppercase">{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map((row, rowIndex) => ( 
                          <tr
                            key={rowIndex}
                            className="border-t py-1  "
                          >
                            {showRemove && <td className="px-4 py-1 font-sm">
                              <button className=" px-4  py-1 rounded-md  border hover:bg-danger border-red-500"> 
                                <FaTrashAlt className=" text-red-700"/></button></td>}
                            <td className="px-4  py-1 font-sm">{rowIndex + 1}</td>

                            {tableHeaders.map((header, cellIndex) => (
                              <td key={`${rowIndex}-${cellIndex}`} className="px-4 font-sm py-1">{row[header]}</td>
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
