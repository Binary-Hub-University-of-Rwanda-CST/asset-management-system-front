import React from "react";
import UR_ICON from "../../assets/images/UR_logo.png";
import { FiLoader } from "react-icons/fi";

const LazyLoading = () => {
  return (
    <div>
      <div className="h-screen bg-white overflow-y-hidden ">
        <div className="grid grid-cols-12 h-full ">
          <div className="col-span-12 p-2 h-full">
            <div className="grid grid-cols-12 gap-3 h-full">
              <div className="col-span-4 bg-gray-200 rounded w-full h-32 animate-pulse"></div>
              <div className="col-span-4 bg-gray-200 rounded w-full h-32 animate-pulse"></div>
              <div className="col-span-4 bg-gray-200 rounded w-full h-32 animate-pulse"></div>
              <div className="col-span-12 bg-white rounded w-full h-screen animate-pulse">
                <div className="w-full pt-20 flex flex-col items-center justify-center ga-5">
                  <div>
                    <img
                      className="h-36 w-auto mb-5 animate-pulse"
                      src={UR_ICON}
                      alt="Valuation Management System"
                    />
                  </div>
                  <div className="text-xl font-extrabold text-gray-400 animate-pulse flex flex-row items-center gap-3">
                    <div>
                      <FiLoader className="text-3xl animate-spin text-gray-700" />
                    </div>
                    <span>Loading, please wait...</span>
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

export default LazyLoading;
