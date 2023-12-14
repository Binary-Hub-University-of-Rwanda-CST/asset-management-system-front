// Modal.tsx
import { title } from "process";
import React, { ReactNode, useEffect, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title:string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("click", handleOutsideClick);
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("click", handleOutsideClick);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div ref={modalRef} className="bg-white p-4 rounded-lg animate__animated animate__backInUp animate__faster ">
       
       <div className="flex flex-row gap-5 items-center bold ">
        <button
          className="flex gap-1 items-center text-[#2a82d2] bg-[#e1f3ff] rounded-lg p-2  top-2 left-2 hover:text-gray-800"
          onClick={onClose}
        >
          <FaArrowLeft /> 
          Back
        </button>
        <h2 className="font-bold">{title}</h2>
       </div>

       <div className="flex flex-col">
            {children}
       </div>
        

        
      </div>
    </div>
  );
};

export default Modal;
