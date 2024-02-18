

import React, { ReactNode, useEffect, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";


interface ModalProps {
  isOpen : boolean;
  onClose: () => void;
  children?: ReactNode;
  title: React.ReactNode;
  tag?: string[];
}

const TableModal: React.FC<ModalProps> = (props) => {
  const {
    isOpen,
    onClose,
    children,
    title,
    tag,
  } = props;
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const modalRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
     className="fixed top-0 left-0 w-screen h-full flex items-center justify-center bg-black bg-opacity-50 pt-32 px-4 ">
      <div ref={modalRef} className="bg-white w-full h-full  py-4 rounded-t-xl animate__animated animate__zoomInUp animate__faster ">
       
       <div className="flex flex-row gap-3 items-center bold border-blue-white border-b-2 pb-2 mx-0 px-5 ">
        <button
          className="flex gap-1  items-center text-my-blue bg-blue-white rounded-lg p-2  top-2 left-2 hover:text-gray-800"
          onClick={onClose}
        >
          {/* <FaArrowLeft />  */}
          Back to list
        </button>
        <h2 className="font-bold text-xl pr-5">{title}</h2>
        {tag &&  props.tag?.map(tag => <span className=" bg-blue-white text-my-blue font-bold text-sm rounded-md px-2 py-1">{tag}</span>) }
       </div>

       <div className="flex flex-col px-6  py-2">
        <div className=" flex flex-row w-full">
        <input type="text" name="search" id="search"
        placeholder="search..."
        className=" py-2 text-md w-11/12  bg-my-gray rounded-lg px-8  text-xl focus:outline-my-gray focus:bg-white"
        />
        <button className=" flex items-center justify-center rounded-lg py-2 px-8 bg-green-600 w-1/12 ml-4 text-white text-xl">Export</button>
        </div>

        <div>
            {children}
            </div>
       </div>
        

        
      </div>
    </div>
  );
};

export default TableModal;
