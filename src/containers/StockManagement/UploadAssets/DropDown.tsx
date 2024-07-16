// CustomDropdown.tsx
import React, { useState } from "react";

 export interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: Option[];
  defaultValue: string;
  onChange: (option: Option) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  defaultValue,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: Option) => {
    setSelectedValue(option.label);
    setIsOpen(false);
    onChange(option);
  };

  return (
    <div className="relative inline-block text-left w-full">
      <div>
        <button
          type="button"
          className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-black bg-gray-200 rounded-md hover:bg-gray-300"
          onClick={handleToggle}
        >
          {selectedValue}
          <svg
            className="w-5 h-5 ml-2 -mr-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v10.586l3.293-3.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L9 14.586V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
          {options.map((option) => (
            <div
              key={option.value}
              className="px-4 py-2 text-sm text-black cursor-pointer hover:bg-gray-200"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
