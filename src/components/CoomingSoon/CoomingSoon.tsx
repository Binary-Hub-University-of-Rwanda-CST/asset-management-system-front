import React from "react";
import { FiLoader } from "react-icons/fi";

const CoomingSoon = () => {
  return (
    <div>
      <div className="h-full bg-white overflow-y-hidden pt-3 ml-[255px] mt-14">
        <div className="grid grid-cols-12 h-full bg-white ">
          <div className="col-span-12 p-2 h-ful">
            <div className="grid grid-cols-12 gap-3 h-full w-full ">
              <div className="col-span-12 w-full flex flex-row items-center gap-3 pb-8 rounded-lg  bg-gray-200 h-36 bg-red-2">
                
              </div>
                 <div className="flex flex-col gap-2 col-span-4 h-screen ">
                 <div className="col-span-5 bg-gray-200 rounded-2xl w-full h-80 animate-pulse"></div> 
              <div className="col-span-5 bg-gray-200 rounded-2xl w-full h-80 animate-pulse"></div>
                 </div>
              <div className="col-span-8 bg-gray-200 rounded-lg  w-full  animate-pulse">
                <div className="w-full flex flex-col items-center justify-center ga-5">
                  <div></div>
                  <div className="fixed top-0 bottom-0 text-center text-3xl font-extrabold text-gray-600 animate-pulse flex flex-row items-center gap-3">
                    <div className="flex items-center">
                      <FiLoader className="text-5xl animate-spin text-gray-700" />
                    </div>
                    <span>COMING SOON....</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoomingSoon;
