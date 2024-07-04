import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StoreState } from "../../../reducers";
import { Auth, FC_SetError, FC_SetSuccess } from "../../../actions";
import Alert,{AlertType} from "../../../components/Alert/Alert";
import { GoDatabase } from "react-icons/go";
import UploadModal from "../Components/UploadModal";
import { useDispatch } from "react-redux";
import { fetchValidationData } from "../../../actions/validationData.actions";
import { AppDispatch } from "../../../app/store";
import UploadSummary from "./UploadSummary";

interface AppProps {
  auth: Auth;
  FC_SetSuccess: (msg: string) => void;
  FC_SetError: (msg: string) => void;
}

const UploadStock: React.FC<AppProps> = ({ auth, FC_SetSuccess, FC_SetError }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showSummary, handleShowSummary] = useState(false);
   
  const [UploadData, setUploadData] = useState(false);

  const closeUploadDataModal = () => {
      setUploadData(false);
  };
  const CreateUploadData = () =>{
    setUploadData(true);
    // alert(UploadData);
  }
  const dispatch: AppDispatch = useDispatch();
  const activeLink =  'text-lg font-bold border-b-2 border-my-blue  py-1'; 

  useEffect(() => {
    dispatch(fetchValidationData());
  }, [dispatch]); 

  return (
    <div className="mr-4  ">
     <div className="flex flex-col  gap-5 mb-2 bg-white rounded-lg p-3  justify-between">
       <div className="flex flex-row justify-between">
        <div className="pl-1 flex gap-2 items-center ">
          <GoDatabase className="text-4xl text-my-blue" />
          <div className="flex item-center flex-col">
            <div className="flex text-black text-xl font-bold px-2">
              Upload Assets 
            </div>
            <div className="px-2 rounded-md bg-primary-700 text-black w-max text-sm">
              Upload  Assets in Building room    
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col justify-center align-center">
            <p className="text-gray-400 justify-center">category</p>
            <h2 className="text-black font-bold text-2xl flex justify-center">
              00
            </h2>
          </div>
          <div className="flex flex-col justify-center align-center">
            <p className="text-gray-400">total uploads</p>
            <h2 className="text-black font-bold text-2xl flex justify-center">
              00
            </h2>
          </div>
        </div>
        </div>
        <div className="flex flex-row gap-10 ml-10 text-lg ">  
           <button type="button"
           className={` text-lg py-1 px-2   ${ !showSummary  && activeLink}`}
            onClick={()=>handleShowSummary(false)}>Asset List</button> 
           <button 
           onClick={()=> handleShowSummary(true)} 
           className={`text-lg  px-2 py-1 ml-10 ${showSummary && activeLink}`}>Summary</button> 
        </div>
        </div>
      
      {error !== null && (
        <div className="w-full my-3">
          {error !== "" && (
            <Alert
              alertType={AlertType.WARNING}
              title={"Not found!"}
              description={error}
              close={() => {
                setError("");
              }}
              className={"border-2 border-white"}
            />
          )}
        </div>
      )}
      <div className="bg-white py-10 pb-16 p-2  rounded-lg animate__animated animate__zoomIn animate__fast ">
      {showSummary ? <UploadSummary/>:
      <div className=" flex flex-col p-4 rounded-lg bg-my-gray mx-12 gap-2 mb-56 ">
        <div className="flex items-center justify-center w-full">
          <h3 className="font-bold text-2xl text-black">No Asset Uploaded </h3>
        </div>
        <div className="text-center text-md  text-gray-400">
          click  the following button to upload the Asset In Specific Room 
        </div>
        <div className="text-center  font-light text-black">
         <button 
         onClick={CreateUploadData}
         className=" bg-my-blue text-white rounded-lg py-2 px-6 text-xl">Upload Assets</button> 
        </div>
      </div>
      }
    </div>
    {
      UploadData &&
      <UploadModal close={closeUploadDataModal}/>
    }

    </div>
  );
};

const mapStateToProps = ({ auth }: StoreState): { auth: Auth } => {
  return {
    auth,
  };
};

export default connect(mapStateToProps, {
  FC_SetSuccess,
  FC_SetError,
})(UploadStock);
