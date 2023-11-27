import React, { useEffect, useContext, createContext } from "react";
import { useSpring, animated, useTransition } from "@react-spring/web";
import "./Modal.css";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

interface ModalContextProps {
  onClose: () => void;
}

const ModalContext = createContext<ModalContextProps | null>(null);

const Modal: React.FC<ModalProps> & {
  Header: React.FC;
  Body: React.FC;
  Footer: React.FC;
  DismissButton: React.FC<{ className: string }>;
} = ({ children, isOpen, onClose }: ModalProps) => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.keyCode === 27) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const modalTransition = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 1 },
    config: {
      duration: 300,
    },
  });

  const springs = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "translateY(0%)" : "translateY(-100%)",
    config: {
      duration: 300,
    },
  });

  return modalTransition((styles, isOpen) =>
    isOpen ? (
      <animated.div style={styles} className="react-modal-overlay" onClick={onClose}>
        <animated.div style={springs} className="react-modal-wrapper" onClick={(e) => e.stopPropagation()}>
          <div className="react-modal-content">
            <ModalContext.Provider value={{ onClose }}>
              {children}
            </ModalContext.Provider>
          </div>
        </animated.div>
      </animated.div>
    ) : null
  );
};

const DismissButton: React.FC<{ className: string }> = ({ children, className }) => {
  const { onClose } = useContext<ModalContextProps>(ModalContext)!;

  return (
    <button type="button" className={className} onClick={onClose}>
      {children}
    </button>
  );
};

const ModalHeader: React.FC = ({ children }) => {
  return (
    <div className="react-modal-header">
      <div className="react-modal-title">{children}</div>
      <Modal.DismissButton className="btn-close">&times;</Modal.DismissButton>
    </div>
  );
};

const ModalBody: React.FC = ({ children }) => {
  return <div className="react-modal-body">{children}</div>;
};

const ModalFooter: React.FC = ({ children }) => {
  return <div className="react-modal-footer">{children}</div>;
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.DismissButton = DismissButton;

export default Modal;
