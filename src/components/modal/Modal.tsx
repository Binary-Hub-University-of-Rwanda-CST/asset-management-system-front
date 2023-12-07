

import { MdClose } from "react-icons/md";

// Enumeration for different modal themes
export enum Themes {
  default = "default",
  primary = "primary",
  secondary = "secondary",
  danger = "danger",
  success = "success",
  warning = "warning",
}

// Enumeration for modal margin top options
export enum ModalMarginTop {
  none = "top-0",
  small = "top-28",
  medium = "top-1/3",
  large = "top-1/2",
  extra = "top-2/3",
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

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => backDropClose && close()}
        className={`z-50 animate__animated animate__fadeIn animate__faster modal fixed bg-black bg-opacity-${
          backDrop ? "60" : "0"
        }`}
      ></div>

      {/* Modal Container */}
      <div
        className={`z-50 fixed items-center justify-items-center ${
          props.marginTop === undefined ? ModalMarginTop.none : props.marginTop
        } left-0 right-0 bottom-0 bg-white rounded-md shadow-xl self-center ${widthSizeClass} animate__animated ${
          props.marginTop !== undefined &&
          props.marginTop !== ModalMarginTop.none
            ? "animate__fadeInUp"
            : "animate__zoomIn"
        } animate__faster`}
        style={{
          width: "100%",
          maxHeight: "99vh",
          height: `${
            widthSizeClass === ModalSize.maxWidth
              ? props.marginTop === undefined
                ? "100%"
                : "unset"
              : "fit-content"
          }`,
          overflowY: "auto",
          margin: "auto",
          zIndex: 99999999,
        }}
      >
        {/* Modal Header */}
        <div
          className={`flex justify-between bg-${themeColor} ${
            padding.title ? "py-4 px-4" : ""
          } rounded-t-md text-${
            theme === Themes.default || theme === Themes.secondary
              ? "black"
              : "white"
          }`}
        >
          {!title || title === "" ? (
            <div></div>
          ) : (
            <h4 className="text-lg font-bold">{title}</h4>
          )}
          {/* Close Button */}
          {displayClose && (
            <div className="hover:text-red-600 hover:bg-red-100 rounded-full p-1 h-8 w-8">
              <MdClose
                className="cursor-pointer font-extrabold text-2xl"
                onClick={close}
              />
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className={`space-x-3 ${padding.body ? "py-4 px-4" : ""}`}>
          <div>{props.children !== "" ? props.children : ""}</div>
        </div>

        {/* Modal Footer */}
        {props.footer !== undefined && props.footer !== "" && (
          <div className={`flex float-right ${padding.footer ? "py-4 px-4" : ""}`}>
            {props.footer}
          </div>
        )}
      </div>
    </>
  );
};

export default Modal;
