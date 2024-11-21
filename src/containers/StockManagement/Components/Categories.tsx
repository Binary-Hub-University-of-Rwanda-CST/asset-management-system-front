import React from 'react';

interface CategoriesProps {
  id: number | string;
  categoryName: string;
  categoryCode? : string;
  totalAssets: number; 
  handleActive: any;
  isActive: boolean;
}

function Categories(props: CategoriesProps) {
  
  return (
    <div
     className={`${!props.isActive ? "border-2 border-blue-white" : "bg-blue-white"} w-32   flex-grow sm:flex-shrink md:flex-shrink rounded-lg p-1 px-2 justify-center items-center  cursor-pointer text-dark-white`}
     onClick={() => props.handleActive(props.id)}
    >
      <div className=' flex flex-col'> 

      <h3 className={`font-bold text-sm ${props.isActive ? 'text-blue' : 'text-black'}`}>
        {props.categoryCode} 
      </h3>
      <span className={`text-sm truncate  ${props.isActive ? 'text-blue' : 'text-black'}`}> {props.categoryName}</span>
      </div>
      <h4 className={`${props.isActive ? 'text-white bg-my-blue' : 'text-my-blue bg-blue-white'} rounded-lg px-2 w-fit text-sm`}>
        {props.totalAssets} {/* Change totalAsset to totalAssets */}
      </h4>
    </div>
  );
}

export default Categories;
