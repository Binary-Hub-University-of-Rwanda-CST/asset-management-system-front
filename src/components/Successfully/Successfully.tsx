
import { FaRegCheckCircle } from "react-icons/fa";


const Successfully = (props: { className?: string; title?: string; subTitle?:string ;  onClose: () => void; buttonText?:string}) => {
  return (

    <div  className=" absolute  top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div
      className={` z-50  fixed flex items-center gap-2 justify-center w-full shadow-lg rounded-lg text-center px-8 top-28   bg-white max-w-sm  `} >
     
      <div className="flex  flex-col items-center justify-center p-6 ">
      <div>
        <FaRegCheckCircle  className=" text-9xl w-16 text-green-700 " />
      </div>
      <div className=" flex flex-col  gap-1 ">
        <h3 className="text-lg font-bold"> {props.title ?? "sucessfully"}</h3> 
        <h5 className="text-sm font-medium">{props.subTitle ?? "click the following button to continue"} </h5>
       <button onClick={props.onClose} className=" bg-my-blue rounded-md p-1 px-4  text-white text-sm ">{props.buttonText?? " yes & continue"}</button>
      
      </div>
      </div>
    </div>
    </div>
  );
};

export default Successfully;
