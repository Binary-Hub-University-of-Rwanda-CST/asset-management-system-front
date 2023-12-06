import React from "react";
const Input = (props: {
  title: string;
  min?: string;
  max?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  value: string;
  error: string;
  onCloseError?: () => void;
  type: React.HTMLInputTypeAttribute;
  className?: string;
}) => {
  return (
    <div className="w-full">
      <div className="text-sm">{props.title}</div>
      <input
        type={props.type}
        className={`px-3 py-2 text-sm w-full border ${
          props.error !== "" ? "border-red-600" : ""
        } rounded-md ${
          props.className === undefined ? "bg-gray-100" : props.className
        }`}
        disabled={props.disabled}
        value={props.value}
        onChange={props.onChange}
        min={props.type === "date" ? props.min : ""}
        max={props.type === "date" ? props.max : ""}
      />
    </div>
  );
};

export default Input;
