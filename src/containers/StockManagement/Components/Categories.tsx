import React from 'react';

interface CategoriesProps {
  id:number | string,
  CategoryName: string;
  totalAsset: number;
  handleActive:any;
  isActive:boolean;
}

function Categories(props: CategoriesProps) {
  
  return (
    <div
     className= {`${!props.isActive ? " border-2 border-blue-white  ": "bg-blue-white" }  rounded-lg p-1 px-2  justify-center items-center w-36  cursor-pointer text-dark-white `}

    onClick={() => props.handleActive(props.id)}
    >
      <h3 className={`font-bold text-sm  ${props.isActive ? 'text-blue': 'text-black'}`}>
        {props.CategoryName}
        </h3>
      <h4 className={`${props.isActive ? 'text-white bg-my-blue' : 'text-my-blue bg-blue-white'} rounded-lg  px-2 w-fit text-sm `}>
        {props.totalAsset}
      </h4>
    </div>
  );
}



export default Categories;
