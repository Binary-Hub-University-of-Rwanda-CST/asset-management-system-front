// Dropdown.tsx
import React, { useState } from 'react';
import { GiConfirmed } from 'react-icons/gi';
import { FaAngleDown } from "react-icons/fa";

interface Option {
  CategoryName: string;
  totalAsset: number;
}

interface DropdownProps {
  options: Option[];
}

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    options.length > 0 ? options[0] : null
  );
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const filteredOptions = options.filter((option) =>
    option.CategoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative inline-block text-left z-50">
      <div>
        <button
          type="button"
          onClick={handleToggle}
          className="flex items-center    w-72 rounded-md bg-blue-white shadow-sm px-4 py-2 text-xl font-medium text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          {selectedOption ? (
            <div className='flex flex-row justify-between items-center '>
            <div className=' flex flex-row items-center gap-2'>
                <GiConfirmed className='font-bold text-my-blue'/>
              <span className="mr-2 font-bold">{selectedOption.CategoryName} </span><span> - Category</span>
              </div>
              <div>

              <span><FaAngleDown  className=' text-my-blue font-bold right-2 top-3 absolute items-center'/></span>
              </div>
            </div>
          ) : (
            'Select an option'
          )}
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search options"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option.CategoryName}
                  onClick={() => handleSelect(option)}
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${
                    option === selectedOption ? 'bg-gray-200' : ''
                  }`}
                  role="menuitem"
                >
                  <>
                    <span className="mr-2">{option.CategoryName}</span>
                    <span>({option.totalAsset})</span>
                  </>
                </button>
              ))
            ) : (
              <div className="p-2 text-gray-500">No matching options found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
