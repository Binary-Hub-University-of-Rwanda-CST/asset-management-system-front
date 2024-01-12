import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StoreState } from "../../../reducers";
import { Auth, FC_SetError, FC_SetSuccess } from "../../../actions";
import Alert,{AlertType} from "../../../components/Alert/Alert";
import { MdOutlineDashboard } from "react-icons/md";
import { FaComputer } from "react-icons/fa6";
import { GoDatabase } from "react-icons/go";

interface AppProps {
  auth: Auth;
  FC_SetSuccess: (msg: string) => void;
  FC_SetError: (msg: string) => void;
}

const UploadStock: React.FC<AppProps> = ({ auth, FC_SetSuccess, FC_SetError }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // componentDidMount logic goes here if needed
  }, []);

  return (
    <div className="mr-4 mt-20 ml-72 ">
     <div className="flex flex-col  gap-5 mb-2 bg-white rounded-lg p-3 animate__animated animate__fadeInRight animate__faster justify-between">
       <div className="flex flex-row justify-between">
        <div className="pl-1 flex gap-2 items-center ">
          <GoDatabase className="text-4xl text-my-blue" />
          <div className="flex item-center flex-col">
            <div className="flex text-black text-xl font-bold px-2">
              Upload Asset In Stock
            </div>
            <div className="px-2 rounded-md bg-primary-700 text-black w-max text-sm">
              Manage Stock From Different Location In One College
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
        <div className="flex flex-row gap-10 ml-10 text-lg">
           <button type="button">Asset List</button>
           <button className="text-lg font-bold border-b-2 border-my-blue px-2 py-1">Summary</button>
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
      <div className="bg-white py-10 pb-16  rounded-lg animate__animated animate__fadeInRight animate__fast ">
      <div className=" flex flex-col p-4 rounded-lg bg-my-gray mx-12 gap-2 mb-56 ">
        <div className="flex items-center justify-center w-full">
          <h3 className="font-bold text-2xl text-black">No Asset Uploaded </h3>
        </div>
        <div className="text-center text-md  text-gray-400 uppercase">
          click  the following button to upload the sset In Specific Stock
        </div>
        <div className="text-center  font-light text-black">
         <button className=" bg-my-blue text-white rounded-lg py-2 px-6 text-xl">Upload Stock</button>
        </div>
      </div>
    </div>
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
