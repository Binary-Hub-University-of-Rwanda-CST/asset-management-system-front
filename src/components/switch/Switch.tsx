import React, { useState } from 'react';

const ToggleSwitch = ({ on, off, isOn }:any) => {
  const [toggleState, setToggleState] = useState(isOn);

  const handleClick = () => {
    setToggleState(!toggleState);
  };

  return (
    <div className="flex items-center">
      <span className={`text-sm mr-2 ${toggleState ? 'text-green-500' : 'text-gray-500'}`}>{toggleState ? on : off}</span>
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input type="checkbox" className="hidden form-input "   checked={toggleState} onChange={handleClick} />
          <div className="toggle__line w-12 bg-primary rounded-full shadow-inner h-6"></div>
          <div className={`toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0 ${toggleState ? 'translate-x-6' : 'translate-x-0'}`}></div>
        </div>
      </label>
    </div>
  );
};

export default ToggleSwitch;
