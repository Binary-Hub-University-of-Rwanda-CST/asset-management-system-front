import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const Loader = (props: { className?: string; title?: string; subTitle?:string }) => {
  return (
    
    <div className="flex  flex-col items-center justify-center p-6 w-full h-full  ">
    <div>
      <AiOutlineLoading3Quarters className=" text-9xl w-16  text-yellow-500  animate__animated animate-spin animate__infinite animate__fast" />
    </div>
    <div className=" flex flex-col  gap-1 ">
      <h3 className="text-lg font-bold"> {props.title ?? "Loading "}</h3>
      <h5 className="text-sm font-medium">{props.subTitle ?? "please wait..."} </h5>
     
    </div>
    </div>
  );
};

export default Loader;
