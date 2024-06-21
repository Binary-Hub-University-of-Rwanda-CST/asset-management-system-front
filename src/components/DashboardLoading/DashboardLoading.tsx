// DashboardLoading.jsx
import React from 'react'; 
import UR_ICON from '../../assets/images/UR_logo.png'
import { Link } from 'react-router-dom';

const DashboardLoading = () => {
  return (
    <div className="mr-4 animate__animated animate__fadeInTopLeft animate__faster">
      <div className="flex flex-col bg-white rounded-lg p-3 pb-0">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2 mb-2">
            <div className="flex flex-row items-center gap-1">
              <div className="bg-gray-300 h-6 w-6 rounded-full animate-pulse"></div>
              <div className="bg-gray-300 h-6 w-24 rounded-md animate-pulse"></div>
            </div>
            <div className="bg-gray-300 h-6 w-40 rounded-md mt-2 animate-pulse"></div>
          </div>
          <div className="flex flex-row gap-4 items-center">
            <div className="flex flex-row bg-gray-200 px-4 py-2 rounded-lg h-fit items-center gap-2 w-40">
              <div className="bg-gray-300 h-6 w-6 rounded-full animate-pulse"></div>
              <div className="flex flex-col gap-0">
                <div className="bg-gray-300 h-4 w-16 rounded-md animate-pulse"></div>
                <div className="bg-gray-300 h-4 w-8 rounded-md mt-1 animate-pulse"></div>
              </div>
            </div>
            <div className="flex flex-row bg-gray-200 px-4 py-2 rounded-lg h-fit items-center gap-2 w-40">
              <div className="bg-gray-300 h-6 w-6 rounded-full animate-pulse"></div>
              <div className="flex flex-col gap-0">
                <div className="bg-gray-300 h-4 w-16 rounded-md animate-pulse"></div>
                <div className="bg-gray-300 h-4 w-8 rounded-md mt-1 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="ml-32 flex flex-row gap-10 text-xl">
          <div className="bg-gray-300 h-6 w-24 rounded-md animate-pulse"></div>
          <div className="bg-gray-300 h-6 w-24 rounded-md animate-pulse"></div>
        </div>
      </div>

      <div className="rounded-lg py-4 flex flex-row gap-6 animate__animated animate__fadeInTopLeft">
        <div className="flex flex-col gap-4 w-1/4">
          <div className="rounded-lg p-0 w-full bg-white flex justify-center items-center flex-col h-48">
            <div className="bg-gray-300 h-6 w-40 rounded-md mb-4 animate-pulse"></div>
            <div className="bg-gray-300 h-24 w-24 rounded-full animate-pulse"></div>
          </div>
          <div className="flex justify-center items-center bg-white rounded-lg p-4 flex-col h-48">
            <div className="bg-gray-300 h-6 w-40 rounded-md mb-4 animate-pulse"></div>
            <div className="bg-gray-300 h-24 w-full rounded-md animate-pulse"></div>
          </div>
        </div>
        <div className="flex bg-white w-3/4 justify-center items-center rounded-lg">
          <div className="bg-gray-300 h-48 w-full rounded-md animate-pulse"></div>
        </div>
      </div>
      <div className=' absolute top-28 left-72   '>
      <div className="w-full pt-20 flex flex-col items-center justify-center ga-5">
                  <div>
                    <img
                      className="h-36 w-auto mb-5 animate-pulse"
                      src={UR_ICON}
                      alt="Valuation Management System"
                    />
                  </div>
                  <div className="text-xl font-extrabold text-gray-400 animate-pulse">
                    in process, we are working on it ... <br />
                    <Link to='/assets-stock'  className= ' bg-blue-white py-2 rounded-xl px-10 text-my-blue font-bold hover:underline '>Vist Stock Dashboard </Link>
                  </div>
                </div>
      </div>
      
    </div>
  );
};

export default DashboardLoading;
 