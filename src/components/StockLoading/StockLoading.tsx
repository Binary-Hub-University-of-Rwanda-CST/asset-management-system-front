// StockLoading.jsx
import React from "react";

const StockLoading = () => {
  return (
    <div className="animate-pulse space-y-4 p-4">
      <div className="flex flex-row items-center gap-3 mb-2 bg-gray-300 rounded-lg p-2 justify-between">
        <div className="pl-1 flex gap-2 items-center">
          <div className="bg-gray-400 h-10 w-10 rounded-full"></div>
          <div className="flex item-center flex-col">
            <div className="bg-gray-400 h-6 w-48 rounded-md"></div>
            <div className="bg-gray-400 h-4 w-64 rounded-md mt-2"></div>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <div className="flex flex-col justify-center align-center">
            <p className="bg-gray-400 h-4 w-20 rounded-md"></p>
            <h2 className="bg-gray-400 h-8 w-10 rounded-md mt-2"></h2>
          </div>
          <div className="flex flex-col justify-center align-center">
            <p className="bg-gray-400 h-4 w-20 rounded-md"></p>
            <h2 className="bg-gray-400 h-8 w-10 rounded-md mt-2"></h2>
          </div>
        </div>
        <div>
          <button className="p-1 px-3 bg-gray-400 rounded-md text-gray-400 cursor-not-allowed">
            Create Stock Location
          </button>
        </div>
      </div>

      <div className="flex flex-row gap-4">
        <div className="relative w-1/3 px-4 rounded-lg bg-gray-300 py-10 pb-16 min-h-96">
          <div className="flex">
            <h3 className="bg-gray-400 h-6 w-40 rounded-md"></h3>
          </div>
          <div className="flex justify-center flex-wrap gap-2 mt-2">
            {Array(3).fill("").map((_, index) => (
              <div key={index} className="bg-gray-400 h-24 w-24 rounded-lg"></div>
            ))}
          </div>
          <button className="ml-8 p-1 border-2 border-gray-400 text-gray-400 rounded-lg w-3/4 bottom-2 absolute cursor-not-allowed">
            Create New Category
          </button>
        </div>

        <div className="w-2/3 h-full p-4 rounded-lg relative bg-gray-300 py-10 pb-16">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center">
              <div className="bg-gray-400 h-6 w-32 rounded-md"></div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <div className="bg-gray-400 h-8 w-8 rounded-full"></div>
              <div>
                <h4 className="bg-gray-400 h-4 w-24 rounded-md"></h4>
                <h3 className="bg-gray-400 h-6 w-16 rounded-md mt-2"></h3>
              </div>
            </div>
          </div>
          <div className="border-b-2 border-gray-400 mb-4 p-0">
            <div className="flex flex-row justify-between">
              <div className="bg-gray-400 h-8 w-24 rounded-md"></div>
              {/* <div className="bg-gray-400 h-8 w-24 rounded-md"></div> */}
            </div>
          </div>
          <div className="bg-gray-400 h-48 rounded-md mx-4 "></div>
        </div>
      </div>
    </div>
  );
};

export default StockLoading;
