import React, { ReactNode, useEffect, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";

export enum ModalSize {
  small = "max-w-sm",
  medium = "max-w-screen-sm",
  large = "max-w-screen-md",
  extraLarge = "max-w-screen-lg",
  extraExtraLarge = "max-w-screen-xl",
  maxWidth = "max-w-screen h-full",
}

export enum ModalMarginTop {
  none = "top-0",
  small = "top-28",
  medium = "top-1/3",
  large = "top-1/2",
  extra = "top-2/3",
}

interface ModalProps {
  title?: React.ReactNode;
  isOpen?: boolean;
  onClose: () => void;
  children?: ReactNode;
  widthSizeClass?: ModalSize;
  marginTop?: ModalMarginTop;
}

const Modal: React.FC<ModalProps> = (props) => {
  const {
    isOpen,
    onClose,
    children,
    title,
    widthSizeClass,
    marginTop = ModalMarginTop.none,
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

  if (!isOpen) {
    return null;
  }

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div
        ref={modalRef}
        className={`z-50 fixed items-center py-4 justify-items-center ${marginTop} left-0 right-0 bottom-0 bg-white rounded-md shadow-xl self-center ${widthSizeClass} animate__animated ${marginTop !== ModalMarginTop.none ? "animate__fadeInUp" : "animate__zoomIn"} animate__faster`}
        style={{
          width: "100%",
          maxHeight: "99vh",
          height: `${widthSizeClass === ModalSize.maxWidth ? (marginTop === ModalMarginTop.none ? "100%" : "unset") : "fit-content"}`,
          overflowY: "auto",
          margin: "auto",
          // zIndex: 99999999,
        }}
      >
        <div className="flex flex-row gap-4 items-center bold border-blue-white border-b-2 pb-2 mx-0">
          <button
            className="flex gap-1 ml-5 items-center text-[#2a82d2] bg-[#e1f3ff] rounded-lg py-1 px-2 top-2 left-2 hover:text-gray-800"
            onClick={onClose}
          >
            <FaArrowLeft />
            Back
          </button>
          <h2 className="font-bold text-md pr-5">{title}</h2>
        </div>

        <div className="flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal; 
 