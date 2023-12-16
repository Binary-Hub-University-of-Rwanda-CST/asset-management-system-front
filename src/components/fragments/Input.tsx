
import React from 'react';

const NumberInput = ( props:{
  title: string,
  type: 'text' | 'password';
  min?: string,
  max?:string,
  onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void
  disabled: boolean,
  value: string,
  error:string,
  onCloseError?:()=>void,
  className?:string,
  icon?: React.ReactNode;
}) => {
  return (
    <div className={`mb-4 ${props.className}`}>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {props.title}
      </label>
      <input
        type={props.type}
        min={props.min}
        max={props.max}
        onChange={props.onChange}
        disabled={props.disabled}
        value={props.value}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            props.error ? 'border-red-500' : ''
        }`}
      />
      {props.error && (
        <p className="text-red-500 text-xs italic mt-1">{props.error}</p>
      )}
      {props.error && props.onCloseError && (
        <button
          className="text-red-500 text-xs mt-1 focus:outline-none"
          onClick={props.onCloseError}
        >
          Close Error
        </button>
      )}
    </div>
  );
};

export default NumberInput;
