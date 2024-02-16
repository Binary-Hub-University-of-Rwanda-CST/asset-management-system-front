import React from 'react';

interface CategoriesProps {
  CategoryName: string;
  totalAsset: number;
}

function Categories(props: CategoriesProps) {
  
  return (
    <div className=" border-2 border-my-blue rounded-lg p-2 justify-center items-center w-44 ">
      <h3 className="font-bold text-black">{props.CategoryName}</h3>
      <h4 className="text-my-blue bg-blue-white rounded-lg  p-1 w-fit">
        {props.totalAsset}
      </h4>
    </div>
  );
}



export default Categories;
