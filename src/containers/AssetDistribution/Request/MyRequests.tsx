import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { StoreState } from "@react-pdf-viewer/core"; 
import { Auth, FC_SetError, FC_SetSuccess } from "../../../actions";
import Alert, { AlertType } from "../../../components/Alert/Alert";
import RequestsTable from "./RequestTable";

import { FaComputer } from "react-icons/fa6";
import { PiFolderUserBold } from "react-icons/pi";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegCheckCircle } from "react-icons/fa";
import RequestData from "../../../utils/RequestData";

interface AppProps {
  auth: Auth;
  FC_SetSuccess: (msg: string) => void;
  FC_SetError: (msg: string) => void;
}

interface AppState {
  loading: boolean;
  success: string;
  error: string;
}

const MyRequests: React.FC<AppProps> = ({ auth, FC_SetSuccess, FC_SetError }) => {
  const [state, setState] = useState<AppState>({
    loading: false,
    success: "",
    error: "",
  });

  useEffect(() => {
    // Equivalent to componentDidMount
    // You can place your componentDidMount logic here
  }, []);
  // Calculate lengths for each status
  const pendingCount = RequestData.filter((item) => item.status.toLowerCase() === 'pending').length;
  const approvedCount = RequestData.filter((item) => item.status.toLowerCase() === 'approved').length;
  const rejectedCount = RequestData.filter((item) => item.status.toLowerCase() === 'rejected').length;
  return (
    <div className="mr-4 mt-20 ml-72">
      <div className="flex flex-row items-center justify-between mb-2 bg-white rounded-lg p-3 animate__animated animate__fadeInRight animate__faster">
      <div className="flex flex-row items-center justify-between ">
        <div className="pl-1 flex gap-2 items-center  ">
          <PiFolderUserBold className="text-4xl text-my-blue" />
          <div className="flex item-center flex-col">
            <div className="flex text-black text-2xl font-bold px-2">
             MY Requests
            </div>
            <div className="px-2 rounded-md bg-primary-700 text-black w-max text-sm">
              List of Requested Asset With Their Status
            </div>
          </div>
          </div>
      </div>
        <div className="flex justify-center items-center gap-5">
      <div className=" flex flex-row items-center gap-2">
        <AiOutlineExclamationCircle className=" font-bold text-[#efca66] text-3xl gap-2 "/>
        <div className=" flex flex-col ">
            <h5>pending </h5>
            <h3 className=" font-bold text-xl">{pendingCount}</h3>
        </div>
      </div>
      <div className=" flex flex-row items-center gap-2">
        <RiDeleteBin6Line className="font-bold text-danger text-3xl"/>
        <div className=" flex flex-col ">
            <h5>Rejected</h5>
            <h3 className="font-bold text-xl">{rejectedCount}</h3>
        </div>
      </div>
      <div className=" flex flex-row items-center  gap-2">
        <FaRegCheckCircle className="text-3xl font-bold text-confirm"/>
        <div className=" flex flex-col ">
            <h5 className="text-md  text-gray-600">Approved </h5>
            <h3 className="text-xl font-bold">{approvedCount}</h3>
        </div>
      </div>
      <div> 
        <button className="py-2 px-6 bg-my-blue rounded-lg text-white">Request for Asset</button>
        </div>
        </div>
      </div>
      
      <div className="p-4 rounded-lg bg-white py-10 pb-16 overflow-y-auto overflow-x-auto">
       <RequestsTable/>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  auth,
}: StoreState): {
  auth: Auth;
} => {
  return {
    auth,
  };
};

export default connect(mapStateToProps, {
  FC_SetSuccess,
  FC_SetError,
})(MyRequests);
