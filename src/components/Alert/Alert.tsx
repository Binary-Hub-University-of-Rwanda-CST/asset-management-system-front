import React, { useEffect } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { MdReportGmailerrorred } from "react-icons/md";

export enum AlertType {
  SUCCESS = "SUCCESS",
  DEFAULT = "DEFAULT",
  DANGER = "DANGER",
  INFO = "INFO",
  WARNING = "WARNING",
}

interface AlertProps {
  alertType: AlertType;
  title: string;
  description?: string;
  close: () => void;
  className?: string;
  timeOut?: number;
}

const Alert = (props: AlertProps) => {
  const { alertType, title, description, close, className, timeOut } = props;

  useEffect(() => {
    if (timeOut) {
      const timer = setTimeout(() => {
        close();
      }, timeOut);
      return () => clearTimeout(timer);
    }
  }, [close, timeOut]);

  const color = alertType === AlertType.SUCCESS ? "green"
               : alertType === AlertType.DANGER ? "red"
               : alertType === AlertType.WARNING ? "yellow"
               : alertType === AlertType.INFO ? "blue"
               : "gray";

  const alertClassNames = `flex flex-row items-center w-full justify-between gap-4 md:gap-14 text-${color}-900 bg-${color}-100 rounded-md p-2 animate__animated ${alertType === AlertType.DANGER ? "animate__shakeX" : "animate__fadeIn"} ${className || ""}`;

  return (
    <div className={alertClassNames}>
      <div className="flex flex-row items-center gap-3 w-full">
        <div>
          {alertType === AlertType.SUCCESS && (
            <BsCheckCircle className={`text-${color}-600 text-3xl`} />
          )}
          {alertType === AlertType.DANGER && (
            <MdReportGmailerrorred className={`text-${color}-900 text-4xl`} />
          )}
          {alertType === AlertType.WARNING && (
            <RiErrorWarningLine className={`text-${color}-900 text-4xl`} />
          )}
        </div>
        <div className="flex flex-col gap-0">
          <div className="text-base font-extrabold -mb-1">{title}</div>
          <div className="text-sm font-normal">{description}</div>
        </div>
      </div>
      <div>
        <div
          onClick={close}
          className="flex items-center justify-center bg-white rounded-full h-8 w-8 cursor-pointer hover:bg-red-300"
        >
          <IoMdClose className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Alert;
