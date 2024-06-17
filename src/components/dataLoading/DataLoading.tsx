import React from 'react'
function DataLoading() {
    return (
        <div className=" h-full  ">
         <div className=" h-full justify-start items-center flex gap-4 flex-col animate__animated  animate__zoomIn animate__fast ">
           <div className=" h-6 bg-white rounded-xl  animate__rollIn  animate__infinite animate-pulse animate__slower w-96"></div>
           <div className=" h-6 bg-white rounded-xl  animate__rollIn  animate__infinite animate-pulse animate__slower  w-[550px]"></div>
           <div className=" h-6 bg-white rounded-xl  animate__rollIn  animate__infinite animate-pulse animate__slower  w-[700px]"></div>
           <div className=" h-6 bg-white rounded-xl  animate__rollIn  animate__infinite animate-pulse animate__slower  w-[550px]"></div>
           <div className=" h-6 bg-white rounded-xl  animate__rollIn  animate__infinite animate-pulse animate__slower w-96"></div>
         </div>
        </div>
       );
}

export default DataLoading
