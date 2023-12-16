
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


// Enumeration for different modal sizes
export enum ModalSize {
  small = "max-w-sm",
  medium = "max-w-screen-sm",
  large = "max-w-screen-md",
  extraLarge = "max-w-screen-lg",
  extraExtraLarge = "max-w-screen-xl",
  maxWidth = "max-w-screen h-full",
}

// Props for the Modal component
interface ModalProps {
  title?: React.ReactNode;
  backDrop: boolean;
  theme: Themes;
  close: () => void;
  backDropClose: boolean;
  footer?: React.ReactNode;
  children: React.ReactNode;
  widthSizeClass: ModalSize;
  displayClose: boolean;
  padding: { title?: boolean; body?: boolean; footer?: boolean };
  marginTop?: ModalMarginTop;
}

const Modal: React.FC<ModalProps> = (props) => {
  const {
    title,
    backDrop,
    theme,
    close,
    backDropClose,
    widthSizeClass,
    displayClose,
    padding = { title: true, body: true, footer: true },
  } = props;

  // Map theme to Tailwind CSS color class
  const themeColor = (() => {
    switch (theme) {
      case Themes.primary:
        return "blue-500";
      case Themes.secondary:
        return "gray-300";
      case Themes.danger:
        return "red-500";
      case Themes.success:
        return "primary-800";
      case Themes.warning:
        return "yellow-500";
      default:
        return "white";
    }
  })();


    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div ref={modalRef} className="bg-white p-4 rounded-lg animate__animated animate__backInUp animate__faster ">
       
       <div className="flex flex-row gap-5 items-center bold ">
        <button
          className="flex gap-1 ml-5 items-center text-[#2a82d2] bg-[#e1f3ff] rounded-lg p-2  top-2 left-2 hover:text-gray-800"
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
    </>
  );
};

export default Modal;
